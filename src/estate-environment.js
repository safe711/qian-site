import {registerEstateBackground} from './estate-art.js';
import {loadOriginalImage} from './estate-original-image-cache.js';
import {WEATHER_WINDOWS} from './estate-weather.js';
import {SCENE_ORIGINAL_ASSETS} from './estate-scene-originals.js';

export const SEASON_WEATHER={spring:['sunny','cloudy','rain'],summer:['sunny','cloudy','rain','thunderstorm'],autumn:['sunny','cloudy','drizzle'],winter:['sunny','cloudy','snow','blizzard']};
export const SEASON_NAMES={spring:'春天',summer:'夏天',autumn:'秋天',winter:'冬天'};
export const PERIOD_NAMES={morning:'早上',noon:'中午',dusk:'傍晚',night:'深夜'};
const monthClock=new Intl.DateTimeFormat('en',{timeZone:'Asia/Hong_Kong',month:'numeric'}),hourClock=new Intl.DateTimeFormat('en',{timeZone:'Asia/Hong_Kong',hour:'numeric',hourCycle:'h23'});
export function estateSeason(now=Date.now()){const month=Number(monthClock.format(now));return month>=3&&month<=5?'spring':month>=6&&month<=8?'summer':month>=9&&month<=11?'autumn':'winter';}
export function estatePeriod(now=Date.now()){const hour=Number(hourClock.format(now));return hour>=5&&hour<11?'morning':hour>=11&&hour<16?'noon':hour>=16&&hour<20?'dusk':'night';}
const images=new Map(),loading=new Map(),retryAfter=new Map(),lastReady=new Map();
const MAX_SCENE_PAINTINGS=8;let wanted=new Set();
function trimPaintings(){const keep=wanted;for(const id of images.keys()){if(images.size<=MAX_SCENE_PAINTINGS)break;if(!keep.has(id))images.delete(id);}}
function painting(id){const image=images.get(id);if(image){images.delete(id);images.set(id,image);}return image;}
function requestPainting(id,priority=0){if(images.has(id))return Promise.resolve(images.get(id));const asset=SCENE_ORIGINAL_ASSETS[id];if(!asset)return Promise.reject(Error('场景不存在：'+id));const url=new URL('../'+asset.file,import.meta.url).href+'?original='+asset.hash;if(loading.has(id)){loadOriginalImage(url,{priority}).catch(()=>{});return loading.get(id);}if(Date.now()<(retryAfter.get(id)||0))return Promise.reject(Error('场景加载失败，请稍后重试'));const job=loadOriginalImage(url,{priority}).then(im=>{images.set(id,im);if(id.startsWith('gallery-'))registerEstateBackground('gallery',im);retryAfter.delete(id);trimPaintings();return im;}).catch(error=>{retryAfter.set(id,Date.now()+2000);throw error;}).finally(()=>loading.delete(id));loading.set(id,job);return job;}
export function estateBackgroundPlan(env){const maps=['bedroom','shrine','courtyard','lounge','gallery','cellar'];return [...new Set(maps.flatMap(scene=>requiredBackgrounds(scene,env)))].map(id=>{const asset=SCENE_ORIGINAL_ASSETS[id];if(!asset)throw Error('场景不存在：'+id);return{id,file:asset.file,url:new URL('../'+asset.file,import.meta.url).href+'?original='+asset.hash};});}
export function preloadEstatePainting(id){return requestPainting(id,5);}
export function environmentId(season,weather,period){return `courtyard-${season}-${weather}-${period}`;}
function roomId(scene,{season,weather,period}){return scene==='cellar'?'cellar-fixed':scene==='courtyard'?environmentId(season,weather,period):`${scene}-${weather==='sunny'?'clear':'overcast'}-${period}`;}
function requiredBackgrounds(scene,env){return [...new Set([roomId(scene,env),...(!['courtyard','gallery','cellar'].includes(scene)?[environmentId(env.season,env.weather,env.period)]:[])])];}
export function prepareEstateBackground(scene,env){wanted=new Set(requiredBackgrounds(scene,env));for(const id of wanted)requestPainting(id,0).catch(()=>{});}
export function estateBackgroundComplete(scene,env){return requiredBackgrounds(scene,env).every(id=>images.has(id));}
export async function ensureEstateBackground(scene,env){const ids=requiredBackgrounds(scene,env);wanted=new Set(ids);const result=await Promise.all(ids.map(id=>requestPainting(id,0)));if(scene==='gallery')registerEstateBackground(scene,result[0]);return true;}
export function preloadEstateNeighborhood(scene,env,now=Date.now()){const scenes=(globalThis.navigator?.connection?.saveData?[scene]:[scene,'bedroom','shrine','courtyard','lounge','gallery','cellar']).filter((v,i,a)=>a.indexOf(v)===i);const ids=[...new Set(scenes.flatMap(map=>requiredBackgrounds(map,env)))];return Promise.allSettled(ids.map(id=>requestPainting(id,20)));}
export function estateClockOffset(serverTime,startedAt,receivedAt,previous=0){const elapsed=receivedAt-startedAt;if(!Number.isFinite(serverTime)||!Number.isFinite(startedAt)||elapsed<0||elapsed>5000)return previous;return serverTime-(startedAt+receivedAt)/2;}
export function estateBackgroundStatus(scene,env){const id=roomId(scene,env);return{id,ready:images.has(id),previous:lastReady.get(scene)||null,loading:loading.has(id),complete:estateBackgroundComplete(scene,env),retryAt:retryAfter.get(id)||0,decoded:images.size,limit:MAX_SCENE_PAINTINGS};}
function shadeAutumnNight(c,scene,env){if(env.season!=='autumn'||env.period!=='night')return;c.save();if(scene!=='courtyard'){c.beginPath();for(const poly of WEATHER_WINDOWS[scene]||[]){c.moveTo(...poly[0]);for(const point of poly.slice(1))c.lineTo(...point);c.closePath();}c.clip();}const shade=c.createLinearGradient(0,0,0,360);shade.addColorStop(0,'rgba(2,6,19,.64)');shade.addColorStop(.48,'rgba(3,8,23,.48)');shade.addColorStop(1,'rgba(2,6,19,.58)');c.fillStyle=shade;c.fillRect(0,0,640,360);c.restore();}
export function drawEstateExterior(c,scene,env){const id=roomId(scene,env);prepareEstateBackground(scene,env);let image=painting(id);if(image)lastReady.set(scene,id);else image=null;if(image){c.save();c.imageSmoothingEnabled=true;c.drawImage(image,0,0,640,360);c.restore();}if(scene==='courtyard'){shadeAutumnNight(c,scene,env);return !!image;}if(scene==='gallery'||scene==='cellar')return !!image;const outdoor=painting(environmentId(env.season,env.weather,env.period));if(outdoor)drawEstateWindowView(c,scene,outdoor);shadeAutumnNight(c,scene,env);return !!outdoor;}
export function drawEstateWindowView(c,scene,image){c.save();c.imageSmoothingEnabled=true;c.beginPath();for(const poly of WEATHER_WINDOWS[scene]||[]){c.moveTo(...poly[0]);for(const point of poly.slice(1))c.lineTo(...point);c.closePath();}c.clip();
 // Show distant sky, trees and rooftops through each window, keeping indoor frames intact.
 const views=['bedroom','lounge'].includes(scene)?[[271,68,76,125],[585,76,43,111]]:[[621,96,19,76]];
 for(const[x,y,w,h]of views){const sh=image.height*.40,sw=sh*w/h,sx=Math.min(image.width-sw,image.width*.76-sw/2);c.drawImage(image,sx,image.height*.02,sw,sh,x,y,w,h);}
 c.restore();}
