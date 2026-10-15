/* 마음챙김 Director's Cut — fully vector, deterministic time-based motion renderer.
   Every element is drawn independently as editable SVG. No generative text rasterization. */
const CX={navy:'#092c3b',deep:'#061e2b',ink:'#113548',forest:'#0D625A',mint:'#BAEBD7',jade:'#55DBC0',ocean:'#2973A2',cream:'#F8F7F1',apricot:'#F4AE6A',gray:'#6B8791',line:'#DCE9E6',white:'#FFFFFF'};
const S=window.MINDCARER_SCENES; const TOTAL=S.at(-1).start+S.at(-1).d;
const sv=document.getElementById('stage');
const Q=id=>document.getElementById(id),cl=(x,a=0,b=1)=>Math.max(a,Math.min(b,x));
const smooth=(t,a,b)=>{const v=cl((t-a)/(b-a));return v*v*(3-2*v)};
const out=(t,a,b)=>1-smooth(t,a,b);
const esc=x=>String(x).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;');
const format=s=>String(Math.floor(s/60)).padStart(2,'0')+':'+String(Math.floor(s%60)).padStart(2,'0');
const rr=(x,y,w,h,r=16,fill='white',stroke='',sw=1,other='')=>'<rect x="'+x+'" y="'+y+'" width="'+w+'" height="'+h+'" rx="'+r+'" fill="'+fill+'" '+(stroke?'stroke="'+stroke+'" stroke-width="'+sw+'"':'')+' '+other+'/>';
const cc=(x,y,r,fill='white',other='')=>'<circle cx="'+x+'" cy="'+y+'" r="'+r+'" fill="'+fill+'" '+other+'/>';
const L=(x,y,string,size=22,fill=CX.ink,weight=600,extra='')=>'<text x="'+x+'" y="'+y+'" font-size="'+size+'" font-weight="'+weight+'" fill="'+fill+'" '+extra+'>'+esc(string)+'</text>';
const P=(d,stroke=CX.jade,w=3,extra='')=>'<path d="'+d+'" fill="none" stroke="'+stroke+'" stroke-width="'+w+'" stroke-linecap="round" stroke-linejoin="round" '+extra+'/>';
const G=(body,tx=0,ty=0,opacity=1,extra='')=>'<g transform="translate('+tx+' '+ty+')" opacity="'+cl(opacity)+'" '+extra+'>'+body+'</g>';
const reveal=(body,t,a,d=0.8,dx=0,dy=26,scale=1)=>{const p=smooth(t,a,a+d);return G('<g transform="scale('+(scale-.04*(1-p))+')">'+body+'</g>',dx*(1-p),dy*(1-p),p)};
const progress=(t,a,b)=>smooth(t,a,b);
const spline=(t,a,b,x0,y0,x1,y1)=>{let p=smooth(t,a,b);return [x0+(x1-x0)*p,y0+(y1-y0)*p]};
const stripe=(x,y,w,h,r=6,fill='#E9EFEC')=>rr(x,y,w,h,r,fill);
const pathDraw=(d,len,t,a,b,stroke=CX.jade,width=3,extra='')=>P(d,stroke,width,'stroke-dasharray="'+len+'" stroke-dashoffset="'+(len*(1-smooth(t,a,b)))+'" '+extra);
const badge=(x,y,text,fill='#E4F4EC',fg=CX.forest,w=null)=>G(rr(0,0,w||Math.max(86,text.length*15+35),37,19,fill)+L(17,25,text,15,fg,800),x,y,1);
const wave=(cx,cy,r,t,phase=0)=>'<circle cx="'+cx+'" cy="'+cy+'" r="'+(r+(t*15+phase*20)%26)+'" fill="none" stroke="#91e0c9" stroke-opacity="'+(.35*(1-((t*.3+phase)%1)))+'" stroke-width="2"/>';
const pattern=()=>'<defs>'+
 '<linearGradient id="night" x1="0" x2="1" y1="1" y2="0"><stop stop-color="#061c29"/><stop offset=".58" stop-color="#10394a"/><stop offset="1" stop-color="#0a2d39"/></linearGradient>'+
 '<linearGradient id="tealNight" x1="0" x2="1" y1="1" y2="0"><stop stop-color="#06342f"/><stop offset=".6" stop-color="#0b5a54"/><stop offset="1" stop-color="#093743"/></linearGradient>'+
 '<linearGradient id="paper" x1="0" x2="1" y1="0" y2="1"><stop stop-color="#ffffff"/><stop offset="1" stop-color="#f3f7f3"/></linearGradient>'+
 '<linearGradient id="mintGlow" x1="0" x2="1" y1="0" y2="1"><stop stop-color="#a5e8d0"/><stop offset="1" stop-color="#e8f5ee"/></linearGradient>'+
 '<linearGradient id="orangeGlow" x1="0" x2="1"><stop stop-color="#ffe4bb"/><stop offset="1" stop-color="#fff7e6"/></linearGradient>'+
 '<radialGradient id="orb"><stop stop-color="#3ee6b8" stop-opacity=".26"/><stop offset="1" stop-color="#3ee6b8" stop-opacity="0"/></radialGradient>'+
 '<radialGradient id="orbblue"><stop stop-color="#51c9e0" stop-opacity=".18"/><stop offset="1" stop-color="#51c9e0" stop-opacity="0"/></radialGradient>'+
 '<pattern id="grid" width="42" height="42" patternUnits="userSpaceOnUse"><path d="M42 0H0V42" fill="none" stroke="#C9E5DC" stroke-width=".7" opacity=".25"/></pattern>'+
 '<pattern id="darkgrid" width="53" height="53" patternUnits="userSpaceOnUse"><path d="M53 0H0V53" fill="none" stroke="#9CD8C8" stroke-width=".7" opacity=".10"/></pattern>'+
 '<filter id="shadow" x="-40%" y="-40%" width="190%" height="190%"><feDropShadow dx="0" dy="19" stdDeviation="22" flood-color="#00262a" flood-opacity=".16"/></filter>'+
 '<filter id="dshadow" x="-40%" y="-40%" width="190%" height="190%"><feDropShadow dx="0" dy="21" stdDeviation="20" flood-color="#000c18" flood-opacity=".4"/></filter>'+
 '<filter id="blur"><feGaussianBlur stdDeviation="46"/></filter>'+
 '<style>text{font-family:"Pretendard","Apple SD Gothic Neo","Noto Sans CJK KR",sans-serif;dominant-baseline:alphabetic;letter-spacing:-.45px}</style></defs>';
function stageFrame(dark,id,serial,title,time){
 const light=dark===true;const fg=light?'#bcdcd9':'#607f89',bright=light?'#d2f6ec':'#0d625a';
 let x=rr(0,0,1600,900,0,light?'url(#night)':CX.cream);
 x+=rr(0,0,1600,900,0,light?'url(#darkgrid)':'url(#grid)');
 x+=cc(light?1380:1220,light?120:150,420,'url(#orb)');
 x+=cc(light?100:160,800,320,'url(#orbblue)');
 x+=P('M78 102H1522',light?'#55778a':'#DAE5E0',1);
 x+=L(78,73,'마음챙김',26,bright,850)+L(218,72,'/ MOTION SYSTEM',11,fg,800,'letter-spacing="2.9"');
 x+=L(1522,69,'DIRECTOR’S CUT  ·  '+String(id).padStart(2,'0')+' / 63',14,fg,750,'text-anchor="end" letter-spacing="1"');
 x+=P('M78 818H1522',light?'#3c6172':'#d3e4dc',1);
 x+=L(78,854,'PHARMACY  ·  PEOPLE  ·  PLATFORM',13,fg,750,'letter-spacing="2.2"');
 x+=L(1522,854,serial+'   /   '+title,13,fg,700,'text-anchor="end"');
 x+=rr(78,880,1444,4,2,light?'#224554':'#dceae3')+rr(78,880,1444*cl(time),4,2,light?'#a7f2d6':'#0D625A');
 return x;
}
function scene1(t,d){
 let b=stageFrame(true,1,'01','복잡한 약국 업무',t/d);
 b+=cc(1170,398,382,'url(#orb)')+cc(1180,408,276,'none','stroke="#3D8991" stroke-opacity=".30" stroke-width="1.4"');
 b+=L(84,204,'01  /  THE CHALLENGE',17,'#93d8c8',800,'letter-spacing="2.8"');
 b+=reveal(L(82,318,'복잡한 약국 업무,',70,'#f3f9f8',850),t,.25,.7);
 b+=reveal(L(82,404,'하루의 모든 순간.',70,'#d4f7e8',850),t,.5,.8);
 b+=reveal(L(85,483,'상담 · 고객 · 설계 · 배송 · 정산',25,'#80b7bd',600),t,1.25,.8);
 b+=reveal(rr(85,540,556,84,19,'#164555','#3E777E',1)+L(114,592,'분리된 업무는 더 많은 확인을 요구합니다',22,'#c7e9e0',600),t,4.4,.8);
 // Central workspace, designed as vector, not AI image
 b+=G(rr(758,156,710,551,34,'#123d4a','#43857e',1.3,'filter="url(#dshadow)"')+
      rr(766,166,692,535,26,'#0c303e')+
      rr(784,184,656,490,26,'#153f49','#36687a')+
      L(816,230,'PHARMACY WORKSPACE',16,'#a4dcd2',800,'letter-spacing="2"')+
      P('M816 248H1408','#4f7678',1),0,0,1);
 const cards=[
  ['상담','01','M4 6h16v11H8l-4 3z',833,270],
  ['고객','02','M8 8a3 3 0 1 0 6 0a3 3 0 1 0-6 0M3 19c0-7 16-7 16 0',1095,256],
  ['설계','03','M11 4a5 5 0 0 1 7 7l-6 6a5 5 0 0 1-7-7z',1232,390],
  ['배송','04','M3 7h11v11H3zm11 4h4l3 3v4h-7',852,453],
  ['정산','05','M4 18V9m5 9V5m5 13v-8m5 8V4',1110,522],
  ['문의','06','M3 5h18v14H3zm4 5h10',1253,567]
 ];
 cards.forEach((c,i)=>{
  const a=.9+i*.45,y=c[4]+8*Math.sin(t*.6+i);
  let body=rr(0,0,184,105,19,i%2?'#1f5862':'#1c5058','#387a7b',1.5)+
    badge(13,13,c[1],'#2e6d6b','#d7f7e8',44)+L(18,81,c[0],25,'#f0fbf8',800)+
    '<path d="'+c[2]+'" transform="translate(132 46) scale(1.35)" fill="none" stroke="#7bdbba" stroke-width="2.1" stroke-linecap="round"/>';
  b+=reveal(G(body,c[3],y),t,a,.63,0,35);
 });
 // broken arcs visually communicate fragmentation, not a connected system
 b+=pathDraw('M1027 363Q1055 350 1076 332',70,t,2.2,3.2,'#f0b986',3,'stroke-dasharray="12 20"');
 b+=pathDraw('M998 533Q1055 487 1115 479',150,t,2.8,4.5,'#f0b986',3,'stroke-dasharray="12 20"');
 b+=G(cc(1070,456,6,'#efb77b'),0,0,.5+.5*Math.sin(t*2.5));
 return b;
}
function scene2(t,d){
 let b=stageFrame(false,2,'01','하나의 흐름으로',t/d);
 b+=L(83,185,'02  /  THE CONNECTION',17,CX.forest,800,'letter-spacing="2.8"');
 b+=reveal(L(82,297,'하나의 흐름으로',76,CX.ink,850),t,.1,.75);
 b+=reveal(L(83,381,'연결합니다.',76,CX.forest,850),t,.35,.75);
 b+=reveal(L(86,458,'흩어진 업무가 약국과 약사를',26,CX.gray,550),t,1.3,.65);
 b+=reveal(L(86,498,'중심으로 모이는 순간.',26,CX.gray,550),t,1.55,.65);
 b+=reveal(rr(84,560,474,65,18,'#e4f3eb')+L(110,601,'마음챙김 통합 운영 플랫폼',23,CX.forest,800),t,3.4,.75);
 const mx=1150,my=450;
 b+=cc(mx,my,304,'#d6eee6','opacity=".65"')+cc(mx,my,260,'none','stroke="#86b9b2" stroke-dasharray="5 10" stroke-width="1.4"')+
  cc(mx,my,210,'none','stroke="#7bbbaa" stroke-opacity=".36" stroke-width="1.6"');
 const pts=[['상담',892,188],['고객',1160,155],['문의',1402,292],['설계',1396,601],['배송',1110,708],['정산',850,596]];
 pts.forEach((c,i)=>{
  let k=smooth(t,.5+i*.2,2.3+i*.21),xx=c[1],yy=c[2];
  b+=pathDraw('M'+xx+' '+yy+' Q'+(mx+xx)/2+' '+(my+yy)/2+' '+mx+' '+my,470,t,.45+i*.14,3.15+i*.14,'#51A998',3);
  let p=Math.max(0,cl((t-2.25-i*.12)/1.4)),pos=spline(t,2.25+i*.12,3.4+i*.12,xx,yy,mx,my);
  b+=cc(pos[0],pos[1],k*5,'#f4ac69','opacity="'+(t>2.3?1:0)+'"');
  b+=reveal(G(cc(0,0,48,'#fff','stroke="#CFE5DB" stroke-width="2" filter="url(#shadow)"')+
              L(0,8,c[0],21,CX.forest,800,'text-anchor="middle"'),xx,yy),t,.4+i*.16,.55,0,15);
 });
 b+=cc(mx,my,139,'url(#mintGlow)','filter="url(#shadow)"')+cc(mx,my,107,'#0D625A')+
    cc(mx,my,91,'none','stroke="#5fd7b2" stroke-width="1.8"');
 b+=G(L(0,-12,'약국 · 약사',33,'#fff',850,'text-anchor="middle"')+
      L(0,25,'마음챙김',26,'#B9F4D6',750,'text-anchor="middle"'),mx,my,progress(t,1,1.9));
 b+=wave(mx,my,146,t,.1)+wave(mx,my,152,t,.75);
 return b;
}
function scene3(t,d){
 let b=stageFrame(false,3,'01','전체 서비스 여정',t/d);
 b+=L(85,175,'03  /  END TO END',17,CX.forest,800,'letter-spacing="2.8"');
 b+=reveal(L(84,267,'가입부터 배송까지,',66,CX.ink,850),t,.1,.6);
 b+=reveal(L(84,342,'모든 과정이 이어집니다.',66,CX.forest,850),t,.3,.7);
 b+=reveal(L(88,394,'협력 약국의 시작에서 지속 관리까지, 하나의 여정.',25,CX.gray,560),t,1.1,.7);
 const steps=[['약국 가입','01'],['약사 연결','02'],['고객 등록','03'],['건강 분석','04'],
              ['상담','05'],['맞춤 설계','06'],['조제·배송','07'],['재구독','08']];
 let lines='M160 521H1440Q1490 521 1490 577V615Q1490 661 1440 661H160';
 b+=pathDraw(lines,2820,t,.9,7.65,CX.jade,5);
 b+=P(lines,'#bfdbd4',2,'stroke-dasharray="7 14"');
 steps.forEach((s,i)=>{
  const x=i<4?120+345*i:120+345*(7-i), y=i<4?475:624;
  const revealStart=.8+i*.65;
  const active=t>revealStart;
  const fill=active?(i===0?CX.forest:'#fff'):'#fff';
  b+=reveal(G(
    rr(0,0,320,128,21,fill,active?'#aed9ca':'#d9e5df',1.3,'filter="url(#shadow)"')+
    rr(17,18,61,53,14,i===0?'#387d70':'#E4F5EB')+
    L(48,53,s[1],20,i===0?'#fff':CX.forest,800,'text-anchor="middle"')+
    L(97,54,s[0],27,i===0?'#fff':CX.ink,800)+
    L(98,91,i===7?'지속적인 관리':'운영 프로세스',15,i===0?'#d3eee8':'#7c9997',600)
    ,x,y),t,revealStart,.52,0,25);
  const pulse=(t-revealStart)*1.5;
  if(pulse>0&&pulse<.6)b+=cc(x+36,y+17,18+pulse*38,'none','stroke="#3bb89d" stroke-width="1.4" stroke-opacity="'+(1-pulse/.6)+'"');
 });
 b+=reveal(G(rr(0,0,208,45,20,'#0d625a')+L(104,29,'8-STEP JOURNEY',17,'#fff',800,'text-anchor="middle"'),1290,401),t,2,.7);
 return b;
}
function scene26(t,d){
 let b=stageFrame(true,26,'05','AI 건강 분석',t/d);
 b+=L(80,173,'05  /  HEALTH INTELLIGENCE',17,'#86e3cb',850,'letter-spacing="2.8"');
 b+=reveal(L(80,260,'AI가 정리하고,',66,'#fff',850),t,.1,.65);
 b+=reveal(L(80,335,'판단은 약사가.',66,'#b3f3d7',850),t,.33,.78);
 b+=reveal(L(83,397,'검진 · 복용약 · 영양제 · 문진',24,'#9ac4c6',600),t,1.25,.7);
 b+=reveal(G(rr(0,0,398,89,18,'#184656','#50847d',1)+L(22,33,'임상적 판단을 대체하지 않는',20,'#eaf7f6',750)+L(22,63,'상담 참고자료',20,'#7addbc',750),80,466),t,3.2,.65);
 const docnames=[['건강검진','검진 항목'],['복용약','현재 복용'],['영양제','중복 성분'],['문진','생활습관']];
 docnames.forEach((d0,i)=>{
  if(i<3)b+=reveal(G(rr(0,0,151,39,12,'#1D5662','#3B7778',1)+cc(19,19,5,'#7febc7')+L(33,26,d0[0],17,'#e9f7f4',700),80+(i%2)*169,597+Math.floor(i/2)*53),t,.7+i*.3,.55);
 });
 const x=645,y=153,w=867,h=570;
 b+=reveal(G(rr(0,0,w,h,30,'#f9fcfa','#b5dad2',1.8,'filter="url(#dshadow)"')+
   rr(0,0,w,70,30,'#e6f3ed')+rr(0,40,w,30,0,'#e6f3ed')+
   L(37,47,'AI HEALTH INSIGHT',23,CX.forest,850,'letter-spacing="1.3"')+
   badge(w-198,18,'약사 검토 필요','#fff','#2c7a72',175),x,y),t,.3,.85,0,30);
 b+=reveal(G(L(0,0,'고객 건강정보 요약',32,CX.ink,850)+L(0,40,'검토가 필요한 항목만 명확하게',19,CX.gray,500),x+39,y+136),t,.9,.65);
 const items=[['01','복용정보 통합','자료 간 일치 여부 확인',.83,'#39a797'],['02','성분 중복 검토','기존 제품과 신규 구성 대조',.62,'#eda45b'],['03','상담 참고사항','생활습관 및 복용 목적 확인',.76,'#4b94b0']];
 items.forEach((it,i)=>{
  const by=y+238+i*92,p=smooth(t,1.6+i*.65,2.75+i*.75);
  b+=reveal(G(rr(0,0,785,80,16,'#fff','#e3efea',1)+
    rr(16,16,50,49,13,i===1?'#fff0df':'#e5f5eb')+
    L(41,48,it[0],18,i===1?'#a96a25':CX.forest,800,'text-anchor="middle"')+
    L(84,31,it[1],24,CX.ink,800)+L(84,59,it[2],17,CX.gray,550)+
    rr(605,28,138,8,4,'#e9f0ed')+rr(605,28,138*it[3]*p,8,4,it[4]),x+39,by),t,1.35+i*.52,.65);
 });
 b+=reveal(G(rr(0,0,304,52,15,CX.forest)+L(152,34,'약사 검토로 연결',21,'#fff',800,'text-anchor="middle"'),x+530,y+502),t,5.3,.75);
 [0,1,2].forEach((i)=>{let q=smooth(t,2+i*.26,4.3+i*.26),v=spline(t,2+i*.26,4.2+i*.26,450,590-i*40,x+22,y+282);b+=cc(v[0],v[1],5,'#f6bc78','opacity="'+(q<1?.85:0)+'"');});
 return b;
}
function scene34(t,d){
 let b=stageFrame(false,34,'07','개인 맞춤 설계',t/d);
 b+=L(83,169,'07  /  PERSONALIZED DESIGN',17,CX.forest,850,'letter-spacing="2.8"');
 b+=reveal(L(82,247,'건강정보에서',63,CX.ink,850),t,.1,.7);
 b+=reveal(L(82,319,'맞춤 복용 설계까지.',63,CX.forest,850),t,.37,.76);
 b+=reveal(L(83,375,'약사가 제품 구성과 복용 시간을 함께 검토합니다.',24,CX.gray,560),t,1.25,.65);
 b+=reveal(G(rr(0,0,575,369,25,'#fff','#d5e6de',1.4,'filter="url(#shadow)"')+
   L(28,48,'제품 선택',27,CX.ink,850)+badge(400,17,'약사 검토','#e4f5ee',CX.forest,150)+
   P('M27 68H547','#d9e9e2',1),76,420),t,.3,.7);
 const colors=['#d8f1e2','#dbe8f5','#fff0df'],names=['제품 A','제품 B','제품 C'],spec=['구성 확인','복용 목적','시간대 확인'];
 names.forEach((name,i)=>{
  let x=96,y=514+i*87;
  b+=reveal(G(rr(0,0,540,77,14,i%2?'#F7FBFD':'#f5faf7','#e3ece6',1)+
      rr(13,11,55,55,14,colors[i])+
      cc(40,32,11,i===2?'#df9b58':i===1?'#4e8ebf':'#218e73')+
      P('M38 22v17', '#fff',2)+
      L(85,31,name,22,CX.ink,850)+L(85,58,spec[i],16,CX.gray,600)+
      badge(398,20,t>2.6+i*.6?'선택됨':'선택',t>2.6+i*.6?'#D9F1E6':'#F0F2F0',CX.forest,115),x,y),t,.95+i*.55,.55);
 });
 b+=reveal(G(rr(0,0,690,538,25,'#fff','#cee4dc',1.5,'filter="url(#shadow)"')+
   rr(0,0,690,70,25,'#e7f4ef')+rr(0,44,690,26,0,'#e7f4ef')+
   L(32,46,'복용 스케줄',28,CX.ink,850)+badge(530,17,'고객 예시 A','#fff',CX.forest,136),792,188),t,.5,.7);
 const times=[['아침','08:00',0],['점심','12:30',1],['저녁','19:00',2]];
 times.forEach((a,i)=>{
  const x=818+i*219,y=294;
  b+=reveal(G(rr(0,0,204,341,18,i===0?'#E8F6EF':i===1?'#ECF5FA':'#FFF6E9','#d9e8e3',1.2)+
   cc(102,66,32,'#fff')+
   L(102,73,i===0?'☀':i===1?'◐':'☾',33,i===1?CX.ocean:i===2?'#ac7535':CX.forest,750,'text-anchor="middle"')+
   L(102,131,a[0],28,CX.ink,850,'text-anchor="middle"')+
   L(102,161,a[1],15,CX.gray,600,'text-anchor="middle"')+
   P('M22 192H182','#c7dcd3',1)+
   rr(25,219,154,66,14,'#fff','#dcebe5',1)+
   L(102,259,t>4.1+i*.7?names[i]:'복용 구성',21,t>4.1+i*.7?CX.forest:'#9aaeb0',780,'text-anchor="middle"')+
   L(102,312,t>5.9?'검토 반영':'약사 검토',16,CX.gray,600,'text-anchor="middle"'),x,y),t,1.5+i*.33,.6);
 });
 for(let i=0;i<3;i++){
  const step=smooth(t,2.6+i*.77,4.2+i*.77);
  const pos=spline(t,2.6+i*.77,4.2+i*.77,620,560+i*42,893+i*219,525);
  if(step>0&&step<1)b+=G(rr(-45,-19,90,37,16,i===1?'#cde7f2':'#B3E8D3')+L(0,7,names[i],16,CX.forest,800,'text-anchor="middle"'),pos[0],pos[1],Math.sin(step*Math.PI));
 }
 b+=reveal(G(rr(0,0,690,56,14,CX.forest)+L(345,37,'약사가 최종 검토하는 개인별 맞춤 구성',21,'#fff',750,'text-anchor="middle"'),792,674),t,6.6,.65);
 return b;
}
function scene45(t,d){
 let b=stageFrame(true,45,'08','ATC · 조제 데이터',t/d);
 b+=L(80,172,'08  /  DISPENSING DATA',17,'#7ddcc3',850,'letter-spacing="2.8"');
 b+=reveal(L(79,261,'데이터를 확인하고,',63,'#fff',850),t,.1,.7);
 b+=reveal(L(79,337,'약사가 확정합니다.',63,'#a7f5d7',850),t,.4,.7);
 b+=reveal(L(82,397,'제품과 복용 스케줄을 한눈에 검토',23,'#9ac3c5',560),t,1.25,.7);
 b+=reveal(G(rr(0,0,410,80,19,'#194b54','#4b8f80',1)+
    L(22,34,'ATC 데이터 미리보기',21,'#f0f7f2',750)+
    L(22,60,'예시 정보 · 약사 확인 필요',17,'#83c5b3',600),80,463),t,3,.7);
 const bx=561,by=159,bw=961,bh=566;
 b+=reveal(G(rr(0,0,bw,bh,27,'#f9fcfa','#a7dbcc',1,'filter="url(#dshadow)"')+
    rr(0,0,bw,65,27,'#E2F3EA')+rr(0,41,bw,24,0,'#E2F3EA')+
    L(35,43,'ATC  ·  복용 스케줄 검토',24,CX.forest,850)+badge(780,15,'REVIEW','#fff',CX.forest,136),bx,by),t,.36,.78);
 const day=['월','화','수','목','금','토','일'];
 day.forEach((nm,i)=>b+=reveal(G(L(0,0,nm,18,CX.gray,800,'text-anchor="middle"'),bx+192+i*100,by+128),t,.85+i*.09,.38));
 const rows=[['아침',0],['점심',1],['저녁',2]];
 rows.forEach((rw,r)=>{
  const yy=by+146+r*103;
  b+=reveal(G(L(0,33,rw[0],22,CX.ink,850)+L(0,63,'0'+(r+1),14,CX.gray,500),bx+42,yy),t,1.4+r*.27,.55);
  day.forEach((_,i)=>{
    const x=bx+151+i*100,y=yy-8;
    b+=reveal(G(rr(0,0,83,77,13,(r===0&&i<4)?'#e5f5eb':(r===2&&i>3)?'#e8f3fa':'#f2f7f4','#dbe8e1',1)+
    (t>2.1+i*.19+r*.15&&((i+r)%3!==1)?cc(42,37,12,r===2?'#5eacc0':'#23907f'):'')+
    ((i+r)%3!==1&&t>4?L(42,42,'✓',15,'#fff',900,'text-anchor="middle"'):''),x,y),t,1.55+i*.13+r*.18,.4);
  });
 });
 b+=reveal(G(rr(0,0,482,65,15,'#D9F1E6')+
  L(29,40,'✓',28,CX.forest,900)+L(71,42,'약사 검토 후 확정',24,CX.forest,850),bx+430,by+470),t,5.8,.75);
 b+=pathDraw('M471 537Q520 537 558 537',110,t,3.8,5.5,'#54d8bc',4);
 b+=cc(471+88*smooth(t,3.8,5.5),537,7,'#ffba76','opacity="'+(t>3.8&&t<5.6?1:0)+'"');
 return b;
}