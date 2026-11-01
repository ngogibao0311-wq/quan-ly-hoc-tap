(() => {
 'use strict';
 if(window.WebAnimationSystem)return;
 const media=matchMedia('(prefers-reduced-motion: reduce)');
 const state={initialized:false,enabled:true,lowPower:false,reducedMotion:media.matches};
 let observer,layer,scheduled=0;
 let activeTabs=new WeakSet(),seenCards=new WeakSet();
 const animations=new Map(),listeners=[],observedTabs=new Set();
 const excluded='.ui-theme-immune,.store-theme-locked,.store-item-card,.luxury-product-card,[data-fxq-root],#global-effect-container,#virtual-pet-container,.ql-container,.ql-toolbar,[class^="effect-"],[class^="pet-"],[class^="hh-"],[class^="royal-"],[class^="lb-"]';
 const on=(target,type,fn,options)=>{target.addEventListener(type,fn,options);listeners.push(()=>target.removeEventListener(type,fn,options));};
 const allowed=()=>state.enabled&&!state.reducedMotion&&!document.hidden;
 function animate(el,kind='enter'){
  if(!allowed()||!el||el.closest(excluded)||!el.getClientRects().length)return;
  // Animate opacity only: never replace item transforms, filters or positioning.
  animations.get(el)?.cancel();
  const frames=kind==='press'?[{opacity:.68},{opacity:1}]:[{opacity:.35},{opacity:1}];
  const animation=el.animate(frames,{duration:kind==='press'?140:200,easing:'ease-out'});
  animations.set(el,animation);
  animation.finished.catch(()=>{}).finally(()=>{if(animations.get(el)===animation)animations.delete(el);animation.cancel();});
 }
 function sync(){
  state.reducedMotion=media.matches;
  state.lowPower=document.documentElement.classList.contains('fxq-low')||document.documentElement.classList.contains('fxq-luxury-low');
  document.body.classList.toggle('wfx-paused',!allowed());
  document.body.classList.toggle('wfx-low-power',state.lowPower);
  if(layer)layer.hidden=!state.enabled||state.reducedMotion;
  if(!allowed()){animations.forEach(a=>a.cancel());animations.clear();}

 }
 function setEnabled(value){state.enabled=!!value;sync();}
 function observeTabs(tabs){
  // Only shell boundaries matter here. Particle/typing mutations inside a
  // card must never trigger a full dashboard scan.
  if(tabs.length===observedTabs.size&&tabs.every(tab=>observedTabs.has(tab)))return;
  observer.disconnect();observedTabs.clear();
  observer.observe(document.querySelector('.content'),{childList:true});
  observer.observe(document.documentElement,{attributes:true,attributeFilter:['class']});
  tabs.forEach(tab=>{observedTabs.add(tab);observer.observe(tab,{childList:true,attributes:true,attributeFilter:['class']});});
 }
 function scan(){
  scheduled=0;if(!state.initialized)return;sync();
  if(!allowed())return;
  const tabs=[...document.querySelectorAll('.content>.tab-content')];
  observeTabs(tabs);
  tabs.forEach(tab=>{
   if(!tab.classList.contains('active')){activeTabs.delete(tab);return;}
   if(!activeTabs.has(tab)){activeTabs.add(tab);animate(tab);}
   tab.querySelectorAll(':scope>.card,:scope>.form-container,:scope>.table-responsive').forEach(card=>{
    if(!seenCards.has(card)){seenCards.add(card);if(!animations.has(tab))animate(card);}
   });
  });
 }
 function schedule(){if(state.initialized&&allowed()&&!scheduled)scheduled=requestAnimationFrame(scan);}
 function resume(){sync();if(allowed())schedule();else{cancelAnimationFrame(scheduled);scheduled=0;}}
 function init(){
  if(state.initialized||!document.body||!document.querySelector('.dashboard'))return;
  state.initialized=true;
  state.enabled=true;
  document.body.classList.add('wfx-ready');
  layer=document.createElement('div');layer.id='wfx-web-animation-layer';layer.setAttribute('aria-hidden','true');
  layer.innerHTML='<div class="wfx-aurora wfx-aurora-a"></div><div class="wfx-aurora wfx-aurora-b"></div>';document.body.prepend(layer);
  on(document,'visibilitychange',resume);on(media,'change',resume);

  on(document,'pointerdown',e=>{const b=e.target.closest?.('.sidebar .nav-item,.sidebar-toggle,.content button');if(b&&!b.disabled)animate(b,'press');},{passive:true});
  observer=new MutationObserver(records=>{
   if(records.some(r=>r.type==='attributes'||r.type==='childList'&&[...r.addedNodes,...r.removedNodes].some(n=>n.nodeType===1)))schedule();
  });
  observer.observe(document.querySelector('.content'),{childList:true});
  observer.observe(document.documentElement,{attributes:true,attributeFilter:['class']});
  scan();
 }
 function destroy(){observer?.disconnect();observedTabs.clear();activeTabs=new WeakSet();seenCards=new WeakSet();listeners.splice(0).forEach(f=>f());cancelAnimationFrame(scheduled);scheduled=0;animations.forEach(a=>a.cancel());animations.clear();layer?.remove();layer=null;document.body?.classList.remove('wfx-ready','wfx-paused','wfx-low-power');state.initialized=false;}
 window.WebAnimationSystem=Object.freeze({version:'2.1.0',init,refresh:schedule,destroy,enable:()=>{setEnabled(true);schedule();},disable:()=>{setEnabled(false);cancelAnimationFrame(scheduled);scheduled=0;},getState:()=>({...state})});
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();
