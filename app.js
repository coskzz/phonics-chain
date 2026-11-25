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
const ONSET_CLUSTERS = {
  1: 'bcdfghjklmnpqrstvwxyz'.split(''),
  2: ['bl','br','ch','cl','cr','dr','fl','fr','gl','gr','kn','ph','pl','pr','qu','sc','sh','sk','sl','sm','sn','sp','st','sw','th','tr','tw','wh','wr'],
  3: ['chr','sch','scr','shr','spl','spr','str','thr'],
};
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
function getAudioCtx() {
  if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  return audioCtx;
}
function playTone(freq, duration, type, vol) {
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

// ===== Speech (Google TTS) =====
let speechAudio = null;
function speakWord(word) {
  try {
    if (speechAudio) { speechAudio.pause(); speechAudio = null; }
    const url = `https://translate.google.com/translate_tts?ie=UTF-8&tl=en&client=tw-ob&q=${encodeURIComponent(word)}`;
    speechAudio = new Audio(url);
    speechAudio.playbackRate = 0.9;
    speechAudio.play().catch(() => {
      // Fallback to browser speechSynthesis
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        const u = new SpeechSynthesisUtterance(word);
        u.lang = 'en-US';
        u.rate = 0.85;
        u.pitch = 1.0;
        const voices = window.speechSynthesis.getVoices();
        const good = voices.find(v => v.lang === 'en-US' && v.name.includes('Samantha'))
                  || voices.find(v => v.lang === 'en-US' && !v.localService === false)
                  || voices.find(v => v.lang.startsWith('en'));
        if (good) u.voice = good;
        window.speechSynthesis.speak(u);
      }
    });
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
  const families = shuffleArray(CHAIN_FAMILIES.filter(f => f.words.length >= 2));
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
function findChunkDiff(prev, curr) {
  const p = prev.toLowerCase();
  const c = curr.toLowerCase();
  // Find longest common suffix
  let suffLen = 0;
  while (suffLen < p.length && suffLen < c.length && p[p.length - 1 - suffLen] === c[c.length - 1 - suffLen]) suffLen++;
  const suffix = c.slice(c.length - suffLen);
  const cPrefix = c.slice(0, c.length - suffLen);
  const pPrefix = p.slice(0, p.length - suffLen);

  if (cPrefix.length > 0 && cPrefix !== pPrefix) {
    return { blankStart: 0, blankLen: cPrefix.length, chunk: cPrefix, suffix };
  }
  // Find longest common prefix
  let prefLen = 0;
  while (prefLen < p.length && prefLen < c.length && p[prefLen] === c[prefLen]) prefLen++;
  const prefix = c.slice(0, prefLen);
  const cSuffix = c.slice(prefLen);
  if (cSuffix.length > 0) {
    return { blankStart: prefLen, blankLen: cSuffix.length, chunk: cSuffix, suffix: '' };
  }
  // Fallback: pick a random position
  const pos = Math.floor(Math.random() * c.length);
  return { blankStart: pos, blankLen: 1, chunk: c[pos], suffix: '' };
}

function generateChoices(correctChunk) {
  const len = correctChunk.length;
  const pool = ONSET_CLUSTERS[len] || ONSET_CLUSTERS[1];
  const choices = [correctChunk];
  const candidates = shuffleArray(pool.filter(c => c !== correctChunk));
  for (const c of candidates) {
    if (choices.length >= 4) break;
    if (c.length === len) choices.push(c);
  }
  // If not enough same-length, generate random
  while (choices.length < 4) {
    let r = '';
    for (let i = 0; i < len; i++) r += 'bcdfghjklmnpqrstvwxyz'[Math.floor(Math.random() * 21)];
    if (!choices.includes(r)) choices.push(r);
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
    // Show complete word as intro
    renderWordLetters(word.en, -1, 0, '');
    $('choices-area').innerHTML = '';
    game.answering = false;
    // Auto-advance
    setTimeout(() => {
      speakWord(word.en);
      addChainPill(word.en);
      game.chain.push(word.en);
      game.chainLen++;
      $('game-chain-count').textContent = game.chainLen;
      if (!game.discoveredWords.includes(word.en)) game.discoveredWords.push(word.en);
      game.wordIdx++;
      presentWord();
    }, 600);
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
const BLOCK_COLORS = ['#667eea','#764ba2','#4ade80','#f59e0b','#ec4899','#06b6d4','#8b5cf6','#ef4444','#10b981','#f97316'];

function renderWordLetters(word, blankStart, blankLen, chunk) {
  const container = $('word-letters');
  container.innerHTML = '';
  const letters = word.toLowerCase().split('');

  // If showing previous word arrow
  const prev = prevWord();
  if (prev && blankStart >= 0) {
    const arrow = document.createElement('span');
    arrow.className = 'word-letter';
    arrow.style.cssText = 'font-size:1rem;color:#64748b;margin-right:4px;opacity:0.5';
    arrow.textContent = prev.en + ' →';
    container.appendChild(arrow);
  }

  for (let i = 0; i < letters.length; i++) {
    const span = document.createElement('span');
    span.className = 'word-letter';

    if (blankStart >= 0 && i >= blankStart && i < blankStart + blankLen) {
      span.classList.add('blank');
      span.textContent = '_';
      span.style.background = 'rgba(251,191,36,0.15)';
      span.style.borderRadius = '6px';
      span.style.padding = '0 3px';
      span.dataset.blankIdx = i - blankStart;
    } else {
      span.textContent = letters[i];
      const ci = (i * 7 + word.charCodeAt(0)) % BLOCK_COLORS.length;
      span.style.color = '#e2e8f0';
      span.style.background = 'rgba(255,255,255,0.08)';
      span.style.borderRadius = '6px';
      span.style.padding = '0 4px';
    }
    container.appendChild(span);
  }
}

function renderChoices(choices, correctChunk) {
  const area = $('choices-area');
  area.innerHTML = '';
  choices.forEach(ch => {
    const btn = document.createElement('button');
    btn.className = 'choice-btn';
    btn.textContent = ch;
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
    game.families = shuffleArray(CHAIN_FAMILIES.filter(f => f.words.length >= 2));
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

// ===== End Game =====
async function endGame() {
  if (game.gameOver) return;
  game.gameOver = true;
  clearInterval(gameTimer);
  clearInterval(tickTimer);
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
    try {
      await db.collection('users').doc(currentUser.uid).update(updates);
      const freshDoc = await db.collection('users').doc(currentUser.uid).get();
      userDoc = freshDoc.data();
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
  renderCalendar();
}
$('btn-back-mypage').addEventListener('click', () => enterHome());
$('btn-logout').addEventListener('click', () => auth.signOut());
function renderCalendar() {
  const cal = $('mypage-calendar');
  const log = userDoc.dailyLog || {};
  const today = new Date();
  const year = today.getFullYear(), month = today.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  let html = `<div style="font-size:0.85rem;font-weight:600;margin-bottom:8px">${year}年${month + 1}月</div>`;
  html += '<div style="display:grid;grid-template-columns:repeat(7,1fr);gap:4px;text-align:center">';
  ['日','月','火','水','木','金','土'].forEach(d => { html += `<div style="font-size:0.7rem;color:#888">${d}</div>`; });
  const firstDay = new Date(year, month, 1).getDay();
  for (let i = 0; i < firstDay; i++) html += '<div></div>';
  for (let d = 1; d <= daysInMonth; d++) {
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
    const hasLog = log[dateStr];
    const isToday = d === today.getDate();
    const bg = hasLog ? '#667eea' : isToday ? '#e8e8e8' : 'transparent';
    const color = hasLog ? '#fff' : '#333';
    html += `<div style="width:28px;height:28px;border-radius:50%;background:${bg};color:${color};display:flex;align-items:center;justify-content:center;font-size:0.75rem;font-weight:${hasLog ? '700' : '400'};margin:0 auto">${d}</div>`;
  }
  html += '</div>';
  cal.innerHTML = html;
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
$('btn-edit-profile')?.addEventListener('click', () => {
  const newNick = prompt('新しいニックネームを入力してください', userDoc.nickname);
  if (newNick && newNick.trim()) {
    db.collection('users').doc(currentUser.uid).update({ nickname: newNick.trim() })
      .then(() => { userDoc.nickname = newNick.trim(); enterMyPage(); });
  }
});
