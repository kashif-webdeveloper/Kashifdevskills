// ============================================================
// KASHIF LIVE DASHBOARD — dashboard.js
// Features:
// 1. Firebase Live Status (Online/Offline heartbeat)
// 2. Fiverr Availability (Firebase controlled)
// 3. BTC + DOGE Live Prices (CoinGecko API, 60s cache)
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
          <span class="dash-icon">🐕</span>
          <span class="dash-label">Dogecoin (DOGE)</span>
        </div>
        <div class="dash-card__body">
          <div class="crypto-price" id="doge-price">Loading...</div>
          <div class="crypto-change" id="doge-change">—</div>
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

  function paint(btc, doge) {
    const bp = document.getElementById('btc-price');
    const bc = document.getElementById('btc-change');
    const ip = document.getElementById('doge-price');
    const ic = document.getElementById('doge-change');

    if (bp) bp.textContent = fmt(btc.usd);
    if (ip) ip.textContent = fmt(doge.usd);

    if (bc) {
      bc.textContent = chg(btc.usd_24h_change);
      bc.className   = 'crypto-change ' + (btc.usd_24h_change >= 0 ? 'positive' : 'negative');
    }
    if (ic) {
      ic.textContent = chg(doge.usd_24h_change);
      ic.className   = 'crypto-change ' + (doge.usd_24h_change >= 0 ? 'positive' : 'negative');
    }
  }

  async function fetch_prices() {
    try {
      const cached = JSON.parse(sessionStorage.getItem(CACHE_KEY));
      if (cached && Date.now() - cached.ts < TTL) { paint(cached.btc, cached.doge); return; }
    } catch(e) {}

    try {
      const r    = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,dogecoin&vs_currencies=usd&include_24hr_change=true');
      const data = await r.json();
      const btc  = { usd: data.bitcoin.usd, usd_24h_change: data.bitcoin.usd_24h_change };
      const doge = { usd: data['dogecoin'].usd, usd_24h_change: data['dogecoin'].usd_24h_change };
      sessionStorage.setItem(CACHE_KEY, JSON.stringify({ ts: Date.now(), btc, doge }));
      paint(btc, doge);
    } catch(e) {
      ['btc-price','doge-price'].forEach(id => {
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
// 6. WEATHER — Visitor's Local Weather (Open-Meteo + ip-api)
// No API key needed. No location popup. IP-based detection.
// ============================================================
(function initWeather() {
  // Weather code descriptions
  const WMO = {
    0:'Clear Sky',1:'Mainly Clear',2:'Partly Cloudy',3:'Overcast',
    45:'Foggy',48:'Icy Fog',
    51:'Light Drizzle',53:'Drizzle',55:'Heavy Drizzle',
    61:'Light Rain',63:'Rain',65:'Heavy Rain',
    71:'Light Snow',73:'Snow',75:'Heavy Snow',
    80:'Light Showers',81:'Showers',82:'Heavy Showers',
    95:'Thunderstorm',96:'Thunderstorm & Hail',99:'Heavy Thunderstorm'
  };

  const WMO_ICON = {
    0:'☀️',1:'🌤️',2:'⛅',3:'☁️',
    45:'🌫️',48:'🌫️',
    51:'🌦️',53:'🌦️',55:'🌧️',
    61:'🌧️',63:'🌧️',65:'⛈️',
    71:'🌨️',73:'❄️',75:'❄️',
    80:'🌦️',81:'🌧️',82:'⛈️',
    95:'⛈️',96:'⛈️',99:'⛈️'
  };

  // Add weather CSS
  const weatherCSS = document.createElement('style');
  weatherCSS.textContent = `
    .weather-temp {
      font-size: 2.8rem;
      font-weight: 800;
      line-height: 1;
      background: linear-gradient(135deg, #4361ee, #f72585);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }
    .weather-icon { font-size: 2rem; margin-bottom: 4px; display: block; }
    .weather-condition { font-size: 0.95rem; font-weight: 700; color: #1a1a2e; margin-top: 4px; }
  `;
  document.head.appendChild(weatherCSS);

  // Inject weather card before github card
  const githubCard = document.querySelector('.dash-card--wide');
  if (!githubCard) return;

  const weatherCard = document.createElement('div');
  weatherCard.className = 'dash-card';
  weatherCard.innerHTML = `
    <div class="dash-card__header">
      <span class="dash-icon">🌍</span>
      <span class="dash-label">Your Local Weather</span>
    </div>
    <div class="dash-card__body">
      <span class="weather-icon" id="weather-icon">⏳</span>
      <div class="weather-temp" id="weather-temp">--°C</div>
      <div class="weather-condition" id="weather-condition">Detecting location...</div>
      <div class="status-sub" id="weather-city">Please wait...</div>
    </div>
  `;
  githubCard.parentNode.insertBefore(weatherCard, githubCard);

  async function fetchWeather() {
    const iconEl      = document.getElementById('weather-icon');
    const tempEl      = document.getElementById('weather-temp');
    const condEl      = document.getElementById('weather-condition');
    const cityEl      = document.getElementById('weather-city');

    try {
      // Step 1 — Get visitor's lat/lon + city from IP (no popup)
      const geoRes  = await fetch('https://ip-api.com/json/?fields=lat,lon,city,country,countryCode');
      const geo     = await geoRes.json();

      const { lat, lon, city, country, countryCode } = geo;

      // Step 2 — Get weather from Open-Meteo (free, no key)
      const wxRes   = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,weathercode&temperature_unit=celsius&timezone=auto`
      );
      const wx      = await wxRes.json();

      const temp    = Math.round(wx.current.temperature_2m);
      const code    = wx.current.weathercode;
      const desc    = WMO[code]  || 'Unknown';
      const icon    = WMO_ICON[code] || '🌡️';
      const flag    = countryCode
        ? countryCode.toUpperCase().replace(/./g, c =>
            String.fromCodePoint(127397 + c.charCodeAt(0)))
        : '';

      if (iconEl)  iconEl.textContent  = icon;
      if (tempEl)  tempEl.textContent  = `${temp}°C`;
      if (condEl)  condEl.textContent  = desc;
      if (cityEl)  cityEl.textContent  = `📍 ${city}, ${country} ${flag}`;

    } catch(e) {
      if (iconEl)  iconEl.textContent  = '🌡️';
      if (tempEl)  tempEl.textContent  = '--°C';
      if (condEl)  condEl.textContent  = 'Weather unavailable';
      if (cityEl)  cityEl.textContent  = 'Could not detect location';
    }
  }

  fetchWeather();
  // Refresh every 10 minutes
  setInterval(fetchWeather, 10 * 60 * 1000);
})();
