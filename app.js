// ===== Phonics Chain — app.js =====

// ===== Firebase Init =====
let auth, db, secondaryApp = null;
try {
  firebase.initializeApp(firebaseConfig);
  auth = firebase.auth();
  db   = firebase.firestore();
  db.enablePersistence().catch(() => {});
} catch (e) {
  console.error('Firebase init error:', e);
}
function getSecondaryApp() {
  if (secondaryApp) return secondaryApp;
  secondaryApp = firebase.initializeApp(firebaseConfig, 'secondary');
  return secondaryApp;
}

// ===== App State =====
let currentUser = null;
let userDoc = null;
let userRole = 'student';

// ===== Constants =====
const EMAIL_DOMAIN = '@phonicschain.app';
const GRADE_LABELS = {
  e1:'小1', e2:'小2', e3:'小3', e4:'小4', e5:'小5', e6:'小6',
  j1:'中1', j2:'中2', j3:'中3', h1:'高1', h2:'高2', h3:'高3', adult:'大人'
};
const GRADE_EIKEN_MAP = {
  e1:0, e2:0, e3:0, e4:0, e5:1, e6:1,
  j1:2, j2:2, j3:3, h1:3, h2:4, h3:4, adult:5
};
const VOWELS = new Set('aeiou'.split(''));
const CONSONANTS = 'bcdfghjklmnpqrstvwxyz'.split('');
const VOWEL_LIST = 'aeiou'.split('');
const ONSET_CLUSTERS = {
  1: CONSONANTS,
  2: ['bl','br','ch','cl','cr','dr','fl','fr','gl','gr','kn','ph','pl','pr','qu','sc','sh','sk','sl','sm','sn','sp','st','sw','th','tr','tw','wh','wr'],
  3: ['chr','sch','scr','shr','spl','spr','str','thr'],
};
const VOWEL_CLUSTERS = {
  1: VOWEL_LIST,
  2: ['ai','au','ay','ea','ee','ei','ey','ie','oa','oo','ou','ow','oy','ue','ui'],
};
function isVowelChunk(chunk) {
  return chunk.split('').every(c => VOWELS.has(c));
}
const GAME_TIME = 60;
const TIME_BONUS_CORRECT = 3;
const TIME_BONUS_CHAIN = 5;
const TIME_PENALTY_WRONG = 3;

// ===== Helpers =====
function $(id) { return document.getElementById(id); }
function show(id) { document.querySelectorAll('.screen').forEach(s => s.classList.remove('active')); $(id).classList.add('active'); }
function showTab(vis) { $('tab-bar').classList.toggle('hidden', !vis); }
function shuffleArray(arr) { const a = [...arr]; for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }
function toEmail(id) { return id.includes('@') ? id : id.toLowerCase() + EMAIL_DOMAIN; }
function fromEmail(email) { return email.endsWith(EMAIL_DOMAIN) ? email.replace(EMAIL_DOMAIN, '') : email; }

// ===== Sound Engine (Web Audio API) =====
let audioCtx = null;
let seMuted = false;
let bgmMuted = false;

function getAudioCtx() {
  if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  return audioCtx;
}
function playTone(freq, duration, type, vol) {
  if (seMuted) return;
  try {
    const ctx = getAudioCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = type || 'square';
    osc.frequency.value = freq;
    gain.gain.value = vol || 0.15;
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + duration);
  } catch(e) {}
}
const SFX = {
  correct() {
    playTone(880, 0.08, 'square', 0.12);
    setTimeout(() => playTone(1320, 0.1, 'square', 0.1), 50);
  },
  wrong() {
    playTone(200, 0.15, 'sawtooth', 0.12);
    setTimeout(() => playTone(150, 0.2, 'sawtooth', 0.1), 80);
  },
  combo(n) {
    const base = 440 + (n * 30);
    for (let i = 0; i < 4; i++) {
      setTimeout(() => playTone(base + i * 110, 0.08, 'square', 0.08), i * 40);
    }
  },
  stretch() {
    const notes = [523, 659, 784, 1047];
    notes.forEach((f, i) => setTimeout(() => playTone(f, 0.15, 'square', 0.1), i * 70));
  },
  chainComplete() {
    const notes = [523, 659, 784, 880, 1047];
    notes.forEach((f, i) => setTimeout(() => playTone(f, 0.12, 'triangle', 0.1), i * 60));
  },
  tick() { playTone(1000, 0.03, 'square', 0.06); },
  gameOver() {
    const notes = [440, 349, 262, 196];
    notes.forEach((f, i) => setTimeout(() => playTone(f, 0.25, 'sawtooth', 0.08), i * 150));
  },
};

// ===== BGM Engine (beat + bass + melody + drums) =====
let bgmTimeout = null;
let bgmDanger = false;
let bgmMaster = null;
let bgmStep = 0;

function startBGM() {
  stopBGM();
  if (bgmMuted) return;
  bgmDanger = false;
  bgmStep = 0;
  try {
    const ctx = getAudioCtx();
    bgmMaster = ctx.createGain();
    bgmMaster.gain.value = 1.0;
    bgmMaster.connect(ctx.destination);
    bgmTick();
  } catch(e) {}
}
function stopBGM() {
  if (bgmTimeout) { clearTimeout(bgmTimeout); bgmTimeout = null; }
  bgmMaster = null;
}

function playNoise(dur, vol, hpFreq) {
  const ctx = getAudioCtx();
  if (!bgmMaster) return;
  const bufSize = ctx.sampleRate * dur;
  const buf = ctx.createBuffer(1, bufSize, ctx.sampleRate);
  const data = buf.getChannelData(0);
  for (let i = 0; i < bufSize; i++) data[i] = Math.random() * 2 - 1;
  const src = ctx.createBufferSource();
  src.buffer = buf;
  const hp = ctx.createBiquadFilter();
  hp.type = 'highpass';
  hp.frequency.value = hpFreq || 7000;
  const g = ctx.createGain();
  g.gain.setValueAtTime(vol, ctx.currentTime);
  g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + dur);
  src.connect(hp);
  hp.connect(g);
  g.connect(bgmMaster);
  src.start(ctx.currentTime);
}

function playDrum(type) {
  const ctx = getAudioCtx();
  if (!bgmMaster) return;
  const g = ctx.createGain();
  const osc = ctx.createOscillator();
  if (type === 'kick') {
    osc.type = 'sine';
    osc.frequency.setValueAtTime(150, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(40, ctx.currentTime + 0.12);
    g.gain.setValueAtTime(0.5, ctx.currentTime);
    g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);
    osc.connect(g); g.connect(bgmMaster);
    osc.start(ctx.currentTime); osc.stop(ctx.currentTime + 0.15);
  } else if (type === 'snare') {
    osc.type = 'triangle';
    osc.frequency.value = 200;
    g.gain.setValueAtTime(0.3, ctx.currentTime);
    g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);
    osc.connect(g); g.connect(bgmMaster);
    osc.start(ctx.currentTime); osc.stop(ctx.currentTime + 0.08);
    playNoise(0.1, 0.3, 4000);
  } else if (type === 'hihat') {
    playNoise(0.04, 0.15, 9000);
  } else if (type === 'ohh') {
    playNoise(0.12, 0.2, 7000);
  }
}

function playBass(freq, dur) {
  const ctx = getAudioCtx();
  if (!bgmMaster) return;
  const osc = ctx.createOscillator();
  const g = ctx.createGain();
  osc.type = 'square';
  osc.frequency.value = freq;
  g.gain.setValueAtTime(0.2, ctx.currentTime);
  g.gain.linearRampToValueAtTime(0.0, ctx.currentTime + dur * 0.8);
  osc.connect(g); g.connect(bgmMaster);
  osc.start(ctx.currentTime); osc.stop(ctx.currentTime + dur);
}

function playMelody(freq, dur) {
  const ctx = getAudioCtx();
  if (!bgmMaster) return;
  const osc = ctx.createOscillator();
  const g = ctx.createGain();
  osc.type = bgmDanger ? 'sawtooth' : 'triangle';
  osc.frequency.value = freq;
  g.gain.setValueAtTime(0.15, ctx.currentTime);
  g.gain.linearRampToValueAtTime(0.0, ctx.currentTime + dur * 0.7);
  osc.connect(g); g.connect(bgmMaster);
  osc.start(ctx.currentTime); osc.stop(ctx.currentTime + dur);
}

// Normal: 4/4 hip-hop groove, 130BPM
// Danger: double-time 160BPM, more aggressive
const BASS_NORMAL = [130, 0, 130, 0, 174, 0, 164, 0, 130, 0, 130, 0, 196, 0, 174, 0];
const BASS_DANGER = [196, 0, 196, 233, 0, 261, 233, 0, 196, 0, 196, 261, 0, 233, 196, 0];
const MELODY_NORMAL = [0, 523, 0, 659, 0, 0, 587, 0, 0, 523, 0, 0, 659, 0, 784, 0];
const MELODY_DANGER = [784, 0, 880, 0, 784, 659, 0, 784, 880, 0, 1047, 0, 880, 784, 0, 659];
// Drum pattern: K=kick S=snare H=hihat O=open-hh
const DRUM_NORMAL =  ['K','H','H','H', 'S','H','K','H', 'K','H','H','H', 'S','H','K','H'];
const DRUM_DANGER =  ['K','H','S','H', 'K','S','K','H', 'S','K','S','H', 'K','S','K','S'];

function bgmTick() {
  if (bgmMuted || !bgmMaster) return;
  const bpm = bgmDanger ? 160 : 130;
  const beatMs = (60000 / bpm) / 4; // 16th notes
  const beatSec = beatMs / 1000;
  const idx = bgmStep % 16;

  // Drums
  const dp = bgmDanger ? DRUM_DANGER : DRUM_NORMAL;
  const d = dp[idx];
  if (d === 'K') playDrum('kick');
  else if (d === 'S') playDrum('snare');
  else if (d === 'H') playDrum('hihat');
  else if (d === 'O') playDrum('ohh');

  // Bass (every other step)
  const bp = bgmDanger ? BASS_DANGER : BASS_NORMAL;
  const bf = bp[idx];
  if (bf > 0) playBass(bf, beatSec * 1.8);

  // Melody (sparse hits)
  const mp = bgmDanger ? MELODY_DANGER : MELODY_NORMAL;
  const mf = mp[idx];
  if (mf > 0) playMelody(mf, beatSec * 1.5);

  bgmStep++;
  bgmTimeout = setTimeout(bgmTick, beatMs);
}

function setBGMDanger(isDanger) {
  if (isDanger === bgmDanger) return;
  bgmDanger = isDanger;
  if (bgmMaster) bgmMaster.gain.value = isDanger ? 1.2 : 1.0;
}

// Mute toggles
try {
  seMuted = localStorage.getItem('pc_se_muted') === '1';
  bgmMuted = localStorage.getItem('pc_bgm_muted') === '1';
} catch(e) {}


// ===== Particle System =====
let particles = [];
let particleCanvas, particleCtx;
let particleRAF = null;

function initParticles() {
  particleCanvas = $('particle-canvas');
  if (!particleCanvas) return;
  particleCtx = particleCanvas.getContext('2d');
  resizeParticleCanvas();
}
function resizeParticleCanvas() {
  if (!particleCanvas) return;
  const container = $('game-container');
  if (!container) return;
  particleCanvas.width = container.offsetWidth;
  particleCanvas.height = container.offsetHeight;
}
function emitParticles(x, y, count, colors, speed) {
  for (let i = 0; i < count; i++) {
    const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.5;
    const v = (speed || 4) * (0.5 + Math.random());
    particles.push({
      x, y,
      vx: Math.cos(angle) * v,
      vy: Math.sin(angle) * v - 2,
      life: 1,
      decay: 0.015 + Math.random() * 0.02,
      size: 3 + Math.random() * 5,
      color: colors[Math.floor(Math.random() * colors.length)],
    });
  }
  if (!particleRAF) tickParticles();
}
function emitEdgeParticles(containerW, containerH, count, colors, speed) {
  const half = Math.ceil(count / 2);
  for (let i = 0; i < count; i++) {
    const fromLeft = i < half;
    const x = fromLeft ? 0 : containerW;
    const y = containerH * 0.2 + Math.random() * containerH * 0.4;
    const angleBase = fromLeft ? (-Math.PI / 4 + Math.random() * Math.PI / 2) : (Math.PI * 0.75 + Math.random() * Math.PI / 2);
    const v = (speed || 4) * (0.5 + Math.random());
    particles.push({
      x, y,
      vx: Math.cos(angleBase) * v,
      vy: Math.sin(angleBase) * v - 1.5,
      life: 1,
      decay: 0.012 + Math.random() * 0.015,
      size: 3 + Math.random() * 6,
      color: colors[Math.floor(Math.random() * colors.length)],
    });
  }
  if (!particleRAF) tickParticles();
}
function tickParticles() {
  if (!particleCtx) return;
  particleCtx.clearRect(0, 0, particleCanvas.width, particleCanvas.height);
  particles = particles.filter(p => {
    p.x += p.vx;
    p.y += p.vy;
    p.vy += 0.15;
    p.life -= p.decay;
    if (p.life <= 0) return false;
    particleCtx.globalAlpha = p.life;
    particleCtx.fillStyle = p.color;
    particleCtx.beginPath();
    particleCtx.arc(p.x, p.y, p.size * p.life, 0, Math.PI * 2);
    particleCtx.fill();
    return true;
  });
  particleCtx.globalAlpha = 1;
  if (particles.length > 0) {
    particleRAF = requestAnimationFrame(tickParticles);
  } else {
    particleRAF = null;
  }
}

// ===== Speech =====
let enVoice = null;
let voicesLoaded = false;
function loadEnVoice() {
  if (voicesLoaded) return;
  const voices = window.speechSynthesis?.getVoices() || [];
  if (voices.length === 0) return;
  voicesLoaded = true;
  // Priority: high-quality en-US voices
  enVoice = voices.find(v => v.lang === 'en-US' && v.name.includes('Samantha'))
         || voices.find(v => v.lang === 'en-US' && v.name.includes('Karen'))
         || voices.find(v => v.lang === 'en-US' && v.name.includes('Daniel'))
         || voices.find(v => v.lang === 'en-US' && v.name.includes('Google'))
         || voices.find(v => v.lang === 'en-US')
         || voices.find(v => v.lang === 'en-GB')
         || voices.find(v => v.lang.startsWith('en'));
}
if ('speechSynthesis' in window) {
  window.speechSynthesis.onvoiceschanged = loadEnVoice;
  loadEnVoice();
}

function speakWord(word) {
  try {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    loadEnVoice();
    const u = new SpeechSynthesisUtterance(word);
    u.lang = 'en-US';
    u.rate = 0.85;
    u.pitch = 1.0;
    if (enVoice) u.voice = enVoice;
    window.speechSynthesis.speak(u);
  } catch(e) {}
}

// ===== Auth =====
$('show-signup').addEventListener('click', e => { e.preventDefault(); $('form-login').classList.add('hidden'); $('form-signup').classList.remove('hidden'); });
$('show-login').addEventListener('click', e => { e.preventDefault(); $('form-signup').classList.add('hidden'); $('form-login').classList.remove('hidden'); });

$('btn-login').addEventListener('click', async () => {
  const id = $('login-id').value.trim();
  const pw = $('login-password').value;
  if (!id || !pw) return showError('login-error', 'IDとパスワードを入力してください');
  try { await auth.signInWithEmailAndPassword(toEmail(id), pw); }
  catch (e) { showError('login-error', 'ログインに失敗しました。IDとパスワードを確認してください。'); }
});

$('btn-signup').addEventListener('click', async () => {
  const nick = $('signup-nickname').value.trim();
  const id = $('signup-id').value.trim();
  const pw = $('signup-password').value;
  const grade = $('signup-grade').value;
  if (!nick) return showError('signup-error', 'ニックネームを入力してください');
  if (!id) return showError('signup-error', 'IDを入力してください');
  if (pw.length < 6) return showError('signup-error', 'パスワードは6文字以上にしてください');
  if (!grade) return showError('signup-error', '学年を選んでください');
  try {
    const idCheck = await db.collection('users').where('loginId', '==', id.toLowerCase()).get();
    if (!idCheck.empty) return showError('signup-error', 'このIDはすでに使われています');
    const cred = await auth.createUserWithEmailAndPassword(toEmail(id), pw);
    await db.collection('users').doc(cred.user.uid).set({
      nickname: nick, loginId: id.toLowerCase(), grade, schoolId: '', role: 'student',
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      discoveredWords: [], highScore: 0, weekScore: 0, weekScoreDate: '',
      longestChain: 0, totalGames: 0, totalCorrect: 0, stretchCount: 0,
      streak: 0, bestStreak: 0, lastPlayDate: '', dailyLog: {}, pw,
    });
  } catch (e) {
    showError('signup-error', e.message.includes('email-already-in-use') ? 'このIDはすでに使われています' : 'アカウント作成に失敗しました: ' + e.message);
  }
});

function showError(id, msg) { const el = $(id); el.textContent = msg; el.classList.remove('hidden'); setTimeout(() => el.classList.add('hidden'), 4000); }

auth.onAuthStateChanged(async user => {
  if (user) {
    currentUser = user;
    const doc = await db.collection('users').doc(user.uid).get();
    if (!doc.exists) { auth.signOut(); return; }
    userDoc = doc.data();
    userRole = userDoc.role || 'student';
    if (userRole === 'teacher') enterAdmin();
    else enterHome();
  } else {
    currentUser = null; userDoc = null;
    show('screen-login'); showTab(false);
  }
});

// ===== Home =====
function enterHome() {
  show('screen-home'); showTab(true);
  $('tab-admin')?.parentElement?.classList.toggle('hidden', userRole !== 'teacher');
  $('home-username').textContent = userDoc.nickname || '';
  const streak = userDoc.streak || 0;
  $('home-streak').textContent = streak > 0 ? ('🔥 ' + streak + '日') : '';
  $('home-streak').classList.toggle('hidden', streak === 0);
  $('stat-words').textContent = (userDoc.discoveredWords || []).length;
  $('stat-chains').textContent = userDoc.longestChain || 0;
  $('stat-score').textContent = userDoc.highScore || 0;
  const disc = userDoc.discoveredWords || [];
  const stretches = disc.filter(w => {
    const word = ALL_WORDS.find(aw => aw.en === w);
    if (!word) return false;
    return eikenDifficulty(word.eiken) > (GRADE_EIKEN_MAP[userDoc.grade] || 0);
  });
  if (stretches.length > 0) {
    const last = stretches[stretches.length - 1];
    const word = ALL_WORDS.find(aw => aw.en === last);
    $('recent-stretch-text').textContent = `${last} (${EIKEN_LABELS[word.eiken]}) を読めた！`;
  }
  setActiveTab('home');
}

// Tooltip toggle
document.addEventListener('click', e => {
  const trigger = e.target.closest('.tooltip-trigger');
  document.querySelectorAll('.tooltip-popup.show').forEach(el => el.classList.remove('show'));
  if (trigger) {
    const popup = trigger.closest('.home-card')?.querySelector('.tooltip-popup');
    if (popup) { popup.classList.add('show'); e.stopPropagation(); }
  }
});

// ===== Tab Navigation =====
document.querySelectorAll('.tab-btn[data-tab]').forEach(btn => {
  btn.addEventListener('click', () => {
    const tab = btn.dataset.tab;
    if (tab === 'home') enterHome();
    else if (tab === 'encyclopedia') enterEncyclopedia();
    else if (tab === 'ranking') enterRanking();
    else if (tab === 'mypage') enterMyPage();
    else if (tab === 'admin') enterAdmin();
  });
});
function setActiveTab(tab) {
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.toggle('active', b.dataset.tab === tab));
}

// ===== GAME =====
let game = {};
let gameTimer = null;
let tickTimer = null;

$('btn-play').addEventListener('click', () => startGame());

function startGame() {
  const allFamilies = CHAIN_FAMILIES.filter(f => f.words.length >= 2);
  const avgLen = f => f.words.reduce((s, w) => s + w.en.length, 0) / f.words.length;
  allFamilies.sort((a, b) => avgLen(a) - avgLen(b));
  // Group into easy/medium/hard thirds, shuffle within each group
  const third = Math.ceil(allFamilies.length / 3);
  const families = [
    ...shuffleArray(allFamilies.slice(0, third)),
    ...shuffleArray(allFamilies.slice(third, third * 2)),
    ...shuffleArray(allFamilies.slice(third * 2)),
  ];
  if (families.length === 0) return;

  game = {
    families,
    familyIdx: 0,
    wordIdx: 0,
    chain: [],
    chainLen: 0,
    maxChain: 0,
    score: 0,
    displayScore: 0,
    combo: 0,
    maxCombo: 0,
    wordsCorrect: 0,
    wordsMissed: 0,
    stretchSuccesses: [],
    discoveredWords: [],
    timeLeft: GAME_TIME,
    gameOver: false,
    answering: false,
    totalAnswered: 0,
    startedAt: Date.now(),
    lastCorrectAt: Date.now(),
  };

  show('screen-game');
  showTab(false);
  initParticles();
  resizeParticleCanvas();
  startBGM();
  updateSoundButtons();
  $('game-score').textContent = '0';
  $('game-chain-count').textContent = '0';
  $('chain-visual').innerHTML = '';
  $('combo-area').innerHTML = '';
  $('game-timer').textContent = GAME_TIME.toFixed(1);
  $('game-timer').classList.remove('danger');
  $('timer-bar').style.width = '100%';
  $('timer-bar').classList.remove('danger');
  updateBg(0);

  startTimer();
  presentWord();
}

function startTimer() {
  clearInterval(gameTimer);
  clearInterval(tickTimer);
  const startTime = Date.now();
  const startTimeLeft = game.timeLeft;

  gameTimer = setInterval(() => {
    if (game.gameOver) return;
    const elapsed = (Date.now() - startTime) / 1000;
    game.timeLeft = Math.max(0, startTimeLeft - elapsed);
    $('game-timer').textContent = game.timeLeft.toFixed(1);
    $('timer-bar').style.width = (game.timeLeft / GAME_TIME * 100) + '%';

    const danger = game.timeLeft < 10;
    $('game-timer').classList.toggle('danger', danger);
    $('timer-bar').classList.toggle('danger', danger);
    setBGMDanger(danger);

    if (game.timeLeft <= 0) {
      clearInterval(gameTimer);
      clearInterval(tickTimer);
      endGame();
    }
  }, 50);

  tickTimer = setInterval(() => {
    if (game.gameOver) return;
    if (game.timeLeft <= 10 && game.timeLeft > 0) SFX.tick();
  }, 1000);
}

function addTime(sec) {
  game.timeLeft = Math.min(game.timeLeft + sec, GAME_TIME * 1.5);
  clearInterval(gameTimer);
  clearInterval(tickTimer);
  startTimer();
}

function currentFamily() { return game.families[game.familyIdx]; }
function currentWord() { return currentFamily()?.words[game.wordIdx]; }
function prevWord() { return game.wordIdx > 0 ? currentFamily().words[game.wordIdx - 1] : null; }

// ===== Chunk Diff Logic =====
const MAX_CHUNK = 2;

function findChunkDiff(prev, curr) {
  const p = prev.toLowerCase();
  const c = curr.toLowerCase();
  // Find longest common suffix
  let suffLen = 0;
  while (suffLen < p.length && suffLen < c.length && p[p.length - 1 - suffLen] === c[c.length - 1 - suffLen]) suffLen++;
  const cPrefix = c.slice(0, c.length - suffLen);
  const pPrefix = p.slice(0, p.length - suffLen);

  if (cPrefix.length > 0 && cPrefix !== pPrefix) {
    // Cap to MAX_CHUNK from the start of the differing prefix
    const len = Math.min(cPrefix.length, MAX_CHUNK);
    return { blankStart: 0, blankLen: len, chunk: c.slice(0, len) };
  }
  // Find longest common prefix
  let prefLen = 0;
  while (prefLen < p.length && prefLen < c.length && p[prefLen] === c[prefLen]) prefLen++;
  const cSuffix = c.slice(prefLen);
  if (cSuffix.length > 0) {
    const len = Math.min(cSuffix.length, MAX_CHUNK);
    return { blankStart: prefLen, blankLen: len, chunk: c.slice(prefLen, prefLen + len) };
  }
  // Fallback: 1 letter
  const pos = Math.floor(Math.random() * c.length);
  return { blankStart: pos, blankLen: 1, chunk: c[pos] };
}

function generateChoices(correctChunk) {
  const len = correctChunk.length;
  const vowelMode = isVowelChunk(correctChunk);
  const pool = vowelMode
    ? (VOWEL_CLUSTERS[len] || VOWEL_LIST)
    : (ONSET_CLUSTERS[len] || ONSET_CLUSTERS[1]);
  const choices = [correctChunk];
  const candidates = shuffleArray(pool.filter(c => c !== correctChunk));
  for (const c of candidates) {
    if (choices.length >= 4) break;
    if (c.length === len) choices.push(c);
  }
  while (choices.length < 4) {
    let r = '';
    const src = vowelMode ? VOWEL_LIST : CONSONANTS;
    for (let i = 0; i < len; i++) r += src[Math.floor(Math.random() * src.length)];
    if (!choices.includes(r)) choices.push(r);
  }
  return shuffleArray(choices);
}

function generateFirstWordChoices(correctWord, family) {
  const choices = [correctWord];
  const others = family.words
    .map(w => w.en.toLowerCase())
    .filter(w => w !== correctWord && w.length <= correctWord.length + 2 && w.length >= correctWord.length - 1);
  const pool = shuffleArray(others);
  for (const w of pool) {
    if (choices.length >= 4) break;
    if (!choices.includes(w)) choices.push(w);
  }
  // Fill from ALL_WORDS if not enough
  if (choices.length < 4) {
    const allPool = shuffleArray(ALL_WORDS
      .map(w => w.en.toLowerCase())
      .filter(w => w !== correctWord && w.length >= correctWord.length - 1 && w.length <= correctWord.length + 1 && !choices.includes(w)));
    for (const w of allPool) {
      if (choices.length >= 4) break;
      choices.push(w);
    }
  }
  return shuffleArray(choices);
}

// ===== Present Word =====
function presentWord() {
  if (game.gameOver) return;
  const fam = currentFamily();
  if (!fam || game.familyIdx >= game.families.length) { endGame(); return; }
  if (game.wordIdx >= fam.words.length) { nextFamily(); return; }

  const word = currentWord();
  const prev = prevWord();
  const isFirst = game.wordIdx === 0;

  // Family label + progress
  $('word-family').textContent = `${fam.theme}  (${game.wordIdx + 1}/${fam.words.length})`;
  $('word-meaning').textContent = word.ja;

  if (isFirst) {
    // First word: blank 1 random letter, show the rest
    const w = word.en.toLowerCase();
    const pos = Math.floor(Math.random() * w.length);
    game.currentDiff = { blankStart: pos, blankLen: 1, chunk: w[pos] };
    game.targetWord = w;
    renderWordLetters(w, pos, 1, w[pos]);
    const choices = generateChoices(w[pos]);
    renderChoices(choices, w[pos]);
    game.answering = true;
    return;
  }

  // Find chunk diff
  const diff = findChunkDiff(prev.en, word.en);
  game.currentDiff = diff;
  game.targetWord = word.en.toLowerCase();

  // Render word with blank
  renderWordLetters(word.en, diff.blankStart, diff.blankLen, diff.chunk);

  // Generate 4 choices
  const choices = generateChoices(diff.chunk);
  renderChoices(choices, diff.chunk);
  game.answering = true;
}

// ===== Render letter blocks =====
const VOWEL_COLOR = '#FF6B6B';
const CONSONANT_COLOR = '#4ECDC4';
const BLOCK_COLORS = ['#FF6B6B','#4ECDC4','#45B7D1','#96CEB4','#e91e8c','#DDA0DD','#f59e0b','#98D8C8','#8b5cf6','#ef4444'];

function renderWordLetters(word, blankStart, blankLen, chunk) {
  const container = $('word-letters');
  container.innerHTML = '';
  const letters = word.toLowerCase().split('');
  const len = letters.length;
  const tileSize = len <= 5 ? 44 : len <= 7 ? 38 : len <= 9 ? 32 : 26;
  const fontSize = len <= 5 ? 1.6 : len <= 7 ? 1.3 : len <= 9 ? 1.1 : 0.9;

  // Show previous word ABOVE the board
  const prevLabel = document.querySelector('.word-prev-label');
  if (prevLabel) prevLabel.remove();
  const prev = prevWord();
  if (prev && blankStart >= 0) {
    const lbl = document.createElement('div');
    lbl.className = 'word-prev-label';
    lbl.textContent = prev.en + '  →';
    const board = document.querySelector('.word-board');
    if (board) board.parentNode.insertBefore(lbl, board);
  }

  for (let i = 0; i < letters.length; i++) {
    const span = document.createElement('span');
    span.className = 'word-letter';
    span.style.minWidth = tileSize + 'px';
    span.style.height = tileSize + 'px';
    span.style.fontSize = fontSize + 'rem';

    if (blankStart >= 0 && i >= blankStart && i < blankStart + blankLen) {
      span.classList.add('blank');
      span.textContent = '?';
      span.dataset.blankIdx = i - blankStart;
    } else {
      span.textContent = letters[i];
      span.style.background = VOWELS.has(letters[i]) ? VOWEL_COLOR : CONSONANT_COLOR;
    }
    container.appendChild(span);
  }
}

function renderChoices(choices, correctChunk) {
  const area = $('choices-area');
  area.innerHTML = '';
  choices.forEach(ch => {
    const btn = document.createElement('button');
    btn.className = 'choice-btn ' + (isVowelChunk(ch) ? 'vowel-choice' : 'consonant-choice');
    btn.textContent = ch.toLowerCase();
    btn.addEventListener('click', () => handleChoice(ch, correctChunk, btn));
    area.appendChild(btn);
  });
}

// ===== Handle Choice =====
function handleChoice(chosen, correct, btn) {
  if (!game.answering || game.gameOver) return;
  game.answering = false;
  const word = currentWord();
  const isCorrect = chosen === correct;

  // Disable all buttons immediately
  document.querySelectorAll('.choice-btn').forEach(b => b.classList.add('disabled'));

  if (isCorrect) {
    btn.classList.add('correct');
    SFX.correct();
    game.wordsCorrect++;
    game.combo++;
    game.totalAnswered++;
    game.lastCorrectAt = Date.now();
    if (game.combo > game.maxCombo) game.maxCombo = game.combo;

    // Score
    const diffBonus = eikenDifficulty(word.eiken) * 15;
    const comboBonus = Math.min(game.combo * 8, 80);
    const speedBonus = Math.max(0, 30 - Math.floor((Date.now() - game.lastCorrectAt) / 100));
    const wordScore = 20 + diffBonus + comboBonus + speedBonus;
    game.score += wordScore;
    animateScore(wordScore);
    showScorePopup('+' + wordScore);

    // Time bonus
    addTime(TIME_BONUS_CORRECT);

    // Chain
    game.chain.push(word.en);
    game.chainLen++;
    if (game.chainLen > game.maxChain) game.maxChain = game.chainLen;
    $('game-chain-count').textContent = game.chainLen;
    addChainPill(word.en);

    // Discover
    if (!game.discoveredWords.includes(word.en)) game.discoveredWords.push(word.en);

    // Combo display
    updateCombo();
    if (game.combo % 5 === 0 && game.combo > 0) {
      SFX.combo(game.combo);
      screenFlash('white');
    }

    // Background intensity
    updateBg(game.combo);

    // Particles — edges only so they don't cover the word
    const contRect = $('game-container').getBoundingClientRect();
    const cw = contRect.width;
    const ch = contRect.height;
    emitEdgeParticles(cw, ch, 12, ['#4ade80', '#22c55e', '#fbbf24', '#fff', '#a78bfa'], 5);

    // Screen shake
    shakeScreen(false);

    // Flash correct letters
    flashCorrectLetters();

    // Stretch check
    const userLevel = userDoc ? (GRADE_EIKEN_MAP[userDoc.grade] || 0) : 0;
    const isStretch = eikenDifficulty(word.eiken) > userLevel;
    if (isStretch) {
      SFX.stretch();
      showStretchBanner(word);
      emitEdgeParticles(cw, ch, 40, ['#fbbf24', '#f59e0b', '#fde047', '#fff'], 7);
      shakeScreen(true);
      if (!game.stretchSuccesses.find(s => s.en === word.en)) {
        game.stretchSuccesses.push({ en: word.en, eiken: word.eiken });
      }
    }

    // Show eiken float
    showFloatFeedback(word);

    // Speak the word
    speakWord(word.en);

    // Next word quickly
    setTimeout(() => {
      game.wordIdx++;
      // Check if family complete
      if (game.wordIdx >= currentFamily().words.length) {
        SFX.chainComplete();
        addTime(TIME_BONUS_CHAIN);
        showChainComplete();
        setTimeout(() => nextFamily(), 600);
      } else {
        presentWord();
      }
    }, 350);

  } else {
    btn.classList.add('wrong');
    SFX.wrong();
    game.wordsMissed++;
    game.combo = 0;
    updateCombo();
    updateBg(0);

    // Show correct answer
    document.querySelectorAll('.choice-btn').forEach(b => {
      if (b.textContent === correct) b.classList.add('correct');
    });

    // Penalty
    addTime(-TIME_PENALTY_WRONG);

    // Shake
    shakeScreen(false);

    // Red particles — edges
    const contR = $('game-container').getBoundingClientRect();
    emitEdgeParticles(contR.width, contR.height, 8, ['#ef4444','#f97316','#fca5a5'], 3);

    setTimeout(() => {
      game.chainLen = 0;
      $('game-chain-count').textContent = '0';
      $('chain-visual').innerHTML = '';
      nextFamily();
    }, 500);
  }
}

function nextFamily() {
  if (game.gameOver) return;
  game.familyIdx++;
  game.wordIdx = 0;
  game.chainLen = 0;
  game.chain = [];
  $('game-chain-count').textContent = '0';
  $('chain-visual').innerHTML = '';
  if (game.familyIdx >= game.families.length) {
    const allF = CHAIN_FAMILIES.filter(f => f.words.length >= 2);
    const aL = f => f.words.reduce((s, w) => s + w.en.length, 0) / f.words.length;
    allF.sort((a, b) => aL(a) - aL(b));
    const t = Math.ceil(allF.length / 3);
    game.families = [...shuffleArray(allF.slice(0, t)), ...shuffleArray(allF.slice(t, t * 2)), ...shuffleArray(allF.slice(t * 2))];
    game.familyIdx = 0;
  }
  presentWord();
}

// ===== Visual Effects =====
function shakeScreen(big) {
  const c = $('game-container');
  c.classList.remove('shake', 'big-shake');
  void c.offsetWidth;
  c.classList.add(big ? 'big-shake' : 'shake');
  setTimeout(() => c.classList.remove('shake', 'big-shake'), big ? 300 : 150);
}

function screenFlash(type) {
  const el = $('screen-flash');
  el.classList.remove('flash-white', 'flash-gold');
  void el.offsetWidth;
  el.classList.add('flash-' + type);
  setTimeout(() => el.classList.remove('flash-white', 'flash-gold'), 100);
}

function flashCorrectLetters() {
  document.querySelectorAll('.word-letter.blank').forEach(el => {
    const word = currentWord();
    const diff = game.currentDiff;
    const idx = parseInt(el.dataset.blankIdx);
    el.textContent = diff.chunk[idx] || '';
    el.classList.remove('blank');
    el.classList.add('correct-flash');
  });
}

function animateScore(added) {
  const target = game.score;
  const el = $('game-score');
  el.classList.remove('score-pop');
  void el.offsetWidth;
  el.classList.add('score-pop');
  let current = target - added;
  const step = Math.ceil(added / 8);
  const anim = setInterval(() => {
    current = Math.min(current + step, target);
    el.textContent = current;
    if (current >= target) clearInterval(anim);
  }, 25);
  setTimeout(() => el.classList.remove('score-pop'), 300);
}

function showScorePopup(text) {
  const el = document.createElement('div');
  el.className = 'float-feedback';
  el.style.cssText = 'font-size:1.4rem;font-weight:900;color:#ffd700;text-shadow:0 0 10px rgba(255,215,0,0.6)';
  el.textContent = text;
  $('game-container').appendChild(el);
  setTimeout(() => el.remove(), 800);
}

function showFloatFeedback(word) {
  const el = document.createElement('div');
  el.className = 'float-feedback';
  el.style.top = '40%';
  el.innerHTML = `${word.en} <span class="fb-eiken">${EIKEN_LABELS[word.eiken]}</span>`;
  $('game-container').appendChild(el);
  setTimeout(() => el.remove(), 800);
}

function showStretchBanner(word) {
  const el = $('stretch-banner');
  el.textContent = `\u{1F31F} 背伸び成功！ ${word.en} = ${EIKEN_LABELS[word.eiken]}`;
  el.classList.remove('hidden');
  void el.offsetWidth;
  el.style.animation = 'none';
  void el.offsetWidth;
  el.style.animation = '';
  setTimeout(() => el.classList.add('hidden'), 1200);
}

function showChainComplete() {
  const el = $('chain-complete-banner');
  el.textContent = 'CHAIN COMPLETE!';
  el.classList.remove('hidden');
  el.style.animation = 'none';
  void el.offsetWidth;
  el.style.animation = '';
  screenFlash('gold');
  // Big edge particles
  const c = $('game-container');
  emitEdgeParticles(c.offsetWidth, c.offsetHeight, 30, ['#667eea','#764ba2','#fbbf24','#4ade80','#fff'], 6);
  setTimeout(() => el.classList.add('hidden'), 1000);
}

function updateCombo() {
  const area = $('combo-area');
  if (game.combo < 2) { area.innerHTML = ''; return; }
  const size = Math.min(1.5 + game.combo * 0.12, 3.5);
  area.innerHTML = `<span class="combo-text pop" style="font-size:${size}rem">${game.combo} COMBO</span>`;
  setTimeout(() => {
    const t = area.querySelector('.combo-text');
    if (t) t.classList.remove('pop');
  }, 200);
}

function updateBg(combo) {
  const c = $('game-container');
  if (!c) return;
  const intensity = Math.min(combo * 3, 40);
  c.style.background = `hsl(${230 + combo * 2}, ${15 + intensity}%, ${4 + intensity * 0.15}%)`;
}

function addChainPill(word) {
  const pill = document.createElement('div');
  pill.className = 'chain-word-pill';
  pill.textContent = word;
  $('chain-visual').appendChild(pill);
  $('chain-visual').scrollLeft = $('chain-visual').scrollWidth;
}

// Speak button
$('btn-speak').addEventListener('click', () => {
  const word = currentWord();
  if (word) speakWord(word.en);
});

// Quit
$('btn-quit-game').addEventListener('click', () => endGame());

// Sound toggles
function updateSoundButtons() {
  $('btn-toggle-bgm')?.classList.toggle('muted', bgmMuted);
  $('btn-toggle-se')?.classList.toggle('muted', seMuted);
}
$('btn-toggle-bgm')?.addEventListener('click', () => {
  bgmMuted = !bgmMuted;
  try { localStorage.setItem('pc_bgm_muted', bgmMuted ? '1' : '0'); } catch(e) {}
  updateSoundButtons();
  if (bgmMuted) stopBGM(); else if (!game.gameOver) startBGM();
});
$('btn-toggle-se')?.addEventListener('click', () => {
  seMuted = !seMuted;
  try { localStorage.setItem('pc_se_muted', seMuted ? '1' : '0'); } catch(e) {}
  updateSoundButtons();
});

// ===== End Game =====
async function endGame() {
  if (game.gameOver) return;
  game.gameOver = true;
  clearInterval(gameTimer);
  clearInterval(tickTimer);
  stopBGM();
  SFX.gameOver();

  show('screen-results');
  showTab(false);

  const wpm = game.totalAnswered > 0 ? Math.round(game.wordsCorrect / ((Date.now() - game.startedAt) / 60000)) : 0;

  $('results-title').textContent = game.score >= 2000 ? '🏆 神！' :
                                    game.score >= 1000 ? '🌟 すごすぎる！' :
                                    game.score >= 500 ? '🎉 やったね！' :
                                    game.score >= 200 ? '👏 いい感じ！' : '💪 がんばった！';

  $('results-score-num').textContent = game.score;

  $('results-stats').innerHTML = `
    <div class="result-stat"><div class="result-stat-num">${game.wordsCorrect}</div><div class="result-stat-label">正解</div></div>
    <div class="result-stat"><div class="result-stat-num">${game.maxChain}</div><div class="result-stat-label">最長チェーン</div></div>
    <div class="result-stat"><div class="result-stat-num">${game.maxCombo}</div><div class="result-stat-label">最大コンボ</div></div>
    <div class="result-stat"><div class="result-stat-num">${wpm}</div><div class="result-stat-label">語/分</div></div>
  `;

  if (game.stretchSuccesses.length > 0) {
    $('results-stretch').innerHTML = '<div style="font-size:0.9rem;font-weight:700;margin-bottom:8px;color:#fbbf24">🌟 背伸び成功した単語</div>' +
      game.stretchSuccesses.map(s => `
        <div class="stretch-item">
          <span class="stretch-word">${s.en}</span>
          <span class="stretch-eiken">${EIKEN_LABELS[s.eiken]}</span>
        </div>
      `).join('');
  } else {
    $('results-stretch').innerHTML = '';
  }

  if (game.discoveredWords.length > 0) {
    $('results-words').innerHTML = game.discoveredWords.map(w => {
      const word = ALL_WORDS.find(aw => aw.en === w);
      return word ? `<div class="rw-item"><span>${w} ${word.ph}</span><span>${word.ja}</span></div>` : '';
    }).join('');
  } else {
    $('results-words').innerHTML = '';
  }

  // Save to Firestore
  if (currentUser && userDoc) {
    const today = new Date().toISOString().slice(0, 10);
    const updates = {
      totalGames: firebase.firestore.FieldValue.increment(1),
      totalCorrect: firebase.firestore.FieldValue.increment(game.wordsCorrect),
    };
    if (game.score > (userDoc.highScore || 0)) updates.highScore = game.score;
    if (game.maxChain > (userDoc.longestChain || 0)) updates.longestChain = game.maxChain;
    if (game.stretchSuccesses.length > 0) {
      updates.stretchCount = firebase.firestore.FieldValue.increment(game.stretchSuccesses.length);
    }
    const existing = userDoc.discoveredWords || [];
    const newWords = game.discoveredWords.filter(w => !existing.includes(w));
    if (newWords.length > 0) updates.discoveredWords = firebase.firestore.FieldValue.arrayUnion(...newWords);

    const weekStart = getWeekStart(today);
    if (userDoc.weekScoreDate !== weekStart || game.score > (userDoc.weekScore || 0)) {
      updates.weekScore = game.score;
      updates.weekScoreDate = weekStart;
    }
    const lastPlay = userDoc.lastPlayDate || '';
    if (lastPlay !== today) {
      const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
      const newStreak = lastPlay === yesterday ? (userDoc.streak || 0) + 1 : 1;
      updates.streak = newStreak;
      if (newStreak > (userDoc.bestStreak || 0)) updates.bestStreak = newStreak;
      updates.lastPlayDate = today;
      updates[`dailyLog.${today}`] = { games: firebase.firestore.FieldValue.increment(1), correct: game.wordsCorrect, score: game.score };
    }
    // Game history entry
    const historyEntry = {
      date: new Date().toISOString(),
      score: game.score,
      correct: game.wordsCorrect,
      chain: game.maxChain,
      stretch: game.stretchSuccesses.length,
      duration: GAME_TIME,
    };
    updates.gameHistory = firebase.firestore.FieldValue.arrayUnion(historyEntry);

    try {
      await db.collection('users').doc(currentUser.uid).update(updates);
      const freshDoc = await db.collection('users').doc(currentUser.uid).get();
      userDoc = freshDoc.data();
      // Trim gameHistory to last 50 on client
      if (userDoc.gameHistory && userDoc.gameHistory.length > 50) {
        const trimmed = userDoc.gameHistory.slice(-50);
        await db.collection('users').doc(currentUser.uid).update({ gameHistory: trimmed });
        userDoc.gameHistory = trimmed;
      }
    } catch (e) { console.error('Save error:', e); }
  }
}

function getWeekStart(dateStr) {
  const d = new Date(dateStr);
  const day = d.getDay();
  const diff = d.getDate() - day + (day === 0 ? -6 : 1);
  return new Date(d.setDate(diff)).toISOString().slice(0, 10);
}

$('btn-retry').addEventListener('click', () => startGame());
$('btn-results-home').addEventListener('click', () => enterHome());

// ===== Encyclopedia =====
function enterEncyclopedia() {
  show('screen-encyclopedia'); showTab(true); setActiveTab('encyclopedia');
  renderEncyclopedia('all');
}
$('btn-back-enc').addEventListener('click', () => enterHome());
document.querySelectorAll('#enc-filter .chip').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('#enc-filter .chip').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    renderEncyclopedia(btn.dataset.eiken);
  });
});
function renderEncyclopedia(filterEiken) {
  const discovered = userDoc ? (userDoc.discoveredWords || []) : [];
  const list = $('enc-list');
  list.innerHTML = '';
  let totalWords = 0, discoveredCount = 0;
  CHAIN_FAMILIES.forEach(fam => {
    const filtered = fam.words.filter(w => filterEiken === 'all' || String(w.eiken) === filterEiken);
    if (filtered.length === 0) return;
    const famDiv = document.createElement('div');
    famDiv.className = 'enc-family';
    famDiv.innerHTML = `<div class="enc-family-title">${fam.theme}</div>`;
    filtered.forEach(w => {
      const isDisc = discovered.includes(w.en);
      totalWords++;
      if (isDisc) discoveredCount++;
      const row = document.createElement('div');
      row.className = 'enc-word' + (isDisc ? '' : ' locked');
      row.innerHTML = `
        <span class="enc-word-en">${w.en}</span>
        <span class="enc-word-ph">${isDisc ? w.ph : '???'}</span>
        <span class="enc-word-ja">${isDisc ? w.ja : '???'}</span>
        <span class="enc-word-eiken">${EIKEN_LABELS[w.eiken]}</span>
      `;
      famDiv.appendChild(row);
    });
    list.appendChild(famDiv);
  });
  $('enc-stats').textContent = `${discoveredCount} / ${totalWords} 単語を発見済み (${totalWords > 0 ? Math.round(discoveredCount / totalWords * 100) : 0}%)`;
}

// ===== Rankings =====
let rankTab = 'all', rankPeriod = 'week';
function enterRanking() { show('screen-ranking'); showTab(true); setActiveTab('ranking'); loadRankings(); }
$('btn-back-rank').addEventListener('click', () => enterHome());
document.querySelectorAll('.rank-tab').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.rank-tab').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    rankTab = btn.dataset.rank;
    loadRankings();
  });
});
document.querySelectorAll('#rank-period .chip').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('#rank-period .chip').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    rankPeriod = btn.dataset.period;
    loadRankings();
  });
});
async function loadRankings() {
  const list = $('rank-list');
  list.innerHTML = '<div style="text-align:center;padding:20px;color:#888">読み込み中...</div>';
  try {
    let query = db.collection('users').where('role', '==', 'student');
    if (rankTab === 'school' && userDoc?.schoolId) query = query.where('schoolId', '==', userDoc.schoolId);
    if (rankTab === 'grade' && userDoc?.grade) query = query.where('grade', '==', userDoc.grade);
    const scoreField = rankPeriod === 'week' ? 'weekScore' : 'highScore';
    const snap = await query.orderBy(scoreField, 'desc').limit(50).get();
    list.innerHTML = '';
    if (snap.empty) { list.innerHTML = '<div style="text-align:center;padding:20px;color:#888">まだデータがありません</div>'; return; }
    snap.docs.forEach((doc, i) => {
      const d = doc.data();
      const isMe = currentUser && doc.id === currentUser.uid;
      const posText = i < 3 ? ['🥇', '🥈', '🥉'][i] : (i + 1);
      const posClass = i === 0 ? 'gold' : i === 1 ? 'silver' : i === 2 ? 'bronze' : '';
      const item = document.createElement('div');
      item.className = 'rank-item' + (isMe ? ' me' : '');
      item.innerHTML = `
        <div class="rank-pos ${posClass}">${posText}</div>
        <div class="rank-name">${d.nickname || '???'}${d.grade ? ' <span style="font-size:0.75rem;color:#888">' + (GRADE_LABELS[d.grade]||'') + '</span>' : ''}</div>
        <div class="rank-score">${d[scoreField] || 0} pt</div>
      `;
      list.appendChild(item);
    });
  } catch (e) {
    list.innerHTML = '<div style="text-align:center;padding:20px;color:#888">ランキングの読み込みに失敗しました</div>';
  }
}

// ===== My Page =====
let mypageCalDate = new Date();

function enterMyPage() {
  show('screen-mypage'); showTab(true); setActiveTab('mypage');
  if (!userDoc) return;
  $('mypage-name').textContent = userDoc.nickname || '';
  $('mypage-grade').textContent = GRADE_LABELS[userDoc.grade] || '';
  $('mypage-school').textContent = userDoc.schoolId ? ('校舎: ' + userDoc.schoolId) : '';
  $('mypage-effort').innerHTML = `
    <div class="effort-item"><div class="effort-num">${userDoc.totalGames || 0}</div><div class="effort-label">プレイ回数</div></div>
    <div class="effort-item"><div class="effort-num">${userDoc.totalCorrect || 0}</div><div class="effort-label">正解数</div></div>
    <div class="effort-item"><div class="effort-num">${(userDoc.discoveredWords || []).length}</div><div class="effort-label">発見した単語</div></div>
    <div class="effort-item"><div class="effort-num">${userDoc.stretchCount || 0}</div><div class="effort-label">背伸び成功</div></div>
  `;
  const streak = userDoc.streak || 0, best = userDoc.bestStreak || 0;
  $('mypage-streak').innerHTML = `<div style="font-size:2rem">🔥</div><div><div style="font-size:1.5rem;font-weight:800">${streak}日</div><div style="font-size:0.8rem;color:#888">最高: ${best}日</div></div>`;
  mypageCalDate = new Date();
  renderCalendarWidget($('mypage-calendar'), userDoc.dailyLog || {}, mypageCalDate, 'mypage');
  renderMasteryChart();
  renderGameHistory(userDoc.gameHistory || []);
}
$('btn-back-mypage').addEventListener('click', () => enterHome());
$('btn-logout').addEventListener('click', () => auth.signOut());

// Shared calendar renderer
function renderCalendarWidget(container, dailyLog, viewDate, target) {
  const year = viewDate.getFullYear(), month = viewDate.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDow = new Date(year, month, 1).getDay();
  const todayStr = new Date().toISOString().slice(0, 10);

  let html = '<div class="cal-container">';
  html += `<div class="cal-header">
    <button class="cal-nav-btn" onclick="calNav(-1,'${target}')">&#x2039;</button>
    <span class="cal-header-title">${year}年${month + 1}月</span>
    <button class="cal-nav-btn" onclick="calNav(1,'${target}')">&#x203A;</button>
  </div>`;
  html += '<div class="cal-dow">';
  ['日','月','火','水','木','金','土'].forEach(d => { html += `<div>${d}</div>`; });
  html += '</div><div class="cal-grid">';
  for (let i = 0; i < firstDow; i++) html += '<div></div>';
  for (let d = 1; d <= daysInMonth; d++) {
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
    const log = dailyLog[dateStr];
    const isToday = dateStr === todayStr;
    const cls = log ? 'cal-day has-log' : isToday ? 'cal-day today' : 'cal-day';
    const onclick = log ? ` onclick="showDayDetail('${target}','${dateStr}')"` : '';
    html += `<div class="${cls}"${onclick}>${d}</div>`;
  }
  html += '</div></div>';
  html += `<div id="cal-day-detail-${target}"></div>`;
  container.innerHTML = html;
}

function calNav(delta, target) {
  if (target === 'mypage') {
    mypageCalDate.setMonth(mypageCalDate.getMonth() + delta);
    renderCalendarWidget($('mypage-calendar'), userDoc.dailyLog || {}, mypageCalDate, 'mypage');
  } else if (target === 'detail') {
    detailCalDate.setMonth(detailCalDate.getMonth() + delta);
    if (detailStudentData) renderCalendarWidget($('detail-body'), detailStudentData.dailyLog || {}, detailCalDate, 'detail');
  }
}

function showDayDetail(target, dateStr) {
  const log = target === 'mypage' ? (userDoc.dailyLog || {})[dateStr] : (detailStudentData?.dailyLog || {})[dateStr];
  const el = document.getElementById(`cal-day-detail-${target}`);
  if (!el || !log) return;
  const parts = dateStr.split('-');
  el.innerHTML = `<div class="cal-day-detail">
    <strong>${parseInt(parts[1])}/${parseInt(parts[2])}</strong> —
    ${log.games || 0}回プレイ / ${log.correct || 0}問正解 / ${log.score || 0}pt
  </div>`;
}

// Word mastery by eiken level
function renderMasteryChart() {
  const discovered = userDoc.discoveredWords || [];
  const levels = [
    { key: '5', label: '5級' }, { key: '4', label: '4級' }, { key: '3', label: '3級' },
    { key: 'p2', label: '準2級' }, { key: '2', label: '2級' }, { key: 'p1', label: '準1級' }, { key: '1', label: '1級' }
  ];
  const counts = {};
  const totals = {};
  levels.forEach(l => { counts[l.key] = 0; totals[l.key] = 0; });
  ALL_WORDS.forEach(w => {
    const k = String(w.eiken);
    if (totals[k] !== undefined) totals[k]++;
    if (discovered.includes(w.en) && counts[k] !== undefined) counts[k]++;
  });
  const maxTotal = Math.max(...Object.values(totals), 1);
  let html = '<div class="mastery-chart">';
  levels.forEach(l => {
    const pct = totals[l.key] > 0 ? (counts[l.key] / totals[l.key] * 100) : 0;
    html += `<div class="mastery-row">
      <span class="mastery-label">${l.label}</span>
      <div class="mastery-bar-wrap"><div class="mastery-bar" style="width:${pct}%"></div></div>
      <span class="mastery-count">${counts[l.key]}/${totals[l.key]}</span>
    </div>`;
  });
  html += '</div>';
  $('mypage-mastery').innerHTML = html;
}

// Game history
function renderGameHistory(history) {
  const el = $('mypage-history');
  if (!history || history.length === 0) {
    el.innerHTML = '<div class="history-empty">まだ履歴がありません</div>';
    return;
  }
  const sorted = [...history].sort((a, b) => b.date.localeCompare(a.date));
  let html = '<div class="history-list">';
  sorted.slice(0, 20).forEach(h => {
    const d = new Date(h.date);
    const when = `${d.getMonth() + 1}/${d.getDate()} ${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;
    html += `<div class="history-item">
      <div><div class="history-date">${when}</div><div class="history-details">${h.correct || 0}問正解 / 🔗${h.chain || 0} / 🌟${h.stretch || 0}</div></div>
      <div class="history-score">${h.score || 0}pt</div>
    </div>`;
  });
  html += '</div>';
  el.innerHTML = html;
}

// ===== Admin =====
function enterAdmin() {
  show('screen-admin'); showTab(true); setActiveTab('admin');
  $('admin-teacher-name').textContent = userDoc ? userDoc.nickname : '';
  loadAdminStudents();
}
$('btn-admin-logout').addEventListener('click', () => auth.signOut());
document.querySelectorAll('.admin-tab').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.admin-tab').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    document.querySelectorAll('.admin-panel').forEach(p => p.classList.add('hidden'));
    $('admin-panel-' + btn.dataset.adminTab).classList.remove('hidden');
    if (btn.dataset.adminTab === 'students') loadAdminStudents();
    else if (btn.dataset.adminTab === 'teachers') loadAdminTeachers();
    else if (btn.dataset.adminTab === 'schools') loadAdminSchools();
  });
});
async function loadAdminStudents() {
  const list = $('admin-student-list');
  list.innerHTML = '<div style="text-align:center;padding:20px;color:#888">読み込み中...</div>';
  try {
    const snap = await db.collection('users').where('role', '==', 'student').orderBy('nickname').get();
    list.innerHTML = '';
    if (snap.empty) { list.innerHTML = '<div style="padding:20px;color:#888">生徒がいません</div>'; return; }
    snap.docs.forEach(doc => {
      const d = doc.data();
      const row = document.createElement('div');
      row.className = 'admin-student-row';
      row.innerHTML = `<div class="admin-student-name">${d.nickname || '???'}</div><div class="admin-student-stats">${GRADE_LABELS[d.grade] || ''} | ${(d.discoveredWords || []).length}語 | 🔥${d.streak || 0}日 | HS:${d.highScore || 0}</div>`;
      row.addEventListener('click', () => openStudentDetail(doc.id, d));
      list.appendChild(row);
    });
  } catch (e) { list.innerHTML = '<div style="padding:20px;color:#e74c3c">読み込みエラー</div>'; }
}
$('btn-admin-refresh').addEventListener('click', loadAdminStudents);
$('admin-search').addEventListener('input', () => {
  const q = $('admin-search').value.toLowerCase();
  document.querySelectorAll('.admin-student-row').forEach(row => {
    row.style.display = row.textContent.toLowerCase().includes(q) ? '' : 'none';
  });
});
$('btn-create-teacher').addEventListener('click', async () => {
  const name = $('create-teacher-name').value.trim();
  const id = $('create-teacher-id').value.trim();
  const pw = $('create-teacher-password').value;
  if (!name || !id || pw.length < 6) return showError('create-teacher-error', '全項目を入力してください（パスワード6文字以上）');
  try {
    const idCheck = await db.collection('users').where('loginId', '==', id.toLowerCase()).get();
    if (!idCheck.empty) return showError('create-teacher-error', 'このIDはすでに使われています');
    const secApp = getSecondaryApp();
    const secAuth = secApp.auth();
    const cred = await secAuth.createUserWithEmailAndPassword(toEmail(id), pw);
    await db.collection('users').doc(cred.user.uid).set({
      nickname: name, loginId: id.toLowerCase(), role: 'teacher',
      schoolId: $('create-teacher-school')?.value || '',
      createdAt: firebase.firestore.FieldValue.serverTimestamp(), pw,
    });
    await secAuth.signOut();
    $('create-teacher-name').value = ''; $('create-teacher-id').value = ''; $('create-teacher-password').value = '';
    loadAdminTeachers();
  } catch (e) { showError('create-teacher-error', '作成に失敗しました: ' + e.message); }
});
async function loadAdminTeachers() {
  const list = $('admin-teacher-list');
  list.innerHTML = '<div style="text-align:center;padding:20px;color:#888">読み込み中...</div>';
  try {
    const snap = await db.collection('users').where('role', '==', 'teacher').get();
    list.innerHTML = '';
    snap.docs.forEach(doc => {
      const d = doc.data();
      const row = document.createElement('div');
      row.className = 'admin-student-row';
      row.innerHTML = `<div class="admin-student-name">${d.nickname}</div><div class="admin-student-stats">ID: ${d.loginId}</div>`;
      list.appendChild(row);
    });
  } catch (e) { list.innerHTML = '<div style="padding:20px;color:#e74c3c">読み込みエラー</div>'; }
}
$('btn-create-school').addEventListener('click', async () => {
  const name = $('create-school-name').value.trim();
  if (!name) return showError('create-school-error', '校舎名を入力してください');
  try {
    await db.collection('schools').add({ name, createdAt: firebase.firestore.FieldValue.serverTimestamp() });
    $('create-school-name').value = '';
    loadAdminSchools();
  } catch (e) { showError('create-school-error', '追加に失敗しました'); }
});
async function loadAdminSchools() {
  const list = $('admin-school-list');
  list.innerHTML = '<div style="text-align:center;padding:20px;color:#888">読み込み中...</div>';
  try {
    const snap = await db.collection('schools').get();
    list.innerHTML = '';
    const sel = $('create-teacher-school');
    if (sel) sel.innerHTML = '<option value="">校舎を選択</option>';
    snap.docs.forEach(doc => {
      const d = doc.data();
      const row = document.createElement('div');
      row.className = 'admin-student-row';
      row.innerHTML = `<div class="admin-student-name">${d.name}</div>`;
      list.appendChild(row);
      if (sel) { const opt = document.createElement('option'); opt.value = doc.id; opt.textContent = d.name; sel.appendChild(opt); }
    });
    if (snap.empty) list.innerHTML = '<div style="padding:20px;color:#888">校舎がまだ登録されていません</div>';
  } catch (e) { list.innerHTML = '<div style="padding:20px;color:#e74c3c">読み込みエラー</div>'; }
}
// ===== Student Detail Modal (teacher view) =====
let detailStudentData = null;
let detailCalDate = new Date();

function openStudentDetail(uid, data) {
  detailStudentData = data;
  detailCalDate = new Date();
  $('detail-student-name').textContent = data.nickname || '—';
  $('detail-student-id').textContent = data.loginId || '—';
  const pwEl = $('detail-student-pw');
  pwEl.textContent = '••••••';
  pwEl.dataset.pw = data.pw || '（未登録）';
  pwEl.dataset.visible = 'false';
  $('btn-pw-toggle').textContent = '表示';
  $('detail-student-grade-label').textContent = GRADE_LABELS[data.grade] || '';
  renderDetailTab('calendar');
  $('student-detail-modal').classList.remove('hidden');
}

$('btn-close-detail').addEventListener('click', () => {
  $('student-detail-modal').classList.add('hidden');
  detailStudentData = null;
});

$('btn-pw-toggle').addEventListener('click', () => {
  const pwEl = $('detail-student-pw');
  if (pwEl.dataset.visible === 'true') {
    pwEl.textContent = '••••••';
    pwEl.dataset.visible = 'false';
    $('btn-pw-toggle').textContent = '表示';
  } else {
    pwEl.textContent = pwEl.dataset.pw;
    pwEl.dataset.visible = 'true';
    $('btn-pw-toggle').textContent = '隠す';
  }
});

document.querySelectorAll('.detail-tab-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.detail-tab-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    renderDetailTab(btn.dataset.dtab);
  });
});

function renderDetailTab(tab) {
  const body = $('detail-body');
  const data = detailStudentData;
  if (!data) return;
  body.innerHTML = '';

  if (tab === 'calendar') {
    renderCalendarWidget(body, data.dailyLog || {}, detailCalDate, 'detail');
    // Summary stats
    const summary = document.createElement('div');
    summary.className = 'detail-effort-grid';
    summary.innerHTML = `
      <div class="detail-effort-item"><div class="detail-effort-num">${data.totalGames || 0}</div><div class="detail-effort-label">プレイ回数</div></div>
      <div class="detail-effort-item"><div class="detail-effort-num">${(data.discoveredWords || []).length}</div><div class="detail-effort-label">発見単語</div></div>
      <div class="detail-effort-item"><div class="detail-effort-num">🔥${data.streak || 0}</div><div class="detail-effort-label">連続日数</div></div>
    `;
    body.appendChild(summary);
  } else if (tab === 'chart') {
    renderDetailChart(body, data);
  } else if (tab === 'history') {
    renderDetailHistory(body, data);
  }
}

function renderDetailChart(container, data) {
  const log = data.dailyLog || {};
  const dates = Object.keys(log).sort();
  if (dates.length === 0) {
    container.innerHTML = '<div class="history-empty">まだデータがありません</div>';
    return;
  }
  // Group by week
  const weeks = {};
  dates.forEach(d => {
    const ws = getWeekStart(d);
    if (!weeks[ws]) weeks[ws] = { games: 0, correct: 0, score: 0 };
    const entry = log[d];
    weeks[ws].games += entry.games || 0;
    weeks[ws].correct += entry.correct || 0;
    weeks[ws].score += entry.score || 0;
  });
  const weekKeys = Object.keys(weeks).sort().slice(-12);
  const maxScore = Math.max(...weekKeys.map(k => weeks[k].score), 1);

  let html = '<div class="detail-section-title">週ごとのスコア推移</div>';
  html += '<div class="bar-chart">';
  weekKeys.forEach(wk => {
    const w = weeks[wk];
    const pct = (w.score / maxScore * 100);
    const parts = wk.split('-');
    const label = `${parseInt(parts[1])}/${parseInt(parts[2])}`;
    html += `<div class="bar-col">
      <div class="bar-value">${w.score}</div>
      <div class="bar-fill" style="height:${pct}%"></div>
      <div class="bar-label">${label}</div>
    </div>`;
  });
  html += '</div>';

  // Discovered words breakdown
  const disc = data.discoveredWords || [];
  html += '<div class="detail-section-title">発見単語の内訳</div>';
  html += '<div class="detail-effort-grid">';
  html += `<div class="detail-effort-item"><div class="detail-effort-num">${disc.length}</div><div class="detail-effort-label">合計</div></div>`;
  html += `<div class="detail-effort-item"><div class="detail-effort-num">${data.highScore || 0}</div><div class="detail-effort-label">ハイスコア</div></div>`;
  html += `<div class="detail-effort-item"><div class="detail-effort-num">${data.longestChain || 0}</div><div class="detail-effort-label">最長チェーン</div></div>`;
  html += '</div>';
  container.innerHTML = html;
}

function renderDetailHistory(container, data) {
  const history = data.gameHistory || [];
  if (history.length === 0) {
    container.innerHTML = '<div class="history-empty">まだ履歴がありません</div>';
    return;
  }
  const sorted = [...history].sort((a, b) => b.date.localeCompare(a.date));
  let html = '<div class="history-list">';
  sorted.forEach(h => {
    const d = new Date(h.date);
    const when = `${d.getMonth() + 1}/${d.getDate()} ${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;
    html += `<div class="history-item">
      <div><div class="history-date">${when}</div><div class="history-details">${h.correct || 0}問正解 / 🔗${h.chain || 0} / 🌟${h.stretch || 0}</div></div>
      <div class="history-score">${h.score || 0}pt</div>
    </div>`;
  });
  html += '</div>';
  container.innerHTML = html;
}

// ===== Profile =====
$('btn-edit-profile')?.addEventListener('click', () => {
  const newNick = prompt('新しいニックネームを入力してください', userDoc.nickname);
  if (newNick && newNick.trim()) {
    db.collection('users').doc(currentUser.uid).update({ nickname: newNick.trim() })
      .then(() => { userDoc.nickname = newNick.trim(); enterMyPage(); });
  }
});
