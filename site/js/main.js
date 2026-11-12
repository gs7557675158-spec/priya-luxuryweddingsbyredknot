(function () {
  var els = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
    }, { threshold: 0.12 });
    els.forEach(function (el) { io.observe(el); });
  } else els.forEach(function (el) { el.classList.add('in'); });

  var f = document.getElementById('enq');
  if (f) f.addEventListener('submit', function (e) {
    e.preventDefault();
    var ok = true;
    f.querySelectorAll('[required]').forEach(function (i) {
      var bad = !i.value.trim() || (i.type === 'email' && !/^\S+@\S+\.\S+$/.test(i.value));
      i.classList.toggle('err', bad); if (bad) ok = false;
    });
    if (ok) { f.querySelector('.thanks').hidden = false; f.reset(); }
  });

  document.querySelectorAll('.faq').forEach(function (d) {
    d.addEventListener('toggle', function () {
      if (d.open) document.querySelectorAll('.faq').forEach(function (o) { if (o !== d) o.open = false; });
    });
  });
})();
