import {disasterIcon,disasterDescription} from './familyui.js';
import {dayKey} from './model.js';
import {subscriptionStatus,formatAmount,mediaFingerprint} from './subscription.js';
import {getSubscriptionMedia} from './photos.js';
const escape=value=>String(value??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
export async function checkContract(file){
  if(!(file instanceof Blob)||!['image/png','image/jpeg'].includes(file.type)||!file.size||file.size>8_000_000)throw Error('协议原件须为 PNG 或 JPEG 图片，且不超过 8 MB');
  const bytes=new Uint8Array(await file.slice(0,8).arrayBuffer());
  if(file.type==='image/png'&&![137,80,78,71,13,10,26,10].every((value,index)=>bytes[index]===value)||file.type==='image/jpeg'&&(bytes[0]!==255||bytes[1]!==216||bytes[2]!==255))throw Error('协议图片内容无效');
  const bitmap=await createImageBitmap(file).catch(()=>{throw Error('无法读取协议图片，请换用清晰的 PNG 或 JPEG');});
  const pixels=bitmap.width*bitmap.height;bitmap.close();if(pixels>20_000_000)throw Error('协议图片分辨率过高，请选择较小的原件图片');
}
export function mountSubscription(container,state,{notify,loadPrivateContract=null}){
 const subscription=state.subscription,status=subscriptionStatus(subscription,dayKey());let alive=true;const urls=[];
 const root=document.createElement('div');root.className='subscription-view';
 root.innerHTML=`<section class="subscription-overview"><small>SUBSCRIPTION</small><h3 class="disaster-title">${disasterIcon()}挡灾订阅</h3><p>${disasterDescription}</p><p role="status" class="gold">付款功能暂未开放</p><p class="muted">已有记录保留，可继续查阅历史与契约。</p><p>当前状态：${escape(status.label||status.code)}</p><button type="button" data-sub="view-contract">查看契约</button></section><section><h3>付款与签字历史</h3><p class="muted">共 ${subscription.payments.length} 笔，显示最近 20 笔。</p>${subscription.payments.slice(-20).reverse().map(p=>`<article class="subscription-history"><h4>${escape(p.paidDate)} · ¥ ${formatAmount(p.amountCents)}</h4><p>${p.status==='signed'?'已签字':'待签字（暂停办理）'}</p><p>${escape(p.periodStart||'')} — ${escape(p.periodEnd||'')}</p>${p.note?'<p>'+escape(p.note)+'</p>':''}<details><summary>本笔确认文本</summary><p>${escape(p.agreementText)}</p></details><button type="button" data-sub="history-contract" data-id="${escape(p.id)}">查看本笔原件</button>${p.signatureId?'<button type="button" data-sub="history-signature" data-id="'+escape(p.id)+'">查看历史签名</button>':''}</article>`).join('')||'<p class="muted">尚无付款记录。</p>'}</section>`;
 const viewer=document.createElement('dialog');viewer.className='contract-viewer subscription-contract-viewer';viewer.innerHTML='<div class="contract-viewer-header"><h3>契约原件</h3><button type="button" data-close-document>关闭</button></div><div class="contract-viewer-image"></div>';root.append(viewer);container.append(root);
 const content=viewer.querySelector('.contract-viewer-image');viewer.querySelector('[data-close-document]').onclick=()=>viewer.close();
 async function show(id,fingerprint,fallback=false){content.innerHTML='<p role="status">正在读取原件…</p>';viewer.showModal();try{const asset=id?await getSubscriptionMedia(id):null;let blob=asset?.blob;if(blob&&fingerprint&&await mediaFingerprint(blob)!==fingerprint)throw Error('原件校验失败');if(!blob&&fallback&&loadPrivateContract)blob=await loadPrivateContract();if(!alive||!viewer.open)return;if(!blob)throw Error('尚未保存此契约附件');await checkContract(blob);const image=document.createElement('img');image.alt='历史契约原件';const url=URL.createObjectURL(blob);urls.push(url);image.src=url;content.replaceChildren(image);const download=document.createElement('a');download.href=url;download.download='历史契约原件'+(blob.type==='image/png'?'.png':'.jpg');download.textContent='下载原件';content.append(download);}catch(error){if(alive)content.textContent=error.message;}}
 root.addEventListener('submit',event=>{event.preventDefault();event.stopPropagation();notify('付款功能暂未开放');});
 root.addEventListener('click',event=>{const button=event.target.closest('[data-sub]');if(!button)return;event.stopPropagation();const action=button.dataset.sub;if(action==='view-contract'){show(subscription.contractId,subscription.contractFingerprint,true);return;}if(['history-contract','history-signature'].includes(action)){const p=subscription.payments.find(p=>p.id===button.dataset.id);if(!p)return;const signature=action==='history-signature';show(signature?p.signatureId:p.contractId,signature?p.signatureFingerprint:p.contractFingerprint);return;}notify('付款功能暂未开放');});
 return()=>{alive=false;viewer.close();for(const url of urls)URL.revokeObjectURL(url);root.remove();};
}
