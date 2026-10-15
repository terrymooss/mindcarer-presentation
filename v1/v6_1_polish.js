/* 마음챙김 6.1 — non-destructive visual polish, original 6.0 is untouched.
 * Connectors must always occupy their own visual layer BETWEEN stage background
 * and opaque illustrated nodes / phones / labels. This also prevents route lines
 * from cutting through shields, phones and text as in CUT 06 / CUT 59.
 */
function polishSvgLayers(stage){
  if(!stage || !stage.children.length)return {paths:0};
  const top=[...stage.children];
  // Only full-scene connector paths (not icon paths nested in <g> nor background hairlines).
  const connectors=top.filter(el=>{
    if(el.tagName.toLowerCase()!=='path')return false;
    const stroke=el.getAttribute('stroke')||'';
    const sw=parseFloat(el.getAttribute('stroke-width')||'0');
    const d=el.getAttribute('d')||'';
    return sw>=2.4 && !!stroke && stroke!=='none' && d.startsWith('M');
  });
  if(!connectors.length)return {paths:0};
  const layer=document.createElementNS('http://www.w3.org/2000/svg','g');
  layer.setAttribute('data-layer','connectors-behind-content');
  layer.setAttribute('pointer-events','none');
  // Preserve inter-connector order while bringing them above the backdrop,
  // but strictly behind ALL foreground groups / opaque node disks / devices.
  // The initial stage backdrop is made from directly nested shapes;
  // the first <g> starts the content/brand foreground in v6.
  const firstForeground=top.find(el=>el.tagName.toLowerCase()==='g');
  if(firstForeground)stage.insertBefore(layer,firstForeground);
  else stage.appendChild(layer);
  connectors.forEach(el=>layer.appendChild(el));
  // Use the browser's measured SVG length, not estimates. The last frame
  // becomes solid green all the way to the final node.
  const routes=stage.querySelectorAll('path[data-route-progress]');
  routes.forEach(el=>{
    const progress=Math.max(0,Math.min(1,Number(el.getAttribute('data-route-progress'))||0));
    const length=el.getTotalLength()+0.5;
    el.style.strokeDasharray=String(length)+' '+String(length);
    el.style.strokeDashoffset=String((1-progress)*length);
  });
  return {paths:connectors.length,measuredRoutes:routes.length};
}
window.__POLISH_LAYERS=polishSvgLayers;