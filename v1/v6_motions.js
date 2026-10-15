/* 마음챙김 v6 — individual motion systems for the remaining 47 scenes.
   Pure SVG / time-deterministic motion. No fake live API results. Original voice timing retained.
   Each of the 47 scenes has a dedicated visual composition registered below. */
const V6_PALETTE={forest:'#0D625A',ink:'#153D4C',sage:'#6F9F8B',mint:'#DCEFE4',cream:'#F9F8F4',beige:'#EAE0D8',peach:'#E5B383',aqua:'#66C6AB',blue:'#6D9DBC',white:'#FFFFFF',pale:'#EDF6EE'};
const V6_E=V6_PALETTE;
function v6Base(s,t,dark=false,subtitle=''){
 let b=stageFrame(dark,s.id,s.chapter,s.name,t/s.d);
 const fg=dark?'#F3FCF6':V6_E.ink;
 b+=reveal(brandMark(84,64,68,.92),t,.0,.65);
 const heading=koreanText(s.name,185,127,1280,58,fg,850,1.16,2);
 b+=reveal(heading.svg,t,.14,.66);
 const y=191+(heading.lines.length-1)*65;
 b+=reveal(koreanText(subtitle||s.caption,190,y,1150,23,dark?'#B1D9CD':'#5F8177',590,1.35,2).svg,t,.60,.55);
 return b;
}
function v6Pct(t,a=.5,b=4.9){return smooth(t,a,b)}
function v6Label(x,y,string,w=240,size=24,fg=V6_E.ink,anchor='middle',weight=800){
 return koreanText(string,x,y,w,size,fg,weight,1.18,2,anchor).svg;
}
function v6Line(x1,y1,x2,y2,t,a=1,b=4,color=V6_E.aqua,width=5){
 return pathDraw('M'+x1+' '+y1+'L'+x2+' '+y2,Math.hypot(x2-x1,y2-y1)+12,t,a,b,color,width);
}
function v6TrackCircle(x,y,r,t,a,b,color=V6_E.aqua,width=15){
 const len=2*Math.PI*r;return cc(x,y,r,'none','stroke="#C3DBD0" stroke-width="'+width+'" opacity=".45"')+
 cc(x,y,r,'none','stroke="'+color+'" stroke-width="'+width+'" stroke-linecap="round" stroke-dasharray="'+(len*smooth(t,a,b))+' '+len+'" transform="rotate(-90 '+x+' '+y+')"');
}
function v6Node(x,y,icon,label,t,i=0,opts={}){
 const dark=!!opts.dark,c=opts.color||(dark?'#A9E5D2':V6_E.forest);
 const size=opts.size||70,inner=opts.fill||(dark?'#1D514B':'#E8F5EC');
 const content=cc(0,0,size,inner,'stroke="'+(dark?'#4BA890':'#ADD8C4')+'" stroke-width="2" filter="url(#shadow)"')+
 iconAt(icon,-size*.45,-size*.45,size*.9,c,1.7)+
 v6Label(0,size+(opts.labelOffset||39),label,Math.max(180,size*3),opts.labelSize||23,dark?'#EFFBF7':V6_E.ink,'middle');
 return reveal(G(content,x,y),t,.6+i*.45,.68);
}
function v6TextPanel(x,y,title,desc,t,i=0,opt={}){
 const w=opt.w||365,h=opt.h||170,dark=!!opt.dark;
 const fill=dark?'#1A4B45':opt.fill||'#FFFFFF';
 let content=rr(0,0,w,h,opt.radius||30,fill,dark?'#4A8D7B':'#D9E9DE',1.2,'filter="url(#shadow)"')+
  cc(51,51,33,dark?'#347A67':'#E4F3E9')+
  iconAt(opt.icon||meaningIcon(title),30,29,43,dark?'#D6FAE9':V6_E.forest,1.65)+
  koreanText(title,103,62,w-132,25,dark?'#F1FCF7':V6_E.ink,840,1.1,2).svg;
 if(desc)content+=koreanText(desc,29,116,w-54,19,dark?'#AAD4C9':'#789087',600,1.2,2).svg;
 return reveal(G(content,x,y),t,.55+i*.45,.72);
}
function v6Ribbon(path,t,a=1,b=5,color=V6_E.forest,width=12){
 return P(path,'#D1E4D8',width+5,'opacity=".7"')+
 pathDraw(path,3300,t,a,b,color,width);
}
function v6Dot(x,y,t,a=.5,r=15,color=V6_E.forest){
 const p=smooth(t,a,a+.55);return cc(x,y,r*p,color);
}
function v6Text(x,y,text,size=22,color=V6_E.ink,weight=800,width=320,anchor='start'){
 return koreanText(text,x,y,width,size,color,weight,1.2,3,anchor).svg;
}
function v6Badge(x,y,text,t,a=3,opt={}){
 return reveal(G(rr(0,0,opt.w||290,56,28,opt.dark?'#DAF2E2':'#E8F6EC')+
 iconAt(opt.icon||'check',18,13,31,V6_E.forest)+
 v6Text(65,37,text,21,V6_E.forest,850,(opt.w||290)-78),x,y),t,a,.75);
}
function v6Wave(x,y,r,t){
 let v='';
 for(let i=0;i<3;i++){let a=(t*.22+i*.34)%1;v+=cc(x,y,r+96*a,'none','stroke="#7BCEAC" stroke-width="2.2" opacity="'+(.25*(1-a))+'"');}
 return v;
}
function v6SizeRect(x,y,w,h,c,r=22){return rr(x,y,w,h,r,c)}
function v6DotsBetween(x1,y1,x2,y2,t,a=.6,b=5,n=18){
 let k='';
 for(let i=0;i<n;i++){
  const p=(i+1)/n,f=smooth(t,a+i*.08,b+i*.08);
  k+=cc(x1+(x2-x1)*p,y1+(y2-y1)*p,5*f,'#68C5AA');
 }
 return k;
}
function scene01(t,s){
 let b=v6Base(s,t,true,'상담 · 고객 관리 · 설계 · 배송 · 정산, 동시에 진행되는 약국의 하루');
 const blocks=[
  ['상담','chat',240,386,0],['고객 관리','users',640,330,1],['영양제 설계','capsule',1110,380,2],
  ['조제·배송','truck',405,652,3],['정산','wallet',986,664,4]
 ];
 blocks.forEach(z=>{const [name,ic,x,y,i]=z;
  const drift=16*Math.sin(t*.8+i*.9);
  b+=v6Node(x,y+drift,ic,name,t,i,{dark:true,size:i===2?91:76});
  if(i!==2)b+=pathDraw('M'+x+' '+y+'Q'+(x+850)/2+' '+(y+467)/2+' 850 490',880,t,2+i*.2,4+i*.2,'#89BAA6',2.4,'stroke-dasharray="12 18"');
 });
 b+=reveal(G(cc(0,0,139,'#2C6E5F')+
  iconAt('settings',-56,-56,112,'#D4F7E6')+
  v6Label(0,106,'약국의 하루',305,27,'#EAFAF2'),850,488),t,2.5,1.0);
 return b;
}
function scene02(t,s){
 let b=v6Base(s,t,false,'약국과 약사를 중심으로 서로 다른 업무가 하나의 흐름으로 연결됩니다');
 const center=[843,508],pts=[
  ['상담','chat',388,316],['고객 관리','users',837,315],['설계','capsule',1286,315],
  ['정산','wallet',413,688],['배송','truck',842,735],['약국 관리','pharmacy',1280,679]
 ];
 b+=cc(center[0],center[1],267,'#E4F1E7')+cc(center[0],center[1],216,'none','stroke="#8DC7B1" stroke-dasharray="7 11" stroke-width="3"');
 pts.forEach((p,i)=>{
  b+=v6Line(p[2],p[3],center[0],center[1],t,.6+i*.24,2.8+i*.24,V6_E.sage,4);
  b+=v6Node(p[2],p[3],p[1],p[0],t,i,{size:60});
  let q=smooth(t,2+i*.21,3.5+i*.21);b+=cc(p[2]+(center[0]-p[2])*q,p[3]+(center[1]-p[3])*q,7,'#E4AA74','opacity="'+(1-q)+'"');
 });
 b+=reveal(G(cc(0,0,148,'#0D625A')+brandMark(-93,-116,186,.97)+
 v6Label(0,111,'운영 허브',290,25,'#EAFBF2'),center[0],center[1]),t,1.4,1);
 b+=v6Wave(center[0],center[1],150,t);
 return b;
}
function scene04(t,s){
 let b=v6Base(s,t,false,'협력 센터에서 약국의 첫 파트너 신청을 시작합니다');
 const x=248,y=324;
 b+=reveal(G(cc(0,0,176,'#E4F2E8')+iconAt('pharmacy',-81,-81,162,V6_E.forest)+
  v6Label(0,236,'협력 약국 신청',440,30),x+142,y+177),t,.35,.8);
 b+=v6Ribbon('M584 498C743 412 839 407 1048 503',t,1.1,4.1,V6_E.sage,7);
 b+=reveal(G(rr(0,0,430,395,46,'#FFFFFF','#C5DFD1',2,'filter="url(#shadow)"')+
  iconAt('clipboard',157,36,117,V6_E.forest)+
  v6Label(215,206,'약국 기본 정보',350,32)+
  P('M67 260H362','#D5E9DA',4)+
  v6Label(213,306,'약국명 · 담당자 · 연락처',382,22,V6_E.sage)+
  rr(73,325,284,45,23,'#E3F3E9'),1007,306),t,1.45,.85);
 b+=v6Badge(594,698,'STEP 1 · 사전 신청',t,3.6,{w:400,icon:'clipboard'});
 return b;
}
function scene05(t,s){
 let b=v6Base(s,t,false,'신청 내용을 입력하고 다시 확인하는 사전 신청 단계입니다');
 let y=322;
 const labels=['약국명','대표자','연락처','기본 등록 정보'];
 labels.forEach((name,i)=>{
  const x=228+i*346,yy=y+68*Math.sin(i*.7);
  b+=reveal(G(rr(0,0,303,292,32,'#FFFFFF','#CFDECF',1.6,'filter="url(#shadow)"')+
   cc(150,75,43,'#E7F3E8')+iconAt(i===0?'pharmacy':i===1?'user':i===2?'phone':'document',118,43,64,V6_E.forest)+
   v6Label(151,170,name,266,29)+
   rr(48,203,207,5,3,'#CEE6D5')+
   rr(48,203,207*smooth(t,1+i*.7,3+i*.7),5,3,V6_E.forest)+
   v6Text(55,248,t>2+i*.65?'입력 내용 확인':'정보 입력 중',18,V6_E.sage,650,232),x,yy),t,.55+i*.5,.74);
 });
 b+=v6Ribbon('M231 676Q824 770 1413 656',t,1.5,5.3,'#51AB92',6);
 b+=v6Badge(626,718,'사전 신청 · 확인 단계',t,4.1,{w:401});
 return b;
}
function scene06(t,s){
 let b=v6Base(s,t,false,'정식 가입 안내에 따라 필수 서류를 제출하고 약국 정보를 확인합니다');
 const center=[799,505],spec=[
  ['약사면허증','prescription',475,340],['사업자등록증','document',1128,335],
  ['건강기능식품 관련 서류','clipboard',467,665],['통신판매업 관련 서류','document',1137,668]
 ];
 b+=cc(...center,167,'#DAF0E4')+cc(...center,130,'#0D625A')+
   iconAt('shield',center[0]-67,center[1]-67,134,'#E2FCEB')+
   v6Text(center[0],center[1]+196,'서류 제출',28,V6_E.ink,850,250,'middle');
 spec.forEach((d,i)=>{
  b+=v6Line(d[2],d[3],...center,t,.6+i*.44,3.5+i*.4,V6_E.sage,4);
  b+=v6Node(d[2],d[3],d[1],d[0],t,i,{size:78,labelSize:23});
 });
 b+=v6Badge(623,762,'서류 확인 후 승인 검토',t,4.7,{w:435,icon:'shield'});
 return b;
}
function scene08(t,s){
 let b=v6Base(s,t,false,'약사 개인 계정과 약국 고유코드를 연결해 파트너 신청을 진행합니다');
 b+=reveal(G(cc(0,0,151,'#DBEEE4')+iconAt('pharmacist',-66,-66,131,V6_E.forest)+
   v6Label(0,206,'소속 약사 계정',330,30),378,471),t,.55,.85);
 b+=reveal(G(cc(0,0,151,'#DFEDF0')+iconAt('pharmacy',-68,-68,137,V6_E.forest)+
   v6Label(0,206,'협력 약국',300,30),1246,471),t,.9,.85);
 b+=v6Ribbon('M541 471Q815 310 1096 471',t,1.2,4.5,V6_E.forest,6);
 for(let i=0;i<8;i++)b+=reveal(G(rr(0,0,41,56,12,'#fff','#BBD7C8',1.3)+L(20,38,'•',28,V6_E.forest,850,'text-anchor="middle"'),648+i*49,377),t,1.65+i*.17,.44);
 b+=v6Badge(675,597,'약국 고유코드 확인',t,3,{w:388,icon:'shield'});
 b+=v6Text(816,755,'연결 신청 → 약국 소속 확인',24,V6_E.sage,650,600,'middle');
 return b;
}
function scene09(t,s){
 let b=v6Base(s,t,false,'약국장의 운영 관리 기능과 약사의 실무 기능을 역할별로 구분');
 b+=rr(121,307,638,443,48,'#E1F1E7')+rr(842,307,638,443,48,'#E2EDF3');
 b+=v6Node(444,391,'pharmacy','약국장 · 운영',t,0,{size:83});
 b+=v6Node(1165,391,'pharmacist','약사 · 실무',t,1,{size:83});
 const left=[['고객 관리','users'],['정산·통계','chart'],['소속 약사','pharmacist']];
 const right=[['상담 진행','chat'],['영양제 설계','capsule'],['조제·발송','truck']];
 [left,right].forEach((items,k)=>items.forEach((it,i)=>{
  const x=k?918:206,y=571+i*58,p=smooth(t,2+i*.45+k*.1,3+i*.45+k*.1);
  b+=G(iconAt(it[1],0,0,28,k?V6_E.blue:V6_E.forest)+v6Text(48,25,it[0],22,V6_E.ink,800,290),x,y,p);
 }));
 b+=v6Ribbon('M802 381V732',t,1,4.2,'#B8D3CA',4);
 return b;
}
function scene11(t,s){
 let b=v6Base(s,t,true,'결제·조제·발송 등 확인이 필요한 운영 지표를 한눈에');
 const d=[
  ['결제 예정','calendar',375,421,0],['결제 확인','wallet',743,485,1],
  ['조제 가능','capsule',1130,416,2],['발송 대기','package',1399,616,3]
 ];
 d.forEach(z=>{
  const [name,ic,x,y,i]=z;
  const fill=i===3?'#23564C':'#204F47',r=i===3?102:86;
  b+=cc(x,y,r+30,'none','stroke="#346A5F" stroke-width="9"')+
    cc(x,y,r+30,'none','stroke="#89E0C0" stroke-width="9" stroke-dasharray="'+((2*Math.PI*(r+30))*.7*smooth(t,.8+i*.45,4+i*.3))+' 700" transform="rotate(-90 '+x+' '+y+')"')+
    v6Node(x,y,ic,name,t,i,{size:r,dark:true,fill,labelOffset:75});
 });
 b+=v6Badge(546,728,'진행 상태 · 예시 화면',t,4.2,{w:492,icon:'chart'});
 return b;
}
function scene12(t,s){
 let b=v6Base(s,t,false,'날짜별 결제 예정·조제·배송 업무를 시각적으로 구분합니다');
 const x=183,y=284,cw=171,ch=98;
 const days=['일','월','화','수','목','금','토'];
 days.forEach((d,i)=>b+=v6Text(x+i*cw+63,y,d,24,i===0?'#C5855C':V6_E.ink,790,130,'middle'));
 let events=[{i:2,ic:'wallet',c:'#83BDA7'},{i:4,ic:'capsule',c:'#7EA7C1'},{i:9,ic:'truck',c:'#E3AC83'},
 {i:11,ic:'wallet',c:'#83BDA7'},{i:15,ic:'capsule',c:'#7EA7C1'},{i:17,ic:'truck',c:'#E3AC83'},
 {i:23,ic:'wallet',c:'#83BDA7'},{i:26,ic:'truck',c:'#E3AC83'}];
 for(let i=0;i<28;i++){
  const xx=x+(i%7)*cw,yy=y+29+Math.floor(i/7)*ch;
  let event=events.find(z=>z.i===i),pr=smooth(t,.68+i*.075,1.33+i*.075);
  b+=G(rr(0,0,cw-14,ch-9,19,event?'#E6F3EA':'#FFFFFF','#D6E6DB',1)+
    L(18,31,String(i+1),17,V6_E.ink,780)+
    (event?iconAt(event.ic,104,37,39,event.c,2):''),xx,yy,pr);
 }
 b+=v6Ribbon('M298 761C568 712 965 738 1253 758',t,2.4,5.6,'#65B79D',5);
 b+=v6Badge(492,765,'날짜별 운영 흐름 확인',t,4.0,{w:480,icon:'calendar'});
 return b;
}
function scene13(t,s){
 let b=v6Base(s,t,true,'상담·메시지·결제·재설계·문서 제출을 우선순위별로 분류');
 const arr=[
  ['신규 상담','chat','#4F9C85'],['미확인 메시지','bell','#CBA17B'],
  ['결제 상태','wallet','#70AFC1'],['재설계 요청','capsule','#8BBCA2'],['문서 제출','document','#8BBDD2']
 ];
 arr.forEach((item,i)=>{
  const x=156+(i%3)*473,y=301+Math.floor(i/3)*260,rrr=i===0?43:31;
  b+=reveal(G(rr(0,0,431,214,40,i===0?'#1D6358':'#19483F','#3C8172',2)+
      cc(73,85,55,'#2C7768')+iconAt(item[1],43,55,61,'#DDF8E9')+
      L(149,91,item[0],27,'#FFFFFF',850)+
      L(153,147,'우선순위 확인',18,'#B2DBC9',580)+
      rr(348,27,52,50,19,item[2])+L(374,60,'•',29,'#fff',800,'text-anchor="middle"'),x,y),t,.36+i*.38,.66);
 });
 b+=v6Badge(1182,789,'중요 업무부터 확인',t,4.4,{w:343,icon:'bell'});
 return b;
}
function scene15(t,s){
 let b=v6Base(s,t,false,'필요한 메뉴를 펼쳐 바로 이동하는 약국 운영 컴퍼스');
 const cx=805,cy=522;
 b+=cc(cx,cy,262,'#EDF5EE')+cc(cx,cy,210,'none','stroke="#AAD3BC" stroke-width="2.4" stroke-dasharray="7 15"');
 const mods=[['소속 약사','pharmacist',505,331],['고객','users',802,282],['상담·문의','chat',1125,333],
 ['영양소','capsule',1230,595],['정산','chart',816,765],['운영 관리','settings',409,622]];
 mods.forEach((z,i)=>{
  b+=v6Line(cx,cy,z[2],z[3],t,.65+i*.2,3+i*.2,V6_E.sage,3);
  b+=v6Node(z[2],z[3],z[1],z[0],t,i,{size:65});
 });
 b+=reveal(G(cc(0,0,121,'#0D625A')+iconAt('pharmacy',-48,-48,96,'#D7FAE6')+
   v6Label(0,178,'약국 운영',300,28),cx,cy),t,1.5,.8);
 return b;
}
function scene16(t,s){
 let b=v6Base(s,t,false,'방문 고객의 이름과 휴대폰 번호로 상담 기본정보를 등록합니다');
 b+=v6Node(352,489,'user','방문 고객',t,0,{size:145});
 b+=v6Ribbon('M517 485Q706 376 896 458',t,.85,4.4,V6_E.forest,7);
 const phone=G(rr(0,0,338,492,53,'#183E38','#72A694',3,'filter="url(#shadow)"')+
  rr(17,16,304,454,37,'#F8FCF7')+rr(108,28,122,10,7,'#385950')+
  iconAt('user',137,91,70,V6_E.forest)+
  v6Text(56,220,'고객 이름',22,V6_E.ink,800,249)+P('M54 237H284','#C3D8CC',4)+
  v6Text(56,305,'휴대폰 번호',22,V6_E.ink,800,260)+P('M54 321H284','#C3D8CC',4)+
  rr(58,365,223,54,25,V6_E.forest)+v6Text(169,400,'정보 확인',22,'#fff',800,200,'middle'),1030,258);
 b+=reveal(phone,t,1.4,.8);
 b+=v6Badge(537,742,'방문 상담 정보 등록',t,4.3,{w:490,icon:'check'});
 return b;
}
function scene18(t,s){
 let b=v6Base(s,t,false,'담당 약사 지정 · 초기 메모 · 상담창 생성 흐름을 연결합니다');
 const pts=[['고객 등록','user',246,481],['담당 약사','pharmacist',680,335],['초기 상담 메모','clipboard',680,647],['상담창','chat',1272,481]];
 pts.forEach((d,i)=>b+=v6Node(d[2],d[3],d[1],d[0],t,i,{size:i%2?83:93}));
 b+=v6Ribbon('M344 457Q497 351 580 350M344 498Q485 618 590 633M779 350Q1042 354 1184 464M779 633Q1033 602 1184 499',t,1.25,4.2,V6_E.sage,5);
 b+=v6Badge(613,820,'약사 지정 후 상담 연결',t,4.55,{w:440,icon:'chat'});
 return b;
}
function scene19(t,s){
 let b=v6Base(s,t,false,'고객 목록에서 상태를 검색·필터링하는 시각적 흐름');
 const x=228,y=324;
 b+=reveal(G(rr(0,0,1140,90,43,'#E5F3E9','#B0D2C1',2)+
  iconAt('user',34,20,46,V6_E.forest)+v6Text(103,56,'고객 이름 또는 상태 검색',27,V6_E.sage,690,780)+
  iconAt('scan',1064,21,46,V6_E.forest),x,y),t,.2,.6);
 const cats=[['상담 대기','chat',339],['구독 중','calendar',828],['검토 필요','shield',1310]];
 cats.forEach((item,i)=>{
  const [name,ic,cx]=item,cy=620;
  b+=v6Ribbon('M797 418Q'+cx+' 500 '+cx+' 540',t,1+i*.35,3.8+i*.35,V6_E.sage,4);
  b+=v6Node(cx,cy,ic,name,t,i,{size:96});
 });
 return b;
}
function scene20(t,s){
 let b=v6Base(s,t,false,'한 고객의 구독·상담·리포트 기록을 시간 순서로 탐색합니다');
 const path='M178 650C320 290 582 710 814 420S1160 320 1423 645';
 b+=v6Ribbon(path,t,.5,5.8,V6_E.sage,7);
 const entries=[['가입','user',220,609],['상담','chat',505,452],['건강 리포트','medical',794,437],['구독','calendar',1085,400],['후속 관리','clipboard',1390,619]];
 entries.forEach((z,i)=>b+=v6Node(z[2],z[3],z[1],z[0],t,i,{size:72}));
 b+=v6Badge(589,745,'기록이 이어지는 타임라인',t,4.8,{w:475,icon:'clock'});
 return b;
}
function scene21(t,s){
 let b=v6Base(s,t,true,'방문 상담의 메모와 녹음은 분리하여 고객 동의를 우선 확인합니다');
 const cx=830,cy=475;
 b+=cc(cx,cy,219,'#164C46')+cc(cx,cy,182,'none','stroke="#449785" stroke-width="3" stroke-dasharray="10 18"');
 b+=reveal(G(cc(0,0,129,'#DCF3E5')+iconAt('shield',-60,-60,121,V6_E.forest)+
   v6Label(0,194,'고객 안내·동의',370,29,'#E9FDF5'),cx,cy),t,1.5,.8);
 const nodes=[['상담 메모','clipboard',365,429],['녹음 안내','bell',1252,413],['동의 확인','check',1210,715]];
 nodes.forEach((a,i)=>{
  b+=v6Line(a[2],a[3],cx,cy,t,.9+i*.3,3.5+i*.2,'#77D6B6',4);
  b+=v6Node(a[2],a[3],a[1],a[0],t,i,{dark:true,size:85});
 });
 b+=v6Badge(569,742,'사전 동의 후 녹음 가능',t,4.25,{w:472,icon:'shield'});
 return b;
}
function scene22(t,s){
 let b=v6Base(s,t,true,'건강검진·처방전·약 봉투 등 필요한 자료를 보안 업로드');
 const cx=850,cy=498;
 const docs=[['건강검진','document',338,350],['처방전','prescription',663,304],['약 봉투','package',1157,331],['기타 자료','clipboard',1398,602]];
 docs.forEach((a,i)=>{
  b+=v6Node(a[2],a[3],a[1],a[0],t,i,{size:77,dark:true});
  b+=v6Ribbon('M'+a[2]+' '+a[3]+'Q'+((a[2]+cx)/2)+' '+(a[3]-45)+' '+cx+' '+cy,t,1.3+i*.3,4+i*.3,'#6AD4AA',3);
 });
 b+=reveal(G(cc(0,0,142,'#E1F5E9')+iconAt('lock',-60,-60,121,V6_E.forest)+
  v6Label(0,201,'NAS 보안 저장',346,27,'#F2FAF4'),cx,cy),t,1.1,.8);
 b+=v6Badge(570,756,'보안 업로드 진행 흐름',t,4.5,{w:474,icon:'lock'});
 return b;
}
function scene24(t,s){
 let b=v6Base(s,t,false,'약사가 원본과 OCR 인식 결과를 대조하고 수정·검토 메모를 남깁니다');
 const x=146,y=303;
 for(let k=0;k<2;k++){
  const xx=x+k*686,name=k?'인식 결과':'원본 자료',color=k?'#E1EFF5':'#E8F2EA';
  b+=reveal(G(rr(0,0,583,409,31,'#FFF','#CBDDD3',2,'filter="url(#shadow)"')+
    rr(0,0,583,88,31,color)+rr(0,60,583,28,0,color)+
    iconAt(k?'scan':'document',25,19,46,V6_E.forest)+
    v6Text(93,60,name,29,V6_E.ink,850,450),xx,y),t,.4+k*.48,.7);
  for(let i=0;i<3;i++){
   const yy=y+130+i*90;
   b+=reveal(G(rr(0,0,500,59,12,i===1?'#FFF0DF':'#F4F9F6','#D8E6DE',1)+
     iconAt(i===1?'shield':'check',16,12,32,i===1?'#BF915C':V6_E.forest)+
     v6Text(66,39,[['검진 항목','원본과 대조'],['검토 필요값','수정 검토'],['기록 확인','상담 활용']][i][k],21,V6_E.ink,750,401),xx+41,yy),t,1.1+i*.5+k*.24,.55);
  }
 }
 b+=reveal(G(cc(0,0,50,'#DCF1E4')+iconAt('check',-25,-25,50,V6_E.forest),793,526),t,3.1,.65);
 b+=v6Badge(585,751,'약사의 원본 대조가 최종 기준',t,4.6,{w:502,icon:'shield'});
 return b;
}
function scene25(t,s){
 let b=v6Base(s,t,false,'복용약·영양제·검진·상담 정보를 통합해 고객의 상태를 이해합니다');
 const cx=817,cy=508;
 b+=cc(cx,cy,289,'#DDEFE5')+cc(cx,cy,249,'none','stroke="#8ABBA8" stroke-width="3" stroke-dasharray="8 14"');
 const sources=[['건강검진','medical',445,293],['복용약','prescription',1178,294],['영양제','capsule',454,733],['상담 기록','chat',1185,733]];
 sources.forEach((z,i)=>{
  b+=v6Ribbon('M'+z[2]+' '+z[3]+'Q817 '+(i<2?352:692)+' '+cx+' '+cy,t,.5+i*.38,3.8+i*.38,V6_E.aqua,4);
  b+=v6Node(z[2],z[3],z[1],z[0],t,i,{size:75});
 });
 b+=reveal(G(cc(0,0,148,'#0D625A')+
    iconAt('user',-58,-83,116,'#E2F8E9')+
    v6Label(0,76,'고객 건강 맥락',258,24,'#F5FFF7'),cx,cy),t,1.6,.82);
 b+=v6Wave(cx,cy,161,t);
 return b;
}
function scene26(t,s){
 let b=v6Base(s,t,true,'AI가 정리한 정보는 약사 판단을 돕는 참고자료입니다');
 const cx=825,cy=482;
 b+=cc(cx,cy,244,'#1C534C')+v6TrackCircle(cx,cy,207,t,.7,4.2,'#7AE4BC',22);
 b+=reveal(G(cc(0,0,137,'#E9F6EC')+iconAt('ai',-61,-68,123,V6_E.forest)+
  v6Label(0,197,'AI 건강 분석',250,27,'#E9FFF3'),cx,cy),t,.5,.8);
 const xlist=[['검진 항목','medical',336,347],['복용약','prescription',1291,347],['중복 성분','capsule',331,685],['상담 참고','chat',1272,674]];
 xlist.forEach((z,i)=>{b+=v6Ribbon('M'+z[2]+' '+z[3]+'L'+cx+' '+cy,t,.8+i*.25,4+i*.2,'#72DBB3',4);
  b+=v6Node(z[2],z[3],z[1],z[0],t,i,{size:70,dark:true});});
 b+=v6Badge(610,755,'AI 참고자료 → 약사 검토',t,5,{w:424,icon:'shield'});
 return b;
}
function scene28(t,s){
 let b=v6Base(s,t,true,'상담의 승인 대기·진행·완료를 구분해 확인합니다');
 const lanes=[['승인 대기','clock','#E6B685',336],['진행 중','chat','#81D7B5',812],['완료 상담','check','#8ABBCD',1276]];
 lanes.forEach((z,i)=>{
  const [name,ic,col,x]=z,yy=496,p=smooth(t,.9+i*.72,2.9+i*.45);
  b+=G(cc(0,0,167,'#1A514A','stroke="#4A8D7B" stroke-width="2"')+
   cc(0,0,137,'none','stroke="'+col+'" stroke-width="21" stroke-dasharray="'+(2*Math.PI*137*.78*p)+' 900" transform="rotate(-90)"')+
   iconAt(ic,-64,-64,128,col)+
   v6Label(0,235,name,300,31,'#E8FBF2'),x,yy,p);
  if(i<2)b+=v6Ribbon('M'+(x+175)+' '+yy+'Q'+(x+265)+' '+(yy-65)+' '+(x+305)+' '+yy,t,1+i*.55,4.2+i*.5,'#6FB49D',5);
 });
 return b;
}
function scene29(t,s){
 let b=v6Base(s,t,false,'신규 상담 내용을 살펴보고 약사에게 필요한 자료를 확인합니다');
 const anchor=[795,492];
 b+=reveal(G(cc(0,0,148,'#DDF1E5')+iconAt('chat',-65,-65,129,V6_E.forest)+
   v6Label(0,215,'신규 상담 요청',350,29),...anchor),t,.4,.7);
 const tasks=[['요청 내용','clipboard',324,334],['건강정보','medical',1237,333],['복용제품','capsule',326,697],['필요한 질문','chat',1242,697]];
 tasks.forEach((z,i)=>{
  b+=v6Ribbon('M'+anchor[0]+' '+anchor[1]+'Q'+((anchor[0]+z[2])/2)+' '+((anchor[1]+z[3])/2)+' '+z[2]+' '+z[3],t,1+i*.34,4.3+i*.34,V6_E.sage,4);
  b+=v6Node(z[2],z[3],z[1],z[0],t,i,{size:79});
 });
 return b;
}
function scene30(t,s){
 let b=v6Base(s,t,false,'상담 수락 이후 복용 목적·불편사항·기존 복용약을 확인합니다');
 const bubbles=[
  ['고객','복용 목적을 상담하고 싶어요','user',275,325],
  ['약사','현재 복용 중인 약이 있나요?','pharmacist',745,435],
  ['고객','기존 복용제품을 알려드릴게요','user',274,555],
  ['약사','확인 후 함께 검토하겠습니다','pharmacist',745,681]];
 bubbles.forEach((z,i)=>{
  const [who,txt,ic,x,y]=z,p=smooth(t,.7+i*1.05,1.45+i*1.05);
  b+=reveal(G(rr(0,0,643,104,46,i%2?'#DCEDE4':'#FFFFFF','#B4D7C4',1.4,'filter="url(#shadow)"')+
    iconAt(ic,21,25,52,V6_E.forest)+
    v6Text(99,38,who,18,V6_E.sage,750,490)+v6Text(99,78,txt,22,V6_E.ink,780,515),x,y),t,.7+i*.83,.65);
  if(i<3)b+=v6Line(x+350,y+112,bubbles[i+1][3]+130,bubbles[i+1][4]-22,t,1.3+i*.79,2+i*.79,V6_E.aqua,3);
 });
 return b;
}
function scene31(t,s){
 let b=v6Base(s,t,true,'상담 화면과 건강 분석 요약을 함께 보고 필요한 질문을 추가합니다');
 b+=reveal(G(rr(0,0,765,470,31,'#E9F3EB','#AACFBD',2)+
   iconAt('chat',39,36,82,V6_E.forest)+
   v6Text(151,78,'약사 상담',33,V6_E.ink,850,535),146,288),t,.2,.85);
 const prompts=['고객 복용 목적','현재 복용약','기존 영양제'];
 prompts.forEach((txt,i)=>b+=reveal(G(rr(0,0,646,77,26,'#FFFFFF','#C7E2D2',1)+
   iconAt('check',19,19,36,V6_E.forest)+v6Text(82,49,txt,22,V6_E.ink,800,525),205,430+i*102),t,.7+i*.66,.6));
 b+=reveal(G(rr(0,0,537,485,42,'#24574F','#75B39A',2)+
    iconAt('ai',34,39,98,'#E2FAE9')+v6Text(148,97,'AI 건강 분석 요약',28,'#E7F8EF',820,351)+
    P('M36 131H504','#529580',3),974,286),t,.8,.85);
 const lines=['검진 요약 확인','기존 복용약 비교','영양제 중복 성분','약사 추가 질문'];
 lines.forEach((z,i)=>b+=reveal(G(iconAt(i===3?'chat':'check',0,0,42,i===3?'#EDC18D':'#99E2C1')+
  v6Text(72,33,z,22,'#F0FCF5',760,420),1025,450+i*76),t,2+i*.56,.55));
 return b;
}
function scene32(t,s){
 let b=v6Base(s,t,false,'연결 약국으로 들어온 고객 문의를 확인하고 답변을 관리합니다');
 const start=227,y=473,flow='M326 467C560 314 953 324 1247 468';
 b+=v6Ribbon(flow,t,.65,5.4,V6_E.sage,7);
 const tickets=[['고객 문의','chat',288,466],['연결 약국','pharmacy',818,362],['약국 응답','check',1306,487]];
 tickets.forEach((z,i)=>b+=v6Node(z[2],z[3],z[1],z[0],t,i,{size:i===1?115:96}));
 b+=reveal(G(rr(0,0,503,91,44,'#E8F3E9')+
  iconAt('clipboard',30,19,56,V6_E.forest)+v6Text(102,57,'문의 내역이 기록됩니다',24,V6_E.ink,830,376),559,699),t,3.7,.8);
 return b;
}
function scene33(t,s){
 let b=v6Base(s,t,false,'상담 기록을 보관하고 맞춤 설계·재상담·후속관리로 연결');
 const steps=[['상담 기록','clipboard',324,477],['맞춤 설계','capsule',796,315],['후속 관리','calendar',1289,513]];
 const path='M324 477Q556 301 796 315Q1153 314 1289 513';
 b+=v6Ribbon(path,t,.7,5.5,V6_E.forest,8);
 steps.forEach((z,i)=>{
  b+=v6Node(z[2],z[3],z[1],z[0],t,i,{size:i===1?124:103});
  b+=v6Dot(z[2]+85,z[3]-90,t,1+i*.8,14,i===1?'#EDA968':'#54AD92');
 });
 b+=v6Badge(628,724,'기록은 다음 상담으로 연결',t,4.4,{w:475,icon:'calendar'});
 return b;
}
function scene35(t,s){
 let b=v6Base(s,t,false,'기존 처방약과 영양제의 성분 중복·주의사항을 비교합니다');
 const xx=632,yy=503,r=218;
 b+=G(cc(0,0,r,'#CFE7DE','opacity=".77"')+
 iconAt('prescription',-115,-53,106,V6_E.forest)+
 v6Label(-28,139,'기존 복용약',291,27),xx,yy,smooth(t,.4,1.4));
 b+=G(cc(0,0,r,'#D5E8F1','opacity=".72"')+
 iconAt('capsule',8,-53,106,'#2E6D96')+
 v6Label(64,139,'신규 영양제',291,27),950,yy,smooth(t,1.1,2.3));
 b+=reveal(G(cc(0,0,86,'#FFFFFF','stroke="#9CCABA" stroke-width="2"')+
  iconAt('shield',-45,-45,88,V6_E.forest)+v6Label(0,129,'중복 성분 검토',324,25),790,yy),t,2.7,.8);
 b+=v6Badge(583,755,'성분 정보와 주의사항 검토',t,4.5,{w:504,icon:'shield'});
 return b;
}
function scene36(t,s){
 let b=v6Base(s,t,false,'제품별 용량을 확인하고 아침·점심·저녁 스케줄로 정리합니다');
 const config=[['아침','08:00','#78BF9C',332],['점심','12:30','#7EACCA',815],['저녁','19:00','#E0B080',1290]];
 config.forEach((z,i)=>{
  const [name,tm,color,x]=z,cy=494;
  b+=v6TrackCircle(x,cy,153,t,.6+i*.65,3.8+i*.4,color,27);
  b+=v6Node(x,cy,'capsule',name,t,i,{size:96});
  b+=reveal(v6Label(x,cy+216,tm,250,26),t,1+i*.6,.6);
  const n=1+i;
  for(let j=0;j<n;j++)b+=G(iconAt('capsule',0,0,36,V6_E.forest),x-54+j*46,cy+270,smooth(t,2.2+i*.4,3.7+i*.4));
 });
 b+=v6Text(800,792,'복용 구성 예시 · 약사 검토 후 확정',21,V6_E.sage,650,800,'middle');
 return b;
}
function scene37(t,s){
 let b=v6Base(s,t,true,'재고 확인은 안전한 진행을 위한 경고이며 강제 확정과는 다릅니다');
 const cx=835,cy=485;
 b+=v6TrackCircle(cx,cy,216,t,1,5.1,'#E7B880',34);
 b+=cc(cx,cy,162,'#17483F')+iconAt('package',cx-66,cy-92,132,'#E5F4EB');
 b+=v6Label(cx,cy+131,'재고 확인 필요',350,32,'#FAEBCD');
 b+=v6Node(301,474,'clipboard','실제 재고 확인',t,0,{dark:true,size:111});
 b+=v6Node(1376,474,'shield','약사가 진행 결정',t,1,{dark:true,size:111});
 b+=v6Ribbon('M415 481C510 377 582 388 640 462M1049 480C1142 386 1223 396 1261 471',t,2.1,4.6,'#E8B47E',4);
 b+=v6Badge(616,763,'경고 후 검토하고 진행',t,4.9,{w:425,icon:'shield'});
 return b;
}
function scene39(t,s){
 let b=v6Base(s,t,false,'AI가 복약지도 초안을 정리하되 약사가 내용을 다시 확인합니다');
 const x=764,y=301;
 b+=reveal(G(rr(0,0,662,451,28,'#FFFFFF','#C4E0D0',1.9,'filter="url(#shadow)"')+
  iconAt('document',35,30,82,V6_E.forest)+
  v6Text(141,82,'복약지도 초안',34,V6_E.ink,850,450),x,y),t,.4,.8);
 const lines=[['복용 목적','capsule'],['복용 시간 안내','clock'],['주의사항','shield'],['기존 복용정보','prescription']];
 lines.forEach((l,i)=>{
  const yy=y+137+i*75,p=smooth(t,1.2+i*.65,2.5+i*.65);
  b+=G(iconAt(l[1],0,0,34,V6_E.forest)+v6Text(55,28,l[0],23,V6_E.ink,750,400)+
    rr(345,22,174*p,7,4,'#91CCAB'),x+50,yy,p);
 });
 b+=v6Node(357,484,'ai','AI 초안 생성',t,0,{size:141});
 b+=v6Ribbon('M505 475Q630 380 743 487',t,1.2,4.3,V6_E.sage,6);
 b+=v6Badge(935,758,'최종 문구는 약사가 검토',t,5.0,{w:483,icon:'pharmacist'});
 return b;
}
function scene40(t,s){
 let b=v6Base(s,t,false,'고객 전달 전 미리보기·수정으로 복약지도 표현을 정교하게 다듬습니다');
 for(let i=0;i<2;i++){
  const xx=i?852:181;
  b+=reveal(G(rr(0,0,557,461,35,'#FFFFFF','#C6DED0',2,'filter="url(#shadow)"')+
    rr(0,0,557,81,35,i?'#DFF1E9':'#E5EEF3')+
    rr(0,53,557,28,0,i?'#DFF1E9':'#E5EEF3')+
    iconAt(i?'check':'document',30,21,44,i?V6_E.forest:'#537D9D')+
    v6Text(99,52,i?'약사 수정본':'AI 초안 미리보기',29,V6_E.ink,850,416),xx,302),t,.45+i*.4,.75);
  const lines=['복용 목적 안내','복용 시간 설명','주의사항 문구'];
  lines.forEach((tx,k)=>b+=reveal(G(
     iconAt(i&&k===1?'check':'clipboard',0,0,38,i&&k===1?V6_E.forest:'#779F93')+
     v6Text(62,28,tx,21,V6_E.ink,740,369)+
     (i&&k===1?rr(59,47,363,9,5,'#C9EEDD'):rr(59,47,260,6,3,'#E0E9E5')),xx+43,431+k*99),t,1.3+i*.4+k*.52,.55));
 }
 b+=v6Ribbon('M746 544H833',t,2.3,4.1,V6_E.forest,6);
 b+=v6Badge(593,773,'약사 확인 후 고객 전달',t,4.75,{w:473,icon:'pharmacist'});
 return b;
}
function scene41(t,s){
 let b=v6Base(s,t,false,'고객이 설계와 복용 안내를 확인한 뒤 결제·구독으로 연결');
 const pts=[['설계 확인','capsule',313,489],['약사 상담','chat',776,377],['결제·구독','card',1259,496]];
 b+=v6Ribbon('M407 479Q632 327 778 375Q1069 403 1173 483',t,.55,4.6,V6_E.forest,7);
 pts.forEach((a,i)=>b+=v6Node(a[2],a[3],a[1],a[0],t,i,{size:i===1?111:104}));
 b+=reveal(G(rr(0,0,461,76,38,'#E6F3E8')+
  iconAt('shield',25,19,39,V6_E.forest)+
  v6Text(81,50,'결제 상태를 확인해 반영',24,V6_E.ink,840,354),583,701),t,4.0,.8);
 return b;
}
function scene42(t,s){
 let b=v6Base(s,t,true,'설계 확정과 현재 회차의 결제·배송 상태는 별도로 확인해야 합니다');
 const x1=455,x2=1165,yy=480,conds=[['설계 확정','clipboard',x1],['회차 상태','truck',x2]];
 conds.forEach((z,i)=>{
  const x=z[2];
  b+=v6Node(x,yy,z[1],z[0],t,i,{dark:true,size:153});
  b+=v6TrackCircle(x,yy,185,t,1+i*.65,4.3+i*.6,i?'#E6BB86':'#93DFBC',15);
 });
 b+=v6Ribbon('M625 477H984',t,1.7,5.2,'#A7DCC7',6);
 b+=v6Badge(646,749,'두 조건을 구분해 검토',t,5.3,{w:395,icon:'shield'});
 return b;
}
function scene43(t,s){
 let b=v6Base(s,t,true,'약사 대시보드에서는 조제·발송을 중심으로 오늘 업무를 정리합니다');
 const cx=464,cy=517;
 b+=cc(cx,cy,260,'#175047')+
  v6TrackCircle(cx,cy,199,t,.7,4.5,'#85DFB7',28)+
  cc(cx,cy,142,'#10392F')+
  iconAt('pharmacist',cx-70,cy-95,140,'#C8F7E0')+
  v6Label(cx,cy+126,'약사 업무',265,30,'#EBFFF5');
 const nodes=[['발송 필요','package',956,344],['송장 출력','document',1300,345],['배송 확인','truck',941,668],['전체 고객','users',1302,676]];
 nodes.forEach((a,i)=>{
  b+=v6Ribbon('M673 '+cy+'Q'+((cx+a[2])/2)+' '+(a[3]-50)+' '+a[2]+' '+a[3],t,.75+i*.28,4.5+i*.3,'#6CD0AE',4);
  b+=v6Node(a[2],a[3],a[1],a[0],t,i,{dark:true,size:86});
 });
 return b;
}
function scene44(t,s){
 let b=v6Base(s,t,false,'발송 필요 회차를 먼저 확인하고 설계·조제 상태를 검토합니다');
 const x=207,y=292,names=['발송 대상 A','발송 대상 B','발송 대상 C','발송 대상 D'];
 names.forEach((nm,i)=>{
  const yy=y+i*109,w=1058,p=smooth(t,.65+i*.57,1.8+i*.57);
  b+=G(rr(0,0,w,91,37,i===0?'#E0F1E5':'#FFFFFF','#CADFD3',1.2,'filter="url(#shadow)"')+
   iconAt('user',31,23,46,V6_E.forest)+
   v6Text(102,55,nm,26,V6_E.ink,850,265)+
   rr(381,40,341,14,7,'#DDECE3')+
   rr(381,40,341*(.42+.11*i)*p,14,7,i===0?'#398D79':'#91CBB6')+
   iconAt(i===0?'truck':'clock',790,22,46,V6_E.forest)+
   v6Text(856,54,i===0?'발송 검토':'회차 확인',21,V6_E.sage,750,180),x,yy,p);
 });
 b+=v6Badge(648,761,'고객·회차별 상태 확인',t,4.7,{w:433,icon:'clipboard'});
 return b;
}
function scene46(t,s){
 let b=v6Base(s,t,false,'확정된 조제 데이터를 약포 구성과 라벨 출력에 활용합니다');
 const coords=[[364,476,'복용 일정','calendar'],[813,468,'라벨 출력','document'],[1285,473,'약포 구성','capsule']];
 b+=v6Ribbon('M445 486C617 353 706 369 813 468S1085 575 1210 470',t,.6,5.9,V6_E.forest,9);
 coords.forEach((m,i)=>{
  b+=v6Node(m[0],m[1],m[3],m[2],t,i,{size:i===1?134:108});
 });
 // Individually illustrated packet strip, not boxes
 for(let j=0;j<7;j++){
  const p=smooth(t,3.1+j*.2,4+j*.2),xx=870+j*59;
  b+=G('<path d="M0 0h48v90l-24 12L0 90Z" fill="'+(j%2?'#E6F3EA':'#F4FBF5')+'" stroke="#9ACDB5" stroke-width="2"/>'+
    iconAt('capsule',12,27,29,V6_E.forest),xx,718,p);
 }
 b+=v6Text(547,801,'실제 조제 시 확인 필요',21,V6_E.sage,650,388,'middle');
 return b;
}
function scene49(t,s){
 let b=v6Base(s,t,false,'송장과 발송 이력을 기간별로 조회하고 배송 상태를 비교합니다');
 const lineX=210,lineY=500,width=1190;
 b+=P('M'+lineX+' '+lineY+'H1400','#BAD8C8',12);
 const parts=[['발송 준비','package',270],['송장 등록','document',625],['택배 이동','truck',980],['배송 확인','check',1365]];
 parts.forEach((v,i)=>{
  const [nm,ic,x]=v,p=smooth(t,.7+i*.63,1.7+i*.63);
  if(i>0)b+=v6Line(parts[i-1][2]+65,lineY,x-75,lineY,t,1+i*.3,3.6+i*.3,V6_E.forest,12);
  b+=v6Node(x,lineY,ic,nm,t,i,{size:91});
  b+=G(L(0,0,['01','02','03','04'][i],24,V6_E.sage,750,'text-anchor="middle"'),x,350,p);
 });
 b+=reveal(G(iconAt('calendar',0,0,56,V6_E.forest)+
  v6Text(82,41,'기간별 조회 · 상태 비교',26,V6_E.ink,800,500),488,732),t,4.7,.65);
 return b;
}
function scene50(t,s){
 let b=v6Base(s,t,false,'처리 현황과 미확인 항목을 함께 살피며 약사의 업무를 마무리');
 const cx=817,cy=508;
 b+=cc(cx,cy,250,'#E4F3E9')+v6TrackCircle(cx,cy,199,t,.7,5.5,'#4FB28E',21);
 b+=cc(cx,cy,149,'#0D625A')+iconAt('clipboard',cx-65,cy-65,130,'#D5FAE5')+
   v6Text(cx,cy+130,'업무 점검',31,'#fff',850,300,'middle');
 const cats=[['전체 고객','users',313,344],['상담 확인','chat',1322,344],['발송 점검','truck',317,676],['운영 확인','check',1323,676]];
 cats.forEach((z,i)=>{
  b+=v6Line(z[2],z[3],cx,cy,t,.9+i*.34,4.1+i*.34,V6_E.sage,3);
  b+=v6Node(z[2],z[3],z[1],z[0],t,i,{size:74});
 });
 return b;
}
function scene51(t,s){
 let b=v6Base(s,t,false,'결제·설계·배송이 다음 회차로 이어지는 정기구독의 주기');
 const cx=811,cy=455,r=208;
 b+=v6TrackCircle(cx,cy,r,t,.7,5.7,'#53AD90',16);
 b+=cc(cx,cy,157,'#E2F2E9')+iconAt('calendar',cx-58,cy-93,116,V6_E.forest)+
 v6Label(cx,cy+91,'정기구독 주기',319,31);
 const circle=[['결제','wallet',-90],['설계','capsule',0],['배송','truck',70],['다음 회차','clock',160]];
 circle.forEach((m,i)=>{
  const phi=m[2]*Math.PI/180,x=cx+(r+70)*Math.cos(phi),y=cy+(r+70)*Math.sin(phi);
  b+=v6Node(x,y,m[1],m[0],t,i,{size:75});
 });
 b+=v6Badge(1064,768,'회차별 지속 관리',t,4.8,{w:332,icon:'calendar'});
 return b;
}
function scene52(t,s){
 let b=v6Base(s,t,false,'이전 설계를 활용하거나 고객의 최신 상태에 맞게 다시 설계');
 b+=v6Node(310,481,'document','이전 회차',t,0,{size:103});
 const mid=[793,482];b+=v6Node(...mid,'settings','약사 검토',t,1,{size:131});
 b+=v6Ribbon('M420 480H657',t,.65,2.9,V6_E.sage,5);
 const branches=[['이전 설계 활용','clipboard',1296,340],['재설계','capsule',1296,652]];
 branches.forEach((z,i)=>{
  b+=v6Ribbon('M935 483Q1102 '+z[3]+' '+z[2]+' '+z[3],t,1.9+i*.3,5+i*.35,V6_E.forest,5);
  b+=v6Node(z[2],z[3],z[1],z[0],t,i+2,{size:98});
 });
 return b;
}
function scene53(t,s){
 let b=v6Base(s,t,true,'다음 회차 구독 종료 예약과 현재 회차 취소·환불은 다른 요청입니다');
 const blocks=[
  {cx:426,ic:'calendar',name:'다음 회차 취소 예약',desc:'향후 회차 중단',c:'#7AD1AD'},
  {cx:1194,ic:'wallet',name:'현재 회차 환불 요청',desc:'이미 결제된 회차 확인',c:'#F0BD85'}
 ];
 blocks.forEach((z,i)=>{
  b+=reveal(G(cc(0,0,177,'#1E514A','stroke="'+z.c+'" stroke-width="3"')+
    iconAt(z.ic,-73,-73,146,z.c)+
    v6Label(0,233,z.name,490,30,'#F7FFF9')+
    v6Label(0,283,z.desc,450,22,'#B4D9CB'),z.cx,474),t,.5+i*.62,.75);
 });
 b+=reveal(G(cc(0,0,66,'#EAE0D8')+L(0,17,'≠',64,V6_E.forest,900,'text-anchor="middle"'),810,478),t,1.9,.75);
 b+=v6Badge(583,746,'조제·배송 전에 회차 확인',t,4.5,{w:477,icon:'shield'});
 return b;
}
function scene54(t,s){
 let b=v6Base(s,t,false,'기간별 정산과 월별 추이를 서로 다른 차트로 살펴봅니다');
 const areaX=126,areaY=348;
 b+=rr(areaX,areaY,843,410,31,'#E8F2EA')+rr(1021,areaY,456,410,31,'#E6F0F4');
 const bars=[.44,.71,.52,.81,.63,.94,.73,.87];
 bars.forEach((p,i)=>{
  const x=areaX+69+i*93,base=areaY+327,h=245*p*smooth(t,.6+i*.17,3.5+i*.17);
  b+=rr(x,base-h,48,h,13,i%2?'#5BAE91':'#80C2AE')+
     v6Text(x+24,base+30,String(i+1)+'월',17,V6_E.sage,650,60,'middle');
 });
 const line='M190 625Q330 458 448 525T713 455T924 416';
 b+=pathDraw(line,1180,t,1.6,5.2,'#0D625A',5);
 b+=v6TrackCircle(1247,543,136,t,.7,4.3,'#398B77',27);
 b+=v6Text(1247,551,'정산',40,V6_E.ink,850,195,'middle')+
  v6Text(1247,610,'요약 예시',21,V6_E.sage,700,240,'middle');
 b+=v6Text(165,316,'월별 운영 추이',25,V6_E.ink,830,499);
 return b;
}
function scene55(t,s){
 let b=v6Base(s,t,false,'약국 환경에 맞는 팝업·소리 알림 설정과 기록 확인');
 const center=[811,475];
 b+=reveal(G(cc(0,0,181,'#DBEEE3')+
  iconAt('bell',-83,-83,166,V6_E.forest)+
  v6Label(0,239,'업무 알림 설정',382,31),...center),t,.45,.85);
 const panels=[['상담 알림','chat',352,321],['팝업 설정','settings',1219,310],
 ['소리 설정','bell',338,671],['알림 기록','clipboard',1217,671]];
 panels.forEach((z,i)=>{
  const [nm,ic,x,y]=z;
  b+=v6Ribbon('M'+center[0]+' '+center[1]+'Q'+((center[0]+x)/2)+' '+(y-40)+' '+x+' '+y,t,1+i*.28,4.3+i*.2,V6_E.sage,3.8);
  b+=v6Node(x,y,ic,nm,t,i,{size:81});
 });
 return b;
}
function scene56(t,s){
 let b=v6Base(s,t,true,'호환 기기와 연결해 약국 안팎의 상담 환경을 확장하는 Connect Beta');
 const center=[809,485],devices=[
  ['Windows','laptop',296,344],['macOS','laptop',1347,343],
  ['스마트폰','phone',325,689],['키오스크','scan',1332,689]
 ];
 b+=cc(...center,300,'#175148','opacity=".53"')+
   cc(...center,247,'none','stroke="#62A78E" stroke-dasharray="9 17" stroke-width="2.3"');
 devices.forEach((z,i)=>{
  b+=v6Ribbon('M'+z[2]+' '+z[3]+'Q809 '+(z[3]-74)+' '+center[0]+' '+center[1],t,.8+i*.22,4.2+i*.24,'#81DEBA',3);
  b+=v6Node(z[2],z[3],z[1],z[0],t,i,{size:89,dark:true});
 });
 b+=reveal(G(cc(0,0,165,'#DFF5E8')+
    iconAt('network',-71,-97,142,V6_E.forest)+
    v6Label(0,86,'Connect · Beta',310,28,V6_E.forest),...center),t,1.8,.75);
 b+=v6Wave(...center,180,t);
 return b;
}
function scene58(t,s){
 let b=v6Base(s,t,true,'Connect에서 발급한 장치 연결 코드를 Agent에 입력합니다');
 b+=v6Node(335,489,'laptop','Agent 프로그램',t,0,{dark:true,size:131});
 b+=v6Node(1285,489,'pharmacy','약국 계정 연결',t,1,{dark:true,size:131});
 const x=578,yy=425;
 b+=v6Ribbon('M468 493H1148',t,.7,4.9,'#81CEAC',7);
 for(let i=0;i<6;i++){
  b+=reveal(G(rr(0,0,65,85,16,'#E7F5EC','#91C5AC',2)+
    L(33,56,'•',37,V6_E.forest,870,'text-anchor="middle"'),x+i*76,yy),t,1.3+i*.37,.51);
 }
 b+=v6Badge(605,692,'6자리 연결 코드 입력',t,4.2,{w:399,icon:'lock'});
 return b;
}
function scene61(t,s){
 let b=v6Base(s,t,true,'가입·상담·건강분석·설계·배송·재구독이 하나의 생태계로');
 const items=[
  ['협력 약국','pharmacy',276,359],['고객 등록','phone',612,321],['건강 분석','medical',994,321],
  ['상담','chat',1332,363],['맞춤 설계','capsule',1294,690],['조제·배송','truck',874,731],
  ['재구독','calendar',460,695]
 ];
 const route='M276 359C474 288 527 294 612 321S871 316 994 321S1188 340 1332 363Q1467 543 1294 690S1022 744 874 731S621 732 460 695';
 b+=v6Ribbon(route,t,.8,6.8,'#78DDB9',8);
 items.forEach((z,i)=>b+=v6Node(z[2],z[3],z[1],z[0],t,i,{size:73,dark:true}));
 b+=reveal(G(cc(0,0,87,'#145D4C')+brandMark(-59,-59,118,.94),828,514),t,3,.8);
 return b;
}
function scene62(t,s){
 let b=v6Base(s,t,false,'약국·약사·고객 모두를 잇는 건강관리 경험');
 const cx=811,cy=455,pts=[['약국','pharmacy',426,335],['약사','pharmacist',1218,335],['고객','user',812,662]];
 const edges='M426 335L1218 335L812 742Z';
 b+=P(edges,'#B7D9C6',16,'stroke-linejoin="round"');
 b+=pathDraw(edges,2450,t,.8,6,'#5CB394',7);
 pts.forEach((p,i)=>{
  b+=v6Node(p[2],p[3],p[1],p[0],t,i,{size:115});
  const captions=['체계적인 운영','전문적 판단 지원','이어지는 건강관리'];
  b+=reveal(v6Label(p[2],p[3]+186,captions[i],350,22),t,2+i*.58,.6);
 });
 b+=reveal(G(cc(0,0,109,'#E9F6ED')+brandMark(-78,-78,156,.95),cx,cy),t,1.9,.88);
 return b;
}
// All v5 scenes remain as independent fallbacks. 47 new scene-specific compositions supersede
// only the cuts that were not individually rebuilt in v5.
const V6_SCENES={
 1:scene01,2:scene02,4:scene04,5:scene05,6:scene06,8:scene08,9:scene09,
 11:scene11,12:scene12,13:scene13,15:scene15,16:scene16,18:scene18,19:scene19,
 20:scene20,21:scene21,22:scene22,24:scene24,25:scene25,26:scene26,
 28:scene28,29:scene29,30:scene30,31:scene31,32:scene32,33:scene33,
 35:scene35,36:scene36,37:scene37,39:scene39,40:scene40,41:scene41,42:scene42,
 43:scene43,44:scene44,46:scene46,49:scene49,50:scene50,51:scene51,52:scene52,
 53:scene53,54:scene54,55:scene55,56:scene56,58:scene58,61:scene61,62:scene62
};
const V6_PREVIOUS_RENDER=renderCompleteScene;
renderCompleteScene=function(s,t){
 const custom=V6_SCENES[s.id];
 return custom ? pattern()+custom(t,s) : V6_PREVIOUS_RENDER(s,t);
};
window.__V6_SCENE_IDS=Object.keys(V6_SCENES).map(Number);