/* =========================================================
   BIRTHDAY SITE — script.js
   ========================================================= */

"use strict";

/* ---------- 1. MAIN CONFIGURATION ---------- */
const CONFIG = {
  secretCode: "iloveyou",
  codeHint: "Hint: what I say every night 💭",
  herName: "Shemaya",
  fromName: "Krestyan",
  subtitle: "Wishing you the happiest birthday, laaang",
  birthday: "2026-11-18T00:00:00",
  celebrationMessage: "Happy Birthday, Shemayaa! Today is all about you. 💖",
  musicFile: "music.mp3",
  musicVolume: 0.6,   // normal volume of the background music (0 to 1)
  musicDuckTo: 0.5,   // while a video plays, the music drops to this fraction (0.5 = 50%)
  rememberUnlock: true,
};

/* ---------- 2. GREETERS & VIDEO DATA ---------- */
const GREETERS = [
  {
    name: "Rayven",
    relation: "Rayven",
    avatar: "",
    message: "",
    photo: "greeters/mom-memory.jpg",
    video: "raayven.mp4",
    audio: "",
  },
  {
    name: "Ate Zoey",
    relation: "Ate Zoey",
    avatar: "greeters/dad.jpg",
    message: "",
    photo: "",
    video: "ate zoeyy.mp4",
    audio: "",
  },
  {
    name: "Baby Celyn and Ate May",
    relation: "",
    avatar: "greeters/anna.jpg",
    message: "",
    photo: "celyn and shemaya.jpg",
    video: "baby celyn and ate may.mp4",
    audio: "",
  },
  {
    name: "Baby Therese",
    relation: "Your Brother",
    avatar: "greeters/mark.jpg",
    message: ")",
    photo: "masha and shemaya.jpg",
    video: "baby theresee.mp4",
    audio: "",
  },
  {
    name: "Belle and Ezekiel",
    relation: "Niece",
    avatar: "greeters/lola.jpg",
    message: "",
    photo: "",
    video: "belle and ezekiel.mp4",
    audio: "",
  },
  {
    name: "Binsaar",
    relation: "Coursin",
    avatar: "greeters/team.jpg",
    message: "",
    photo: "",
    video: "binsaar.mp4",
    audio: "",
  },
  {
    name: "Kuya Ampoy",
    relation: "Coursin",
    avatar: "greeters/team.jpg",
    message: "",
    photo: "",
    video: "kuya ampoy.mp4",
    audio: "",
  },
  {
    name: "Kuya Vince",
    relation: "Brother",
    avatar: "greeters/team.jpg",
    message: "",
    photo: "",
    video: "kuya vince.mp4",
    audio: "",
  },
  {
    name: "Troy",
    relation: "Brother",
    avatar: "greeters/team.jpg",
    message: "",
    photo: "troy and shemaya.jpg",
    video: "trooy.mp4",
    audio: "",
  },
];

/* ---------- 3. REASONS YOU'RE AMAZING ---------- */
const REASONS = [
  "Your laugh makes any bad day better.",
  "You are kind to everyone, even when no one is watching.",
  "You believe in me when I forget to believe in myself.",
  "You make the simplest moments feel like an adventure.",
  "Your hugs feel like home.",
  "You are brave, smart, and beautifully stubborn.",
  "You remember the little things that matter.",
  "You turn strangers into friends within minutes.",
  "The way you light up when you talk about what you love.",
];

/* ---------- 4. PHOTO GALLERY ---------- */
const PHOTOS = [
  { src: "13.jpg", caption: "New bataan, Bamboo feels🌸",        category: "Childhood" },
  { src: "9.jpg", caption: "Date number 4 🎂",             category: "Childhood" },
  { src: "28.jpg", caption: "Always up to something cute",      category: "Childhood" },
  { src: "19.jpg",    caption: "Graduation day! 🎓",    category: "School" },
  { src: "16.jpg",    caption: "felt cute might delete later? HAHAHAHHA",            category: "School" },
  { src: "21.jpg",    caption: "Jejemon season",                 category: "School" },
  { src: "18.jpg",    caption: "Little Shemaya ❤️",       category: "Recent" },
  { src: "15.jpg",    caption: "First travel to Manila✈️ ",      category: "Recent" },
  { src: "5.jpg",    caption: "Squaaad ☕", category: "Recent" },
  { src: "2.jpg",    caption: "You, being you. Perfect.",         category: "Recent" },
];

const GALLERY_FILTERS = ["All", "Childhood", "School", "Recent"];

/* ---------- 5. GIFTS ---------- */
const GIFTS = [
  {
    label: "Open me first!",
    message: "A coupon for one breakfast in bed, cooked by me (burnt toast included).",
    from: "Your Name",
  },
  {
    label: "For you 💝",
    message: "Wishing you a year filled with peace, adventure, and endless laughter.",
    from: "Mom & Dad",
  },
  {
    label: "Don't peek!",
    message: "One free pass: you pick the movie, the snacks, and the entire evening.",
    from: "Your Name",
  },
  {
    label: "Surprise!",
    message: "Remember: you are loved more than you know. Happy birthday, gorgeous!",
    from: "Anna",
  },
];

/* ---------- HELPERS ---------- */
const $ = (selector) => document.querySelector(selector);
const rand = (min, max) => Math.random() * (max - min) + min;
const escapeXml = (str) =>
  String(str).replace(/[<>&'"]/g, (c) => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;", "'": "&apos;", '"': "&quot;" }[c]));
const pad = (n) => String(n).padStart(2, "0");
const params = new URLSearchParams(window.location.search);

const store = {
  get(key) { try { return sessionStorage.getItem(key); } catch (e) { return null; } },
  set(key, value) { try { sessionStorage.setItem(key, value); } catch (e) { /* ignore */ } },
  remove(key) { try { sessionStorage.removeItem(key); } catch (e) { /* ignore */ } },
};

const PICKED_KEY = "birthdayPickedWishes";   // who was already picked in the Video Wish Generator

if (params.has("reset")) {
  store.remove("birthdayUnlocked");
  try { localStorage.removeItem(PICKED_KEY); } catch (e) { /* ignore */ }
}

/* PLACEHOLDER SVGS */
function makePlaceholder(label) {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="600" height="600" viewBox="0 0 600 600">
      <defs>
        <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stop-color="#ffd6e6"/>
          <stop offset="1" stop-color="#d9c2ff"/>
        </linearGradient>
      </defs>
      <rect width="600" height="600" fill="url(#g)"/>
      <text x="300" y="300" font-size="110" text-anchor="middle">📷</text>
      <text x="300" y="390" font-size="32" font-family="sans-serif" fill="#7a4fc4" text-anchor="middle">${escapeXml(label)}</text>
    </svg>`;
  return "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svg);
}

function makeAvatar(name) {
  const initials =
    String(name).trim().split(/\s+/).slice(0, 2).map((w) => w.charAt(0).toUpperCase()).join("") || "💖";
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="300" height="300" viewBox="0 0 300 300">
      <defs>
        <linearGradient id="a" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stop-color="#ff8fb7"/>
          <stop offset="1" stop-color="#b58cf2"/>
        </linearGradient>
      </defs>
      <rect width="300" height="300" fill="url(#a)"/>
      <text x="150" y="190" font-size="110" font-family="sans-serif" font-weight="600" fill="#ffffff" text-anchor="middle">${escapeXml(initials)}</text>
    </svg>`;
  return "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svg);
}

function createAvatarImg(greeter, className) {
  const img = document.createElement("img");
  img.className = className;
  img.alt = greeter.name;
  img.loading = "lazy";
  img.addEventListener("error", () => { img.src = makeAvatar(greeter.name); }, { once: true });
  img.src = greeter.avatar ? greeter.avatar : makeAvatar(greeter.name);
  return img;
}

/* CONFETTI ENGINE */
const Confetti = (() => {
  const canvas = $("#confetti-canvas");
  const ctx = canvas.getContext("2d");
  const COLORS = ["#ff8fb7", "#e05a93", "#b58cf2", "#7a4fc4", "#ffd6e6", "#e9ddff", "#ffd166", "#ffffff"];
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  let particles = [];
  let running = false;
  let width = 0;
  let height = 0;

  function resize() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }
  window.addEventListener("resize", resize);
  resize();

  function addParticle(x, y, vx, vy) {
    particles.push({
      x, y, vx, vy,
      size: rand(6, 11),
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      rot: rand(0, Math.PI * 2),
      vr: rand(-0.25, 0.25),
      shape: Math.random() < 0.3 ? "circle" : "rect",
      life: rand(110, 200),
    });
  }

  function frame() {
    ctx.clearRect(0, 0, width, height);

    for (const p of particles) {
      p.vy += 0.18;
      p.vx *= 0.99;
      p.vy *= 0.995;
      p.x += p.vx;
      p.y += p.vy;
      p.rot += p.vr;
      p.life -= 1;

      ctx.save();
      ctx.globalAlpha = Math.max(0, Math.min(1, p.life / 40));
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rot);
      ctx.fillStyle = p.color;
      if (p.shape === "circle") {
        ctx.beginPath();
        ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
        ctx.fill();
      } else {
        ctx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2);
      }
      ctx.restore();
    }

    particles = particles.filter((p) => p.life > 0 && p.y < height + 30);

    if (particles.length > 0) {
      requestAnimationFrame(frame);
    } else {
      running = false;
      ctx.clearRect(0, 0, width, height);
    }
  }

  function start() {
    if (!running) {
      running = true;
      requestAnimationFrame(frame);
    }
  }

  function burst(x = width / 2, y = height / 2, count = 90) {
    if (reduceMotion) count = Math.round(count / 4);
    for (let i = 0; i < count; i++) {
      const angle = rand(0, Math.PI * 2);
      const speed = rand(3, 12);
      addParticle(x, y, Math.cos(angle) * speed, Math.sin(angle) * speed - 4);
    }
    start();
  }

  function rain(ms = 3500) {
    const end = performance.now() + ms;
    const perTick = reduceMotion ? 1 : 6;
    const timer = setInterval(() => {
      if (performance.now() > end) {
        clearInterval(timer);
        return;
      }
      for (let i = 0; i < perTick; i++) {
        addParticle(rand(0, width), -10, rand(-1.5, 1.5), rand(2, 5));
      }
      start();
    }, 120);
  }

  return { burst, rain };
})();

/* UTILITY FUNCTIONS */
let toastTimer;
function showToast(message) {
  const toast = $("#toast");
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 3200);
}

function addSwipe(element, onSwipeLeft, onSwipeRight) {
  let startX = 0;
  let startY = 0;
  let ignore = false;

  element.addEventListener("touchstart", (e) => {
    ignore = !!e.target.closest("video, audio");
    startX = e.touches[0].clientX;
    startY = e.touches[0].clientY;
  }, { passive: true });

  element.addEventListener("touchend", (e) => {
    if (ignore) return;
    const dx = e.changedTouches[0].clientX - startX;
    const dy = e.changedTouches[0].clientY - startY;
    if (Math.abs(dx) > 55 && Math.abs(dx) > Math.abs(dy) * 1.4) {
      if (dx < 0) onSwipeLeft();
      else onSwipeRight();
    }
  }, { passive: true });
}

function createFloatingHearts(count = 14) {
  const wrap = $("#floating-hearts");
  const symbols = ["💖", "💗", "💕", "🌸", "✨"];
  for (let i = 0; i < count; i++) {
    const heart = document.createElement("span");
    heart.textContent = symbols[Math.floor(Math.random() * symbols.length)];
    heart.style.left = rand(0, 100) + "%";
    heart.style.fontSize = rand(14, 30) + "px";
    heart.style.animationDuration = rand(12, 24) + "s";
    heart.style.animationDelay = rand(0, 14) + "s";
    wrap.appendChild(heart);
  }
}

/* LOCK SCREEN */
const lockScreen = $("#lock-screen");
const lockForm = $("#lock-form");
const lockInput = $("#lock-input");
const lockError = $("#lock-error");

const normalize = (s) => s.trim().toLowerCase();

function unlockSite(withConfetti = true) {
  lockScreen.classList.add("fade-out");
  document.body.classList.remove("is-locked");
  $("#site").classList.remove("hidden");
  $("#music-btn").classList.remove("hidden");
  Pager.start();
  Music.start();   // the music begins as soon as the site opens

  setTimeout(() => lockScreen.classList.add("hidden"), 750);

  startCountdown();

  if (withConfetti) {
    setTimeout(() => Confetti.burst(window.innerWidth / 2, window.innerHeight / 2, 140), 350);
  }
}

lockForm.addEventListener("submit", (event) => {
  event.preventDefault();

  if (normalize(lockInput.value) === normalize(CONFIG.secretCode)) {
    lockError.textContent = "";
    if (CONFIG.rememberUnlock) store.set("birthdayUnlocked", "1");
    unlockSite(true);
  } else {
    lockError.textContent = "Oops, that's not the secret code. Try again 💔";
    lockForm.classList.remove("shake");
    void lockForm.offsetWidth;
    lockForm.classList.add("shake");
    lockInput.select();
  }
});

/* TEASER */
function renderTeaser() {
  const faces = $("#teaser-faces");
  GREETERS.forEach((greeter) => {
    const face = document.createElement("div");
    face.className = "teaser-face";
    face.appendChild(createAvatarImg(greeter, ""));
    faces.appendChild(face);
  });

  $("#teaser-sub").textContent =
    `${GREETERS.length} ${GREETERS.length === 1 ? "person has" : "people have"} been preparing something for you…`;

  const stats = $("#teaser-stats");
  const items = [
    `💌 ${GREETERS.length} greetings`,
    `📸 ${PHOTOS.length} memories`,
    `💖 ${REASONS.length} reasons`,
  ];
  items.forEach((text) => {
    const chip = document.createElement("span");
    chip.className = "teaser-stat";
    chip.textContent = text;
    stats.appendChild(chip);
  });
}

/* COUNTDOWN & REVEAL */
let countdownTimer = null;
let revealed = false;

function getTargetTime() {
  if (params.has("preview")) return 0;
  const testSeconds = parseFloat(params.get("countdown"));
  if (!Number.isNaN(testSeconds)) return Date.now() + testSeconds * 1000;
  return new Date(CONFIG.birthday).getTime();
}

function startCountdown() {
  const target = getTargetTime();

  if (Number.isNaN(target)) {
    console.warn('CONFIG.birthday is not a valid date.');
    return;
  }

  function tick(isFirstTick) {
    const diff = target - Date.now();

    if (diff <= 0) {
      clearInterval(countdownTimer);
      revealEverything({ dramatic: !isFirstTick });
      return;
    }

    const days = Math.floor(diff / 86400000);
    const hours = Math.floor((diff % 86400000) / 3600000);
    const minutes = Math.floor((diff % 3600000) / 60000);
    const seconds = Math.floor((diff % 60000) / 1000);

    setDigit($("#cd-days"), pad(days));
    setDigit($("#cd-hours"), pad(hours));
    setDigit($("#cd-minutes"), pad(minutes));
    setDigit($("#cd-seconds"), pad(seconds));
  }

  clearInterval(countdownTimer);
  tick(true);
  if (!revealed) countdownTimer = setInterval(() => tick(false), 1000);
}

function revealEverything({ dramatic = false } = {}) {
  if (revealed) return;
  revealed = true;

  $("#countdown").classList.add("hidden");
  $("#celebration").classList.remove("hidden");
  $("#celebration-text").textContent = CONFIG.celebrationMessage;
  { const come = $("#poster-come"); if (come) come.textContent = "Happy birthday to…"; }

  $("#teaser").classList.add("hidden");
  $("#reveal-content").classList.remove("hidden");
  observeReveals();
  Pager.refresh(true); // the teaser page disappears and the other pages appear

  setTimeout(() => {
    Confetti.burst(window.innerWidth / 2, window.innerHeight / 3, 160);
    Confetti.rain(dramatic ? 5000 : 3000);
  }, 400);

}

/* =========================================================
   REALISM HELPERS (texture, light and shading for the cakes)
   ========================================================= */
const _noiseCache = {};
// A tiny tile of random speckle drawn once on a canvas (used for paper grain and frosting texture)
function makeNoise(minA, maxA, minV, maxV) {
  const key = [minA, maxA, minV, maxV].join();
  if (key in _noiseCache) return _noiseCache[key];
  let url = "";
  try {
    const c = document.createElement("canvas");
    c.width = c.height = 96;
    const ctx = c.getContext("2d");
    const img = ctx.createImageData(96, 96);
    for (let i = 0; i < img.data.length; i += 4) {
      img.data[i] = img.data[i + 1] = img.data[i + 2] = minV + Math.random() * (maxV - minV);
      img.data[i + 3] = minA + Math.random() * (maxA - minA);
    }
    ctx.putImageData(img, 0, 0);
    url = c.toDataURL("image/png");
  } catch (e) { url = ""; }
  _noiseCache[key] = url;
  return url;
}

// Fine paper grain over the whole site + on the polaroids / notes (see --grain in the CSS)
function setupGrain() {
  const g = makeNoise(8, 28, 130, 235);
  if (g) document.documentElement.style.setProperty("--grain", `url("${g}")`);
}

/* Extra gradients for the cake shading (p = id prefix) */
function cakeShadeDefs(p) {
  const n = makeNoise(60, 150, 70, 190);
  return `
    <radialGradient id="${p}aoG"><stop offset=".8" stop-color="#4b2a6e" stop-opacity=".4"/><stop offset="1" stop-color="#4b2a6e" stop-opacity="0"/></radialGradient>
    <linearGradient id="${p}sideShade" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff" stop-opacity=".12"/><stop offset=".55" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#3a1f55" stop-opacity=".28"/></linearGradient>
    <linearGradient id="${p}specG" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#fff" stop-opacity="0"/><stop offset=".5" stop-color="#fff" stop-opacity=".55"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient>
    <linearGradient id="${p}rimG" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#fff" stop-opacity="0"/><stop offset="1" stop-color="#fff" stop-opacity=".38"/></linearGradient>
    <radialGradient id="${p}warmG"><stop offset="0" stop-color="#ffd9a0" stop-opacity=".8"/><stop offset=".5" stop-color="#ffb866" stop-opacity=".3"/><stop offset="1" stop-color="#ff9a3c" stop-opacity="0"/></radialGradient>
    ${n ? `<pattern id="${p}noise" width="96" height="96" patternUnits="userSpaceOnUse"><image href="${n}" width="96" height="96"/></pattern>` : ""}`;
}

/* Shading layers for a cake: ambient shadow where the tiers meet, soft edge shading, glossy
   highlights, frosting texture and the warm candle light (which fades as candles go out). */
function cakeShade(p) {
  const CX = 220;
  const TOP = { cy: 166, rx: 114, ry: 22, h: 96 };
  const BOT = { cy: 262, rx: 146, ry: 28, h: 122 };
  const f = (v) => v.toFixed(1);
  const curve = (t, x, dy = 0) => t.cy + dy + t.ry * Math.sqrt(Math.max(0, 1 - Math.pow((x - CX) / t.rx, 2)));
  const body = (t) => `M${CX - t.rx},${t.cy} L${CX - t.rx},${t.cy + t.h} A${t.rx},${t.ry} 0 0 0 ${CX + t.rx},${t.cy + t.h} L${CX + t.rx},${t.cy} A${t.rx},${t.ry} 0 0 1 ${CX - t.rx},${t.cy} Z`;
  const strip = (t, x1, x2, from, off) =>
    `M${f(x1)},${f(curve(t, x1, from))} L${f(x2)},${f(curve(t, x2, from))} L${f(x2)},${f(curve(t, x2, t.h - off))} L${f(x1)},${f(curve(t, x1, t.h - off))} Z`;
  const hasNoise = makeNoise(60, 150, 70, 190) !== "";
  const noise = (tag, attrs) =>
    hasNoise ? `<${tag} ${attrs} fill="url(#${p}noise)" style="mix-blend-mode:soft-light" opacity=".7"/>` : "";
  const tier = (t, specX, specFrom) => `
    <path d="${body(t)}" fill="url(#${p}sideShade)"/>
    <path d="${strip(t, CX + specX, CX + specX + 24, specFrom, 20)}" fill="url(#${p}specG)" opacity=".6"/>
    <path d="${strip(t, CX + t.rx - 16, CX + t.rx - 1, specFrom, 16)}" fill="url(#${p}rimG)"/>
    ${noise("path", `d="${body(t)}"`)}`;

  return {
    plate: `<path d="M61,402 A184,26 0 0 0 157,413.4" fill="none" stroke="#fff" stroke-opacity=".8" stroke-width="2.5" stroke-linecap="round"/>`,
    bottom: `<ellipse cx="220" cy="265" rx="134" ry="29" fill="url(#${p}aoG)"/>${tier(BOT, -64, 6)}`,
    topBody: tier(TOP, -52, 12),
    topFace: `${noise("ellipse", `cx="${CX}" cy="${TOP.cy}" rx="${TOP.rx}" ry="${TOP.ry}"`)}
    <ellipse cx="196" cy="161" rx="52" ry="6" fill="#fff" fill-opacity=".38" transform="rotate(-6 196 161)"/>
    <g class="cake-lit"><ellipse class="cake-flicker" cx="220" cy="164" rx="108" ry="22" fill="url(#${p}warmG)" style="mix-blend-mode:screen"/></g>`,
    ambient: `<g class="cake-lit"><ellipse class="cake-flicker" cx="220" cy="118" rx="150" ry="95" fill="url(#${p}warmG)" style="mix-blend-mode:screen" opacity=".8"/></g>`,
  };
}

/* A number that "ticks" over like a real counter when it changes */
function setDigit(el, value) {
  if (el.textContent === value) return;
  el.textContent = value;
  el.classList.remove("tick");
  void el.offsetWidth;
  el.classList.add("tick");
}

/* Gradients + filters shared by the cakes (p = prefix, so two cakes on one page never clash) */
function cakeDefs(p) {
  const l = 106, r = 334, L = 74, R = 366; // tier edges used by the side gradients
  return `<linearGradient id="${p}gPink" gradientUnits="userSpaceOnUse" x1="${l}" x2="${r}" y1="0" y2="0">
      <stop offset="0" stop-color="#ee86ae"/><stop offset=".2" stop-color="#f9a6c5"/><stop offset=".45" stop-color="#ffd2e2"/><stop offset=".75" stop-color="#fbacc9"/><stop offset="1" stop-color="#e97fa9"/>
    </linearGradient>
    <linearGradient id="${p}gPurple" gradientUnits="userSpaceOnUse" x1="${L}" x2="${R}" y1="0" y2="0">
      <stop offset="0" stop-color="#a587d6"/><stop offset=".2" stop-color="#c2a7ee"/><stop offset=".45" stop-color="#e4d3fb"/><stop offset=".75" stop-color="#bfa2ec"/><stop offset="1" stop-color="#9b7bd0"/>
    </linearGradient>
    <radialGradient id="${p}gTopPink" cx=".5" cy=".4" r=".7"><stop offset="0" stop-color="#ffeaf1"/><stop offset="1" stop-color="#ffbed5"/></radialGradient>
    <radialGradient id="${p}gTopPurple" cx=".5" cy=".4" r=".7"><stop offset="0" stop-color="#efe4ff"/><stop offset="1" stop-color="#cdb5f4"/></radialGradient>
    <linearGradient id="${p}icing" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffffff"/><stop offset="1" stop-color="#ffeaf2"/></linearGradient>
    <radialGradient id="${p}pearl" cx=".35" cy=".3" r=".8"><stop offset="0" stop-color="#ffffff"/><stop offset=".55" stop-color="#d9c6f6"/><stop offset="1" stop-color="#a98bd8"/></radialGradient>
    <radialGradient id="${p}mshade" cx=".35" cy=".3" r=".85"><stop offset="0" stop-color="#fff" stop-opacity=".45"/><stop offset=".6" stop-color="#fff" stop-opacity="0"/><stop offset="1" stop-color="#7a3d66" stop-opacity=".18"/></radialGradient>
    <linearGradient id="${p}kiss" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffffff"/><stop offset=".7" stop-color="#f4e9f0"/><stop offset="1" stop-color="#e2cedb"/></linearGradient>
    <radialGradient id="${p}heart" cx=".35" cy=".3" r=".85"><stop offset="0" stop-color="#ff7b7b"/><stop offset=".5" stop-color="#e3173b"/><stop offset="1" stop-color="#a30f2b"/></radialGradient>
    <linearGradient id="${p}flame" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffe066"/><stop offset=".55" stop-color="#ff9a2a"/><stop offset="1" stop-color="#ff5a1a"/></linearGradient>
    <radialGradient id="${p}halo"><stop offset="0" stop-color="#ffd27a" stop-opacity=".55"/><stop offset="1" stop-color="#ffd27a" stop-opacity="0"/></radialGradient>
    <radialGradient id="${p}glow"><stop offset="0" stop-color="#fff0e6" stop-opacity=".95"/><stop offset="1" stop-color="#fff0e6" stop-opacity="0"/></radialGradient>
    <linearGradient id="${p}plate" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffffff"/><stop offset="1" stop-color="#ebe3f1"/></linearGradient>
    <linearGradient id="${p}stem" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#ddd3e7"/><stop offset=".4" stop-color="#ffffff"/><stop offset="1" stop-color="#d5cae1"/></linearGradient>
    <linearGradient id="${p}foot" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffffff"/><stop offset="1" stop-color="#d9cfe4"/></linearGradient>
    <pattern id="${p}twist" width="7" height="7" patternUnits="userSpaceOnUse" patternTransform="rotate(35)"><rect width="3.2" height="7" fill="#fff" fill-opacity=".6"/></pattern>
    <filter id="${p}dropS" x="-30%" y="-30%" width="160%" height="170%"><feDropShadow dx="0" dy="2" stdDeviation="1.6" flood-color="#7a3d66" flood-opacity=".28"/></filter>
    <filter id="${p}blurS"><feGaussianBlur stdDeviation="4"/></filter>
  `;
}

/* =========================================================
   REALISTIC TWO-TIER CAKE
   Drawn as an SVG (pastel tiers, white icing drips, macarons,
   meringue kisses, sprinkles, pearls, glossy heart, white cake
   stand) and filled into <div id="cake-art">.
   The candles are built here too: change the number below
   (or call buildCakeArt(25)) to get a different candle count.
   ========================================================= */
function buildCakeArt(totalCandles = 20) {
  const host = $("#cake-art");
  if (!host) return;

  const CX = 220; // centre of the cake
  const TOP = { cy: 166, rx: 114, ry: 22, h: 96 };  // pink top tier
  const BOT = { cy: 262, rx: 146, ry: 28, h: 122 }; // purple bottom tier

  // Small seeded random so the sprinkles land in the same places every time
  let seed = 11;
  const rnd = () => { seed = (seed * 16807) % 2147483647; return (seed - 1) / 2147483646; };
  const n1 = (v) => Math.round(v * 10) / 10;
  const pick = (arr) => arr[Math.floor(rnd() * arr.length)];
  // y of the front edge of a tier's ellipse at a given x (dy = how far down the side)
  const curve = (t, x, dy = 0) => t.cy + dy + t.ry * Math.sqrt(Math.max(0, 1 - Math.pow((x - CX) / t.rx, 2)));
  const onRing = (t, rx, ry, a) => {
    const r = (a * Math.PI) / 180;
    return [CX + rx * Math.cos(r), t.cy + ry * Math.sin(r)];
  };

  /* ---------- sprinkles ---------- */
  const COLORS = ["#ff6f9f", "#ffd15c", "#6fdcc4", "#7db8ff", "#ffffff", "#ff9d63", "#b98cff"];
  const sprinkle = (x, y) => {
    const c = pick(COLORS);
    if (rnd() < 0.3) return `<circle cx="${n1(x)}" cy="${n1(y)}" r="1.8" fill="${c}"/>`;
    return `<rect x="${n1(x - 4)}" y="${n1(y - 1.5)}" width="8" height="3" rx="1.5" fill="${c}" transform="rotate(${Math.floor(rnd() * 180)} ${n1(x)} ${n1(y)})"/>`;
  };
  const sideSprinkles = (t, count, fromTop, fromBottom) => {
    let s = "";
    for (let i = 0; i < count; i++) {
      const x = CX - t.rx + 8 + rnd() * (t.rx * 2 - 16);
      const y0 = curve(t, x) + fromTop;
      const y1 = curve(t, x, t.h) - fromBottom;
      s += sprinkle(x, y0 + rnd() * (y1 - y0));
    }
    return s;
  };
  const faceSprinkles = (t, rx, ry, count, skip) => {
    let s = "";
    for (let tries = 0; count > 0 && tries < 500; tries++) {
      const a = rnd() * 6.283;
      const d = Math.sqrt(rnd());
      const x = CX + rx * d * Math.cos(a);
      const y = t.cy + ry * d * Math.sin(a);
      if (skip && Math.pow((x - CX) / skip.rx, 2) + Math.pow((y - skip.cy) / skip.ry, 2) < 1) continue;
      s += sprinkle(x, y);
      count--;
    }
    return s;
  };

  /* ---------- pearl border around the bottom tier ---------- */
  let pearls = "";
  for (let x = CX - BOT.rx + 6; x <= CX + BOT.rx - 5; x += 10.8) {
    pearls += `<circle cx="${n1(x)}" cy="${n1(curve(BOT, x, BOT.h) - 5)}" r="5.2" fill="url(#pearl)"/>`;
  }

  /* ---------- white icing drips on the top tier ---------- */
  const xs = [];
  for (let x = CX - TOP.rx; x <= CX + TOP.rx; x += 4) xs.push(x);
  const topPts = xs.map((x) => `${n1(x)},${n1(curve(TOP, x, -1))}`);
  const botPts = xs.slice().reverse().map((x) => `${n1(x)},${n1(curve(TOP, x, 9))}`);
  let pills = "";
  for (let x = CX - TOP.rx + 12; x < CX + TOP.rx - 8; x += 15 + rnd() * 6) {
    const len = 12 + rnd() * 28;
    const w = 11 + rnd() * 4;
    pills += `<rect x="${n1(x - w / 2)}" y="${n1(curve(TOP, x, 3))}" width="${n1(w)}" height="${n1(len)}" rx="${n1(w / 2)}"/>`;
  }

  /* ---------- macarons + meringue kisses ---------- */
  const mac = (x, y, s, c) => `<g transform="translate(${n1(x)} ${n1(y)}) scale(${n1(s)})" filter="url(#dropS)">
      <ellipse cy="10" rx="17" ry="6" fill="${c}"/>
      <rect x="-17" y="3" width="34" height="9" rx="4.5" fill="#fff6e6"/>
      <ellipse cy="0" rx="18" ry="6.2" fill="${c}"/>
      <ellipse cy="0" rx="18" ry="6.2" fill="none" stroke="#fff" stroke-opacity=".4" stroke-width="1.6" stroke-dasharray="1.5 1.7"/>
      <ellipse cy="-2" rx="17" ry="8" fill="${c}"/>
      <ellipse cy="-2" rx="17" ry="8" fill="url(#mshade)"/>
      <ellipse cx="-5" cy="-5" rx="7" ry="2.2" fill="#fff" fill-opacity=".5"/>
    </g>`;
  const kiss = (x, y, s) => `<g transform="translate(${n1(x)} ${n1(y)}) scale(${n1(s)})" filter="url(#dropS)" stroke="#dcc6d4" stroke-opacity=".7" stroke-width=".7">
      <ellipse cy="6" rx="15" ry="5.5" fill="url(#kiss)"/>
      <ellipse cy="-1" rx="12.5" ry="5.2" fill="url(#kiss)"/>
      <ellipse cy="-8" rx="10" ry="4.6" fill="url(#kiss)"/>
      <ellipse cy="-14" rx="7" ry="4" fill="url(#kiss)"/>
      <path d="M-4.5,-15 C-3,-22 1,-24 2,-30 C4,-24 6,-19 4.5,-15 Z" fill="url(#kiss)"/>
    </g>`;
  const CORAL = "#ff8fa8", MINT = "#9be3c8", YELLOW = "#ffd86e";
  const place = (t, rx, ry, list) =>
    list.map(([a, type, c]) => {
      const [x, y] = onRing(t, rx, ry, a);
      const s = 0.92 + 0.14 * Math.sin((a * Math.PI) / 180); // a bit bigger toward the front
      return type === "kiss" ? kiss(x, y, s * 1.25) : mac(x, y, s, c);
    }).join("");

  const topBack   = place(TOP, 98, 17, [[188, "kiss"], [352, "kiss"]]);
  const topSide   = place(TOP, 98, 17, [[224, "mac", YELLOW], [316, "mac", MINT]]);
  const topFront  = place(TOP, 98, 17, [[160, "mac", CORAL], [128, "kiss"], [90, "mac", MINT], [52, "kiss"], [20, "mac", CORAL]]);
  const botBack   = place(BOT, 131, 25, [[203, "kiss"], [337, "kiss"], [186, "mac", YELLOW], [354, "mac", YELLOW]]);
  const botFront  = place(BOT, 131, 25, [[156, "mac", MINT], [128, "kiss"], [90, "mac", YELLOW], [52, "kiss"], [24, "mac", MINT]]);

  /* ---------- the candles (twisty pastel stripes + a flame each) ---------- */
  const CC = ["#a6e3c9", "#ffe07a", "#ffb3cf", "#c9b0ff", "#ffc7a6"];
  let candles = "";
  for (let i = 0; i < totalCandles; i++) {
    const a = totalCandles > 1 ? 205 + (130 * i) / (totalCandles - 1) : 270;
    const [x, y] = onRing(TOP, 80, 13, a);
    const base = y - 2;
    const h = 44 + ((i * 5) % 4) * 4;
    const top = base - h;
    const fy = top - 3; // where the flame starts
    candles += `<g class="candle-ref">
      <rect x="${n1(x - 2.8)}" y="${n1(top)}" width="5.6" height="${h}" rx="2.4" fill="${CC[i % 5]}"/>
      <rect x="${n1(x - 2.8)}" y="${n1(top)}" width="5.6" height="${h}" rx="2.4" fill="url(#twist)"/>
      <rect x="${n1(x - 1.9)}" y="${n1(top + 2)}" width="1.1" height="${h - 4}" rx=".5" fill="#fff" fill-opacity=".45"/>
      <path d="M${n1(x)},${n1(top)} Q${n1(x + 1.2)},${n1(top - 2)} ${n1(x + 0.5)},${n1(fy)}" stroke="#4a3340" stroke-width="1.1" fill="none" stroke-linecap="round"/>
      <g class="flame-ref" style="transform-origin:${n1(x)}px ${n1(fy)}px;animation-delay:-${n1(rnd() * 1.2)}s;animation-duration:${n1(0.6 + rnd() * 0.6)}s">
        <circle cx="${n1(x)}" cy="${n1(fy - 6)}" r="11" fill="url(#halo)"/>
        <path d="M${n1(x)},${n1(fy)} C${n1(x - 3.4)},${n1(fy - 3)} ${n1(x - 2.6)},${n1(fy - 9)} ${n1(x)},${n1(fy - 14)} C${n1(x + 2.6)},${n1(fy - 9)} ${n1(x + 3.4)},${n1(fy - 3)} ${n1(x)},${n1(fy)} Z" fill="url(#flame)"/>
        <ellipse cx="${n1(x)}" cy="${n1(fy - 4.5)}" rx="1.1" ry="2.6" fill="#fffbe6" fill-opacity=".9"/>
      </g>
      <path class="smoke" d="M${n1(x)},${n1(fy - 4)} C${n1(x - 4)},${n1(fy - 12)} ${n1(x + 4)},${n1(fy - 18)} ${n1(x)},${n1(fy - 28)}" stroke="#8a7480" stroke-opacity=".55" stroke-width="1.4" fill="none" stroke-linecap="round"/>
    </g>`;
  }

  /* ---------- put it all together (back to front) ---------- */
  const L = CX - BOT.rx, R = CX + BOT.rx;   // bottom tier edges
  const l = CX - TOP.rx, r = CX + TOP.rx;   // top tier edges

  const S = cakeShade("");

  host.innerHTML = `<svg viewBox="0 44 440 476" xmlns="http://www.w3.org/2000/svg" focusable="false">
  <defs>${cakeDefs("")}${cakeShadeDefs("")}</defs>

  <ellipse cx="220" cy="290" rx="215" ry="235" fill="url(#glow)"/>

  <!-- cake stand -->
  <ellipse cx="220" cy="507" rx="112" ry="8" fill="#4a3350" fill-opacity=".16" filter="url(#blurS)"/>
  <ellipse cx="220" cy="496" rx="88" ry="13" fill="#d3c8e0"/>
  <ellipse cx="220" cy="490" rx="86" ry="12.5" fill="url(#foot)"/>
  <path d="M198,410 C201,440 196,466 172,490 L268,490 C244,466 239,440 242,410 Z" fill="url(#stem)"/>
  <ellipse cx="220" cy="398" rx="178" ry="24" fill="#d8cde3"/>
  <ellipse cx="220" cy="389" rx="184" ry="26" fill="url(#plate)"/>
  <ellipse cx="220" cy="389" rx="160" ry="21" fill="none" stroke="#ece4f3" stroke-width="2"/>
  <ellipse cx="220" cy="392" rx="152" ry="22" fill="#4a3350" fill-opacity=".12" filter="url(#blurS)"/>
  ${S.plate}

  <!-- bottom tier -->
  <path d="M${L},${BOT.cy} L${L},${BOT.cy + BOT.h} A${BOT.rx},${BOT.ry} 0 0 0 ${R},${BOT.cy + BOT.h} L${R},${BOT.cy} A${BOT.rx},${BOT.ry} 0 0 1 ${L},${BOT.cy} Z" fill="url(#gPurple)"/>
  <ellipse cx="${CX}" cy="${BOT.cy}" rx="${BOT.rx}" ry="${BOT.ry}" fill="url(#gTopPurple)"/>
  <path d="M${L},${BOT.cy} A${BOT.rx},${BOT.ry} 0 0 0 ${R},${BOT.cy}" fill="none" stroke="#fff" stroke-opacity=".55" stroke-width="1.6"/>
  ${S.bottom}
  ${faceSprinkles(BOT, 138, 24, 34, { cy: BOT.cy, rx: 118, ry: 23 })}
  ${sideSprinkles(BOT, 100, 8, 16)}
  <g filter="url(#dropS)">${pearls}</g>
  ${botBack}

  <!-- top tier -->
  <path d="M${l},${TOP.cy} L${l},${TOP.cy + TOP.h} A${TOP.rx},${TOP.ry} 0 0 0 ${r},${TOP.cy + TOP.h} L${r},${TOP.cy} A${TOP.rx},${TOP.ry} 0 0 1 ${l},${TOP.cy} Z" fill="url(#gPink)"/>
  ${S.topBody}
  ${sideSprinkles(TOP, 48, 14, 10)}
  <ellipse cx="${CX}" cy="${TOP.cy}" rx="${TOP.rx}" ry="${TOP.ry}" fill="url(#gTopPink)"/>
  ${faceSprinkles(TOP, 104, 16, 46)}
  ${S.topFace}
  <g fill="url(#icing)" filter="url(#dropS)"><polygon points="${topPts.concat(botPts).join(" ")}"/>${pills}</g>
  ${topBack}

  <!-- candles, then macarons in front of their bases, then the heart -->
  ${S.ambient}
  <g id="candles-ring">${candles}</g>
  ${topSide}
  <ellipse cx="220" cy="167" rx="17" ry="4" fill="#a02a55" fill-opacity=".28"/>
  <g class="cake-heart" filter="url(#dropS)">
    <path d="M220,166 C194,146 196,124 210,124 C216,124 220,129 220,133 C220,129 224,124 230,124 C244,124 246,146 220,166 Z" fill="url(#heart)"/>
    <path d="M203,134 C204,128 209,127 212,129" stroke="#fff" stroke-opacity=".75" stroke-width="3" fill="none" stroke-linecap="round"/>
  </g>
  ${topFront}
  ${botFront}
</svg>`;
}

/* REFERENCE CAKE & 20 CANDLE BLOW ENGINE */
function setupCakeBlowing() {
  buildCakeArt(20); // draws the cake + 20 candles
  const ring = $("#candles-ring");
  const micBtn = $("#blow-mic-btn");
  const relightBtn = $("#relight-btn");
  const statusText = $("#cake-status");

  const flames = ring.querySelectorAll(".flame-ref");

  let audioContext = null;
  let analyser = null;
  let microphone = null;
  let isListening = false;
  let blownOutCount = 0;
  const setLit = () => $("#cake-art").style.setProperty("--lit", String(1 - blownOutCount / flames.length));

  function extinguishCandle() {
    const activeFlames = Array.from(flames).filter((f) => !f.classList.contains("out"));
    if (activeFlames.length > 0) {
      activeFlames[0].classList.add("out");
      blownOutCount++;
      setLit();

      Confetti.burst(window.innerWidth / 2, window.innerHeight / 2, 25);

      if (blownOutCount === flames.length) {
        statusText.textContent = "Wish made! 🎉 All 20 candles are blown out!";
        Confetti.rain(3000);
        stopMic();
      } else {
        statusText.textContent = `Keep blowing! (${blownOutCount}/${flames.length} out)`;
      }
    }
  }

  function startMicDetection() {
    if (isListening) return;

    navigator.mediaDevices.getUserMedia({ audio: true, video: false })
      .then((stream) => {
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
        analyser = audioContext.createAnalyser();
        microphone = audioContext.createMediaStreamSource(stream);

        analyser.fftSize = 256;
        microphone.connect(analyser);

        isListening = true;
        micBtn.disabled = true;
        micBtn.textContent = "Listening for your breath… 🎤";
        statusText.textContent = "Blow directly into your mic now! 🌬️";

        const bufferLength = analyser.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);
        let blowThresholdCooldown = false;

        function detectVolume() {
          if (!isListening) return;

          analyser.getByteFrequencyData(dataArray);
          let sum = 0;
          for (let i = 0; i < bufferLength; i++) {
            sum += dataArray[i];
          }
          const averageVolume = sum / bufferLength;

          if (averageVolume > 45 && !blowThresholdCooldown) {
            blowThresholdCooldown = true;
            extinguishCandle();

            setTimeout(() => {
              blowThresholdCooldown = false;
            }, 300);
          }

          requestAnimationFrame(detectVolume);
        }

        detectVolume();
      })
      .catch((err) => {
        console.error(err);
        statusText.textContent = "Microphone access denied or not supported. Click button to extinguish!";
        micBtn.textContent = "Blow 1 Candle 🕯️";
        micBtn.disabled = false;
        micBtn.onclick = extinguishCandle;
      });
  }

  function stopMic() {
    isListening = false;
    if (audioContext) {
      audioContext.close();
      audioContext = null;
    }
    micBtn.disabled = false;
    micBtn.textContent = "Blow out candles 🎤";
  }

  micBtn.addEventListener("click", () => {
    if (blownOutCount >= flames.length) {
      relightCandles();
    }
    startMicDetection();
  });

  function relightCandles() {
    flames.forEach((f) => f.classList.remove("out"));
    blownOutCount = 0;
    setLit();
    statusText.textContent = "Grant microphone access and blow into your phone or laptop mic!";
    stopMic();
  }

  relightBtn.addEventListener("click", relightCandles);
}

/* SMOOTH SLOT MACHINE WHEEL ENGINE
   Every greeter can only be picked ONCE. The people already picked are remembered
   (so a page refresh does not bring them back). When everyone has been picked, the
   button turns into "start over". Open the site with ?reset to clear it while testing. */
let isSpinning = false;
const ITEM_HEIGHT = 140;
let refreshSlotUI = () => {};   // filled in by setupSlotMachine; called again once the ring of faces exists

function loadPicked() {
  try {
    const saved = JSON.parse(localStorage.getItem(PICKED_KEY));
    return Array.isArray(saved) ? saved : [];
  } catch (e) {
    return [];
  }
}

function savePicked(list) {
  try { localStorage.setItem(PICKED_KEY, JSON.stringify(list)); } catch (e) { /* ignore */ }
}

function setupSlotMachine() {
  const reel = $("#slot-reel");
  const spinBtn = $("#spin-btn");
  if (!reel || !spinBtn) return;

  reel.innerHTML = "";

  const itemsList = [];
  for (let r = 0; r < 8; r++) {
    GREETERS.forEach((g, idx) => {
      itemsList.push({ ...g, originalIdx: idx });
    });
  }

  itemsList.forEach((g) => {
    const item = document.createElement("div");
    item.className = "slot-item";

    const img = createAvatarImg(g, "slot-avatar");
    const info = document.createElement("div");
    info.className = "slot-info";

    const h3 = document.createElement("h3");
    h3.textContent = g.name;

    const p = document.createElement("p");
    p.textContent = g.relation || "Greeter";

    info.append(h3, p);
    item.append(img, info);
    reel.appendChild(item);
  });

  // small line under the button: how many wishes are still waiting
  const leftEl = document.createElement("p");
  leftEl.className = "spin-left";
  leftEl.setAttribute("aria-live", "polite");
  spinBtn.insertAdjacentElement("afterend", leftEl);

  // names of the people who were already picked
  let pickedNames = loadPicked().filter((n) => GREETERS.some((g) => g.name === n));
  const remainingIdx = () => GREETERS.map((g, i) => i).filter((i) => !pickedNames.includes(GREETERS[i].name));

  refreshSlotUI = () => {
    const left = remainingIdx().length;
    document.querySelectorAll(".wi-av").forEach((el, k) => {
      el.classList.toggle("is-done", !!GREETERS[k] && pickedNames.includes(GREETERS[k].name));
    });
    if (isSpinning) return;
    if (left === 0) {
      spinBtn.textContent = "🔁 All wishes opened — start over";
      leftEl.textContent = `All ${GREETERS.length} wishes have been revealed 💖`;
    } else {
      spinBtn.textContent = "🎰 Spin to Reveal a Wish!";
      leftEl.textContent = `${left} of ${GREETERS.length} ${GREETERS.length === 1 ? "wish is" : "wishes are"} still waiting`;
    }
  };
  refreshSlotUI();

  let currentY = 0;
  reel.style.transform = `translate3d(0, 0px, 0)`;

  spinBtn.addEventListener("click", () => {
    if (isSpinning) return;

    // everybody has been picked: start a new round
    if (remainingIdx().length === 0) {
      pickedNames = [];
      savePicked(pickedNames);
      refreshSlotUI();
      return;
    }

    isSpinning = true;
    spinBtn.disabled = true;
    spinBtn.textContent = "Spinning… 🎰";
    $("#slot-machine-section").classList.remove("is-winner");
    $("#slot-machine-section").classList.add("is-spinning");
    document.querySelectorAll(".wi-av").forEach((el) => el.classList.remove("is-picked"));

    // pick only among the people who were NOT picked yet
    const pool = remainingIdx();
    const targetIdx = pool[Math.floor(Math.random() * pool.length)];
    const totalItemsCount = GREETERS.length;

    const landingIndex = (totalItemsCount * 5) + targetIdx;
    const targetY = landingIndex * ITEM_HEIGHT;

    const startY = currentY;
    const distance = targetY - startY;
    const duration = 3500;
    let startTime = null;

    function easeOutCubic(t) {
      return 1 - Math.pow(1 - t, 3);
    }

    function animateSpin(currentTime) {
      if (!startTime) startTime = currentTime;
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      const easedProgress = easeOutCubic(progress);
      currentY = startY + (distance * easedProgress);

      reel.style.transform = `translate3d(0, -${currentY}px, 0)`;

      if (progress < 1) {
        requestAnimationFrame(animateSpin);
      } else {
        isSpinning = false;
        spinBtn.disabled = false;

        currentY = targetIdx * ITEM_HEIGHT;
        reel.style.transform = `translate3d(0, -${currentY}px, 0)`;

        // remember the winner so they can never be picked again
        pickedNames.push(GREETERS[targetIdx].name);
        savePicked(pickedNames);
        refreshSlotUI();

        Confetti.burst(window.innerWidth / 2, window.innerHeight / 2, 90);

        // the winner's face lights up in the ring
        const sec = $("#slot-machine-section");
        sec.classList.remove("is-spinning");
        sec.classList.add("is-winner");
        document.querySelectorAll(".wi-av").forEach((el, k) => el.classList.toggle("is-picked", k === targetIdx));
        setTimeout(() => sec.classList.remove("is-winner"), 1800);

        openWishModal(GREETERS[targetIdx]);
      }
    }

    requestAnimationFrame(animateSpin);
  });
}

/* =========================================================
   VIDEO WISH GENERATOR: ANIMATED INTRO
   "This is all about the people who greeted you": a headline that
   reveals word by word, every greeter's face flying out of a glowing
   heart into an orbiting ring, a cycling line of text, a name ticker
   and a blinking-bulb frame around the machine. It replays every
   time the page opens. Built from GREETERS (nothing to edit here).
   ========================================================= */
function setupWishIntro() {
  const section = $("#slot-machine-section");
  const machine = section && section.querySelector(".slot-machine");
  const n = GREETERS.length;
  if (!machine || n === 0) return;

  const oldSub = section.querySelector(".section-sub");
  if (oldSub) oldSub.remove();

  const videos = GREETERS.filter((g) => g.video).length;
  const words = (text, start) =>
    text.split(" ").map((w, i) => `<span class="wi-w" style="--i:${start + i}">${w}</span>`).join(" ");

  /* ----- headline + hand-drawn underline + the ring of faces ----- */
  const intro = document.createElement("div");
  intro.className = "wish-intro";
  intro.innerHTML = `
    <p class="wi-kicker">${words("This is all about", 0)}</p>
    <h3 class="wi-title">${words("the people who greeted you", 4)} <span class="wi-w wi-heart" style="--i:9">💖</span></h3>
    <svg class="wi-uline" viewBox="0 0 300 14" preserveAspectRatio="none" aria-hidden="true"><path d="M4 9 C 60 2, 120 14, 180 7 S 270 4, 296 8" pathLength="1"/></svg>
    <div class="wi-orbit" style="--n:${n}">
      <i class="wi-ripple"></i><i class="wi-ripple"></i><i class="wi-ripple"></i>
      <div class="wi-core" aria-hidden="true"><span>💖</span><b>${CONFIG.herName}</b></div>
    </div>
    <p class="wi-cycle">
      <span>💌 ${n} ${n === 1 ? "person" : "people"} took a moment just for you</span>
      ${videos ? `<span>🎥 ${videos} video ${videos === 1 ? "greeting is" : "greetings are"} waiting</span>` : ""}
      <span>🎰 Press spin to meet one of them</span>
    </p>`;

  const R = 38; // ring radius in the ring's own 100x100 units
  const ring = document.createElement("div");
  ring.className = "wi-ring";
  let spokes = "";
  GREETERS.forEach((g, i) => {
    const rad = (i / n) * Math.PI * 2;
    spokes += `<line x1="0" y1="0" x2="${(R * Math.sin(rad)).toFixed(2)}" y2="${(-R * Math.cos(rad)).toFixed(2)}" pathLength="1" style="--i:${i}"/>`;
  });
  ring.innerHTML = `<svg class="wi-spokes" viewBox="-50 -50 100 100" aria-hidden="true"><circle r="${R}"/>${spokes}</svg>`;
  GREETERS.forEach((g, i) => {
    const av = document.createElement("div");
    av.className = "wi-av";
    av.style.cssText = `--a:${((i / n) * 360).toFixed(1)}deg;--i:${i}`;
    const pop = document.createElement("span");
    pop.className = "wi-pop";
    const img = createAvatarImg(g, "wi-img");
    img.draggable = false;
    pop.appendChild(img);
    av.appendChild(pop);
    ring.appendChild(av);
  });
  const orbit = intro.querySelector(".wi-orbit");
  orbit.insertBefore(ring, orbit.querySelector(".wi-core"));
  machine.parentNode.insertBefore(intro, machine);

  /* ----- the machine gets a blinking-bulb cabinet and a scrolling name ticker ----- */
  const win = machine.querySelector(".slot-window");
  const cab = document.createElement("div");
  cab.className = "slot-cabinet";
  machine.insertBefore(cab, win);
  cab.appendChild(win);

  const unit = GREETERS.map((g) => g.name).join(" ♥ ") + " ♥ ";
  const half = unit.repeat(Math.max(2, Math.ceil(8 / n)));
  const ticker = document.createElement("div");
  ticker.className = "wi-ticker";
  ticker.setAttribute("aria-hidden", "true");
  ticker.innerHTML = `<div class="wi-track"><span>${half}</span><span>${half}</span></div>`;
  machine.insertBefore(ticker, $("#spin-btn"));
}

/* =========================================================
   DIRECT WISH: FULLSCREEN VIDEO + GREETING CARD
   When a greeter with a video is picked, the video opens on its own
   full screen (a black full-viewport player, plus the browser's real
   full screen when it allows it). While it plays, the background music
   drops to 50% (see Music.duck). When the video ends, the greeting card
   (message + photo) appears. Greeters without a video just get the card.
   ========================================================= */
const wishModal = $("#wish-modal");
let videoStage = null;
let stageVideo = null;
let idleTimer = null;

const fsElement = () => document.fullscreenElement || document.webkitFullscreenElement || null;

function enterFullscreen(el) {
  const fn = el.requestFullscreen || el.webkitRequestFullscreen;
  if (!fn) return;
  try {
    const p = fn.call(el);
    if (p && p.catch) p.catch(() => { /* the full-viewport player still covers the screen */ });
  } catch (e) { /* ignore */ }
}

function exitFullscreen() {
  if (!fsElement()) return;
  const fn = document.exitFullscreen || document.webkitExitFullscreen;
  try {
    const p = fn && fn.call(document);
    if (p && p.catch) p.catch(() => {});
  } catch (e) { /* ignore */ }
}

const isVideoStageOpen = () => !!videoStage && !videoStage.classList.contains("hidden");

function buildVideoStage() {
  videoStage = document.createElement("div");
  videoStage.id = "video-stage";
  videoStage.className = "video-stage hidden";
  videoStage.setAttribute("role", "dialog");
  videoStage.setAttribute("aria-modal", "true");
  videoStage.setAttribute("aria-label", "Video greeting");
  videoStage.innerHTML = `
    <div class="vs-bar">
      <div class="vs-who"><span class="vs-name script"></span><small class="vs-rel"></small></div>
      <div class="vs-actions">
        <button type="button" class="vs-btn vs-fs" aria-label="Toggle full screen">⛶</button>
        <button type="button" class="vs-btn vs-close" aria-label="Close video">✕</button>
      </div>
    </div>`;
  document.body.appendChild(videoStage);

  videoStage.querySelector(".vs-close").addEventListener("click", dismissVideoStage);
  videoStage.querySelector(".vs-fs").addEventListener("click", () => {
    if (fsElement()) exitFullscreen();
    else enterFullscreen(videoStage);
  });

  // the title bar fades away while the video plays, and comes back when you touch the screen
  const wake = () => {
    videoStage.classList.remove("is-idle");
    clearTimeout(idleTimer);
    idleTimer = setTimeout(() => {
      if (stageVideo && !stageVideo.paused) videoStage.classList.add("is-idle");
    }, 2800);
  };
  ["mousemove", "pointerdown", "touchstart", "keydown"].forEach((ev) =>
    videoStage.addEventListener(ev, wake, { passive: true }));
  videoStage._wake = wake;
}

function openVideoStage(g) {
  if (!videoStage) buildVideoStage();
  closeVideoStage();

  videoStage.querySelector(".vs-name").textContent = g.name;
  videoStage.querySelector(".vs-rel").textContent = g.relation || "";

  const video = document.createElement("video");
  video.className = "vs-video";
  video.controls = true;
  video.playsInline = true;
  video.setAttribute("playsinline", "");
  video.preload = "auto";

  // background music goes down to 50% while the video plays and comes back after
  video.addEventListener("play", () => Music.duck(true));
  video.addEventListener("pause", () => Music.duck(false));
  video.addEventListener("ended", () => {
    if (stageVideo !== video) return;
    closeVideoStage();
    showWishCard(g);   // then show the greeting card with the message and photo
  });
  video.addEventListener("error", () => {
    if (stageVideo !== video) return;
    closeVideoStage();
    showWishCard(g);   // the video file could not be loaded: show the card instead
  }, { once: true });

  video.src = g.video;
  videoStage.appendChild(video);
  stageVideo = video;

  videoStage.classList.remove("hidden");
  document.body.classList.add("no-scroll");
  videoStage._wake();
  enterFullscreen(videoStage);

  const p = video.play();
  if (p && p.catch) p.catch(() => { /* blocked by the browser: the controls let her press play */ });
}

function closeVideoStage() {
  if (!videoStage) return;
  clearTimeout(idleTimer);
  if (stageVideo) {
    const v = stageVideo;
    stageVideo = null;
    v.pause();
    v.removeAttribute("src");
    v.load();
    v.remove();
  }
  Music.duck(false);
  videoStage.classList.add("hidden");
  videoStage.classList.remove("is-idle");
  exitFullscreen();
}

// the X button / Escape: close the video and go back to the page
function dismissVideoStage() {
  closeVideoStage();
  document.body.classList.remove("no-scroll");
}

function showWishCard(g) {
  const stage = $("#wish-stage");
  stage.innerHTML = "";

  const card = document.createElement("div");

  card.appendChild(createAvatarImg(g, "slide-avatar"));

  const name = document.createElement("h2");
  name.className = "script slide-name";
  name.textContent = g.name;
  card.appendChild(name);

  if (g.relation) {
    const rel = document.createElement("span");
    rel.className = "slide-relation";
    rel.textContent = g.relation;
    card.appendChild(rel);
  }

  const message = document.createElement("p");
  message.className = "slide-message";
  message.textContent = g.message;
  card.appendChild(message);

  if (g.photo) {
    const frame = document.createElement("div");
    frame.className = "slide-photo";
    const img = document.createElement("img");
    img.alt = "A memory with " + g.name;
    img.addEventListener("error", () => { img.src = makePlaceholder("Memory with " + g.name); }, { once: true });
    img.src = g.photo;
    frame.appendChild(img);
    card.appendChild(frame);
  }

  if (g.audio) {
    const audio = document.createElement("audio");
    audio.className = "slide-audio";
    audio.controls = true;
    audio.preload = "metadata";
    audio.src = g.audio;
    audio.addEventListener("error", () => audio.remove(), { once: true });
    card.appendChild(audio);
  }

  stage.appendChild(card);
  wishModal.classList.remove("hidden");
  document.body.classList.add("no-scroll");
}

function openWishModal(g) {
  if (g.video) openVideoStage(g);
  else showWishCard(g);
}

function closeWishModal() {
  const stage = $("#wish-stage");
  stage.querySelectorAll("video, audio").forEach((m) => m.pause());
  wishModal.classList.add("hidden");
  document.body.classList.remove("no-scroll");
}

function setupWishModal() {
  $("#wish-close").addEventListener("click", closeWishModal);
  wishModal.addEventListener("click", (e) => {
    if (e.target === wishModal) closeWishModal();
  });
}

/* MESSAGE WALL */
function renderMessages() {
  const grid = $("#notes-grid");
  const colors = ["note-pink", "note-purple", "note-cream", "note-mint"];

  GREETERS.forEach((g, i) => {
    const note = document.createElement("article");
    note.className = `note ${colors[i % colors.length]} reveal`;
    note.style.setProperty("--rot", rand(-3.5, 3.5).toFixed(1) + "deg");

    const text = document.createElement("p");
    text.className = "note-text";
    text.textContent = g.message;

    const foot = document.createElement("div");
    foot.className = "note-foot";

    const who = document.createElement("div");
    const from = document.createElement("p");
    from.className = "note-from";
    from.textContent = "— " + g.name;
    who.appendChild(from);
    if (g.relation) {
      const rel = document.createElement("p");
      rel.className = "note-rel";
      rel.textContent = g.relation;
      who.appendChild(rel);
    }

    foot.append(who, createAvatarImg(g, "note-avatar"));
    note.append(text, foot);
    grid.appendChild(note);
  });
}

/* REASONS GRID */
function renderReasons() {
  const grid = $("#reasons-grid");

  REASONS.forEach((reason, i) => {
    const card = document.createElement("article");
    card.className = "reason-card reveal";

    const num = document.createElement("div");
    num.className = "reason-num";
    num.textContent = i + 1;

    const text = document.createElement("p");
    text.className = "reason-text";
    text.textContent = reason;

    card.append(num, text);
    grid.appendChild(card);
  });
}

/* PHOTO GALLERY */
let currentFilter = "All";

function renderGallery() {
  const grid = $("#gallery-grid");

  PHOTOS.forEach((photo) => {
    const figure = document.createElement("figure");
    figure.className = "photo";
    figure.dataset.category = photo.category;
    figure.tabIndex = 0;
    figure.setAttribute("role", "button");
    figure.setAttribute("aria-label", "Open photo: " + photo.caption);

    const img = document.createElement("img");
    img.alt = photo.caption;
    img.loading = "lazy";
    img.addEventListener("error", () => { img.src = makePlaceholder(photo.category); }, { once: true });
    img.src = photo.src;

    const caption = document.createElement("figcaption");
    caption.textContent = photo.caption;

    figure.append(img, caption);

    figure.addEventListener("click", () => openLightbox(photo));
    figure.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        openLightbox(photo);
      }
    });

    grid.appendChild(figure);
  });
}

function renderFilterTabs() {
  const tabs = $("#filter-tabs");

  GALLERY_FILTERS.forEach((name, i) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "filter-tab" + (i === 0 ? " active" : "");
    btn.textContent = name;
    btn.setAttribute("role", "tab");
    btn.setAttribute("aria-selected", i === 0 ? "true" : "false");

    btn.addEventListener("click", () => {
      currentFilter = name;

      tabs.querySelectorAll(".filter-tab").forEach((t) => {
        t.classList.remove("active");
        t.setAttribute("aria-selected", "false");
      });
      btn.classList.add("active");
      btn.setAttribute("aria-selected", "true");

      document.querySelectorAll("#gallery-grid .photo").forEach((photoEl) => {
        const show = name === "All" || photoEl.dataset.category === name;
        photoEl.classList.toggle("is-hidden", !show);
      });
    });

    tabs.appendChild(btn);
  });
}

/* LIGHTBOX */
const lightbox = $("#lightbox");
let lbList = [];
let lbIndex = 0;

function openLightbox(photo) {
  lbList = PHOTOS.filter((p) => currentFilter === "All" || p.category === currentFilter);
  lbIndex = Math.max(0, lbList.indexOf(photo));
  showLightboxPhoto();
  lightbox.classList.remove("hidden");
  document.body.classList.add("no-scroll");
}

function closeLightbox() {
  lightbox.classList.add("hidden");
  if (wishModal.classList.contains("hidden")) document.body.classList.remove("no-scroll");
}

function showLightboxPhoto() {
  const photo = lbList[lbIndex];
  const img = $("#lb-img");
  img.onerror = () => {
    img.onerror = null;
    img.src = makePlaceholder(photo.category);
  };
  img.src = photo.src;
  img.alt = photo.caption;
  $("#lb-caption").textContent = photo.caption;

  const single = lbList.length < 2;
  $("#lb-prev").classList.toggle("hidden", single);
  $("#lb-next").classList.toggle("hidden", single);
}

function stepLightbox(delta) {
  if (lbList.length < 2) return;
  lbIndex = (lbIndex + delta + lbList.length) % lbList.length;
  showLightboxPhoto();
}

function setupLightbox() {
  $("#lb-close").addEventListener("click", closeLightbox);
  $("#lb-prev").addEventListener("click", () => stepLightbox(-1));
  $("#lb-next").addEventListener("click", () => stepLightbox(1));
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) closeLightbox();
  });
  addSwipe(lightbox, () => stepLightbox(1), () => stepLightbox(-1));
}

/* GIFT BOXES */
function renderGifts() {
  const grid = $("#gifts-grid");

  GIFTS.forEach((gift) => {
    const card = document.createElement("div");
    card.className = "gift-card reveal";

    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "gift-btn";
    btn.setAttribute("aria-label", "Open gift: " + gift.label);
    btn.innerHTML = `
      <div class="gift-box" aria-hidden="true">
        <div class="gift-lid"></div>
        <div class="gift-body"></div>
      </div>
      <span class="gift-label"></span>`;
    btn.querySelector(".gift-label").textContent = gift.label;

    const reveal = document.createElement("div");
    reveal.className = "gift-reveal";
    const msg = document.createElement("p");
    msg.className = "gift-message";
    msg.textContent = gift.message;
    const from = document.createElement("p");
    from.className = "gift-from";
    from.textContent = "— " + gift.from;
    reveal.append(msg, from);

    btn.addEventListener("click", () => {
      if (card.classList.contains("opened")) return;
      card.classList.add("opened");
      btn.querySelector(".gift-label").textContent = "Opened 💝";

      const rect = btn.getBoundingClientRect();
      Confetti.burst(rect.left + rect.width / 2, rect.top + rect.height / 3, 45);
    });

    card.append(btn, reveal);
    grid.appendChild(card);
  });
}

/* GUESTBOOK */
const GUESTBOOK_KEY = "birthdayGuestbookEntries";

function loadEntries() {
  try {
    const saved = JSON.parse(localStorage.getItem(GUESTBOOK_KEY));
    return Array.isArray(saved) ? saved : [];
  } catch (e) {
    return [];
  }
}

function saveEntries(entries) {
  try {
    localStorage.setItem(GUESTBOOK_KEY, JSON.stringify(entries));
  } catch (e) {
    showToast("Couldn't save your entry in this browser.");
  }
}

function renderGuestbook() {
  const list = $("#guest-list");
  const entries = loadEntries();
  list.innerHTML = "";

  if (entries.length === 0) {
    const empty = document.createElement("p");
    empty.className = "guest-empty";
    empty.textContent = "No entries yet — be the first to sign! 💌";
    list.appendChild(empty);
    return;
  }

  entries.slice().reverse().forEach((entry) => {
    const item = document.createElement("article");
    item.className = "guest-entry";

    const name = document.createElement("p");
    name.className = "guest-entry-name";
    name.textContent = entry.name;

    const date = document.createElement("p");
    date.className = "guest-entry-date";
    date.textContent = new Date(entry.time).toLocaleString([], { dateStyle: "medium", timeStyle: "short" });

    const msg = document.createElement("p");
    msg.className = "guest-entry-msg";
    msg.textContent = entry.message;

    item.append(name, date, msg);
    list.appendChild(item);
  });
}

function setupGuestbook() {
  const form = $("#guest-form");
  const nameInput = $("#guest-name");
  const msgInput = $("#guest-message");
  const counter = $("#char-count");

  msgInput.addEventListener("input", () => {
    counter.textContent = msgInput.value.length;
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const name = nameInput.value.trim();
    const message = msgInput.value.trim();
    if (!name || !message) return;

    const entries = loadEntries();
    entries.push({ name, message, time: Date.now() });
    saveEntries(entries);

    form.reset();
    counter.textContent = "0";
    renderGuestbook();
    showToast("Thank you! Your message was added 💖");
  });

  renderGuestbook();
}

/* BACKGROUND MUSIC
   - starts by itself when the site opens and loops forever
   - browsers only allow sound after a first tap/click/key press, so if the
     browser blocks the automatic start, the music begins on her very first touch
     (typing the secret code or pressing "Unlock" counts)
   - Music.duck(true) lowers it to CONFIG.musicDuckTo (50%) while a video plays
   - the round button only pauses / resumes it */
const Music = (() => {
  let audio = null;
  let btn = null;
  let icon = null;
  let userPaused = false;   // true only when she pressed the music button to stop it
  let ducked = false;
  let fadeTimer = null;
  let armed = false;

  const clamp01 = (v) => Math.max(0, Math.min(1, Number(v) || 0));
  const targetVolume = () => clamp01(CONFIG.musicVolume) * (ducked ? clamp01(CONFIG.musicDuckTo) : 1);

  function setUI(isPlaying) {
    if (!btn) return;
    btn.classList.toggle("playing", isPlaying);
    btn.setAttribute("aria-pressed", String(isPlaying));
    icon.textContent = isPlaying ? "🔊" : "🎵";
  }

  function fadeTo(v, ms = 500) {
    clearInterval(fadeTimer);
    const from = audio.volume;
    const t0 = performance.now();
    fadeTimer = setInterval(() => {
      const k = Math.min(1, (performance.now() - t0) / ms);
      audio.volume = clamp01(from + (v - from) * k);
      if (k >= 1) clearInterval(fadeTimer);
    }, 40);
  }

  // wait for the first tap / click / key press, then try again
  function armGesture() {
    if (armed) return;
    armed = true;
    const events = ["pointerdown", "touchend", "click", "keydown"];
    const onGesture = (e) => {
      if (e.target && e.target.closest && e.target.closest("#music-btn")) return;   // the button handles itself
      events.forEach((ev) => document.removeEventListener(ev, onGesture, true));
      armed = false;
      tryPlay();
    };
    events.forEach((ev) => document.addEventListener(ev, onGesture, true));
  }

  function tryPlay() {
    if (!audio || userPaused || !audio.paused) return;
    const p = audio.play();
    if (p && p.catch) p.catch(() => armGesture());
  }

  function init() {
    btn = $("#music-btn");
    icon = $("#music-icon");
    audio = new Audio(CONFIG.musicFile);
    audio.loop = true;
    audio.preload = "auto";
    audio.volume = targetVolume();

    audio.addEventListener("play", () => setUI(true));
    audio.addEventListener("pause", () => setUI(false));
    audio.addEventListener("ended", () => { audio.currentTime = 0; tryPlay(); });   // safety net for the loop

    btn.addEventListener("click", () => {
      if (audio.paused) {
        userPaused = false;
        audio.play().catch(() => {
          showToast("Add a music file at " + CONFIG.musicFile + " to hear the song 🎶");
        });
      } else {
        userPaused = true;
        audio.pause();
      }
    });

    // coming back to the tab (or unlocking the phone): carry on playing
    document.addEventListener("visibilitychange", () => { if (!document.hidden) tryPlay(); });

    tryPlay();   // try right away; if blocked, the first touch starts it
  }

  return {
    init,
    start: tryPlay,
    duck(on) {
      ducked = !!on;
      if (audio) fadeTo(targetVolume());
    },
  };
})();

function setupMusic() {
  Music.init();
}

function observeReveals() {
  const items = document.querySelectorAll(".reveal:not(.in-view)");

  if (!("IntersectionObserver" in window)) {
    items.forEach((el) => el.classList.add("in-view"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  items.forEach((el) => observer.observe(el));
}

function setupKeyboard() {
  document.addEventListener("keydown", (e) => {
    if (isVideoStageOpen()) {
      if (e.key === "Escape") dismissVideoStage();
      return;
    }
    if (!lightbox.classList.contains("hidden")) {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") stepLightbox(-1);
      if (e.key === "ArrowRight") stepLightbox(1);
      return;
    }
    if (!wishModal.classList.contains("hidden")) {
      if (e.key === "Escape") closeWishModal();
    }
  });
}

/* =========================================================
   COVER PAGE: A CAKE THAT SPINS + PHOTOS ORBITING AS POLAROIDS
   The cake is drawn as an SVG and its decorations (sprinkles, drips,
   macarons, kisses, candles) travel around the cylinders as it turns,
   so it really looks like it is rotating. Drag / swipe sideways to
   spin it (it keeps gliding after you let go). Tap a polaroid to open it.
   ========================================================= */
function setupHeroOrbit() {
  const stage = $("#orbit-stage");
  const cakeHost = $("#orbit-cake");
  const polHost = $("#orbit-polaroids");
  if (!stage || !cakeHost) return;

  const NS = "http://www.w3.org/2000/svg";
  const P = "h";                       // id prefix for this cake's gradients
  const CX = 220;
  const TOP = { cy: 166, rx: 114, ry: 22, h: 96 };   // pink tier
  const BOT = { cy: 262, rx: 146, ry: 28, h: 122 };  // purple tier
  const TAU = Math.PI * 2;
  // Idle spin speed in radians per second. It always spins (that is the point of this page);
  // phones/computers with "Reduce motion" turned on just get a gentler speed.
  const AUTO = window.matchMedia("(prefers-reduced-motion: reduce)").matches ? 0.25 : 0.6;

  let seed = 5;
  const rnd = () => { seed = (seed * 16807) % 2147483647; return (seed - 1) / 2147483646; };
  const n1 = (v) => Math.round(v * 10) / 10;
  const pick = (a) => a[Math.floor(rnd() * a.length)];
  const curve = (t, x, dy = 0) => t.cy + dy + t.ry * Math.sqrt(Math.max(0, 1 - Math.pow((x - CX) / t.rx, 2)));
  const node = (markup) => { const g = document.createElementNS(NS, "g"); g.innerHTML = markup; return g; };

  /* ---------- static parts of the cake ---------- */
  const L = CX - BOT.rx, R = CX + BOT.rx, l = CX - TOP.rx, r = CX + TOP.rx;
  let pearls = "";
  for (let x = L + 6; x <= R - 5; x += 10.8) {
    pearls += `<circle cx="${n1(x)}" cy="${n1(curve(BOT, x, BOT.h) - 5)}" r="5.2" fill="url(#${P}pearl)"/>`;
  }
  const xs = [];
  for (let x = l; x <= r; x += 4) xs.push(x);
  const topPts = xs.map((x) => `${n1(x)},${n1(curve(TOP, x, -1))}`);
  const botPts = xs.slice().reverse().map((x) => `${n1(x)},${n1(curve(TOP, x, 9))}`);

  const S = cakeShade(P);

  cakeHost.innerHTML = `<svg viewBox="30 62 380 452" xmlns="http://www.w3.org/2000/svg" focusable="false">
  <defs>${cakeDefs(P)}${cakeShadeDefs(P)}</defs>
  <ellipse cx="220" cy="290" rx="215" ry="235" fill="url(#${P}glow)"/>
  <ellipse cx="220" cy="507" rx="112" ry="8" fill="#4a3350" fill-opacity=".16" filter="url(#${P}blurS)"/>
  <ellipse cx="220" cy="496" rx="88" ry="13" fill="#d3c8e0"/>
  <ellipse cx="220" cy="490" rx="86" ry="12.5" fill="url(#${P}foot)"/>
  <path d="M198,410 C201,440 196,466 172,490 L268,490 C244,466 239,440 242,410 Z" fill="url(#${P}stem)"/>
  <ellipse cx="220" cy="398" rx="178" ry="24" fill="#d8cde3"/>
  <ellipse cx="220" cy="389" rx="184" ry="26" fill="url(#${P}plate)"/>
  <ellipse cx="220" cy="389" rx="160" ry="21" fill="none" stroke="#ece4f3" stroke-width="2"/>
  <ellipse cx="220" cy="392" rx="152" ry="22" fill="#4a3350" fill-opacity=".12" filter="url(#${P}blurS)"/>
  ${S.plate}

  <path d="M${L},${BOT.cy} L${L},${BOT.cy + BOT.h} A${BOT.rx},${BOT.ry} 0 0 0 ${R},${BOT.cy + BOT.h} L${R},${BOT.cy} A${BOT.rx},${BOT.ry} 0 0 1 ${L},${BOT.cy} Z" fill="url(#${P}gPurple)"/>
  <ellipse cx="${CX}" cy="${BOT.cy}" rx="${BOT.rx}" ry="${BOT.ry}" fill="url(#${P}gTopPurple)"/>
  <path d="M${L},${BOT.cy} A${BOT.rx},${BOT.ry} 0 0 0 ${R},${BOT.cy}" fill="none" stroke="#fff" stroke-opacity=".55" stroke-width="1.6"/>
  ${S.bottom}
  <g id="${P}FB"></g><g id="${P}SB"></g>
  <g filter="url(#${P}dropS)">${pearls}</g>
  <g id="${P}BB"></g>

  <path d="M${l},${TOP.cy} L${l},${TOP.cy + TOP.h} A${TOP.rx},${TOP.ry} 0 0 0 ${r},${TOP.cy + TOP.h} L${r},${TOP.cy} A${TOP.rx},${TOP.ry} 0 0 1 ${l},${TOP.cy} Z" fill="url(#${P}gPink)"/>
  ${S.topBody}
  <g id="${P}ST"></g>
  <ellipse cx="${CX}" cy="${TOP.cy}" rx="${TOP.rx}" ry="${TOP.ry}" fill="url(#${P}gTopPink)"/>
  <g id="${P}FT"></g>
  ${S.topFace}
  <g fill="url(#${P}icing)" stroke="#f6d3e2" stroke-width=".8"><polygon points="${topPts.concat(botPts).join(" ")}"/><g id="${P}PL"></g></g>
  ${S.ambient}
  <g id="${P}TB"></g>
  <ellipse cx="220" cy="167" rx="17" ry="4" fill="#a02a55" fill-opacity=".28"/>
  <g class="cake-heart" filter="url(#${P}dropS)">
    <path d="M220,166 C194,146 196,124 210,124 C216,124 220,129 220,133 C220,129 224,124 230,124 C244,124 246,146 220,166 Z" fill="url(#${P}heart)"/>
    <path d="M203,134 C204,128 209,127 212,129" stroke="#fff" stroke-opacity=".75" stroke-width="3" fill="none" stroke-linecap="round"/>
  </g>
  <g id="${P}TF"></g><g id="${P}BF"></g>
</svg>`;
  const grp = (id) => cakeHost.querySelector("#" + P + id);

  /* ---------- decorations that travel around the cake ---------- */
  const COLORS = ["#ff6f9f", "#ffd15c", "#6fdcc4", "#7db8ff", "#ffffff", "#ff9d63", "#b98cff"];
  const sprite = () => {
    const c = pick(COLORS);
    return rnd() < 0.3 ? `<circle r="1.8" fill="${c}"/>` : `<rect x="-4" y="-1.5" width="8" height="3" rx="1.5" fill="${c}"/>`;
  };
  const sides = [];   // things stuck on the sides (sprinkles, drips): hidden when they turn to the back
  const faces = [];   // sprinkles on the flat tops
  const rings = [];   // macarons, kisses and candles standing on the tops

  const addSides = (host, t, count, from, to) => {
    for (let i = 0; i < count; i++) {
      const d = { t, th: rnd() * TAU, dy: from + rnd() * (to - from), rs: ` rotate(${Math.floor(rnd() * 180)})`, on: true, el: node(sprite()) };
      host.appendChild(d.el); sides.push(d);
    }
  };
  const addFaces = (host, t, count, fx, fy, top) => {
    for (let i = 0; i < count; i++) {
      const u = top ? Math.sqrt(rnd()) * 0.95 : 0.86 + rnd() * 0.14;
      const d = { t, th: rnd() * TAU, u, fx, fy, rs: ` rotate(${Math.floor(rnd() * 180)})`, el: node(sprite()) };
      host.appendChild(d.el); faces.push(d);
    }
  };
  addSides(grp("SB"), BOT, 58, 8, BOT.h - 18);
  addSides(grp("ST"), TOP, 26, 14, TOP.h - 12);
  addFaces(grp("FB"), BOT, 18, 140, 26, false);
  addFaces(grp("FT"), TOP, 24, 104, 16, true);
  for (let i = 0; i < 16; i++) {          // icing drips
    const len = 12 + rnd() * 28, w = 11 + rnd() * 4;
    const d = { t: TOP, th: ((i + rnd() * 0.6) / 16) * TAU, dy: 3, rs: "", on: true,
      el: node(`<rect x="${n1(-w / 2)}" y="0" width="${n1(w)}" height="${n1(len)}" rx="${n1(w / 2)}"/>`) };
    grp("PL").appendChild(d.el); sides.push(d);
  }

  const CORAL = "#ff8fa8", MINT = "#9be3c8", YELLOW = "#ffd86e";
  const mac = (c) => `<ellipse cy="14" rx="17" ry="4.5" fill="#5b2a4a" fill-opacity=".22"/><ellipse cy="10" rx="17" ry="6" fill="${c}"/><rect x="-17" y="3" width="34" height="9" rx="4.5" fill="#fff6e6"/><ellipse cy="0" rx="18" ry="6.2" fill="${c}"/><ellipse cy="0" rx="18" ry="6.2" fill="none" stroke="#fff" stroke-opacity=".4" stroke-width="1.6" stroke-dasharray="1.5 1.7"/><ellipse cy="-2" rx="17" ry="8" fill="${c}"/><ellipse cy="-2" rx="17" ry="8" fill="url(#${P}mshade)"/><ellipse cx="-5" cy="-5" rx="7" ry="2.2" fill="#fff" fill-opacity=".5"/>`;
  const kiss = () => `<ellipse cy="9" rx="15" ry="4" fill="#5b2a4a" fill-opacity=".22"/><g stroke="#dcc6d4" stroke-opacity=".7" stroke-width=".7"><ellipse cy="6" rx="15" ry="5.5" fill="url(#${P}kiss)"/><ellipse cy="-1" rx="12.5" ry="5.2" fill="url(#${P}kiss)"/><ellipse cy="-8" rx="10" ry="4.6" fill="url(#${P}kiss)"/><ellipse cy="-14" rx="7" ry="4" fill="url(#${P}kiss)"/><path d="M-4.5,-15 C-3,-22 1,-24 2,-30 C4,-24 6,-19 4.5,-15 Z" fill="url(#${P}kiss)"/></g>`;
  const candle = (h, c) => `<ellipse cy="1" rx="5" ry="2" fill="#5b2a4a" fill-opacity=".3"/><rect x="-2.8" y="${-h}" width="5.6" height="${h}" rx="2.4" fill="${c}"/><rect x="-2.8" y="${-h}" width="5.6" height="${h}" rx="2.4" fill="url(#${P}twist)"/><rect x="-1.9" y="${-h + 2}" width="1.1" height="${h - 4}" rx=".5" fill="#fff" fill-opacity=".45"/><path d="M0,${-h} Q1.2,${-h - 2} .5,${-h - 4}" stroke="#4a3340" stroke-width="1.1" fill="none" stroke-linecap="round"/><circle cx=".5" cy="${-h - 10}" r="10" fill="url(#${P}halo)"/><path class="hero-flame" d="M.5,${-h - 4} C-2.9,${-h - 7} -2.1,${-h - 13} .5,${-h - 18} C3.1,${-h - 13} 3.9,${-h - 7} .5,${-h - 4} Z" fill="url(#${P}flame)" style="animation-delay:-${n1(rnd() * 2)}s;animation-duration:${n1(0.55 + rnd() * 0.5)}s"/>`;
  const addRing = (t, rx, ry, th, sc, markup) => { const el = node(markup); rings.push({ t, rx, ry, th, sc, y: 0, el, flame: el.querySelector(".hero-flame"), w: 0 }); }

  const topCols = [CORAL, MINT, YELLOW, CORAL, MINT];
  for (let i = 0; i < 10; i++) addRing(TOP, 98, 17, (i / 10) * TAU, i % 2 ? 1.15 : 0.95, i % 2 ? kiss() : mac(topCols[i >> 1]));
  const CC = ["#a6e3c9", "#ffe07a", "#ffb3cf", "#c9b0ff", "#ffc7a6"], CH = [46, 52, 44, 50, 48];
  for (let i = 0; i < 5; i++) addRing(TOP, 44, 8, ((i + 0.4) / 5) * TAU, 1, candle(CH[i], CC[i]));
  for (let i = 0; i < 8; i++) addRing(BOT, 131, 25, (i / 8) * TAU + 0.2, i % 2 ? 1.15 : 0.95, i % 2 ? kiss() : mac(i % 4 ? YELLOW : MINT));

  const layers = { tb: grp("TB"), tf: grp("TF"), bb: grp("BB"), bf: grp("BF") };
  // Keep each layer sorted back-to-front (only touches the DOM when the order really changes)
  const order = (g, list) => {
    list.sort((a, b) => a.y - b.y);
    list.forEach((d, i) => { if (g.children[i] !== d.el) g.insertBefore(d.el, g.children[i] || null); });
  };

  let phi = 0; // how far the cake has turned (radians)
  function drawCake(v) {
    for (const d of sides) {
      const a = d.th + phi, c = Math.cos(a);
      if (c < 0.07) { if (d.on) { d.el.style.display = "none"; d.on = false; } continue; }   // on the far side
      if (!d.on) { d.el.style.display = ""; d.on = true; }
      d.el.setAttribute("transform",
        `translate(${(CX + d.t.rx * Math.sin(a)).toFixed(1)} ${(d.t.cy + d.t.ry * c + d.dy).toFixed(1)}) scale(${c.toFixed(2)} 1)${d.rs}`);
    }
    for (const d of faces) {
      const a = d.th + phi;
      d.el.setAttribute("transform",
        `translate(${(CX + d.fx * d.u * Math.sin(a)).toFixed(1)} ${(d.t.cy + d.fy * d.u * Math.cos(a)).toFixed(1)})${d.rs}`);
    }
    const lists = { tb: [], tf: [], bb: [], bf: [] };
    for (const d of rings) {
      const a = d.th + phi, c = Math.cos(a);
      d.y = d.t.cy + d.ry * c;
      if (d.flame) {   // the flame bends against the movement, like in real air
        const w = Math.max(-18, Math.min(18, -c * v * 4));
        if (Math.abs(w - d.w) > 0.6) { d.w = w; d.flame.style.setProperty("--wind", w.toFixed(1) + "deg"); }
      }
      d.el.setAttribute("transform",
        `translate(${(CX + d.rx * Math.sin(a)).toFixed(1)} ${d.y.toFixed(1)}) scale(${(d.sc * (0.9 + 0.14 * c)).toFixed(3)})`);
      lists[(d.t === TOP ? "t" : "b") + (c < 0 ? "b" : "f")].push(d);
    }
    for (const k in lists) order(layers[k], lists[k]);
  }

  /* ---------- the polaroids ---------- */
  const rn = (v) => v;
  const pols = PHOTOS.slice(0, 10).map((photo, i) => {
    const fig = document.createElement("figure");
    fig.className = "polaroid";
    fig.dataset.i = i;
    const img = document.createElement("img");
    img.alt = photo.caption;
    img.draggable = false;
    img.addEventListener("error", () => { img.src = makePlaceholder(photo.category); }, { once: true });
    img.src = photo.src;
    const cap = document.createElement("figcaption");
    cap.textContent = photo.caption;
    fig.append(img, cap);
    polHost.appendChild(fig);
    return { el: fig, photo, tilt: (rnd() - 0.5) * 14, sw: 0, swv: 0 };
  });

  let W = 0, RX = 0, RY = 0, orb = 0;
  function measure() {
    W = stage.clientWidth;
    RX = Math.min(W * 0.37, 250);
    RY = Math.min(stage.clientHeight * 0.2, RX * 0.3);
  }
  function drawPolaroids(dt, v) {
    const target = Math.max(-13, Math.min(13, -v * 5));   // they trail behind the motion
    pols.forEach((p, i) => {
      const a = orb + (i / pols.length) * TAU, s = Math.sin(a), c = Math.cos(a), t = (c + 1) / 2;   // c = 1 -> in front of the cake
      p.swv += ((target - p.sw) * 55 - p.swv * 5) * dt;   // a springy pendulum
      p.sw += p.swv * dt;
      p.el.style.transform =
        `translate(-50%,-50%) translate(${(s * RX).toFixed(1)}px,${(c * RY).toFixed(1)}px) scale(${(0.6 + 0.5 * t).toFixed(3)}) rotate(${(p.tilt * 0.5 + s * 5 + p.sw).toFixed(1)}deg)`;
      p.el.style.zIndex = Math.round(t * 40);   // below 20 = behind the cake, above 20 = in front of it
      p.el.style.opacity = (0.6 + 0.4 * t).toFixed(2);
    });
  }
  if ("ResizeObserver" in window) new ResizeObserver(measure).observe(stage);
  else window.addEventListener("resize", measure);

  /* ---------- drag / swipe to spin ---------- */
  let spin = 0;          // extra speed from the finger (radians per second), fades out by itself
  let dir = 1;           // which way it idles after a flick
  let dragging = false, pid = null, lastX = 0, lastT = 0, travelled = 0, downPol = null;

  stage.addEventListener("pointerdown", (e) => {
    if (e.pointerType === "mouse" && e.button !== 0) return;
    dragging = true; pid = e.pointerId; lastX = e.clientX; lastT = performance.now();
    travelled = 0; spin = 0;
    downPol = e.target.closest(".polaroid");
    stage.classList.add("is-dragging");
  });
  window.addEventListener("pointermove", (e) => {
    if (!dragging || e.pointerId !== pid) return;
    const now = performance.now(), dx = e.clientX - lastX, da = dx * 0.012;
    travelled += Math.abs(dx);
    phi += da; orb += da * 0.7;
    spin = spin * 0.5 + (da / Math.max(0.008, (now - lastT) / 1000)) * 0.5;
    lastX = e.clientX; lastT = now;
  });
  function endDrag(e) {
    if (!dragging || (e && e.pointerId !== pid)) return;
    dragging = false;
    stage.classList.remove("is-dragging");
    if (performance.now() - lastT > 90) spin = 0;
    spin = Math.max(-12, Math.min(12, spin));
    if (Math.abs(spin) > 1.5) dir = spin > 0 ? 1 : -1;
    if (travelled < 6 && downPol) openLightbox(pols[+downPol.dataset.i].photo);   // a tap, not a drag
  }
  window.addEventListener("pointerup", endDrag);
  window.addEventListener("pointercancel", endDrag);

  /* ---------- animation loop (idle spin + momentum) ---------- */
  let last = 0;
  function frame(now) {
    requestAnimationFrame(frame);
    const dt = Math.min(0.05, (now - last) / 1000 || 0.016);
    last = now;
    if (!stage.offsetWidth) return;                                   // site not shown yet
    const page = stage.closest(".page");
    if (page && !page.classList.contains("is-active")) return;        // another page is open
    let v = spin;
    if (!dragging) {
      spin *= Math.exp(-dt * 1.5);
      v = AUTO * dir + spin;
      phi += v * dt;
      orb += v * 0.7 * dt;
    }
    drawCake(v);
    drawPolaroids(dt, v * 0.7);
  }
  measure();
  drawCake(0);
  drawPolaroids(0, 0);
  requestAnimationFrame(frame);
}

/* =========================================================
   COVER POSTER: sticker lettering, torn paper, glitter stars
   Everything on the poster is built from your settings:
   the name (CONFIG.herName), the date (CONFIG.birthday) and the
   texts in index.html (#poster-come, #poster-age).
   ========================================================= */
function setupPoster() {
  const poster = $("#poster");
  if (!poster) return;

  const COLORS = ["#ff5a5f", "#ff9f1c", "#2d8cf0", "#4cb944", "#e85d9e", "#8e5cf7", "#f4c20d"];
  const rnd = (a, b) => a + Math.random() * (b - a);

  // a ripped-paper outline for clip-path
  const tear = () => {
    const pts = [];
    for (let i = 0; i < 6; i++) pts.push(`${Math.min(100, i * 20 + rnd(0, 6)).toFixed(1)}% ${rnd(0, 5).toFixed(1)}%`);
    for (let i = 0; i < 4; i++) pts.push(`${rnd(95, 100).toFixed(1)}% ${(15 + i * 24 + rnd(0, 6)).toFixed(1)}%`);
    for (let i = 5; i >= 0; i--) pts.push(`${Math.min(100, i * 20 + rnd(0, 6)).toFixed(1)}% ${rnd(95, 100).toFixed(1)}%`);
    for (let i = 3; i >= 0; i--) pts.push(`${rnd(0, 5).toFixed(1)}% ${(15 + i * 24 + rnd(0, 6)).toFixed(1)}%`);
    return `polygon(${pts.join(",")})`;
  };
  const setTear = (el) => el && el.style.setProperty("--tear", tear());

  // one torn-paper sticker per letter, each with its own marker colour
  const letters = (text, offset = 0) =>
    [...text].map((ch, i) =>
      ch === " "
        ? `<span class="sp"></span>`
        : `<span class="sl" style="--r:${rnd(-6, 6).toFixed(1)}deg;--c:${COLORS[(i + offset) % COLORS.length]}"><i style="--tear:${tear()}">${ch}</i></span>`
    ).join("");

  /* ----- name: "SOFIA'S" ----- */
  const nameEl = $("#hero-name");
  const nameText = nameEl.textContent.trim();
  const stickerName = (nameText + "'s").toUpperCase();
  nameEl.setAttribute("aria-label", nameText + "'s");
  nameEl.style.setProperty("--n", stickerName.length);
  nameEl.innerHTML = letters(stickerName) +
    `<svg class="hat" viewBox="0 0 60 80" aria-hidden="true"><defs><linearGradient id="hatG" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#bfe3ff"/><stop offset="1" stop-color="#ffc9de"/></linearGradient></defs>
      <path d="M30,6 L55,73 L5,73 Z" fill="#fff" stroke="#fff" stroke-width="7" stroke-linejoin="round"/>
      <path d="M30,6 L55,73 L5,73 Z" fill="url(#hatG)"/>
      <path d="M30,22 l2,4 4,.6 -3,3 .8,4 -3.8,-2 -3.8,2 .8,-4 -3,-3 4,-.6z M20,50 l1.6,3.2 3.4,.5 -2.5,2.4 .6,3.4 -3.1,-1.6 -3.1,1.6 .6,-3.4 -2.5,-2.4 3.4,-.5z M40,46 l1.6,3.2 3.4,.5 -2.5,2.4 .6,3.4 -3.1,-1.6 -3.1,1.6 .6,-3.4 -2.5,-2.4 3.4,-.5z" fill="#ff9f1c"/>
      <circle cx="30" cy="6" r="6" fill="#ff7aa8" stroke="#fff" stroke-width="2.5"/></svg>`;

  /* ----- age: "20th" ----- */
  const ageEl = $("#poster-age");
  if (ageEl) ageEl.innerHTML = letters(ageEl.textContent.trim(), 3);

  /* ----- date on a torn notebook page: "DEC, 14" ----- */
  const dateEl = $("#poster-date");
  const d = new Date(CONFIG.birthday);
  if (dateEl && !isNaN(d)) {
    const MON = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
    const txt = `${MON[d.getMonth()]}, ${d.getDate()}`;
    dateEl.innerHTML = `<span class="paper" style="--tear:${tear()}">${[...txt].map((c, i) => `<b style="color:${COLORS[i % COLORS.length]}">${c}</b>`).join("")}</span>`;
  } else if (dateEl) {
    dateEl.remove();
  }

  /* ----- torn paper for the countdown, celebration and pill ----- */
  poster.querySelectorAll(".time-box, .celebration, .poster-pill .paper").forEach(setTear);

  /* ----- glitter star stickers ----- */
  const STARS = [
    [5, 9, 12, "#ffb347", "#ff7a00", -14], [80, 4, 13, "#ff9ec0", "#e8588f", 16],
    [2, 31, 10, "#41c4d3", "#169aa8", 10], [86, 29, 11, "#ff9ec0", "#e8588f", -12],
    [72, 41, 8, "#ff6b6b", "#d62839", 14], [10, 55, 9, "#58c06a", "#2a8a3e", -18],
    [88, 56, 7, "#ffb347", "#ff7a00", 22],
  ];
  $("#poster-stars").innerHTML = STARS.map(([x, y, s, c1, c2, r], i) => `
    <svg class="pstar" style="left:${x}%;top:${y}%;width:${s}cqw;--r:${r}deg;animation-delay:-${(i * 0.7).toFixed(1)}s" viewBox="0 0 100 100">
      <defs><radialGradient id="pst${i}" cx=".35" cy=".3" r=".9"><stop offset="0" stop-color="#fff" stop-opacity=".95"/><stop offset=".3" stop-color="${c1}"/><stop offset="1" stop-color="${c2}"/></radialGradient></defs>
      <path d="M50,8 L61,38 L93,38 L67,57 L77,90 L50,70 L23,90 L33,57 L7,38 L39,38 Z" fill="url(#pst${i})" stroke="#fff" stroke-width="8" stroke-linejoin="round" paint-order="stroke"/>
      <circle cx="40" cy="34" r="2.4" fill="#fff" fill-opacity=".9"/><circle cx="62" cy="52" r="1.8" fill="#fff" fill-opacity=".8"/><circle cx="46" cy="64" r="1.5" fill="#fff" fill-opacity=".7"/></svg>`).join("");
}

/* =========================================================
   PAGE-BY-PAGE NAVIGATION
   Every section is its own full-screen page. Change page with:
   swipe up/down, mouse wheel, arrow keys / PageUp / PageDown / Space,
   the dots on the right, or the arrow at the bottom.
   A page taller than the screen scrolls inside itself first.
   ========================================================= */
const Pager = (() => {
  const site = $("#site");
  const box = $("#pager");
  const dots = $("#pager-dots");
  const count = $("#pager-count");
  const nextBtn = $("#pager-next");
  const LABELS = {
    home: "Home", "cake-spin": "Spin the cake", teaser: "Sneak peek", "cake-section": "Make a wish", "slot-machine-section": "Video wishes",
    messages: "Birthday wishes", reasons: "Reasons", gallery: "Memories", gifts: "Gifts", guestbook: "Guestbook",
  };

  let pages = [], idx = 0, started = false, navLock = 0, wheelAt = 0, wheelDone = false, touch = null;

  const busy = () => document.body.classList.contains("no-scroll") || document.body.classList.contains("is-locked");
  const canScroll = (p, d) => (d > 0 ? p.scrollTop + p.clientHeight < p.scrollHeight - 3 : p.scrollTop > 3);
  const skipTarget = (el) => !!(el && el.closest && el.closest("input, textarea, select, video, audio, [contenteditable]"));

  function collect() {
    document.querySelectorAll("#home, #cake-spin, #teaser, #reveal-content > section, #reveal-content > footer")
      .forEach((el) => el.classList.add("page"));
    pages = [...site.querySelectorAll(".page")].filter((p) => !p.closest(".hidden"));
  }

  function buildDots() {
    dots.innerHTML = "";
    pages.forEach((p, i) => {
      const b = document.createElement("button");
      b.type = "button";
      b.className = "pager-dot";
      b.dataset.label = LABELS[p.id] || "The end";
      b.setAttribute("aria-label", "Go to: " + b.dataset.label);
      b.addEventListener("click", () => go(i));
      dots.appendChild(b);
    });
  }

  function render() {
    pages.forEach((p, i) => {
      p.classList.toggle("is-active", i === idx);
      p.classList.toggle("is-before", i < idx);
    });
    [...dots.children].forEach((b, i) => b.classList.toggle("is-active", i === idx));
    document.body.style.setProperty("--page", idx);
    count.textContent = String(idx + 1).padStart(2, "0") + " / " + String(pages.length).padStart(2, "0");
    nextBtn.classList.toggle("hidden", idx >= pages.length - 1);
  }

  function go(i, force) {
    i = Math.max(0, Math.min(pages.length - 1, i));
    if (i === idx || (!force && performance.now() < navLock)) return;
    idx = i;
    navLock = performance.now() + 750;
    pages[idx].scrollTop = 0;
    render();
  }
  const step = (d) => go(idx + d);

  /* mouse wheel / trackpad */
  site.addEventListener("wheel", (e) => {
    if (!started || busy() || skipTarget(e.target)) return;
    const d = Math.sign(e.deltaY);
    if (!d || Math.abs(e.deltaY) < 4) return;
    const now = performance.now();
    const gap = now - wheelAt;
    wheelAt = now;
    if (gap > 160) wheelDone = false;                       // a new scroll gesture starts after a pause
    if (canScroll(pages[idx], d)) { wheelDone = true; return; }  // let the page scroll inside itself first
    e.preventDefault();
    if (wheelDone || now < navLock) return;
    wheelDone = true;
    step(d);
  }, { passive: false });

  /* finger swipe up / down */
  site.addEventListener("touchstart", (e) => {
    if (!started || busy() || e.touches.length !== 1 || skipTarget(e.target)) { touch = null; return; }
    touch = { x: e.touches[0].clientX, y: e.touches[0].clientY, top: pages[idx].scrollTop };
  }, { passive: true });
  site.addEventListener("touchend", (e) => {
    if (!touch) return;
    const t = e.changedTouches[0], dx = t.clientX - touch.x, dy = t.clientY - touch.y, start = touch;
    touch = null;
    if (Math.abs(dy) < 60 || Math.abs(dy) < Math.abs(dx) * 1.3) return;   // too short, or mostly sideways (spinning the cake)
    const p = pages[idx], d = dy < 0 ? 1 : -1;
    if (Math.abs(p.scrollTop - start.top) > 4 || canScroll(p, d)) return; // it was scrolling inside the page
    step(d);
  }, { passive: true });

  /* keyboard */
  document.addEventListener("keydown", (e) => {
    if (!started || busy() || e.altKey || e.ctrlKey || e.metaKey || skipTarget(e.target)) return;
    let d = 0;
    if (e.key === "ArrowDown" || e.key === "PageDown") d = 1;
    else if (e.key === "ArrowUp" || e.key === "PageUp") d = -1;
    else if (e.key === " " && e.target === document.body) d = e.shiftKey ? -1 : 1;
    else if (e.key === "Home") { e.preventDefault(); go(0); return; }
    else if (e.key === "End") { e.preventDefault(); go(pages.length - 1); return; }
    if (!d) return;
    e.preventDefault();
    const page = pages[idx];
    if (canScroll(page, d)) {      // tall page: scroll inside it first, the next press moves on
      page.scrollBy({ top: d * (e.key.startsWith("Arrow") ? 120 : page.clientHeight * 0.85), behavior: "smooth" });
      return;
    }
    step(d);
  });

  nextBtn.addEventListener("click", () => step(1));
  $("#back-top").addEventListener("click", () => go(0));

  return {
    start() {
      if (started) return;
      started = true;
      document.body.classList.add("has-pager");
      collect(); buildDots(); idx = 0; render();
      box.classList.remove("hidden");
    },
    refresh(toStart) {            // call after pages appear / disappear (the reveal)
      if (!started) return;
      const cur = pages[idx];
      collect(); buildDots();
      idx = toStart ? 0 : Math.max(0, pages.indexOf(cur));
      render();
    },
    go,
  };
})();

/* =========================================================
   EXTRA DESIGN: a bunting banner on the cover, floating balloons,
   twinkling sparkles and a little card frame around every page.
   ========================================================= */
function setupDecor() {
  const rnd = (a, b) => a + Math.random() * (b - a);
  const PASTELS = [["#ff9fc4", "#e0568f"], ["#c9b0ff", "#8d63d8"], ["#ffe08a", "#f0b429"], ["#9be3c8", "#3fb68f"], ["#ffb88a", "#ee7f45"], ["#8ec5ff", "#4a8fe0"]];
  const SPARK = ["#ffd166", "#ff8fb7", "#ffffff", "#c9b0ff"];

  /* ----- a layer behind the pages with balloons + sparkles ----- */
  const layer = document.createElement("div");
  layer.className = "decor";
  layer.setAttribute("aria-hidden", "true");

  for (let i = 0; i < 7; i++) {
    const [c1, c2] = PASTELS[i % PASTELS.length];
    const b = document.createElement("div");
    b.className = "balloon";
    b.style.cssText = `left:${rnd(3, 92).toFixed(1)}%;width:${rnd(38, 64).toFixed(0)}px;animation-duration:${rnd(28, 46).toFixed(1)}s;animation-delay:-${rnd(0, 40).toFixed(1)}s`;
    b.innerHTML = `<svg viewBox="0 0 60 112" style="animation-duration:${rnd(4, 7).toFixed(1)}s;animation-delay:-${rnd(0, 5).toFixed(1)}s">
      <defs><radialGradient id="bl${i}" cx=".35" cy=".3" r=".8"><stop offset="0" stop-color="#fff" stop-opacity=".9"/><stop offset=".25" stop-color="${c1}"/><stop offset="1" stop-color="${c2}"/></radialGradient></defs>
      <path d="M30,2 C8,2 2,24 8,42 C14,60 24,68 30,70 C36,68 46,60 52,42 C58,24 52,2 30,2 Z" fill="url(#bl${i})"/>
      <path d="M26.5,72 L33.5,72 L30,78 Z" fill="${c2}"/>
      <path d="M30,78 C24,90 36,98 30,110" stroke="#b9a7c9" stroke-width="1.2" fill="none"/>
      <ellipse cx="19" cy="20" rx="4.5" ry="9" fill="#fff" fill-opacity=".55" transform="rotate(25 19 20)"/></svg>`;
    layer.appendChild(b);
  }

  for (let i = 0; i < 18; i++) {
    const s = document.createElement("span");
    const size = rnd(8, 20).toFixed(0);
    s.className = "sparkle";
    s.style.cssText = `left:${rnd(2, 97).toFixed(1)}%;top:${rnd(3, 95).toFixed(1)}%;width:${size}px;height:${size}px;color:${SPARK[i % SPARK.length]};animation-duration:${rnd(2.4, 5).toFixed(1)}s;animation-delay:-${rnd(0, 5).toFixed(1)}s`;
    s.innerHTML = `<svg viewBox="0 0 24 24"><path d="M12,0 C13,8 16,11 24,12 C16,13 13,16 12,24 C11,16 8,13 0,12 C8,11 11,8 12,0 Z" fill="currentColor"/></svg>`;
    layer.appendChild(s);
  }
  document.body.insertBefore(layer, $("#site"));

  /* ----- a little stationery-style frame with heart corners ----- */
  const frame = document.createElement("div");
  frame.className = "frame";
  frame.setAttribute("aria-hidden", "true");
  frame.innerHTML = "<i>♥</i><i>♥</i><i>♥</i><i>♥</i>";
  document.body.appendChild(frame);

  /* ----- bunting banner across the top of the cover ----- */
  const home = $("#cake-spin");
  if (home) {
    const N = 9;
    let flags = "";
    for (let k = 0; k < N; k++) {
      const t = (k + 0.5) / N, u = 1 - t;
      const x = u * u * -10 + 2 * u * t * 200 + t * t * 410;     // a gently sagging string
      const y = u * u * 4 + 2 * u * t * 56 + t * t * 4;
      const ang = (Math.atan2(2 * u * 52 + 2 * t * -52, 2 * u * 210 + 2 * t * 210) * 180) / Math.PI;
      const [c1, c2] = PASTELS[k % PASTELS.length];
      flags += `<g transform="translate(${x.toFixed(1)} ${y.toFixed(1)}) rotate(${ang.toFixed(1)})"><path d="M-16,0 L16,0 L0,36 Z" fill="${c1}"/><path d="M-16,0 L0,0 L0,36 Z" fill="#fff" fill-opacity=".2"/><path d="M-16,0 L16,0 L0,36 Z" fill="none" stroke="${c2}" stroke-opacity=".55"/></g>`;
    }
    const bunting = document.createElement("div");
    bunting.className = "bunting";
    bunting.setAttribute("aria-hidden", "true");
    bunting.innerHTML = `<svg viewBox="0 0 400 96"><path d="M-10,4 Q200,56 410,4" stroke="#c9a9d6" stroke-width="1.6" fill="none"/>${flags}</svg>`;
    home.insertBefore(bunting, home.firstChild);
  }
}


/* =========================================================
   SCRAPBOOK COLLAGE: builds the cut-out "HAPPY BIRTHDAY" ransom letters.
   Change the words / photos in index.html (class "collage").
   ========================================================= */
function setupCollage() {
  const FONTS = ["'Anton', Impact, sans-serif", "'Playfair Display', Georgia, serif", "'Special Elite', 'Courier New', monospace", "'Chewy', cursive", "Georgia, serif"];
  const BGS = ["#ece6d8", "#d9d4c8", "#f3efe6", "#c9c3b6", "#e6dccb"];
  const rnd = (a, b) => a + Math.random() * (b - a);
  const build = (el, text, size) => {
    if (!el) return;
    el.innerHTML = [...text].map((ch, i) => {
      if (ch === " ") return '<span class="rl sp"></span>';
      const f = FONTS[(i * 3 + text.length) % FONTS.length];
      const weight = f.includes("Playfair") ? 900 : 400;
      const big = i % 3 === 0 ? 1.18 : 1;
      return `<span class="rl" style="font-family:${f};font-weight:${weight};font-size:${(size * big).toFixed(2)}cqw;--bg:${BGS[i % BGS.length]};--r:${rnd(-5, 5).toFixed(1)}deg;--y:${rnd(-.9, .9).toFixed(1)}cqw;clip-path:polygon(${rnd(0, 3).toFixed(1)}% ${rnd(0, 4).toFixed(1)}%,100% ${rnd(0, 5).toFixed(1)}%,${rnd(96, 100).toFixed(1)}% 100%,${rnd(0, 4).toFixed(1)}% ${rnd(95, 100).toFixed(1)}%)">${ch}</span>`;
    }).join("");
  };
  build($("#cl-happy"), "HAPPY", 10.5);
  build($("#cl-bday"), "BIRTHDAY", 8.8);
}

/* =========================================================
   END PAGE: SCRAPBOOK BIRTHDAY POSTER
   A paper-textured poster: her photo in black & white as a sticker, two
   silver foil "20" balloons, a glitter party hat, stars, a cake and four
   party cats, with "happy birthday" written under it.
   Everything is one SVG (drawn on a 736 x 1308 grid) built here and put
   into <div id="end-poster">. Her photo is the file "ending.jpg".
   ========================================================= */
function setupEndPoster() {
  const host = $("#end-poster");
  if (!host) return;

  let seed = 21;
  const rnd = () => { seed = (seed * 16807) % 2147483647; return (seed - 1) / 2147483646; };
  const f = (v) => v.toFixed(1);

  /* ---------- stars ---------- */
  const starPath = (r) => {
    let d = "";
    for (let i = 0; i < 10; i++) {
      const a = -Math.PI / 2 + (i * Math.PI) / 5, rr = i % 2 ? r * 0.5 : r;
      d += (i ? "L" : "M") + f(rr * Math.cos(a)) + "," + f(rr * Math.sin(a));
    }
    return d + "Z";
  };
  const STARS = [
    ["p", 140, 327, 22, -10], ["p", 212, 352, 20, 12], ["p", 70, 635, 20, 0], ["p", 485, 372, 22, 20],
    ["p", 566, 378, 26, -8], ["p", 80, 1098, 36, -12], ["p", 570, 1232, 36, 8], ["p", 708, 690, 14, 0],
    ["y", 180, 290, 16, 0], ["y", 158, 386, 20, 8], ["y", 530, 320, 19, -6], ["y", 645, 455, 24, 14],
    ["y", 30, 848, 16, 0], ["y", 215, 1213, 24, -8], ["y", 652, 1085, 26, 10], ["y", 518, 1180, 22, 0], ["y", 139, 1073, 16, 6],
    ["s", 47, 316, 14, 0], ["s", 82, 393, 28, 6], ["s", 246, 390, 12, 0], ["s", 455, 309, 12, 10], ["s", 622, 337, 26, -10],
    ["s", 10, 515, 18, 0], ["s", 719, 588, 22, 0], ["s", 20, 745, 22, 8], ["s", 52, 990, 24, -6], ["s", 722, 818, 20, 0],
    ["s", 676, 973, 16, 12], ["s", 125, 1202, 26, 0], ["s", 613, 1145, 24, -10], ["s", 724, 452, 14, 0], ["s", 645, 1198, 12, 0],
  ];
  const stars = STARS.map(([t, x, y, r, rot], i) => `
    <g transform="translate(${x} ${y}) rotate(${rot})"><g class="ep-tw" style="animation-delay:-${f(rnd() * 3)}s;animation-duration:${f(2.4 + rnd() * 2)}s">
      <path d="${starPath(r)}" fill="url(#epSt-${t})" stroke="#fff" stroke-width="${f(r * 0.3)}" stroke-linejoin="round" paint-order="stroke"/>
      ${t === "s" ? `<path d="${starPath(r * 0.42)}" fill="#454850" fill-opacity=".8"/>` : ""}
    </g></g>`).join("");

  /* ---------- silver foil balloons ---------- */
  const foil = (tag, attrs, tf = "") => {
    const base = `${attrs} fill="none" stroke-linecap="round" stroke-linejoin="round"`;
    return `<g ${tf ? `transform="${tf}"` : ""} filter="url(#epShadow)">
      <${tag} ${base} stroke="#fff" stroke-width="112"/>
      <${tag} ${base} stroke="#b4b7bf" stroke-width="100"/>
      <${tag} ${base} stroke="url(#epFoil)" stroke-width="88"/>
      <${tag} ${base} stroke="#fff" stroke-opacity=".6" stroke-width="9" transform="translate(-16 -12)"/>
    </g>`;
  };
  const balloons =
    foil("path", `d="M100,560 C100,490 150,468 196,468 C256,468 296,515 285,575 C274,632 214,682 160,742 C128,778 104,812 94,844 L304,844"`, "rotate(-7 190 650)") +
    foil("ellipse", `cx="572" cy="688" rx="80" ry="190"`, "rotate(4 572 688)");

  /* ---------- her photo, black & white, as a sticker ---------- */
  const photo = `
    <g filter="url(#epSticker)">
      <path d="M255,905 L255,480 C255,386 318,335 388,335 C458,335 520,386 520,480 L520,905 Z" fill="#dcdcdc"/>
      <g clip-path="url(#epArch)">
        <image href="ending.jpg" x="255" y="335" width="265" height="570" preserveAspectRatio="xMidYMin slice" filter="url(#epBW)"/>
      </g>
    </g>`;

  /* ---------- glitter party hat ---------- */
  let glitter = "";
  for (let i = 0; i < 70; i++) {
    const y = -165 + rnd() * 160, half = 6 + ((y + 170) / 170) * 52;
    glitter += `<circle cx="${f(-8 + (rnd() * 2 - 1) * half)}" cy="${f(y)}" r="${f(0.8 + rnd() * 1.8)}" fill="${rnd() < 0.55 ? "#fff" : "#8b8f99"}"/>`;
  }
  let frill = "";
  for (let i = 0; i < 11; i++) frill += `<circle cx="${-84 + i * 16.8}" cy="10" r="12" fill="#fff" stroke="#e3e4e8" stroke-width="1.5"/>`;
  const hat = `
    <g transform="translate(388 338) rotate(-7)" filter="url(#epSticker)">
      <ellipse cx="-4" cy="2" rx="84" ry="20" fill="#f1f1f3"/>
      ${frill}
      <ellipse cx="-4" cy="2" rx="62" ry="12" fill="#fff"/>
      <clipPath id="epHatClip"><path d="M-64,0 L-8,-172 L54,-4 Z"/></clipPath>
      <path d="M-64,0 L-8,-172 L54,-4 Z" fill="url(#epGlitter)"/>
      <g clip-path="url(#epHatClip)">${glitter}</g>
      <path d="M-8,-172 L-2,-130 L-30,-30" stroke="#fff" stroke-opacity=".5" stroke-width="5" fill="none" stroke-linecap="round"/>
      <path d="${starPath(30)}" transform="translate(-8 -182)" fill="url(#epGlitter)" stroke="#fff" stroke-width="7" stroke-linejoin="round" paint-order="stroke"/>
    </g>`;

  /* ---------- cats ---------- */
  const dots = (pts, c) => pts.map(([x, y]) => `<circle cx="${x}" cy="${y}" r="2.6" fill="${c}"/>`).join("");
  const partyHat = (c1, c2, extra, tf) => `
    <g transform="${tf}">
      <path d="M-25,0 L0,-68 L25,0 Z" fill="${c1}" stroke="${c2}" stroke-width="2" stroke-linejoin="round"/>
      ${extra}
      <rect x="-27" y="-3" width="54" height="9" rx="4.5" fill="${c2}"/>
    </g>`;
  const bow = (tf) => `
    <g transform="${tf}">
      <path d="M0,0 L-26,-15 L-26,15 Z" fill="#e53935" stroke="#a6191c" stroke-width="1.5" stroke-linejoin="round"/>
      <path d="M0,0 L26,-15 L26,15 Z" fill="#e53935" stroke="#a6191c" stroke-width="1.5" stroke-linejoin="round"/>
      <circle r="7" fill="#ef5350" stroke="#a6191c" stroke-width="1.5"/>
    </g>`;
  const catHead = ({ fur, shade, stripes = "", eye = "#d9a21b", scream = false }) => {
    const eyes = scream
      ? `<ellipse cx="-20" cy="-6" rx="6.5" ry="8.5" fill="#262626"/><ellipse cx="20" cy="-6" rx="6.5" ry="8.5" fill="#262626"/>
         <circle cx="-18" cy="-9" r="2.2" fill="#fff"/><circle cx="22" cy="-9" r="2.2" fill="#fff"/>`
      : `<circle cx="-20" cy="-5" r="10" fill="#fff"/><circle cx="20" cy="-5" r="10" fill="#fff"/>
         <circle cx="-20" cy="-5" r="8" fill="${eye}"/><circle cx="20" cy="-5" r="8" fill="${eye}"/>
         <ellipse cx="-20" cy="-5" rx="3" ry="6" fill="#222"/><ellipse cx="20" cy="-5" rx="3" ry="6" fill="#222"/>
         <circle cx="-23" cy="-9" r="2.4" fill="#fff"/><circle cx="17" cy="-9" r="2.4" fill="#fff"/>`;
    const mouth = scream
      ? `<ellipse cx="0" cy="34" rx="17" ry="20" fill="#b83a56"/><ellipse cx="0" cy="45" rx="10" ry="8" fill="#ff8aa0"/>
         <path d="M-6,18 L6,18 L0,26Z" fill="#fff"/>`
      : `<path d="M0,17 Q-7,29 -14,25 M0,17 Q7,29 14,25" stroke="#8a5a5a" stroke-width="2" fill="none" stroke-linecap="round"/>`;
    return `
      <path d="M-50,-8 L-48,-60 L-14,-42 Z" fill="${fur}" stroke="${shade}" stroke-width="2" stroke-linejoin="round"/>
      <path d="M50,-8 L48,-60 L14,-42 Z" fill="${fur}" stroke="${shade}" stroke-width="2" stroke-linejoin="round"/>
      <path d="M-42,-20 L-41,-47 L-23,-37 Z" fill="#f4b5c0"/><path d="M42,-20 L41,-47 L23,-37 Z" fill="#f4b5c0"/>
      <path d="M-53,8 C-53,-30 -30,-48 0,-48 C30,-48 53,-30 53,8 C53,38 30,55 0,55 C-30,55 -53,38 -53,8 Z" fill="${fur}" stroke="${shade}" stroke-width="2"/>
      ${stripes}
      <ellipse cx="-34" cy="16" rx="9" ry="6" fill="#ffb3c1" fill-opacity=".45"/><ellipse cx="34" cy="16" rx="9" ry="6" fill="#ffb3c1" fill-opacity=".45"/>
      ${eyes}
      <path d="M-5,11 L5,11 L0,18 Z" fill="#e88aa0"/>
      ${mouth}
      <path d="M-34,22 L-62,17 M-34,27 L-62,30 M34,22 L62,17 M34,27 L62,30" stroke="#bdbdbd" stroke-width="1.4" stroke-linecap="round"/>`;
  };
  const tabbyStripes = (c) => `<path d="M-9,-47 L-9,-31 M0,-48 L0,-28 M9,-47 L9,-31 M-50,-4 L-38,-1 M-51,8 L-39,8 M50,-4 L38,-1 M51,8 L39,8" stroke="${c}" stroke-width="3.4" stroke-linecap="round"/>`;

  // the big orange cat that sits next to the cake
  const orange = `
    <g transform="translate(208 700)" filter="url(#epSticker)">
      <path d="M62,150 C110,140 120,70 92,48" stroke="#e08f3e" stroke-width="16" fill="none" stroke-linecap="round"/>
      <ellipse cx="0" cy="130" rx="52" ry="102" fill="#f0a85a"/>
      <ellipse cx="2" cy="118" rx="24" ry="44" fill="#fff6ea"/>
      <path d="M-40,95 L-28,100 M-42,125 L-28,128 M40,95 L28,100 M42,125 L28,128 M-36,160 L-26,158 M36,160 L26,158" stroke="#c9742a" stroke-width="4" stroke-linecap="round"/>
      <rect x="-26" y="150" width="19" height="84" rx="9.5" fill="#fbf1e2" stroke="#e8d3b4" stroke-width="1.5"/>
      <rect x="7" y="150" width="19" height="84" rx="9.5" fill="#fbf1e2" stroke="#e8d3b4" stroke-width="1.5"/>
      ${catHead({ fur: "#f2ad60", shade: "#cf8236", stripes: tabbyStripes("#c9742a"), eye: "#e6b72b" })}
      ${partyHat("#e8d29a", "#c7a95a", dots([[-8, -20], [7, -30], [-13, -9], [11, -12], [0, -46]], "#b08d3e"), "translate(0 -42) rotate(-4)")}
    </g>`;
  const scream = `
    <g transform="translate(172 968) rotate(-7) scale(1.08)" filter="url(#epSticker)">
      ${catHead({ fur: "#fdfcfb", shade: "#dcd7d4", scream: true })}
      ${partyHat("#d6368f", "#a21f69", dots([[-8, -20], [8, -32], [-14, -8], [12, -12]], "#ffd0ea") + `<circle cx="0" cy="-70" r="11" fill="#ff6fb5" stroke="#e0408f" stroke-width="2"/>`, "translate(-16 -42) rotate(-14)")}
    </g>`;
  const white = `
    <g transform="translate(568 982) rotate(3)" filter="url(#epSticker)">
      ${catHead({ fur: "#fdfcfb", shade: "#dcd7d4", eye: "#d8a21a" })}
      ${bow("translate(-12 66) rotate(8)")}
    </g>`;
  const tabby = `
    <g transform="translate(466 918) rotate(5) scale(.9)" filter="url(#epSticker)">
      ${catHead({ fur: "#e6cba6", shade: "#b99366", stripes: tabbyStripes("#a9784a"), eye: "#c99a2b" })}
      ${partyHat("#f4a6c8", "#d2528c", dots([[-9, -22], [8, -34], [-14, -9], [12, -14]], "#fff") + `<path d="M-14,-24 L14,-34 M-19,-12 L19,-24" stroke="#fff" stroke-opacity=".7" stroke-width="3"/>`, "translate(16 -43) rotate(10)")}
      ${bow("translate(6 58)")}
    </g>`;

  /* ---------- cake with a candle ---------- */
  let frosting = "";
  for (let i = 0; i < 8; i++) frosting += `<circle cx="${282 + i * 15.5}" cy="873" r="10" fill="#fff4de" stroke="#ecd3a6" stroke-width="1.2"/>`;
  const cake = `
    <g filter="url(#epSticker)">
      <ellipse cx="334" cy="950" rx="78" ry="15" fill="url(#epWood)"/>
      <path d="M272,872 L272,938 C272,950 396,950 396,938 L396,872 Z" fill="#f3dfb8" stroke="#dcc08a" stroke-width="1.5"/>
      <path d="M272,906 C300,914 368,914 396,906" stroke="#d9b777" stroke-width="5" fill="none"/>
      <path d="M272,872 C272,858 396,858 396,872 Z" fill="#fff4de"/>
      ${frosting}
      <rect x="307" y="820" width="14" height="56" rx="5" fill="#f6b8c8" stroke="#e08fa6" stroke-width="1.2"/>
      <path d="M309,832 L319,826 M309,846 L319,840 M309,860 L319,854" stroke="#fff" stroke-opacity=".75" stroke-width="3"/>
    </g>
    <g transform="translate(314 818)"><g class="ep-flame">
      <circle cy="-12" r="16" fill="#ffd27a" fill-opacity=".35"/>
      <path d="M0,2 C-8,-4 -6,-16 0,-26 C6,-16 8,-4 0,2 Z" fill="url(#epFlame)"/>
      <ellipse cy="-7" rx="2" ry="5" fill="#fffbe6"/>
    </g></g>`;

  /* ---------- the handwritten words ---------- */
  const words = `
    <g font-family="'Gochi Hand','Chewy','Comic Sans MS',cursive" fill="#7a5466" stroke="#7a5466" stroke-width="2" stroke-linejoin="round" paint-order="stroke">
      <text x="272" y="1060" font-size="104" transform="rotate(-7 272 1060)" textLength="262" lengthAdjust="spacingAndGlyphs">happy</text>
      <text x="136" y="1172" font-size="124" transform="rotate(-6 136 1172)" textLength="478" lengthAdjust="spacingAndGlyphs">birthday</text>
    </g>`;

  host.innerHTML = `<svg viewBox="0 130 736 1140" xmlns="http://www.w3.org/2000/svg" focusable="false" preserveAspectRatio="xMidYMid meet" overflow="visible">
  <defs>
    <pattern id="epRibs" width="16" height="16" patternUnits="userSpaceOnUse" patternTransform="rotate(-28)"><rect width="16" height="16" fill="none"/><rect y="0" width="16" height="5" fill="#000" fill-opacity=".035"/></pattern>
    <filter id="epGrain" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency=".85" numOctaves="2" seed="7"/><feColorMatrix values="0 0 0 0 .45  0 0 0 0 .43  0 0 0 0 .4  0 0 0 .16 0"/></filter>
    <radialGradient id="epLight" cx=".5" cy=".42" r=".75"><stop offset="0" stop-color="#fff" stop-opacity=".7"/><stop offset="1" stop-color="#d9d7d2" stop-opacity=".35"/></radialGradient>
    <linearGradient id="epFoil" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#8f929b"/><stop offset=".22" stop-color="#f6f7f9"/><stop offset=".42" stop-color="#c2c5cc"/><stop offset=".62" stop-color="#ffffff"/><stop offset=".82" stop-color="#b7bac2"/><stop offset="1" stop-color="#8d9099"/></linearGradient>
    <linearGradient id="epGlitter" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#eef0f4"/><stop offset=".5" stop-color="#b9bcc5"/><stop offset="1" stop-color="#8f939d"/></linearGradient>
    <linearGradient id="epWood" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#a97a4d"/><stop offset=".5" stop-color="#d1a773"/><stop offset="1" stop-color="#a97a4d"/></linearGradient>
    <linearGradient id="epFlame" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffe066"/><stop offset=".6" stop-color="#ff9a2a"/><stop offset="1" stop-color="#ff5a1a"/></linearGradient>
    <radialGradient id="epSt-p" cx=".35" cy=".3" r=".9"><stop offset="0" stop-color="#ffd3e2"/><stop offset="1" stop-color="#ee86ad"/></radialGradient>
    <radialGradient id="epSt-y" cx=".35" cy=".3" r=".9"><stop offset="0" stop-color="#fff7c4"/><stop offset="1" stop-color="#f4cb4a"/></radialGradient>
    <radialGradient id="epSt-s" cx=".35" cy=".3" r=".9"><stop offset="0" stop-color="#eef0f3"/><stop offset="1" stop-color="#9a9ea8"/></radialGradient>
    <clipPath id="epArch"><path d="M255,905 L255,480 C255,386 318,335 388,335 C458,335 520,386 520,480 L520,905 Z"/></clipPath>
    <filter id="epBW" color-interpolation-filters="sRGB"><feColorMatrix type="saturate" values="0"/><feComponentTransfer><feFuncR type="linear" slope="1.12" intercept="-.04"/><feFuncG type="linear" slope="1.12" intercept="-.04"/><feFuncB type="linear" slope="1.12" intercept="-.04"/></feComponentTransfer></filter>
    <filter id="epShadow" x="-20%" y="-20%" width="140%" height="140%"><feDropShadow dx="3" dy="7" stdDeviation="7" flood-color="#2b2433" flood-opacity=".28"/></filter>
    <filter id="epSticker" x="-15%" y="-15%" width="130%" height="130%">
      <feMorphology in="SourceAlpha" operator="dilate" radius="6" result="d"/>
      <feFlood flood-color="#fff" result="w"/><feComposite in="w" in2="d" operator="in" result="o"/>
      <feGaussianBlur in="d" stdDeviation="6" result="b"/><feOffset in="b" dy="6" result="s"/>
      <feColorMatrix in="s" type="matrix" values="0 0 0 0 .17  0 0 0 0 .13  0 0 0 0 .22  0 0 0 .34 0" result="sh"/>
      <feMerge><feMergeNode in="sh"/><feMergeNode in="o"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
  </defs>

  <g class="ep-bob">${balloons}</g>
  ${stars}
  ${photo}
  ${hat}
  ${words}
  ${orange}
  ${scream}
  ${cake}
  ${white}
  ${tabby}
</svg>`;
}

/* INITIALIZATION */
document.addEventListener("DOMContentLoaded", () => {
  document.title = `Happy Birthday ${CONFIG.herName} 💖`;
  $("#hero-name").textContent = CONFIG.herName;
  $("#hero-subtitle").textContent = CONFIG.subtitle;
  $("#footer-from").textContent = "With all my love, " + CONFIG.fromName;
  $("#lock-hint").textContent = CONFIG.codeHint;

  setupGrain();
  setupDecor();
  createFloatingHearts();
  renderTeaser();
  setupPoster();
  setupEndPoster();
  setupCollage();
  setupHeroOrbit();
  setupCakeBlowing();
  setupSlotMachine();
  setupWishIntro();
  refreshSlotUI();
  setupWishModal();
  renderReasons();
  renderFilterTabs();
  renderGallery();
  setupMusic();
  setupLightbox();
  setupKeyboard();

  $("#confetti-btn").addEventListener("click", () => {
    Confetti.burst(window.innerWidth / 2, window.innerHeight / 2, 130);
  });

  const alreadyUnlocked = CONFIG.rememberUnlock && store.get("birthdayUnlocked") === "1";

  if (alreadyUnlocked) {
    lockScreen.classList.add("hidden");
    unlockSite(false);
  } else {
    lockInput.focus();
  }
});