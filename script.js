  const items = document.querySelectorAll('.reveal');
  const io = new IntersectionObserver((entries)=>{
    entries.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); } });
  }, {threshold:0.15});
  items.forEach(el=>io.observe(el));

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
