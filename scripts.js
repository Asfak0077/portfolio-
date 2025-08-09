// Constants for your contact info
const CONTACT = {
  phoneIntl: '+916385750815',
  phoneDisplay: '6385750815',
  email: 'asf28146@gmail.com',
  linkedin: 'https://www.linkedin.com/in/asfakrahma07',
  title: 'CSE Student | Aspiring App Developer & UI/UX Designer',
  location: 'Chennai, Tamil Nadu, India',
  name: 'Asfak Rahman',
};

// Year
document.getElementById('year').textContent = new Date().getFullYear().toString();

// Theme toggle with persistence
(function theme() {
  const root = document.documentElement;
  const btn = document.querySelector('.theme-toggle');
  const saved = localStorage.getItem('theme');
  if (saved === 'light') root.classList.add('light');

  function toggle() {
    root.classList.toggle('light');
    localStorage.setItem('theme', root.classList.contains('light') ? 'light' : 'dark');
  }
  btn?.addEventListener('click', toggle);
})();

// Mobile nav toggle + scrollspy active state
const navToggle = document.querySelector('.nav-toggle');
const navList = document.getElementById('nav-list');
if (navToggle && navList) {
  navToggle.addEventListener('click', () => {
    const expanded = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', String(!expanded));
    navList.classList.toggle('open');
  });

  navList.querySelectorAll('a').forEach((a) => {
    a.addEventListener('click', () => {
      navList.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

// Toast utility
const toastEl = document.querySelector('.toast');
function toast(message) {
  if (!toastEl) return;
  toastEl.textContent = message;
  toastEl.classList.add('show');
  setTimeout(() => toastEl.classList.remove('show'), 1600);
}

// Copy to clipboard
function copy(text, label) {
  navigator.clipboard.writeText(text).then(() => toast(label + ' copied'));
}
document.querySelectorAll('.copy-email').forEach((btn) => {
  btn.addEventListener('click', () => copy(CONTACT.email, 'Email'));
});
document.querySelectorAll('.copy-phone').forEach((btn) => {
  btn.addEventListener('click', () => copy(CONTACT.phoneIntl, 'Phone'));
});
document.querySelectorAll('.copy-linkedin').forEach((btn) => {
  btn.addEventListener('click', () => copy(CONTACT.linkedin, 'LinkedIn'));
});

// vCard download
document.querySelectorAll('.vcard-btn').forEach((btn) => {
  btn.addEventListener('click', () => {
    const vcard = [
      'BEGIN:VCARD',
      'VERSION:3.0',
      'N:Rahman;Asfak;;;',
      'FN:' + CONTACT.name,
      'EMAIL;TYPE=INTERNET:' + CONTACT.email,
      'TEL;TYPE=CELL:' + CONTACT.phoneIntl,
      'ADR;TYPE=HOME:;;' + CONTACT.location + ';;;',
      'TITLE:' + CONTACT.title,
      'NOTE:Portfolio contact',
      'URL:' + CONTACT.linkedin,
      'END:VCARD'
    ].join('\n');
    const blob = new Blob([vcard], { type: 'text/vcard;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Asfak-Rahman.vcf';
    document.body.appendChild(a);
    a.click();
    URL.revokeObjectURL(url);
    a.remove();
  });
});

// Typewriter effect
(function typewriter() {
  const el = document.getElementById('typewriter');
  if (!el) return;

  const phrases = [
    'CSE Student | Aspiring App Developer & UI/UX Designer',
    'Top skills: CSS · HTML · C++',
    'Open to real‑world projects and challenges',
    'Chennai, Tamil Nadu, India'
  ];
  let idx = 0, char = 0, deleting = false;

  function tick() {
    const full = phrases[idx % phrases.length];

    if (!deleting) {
      char++;
      el.textContent = full.slice(0, char);
      if (char === full.length) {
        deleting = true;
        setTimeout(tick, 1100);
        return;
      }
    } else {
      char--;
      el.textContent = full.slice(0, char);
      if (char === 0) {
        deleting = false;
        idx++;
      }
    }
    const speed = deleting ? 40 : 70;
    setTimeout(tick, speed + Math.random() * 60);
  }
  tick();
})();

// Reveal on scroll (stagger)
(function revealOnScroll() {
  const nodes = document.querySelectorAll('.reveal');
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const delay = Number(entry.target.dataset.delay || 0);
          setTimeout(() => entry.target.classList.add('visible'), delay);
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );
  nodes.forEach((n, i) => {
    n.dataset.delay = String((i % 6) * 60);
    io.observe(n);
  });
})();

// Print / Save as PDF
function printResume() { window.print(); }
document.querySelectorAll('.print-btn, .print-btn-inline').forEach((btn) => {
  btn.addEventListener('click', printResume);
});

// Back to top + scroll progress
(function scrollUtils() {
  const topBtn = document.querySelector('.to-top');
  const bar = document.querySelector('.scroll-progress span');
  function onScroll() {
    const y = window.scrollY;
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const p = max > 0 ? y / max : 0;
    if (bar) bar.style.transform = `scaleX(${p})`;
    if (topBtn) topBtn.classList.toggle('show', y > 400);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
  if (topBtn) topBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
})();

// ScrollSpy: highlight active nav link
(function scrollSpy() {
  const links = Array.from(document.querySelectorAll('a[data-spy]'));
  const sections = links.map((l) => document.querySelector(l.getAttribute('href')));
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          const id = '#' + e.target.id;
          links.forEach((l) => l.classList.toggle('active', l.getAttribute('href') === id));
        }
      });
    },
    { rootMargin: '0px 0px -70% 0px', threshold: 0.1 }
  );
  sections.forEach((s) => s && io.observe(s));
})();

// Skills: animate bars and sorting
(function skills() {
  const container = document.querySelector('.skills');
  if (!container) return;
  const items = () => Array.from(container.querySelectorAll('.skill'));

  // Animate on view
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          const skill = e.target;
          const lvl = Number(skill.dataset.level || '0');
          const bar = skill.querySelector('.bar-fill');
          if (bar) bar.style.width = `${lvl}%`;
          io.unobserve(skill);
        }
      });
    },
    { threshold: 0.3 }
  );
  items().forEach((el) => io.observe(el));

  // Sorting
  const byAlpha = document.querySelector('.sort-alpha');
  const byLevel = document.querySelector('.sort-level');
  function render(sorted) {
    sorted.forEach((el) => container.appendChild(el));
  }
  byAlpha?.addEventListener('click', () => {
    render(items().sort((a, b) => a.dataset.name.localeCompare(b.dataset.name)));
  });
  byLevel?.addEventListener('click', () => {
    render(items().sort((a, b) => Number(b.dataset.level) - Number(a.dataset.level)));
  });
})();

// Projects: filter by tag
(function projectsFilter() {
  const chips = document.querySelectorAll('.filter-group .chip');
  const cards = document.querySelectorAll('.project-card');
  chips.forEach((chip) => {
    chip.addEventListener('click', () => {
      chips.forEach((c) => c.classList.remove('active'));
      chip.classList.add('active');
      const filt = chip.dataset.filter;
      cards.forEach((card) => {
        const tags = card.dataset.tags || '';
        const show = filt === 'all' || tags.includes(filt);
        card.style.display = show ? '' : 'none';
      });
    });
  });
})();

// Tilt effect for cards
(function tiltEffect() {
  const tilts = document.querySelectorAll('.tilt');
  const max = 8;
  tilts.forEach((el) => {
    el.addEventListener('mousemove', (e) => {
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      const rx = (0.5 - y) * max;
      const ry = (x - 0.5) * max;
      el.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg) translateZ(0)`;
    });
    el.addEventListener('mouseleave', () => {
      el.style.transform = '';
    });
  });
})();

// Certifications: generate images, set verify links, lightbox and download
(function certifications() {
  const certs = [
    {
      key: 'intro-ai',
      title: 'Introduction to AI',
      issuer: 'Google (Coursera)',
      date: 'Aug 9, 2025',
      verify: 'https://coursera.org/verify/01XHQ8LGBBMU',
    },
    {
      key: 'gen-ai',
      title: 'Introduction to Generative AI',
      issuer: 'Google Cloud (Coursera)',
      date: 'Aug 9, 2025',
      verify: 'https://coursera.org/verify/B8FCM2MFL1KH',
    },
    {
      key: 'problem-solver',
      title: 'AI Problem Solver (Basic)',
      issuer: 'Google (Coursera)',
      date: 'Aug 9, 2025',
      verify: '', // Add your real verification URL here (optional)
    },
  ];

  const svgFor = ({ title, issuer, date, verify }) => `
    <svg xmlns="http://www.w3.org/2000/svg" width="1200" height="825">
      <defs>
        <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
          <stop stop-color="#2dd4bf"/>
          <stop offset="1" stop-color="#22c55e"/>
        </linearGradient>
      </defs>
      <rect width="100%" height="100%" fill="#0f141a"/>
      <rect x="40" y="40" width="1120" height="745" rx="28" fill="url(#g)" opacity="0.12"/>
      <rect x="70" y="70" width="1060" height="685" rx="22" fill="#101822" stroke="#1e2732" stroke-width="2"/>
      <text x="50%" y="35%" text-anchor="middle" fill="#e6eef6" font-family="Segoe UI,Inter,Arial" font-size="46" font-weight="700">${title}</text>
      <text x="50%" y="45%" text-anchor="middle" fill="#9fb0c0" font-family="Segoe UI,Inter,Arial" font-size="28">${issuer}</text>
      <text x="50%" y="55%" text-anchor="middle" fill="#e6eef6" font-family="Segoe UI,Inter,Arial" font-size="32" font-weight="700">${CONTACT.name}</text>
      <text x="50%" y="64%" text-anchor="middle" fill="#2dd4bf" font-family="Segoe UI,Inter,Arial" font-size="22">Issued: ${date}</text>
      ${verify ? `<text x="50%" y="73%" text-anchor="middle" fill="#9fb0c0" font-family="Segoe UI,Inter,Arial" font-size="18">Verify: ${verify}</text>` : ''}
    </svg>
  `;
  const dataUrl = (svg) => 'data:image/svg+xml;utf8,' + encodeURIComponent(svg);

  document.querySelectorAll('.cert').forEach((el) => {
    const key = el.dataset.certKey;
    const info = certs.find((c) => c.key === key);
    if (!info) return;
    const url = dataUrl(svgFor(info));
    const img = el.querySelector('.cert-img');
    const dl = el.querySelector('.dl-cert');
    const verifyBtn = el.querySelector('.verify-cert');
    if (img) img.src = url;
    if (dl) dl.href = url;
    if (verifyBtn) {
      if (info.verify) { verifyBtn.href = info.verify; verifyBtn.hidden = false; }
      else { verifyBtn.hidden = true; }
    }
  });

  // Lightbox
  const lb = document.querySelector('.lightbox');
  const lbImg = lb?.querySelector('.lightbox-img');
  const lbCap = lb?.querySelector('.lightbox-caption');
  const closeBtn = lb?.querySelector('.lightbox-close');
  const prevBtn = lb?.querySelector('.lightbox-prev');
  const nextBtn = lb?.querySelector('.lightbox-next');

  const items = Array.from(document.querySelectorAll('.cert'));
  const infoMap = {};
  certs.forEach((c) => infoMap[c.key] = c);
  let index = 0;

  function open(i) {
    index = i;
    const el = items[index];
    const key = el.dataset.certKey;
    const info = infoMap[key];
    const img = el.querySelector('.cert-img');
    if (lb && lbImg && lbCap && img && info) {
      lbImg.src = img.src;
      lbCap.innerHTML = `
        <div><strong>${info.title}</strong> — ${info.issuer}</div>
        <div>Issued: ${info.date}</div>
        ${info.verify ? `<div><a href="${info.verify}" target="_blank" rel="noopener" style="color:#c6f6d5;text-decoration:underline">Verify on Coursera</a></div>` : ''}
      `;
      lb.classList.add('open');
      lb.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    }
  }
  function close() { lb?.classList.remove('open'); lb?.setAttribute('aria-hidden', 'true'); document.body.style.overflow = ''; }
  function next() { open((index + 1) % items.length); }
  function prev() { open((index - 1 + items.length) % items.length); }

  items.forEach((el, i) => {
    el.querySelector('.view-cert')?.addEventListener('click', () => open(i));
    el.querySelector('.cert-img')?.addEventListener('click', () => open(i));
  });
  closeBtn?.addEventListener('click', close);
  lb?.addEventListener('click', (e) => { if (e.target === lb) close(); });
  nextBtn?.addEventListener('click', (e) => { e.stopPropagation(); next(); });
  prevBtn?.addEventListener('click', (e) => { e.stopPropagation(); prev(); });
  window.addEventListener('keydown', (e) => {
    if (!lb?.classList.contains('open')) return;
    if (e.key === 'Escape') close();
    if (e.key === 'ArrowRight') next();
    if (e.key === 'ArrowLeft') prev();
  });
})();

// WebGL 3D cube in hero
(function hero3D() {
  const canvas = document.getElementById('hero-3d');
  const toggleBtn = document.querySelector('.webgl-toggle');
  if (!canvas) return;

  const supportsReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const gl = canvas.getContext('webgl', { antialias: true, alpha: true });
  if (!gl) {
    // Fallback: show a static gradient background
    canvas.style.background = 'linear-gradient(135deg, rgba(45,212,191,.25), rgba(34,197,94,.25))';
    toggleBtn?.setAttribute('hidden', 'true');
    return;
  }

  // Resize handling
  function resize() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const rect = canvas.getBoundingClientRect();
    canvas.width = Math.max(1, Math.floor(rect.width * dpr));
    canvas.height = Math.max(1, Math.floor(rect.height * dpr));
    gl.viewport(0, 0, canvas.width, canvas.height);
  }
  const ro = new ResizeObserver(resize);
  ro.observe(canvas);

  // Shaders
  const vsSource = `
    attribute vec3 aPosition;
    attribute vec3 aColor;
    uniform mat4 uMVP;
    varying vec3 vColor;
    void main() {
      vColor = aColor;
      gl_Position = uMVP * vec4(aPosition, 1.0);
    }
  `;
  const fsSource = `
    precision mediump float;
    varying vec3 vColor;
    void main() {
      gl_FragColor = vec4(vColor, 1.0);
    }
  `;
  function compile(type, source) {
    const s = gl.createShader(type);
    gl.shaderSource(s, source);
    gl.compileShader(s);
    if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
      console.error(gl.getShaderInfoLog(s));
      gl.deleteShader(s);
      return null;
    }
    return s;
  }
  function program(vs, fs) {
    const p = gl.createProgram();
    gl.attachShader(p, vs);
    gl.attachShader(p, fs);
    gl.linkProgram(p);
    if (!gl.getProgramParameter(p, gl.LINK_STATUS)) {
      console.error(gl.getProgramInfoLog(p));
      gl.deleteProgram(p);
      return null;
    }
    return p;
  }
  const prog = program(compile(gl.VERTEX_SHADER, vsSource), compile(gl.FRAGMENT_SHADER, fsSource));
  if (prog) {
    gl.useProgram(prog);

    const aPosition = gl.getAttribLocation(prog, 'aPosition');
    const aColor = gl.getAttribLocation(prog, 'aColor');
    const uMVP = gl.getUniformLocation(prog, 'uMVP');

    // Cube geometry (positions and face colors)
    const positions = new Float32Array([
      // Front
      -1,-1, 1,  1,-1, 1,  1, 1, 1,  -1,-1, 1,  1, 1, 1,  -1, 1, 1,
      // Back
      -1,-1,-1, -1, 1,-1,  1, 1,-1,  -1,-1,-1,  1, 1,-1,  1,-1,-1,
      // Left
      -1,-1,-1, -1,-1, 1, -1, 1, 1,  -1,-1,-1, -1, 1, 1, -1, 1,-1,
      // Right
       1,-1,-1,  1, 1,-1,  1, 1, 1,   1,-1,-1,  1, 1, 1,  1,-1, 1,
      // Top
      -1, 1,-1, -1, 1, 1,  1, 1, 1,  -1, 1,-1,  1, 1, 1,  1, 1,-1,
      // Bottom
      -1,-1,-1, 1,-1,-1, 1,-1, 1,    -1,-1,-1, 1,-1, 1, -1,-1, 1
    ]);
    const teal = [0.18, 0.93, 0.84], emerald = [0.13, 0.77, 0.37], cyan = [0.25, 0.95, 1.0];
    const colors = new Float32Array([
      // Front (teal)
      ...teal, ...teal, ...teal, ...teal, ...teal, ...teal,
      // Back (emerald)
      ...emerald, ...emerald, ...emerald, ...emerald, ...emerald, ...emerald,
      // Left (mix)
      ...cyan, ...teal, ...emerald, ...cyan, ...emerald, ...teal,
      // Right (mix)
      ...emerald, ...cyan, ...teal, ...emerald, ...teal, ...cyan,
      // Top
      ...teal, ...emerald, ...cyan, ...teal, ...cyan, ...emerald,
      // Bottom
      ...emerald, ...teal, ...cyan, ...emerald, ...cyan, ...teal,
    ]);

    function bufferData(data, attrib, size) {
      const b = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, b);
      gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);
      gl.enableVertexAttribArray(attrib);
      gl.vertexAttribPointer(attrib, size, gl.FLOAT, false, 0, 0);
      return b;
    }
    bufferData(positions, aPosition, 3);
    bufferData(colors, aColor, 3);

    // Minimal mat4 utilities
    function perspective(out, fovy, aspect, near, far) {
      const f = 1.0 / Math.tan(fovy / 2);
      out[0] = f / aspect; out[1]=0; out[2]=0; out[3]=0;
      out[4]=0; out[5]=f; out[6]=0; out[7]=0;
      out[8]=0; out[9]=0; out[10]=(far+near)/(near-far); out[11]=-1;
      out[12]=0; out[13]=0; out[14]=(2*far*near)/(near-far); out[15]=0;
      return out;
    }
    function identity(out){ out.fill(0); out[0]=out[5]=out[10]=out[15]=1; return out; }
    function multiply(out, a, b){
      const o = new Float32Array(16);
      for (let i=0;i<4;i++) for (let j=0;j<4;j++) {
        o[i*4+j] = a[i*4+0]*b[0*4+j]+a[i*4+1]*b[1*4+j]+a[i*4+2]*b[2*4+j]+a[i*4+3]*b[3*4+j];
      }
      out.set(o); return out;
    }
    function translate(out, a, v){
      const t = identity(new Float32Array(16));
      t[12]=v[0]; t[13]=v[1]; t[14]=v[2];
      return multiply(out, a, t);
    }
    function rotateX(out, a, rad){
      const c=Math.cos(rad), s=Math.sin(rad);
      const r=identity(new Float32Array(16));
      r[5]=c; r[6]=s; r[9]=-s; r[10]=c;
      return multiply(out, a, r);
    }
    function rotateY(out, a, rad){
      const c=Math.cos(rad), s=Math.sin(rad);
      const r=identity(new Float32Array(16));
      r[0]=c; r[2]=-s; r[8]=s; r[10]=c;
      return multiply(out, a, r);
    }

    let running = !supportsReduced;
    toggleBtn?.setAttribute('aria-pressed', String(running));
    toggleBtn?.addEventListener('click', () => {
      running = !running;
      toggleBtn.setAttribute('aria-pressed', String(running));
      toggleBtn.textContent = running ? 'Pause' : 'Play';
      if (running) requestAnimationFrame(loop);
    });

    gl.enable(gl.DEPTH_TEST);
    gl.clearColor(0, 0, 0, 0);

    let t0 = performance.now();
    function loop(t) {
      if (!running) return;
      resize();
      const dt = (t - t0) / 1000;
      t0 = t;

      gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

      // MVP
      const aspect = canvas.width / canvas.height;
      const proj = perspective(new Float32Array(16), Math.PI / 3, aspect || 1, 0.1, 100);
      let model = identity(new Float32Array(16));
      model = translate(model, model, [0, 0, -4.5]);
      model = rotateY(model, model, t * 0.0007);
      model = rotateX(model, model, t * 0.0005);

      const mvp = multiply(new Float32Array(16), proj, model);
      gl.uniformMatrix4fv(uMVP, false, mvp);

      gl.drawArrays(gl.TRIANGLES, 0, 36);

      requestAnimationFrame(loop);
    }

    // Start
    if (running) {
      toggleBtn && (toggleBtn.textContent = 'Pause');
      requestAnimationFrame(loop);
    } else {
      toggleBtn && (toggleBtn.textContent = 'Play');
    }
  }
})();