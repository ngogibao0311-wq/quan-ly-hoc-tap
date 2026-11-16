(function (root) {
    'use strict';
    const SIZE = 8, COLORS = 5;
    // Draft difficulty; event dates and rewards are configured separately on the server.
    const legacyLevels = Array.from({length:12}, (_,i) => ({id:i+1, moves:26+Math.floor(i/4)*3,
        target:18+i*2, color:i%COLORS, ice:i<4?0:8+(i-4)*2, stars:[5,10]}));
    const levels = Array.from({length:12}, (_,i) => ({id:i+1, moves:24-Math.floor(i/3),
        target:30+i*3, color:i%COLORS, ice:i<2?0:6+(i-2)*2, stars:[5,10]}));
    // Started rounds retain their original difficulty after an update.
    function config(state) {
        if (![1,2].includes(state.version)) throw Error('NOEL_STATE_VERSION_INVALID');
        return (state.version===1?legacyLevels:levels)[state.level-1];
    }
    const clone = value => JSON.parse(JSON.stringify(value));
    const adjacent = (a,b) => Number.isInteger(a)&&Number.isInteger(b)&&a>=0&&b>=0&&a<64&&b<64&&
        (Math.abs(a-b)===8 || Math.floor(a/8)===Math.floor(b/8)&&Math.abs(a-b)===1);
    function random(s) {
        let x=s.rng>>>0; x^=x<<13; x^=x>>>17; x^=x<<5; s.rng=x>>>0;
        return s.rng/4294967296;
    }
    const tile = s => ({color:Math.floor(random(s)*COLORS),special:''});
    function runs(board) {
        const result=[];
        for (const step of [1,8]) for(let lane=0;lane<8;lane++) {
            let group=[];
            const flush=()=>{if(group.length>=3)result.push(group);group=[];};
            for(let n=0;n<8;n++) {
                const i=step===1?lane*8+n:n*8+lane, cell=board[i];
                if(!cell||cell.color<0||group.length&&board[group[0]].color!==cell.color)flush();
                if(cell&&cell.color>=0)group.push(i);
            }
            flush();
        }
        return result;
    }
    function legal(board,a,b) {
        if(!adjacent(a,b))return false;
        if((board[a].special==='star'&&!board[b].special)||(board[b].special==='star'&&!board[a].special))return true;
        const copy=board.slice();[copy[a],copy[b]]=[copy[b],copy[a]];
        return runs(copy).some(g=>g.includes(a)||g.includes(b));
    }
    function moves(board) {
        const list=[];
        for(let a=0;a<64;a++)for(const b of [a+1,a+8])if(adjacent(a,b)&&legal(board,a,b))list.push([a,b]);
        return list;
    }
    function shuffle(s) {
        const original=s.board.slice();
        for(let attempt=0;attempt<2000;attempt++) {
            s.board=original.slice();
            for(let i=63;i>0;i--){const j=Math.floor(random(s)*(i+1));[s.board[i],s.board[j]]=[s.board[j],s.board[i]];}
            if(!runs(s.board).length&&moves(s.board).length)return;
        }
        // Never erase ice or specials to escape a dead board; caller retains the prior state.
        throw Error('NOEL_SHUFFLE_RETRY');
    }
    function create(level,seed) {
        const config=levels[level-1];if(!config)throw Error('NOEL_LEVEL_INVALID');
        const s={version:2,level,rng:(seed>>>0)||1,board:[],ice:Array(64).fill(0),remaining:config.moves,
            collected:Array(COLORS).fill(0),brokenIce:0,status:'active',seq:0};
        for(let i=0;i<64;i++) {
            let choices=[0,1,2,3,4].filter(c=>!(i%8>=2&&s.board[i-1].color===c&&s.board[i-2].color===c)&&
                !(i>=16&&s.board[i-8].color===c&&s.board[i-16].color===c));
            s.board.push({color:choices[Math.floor(random(s)*choices.length)],special:''});
        }
        for(let i=0;i<config.ice;i++)s.ice[(i*17+18)%64]=1;
        if(!moves(s.board).length)shuffle(s);
        return s;
    }
    function resolve(s,groups,preferred,starPair) {
        const clear=new Set(groups.flat()),created=new Map();
        // Merge intersecting runs before selecting a single special per shape.
        const clusters=[];
        for(const group of groups) {
            const touching=clusters.filter(c=>group.some(i=>c.cells.has(i)));
            const cluster={cells:new Set(group),runs:[group]};
            for(const c of touching){c.cells.forEach(i=>cluster.cells.add(i));cluster.runs.push(...c.runs);clusters.splice(clusters.indexOf(c),1);}
            clusters.push(cluster);
        }
        for(const c of clusters) {
            const longest=c.runs.reduce((a,b)=>a.length>=b.length?a:b),at=preferred.find(i=>c.cells.has(i))??Math.min(...c.cells);
            const special=longest.length>=5?'star':c.runs.length>1?'bomb':longest.length===4?(longest[1]-longest[0]===1?'row':'col'):'';
            if(special)created.set(at,{color:special==='star'?-1:s.board[at].color,special});
        }
        if(starPair){const [at,color]=starPair;clear.add(at);s.board.forEach((c,i)=>{if(c.color===color)clear.add(i);});}
        const queue=[...clear],activated=new Set();
        const add=i=>{if(i>=0&&i<64&&!clear.has(i)){clear.add(i);queue.push(i);}};
        for(let n=0;n<queue.length;n++) {
            const at=queue[n],cell=s.board[at];if(!cell||activated.has(at))continue;activated.add(at);
            const row=Math.floor(at/8),col=at%8;
            if(cell.special==='row')for(let c=0;c<8;c++)add(row*8+c);
            if(cell.special==='col')for(let r=0;r<8;r++)add(r*8+col);
            if(cell.special==='bomb')for(let r=Math.max(0,row-1);r<=Math.min(7,row+1);r++)for(let c=Math.max(0,col-1);c<=Math.min(7,col+1);c++)add(r*8+c);
            // Draft rule: a star touched by another effect clears the most common color.
            if(cell.special==='star'&&(!starPair||at!==starPair[0])) {
                const counts=Array(COLORS).fill(0);s.board.forEach(c=>{if(c.color>=0)counts[c.color]++;});
                const color=counts.indexOf(Math.max(...counts));s.board.forEach((c,i)=>{if(c.color===color)add(i);});
            }
        }
        for(const i of clear) {
            if(s.board[i].color>=0)s.collected[s.board[i].color]++;
            if(s.ice[i]){s.ice[i]--;s.brokenIce++;}
            s.board[i]=created.get(i)||null;
        }
        for(let c=0;c<8;c++) {
            const cells=[];for(let r=7;r>=0;r--)if(s.board[r*8+c])cells.push(s.board[r*8+c]);
            for(let r=7;r>=0;r--)s.board[r*8+c]=cells[7-r]||tile(s);
        }
        return [...clear];
    }
    function move(state,a,b) {
        if(state.status!=='active')throw Error('NOEL_ROUND_FINISHED');
        if(!legal(state.board,a,b))return {state:clone(state),valid:false,waves:[]};
        const s=clone(state),waves=[];
        [s.board[a],s.board[b]]=[s.board[b],s.board[a]];
        let pair=null;
        if(s.board[a].special==='star'&&!s.board[b].special)pair=[a,s.board[b].color];
        else if(s.board[b].special==='star'&&!s.board[a].special)pair=[b,s.board[a].color];
        let groups=runs(s.board);
        for(let count=0;groups.length||pair;count++) {
            if(count>=100)throw Error('NOEL_CASCADE_RETRY');
            waves.push(resolve(s,groups,count===0?[b,a]:[],pair));pair=null;groups=runs(s.board);
        }
        s.remaining--;s.seq++;
        const levelConfig=config(s);
        s.status=s.collected[levelConfig.color]>=levelConfig.target&&s.brokenIce>=levelConfig.ice?'won':s.remaining<=0?'lost':'active';
        let shuffled=false;
        if(s.status==='active'&&!moves(s.board).length){shuffle(s);shuffled=true;}
        s.stars=s.status==='won'?1+levelConfig.stars.filter(n=>s.remaining>=n).length:0;
        return {state:s,valid:true,waves,shuffled};
    }
    root.NoelMatch3=Object.freeze({SIZE,COLORS,levels,config,create,move,moves,runs,shuffle,adjacent});
    if(typeof module==='object'&&module.exports)module.exports=root.NoelMatch3;
})(globalThis);
