(function () {
  var d = document, r = d.documentElement, K = 'hks-theme';
  r.classList.add('js');
  var saved; try { saved = localStorage.getItem(K); } catch (e) {}
  r.dataset.theme = saved || (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  var P = {
    github: '<path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>',
    youtube: '<path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>',
    linkedin: '<path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>',
    mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>',
    globe: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/>',
    sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',
    moon: '<path d="M21 13a9 9 0 1 1-10-10 7 7 0 0 0 10 10z"/>',
    menu: '<path d="M4 7h16M4 12h16M4 17h16"/>'
  };
  function ic(n) {
    var brand = /^(github|youtube|linkedin)$/.test(n);
    return '<svg class="ic" viewBox="0 0 24 24" aria-hidden="true" ' + (brand ? 'fill="currentColor"' :
      'fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"') + '>' + P[n] + '</svg>';
  }
  var ROOT = d.documentElement.dataset.root || '';
  var NAV = [['Home', 'index'], ['About', 'about'], ['Projects', 'projects'], ['Education', 'education'], ['Contact', 'contact']];
  var SOC = [
    ['github', 'GitHub', 'https://github.com/Harsheel-Kumar-Sahoo/'],
    ['linkedin', 'LinkedIn', 'https://www.linkedin.com/in/harsheel-kumar-sahoo/'],
    ['youtube', 'YouTube', 'https://www.youtube.com/@harsheelkumarsahoo'],
    ['mail', 'Email', 'mailto:harsheelkumarsahoo@gmail.com']
  ];
  d.addEventListener('DOMContentLoaded', function () {
    var p = location.pathname, cur = p.indexOf('/projects/') > -1 ? 'projects' : (p.split('/').pop().replace(/\.html$/, '') || 'index');
    var h = d.getElementById('site-header');
    if (h) {
      h.innerHTML = '<div class="wrap bar"><a class="brand" href="' + ROOT + 'index.html">Harsheel Kumar <span>Sahoo</span></a><nav class="links" aria-label="Main">' +
        NAV.map(function (n) {
          var on = n[1] === cur;
          return '<a href="' + ROOT + n[1] + '.html"' + (on ? ' aria-current="page"' : '') + '>' + n[0] + '</a>';
        }).join('') + '</nav><button class="icon-btn" id="theme" aria-label="Toggle dark mode"></button>' +
        '<button class="icon-btn" id="burger" aria-label="Open menu" aria-expanded="false">' + ic('menu') + '</button></div>';
      var tb = d.getElementById('theme');
      var paint = function () { tb.innerHTML = ic(r.dataset.theme === 'dark' ? 'sun' : 'moon'); };
      paint();
      tb.onclick = function () {
        r.dataset.theme = r.dataset.theme === 'dark' ? 'light' : 'dark';
        try { localStorage.setItem(K, r.dataset.theme); } catch (e) {}
        paint();
      };
      var bg = d.getElementById('burger');
      bg.onclick = function () {
        var o = h.classList.toggle('open');
        bg.setAttribute('aria-expanded', o);
        bg.setAttribute('aria-label', o ? 'Close menu' : 'Open menu');
      };
      h.querySelector('.links').onclick = function (e) { if (e.target.tagName === 'A') h.classList.remove('open'); };
    }
    var f = d.getElementById('site-footer');
    if (f) f.innerHTML = '<div class="wrap"><small>© ' + new Date().getFullYear() + ' Harsheel Kumar Sahoo · B.Tech AI, SVNIT Surat</small><div class="soc">' +
      SOC.map(function (s) { return '<a href="' + s[2] + '" aria-label="' + s[1] + '"' + (s[0] === 'mail' ? '' : ' target="_blank" rel="noopener"') + '>' + ic(s[0]) + '</a>'; }).join('') + '</div></div>';
    d.querySelectorAll('[data-icon]').forEach(function (el) { el.insertAdjacentHTML('afterbegin', ic(el.dataset.icon)); });
    var els = d.querySelectorAll('.reveal');
    if ('IntersectionObserver' in window) {
      var io = new IntersectionObserver(function (es) {
        es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
      }, { threshold: .12 });
      els.forEach(function (e) { io.observe(e); });
    } else els.forEach(function (e) { e.classList.add('in'); });
    var lb = d.createElement('div');
    lb.className = 'lb';
    lb.innerHTML = '<figure><img alt=""><figcaption></figcaption></figure>';
    d.body.appendChild(lb);
    d.addEventListener('click', function (e) {
      var t = e.target.closest('.gallery img,.hero-img');
      if (t) {
        var fg = t.closest('figure'), cap = fg && fg.querySelector('figcaption');
        lb.querySelector('img').src = t.currentSrc || t.src;
        lb.querySelector('img').alt = t.alt;
        lb.querySelector('figcaption').textContent = cap ? cap.textContent : '';
        lb.classList.add('on');
      } else lb.classList.remove('on');
    });
    d.addEventListener('keydown', function (e) { if (e.key === 'Escape') lb.classList.remove('on'); });
    var form = d.getElementById('contact-form');
    if (form) form.addEventListener('submit', function (e) {
      e.preventDefault();
      var st = d.getElementById('status'), b = form.querySelector('button');
      st.textContent = 'Sending…'; b.disabled = true;
      fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(Object.fromEntries(new FormData(form))) })
        .then(function (res) { return res.json().then(function (j) { return { ok: res.ok, j: j }; }); })
        .then(function (x) {
          if (x.ok) { st.textContent = 'Thank you. Your message has been sent.'; form.reset(); }
          else st.textContent = x.j.error || 'Something went wrong. Please email me directly.';
        })
        .catch(function () { st.textContent = 'Network error. Please email me directly.'; })
        .then(function () { b.disabled = false; });
    });
  });
})();
