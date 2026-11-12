/* =========================================================
   SCRIPT.JS - Website Anniversary
   Bagian yang paling sering kamu ubah ada di anniversaryConfig.
   ========================================================= */

/* ---------------------------------------------------------
   PENGATURAN UTAMA (GANTI DI SINI)
   --------------------------------------------------------- */
const anniversaryConfig = {
  // 1. GANTI NAMA PASANGAN (dan namamu untuk tanda tangan surat)
  partnerName: "Adelia",
  yourName: "Rifdani",

  // 2. GANTI TANGGAL ANNIVERSARY (muncul di layar terakhir)
  anniversaryYears: 4,
  anniversaryDate: "[ANNIVERSARY DATE]",

  // 3. GANTI PESAN OPENING ("" = pindah paragraf)
  openingText: [
    "Empat tahun, ribuan cerita, dan berapa banyak hal kecil yang sudah kita lewati bersama.",
    "",
    "Hari ini aku membuat sesuatu yang kecil untuk mengingat semuanya."
  ],

  // 4. GANTI MUSIK (taruh file di folder assets/music/)
  music: "assets/music/song.mp3",
  musicVolume: 0.4,

  // 5. GANTI FOTO PUZZLE (sebaiknya foto kotak 1:1, tapi foto biasa juga otomatis dipotong tengahnya)
  puzzlePhoto: "assets/puzzle/puzzle-photo.jpg",

  // 7 & 8. GANTI FOTO GALERI + CAPTION
  // Isi caption "" kalau foto tidak perlu caption.
  // Foto yang filenya belum ada otomatis disembunyikan (tidak error).
  photoFolder: "assets/photos/",
  photos: [
    { file: "photo-01.jpg", caption: "First year together ❤️" },
    { file: "photo-02.jpg", caption: "Bogor date" },
    { file: "photo-03.jpg", caption: "One of my favorite days" },
    { file: "photo-04.jpg", caption: "LDR TIME HEHE" },
    { file: "photo-05.jpg", caption: "Random day, favorite memory" },
    { file: "photo-06.jpg", caption: "❤️" },
    { file: "photo-07.jpg", caption: "Purwokerto Date" },
    { file: "photo-08.jpg", caption: "" },
    { file: "photo-09.jpg", caption: "" },
    { file: "photo-10.jpg", caption: "Still my favorite person" },
    { file: "photo-11.jpg", caption: "" },
    { file: "photo-12.jpg", caption: "" },
    { file: "photo-13.jpg", caption: "" },
    { file: "photo-14.jpg", caption: "" },
    { file: "photo-15.jpg", caption: "" },
    { file: "photo-16.jpg", caption: "" },
    { file: "photo-17.jpg", caption: "" },
    { file: "photo-18.jpg", caption: "" },
    { file: "photo-19.jpg", caption: "" },
    { file: "photo-20.jpg", caption: "" }
  ],

  // 9. GANTI FOTO TERAKHIR
  finalPhoto: "assets/photos/final-photo.jpg",

  // 10. GANTI PESAN TERAKHIR ("" = pindah paragraf)
  finalMessage: [
    "Empat tahun sudah kita lalui.",
    "",
    "Terima kasih sudah menjadi bagian dari begitu banyak cerita dalam hidup aku.",
    "",
    "Kalau aku boleh memilih lagi dari awal,",
    "aku masih ingin ceritanya dimulai dengan kamu.",
    "",
    "Happy 4th Anniversary. ❤️"
  ],
  finalSmallText: "Here's to many more years with you."
};

/* =========================================================
   KODE DI BAWAH INI TIDAK PERLU DIUBAH
   ========================================================= */
const cfg = anniversaryConfig;
const $ = (sel) => document.querySelector(sel);
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// ---------- Fungsi bantu ----------
function shuffle(arr) {                       // acak array (Fisher-Yates)
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}
function ordinal(n) {                         // 4 -> "4th"
  const s = ["th", "st", "nd", "rd"], v = n % 100;
  return n + (s[(v - 20) % 10] || s[v] || s[0]);
}
function renderLines(target, lines) {         // array teks -> paragraf
  let p = null;
  lines.forEach((line) => {
    if (line === "") { p = null; return; }
    if (!p) { p = document.createElement("p"); target.appendChild(p); }
    else p.appendChild(document.createElement("br"));
    p.appendChild(document.createTextNode(line));
  });
}

// ---------- Isi teks dari config ----------
const title = "Happy " + ordinal(cfg.anniversaryYears) + " Anniversary ❤️";
$("#openTitle").textContent = title;
document.title = title;
document.querySelectorAll("[data-partner]").forEach((el) => (el.textContent = cfg.partnerName));
document.querySelectorAll("[data-you]").forEach((el) => (el.textContent = cfg.yourName));
renderLines($("#openText"), cfg.openingText);
renderLines($("#finalText"), cfg.finalMessage);
$("#finalSmall").textContent = cfg.finalSmallText;
$("#finalDate").textContent = cfg.anniversaryDate;

// ---------- Hati melayang ----------
(function makeHearts() {
  const layer = $("#heartsLayer");
  if (reduceMotion) return;
  const colors = ["#e48a9d", "#f7cfd6", "#c4566f"];
  for (let i = 0; i < 12; i++) {
    const h = document.createElement("span");
    h.className = "floating-heart";
    h.textContent = "♥";
    h.style.setProperty("--x", Math.random() * 96 + "%");
    h.style.setProperty("--s", 12 + Math.random() * 16 + "px");
    h.style.setProperty("--c", colors[i % colors.length]);
    h.style.setProperty("--t", 14 + Math.random() * 10 + "s");
    h.style.setProperty("--d", -Math.random() * 20 + "s");
    layer.appendChild(h);
  }
})();

// ---------- Scroll reveal ----------
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((e) => {
    if (e.isIntersecting) { e.target.classList.add("in"); revealObserver.unobserve(e.target); }
  });
}, { threshold: 0.12 });
document.querySelectorAll(".reveal").forEach((el) => revealObserver.observe(el));

// ---------- Pindah antar section (tanpa reload) ----------
let busy = false;
function goTo(name) {
  if (busy) return;
  busy = true;
  const current = document.querySelector(".screen.active");
  const next = $("#screen-" + name);
  current.classList.add("leaving");
  setTimeout(() => {
    current.classList.remove("active", "leaving");
    next.classList.add("active");
    window.scrollTo(0, 0);
    busy = false;
    if (name === "puzzle") startPuzzle();
    if (name === "final") startFinal();
  }, 550);
}

// ---------- Pop-up sukses ----------
function showModal({ title, text, button, onClick }) {
  $("#modalTitle").textContent = title;
  $("#modalText").textContent = text || "";
  const btn = $("#modalBtn");
  btn.textContent = button;
  $("#modal").classList.add("open");
  btn.onclick = () => { $("#modal").classList.remove("open"); onClick(); };
}

/* =========================================================
   MUSIK
   ========================================================= */
const audio = $("#bgm");
const musicBtn = $("#musicBtn");
let fadeTimer = null;

function fadeTo(target, ms) {                 // naik/turun volume pelan-pelan
  clearInterval(fadeTimer);
  const start = audio.volume, steps = 20;
  let i = 0;
  fadeTimer = setInterval(() => {
    i++;
    audio.volume = Math.min(1, Math.max(0, start + (target - start) * (i / steps)));
    if (i >= steps) clearInterval(fadeTimer);
  }, ms / steps);
}
function setPlaying(isPlaying) {
  musicBtn.classList.toggle("playing", isPlaying);
  $("#musicIcon").textContent = isPlaying ? "⏸" : "▶";
  musicBtn.setAttribute("aria-label", isPlaying ? "Jeda musik" : "Putar musik");
}
function startMusic() {                       // dipanggil setelah tombol "Mulai" ditekan
  audio.src = cfg.music;
  audio.loop = true;
  audio.volume = 0;
  const p = audio.play();
  if (p) {
    p.then(() => {
      musicBtn.classList.add("show");
      setPlaying(true);
      fadeTo(cfg.musicVolume, 3000);
    }).catch(() => console.warn("Musik tidak bisa diputar. Cek file: " + cfg.music));
  }
}
musicBtn.addEventListener("click", () => {
  if (audio.paused) {
    audio.play().then(() => { setPlaying(true); fadeTo(cfg.musicVolume, 800); });
  } else {
    audio.pause();
    setPlaying(false);
  }
});

$("#startBtn").addEventListener("click", () => { startMusic(); goTo("match"); });

/* =========================================================
   MINI GAME 1 - MATCHING PAIRS
   ========================================================= */
const SYMBOLS = ["❤️", "🌹", "💌", "🧸", "✨", "🌙"];
let firstCard = null, lockBoard = false, moves = 0, pairs = 0;

function buildMatch() {
  const grid = $("#matchGrid");
  grid.innerHTML = "";
  shuffle([...SYMBOLS, ...SYMBOLS]).forEach((symbol) => {
    const card = document.createElement("button");
    card.type = "button";
    card.className = "card";
    card.dataset.symbol = symbol;
    card.setAttribute("aria-label", "Kartu");
    card.innerHTML = '<span class="card-inner"><span class="face back">♥</span><span class="face front">' + symbol + "</span></span>";
    card.addEventListener("click", () => flipCard(card));
    grid.appendChild(card);
  });
}
function flipCard(card) {
  if (lockBoard || card.classList.contains("flipped") || card.classList.contains("matched")) return;
  card.classList.add("flipped");
  if (!firstCard) { firstCard = card; return; }

  const a = firstCard, b = card;
  firstCard = null;
  moves++;
  $("#moves").textContent = moves;

  if (a.dataset.symbol === b.dataset.symbol) {          // cocok
    a.classList.replace("flipped", "matched");
    b.classList.replace("flipped", "matched");
    pairs++;
    $("#pairs").textContent = pairs;
    if (pairs === SYMBOLS.length) {
      setTimeout(() => showModal({
        title: "Pinter cantikk ❤️",
        text: "Kayaknya bukan cuma kartunya yang cocok.",
        button: "Lanjut →",
        onClick: () => goTo("puzzle")
      }), 900);
    }
  } else {                                              // tidak cocok: tutup lagi
    lockBoard = true;
    setTimeout(() => {
      a.classList.remove("flipped");
      b.classList.remove("flipped");
      lockBoard = false;
    }, 850);
  }
}
buildMatch();

/* =========================================================
   MINI GAME 2 - PHOTO PUZZLE 3x3 (ketuk dua potongan untuk menukar)
   ========================================================= */
// Gambar cadangan kalau puzzle-photo.jpg belum ada
const PLACEHOLDER = "data:image/svg+xml;utf8," + encodeURIComponent(
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fde9ec"/><stop offset="1" stop-color="#e48a9d"/></linearGradient></defs><rect width="600" height="600" fill="url(#g)"/><circle cx="110" cy="130" r="50" fill="#fff" opacity=".6"/><circle cx="500" cy="480" r="70" fill="#7b2038" opacity=".25"/><text x="300" y="400" font-size="330" text-anchor="middle" fill="#7b2038">&#9829;</text><text x="300" y="70" font-size="34" text-anchor="middle" fill="#7b2038" font-family="Georgia">Ganti dengan foto kalian</text><text x="40" y="570" font-size="30" fill="#fff" font-family="Georgia">puzzle-photo.jpg</text></svg>'
);

// Muat foto, potong jadi kotak dari tengah, kecilkan maksimal 900px
function prepareImage(src) {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      try {
        const side = Math.min(img.naturalWidth, img.naturalHeight);
        const out = Math.min(side, 900);
        const canvas = document.createElement("canvas");
        canvas.width = canvas.height = out;
        canvas.getContext("2d").drawImage(img, (img.naturalWidth - side) / 2, (img.naturalHeight - side) / 2, side, side, 0, 0, out, out);
        resolve(canvas.toDataURL("image/jpeg", 0.9));
      } catch (err) { resolve(src); }                   // misal dibuka lewat file:// -> pakai foto asli
    };
    img.onerror = () => resolve(PLACEHOLDER);
    img.src = src;
  });
}

const board = $("#board");
let order = [], selected = null, puzzleMoves = 0, puzzleSolved = false, puzzleReady = false;

async function startPuzzle() {
  if (!puzzleReady) {
    const src = await prepareImage(cfg.puzzlePhoto);
    board.style.setProperty("--img", 'url("' + src + '")');
    $("#refImg").src = src;
    puzzleReady = true;
  }
  newPuzzle();
}
function isSolved() { return order.every((piece, pos) => piece === pos); }
function newPuzzle() {
  order = [0, 1, 2, 3, 4, 5, 6, 7, 8];
  do { shuffle(order); } while (isSolved());            // pastikan tidak langsung selesai
  selected = null; puzzleMoves = 0; puzzleSolved = false;
  $("#puzzleMoves").textContent = 0;
  board.classList.remove("done");
  renderBoard();
}
function renderBoard() {
  board.innerHTML = "";
  order.forEach((piece, pos) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "piece" + (pos === selected ? " selected" : "");
    btn.style.backgroundPosition = (piece % 3) * 50 + "% " + Math.floor(piece / 3) * 50 + "%";
    btn.setAttribute("aria-label", "Potongan " + (pos + 1));
    btn.addEventListener("click", () => pickPiece(pos));
    board.appendChild(btn);
  });
}
function pickPiece(pos) {
  if (puzzleSolved) return;
  if (selected === null) { selected = pos; renderBoard(); return; }       // pilihan pertama
  if (selected === pos) { selected = null; renderBoard(); return; }       // batal pilih
  [order[selected], order[pos]] = [order[pos], order[selected]];          // tukar
  selected = null;
  puzzleMoves++;
  $("#puzzleMoves").textContent = puzzleMoves;
  renderBoard();
  if (isSolved()) {
    puzzleSolved = true;
    board.classList.add("done");
    setTimeout(() => showModal({
      title: "Yeay! Satu kenangan berhasil disusun kembali ❤️",
      text: "",
      button: "Buka Cerita Selanjutnya →",
      onClick: () => goTo("story")
    }), 700);
  }
}

/* =========================================================
   GALERI FOTO + LIGHTBOX
   ========================================================= */
function buildGallery() {
  const timeline = $("#timeline");
  cfg.photos.forEach((photo, i) => {
    const fig = document.createElement("figure");
    fig.className = "memory reveal";
    fig.innerHTML = '<div class="polaroid"><img loading="lazy" decoding="async" alt=""><figcaption class="caption"></figcaption></div>';
    const img = fig.querySelector("img");
    img.alt = photo.caption || "Kenangan " + (i + 1);
    fig.querySelector(".caption").textContent = photo.caption || "";
    img.addEventListener("error", () => fig.remove());   // foto belum ada -> sembunyikan
    img.src = cfg.photoFolder + photo.file;
    fig.addEventListener("click", () => openLightbox(fig));
    timeline.appendChild(fig);
    revealObserver.observe(fig);
  });
}
buildGallery();

const lightbox = $("#lightbox");
let lbList = [], lbIndex = 0;
function showLightboxItem() {
  const fig = lbList[lbIndex];
  $("#lbImg").src = fig.querySelector("img").src;
  $("#lbImg").alt = fig.querySelector("img").alt;
  $("#lbCaption").textContent = fig.querySelector(".caption").textContent;
}
function openLightbox(fig) {
  lbList = [...document.querySelectorAll("#timeline .memory")];
  lbIndex = lbList.indexOf(fig);
  showLightboxItem();
  lightbox.classList.add("open");
  document.body.style.overflow = "hidden";
}
function closeLightbox() { lightbox.classList.remove("open"); document.body.style.overflow = ""; }
function stepLightbox(d) { lbIndex = (lbIndex + d + lbList.length) % lbList.length; showLightboxItem(); }

$("#lbClose").addEventListener("click", closeLightbox);
$("#lbPrev").addEventListener("click", () => stepLightbox(-1));
$("#lbNext").addEventListener("click", () => stepLightbox(1));
lightbox.addEventListener("click", (e) => { if (e.target === lightbox) closeLightbox(); });
document.addEventListener("keydown", (e) => {
  if (!lightbox.classList.contains("open")) return;
  if (e.key === "Escape") closeLightbox();
  if (e.key === "ArrowLeft") stepLightbox(-1);
  if (e.key === "ArrowRight") stepLightbox(1);
});
let touchX = 0;                                         // geser kiri/kanan di HP
lightbox.addEventListener("touchstart", (e) => { touchX = e.changedTouches[0].clientX; }, { passive: true });
lightbox.addEventListener("touchend", (e) => {
  const dx = e.changedTouches[0].clientX - touchX;
  if (Math.abs(dx) > 50) stepLightbox(dx < 0 ? 1 : -1);
}, { passive: true });

/* =========================================================
   FINAL SURPRISE
   ========================================================= */
$("#finalBtn").addEventListener("click", () => goTo("final"));

const finalImg = $("#finalPhoto");
finalImg.addEventListener("error", () => { finalImg.parentElement.style.display = "none"; });
finalImg.src = cfg.finalPhoto;

function startFinal() {
  // Pesan muncul satu per satu
  document.querySelectorAll("#finalText p").forEach((p, i) => p.style.setProperty("--d", 0.8 + i * 0.9 + "s"));
  $("#finalSmall").style.setProperty("--d", 0.8 + document.querySelectorAll("#finalText p").length * 0.9 + "s");
  launchConfetti();
}

// Confetti hati yang lembut (berhenti sendiri setelah ~9 detik)
function launchConfetti() {
  if (reduceMotion) return;
  const canvas = $("#confetti"), ctx = canvas.getContext("2d");
  const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
  resize();
  window.addEventListener("resize", resize);
  const colors = ["#e48a9d", "#f7cfd6", "#7b2038", "#e8c07a", "#ffffff"];
  const parts = [];
  const start = performance.now();

  function frame(now) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const spawning = now - start < 9000;
    if (spawning && parts.length < 70 && Math.random() < 0.3) {
      parts.push({
        x: Math.random() * canvas.width, y: -20, size: 8 + Math.random() * 10,
        vy: 0.8 + Math.random() * 1.3, vx: (Math.random() - 0.5) * 0.8,
        rot: Math.random() * 6, vr: (Math.random() - 0.5) * 0.04,
        color: colors[Math.floor(Math.random() * colors.length)], heart: Math.random() < 0.55
      });
    }
    for (let i = parts.length - 1; i >= 0; i--) {
      const p = parts[i];
      p.x += p.vx + Math.sin(p.y / 40) * 0.4; p.y += p.vy; p.rot += p.vr;
      if (p.y > canvas.height + 30) { parts.splice(i, 1); continue; }
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rot);
      ctx.fillStyle = p.color;
      ctx.globalAlpha = 0.85;
      if (p.heart) { ctx.font = p.size * 1.6 + "px serif"; ctx.textAlign = "center"; ctx.fillText("♥", 0, 0); }
      else { ctx.fillRect(-p.size / 4, -p.size / 4, p.size / 2, p.size / 2); }
      ctx.restore();
    }
    if (spawning || parts.length) requestAnimationFrame(frame);
    else ctx.clearRect(0, 0, canvas.width, canvas.height);
  }
  requestAnimationFrame(frame);
}
