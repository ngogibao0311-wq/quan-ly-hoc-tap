(function(){
    'use strict';
    const blobs=new Set();
    function isPrivate(url){
        try{return /\/files\/(submissions|teacher-feedback)\//.test(decodeURIComponent(new URL(url).pathname));}catch{return false;}
    }
    function release(url){if(blobs.delete(url))URL.revokeObjectURL(url);}
    function clear(){for(const url of [...blobs])release(url);}
    async function resolve(url){
        if(!isPrivate(url))return url;
        const config=window.CloudflareR2Storage?.config;
        if(!config||new URL(url).origin!==new URL(config.workerUrl).origin)throw Error('Tệp thuộc bản website khác. Không thể mở bằng tài khoản hiện tại.');
        const user=window.firebase?.auth().currentUser;
        if(!user)throw Error('Vui lòng đăng nhập để xem tệp riêng tư.');
        const response=await fetch(url,{headers:{Authorization:'Bearer '+await user.getIdToken()},cache:'no-store',redirect:'error'});
        if(!response.ok)throw Error(response.status===401||response.status===403?'Bạn không có quyền xem tệp này hoặc phiên đăng nhập đã hết hạn.':'Chưa tải được tệp. Vui lòng thử lại.');
        const blob=await response.blob();
        if(window.firebase.auth().currentUser?.uid!==user.uid)throw Error('Tài khoản đã thay đổi. Hãy mở lại tệp.');
        const result=URL.createObjectURL(blob);blobs.add(result);return result;
    }
    async function open(url,name){
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
