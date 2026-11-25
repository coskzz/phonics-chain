// ===== Phonics Chain — app.js =====
// Architecture follows hapikuru-english-app pattern:
// - Firebase Auth (email/password via custom ID)
// - Firestore for user data, scores, rankings
// - Roles: student / teacher
// - Pure HTML/JS, no build step

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

// Game state
let game = {
  difficulty: 'normal',
  currentFamily: null,
  currentWordIndex: 0,
  chain: [],
  score: 0,
  combo: 0,
  maxCombo: 0,
  wordsCorrect: 0,
  wordsMissed: 0,
  stretchSuccesses: [],
  discoveredWords: [],
  typedLetters: [],
  givenLetters: [],
  targetWord: '',
  availableFamilies: [],
  familiesUsed: 0,
  gameOver: false,
};

// ===== Constants =====
const EMAIL_DOMAIN = '@phonicschain.app';
const DIFF_SETTINGS = {
  easy:    { minEiken: 0, maxEiken: 1, label: 'やさしい' },
  normal:  { minEiken: 0, maxEiken: 2, label: 'ふつう' },
  hard:    { minEiken: 1, maxEiken: 5, label: 'むずかしい' },
  extreme: { minEiken: 0, maxEiken: 6, label: 'エクストリーム' },
};
const GRADE_LABELS = {
  e1:'小1', e2:'小2', e3:'小3', e4:'小4', e5:'小5', e6:'小6',
  j1:'中1', j2:'中2', j3:'中3', h1:'高1', h2:'高2', h3:'高3', adult:'大人'
};
const GRADE_EIKEN_MAP = {
  e1:0, e2:0, e3:0, e4:0, e5:1, e6:1,
  j1:2, j2:2, j3:3, h1:3, h2:4, h3:4, adult:5
};

// ===== Helpers =====
function $(id) { return document.getElementById(id); }
function show(id) { document.querySelectorAll('.screen').forEach(s => s.classList.remove('active')); $(id).classList.add('active'); }
function showTab(show) { $('tab-bar').classList.toggle('hidden', !show); }
function shuffleArray(arr) { const a = [...arr]; for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }
function toEmail(id) { return id.includes('@') ? id : id.toLowerCase() + EMAIL_DOMAIN; }
function fromEmail(email) { return email.endsWith(EMAIL_DOMAIN) ? email.replace(EMAIL_DOMAIN, '') : email; }

// ===== Auth =====
$('show-signup').addEventListener('click', e => { e.preventDefault(); $('form-login').classList.add('hidden'); $('form-signup').classList.remove('hidden'); });
$('show-login').addEventListener('click', e => { e.preventDefault(); $('form-signup').classList.add('hidden'); $('form-login').classList.remove('hidden'); });

$('btn-login').addEventListener('click', async () => {
  const id = $('login-id').value.trim();
  const pw = $('login-password').value;
  if (!id || !pw) return showError('login-error', 'IDとパスワードを入力してください');
  try {
    await auth.signInWithEmailAndPassword(toEmail(id), pw);
  } catch (e) {
    showError('login-error', 'ログインに失敗しました。IDとパスワードを確認してください。');
  }
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
      nickname: nick,
      loginId: id.toLowerCase(),
      grade: grade,
      schoolId: '',
      role: 'student',
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      discoveredWords: [],
      highScore: 0,
      weekScore: 0,
      weekScoreDate: '',
      longestChain: 0,
      totalGames: 0,
      totalCorrect: 0,
      stretchCount: 0,
      streak: 0,
      bestStreak: 0,
      lastPlayDate: '',
      dailyLog: {},
      pw: pw,
    });
  } catch (e) {
    showError('signup-error', e.message.includes('email-already-in-use') ? 'このIDはすでに使われています' : 'アカウント作成に失敗しました: ' + e.message);
  }
});

function showError(id, msg) { const el = $(id); el.textContent = msg; el.classList.remove('hidden'); setTimeout(() => el.classList.add('hidden'), 4000); }

// Auth state listener
auth.onAuthStateChanged(async user => {
  if (user) {
    currentUser = user;
    const doc = await db.collection('users').doc(user.uid).get();
    if (!doc.exists) { auth.signOut(); return; }
    userDoc = doc.data();
    userRole = userDoc.role || 'student';
    if (userRole === 'teacher') {
      enterAdmin();
    } else {
      enterHome();
    }
  } else {
    currentUser = null;
    userDoc = null;
    show('screen-login');
    showTab(false);
  }
});

// ===== Home =====
function enterHome() {
  show('screen-home');
  showTab(true);
  $('tab-admin').parentElement.classList.toggle('hidden', userRole !== 'teacher');
  $('home-username').textContent = userDoc.nickname || '';
  const streak = userDoc.streak || 0;
  $('home-streak').textContent = streak > 0 ? ('🔥 ' + streak + '日') : '';
  $('home-streak').classList.toggle('hidden', streak === 0);
  $('stat-words').textContent = (userDoc.discoveredWords || []).length;
  $('stat-chains').textContent = userDoc.longestChain || 0;
  $('stat-score').textContent = userDoc.highScore || 0;
  // Recent stretch
  const disc = userDoc.discoveredWords || [];
  const stretches = disc.filter(w => {
    const word = ALL_WORDS.find(aw => aw.en === w);
    if (!word) return false;
    const userLevel = GRADE_EIKEN_MAP[userDoc.grade] || 0;
    return eikenDifficulty(word.eiken) > userLevel;
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

// ===== Game Start =====
$('btn-play').addEventListener('click', () => { show('screen-difficulty'); showTab(false); });
$('btn-back-home-diff').addEventListener('click', () => enterHome());

document.querySelectorAll('.diff-btn').forEach(btn => {
  btn.addEventListener('click', () => startGame(btn.dataset.diff));
});

function startGame(difficulty) {
  const settings = DIFF_SETTINGS[difficulty];
  // Filter families that have words in the difficulty range
  const families = CHAIN_FAMILIES.filter(fam =>
    fam.words.some(w => eikenDifficulty(w.eiken) >= settings.minEiken && eikenDifficulty(w.eiken) <= settings.maxEiken)
  ).map(fam => ({
    ...fam,
    words: fam.words.filter(w => eikenDifficulty(w.eiken) <= settings.maxEiken)
  })).filter(fam => fam.words.length >= 3);

  if (families.length === 0) return;

  game = {
    difficulty,
    currentFamily: null,
    currentWordIndex: 0,
    chain: [],
    score: 0,
    combo: 0,
    maxCombo: 0,
    wordsCorrect: 0,
    wordsMissed: 0,
    stretchSuccesses: [],
    discoveredWords: [],
    typedLetters: [],
    givenLetters: [],
    targetWord: '',
    availableFamilies: shuffleArray(families),
    familiesUsed: 0,
    gameOver: false,
  };

  show('screen-game');
  showTab(false);
  $('game-score').textContent = '0';
  $('game-chain-count').textContent = '0';
  $('chain-visual').innerHTML = '';
  removeComboDisplay();

  nextFamily();
}

function nextFamily() {
  if (game.familiesUsed >= game.availableFamilies.length) {
    endGame();
    return;
  }
  game.currentFamily = game.availableFamilies[game.familiesUsed];
  game.familiesUsed++;
  game.currentWordIndex = 0;
  game.chain = [];
  $('chain-visual').innerHTML = '';
  presentWord();
}

function presentWord() {
  if (game.currentWordIndex >= game.currentFamily.words.length) {
    // Family complete - move to next
    nextFamily();
    return;
  }

  const word = game.currentFamily.words[game.currentWordIndex];
  game.targetWord = word.en.toLowerCase();

  // Determine which letters to give as hints
  const isFirst = game.currentWordIndex === 0;
  if (isFirst) {
    // First word in chain: show all letters (intro)
    game.givenLetters = game.targetWord.split('').map((_, i) => i);
  } else {
    // Show letters that were in previous word (shared pattern)
    const prevWord = game.currentFamily.words[game.currentWordIndex - 1].en.toLowerCase();
    game.givenLetters = [];
    // Find shared suffix/pattern
    for (let i = 0; i < game.targetWord.length; i++) {
      if (prevWord.includes(game.targetWord[i]) && Math.random() < 0.4) {
        game.givenLetters.push(i);
      }
    }
    // Always give at least the shared ending
    const minGiven = Math.max(1, Math.floor(game.targetWord.length * 0.3));
    if (game.givenLetters.length < minGiven) {
      // Give ending letters
      for (let i = game.targetWord.length - 1; i >= 0 && game.givenLetters.length < minGiven; i--) {
        if (!game.givenLetters.includes(i)) game.givenLetters.push(i);
      }
    }
  }

  game.typedLetters = new Array(game.targetWord.length).fill(null);
  game.givenLetters.forEach(i => { game.typedLetters[i] = game.targetWord[i]; });

  // UI
  $('prompt-family').textContent = game.currentFamily.theme;
  $('prompt-meaning').textContent = word.ja;

  // Build hint display
  let hint = '';
  for (let i = 0; i < game.targetWord.length; i++) {
    hint += game.givenLetters.includes(i) ? game.targetWord[i] : '_';
  }
  $('prompt-hint').textContent = hint;

  renderAnswerBoxes();
  renderKeyboard();

  if (isFirst) {
    // Auto-complete first word after brief display
    setTimeout(() => {
      showCorrectFeedback(word, false);
    }, 800);
  }
}

function renderAnswerBoxes() {
  const container = $('answer-display');
  container.innerHTML = '';
  for (let i = 0; i < game.targetWord.length; i++) {
    const box = document.createElement('div');
    box.className = 'answer-letter';
    if (game.givenLetters.includes(i)) {
      box.classList.add('given');
      box.textContent = game.targetWord[i];
    } else if (game.typedLetters[i]) {
      box.classList.add('filled');
      box.textContent = game.typedLetters[i];
    }
    container.appendChild(box);
  }
}

function renderKeyboard() {
  const container = $('letter-keyboard');
  container.innerHTML = '';
  const rows = ['qwertyuiop', 'asdfghjkl', 'zxcvbnm'];
  rows.forEach(row => {
    row.split('').forEach(letter => {
      const btn = document.createElement('button');
      btn.className = 'key-btn';
      btn.textContent = letter;
      btn.addEventListener('click', () => typeLetter(letter));
      container.appendChild(btn);
    });
    if (row === 'zxcvbnm') {
      const bksp = document.createElement('button');
      bksp.className = 'key-btn backspace';
      bksp.textContent = '⌫';
      bksp.addEventListener('click', () => backspace());
      container.appendChild(bksp);
    }
  });
}

function typeLetter(letter) {
  if (game.gameOver) return;
  // Find first empty non-given slot
  const idx = game.typedLetters.findIndex((l, i) => l === null && !game.givenLetters.includes(i));
  if (idx === -1) return;
  game.typedLetters[idx] = letter;
  renderAnswerBoxes();

  // Check if all filled
  if (!game.typedLetters.includes(null)) {
    checkAnswer();
  }
}

function backspace() {
  // Remove last typed (non-given) letter
  for (let i = game.typedLetters.length - 1; i >= 0; i--) {
    if (game.typedLetters[i] !== null && !game.givenLetters.includes(i)) {
      game.typedLetters[i] = null;
      renderAnswerBoxes();
      return;
    }
  }
}

// Physical keyboard support
document.addEventListener('keydown', e => {
  if (!$('screen-game').classList.contains('active') || game.gameOver) return;
  if (e.key === 'Backspace') { backspace(); e.preventDefault(); }
  else if (/^[a-z]$/i.test(e.key)) { typeLetter(e.key.toLowerCase()); e.preventDefault(); }
});

function checkAnswer() {
  const answer = game.typedLetters.join('');
  const word = game.currentFamily.words[game.currentWordIndex];
  const correct = answer === game.targetWord;

  const boxes = $('answer-display').children;
  for (let i = 0; i < boxes.length; i++) {
    if (!game.givenLetters.includes(i)) {
      boxes[i].classList.add(correct ? 'correct' : 'wrong');
    }
  }

  if (correct) {
    game.wordsCorrect++;
    game.combo++;
    if (game.combo > game.maxCombo) game.maxCombo = game.combo;

    // Score: base + combo bonus + difficulty bonus
    const diffBonus = eikenDifficulty(word.eiken) * 10;
    const comboBonus = Math.min(game.combo * 5, 50);
    const wordScore = 10 + diffBonus + comboBonus;
    game.score += wordScore;
    $('game-score').textContent = game.score;

    // Chain
    game.chain.push(word.en);
    $('game-chain-count').textContent = game.chain.length;
    addChainPill(word.en);

    // Combo display
    if (game.combo >= 2) showCombo(game.combo);

    // Discover
    if (!game.discoveredWords.includes(word.en)) {
      game.discoveredWords.push(word.en);
    }

    // Check stretch success
    const userLevel = userDoc ? (GRADE_EIKEN_MAP[userDoc.grade] || 0) : 0;
    const isStretch = eikenDifficulty(word.eiken) > userLevel;

    setTimeout(() => {
      showCorrectFeedback(word, isStretch);
    }, 400);
  } else {
    game.wordsMissed++;
    game.combo = 0;
    removeComboDisplay();
    setTimeout(() => {
      showWrongFeedback(word);
    }, 500);
  }
}

function addChainPill(word) {
  const pill = document.createElement('div');
  pill.className = 'chain-word-pill';
  pill.textContent = word;
  $('chain-visual').appendChild(pill);
  // Scroll to end
  $('chain-visual').scrollLeft = $('chain-visual').scrollWidth;
}

function showCombo(n) {
  removeComboDisplay();
  const div = document.createElement('div');
  div.className = 'combo-display';
  div.id = 'combo-display';
  div.innerHTML = `<div class="combo-num">${n}</div><div class="combo-label">COMBO</div>`;
  document.body.appendChild(div);
}
function removeComboDisplay() {
  const el = $('combo-display');
  if (el) el.remove();
}

function showCorrectFeedback(word, isStretch) {
  const fb = $('game-feedback');
  const content = $('feedback-content');

  let html = `<div class="feedback-emoji">✨</div>`;
  html += `<div class="feedback-word">${word.en}</div>`;
  html += `<div class="feedback-ph">${word.ph}</div>`;
  html += `<div class="feedback-meaning">${word.ja}</div>`;
  html += `<div class="feedback-eiken">${EIKEN_LABELS[word.eiken]}</div>`;

  if (isStretch) {
    html += `<div class="feedback-stretch">🌟 背伸び成功！すごい！</div>`;
    if (!game.stretchSuccesses.find(s => s.en === word.en)) {
      game.stretchSuccesses.push({ en: word.en, eiken: word.eiken });
    }
  }

  content.innerHTML = html;
  fb.classList.remove('hidden');

  const delay = isStretch ? 1800 : 1200;
  setTimeout(() => {
    fb.classList.add('hidden');
    game.currentWordIndex++;
    presentWord();
  }, delay);
}

function showWrongFeedback(word) {
  const fb = $('game-feedback');
  const content = $('feedback-content');
  content.innerHTML = `
    <div class="feedback-emoji">💥</div>
    <div class="feedback-word" style="color:#ef4444">${word.en}</div>
    <div class="feedback-ph">${word.ph}</div>
    <div class="feedback-meaning">${word.ja}</div>
    <div style="color:#94a3b8;font-size:0.85rem;margin-top:8px">チェーンが切れた！次のファミリーへ</div>
  `;
  fb.classList.remove('hidden');
  setTimeout(() => {
    fb.classList.add('hidden');
    nextFamily();
  }, 1500);
}

// Quit game
$('btn-quit-game').addEventListener('click', () => endGame());

async function endGame() {
  game.gameOver = true;
  removeComboDisplay();

  // Show results
  show('screen-results');
  showTab(false);

  const chainLen = game.chain.length;
  $('results-title').textContent = chainLen >= 20 ? '🏆 すごすぎる！' :
                                    chainLen >= 10 ? '🎉 やったね！' :
                                    chainLen >= 5  ? '👏 いい感じ！' : '💪 がんばった！';

  $('results-score-num').textContent = game.score;

  $('results-stats').innerHTML = `
    <div class="result-stat"><div class="result-stat-num">${game.wordsCorrect}</div><div class="result-stat-label">正解した単語</div></div>
    <div class="result-stat"><div class="result-stat-num">${chainLen}</div><div class="result-stat-label">最長チェーン</div></div>
    <div class="result-stat"><div class="result-stat-num">${game.maxCombo}</div><div class="result-stat-label">最大コンボ</div></div>
    <div class="result-stat"><div class="result-stat-num">${game.stretchSuccesses.length}</div><div class="result-stat-label">背伸び成功</div></div>
  `;

  // Stretch successes
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

  // Discovered words list
  if (game.discoveredWords.length > 0) {
    $('results-words').innerHTML = game.discoveredWords.map(w => {
      const word = ALL_WORDS.find(aw => aw.en === w);
      return word ? `<div class="rw-item"><span>${w} ${word.ph}</span><span>${word.ja}</span></div>` : '';
    }).join('');
  }

  // Save to Firestore
  if (currentUser && userDoc) {
    const today = new Date().toISOString().slice(0, 10);
    const updates = {
      totalGames: firebase.firestore.FieldValue.increment(1),
      totalCorrect: firebase.firestore.FieldValue.increment(game.wordsCorrect),
    };
    if (game.score > (userDoc.highScore || 0)) updates.highScore = game.score;
    if (chainLen > (userDoc.longestChain || 0)) updates.longestChain = chainLen;
    if (game.stretchSuccesses.length > 0) {
      updates.stretchCount = firebase.firestore.FieldValue.increment(game.stretchSuccesses.length);
    }

    // Discovered words
    const existing = userDoc.discoveredWords || [];
    const newWords = game.discoveredWords.filter(w => !existing.includes(w));
    if (newWords.length > 0) {
      updates.discoveredWords = firebase.firestore.FieldValue.arrayUnion(...newWords);
    }

    // Weekly score
    const weekStart = getWeekStart(today);
    if (userDoc.weekScoreDate !== weekStart || game.score > (userDoc.weekScore || 0)) {
      updates.weekScore = game.score;
      updates.weekScoreDate = weekStart;
    }

    // Streak
    const lastPlay = userDoc.lastPlayDate || '';
    if (lastPlay !== today) {
      const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
      const newStreak = lastPlay === yesterday ? (userDoc.streak || 0) + 1 : 1;
      updates.streak = newStreak;
      if (newStreak > (userDoc.bestStreak || 0)) updates.bestStreak = newStreak;
      updates.lastPlayDate = today;
      // Daily log
      updates[`dailyLog.${today}`] = {
        games: firebase.firestore.FieldValue.increment(1),
        correct: game.wordsCorrect,
        score: game.score,
      };
    }

    try {
      await db.collection('users').doc(currentUser.uid).update(updates);
      // Refresh local doc
      const freshDoc = await db.collection('users').doc(currentUser.uid).get();
      userDoc = freshDoc.data();
    } catch (e) {
      console.error('Save error:', e);
    }
  }
}

function getWeekStart(dateStr) {
  const d = new Date(dateStr);
  const day = d.getDay();
  const diff = d.getDate() - day + (day === 0 ? -6 : 1); // Monday
  return new Date(d.setDate(diff)).toISOString().slice(0, 10);
}

$('btn-retry').addEventListener('click', () => startGame(game.difficulty));
$('btn-results-home').addEventListener('click', () => enterHome());

// ===== Encyclopedia =====
function enterEncyclopedia() {
  show('screen-encyclopedia');
  showTab(true);
  setActiveTab('encyclopedia');
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

  let totalWords = 0;
  let discoveredCount = 0;

  CHAIN_FAMILIES.forEach(fam => {
    const filtered = fam.words.filter(w => filterEiken === 'all' || String(w.eiken) === filterEiken);
    if (filtered.length === 0) return;

    const famDiv = document.createElement('div');
    famDiv.className = 'enc-family';
    famDiv.innerHTML = `<div class="enc-family-title">${fam.theme}</div>`;

    filtered.forEach(w => {
      const isDiscovered = discovered.includes(w.en);
      totalWords++;
      if (isDiscovered) discoveredCount++;

      const row = document.createElement('div');
      row.className = 'enc-word' + (isDiscovered ? '' : ' locked');
      row.innerHTML = `
        <span class="enc-word-en">${w.en}</span>
        <span class="enc-word-ph">${isDiscovered ? w.ph : '???'}</span>
        <span class="enc-word-ja">${isDiscovered ? w.ja : '???'}</span>
        <span class="enc-word-eiken">${EIKEN_LABELS[w.eiken]}</span>
      `;
      famDiv.appendChild(row);
    });
    list.appendChild(famDiv);
  });

  $('enc-stats').textContent = `${discoveredCount} / ${totalWords} 単語を発見済み (${totalWords > 0 ? Math.round(discoveredCount/totalWords*100) : 0}%)`;
}

// ===== Rankings =====
let rankTab = 'all';
let rankPeriod = 'week';

function enterRanking() {
  show('screen-ranking');
  showTab(true);
  setActiveTab('ranking');
  loadRankings();
}
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
    if (rankTab === 'school' && userDoc && userDoc.schoolId) {
      query = query.where('schoolId', '==', userDoc.schoolId);
    }
    if (rankTab === 'grade' && userDoc && userDoc.grade) {
      query = query.where('grade', '==', userDoc.grade);
    }

    const scoreField = rankPeriod === 'week' ? 'weekScore' : 'highScore';
    const snap = await query.orderBy(scoreField, 'desc').limit(50).get();

    list.innerHTML = '';
    if (snap.empty) {
      list.innerHTML = '<div style="text-align:center;padding:20px;color:#888">まだデータがありません</div>';
      return;
    }

    snap.docs.forEach((doc, i) => {
      const d = doc.data();
      const isMe = currentUser && doc.id === currentUser.uid;
      const posClass = i === 0 ? 'gold' : i === 1 ? 'silver' : i === 2 ? 'bronze' : '';
      const posText = i < 3 ? ['🥇','🥈','🥉'][i] : (i + 1);
      const gradeLabel = GRADE_LABELS[d.grade] || '';
      const item = document.createElement('div');
      item.className = 'rank-item' + (isMe ? ' me' : '');
      item.innerHTML = `
        <div class="rank-pos ${posClass}">${posText}</div>
        <div class="rank-name">${d.nickname || '???'}${gradeLabel ? ' <span style="font-size:0.75rem;color:#888">' + gradeLabel + '</span>' : ''}</div>
        <div class="rank-score">${d[scoreField] || 0} pt</div>
      `;
      list.appendChild(item);
    });
  } catch (e) {
    console.error('Rankings error:', e);
    list.innerHTML = '<div style="text-align:center;padding:20px;color:#888">ランキングの読み込みに失敗しました</div>';
  }
}

// ===== My Page =====
function enterMyPage() {
  show('screen-mypage');
  showTab(true);
  setActiveTab('mypage');
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

  const streak = userDoc.streak || 0;
  const best = userDoc.bestStreak || 0;
  $('mypage-streak').innerHTML = `
    <div style="font-size:2rem">🔥</div>
    <div>
      <div style="font-size:1.5rem;font-weight:800">${streak}日</div>
      <div style="font-size:0.8rem;color:#888">最高: ${best}日</div>
    </div>
  `;

  // Calendar
  renderCalendar();
}
$('btn-back-mypage').addEventListener('click', () => enterHome());
$('btn-logout').addEventListener('click', () => auth.signOut());

function renderCalendar() {
  const cal = $('mypage-calendar');
  const log = userDoc.dailyLog || {};
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const monthLabel = `${year}年${month + 1}月`;

  let html = `<div style="font-size:0.85rem;font-weight:600;margin-bottom:8px">${monthLabel}</div>`;
  html += '<div style="display:grid;grid-template-columns:repeat(7,1fr);gap:4px;text-align:center">';
  ['日','月','火','水','木','金','土'].forEach(d => { html += `<div style="font-size:0.7rem;color:#888">${d}</div>`; });

  const firstDay = new Date(year, month, 1).getDay();
  for (let i = 0; i < firstDay; i++) html += '<div></div>';

  for (let d = 1; d <= daysInMonth; d++) {
    const dateStr = `${year}-${String(month+1).padStart(2,'0')}-${String(d).padStart(2,'0')}`;
    const hasLog = log[dateStr];
    const isToday = d === today.getDate();
    const bg = hasLog ? '#667eea' : isToday ? '#e8e8e8' : 'transparent';
    const color = hasLog ? '#fff' : '#333';
    html += `<div style="width:28px;height:28px;border-radius:50%;background:${bg};color:${color};display:flex;align-items:center;justify-content:center;font-size:0.75rem;font-weight:${hasLog?'700':'400'};margin:0 auto">${d}</div>`;
  }
  html += '</div>';
  cal.innerHTML = html;
}

// ===== Admin =====
function enterAdmin() {
  show('screen-admin');
  showTab(true);
  setActiveTab('admin');
  $('admin-teacher-name').textContent = userDoc ? userDoc.nickname : '';
  loadAdminStudents();
}

$('btn-admin-logout').addEventListener('click', () => auth.signOut());

// Admin tabs
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
      row.innerHTML = `
        <div class="admin-student-name">${d.nickname || '???'}</div>
        <div class="admin-student-stats">
          ${GRADE_LABELS[d.grade] || ''} | ${(d.discoveredWords||[]).length}語 | 🔥${d.streak||0}日 | HS:${d.highScore||0}
        </div>
      `;
      list.appendChild(row);
    });
  } catch (e) {
    list.innerHTML = '<div style="padding:20px;color:#e74c3c">読み込みエラー</div>';
  }
}

$('btn-admin-refresh').addEventListener('click', loadAdminStudents);

// Search filter
$('admin-search').addEventListener('input', () => {
  const q = $('admin-search').value.toLowerCase();
  document.querySelectorAll('.admin-student-row').forEach(row => {
    row.style.display = row.textContent.toLowerCase().includes(q) ? '' : 'none';
  });
});

// Create teacher
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
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      pw: pw,
    });
    await secAuth.signOut();
    $('create-teacher-name').value = '';
    $('create-teacher-id').value = '';
    $('create-teacher-password').value = '';
    loadAdminTeachers();
  } catch (e) {
    showError('create-teacher-error', '作成に失敗しました: ' + e.message);
  }
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
  } catch (e) {
    list.innerHTML = '<div style="padding:20px;color:#e74c3c">読み込みエラー</div>';
  }
}

// Schools
$('btn-create-school').addEventListener('click', async () => {
  const name = $('create-school-name').value.trim();
  if (!name) return showError('create-school-error', '校舎名を入力してください');
  try {
    await db.collection('schools').add({ name, createdAt: firebase.firestore.FieldValue.serverTimestamp() });
    $('create-school-name').value = '';
    loadAdminSchools();
  } catch (e) {
    showError('create-school-error', '追加に失敗しました');
  }
});

async function loadAdminSchools() {
  const list = $('admin-school-list');
  list.innerHTML = '<div style="text-align:center;padding:20px;color:#888">読み込み中...</div>';
  try {
    const snap = await db.collection('schools').get();
    list.innerHTML = '';
    // Also populate teacher school dropdown
    const sel = $('create-teacher-school');
    if (sel) { sel.innerHTML = '<option value="">校舎を選択</option>'; }
    snap.docs.forEach(doc => {
      const d = doc.data();
      const row = document.createElement('div');
      row.className = 'admin-student-row';
      row.innerHTML = `<div class="admin-student-name">${d.name}</div>`;
      list.appendChild(row);
      if (sel) {
        const opt = document.createElement('option');
        opt.value = doc.id;
        opt.textContent = d.name;
        sel.appendChild(opt);
      }
    });
    if (snap.empty) list.innerHTML = '<div style="padding:20px;color:#888">校舎がまだ登録されていません</div>';
  } catch (e) {
    list.innerHTML = '<div style="padding:20px;color:#e74c3c">読み込みエラー</div>';
  }
}

// Profile edit (simple)
$('btn-edit-profile')?.addEventListener('click', () => {
  const newNick = prompt('新しいニックネームを入力してください', userDoc.nickname);
  if (newNick && newNick.trim()) {
    db.collection('users').doc(currentUser.uid).update({ nickname: newNick.trim() })
      .then(() => { userDoc.nickname = newNick.trim(); enterMyPage(); });
  }
});
