/* ============================================
   MARTINA LAU – FUNNEL SCRIPTS
   ============================================ */

// ── Nächsten Dienstag 20:00 CET berechnen ──
function getNextThursday(referenceDate) {
  const d = referenceDate ? new Date(referenceDate) : new Date();
  const day = d.getDay();
  const daysUntilTuesday = (2 - day + 7) % 7 || 7;
  d.setDate(d.getDate() + daysUntilTuesday);
  d.setHours(20, 0, 0, 0);
  return d;
}

function getUpcomingThursdays(count = 3) {
  const dates = [];
  let ref = new Date();
  for (let i = 0; i < count; i++) {
    const d = getNextThursday(ref);
    dates.push(d);
    ref = new Date(d.getTime() + 1000 * 60);
  }
  return dates;
}

function formatDate(date) {
  return date.toLocaleDateString('de-DE', {
    weekday: 'long',
    day: 'numeric',
    month: 'long'
  }) + ' · 20:00 Uhr';
}

function formatDateShort(date) {
  return date.toLocaleDateString('de-DE', {
    day: 'numeric',
    month: 'long'
  });
}

// ── Countdown-Timer ──
function initCountdown(targetDate, container) {
  if (!container) return;
  const units = {
    days:    container.querySelector('[data-days]'),
    hours:   container.querySelector('[data-hours]'),
    minutes: container.querySelector('[data-minutes]'),
    seconds: container.querySelector('[data-seconds]'),
  };
  function pad(n) { return String(n).padStart(2, '0'); }
  function tick() {
    const diff = targetDate.getTime() - Date.now();
    if (diff <= 0) {
      if (typeof window.onCountdownEnd === 'function') window.onCountdownEnd();
      else location.reload();
      return;
    }
    if (units.days)    units.days.textContent    = pad(Math.floor(diff / 86400000));
    if (units.hours)   units.hours.textContent   = pad(Math.floor((diff % 86400000) / 3600000));
    if (units.minutes) units.minutes.textContent = pad(Math.floor((diff % 3600000) / 60000));
    if (units.seconds) units.seconds.textContent = pad(Math.floor((diff % 60000) / 1000));
  }
  tick();
  setInterval(tick, 1000);
}

function renderUpcomingDates(listEl, count = 3) {
  if (!listEl) return;
  const dates = getUpcomingThursdays(count);
  listEl.innerHTML = '';
  dates.forEach((d, i) => {
    const li = document.createElement('li');
    if (i === 0) li.classList.add('is-next');
    li.textContent = formatDate(d);
    listEl.appendChild(li);
  });
}

// ════════════════════════════════════════════
// ── GOLDENE PARTIKEL – Canvas Animation ──
// ════════════════════════════════════════════
function initGoldenParticles(canvasId) {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  function resize() {
    canvas.width  = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  const GOLD_COLORS = [
    'rgba(212, 175, 85, ',
    'rgba(232, 200, 120, ',
    'rgba(255, 220, 140, ',
    'rgba(196, 155, 60, ',
    'rgba(245, 210, 100, ',
  ];

  class Particle {
    constructor() { this.reset(true); }

    reset(initial = false) {
      this.x     = Math.random() * canvas.width;
      this.y     = initial ? Math.random() * canvas.height : canvas.height + 10;
      this.size  = Math.random() * 2.5 + 0.5;
      this.speedY = -(Math.random() * 0.6 + 0.2);
      this.speedX = (Math.random() - 0.5) * 0.4;
      this.opacity = 0;
      this.maxOpacity = Math.random() * 0.7 + 0.2;
      this.fadeSpeed = Math.random() * 0.008 + 0.003;
      this.color = GOLD_COLORS[Math.floor(Math.random() * GOLD_COLORS.length)];
      this.twinkle = Math.random() * Math.PI * 2;
      this.twinkleSpeed = Math.random() * 0.04 + 0.01;
      // Form: Kreis oder Diamant
      this.shape = Math.random() > 0.4 ? 'circle' : 'diamond';
      this.fading = false;
    }

    update() {
      this.y += this.speedY;
      this.x += this.speedX + Math.sin(this.twinkle) * 0.15;
      this.twinkle += this.twinkleSpeed;

      if (!this.fading) {
        this.opacity = Math.min(this.opacity + this.fadeSpeed, this.maxOpacity);
        if (this.opacity >= this.maxOpacity) this.fading = true;
      } else {
        this.opacity -= this.fadeSpeed * 0.5;
      }

      if (this.opacity <= 0 || this.y < -10) this.reset();
    }

    draw() {
      ctx.save();
      ctx.globalAlpha = this.opacity;

      if (this.shape === 'diamond') {
        ctx.fillStyle = this.color + this.opacity + ')';
        ctx.beginPath();
        ctx.moveTo(this.x,            this.y - this.size * 1.5);
        ctx.lineTo(this.x + this.size, this.y);
        ctx.lineTo(this.x,            this.y + this.size * 1.5);
        ctx.lineTo(this.x - this.size, this.y);
        ctx.closePath();
        ctx.fill();
      } else {
        // Leuchtender Kreis
        const grd = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.size * 2);
        grd.addColorStop(0,   this.color + this.opacity + ')');
        grd.addColorStop(0.4, this.color + (this.opacity * 0.6) + ')');
        grd.addColorStop(1,   this.color + '0)');
        ctx.fillStyle = grd;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size * 2, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.restore();
    }
  }

  const particles = Array.from({ length: 80 }, () => new Particle());

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => { p.update(); p.draw(); });
    requestAnimationFrame(animate);
  }
  animate();
}

// ── Shimmer-Text Effekt ──
function initShimmer() {
  document.querySelectorAll('.shimmer-text').forEach(el => {
    el.style.backgroundSize = '200% auto';
    let pos = 0;
    setInterval(() => {
      pos = (pos + 0.5) % 200;
      el.style.backgroundPosition = pos + '% center';
    }, 16);
  });
}

// ── Init Landing Page ──
function initLanding() {
  const countdownEl  = document.getElementById('countdown');
  const datesListEl  = document.getElementById('upcoming-dates');
  const badgeDateEl  = document.getElementById('badge-next-date');
  const nextThursday = getNextThursday();

  if (countdownEl) initCountdown(nextThursday, countdownEl);
  if (datesListEl) renderUpcomingDates(datesListEl, 1);
  if (badgeDateEl) badgeDateEl.textContent = formatDateShort(nextThursday);
  const badgeDate2El = document.getElementById('badge-next-date-2');
  if (badgeDate2El) badgeDate2El.textContent = formatDateShort(nextThursday);

  document.querySelectorAll('[id^="particles-canvas"]').forEach(c => initGoldenParticles(c.id));
  initShimmer();
}

// ── Init Webinar Page ──
function initWebinar() {
  const countdownSection = document.getElementById('countdown-section');
  const videoSection     = document.getElementById('video-section');
  const countdownEl      = document.getElementById('webinar-countdown');
  const nextDateEl       = document.getElementById('next-date-text');
  const now              = new Date();

  // ── URL-Parameter für Tests: ?preview=live | ?preview=post | ?preview=countdown ──
  const preview = new URLSearchParams(window.location.search).get('preview');
  if (preview === 'live') {
    if (countdownSection) countdownSection.style.display = 'none';
    if (videoSection)     videoSection.style.display = 'block';
    document.querySelectorAll('[id^="particles-canvas"]').forEach(c => initGoldenParticles(c.id));
    initShimmer();
    return;
  }
  if (preview === 'post') {
    window.location.replace('sales.html');
    return;
  }

  // ── TEST-Datum: heute um 10:00 Uhr (nur für Test am 09.06.2026 — danach entfernen!) ──
  const webinarStart   = new Date(); webinarStart.setHours(10, 0, 0, 0);
  const lastEnd        = new Date(); lastEnd.setHours(12, 0, 0, 0);
  const postWebinarEnd = new Date(); postWebinarEnd.setHours(23, 59, 0, 0);
  const nextThursday   = webinarStart;
  const isLive         = now >= webinarStart && now <= lastEnd;
  const isPostWebinar  = now > lastEnd && now <= postWebinarEnd;

  const postSection = document.getElementById('post-webinar-section');

  if (isLive) {
    if (countdownSection) countdownSection.style.display = 'none';
    if (videoSection)     videoSection.style.display = 'block';
    if (postSection)      postSection.style.display = 'none';
  } else if (isPostWebinar) {
    window.location.replace('sales.html');
    return;
  } else {
    if (countdownSection) countdownSection.style.display = 'block';
    if (videoSection)     videoSection.style.display = 'none';
    if (postSection)      postSection.style.display = 'none';
    if (countdownEl) {
      window.onCountdownEnd = function() {
        if (countdownSection) countdownSection.style.display = 'none';
        if (videoSection)     videoSection.style.display = 'block';
      };
      initCountdown(nextThursday, countdownEl);
    }
  }
  // Alle Canvas-Elemente initialisieren (auch die im video-section)
  document.querySelectorAll('[id^="particles-canvas"]').forEach(c => initGoldenParticles(c.id));
  initShimmer();
}

// ── Init Sales Page ──
function initSales() {
  const now        = new Date();
  const nextTh     = getNextThursday();
  const lastTh     = new Date(nextTh);
  lastTh.setDate(lastTh.getDate() - 7);
  const webinarEnd = new Date(lastTh.getTime() + 2 * 60 * 60 * 1000);    // Do 21:00
  const codeExpiry = new Date(webinarEnd.getTime() + 5 * 24 * 60 * 60 * 1000); // +5 Tage
  const codeValid  = now >= webinarEnd && now <= codeExpiry;

  const codeBlock        = document.getElementById('code-block');
  const priceSale        = document.getElementById('price-sale');
  const priceStrike      = document.getElementById('price-strikethrough');
  const priceFull        = document.getElementById('price-full');
  const priceSaving      = document.getElementById('price-saving');
  const priceLabel       = document.getElementById('price-label');
  const codeCountdown    = document.getElementById('code-countdown');

  if (codeValid) {
    // Code aktiv: Rabattpreis + Countdown anzeigen
    if (priceLabel)  priceLabel.textContent  = 'Webinar-Sonderpreis';
    if (codeBlock)   codeBlock.style.display = '';
    if (priceSale)   priceSale.style.display = '';
    if (priceStrike) priceStrike.style.display = '';
    if (priceFull)   priceFull.style.display   = 'none';
    if (priceSaving) priceSaving.style.display = '';
    if (codeCountdown) initCountdown(codeExpiry, codeCountdown);
  } else {
    // Code abgelaufen: Vollpreis, kein Code
    if (priceLabel)  priceLabel.textContent    = 'Regulärer Preis';
    if (codeBlock)   codeBlock.style.display   = 'none';
    if (priceSale)   priceSale.style.display   = 'none';
    if (priceStrike) priceStrike.style.display = 'none';
    if (priceFull)   priceFull.style.display   = '';
    if (priceSaving) priceSaving.style.display = 'none';
    // Button-Texte auf 149 € aktualisieren
    document.querySelectorAll('a[href*="ablefy"]').forEach(btn => {
      btn.textContent = btn.textContent.replace('99 €', '149 €');
    });
  }

  document.querySelectorAll('[id^="particles-canvas"]').forEach(c => initGoldenParticles(c.id));
  initShimmer();
}

// ── DOMContentLoaded ──
document.addEventListener('DOMContentLoaded', function () {
  const page = document.body.dataset.page;
  if (page === 'landing') initLanding();
  if (page === 'webinar') initWebinar();
  if (page === 'danke') {
    const nextThursday = getNextThursday();
    const short = formatDateShort(nextThursday);
    ['danke-date', 'danke-date-2', 'danke-date-3'].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.textContent = short;
    });
    document.querySelectorAll('[id^="particles-canvas"]').forEach(c => initGoldenParticles(c.id));
    initShimmer();
  }

  if (page === 'sales') initSales();

  if (!page) {
    document.querySelectorAll('[id^="particles-canvas"]').forEach(c => initGoldenParticles(c.id));
    initShimmer();
  }
});
