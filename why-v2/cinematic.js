(function cinematicModule(){
 const esc=s=>String(s).replace(/[&<"]/g,c=>({'&':'&amp;','<':'&lt;','"':'&quot;'}[c])),lim=(v)=>Math.max(0,Math.min(1,v)),ease=(n)=>{n=lim(n);return n*n*(3-2*n)};
 const show=(t,start=.3,span=.9)=>ease((t-start)/span),f=n=>Number(n).toFixed(2);
 const c=(x,y,r,fill,add="")=>`<circle cx="${x}" cy="${y}" r="${r}" fill="${fill}" ${add}/>`;
 const box=(x,y,w,h,fill,rad=8,add="")=>`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${rad}" fill="${fill}" ${add}/>`;
 const line=(d,color="#97DEC0",w=5,add="")=>`<path d="${d}" fill="none" stroke="${color}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round" ${add}/>`;
 const tx=(x,y,val,sz=26,color="#F2FFF4",w=700)=>`<text x="${x}" y="${y}" font-family="Pretendard,Apple SD Gothic Neo,Noto Sans KR,sans-serif" font-size="${sz}" font-weight="${w}" fill="${color}" letter-spacing="-.035em">${esc(val)}</text>`;
 const gg=(content,x,y,t=1,sz=1)=>`<g transform="translate(${f(x)} ${f(y)}) scale(${f(sz)})" opacity="${f(lim(t))}">${content}</g>`;
 const person=(x,y,size=1,light=true)=>gg(c(0,-125,55,light?"#B3D9C4":"#729B98")+`<path d="M-62-47Q-151 10-155 210H150Q157 5 62-47L0 8Z" fill="${light?"#E5F1E7":"#607D7A"}"/><path d="M-42-43L0 9L45-43L0-27Z" fill="#5C8174"/>`,x,y,1,size);
 const pack=(x,y,k=1)=>gg(box(0,70,212,167,"#91A6A1",8)+line("M0 70L112 4L212 70L112 140Z","#D6E8DB",4)+line("M112 140V230","#43675C",7),x,y,1,k);
 const shelves=(t)=>{let o="";for(let j=0;j<3;j++){o+=box(810,336+j*159,670,12,"#36555C");for(let i=0;i<8;i++){let x=825+i*83;let v=show(t,i*.08+j*.09,.4);o+=gg(box(0,0,48+(i%2)*9,99,i%3?"#5A9291":"#C4D4C9",12)+box(9,27,33,9,"#E2F1E8",4),x,223+j*159,v)}}return o};
 const defs=`<defs>
 <linearGradient id="darkCine" x1="0" x2="1" y1="0" y2="1"><stop stop-color="#071A25"/><stop offset=".60" stop-color="#164049"/><stop offset="1" stop-color="#061C24"/></linearGradient>
 <linearGradient id="greenCine" x1="0" x2="1" y1="0" y2="1"><stop stop-color="#082C2C"/><stop offset=".60" stop-color="#0C6352"/><stop offset="1" stop-color="#052C2D"/></linearGradient>
 <linearGradient id="warmCine" x1="0" x2="1" y1="0" y2="1"><stop stop-color="#20383A"/><stop offset=".60" stop-color="#657867"/><stop offset="1" stop-color="#A58B6C"/></linearGradient>
 <linearGradient id="leftFade" x1="0" x2="1"><stop stop-color="#041920" stop-opacity=".99"/><stop offset=".48" stop-color="#09232A" stop-opacity=".92"/><stop offset=".9" stop-color="#092029" stop-opacity=".38"/><stop offset="1" stop-color="#091921" stop-opacity=".19"/></linearGradient>
 <radialGradient id="haloCine"><stop stop-color="#A8FFD1" stop-opacity=".40"/><stop offset="1" stop-color="#70D5B4" stop-opacity="0"/></radialGradient>
 <radialGradient id="sunCine"><stop stop-color="#FFE3A7" stop-opacity=".43"/><stop offset="1" stop-color="#FFD69D" stop-opacity="0"/></radialGradient>
 <clipPath id="trimCine">${box(0,0,1600,900,"#fff",0)}</clipPath></defs>`;
 const shot=(s,t)=>{
  const id=s.id;let o="",q=show(t,1,.9);
  if(id===1||id===2){o=shelves(t);if(id===2)o+=gg(box(0,0,275,145,"#E7BD91",17)+tx(32,85,"PRICE",45,"#254B40",800),1110,460,q);}
  if(id===3){o=line("M810 630C995 423 1249 675 1510 350","#83A9A0",10,'stroke-dasharray="9 19"')+gg(pack(0,0,.86),980+95*show(t,.4,3),410,q);}
  if(id===4){o+=gg(pack(0,0,.72),872,377,q)+gg(pack(0,0,.68),1100,310,q)+gg(c(0,0,129,"#DEAE77")+tx(-20,25,"!",94,"#3E453F",900),1370,530,show(t,2,.7));}
  if(id===5){o+=shelves(t)+person(1230,570,.95,false)+c(1315,360,445,"url(#haloCine)");}
  if(id===6){for(let i=0;i<14;i++){let x=790+i*53;o+=gg(c(0,-54,22,"#8CA6A0")+box(-28,-25,56,109,"#476B69",17),x,630,show(t,.4+i*.06,.7),1)}o+=line("M810 417Q1150 255 1530 420","#A8E6C8",4);}
  if(id===7){o+=person(1270,553,1.04,true)+c(1330,320,410,"url(#sunCine)")+gg(c(0,0,66,"#FFFFFF")+tx(-25,22,"?",71,"#32755A",900),1020,610,q);}
  if(id===8){o+=person(1080,596,.72,true)+person(1360,598,.75,false)+c(1260,400,390,"url(#sunCine)");}
  if(id===9){o+=c(1240,440,425,"url(#haloCine)")+gg(c(0,0,195,"#D6EEE3")+tx(-153,17,"마음챙김",49,"#1C644B",900),1110,460,q);}
  if(id===10){o+=c(1220,450,340,"url(#haloCine)");[[870,260,"검진"],[1400,290,"복용약"],[883,667,"영양제"],[1394,660,"상담기록"]].forEach((v,i)=>{o+=line(`M1200 450L${v[0]} ${v[1]}`,"#99DDB8",5);o+=gg(c(0,0,69,"#D7F5E4")+tx(-29,9,v[2],22,"#225A45",760),v[0],v[1],show(t,.9+i*.23,.55));});}
  if(id===11){o+=box(845,228,626,453,"#113C3B",28,'stroke="#81C9A6" stroke-width="3"');o+=tx(910,299,"AI  HEALTH CONTEXT",28,"#B0EACB",800);["성분 확인","중복 성분 후보","주의정보 정리"].forEach((v,i)=>o+=gg(c(890,353+i*94,11,"#B4E8C6")+tx(932,365+i*94,v,28,"#E5F8E8",650),0,0,show(t,.6+i*.8,.5)));}
  if(id===12){o+=c(1220,400,415,"url(#sunCine)")+person(1240,522,1.08,true);}
  if(id===13){o+=line("M817 585Q1120 320 1522 582","#9DD8AB",9);[[911,548,"상담"],[1170,455,"기록"],[1460,562,"다음 상담"]].forEach((v,i)=>o+=gg(c(0,0,65,"#D9F5E6")+tx(-44,100,v[2],22,"#E9FFEE",700),v[0],v[1],show(t,.9+i*.6,.6)));}
  if(id===14){o+=person(1065,580,.79,true)+person(1390,580,.79,false)+c(1300,372,460,"url(#sunCine)");}
  if(id===15){o+=box(930,300,501,342,"#B9D4C3",9)+box(970,360,181,209,"#4E896D",5)+box(1188,360,187,209,"#619978",5)+c(1292,295,360,"url(#sunCine)");}
  if(id===16){o+=c(1182,449,410,"url(#haloCine)");for(let i=0;i<10;i++){let a=i*Math.PI/5,x=1198+280*Math.cos(a),y=460+258*Math.sin(a);o+=line(`M1198 460L${x} ${y}`,"#ACF2C9",3);o+=gg(c(0,0,33,"#B7E8CC"),x,y,show(t,.55+i*.12,.7));}}
  if(id===17){o+=c(1330,400,420,"url(#haloCine)")+gg(tx(1043,479,"전문성",87,"#CAFADE",900),0,0,show(t,2,.8));}
  if(id===18){o+=c(1257,385,425,"url(#haloCine)")+gg(`<image href="../v1/brand-logo-icon.png" x="0" y="0" width="280" height="280"/>`,1080,207,show(t,.8,.8))+gg(box(0,0,192,192,"#fff",12)+`<image href="../why/qr-pulsenall.svg" x="14" y="14" width="164" height="164"/>`,970,608,show(t,2,.7))+gg(tx(1195,705,"pulsenall.com",38,"#E9FFE8",830),0,0,show(t,2.4,.65));}
  return o;
 };
 window.WHY_RENDER=(s,time)=>{
  const t=Math.max(0,Math.min(s.d,time)),dark=s.id<=7,warm=[8,12,13,14,15].includes(s.id),bg=dark?"url(#darkCine)":warm?"url(#warmCine)":"url(#greenCine)";
  const scale=1+.025*t/s.d,alpha=lim(t/.34)*lim((s.d-t)/.34),fz=Math.max(55,Math.min(78,84-Math.max(s.display[0].length,s.display[1].length)*1.13));
  const environment=gg(box(0,0,1600,900,bg,0)+c(1350,445,430,warm?"url(#sunCine)":"url(#haloCine)")+shot(s,t),800*(1-scale),450*(1-scale),1,scale);
  const copy=gg(tx(116,302,s.display[0],fz,"#F4FFF6",900)+tx(116,393,s.display[1],fz,dark?"#E1EEEA":"#BCF7D1",900),0,(1-show(t,.35,.85))*35,show(t,.35,.85))+gg(tx(122,506,s.subtitle,23,"#C6E1D8",600),0,15*(1-show(t,1.2,.7)),show(t,1.2,.7));
  const section=s.id<=6?"THE CRISIS":s.id<=8?"THE QUESTION":s.id<=12?"THE RESPONSE":s.id<=16?"THE CHANGE":"THE FUTURE";
  return defs+`<g clip-path="url(#trimCine)"><g opacity="${f(alpha)}">`+environment+box(0,0,1600,900,"url(#leftFade)",0)+gg(tx(119,172,section,16,"#A4DABB",800),0,0,show(t,.1,.4))+copy+`</g></g>`;
 };
 window.WHY_CINEMATIC_VERSION="2.0";
})();