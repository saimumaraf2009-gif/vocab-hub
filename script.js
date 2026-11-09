/* VocabHub — local-first vocabulary app. All data lives in localStorage (key below).
   Storage is isolated in load()/save() so a backend can replace it later. */
const K='vocabhub.v1',INT=[1,2,4,7,15,30,60],CAP=500; // review intervals (days), daily XP cap
const XPV={mcq:10,typ:20,scr:15,fill:15,syn:10,flash:3,match:15,speed:2},WORD_XP_PER_DAY=3;
const LV=[0,100,400,900,1500,3000,6000],LN=['Beginner','Explorer','Word Seeker','Word Enthusiast','Word Master','Vocabulary Expert','Lexicon Legend'];
const $=s=>document.querySelector(s);
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const sh=a=>{a=[...a];for(let i=a.length;i>1;){const j=Math.random()*i--|0;[a[i],a[j]]=[a[j],a[i]]}return a};
const short=m=>(m||'').split(' / ')[0];
const dayOf=t=>{const d=new Date(t);return d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0')};
let D=Object.assign({words:null,p:{},ses:[],fav:{},claims:{},ach:{},theme:'system',goal:20,name:'Learner'},JSON.parse(localStorage.getItem(K)||'{}'));
let W=D.words||[],S=null,N=10,L={q:'',st:'',fav:false,n:50};
const save=()=>{D.words=W;try{localStorage.setItem(K,JSON.stringify(D))}catch(e){toast('Storage full or blocked: export a backup!')}};
function toast(m){const t=document.createElement('div');t.className='toast';t.textContent=m;$('#toasts').append(t);setTimeout(()=>t.remove(),3500)}
function download(n,txt,type){const a=document.createElement('a');a.href=URL.createObjectURL(new Blob([txt],{type}));a.download=n;a.click()}
function theme(){const t=D.theme=='system'?(matchMedia('(prefers-color-scheme:dark)').matches?'dark':'light'):D.theme;document.documentElement.dataset.t=t}

/* ---------- progress / SRS ---------- */
const gp=w=>D.p[w.id]||(D.p[w.id]={b:0,c:0,i:0,next:0,xd:'',xn:0});
const sOf=p=>!p||p.c+p.i==0?'new':(p.b>=5&&p.c>=5)?'mastered':(p.i&&p.b==0&&p.next<=Date.now())?'review':p.b>=3?'familiar':'learning';
const isDue=p=>p&&p.c+p.i>0&&p.next<=Date.now();
function grade(w,ok){const p=gp(w);if(ok){p.c++;if(Date.now()>=p.next){p.b++;p.next=Date.now()+INT[Math.min(p.b-1,INT.length-1)]*864e5}}else{p.i++;p.b=Math.max(0,p.b-2);p.next=Date.now()}}
function lvl(xp){let i=0;LV.forEach((v,k)=>{if(xp>=v)i=k});const n=LV[i+1];return{i,name:LN[i],next:n,pct:n?Math.round((xp-LV[i])/(n-LV[i])*100):100}}
function st(){const now=Date.now(),td=dayOf(now),o={xp:0,tc:0,ti:0,cnt:{new:0,learning:0,familiar:0,mastered:0,review:0},due:0,todayXP:0,todayC:0,todayN:0,r:0};
 const days=new Set();
 D.ses.forEach(s=>{o.xp+=s.xp||0;o.r+=s.r||0;if(s.mode!='mission'){days.add(dayOf(s.t))}if(dayOf(s.t)==td){o.todayXP+=s.xp||0;if(s.mode!='mission'){o.todayC+=s.c;o.todayN++}}});
 W.forEach(w=>{const p=D.p[w.id];o.cnt[sOf(p)]++;if(p){o.tc+=p.c;o.ti+=p.i;if(isDue(p))o.due++}});
 let s=0,d=new Date();if(!days.has(dayOf(d)))d.setDate(d.getDate()-1);while(days.has(dayOf(d))){s++;d.setDate(d.getDate()-1)}
 o.streak=s;o.days=days;o.learned=W.length-o.cnt.new;return o}
const ACH=[['First Step','Complete a practice session',s=>D.ses.some(x=>x.mode!='mission')],['First 10','Learn 10 words',s=>s.learned>=10],['First 100','Learn 100 words',s=>s.learned>=100],['Seven Day Streak','7-day streak',s=>s.streak>=7],['Thirty Day Streak','30-day streak',s=>s.streak>=30],['Perfect Score','100% in a session of 5+',s=>D.ses.some(x=>x.n>=5&&x.c==x.n&&x.mode!='mission')],['Speedster','15+ correct in a Speed Challenge',s=>D.ses.some(x=>x.mode=='speed'&&x.c>=15)],['Word Master','Master 10 words',s=>s.cnt.mastered>=10],['Memory Pro','Master 50 words',s=>s.cnt.mastered>=50],['Revision Champion','Review 100 due words',s=>s.r>=100],['Consistency Champion','Be active on 14 different days',s=>s.days.size>=14]];
function checkAch(){const s=st();ACH.forEach(([n,,f])=>{if(!D.ach[n]&&f(s)){D.ach[n]=Date.now();toast('🏆 Achievement unlocked: '+n)}})}

/* ---------- vocabulary import / export ---------- */
const nid=e=>e.toLowerCase().replace(/\s+/g,' ').trim();
function addW(list,o){const id=nid(o.en||'');if(!id)return 0;let w=list.find(x=>x.id==id);
 if(!w){if(!o.bn)return 0;list.push({id,en:o.en.trim(),bn:o.bn,pos:o.pos||'',syn:o.syn||[],ant:o.ant||[],ex:o.ex||'',ext:o.ext||'',diff:o.diff||'',cat:o.cat||'',added:Date.now()});return 1}
 if(o.bn){if(o.rep)w.bn=o.bn;else{const a=w.bn.split(/\s*\/\s*/).filter(Boolean);o.bn.split(/\s*\/\s*/).forEach(s=>{if(s&&!a.includes(s))a.push(s)});w.bn=a.join(' / ')}}
 ['pos','ex','ext','diff','cat'].forEach(k=>{if(o[k])w[k]=o[k]});['syn','ant'].forEach(k=>{if(o[k]&&o[k].length)w[k]=o[k]});return 2}
function csv(t){const r=[];let row=[],c='',q=false;t=t.replace(/^\uFEFF/,'');for(let i=0;i<t.length;i++){const ch=t[i];if(q){if(ch=='"'){if(t[i+1]=='"'){c+='"';i++}else q=false}else c+=ch}else if(ch=='"')q=true;else if(ch==','){row.push(c);c=''}else if(ch=='\n'||ch=='\r'){if(ch=='\r'&&t[i+1]=='\n')i++;row.push(c);r.push(row);row=[];c=''}else c+=ch}row.push(c);r.push(row);return r.filter(x=>x.join('').trim())}
const lst=s=>(s||'').split(/[;|]/).map(x=>x.trim()).filter(Boolean);
function parseInput(t){t=t.trim();const out=[];
 if(t[0]=='{'||t[0]=='['){const j=JSON.parse(t),a=Array.isArray(j)?j:j.words;a.forEach(x=>out.push({en:x.en||x.word,bn:x.bn||x.bengali_meaning,pos:x.pos||x.part_of_speech,syn:x.syn||x.synonyms,ant:x.ant||x.antonyms,ex:x.ex||x.example,ext:x.ext||x.example_translation,diff:x.diff||x.difficulty,cat:x.cat||x.category}).valueOf());return out.map(o=>(['syn','ant'].forEach(k=>{if(typeof o[k]=='string')o[k]=lst(o[k])}),o))}
 if(/^word\s*,/i.test(t)){const r=csv(t),h=r[0].map(x=>x.trim().toLowerCase());const g=(row,k)=>(row[h.indexOf(k)]||'').trim();r.slice(1).forEach(row=>out.push({en:g(row,'word'),bn:g(row,'bengali_meaning'),pos:g(row,'part_of_speech'),syn:lst(g(row,'synonyms')),ant:lst(g(row,'antonyms')),ex:g(row,'example'),ext:g(row,'example_translation'),diff:g(row,'difficulty'),cat:g(row,'category')}));return out}
 t.split(/\r?\n/).forEach(l=>{const x=l.match(/^[\s\-•*]*([^:：|]+?)\s*[:：]\s*(.+?)\s*$/);if(x&&!/^page/i.test(x[1]))out.push({en:x[1].trim(),bn:x[2].trim()})});return out}
function doImport(txt,dry){let rows;try{rows=parseInput(txt)}catch(e){return{err:'Could not read input: '+e.message}}
 const tmp=dry?JSON.parse(JSON.stringify(W)):W,r={added:0,merged:0,skipped:0,total:rows.length};rows.forEach(o=>{const x=addW(tmp,o);x==1?r.added++:x==2?r.merged++:r.skipped++});if(!dry){save()}return r}
const toCSV=()=>'\uFEFF'+[['word','bengali_meaning','part_of_speech','synonyms','antonyms','example','example_translation','difficulty','category'],...W.map(w=>[w.en,w.bn,w.pos,w.syn.join(';'),w.ant.join(';'),w.ex,w.ext,w.diff,w.cat])].map(r=>r.map(c=>'"'+String(c).replace(/"/g,'""')+'"').join(',')).join('\r\n');

/* ---------- question engine ---------- */
const variants=w=>w.en.split('/').map(x=>x.trim().toLowerCase()).filter(Boolean);
const okFill=w=>w.ex&&new RegExp('\\b'+variants(w)[0].replace(/[.*+?^${}()|[\]\\]/g,'\\$&'),'i').test(w.ex);
const okScr=w=>{const v=variants(w)[0];return v&&!/\s/.test(v)&&v.length>=4};
const OK={e2b:()=>1,b2e:()=>1,typ:()=>1,scr:okScr,fill:okFill,syn:w=>w.syn.length,ant:w=>w.ant.length};
const MODES={mcq:['e2b','b2e'],speed:['e2b','b2e'],typing:['typ'],scramble:['scr'],fill:['fill'],syn:['syn','ant'],mixed:['e2b','b2e','typ','scr','fill','syn','ant']};
const dis=(w,f,c)=>[...new Set(sh(W.filter(x=>x.id!=w.id)).map(f).filter(x=>x&&x!=c))].slice(0,3);
function mk(w,t){const o={w,t,xp:t=='e2b'||t=='b2e'?'mcq':t=='ant'?'syn':t};
 if(t=='e2b'){o.prompt=w.en;o.sub=w.pos;o.ans=short(w.bn);o.opts=sh([o.ans,...dis(w,x=>short(x.bn),o.ans)])}
 if(t=='b2e'){o.prompt=short(w.bn);o.bn=1;o.sub='Choose the English word';o.ans=w.en;o.opts=sh([w.en,...dis(w,x=>x.en,w.en)])}
 if(t=='typ'){o.prompt=w.bn;o.bn=1;o.sub='Type the English word';o.ans=variants(w);o.show=w.en;o.hint=variants(w)[0][0]+' … ('+variants(w)[0].length+' letters)'}
 if(t=='scr'){const v=variants(w)[0];let s=v;for(let k=0;k<9&&s==v;k++)s=sh(v).join('');o.prompt=s.toUpperCase().split('').join(' ');o.sub='Unscramble: '+short(w.bn);o.ans=[v];o.show=v;o.hint=v[0]+' … ('+v.length+' letters)'}
 if(t=='fill'){const v=variants(w)[0];o.prompt=w.ex.replace(new RegExp('\\b'+v.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')+'\\w*','i'),'_____');o.sub='Choose the missing word';o.ans=w.en;o.opts=sh([w.en,...dis(w,x=>x.en,w.en)])}
 if(t=='syn'||t=='ant'){const a=sh(t=='syn'?w.syn:w.ant)[0];o.prompt=w.en;o.sub='Choose the '+(t=='syn'?'synonym':'antonym');o.ans=a;const bad=[...w.syn,...w.ant,w.en];o.opts=sh([a,...[...new Set(sh(W).map(x=>x.en).filter(x=>!bad.includes(x)))].slice(0,3)])}
 return o}
function pick(n,f){let a=W.filter(f||(()=>1)).map(w=>{const p=D.p[w.id],s=sOf(p);return[w,(isDue(p)?3:0)+(p&&p.i>p.c?2:0)+(s=='new'?1:0)+Math.random()*2]});return a.sort((x,y)=>y[1]-x[1]).slice(0,n).map(x=>x[0])}
function award(w,key){const p=gp(w),td=dayOf(Date.now());if(p.xd!=td){p.xd=td;p.xn=0}if(p.xn>=WORD_XP_PER_DAY||st().todayXP+S.xp>=CAP)return 0;p.xn++;return XPV[key]}

/* ---------- sessions ---------- */
function start(mode,o={}){const n=o.n||N;if(W.length<4)return toast('Add at least 4 words in Admin first.');
 clearInterval(S&&S.iv);S={mode,i:0,c:0,xp:0,r:0,bad:[],graded:new Set(),t0:Date.now(),n,dur:o.dur};
 if(mode=='match'){S.ws=pick(6);S.L=sh(S.ws);S.R=sh(S.ws);S.sel=null;S.done=new Set();S.miss=new Set();S.n=S.ws.length;go('play');return}
 if(mode=='flash'){S.ws=o.due?pick(n,w=>isDue(D.p[w.id])):pick(n);if(!S.ws.length)return toast('Nothing due right now 🎉');S.n=S.ws.length;S.rev=0;go('play');return}
 const types=MODES[mode],mix=mode=='mixed';let qs=[];
 if(mode=='speed'){const ws=sh(W);for(let i=0;i<300;i++)qs.push(mk(ws[i%ws.length],types[i%2]));S.n=0;S.end=Date.now()+o.dur*1000;S.iv=setInterval(tick,250)}
 else{const ws=pick(n*(mix?1:1),w=>mix||types.some(t=>OK[t](w)));if(ws.length<(mix?1:3)){return toast(mode=='fill'?'Need more words with example sentences containing the word.':mode=='syn'?'Need more words with synonyms/antonyms.':mode=='scramble'?'Need more single-word entries (4+ letters).':'Not enough words.')}
  qs=ws.map(w=>{const el=types.filter(t=>OK[t](w));return mk(w,el[Math.random()*el.length|0])});S.n=qs.length}
 S.qs=qs;go('play')}
function tick(){const e=$('#tm');if(!e)return;const l=Math.max(0,Math.ceil((S.end-Date.now())/1000));e.textContent=l+'s';if(l<=0)finish()}
function answer(ok){const q=S.qs[S.i],p=gp(q.w),due=isDue(p),first=!S.graded.has(q.w.id);S.att=(S.att||0)+1;
 if(first){S.graded.add(q.w.id);grade(q.w,ok);if(due)S.r++}
 if(ok){S.c++;if(first)S.xp+=award(q.w,S.mode=='speed'?'speed':q.xp)}else if(!S.bad.some(x=>x.id==q.w.id))S.bad.push(q.w);save()}
function pickOpt(i){const q=S.qs[S.i];if(S.fb)return;const ok=q.opts[i]==q.ans;answer(ok);S.fb=1;
 if(S.mode=='speed'){S.i++;S.fb=0;if(S.i>=S.qs.length)return finish();return render()}
 document.querySelectorAll('.opt').forEach((b,k)=>{b.disabled=true;if(q.opts[k]==q.ans)b.classList.add('ok');else if(k==i)b.classList.add('no')});
 $('#fb').outerHTML=fbHTML(ok,q.ans)}
const fbHTML=(ok,a)=>`<div id="fb" class="fb ${ok?'ok':'no'}">${ok?'Correct!':'Not quite. Answer: <b>'+esc(a)+'</b>'}</div><button class="btn pri" onclick="next()">${S.i+1>=S.qs.length?'Finish':'Next'}</button>`;
function submitTyped(){const q=S.qs[S.i];if(S.fb)return;const v=$('#in').value.trim().toLowerCase().replace(/\s+/g,' ');if(!v)return;const ok=q.ans.includes(v);answer(ok);S.fb=1;$('#in').disabled=true;$('#fb').outerHTML=fbHTML(ok,q.show)}
function hint(){S.hinted=1;$('#hint').textContent='Hint: '+S.qs[S.i].hint}
function next(){S.i++;S.fb=0;S.hinted=0;S.i>=S.qs.length?finish():render()}
function finish(){if(!S||S.done_)return;S.done_=1;clearInterval(S.iv);const b4=lvl(st().xp).i;
 
 const n=(S.mode=='speed'||S.mode=='match')?S.att||0:S.n;D.ses.push({t:Date.now(),mode:S.mode,n,c:S.c,xp:S.xp,ms:Date.now()-S.t0,r:S.r});save();
 const a=lvl(st().xp).i;if(a>b4)toast('⬆ Level up! You are now '+LN[a]);checkAch();save();S.fin=1;render()}
function matchClick(side,i){if(S.done_)return;const w=side=='L'?S.L[i]:S.R[i];if(S.done.has(w.id))return;
 if(side=='L'){S.sel=w;return render()}if(!S.sel)return;S.att=(S.att||0)+1;
 if(S.sel.id==w.id){const p=gp(w),due=isDue(p),clean=!S.miss.has(w.id);S.done.add(w.id);S.c++;grade(w,clean);if(due)S.r++;if(clean)S.xp+=award(w,'match');S.sel=null;if(S.done.size==S.ws.length){return finish()}}else{S.miss.add(S.sel.id);S.miss.add(w.id);if(!S.bad.some(x=>x.id==S.sel.id))S.bad.push(S.sel);if(!S.bad.some(x=>x.id==w.id))S.bad.push(w);S.sel=null;toast('Not a match')}save();render()}
function flashAns(ok){const w=S.ws[S.i],due=isDue(D.p[w.id]);grade(w,ok);if(ok){S.c++;S.xp+=award(w,'flash')}else S.bad.push(w);if(due)S.r++;S.i++;S.rev=0;save();S.i>=S.ws.length?finish():render()}

/* ---------- views ---------- */
const V={};
const stat=(b,s)=>`<div class="card stat"><b>${b}</b><span>${s}</span></div>`;
const empty=()=>`<div class="card empty"><h2>No vocabulary yet</h2><p>Open <a href="#admin" style="color:var(--ac2)">Admin</a> and paste your word list to begin.</p></div>`;
const last7=()=>{const o=[];for(let i=6;i>=0;i--){const d=new Date();d.setDate(d.getDate()-i);const k=dayOf(d);o.push([d.toLocaleDateString('en',{weekday:'short'}),D.ses.filter(s=>dayOf(s.t)==k).reduce((a,s)=>a+s.xp,0)])}return o};
const chart=a=>{const m=Math.max(...a.map(x=>x[1]),1);return`<div class="bars">${a.map(x=>`<div><i style="height:${x[1]/m*90}px"></i>${x[1]}<br>${x[0]}</div>`).join('')}</div>`};
V.dash=()=>{const s=st(),l=lvl(s.xp),g=Math.min(100,Math.round(s.todayC/D.goal*100));
 return`<h1>Welcome back, ${esc(D.name)}</h1><p class="sub">Learn. Practice. Remember.</p>${W.length?'':empty()}
 <div class="card"><b>Level ${l.i+1} · ${l.name}</b> <span class="sub">${s.xp} XP${l.next?' · '+(l.next-s.xp)+' to next level':''}</span><div class="bar"><i style="width:${l.pct}%"></i></div></div><h2></h2>
 <div class="grid">${stat(s.streak+' 🔥','Day streak')}${stat(s.learned,'Words learned')}${stat(s.cnt.mastered,'Mastered')}${stat(s.due,'Due for revision')}${stat(s.todayXP,'XP today')}</div>
 <h2>Daily goal</h2><div class="card">${s.todayC} / ${D.goal} correct answers today<div class="bar"><i style="width:${g}%"></i></div></div>
 <h2>Continue</h2><div class="row"><button class="btn pri" onclick="start('mixed')">Mixed practice</button><button class="btn" onclick="start('flash',{due:1})">Review due (${s.due})</button><button class="btn" onclick="start('mcq')">Quick MCQ</button></div>
 <h2>XP this week</h2><div class="card">${chart(last7())}</div>`};
V.lib=()=>`<h1>Vocabulary Library</h1><p class="sub">${W.length} words</p>${W.length?`<div class="row"><input id="q" placeholder="Search English or Bengali" value="${esc(L.q)}" oninput="L.q=this.value;L.n=50;drawLib()"><select onchange="L.st=this.value;L.n=50;drawLib()">${['','new','learning','familiar','mastered','review'].map(x=>`<option value="${x}" ${L.st==x?'selected':''}>${x||'All status'}</option>`).join('')}</select><label><input type="checkbox" ${L.fav?'checked':''} onchange="L.fav=this.checked;drawLib()"> Favorites</label><button class="btn" onclick="rnd()">Random word</button></div><div id="list" class="card"></div>`:empty()}`;
function drawLib(){const q=L.q.toLowerCase(),a=W.map((w,i)=>[w,i]).filter(([w])=>(!q||w.en.toLowerCase().includes(q)||w.bn.includes(q))&&(!L.st||sOf(D.p[w.id])==L.st)&&(!L.fav||D.fav[w.id])).sort((x,y)=>x[0].en.localeCompare(y[0].en));
 $('#list').innerHTML=a.slice(0,L.n).map(([w,i])=>`<details id="w${i}"><summary>${D.fav[w.id]?'★ ':''}${esc(w.en)} — <span class="bn">${esc(w.bn)}</span> <span class="chip">${sOf(D.p[w.id])}</span></summary><p class="sub">${[w.pos,w.diff,w.cat].filter(Boolean).map(x=>`<span class="chip">${esc(x)}</span>`).join('')}</p>${w.syn.length?'<p>Synonyms: '+esc(w.syn.join(', '))+'</p>':''}${w.ant.length?'<p>Antonyms: '+esc(w.ant.join(', '))+'</p>':''}${w.ex?'<p><i>'+esc(w.ex)+'</i></p>':''}${w.ext?'<p class="bn">'+esc(w.ext)+'</p>':''}<div class="row"><button class="btn" onclick="fav(${i})">${D.fav[w.id]?'Unfavorite':'Favorite'}</button></div></details>`).join('')||'<div class="empty">No matches</div>';
 if(a.length>L.n)$('#list').insertAdjacentHTML('beforeend','<button class="btn" onclick="L.n+=50;drawLib()">Show more ('+(a.length-L.n)+')</button>')}
function fav(i){const id=W[i].id;D.fav[id]?delete D.fav[id]:D.fav[id]=1;save();const o=document.getElementById('w'+i)?.open;drawLib();if(o)document.getElementById('w'+i).open=true}
function rnd(){L.q=W[Math.random()*W.length|0].en;$('#q').value=L.q;drawLib();document.querySelector('#list details')?.setAttribute('open','')}
const modeCards=(a)=>`<div class="row"><label>Questions <select onchange="N=+this.value">${[5,10,20,30].map(x=>`<option ${x==N?'selected':''}>${x}</option>`).join('')}</select></label></div><div class="grid">${a.map(([m,t,d,x])=>`<div class="card"><b>${t}</b><p class="sub">${d}</p><button class="btn pri" onclick="${x||`start('${m}')`}">Start</button></div>`).join('')}</div>`;
V.practice=()=>`<h1>Practice Arena</h1><p class="sub">Every mode uses your single vocabulary list. XP only for correct answers.</p>${modeCards([['mcq','Multiple Choice','English ↔ Bengali'],['fill','Fill in the Blanks','Needs example sentences'],['typing','Word Typing','Type the English word from the Bengali'],['syn','Synonym & Antonym','Needs synonym/antonym data'],['flash','Flashcard Recall','Recall, reveal, self-grade'],['mixed','Mixed Practice','A balanced set of everything possible']])}`;
V.arcade=()=>`<h1>Word Arcade</h1><p class="sub">Timed and playful modes.</p>${modeCards([['match','Word Matching','Pair 6 words with their meanings'],['scramble','Word Scramble','Rebuild the word; hints available'],['speed','Speed 30s','As many as you can',"start('speed',{dur:30})"],['speed','Speed 60s','As many as you can',"start('speed',{dur:60})"],['speed','Speed 120s','As many as you can',"start('speed',{dur:120})"],['flash','Flashcard Sprint','10 cards',"start('flash',{n:10})"]])}`;
V.revision=()=>{const s=st(),now=Date.now(),a=W.filter(w=>D.p[w.id]).map(w=>[w,D.p[w.id]]),due=a.filter(([,p])=>isDue(p)),up=a.filter(([,p])=>!isDue(p)&&p.c+p.i>0).sort((x,y)=>x[1].next-y[1].next).slice(0,10),hard=a.filter(([,p])=>p.i>p.c).slice(0,10);
 return`<h1>Smart Revision</h1><p class="sub">Spaced repetition: ${INT.join(', ')} day intervals. Mastery needs repeated correct recall on different days.</p><div class="grid">${stat(s.due,'Due now')}${stat(s.cnt.review,'Needs review')}${stat(s.cnt.mastered,'Mastered')}${stat(s.tc+s.ti?Math.round(s.tc/(s.tc+s.ti)*100)+'%':'–','Accuracy')}</div><div class="row"><button class="btn pri" onclick="start('flash',{due:1})">Flashcard review</button><button class="btn" onclick="start('mixed')">Mixed review</button></div>
 <h2>Due</h2><div class="card">${due.map(([w])=>`<span class="chip">${esc(w.en)}</span>`).join('')||'Nothing due'}</div><h2>Difficult words</h2><div class="card">${hard.map(([w])=>`<span class="chip">${esc(w.en)}</span>`).join('')||'None yet'}</div><h2>Upcoming</h2><div class="card">${up.map(([w,p])=>`<div>${esc(w.en)} <span class="chip">${new Date(p.next).toLocaleDateString()}</span></div>`).join('')||'No scheduled reviews yet'}</div>`};
function missions(){const s=st(),td=dayOf(Date.now()),wk=D.ses.filter(x=>Date.now()-x.t<7*864e5&&x.mode!='mission'),wc=wk.reduce((a,x)=>a+x.c,0),good=D.ses.some(x=>dayOf(x.t)==td&&x.n>=10&&x.c/x.n>=.8&&x.mode!='mission');
 return[['d1','Daily','Answer 20 questions correctly',s.todayC,20,20,td],['d2','Daily','Complete 2 sessions',s.todayN,2,15,td],['d3','Daily','Score 80%+ in a 10+ question session',good?1:0,1,25,td],['w1','Weekly','100 correct answers this week',wc,100,60,'wk'+dayOf(Date.now()-new Date().getDay()*864e5)],['w2','Weekly','Practice on 4 different days',new Set(wk.map(x=>dayOf(x.t))).size,4,50,'wk'+dayOf(Date.now()-new Date().getDay()*864e5)]]}
V.missions=()=>`<h1>Missions</h1><p class="sub">Daily missions reset at local midnight; weekly missions on Sunday.</p>${missions().map(([id,t,n,v,g,x,k])=>{const key=id+k,dn=v>=g,cl=D.claims[key];return`<div class="card" style="margin-bottom:10px"><span class="chip">${t}</span><b>${n}</b> <span class="sub">${Math.min(v,g)}/${g} · +${x} XP</span><div class="bar"><i style="width:${Math.min(100,v/g*100)}%"></i></div>${dn&&!cl?`<div class="row"><button class="btn pri" onclick="claim('${id}','${k}',${x})">Claim</button></div>`:cl?'<p class="sub">Claimed ✓</p>':''}</div>`}).join('')}`;
function claim(id,k,x){const key=id+k;if(D.claims[key])return;D.claims[key]=1;D.ses.push({t:Date.now(),mode:'mission',n:0,c:0,xp:x,ms:0,r:0});save();toast('+'+x+' XP');render()}
V.achievements=()=>{const s=st();return`<h1>Achievements</h1><p class="sub">${Object.keys(D.ach).length} / ${ACH.length} unlocked</p><div class="grid">${ACH.map(([n,d])=>`<div class="card ${D.ach[n]?'':'lock'}"><b>${D.ach[n]?'🏆':'🔒'} ${n}</b><p class="sub">${d}${D.ach[n]?'<br>Unlocked '+new Date(D.ach[n]).toLocaleDateString():''}</p></div>`).join('')}</div>`};
V.analytics=()=>{const s=st(),tot=s.tc+s.ti,c=s.cnt,cats={};W.forEach(w=>{const k=w.cat||'Uncategorized';(cats[k]=cats[k]||[0,0]);cats[k][1]++;if(sOf(D.p[w.id])!='new')cats[k][0]++});
 return`<h1>Analytics</h1><p class="sub">Calculated from your real activity.</p><div class="grid">${stat(D.ses.filter(x=>x.mode!='mission').length,'Sessions')}${stat(s.tc,'Correct')}${stat(s.ti,'Incorrect')}${stat(tot?Math.round(s.tc/tot*100)+'%':'–','Accuracy')}${stat(Math.round(D.ses.reduce((a,x)=>a+x.ms,0)/60000)+' min','Practice time')}${stat(s.days.size,'Active days')}</div>
 <h2>XP, last 7 days</h2><div class="card">${chart(last7())}</div><h2>Mastery distribution</h2><div class="card">${chart(Object.entries(c).map(([k,v])=>[k,v]))}</div>
 <h2>Category progress</h2><div class="card">${Object.entries(cats).map(([k,v])=>`<div>${esc(k)}: ${v[0]}/${v[1]}<div class="bar"><i style="width:${v[0]/v[1]*100}%"></i></div></div>`).join('')||'No data'}</div>
 <h2>Activity calendar (last 28 days)</h2><div class="card"><div class="row">${Array.from({length:28},(_,i)=>{const d=new Date();d.setDate(d.getDate()-27+i);const a=s.days.has(dayOf(d));return`<span title="${dayOf(d)}" style="width:20px;height:20px;border-radius:4px;background:${a?'var(--ac)':'var(--bg2)'}"></span>`}).join('')}</div></div>`};
V.profile=()=>{const s=st(),l=lvl(s.xp);return`<h1>Profile</h1><div class="row"><input value="${esc(D.name)}" onchange="D.name=this.value||'Learner';save()"></div><div class="grid">${stat('Lv '+(l.i+1),l.name)}${stat(s.xp,'Total XP')}${stat(s.streak,'Current streak')}${stat(s.cnt.mastered,'Mastered')}${stat(Object.keys(D.ach).length,'Badges')}</div><p class="sub" style="margin-top:14px">Your progress is saved in this browser on this device only. It is not shared with other users or devices — use Settings → Backup to move it.</p>`};
V.settings=()=>`<h1>Settings</h1><div class="card"><div class="row"><label>Theme <select onchange="D.theme=this.value;save();theme()">${['system','dark','light'].map(x=>`<option ${D.theme==x?'selected':''}>${x}</option>`).join('')}</select></label><label>Daily goal (correct answers) <input type="number" min="5" max="200" value="${D.goal}" onchange="D.goal=Math.max(5,Math.min(200,+this.value||20));save()"></label></div></div>
 <h2>Backup & restore</h2><div class="card"><p class="sub">Local data lives only in this browser. Back up regularly; clearing browser data erases it.</p><div class="row"><button class="btn pri" onclick="download('vocabhub-backup-'+dayOf(Date.now())+'.json',JSON.stringify(D),'application/json')">Download backup</button><label class="btn">Restore backup<input type="file" accept=".json" hidden onchange="restore(this.files[0])"></label><button class="btn" onclick="if(confirm('Delete ALL progress (vocabulary kept)?')){D.p={};D.ses=[];D.ach={};D.claims={};D.fav={};save();render()}">Reset progress</button></div></div>`;
function restore(f){if(!f)return;f.text().then(t=>{try{const j=JSON.parse(t);if(!j.p||!j.ses)throw 0;if(!confirm('Replace current data with this backup?'))return;D=Object.assign(D,j);W=D.words||[];save();theme();render();toast('Backup restored')}catch(e){toast('Invalid backup file')}})}
V.admin=()=>`<h1>Admin</h1><p class="sub">Manage your vocabulary locally. (Local-only: no server, so there is no login; anyone using this browser can edit.)</p>
 <div class="card"><b>Import</b><p class="sub">Paste lines like <code>Rightful: বৈধ / ন্যায্য</code>, or CSV (header: word,bengali_meaning,part_of_speech,synonyms,antonyms,example,example_translation,difficulty,category), or JSON. Duplicate words are merged, not repeated.</p><textarea id="imp"></textarea><div class="row"><button class="btn" onclick="imp(1)">Preview</button><button class="btn pri" onclick="imp(0)">Import</button><label class="btn">From file<input type="file" accept=".txt,.csv,.json" hidden onchange="this.files[0].text().then(t=>{$('#imp').value=t})"></label></div><div id="impr" class="sub"></div></div>
 <h2>Add / edit one word</h2><div class="card"><div class="row">${[['en','English word'],['bn','Bengali meaning'],['pos','Part of speech'],['syn','Synonyms (;)'],['ant','Antonyms (;)'],['ex','Example'],['ext','Example translation'],['diff','Difficulty'],['cat','Category']].map(([k,p])=>`<input id="f_${k}" placeholder="${p}">`).join('')}<button class="btn pri" onclick="addOne()">Save word</button></div><p class="sub">Using an existing English word replaces its meaning with what you enter.</p></div>
 <h2>Export / maintenance</h2><div class="row"><button class="btn" onclick="download('vocabulary.json',JSON.stringify({words:W},null,1),'application/json')">Export JSON</button><button class="btn" onclick="download('vocabulary.csv',toCSV(),'text/csv')">Export CSV</button><button class="btn" onclick="reload()">Reload from data/vocabulary.json</button></div>
 <h2>Words (${W.length})</h2><div class="card">${W.slice(-100).reverse().map(w=>{const i=W.indexOf(w);return`<div class="row" style="margin:4px 0">${esc(w.en)} — <span class="bn">${esc(w.bn)}</span> <button class="btn" onclick="del(${i})">Delete</button></div>`}).join('')||'Empty'}${W.length>100?'<p class="sub">Showing latest 100</p>':''}</div>`;
function imp(dry){const r=doImport($('#imp').value,dry);$('#impr').textContent=r.err||`${dry?'Preview: ':'Done: '}${r.total} rows → ${r.added} new, ${r.merged} merged with existing, ${r.skipped} skipped`;if(!dry&&!r.err){toast('Imported '+r.added+' new words');render()}}
function addOne(){const g=k=>$('#f_'+k).value.trim(),o={en:g('en'),bn:g('bn'),pos:g('pos'),syn:lst(g('syn')),ant:lst(g('ant')),ex:g('ex'),ext:g('ext'),diff:g('diff'),cat:g('cat'),rep:1};if(!o.en||!o.bn)return toast('English word and Bengali meaning are required');addW(W,o);save();toast('Saved');render()}
function del(i){if(confirm('Delete "'+W[i].en+'"?')){delete D.p[W[i].id];W.splice(i,1);save();render()}}
function reload(){if(!confirm('Replace local vocabulary with data/vocabulary.json?'))return;fetch('data/vocabulary.json').then(r=>r.json()).then(j=>{W=j.words||j;save();render();toast('Loaded '+W.length+' words')}).catch(()=>toast('Could not load file (needs a web server / GitHub Pages)'))}
V.play=()=>{if(!S)return'<p>No session.</p>';if(S.fin){const a=(S.mode=='speed'||S.mode=='match')?S.att:S.n;return`<h1>Results</h1><div class="grid">${stat(S.c+' / '+a,'Correct')}${stat(a?Math.round(S.c/a*100)+'%':'–','Accuracy')}${stat('+'+S.xp,'XP')}${stat(Math.round((Date.now()-S.t0)/1000)+'s','Time')}</div>${S.bad.length?`<h2>Review these</h2><div class="card">${[...new Set(S.bad)].map(w=>`<div>${esc(w.en)} — <span class="bn">${esc(w.bn)}</span></div>`).join('')}</div>`:''}<div class="row"><button class="btn pri" onclick="start('${S.mode}',{n:${S.n},dur:${S.dur||0}})">Play again</button><a class="btn" href="#practice" style="text-decoration:none">Back</a></div>`}
 if(S.mode=='match'){return`<h1>Word Matching</h1><p class="sub">Tap an English word, then its meaning. ${S.done.size}/${S.ws.length}</p><div class="m"><div>${S.L.map((w,i)=>`<button class="btn opt ${S.done.has(w.id)?'dn':''} ${S.sel&&S.sel.id==w.id?'sel':''}" onclick="matchClick('L',${i})">${esc(w.en)}</button>`).join('')}</div><div>${S.R.map((w,i)=>`<button class="btn opt bn ${S.done.has(w.id)?'dn':''}" onclick="matchClick('R',${i})">${esc(short(w.bn))}</button>`).join('')}</div></div>`}
 if(S.mode=='flash'){const w=S.ws[S.i];return`<h1>Flashcard Recall</h1><p class="sub">${S.i+1} / ${S.ws.length}</p><div class="card"><div class="big">${esc(w.en)}</div>${S.rev?`<div class="big bn" style="font-size:24px">${esc(w.bn)}</div>${w.ex?'<p class="sub">'+esc(w.ex)+'</p>':''}<div class="row"><button class="btn pri" onclick="flashAns(1)">I know this</button><button class="btn" onclick="flashAns(0)">Need more practice</button></div>`:'<div class="row"><button class="btn pri" onclick="S.rev=1;render()">Reveal</button></div>'}</div>`}
 const q=S.qs[S.i];return`<h1>${S.mode=='speed'?'Speed Challenge · <span id="tm">'+Math.max(0,Math.ceil((S.end-Date.now())/1000))+'s</span>':'Question '+(S.i+1)+' / '+S.qs.length}</h1><p class="sub">${esc(q.sub||'')} · ${S.c} correct</p>${S.mode!='speed'?`<div class="bar"><i style="width:${S.i/S.qs.length*100}%"></i></div>`:''}<div class="card"><div class="big ${q.bn?'bn':''}">${esc(q.prompt)}</div>${q.opts?q.opts.map((o,i)=>`<button class="btn opt ${/[\u0980-\u09FF]/.test(o)?'bn':''}" onclick="pickOpt(${i})">${esc(o)}</button>`).join(''):`<div class="row"><input id="in" autocomplete="off" autofocus placeholder="Type your answer" onkeydown="if(event.key=='Enter')submitTyped()"><button class="btn pri" onclick="submitTyped()">Check</button><button class="btn" onclick="hint()">Hint</button></div><p class="sub" id="hint"></p>`}<div id="fb"></div></div>`};
const PAGES=[['dash','Dashboard'],['lib','Library'],['practice','Practice'],['arcade','Arcade'],['revision','Revision'],['missions','Missions'],['achievements','Achievements'],['analytics','Analytics'],['profile','Profile'],['settings','Settings'],['admin','Admin']];
const go=r=>{location.hash==='#'+r?render():location.hash=r};
function render(){const r=location.hash.slice(1)||'dash',v=V[r]?r:'dash';if(v!='play'&&S&&S.iv&&!S.fin){clearInterval(S.iv);S.iv=0}
 $('#nav').innerHTML='<div class="logo"><img src="assets/logo.svg" alt="">VocabHub</div><div class="tag">Learn. Practice. Remember.</div>'+PAGES.map(([k,n])=>`<a href="#${k}" class="${k==v?'on':''}">${n}</a>`).join('');
 $('#main').innerHTML=V[v]();if(v=='lib'&&W.length)drawLib();if(v=='play'&&S&&S.mode=='speed'&&!S.fin&&!S.iv)finish();scrollTo(0,0)}
addEventListener('hashchange',render);matchMedia('(prefers-color-scheme:dark)').addEventListener('change',theme);
theme();
if(D.words===null){fetch('data/vocabulary.json').then(r=>r.json()).then(j=>{W=j.words||[]}).catch(()=>{}).finally(render)}else render();
