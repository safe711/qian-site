import {estateSeason,estatePeriod,SEASON_WEATHER,estateBackgroundPlan,preloadEstatePainting} from './estate-environment.js';
import {estateWeather} from './estate-weather.js';
import {prefetchOriginalImage} from './estate-original-image-cache.js';
const PERIODS=['morning','noon','dusk','night'];
export function estatePreloadEnvironment(now=Date.now()){const season=estateSeason(now);return{season,period:estatePeriod(now),weather:estateWeather('auto',now,season)};}
export function estateSeasonPlan(env,entered=false){const seen=new Set(),phases=[];function add(phase,contexts,decode){const items=[];for(const context of contexts)for(const asset of estateBackgroundPlan(context))if(!seen.has(asset.url)){seen.add(asset.url);items.push(asset);}phases.push({phase,decode,items});}add('current',[env],true);if(entered){add('periods',PERIODS.filter(p=>p!==env.period).map(period=>({...env,period})),false);add('weather',SEASON_WEATHER[env.season].filter(w=>w!==env.weather).flatMap(weather=>[env.period,...PERIODS.filter(p=>p!==env.period)].map(period=>({...env,weather,period}))),false);}return phases;}
export function createEstatePreloader({loadCurrent=asset=>preloadEstatePainting(asset.id),loadFuture=(asset,signal)=>prefetchOriginalImage(asset.url,{priority:30,signal}),yieldTask=()=>new Promise(r=>setTimeout(r,50))}={}){
 let run=null,enabled=true;
 function update({entered=false,env=estatePreloadEnvironment(),saveData=!!globalThis.navigator?.connection?.saveData}={}){const phases=estateSeasonPlan(env,entered&&!saveData),key=JSON.stringify([env.season,env.period,env.weather,entered,saveData]);enabled=true;if(run?.key===key)return run.promise;run?.controller.abort();const state={key,season:env.season,entered,phase:'current',done:0,total:phases.reduce((n,p)=>n+p.items.length,0),errors:[],complete:false,controller:new AbortController()};run=state;state.promise=(async()=>{for(const phase of phases){state.phase=phase.phase;for(const asset of phase.items){if(run!==state||state.controller.signal.aborted)return;try{if(phase.decode)await loadCurrent(asset);else await loadFuture(asset,state.controller.signal);}catch(e){if(e.name==='AbortError'||state.controller.signal.aborted)return;state.errors.push({file:asset.file,error:e.message});}state.done++;if(!phase.decode)await yieldTask();}}if(run===state)state.complete=true;})();return state.promise;}
 function stop(){enabled=false;run?.controller.abort();run=null;}
 function status(){return run?{enabled,season:run.season,entered:run.entered,phase:run.phase,done:run.done,total:run.total,complete:run.complete,errors:run.errors.slice()}:{enabled,phase:'idle',done:0,total:0,complete:false,errors:[]};}
 return{update,stop,status};
}
export const estatePreloader=createEstatePreloader();
