import {makeSceneEntryMotion} from './estate-scene-entry.js';
export const LOUNGE_CHAIRS=[[321,276,410,213],[370,293,470,220],[426,310,532,229],[490,326,589,237]].map(([x,y,hx,hy],index)=>({id:'recliner-'+(index+1),name:'躺椅'+(index+1),x,y,head:{x:hx,y:hy},foot:{x,y}}));
export const loungeChair=id=>LOUNGE_CHAIRS.find(chair=>chair.id===id)||null;
export const estateScenesAdjacent=(from,to)=>({courtyard:['bedroom'],bedroom:['courtyard','shrine','lounge'],shrine:['bedroom','cellar'],cellar:['shrine'],lounge:['bedroom','gallery'],gallery:['lounge']}[from]||[]).includes(to);
export function loungeMassageTarget(chair){return{scene:'lounge',x:chair.foot.x-29,y:chair.foot.y-9,direction:1};}
export const estateRestPose=site=>site==='audience-sofa'?'audience':loungeChair(site)?'lounge-recline':site==='bed'?'lie':'sit';
export function estateSceneRoute(from,to){const queue=[[from]],seen=new Set([from]);while(queue.length){const route=queue.shift(),last=route.at(-1);if(last===to)return route;for(const next of {courtyard:['bedroom'],bedroom:['courtyard','shrine','lounge'],shrine:['bedroom','cellar'],cellar:['shrine'],lounge:['bedroom','gallery'],gallery:['lounge']}[last]||[])if(!seen.has(next)){seen.add(next);queue.push([...route,next]);}}throw Error('Unknown scene route');}
export function makeLoungeMassageMotion(id,ownerId,targetId,dog,chair,startedAt,readyDelay=0){return makeSceneEntryMotion(id,ownerId,targetId,dog,loungeMassageTarget(chair),startedAt,{kind:'massage',site:chair.id});}

// Foot-contact boundary traced in the 640x360 lounge background. Leave clearance
// in front of the television cabinet and the diagonal row of recliners.
export const loungeFloorY=x=>Math.max(284,284+(x-285)*.40);
export const loungeFloorContains=(x,y)=>x>=30&&x<=410&&y>=loungeFloorY(x)&&y<=330;
export function loungeFloorPoint(point){let best=null,distance=Infinity;for(let x=30;x<=400;x++){const y=Math.max(loungeFloorY(x),Math.min(330,point.y)),d=(x-point.x)**2+(y-point.y)**2;if(d<distance){best={...point,x,y};distance=d;}}return best;}
