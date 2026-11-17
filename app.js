/**
 * ============================================================================
 * DUSK BLUE + MIDNIGHT NAVY - HIGH-OCTANE CONTROLLER
 * Visibly Moving Aurora Waves Canvas, Native 3D Tilt Physics, Sound FX, UX
 * ============================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  initAuroraCanvas();
  init3DTilt();
  initSoundSystem();
  initScrollStagger();
  initClipboardToast();
  initLightbox();
  initMapToggle();
  initLiveClock();
});

/* ----------------------------------------------------------------------------
 * 1. DYNAMIC VISIBLY MOVING AURORA CANVAS (Dusk Blue + Midnight Navy Waves)
 * Pure autonomous movement - Zero mouse lag!
 * ---------------------------------------------------------------------------- */
function initAuroraCanvas() {
  const canvas = document.getElementById('aurora-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  // 5 Active Floating Aurora Waves (Visibly Moving!)
  const waves = [
    { x: width * 0.25, y: height * 0.25, vx: 1.2, vy: 0.9, r: 420, color1: 'rgba(59, 130, 246, 0.38)', color2: 'rgba(30, 58, 138, 0.15)' },
    { x: width * 0.75, y: height * 0.35, vx: -1.0, vy: 1.1, r: 480, color1: 'rgba(79, 70, 229, 0.32)', color2: 'rgba(15, 23, 42, 0)' },
    { x: width * 0.5, y: height * 0.8, vx: 1.1, vy: -0.9, r: 450, color1: 'rgba(14, 165, 233, 0.35)', color2: 'rgba(10, 17, 40, 0.1)' },
    { x: width * 0.85, y: height * 0.85, vx: -0.9, vy: -1.2, r: 380, color1: 'rgba(96, 165, 250, 0.28)', color2: 'rgba(5, 8, 20, 0)' },
    { x: width * 0.1, y: height * 0.7, vx: 0.8, vy: -0.7, r: 360, color1: 'rgba(37, 99, 235, 0.32)', color2: 'rgba(10, 17, 40, 0)' }
  ];

  // 45 Drifting Cyber Starlight Particles
  const particles = Array.from({ length: 45 }, () => ({
    x: Math.random() * width,
    y: Math.random() * height,
    size: Math.random() * 2.2 + 0.8,
    vy: -(Math.random() * 0.6 + 0.3),
    alpha: Math.random() * 0.7 + 0.3,
    pulseSpeed: Math.random() * 0.04 + 0.02
  }));

  let time = 0;

  function render() {
    ctx.clearRect(0, 0, width, height);

    // Deep Midnight Navy Background Base
    const bgGrad = ctx.createLinearGradient(0, 0, 0, height);
    bgGrad.addColorStop(0, '#050814');
    bgGrad.addColorStop(0.5, '#0a1128');
    bgGrad.addColorStop(1, '#050814');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, width, height);

    time += 0.015;

    // Draw and Move Dynamic Aurora Waves
    waves.forEach((w, idx) => {
      w.x += w.vx;
      w.y += w.vy;

      // Smooth bounce back from canvas edges
      if (w.x < -100 || w.x > width + 100) w.vx *= -1;
      if (w.y < -100 || w.y > height + 100) w.vy *= -1;

      // Pulsing Radius
      const currentRadius = w.r + Math.sin(time + idx) * 35;

      const grad = ctx.createRadialGradient(w.x, w.y, 0, w.x, w.y, currentRadius);
      grad.addColorStop(0, w.color1);
      grad.addColorStop(0.5, w.color2);
      grad.addColorStop(1, 'rgba(5, 8, 20, 0)');

      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(w.x, w.y, currentRadius, 0, Math.PI * 2);
      ctx.fill();
    });

    // Draw and Animate Drifting Particles
    particles.forEach((p) => {
      p.y += p.vy;
      p.alpha += Math.sin(time * 2) * 0.01;
      if (p.y < -10) {
        p.y = height + 10;
        p.x = Math.random() * width;
      }

      ctx.fillStyle = `rgba(147, 197, 253, ${Math.max(0.15, Math.min(0.9, p.alpha))})`;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fill();
    });

    requestAnimationFrame(render);
  }

  render();
}

/* ----------------------------------------------------------------------------
 * 2. BUTTERY SMOOTH 3D TILT PHYSICS WITH SPECULAR GLARE
 * ---------------------------------------------------------------------------- */
function init3DTilt() {
  const cards = document.querySelectorAll('.craft-card-3d');

  cards.forEach((card) => {
    // Add specular glare overlay element if not present
    if (!card.querySelector('.card-specular-glare')) {
      const glare = document.createElement('div');
      glare.className = 'card-specular-glare';
      card.appendChild(glare);
    }

    let bounds = null;
    let isHovered = false;

    card.addEventListener('mouseenter', () => {
      bounds = card.getBoundingClientRect();
      isHovered = true;
      card.style.transition = 'transform 0.12s ease-out, border-color 0.3s ease, box-shadow 0.3s ease';
    });

    card.addEventListener('mousemove', (e) => {
      if (!isHovered || !bounds) return;

      const mouseX = e.clientX;
      const mouseY = e.clientY;
      const leftX = mouseX - bounds.left;
      const topY = mouseY - bounds.top;

      const centerX = bounds.width / 2;
      const centerY = bounds.height / 2;

      // 3D rotation angles (Max 12 degrees for noticeable, satisfying depth!)
      const rotateX = ((centerY - topY) / centerY) * 11;
      const rotateY = ((leftX - centerX) / centerX) * 11;

      card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateZ(12px) scale3d(1.02, 1.02, 1.02)`;

      // Dynamic specular reflection position
      const glareX = ((leftX / bounds.width) * 100).toFixed(1);
      const glareY = ((topY / bounds.height) * 100).toFixed(1);
      card.style.setProperty('--glare-x', `${glareX}%`);
      card.style.setProperty('--glare-y', `${glareY}%`);
    });

    card.addEventListener('mouseleave', () => {
      isHovered = false;
      card.style.transition = 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.3s ease, box-shadow 0.3s ease';
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px) scale3d(1, 1, 1)';
    });
  });
}

/* ----------------------------------------------------------------------------
 * 3. PROCEDURAL WEB AUDIO SYNTHESIZER
 * ---------------------------------------------------------------------------- */
let audioCtx = null;
let soundEnabled = true;

function initSoundSystem() {
  const soundBtn = document.getElementById('sound-toggle-btn');
  const soundLabel = document.getElementById('sound-label');

  function getAudioContext() {
    if (!audioCtx) {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
    return audioCtx;
  }

  window.playUiSound = function (type = 'click') {
    if (!soundEnabled) return;
    try {
      const ctx = getAudioContext();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      const now = ctx.currentTime;

      if (type === 'hover') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(560, now);
        osc.frequency.exponentialRampToValueAtTime(740, now + 0.04);
        gain.gain.setValueAtTime(0.015, now);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.04);
        osc.start(now);
        osc.stop(now + 0.04);
      } else if (type === 'click') {
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(420, now);
        osc.frequency.exponentialRampToValueAtTime(840, now + 0.07);
        gain.gain.setValueAtTime(0.05, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
        osc.start(now);
        osc.stop(now + 0.08);
      } else if (type === 'success') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(523.25, now);
        osc.frequency.setValueAtTime(783.99, now + 0.07);
        gain.gain.setValueAtTime(0.05, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
        osc.start(now);
        osc.stop(now + 0.2);
      }
    } catch (e) {}
  };

  if (soundBtn) {
    soundBtn.addEventListener('click', () => {
      soundEnabled = !soundEnabled;
      if (soundEnabled) {
        getAudioContext();
        window.playUiSound('success');
        if (soundLabel) soundLabel.textContent = 'SOUND: ON';
        soundBtn.classList.remove('opacity-50');
        showToast('🔊 เปิดเอฟเฟกต์เสียง UI แล้ว');
      } else {
        if (soundLabel) soundLabel.textContent = 'SOUND: OFF';
        soundBtn.classList.add('opacity-50');
        showToast('🔇 ปิดเสียง UI แล้ว');
      }
    });
  }

  // Hover sound on buttons & cards
  document.querySelectorAll('button, a, .squircle-btn, .craft-card-3d').forEach((el) => {
    el.addEventListener('mouseenter', () => window.playUiSound('hover'), { passive: true });
    el.addEventListener('click', () => window.playUiSound('click'), { passive: true });
  });
}

/* ----------------------------------------------------------------------------
 * 4. STAGGER ENTRANCE ANIMATION (Reel 1861794128508931)
 * ---------------------------------------------------------------------------- */
function initScrollStagger() {
  const elements = document.querySelectorAll('.stagger-in');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const delay = entry.target.dataset.delay || 0;
          setTimeout(() => {
            entry.target.classList.add('visible');
          }, delay);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.02, rootMargin: '0px 0px 100px 0px' }
  );

  elements.forEach((el, index) => {
    el.dataset.delay = (index % 6) * 35;
    observer.observe(el);
  });

  // Ensure elements already inside initial viewport reveal immediately
  setTimeout(() => {
    elements.forEach((el) => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight) {
        el.classList.add('visible');
      }
    });
  }, 100);
}

/* ----------------------------------------------------------------------------
 * 5. TOAST NOTIFICATION & 1-CLICK CLIPBOARD COPY
 * ---------------------------------------------------------------------------- */
function showToast(message) {
  const toast = document.getElementById('toast-notification');
  const msgEl = document.getElementById('toast-message');
  if (!toast || !msgEl) return;

  msgEl.textContent = message;
  toast.classList.add('show');

  if (window.toastTimer) clearTimeout(window.toastTimer);
  window.toastTimer = setTimeout(() => {
    toast.classList.remove('show');
  }, 2400);
}

function initClipboardToast() {
  document.querySelectorAll('[data-copy]').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const text = btn.getAttribute('data-copy');
      const label = btn.getAttribute('data-label') || 'ข้อมูล';

      navigator.clipboard.writeText(text).then(() => {
        if (window.playUiSound) window.playUiSound('success');
        showToast(`✓ คัดลอก ${label} แล้ว: ${text}`);
      }).catch(() => {
        showToast(`คัดลอก: ${text}`);
      });
    });
  });
}

/* ----------------------------------------------------------------------------
 * 6. ACTIVITY PHOTO LIGHTBOX
 * ---------------------------------------------------------------------------- */
function initLightbox() {
  const overlay = document.getElementById('photo-lightbox');
  const imgEl = document.getElementById('lightbox-img');
  const captionEl = document.getElementById('lightbox-caption');
  const closeBtn = document.getElementById('lightbox-close-btn');

  if (!overlay || !imgEl) return;

  document.querySelectorAll('[data-lightbox-src]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const src = btn.getAttribute('data-lightbox-src');
      const caption = btn.getAttribute('data-lightbox-caption') || '';

      imgEl.src = src;
      captionEl.textContent = caption;
      overlay.classList.add('active');
      if (window.playUiSound) window.playUiSound('click');
    });
  });

  function closeLightbox() {
    overlay.classList.remove('active');
  }

  if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeLightbox();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && overlay.classList.contains('active')) {
      closeLightbox();
    }
  });
}

/* ----------------------------------------------------------------------------
 * 7. INTERACTIVE GOOGLE MAPS TOGGLE
 * ---------------------------------------------------------------------------- */
function initMapToggle() {
  const roadBtn = document.getElementById('map-btn-road');
  const satBtn = document.getElementById('map-btn-sat');
  const iframe = document.getElementById('google-map-iframe');

  if (!roadBtn || !satBtn || !iframe) return;

  const baseSrc = 'https://maps.google.com/maps?q=8.231907,99.874652+(%E0%B8%97%E0%B8%B5%E0%B9%88%E0%B8%AD%E0%B8%A2%E0%B8%B9%E0%B9%88%E0%B8%9A%E0%B9%89%E0%B8%B2%E0%B8%99%20206%2F1%20%E0%B8%AB%E0%B8%A1%E0%B8%B9%E0%B9%884%20%E0%B8%95.%E0%B8%AB%E0%B8%B4%E0%B8%99%E0%B8%95%E0%B8%81)&z=16&ie=UTF8&iwloc=B&output=embed';

  roadBtn.addEventListener('click', () => {
    iframe.src = baseSrc;
    roadBtn.classList.add('bg-blue-600', 'text-white');
    roadBtn.classList.remove('bg-transparent', 'text-slate-400');
    satBtn.classList.remove('bg-blue-600', 'text-white');
    satBtn.classList.add('bg-transparent', 'text-slate-400');
    if (window.playUiSound) window.playUiSound('click');
  });

  satBtn.addEventListener('click', () => {
    iframe.src = baseSrc + '&t=k';
    satBtn.classList.add('bg-blue-600', 'text-white');
    satBtn.classList.remove('bg-transparent', 'text-slate-400');
    roadBtn.classList.remove('bg-blue-600', 'text-white');
    roadBtn.classList.add('bg-transparent', 'text-slate-400');
    if (window.playUiSound) window.playUiSound('click');
  });
}

/* ----------------------------------------------------------------------------
 * 8. LIVE CLOCK (UTC+7)
 * ---------------------------------------------------------------------------- */
function initLiveClock() {
  const clockEl = document.getElementById('live-clock');
  if (!clockEl) return;

  function update() {
    const now = new Date();
    clockEl.textContent = now.toLocaleTimeString('th-TH', { hour12: false }) + ' (UTC+7)';
  }
  update();
  setInterval(update, 1000);
}
