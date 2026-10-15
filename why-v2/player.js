/* WHY campaign timing engine. Narration is not generated: timeline will later
   accept per-cut Moonjung audio tracks without changing the scene renderer. */
(() => {
 const $=s=>document.querySelector(s),S=window.WHY_SCENES,high=window.WHY_HIGHLIGHTS;
 const state={playlist:S.map(s=>({...s,duration:s.d})),mode:'full',time:0,playing:false,lastStamp:0,raf:0,sceneIndex:0,captions:false,started:false};
 const screen=$('#screen'),cinema=$('#cinema'),choice=$('#choice'),ending=$('#ending'),scenesDialog=$('#sceneDialog');
 const totals=playlist=>playlist.reduce((a,s)=>a+s.duration,0);
 const dur=(sec)=>{let n=Math.round(sec);return `${Math.floor(n/60)}:${String(n%60).padStart(2,'0')}`};
 const paths={}; // Reserving explicit per-cut audio mapping for a future approved TTS build.
 function setPlaylist(which){
  state.mode=which;
  state.playlist=which==='short'?S.filter(s=>high.includes(s.id)).map(s=>({...s,duration:s.short})):S.map(s=>({...s,duration:s.d}));
  if(!state.playlist.length)throw Error('Playlist empty');
  state.time=0;state.sceneIndex=0;state.lastStamp=0;
  const shortTime=S.filter(s=>high.includes(s.id)).reduce((sum,s)=>sum+s.short,0);
  const fullTime=S.reduce((sum,s)=>sum+s.d,0);
  $('#shortDuration').textContent=`${high.length}컷 · 약 ${Math.floor(shortTime/60)}분 ${Math.round(shortTime%60)}초`;
  $('#fullDuration').textContent=`${S.length}컷 · 약 ${Math.floor(fullTime/60)}분 ${Math.round(fullTime%60)}초`;
 }
 function sceneAt(t){
  const total=totals(state.playlist),time=Math.min(Math.max(0,t),total);
  let start=0;
  for(let i=0;i<state.playlist.length;i++){
   let s=state.playlist[i];if(time<start+s.duration||i===state.playlist.length-1)return {scene:s,index:i,local:Math.max(0,Math.min(time-start,s.duration)),start};
   start+=s.duration;
  }
 }
 function paint(){
  const {scene,index,local}=sceneAt(state.time);
  state.sceneIndex=index;
  const scaled=local*scene.d/scene.duration;
  screen.innerHTML=window.WHY_RENDER(scene,scaled);
  $('#sceneTitle').textContent=`${String(index+1).padStart(2,'0')} · ${scene.title}`;
  $('#clock').textContent=`${dur(state.time)} / ${dur(totals(state.playlist))}`;
  $('#progress').style.width=`${Math.min(100,100*state.time/totals(state.playlist))}%`;
  $('#track').setAttribute('aria-valuenow',String(Math.round(100*state.time/totals(state.playlist))));
  $('#caption').textContent=scene.narration;
 }
 function pause(){state.playing=false;cancelAnimationFrame(state.raf);$('#toggle').textContent='▶';$('#toggle').setAttribute('aria-label','재생');}
 function frame(stamp){
  if(!state.playing)return;
  let dt=state.lastStamp?(stamp-state.lastStamp)/1000:0;
  state.lastStamp=stamp;
  state.time=Math.min(totals(state.playlist),state.time+Math.max(0,Math.min(.12,dt)));
  if(!state.lastPaint||stamp-state.lastPaint>32){paint();state.lastPaint=stamp;}
  if(state.time>=totals(state.playlist)-.0001){
   pause();paint();if(!ending.open)ending.showModal();return;
  }
  state.raf=requestAnimationFrame(frame);
 }
 function play(){
  if(state.time>=totals(state.playlist)-.001)state.time=0;
  if(state.playing)return;
  state.playing=true;state.lastStamp=0;state.lastPaint=0;$('#toggle').textContent='Ⅱ';$('#toggle').setAttribute('aria-label','일시정지');
  state.raf=requestAnimationFrame(frame);
 }
 function jump(t){state.time=Math.max(0,Math.min(t,totals(state.playlist)-.005));state.lastStamp=0;paint();}
 function offset(n){let i=Math.max(0,Math.min(state.playlist.length-1,state.sceneIndex+n));jump(state.playlist.slice(0,i).reduce((a,s)=>a+s.duration,0))}
 function start(which){
  if(choice.open)choice.close();if(ending.open)ending.close();if(scenesDialog.open)scenesDialog.close();
  pause();setPlaylist(which);state.started=true;paint();play();
 }
 $('#selectShort').onclick=()=>start('short');$('#selectFull').onclick=()=>start('full');
 $('#toggle').onclick=()=>state.playing?pause():play();$('#back').onclick=()=>offset(-1);$('#forward').onclick=()=>offset(1);
 $('#sub').onclick=()=>{state.captions=!state.captions;$('#caption').hidden=!state.captions;$('#sub').setAttribute('aria-pressed',String(state.captions));};
 $('#fullscreen').onclick=()=>document.fullscreenElement?document.exitFullscreen?.():document.documentElement.requestFullscreen?.();
 const toSeek=clientX=>{const r=$('#track').getBoundingClientRect(),fraction=Math.max(0,Math.min(1,(clientX-r.left)/r.width));jump(fraction*totals(state.playlist));};
 $('#track').addEventListener('click',e=>toSeek(e.clientX));$('#track').addEventListener('keydown',e=>{if(['ArrowRight','ArrowLeft'].includes(e.key)){e.preventDefault();jump(state.time+(e.key==='ArrowRight'?5:-5));}});
 $('#scenesBtn').onclick=()=>{pause();buildIndex();scenesDialog.showModal();};$('#closeIndex').onclick=()=>scenesDialog.close();
 function buildIndex(){
  const el=$('#sceneOptions');el.innerHTML='';
  let total=0;
  state.playlist.forEach((s,i)=>{
   const start=total;total+=s.duration;
   const b=document.createElement('button');b.innerHTML=`<b>${String(i+1).padStart(2,'0')}</b>${s.title}`;
   b.onclick=()=>{scenesDialog.close();jump(start);play();};el.appendChild(b);
  });
 }
 $('#replay').onclick=()=>start(state.mode);
 $('#choose').onclick=()=>{pause();ending.close();setPlaylist('full');paint();choice.showModal();};
 choice.addEventListener('cancel',e=>e.preventDefault());
 // Modal opens on every non-render load, preserving a still frame until choice.
 const url=new URLSearchParams(location.search),renderMode=url.has('render');
 setPlaylist('full');paint();
 if(!renderMode)choice.showModal();
 $('#shortDuration').textContent=`13컷 · 약 ${Math.floor(S.filter(s=>high.includes(s.id)).reduce((a,s)=>a+s.short,0)/60)}분 ${S.filter(s=>high.includes(s.id)).reduce((a,s)=>a+s.short,0)%60}초`;
 $('#fullDuration').textContent=`18컷 · 약 ${Math.floor(S.reduce((a,s)=>a+s.d,0)/60)}분 ${S.reduce((a,s)=>a+s.d,0)%60}초`;
 let hoverTimer;
 cinema.addEventListener('mousemove',e=>{
  if(e.clientY>innerHeight-160){cinema.classList.add('controls-visible');clearTimeout(hoverTimer);}
  else if(!cinema.contains(document.activeElement)){clearTimeout(hoverTimer);hoverTimer=setTimeout(()=>cinema.classList.remove('controls-visible'),1100);}
 },{passive:true});
 cinema.addEventListener('touchstart',()=>{cinema.classList.add('controls-visible');clearTimeout(hoverTimer);hoverTimer=setTimeout(()=>cinema.classList.remove('controls-visible'),6000)},{passive:true});
 document.addEventListener('keydown',e=>{
  if(choice.open||ending.open||scenesDialog.open)return;
  if(e.key===' '){e.preventDefault();state.playing?pause():play();}
  if(e.key==='ArrowRight')offset(1);if(e.key==='ArrowLeft')offset(-1);
  if(e.key.toLowerCase()==='c')$('#sub').click();
 });
 window.__WHY={state,paint,start,pause,play,jump,sceneAt,total:()=>totals(state.playlist)};
})();
