(function ambientModule(){
 let context=null,groups=[],muted=false;
 function start(){
  if(!context){
   const AC=window.AudioContext||window.webkitAudioContext;
   if(!AC)return;
   context=new AC();
   [55,82.41,110].forEach((f,i)=>{const o=context.createOscillator(),g=context.createGain();o.type=i===2?"triangle":"sine";o.frequency.value=f;g.gain.value=.0001;o.connect(g).connect(context.destination);o.start();groups.push({o,g,base:f,weight:[.016,.008,.003][i]})});
  }
  context.resume().catch(()=>{});
 }
 function update(){
  if(!context)return;
  const q=window.__WHY?.state;if(!q)return;
  const id=q.playlist[q.sceneIndex]?.id||1,level=muted||!q.playing?0:id===7?.08:id>=8?1:.58;
  groups.forEach(z=>{z.g.gain.setTargetAtTime(z.weight*level,context.currentTime,.4);z.o.frequency.setTargetAtTime(z.base*(id>=8?1.10:1),context.currentTime,.8)});
 }
 ["#selectShort","#selectFull","#replay"].forEach(x=>document.querySelector(x)?.addEventListener("click",start));
 const button=document.querySelector("#ambience");if(button)button.addEventListener("click",()=>{muted=!muted;button.classList.toggle("off",muted);button.title=muted?"시네마틱 음향 켜기":"시네마틱 음향 끄기";update()});
 setInterval(update,330);
})();