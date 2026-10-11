/* The Achievers — shared site logic */
(function(){
"use strict";
var $ = function(s,r){ return (r||document).querySelector(s); };
var $$ = function(s,r){ return Array.prototype.slice.call((r||document).querySelectorAll(s)); };

/* Year */
$$('.js-year').forEach(function(el){ el.textContent = new Date().getFullYear(); });

/* Mobile menu */
var menuBtn = $('#menuBtn'), mobileMenu = $('#mobileMenu');
if (menuBtn && mobileMenu) menuBtn.addEventListener('click', function(){ mobileMenu.classList.toggle('open'); });

/* Modals */
function openModal(id){ var m = document.getElementById(id); if(!m) return; m.classList.add('open'); document.body.style.overflow='hidden'; }
function closeModals(){ $$('.modal').forEach(function(m){ m.classList.remove('open'); }); document.body.style.overflow=''; }
window.__openModal = openModal; window.__closeModals = closeModals;
document.addEventListener('click', function(e){
  var o = e.target.closest ? e.target.closest('[data-open]') : null;
  if (o) { if (o.getAttribute('data-open')==='quizModal') startQuiz(); openModal(o.getAttribute('data-open')); return; }
  if (e.target.closest && (e.target.closest('[data-close]') || e.target.classList.contains('modal'))) closeModals();
});
document.addEventListener('keydown', function(e){ if (e.key==='Escape') closeModals(); });

/* Count-up stats (vanilla port of StatsCounter: once on in-view, ~1.5s eased count, tabular numerals) */
function animateCount(el){
  var end = parseFloat(el.getAttribute('data-count')), suf = el.getAttribute('data-suffix')||'', pre = el.getAttribute('data-prefix')||'';
  var dec = parseInt(el.getAttribute('data-decimals')||'0', 10);
  var dur = parseFloat(el.getAttribute('data-duration')||'1.5')*1000;
  function render(v){ el.textContent = pre + v.toFixed(dec) + suf; }
  if (window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches){ render(end); return; }
  var t0 = null;
  function frame(t){
    if (!t0) t0 = t;
    var p = Math.min(1, (t-t0)/dur);
    var e = p===1 ? 1 : 1-Math.pow(2, -10*p);
    render(end*e);
    if (p<1) requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
}
(function(){
  var counters = $$('[data-count]');
  if (!counters.length) return;
  if ('IntersectionObserver' in window){
    var io = new IntersectionObserver(function(es){
      es.forEach(function(en){ if (en.isIntersecting){ animateCount(en.target); io.unobserve(en.target); } });
    }, {rootMargin: '-100px 0px -100px 0px'});
    counters.forEach(function(el){ io.observe(el); });
  } else {
    counters.forEach(animateCount);
  }
})();

/* ---------- Data (from PRD Section 4) ---------- */
var MENTORS = [
  {n:'Mr. Nirmal Dhami', img:'nirmal.jpg', sub:'Zoology', cred:'MBBS Scholar, KUSMS', qual:'MBBS (running)', exp:'2+ yrs', feat:true, bio:'MBBS scholar at KUSMS who makes zoology diagrams and terminology stick for CEE and NEB boards.'},
  {n:'Prakash Saud', img:'prakash.jpg', sub:'Physics', cred:'JEE Ranker', qual:'Bachelor completed', exp:'4+ yrs', feat:true, bio:'JEE ranker who turns tough physics numericals into simple, repeatable steps for NEB and IOE.'},
  {n:'Divyanshu Thapa', img:'divyanshu.jpg', sub:'Chemistry', cred:'Founder, IOE Ranker', qual:'Masters (running)', exp:'6+ yrs', feat:true, bio:'Founder of The Achievers and IOE ranker. 6+ years teaching chemistry with exam tricks for speed under pressure.'},
  {n:'Gaurav Prasad Bist', img:'gaurav.jpg', sub:'Mathematics', cred:'IOE Ranker', qual:'Bachelors complete', exp:'5+ yrs', feat:false, bio:'IOE ranker building speed and accuracy in calculus, vectors and algebra for boards and entrances.'},
  {n:'Niraj Badu', img:'niraj.jpg', sub:'Biology', cred:'SNSC Ranker', qual:'Bachelors complete', exp:'4+ yrs', feat:false, bio:'SNSC ranker specialising in human physiology and genetics with mnemonics that aid recall.'},
  {n:'Dipesh Saud', img:'dipesh.jpg', sub:'Physics', cred:'B.E. Computer', qual:'B.E. Computer', exp:'2+ yrs', feat:true, bio:'B.E. Computer engineer focused on concept clarity in electricity, magnetism and modern physics.'},
  {n:'Dipesh Kalouni', img:'kalouni.jpg', sub:'Chemistry', cred:'WRC Ranker', qual:'Bachelors complete', exp:'4+ yrs', feat:false, bio:'WRC ranker strong in physical and inorganic chemistry with a weekly test series.'},
  {n:'Birendra Singh Oire', img:'birendra.jpg', sub:'Physics & Mathematics', cred:'SNSC Ranker', qual:'Masters (running)', exp:'5+ yrs', feat:false, bio:'SNSC ranker teaching both physics and mathematics — ideal for students who want one mentor for both.'},
  {n:'Chakra Chand', img:'chakra.jpg', sub:'Physics', cred:'MSc. Topper', qual:'Masters complete', exp:'6+ yrs', feat:false, bio:'MSc topper with 6+ years of experience in mechanics, optics and modern physics.'},
  {n:'Tikendra Prasad Bist', img:'tikendra.jpg', sub:'Physics', cred:'FWU Ranker', qual:'Bachelors complete', exp:'4+ yrs', feat:false, bio:'FWU ranker mentoring NEB and IOE students on numerical-heavy physics practice.'},
  {n:'Kailash Bhatt', img:'kailash.jpg', sub:'Mathematics (Class 8–10)', cred:'Mathematics Topper', qual:'Bachelors complete', exp:'4+ yrs', feat:false, bio:'Mathematics topper running the foundation pipeline for Class 8–10 students.'}
];

var COURSES = [
  {t:'Class 11 Physics', g:'Class 11 Science', s:'Physics', d:'Mechanics, heat and waves with daily problem practice and recorded backups.'},
  {t:'Class 11 Chemistry', g:'Class 11 Science', s:'Chemistry', d:'Physical, organic and inorganic basics built step by step from the NEB syllabus.'},
  {t:'Class 11 Mathematics', g:'Class 11 Science', s:'Mathematics', d:'Algebra, trigonometry and calculus foundations with chapter-wise sets.'},
  {t:'Class 11 Biology', g:'Class 11 Science', s:'Biology', d:'Botany and zoology fundamentals with labelled diagrams and notes.'},
  {t:'Class 11 Computer Science', g:'Class 11 Science', s:'Computer Science', d:'Programming logic, databases and networking with hands-on practice.'},
  {t:'Class 11 English', g:'Class 11 Science', s:'English', d:'Grammar, comprehension and writing skills for NEB board excellence.'},
  {t:'Class 12 Physics', g:'Class 12 Science', s:'Physics', d:'Electricity, magnetism, optics and modern physics for NEB boards + IOE overlap.'},
  {t:'Class 12 Chemistry', g:'Class 12 Science', s:'Chemistry', d:'Full NEB syllabus with numericals, reactions and past-paper drills.'},
  {t:'Class 12 Biology', g:'Class 12 Science', s:'Biology', d:'Genetics, physiology and ecology with diagrams and CEE head-start.'},
  {t:'Class 12 Mathematics', g:'Class 12 Science', s:'Mathematics', d:'Calculus, vectors and probability with exam shortcuts.'},
  {t:'Class 12 English', g:'Class 12 Science', s:'English', d:'Board-pattern writing practice with model answers and feedback.'},
  {t:'Class 12 Accountancy', g:'Management', s:'Accountancy', d:'Partnership, company accounts and financial statements, NEB aligned.'},
  {t:'Class 12 Economics', g:'Management', s:'Economics', d:'Micro and macro with numericals, graphs and board-question practice.'},
  {t:'Management English', g:'Management', s:'English', d:'Business communication and board writing for management stream.'},
  {t:'CEE Biology Crash Course', g:'Medical CEE', s:'Biology', d:'High-yield botany + zoology with timed MCQs and past-paper sets.'},
  {t:'CEE Chemistry & Physics', g:'Medical CEE', s:'Chemistry', d:'Concept revision and numerical drills modelled on the CEE paper.'},
  {t:'IOE Mathematics', g:'IOE / CSIT', s:'Mathematics', d:'Entrance-level problem solving, speed practice and model tests.'},
  {t:'IOE Physics', g:'IOE / CSIT', s:'Physics', d:'Numerical-heavy practice with weekly full-length CBT mocks.'}
];
var GROUPS = ['All','Class 11 Science','Class 12 Science','Management','Medical CEE','IOE / CSIT'];
var SUBJECTS = ['Physics','Chemistry','Mathematics','Biology','Accountancy','Economics','English','Computer Science'];

/* ---------- Course catalog renderer (home + courses page) ---------- */
var fGroup = 'All', fSub = null;
function renderFilters(){
  var cf = $('#courseFilters'), sp = $('#subjectPills');
  if (cf) cf.innerHTML = GROUPS.map(function(f){ return '<button data-f="'+f+'" class="chip'+(f===fGroup?' active':'')+'">'+f+'</button>'; }).join('');
  if (sp) sp.innerHTML = '<span style="font-size:.85rem" class="muted">Subject:</span> ' + SUBJECTS.map(function(s){ return '<button data-s="'+s+'" class="pill'+(s===fSub?' active':'')+'">'+s+'</button>'; }).join('');
}
function renderCourses(limit){
  var grid = $('#courseGrid'); if (!grid) return;
  var list = COURSES.filter(function(c){ return (fGroup==='All'||c.g===fGroup) && (!fSub||c.s===fSub); });
  if (limit) list = list.slice(0, limit);
  grid.innerHTML = list.map(function(c){
    return '<article class="glass card-hover" style="padding:1.5rem;display:flex;flex-direction:column">'+
      '<div style="display:flex;justify-content:space-between;gap:.5rem;align-items:center"><span class="badge badge-red">'+c.g+'</span><span style="font-size:.75rem" class="muted">'+c.s+'</span></div>'+
      '<h3 style="margin:1rem 0 .25rem">'+c.t+'</h3>'+
      '<p class="muted" style="font-size:.9rem;flex:1">'+c.d+'</p>'+
      '<div style="display:flex;gap:.5rem;margin-top:1.25rem">'+
        '<button data-open="bookModal" class="btn btn-accent" style="flex:1;padding:.6rem;font-size:.85rem">Free demo</button>'+
        '<button data-open="payModal" class="btn btn-ghost" style="flex:1;padding:.6rem;font-size:.85rem">Enroll</button>'+
      '</div></article>';
  }).join('');
  var none = $('#noCourse');
  if (none) none.style.display = list.length ? 'none' : 'block';
  var count = $('#courseCount');
  if (count) count.textContent = list.length + ' program' + (list.length===1?'':'s');
}
var cfEl = document.getElementById('courseFilters');
if (cfEl) cfEl.addEventListener('click', function(e){ var b=e.target.closest('[data-f]'); if(!b) return; fGroup=b.getAttribute('data-f'); renderFilters(); renderCourses(window.__courseLimit||0); });
var spEl = document.getElementById('subjectPills');
if (spEl) spEl.addEventListener('click', function(e){ var b=e.target.closest('[data-s]'); if(!b) return; var s=b.getAttribute('data-s'); fSub = (fSub===s?null:s); renderFilters(); renderCourses(window.__courseLimit||0); });
if (cfEl || document.getElementById('courseGrid')) { renderFilters(); renderCourses(window.__courseLimit||0); }

/* ---------- Mentor grids ---------- */
function initials(n){ return n.trim().split(/\s+/).map(function(w){return w[0];}).slice(0,2).join('').toUpperCase(); }
function avatarSvg(n){
  var svg = '<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400"><rect width="400" height="400" fill="#1E7A5A"/><text x="50%" y="54%" font-family="Arial" font-size="130" font-weight="700" fill="#fff" text-anchor="middle" dominant-baseline="middle">'+initials(n)+'</text></svg>';
  return 'data:image/svg+xml;utf8,'+encodeURIComponent(svg);
}
function imgTag(m){
  return '<img src="images/'+m.img+'" alt="'+m.n+' — '+m.sub+' mentor" loading="lazy" onerror="this.onerror=null;this.src=\''+avatarSvg(m.n)+'\'">';
}
function mentorCard(m, i){
  return '<article data-m="'+i+'" tabindex="0" role="button" aria-label="View '+m.n+' profile" class="glass card-hover tcard" style="cursor:pointer;overflow:hidden">'+
    '<div style="position:relative">'+imgTag(m)+
    (m.feat?'<span class="badge badge-gold" style="position:absolute;top:.75rem;left:.75rem">Featured</span>':'')+'</div>'+
    '<div style="padding:1rem"><h3 style="margin:0;font-size:1.05rem">'+m.n+'</h3>'+
    '<div style="margin-top:.5rem;display:flex;gap:.4rem;flex-wrap:wrap"><span class="badge badge-red">'+m.sub+'</span></div>'+
    '<p class="muted" style="font-size:.8rem;margin:.5rem 0 0">'+m.cred+' · '+m.exp+'</p></div></article>';
}
var mgHome = $('#mentorGrid'), mgAll = $('#mentorGridAll');
if (mgHome) mgHome.innerHTML = MENTORS.slice(0,8).map(mentorCard).join('');
if (mgAll) mgAll.innerHTML = MENTORS.map(mentorCard).join('');
function mentorFilter(sub){
  if (!mgAll) return;
  mgAll.innerHTML = MENTORS.map(function(m,i){ return {m:m,i:i}; })
    .filter(function(x){ return !sub || x.m.sub.toLowerCase().indexOf(sub.toLowerCase())>-1; })
    .map(function(x){ return mentorCard(x.m, x.i); }).join('');
}
var mfBar = $('#mentorFilters');
if (mfBar) mfBar.addEventListener('click', function(e){
  var b = e.target.closest('[data-mf]'); if(!b) return;
  $$('#mentorFilters .chip').forEach(function(c){ c.classList.remove('active'); }); b.classList.add('active');
  var v = b.getAttribute('data-mf'); mentorFilter(v==='All' ? null : v);
});
function showMentor(i){
  var m = MENTORS[i]; if(!m) return;
  var body = $('#mentorBody'); if(!body) return;
  body.innerHTML = imgTag(m) +
   '<div style="padding:1.5rem">'+
    (m.feat?'<span class="badge badge-gold">Featured</span> ':'')+'<span class="badge badge-red">'+m.sub+'</span>'+
    '<h3 style="font-size:1.5rem;margin:.75rem 0 .25rem">'+m.n+'</h3>'+
    '<p style="color:#166B4D;font-size:.9rem;margin:0;font-weight:700">'+m.cred+'</p>'+
    '<div class="grid g2" style="margin-top:1rem"><div class="glass" style="padding:.8rem"><div class="muted" style="font-size:.78rem">Qualification</div><div style="font-weight:700">'+m.qual+'</div></div>'+
    '<div class="glass" style="padding:.8rem"><div class="muted" style="font-size:.78rem">Experience</div><div style="font-weight:700">'+m.exp+'</div></div></div>'+
    '<p class="muted" style="font-size:.92rem;margin-top:1rem">'+m.bio+'</p>'+
    '<button id="bookMentor" class="btn btn-red" style="width:100%;margin-top:1.25rem">Book Class with '+m.n.split(' ').slice(-1)+'</button></div>';
  var bb = $('#bookMentor');
  if (bb) bb.onclick = function(){ closeModals(); var bf=$('#bookFor'); if(bf) bf.textContent='Booking a class with '+m.n+' ('+m.sub+').'; openModal('bookModal'); };
  openModal('mentorModal');
}
document.addEventListener('click', function(e){ var c=e.target.closest?e.target.closest('[data-m]'):null; if(c) showMentor(+c.getAttribute('data-m')); });
document.addEventListener('keydown', function(e){ if((e.key==='Enter'||e.key===' ') && e.target.closest && e.target.closest('[data-m]')){ e.preventDefault(); showMentor(+e.target.closest('[data-m]').getAttribute('data-m')); } });

/* ---------- Auth tabs + demo forms ---------- */
$$('.tab').forEach(function(t){ t.addEventListener('click', function(){
  var reg = t.getAttribute('data-tab')==='register';
  $$('.tab').forEach(function(x){ var on=x===t; x.classList.toggle('on',on); });
  var lf=$('#loginForm'), rf=$('#registerForm');
  if(lf) lf.style.display = reg?'none':'block';
  if(rf) rf.style.display = reg?'block':'none';
  var lm=$('#loginMsg'); if(lm) lm.style.display='none';
});});
function fakeSubmit(id, msg){
  var f = document.getElementById(id); if(!f) return;
  f.addEventListener('submit', function(e){ e.preventDefault();
    var m = document.getElementById(id+'Msg') || $('#loginMsg'); if(!m) return;
    m.textContent = msg; m.style.display='block'; m.style.color='#15803d'; f.reset();
  });
}
fakeSubmit('loginForm','Welcome back! Redirecting to your dashboard…');
fakeSubmit('registerForm','Account created. Check your phone for a verification code.');
fakeSubmit('counsForm','Request received! We will call you back within 24 hours (Sun–Fri).');
fakeSubmit('contactForm','Message sent! Our team replies within 24 hours.');
var bookForm = $('#bookForm');
if (bookForm) {
  var bd = $('#bookDate'); if (bd) bd.min = new Date().toISOString().split('T')[0];
  bookForm.addEventListener('submit', function(e){ e.preventDefault();
    var m=$('#bookMsg'); var type=$('#bookType'), date=$('#bookDate');
    if(m){ m.textContent='Booked! Our team will call you to confirm your '+(type?type.value.toLowerCase():'demo')+(date&&date.value?' on '+date.value:'')+'.'; m.style.display='block'; m.style.color='#15803d'; }
    bookForm.reset();
  });
}

/* ---------- Sample CBT quiz ---------- */
var QUIZ = [
  {q:'What is the SI unit of force?', o:['Joule','Newton','Watt','Pascal'], a:1},
  {q:'Which organelle is called the powerhouse of the cell?', o:['Ribosome','Nucleus','Mitochondria','Golgi body'], a:2},
  {q:'What is the value of sin 30°?', o:['1/2','√3/2','1','0'], a:0},
  {q:'Which gas is released during photosynthesis?', o:['Carbon dioxide','Oxygen','Nitrogen','Hydrogen'], a:1},
  {q:'What is the derivative of x²?', o:['x','2x','x²','2'], a:1}
];
var qi=0, score=0;
function startQuiz(){ qi=0; score=0; renderQ(); }
window.__startQuiz = startQuiz;
function renderQ(){
  var b = $('#quizBody'); if(!b) return;
  if (qi>=QUIZ.length){
    var pct = Math.round(score/QUIZ.length*100);
    b.innerHTML = '<h3 style="font-size:1.25rem;margin:0">Quiz complete</h3>'+
      '<p style="font-size:3rem;font-weight:800;margin:1rem 0 0;font-family:Fraunces,Georgia,serif;color:'+(pct>=60?'#15803d':'#b91c1c')+'">'+score+'/'+QUIZ.length+'</p>'+
      '<p class="muted">'+pct+'% correct. '+(pct>=60?'Great work — you are on track for boards.':'Keep practising — our mentors can help you improve.')+'</p>'+
      '<div style="display:flex;gap:.5rem;margin-top:1.25rem"><button id="retry" class="btn btn-ghost" style="flex:1">Retake quiz</button><button data-open="bookModal" class="btn btn-red" style="flex:1">Book free demo</button></div>'+
      '<p class="muted" style="font-size:.8rem;margin-top:1rem">Full platform: hundreds of chapter-wise sets + weekly full-length CBT mocks with instant solutions, percentile and weak-area analysis.</p>';
    var r=$('#retry'); if(r) r.onclick=startQuiz; return;
  }
  var q = QUIZ[qi];
  b.innerHTML = '<p class="muted" style="font-size:.82rem;margin:0">Question '+(qi+1)+' of '+QUIZ.length+' · Sample CBT</p>'+
    '<h3 style="margin:.4rem 0 0">'+q.q+'</h3>'+
    '<div style="margin-top:1rem;display:grid;gap:.5rem">'+q.o.map(function(x,i){ return '<button data-a="'+i+'" class="opt">'+String.fromCharCode(65+i)+'. '+x+'</button>'; }).join('')+'</div>'+
    '<p id="qfb" style="min-height:1.4rem;font-size:.88rem"></p>';
  $$('.opt',b).forEach(function(btn){ btn.onclick=function(){
    var pick=+btn.getAttribute('data-a'), ok=pick===q.a; if(ok) score++;
    $$('.opt',b).forEach(function(x,i){ x.disabled=true; if(i===q.a) x.classList.add('correct'); else if(i===pick) x.classList.add('wrong'); });
    var fb=$('#qfb'); if(fb){ fb.textContent = ok?'Correct!':'Not quite — answer: '+q.o[q.a]; fb.style.color=ok?'#15803d':'#b91c1c'; }
    setTimeout(function(){ qi++; renderQ(); }, 1200);
  };});
}

/* ---------- Payment options ---------- */
var PAYS = [
  {n:'eSewa', c:'#60bb46', d:'eSewa ID: 981-0686665 · Name: The Achievers Institute of Learning'},
  {n:'Khalti', c:'#5c2d91', d:'Khalti ID: 976-9884993 · Name: The Achievers Institute of Learning'},
  {n:'Fonepay', c:'#F2A21B', d:'Fonepay merchant: The Achievers Institute of Learning — scan the QR at the office desk or ask on WhatsApp.'},
  {n:'Bank transfer', c:'#1E7A5A', d:'Ask our team on WhatsApp (981-0686665) for the bank details and share the receipt to activate your course.'}
];
var payOpts = $('#payOpts');
if (payOpts) {
  payOpts.innerHTML = PAYS.map(function(p,i){ return '<button data-p="'+i+'" class="opt" style="display:flex;align-items:center;gap:.75rem"><span style="background:'+p.c+';width:2.25rem;height:2.25rem;border-radius:999px;display:grid;place-items:center;font-weight:800;color:#fff">'+p.n[0]+'</span><span style="font-weight:700">'+p.n+'</span></button>'; }).join('');
  payOpts.addEventListener('click', function(e){
    var b=e.target.closest('[data-p]'); if(!b) return; var p=PAYS[+b.getAttribute('data-p')], d=$('#payDetail');
    if(d){ d.innerHTML='<p style="font-weight:800;margin:0 0 .3rem">Pay with '+p.n+'</p><p style="margin:0">'+p.d+'</p><p class="muted" style="margin:.5rem 0 0;font-size:.82rem">After paying, send the screenshot to 981-0686665 on WhatsApp to activate your course. No hidden fees · Cancel anytime.</p>'; d.style.display='block'; }
  });
}

/* ---------- Syllabus data ---------- */
var SYLLABUS = {
  'Class 11 Science': [['Physics',['Mechanics','Heat & Thermodynamics','Wave & Optics basics']],['Chemistry',['General & Physical','Organic basics','Inorganic blocks']],['Mathematics',['Algebra','Trigonometry','Calculus foundations']],['Biology',['Cell & Diversity','Flora & Fauna','Ecology basics']]],
  'Class 12 Science': [['Physics',['Electricity & Magnetism','Optics','Modern Physics']],['Chemistry',['Physical','Organic','Inorganic + Applied']],['Biology',['Genetics','Physiology','Ecology']],['Mathematics',['Calculus','Vectors','Probability']]],
  'Management': [['Accountancy',['Partnership','Company accounts','Financial statements']],['Economics',['Micro','Macro','Nepalese economy']],['English',['Comprehension','Writing','Grammar']]],
  'Medical CEE': [['Biology (high weight)',['Botany drills','Zoology drills','Past-paper MCQs']],['Chemistry',['Physical numericals','Organic mechanisms']],['Physics',['Mechanics + Modern','Full-length CBT mocks']]],
  'IOE / CSIT': [['Mathematics (high weight)',['Algebra + Calculus','Speed sets']],['Physics',['Numerical marathons','Model tests']],['Chemistry + English',['Aptitude','Comprehension drills']]]
};
var sylTabs = $('#sylTabs'), sylBody = $('#sylBody');
if (sylTabs && sylBody) {
  function renderSyl(k){
    sylBody.innerHTML = SYLLABUS[k].map(function(row){
      return '<div class="glass" style="padding:1.25rem"><h3 style="margin:0 0 .6rem">'+row[0]+'</h3><ul class="muted" style="margin:0;padding-left:1.1rem;font-size:.92rem">'+row[1].map(function(c){return '<li>'+c+'</li>';}).join('')+'</ul></div>';
    }).join('');
  }
  var keys = Object.keys(SYLLABUS);
  sylTabs.innerHTML = keys.map(function(k,i){ return '<button data-syl="'+k+'" class="chip'+(i===0?' active':'')+'">'+k+'</button>'; }).join('');
  renderSyl(keys[0]);
  sylTabs.addEventListener('click', function(e){ var b=e.target.closest('[data-syl]'); if(!b) return;
    $$('#sylTabs .chip').forEach(function(c){c.classList.remove('active');}); b.classList.add('active'); renderSyl(b.getAttribute('data-syl')); });
}

/* ---------- Social flip tiles (CONTACT letters -> icons) ---------- */
var SOCIALS = [
  {letter:'C', label:'Facebook', href:'https://www.facebook.com/profile.php?id=61579416387457', icon:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M13.5 21v-7h2.4l.4-3h-2.8V9.1c0-.9.3-1.5 1.6-1.5h1.3V4.9c-.3 0-1.1-.1-2.1-.1-2.1 0-3.6 1.3-3.6 3.7V11H8.2v3h2.5v7h2.8z"/></svg>'},
  {letter:'O', label:'YouTube', href:'https://youtube.com/@TheAchieversAcademy-edu', icon:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M21.6 7.2a2.8 2.8 0 0 0-2-2C17.9 4.8 12 4.8 12 4.8s-5.9 0-7.6.4a2.8 2.8 0 0 0-2 2A29 29 0 0 0 2 12a29 29 0 0 0 .4 4.8 2.8 2.8 0 0 0 2 2c1.7.4 7.6.4 7.6.4s5.9 0 7.6-.4a2.8 2.8 0 0 0 2-2A29 29 0 0 0 22 12a29 29 0 0 0-.4-4.8zM10 15.2V8.8l5.2 3.2-5.2 3.2z"/></svg>'},
  {letter:'N', label:'TikTok', href:'https://www.tiktok.com/@achievers.academy10', icon:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M16.6 3c.4 2.1 1.8 3.6 4 3.9v3c-1.6 0-3-.5-4-1.3v6.6c0 3.4-2.6 6.1-6 6.1-3.3 0-6-2.7-6-6.1s2.7-6 6-6c.3 0 .7 0 1 .1v3.1c-.3-.1-.7-.2-1-.2-1.7 0-3 1.3-3 3s1.3 3 3 3c1.8 0 3-1.4 3-3.1V3h3z"/></svg>'},
  {letter:'T', label:'WhatsApp', href:'https://wa.me/9779810686665', icon:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm0 18.2c-1.5 0-3-.4-4.3-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2zm4.6-6.1c-.3-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4 0-.5.1-.7l.5-.6c.1-.2.1-.4 0-.5l-.8-1.9c-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.5.2-.7.6-.2.5-.9 2.1-.9 4.1 0 2 1.4 3.9 1.6 4.2.2.3 2.8 4.4 6.9 6 .9.4 1.7.6 2.2.8 1 .3 1.8.2 2.5.1.8-.1 2.3-.9 2.6-1.8.3-.9.3-1.7.2-1.8-.1-.2-.4-.2-.7-.4z"/></svg>'},
  {letter:'A', label:'Email', href:'mailto:info.theachiever@gmail.com', icon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></svg>'},
  {letter:'C', label:'Call us', href:'tel:9810686665', icon:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.6 21 3 13.4 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.2.2 2.4.6 3.6.1.3 0 .7-.2 1l-2.3 2.2z"/></svg>'},
  {letter:'T', label:'Find us', href:'https://maps.app.goo.gl/fo6vjBYxXNQiSswWA', icon:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a7 7 0 0 0-7 7c0 5.2 7 13 7 13s7-7.8 7-13a7 7 0 0 0-7-7zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5z"/></svg>'}
];
function renderFlip(row){
  row.innerHTML = SOCIALS.map(function(s,i){
    var ext = s.href.indexOf('http')===0 ? ' target="_blank" rel="noopener"' : '';
    return '<a class="flip-tile" href="'+s.href+'"'+ext+' aria-label="'+s.label+'" style="--d:'+(i*80)+'ms">'+
      '<span class="flip-tip">'+s.label+'</span>'+
      '<span class="flip-inner"><span class="flip-face flip-front">'+s.letter+'</span>'+
      '<span class="flip-face flip-back">'+s.icon+'</span></span></a>';
  }).join('');
  var on = function(){ row.classList.add('flipped'); };
  var off = function(){ row.classList.remove('flipped'); };
  row.addEventListener('mouseenter', on);
  row.addEventListener('mouseleave', off);
  row.addEventListener('focusin', on);
  row.addEventListener('focusout', off);
  if (window.matchMedia && matchMedia('(hover: none)').matches) {
    row.addEventListener('click', function(e){ if (e.target.closest('a')) return; row.classList.toggle('flipped'); });
    if ('IntersectionObserver' in window) {
      var io = new IntersectionObserver(function(es){ es.forEach(function(en){ if (en.isIntersecting){ row.classList.add('flipped'); io.disconnect(); } }); }, {threshold:.5});
      io.observe(row);
    }
  }
}
$$('[data-flip]').forEach(renderFlip);
})();
