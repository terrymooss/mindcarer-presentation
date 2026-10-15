/* 마음챙김 Motion 5.0 – semantic pictograms, word-safe Korean typography, cinematic scenes.
   Built as independent SVG elements; no text is baked into a raster image. */
const ICON_PATH={
 phone:'<rect x="5" y="1.5" width="14" height="21" rx="3"/><path d="M10 18.5h4"/>',
 truck:'<path d="M2 5h12v12H2zM14 9h4l4 5v3h-8"/><circle cx="6.5" cy="18" r="2"/><circle cx="18" cy="18" r="2"/>',
 package:'<path d="m12 2 9 4.5v11L12 22 3 17.5v-11L12 2Z"/><path d="M3.5 6.5 12 11l8.5-4.5M12 11v11M8 4.2l8.6 4.7"/>',
 pharmacy:'<path d="M3 9h18v12H3Z M8 21v-7h8v7M3 9l2-5h14l2 5"/><path d="M12 3v7M9 6.5h6"/>',
 pharmacist:'<circle cx="12" cy="6" r="3"/><path d="M5 22v-6a7 7 0 0 1 14 0v6M8 15l4 4 4-4M10 14l2 3 2-3"/>',
 qr:'<path d="M2 2h7v7H2zM4.5 4.5h2v2h-2zM15 2h7v7h-7zM17.5 4.5h2v2h-2zM2 15h7v7H2zM4.5 17.5h2v2h-2zM13 13h3v3h-3M19 13v3h3M15 20h2M19 19h3M13 18v4"/>',
 document:'<path d="M5 2h10l5 5v15H5Z M15 2v5h5M8 12h9M8 16h9M8 20h6"/>',
 prescription:'<path d="M5 2h10l5 5v15H5Z M8 11h8M8 15h6M8 19h4M15 2v5h5"/><path d="M14 15l4 4m0-4-4 4"/>',
 capsule:'<path d="M10.5 3a5 5 0 0 1 7.5 6.6l-8 9a5 5 0 0 1-7.5-6.6l8-9Z"/><path d="m7 11 7 6"/>',
 medical:'<path d="M9 3h6v5h5v7h-5v6H9v-6H4V8h5Z"/>',
 shield:'<path d="m12 2 9 4v6c0 5.5-3.5 8.9-9 10-5.5-1.1-9-4.5-9-10V6l9-4Z"/><path d="m8 12 3 3 5-6"/>',
 calendar:'<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M7 2v6M17 2v6M3 11h18M8 15h3M14 15h3"/>',
 bell:'<path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9ZM10 21h4"/>',
 chat:'<path d="M21 11a8 8 0 0 1-8 8c-2 0-3-.2-4-.8L3 20l1.5-5a8 8 0 1 1 16.5-4Z"/><path d="M8 11h8M8 14h5"/>',
 user:'<circle cx="12" cy="7" r="4"/><path d="M4 22v-2a8 8 0 0 1 16 0v2"/>',
 users:'<circle cx="9" cy="7" r="3"/><path d="M2 21v-2c0-5 4-7 7-7s7 2 7 7v2M17 5a3 3 0 0 1 0 6M19 14c2 1 3 3 3 7"/>',
 ai:'<rect x="5" y="5" width="14" height="14" rx="2"/><path d="M9 2v3m6-3v3M9 19v3m6-3v3M2 9h3M2 15h3m14-6h3m-3 6h3M9 9h6v6H9Z"/>',
 scan:'<path d="M8 3H4a1 1 0 0 0-1 1v4m13-5h4a1 1 0 0 1 1 1v4M3 16v4h5m8 1h4a1 1 0 0 0 1-1v-4M4 12h16"/>',
 chart:'<path d="M3 21h18M6 17v-6M12 17V5M18 17V9"/>',
 coins:'<circle cx="11" cy="12" r="8"/><path d="M14 9c-1-2-6-2-6 1s6 1 6 4-5 3-6 1M11 6v12"/>',
 wallet:'<rect x="2" y="6" width="20" height="15" rx="3"/><path d="M2 10h20m-18-4V4h14v2M16 15h3"/>',
 card:'<rect x="2" y="4" width="20" height="16" rx="2"/><path d="M2 10h20m-16 6h5"/>',
 check:'<path d="m4 12 5 5L20 6"/>',
 unlock:'<path d="M6 10V7a6 6 0 0 1 11-3"/><rect x="4" y="10" width="16" height="12" rx="2"/><path d="M12 15v3"/>',
 lock:'<rect x="4" y="11" width="16" height="11" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/>',
 settings:'<circle cx="12" cy="12" r="3"/><path d="m10 2-.6 3-2 1-2.6-1.5L2 9l2.5 2v2L2 15l2.8 4.5L7.4 18l2 1 .6 3h4l.6-3 2-1 2.6 1.5L22 15l-2.5-2v-2L22 9l-2.8-4.5L16.6 6l-2-1L14 2Z"/>',
 laptop:'<rect x="4" y="3" width="16" height="13" rx="2"/><path d="M2 19h20l-2 2H4Z"/>',
 network:'<circle cx="12" cy="12" r="3"/><circle cx="4" cy="4" r="2"/><circle cx="20" cy="4" r="2"/><circle cx="4" cy="20" r="2"/><circle cx="20" cy="20" r="2"/><path d="M6 6l4 4M18 6l-4 4M6 18l4-4m8 4-4-4"/>',
 bluetooth:'<path d="m6 6 12 12-6 4V2l6 4L6 18"/>',
 clock:'<circle cx="12" cy="12" r="9"/><path d="M12 6v6l4 2"/>',
 courier:'<path d="M2 18h14M4 14h8M5 9h5"/><path d="m13 4 9 5-9 5v-3H9V7h4Z"/>',
 clipboard:'<rect x="5" y="4" width="14" height="18" rx="2"/><path d="M9 4V2h6v2M8 12l2 2 4-4M8 18h7"/>'
};
function meaningIcon(text=''){
 const v=String(text).toLowerCase();
 const map=[
 [/휴대폰|스마트폰|모바일|sms|전화|알림톡|핸드폰|메시지 링크/, 'phone'],
 [/택배|운송장|배송 조회|송장|배송 관리|배송 중/, 'truck'],
 [/포장|발송|소분|약포|상자|박스|패키지/, 'package'],
 [/qr|코드 스캔/, 'qr'],
 [/처방전|약 봉투|처방/, 'prescription'],
 [/검진|서류|업로드|제출|문서|파일|리포트|원본 자료/, 'document'],
 [/ocr|스캔|추출/, 'scan'],
 [/약사|약국장|검토자/, 'pharmacist'],
 [/약국|협력 센터/, 'pharmacy'],
 [/영양제|복용|성분|제품|캡슐/, 'capsule'],
 [/건강|분석 정보|의료/, 'medical'],
 [/ai|데이터|정보 통합|시스템/, 'ai'],
 [/암호|보안|동의|승인|인증/, 'shield'],
 [/구독|일정|회차|예약|달력/, 'calendar'],
 [/알림|공지|주의|경고/, 'bell'],
 [/상담|채팅|대화|문의|응답/, 'chat'],
 [/고객|회원/, 'user'],
 [/소속|팀|조직|파트너/, 'users'],
 [/정산|매출|금액|가격|환불|수수료/, 'wallet'],
 [/결제|카드/, 'card'],
 [/통계|현황|차트|추이|지표/, 'chart'],
 [/agent|macos|windows|pc/, 'laptop'],
 [/connect|연결|블루투스|pass/, 'network'],
 [/설정|관리자 설정/, 'settings'],
 [/확정|완료|확인됨/, 'check'],
 [/잠금|대기/, 'lock'],
 [/시간/, 'clock']
 ];
 for(const [re,key] of map)if(re.test(v))return key;
 return 'clipboard';
}
function iconAt(name,x,y,size=32,color=CX.forest,strokeWidth=1.75,opacity=1){
 const d=ICON_PATH[name]||ICON_PATH[meaningIcon(name)];
 return '<g transform="translate('+x+' '+y+') scale('+(size/24)+')" opacity="'+opacity+'" fill="none" stroke="'+color+'" stroke-width="'+strokeWidth+'" stroke-linecap="round" stroke-linejoin="round">'+d+'</g>';
}
function brandMark(x,y,size=120,opacity=1){
 // Real official brand mark extracted from uploaded logo, not an AI-generated replica.
 return '<image href="./brand-logo-icon.png" x="'+x+'" y="'+y+'" width="'+size+'" height="'+size+'" preserveAspectRatio="xMidYMid meet" opacity="'+cl(opacity)+'"/>';
}
const typeCanvas=document.createElement('canvas'),typeCtx=typeCanvas.getContext('2d');
const wordMemo=new Map();
function wrapKoreanWords(text,maxPx,px=30,weight=800,maxLines=4){
 const key=[text,maxPx,px,weight,maxLines].join('|');
 if(wordMemo.has(key))return wordMemo.get(key);
 const words=String(text).trim().split(/\s+/).filter(Boolean);
 typeCtx.font=weight+' '+px+'px "Apple SD Gothic Neo","Noto Sans CJK KR",sans-serif';
 const measure=t=>typeCtx.measureText(t).width;
 let lines=[],cur='',effectiveSize=px;
 const maxWord=Math.max(0,...words.map(measure));
 if(maxWord>maxPx){effectiveSize=Math.max(13,Math.floor(px*maxPx/maxWord*.97));typeCtx.font=weight+' '+effectiveSize+'px "Apple SD Gothic Neo","Noto Sans CJK KR",sans-serif';}
 for(const w of words){
  const candidate=cur?cur+' '+w:w;
  if(cur&&measure(candidate)>maxPx){lines.push(cur);cur=w}else cur=candidate;
 }
 if(cur)lines.push(cur);
 if(lines.length>maxLines){
  // Never split inside an eojeol. Reduce type size until all words fit.
  let tries=0;
  while(lines.length>maxLines&&tries++<20){
   effectiveSize=Math.max(13,effectiveSize-2);
   typeCtx.font=weight+' '+effectiveSize+'px "Apple SD Gothic Neo","Noto Sans CJK KR",sans-serif';
   lines=[];cur='';
   for(const w of words){const candidate=cur?cur+' '+w:w;if(cur&&measure(candidate)>maxPx){lines.push(cur);cur=w}else cur=candidate}if(cur)lines.push(cur);
  }
 }
 const result={lines,size:effectiveSize};
 if(wordMemo.size>1000)wordMemo.clear();
 wordMemo.set(key,result);return result;
}
function koreanText(text,x,y,maxWidth,px=48,fill=CX.ink,weight=850,lineHeight=1.18,maxLines=3,anchor='start'){
 const {lines,size}=wrapKoreanWords(text,maxWidth,px,weight,maxLines);
 return {svg:'<text x="'+x+'" y="'+y+'" font-size="'+size+'" font-weight="'+weight+'" fill="'+fill+'" text-anchor="'+anchor+'">'+
    lines.map((row,i)=>'<tspan x="'+x+'" dy="'+(i===0?0:Math.round(size*lineHeight))+'">'+esc(row)+'</tspan>').join('')+'</text>',
    height:size*(1+(lines.length-1)*lineHeight),lines,size};
}