export function certificateGuideHtml(){return `<dialog id="certificate-guide" class="contract-viewer" aria-labelledby="certificate-guide-title"><div class="contract-viewer-header"><h3 id="certificate-guide-title">钱家 HTTPS 连接</h3><button type="button" data-action="close-certificate-guide">关闭</button></div><p>钱家使用公网 HTTPS 连接，无需安装原站的家庭证书。</p><label>网站地址<input id="certificate-install-address" type="url" readonly value="https://qian.mo.cn/"></label><button type="button" data-action="copy-certificate-address">复制网站地址</button><p>iPhone 可在 Safari 打开网站，通过分享菜单添加到主屏幕。</p></dialog>`;}


if(globalThis.document?.body?.dataset.certificateInstaller==='true'){
  const standalone=globalThis.navigator?.standalone||globalThis.matchMedia?.('(display-mode: standalone)').matches;
  if(standalone){
    document.querySelector('#safari-required').hidden=false;
    document.querySelector('#certificate-download').hidden=true;
  }
  const address=document.querySelector('#installer-address');
  address.value=location.href.split(/[?#]/)[0];
  document.querySelector('#copy-installer-address').addEventListener('click',async()=>{
    try{await navigator.clipboard.writeText(address.value);document.querySelector('#installer-message').textContent='地址已复制，请打开 Safari 粘贴。';}
    catch{address.focus();address.select();document.querySelector('#installer-message').textContent='请长按地址复制，再打开 Safari 粘贴。';}
  });
}
