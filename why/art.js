/* WHY campaign · SVG motion art. Scene visuals are independent, fully scalable,
   authored illustrations (not screenshots, patient records or endorsements). */
(() => {
const F=(n)=>Number(n).toFixed(2), C=(n,a=0,b=1)=>Math.min(b,Math.max(a,n));
const ease=(n)=>{n=C(n);return n*n*(3-2*n)};
const show=(t,at=.1,len=.85)=>ease((t-at)/len);
const tag=(name,props,inner='')=>`<${name} ${props}>${inner}</${name}>`;
const r=(x,y,w,h,radius=18,fill='#fff',stroke='none',sw=0,more='')=>`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${radius}" fill="${fill}" stroke="${stroke}" stroke-width="${sw}" ${more}/>`;
const circle=(x,y,rad,fill,stroke='none',width=0,more='')=>`<circle cx="${x}" cy="${y}" r="${rad}" fill="${fill}" stroke="${stroke}" stroke-width="${width}" ${more}/>`;
const path=(d,stroke='#46AB85',width=5,more='')=>`<path d="${d}" stroke="${stroke}" stroke-width="${width}" stroke-linecap="round" stroke-linejoin="round" fill="none" ${more}/>`;
const line=(x1,y1,x2,y2,stroke='#86BDA0',w=3)=>path(`M${x1} ${y1}L${x2} ${y2}`,stroke,w);
const esc=(s)=>String(s).replace(/[&<>"']/g,x=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[x]));
const text=(x,y,t,size=24,color='#1D4D3E',weight=750,anchor='start',other='')=>`<text x="${x}" y="${y}" font-size="${size}" fill="${color}" font-weight="${weight}" text-anchor="${anchor}" letter-spacing="-.025em" ${other}>${esc(t)}</text>`;
const group=(content,x=0,y=0,opacity=1,scale=1,more='')=>`<g transform="translate(${F(x)} ${F(y)}) scale(${F(scale)})" opacity="${F(opacity)}" ${more}>${content}</g>`;
const tracked=(d,progress,color='#5FBE94',width=7)=>path(d,color,width,`pathLength="100" stroke-dasharray="100" stroke-dashoffset="${F(100*(1-C(progress)))}"`);
const shadow=(s)=>`<g filter="url(#lift)">${s}</g>`;
const COLOR={pine:'#0B564C',deep:'#072E33',mint:'#C7F4D9',sage:'#73AC93',gray:'#66857C',ink:'#173F39',cream:'#F8F5EE',silver:'#DFE9E5',gold:'#F3C89B'};
const paths={
 pharmacy:'M3 10h18v11H3z M3 10l2-6h14l2 6 M8 21v-8h8v8 M12 2v8 M8 6h8',
 pill:'M4 13 13 4a5.7 5.7 0 0 1 8 8l-9 9a5.7 5.7 0 0 1-8-8Z M7 10l8 8',
 truck:'M2 6h12v11H2z M14 9h4l4 5v3h-8 M6 19h.1 M18 19h.1',
 cart:'M2 3h2l3 12h13l2-9H5 M8 20h.1 M19 20h.1',
 heart:'M12 21 3 12C-2 6 5-1 12 7c7-8 14-1 9 5Z',
 person:'M12 12a4 4 0 1 0 0-8a4 4 0 0 0 0 8 M4 22c0-11 16-11 16 0',
 pharmacist:'M12 2a4 4 0 1 0 0 8a4 4 0 0 0 0-8 M4 22v-7c0-8 16-8 16 0v7 M8 13l4 5 4-5 M9 17h6',
 check:'M4 12l5 5 11-11',
 question:'M8 9c0-5 8-5 8 0 0 4-4 4-4 7 M12 21h.1',
 document:'M5 2h10l5 5v15H5z M15 2v5h5 M8 12h8 M8 16h8 M8 20h5',
 shield:'m12 2 9 4v6c0 6-4 9-9 10-5-1-9-4-9-10V6z M8 12l3 3 5-6',
 phone:'M6 2h12v20H6z M11 18h2',
 calendar:'M3 5h18v16H3z M7 2v6 M17 2v6 M3 11h18 M7 15h4',
 clock:'M12 3a9 9 0 1 1 0 18a9 9 0 0 1 0-18 M12 7v6l4 2',
 package:'m12 2 9 5v10l-9 5-9-5V7z M3 7l9 5 9-5 M12 12v10',
 sparkle:'M12 2l2.6 7.4L22 12l-7.4 2.6L12 22l-2.6-7.4L2 12l7.4-2.6z',
 ai:'M5 5h14v14H5z M9 1v4 M15 1v4 M9 19v4 M15 19v4 M1 9h4 M1 15h4 M19 9h4 M19 15h4 M9 9h6v6H9z',
 bubble:'M3 4h18v13H9l-6 4z M8 9h8 M8 13h5',
 search:'M10 3a7 7 0 1 1 0 14a7 7 0 0 1 0-14 M15 15l6 6',
 layers:'M12 2 2 7l10 5 10-5z M2 12l10 5 10-5 M2 17l10 5 10-5',
 note:'M5 2h14v20H5z M8 7h8 M8 11h8 M8 15h5',
 grid:'M2 2h9v9H2z M13 2h9v9h-9z M2 13h9v9H2z M13 13h9v9h-9z',
 double:'M2 12h20 M16 6l6 6-6 6',
 cloud:'M5 19a5 5 0 0 1-2-9 7 7 0 0 1 13-3 6 6 0 1 1 2 12z'
};
const ico=(name,x,y,size=60,color=COLOR.pine,width=1.75)=>{
 let d=paths[name]||paths.check;
 return `<g transform="translate(${x} ${y}) scale(${F(size/24)})">${path(d,color,width)}</g>`;
};
const themeBg=(s)=>{
 let dark=['dark','pivot','green','end'].includes(s.theme);
 let bg=s.theme==='dark'?'#092731':s.theme==='pivot'?'#0B5147':s.theme==='green'?'#0D5649':s.theme==='end'?'#073F39':s.theme==='warm'?'#FAF4E9':'#F8F8F4';
 let base=r(0,0,1600,900,0,bg),accent=dark?'#B6FFE0':'#BADCCA';
 base+=circle(1535,170,385,'none',dark?'#7ABFAE':'#DDEBE3',1.6,'opacity=".24"');
 base+=circle(50,900,450,'none',dark?'#89CBB2':'#D0E4D8',1.5,'opacity=".24"');
 base+=`<path d="M0 850Q430 635 814 809T1600 731" fill="none" stroke="${accent}" stroke-opacity=".12" stroke-width="2"/>`;
 return base;
};
const commonText=(s,t)=>{
 if([5,7,10,18].includes(s.id))return '';
 const dark=['dark','pivot','green','end'].includes(s.theme),h=dark?'#F5FBF8':'#164239',sub=dark?'#C0DEDB':'#64877D';
 let open=show(t,.08,.55);let moved=(1-open)*33;
 let font=s.id===6?62:67;
 let head=group(text(110,290,s.display[0],font,h,900)+text(110,376,s.display[1],font,h,900),0,moved,open);
 let cap=group(text(114,447,s.subtitle,23,sub,650),0,(1-show(t,.68,.7))*16,show(t,.68,.7));
 let eyebrow=group(r(111,158,35,5,3,dark?'#9DE6B9':'#178269')+text(161,168,s.id<5?'THE QUESTION':s.id<=12?'THE RESPONSE':'THE CHANGE',16,dark?'#99DEBF':'#358E70',850),0,0,show(t,.1,.4));
 return eyebrow+head+cap;
};
const bgCard=(x,y,w,h,color='#F8FCF8')=>shadow(r(x,y,w,h,23,color,'#D5EADD',1));
const glyphBadge=(name,x,y,label,t,delay=0,rad=71,color=COLOR.pine)=>{
 let p=show(t,delay,.62),xoff=(1-p)*16;
 let iconBg=circle(0,0,rad,'#F8FFF9','#B9D8C6',2)+ico(name,-37,-37,74,color,1.65);
 return group(iconBg+text(0,rad+42,label,23,color,790,'middle'),x+xoff,y,p,.78+.22*p);
};
const defs=`<defs><filter id="lift" x="-50%" y="-50%" width="210%" height="210%"><feDropShadow dx="0" dy="17" stdDeviation="22" flood-color="#052F23" flood-opacity=".14"/></filter><radialGradient id="spot"><stop stop-color="#41A18D" stop-opacity=".35"/><stop offset="1" stop-color="#41A18D" stop-opacity="0"/></radialGradient><linearGradient id="morph"><stop stop-color="#E7D9D0"/><stop offset=".48" stop-color="#F9FEF9"/><stop offset=".52" stop-color="#F7FFF9"/><stop offset="1" stop-color="#71927C"/></linearGradient><linearGradient id="darkfade" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#164E4D"/><stop offset="1" stop-color="#0A302F"/></linearGradient></defs>`;
const logo=(x,y,scale=1)=>group(`<path d="M0 165V58a61 61 0 0 1 122 0v107" fill="#E9DDD6"/><path d="M122 165h119a68 68 0 0 1 0 136H122z" fill="#74937D"/><path d="M122 165a122 122 0 0 1-122 122V228a63 63 0 0 1 122-63" fill="#FFFFFF"/><circle cx="91" cy="229" r="17" fill="#194A33"/>`,x,y,1,scale);
// 01: stylized infinity shelves and speed of purchase
function shelves(t){
 let p=show(t,.55,1.8),b=circle(1155,470,355,'url(#spot)');
 for(let row=0;row<3;row++){
  b+=line(795,347+row*147,1495,347+row*147,'#477579',10);
  for(let col=0;col<6;col++){
   const x=813+col*114,y=255+row*147,v=show(t,.22+row*.15+col*.09,.5);
   b+=group(r(0,0,62+(col%2)*12,87,12,col%3===0?'#A6C0BF':'#558A85',col%3===0?'#CADDD7':'#86B2AA',2)+r(7,17,50,9,4,'#DAE9E0', 'none',0,'opacity=".65"')+r(7,35,43,6,3,'#D7E7E0','none',0,'opacity=".34"'),x,y+(1-v)*35,v);
  }
 }
 b+=group(r(0,0,220,90,18,'#F2D1A5')+text(112,57,'빠른 구매',30,'#254C46',850,'middle'),1080,668,p);
 b+=group(ico('cart',0,0,105,'#E8FBF0'),1353,651,show(t,2.1,.8));
 return b;
}
// 02: enlarged bottle and question aperture
function bottle(t){
 let p=show(t,.65,1),b=circle(1160,484,325,'#103F46'),q=show(t,3.0,.8);
 b+=circle(1193,486,245,'none','#3B7779',3,'stroke-dasharray="10 19"');
 b+=group(r(90,95,208,326,49,'#E7F1E9')+r(110,55,170,68,24,'#A3C2B9')+r(124,194,144,118,16,'#A9DBCA')+ico('pill',163,210,66,COLOR.pine)+text(194,340,'선택',32,COLOR.pine,850,'middle'),986,172,p);
 b+=group(circle(0,0,121,'#F8FFF6','#B0E8CA',4)+ico('question',-43,-50,87,COLOR.pine),1370,455,q,.88+.12*q);
 b+=group(text(1177,770,'편리함 ≠ 복약 안전',31,'#E5F8EA',750,'middle'),0,0,show(t,4,.75));
 return b;
}
// 03: three intersecting ingredient sets
function venn(t){
 let p=show(t,.6,1.5),colors=['#286B6E','#377F75','#77A68C'];
 let c=[[1060,395],[1313,395],[1186,600]],b=circle(1190,494,350,'url(#spot)');
 c.forEach(([x,y],i)=>b+=group(circle(0,0,178,colors[i],'#BCECDD',3,'fill-opacity=".48"')+text(0,20,['처방약','일반약','영양제'][i],28,'#F3FFF5',820,'middle'),x,y,show(t,.35+i*.37,.8)));
 b+=group(circle(0,0,76,'#E5F6DC','#FFE1A6',4)+ico('search',-26,-29,59,'#1E5948')+text(0,114,'중복 성분 확인',24,'#EEFFED',790,'middle'),1187,475,show(t,3,.7));
 return b;
}
function delivery(t){
 let p=show(t,.5,1.2),b=circle(1130,520,330,'#18474B'),d='M855 649C1080 650 1120 400 1385 404';
 b+=path(d,'#5F8787',12,'stroke-dasharray="12 20"');b+=tracked(d,show(t,.7,3.2),'#96E2BC',9);
 b+=group(r(0,0,235,214,17,'#B8D0C3')+path('M0 50l117 65 118-65 M117 115v99','#3C7465',6)+ico('package',83,67,67,'#255749'),875,468,p);
 b+=group(circle(0,0,90,'#E8F7E8','#C3EDD4',4)+ico('question',-40,-48,80,COLOR.pine),1382,402,show(t,2.2,.75));
 b+=group(text(1190,794,'도착한 뒤, 복약 질문은 계속됩니다.',24,'#D9F2E8',700,'middle'),0,0,show(t,4,.5));
 return b;
}
function question(t){
 let p=show(t,.35,.7),b=circle(1260,450,390,'url(#spot)');
 b+=group(circle(0,0,222,'#DDF5E8','#A5E9C7',4)+ico('pharmacist',-100,-115,198,'#175B49')+text(0,148,'약사의 질문',28,'#175B49',790,'middle'),1242,430,show(t,1.1,.85));
 b+=group(text(116,321,'“지금 드시는 약이',72,'#F5FFF7',900)+text(116,423,'있나요?”',72,'#B1F6D0',900),0,(1-p)*30,p);
 b+=group(path('M640 514Q995 414 1195 502','#BCEBCF',7),0,0,show(t,3.1,1));
 return b;
}
function magnify(t){
 let p=show(t,.5,1.25),b=circle(1175,500,345,'#E6F2E9');
 const v=[[947,460,'#78BCA0'],[1095,396,'#E8D9BA'],[1244,472,'#B4D2C8']];
 v.forEach(([x,y,c],i)=>b+=group(r(0,0,107,168,54,c)+line(2,85,104,85,'#F9FFF6',5),x,y,show(t,.5+i*.25,.8)));
 b+=group(circle(0,0,181,'#FFFFFF30','#206D58',19)+path('M112 132L275 297','#206D58',30),1160,458,p,.86+.14*p);
 b+=group(ico('shield',0,0,62,COLOR.pine)+text(85,48,'검토 · 확인 · 설명',28,COLOR.ink,820),980,747,show(t,3.1,.7));
 return b;
}
function hub(t){
 let b=circle(1165,480,368,'url(#spot)');
 let pts=[[955,257,'document','건강정보'],[1393,310,'pill','복용약'],[924,691,'bubble','상담기록'],[1373,672,'calendar','후속관리']];
 pts.forEach(([x,y,icon,label],i)=>{
  let d=`M1173 464Q${(1173+x)/2} ${(464+y)/2-42} ${x} ${y}`;
  b+=tracked(d,show(t,.6+i*.15,2.5),'#ABEFCD',5);
 });
 b+=group(circle(0,0,195,'#E3F5E7','#BEF6CD',4)+logo(-93,-115,.75)+text(0,130,'마음챙김',38,'#134936',900,'middle'),1174,475,show(t,1,.8));
 pts.forEach(([x,y,icon,label],i)=>b+=group(circle(0,0,68,'#D8F2E6','#ACDBBF',3)+ico(icon,-29,-32,60,COLOR.pine)+text(0,105,label,24,'#DFFBE9',780,'middle'),x,y,show(t,1.2+i*.4,.65)));
 b+=group(text(1148,98,'전문 상담을 위한 준비',26,'#EAFDEB',700,'middle'),0,0,show(t,4,.5));
 return b;
}
function sources(t){
 let pts=[[898,334,'document','건강검진'],[1356,324,'pill','복용약'],[896,689,'heart','생활습관'],[1354,691,'layers','영양제']],b='';
 pts.forEach(([x,y,n,label],i)=>{
  b+=tracked(`M${x} ${y}Q1170 490 1164 508`,show(t,.45+i*.3,2.7),'#6AB696',6);
 });
 b+=group(circle(0,0,171,'#D8EEE1','#B3D6C5',6)+ico('document',-50,-71,112,COLOR.pine)+text(0,92,'상담 준비',32,COLOR.ink,850,'middle'),1167,503,show(t,1.7,.8));
 pts.forEach(([x,y,n,label],i)=>b+=group(circle(0,0,78,'#FFFFFF','#B6D9C4',3)+ico(n,-31,-36,68,COLOR.pine)+text(0,114,label,23,COLOR.ink,760,'middle'),x,y,show(t,.5+i*.42,.8)));
 return b;
}
function analysis(t){
 let b=group(r(0,0,610,448,32,'#FFFFFF','#D4E4D9',2)+text(45,73,'AI 건강정보 요약',32,COLOR.ink,900)+r(40,101,529,4,2,'#D9E9DE'),838,252,show(t,.4,1));
 const labels=['복용 성분 목록','중복 성분 후보','주의사항 확인','약사 검토 참고'];
 labels.forEach((label,i)=>{
  let p=show(t,1.1+i*.7,.6);
  b+=group(r(0,0,510,66,19,i===1?'#F8E8D5':'#EAF3EA')+circle(31,33,13,i===1?'#CF9B56':'#69B78E')+text(66,44,label,23,COLOR.ink,760),885,380+i*80,p);
 });
 b+=group(ico('ai',0,0,82,'#286C56'),1353,150,show(t,3,.6));
 return b;
}
function judgment(t){
 let b=circle(1250,425,331,'#226F59','none',0,'opacity=".6"');
 // Data stays behind a human silhouette.
 for(let i=0;i<9;i++)b+=group(line(943,207+i*58,1431,206+i*58,'#90D5AF',2),0,0,show(t,.25+i*.1,.4)*.28);
 b+=group(circle(0,0,167,'#C6EFDA')+ico('pharmacist',-106,-114,207,'#155545'),1235,432,show(t,.7,.9));
 b+=group(r(0,0,466,85,29,'#F3FFF4')+ico('check',25,21,51,'#17704C')+text(97,54,'약사의 최종 검토',30,'#1C5A40',850),988,703,show(t,2.8,.75));
 b+=group(text(107,275,'최종 판단은',77,'#F9FFF7',900)+text(107,365,'약사가 합니다.',77,'#B9F7CE',900)+text(113,453,'AI는 상담을 돕는 도구입니다.',27,'#D5F0E1',670),0,0,show(t,.12,.6));
 return b;
}
function conversation(t){
 let b='';let steps=[
 {x:835,y:264,w:522,from:'고객',msg:'영양제를 함께 먹어도 될까요?',col:'#FFFFFF'},
 {x:970,y:446,w:522,from:'약사',msg:'복용약부터 확인해 볼게요.',col:'#DDF1E4'},
 {x:835,y:627,w:522,from:'고객',msg:'네, 지금 복용 중인 약이 있어요.',col:'#FFFFFF'}];
 const route=['M1260 370C1362 384 1428 404 1450 443','M1050 553C980 574 921 583 904 623'];
 route.forEach((d,i)=>b+=tracked(d,show(t,1.7+i*1.3,1.2),'#74C7A4',6));
 steps.forEach((o,i)=>b+=group(bgCard(0,0,o.w,113,o.col)+ico(i===1?'pharmacist':'person',22,31,48,COLOR.pine)+text(88,39,o.from,18,'#628D76',820)+text(88,78,o.msg,24,COLOR.ink,800),o.x,o.y,show(t,.55+i*1.25,.75)));
 return b;
}
function timeline(t){
 let b=path('M807 595Q1068 399 1480 567','#C4DCCB',15),steps=[['첫 상담','bubble',876,540],['건강 정보','document',1090,468],['다음 상담','calendar',1350,530]];
 b+=tracked('M807 595Q1068 399 1480 567',show(t,.65,5),'#409D79',9);
 steps.forEach(([label,n,x,y],i)=>b+=group(circle(0,0,78,'#F8FFF8','#8CC6A3',4)+ico(n,-35,-39,72,COLOR.pine)+text(0,115,label,25,COLOR.ink,790,'middle'),x,y,show(t,1.5+i*1.2,.8)));
 b+=group(text(1140,284,'한 번의 기록이 다음 상담까지',29,COLOR.ink,780,'middle'),0,0,show(t,3.7,.5));
 return b;
}
function personalize(t){
 let b='',left=[['비타민',840,372],['기존 성분',840,505],['영양성분',840,638]];
 left.forEach(([lab,x,y],i)=>b+=group(r(0,0,217,88,40,i===1?'#E8DBD3':'#E5F1E7')+ico('pill',19,18,50,COLOR.pine)+text(81,57,lab,22,COLOR.ink,770),x,y,show(t,.5+i*.5,.7)));
 b+=tracked('M1070 508C1182 500 1175 510 1272 510',show(t,2.1,1.8),'#3C9C77',7);
 b+=group(circle(0,0,198,'#E0F2E4','#A3CCB4',4)+ico('shield',-81,-93,167,COLOR.pine)+text(0,135,'약사의 맞춤 검토',29,COLOR.ink,830,'middle'),1356,509,show(t,2.7,.9));
 b+=group(r(0,0,239,48,24,'#FAE8DB')+text(120,31,'중복 성분 재확인',20,'#8B6550',800,'middle'),886,753,show(t,1.9,.8));
 return b;
}
function calendarArt(t){
 let b=group(bgCard(0,0,595,486,'#FFFFFF')+text(43,70,'지속적인 건강관리',32,COLOR.ink,840),872,230,show(t,.5,.8));
 for(let i=0;i<4;i++){
  let x=931+i*125;
  b+=group(r(0,0,97,99,22,i===3?'#C8EADB':'#EAF2EC')+text(49,41,['10월','11월','12월','1월'][i],23,COLOR.ink,860,'middle')+circle(48,72,12,i===3?'#208564':'#79B698'),x,421,show(t,.8+i*.5,.65));
 }
 b+=tracked('M981 580C1122 637 1275 636 1419 578',show(t,1.6,3),'#50A982',6);
 b+=group(text(1165,688,'상담 → 기록 → 다음 관리',26,'#44876E',790,'middle'),0,0,show(t,3.6,.8));
 return b;
}
function cleanup(t){
 let b='',p=show(t,1,2.1);
 for(let i=0;i<7;i++){
  const x=835+(i%3)*140+(1-p)*((i%2)*40-20),y=272+Math.floor(i/3)*120+(1-p)*((i%3)*18-13);
  b+=group(r(0,0,115,82,15,'#DCEDE1','#BDD9C5',1)+r(15,25,85,5,3,'#91BAA2')+r(15,45,65,5,3,'#A8C9B2'),x,y,show(t,.25+i*.13,.55));
 }
 b+=group(circle(0,0,171,'#F4FFF4','#A2D5B4',4)+ico('bubble',-63,-74,140,COLOR.pine)+text(0,117,'상담에 집중',29,COLOR.ink,800,'middle'),1334,538,show(t,3,.8));
 return b;
}
function pharmacyArt(t){
 let b='',p=show(t,.6,1.1);
 b+=group(r(0,0,460,325,19,'#E3EEE4')+path('M0 60L230-30 460 60','#588A6C',20)+r(170,130,125,194,9,'#C1DDC4')+r(30,118,104,121,8,'#B6E4CC')+r(323,118,104,121,8,'#B6E4CC')+ico('pharmacy',179,145,107,'#255C46'),976,344,p);
 b+=group(circle(0,0,87,'#FFFFFF','#BADBC1',3)+ico('pharmacist',-33,-39,69,COLOR.pine),956,675,show(t,2,.8));
 b+=group(circle(0,0,87,'#FFFFFF','#BADBC1',3)+ico('person',-33,-39,69,COLOR.pine),1365,675,show(t,2.7,.8));
 b+=tracked('M1060 675Q1172 615 1280 675',show(t,3,1.8),'#47A37E',6);
 b+=group(text(1160,803,'기억되는 것은 상담의 경험',25,COLOR.ink,780,'middle'),0,0,show(t,4,.8));
 return b;
}
function human(t){
 let b=circle(1180,465,342,'#186D57','none',0,'opacity=".55"');
 for(let i=0;i<10;i++){const th=i*Math.PI/5,rad=263,x=1180+rad*Math.cos(th),y=465+rad*Math.sin(th);b+=tracked(`M1180 465L${F(x)} ${F(y)}`,show(t,.6+i*.07,2.3),'#B0E8C9',2)}
 b+=group(circle(0,0,200,'#DAF4E4','#A5E4C0',3)+ico('pharmacist',-101,-110,202,'#135845'),1179,450,show(t,.7,1));
 b+=group(r(0,0,536,72,29,'#EAF9EC')+ico('ai',32,16,39,COLOR.pine)+text(96,47,'AI는 약사를 지원합니다',28,COLOR.ink,860),919,740,show(t,3,.75));
 return b;
}
function endArt(t){
 let b=circle(1224,422,332,'url(#spot)');
 b+=group(circle(0,0,273,'#1B6956','#9FE5BD',2)+logo(-155,-195,1.18),1205,432,show(t,.5,1));
 b+=group(text(1204,766,'마음챙김',50,'#E7FFF0',900,'middle'),0,0,show(t,2,.7));
 b+=group(r(0,0,248,248,19,'#FFFFFF')+`<image x="13" y="13" width="222" height="222" href="./qr-pulsenall.svg"/>`,129,570,show(t,2.8,.65));
 b+=group(text(408,668,'pulsenall.com',37,'#E1FFEC',850)+text(409,710,'약국 파트너 신청',24,'#B9E6CE',650),0,0,show(t,3.3,.7));
 b+=group(text(107,268,'약국 운영의',83,'#F8FFF8',900)+text(107,370,'새로운 연결.',83,'#BDF7D4',900)+text(112,457,'약사의 전문성이 이어지는 약국.',31,'#E0F9E7',650),0,0,show(t,.6,.65));
 return b;
}
const DRAW={shelves,bottle,venn,delivery,question,magnify,hub,sources,analysis,judgment,conversation,timeline,personalize,calendar:calendarArt,cleanup,pharmacy:pharmacyArt,human,end:endArt};
window.WHY_RENDER=(scene,time)=>{
 const t=C(time,0,scene.d),p=t/scene.d,fn=DRAW[scene.art];if(!fn)throw Error('No art '+scene.art);
 let front=commonText(scene,t), art=fn(t);let fade=ease(Math.min(1,(scene.d-t)/.4));
 return defs+`<g opacity="${F(fade)}">`+themeBg(scene)+art+front+`</g>`;
};
window.WHY_SCENE_TYPES=Object.keys(DRAW);
})();
