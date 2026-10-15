/* Full story timeline · 63 narrated scenes / 21 highlights / accessible navigation */
const $=id=>document.getElementById(id.startsWith('#')?id.slice(1):id);
const audio=$('voice'),srcPath='./audio/',viewport=$('stageFrame');
const sceneData=window.MINDCARER_SCENES,chapterNames=window.MINDCARER_CHAPTERS;
let mode='all',playlist=[],totalTime=0,playing=false,globalTime=0,sceneIndex=-1;
let baseTime=0,baseClock=0,isMuted=false,showSub=false,currentAudioScene=null;
let loadToken=0,previousChapter=0,ready=true;
// Visual animation runs independently from narration. Browsers may forbid audio
// until the viewer explicitly interacts, even when animation may autoplay.
let audioPlayPending=false,voiceUserGesture=false;
function showAudioEnable(){const e=$('#autoplayVoiceHint');if(e)e.hidden=false;}
function hideAudioEnable(){const e=$('#autoplayVoiceHint');if(e)e.hidden=true;}
function requestNarration(){
 if(!playing||isMuted||audioPlayPending||!audio.paused)return;
 audioPlayPending=true;
 let promise;
 try{promise=audio.play()}catch(e){promise=Promise.reject(e)}
 Promise.resolve(promise).then(()=>{
  // Some browsers reset currentTime to zero when playback is newly unlocked.
  // Seek after the play promise resolves, keeping narration at the current cut.
  if(playing&&!isMuted&&audio.readyState>=1){
   const {s,local}=locate(globalTime);
   if(currentAudioScene===s.id&&local<s.voice&&
      Math.abs(audio.currentTime-local)>0.35){
    try{audio.currentTime=Math.min(local,Math.max(0,s.voice-.03))}catch(e){}
   }
  }
 }).catch(e=>{
  if(e?.name==='NotAllowedError'){
   // Continue playing the visual timeline; show an explicit, accessible
   // one-tap action to allow sound. Do not retry forbidden audio every frame.
   isMuted=true;audio.muted=true;audio.pause();
   $('#muted').textContent='✕';$('#muted').title='음성 켜기';
   showAudioEnable();
  }
 }).finally(()=>{audioPlayPending=false});
}

const cutID=n=>String(n).padStart(2,'0');
const fmt=n=>String(Math.floor(n/60)).padStart(2,'0')+':'+String(Math.floor(n%60)).padStart(2,'0');
function buildPlaylist(which='all'){
 mode=which;
 const selected=sceneData.filter(s=>which==='all'||s.highlight);
 let offset=0;
 playlist=selected.map(s=>{const o={...s,start:offset};offset+=s.d;return o;});
 totalTime=Number(offset.toFixed(3));
 sceneIndex=-1;
 $('#seek').max=totalTime;
 $('#mode').value=mode;
 buildChapters();
 globalTime=0;
 seek(0,true);
}
function locate(t){
 const time=cl(t,0,totalTime-.001);
 let lo=0,hi=playlist.length-1;
 while(lo<hi){const mid=(lo+hi)>>1;if(time>=playlist[mid].start+playlist[mid].d)lo=mid+1;else hi=mid}
 return {s:playlist[lo],ix:lo,local:time-playlist[lo].start,t:time};
}
function buildChapters(){
 const chapters=[...new Set(playlist.map(s=>s.chapter))];
 $('#chapters').innerHTML=chapters.map(ch=>'<option value="'+ch+'">'+cutID(ch)+' · '+chapterNames[ch]+'</option>').join('');
 const g=$('#chapterTrack');g.innerHTML='';
 for(const ch of chapters){
  const first=playlist.find(s=>s.chapter===ch);
  const sec=playlist.filter(s=>s.chapter===ch).reduce((a,s)=>a+s.d,0);
  const el=document.createElement('button');el.type='button';el.title='CH '+ch+' · '+chapterNames[ch];el.style.flex=sec;
  el.innerHTML='<span class="played" style="width:0%"></span>';
  el.onclick=()=>seek(first.start);
  el.dataset.ch=ch;g.append(el);
 }
}
function render(t){
 if(!ready||!playlist.length)return;
 let {s,ix,local,t:now}=locate(t);
 if(sceneIndex!==ix){
  sceneIndex=ix;
  $('#nowTitle').textContent=cutID(s.id)+' · '+s.name;
  $('#chapterLabel').textContent=cutID(s.chapter)+' / '+chapterNames[s.chapter];
  $('#chapters').value=String(s.chapter);
 }
 let svg=renderCompleteScene(s,local);
 // 240 ms color-matched closing cover: smooth scene change rather than hard cut
 const cover=smooth(local,s.d-.23,s.d);
 if(cover>.001)svg+=rr(0,0,1600,900,0,(darkCuts.has(s.id)||[1,26,45,61,63].includes(s.id))?'#081f2b':'#f8f7f1','','','opacity="'+cover+'"');
 $('#stage').innerHTML=svg;
 // v6.1: SVG connection paths go behind foreground circles, devices and labels.
 if(typeof polishSvgLayers==='function')polishSvgLayers($('#stage'));
 if(showSub){
  $('#captionText').textContent=s.narration;
 }
 $('#clock').textContent=fmt(now)+' / '+fmt(totalTime);
 $('#seek').value=now;
 const track=$('#chapterTrack');
 for(const ch of track.children){
   const id=Number(ch.dataset.ch),subset=playlist.filter(x=>x.chapter===id);
   const start=subset[0].start,end=subset.at(-1).start+subset.at(-1).d;
   const pc=cl((now-start)/(end-start))*100;
   ch.querySelector('.played').style.width=pc.toFixed(1)+'%';
   ch.dataset.active=(s.chapter===id);
 }
 globalTime=now;return {id:s.id,chapter:s.chapter,index:ix,local,time:now,total:totalTime,duration:s.d};
}
function syncAudio(force=false){
 if(!playlist.length)return;
 const {s,local}=locate(globalTime);
 const url=srcPath+'CUT_'+cutID(s.id)+'.mp3';
 const changed=currentAudioScene!==s.id;
 const token=changed?++loadToken:loadToken;
 if(changed){
  currentAudioScene=s.id;
  audio.pause();
  audio.src=url;
  audio.load();
  const desired=Math.min(local,s.voice-.03);
  audio.addEventListener('loadedmetadata',()=>{
    if(token!==loadToken||currentAudioScene!==s.id)return;
    if(desired>0){try{audio.currentTime=desired}catch(e){}}
    if(playing&&!isMuted&&local<s.voice)requestNarration();
  },{once:true});
 }else if(force&&audio.readyState>=1){
  const position=Math.min(local,s.voice);
  try{audio.currentTime=position}catch(e){}
 }
 audio.muted=isMuted;
 if(!playing||isMuted||local>=s.voice)audio.pause();
 else if(!changed&&audio.paused)requestNarration();
}
function frame(now){
 if(!playing)return;
 const t=baseTime+(now-baseClock)/1000;
 if(t>=totalTime-.015){
  render(totalTime-.001);playing=false;audio.pause();$('#play').textContent='▶ 다시 재생';
  if(!document.body.classList.contains('render')&&!$('#endDialog').open){$('#endDialog').showModal()}
  return;
 }
 render(t);syncAudio();requestAnimationFrame(frame);
}
function togglePlay(){
 if(playing){playing=false;audio.pause();$('#play').textContent='▶ 재생';return}
 if(globalTime>=totalTime-.05)render(0);
 playing=true;baseTime=globalTime;baseClock=performance.now();
 syncAudio(true);$('#play').textContent='❚❚ 일시정지';requestAnimationFrame(frame);
}
function seek(t,force=false){
 render(cl(t,0,totalTime-.001));syncAudio(force||true);
 if(playing){baseTime=globalTime;baseClock=performance.now();syncAudio(true)}
}
function jumpCut(next){
 const dest=cl(sceneIndex+next,0,playlist.length-1),t=playlist[Math.round(dest)].start;
 seek(t);
}
$('#play').onclick=togglePlay;
$('#prev').onclick=()=>jumpCut(-1);
$('#next').onclick=()=>jumpCut(1);
$('#muted').onclick=()=>{
 voiceUserGesture=true;
 isMuted=!isMuted;audio.muted=isMuted;
 $('#muted').textContent=isMuted?'✕':'◖))';$('#muted').title=isMuted?'음성 켜기':'음성 끄기';
 if(isMuted)audio.pause();
 else {hideAudioEnable();syncAudio(true);requestNarration()}
};
const voiceHint=$('#autoplayVoiceHint');
if(voiceHint)voiceHint.onclick=()=>{if(isMuted)$('#muted').click();else hideAudioEnable()};
$('#seek').oninput=e=>seek(Number(e.target.value),true);
$('#mode').onchange=e=>{
 playing=false;audio.pause();$('#play').textContent='▶ 재생';
 buildPlaylist(e.target.value);
};
$('#chapters').onchange=e=>{
 const first=playlist.find(s=>s.chapter===Number(e.target.value));if(first)seek(first.start);
};
$('#fullscreen').onclick=()=>{
 const el=$('#stageFrame');
 if(document.fullscreenElement)document.exitFullscreen();
 else el.requestFullscreen?.();
};
$('#captionsBtn').onclick=()=>{
 showSub=!showSub;$('#captionText').hidden=!showSub;$('#captionsBtn').setAttribute('aria-pressed',String(showSub));
 $('#captionsBtn').style.background=showSub?'#285f55':'';
 if(showSub)render(globalTime);
};
function buildIndex(){
 const el=$('#sceneLinks');el.innerHTML='';
 const chapters=[...new Set(sceneData.map(s=>s.chapter))];
 for(const ch of chapters){
  const h=document.createElement('h3');h.className='chapterTitle';h.textContent=cutID(ch)+' · '+chapterNames[ch];el.append(h);
  const grid=document.createElement('div');grid.className='cutgrid';
  for(const s of sceneData.filter(s=>s.chapter===ch)){
   const bt=document.createElement('button');bt.type='button';
   const num=document.createElement('span');num.className='num';num.textContent=cutID(s.id);
   const txt=document.createElement('span');txt.textContent=s.name;
   const dur=document.createElement('span');dur.className='dur';dur.textContent=s.d.toFixed(1)+'s';
   bt.append(num,txt,dur);
   bt.onclick=()=>{
    if(mode==='highlights'&&!s.highlight){playing=false;audio.pause();buildPlaylist('all')}
    const dst=playlist.find(x=>x.id===s.id);
    $('#sceneDialog').close();if(dst)seek(dst.start);
   };
   grid.append(bt);
  }
  el.append(grid);
 }
}
$('#sceneListBtn').onclick=()=>$('#sceneDialog').showModal();
$('#closeDialog').onclick=()=>$('#sceneDialog').close();
$('#sceneDialog').addEventListener('click',e=>{if(e.target.id==='sceneDialog')$('#sceneDialog').close()});
document.addEventListener('keydown',e=>{
 if($('#sceneDialog').open||e.target.matches('input,select,button,textarea'))return;
 if(['Space','ArrowRight','ArrowLeft','KeyF','KeyM'].includes(e.code)){
  e.preventDefault();
  if(e.code==='Space')togglePlay();
  if(e.code==='ArrowRight')jumpCut(1);
  if(e.code==='ArrowLeft')jumpCut(-1);
  if(e.code==='KeyF')$('#fullscreen').click();
  if(e.code==='KeyM')$('#muted').click();
 }
});
window.__SET_TIME=t=>render(t);
window.__STATE=()=>({
 mode,total:totalTime,scenes:playlist.map(s=>({id:s.id,chapter:s.chapter,start:s.start,duration:s.d,voice:s.voice,name:s.name}))
});
window.__SWITCH_MODE=which=>{playing=false;audio.pause();buildPlaylist(which)};
window.__PLAY=togglePlay;
buildPlaylist(new URLSearchParams(location.search).get('mode')==='highlights'?'highlights':'all');buildIndex();
if(new URLSearchParams(location.search).has('render'))document.body.classList.add('render');
// Choice-first experience: always keep the first scene still until the
// viewer explicitly selects one of the two narrated playlists.
const startDialog=$('#startDialog'),endDialog=$('#endDialog');
const shortDuration=sceneData.filter(s=>s.highlight).reduce((acc,s)=>acc+s.d,0);
const fullDuration=sceneData.reduce((acc,s)=>acc+s.d,0);
$('#highlightsDuration').textContent='21컷 · 약 '+Math.floor(shortDuration/60)+'분 '+Math.round(shortDuration%60)+'초';
$('#allDuration').textContent='63컷 · 약 '+Math.floor(fullDuration/60)+'분 '+Math.round(fullDuration%60)+'초';
function playSelection(choice){
 // This runs *inside* the actual user click, so the narration play() call
 // can use browser media activation (also on mobile Safari).
 voiceUserGesture=true;
 if(startDialog.open)startDialog.close();
 if(endDialog.open)endDialog.close();
 document.querySelector('.shell').classList.remove('start-pending');
 playing=false;audio.pause();isMuted=false;audio.muted=false;
 $('#muted').textContent='◖))';$('#muted').title='음성 끄기';hideAudioEnable();
 buildPlaylist(choice);
 togglePlay();
 // Immediately request the audio while the click activation is in effect.
 requestNarration();
}
$('#startHighlights').onclick=()=>playSelection('highlights');
$('#startAll').onclick=()=>playSelection('all');
$('#replayCurrent').onclick=()=>playSelection(mode);
$('#chooseAgain').onclick=()=>{
 endDialog.close();playing=false;audio.pause();
 buildPlaylist('all');document.querySelector('.shell').classList.add('start-pending');
 startDialog.showModal();
};
startDialog.addEventListener('cancel',event=>event.preventDefault());
const isRender=new URLSearchParams(location.search).has('render');
if(!isRender){
 document.querySelector('.shell').classList.add('start-pending');
 startDialog.showModal();
}