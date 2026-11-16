(function(){
    'use strict';
    const blobs=new Set();
    function isPrivate(url){
        try{
            const parsed=new URL(url);
            return ['https:','http:'].includes(parsed.protocol) && /^\/files\/(submissions|teacher-feedback)\//.test(decodeURIComponent(parsed.pathname));
        }catch{return false;}
    }
    function release(url){if(blobs.delete(url))URL.revokeObjectURL(url);}
    function clear(){for(const url of [...blobs])release(url);}
    async function resolve(url){
        if(!isPrivate(url))return url;
        const config=window.CloudflareR2Storage?.config;
        const parsed=new URL(url);
        if(!config||parsed.username||parsed.password||parsed.origin!==new URL(config.workerUrl).origin)throw Error('Tệp thuộc bản website khác. Không thể mở bằng tài khoản hiện tại.');
        const user=window.firebase?.auth().currentUser;
        if(!user)throw Error('Vui lòng đăng nhập để xem tệp riêng tư.');
        const token=await user.getIdToken();
        if(window.firebase.auth().currentUser?.uid!==user.uid)throw Error('Tài khoản đã thay đổi. Hãy mở lại tệp.');
        const response=await fetch(parsed.href,{headers:{Authorization:'Bearer '+token},cache:'no-store',redirect:'error',referrerPolicy:'no-referrer'});
        if(!response.ok)throw Error(response.status===401||response.status===403?'Bạn không có quyền xem tệp này hoặc phiên đăng nhập đã hết hạn.':'Chưa tải được tệp. Vui lòng thử lại.');
        const blob=await response.blob();
        if(window.firebase.auth().currentUser?.uid!==user.uid)throw Error('Tài khoản đã thay đổi. Hãy mở lại tệp.');
        const safeType=/^(?:image\/(?:png|jpe?g|gif|webp|bmp|avif|heic|heif)|audio\/(?:mpeg|mp3|wav|wave|x-wav|mp4|x-m4a|aac|ogg|opus|flac|webm)|application\/(?:pdf|msword|vnd\.openxmlformats-officedocument\.wordprocessingml\.document))$/i;
        // Blob navigations do not retain the Worker response's nosniff or attachment headers.
        const type=blob.type.split(';')[0].trim();
        const safeBlob=blob.slice(0,blob.size,safeType.test(type)?type:'text/plain');
        const result=URL.createObjectURL(safeBlob);blobs.add(result);return result;
    }
    async function open(url,name){
        if(!isPrivate(url))return;
        // Open synchronously to retain the user's click permission.
        const tab=window.open('about:blank','_blank');
        if(!tab){await AppDialog.alert('Hãy cho phép mở cửa sổ mới rồi thử lại.');return;}
        tab.opener=null;
        try{
            const local=await resolve(url);
            if(tab.closed){release(local);return;}
            tab.location.replace(local);
            if(blobs.has(local))setTimeout(()=>release(local),120000);
        }catch(e){tab.close();await AppDialog.alert(e.message);}
    }
    window.addEventListener('pagehide',clear);
    if(window.firebase?.auth)window.firebase.auth().onAuthStateChanged(clear);
    window.PrivateFileAccess=Object.freeze({isPrivate,resolve,release,open});
})();
