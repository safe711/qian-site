export const SHRINE_SOFA={id:'audience-sofa',name:'现圣沙发',x:210,y:253,seat:{scene:'cellar',x:210,y:294,direction:1}};
// A persisted seated interaction is the only trigger. Old clock/manual windows are ignored.
export function shrineAudience(now=Date.now(),state=null){
 if(state?.version!==2||!state.ownerId||!Number.isFinite(state.startAt))return{active:false,phase:'home',elapsed:0,progress:0};
 const elapsed=Math.max(0,now-state.startAt),reached=now>=state.startAt;
 if(Number.isFinite(state.endedAt)){if(state.endedAt<state.startAt||now>=state.endedAt+6000)return{active:false,phase:'home',elapsed:0,progress:0};return{active:false,phase:'return',elapsed:now-state.endedAt,progress:Math.min(1,(now-state.endedAt)/6000),returnFrom:Math.min(1,(state.endedAt-state.startAt)/6000),ownerId:state.ownerId,ownerName:state.ownerName};}
 if(!reached)return{active:false,phase:'seating',elapsed:0,progress:0,ownerId:state.ownerId,ownerName:state.ownerName};
 return{active:true,phase:elapsed<6000?'approach':'bow',elapsed,progress:Math.min(1,elapsed/6000),startAt:state.startAt,ownerId:state.ownerId,ownerName:state.ownerName,source:'seated'};
}
export function audienceCountdown(audience){return audience.active?'主子现圣中 · 站起即结束':audience.phase==='seating'?'主子正在前往沙发':audience.phase==='return'?'现圣结束 · 返回原位':'点击沙发坐下开启现圣';}
export function disasterAudiencePosition(actor,now=Date.now(),state=null){
 const right=actor.id==='QIAN-DZ-002'||actor.number==='02',home={scene:'cellar',x:right?330:85,y:311,direction:right?-1:1},post={scene:'cellar',x:right?292:128,y:305,direction:right?-1:1},audience=shrineAudience(now,state),progress=audience.phase==='bow'?1:audience.phase==='approach'?audience.progress:audience.phase==='return'?(1-audience.progress)*(audience.returnFrom??1):0,moving=['approach','return'].includes(audience.phase),back=audience.phase==='return',title=(audience.ownerName||'钱若娟')+'主子',words=[`${title}，奴才给您磕头`,`${title}，奴才给您挡灾`,`感谢${title}大恩`];
 return{...home,x:home.x+(post.x-home.x)*progress,direction:back?-home.direction:home.direction,pose:moving?'crawl':'prostrate',audiencePhase:audience.phase,audienceClock:Math.max(0,audience.elapsed-6000),audienceText:audience.phase==='bow'?words[Math.floor(Math.max(0,audience.elapsed-6000)/1620)%3]:null,chainAnchor:{x:home.x,y:35}};
}
