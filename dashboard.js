// ============================================================
// KASHIF LIVE DASHBOARD — dashboard.js
// Features:
// 1. Firebase Live Status (Online/Offline heartbeat)
// 2. Fiverr Availability (Firebase controlled)
// 3. BTC + INJ Live Prices (CoinGecko API, 60s cache)
// 4. GitHub Latest Commit (GitHub REST API)
// ============================================================

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getDatabase, ref, onValue } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js";

// ============================================================
// FIREBASE CONFIG
// ============================================================
const firebaseConfig = {
  apiKey:            "AIzaSyCLJ0NBZ4RsdUiW_P4jUddQzUXvktmdMhc",
  authDomain:        "kashif-portfolio-17481.firebaseapp.com",
  databaseURL:       "https://kashif-portfolio-17481-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId:         "kashif-portfolio-17481",
  storageBucket:     "kashif-portfolio-17481.firebasestorage.app",
  messagingSenderId: "581904807005",
  appId:             "1:581904807005:web:5817faf37fddb0a8e909b4",
  measurementId:     "G-BTLE2QG975"
};

const app = initializeApp(firebaseConfig);
const db  = getDatabase(app);


// ============================================================
// INJECT DASHBOARD STYLES
// ============================================================
const css = document.createElement('style');
css.textContent = `
  #live-dashboard {
    max-width: 1100px;
    margin: 80px auto;
    padding: 0 20px;
  }

  .dashboard-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
    gap: 24px;
    margin-top: 30px;
  }

  .dash-card {
    background: white;
    border-radius: 24px;
    padding: 28px;
    box-shadow: 0 10px 30px -5px rgba(0,0,0,0.08);
    border: 2px solid transparent;
    transition: transform 0.4s cubic-bezier(0.23,1,0.32,1),
                box-shadow 0.4s ease, border-color 0.4s ease;
    position: relative;
    overflow: hidden;
  }

  .dash-card::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 3px;
    background: linear-gradient(to right, #4361ee, #f72585);
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  .dash-card:hover { transform: translateY(-6px); box-shadow: 0 20px 50px -8px rgba(67,97,238,0.2); border-color: rgba(67,97,238,0.15); }
  .dash-card:hover::before { opacity: 1; }
  .dash-card--wide { grid-column: 1 / -1; }

  .dash-card__header { display: flex; align-items: center; gap: 10px; margin-bottom: 18px; }
  .dash-icon { font-size: 1.4rem; }
  .dash-label { font-size: 0.78rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.08em; color: #a0aec0; }
  .dash-card__body { display: flex; flex-direction: column; gap: 8px; }

  /* STATUS */
  .status-pulse-wrapper { display: flex; align-items: center; gap: 12px; }
  .status-dot { width: 14px; height: 14px; border-radius: 50%; background: #a0aec0; flex-shrink: 0; transition: background 0.5s ease; }
  .status-dot.online  { background: #48bb78; box-shadow: 0 0 0 0 rgba(72,187,120,0.7); animation: statusPulse 2s infinite; }
  .status-dot.offline { background: #fc8181; box-shadow: none; animation: none; }
  @keyframes statusPulse {
    0%   { box-shadow: 0 0 0 0 rgba(72,187,120,0.7); }
    70%  { box-shadow: 0 0 0 10px rgba(72,187,120,0); }
    100% { box-shadow: 0 0 0 0 rgba(72,187,120,0); }
  }
  .status-text { font-size: 1.4rem; font-weight: 800; color: #1a1a2e; }
  .status-sub  { font-size: 0.82rem; color: #a0aec0; margin-top: 2px; }

  /* FIVERR */
  .fiverr-status { font-size: 1.2rem; font-weight: 800; color: #1a1a2e; }
  .fiverr-status.available { color: #1dbf73; }
  .fiverr-status.busy      { color: #fc8181; }
  .dash-hire-btn {
    display: inline-block; margin-top: 10px;
    background: #1dbf73; color: white;
    padding: 8px 18px; border-radius: 50px;
    font-size: 0.85rem; font-weight: 700; text-decoration: none;
    transition: 0.3s; width: fit-content;
  }
  .dash-hire-btn:hover { background: #19a463; transform: translateY(-2px); }

  /* CRYPTO */
  .crypto-price  { font-size: 1.8rem; font-weight: 800; color: #1a1a2e; line-height: 1; }
  .crypto-change { font-size: 0.9rem; font-weight: 700; border-radius: 8px; padding: 3px 10px; width: fit-content; }
  .crypto-change.positive { background: rgba(72,187,120,0.12); color: #38a169; }
  .crypto-change.negative { background: rgba(252,129,129,0.12); color: #e53e3e; }

  /* GITHUB */
  .github-commit { font-size: 1rem; font-weight: 700; color: #1a1a2e; line-height: 1.5; }
  .github-meta   { font-size: 0.82rem; color: #a0aec0; display: flex; gap: 16px; flex-wrap: wrap; margin-top: 4px; }
  .dash-github-btn {
    display: inline-block; margin-top: 10px;
    background: #1a1a2e; color: white;
    padding: 8px 18px; border-radius: 50px;
    font-size: 0.85rem; font-weight: 700; text-decoration: none;
    transition: 0.3s; width: fit-content;
  }
  .dash-github-btn:hover { background: #4361ee; transform: translateY(-2px); }
`;
document.head.appendChild(css);


// ============================================================
// INJECT DASHBOARD HTML
// ============================================================
(function injectHTML() {
  const contactSection = document.getElementById('contact');
  if (!contactSection) return;

  const section = document.createElement('section');
  section.id        = 'live-dashboard';
  section.className = 'fade-in';
  section.innerHTML = `
    <h2 class="section__title">Live Command Center</h2>
    <p style="text-align:center;color:var(--text-gray);margin-top:-10px;margin-bottom:30px;font-size:0.95rem;">Real-time data • Updates automatically</p>

    <div class="dashboard-grid">

      <div class="dash-card">
        <div class="dash-card__header">
          <span class="dash-icon">👤</span>
          <span class="dash-label">Developer Status</span>
        </div>
        <div class="dash-card__body">
          <div class="status-pulse-wrapper">
            <span class="status-dot" id="status-dot"></span>
            <span class="status-text" id="status-text">Checking...</span>
          </div>
          <div class="status-sub" id="status-sub">Loading...</div>
        </div>
      </div>

      <div class="dash-card">
        <div class="dash-card__header">
          <span class="dash-icon">⚡</span>
          <span class="dash-label">Fiverr Availability</span>
        </div>
        <div class="dash-card__body">
          <div class="fiverr-status" id="fiverr-status">Loading...</div>
          <div class="status-sub" id="fiverr-sub">Checking availability...</div>
          <a href="https://www.fiverr.com/s/WEW18rx" target="_blank" class="dash-hire-btn">Hire Me on Fiverr →</a>
        </div>
      </div>

      <div class="dash-card">
        <div class="dash-card__header">
          <span class="dash-icon">₿</span>
          <span class="dash-label">Bitcoin (BTC)</span>
        </div>
        <div class="dash-card__body">
          <div class="crypto-price" id="btc-price">Loading...</div>
          <div class="crypto-change" id="btc-change">—</div>
          <div class="status-sub">Updates every 60s</div>
        </div>
      </div>

      <div class="dash-card">
        <div class="dash-card__header">
          <span class="dash-icon">🔗</span>
          <span class="dash-label">Injective (INJ)</span>
        </div>
        <div class="dash-card__body">
          <div class="crypto-price" id="inj-price">Loading...</div>
          <div class="crypto-change" id="inj-change">—</div>
          <div class="status-sub">Updates every 60s</div>
        </div>
      </div>

      <div class="dash-card dash-card--wide">
        <div class="dash-card__header">
          <span class="dash-icon">💻</span>
          <span class="dash-label">Latest GitHub Activity</span>
        </div>
        <div class="dash-card__body">
          <div class="github-commit" id="github-commit">Fetching latest commit...</div>
          <div class="github-meta"   id="github-meta">—</div>
          <a href="https://github.com/kashif-webdeveloper" target="_blank" class="dash-github-btn">View GitHub Profile →</a>
        </div>
      </div>

    </div>
  `;

  contactSection.parentNode.insertBefore(section, contactSection);

  // Wire fade-in observer (defined in script.js)
  if (typeof observer !== 'undefined') observer.observe(section);
})();


// ============================================================
// 1. FIREBASE — LIVE OWNER STATUS
// ============================================================
onValue(ref(db, 'presence/status'), (snapshot) => {
  const dot  = document.getElementById('status-dot');
  const text = document.getElementById('status-text');
  const sub  = document.getElementById('status-sub');
  if (!dot || !text || !sub) return;

  const isOnline = snapshot.val() === 'online';
  dot.className    = 'status-dot ' + (isOnline ? 'online' : 'offline');
  text.textContent = isOnline ? 'Online Now'      : 'Currently Away';
  sub.textContent  = isOnline
    ? 'Kashif is active — great time to reach out!'
    : 'Usually responds within a few hours';
});


// ============================================================
// 2. FIREBASE — FIVERR AVAILABILITY
// ============================================================
onValue(ref(db, 'fiverr/available'), (snapshot) => {
  const el  = document.getElementById('fiverr-status');
  const sub = document.getElementById('fiverr-sub');
  if (!el || !sub) return;

  const available = snapshot.val();
  if (available === false) {
    el.textContent  = '🔴 Currently Busy';
    el.className    = 'fiverr-status busy';
    sub.textContent = 'Check back soon for availability';
  } else {
    el.textContent  = '✅ Available for Orders';
    el.className    = 'fiverr-status available';
    sub.textContent = 'Accepting new projects now';
  }
});


// ============================================================
// 3. COINGECKO — CRYPTO PRICES (60s cache)
// ============================================================
(function initCrypto() {
  const CACHE_KEY = 'kd_crypto_v1';
  const TTL       = 60000;

  function fmt(n)  { return '$' + n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }); }
  function chg(n)  { return (n >= 0 ? '+' : '') + n.toFixed(2) + '%'; }

  function paint(btc, inj) {
    const bp = document.getElementById('btc-price');
    const bc = document.getElementById('btc-change');
    const ip = document.getElementById('inj-price');
    const ic = document.getElementById('inj-change');

    if (bp) bp.textContent = fmt(btc.usd);
    if (ip) ip.textContent = fmt(inj.usd);

    if (bc) {
      bc.textContent = chg(btc.usd_24h_change);
      bc.className   = 'crypto-change ' + (btc.usd_24h_change >= 0 ? 'positive' : 'negative');
    }
    if (ic) {
      ic.textContent = chg(inj.usd_24h_change);
      ic.className   = 'crypto-change ' + (inj.usd_24h_change >= 0 ? 'positive' : 'negative');
    }
  }

  async function fetch_prices() {
    try {
      const cached = JSON.parse(sessionStorage.getItem(CACHE_KEY));
      if (cached && Date.now() - cached.ts < TTL) { paint(cached.btc, cached.inj); return; }
    } catch(e) {}

    try {
      const r    = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,injective-protocol&vs_currencies=usd&include_24hr_change=true');
      const data = await r.json();
      const btc  = { usd: data.bitcoin.usd, usd_24h_change: data.bitcoin.usd_24h_change };
      const inj  = { usd: data['injective-protocol'].usd, usd_24h_change: data['injective-protocol'].usd_24h_change };
      sessionStorage.setItem(CACHE_KEY, JSON.stringify({ ts: Date.now(), btc, inj }));
      paint(btc, inj);
    } catch(e) {
      ['btc-price','inj-price'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.textContent = 'Unavailable';
      });
    }
  }

  fetch_prices();
  setInterval(fetch_prices, TTL);
})();


// ============================================================
// 4. GITHUB API — LATEST COMMIT
// ============================================================
(function initGitHub() {
  function timeAgo(date) {
    const s = Math.floor((Date.now() - date) / 1000);
    if (s < 60)    return s + 's ago';
    if (s < 3600)  return Math.floor(s/60) + 'm ago';
    if (s < 86400) return Math.floor(s/3600) + 'h ago';
    return Math.floor(s/86400) + 'd ago';
  }

  async function fetchCommit() {
    try {
      const r      = await fetch('https://api.github.com/users/kashif-webdeveloper/events/public');
      const events = await r.json();
      const push   = events.find(e => e.type === 'PushEvent' && e.payload?.commits?.length > 0);

      const ce = document.getElementById('github-commit');
      const me = document.getElementById('github-meta');
      if (!ce || !me) return;

      if (push) {
        const commit  = push.payload.commits[push.payload.commits.length - 1];
        const repo    = push.repo.name.replace('kashif-webdeveloper/', '');
        const branch  = push.payload.ref?.replace('refs/heads/', '') || 'main';
        ce.textContent = `"${commit.message}"`;
        me.innerHTML   = `<span>📁 ${repo}</span><span>🌿 ${branch}</span><span>🕐 ${timeAgo(new Date(push.created_at))}</span>`;
      } else {
        ce.textContent = 'No recent public commits found';
        me.textContent = 'Private repos may not appear here';
      }
    } catch(e) {
      const ce = document.getElementById('github-commit');
      if (ce) ce.textContent = 'Could not load GitHub activity';
    }
  }

  fetchCommit();
  setInterval(fetchCommit, 5 * 60 * 1000);
})();


// ============================================================
// 5. LIVE LOCAL CLOCK (Visitor's Timezone)
// ============================================================
(function initLiveClock() {
  // Add clock CSS
  const clockCSS = document.createElement('style');
  clockCSS.textContent = `
    .clock-time {
      font-size: 2.4rem;
      font-weight: 800;
      color: #1a1a2e;
      letter-spacing: 0.04em;
      font-variant-numeric: tabular-nums;
      line-height: 1;
      background: linear-gradient(135deg, #4361ee, #7209b7);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }
    .clock-date {
      font-size: 0.95rem;
      font-weight: 700;
      color: #1a1a2e;
      margin-top: 6px;
    }
  `;
  document.head.appendChild(clockCSS);

  // Add clock card to dashboard grid BEFORE github card
  const githubCard = document.querySelector('.dash-card--wide');
  if (!githubCard) return;

  const clockCard = document.createElement('div');
  clockCard.className = 'dash-card';
  clockCard.innerHTML = `
    <div class="dash-card__header">
      <span class="dash-icon">🕐</span>
      <span class="dash-label">Your Local Time</span>
    </div>
    <div class="dash-card__body">
      <div class="clock-time" id="clock-time">--:--:--</div>
      <div class="clock-date" id="clock-date">Loading...</div>
      <div class="status-sub" id="clock-tz">Detecting timezone...</div>
    </div>
  `;
  githubCard.parentNode.insertBefore(clockCard, githubCard);

  function updateClock() {
    const now = new Date();

    // Format time HH:MM:SS with leading zeros
    const hh = String(now.getHours()).padStart(2, '0');
    const mm = String(now.getMinutes()).padStart(2, '0');
    const ss = String(now.getSeconds()).padStart(2, '0');
    const timeStr = `${hh}:${mm}:${ss}`;

    // Format date — e.g. "Saturday, March 14, 2026"
    const dateStr = now.toLocaleDateString('en-US', {
      weekday: 'long',
      year:    'numeric',
      month:   'long',
      day:     'numeric'
    });

    // Get timezone name — e.g. "PKT", "EST", "GMT+5"
    const tzName = Intl.DateTimeFormat('en-US', { timeZoneName: 'short' })
      .formatToParts(now)
      .find(p => p.type === 'timeZoneName')?.value || 'Local';

    const timeEl = document.getElementById('clock-time');
    const dateEl = document.getElementById('clock-date');
    const tzEl   = document.getElementById('clock-tz');

    if (timeEl) timeEl.textContent = timeStr;
    if (dateEl) dateEl.textContent = dateStr;
    if (tzEl)   tzEl.textContent   = `📍 ${tzName} — ${Intl.DateTimeFormat().resolvedOptions().timeZone}`;
  }

  // Run immediately then every second
  updateClock();
  setInterval(updateClock, 1000);
})();
