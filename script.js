  // Show a soft placeholder + filename hint if a photo hasn't been added yet
  function markMissing(img){
    const frame = img.closest('.photo-frame') || img.closest('.slide');
    if(frame) frame.classList.add('img-missing');
  }
 const items = document.querySelectorAll('.reveal');
  const io = new IntersectionObserver((entries)=>{
    entries.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); } });
  }, {threshold:0.15});
  items.forEach(el=>io.observe(el));

  // Photo sliders: auto-rotate + dot navigation
  document.querySelectorAll('.photo-slider').forEach(function(slider){
    const slides = Array.from(slider.querySelectorAll('.slide'));
    const dotsWrap = slider.querySelector('.slider-dots');
    if(slides.length < 2 || !dotsWrap) return;
    let current = 0;
    let timer;

    slides.forEach((_, i)=>{
      const dot = document.createElement('button');
      dot.setAttribute('aria-label', 'Show photo ' + (i+1));
      if(i === 0) dot.classList.add('active');
      dot.addEventListener('click', ()=> goTo(i));
      dotsWrap.appendChild(dot);
    });
    const dots = Array.from(dotsWrap.children);

    function goTo(i){
      slides[current].classList.remove('active');
      dots[current].classList.remove('active');
      current = i;
      slides[current].classList.add('active');
      dots[current].classList.add('active');
    }
    function next(){ goTo((current + 1) % slides.length); }

    function startAuto(){
      timer = setInterval(next, 4500);
    }
    function stopAuto(){ clearInterval(timer); }

    startAuto();
    slider.addEventListener('mouseenter', stopAuto);
    slider.addEventListener('mouseleave', startAuto);
  });

  // Desktop row carousels: arrow buttons scroll one photo at a time
  document.querySelectorAll('.photo-carousel').forEach(function(car){
    const track = car.querySelector('.car-track');
    const prev = car.querySelector('.car-prev');
    const next = car.querySelector('.car-next');
    if(!track) return;
    function step(){
      const item = track.querySelector('.car-item');
      if(!item) return 300;
      const style = getComputedStyle(track);
      const gap = parseFloat(style.gap) || 14;
      return item.getBoundingClientRect().width + gap;
    }
    prev && prev.addEventListener('click', ()=> track.scrollBy({left: -step(), behavior:'smooth'}));
    next && next.addEventListener('click', ()=> track.scrollBy({left: step(), behavior:'smooth'}));
  });

  function buildMessage(){
    const name = document.getElementById('name').value || '(no name given)';
    const level = document.getElementById('level').value;
    const dates = document.getElementById('dates').value || '(dates not given)';
    const msg = document.getElementById('msg').value || '(none)';
    return `Surf lesson enquiry\n\nName: ${name}\nLevel: ${level}\nDates: ${dates}\nNotes: ${msg}`;
  }

  const bookForm = document.getElementById('bookForm');
  bookForm.addEventListener('submit', function(e){
    e.preventDefault();
    if(!document.getElementById('name').value){
      document.getElementById('name').reportValidity();
      return;
    }
    const text = encodeURIComponent(buildMessage());
    window.open(`https://wa.me/94758203489?text=${text}`, '_blank');
  });

  document.getElementById('emailBtn').addEventListener('click', function(){
    if(!document.getElementById('name').value){
      document.getElementById('name').reportValidity();
      return;
    }
    const subject = encodeURIComponent('Surf lesson enquiry — Achu Wave Riders');
    const body = encodeURIComponent(buildMessage());
    window.location.href = `mailto:ahamedaspaq70@icould.com?subject=${subject}&body=${body}`;
  });
