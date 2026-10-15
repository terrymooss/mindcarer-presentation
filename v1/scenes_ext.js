/* 마음챙김 Full Story 4.0 — per-feature SVG scenes; authored independently of reference website */
const NAMES=['가입','연결','분석','상담','설계','발송'];
const darkCuts=new Set([10,13,22,23,28,31,43,46,47,56,58,59,61,63]);
const tabs=(labels,t,initial=1)=>labels.map((v,i)=>G(rr(0,0,Math.min(198,720/labels.length-10),45,13,i===initial?'#0D625A':'#edf5f0')+L(14,30,v,17,i===initial?'#fff':'#597a7e',780),i*(710/labels.length),0,1)).join('');
function wrap2(s,max=10){
 const words=String(s).trim().split(/\s+/);
 const total=String(s).replace(/\s/g,'').length+words.length-1;
 const targetCount=Math.max(1,Math.ceil(total/max));
 const ideal=Math.ceil(total/targetCount)+1;
 const out=[];let line='';
 for(const word of words){
   const units=[...word];
   if(units.length>ideal){
     if(line){out.push(line);line='';}
     while(units.length>ideal){out.push(units.splice(0,ideal).join(''));}
     if(units.length)line=units.join('');
     continue;
   }
   if(line&&(line.length+1+word.length>ideal)){out.push(line);line='';}
   line+=(line?' ':'')+word;
 }
 if(line)out.push(line);
 return out;
}
function leftFrame(s,t,{dark=false,accent='',subtitle='',padded=false}={}){
 const ink=dark?'#F3FAF8':CX.ink;
 const accentInk=dark?'#b0f4d8':CX.forest;
 let b=stageFrame(dark,s.id,String(s.chapter).padStart(2,'0'),s.name,t/s.d);
 const tag=accent||'MINDCARER · PHARMACY WORKFLOW';
 b+=reveal(L(80,179,tag,16,dark?'#7edbbf':CX.forest,850,'letter-spacing="2.1"'),t,.08,.5);
 const lines=wrap2(s.name,10);
 const maxChars=Math.max(...lines.map(x=>x.length));
 let fs=Math.min(60,Math.floor(500/maxChars));
 const stride=fs+17;
 lines.forEach((line,i)=>b+=reveal(L(80,254+i*stride,line,fs,i===lines.length-1?accentInk:ink,850),t,.18+i*.16,.72));
 let desc=(subtitle||s.caption).replaceAll(' / ',' · ');
 if(desc.length>37)desc=desc.slice(0,36)+'…';
 const y=254+(lines.length-1)*stride+fs+55;
 b+=reveal(L(81,y,desc,22,dark?'#9dc4c4':'#728e92',540),t,.9,.65);
 b+=reveal(G(rr(0,0,422,65,15,dark?'#164354':'#e7f3ec',dark?'#41737b':'#d1e7db',1)+
    L(21,40,'약국과 약사를 위한 통합 운영 플랫폼',20,dark?'#d5f0eb':CX.forest,750),80,Math.min(674,Math.max(y+42,566))),t,3.4,.65);
 return b;
}
function win(x=650,y=165,w=875,h=550,title='PHARMACY WORKSPACE',dark=false){
 return G(rr(0,0,w,h,26,dark?'#102c3e':'#fff',dark?'#39687a':'#c9ddd5',1.5,'filter="url(#shadow)"')+
   rr(0,0,w,64,25,dark?'#154e56':'#e6f3eb')+rr(0,40,w,24,0,dark?'#154e56':'#e6f3eb')+
   cc(23,31,5,dark?'#e7ae74':'#96cdb7')+cc(42,31,5,dark?'#6094a7':'#b1d5d4')+
   L(64,39,title,21,dark?'#e1f4ee':CX.forest,850),x,y);
}
function morphCard(x,y,w,h,title,desc,t,i=0,opts={}){
 const p=smooth(t,.8+i*.35,1.65+i*.35),bg=opts.bg||'#fff',fg=opts.fg||CX.ink;
 let content=rr(0,0,w,h,19,bg,opts.stroke||'#dbe9e4',1.2)+
      rr(17,19,47,45,13,opts.tint||'#e3f5ec')+
      L(40,49,String(i+1).padStart(2,'0'),17,CX.forest,850,'text-anchor="middle"')+
      L(77,52,title,opts.titleSize||22,fg,800)+
      (desc?L(77,80,desc,15,opts.subcolor||CX.gray,560):'');
 return reveal(G(content,x,y),t,.65+i*.32,.58,0,24);
}
function infoTag(x,y,text,dark=false){return G(rr(0,0,Math.max(116,text.length*15+34),38,16,dark?'#225963':'#e4f4eb')+
     L(16,26,text,16,dark?'#cdf5e9':CX.forest,800),x,y);}
function dottedPath(d,t,a=.8,b=5,light=false){return pathDraw(d,1200,t,a,b,light?'#68dcb8':'#36a68d',3);}
function renderedForm(s,t,fields,{highlight=0,footer='입력 정보를 확인합니다',type='normal',dark=false}={}){
 let b=leftFrame(s,t,{dark,accent:'STEP BY STEP · REGISTRATION'});
 const x=648,y=166;
 b+=reveal(win(x,y,876,555,type==='customer'?'CUSTOMER REGISTRATION':'PARTNER REGISTRATION',dark),t,.2,.7,0,20);
 const col=fields.length>5?2:1,per=Math.ceil(fields.length/col);
 fields.forEach((f,i)=>{
  let xx=x+27+Math.floor(i/per)*(col===2?422:0),yy=y+98+(i%per)*(col===2?100:85),w=col===2?388:815;
  const filled=smooth(t,1.05+i*.36,1.9+i*.36);
  b+=reveal(G(rr(0,0,w,79,13,dark?'#1b4350':'#f8fbf9',dark?'#456c77':'#d9e9e2',1)+
   L(19,29,f,18,dark?'#bed9dc':CX.gray,650)+
   L(19,58,filled>.6?(f.includes('코드')?'••••••':f.includes('이메일')?'example@pharmacy.kr':f.includes('연락')?'010-****-****':'입력 완료'):'─ ─ ─ ─',19,dark?'#f0f9f6':CX.ink,680)+
   (filled>.75?L(w-22,57,'✓',22,dark?'#88e1c3':CX.forest,900,'text-anchor="end"'):''),xx,yy),t,.55+i*.26,.52,0,20);
 });
 b+=reveal(G(rr(0,0,285,56,16,dark?'#63d8b5':CX.forest)+
   L(143,37,footer,18,dark?'#08373a':'#fff',850,'text-anchor="middle"'),x+876-313,y+486),t,Math.min(5.2,1.7+fields.length*.4),.65);
 return b;
}
function renderedFlow(s,t,labels,opts={}){
 let dark=Boolean(opts.dark),b=leftFrame(s,t,{dark,accent:opts.tag||'CONNECTED WORKFLOW'});
 let n=labels.length;const x=640,y=228,w=890;const vertical=n>4;
 if(vertical){
  const gap=83;
  labels.forEach((q,i)=>{
   let yy=y+i*gap;
   b+=morphCard(x+35,yy,795,72,q,'STEP '+String(i+1).padStart(2,'0'),t,i,{bg:dark?'#173e4c':'#fff',fg:dark?'#fff':CX.ink,tint:dark?'#235d5a':'#e4f3ed',stroke:dark?'#43727e':'#cfe4d9'});
   if(i<n-1)b+=pathDraw('M'+(x+430)+' '+(yy+70)+'v16',20,t,1.6+i*.45,2.6+i*.45,dark?'#72dbb4':'#278b78',3);
  });
 }else{
  const cw=890/n-16;
  labels.forEach((q,i)=>{
   const xx=x+i*(cw+16),base=y+115+(i%2?23:-8);
   b+=reveal(G(rr(0,0,cw,243,19,dark?'#184551':'#fff',dark?'#406e70':'#d5e6dd',1.2,'filter="url(#shadow)"')+
    cc(cw/2,70,38,dark?'#296c67':'#e6f5ec')+
    L(cw/2,79,String(i+1).padStart(2,'0'),25,dark?'#f1f9f4':CX.forest,850,'text-anchor="middle"')+
    L(cw/2,156,q,Math.min(24,Math.floor(cw/q.length*1.5)),dark?'#eef9f5':CX.ink,850,'text-anchor="middle"')+
    L(cw/2,195,'운영 단계',15,dark?'#9bcbca':CX.gray,600,'text-anchor="middle"'),xx,base),t,.65+i*.56,.65,0,33);
   if(i<n-1)b+=pathDraw('M'+(xx+cw)+' '+(base+130)+'h16',18,t,1.3+i*.48,2+i*.48,dark?'#72dabc':'#208c7c',3);
  });
 }
 return b;
}
function renderedComparison(s,t,headA,headB,valsA,valsB,opts={}){
 let dark=Boolean(opts.dark);
 let b=leftFrame(s,t,{dark,accent:'TWO PERSPECTIVES · ONE PLATFORM'});
 const x=634,y=192,ww=420;
 [[headA,valsA,CX.forest],[headB,valsB,CX.ocean]].forEach((a,k)=>{
  let xx=x+k*462;
  b+=reveal(G(rr(0,0,ww,508,24,dark?'#153d4b':'#fff',dark?'#417b79':'#d6e6e0',1.3,'filter="url(#shadow)"')+
   rr(0,0,ww,84,24,k?'#e5f2fa':'#e1f3eb')+rr(0,65,ww,19,0,k?'#e5f2fa':'#e1f3eb')+
   L(31,53,a[0],30,k?CX.ocean:CX.forest,900),xx,y),t,.4+k*.25,.65,0,25);
  a[1].forEach((item,i)=>{
   const yy=y+114+i*95;
   b+=reveal(G(rr(0,0,370,77,14,dark?'#205361':'#f7faf8',dark?'#43747d':'#e1ece6',1)+
      cc(31,37,15,k?'#4B9BC6':'#52B89E')+L(31,43,'✓',18,'#fff',900,'text-anchor="middle"')+
      L(62,46,item,22,dark?'#e9f5f5':CX.ink,760),xx+24,yy),t,1.2+i*.62+k*.12,.6);
  });
 });
 b+=reveal(G(cc(0,0,37,'#e0f4ea')+L(0,9,'≠',29,CX.forest,900,'text-anchor="middle"'),1068,710),t,4.8,.7);
 return b;
}
function renderedDashboard(s,t,kind='pharmacy'){
 const dark=s.id===10||s.id===43;
 let b=leftFrame(s,t,{dark,accent:kind==='pharmacist'?'PHARMACIST OPERATIONS':'PHARMACY OPERATIONS',subtitle:s.caption});
 const x=618,y=162,w=915,h=564;
 b+=reveal(G(rr(0,0,w,h,25,'#f9fcfa','#9ac9bd',1.4,'filter="url(#dshadow)"')+
  rr(0,0,w,51,25,'#e4f2ed')+rr(0,30,w,21,0,'#e4f2ed')+
  cc(22,25,6,'#e7b27a')+cc(40,25,6,'#b8d8cb')+
  L(72,33,kind==='pharmacist'?'약사 대시보드':'약국 대시보드',20,CX.forest,850)+
  rr(0,51,180,h-51,0,'#0e6059'),x,y),t,.2,.8);
 const nav=kind==='pharmacist'?['개요','발송 필요','배송 관리','송장 출력','전체 고객']:['대시보드','고객 관리','상담','운영 인박스','정산'];
 nav.forEach((n,i)=>{
  b+=reveal(G(rr(0,0,158,52,10,i===0?'#29857a':'none')+
     L(17,34,n,19,i===0?'#fff':'#9bdbcc',750),x+10,y+75+i*65),t,.55+i*.16,.45);
 });
 const hdr=['운영 현황','오늘 확인할 업무','고객 구독 현황','조제·발송 현황'];
 b+=reveal(G(L(0,0,kind==='pharmacist'?'조제·발송 업무 요약':'약국 운영 현황',32,CX.ink,850)+L(0,35,'마지막 동기화 · 화면 예시',16,CX.gray,560),x+214,y+119),t,.75,.75);
 const cards=kind==='pharmacist'?[['발송 필요','06'],['발송 완료','18'],['상담 확인','03'],['전체 고객','42']]:[['신규 상담','04'],['승인 대기','03'],['발송 대상','06'],['구독 고객','42']];
 cards.forEach((a,i)=>{
  const xx=x+206+i*169,yy=y+173;
  b+=reveal(G(rr(0,0,156,120,15,'#fff','#dce9e4',1)+
    L(18,35,a[0],18,CX.gray,650)+
    L(19,86,String(Math.round(Number(a[1])*smooth(t,1.5+i*.17,3+i*.17))).padStart(2,'0'),38,i===2?'#CF8A4D':CX.forest,900),xx,yy),t,1.1+i*.16,.48);
 });
 let yy=y+333;
 b+=reveal(G(rr(0,0,430,167,14,'#fff','#e0eae6',1)+
   L(19,34,'월간 운영 흐름',19,CX.ink,800)+
   P('M22 133L82 106L147 116L208 70L267 85L331 40L403 51',CX.forest,4)+
   P('M22 145L82 134L147 119L208 128L267 106L331 90L403 75','#7EB7CE',3),x+206,yy),t,2.5,.7);
 b+=reveal(G(rr(0,0,240,167,14,'#fff','#dfeae5',1)+L(18,34,'운영 알림',19,CX.ink,800)+
    badge(17,54,'상담 확인','#e8f3e9',CX.forest,190)+
    badge(17,104,'발송 확인','#fff0df','#ad742f',190),x+649,yy),t,3.2,.7);
 b+=reveal(G(rr(0,0,675,24,8,'#E9F4EF')+rr(0,0,675*smooth(t,3,5),24,8,'#80CBBB'),x+206,y+526),t,2.9,.5);
 return b;
}
function renderedMetrics(s,t,values,tag='OPERATION OVERVIEW'){
 let dark=darkCuts.has(s.id),b=leftFrame(s,t,{dark,accent:tag});
 const x=655,y=177;
 const colors=['#0d625a','#2973a2','#e4a567','#328e83'];
 values.slice(0,4).forEach((a,i)=>{
  let xx=x+(i%2)*432,yy=y+Math.floor(i/2)*206;
  let val=a[1],num=Math.round(Number(val)*smooth(t,1.1+i*.25,2.6+i*.25));
  b+=reveal(G(rr(0,0,410,181,23,dark?'#173e4c':'#fff',dark?'#3e7179':'#d9e8e0',1.3,'filter="url(#shadow)"')+
   cc(44,43,20,colors[i])+
   L(44,50,String(i+1),19,'#fff',850,'text-anchor="middle"')+
   L(79,50,a[0],23,dark?'#effaf4':CX.ink,780)+
   L(40,130,String(num).padStart(2,'0'),52,dark?'#a2ead3':colors[i],900)+
   L(154,129,a[2]||'업무 상태',18,dark?'#9dc0c2':CX.gray,500),xx,yy),t,.6+i*.33,.7);
 });
 let x0=x,y0=y+448;
 b+=reveal(G(rr(0,0,843,92,17,dark?'#153d4b':'#e5f2ed',dark?'#427981':'#d5e8dd',1)+
    L(22,34,'업무 추이 / 예시 지표',20,dark?'#e5f7ed':CX.forest,800)+
    L(22,65,'상태를 한눈에 확인하도록 구성한 운영 화면',17,dark?'#90b5b6':CX.gray,600)+
    P('M534 70Q580 52 626 58T723 27T812 30',dark?'#6dd4b7':CX.forest,4),x0,y0),t,3.4,.65);
 return b;
}
function renderedCalendar(s,t,mode='month'){
 let b=leftFrame(s,t,{accent:'SUBSCRIPTION CALENDAR · SCHEDULE'});
 const x=653,y=162;
 b+=reveal(win(x,y,862,568,mode==='cycle'?'다음 회차 일정':'월간 운영 캘린더'),t,.25,.7);
 const days=['일','월','화','수','목','금','토'];
 days.forEach((d,i)=>b+=L(x+69+i*112,y+112,d,18,i===0?'#c87d51':CX.gray,800,'text-anchor="middle"'));
 const cells=28;
 for(let i=0;i<cells;i++){
  const col=i%7,row=Math.floor(i/7);
  const xx=x+26+col*112,yy=y+126+row*96;
  const active=[2,6,9,14,17,20,24].includes(i),p=smooth(t,.9+i*.08,2.3+i*.08);
  b+=reveal(G(rr(0,0,103,87,13,active?'#e6f5ec':'#fbfdfb','#e1ece7',1)+
      L(14,25,String(i+1),18,active?CX.forest:CX.gray,800)+
      (active?rr(12,42,76*p,9,4,i%3===0?'#e4a36e':'#55b6a1'):'')+
      (active?L(12,74,['결제 예정','설계 확인','발송 관리'][i%3],11,CX.forest,750):''),xx,yy),t,.6+i*.06,.37);
 }
 b+=reveal(G(rr(0,0,739,36,12,'#e7f3ec')+L(20,25,'상담 · 설계 · 결제 · 배송 일정을 한 화면에서 확인',16,CX.forest,750),x+45,y+524),t,4.4,.65);
 return b;
}
function renderedInbox(s,t,items,which='업무 인박스'){
 let dark=darkCuts.has(s.id),b=leftFrame(s,t,{dark,accent:'INBOX · NOTIFICATIONS'});
 const x=647,y=176;
 b+=reveal(win(x,y,871,555,which,dark),t,.25,.75);
 let yy=y+82;
 items.forEach((a,i)=>{
  const xx=x+26,sy=yy+i*85,priority=i===0||i===2;
  b+=reveal(G(rr(0,0,817,72,14,dark?'#193f4a':'#fbfdfb',priority?(dark?'#b88c59':'#f2bb83'):(dark?'#416c76':'#e0ebe5'),priority?2:1)+
   cc(31,34,13,priority?'#e8a66e':'#4caa99')+
   L(31,40,priority?'!':'✓',18,'#fff',850,'text-anchor="middle"')+
   L(60,33,a[0],21,dark?'#eef8f4':CX.ink,850)+L(61,59,a[1]||'담당자 확인 필요',15,dark?'#a8ced0':CX.gray,500)+
   badge(676,18,i===0?'신규':'확인 대기',priority?'#fff0df':'#e7f5ee',priority?'#bb7837':CX.forest,117),xx,sy),t,.8+i*.32,.6,0,35);
 });
 b+=reveal(G(rr(0,0,810,38,10,dark?'#255565':'#e6f4ed')+
    L(24,27,'업무 처리 상태를 확인하고 중요한 항목을 먼저 살펴봅니다',17,dark?'#d4f4e9':CX.forest,750),x+30,y+504),t,4.9,.65);
 return b;
}
function renderedQR(s,t,type='code'){
 let b=leftFrame(s,t,{accent:'PARTNER CONNECTION · INVITATION'});
 const x=650,y=172;
 b+=reveal(win(x,y,865,553,type==='phone'?'CUSTOMER LINK PREVIEW':'PARTNER INVITATION'),t,.25,.72);
 let core=x+150;
 b+=reveal(G(rr(0,0,323,417,25,'#F9FCFA','#d5e4de',1)+
   L(26,47,type==='phone'?'고객 초대 링크':'약국 초대 QR',27,CX.ink,850)+
   rr(26,71,268,268,15,'#fff','#dce7e1',1),x+32,y+91),t,.9,.75);
 // decorative QR, explicitly non-scannable
 const seed=s.id*19;
 for(let i=0;i<10;i++)for(let j=0;j<10;j++){
  const on=((i*i+j*3+seed)%5<3)||((i+j)%7===0);
  if(on)b+=G(rr(0,0,15,15,2,'#256b61'),x+84+j*20,y+176+i*20,Math.min(1,smooth(t,1.1+(i+j)*.04,2.2+(i+j)*.04)));
 }
 b+=L(x+67,y+471,'시각화 예시 · 실제 QR 아님',15,CX.gray,600);
 const labels=type==='phone'?['고객 화면 확인','보안 링크 안내','약국 연결']:['약국 고유코드','초대 링크 생성','파트너 연결'];
 labels.forEach((a,i)=>{
  b+=morphCard(x+390,y+115+i*111,421,95,a,'단계 '+String(i+1).padStart(2,'0'),t,i,{titleSize:25});
  if(i<2)b+=pathDraw('M'+(x+600)+' '+(y+211+i*111)+'v16',25,t,2.5+i*.48,3.4+i*.48,CX.forest,3);
 });
 return b;
}
function renderedTable(s,t,mode='customer'){
 let dark=s.id===44||s.id===49,b=leftFrame(s,t,{dark,accent:mode==='customer'?'CUSTOMER MANAGEMENT':'DISPENSING & DELIVERY'});
 const x=636,y=165;
 b+=reveal(win(x,y,889,559,mode==='customer'?'고객 관리 · 상태 분류':mode==='shipping'?'발송 필요 고객':'배송 관리 · 업무 조회',dark),t,.25,.8);
 const cols=mode==='customer'?['고객','상태','최근 활동','담당']:mode==='shipping'?['발송 대상','설계 상태','조제 상태','다음 작업']:['고객','송장','배송 상태','배송 방식'];
 const labels=mode==='customer'?['고객 A','고객 B','고객 C','고객 D']:mode==='shipping'?['고객 A','고객 B','고객 C','고객 D']:['고객 A','고객 B','고객 C','고객 D'];
 b+=reveal(G(rr(0,0,825,52,12,dark?'#286573':'#E8F4ED')+
    cols.map((v,i)=>L(23+i*205,34,v,20,dark?'#eaf9ef':CX.forest,800)).join(''),x+32,y+91),t,.8,.6);
 labels.forEach((person,i)=>{
  const xx=x+32,yy=y+158+i*81;
  const statuses=mode==='customer'?['구독 중','상담 대기','검토 중','관리 중']:
                 mode==='shipping'?['발송 필요','조제 대기','확정 확인','발송 완료']:
                 ['배송 중','배송 완료','송장 확인','현장 픽업'];
  const vals=[person,statuses[i],mode==='shipping'?'설계 확인':i===0?'업데이트 완료':'기록 확인',mode==='customer'?'약사 계정':mode==='shipping'?'조제 확인':'택배'];
  b+=reveal(G(rr(0,0,824,71,11,dark?'#174352':i===0?'#f0f8f2':'#fff',dark?'#49717c':'#e4eee8',1)+
    vals.map((v,j)=>L(20+j*205,44,v,j===0?21:18,j===1?(i===0?'#188e73':'#b07f51'):(dark?'#edf7f6':CX.ink),j===0?850:650)).join(''),xx,yy),t,1.05+i*.38,.56,0,30);
 });
 b+=reveal(G(rr(0,0,823,30,10,dark?'#1b4f59':'#eef5ef')+L(15,23,'필터·검색·업무 상태는 화면 설명을 위한 모식 데이터입니다',16,dark?'#c0ece1':CX.gray,640),x+34,y+507),t,4.6,.7);
 return b;
}
function renderedTimeline(s,t,steps,{dark=false,tag='CUSTOMER JOURNEY'}={}){
 let b=leftFrame(s,t,{dark,accent:tag});
 const x=673,y=167;
 b+=reveal(G(rr(0,0,832,548,27,dark?'#153947':'#fff',dark?'#4c7f82':'#d3e5dc',1,'filter="url(#shadow)"')+
  L(39,57,tag==='CONSULTATION RECORD'?'상담 기록 타임라인':'고객 활동 타임라인',30,dark?'#f2f9f7':CX.ink,850)+
  P('M77 105V490',dark?'#358e84':'#D4E8DA',4),x,y),t,.2,.7);
 steps.slice(0,5).forEach((z,i)=>{
  let xx=x+112,yy=y+115+i*85;
  const active=smooth(t,1+i*.7,2.2+i*.7);
  b+=reveal(G(cc(0,0,20,i<3?'#1d917b':'#69aac0')+
    L(0,7,String(i+1),16,'#fff',850,'text-anchor="middle"'),x+77,yy+24),t,.65+i*.5,.5);
  b+=reveal(G(rr(0,0,644,73,16,dark?'#1a4b57':'#f8faf8',dark?'#497680':'#e4eee8',1)+
    L(23,31,z,23,dark?'#f3faf7':CX.ink,800)+
    L(23,58,i<3?'업무 기록이 연결됩니다':'후속 업무 진행',16,dark?'#9dc5c4':CX.gray,550)+
    badge(507,20,active>.8?'기록 확인':'진행 중',active>.8?'#e2f3e9':'#fff1e4',CX.forest,117),xx,yy),t,.85+i*.48,.6,0,24);
 });
 return b;
}
function renderedConsent(s,t,variant='consent'){
 let b=leftFrame(s,t,{dark:variant==='pass',accent:variant==='pass'?'SECURE BLUETOOTH CONNECTION':'CONSENT FIRST · RECORDING'});
 const dark=variant==='pass',x=674,y=185;
 b+=reveal(G(rr(0,0,819,515,27,dark?'#153c49':'#fff',dark?'#40707a':'#d4e6df',1,'filter="url(#shadow)"')+
  L(40,56,variant==='pass'?'PASS · 동의 기반 근접 연결':'방문 상담 기록',31,dark?'#eff9f8':CX.ink,850),x,y),t,.25,.75);
 const list=variant==='pass'?['고객 스마트폰','동의 확인','근접 연결','허용된 정보 전송']:['상담 메모','녹음 사전 안내','고객 동의 확인','상담 기록 저장'];
 list.forEach((name,i)=>{
  const yy=y+95+i*96,on=t>1.4+i*.75;
  b+=reveal(G(rr(0,0,744,81,15,dark?'#1e5360':'#f8fbf9',dark?'#457c7e':'#deebe3',1)+
    cc(43,40,22,on?'#25977c':'#d4e4df')+
    L(43,47,on?'✓':String(i+1),20,on?'#fff':CX.forest,850,'text-anchor="middle"')+
    L(92,48,name,24,dark?'#f2faf7':CX.ink,800)+
    L(705,47,on?'완료':'대기',18,on?'#72e4bd':CX.gray,850,'text-anchor="end"'),x+37,yy),t,.7+i*.46,.58);
 });
 return b;
}
function renderedUpload(s,t,mode='upload'){
 const dark=mode==='ocr';let b=leftFrame(s,t,{dark,accent:'SECURE DOCUMENT WORKFLOW'});
 const x=646,y=175;
 b+=reveal(win(x,y,860,552,mode==='ocr'?'OCR · 문서 추출 대기':'건강자료 보안 업로드',dark),t,.27,.7);
 if(mode==='upload'){
   b+=reveal(G(rr(0,0,805,246,19,'#f8fcfa','#83bfb0',2,'stroke-dasharray="9 9"')+
      cc(403,84,43,'#def3e9')+L(403,98,'↑',43,CX.forest,850,'text-anchor="middle"')+
      L(403,169,'파일을 선택하거나 드래그하여 업로드',24,CX.ink,850,'text-anchor="middle"')+
      L(403,207,'보안 저장 후 약사가 확인합니다',17,CX.gray,600,'text-anchor="middle"'),x+28,y+85),t,.65,.7);
   ['건강검진 자료','처방전','약 봉투','기타 자료'].forEach((c,i)=>{
    b+=reveal(G(rr(0,0,182,96,14,'#edf7f2','#d9e9e0')+
        L(90,34,'▣',27,CX.forest,780,'text-anchor="middle"')+L(91,75,c,18,CX.ink,700,'text-anchor="middle"'),x+34+i*198,y+362),t,1.25+i*.48,.65);
   });
   b+=reveal(G(rr(0,0,786,45,12,'#e6f3ed')+rr(0,0,786*smooth(t,3.5,5.7),45,12,CX.forest)+
   L(394,30,'보안 저장 중 → 완료',18,t>5.3?'#fff':CX.gray,800,'text-anchor="middle"'),x+35,y+475),t,3.5,.55);
 }else{
  ['NAS 보안 저장','OCR 텍스트 추출','원본 대조','약사 검토'].forEach((a,i)=>{
   b+=reveal(G(rr(0,0,769,99,16,'#1a4856','#3d707a',1)+
    cc(47,49,27,'#267b70')+L(47,57,String(i+1),24,'#e5faee',850,'text-anchor="middle"')+
    L(97,45,a,25,'#eefaf8',800)+L(97,74,'자료 내용과 보안 상태 확인',17,'#a1c8c4',560)+
    badge(608,31,t>1.9+i*.66?'확인':'대기','#e3f5eb',CX.forest,126),x+40,y+87+i*112),t,.85+i*.55,.65);
  });
 }
 return b;
}
function renderedDiff(s,t,caseName='ocr'){
 let b=leftFrame(s,t,{accent:caseName==='ocr'?'SOURCE VERIFICATION':'INGREDIENT SAFETY REVIEW'});
 const x=641,y=182;
 const headings=caseName==='ocr'?['원본 자료','OCR 추출값']:caseName==='product'?['기존 복용제품','신규 설계 제품']:['이전 회차 설계','다음 회차 설계'];
 const entries=caseName==='ocr'?[['혈압 항목','검진표 대조'],['복용약 기재','원본과 확인'],['검토 필요값','약사 확인']]:
 caseName==='product'?[['제품 A','성분 확인'],['제품 B','중복 여부'],['제품 C','복용 목적']]:
 [['기존 설계 제품','변경 사항 확인'],['복용 스케줄','변경 내역 비교'],['약사 확인','다음 회차 반영']];
 headings.forEach((h,k)=>{
  const xx=x+k*447;
  b+=reveal(G(rr(0,0,424,510,23,'#fff','#d7e6df',1,'filter="url(#shadow)"')+
    rr(0,0,424,69,23,k===0?'#e8f4ed':'#ebf3f9')+
    rr(0,44,424,25,0,k===0?'#e8f4ed':'#ebf3f9')+
    L(25,46,h,27,k===0?CX.forest:CX.ocean,850),xx,y),t,.35+k*.24,.65);
  entries.forEach((v,i)=>{
   const yy=y+110+i*118;
   b+=reveal(G(rr(0,0,382,96,15,'#f9fbfa',i===1?'#edc69c':'#e4ece7',i===1?1.7:1)+
      L(20,42,k===0?v[0]:v[1],22,CX.ink,800)+
      L(20,72,i===1?'검토 표시':'상태 확인',16,i===1?'#ac7331':CX.gray,650),xx+20,yy),t,1+i*.6+k*.28,.65);
  });
 });
 b+=reveal(G(cc(0,0,29,'#fff','stroke="#d4e5dd"')+L(0,8,'⇄',26,CX.forest,850,'text-anchor="middle"'),x+436,y+273),t,3.1,.65);
 return b;
}
function renderedFusion(s,t){
 let b=leftFrame(s,t,{accent:'SINGLE CUSTOMER HEALTH CONTEXT'});
 const cx=1117,cy=454,pts=[['검진',780,191],['복용약',1100,182],['영양제',1425,231],['문진',1498,577],['상담',823,674]];
 b+=cc(cx,cy,274,'#d7efe7','opacity=".6"')+cc(cx,cy,221,'none','stroke="#9ad2c0" stroke-width="1.6" stroke-dasharray="5 12"');
 pts.forEach((a,i)=>{
  b+=pathDraw('M'+a[1]+' '+a[2]+'L'+cx+' '+cy,710,t,.75+i*.17,3.65+i*.17,CX.forest,2.4);
  b+=reveal(G(cc(0,0,49,'#fff','stroke="#b5d9cb" stroke-width="1.4" filter="url(#shadow)"')+
    L(0,8,a[0],20,CX.forest,800,'text-anchor="middle"'),a[1],a[2]),t,.45+i*.32,.62);
 });
 b+=reveal(G(cc(0,0,154,'#0d625a')+L(0,-18,'고객 건강정보',28,'#fff',850,'text-anchor="middle"')+
    L(0,26,'통합 상담 맥락',24,'#aeecd6',750,'text-anchor="middle"'),cx,cy),t,1.7,.8);
 b+=wave(cx,cy,165,t,.1);
 return b;
}
function renderedChat(s,t,withReport=false){
 let dark=withReport,b=leftFrame(s,t,{dark,accent:'PHARMACIST CONSULTATION · LIVE'});
 const x=657,y=171;
 b+=reveal(win(x,y,850,552,'상담 메시지 · 약사와 고객',dark),t,.2,.8);
 const bubbles=[['고객','현재 복용 중인 제품이 있습니다.'],['약사','복용 중인 제품을 먼저 확인하겠습니다.'],['고객','기존 복용약과 함께 검토 부탁드립니다.'],['약사','건강정보를 참고해 안내드리겠습니다.']];
 bubbles.forEach((msg,i)=>{
  const isC=i%2===0,xx=x+(isC?236:37),yy=y+82+i*105;
  b+=reveal(G(rr(0,0,572,86,17,isC?'#e6f4ee':dark?'#20525b':'#e8f1fa',dark?'#477780':'#d5e7e0',1)+
    L(21,30,msg[0],17,isC?CX.forest:CX.ocean,800)+
    L(21,64,msg[1],19,dark?'#ebf7f5':CX.ink,690),xx,yy),t,.85+i*.76,.58,0,25);
 });
 b+=reveal(G(rr(0,0,799,45,12,dark?'#1e5361':'#e9f3ed')+
    L(25,31,withReport?'건강 분석 요약을 확인하면서 상담':'답변을 기록하고 필요한 업무로 연결',19,dark?'#e5f5f1':CX.forest,800),x+25,y+498),t,4.5,.65);
 return b;
}
function renderedOptions(s,t,labels,kind='method'){
 let dark=kind==='agent',b=leftFrame(s,t,{dark,accent:kind==='agent'?'DESKTOP AGENT INSTALLATION':s.id===4?'PHARMACY PARTNER APPLICATION':'CUSTOMER REGISTRATION OPTIONS'});
 const x=653,y=197;
 labels.forEach((n,i)=>{
   const w=labels.length===2?401:270,xx=x+i*(w+18),yy=y+90+(i%2)*17,selected=i===0;
   b+=reveal(G(rr(0,0,w,326,23,dark?'#194450':'#fff',dark?'#48757a':'#d8e7df',1.5,'filter="url(#shadow)"')+
   cc(w/2,83,48,selected?(dark?'#296f66':'#e1f4ea'):(dark?'#28617b':'#e7f1f7'))+
   L(w/2,95,kind==='agent'?(i===0?'W':'M'):['1','2','3'][i],34,dark?'#e9fcf4':CX.forest,900,'text-anchor="middle"')+
   L(w/2,173,n,Math.min(29,Math.floor(w/Math.max(3,n.length)*1.8)),dark?'#e5f9f3':CX.ink,850,'text-anchor="middle"')+
   L(w/2,224,kind==='agent'?'Agent 설치 및 실행':'고객 연결 방식',17,dark?'#b3d6d1':CX.gray,560,'text-anchor="middle"')+
   badge(w/2-66,260,i===0?'이용 가능':'선택 가능',dark?'#d3f6e3':'#e4f4ed',CX.forest,134),xx,yy),t,.65+i*.52,.75,0,32);
 });
 b+=reveal(G(rr(0,0,820,54,16,dark?'#245663':'#e4f3eb')+
  L(23,36,kind==='agent'?'Windows / macOS용 Agent를 선택해 설치합니다':'고객 상황에 맞는 등록 경로를 선택합니다',21,dark?'#e4fcf2':CX.forest,780),x,y+462),t,4.3,.7);
 return b;
}
function renderedScheduler(s,t,inventory=false){
 let b=leftFrame(s,t,{accent:inventory?'INVENTORY AWARE DESIGN':'PERSONALIZED DOSAGE PLANNER'});
 const x=638,y=174;
 b+=reveal(win(x,y,888,555,'제품·복용 스케줄 설계'),t,.3,.7);
 const times=['아침','점심','저녁'],colors=['#E7F4EE','#E9F2FA','#FEF3E5'];
 times.forEach((nm,i)=>{
  const xx=x+28+i*283,yy=y+119;
  b+=reveal(G(rr(0,0,269,315,19,colors[i],'#d9e9e1',1)+
   cc(133,63,36,'#fff')+
   L(133,75,['☀','◐','☾'][i],34,i===1?CX.ocean:CX.forest,800,'text-anchor="middle"')+
   L(133,140,nm,30,CX.ink,850,'text-anchor="middle"')+
   L(133,174,['08:00','12:30','19:00'][i],17,CX.gray,600,'text-anchor="middle"')+
   rr(27,203,214,73,15,'#fff','#dce8e1',1)+
   L(133,245,'제품 '+['A','B','C'][i],24,CX.forest,850,'text-anchor="middle"'),xx,yy),t,.6+i*.52,.72);
 });
 b+=reveal(G(rr(0,0,821,62,16,inventory?'#fff0e3':'#e7f3ed')+
  L(25,39,inventory?'! 재고 상태를 확인한 후 제품을 재검토합니다':'복용량과 시간대를 확인하고 저장합니다',22,inventory?'#B57C3B':CX.forest,800),x+31,y+461),t,4.4,.65);
 return b;
}
function renderedDraft(s,t,review=false){
 let b=leftFrame(s,t,{accent:review?'PHARMACIST REVIEW & SEND':'AI MEDICATION GUIDE DRAFT'});
 const x=652,y=168;
 b+=reveal(win(x,y,859,559,review?'복약지도 미리보기 · 약사 수정':'AI 복약지도 초안'),t,.25,.65);
 b+=reveal(G(rr(0,0,795,425,19,'#fcfdfc','#dfeae5',1)+
    L(28,48,'고객 맞춤 복약지도',30,CX.ink,850)+
    L(28,85,'영양제 복용 구성과 상담 내용을 바탕으로 안내 초안 작성',18,CX.gray,600),x+30,y+85),t,.7,.65);
 const lines=[['복용 목적','상담 내용과 제품 구성을 확인'],['복용 시간','아침 · 점심 · 저녁 일정 확인'],['주의사항','기존 복용약과 중복 성분 검토']];
 lines.forEach((it,i)=>{
   b+=reveal(G(rr(0,0,736,82,14,review&&i===1?'#fff4e7':'#f3f8f5',review&&i===1?'#e7b987':'#e1eae4',1)+
    L(21,33,it[0],22,CX.forest,800)+L(21,62,it[1],18,CX.gray,550)+
    (review&&i===1?badge(589,23,'수정', '#fae8d6','#ab733b',118):''),x+60,y+182+i*96),t,1.3+i*.64,.6);
 });
 b+=reveal(G(rr(0,0,782,48,13,CX.forest)+
 L(391,32,review?'약사 검토 완료 후 전달':'AI 초안 · 약사 검토 필요',20,'#fff',850,'text-anchor="middle"'),x+38,y+481),t,5.2,.65);
 return b;
}
function renderedPayment(s,t){
 let b=leftFrame(s,t,{accent:'CUSTOMER APPROVAL · PAYMENT STATUS'});
 const x=663,y=178;
 b+=reveal(G(rr(0,0,835,535,26,'#fff','#ccded8',1.4,'filter="url(#shadow)"')+
   L(37,61,'고객 설계 확인',31,CX.ink,850)+
   rr(36,82,760,3,2,'#e5efeb'),x,y),t,.3,.72);
 ['맞춤 영양제 구성 확인','복용 안내 확인','결제 요청','결제 상태 조회'].forEach((v,i)=>{
  const xx=x+35,yy=y+114+i*91,passed=t>1.45+i*.86;
  b+=reveal(G(rr(0,0,760,76,15,passed?'#e6f4ec':'#f9fbf9','#dfe9e2',1)+
    cc(35,38,22,passed?'#299a7e':'#bfdbd1')+
    L(35,45,passed?'✓':String(i+1),21,'#fff',850,'text-anchor="middle"')+
    L(79,47,v,23,CX.ink,800),xx,yy),t,.85+i*.64,.62);
 });
 b+=reveal(G(rr(0,0,600,42,14,'#e5f2ea')+L(300,28,'완료 표시는 실제 결제 확인 상태를 기준으로',17,CX.forest,750,'text-anchor="middle"'),x+120,y+479),t,5.6,.65);
 return b;
}
function renderedGate(s,t,labels,{dark=false,warning=false}={}){
 let b=leftFrame(s,t,{dark,accent:warning?'SEPARATE OPERATIONS':'DOUBLE CHECK · SAFE FULFILLMENT'});
 const x=660,y=197;
 labels.slice(0,2).forEach((nm,i)=>{
  const xx=x+i*444,yy=y+82;
  b+=reveal(G(rr(0,0,421,338,25,dark?'#163e4a':'#fff',dark?'#4a777b':'#d9e7df',1.5,'filter="url(#shadow)"')+
   cc(210,89,55,i===0?'#DDF3E6':'#E6F1F9')+
   L(210,104,i===0?'1':'2',37,i===0?CX.forest:CX.ocean,900,'text-anchor="middle"')+
   L(210,188,nm,Math.max(23,32-nm.length),dark?'#eef9f5':CX.ink,850,'text-anchor="middle"')+
   L(210,236,i===0?'첫 번째 상태 확인':'두 번째 상태 확인',17,dark?'#accac6':CX.gray,550,'text-anchor="middle"')+
   badge(122,278,t>2+i*1.3?'확인 완료':'확인 대기',t>2+i*1.3?'#E0F3E9':'#fff2e3',CX.forest,176),xx,yy),t,.6+i*.35,.75);
 });
 b+=reveal(G(rr(0,0,834,59,16,dark?'#2B6F6A':'#0D625A')+
   L(417,39,warning?'서로 다른 요청이며 처리 조건을 구분합니다':'필요한 상태를 모두 확인한 후 다음 단계로',23,'#fff',850,'text-anchor="middle"'),x+15,y+455),t,4.2,.65);
 return b;
}
function renderedFulfillment(s,t,type='packaging'){
 const dark=type==='shipping';let b=leftFrame(s,t,{dark,accent:type==='shipping'?'TRACK & TRACE':'DISPENSING · PACKAGING'});
 const x=662,y=187;
 let steps=type==='shipping'?['택배 접수','운송장 출력','송장 등록','배송 조회']:
  type==='pickup'?['고객 설계 확정','수령 방식 선택','약국 현장 픽업','수령 확인']:
  ['복용 스케줄 확인','약포 구성','라벨 출력','포장·발송'];
 steps.forEach((a,i)=>{
  const xx=x+(i%2)*421,yy=y+Math.floor(i/2)*228;
  b+=reveal(G(rr(0,0,391,211,24,dark?'#154652':'#fff',dark?'#3e797d':'#d3e6dc',1.3,'filter="url(#shadow)"')+
    cc(69,66,42,i===0?'#C8EFDA':i===1?'#dceffa':i===2?'#fff0dd':'#cdeedd')+
    L(69,78,String(i+1).padStart(2,'0'),27,CX.forest,850,'text-anchor="middle"')+
    L(29,145,a,25,dark?'#f2faf8':CX.ink,850)+
    L(30,178,type==='shipping'?'배송 상태 관리':'약사의 조제 단계',17,dark?'#a4cbca':CX.gray,560),xx,yy),t,.65+i*.65,.72,0,33);
 });
 b+=dottedPath('M'+(x+392)+' '+(y+292)+'Q'+(x+420)+' '+(y+292)+' '+(x+431)+' '+(y+292),t,1.6,4.2,dark);
 return b;
}
function renderedCycle(s,t){
 let b=leftFrame(s,t,{accent:'RECURRING CARE · SUBSCRIPTION CYCLE'});
 const pts=[['상담',1110,216],['맞춤 설계',1402,354],['조제·배송',1298,652],['재구독',915,659],['고객 관리',756,348]];
 b+=cc(1110,448,310,'#dff1e8','opacity=".9"');
 b+=cc(1110,448,242,'none','stroke="#6bb3a0" stroke-width="3" stroke-dasharray="12 16"');
 pts.forEach((a,i)=>{
  const x=a[1],y=a[2];
  b+=reveal(G(cc(0,0,66,'#fff','stroke="#beded1" stroke-width="2" filter="url(#shadow)"')+
    L(0,8,a[0],20,CX.forest,850,'text-anchor="middle"'),x,y),t,.45+i*.52,.66);
  const q=pts[(i+1)%pts.length],d='M'+x+' '+y+'Q'+(1110+(x+q[1]-2220)*.35)+' '+(448+(y+q[2]-896)*.3)+' '+q[1]+' '+q[2];
  b+=pathDraw(d,430,t,1+i*.57,3+i*.62,CX.forest,2.8);
 });
 b+=reveal(G(cc(0,0,126,CX.forest)+L(0,-17,'지속적인',30,'#fff',850,'text-anchor="middle"')+
   L(0,25,'건강관리',30,'#b0f4d7',850,'text-anchor="middle"'),1110,448),t,2.2,.75);
 return b;
}
function renderedAlertSettings(s,t){
 let b=leftFrame(s,t,{accent:'PERSONALIZED NOTIFICATION PREFERENCES'});
 let x=680,y=171;
 b+=reveal(win(x,y,824,558,'알림 설정 · 운영 환경'),t,.2,.78);
 ['상담 요청 알림','처리 대기 업무','조제·발송 알림','기기 알림 설정'].forEach((it,i)=>{
  let on=i!==3||t>4.8,xx=x+34,yy=y+99+i*101;
  b+=reveal(G(rr(0,0,745,89,14,'#f9fcfa','#e0ece6',1)+
    L(24,53,it,23,CX.ink,790)+
    rr(631,24,80,41,21,on?'#3ca88d':'#dbe4e0')+
    cc(on?684:649,44,17,'#fff'),xx,yy),t,.8+i*.57,.6);
 });
 b+=reveal(G(rr(0,0,732,36,12,'#e7f4ea')+L(15,25,'중요한 알림을 놓치지 않도록 상태를 확인합니다',16,CX.forest,780),x+43,y+510),t,5.2,.65);
 return b;
}
function renderedEcosystem(s,t,mode='connect'){
 const dark=mode==='connect'||mode==='pass';
 let b=leftFrame(s,t,{dark,accent:'SMART PHARMACY · CONNECT BETA'});
 let cx=1145,cy=436,devices=mode==='kiosk'?
 [['고객 안내',842,196],['오프라인 QR',1364,210],['상담 연결',1368,614],['Android 키오스크',849,633]]:
 [['Windows PC',820,195],['macOS Agent',1358,186],['고객 스마트폰',1390,630],['Android 키오스크',812,637]];
 b+=cc(cx,cy,292,dark?'#174f53':'#e0f3eb','opacity=".45"')+
    cc(cx,cy,240,'none','stroke="'+(dark?'#55968f':'#85c8b0')+'" stroke-width="1.5" stroke-dasharray="8 12"');
 devices.forEach((a,i)=>{
  b+=pathDraw('M'+a[1]+' '+a[2]+'L'+cx+' '+cy,600,t,.7+i*.22,3.6+i*.22,dark?'#62dbb7':'#2baa86',3);
  b+=reveal(G(rr(-115,-66,230,132,20,dark?'#174957':'#fff',dark?'#397d75':'#d4eae0',1.6,'filter="url(#shadow)"')+
      cc(0,-17,27,dark?'#2e8579':'#d7f2e6')+
      L(0,-8,i===0?'PC':i===1?'M':i===2?'☎':'K',20,dark?'#fff':CX.forest,850,'text-anchor="middle"')+
      L(0,40,a[0],19,dark?'#e8f9f3':CX.ink,820,'text-anchor="middle"'),a[1],a[2]),t,.5+i*.36,.66);
 });
 b+=reveal(G(cc(0,0,130,dark?'#0D625A':'#e9f7ef','filter="url(#shadow)"')+
    L(0,-17,mode==='kiosk'?'DIGITAL':mode==='pass'?'PASS':'CONNECT',30,dark?'#fff':CX.forest,900,'text-anchor="middle"')+
    L(0,24,'마음챙김',27,dark?'#B7F4D9':CX.forest,850,'text-anchor="middle"'),cx,cy),t,1.75,.8);
 b+=wave(cx,cy,149,t,.14);
 return b;
}
function renderedPairCode(s,t){
 let b=leftFrame(s,t,{dark:true,accent:'DEVICE AUTHENTICATION · PAIRING'});
 const x=650,y=168;
 b+=reveal(win(x,y,860,557,'Agent 기기 연결',true),t,.28,.7);
 b+=reveal(G(rr(0,0,802,207,22,'#1c5360','#4d8084',1)+
    L(37,55,'기기 연결용 6자리 코드',26,'#e6f8f3',850)+
    L(37,92,'약국 고유코드와는 다른 일회성 연결 코드입니다',17,'#b4d4cf',600),x+26,y+90),t,.7,.7);
 const digits=['•','•','•','•','•','•'];
 digits.forEach((c,i)=>{
  b+=reveal(G(rr(0,0,89,72,13,'#ecf6ef','#85c9b6',1)+L(44,49,c,30,CX.forest,850,'text-anchor="middle"'),x+70+i*112,y+217),t,1.4+i*.26,.5);
 });
 b+=reveal(G(rr(0,0,788,157,22,'#174653','#4a797b',1)+
    L(36,50,'Agent 연결 요청',25,'#f0faf6',850)+L(36,93,'관리자 승인과 기기 연결 상태를 확인합니다',18,'#bbd9d3',600)+
    badge(598,71,t>4.6?'연결 확인':'인증 대기','#def4e7',CX.forest,159),x+34,y+360),t,3.25,.65);
 return b;
}
function renderedMosaic(s,t){
 let b=stageFrame(true,s.id,'11','전체 기능 요약',t/s.d);
 b+=reveal(L(82,201,'운영의 모든 과정, 하나의 흐름.',62,'#fff',850),t,.1,.75);
 b+=reveal(L(83,259,'약국 가입부터 재구독까지.',34,'#b2eed9',800),t,.5,.65);
 const features=['협력 약국 가입','소속 약사 등록','고객 등록','건강자료','AI 건강분석','상담·문의','영양제 설계','복약지도','결제·구독','ATC 데이터','조제·배송','재구독 관리'];
 const colors=['#184e5b','#1f625d','#174353','#255f65','#205261','#154c4a'];
 features.forEach((nm,i)=>{
  const xx=80+(i%4)*368,yy=321+Math.floor(i/4)*140;
  b+=reveal(G(rr(0,0,350,122,18,colors[i%colors.length],'#387e79',1.2)+
    rr(20,19,47,46,13,'#317a70')+
    L(44,50,String(i+1).padStart(2,'0'),18,'#ecfaf5',850,'text-anchor="middle"')+
    L(23,94,nm,23,'#f2faf6',800),xx,yy),t,.7+i*.42,.58,0,27);
 });
 return b;
}
function renderedValues(s,t){
 let b=stageFrame(false,s.id,'11','마음챙김의 가치',t/s.d);
 b+=reveal(L(80,185,'11 / THE VALUE WE CREATE',17,CX.forest,850,'letter-spacing="2.6"'),t,.2,.65);
 b+=reveal(L(80,272,'약국과 약사, 그리고 고객.',65,CX.ink,850),t,.45,.7);
 b+=reveal(L(80,333,'함께 이어지는 건강관리.',59,CX.forest,850),t,.85,.7);
 const data=[['약국에는','운영의 흐름','#e8f5ec'],['약사에게는','전문성','#e8f2fb'],['고객에게는','연결','#fff3e5']];
 data.forEach((a,i)=>{
  const xx=93+i*490,yy=400;
  b+=reveal(G(rr(0,0,461,304,24,'#fff','#d6e6dc',1.3,'filter="url(#shadow)"')+
    rr(20,23,421,160,19,a[2])+
    cc(230,104,55,i===0?'#d4ecdf':i===1?'#d8e8f4':'#f9d8ae')+
    L(230,118,String(i+1).padStart(2,'0'),39,i===1?CX.ocean:CX.forest,900,'text-anchor="middle"')+
    L(229,217,a[0],27,CX.gray,700,'text-anchor="middle"')+
    L(229,271,a[1],36,CX.ink,850,'text-anchor="middle"'),xx,yy),t,.75+i*.77,.8);
 });
 b+=pathDraw('M275 754Q809 810 1355 754',1200,t,3,7,CX.forest,4);
 return b;
}
function renderedFinal(s,t){
 let b=stageFrame(true,63,'11','마음챙김 브랜드 엔딩',t/s.d);
 b+=cc(1175,449,330,'url(#orb)')+cc(1180,440,245,'none','stroke="#47918b" stroke-width="2" stroke-dasharray="7 13"');
 b+=reveal(G(cc(0,0,180,CX.forest,'filter="url(#dshadow)"')+
  cc(0,0,155,'none','stroke="#65dbb4" stroke-width="2"')+
  L(0,-14,'마음챙김',48,'#fff',900,'text-anchor="middle"')+
  L(0,34,'CONNECTED PHARMACY',17,'#b6f4d8',800,'text-anchor="middle" letter-spacing="1.8"'),1180,443),t,.5,1.1);
 b+=reveal(L(80,262,'약국 운영의 새로운 연결.',66,'#fff',850),t,.25,.9);
 b+=reveal(L(83,328,'마음챙김과 함께 시작하세요.',39,'#b8f1da',750),t,.78,.8);
 b+=reveal(G(rr(0,0,471,66,19,'#1e5360','#509288',1)+
     L(25,44,'협력 약국 신청 · 약사 파트너 신청',22,'#f3faf6',790),80,430),t,2.1,.75);
 b+=reveal(G(rr(0,0,467,75,17,'#d9f5e3')+L(24,49,'pulsenall.com',31,CX.forest,850),80,532),t,3.3,.8);
 b+=reveal(L(82,669,'약국과 약사를 위한 통합 운영 플랫폼',22,'#b5d4d3',620),t,4.8,.7);
 return b;
}
function renderCustom(s,t){
 const id=s.id;
 switch(id){
  case 4:return renderedOptions(s,t,['협력 약국','약사 파트너','기업 파트너']);
  case 5:return renderedForm(s,t,['약국명','대표자명','이메일','연락처','주소','상세주소','약사면허번호','사업자등록번호'],{footer:'신청 정보 확인'});
  case 6:return renderedFlow(s,t,['정식 가입 초대 메일','약사면허증','건강기능식품 영업신고증','통신판매업신고증','사업자등록증'],{tag:'REQUIRED DOCUMENTS · ONBOARDING'});
  case 7:return renderedGate(s,t,['1차 신청 접수','관리자 확인·승인']);
  case 8:return renderedForm(s,t,['로그인 계정','약사면허번호','근무형태','소속약국명','약사면허증 사본','약국 고유코드'],{footer:'약국 연결 신청'});
  case 9:return renderedComparison(s,t,'약국장 · 운영','약사 · 실무',['약국 운영 관리','고객 관리','정산 및 통계','소속 약사 관리'],['약사 상담','맞춤 영양제 설계','조제·배송 관리','상담 기록']);
  case 10:return renderedDashboard(s,t,'pharmacy');
  case 11:return renderedMetrics(s,t,[['신규 상담',4,'확인할 업무'],['승인 대기',3,'관리 상태'],['발송 확인',6,'오늘 할 일'],['구독 고객',42,'전체 현황']]);
  case 12:return renderedCalendar(s,t);
  case 13:return renderedInbox(s,t,[['새 상담 요청','약사 상담 확인'],['미확인 메시지','고객 소통'],['문서 제출','검토 필요'],['재설계 요청','다음 회차'],['결제 확인','운영 상태']]);
  case 14:return renderedQR(s,t);
  case 15:return renderedTimeline(s,t,['소속 약사 조회','고객 관리','상담 및 문의','정산 내역','Connect 운영'],{tag:'PHARMACY MANAGEMENT MENU'});
  case 16:return renderedForm(s,t,['고객 이름','휴대전화 번호','담당 약국'],{type:'customer',footer:'고객 등록 확인'});
  case 17:return renderedOptions(s,t,['오프라인 등록','SMS 링크','QR 안내']);
  case 18:return renderedForm(s,t,['담당 약사','고객 연결','초기 상담 메모','상담창 생성'],{footer:'상담창 준비 완료',type:'customer'});
  case 19:return renderedTable(s,t,'customer');
  case 20:return renderedTimeline(s,t,['방문 고객 등록','건강정보 확인','약사 상담','영양제 설계','구독 및 발송'],{tag:'CUSTOMER HISTORY'});
  case 21:return renderedConsent(s,t,'consent');
  case 22:return renderedUpload(s,t,'upload');
  case 23:return renderedUpload(s,t,'ocr');
  case 24:return renderedDiff(s,t,'ocr');
  case 25:return renderedFusion(s,t);
  case 27:return renderedQR(s,t,'phone');
  case 28:return renderedMetrics(s,t,[['승인 대기',3,'새 상담'],['진행 중',8,'대화 중'],['완료 상담',17,'기록 완료'],['새 메시지',2,'확인 필요']],'CONSULTATION BOARD');
  case 29:return renderedInbox(s,t,[['건강정보 관련 상담','약사 검토 요청'],['영양제 복용 문의','고객 상담 요청'],['재설계 요청','구독 관리'],['최근 메시지','확인 필요']],'상담 요청 목록');
  case 30:return renderedChat(s,t,false);
  case 31:return renderedChat(s,t,true);
  case 32:return renderedInbox(s,t,[['연결 약국 문의','운영 지원'],['전화 문의 기록','응대 진행'],['신규 고객 문의','상담 연계'],['문의 처리 완료','기록 보관']],'고객 문의 인박스');
  case 33:return renderedTimeline(s,t,['상담 내용 기록','고객 건강정보 확인','영양제 설계 연계','후속 상담 예약','상담 이력 관리'],{tag:'CONSULTATION RECORD'});
  case 35:return renderedDiff(s,t,'product');
  case 36:return renderedScheduler(s,t);
  case 37:return renderedScheduler(s,t,true);
  case 38:return renderedComparison(s,t,'약사 화면','고객 화면',['설계 제품가','선택 제품 정보','약사 검토 상태','조제 정보 확인'],['구독 결제 안내','할인 적용 정보','실제 결제 예정액','고객 최종 확인']);
  case 39:return renderedDraft(s,t,false);
  case 40:return renderedDraft(s,t,true);
  case 41:return renderedPayment(s,t);
  case 42:return renderedGate(s,t,['설계 확정','현재 회차 발송 가능']);
  case 43:return renderedDashboard(s,t,'pharmacist');
  case 44:return renderedTable(s,t,'shipping');
  case 46:return renderedFulfillment(s,t,'packaging');
  case 47:return renderedFulfillment(s,t,'shipping');
  case 48:return renderedFulfillment(s,t,'pickup');
  case 49:return renderedTable(s,t,'delivery');
  case 50:return renderedTimeline(s,t,['발송 내역 확인','송장 상태 확인','전체 고객 조회','상담 기록 정리','업무 마무리'],{tag:'PHARMACIST OPERATIONS'});
  case 51:return renderedCycle(s,t);
  case 52:return renderedDiff(s,t,'renew');
  case 53:return renderedGate(s,t,['다음 회차 취소 예약','현재 회차 환불 요청'],{warning:true});
  case 54:return renderedMetrics(s,t,[['월간 운영',42,'업무 현황'],['정산 내역',28,'처리 현황'],['구독 회차',17,'이번 달'],['통계 분석',9,'참고 지표']],'SETTLEMENT · STATISTICS');
  case 55:return renderedAlertSettings(s,t);
  case 56:return renderedEcosystem(s,t,'connect');
  case 57:return renderedOptions(s,t,['Windows Agent','macOS Agent'],'agent');
  case 58:return renderedPairCode(s,t);
  case 59:return renderedConsent(s,t,'pass');
  case 60:return renderedEcosystem(s,t,'kiosk');
  case 61:return renderedMosaic(s,t);
  case 62:return renderedValues(s,t);
  case 63:return renderedFinal(s,t);
  default: throw new Error('Scene '+id+' has no dedicated renderer');
 }
}
const CUSTOM_BUILD={1:scene1,2:scene2,3:scene3,26:scene26,34:scene34,45:scene45};
function renderCompleteScene(s,t){
 const f=CUSTOM_BUILD[s.id];
 return pattern()+(f?f(t,s.d):renderCustom(s,t));
}