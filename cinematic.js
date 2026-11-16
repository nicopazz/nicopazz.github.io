// Experiencia cinematográfica progresiva; no depende de bibliotecas externas.
(()=>{
'use strict';
const $=s=>document.querySelector(s), $$=s=>Array.from(document.querySelectorAll(s));
const reduceQuery=matchMedia('(prefers-reduced-motion: reduce)');let motion=!reduceQuery.matches;
const root=document.documentElement,topbar=$('#topbar'),progress=$('#progress'),scrollStory=$('#storyScroll'),pin=$('#storyPin'),scenes=$$('.scene'),dots=$$('[data-goto-scene]');
const motionButton=$('#motionButton'),wipe=$('#wipe'),navLinks=$('#navLinks'),menuButton=$('#menuButton');
const chapter=$('#chapter'),chapterLines=$$('.chapter-line'),contact=$('#contacto');
let resumeHalo=()=>{};
function setMotion(state){
  motion=Boolean(state)&&!reduceQuery.matches;
  root.classList.toggle('motion-off',!motion);
  motionButton.setAttribute('aria-pressed',String(motion));
  motionButton.querySelector('span').textContent=motion?'ANIMACIONES ACTIVADAS':'ANIMACIONES DESACTIVADAS';
  motionButton.setAttribute('aria-label',reduceQuery.matches?'Animaciones desactivadas. Movimiento reducido del sistema':motion?'Animaciones activadas. Desactivar animaciones':'Animaciones desactivadas. Activar animaciones');
  if(!motion){
    $$('[data-reveal]').forEach(e=>e.classList.add('shown'));
    $$('[data-tilt]').forEach(field=>['--mx','--my','--rx','--ry'].forEach(key=>field.style.removeProperty(key)));
    targetX=targetY=mX=mY=0;
    wipe.className='wipe';transitioning=false;
    chapterLines.forEach(line=>line.style.removeProperty('--chapter-x'));
    contact.style.removeProperty('--contact-shift');
    $('#portraitWindow').style.removeProperty('--portrait-r');
    $('#portraitWindow').style.removeProperty('--portrait-x');
    stopOrb();
  }else if(sphereVisible) startOrb();
  sceneInitialized=false;updateScroll();resumeHalo();
  if(ctx&&!motion) drawSphere(true);
}
motionButton.addEventListener('click',()=>setMotion(!motion));reduceQuery.addEventListener?.('change',e=>setMotion(!e.matches));
const menuViewport=matchMedia('(max-width: 1000px)');
function setMenuOpen(open,restoreFocus=false){
  const expanded=Boolean(open)&&menuViewport.matches;
  if(restoreFocus)menuButton.focus({preventScroll:true});
  menuButton.setAttribute('aria-expanded',String(expanded));
  menuButton.setAttribute('aria-label',expanded?'Cerrar menú':'Abrir menú');
  menuButton.innerHTML=`<i class="fas ${expanded?'fa-xmark':'fa-bars'}" aria-hidden="true"></i><span>Menú</span>`;
  navLinks.classList.toggle('open',expanded);
  navLinks.inert=menuViewport.matches&&!expanded;
  if(expanded)navLinks.querySelector('a').focus({preventScroll:true});
}
function arrangeMenu(){
  const focused=navLinks.contains(document.activeElement)||document.activeElement===motionButton;
  if(menuViewport.matches)navLinks.append(motionButton);
  else $('.topbar-right').prepend(motionButton);
  setMenuOpen(false,menuViewport.matches&&focused);
}
menuButton.addEventListener('click',()=>setMenuOpen(menuButton.getAttribute('aria-expanded')!=='true'));
navLinks.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{
  setMenuOpen(false);
  if(menuViewport.matches){const target=$(a.getAttribute('href'));target?.setAttribute('tabindex','-1');target?.focus({preventScroll:true})}
}));
topbar.addEventListener('keydown',e=>{if(e.key==='Escape'&&menuButton.getAttribute('aria-expanded')==='true'){e.preventDefault();setMenuOpen(false,true)}});
topbar.addEventListener('focusout',e=>{if(!topbar.contains(e.relatedTarget))setMenuOpen(false)});
document.addEventListener('click',e=>{if(!e.composedPath().includes(topbar))setMenuOpen(false)});
menuViewport.addEventListener('change',arrangeMenu);
arrangeMenu();

// El orden del DOM acompaña la composición para conservar el recorrido de teclado.
const heroViewport=matchMedia('(max-width: 760px)');
function arrangeHero(){
  const buttons=$('.hero-buttons'),copy=$('.hero-copy'),description=$('.hero-desc'),focused=document.activeElement;
  if(heroViewport.matches)copy.insertBefore(buttons,description);
  else copy.append(buttons);
  if(buttons.contains(focused))focused.focus({preventScroll:true});
}
heroViewport.addEventListener('change',arrangeHero);
arrangeHero();
const isMobile=()=>matchMedia('(max-width: 760px)').matches;
// A pinned viewport below 560px clips the real project copy. Keep its 3D cameras,
// but allow continuous reading, as in the prototype's mobile layout.
const isShortViewport=()=>matchMedia('(max-height: 560px)').matches;
let scrollTarget=null,transitioning=false;
// Chapter wipe for local navigation; ordinary anchor behavior remains fallback when motion is off.
$$('a[href^="#"]').forEach(a=>a.addEventListener('click',e=>{const hash=a.getAttribute('href');const target=document.getElementById(hash.slice(1));if(!target||e.ctrlKey||e.metaKey||e.shiftKey||e.altKey)return;if(!motion||isMobile()){return}e.preventDefault();if(transitioning)return;transitioning=true;wipe.className='wipe enter';setTimeout(()=>{if(!motion){wipe.className='wipe';transitioning=false;return}target.scrollIntoView({behavior:'instant',block:'start'});history.pushState(null,'',hash);target.setAttribute('tabindex','-1');target.focus({preventScroll:true});wipe.className='wipe exit';setTimeout(()=>{wipe.className='wipe';transitioning=false},580)},420)}));
if('IntersectionObserver' in window){const io=new IntersectionObserver(items=>{items.forEach(({target,isIntersecting})=>{if(isIntersecting){target.classList.add('shown');io.unobserve(target)}})},{threshold:.08,rootMargin:'0px 0px -15px 0px'});$$('[data-reveal]').forEach(e=>{if(motion)io.observe(e);else e.classList.add('shown')})}else $$('[data-reveal]').forEach(e=>e.classList.add('shown'));
function clock(){try{$('#localClock').textContent=new Intl.DateTimeFormat('es-AR',{timeZone:'America/Argentina/Tucuman',hour:'2-digit',minute:'2-digit',hour12:false}).format(new Date())+' / HORA LOCAL · ARG'}catch{}}clock();setInterval(clock,60000);
let currentIndex=0,sceneInitialized=false,scrollPending=false,continuousLayout=null;const hues=['rgba(139,92,246,.21)','rgba(59,130,246,.20)','rgba(59,130,246,.16)'];
function changeScene(n){
  if(sceneInitialized&&n===currentIndex&&scenes[n].classList.contains('is-active'))return;
  sceneInitialized=true;currentIndex=n;
  const focusedScene=document.activeElement.closest('.scene');
  if(focusedScene&&focusedScene!==scenes[n]){dots[n].focus({preventScroll:true})}
  scenes.forEach((scene,i)=>{
    scene.classList.toggle('is-active',i===n);scene.classList.toggle('is-before',i<n);
    scene.setAttribute('aria-hidden',String(i!==n));scene.inert=i!==n;
    scene.querySelectorAll('a').forEach(link=>link.tabIndex=i===n?0:-1);
  });
  dots.forEach((dot,i)=>dot.setAttribute('aria-current',String(i===n)));
  $('#currentScene').textContent=String(n+1).padStart(2,'0');
  pin.style.setProperty('--aura',hues[n]);
}
function updateSceneScroll(story){
  const continuous=isMobile()||isShortViewport()||!motion;
  if(continuous){if(continuousLayout!==true){scenes.forEach(scene=>{scene.removeAttribute('aria-hidden');scene.inert=false;scene.querySelectorAll('a').forEach(a=>a.removeAttribute('tabindex'))});sceneInitialized=false}continuousLayout=true;return}
  continuousLayout=false;
  const {range,top}=story;
  let t=Math.min(.9999,Math.max(0,-top/Math.max(1,range)));
  changeScene(Math.min(2,Math.floor(t*3)));
}
function updateScroll(){
  // Todas las mediciones preceden a las escrituras para no forzar layouts intermedios.
  const max=root.scrollHeight-innerHeight;
  const story=isMobile()||isShortViewport()||!motion?null:{range:scrollStory.offsetHeight-innerHeight,top:scrollStory.getBoundingClientRect().top};
  const chap=motion&&!isMobile()?chapter.getBoundingClientRect():null;
  const contactRect=motion?contact.getBoundingClientRect():null;
  progress.style.transform=`scaleX(${max>0?scrollY/max:0})`;
  topbar.classList.toggle('is-scrolled',scrollY>15);
  updateSceneScroll(story);
  if(chap&&chap.top<innerHeight&&chap.bottom>0){const v=(innerHeight/2-(chap.top+chap.height/2))/innerHeight;chapterLines.forEach((el,i)=>el.style.setProperty('--chapter-x',Math.max(-75,Math.min(75,v*65*(i===0?1:-1)))+'px'))}
  if(contactRect&&contactRect.top<innerHeight&&contactRect.bottom>0)contact.style.setProperty('--contact-shift',Math.max(-70,Math.min(70,(innerHeight-contactRect.top)*.09))+'px');
}
function requestScroll(){if(scrollPending)return;scrollPending=true;requestAnimationFrame(()=>{updateScroll();scrollPending=false})}window.addEventListener('scroll',requestScroll,{passive:true});window.addEventListener('resize',requestScroll,{passive:true});updateScroll();
dots.forEach((btn,i)=>btn.addEventListener('click',()=>{if(isMobile()||isShortViewport()||!motion){scenes[i].scrollIntoView({behavior:motion?'smooth':'instant',block:'start'});return}const start=scrollStory.getBoundingClientRect().top+scrollY,range=scrollStory.offsetHeight-innerHeight;window.scrollTo({top:start+(i+.5)/3*range,behavior:motion?'smooth':'instant'})}));
// Como máximo una lectura de geometría y una actualización por cuadro.
function trackPointer(element,render,reset){
  let frame=0,position;
  element.addEventListener('pointermove',event=>{
    if(!motion||event.pointerType==='touch')return;
    position={x:event.clientX,y:event.clientY};
    if(!frame)frame=requestAnimationFrame(()=>{
      frame=0;if(!motion||!position)return;
      const rect=element.getBoundingClientRect();
      render((position.x-rect.left)/rect.width-.5,(position.y-rect.top)/rect.height-.5);
    });
  },{passive:true});
  element.addEventListener('pointerleave',()=>{cancelAnimationFrame(frame);frame=0;position=null;reset()});
}
if(matchMedia('(pointer:fine)').matches){
  $$('[data-tilt]').forEach(field=>trackPointer(field,(x,y)=>{
    field.style.setProperty('--mx',(x*20).toFixed(2)+'px');field.style.setProperty('--my',(y*16).toFixed(2)+'px');
    field.style.setProperty('--rx',(x*6).toFixed(2)+'deg');field.style.setProperty('--ry',(-y*5).toFixed(2)+'deg');
  },()=>['--mx','--my','--rx','--ry'].forEach(key=>field.style.removeProperty(key))));
  const portrait=$('#portraitWindow');
  trackPointer($('#portraitStage'),(x,y)=>{
    portrait.style.setProperty('--portrait-r',(-x*8).toFixed(1)+'deg');portrait.style.setProperty('--portrait-x',(y*7).toFixed(1)+'deg');
  },()=>{portrait.style.removeProperty('--portrait-r');portrait.style.removeProperty('--portrait-x')});
  let tx=-900,ty=-900,px=-900,py=-900,haloRequested=false;
const glow=$('#cursorHalo');
resumeHalo=()=>{if(!haloRequested&&motion&&!document.hidden){haloRequested=true;requestAnimationFrame(glowFrame)}};
addEventListener('pointermove',e=>{tx=e.clientX;ty=e.clientY;resumeHalo()},{passive:true});
function glowFrame(){haloRequested=false;if(!motion||document.hidden)return;px+=(tx-px)*.075;py+=(ty-py)*.075;glow.style.transform=`translate3d(${px-220}px,${py-220}px,0)`;if(Math.abs(tx-px)+Math.abs(ty-py)>.2)resumeHalo()}
}

function selectStack(i){
  $('#stackRing').style.transitionDuration=motion?'':'0ms';
  $('#stackRing').style.setProperty('--ring-angle',(-90*i)+'deg');
  $$('[data-stack]').forEach((b,j)=>b.setAttribute('aria-pressed',String(i===j)));
  $$('.stack-face').forEach((face,j)=>face.setAttribute('aria-hidden',String(i!==j)));
}
$$('[data-stack]').forEach((btn,i)=>{
  btn.addEventListener('click',()=>selectStack(i));
  btn.addEventListener('keydown',e=>{
    let next=i;
    if(e.key==='ArrowRight'||e.key==='ArrowDown')next=(i+1)%4;
    else if(e.key==='ArrowLeft'||e.key==='ArrowUp')next=(i+3)%4;
    else if(e.key==='Home')next=0;
    else if(e.key==='End')next=3;
    else return;
    e.preventDefault();$$('[data-stack]')[next].focus();selectStack(next);
  });
});
selectStack(0);
// Esfera 3D: mismas órbitas y paleta; puntos prerenderizados y memoria reutilizada.
const canvas=$('#sphere'),ctx=canvas?.getContext('2d',{alpha:true});
let W=0,H=0,DPR=1,points=[],phase=.1,mX=0,mY=0,targetX=0,targetY=0;
let orbFrame=0,sphereVisible=true,lastTime=0,lastDraw=0,resizeFrame=0;
let atlas,orbGlow,tile=0;
const depthSteps=48,palette=['183,154,255','136,180,255','59,130,246'];
const particleColors=palette.map(rgb=>Array.from({length:101},(_,alpha)=>`rgba(${rgb},${(alpha/100).toFixed(2)})`));
function buildOrbLayers(){
  const cx=W*.52,cy=H*.52,rad=Math.min(W*.39,H*.41);
  orbGlow=ctx.createRadialGradient(cx,cy,rad*.12,cx,cy,rad*1.22);
  orbGlow.addColorStop(0,'rgba(137,107,255,.10)');orbGlow.addColorStop(.7,'rgba(93,80,174,.06)');orbGlow.addColorStop(1,'transparent');
  // En escritorio el trazado nativo conserva la nitidez y usa menos CPU que sprites.
  atlas=null;if(!isMobile())return;
  tile=Math.ceil(16*DPR);
  atlas=document.createElement('canvas');atlas.width=tile*3;atlas.height=tile*depthSteps;
  const brush=atlas.getContext('2d');
  for(let color=0;color<3;color++)for(let depth=0;depth<depthSteps;depth++){
    const b=depth/(depthSteps-1),d=2.85/(3.85-2*b);
    brush.beginPath();brush.fillStyle=`rgba(${palette[color]},${.17+.77*b})`;
    brush.arc(color*tile+tile/2,depth*tile+tile/2,(.6+1.2*b)*d*DPR,0,Math.PI*2);brush.fill();
  }
}
function orbResize(){
  if(!ctx)return;
  const rect=canvas.getBoundingClientRect(),dpr=Math.min(devicePixelRatio||1,isMobile()?1.35:1.7),n=isMobile()?180:650;
  if(W===rect.width&&H===rect.height&&DPR===dpr&&points.length===n)return;
  W=rect.width;H=rect.height;DPR=dpr;
  if(W<2||H<2)return;
  canvas.width=Math.max(1,Math.floor(W*DPR));canvas.height=Math.max(1,Math.floor(H*DPR));
  ctx.setTransform(DPR,0,0,DPR,0,0);
  if(points.length!==n){
    points=[];
    for(let i=0;i<n;i++){
      const y=1-i/(n-1)*2,r=Math.sqrt(Math.max(0,1-y*y)),a=Math.PI*(3-Math.sqrt(5))*i;
      points.push({sx:Math.cos(a)*r,sy:y,sz:Math.sin(a)*r,color:i%29===0?2:i%11===0?1:0,x:0,y:0,z:0,d:1});
    }
  }
  buildOrbLayers();drawSphere(true);
}
const orbZone=$('.hero-orbit');
let orbPointer=null,orbPointerFrame=0;
orbZone.addEventListener('pointermove',e=>{
  if(!motion||e.pointerType==='touch')return;
  orbPointer={x:e.clientX,y:e.clientY};
  if(!orbPointerFrame)orbPointerFrame=requestAnimationFrame(()=>{
    orbPointerFrame=0;if(!motion||!orbPointer)return;
    const r=orbZone.getBoundingClientRect();targetX=(orbPointer.x-r.left)/r.width-.5;targetY=(orbPointer.y-r.top)/r.height-.5;
  });
},{passive:true});
orbZone.addEventListener('pointerleave',()=>{orbPointer=null;targetX=targetY=0});
function drawSphere(once=false,elapsed=1000/30){
  if(!ctx||!orbGlow||W<2||H<2)return;
  const cx=W*.52,cy=H*.52,rad=Math.min(W*.39,H*.41),smoothing=1-Math.exp(-elapsed*.00138);
  ctx.clearRect(0,0,W,H);mX+=(targetX-mX)*smoothing;mY+=(targetY-mY)*smoothing;
  if(motion&&!once)phase+=.00015*elapsed;
  const a=phase+mX*.75,b=.38+mY*.65,ca=Math.cos(a),sa=Math.sin(a),cb=Math.cos(b),sb=Math.sin(b);
  ctx.fillStyle=orbGlow;ctx.beginPath();ctx.arc(cx,cy,rad*1.22,0,Math.PI*2);ctx.fill();
  ctx.save();ctx.translate(cx,cy);
  for(let k=0;k<4;k++){
    ctx.save();ctx.rotate(k*.67+phase*.31);ctx.scale(1,.26+k*.036);ctx.beginPath();
    ctx.strokeStyle=k===3?'rgba(59,130,246,.28)':'rgba(163,151,255,.17)';ctx.lineWidth=1;
    ctx.arc(0,0,rad*(.92+k*.07),0,Math.PI*2);ctx.stroke();ctx.restore();
  }
  ctx.restore();
  for(const p of points){
    const x=p.sx*ca-p.sz*sa,z0=p.sx*sa+p.sz*ca,y=p.sy*cb-z0*sb,z=p.sy*sb+z0*cb,d=2.85/(2.85-z);
    p.x=cx+x*rad*d;p.y=cy+y*rad*d;p.z=z;p.d=d;
  }
  points.sort((p,q)=>p.z-q.z);
  if(atlas){
    const size=tile/DPR;
    for(const p of points){
      const depth=Math.max(0,Math.min(depthSteps-1,Math.round((p.z+1)*.5*(depthSteps-1))));
      ctx.drawImage(atlas,p.color*tile,depth*tile,tile,tile,p.x-size/2,p.y-size/2,size,size);
    }
  }else for(const p of points){
    const depth=(p.z+1)/2;
    ctx.fillStyle=particleColors[p.color][Math.round((.17+.77*depth)*100)];
    ctx.beginPath();ctx.arc(p.x,p.y,(.6+1.2*depth)*p.d,0,6.29);ctx.fill();
  }
  ctx.beginPath();ctx.strokeStyle='rgba(196,183,255,.31)';ctx.arc(cx,cy,rad*1.12,phase*.4,phase*.4+1.8);ctx.stroke();
  ctx.beginPath();ctx.strokeStyle='rgba(59,130,246,.45)';ctx.arc(cx,cy,rad*1.15,3.6-phase*.2,4.4-phase*.2);ctx.stroke();
}
function orbLoop(ts){
  orbFrame=0;if(!motion||!sphereVisible||document.hidden)return;
  const interval=1000/(isMobile()?24:30),elapsed=ts-lastTime;
  if(!lastTime||elapsed>=interval){drawSphere(false,lastDraw?Math.min(100,ts-lastDraw):interval);lastDraw=ts;lastTime=ts-(elapsed%interval)}
  startOrb();
}
function startOrb(){if(!orbFrame&&motion&&sphereVisible&&!document.hidden&&ctx)orbFrame=requestAnimationFrame(orbLoop)}
function stopOrb(){cancelAnimationFrame(orbFrame);orbFrame=0;lastTime=lastDraw=0}
function requestOrbResize(){if(!resizeFrame)resizeFrame=requestAnimationFrame(()=>{resizeFrame=0;orbResize();startOrb()})}
if(ctx){
  requestOrbResize();addEventListener('resize',requestOrbResize,{passive:true});
  if('ResizeObserver'in window)new ResizeObserver(requestOrbResize).observe(canvas);
  if('IntersectionObserver'in window)new IntersectionObserver(entries=>{sphereVisible=entries[0].isIntersecting;if(sphereVisible)startOrb();else stopOrb()}).observe(orbZone);
}
document.addEventListener('visibilitychange',()=>{
  root.classList.toggle('page-hidden',document.hidden);
  if(document.hidden)stopOrb();else{startOrb();resumeHalo()}
});
if('IntersectionObserver' in window){
  new IntersectionObserver(entries=>entries.forEach(({target,isIntersecting})=>target.classList.toggle('is-in-view',isIntersecting))).observe($('.ticker'));
  const regions=new IntersectionObserver(entries=>entries.forEach(({target,isIntersecting})=>target.classList.toggle('is-in-view',isIntersecting)));
  $$('.hero,.scene').forEach(el=>regions.observe(el));
}
setMotion(motion);
})();
