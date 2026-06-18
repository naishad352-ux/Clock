/* ────────────────────────────────────────────────────────────
   Cloke v2.0 — Professional Clock App  |  script.js
──────────────────────────────────────────────────────────── */

'use strict';

/* ══════════════════════════════════════════════════════════
   TIMEZONE DATA — Countries & IANA Zones
══════════════════════════════════════════════════════════ */
const TZ_LIST = [
  { country:'India',                    flag:'🇮🇳', tz:'Asia/Kolkata' },
  { country:'USA (New York)',           flag:'🇺🇸', tz:'America/New_York' },
  { country:'USA (Los Angeles)',        flag:'🇺🇸', tz:'America/Los_Angeles' },
  { country:'USA (Chicago)',            flag:'🇺🇸', tz:'America/Chicago' },
  { country:'USA (Denver)',             flag:'🇺🇸', tz:'America/Denver' },
  { country:'USA (Hawaii)',             flag:'🇺🇸', tz:'Pacific/Honolulu' },
  { country:'UK (London)',              flag:'🇬🇧', tz:'Europe/London' },
  { country:'Japan (Tokyo)',            flag:'🇯🇵', tz:'Asia/Tokyo' },
  { country:'China (Beijing)',          flag:'🇨🇳', tz:'Asia/Shanghai' },
  { country:'Australia (Sydney)',       flag:'🇦🇺', tz:'Australia/Sydney' },
  { country:'Australia (Melbourne)',    flag:'🇦🇺', tz:'Australia/Melbourne' },
  { country:'Australia (Perth)',        flag:'🇦🇺', tz:'Australia/Perth' },
  { country:'Germany (Berlin)',         flag:'🇩🇪', tz:'Europe/Berlin' },
  { country:'France (Paris)',           flag:'🇫🇷', tz:'Europe/Paris' },
  { country:'Brazil (São Paulo)',       flag:'🇧🇷', tz:'America/Sao_Paulo' },
  { country:'Canada (Toronto)',         flag:'🇨🇦', tz:'America/Toronto' },
  { country:'Canada (Vancouver)',       flag:'🇨🇦', tz:'America/Vancouver' },
  { country:'Russia (Moscow)',          flag:'🇷🇺', tz:'Europe/Moscow' },
  { country:'UAE (Dubai)',              flag:'🇦🇪', tz:'Asia/Dubai' },
  { country:'Singapore',               flag:'🇸🇬', tz:'Asia/Singapore' },
  { country:'South Korea (Seoul)',      flag:'🇰🇷', tz:'Asia/Seoul' },
  { country:'Pakistan (Karachi)',       flag:'🇵🇰', tz:'Asia/Karachi' },
  { country:'Bangladesh (Dhaka)',       flag:'🇧🇩', tz:'Asia/Dhaka' },
  { country:'Turkey (Istanbul)',        flag:'🇹🇷', tz:'Europe/Istanbul' },
  { country:'Mexico (Mexico City)',     flag:'🇲🇽', tz:'America/Mexico_City' },
  { country:'South Africa (Johannesburg)', flag:'🇿🇦', tz:'Africa/Johannesburg' },
  { country:'Egypt (Cairo)',            flag:'🇪🇬', tz:'Africa/Cairo' },
  { country:'Saudi Arabia (Riyadh)',    flag:'🇸🇦', tz:'Asia/Riyadh' },
  { country:'Indonesia (Jakarta)',      flag:'🇮🇩', tz:'Asia/Jakarta' },
  { country:'Nigeria (Lagos)',          flag:'🇳🇬', tz:'Africa/Lagos' },
  { country:'Argentina (Buenos Aires)',flag:'🇦🇷', tz:'America/Argentina/Buenos_Aires' },
  { country:'New Zealand (Auckland)',   flag:'🇳🇿', tz:'Pacific/Auckland' },
  { country:'Thailand (Bangkok)',       flag:'🇹🇭', tz:'Asia/Bangkok' },
  { country:'Malaysia (Kuala Lumpur)', flag:'🇲🇾', tz:'Asia/Kuala_Lumpur' },
  { country:'Philippines (Manila)',     flag:'🇵🇭', tz:'Asia/Manila' },
  { country:'Italy (Rome)',             flag:'🇮🇹', tz:'Europe/Rome' },
  { country:'Spain (Madrid)',           flag:'🇪🇸', tz:'Europe/Madrid' },
  { country:'Netherlands (Amsterdam)', flag:'🇳🇱', tz:'Europe/Amsterdam' },
  { country:'Switzerland (Zurich)',     flag:'🇨🇭', tz:'Europe/Zurich' },
  { country:'Sweden (Stockholm)',       flag:'🇸🇪', tz:'Europe/Stockholm' },
  { country:'Norway (Oslo)',            flag:'🇳🇴', tz:'Europe/Oslo' },
  { country:'Denmark (Copenhagen)',     flag:'🇩🇰', tz:'Europe/Copenhagen' },
  { country:'Finland (Helsinki)',       flag:'🇫🇮', tz:'Europe/Helsinki' },
  { country:'Poland (Warsaw)',          flag:'🇵🇱', tz:'Europe/Warsaw' },
  { country:'Greece (Athens)',          flag:'🇬🇷', tz:'Europe/Athens' },
  { country:'Portugal (Lisbon)',        flag:'🇵🇹', tz:'Europe/Lisbon' },
  { country:'Israel (Tel Aviv)',        flag:'🇮🇱', tz:'Asia/Jerusalem' },
  { country:'Iran (Tehran)',            flag:'🇮🇷', tz:'Asia/Tehran' },
  { country:'Afghanistan (Kabul)',      flag:'🇦🇫', tz:'Asia/Kabul' },
  { country:'Vietnam (Ho Chi Minh)',    flag:'🇻🇳', tz:'Asia/Ho_Chi_Minh' },
  { country:'Nepal (Kathmandu)',        flag:'🇳🇵', tz:'Asia/Kathmandu' },
  { country:'Sri Lanka (Colombo)',      flag:'🇱🇰', tz:'Asia/Colombo' },
  { country:'Myanmar (Yangon)',         flag:'🇲🇲', tz:'Asia/Yangon' },
  { country:'Kenya (Nairobi)',          flag:'🇰🇪', tz:'Africa/Nairobi' },
  { country:'Ethiopia (Addis Ababa)',   flag:'🇪🇹', tz:'Africa/Addis_Ababa' },
  { country:'Ghana (Accra)',            flag:'🇬🇭', tz:'Africa/Accra' },
  { country:'Morocco (Casablanca)',     flag:'🇲🇦', tz:'Africa/Casablanca' },
  { country:'Colombia (Bogotá)',        flag:'🇨🇴', tz:'America/Bogota' },
  { country:'Chile (Santiago)',         flag:'🇨🇱', tz:'America/Santiago' },
  { country:'Peru (Lima)',              flag:'🇵🇪', tz:'America/Lima' },
  { country:'Venezuela (Caracas)',      flag:'🇻🇪', tz:'America/Caracas' },
  { country:'Ukraine (Kyiv)',           flag:'🇺🇦', tz:'Europe/Kyiv' },
  { country:'Kazakhstan (Almaty)',      flag:'🇰🇿', tz:'Asia/Almaty' },
  { country:'Uzbekistan (Tashkent)',    flag:'🇺🇿', tz:'Asia/Tashkent' },
  { country:'Azerbaijan (Baku)',        flag:'🇦🇿', tz:'Asia/Baku' },
  { country:'Hong Kong',               flag:'🇭🇰', tz:'Asia/Hong_Kong' },
  { country:'Taiwan (Taipei)',          flag:'🇹🇼', tz:'Asia/Taipei' },
  { country:'Fiji (Suva)',              flag:'🇫🇯', tz:'Pacific/Fiji' },
  { country:'Iceland (Reykjavik)',      flag:'🇮🇸', tz:'Atlantic/Reykjavik' },
  { country:'Jamaica (Kingston)',       flag:'🇯🇲', tz:'America/Jamaica' },
  { country:'Cuba (Havana)',            flag:'🇨🇺', tz:'America/Havana' },
];

const DAYS   = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
const MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December'];

/* ══════════════════════════════════════════════════════════
   UTILITY HELPERS
══════════════════════════════════════════════════════════ */
const pad = (n, d = 2) => String(Math.floor(n)).padStart(d, '0');

function formatHMS(totalSeconds) {
  const h = Math.floor(totalSeconds / 3600);
  const m = Math.floor((totalSeconds % 3600) / 60);
  const s = totalSeconds % 60;
  return `${pad(h)}:${pad(m)}:${pad(s)}`;
}

function formatMs(ms) {
  const totalSec = Math.floor(ms / 1000);
  const h  = Math.floor(totalSec / 3600);
  const m  = Math.floor((totalSec % 3600) / 60);
  const s  = totalSec % 60;
  const ms3 = Math.floor(ms % 1000);
  return { hms: `${pad(h)}:${pad(m)}:${pad(s)}`, ms: `.${pad(ms3, 3)}` };
}

/** Get UTC offset string like +5:30, -4:00 */
function getUTCOffset(tz) {
  try {
    const now  = new Date();
    const utcMs = now.getTime() + now.getTimezoneOffset() * 60000;
    const tzDate = new Date(now.toLocaleString('en-US', { timeZone: tz }));
    const localDate = new Date(now.toLocaleString('en-US'));
    const diff = (tzDate - localDate + now.getTimezoneOffset() * 60000) / 60000;
    const totalMins = Math.round(diff + (-now.getTimezoneOffset()));
    const sign = totalMins >= 0 ? '+' : '-';
    const absMins = Math.abs(totalMins);
    const hh = Math.floor(absMins / 60);
    const mm = absMins % 60;
    return `UTC${sign}${hh}${mm ? ':' + pad(mm) : ''}`;
  } catch { return 'UTC'; }
}

/** Get time parts for a given IANA timezone */
function getTimeInTz(tz) {
  try {
    const now = new Date();
    const parts = new Intl.DateTimeFormat('en-US', {
      timeZone: tz,
      hour: '2-digit', minute: '2-digit', second: '2-digit',
      hour12: true,
      weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
    }).formatToParts(now);

    const get = type => parts.find(p => p.type === type)?.value ?? '';
    return {
      hour:    get('hour'),
      minute:  get('minute'),
      second:  get('second'),
      ampm:    get('dayPeriod').toUpperCase(),
      weekday: get('weekday'),
      day:     get('day'),
      month:   get('month'),
      year:    get('year'),
    };
  } catch {
    return null;
  }
}

/** Get ISO week number */
function getWeekNumber(d) {
  const date = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
  date.setUTCDate(date.getUTCDate() + 4 - (date.getUTCDay() || 7));
  const yearStart = new Date(Date.UTC(date.getUTCFullYear(), 0, 1));
  return Math.ceil((((date - yearStart) / 86400000) + 1) / 7);
}

/* ══════════════════════════════════════════════════════════
   SPLASH SCREEN
══════════════════════════════════════════════════════════ */
(function initSplash() {
  const splash   = document.getElementById('splash-screen');
  const progress = document.getElementById('splash-progress');
  const shell    = document.getElementById('app-shell');

  let pct = 0;
  const interval = setInterval(() => {
    pct += 2.2;
    progress.style.width = Math.min(pct, 100) + '%';
    if (pct >= 100) {
      clearInterval(interval);
      setTimeout(hideSplash, 200);
    }
  }, 50);

  function hideSplash() {
    splash.classList.add('hide');
    shell.classList.add('visible');
    setTimeout(() => splash.classList.add('gone'), 650);
  }

  // Allow tap/click to skip splash
  splash.addEventListener('click', () => {
    clearInterval(interval);
    progress.style.width = '100%';
    setTimeout(hideSplash, 100);
  });
})();


/* ══════════════════════════════════════════════════════════
   DARK / LIGHT MODE TOGGLE
══════════════════════════════════════════════════════════ */
(function initTheme() {
  const btn   = document.getElementById('dark-mode-btn');
  const icon  = document.getElementById('theme-icon');
  const html  = document.documentElement;

  // Load saved preference
  const saved = localStorage.getItem('cloke_theme') || 'dark';
  html.setAttribute('data-theme', saved);
  icon.textContent = saved === 'dark' ? '☀️' : '🌙';

  btn.addEventListener('click', () => {
    const current = html.getAttribute('data-theme');
    const next    = current === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', next);
    icon.textContent = next === 'dark' ? '☀️' : '🌙';
    localStorage.setItem('cloke_theme', next);
  });
})();


/* ══════════════════════════════════════════════════════════
   AUDIO ENGINE  (Web Audio API — no external files needed)
══════════════════════════════════════════════════════════ */
const AudioEngine = (() => {
  let ctx = null;

  function getCtx() {
    if (!ctx) ctx = new (window.AudioContext || window.webkitAudioContext)();
    return ctx;
  }

  function playTone(frequency, type, duration, gainValue = 0.4) {
    const ac  = getCtx();
    const osc = ac.createOscillator();
    const gn  = ac.createGain();
    osc.connect(gn);
    gn.connect(ac.destination);
    osc.type      = type;
    osc.frequency.setValueAtTime(frequency, ac.currentTime);
    gn.gain.setValueAtTime(gainValue, ac.currentTime);
    gn.gain.exponentialRampToValueAtTime(0.001, ac.currentTime + duration);
    osc.start(ac.currentTime);
    osc.stop(ac.currentTime + duration);
  }

  const sounds = {
    bell:  () => {
      playTone(880, 'sine', 1.2, 0.4);
      setTimeout(() => playTone(660, 'sine', 1.0, 0.3), 300);
      setTimeout(() => playTone(880, 'sine', 1.2, 0.35), 700);
    },
    chime: () => {
      [523, 659, 784, 1047].forEach((f, i) =>
        setTimeout(() => playTone(f, 'sine', 0.8, 0.35), i * 200)
      );
    },
    beep:  () => {
      [0, 220, 440].forEach(delay =>
        setTimeout(() => playTone(1000, 'square', 0.18, 0.25), delay)
      );
    },
    alarm: () => {
      let toggle = false, count = 0;
      const iv = setInterval(() => {
        playTone(toggle ? 880 : 660, 'sawtooth', 0.15, 0.28);
        toggle = !toggle;
        if (++count >= 10) clearInterval(iv);
      }, 200);
    },
    none: () => {},
  };

  return { play: (name) => (sounds[name] || sounds.none)() };
})();


/* ══════════════════════════════════════════════════════════
   MODAL
══════════════════════════════════════════════════════════ */
const Modal = (() => {
  const overlay  = document.getElementById('alert-modal');
  const iconEl   = document.getElementById('modal-icon');
  const titleEl  = document.getElementById('modal-title');
  const msgEl    = document.getElementById('modal-message');
  const closeBtn = document.getElementById('modal-close-btn');

  let onCloseCb = null;

  closeBtn.addEventListener('click', () => {
    overlay.hidden = true;
    if (onCloseCb) { onCloseCb(); onCloseCb = null; }
  });
  overlay.addEventListener('click', e => {
    if (e.target === overlay) closeBtn.click();
  });

  return {
    show({ icon = '⏰', title = "Time's Up!", message = '', onClose } = {}) {
      iconEl.textContent  = icon;
      titleEl.textContent = title;
      msgEl.textContent   = message;
      onCloseCb           = onClose || null;
      overlay.hidden      = false;
    }
  };
})();


/* ══════════════════════════════════════════════════════════
   TAB SWITCHING
══════════════════════════════════════════════════════════ */
const tabBtns   = document.querySelectorAll('.tab-btn');
const tabPanels = document.querySelectorAll('.tab-panel');

tabBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const target = btn.dataset.tab;
    tabBtns.forEach(b => {
      b.classList.toggle('active', b === btn);
      b.setAttribute('aria-selected', b === btn ? 'true' : 'false');
    });
    tabPanels.forEach(p => {
      const isTarget = p.id === `panel-${target}`;
      p.classList.toggle('active', isTarget);
    });
  });
});


/* ══════════════════════════════════════════════════════════
   POPULATE TIMEZONE SELECTS
══════════════════════════════════════════════════════════ */
function buildTzOptions(selectEl, defaultTz) {
  selectEl.innerHTML = '';
  TZ_LIST.forEach(entry => {
    const opt = document.createElement('option');
    opt.value       = entry.tz;
    opt.textContent = `${entry.flag}  ${entry.country}`;
    if (entry.tz === defaultTz) opt.selected = true;
    selectEl.appendChild(opt);
  });
}

// Detect user's local timezone and pick closest match
const LOCAL_TZ = Intl.DateTimeFormat().resolvedOptions().timeZone;
function findMatchTz(tz) {
  return TZ_LIST.find(e => e.tz === tz) || TZ_LIST[0];
}

buildTzOptions(document.getElementById('clock-tz-select'), LOCAL_TZ);
buildTzOptions(document.getElementById('world-tz-select'), 'America/New_York');


/* ══════════════════════════════════════════════════════════
   DIGITAL CLOCK
══════════════════════════════════════════════════════════ */
const DigitalClock = (() => {
  const tzSelect     = document.getElementById('clock-tz-select');
  const timeEl       = document.getElementById('digital-time');
  const ampmEl       = document.getElementById('digital-ampm');
  const flagEl       = document.getElementById('clock-flag');
  const countryEl    = document.getElementById('clock-country-name');
  const offsetEl     = document.getElementById('clock-tz-offset');
  const dayNameEl    = document.getElementById('digital-day-name');
  const dateEl       = document.getElementById('digital-date');
  const monthEl      = document.getElementById('digital-month');
  const yearEl       = document.getElementById('digital-year');
  const weekNumEl    = document.getElementById('week-num');
  const weekDotsEl   = document.getElementById('week-dots');

  let currentTz = LOCAL_TZ;
  let colonVisible = true;

  function updateClock() {
    const t = getTimeInTz(currentTz);
    if (!t) return;

    // Time with blinking colon
    colonVisible = !colonVisible;
    const sep = colonVisible
      ? '<span class="colon">:</span>'
      : '<span class="colon" style="opacity:0.15">:</span>';

    timeEl.innerHTML = `${t.hour}${sep}${t.minute}${sep}${t.second}`;
    ampmEl.textContent = t.ampm;

    // Date details
    dayNameEl.textContent = t.weekday;
    dateEl.textContent    = t.day;
    monthEl.textContent   = t.month;
    yearEl.textContent    = t.year;

    // Week dots
    const now    = new Date();
    const todayDow = new Date(now.toLocaleString('en-US', { timeZone: currentTz })).getDay();
    const week   = getWeekNumber(new Date(now.toLocaleString('en-US', { timeZone: currentTz })));
    weekNumEl.textContent = `Week ${week}`;

    weekDotsEl.innerHTML = '';
    for (let i = 0; i < 7; i++) {
      const dot = document.createElement('div');
      dot.className = 'week-dot';
      if (i < todayDow) dot.classList.add('past');
      if (i === todayDow) dot.classList.add('today');
      weekDotsEl.appendChild(dot);
    }
  }

  function updateCountryBadge() {
    const entry = findMatchTz(currentTz);
    flagEl.textContent    = entry.flag;
    countryEl.textContent = entry.country;
    offsetEl.textContent  = getUTCOffset(currentTz);
  }

  tzSelect.addEventListener('change', () => {
    currentTz = tzSelect.value;
    updateCountryBadge();
    updateClock();
  });

  updateCountryBadge();
  updateClock();
  setInterval(updateClock, 1000);
})();


/* ══════════════════════════════════════════════════════════
   WORLD CLOCK
══════════════════════════════════════════════════════════ */
const WorldClock = (() => {
  const tzSelect = document.getElementById('world-tz-select');
  const addBtn   = document.getElementById('world-add-btn');
  const grid     = document.getElementById('world-clock-grid');
  const emptyMsg = document.getElementById('world-empty');

  // Load saved world clocks
  let savedClocks = JSON.parse(localStorage.getItem('cloke_world') || '[]');
  // Seed with a few popular ones on first load
  if (savedClocks.length === 0) {
    savedClocks = ['America/New_York', 'Europe/London', 'Asia/Tokyo'];
    localStorage.setItem('cloke_world', JSON.stringify(savedClocks));
  }

  // Get today's local date string for day comparison
  function localDateStr(tz) {
    return new Date().toLocaleDateString('en-US', { timeZone: tz, weekday:'short', month:'short', day:'numeric' });
  }

  function getDayDiff(tz) {
    const localDate  = new Date().toLocaleDateString('en-CA');
    const remoteDate = new Date().toLocaleDateString('en-CA', { timeZone: tz });
    if (remoteDate > localDate)  return +1;
    if (remoteDate < localDate)  return -1;
    return 0;
  }

  function renderCard(tzStr) {
    const entry = findMatchTz(tzStr);
    const t     = getTimeInTz(tzStr);
    if (!t) return null;

    const card = document.createElement('div');
    card.className = 'world-card';
    card.dataset.tz = tzStr;

    const dayDiff  = getDayDiff(tzStr);
    let dayBadge = '';
    if (dayDiff === +1) dayBadge = '<span class="world-day-badge tomorrow">+1 Day</span>';
    if (dayDiff === -1) dayBadge = '<span class="world-day-badge yesterday">-1 Day</span>';

    card.innerHTML = `
      <div class="world-card-offset">${getUTCOffset(tzStr)}</div>
      <div class="world-card-flag">${entry.flag}</div>
      <div class="world-card-country">${entry.country}</div>
      <div class="world-card-time">${t.hour}:${t.minute}:${t.second}</div>
      <div class="world-card-ampm">${t.ampm}</div>
      <div class="world-card-day">${t.weekday}${dayBadge}</div>
      <div class="world-card-date">${t.month} ${t.day}, ${t.year}</div>
      <button class="world-card-delete" data-tz="${tzStr}" aria-label="Remove ${entry.country}">✕</button>
    `;

    card.querySelector('.world-card-delete').addEventListener('click', (e) => {
      e.stopPropagation();
      savedClocks = savedClocks.filter(s => s !== tzStr);
      localStorage.setItem('cloke_world', JSON.stringify(savedClocks));
      renderAll();
    });

    return card;
  }

  function renderAll() {
    // Remove all existing cards (keep emptyMsg)
    [...grid.querySelectorAll('.world-card')].forEach(c => c.remove());

    if (savedClocks.length === 0) {
      emptyMsg.style.display = '';
      return;
    }
    emptyMsg.style.display = 'none';
    savedClocks.forEach(tz => {
      const card = renderCard(tz);
      if (card) grid.appendChild(card);
    });
  }

  function updateAllCards() {
    savedClocks.forEach(tzStr => {
      const card = grid.querySelector(`.world-card[data-tz="${tzStr}"]`);
      if (!card) return;
      const t     = getTimeInTz(tzStr);
      if (!t) return;
      const dayDiff = getDayDiff(tzStr);
      let dayBadge = '';
      if (dayDiff === +1) dayBadge = '<span class="world-day-badge tomorrow">+1 Day</span>';
      if (dayDiff === -1) dayBadge = '<span class="world-day-badge yesterday">-1 Day</span>';

      const timeEl   = card.querySelector('.world-card-time');
      const ampmEl   = card.querySelector('.world-card-ampm');
      const dayEl    = card.querySelector('.world-card-day');
      const dateEl   = card.querySelector('.world-card-date');
      if (timeEl) timeEl.textContent = `${t.hour}:${t.minute}:${t.second}`;
      if (ampmEl) ampmEl.textContent = t.ampm;
      if (dayEl)  dayEl.innerHTML    = `${t.weekday}${dayBadge}`;
      if (dateEl) dateEl.textContent = `${t.month} ${t.day}, ${t.year}`;
    });
  }

  addBtn.addEventListener('click', () => {
    const tz = tzSelect.value;
    if (!tz) return;
    if (savedClocks.includes(tz)) {
      // Flash the existing card
      const existing = grid.querySelector(`.world-card[data-tz="${tz}"]`);
      if (existing) {
        existing.style.borderColor = 'var(--accent-secondary)';
        setTimeout(() => existing.style.borderColor = '', 900);
      }
      return;
    }
    savedClocks.push(tz);
    localStorage.setItem('cloke_world', JSON.stringify(savedClocks));
    renderAll();
  });

  // Initial render
  renderAll();

  // Live update every second
  setInterval(updateAllCards, 1000);
})();


/* ══════════════════════════════════════════════════════════
   SVG GRADIENT PATCH FOR TIMER RING
══════════════════════════════════════════════════════════ */
(function patchSvgGradient() {
  const svg  = document.querySelector('.ring-svg');
  const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
  const grad = document.createElementNS('http://www.w3.org/2000/svg', 'linearGradient');
  grad.id = 'ring-gradient';
  grad.setAttribute('x1','0%'); grad.setAttribute('y1','0%');
  grad.setAttribute('x2','100%'); grad.setAttribute('y2','100%');
  const s1 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
  s1.setAttribute('offset','0%'); s1.setAttribute('stop-color','#7c6ef6');
  const s2 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
  s2.setAttribute('offset','100%'); s2.setAttribute('stop-color','#5be8c8');
  grad.appendChild(s1); grad.appendChild(s2); defs.appendChild(grad);
  svg.insertBefore(defs, svg.firstChild);
  document.getElementById('timer-ring-fg').setAttribute('stroke','url(#ring-gradient)');
})();


/* ══════════════════════════════════════════════════════════
   TIMER
══════════════════════════════════════════════════════════ */
const Timer = (() => {
  const display      = document.getElementById('timer-display');
  const statusLabel  = document.getElementById('timer-status-label');
  const ringFg       = document.getElementById('timer-ring-fg');
  const hoursInput   = document.getElementById('timer-hours');
  const minutesInput = document.getElementById('timer-minutes');
  const secondsInput = document.getElementById('timer-seconds');
  const startBtn     = document.getElementById('timer-start-btn');
  const pauseBtn     = document.getElementById('timer-pause-btn');
  const resetBtn     = document.getElementById('timer-reset-btn');
  const soundSelect  = document.getElementById('timer-sound');
  const recentList   = document.getElementById('timer-recent-list');
  const clearBtn     = document.getElementById('timer-clear-recent');
  const inputsWrap   = document.getElementById('timer-inputs');

  const CIRCUMFERENCE = 2 * Math.PI * 96; // ~603.19

  let totalDuration = 0;
  let remaining     = 0;
  let intervalId    = null;
  let isRunning     = false;
  let recentTimers  = JSON.parse(localStorage.getItem('cloke_recent') || '[]');

  function setRingProgress(ratio) {
    const offset = CIRCUMFERENCE * (1 - Math.max(0, Math.min(1, ratio)));
    ringFg.style.strokeDashoffset = offset;
  }

  function updateDisplay(seconds) {
    display.textContent = formatHMS(seconds);
    const ratio = totalDuration > 0 ? seconds / totalDuration : 1;
    setRingProgress(ratio);
  }

  function readInputSeconds() {
    const h = parseInt(hoursInput.value)   || 0;
    const m = parseInt(minutesInput.value) || 0;
    const s = parseInt(secondsInput.value) || 0;
    return h * 3600 + m * 60 + s;
  }

  function start() {
    if (isRunning) return;
    if (remaining === 0) {
      const total = readInputSeconds();
      if (total <= 0) { statusLabel.textContent = 'Set a time first!'; return; }
      totalDuration = total;
      remaining     = total;
      saveRecent(total);
      inputsWrap.style.pointerEvents = 'none';
      inputsWrap.style.opacity = '0.4';
    }
    isRunning = true;
    statusLabel.textContent = 'Running…';
    startBtn.disabled = true;
    pauseBtn.disabled = false;
    startBtn.textContent = '▶ Resume';
    intervalId = setInterval(() => {
      if (remaining <= 0) { finish(); return; }
      remaining--;
      updateDisplay(remaining);
      if (remaining === 0) finish();
    }, 1000);
    updateDisplay(remaining);
  }

  function pause() {
    if (!isRunning) return;
    isRunning = false;
    clearInterval(intervalId);
    statusLabel.textContent = 'Paused';
    startBtn.disabled = false;
    pauseBtn.disabled = true;
  }

  function reset() {
    clearInterval(intervalId);
    isRunning     = false;
    remaining     = 0;
    totalDuration = 0;
    updateDisplay(0);
    setRingProgress(1);
    statusLabel.textContent      = 'Ready';
    startBtn.disabled            = false;
    pauseBtn.disabled            = true;
    startBtn.textContent         = '▶ Start';
    inputsWrap.style.pointerEvents = '';
    inputsWrap.style.opacity       = '';
  }

  function finish() {
    clearInterval(intervalId);
    isRunning = false;
    remaining = 0;
    updateDisplay(0);
    setRingProgress(0);
    statusLabel.textContent = '✓ Done!';
    startBtn.disabled       = false;
    pauseBtn.disabled       = true;
    startBtn.textContent    = '▶ Start';
    inputsWrap.style.pointerEvents = '';
    inputsWrap.style.opacity       = '';
    AudioEngine.play(soundSelect.value);
    Modal.show({
      icon: '⏰',
      title: "Time's Up!",
      message: `Your timer (${formatHMS(totalDuration)}) has completed.`,
    });
  }

  function saveRecent(seconds) {
    const label = formatHMS(seconds);
    recentTimers = recentTimers.filter(t => t !== label);
    recentTimers.unshift(label);
    if (recentTimers.length > 8) recentTimers.pop();
    localStorage.setItem('cloke_recent', JSON.stringify(recentTimers));
    renderRecent();
  }

  function renderRecent() {
    recentList.innerHTML = '';
    if (recentTimers.length === 0) {
      recentList.innerHTML = '<li class="recent-empty">No recent timers yet.</li>';
      return;
    }
    recentTimers.forEach(label => {
      const li = document.createElement('li');
      li.className = 'recent-item';
      li.setAttribute('role','button'); li.setAttribute('tabindex','0');
      li.setAttribute('aria-label', `Use recent timer ${label}`);
      li.innerHTML = `
        <span class="recent-item-time">${label}</span>
        <span class="recent-item-use">↩ Use</span>
      `;
      li.addEventListener('click', () => loadRecent(label));
      li.addEventListener('keydown', e => { if (e.key==='Enter'||e.key===' ') loadRecent(label); });
      recentList.appendChild(li);
    });
  }

  function loadRecent(label) {
    reset();
    const parts = label.split(':').map(Number);
    hoursInput.value   = parts[0] || 0;
    minutesInput.value = parts[1] || 0;
    secondsInput.value = parts[2] || 0;
    statusLabel.textContent = 'Ready — press Start';
  }

  startBtn.addEventListener('click', start);
  pauseBtn.addEventListener('click', pause);
  resetBtn.addEventListener('click', reset);
  clearBtn.addEventListener('click', () => {
    recentTimers = [];
    localStorage.removeItem('cloke_recent');
    renderRecent();
  });

  [hoursInput, minutesInput, secondsInput].forEach(inp => {
    inp.addEventListener('change', () => {
      let v = parseInt(inp.value) || 0;
      v = Math.max(0, Math.min(parseInt(inp.max), v));
      inp.value = v;
    });
  });

  renderRecent();
  setRingProgress(1);
})();


/* ══════════════════════════════════════════════════════════
   STOPWATCH
══════════════════════════════════════════════════════════ */
const Stopwatch = (() => {
  const display   = document.getElementById('sw-display');
  const msDisplay = document.getElementById('sw-ms-display');
  const startBtn  = document.getElementById('sw-start-btn');
  const pauseBtn  = document.getElementById('sw-pause-btn');
  const lapBtn    = document.getElementById('sw-lap-btn');
  const resetBtn  = document.getElementById('sw-reset-btn');
  const lapTbody  = document.getElementById('lap-tbody');
  const lapBadge  = document.getElementById('lap-count-badge');

  let startTime   = 0;
  let elapsed     = 0;
  let rafId       = null;
  let isRunning   = false;
  let laps        = [];
  let lastLapTotal = 0;

  function tick() {
    const total = elapsed + (Date.now() - startTime);
    const f     = formatMs(total);
    display.textContent   = f.hms;
    msDisplay.textContent = f.ms;
    rafId = requestAnimationFrame(tick);
  }

  function start() {
    if (isRunning) return;
    startTime = Date.now();
    isRunning = true;
    startBtn.disabled = true;
    pauseBtn.disabled = false;
    lapBtn.disabled   = false;
    rafId = requestAnimationFrame(tick);
  }

  function pause() {
    if (!isRunning) return;
    elapsed  += Date.now() - startTime;
    isRunning = false;
    cancelAnimationFrame(rafId);
    startBtn.disabled = false;
    pauseBtn.disabled = true;
    lapBtn.disabled   = true;
  }

  function reset() {
    cancelAnimationFrame(rafId);
    elapsed       = 0;
    isRunning     = false;
    lastLapTotal  = 0;
    laps          = [];
    display.textContent   = '00:00:00';
    msDisplay.textContent = '.000';
    startBtn.disabled = false;
    pauseBtn.disabled = true;
    lapBtn.disabled   = true;
    lapTbody.innerHTML = '<tr class="lap-empty-row"><td colspan="4">No laps recorded yet.</td></tr>';
    lapBadge.textContent = '0 laps';
  }

  function recordLap() {
    if (!isRunning) return;
    const total   = elapsed + (Date.now() - startTime);
    const lapTime = total - lastLapTotal;
    lastLapTotal  = total;
    laps.push({ lapTime, total });
    updateLapTable();
  }

  function updateLapTable() {
    lapTbody.innerHTML = '';
    lapBadge.textContent = `${laps.length} lap${laps.length !== 1 ? 's' : ''}`;
    const lapTimes = laps.map(l => l.lapTime);
    const best  = Math.min(...lapTimes);
    const worst = Math.max(...lapTimes);
    [...laps].reverse().forEach((lap, ri) => {
      const lapNum  = laps.length - ri;
      const isBest  = laps.length > 1 && lap.lapTime === best;
      const isWorst = laps.length > 1 && lap.lapTime === worst;
      const tr = document.createElement('tr');
      if (isBest)  tr.classList.add('lap-best');
      if (isWorst) tr.classList.add('lap-worst');
      const fLap   = formatMs(lap.lapTime);
      const fTotal = formatMs(lap.total);
      let badge = '';
      if (isBest)  badge = '<span class="lap-badge lap-badge-best">Best</span>';
      if (isWorst) badge = '<span class="lap-badge lap-badge-worst">Slow</span>';
      tr.innerHTML = `
        <td>${pad(lapNum)}</td>
        <td>${fTotal.hms}${fTotal.ms}</td>
        <td>${fLap.hms}${fLap.ms}</td>
        <td>${badge}</td>
      `;
      lapTbody.appendChild(tr);
    });
  }

  startBtn.addEventListener('click', start);
  pauseBtn.addEventListener('click', pause);
  lapBtn.addEventListener('click',   recordLap);
  resetBtn.addEventListener('click', reset);
})();


/* ══════════════════════════════════════════════════════════
   ALARM
══════════════════════════════════════════════════════════ */
const Alarm = (() => {
  const liveClock   = document.getElementById('live-clock');
  const liveDateEl  = document.getElementById('live-date');
  const timeInput   = document.getElementById('alarm-time');
  const labelInput  = document.getElementById('alarm-label-input');
  const soundSelect = document.getElementById('alarm-sound-select');
  const addBtn      = document.getElementById('add-alarm-btn');
  const alarmList   = document.getElementById('alarm-list');

  let alarms  = JSON.parse(localStorage.getItem('cloke_alarms') || '[]');
  let ringing = new Set();

  function tickClock() {
    const now = new Date();
    const h   = pad(now.getHours());
    const m   = pad(now.getMinutes());
    const s   = pad(now.getSeconds());
    liveClock.textContent = `${h}:${m}:${s}`;
    liveDateEl.textContent = now.toLocaleDateString('en-US', {
      weekday:'long', year:'numeric', month:'long', day:'numeric'
    });
    const hhmm = `${h}:${m}`;
    if (s === '00') {
      alarms.forEach(al => {
        if (al.enabled && al.time === hhmm && !ringing.has(al.id)) {
          triggerAlarm(al);
        }
      });
    }
  }

  setInterval(tickClock, 1000);
  tickClock();

  function addAlarm() {
    const timeVal = timeInput.value;
    if (!timeVal) { timeInput.focus(); return; }
    const alarm = {
      id:      Date.now(),
      time:    timeVal,
      label:   labelInput.value.trim() || 'Alarm',
      sound:   soundSelect.value,
      enabled: true,
    };
    alarms.push(alarm);
    saveAlarms();
    renderAlarms();
    timeInput.value  = '';
    labelInput.value = '';
  }

  function triggerAlarm(al) {
    ringing.add(al.id);
    AudioEngine.play(al.sound);
    Modal.show({
      icon: '🔔',
      title: al.label,
      message: `It's ${al.time}! ${al.label}`,
      onClose: () => {
        ringing.delete(al.id);
        const item = document.querySelector(`[data-alarm-id="${al.id}"]`);
        if (item) item.classList.remove('alarm-ringing');
      }
    });
    const item = document.querySelector(`[data-alarm-id="${al.id}"]`);
    if (item) item.classList.add('alarm-ringing');
  }

  function renderAlarms() {
    alarmList.innerHTML = '';
    if (alarms.length === 0) {
      alarmList.innerHTML = '<li class="alarm-empty">No alarms set. Add one above!</li>';
      return;
    }
    const sorted = [...alarms].sort((a, b) => a.time.localeCompare(b.time));
    sorted.forEach(al => {
      const li = document.createElement('li');
      li.className = `alarm-item ${al.enabled ? 'alarm-active' : 'alarm-inactive'}`;
      li.setAttribute('data-alarm-id', al.id);
      const [hh, mm] = al.time.split(':').map(Number);
      const period      = hh >= 12 ? 'PM' : 'AM';
      const hh12        = hh % 12 || 12;
      const displayTime = `${pad(hh12)}:${pad(mm)} ${period}`;
      const soundLabels = { bell:'🔔 Bell', chime:'🎵 Chime', beep:'📡 Beep', alarm:'🚨 Alarm', none:'🔇 Silent' };
      li.innerHTML = `
        <label class="alarm-toggle" aria-label="Toggle alarm ${al.label}">
          <input type="checkbox" ${al.enabled ? 'checked' : ''} data-id="${al.id}" aria-label="Enable alarm" />
        </label>
        <div class="alarm-info">
          <div class="alarm-time-text">${displayTime}</div>
          <div class="alarm-label-text">${al.label}</div>
          <div class="alarm-sound-badge">${soundLabels[al.sound] || ''}</div>
        </div>
        <button class="alarm-delete-btn" data-id="${al.id}" aria-label="Delete alarm ${al.label}" title="Delete">✕</button>
      `;
      li.querySelector('input[type="checkbox"]').addEventListener('change', function() {
        const target = alarms.find(a => a.id === parseInt(this.dataset.id));
        if (target) {
          target.enabled = this.checked;
          saveAlarms();
          li.className = `alarm-item ${target.enabled ? 'alarm-active' : 'alarm-inactive'}`;
        }
      });
      li.querySelector('.alarm-delete-btn').addEventListener('click', function() {
        const id = parseInt(this.dataset.id);
        alarms   = alarms.filter(a => a.id !== id);
        ringing.delete(id);
        saveAlarms();
        renderAlarms();
      });
      alarmList.appendChild(li);
    });
  }

  function saveAlarms() {
    localStorage.setItem('cloke_alarms', JSON.stringify(alarms));
  }

  addBtn.addEventListener('click', addAlarm);
  timeInput.addEventListener('keydown', e => { if (e.key === 'Enter') addAlarm(); });
  renderAlarms();
})();
