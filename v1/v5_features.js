/* Screen-filling stage and typographic system shared by ALL 63 cuts. */
const OLD_SCENE_RENDER=renderCompleteScene;
stageFrame=function(dark,id,serial,title,progression){
 const isDark=!!dark;
 let svg=rr(0,0,1600,900,0,isDark?'#102c2b':'#F8F7F2');
 if(isDark){
  svg+=rr(0,0,1600,900,0,'url(#tealNight)');
  svg+=cc(1320,180,380,'url(#orb)')+cc(210,770,370,'url(#orbblue)');
  svg+=P('M-50 725Q410 430 755 670T1675 354','#376862',1.8,'opacity=".32"');
 }else{
  svg+=rr(0,0,1600,900,0,'url(#paper)');
  svg+=cc(1390,160,435,'#DCE9DE','opacity=".28"');
  svg+=cc(110,830,430,'#DCEAE3','opacity=".18"');
  svg+=P('M-50 750Q470 480 930 720T1680 300','#C9E1D6',1.5,'opacity=".5"');
 }
 // Only the brand mark remains, without film title, cut number, progress border or debug metadata.
 if(id!==63 && id!==2)svg+=brandMark(1460,49,87,isDark?.19:.13);
 return svg;
};
leftFrame=function(s,t,opts={}){
 const dark=!!opts.dark;
 const fg=dark?'#F8FCF9':CX.ink,accent=dark?'#BCF1D6':CX.forest;
 let b=stageFrame(dark,s.id,s.chapter,s.name,t/s.d);
 // Meaningful visual mark in place of the generic English meta label.
 b+=reveal(G(cc(0,0,33,dark?'#245D50':'#E3EEE4')+iconAt(meaningIcon(s.name+' '+s.caption),-17,-17,34,dark?'#BEF6DD':CX.forest),113,125),t,.08,.5);
 const title=koreanText(s.name,80,248,506,65,fg,850,1.24,3);
 b+=reveal(title.svg,t,.14,.75);
 const y=Math.min(640,270+title.height+32);
 const desc=koreanText(opts.subtitle||s.caption,83,y,500,24,dark?'#B7D5CA':'#638078',550,1.5,3);
 b+=reveal(desc.svg,t,.78,.65);
 return b;
};
morphCard=function(x,y,w,h,title,desc,t,i=0,opts={}){
 const dark=opts.bg&&/^#1/.test(opts.bg);
 const bg=opts.bg||'#fff',fg=opts.fg||CX.ink;
 const form=i%3;
 let shape=form===1
   ?rr(0,0,w,h,Math.min(h/2,41),bg,opts.stroke||'#DCE9E2',1.2)
   :rr(0,0,w,h,form===2?10:23,bg,opts.stroke||'#DCE9E2',1.3);
 shape+=cc(42,Math.min(43,h/2),24,opts.tint||'#E6F3E9');
 shape+=iconAt(meaningIcon(title),27,Math.min(28,h/2-15),30,CX.forest,1.7);
 const titleTxt=koreanText(title,79,Math.min(52,h/2+7),Math.max(80,w-100),opts.titleSize||22,fg,820,1.16,h<82?1:2);
 shape+=titleTxt.svg;
 if(desc&&h>87)shape+=koreanText(desc,80,Math.min(h-16,84),w-103,15,opts.subcolor||CX.gray,550,1.3,1).svg;
 return reveal(G(shape,x,y),t,.65+i*.32,.62,0,30);
};
// Multi-scene semantic decorative infographics for where the old UI was entirely typographic.
function iconTray(s,t){
 let body='',words=String(s.caption+' '+s.title);
 let kinds=[];
 if(/휴대폰|SMS|QR|키오스크|스마트폰/.test(words))kinds.push('phone');
 if(/택배|배송|운송장|송장|발송/.test(words))kinds.push('truck','package');
 if(/서류|검진|문서|처방|OCR|리포트/.test(words))kinds.push('document','scan');
 if(/약사|약국/.test(words))kinds.push('pharmacy');
 kinds=[...new Set(kinds)].slice(0,3);
 if(!kinds.length)return '';
 for(let i=0;i<kinds.length;i++){
  const xx=1470-(i%2)*100, yy=710+i*50, p=smooth(t,2+i*.35,3+i*.35);
  body+=G(cc(0,0,36,'#E8F3EA','stroke="#C3E0D1" stroke-width="1.1"')+
       iconAt(kinds[i],-19,-19,38,CX.forest),xx,yy,.32*p);
 }
 return body;
}
function v5Heading(s,t,dark=false,sub=''){
 let b=stageFrame(dark,s.id,s.chapter,s.name,t/s.d);
 const fg=dark?'#F2FBF8':CX.ink,accent=dark?'#B7F5D5':CX.forest;
 b+=reveal(brandMark(76,59,77,.94),t,0,.6);
 const main=koreanText(s.name,185,124,1220,58,fg,850,1.15,2);
 b+=reveal(main.svg,t,.12,.72);
 const subtitle=String(sub||s.caption).replaceAll(' / ',' · ');
 b+=reveal(koreanText(subtitle,189,175+Math.max(0,main.lines.length-1)*66,1180,23,dark?'#A7D2C9':'#69877C',550,1.25,2).svg,t,.7,.6);
 return b;
}
function cutQuest(s,t){
 let b=v5Heading(s,t,false,'8개의 단계가 끊기지 않고 이어지는 고객·약국 운영 여정');
 const steps=[
  ['약국 가입','pharmacy',158,330],['약사 연결','pharmacist',493,322],['고객 등록','phone',842,345],['건강 분석','medical',1203,319],
  ['상담','chat',1203,628],['설계','capsule',842,643],['조제·배송','truck',492,622],['재구독','calendar',158,632]
 ];
 let path='M158 330C320 292 395 292 493 322S715 370 842 345S1092 300 1203 319C1455 400 1438 575 1203 628S981 663 842 643S618 612 492 622S270 648 158 632';
 // A true length-measured path, never an arbitrary hardcoded SVG dash length.
 // The progress line is fully green at the end, with no pale dotted trail.
 b+=P(path,'#D8EBE1',12);
 b+=P(path,'#239F83',12,'data-route-progress="'+smooth(t,.55,6.8)+'"');
 steps.forEach((step,i)=>{
  const [label,ic,x,y]=step,p=smooth(t,.52+i*.72,1.2+i*.72);
  b+=G(cc(0,0,76,'#fff','stroke="#b2dace" stroke-width="2.4" filter="url(#shadow)"')+
   cc(0,0,59,i===0?'#0D625A':'#EAF5EF')+
   iconAt(ic,-30,-30,60,i===0?'#fff':CX.forest,1.6)+
   cc(53,-53,21,p>.95?'#2eaa8b':'#e4efe9')+
   L(53,-46,p>.95?'✓':String(i+1),17,p>.95?'#fff':CX.forest,850,'text-anchor="middle"')+
   L(0,123,label,25,CX.ink,850,'text-anchor="middle"'),x,y,p);
 });
 b+=reveal(G(rr(0,0,336,62,31,'#0D625A')+iconAt('check',17,17,30,'#fff')+
    L(63,39,'운영 여정 연결',23,'#fff',850),628,799),t,5.5,.75);
 return b;
}
function cutApproval(s,t){
 let b=v5Heading(s,t,false,'접수와 운영 권한 승인은 서로 다른 단계입니다');
 const steps=[{x:340,y:470,label:'1차 신청 접수',ic:'clipboard'},{x:813,y:470,label:'정식 가입 접수',ic:'document'},{x:1274,y:470,label:'관리자 승인',ic:'shield'}];
 const bar='M343 469C556 445 600 452 812 470S1100 492 1274 470';
 b+=P(bar,'#d7e7dc',18);
 b+=pathDraw(bar,1060,t,.6,5.4,'#53b997',11);
 steps.forEach((z,i)=>{
  const p=smooth(t,.4+i*1.45,1.15+i*1.45);
  b+=G(cc(0,0,124,'#fff','stroke="#bedbcc" stroke-width="3" filter="url(#shadow)"')+
    cc(0,0,98,i===2?'#e4f0e9':'#e2f5ea')+
    iconAt(z.ic,-43,-43,86,CX.forest)+
    cc(86,-89,28,p>.9?'#318d77':'#eff2e7')+
    L(86,-79,p>.9?'✓':String(i+1),24,p>.9?'#fff':CX.forest,850,'text-anchor="middle"')+
    L(0,178,z.label,29,CX.ink,850,'text-anchor="middle"'),z.x,z.y,p);
 });
 b+=reveal(G(rr(0,0,525,72,18,'#d9f0e3')+iconAt('unlock',24,21,36,CX.forest)+L(83,45,'승인 후 필요한 권한 활성화',24,CX.forest,800),528,748),t,5.3,.8);
 return b;
}
function cutKpi(s,t){
 let b=v5Heading(s,t,true,'지표·업무 우선순위·월간 운영을 한 화면에서 확인');
 const centerX=480,centerY=521,r=201,rate=smooth(t,.8,4.1),angle=2*Math.PI*r;
 b+=cc(centerX,centerY,267,'url(#orb)')+
    cc(centerX,centerY,r,'none','stroke="#2A5C57" stroke-width="33"')+
    cc(centerX,centerY,r,'none','stroke="#6BD8B3" stroke-width="33" transform="rotate(-90 480 521)" stroke-dasharray="'+(angle*.78*rate)+' '+angle+'" stroke-linecap="round"')+
    cc(centerX,centerY,142,'#0c403d')+
    L(centerX,510,String(Math.round(78*rate))+'%',76,'#F4FCF8',900,'text-anchor="middle"')+
    L(centerX,561,'업무 현황 예시',22,'#B2E8DA',750,'text-anchor="middle"');
 const metrics=[['신규 상담 · 예시','chat',910,275,4],['확인할 배송','truck',1239,275,6],['고객 관리','users',909,507,42],['알림 확인','bell',1238,507,3]];
 metrics.forEach((m,i)=>{
  const [name,ic,x,y,value]=m,pr=smooth(t,1.2+i*.3,3.7+i*.4);
  b+=reveal(G(rr(0,0,296,199,37,i===1?'#DDF3E7':'#EAF4ED')+
    cc(58,60,33,'#fff')+iconAt(ic,36,38,45,CX.forest)+
    L(34,119,name,23,CX.ink,800)+
    L(34,163,String(Math.round(value*pr)).padStart(2,'0'),41,CX.forest,900),x,y),t,.65+i*.34,.7);
 });
 b+=reveal(G(rr(0,0,644,58,28,'#1E685D')+iconAt('chart',20,12,34,'#D1F5E5')+
    L(75,39,'업무를 보는 방식이 달라집니다',23,'#fff',780),910,752),t,4.4,.75);
 return b;
}
function cutOcr(s,t){
 let b=v5Heading(s,t,true,'자료 저장부터 OCR 추출, 약사의 원본 확인까지');
 const x=150,y=285;
 b+=reveal(G(rr(0,0,440,482,34,'#EAF4EB','#8CBBAA',2)+
    rr(70,55,300,326,20,'#fff','#d4e9de',2)+
    iconAt('document',164,96,104,CX.forest)+
    L(220,257,'건강검진 자료',29,CX.ink,850,'text-anchor="middle"')+
    L(220,308,'원본 · 보안 저장',21,CX.gray,600,'text-anchor="middle"')+
    P('M117 336H323','#c2dace',8),x,y),t,.3,.8);
 const scan=cl((t-1.4)/3)*285;
 b+=G(rr(252,y+114+scan,255,9,5,'#6BDFBC')+
   cc(0,0,6,'#fff'),0,0,t>1.4&&t<5.1?.89:0);
 for(let i=0;i<4;i++){
  const yy=380+i*80,p=smooth(t,1.5+i*.48,2.6+i*.48);
  b+=pathDraw('M598 '+yy+'Q748 '+(yy-42)+' 823 '+yy,425,t,1.5+i*.5,3.1+i*.5,'#6ADDAD',3);
  b+=G(cc(0,0,8,'#F0BA80'),598+(225*p),yy-(23*Math.sin(Math.PI*p)),p);
 }
 const x2=862,y2=308;
 b+=reveal(G(rr(0,0,568,455,28,'#EAF4EE','#9BD1BB',2)+
  L(41,62,'OCR 추출 항목',32,CX.forest,850)+
  iconAt('scan',480,20,55,CX.forest),x2,y2),t,.9,.75);
 ['검진 항목','현재 복용약','영양제 정보','약사 확인 필요'].forEach((a,i)=>{
  const yy=y2+97+i*83,p=smooth(t,2+i*.73,3+i*.73);
  b+=reveal(G(rr(0,0,483,66,14,i===3?'#FFF1DC':'#fff','#d9e8df')+
    iconAt(i===3?'shield':'check',18,15,34,i===3?'#AF7F43':CX.forest)+
    L(73,45,a,25,CX.ink,800)+
    (p>.75?L(436,44,i===3?'!':'✓',23,i===3?'#AF7F43':CX.forest,850,'text-anchor="end"'):''),x2+42,yy),t,2+i*.53,.58);
 });
 return b;
}
function cutSchedule(s,t){
 let b=v5Heading(s,t,false,'복용 시간대별 제품을 직관적으로 구성하고 검토합니다');
 const cx=880,cy=514;
 b+=cc(cx,cy,288,'#E3F1E7')+cc(cx,cy,247,'none','stroke="#B3D8C9" stroke-width="55"')+
    cc(cx,cy,214,'#F8F7F2');
 const arc=[
  ['아침','☀',-90,-10,'#3F9E85'],['점심','◐',30,111,'#5A9EC8'],['저녁','☾',140,225,'#D1A56D']
 ];
 arc.forEach((z,i)=>{
  const [name,symbol,aa,bb,color]=z,p=smooth(t,.6+i*.68,1.7+i*.82);
  const radius=248,start=aa*Math.PI/180,end=(aa+(bb-aa)*p)*Math.PI/180;
  const X=a=>cx+radius*Math.cos(a),Y=a=>cy+radius*Math.sin(a);
  if(p>.01)b+=P('M'+X(start)+' '+Y(start)+'A'+radius+' '+radius+' 0 0 1 '+X(end)+' '+Y(end),color,58,'stroke-linecap="round"');
 });
 b+=brandMark(cx-71,cy-80,142,.83)+L(cx,cy+122,'복용 스케줄',37,CX.forest,850,'text-anchor="middle"');
 const info=[['아침','08:00','제품 A','capsule',376,304],['점심','12:30','제품 B','capsule',1199,304],['저녁','19:00','제품 C','capsule',1158,647]];
 info.forEach((a,i)=>{
  const [name,time,product,ic,x,y]=a;
  b+=reveal(G(rr(0,0,301,150,60,'#fff','#d6e6da',1.5,'filter="url(#shadow)"')+
     cc(57,68,40,'#E7F4EA')+iconAt(ic,32,43,50,CX.forest)+
     L(111,47,name+' '+time,22,CX.ink,850)+
     L(112,99,product,30,CX.forest,850),x,y),t,.9+i*.76,.6);
 });
 b+=reveal(G(rr(0,0,367,70,33,'#0D625A')+iconAt('check',22,18,34,'#fff')+
   L(72,45,'약사 최종 검토',26,'#fff',850),144,686),t,5,.8);
 return b;
}
function cutPrism(s,t){
 let b=v5Heading(s,t,false,'역할에 맞는 정보만 정확하게 구분하여 제공합니다');
 const lx=420,rx=1181,cy=490,p=smooth(t,2,4.4);
 b+=cc(lx,cy,180,'#E0F0E4')+cc(rx,cy,180,'#E3EFF6');
 b+=G(iconAt('pharmacist',-67,-63,137,CX.forest)+L(0,112,'약사 화면',31,CX.ink,850,'text-anchor="middle"'),lx,cy,smooth(t,.6,1.4));
 b+=G(iconAt('phone',-58,-77,139,CX.ocean)+L(0,112,'고객 화면',31,CX.ink,850,'text-anchor="middle"'),rx,cy,smooth(t,1,1.8));
 const poly='M731 341 866 341 960 490 866 639 731 639 637 490Z';
 b+=P('M600 485H731','#3E9B7D',4);
 b+=P('M962 487H999','#669BBB',4);
 b+='<polygon points="731,341 866,341 960,490 866,639 731,639 637,490" fill="#F6FCF7" stroke="#86C4AE" stroke-width="3" opacity="'+smooth(t,1.2,2)+'"/>';
 b+=iconAt('shield',755,419,92,CX.forest);
 b+=L(797,569,'정보 권한 분리',27,CX.forest,820,'text-anchor="middle"');
 b+=pathDraw('M600 485L637 490',50,t,1.7,2.7,CX.forest,5);
 b+=pathDraw('M960 490L1005 487',50,t,2.7,3.7,CX.ocean,5);
 const la=['설계 제품가','선택 제품','조제 검토'],ra=['결제 안내','구독 상태','고객 확인'];
 [la,ra].forEach((arr,g)=>arr.forEach((x,i)=>{
  const posx=g?1110:275,yy=692+i*47;
  b+=reveal(G(iconAt('check',0,0,22,g?CX.ocean:CX.forest)+L(36,22,x,23,CX.ink,700),posx,yy),t,3.2+i*.41,.5);
 }));
 b+=reveal(G(rr(0,0,517,58,27,'#F1E7DA')+L(258,39,'내부 정산정보는 고객에게 노출하지 않습니다',19,'#665A49',770,'text-anchor="middle"'),540,756),t,4.5,.65);
 return b;
}
function cutAtc(s,t){
 let b=v5Heading(s,t,true,'복용 시간과 제품 구성을 점행렬에서 검토합니다');
 const x=280,y=294,ww=1230,hh=480;
 b+=rr(x,y,ww,hh,35,'#E7F2EA','#A2D0C0',2);
 b+=L(x+52,y+70,'ATC · 복용 스케줄',33,CX.forest,900);
 const days=['월','화','수','목','금','토','일'],rows=['아침','점심','저녁'];
 days.forEach((a,i)=>b+=L(x+300+i*127,y+131,a,22,CX.ink,750,'text-anchor="middle"'));
 rows.forEach((name,r)=>{
  const yy=y+174+r*88;
  b+=iconAt('capsule',x+49,yy-20,39,CX.forest)+L(x+111,yy+13,name,27,CX.ink,800);
  days.forEach((d,c)=>{
   const active=(c+r)%3!==1,p=smooth(t,1.25+(r*7+c)*.11,2.1+(r*7+c)*.11);
   const xx=x+300+c*127;
   b+=G(cc(0,0,29,active?'#388F7C':'#d7e2de','stroke="#9fc2b5" stroke-width="1.2"')+
      (active&&p>.8?iconAt('check',-15,-15,30,'#fff',2.6):''),xx,yy,p);
  });
 });
 b+=reveal(G(rr(0,0,499,70,28,'#0D625A')+iconAt('clipboard',29,16,40,'#fff')+
    L(96,46,'약사 확인 후 다음 단계',25,'#fff',800),995,789),t,5.5,.7);
 return b;
}
function cutPhone(s,t,kind){
 let b=v5Heading(s,t,kind==='ble','휴대폰 화면과 실제 연결·동의 과정을 시각화합니다');
 const cx=913,cy=498;
 const dark=kind==='ble';
 // Real device silhouette, not an abstract rectangular card
 const body=rr(-151,-284,302,572,54,dark?'#10232a':'#1D4040',dark?'#4EA78E':'#446C64',4,'filter="url(#shadow)"')+
      rr(-133,-264,266,525,39,'#F6F9F4')+
      rr(-48,-252,96,13,7,'#365448')+
      (kind==='qr'?'<image x="-72" y="-151" width="144" height="144" href="./qr-pulsenall.svg" preserveAspectRatio="xMidYMid meet"/>':iconAt(kind==='ble'?'bluetooth':'phone',-57,-139,115,CX.forest,1.5))+
      L(0,35,kind==='ble'?'PASS 연결':kind==='qr'?'보안 링크':'고객 연결',29,CX.forest,850,'text-anchor="middle"')+
      L(0,71,kind==='ble'?'동의 확인':kind==='qr'?'리포트 미리보기':'SMS · QR',21,CX.gray,650,'text-anchor="middle"')+
      rr(-106,111,212,53,25,'#0D625A')+
      L(0,146,kind==='ble'?'고객 동의 확인':'연결하기',22,'#fff',800,'text-anchor="middle"')+
      rr(-33,239,66,5,2,'#668077');
 b+=reveal(G(body,cx,cy),t,.4,.85);
 const nodes=kind==='ble'?[['고객 동의','shield',335,344],['근접 연결','bluetooth',373,640],['허용 정보','document',1270,458]]:
 kind==='qr'?[['보안 링크','shield',328,385],['리포트 확인','document',342,651],['고객 화면','phone',1286,466]]:
 [['현장 등록','user',324,344],['SMS 전송','phone',339,639],['QR 안내','qr',1276,464]];
 nodes.forEach((n,i)=>{
  const [label,ic,x,y]=n;
  b+=pathDraw('M'+(x+75)+' '+y+'Q'+(x+cx)/2+' '+(y-40)+' '+cx+' '+cy,850,t,.8+i*.35,4.0+i*.35,dark?'#77d8b7':'#6AAE97',3);
  b+=reveal(G(cc(0,0,82,dark?'#20544C':'#fff','stroke="#A4CFB8" stroke-width="2" filter="url(#shadow)"')+
   iconAt(ic,-38,-38,76,dark?'#C5F4DD':CX.forest)+
   L(0,121,label,26,dark?'#EAFBF2':CX.ink,850,'text-anchor="middle"'),x,y),t,.7+i*.6,.7);
 });
 return b;
}
function cutDelivery(s,t,pickup=false){
 let b=v5Heading(s,t,false,pickup?'택배 배송과 약국 방문 수령을 명확하게 구분합니다':'접수부터 운송장·배송 조회까지 연결합니다');
 const startX=230,startY=509;
 b+=reveal(G(cc(0,0,127,'#E4F1E7')+iconAt('pharmacy',-56,-56,112,CX.forest)+L(0,178,'약국',31,CX.ink,850,'text-anchor="middle"'),startX,startY),t,.2,.7);
 b+=pathDraw('M355 511C550 392 811 388 974 490S1320 599 1457 449',1600,t,.6,6.3,'#3E9F86',10);
 b+=P('M355 511C550 392 811 388 974 490S1320 599 1457 449','#CFE3D7',2,'stroke-dasharray="7 17"');
 const positions=pickup?[[775,393,'약국 현장 픽업','user'],[1270,558,'고객 수령','check']]:
 [[673,419,'운송장 출력','document'],[1010,528,'택배 이동','truck'],[1372,443,'배송 조회','phone']];
 positions.forEach((d,i)=>{
  const [x,y,name,ic]=d,p=smooth(t,1.1+i*.85,2.2+i*.85);
  b+=reveal(G(cc(0,0,95,'#fff','stroke="#B2DCCC" stroke-width="2" filter="url(#shadow)"')+
    iconAt(ic,-43,-43,86,CX.forest)+
    L(0,139,name,27,CX.ink,850,'text-anchor="middle"'),x,y),t,.75+i*.8,.68);
 });
 if(!pickup){
  const px=900+300*smooth(t,3,5.3);
  b+=G(rr(-56,-35,112,70,18,'#0D625A')+iconAt('truck',-39,-25,72,'#fff'),px,367,Math.sin(Math.PI*smooth(t,2.6,6)));
  b+=reveal(G(iconAt('package',0,0,73,CX.forest)+L(96,51,'배송 진행 중',26,CX.ink,800),1035,697),t,4.5,.65);
 }else{
  b+=reveal(G(iconAt('package',0,0,106,CX.forest)+L(138,68,'약국 현장 인계',28,CX.ink,800),898,704),t,3.9,.75);
 }
 return b;
}
function cutKiosk(s,t){
 let b=v5Heading(s,t,false,'Android 키오스크와 약국 안내 화면의 디지털 연결');
 const x=774,y=267;
 b+=reveal(G(rr(0,0,533,498,35,'#173d38','#466D63',4,'filter="url(#shadow)"')+
  rr(18,17,497,446,22,'#ECF5EC')+
  L(45,64,'마음챙김',28,CX.forest,850)+
  rr(39,99,417,133,24,'#DCEFE1')+
  iconAt('pharmacy',78,127,79,CX.forest)+
  L(181,164,'약국 안내',32,CX.ink,850)+
  L(182,206,'방문 고객을 위한 연결',19,CX.gray,650)+
  rr(41,276,190,125,21,'#fff','#bedccc')+
  iconAt('qr',92,293,91,CX.forest)+
  rr(254,276,203,125,21,'#fff','#BEDCCC')+
  iconAt('chat',317,297,89,CX.forest)+
  rr(209,478,116,13,7,'#89A69A'),x,y),t,.5,.8);
 b+=reveal(G(iconAt('phone',0,0,119,CX.forest)+
   L(143,70,'상담 연결',29,CX.ink,850),258,398),t,1.9,.7);
 b+=pathDraw('M470 465Q634 324 765 476',650,t,2.2,5.5,CX.forest,6);
 return b;
}
function cutAgent(s,t){
 let b=v5Heading(s,t,false,'Windows 및 macOS 환경에서 Agent를 선택해 설치합니다');
 [['Windows Agent',310,422],['macOS Agent',1035,422]].forEach((z,i)=>{
  const [name,x,y]=z;
  b+=reveal(G(cc(0,0,191,i?'#E3EFF3':'#DDF1E8')+
    iconAt('laptop',-87,-88,174,i?CX.ocean:CX.forest)+
    rr(-171,220,345,72,31,i?'#317496':'#0D625A')+
    L(0,265,name,30,'#fff',850,'text-anchor="middle"')+
    cc(145,-131,30,t>2.4+i?'#2B9A7D':'#C3D7D0')+
    L(145,-121,t>2.4+i?'✓':'↧',30,t>2.4+i?'#fff':CX.forest,900,'text-anchor="middle"'),x,y),t,.4+i*.7,.8);
 });
 b+=reveal(G(iconAt('shield',0,0,62,CX.forest)+
   L(78,43,'정상 연결 상태를 확인합니다',26,CX.ink,850),552,767),t,4.3,.75);
 return b;
}
function cutEnd(s,t){
 let b=stageFrame(true,63,'11','마음챙김',t/s.d);
 b+=cc(1082,422,330,'url(#orb)')+
    cc(1082,422,272,'none','stroke="#78BF9C" stroke-width="2.3" stroke-dasharray="9 18"');
 b+=reveal(brandMark(827,164,510,.98),t,.3,1.2);
 b+=reveal(L(86,296,'약국 운영의',69,'#FFFFFF',850),t,.2,.85);
 b+=reveal(L(86,387,'새로운 연결.',74,'#BEF4D8',850),t,.48,.85);
 b+=reveal(koreanText('마음챙김과 함께 시작하세요.',89,477,640,34,'#E2F5EB',650,1.2,2).svg,t,1.2,.75);
 b+=reveal(G(rr(0,0,555,92,47,'#E4F3EA')+iconAt('pharmacy',32,22,50,CX.forest)+
  L(100,60,'pulsenall.com',33,CX.forest,850),84,609),t,3,.78);
 // Scannable QR for https://pulsenall.com (includes quiet zone).
 b+=reveal(G(rr(0,0,174,174,17,'#FFFFFF')+
    '<image x="10" y="10" width="154" height="154" href="./qr-pulsenall.svg" preserveAspectRatio="xMidYMid meet"/>',642,580),t,3.6,.73);
 b+=reveal(L(94,784,'협력 약국 · 약사 파트너 신청',24,'#D4F6E5',750),t,4.2,.75);
 b+=reveal(L(645,792,'QR 스캔 · 서비스 바로가기',18,'#D4F6E5',700),t,4.5,.68);
 return b;
}
const V5_SPECIAL={
 3:cutQuest,7:cutApproval,10:cutKpi,14:(s,t)=>cutPhone(s,t,'qr'),
 17:(s,t)=>cutPhone(s,t,'sms'),23:cutOcr,27:(s,t)=>cutPhone(s,t,'qr'),
 34:cutSchedule,38:cutPrism,45:cutAtc,47:(s,t)=>cutDelivery(s,t,false),
 48:(s,t)=>cutDelivery(s,t,true),57:cutAgent,59:(s,t)=>cutPhone(s,t,'ble'),
 60:cutKiosk,63:cutEnd
};
renderCompleteScene=function(s,t){
 const f=V5_SPECIAL[s.id];
 if(f)return pattern()+f(s,t);
 return OLD_SCENE_RENDER(s,t);
};