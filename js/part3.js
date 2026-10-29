// Part 3: interactive services, estimates, gallery, and form checks.
document.addEventListener('DOMContentLoaded', () => {
 const rates = {'New Construction':6500,'Renovations':3200,'Building Extensions':4800,'Painting':85,'Paving':380,'Property Maintenance':250};
 const currency = value => new Intl.NumberFormat('en-ZA',{style:'currency',currency:'ZAR'}).format(value);
 const service = document.getElementById('estimateService');
 const area = document.getElementById('estimateArea');
 const complexity = document.getElementById('estimateComplexity');
 const total = document.getElementById('estimateTotal');
 const quote = document.getElementById('estimatedQuote');
 if(service && area && complexity && total){
   Object.keys(rates).forEach(name => service.add(new Option(`${name} — ${currency(rates[name])}/${name==='Property Maintenance'?'hour':'m²'}`,name)));
   const oldService = document.getElementById('service');
   function calculate(){const amount=Number(area.value);const valid=Number.isFinite(amount)&&amount>=1&&amount<=100000;
    const estimate=valid?rates[service.value]*amount*Number(complexity.value):0;
    total.textContent=valid?`Estimated project cost: ${currency(estimate)}`:'Enter an area or hours between 1 and 100,000.';
    if(quote)quote.value=valid?`${service.value}: ${amount} ${service.value==='Property Maintenance'?'hours':'m²'}, ${currency(estimate)} (indicative)`:'';
    if(oldService && oldService.value!==service.value)oldService.value=service.value;
   }
   [service,area,complexity].forEach(el=>el.addEventListener('input',calculate));calculate();
 }
 const grid=document.querySelector('.services-grid');const search=document.getElementById('serviceSearch');const sort=document.getElementById('serviceSort');
 if(grid&&search&&sort){const cards=[...grid.querySelectorAll('article.service')];function update(){
   const q=search.value.trim().toLowerCase();cards.forEach(card=>card.hidden=!card.textContent.toLowerCase().includes(q));
   const sorted=[...cards];if(sort.value==='price')sorted.sort((a,b)=>Number(a.dataset.price)-Number(b.dataset.price));
   if(sort.value==='name')sorted.sort((a,b)=>a.dataset.name.localeCompare(b.dataset.name));sorted.forEach(card=>grid.append(card));
 }search.addEventListener('input',update);sort.addEventListener('change',update);}
 const dialog=document.getElementById('galleryLightbox');const image=document.getElementById('lightboxImage');
 if(dialog&&image&&typeof dialog.showModal==='function'){
   document.querySelectorAll('main img').forEach(img=>{img.classList.add('zoomable');img.tabIndex=0;img.setAttribute('role','button');img.setAttribute('aria-label','Enlarge '+(img.alt||'image'));
    const show=()=>{image.src=img.currentSrc||img.src;image.alt=img.alt;dialog.showModal();};
    img.addEventListener('click',show);img.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();show();}});});
   document.getElementById('closeLightbox').addEventListener('click',()=>dialog.close());
   dialog.addEventListener('click',e=>{if(e.target===dialog)dialog.close();});
 }
 for(const id of ['enquiryForm','contactForm']){const form=document.getElementById(id);if(!form)continue;
   const status=document.getElementById(id==='enquiryForm'?'enquiryStatus':'contactStatus');
   form.addEventListener('submit',e=>{e.preventDefault();if(!form.reportValidity())return;
    const phone=form.querySelector('input[type=tel]');if(phone && !/^(?:\+27|0)[0-9]{9}$/.test(phone.value.replace(/\s/g,''))){status.textContent='Please enter a valid South African phone number (e.g. 0821234567).';phone.focus();return;}
    const recipient='info@example.com';const fields=[...form.querySelectorAll('input,select,textarea')].filter(el=>el.name&&el.type!=='radio'||el.type==='radio'&&el.checked);
    const body=fields.map(el=>`${el.name}: ${el.value}`).join('\n');
    status.textContent='Your email application will open with the prepared request. You must send it to complete the enquiry. Replace the placeholder recipient in js/part3.js with the verified company address.';
    window.location.href=`mailto:${recipient}?subject=${encodeURIComponent(id==='enquiryForm'?'Alpha Builders quotation request':'Alpha Builders contact message')}&body=${encodeURIComponent(body)}`;
   });
 }
 const observer=('IntersectionObserver' in window)?new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('is-visible');observer.unobserve(entry.target);}}),{threshold:.08}):null;
 document.querySelectorAll('.service,.estimate-panel,.form-container,.message-form').forEach(el=>{el.classList.add('reveal');if(observer)observer.observe(el);else el.classList.add('is-visible');});
});
