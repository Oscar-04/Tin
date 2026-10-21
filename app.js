document.documentElement.classList.add('js');
const reduced = matchMedia('(prefers-reduced-motion: reduce)');
const revealObserver = new IntersectionObserver(entries => entries.forEach(entry => {if(entry.isIntersecting){entry.target.classList.add('visible');revealObserver.unobserve(entry.target)}}), {threshold:0.1});
document.querySelectorAll('.reveal').forEach(el=>revealObserver.observe(el));
const format = value => '$' + new Intl.NumberFormat('es-CL').format(value);
const income = document.querySelector('#income'), cost = document.querySelector('#cost');
function calculate(){const revenue=Number(income.value),expense=Number(cost.value),margin=revenue-expense;document.querySelector('#income-value').textContent=format(revenue);document.querySelector('#cost-value').textContent=format(expense);document.querySelector('#margin').textContent=(margin<0?'−':'')+format(Math.abs(margin));const badge=document.querySelector('#percentage');badge.textContent=Math.round(margin/revenue*100)+'% del ingreso neto';badge.classList.toggle('negative',margin<0)}
[income,cost].forEach(input=>input.addEventListener('input',calculate));
document.querySelector('#reset').addEventListener('click',()=>{income.value=1500;cost.value=1050;calculate()});
const progress=document.querySelector('.progress'),hero=document.querySelector('.hero-img');
let pending=false;
function updateScroll(){const max=document.documentElement.scrollHeight-innerHeight;progress.style.width=(max>0?scrollY/max*100:0)+'%';if(!reduced.matches&&scrollY<innerHeight)hero.style.transform=`translateY(${scrollY*.18}px) scale(${1+scrollY*.0001})`;pending=false}
addEventListener('scroll',()=>{if(!pending){requestAnimationFrame(updateScroll);pending=true}},{passive:true});addEventListener('resize',updateScroll);updateScroll();
const sectionObserver=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){document.querySelectorAll('nav a').forEach(a=>{const active=a.hash==='#'+entry.target.id;a.classList.toggle('active',active);if(active)a.setAttribute('aria-current','location');else a.removeAttribute('aria-current')})}}),{rootMargin:'-25% 0px -45% 0px'});document.querySelectorAll('main section').forEach(section=>sectionObserver.observe(section));
