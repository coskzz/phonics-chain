// Phonics Chain — Word Data
// eiken: 5=5級, 4=4級, 3=3級, p2=準2級, 2=2級, p1=準1級, 1=1級
// Each chain: array of words linked by letter addition/change/extension

const CHAIN_FAMILIES = [
  // ---- Simple CVC / short vowel chains ----
  {
    id: 'at_family',
    theme: '-at ファミリー',
    words: [
      { en: 'at',    ja: '〜に・〜で', ph: '/æt/',    eiken: 5 },
      { en: 'cat',   ja: '猫',         ph: '/kæt/',   eiken: 5 },
      { en: 'bat',   ja: 'コウモリ',   ph: '/bæt/',   eiken: 4 },
      { en: 'hat',   ja: '帽子',       ph: '/hæt/',   eiken: 5 },
      { en: 'mat',   ja: 'マット',     ph: '/mæt/',   eiken: 3 },
      { en: 'flat',  ja: '平らな',     ph: '/flæt/',  eiken: 3 },
      { en: 'chat',  ja: 'おしゃべり', ph: '/tʃæt/',  eiken: 3 },
      { en: 'that',  ja: 'あれ',       ph: '/ðæt/',   eiken: 5 },
    ]
  },
  {
    id: 'an_family',
    theme: '-an ファミリー',
    words: [
      { en: 'an',    ja: '1つの',      ph: '/æn/',    eiken: 5 },
      { en: 'can',   ja: 'できる',     ph: '/kæn/',   eiken: 5 },
      { en: 'man',   ja: '男性',       ph: '/mæn/',   eiken: 5 },
      { en: 'ran',   ja: '走った',     ph: '/ræn/',   eiken: 5 },
      { en: 'fan',   ja: 'ファン',     ph: '/fæn/',   eiken: 4 },
      { en: 'pan',   ja: '鍋',         ph: '/pæn/',   eiken: 4 },
      { en: 'plan',  ja: '計画',       ph: '/plæn/',  eiken: 4 },
      { en: 'scan',  ja: 'スキャン',   ph: '/skæn/',  eiken: 'p2' },
      { en: 'ban',   ja: '禁止する',   ph: '/bæn/',   eiken: 2 },
      { en: 'clan',  ja: '一族',       ph: '/klæn/',  eiken: 'p1' },
    ]
  },
  {
    id: 'in_family',
    theme: '-in ファミリー',
    words: [
      { en: 'in',    ja: '〜の中に',   ph: '/ɪn/',    eiken: 5 },
      { en: 'pin',   ja: 'ピン',       ph: '/pɪn/',   eiken: 4 },
      { en: 'win',   ja: '勝つ',       ph: '/wɪn/',   eiken: 4 },
      { en: 'tin',   ja: '缶',         ph: '/tɪn/',   eiken: 3 },
      { en: 'thin',  ja: '薄い',       ph: '/θɪn/',   eiken: 4 },
      { en: 'spin',  ja: '回転する',   ph: '/spɪn/',  eiken: 3 },
      { en: 'twin',  ja: '双子',       ph: '/twɪn/',  eiken: 3 },
      { en: 'grin',  ja: 'にやりと笑う', ph: '/ɡrɪn/', eiken: 2 },
    ]
  },
  {
    id: 'it_family',
    theme: '-it ファミリー',
    words: [
      { en: 'it',    ja: 'それ',       ph: '/ɪt/',    eiken: 5 },
      { en: 'sit',   ja: '座る',       ph: '/sɪt/',   eiken: 5 },
      { en: 'hit',   ja: '打つ',       ph: '/hɪt/',   eiken: 4 },
      { en: 'bit',   ja: '少し',       ph: '/bɪt/',   eiken: 4 },
      { en: 'fit',   ja: '合う',       ph: '/fɪt/',   eiken: 3 },
      { en: 'kit',   ja: 'セット',     ph: '/kɪt/',   eiken: 3 },
      { en: 'spit',  ja: '吐く',       ph: '/spɪt/',  eiken: 2 },
      { en: 'knit',  ja: '編む',       ph: '/nɪt/',   eiken: 2 },
      { en: 'slit',  ja: '切れ目',     ph: '/slɪt/',  eiken: 'p1' },
    ]
  },
  {
    id: 'ot_family',
    theme: '-ot ファミリー',
    words: [
      { en: 'hot',   ja: '暑い・熱い', ph: '/hɑːt/',  eiken: 5 },
      { en: 'not',   ja: '〜ではない', ph: '/nɑːt/',  eiken: 5 },
      { en: 'got',   ja: '得た',       ph: '/ɡɑːt/',  eiken: 5 },
      { en: 'dot',   ja: '点',         ph: '/dɑːt/',  eiken: 4 },
      { en: 'lot',   ja: 'たくさん',   ph: '/lɑːt/',  eiken: 5 },
      { en: 'pot',   ja: '鍋',         ph: '/pɑːt/',  eiken: 4 },
      { en: 'shot',  ja: '発砲・ショット', ph: '/ʃɑːt/', eiken: 3 },
      { en: 'spot',  ja: '場所・見つける', ph: '/spɑːt/', eiken: 3 },
      { en: 'knot',  ja: '結び目',     ph: '/nɑːt/',  eiken: 2 },
      { en: 'slot',  ja: 'スロット',   ph: '/slɑːt/', eiken: 'p1' },
    ]
  },
  {
    id: 'un_family',
    theme: '-un ファミリー',
    words: [
      { en: 'run',   ja: '走る',       ph: '/rʌn/',   eiken: 5 },
      { en: 'fun',   ja: '楽しい',     ph: '/fʌn/',   eiken: 5 },
      { en: 'sun',   ja: '太陽',       ph: '/sʌn/',   eiken: 5 },
      { en: 'gun',   ja: '銃',         ph: '/ɡʌn/',   eiken: 4 },
      { en: 'bun',   ja: '丸パン',     ph: '/bʌn/',   eiken: 3 },
      { en: 'stun',  ja: '気絶させる', ph: '/stʌn/',  eiken: 2 },
      { en: 'spun',  ja: 'spinの過去形', ph: '/spʌn/', eiken: 2 },
    ]
  },
  {
    id: 'op_family',
    theme: '-op ファミリー',
    words: [
      { en: 'top',   ja: '頂上',       ph: '/tɑːp/',  eiken: 5 },
      { en: 'hop',   ja: 'ぴょんと跳ぶ', ph: '/hɑːp/', eiken: 4 },
      { en: 'pop',   ja: 'ポン（と音がする）', ph: '/pɑːp/', eiken: 4 },
      { en: 'stop',  ja: '止まる',     ph: '/stɑːp/', eiken: 5 },
      { en: 'shop',  ja: '店',         ph: '/ʃɑːp/',  eiken: 5 },
      { en: 'drop',  ja: '落とす',     ph: '/drɑːp/', eiken: 4 },
      { en: 'crop',  ja: '作物',       ph: '/krɑːp/', eiken: 3 },
      { en: 'chop',  ja: '切る',       ph: '/tʃɑːp/', eiken: 3 },
    ]
  },
  {
    id: 'ug_family',
    theme: '-ug ファミリー',
    words: [
      { en: 'bug',   ja: '虫',         ph: '/bʌɡ/',   eiken: 4 },
      { en: 'hug',   ja: '抱きしめる', ph: '/hʌɡ/',   eiken: 4 },
      { en: 'mug',   ja: 'マグカップ', ph: '/mʌɡ/',   eiken: 3 },
      { en: 'rug',   ja: 'じゅうたん', ph: '/rʌɡ/',   eiken: 3 },
      { en: 'plug',  ja: 'プラグ',     ph: '/plʌɡ/',  eiken: 3 },
      { en: 'drug',  ja: '薬・ドラッグ', ph: '/drʌɡ/', eiken: 3 },
      { en: 'slug',  ja: 'ナメクジ',   ph: '/slʌɡ/',  eiken: 'p1' },
      { en: 'shrug', ja: '肩をすくめる', ph: '/ʃrʌɡ/', eiken: 'p1' },
    ]
  },
  // ---- Long vowel / magic-e chains ----
  {
    id: 'ake_family',
    theme: '-ake ファミリー',
    words: [
      { en: 'make',  ja: '作る',       ph: '/meɪk/',  eiken: 5 },
      { en: 'take',  ja: '取る',       ph: '/teɪk/',  eiken: 5 },
      { en: 'cake',  ja: 'ケーキ',     ph: '/keɪk/',  eiken: 5 },
      { en: 'lake',  ja: '湖',         ph: '/leɪk/',  eiken: 4 },
      { en: 'bake',  ja: '焼く',       ph: '/beɪk/',  eiken: 4 },
      { en: 'wake',  ja: '起きる',     ph: '/weɪk/',  eiken: 4 },
      { en: 'shake', ja: '振る',       ph: '/ʃeɪk/',  eiken: 3 },
      { en: 'snake', ja: 'ヘビ',       ph: '/sneɪk/', eiken: 4 },
      { en: 'stake', ja: '賭け・杭',   ph: '/steɪk/', eiken: 2 },
    ]
  },
  {
    id: 'ine_family',
    theme: '-ine ファミリー',
    words: [
      { en: 'line',  ja: '線',         ph: '/laɪn/',  eiken: 5 },
      { en: 'fine',  ja: '元気な・罰金', ph: '/faɪn/', eiken: 5 },
      { en: 'mine',  ja: '私のもの',   ph: '/maɪn/',  eiken: 5 },
      { en: 'nine',  ja: '9',          ph: '/naɪn/',  eiken: 5 },
      { en: 'wine',  ja: 'ワイン',     ph: '/waɪn/',  eiken: 4 },
      { en: 'pine',  ja: '松',         ph: '/paɪn/',  eiken: 3 },
      { en: 'shine', ja: '輝く',       ph: '/ʃaɪn/',  eiken: 3 },
      { en: 'spine', ja: '背骨',       ph: '/spaɪn/', eiken: 2 },
      { en: 'vine',  ja: 'つる',       ph: '/vaɪn/',  eiken: 2 },
      { en: 'divine', ja: '神聖な',    ph: '/dɪˈvaɪn/', eiken: 'p1' },
    ]
  },
  {
    id: 'ight_family',
    theme: '-ight ファミリー',
    words: [
      { en: 'right', ja: '正しい・右', ph: '/raɪt/',  eiken: 5 },
      { en: 'night', ja: '夜',         ph: '/naɪt/',  eiken: 5 },
      { en: 'light', ja: '光',         ph: '/laɪt/',  eiken: 5 },
      { en: 'fight', ja: '戦う',       ph: '/faɪt/',  eiken: 4 },
      { en: 'sight', ja: '視力・景色', ph: '/saɪt/',  eiken: 3 },
      { en: 'might', ja: '〜かもしれない', ph: '/maɪt/', eiken: 4 },
      { en: 'tight', ja: 'きつい',     ph: '/taɪt/',  eiken: 3 },
      { en: 'flight', ja: '飛行',      ph: '/flaɪt/', eiken: 3 },
      { en: 'bright', ja: '明るい',    ph: '/braɪt/', eiken: 3 },
      { en: 'slight', ja: 'わずかな',  ph: '/slaɪt/', eiken: 2 },
      { en: 'knight', ja: '騎士',      ph: '/naɪt/',  eiken: 2 },
      { en: 'fright', ja: '恐怖',      ph: '/fraɪt/', eiken: 2 },
      { en: 'blight', ja: '荒廃',      ph: '/blaɪt/', eiken: 1 },
      { en: 'plight', ja: '苦境',      ph: '/plaɪt/', eiken: 1 },
    ]
  },
  {
    id: 'ore_family',
    theme: '-ore ファミリー',
    words: [
      { en: 'more',  ja: 'もっと',     ph: '/mɔːr/',  eiken: 5 },
      { en: 'store', ja: '店',         ph: '/stɔːr/', eiken: 5 },
      { en: 'score', ja: '点数',       ph: '/skɔːr/', eiken: 4 },
      { en: 'bore',  ja: '退屈させる', ph: '/bɔːr/',  eiken: 3 },
      { en: 'core',  ja: '核心',       ph: '/kɔːr/',  eiken: 'p2' },
      { en: 'shore', ja: '海岸',       ph: '/ʃɔːr/',  eiken: 3 },
      { en: 'snore', ja: 'いびきをかく', ph: '/snɔːr/', eiken: 2 },
      { en: 'ignore', ja: '無視する',  ph: '/ɪɡˈnɔːr/', eiken: 3 },
      { en: 'explore', ja: '探検する', ph: '/ɪkˈsplɔːr/', eiken: 3 },
      { en: 'restore', ja: '復元する', ph: '/rɪˈstɔːr/', eiken: 2 },
      { en: 'implore', ja: '懇願する', ph: '/ɪmˈplɔːr/', eiken: 1 },
    ]
  },
  // ---- Rain chain (from brainstorming) ----
  {
    id: 'ain_family',
    theme: '-ain ファミリー',
    words: [
      { en: 'rain',   ja: '雨',         ph: '/reɪn/',   eiken: 5 },
      { en: 'main',   ja: '主な',       ph: '/meɪn/',   eiken: 4 },
      { en: 'pain',   ja: '痛み',       ph: '/peɪn/',   eiken: 4 },
      { en: 'gain',   ja: '得る',       ph: '/ɡeɪn/',   eiken: 3 },
      { en: 'train',  ja: '電車',       ph: '/treɪn/',  eiken: 5 },
      { en: 'brain',  ja: '脳',         ph: '/breɪn/',  eiken: 3 },
      { en: 'chain',  ja: '鎖',         ph: '/tʃeɪn/',  eiken: 3 },
      { en: 'plain',  ja: '明白な',     ph: '/pleɪn/',  eiken: 'p2' },
      { en: 'strain', ja: '負担・緊張', ph: '/streɪn/', eiken: 2 },
      { en: 'obtain', ja: '得る',       ph: '/əbˈteɪn/', eiken: 2 },
      { en: 'sustain', ja: '維持する',  ph: '/səˈsteɪn/', eiken: 'p1' },
      { en: 'refrain', ja: '控える',   ph: '/rɪˈfreɪn/', eiken: 'p1' },
      { en: 'constrain', ja: '制約する', ph: '/kənˈstreɪn/', eiken: 1 },
      { en: 'disdain', ja: '軽蔑',     ph: '/dɪsˈdeɪn/', eiken: 1 },
    ]
  },
  {
    id: 'and_family',
    theme: '-and ファミリー',
    words: [
      { en: 'and',    ja: 'そして',     ph: '/ænd/',   eiken: 5 },
      { en: 'hand',   ja: '手',         ph: '/hænd/',  eiken: 5 },
      { en: 'band',   ja: 'バンド',     ph: '/bænd/',  eiken: 4 },
      { en: 'land',   ja: '土地',       ph: '/lænd/',  eiken: 4 },
      { en: 'sand',   ja: '砂',         ph: '/sænd/',  eiken: 4 },
      { en: 'stand',  ja: '立つ',       ph: '/stænd/', eiken: 5 },
      { en: 'brand',  ja: 'ブランド',   ph: '/brænd/', eiken: 3 },
      { en: 'grand',  ja: '壮大な',     ph: '/ɡrænd/', eiken: 3 },
      { en: 'demand', ja: '要求する',   ph: '/dɪˈmænd/', eiken: 3 },
      { en: 'expand', ja: '拡大する',   ph: '/ɪkˈspænd/', eiken: 2 },
      { en: 'command', ja: '命令する',  ph: '/kəˈmænd/', eiken: 2 },
      { en: 'reprimand', ja: '叱責する', ph: '/ˈrɛprɪmænd/', eiken: 1 },
    ]
  },
  {
    id: 'ear_family',
    theme: '-ear ファミリー',
    words: [
      { en: 'ear',   ja: '耳',         ph: '/ɪr/',    eiken: 5 },
      { en: 'hear',  ja: '聞く',       ph: '/hɪr/',   eiken: 5 },
      { en: 'near',  ja: '近い',       ph: '/nɪr/',   eiken: 5 },
      { en: 'dear',  ja: '親愛なる',   ph: '/dɪr/',   eiken: 4 },
      { en: 'fear',  ja: '恐怖',       ph: '/fɪr/',   eiken: 3 },
      { en: 'year',  ja: '年',         ph: '/jɪr/',   eiken: 5 },
      { en: 'clear', ja: '明らかな',   ph: '/klɪr/',  eiken: 4 },
      { en: 'appear', ja: '現れる',    ph: '/əˈpɪr/', eiken: 3 },
      { en: 'disappear', ja: '消える', ph: '/dɪsəˈpɪr/', eiken: 3 },
      { en: 'shear', ja: '刈る',       ph: '/ʃɪr/',   eiken: 1 },
    ]
  },
  {
    id: 'ound_family',
    theme: '-ound ファミリー',
    words: [
      { en: 'found',  ja: '見つけた',   ph: '/faʊnd/',  eiken: 5 },
      { en: 'round',  ja: '丸い',       ph: '/raʊnd/',  eiken: 5 },
      { en: 'sound',  ja: '音',         ph: '/saʊnd/',  eiken: 5 },
      { en: 'ground', ja: '地面',       ph: '/ɡraʊnd/', eiken: 4 },
      { en: 'around', ja: '周りに',     ph: '/əˈraʊnd/', eiken: 5 },
      { en: 'bound',  ja: '束縛された', ph: '/baʊnd/',  eiken: 2 },
      { en: 'wound',  ja: '傷',         ph: '/wuːnd/',  eiken: 2 },
      { en: 'hound',  ja: '猟犬',       ph: '/haʊnd/',  eiken: 'p1' },
      { en: 'compound', ja: '化合物',   ph: '/ˈkɑːmpaʊnd/', eiken: 2 },
      { en: 'profound', ja: '深い',     ph: '/prəˈfaʊnd/', eiken: 'p1' },
      { en: 'astound', ja: '驚かせる',  ph: '/əˈstaʊnd/', eiken: 1 },
    ]
  },
  {
    id: 'ack_family',
    theme: '-ack ファミリー',
    words: [
      { en: 'back',   ja: '後ろ',       ph: '/bæk/',   eiken: 5 },
      { en: 'black',  ja: '黒い',       ph: '/blæk/',  eiken: 5 },
      { en: 'pack',   ja: '詰める',     ph: '/pæk/',   eiken: 4 },
      { en: 'track',  ja: '道・追跡',   ph: '/træk/',  eiken: 3 },
      { en: 'crack',  ja: 'ひび',       ph: '/kræk/',  eiken: 3 },
      { en: 'snack',  ja: 'おやつ',     ph: '/snæk/',  eiken: 4 },
      { en: 'stack',  ja: '積み重ね',   ph: '/stæk/',  eiken: 'p2' },
      { en: 'attack', ja: '攻撃する',   ph: '/əˈtæk/', eiken: 3 },
      { en: 'knack',  ja: 'コツ',       ph: '/næk/',   eiken: 'p1' },
    ]
  },
  {
    id: 'old_family',
    theme: '-old ファミリー',
    words: [
      { en: 'old',    ja: '古い',       ph: '/oʊld/',  eiken: 5 },
      { en: 'cold',   ja: '寒い',       ph: '/koʊld/', eiken: 5 },
      { en: 'gold',   ja: '金',         ph: '/ɡoʊld/', eiken: 5 },
      { en: 'hold',   ja: '持つ',       ph: '/hoʊld/', eiken: 4 },
      { en: 'told',   ja: '言った',     ph: '/toʊld/', eiken: 5 },
      { en: 'bold',   ja: '大胆な',     ph: '/boʊld/', eiken: 2 },
      { en: 'fold',   ja: '折る',       ph: '/foʊld/', eiken: 3 },
      { en: 'sold',   ja: '売った',     ph: '/soʊld/', eiken: 5 },
      { en: 'mold',   ja: 'カビ・型',   ph: '/moʊld/', eiken: 2 },
      { en: 'unfold', ja: '展開する',   ph: '/ʌnˈfoʊld/', eiken: 2 },
      { en: 'behold', ja: '見よ',       ph: '/bɪˈhoʊld/', eiken: 1 },
    ]
  },
  {
    id: 'all_family',
    theme: '-all ファミリー',
    words: [
      { en: 'all',    ja: '全部',       ph: '/ɔːl/',   eiken: 5 },
      { en: 'ball',   ja: 'ボール',     ph: '/bɔːl/',  eiken: 5 },
      { en: 'call',   ja: '呼ぶ',       ph: '/kɔːl/',  eiken: 5 },
      { en: 'tall',   ja: '背が高い',   ph: '/tɔːl/',  eiken: 5 },
      { en: 'wall',   ja: '壁',         ph: '/wɔːl/',  eiken: 5 },
      { en: 'fall',   ja: '落ちる',     ph: '/fɔːl/',  eiken: 5 },
      { en: 'small',  ja: '小さい',     ph: '/smɔːl/', eiken: 5 },
      { en: 'hall',   ja: 'ホール',     ph: '/hɔːl/',  eiken: 4 },
      { en: 'install', ja: 'インストールする', ph: '/ɪnˈstɔːl/', eiken: 2 },
      { en: 'stall',  ja: '屋台・失速', ph: '/stɔːl/', eiken: 'p1' },
      { en: 'appall', ja: 'ぞっとさせる', ph: '/əˈpɔːl/', eiken: 1 },
    ]
  },
  {
    id: 'ell_family',
    theme: '-ell ファミリー',
    words: [
      { en: 'tell',   ja: '伝える',     ph: '/tɛl/',   eiken: 5 },
      { en: 'well',   ja: '上手に',     ph: '/wɛl/',   eiken: 5 },
      { en: 'sell',   ja: '売る',       ph: '/sɛl/',   eiken: 5 },
      { en: 'bell',   ja: 'ベル',       ph: '/bɛl/',   eiken: 5 },
      { en: 'fell',   ja: '落ちた',     ph: '/fɛl/',   eiken: 5 },
      { en: 'spell',  ja: 'つづる',     ph: '/spɛl/',  eiken: 4 },
      { en: 'shell',  ja: '貝殻',       ph: '/ʃɛl/',   eiken: 3 },
      { en: 'smell',  ja: 'におい',     ph: '/smɛl/',  eiken: 4 },
      { en: 'dwell',  ja: '住む',       ph: '/dwɛl/',  eiken: 2 },
      { en: 'excel',  ja: '優れる',     ph: '/ɪkˈsɛl/', eiken: 'p1' },
      { en: 'compel', ja: '強いる',     ph: '/kəmˈpɛl/', eiken: 'p1' },
      { en: 'propel', ja: '推進する',   ph: '/prəˈpɛl/', eiken: 1 },
    ]
  },
  {
    id: 'ess_family',
    theme: '-ess ファミリー',
    words: [
      { en: 'less',    ja: 'より少ない', ph: '/lɛs/',   eiken: 5 },
      { en: 'dress',   ja: 'ドレス',    ph: '/drɛs/',  eiken: 5 },
      { en: 'press',   ja: '押す',      ph: '/prɛs/',  eiken: 4 },
      { en: 'guess',   ja: '推測する',  ph: '/ɡɛs/',   eiken: 4 },
      { en: 'stress',  ja: 'ストレス',  ph: '/strɛs/', eiken: 3 },
      { en: 'bless',   ja: '祝福する',  ph: '/blɛs/',  eiken: 2 },
      { en: 'express', ja: '表現する',  ph: '/ɪkˈsprɛs/', eiken: 3 },
      { en: 'impress', ja: '印象づける', ph: '/ɪmˈprɛs/', eiken: 'p2' },
      { en: 'compress', ja: '圧縮する', ph: '/kəmˈprɛs/', eiken: 2 },
      { en: 'suppress', ja: '抑える',   ph: '/səˈprɛs/', eiken: 'p1' },
      { en: 'transgress', ja: '違反する', ph: '/trænzˈɡrɛs/', eiken: 1 },
    ]
  },
  {
    id: 'ate_family',
    theme: '-ate ファミリー',
    words: [
      { en: 'late',    ja: '遅い',       ph: '/leɪt/',  eiken: 5 },
      { en: 'date',    ja: '日付',       ph: '/deɪt/',  eiken: 5 },
      { en: 'gate',    ja: '門',         ph: '/ɡeɪt/',  eiken: 5 },
      { en: 'state',   ja: '状態・州',   ph: '/steɪt/', eiken: 4 },
      { en: 'plate',   ja: '皿',         ph: '/pleɪt/', eiken: 4 },
      { en: 'create',  ja: '作り出す',   ph: '/kriˈeɪt/', eiken: 3 },
      { en: 'debate',  ja: '議論',       ph: '/dɪˈbeɪt/', eiken: 'p2' },
      { en: 'private', ja: '個人的な',   ph: '/ˈpraɪvɪt/', eiken: 3 },
      { en: 'separate', ja: '分ける',    ph: '/ˈsɛpəreɪt/', eiken: 2 },
      { en: 'elaborate', ja: '手の込んだ', ph: '/ɪˈlæbərɪt/', eiken: 'p1' },
    ]
  },
  {
    id: 'tion_family',
    theme: '-tion ファミリー',
    words: [
      { en: 'station',  ja: '駅',         ph: '/ˈsteɪʃən/',  eiken: 5 },
      { en: 'question', ja: '質問',       ph: '/ˈkwɛstʃən/', eiken: 5 },
      { en: 'action',   ja: '行動',       ph: '/ˈækʃən/',    eiken: 4 },
      { en: 'section',  ja: '部分',       ph: '/ˈsɛkʃən/',   eiken: 3 },
      { en: 'mention',  ja: '言及する',   ph: '/ˈmɛnʃən/',   eiken: 3 },
      { en: 'attention', ja: '注意',      ph: '/əˈtɛnʃən/',  eiken: 3 },
      { en: 'education', ja: '教育',      ph: '/ˌɛdʒʊˈkeɪʃən/', eiken: 3 },
      { en: 'situation', ja: '状況',      ph: '/ˌsɪtʃuˈeɪʃən/', eiken: 3 },
      { en: 'condition', ja: '条件・状態', ph: '/kənˈdɪʃən/', eiken: 3 },
      { en: 'solution',  ja: '解決策',    ph: '/səˈluːʃən/',  eiken: 'p2' },
      { en: 'revolution', ja: '革命',     ph: '/ˌrɛvəˈluːʃən/', eiken: 2 },
      { en: 'constitution', ja: '憲法',   ph: '/ˌkɑːnstɪˈtuːʃən/', eiken: 'p1' },
      { en: 'institution', ja: '機関',    ph: '/ˌɪnstɪˈtuːʃən/', eiken: 'p1' },
    ]
  },
  {
    id: 'ice_family',
    theme: '-ice ファミリー',
    words: [
      { en: 'ice',     ja: '氷',         ph: '/aɪs/',    eiken: 5 },
      { en: 'rice',    ja: '米',          ph: '/raɪs/',   eiken: 5 },
      { en: 'nice',    ja: 'すてきな',    ph: '/naɪs/',   eiken: 5 },
      { en: 'price',   ja: '値段',        ph: '/praɪs/',  eiken: 4 },
      { en: 'twice',   ja: '2回',         ph: '/twaɪs/',  eiken: 4 },
      { en: 'slice',   ja: '一切れ',      ph: '/slaɪs/',  eiken: 3 },
      { en: 'advice',  ja: '助言',        ph: '/ədˈvaɪs/', eiken: 3 },
      { en: 'device',  ja: '装置',        ph: '/dɪˈvaɪs/', eiken: 'p2' },
      { en: 'sacrifice', ja: '犠牲',      ph: '/ˈsækrɪfaɪs/', eiken: 2 },
      { en: 'prejudice', ja: '偏見',      ph: '/ˈprɛdʒʊdɪs/', eiken: 'p1' },
    ]
  },
  {
    id: 'ank_family',
    theme: '-ank ファミリー',
    words: [
      { en: 'bank',   ja: '銀行',       ph: '/bæŋk/',  eiken: 5 },
      { en: 'thank',  ja: '感謝する',   ph: '/θæŋk/',  eiken: 5 },
      { en: 'rank',   ja: '順位',       ph: '/ræŋk/',  eiken: 3 },
      { en: 'blank',  ja: '空白の',     ph: '/blæŋk/', eiken: 3 },
      { en: 'tank',   ja: 'タンク',     ph: '/tæŋk/',  eiken: 4 },
      { en: 'frank',  ja: '率直な',     ph: '/fræŋk/', eiken: 2 },
      { en: 'crank',  ja: 'クランク',   ph: '/kræŋk/', eiken: 'p1' },
      { en: 'plank',  ja: '板',         ph: '/plæŋk/', eiken: 'p1' },
    ]
  },
  {
    id: 'ow_family',
    theme: '-ow ファミリー',
    words: [
      { en: 'know',   ja: '知る',       ph: '/noʊ/',   eiken: 5 },
      { en: 'show',   ja: '見せる',     ph: '/ʃoʊ/',   eiken: 5 },
      { en: 'snow',   ja: '雪',         ph: '/snoʊ/',  eiken: 5 },
      { en: 'grow',   ja: '育つ',       ph: '/ɡroʊ/',  eiken: 4 },
      { en: 'blow',   ja: '吹く',       ph: '/bloʊ/',  eiken: 4 },
      { en: 'flow',   ja: '流れる',     ph: '/floʊ/',  eiken: 3 },
      { en: 'slow',   ja: '遅い',       ph: '/sloʊ/',  eiken: 5 },
      { en: 'throw',  ja: '投げる',     ph: '/θroʊ/',  eiken: 4 },
      { en: 'follow', ja: 'ついて行く', ph: '/ˈfɑːloʊ/', eiken: 4 },
      { en: 'shadow', ja: '影',         ph: '/ˈʃædoʊ/', eiken: 3 },
      { en: 'borrow', ja: '借りる',     ph: '/ˈbɑːroʊ/', eiken: 3 },
      { en: 'swallow', ja: '飲み込む',  ph: '/ˈswɑːloʊ/', eiken: 2 },
      { en: 'bestow', ja: '授ける',     ph: '/bɪˈstoʊ/', eiken: 1 },
    ]
  },
  {
    id: 'oom_family',
    theme: '-oom ファミリー',
    words: [
      { en: 'room',   ja: '部屋',       ph: '/ruːm/',  eiken: 5 },
      { en: 'boom',   ja: 'ブーム',     ph: '/buːm/',  eiken: 3 },
      { en: 'bloom',  ja: '花が咲く',   ph: '/bluːm/', eiken: 2 },
      { en: 'broom',  ja: 'ほうき',     ph: '/bruːm/', eiken: 3 },
      { en: 'doom',   ja: '破滅',       ph: '/duːm/',  eiken: 'p1' },
      { en: 'gloom',  ja: '暗がり',     ph: '/ɡluːm/', eiken: 'p1' },
      { en: 'groom',  ja: '花婿',       ph: '/ɡruːm/', eiken: 2 },
      { en: 'mushroom', ja: 'きのこ',   ph: '/ˈmʌʃruːm/', eiken: 4 },
    ]
  },
  {
    id: 'aw_family',
    theme: '-aw ファミリー',
    words: [
      { en: 'saw',    ja: '見た',       ph: '/sɔː/',   eiken: 5 },
      { en: 'draw',   ja: '描く',       ph: '/drɔː/',  eiken: 5 },
      { en: 'law',    ja: '法律',       ph: '/lɔː/',   eiken: 4 },
      { en: 'raw',    ja: '生の',       ph: '/rɔː/',   eiken: 3 },
      { en: 'jaw',    ja: 'あご',       ph: '/dʒɔː/',  eiken: 2 },
      { en: 'claw',   ja: 'かぎ爪',    ph: '/klɔː/',  eiken: 2 },
      { en: 'straw',  ja: 'わら',       ph: '/strɔː/', eiken: 3 },
      { en: 'flaw',   ja: '欠陥',       ph: '/flɔː/',  eiken: 'p1' },
      { en: 'thaw',   ja: '解ける',     ph: '/θɔː/',   eiken: 'p1' },
      { en: 'withdraw', ja: '引き出す', ph: '/wɪðˈdrɔː/', eiken: 2 },
    ]
  },
  {
    id: 'ive_family',
    theme: '-ive ファミリー',
    words: [
      { en: 'live',    ja: '住む',       ph: '/lɪv/',    eiken: 5 },
      { en: 'give',    ja: '与える',     ph: '/ɡɪv/',    eiken: 5 },
      { en: 'five',    ja: '5',          ph: '/faɪv/',   eiken: 5 },
      { en: 'drive',   ja: '運転する',   ph: '/draɪv/',  eiken: 4 },
      { en: 'arrive',  ja: '到着する',   ph: '/əˈraɪv/', eiken: 4 },
      { en: 'survive', ja: '生き残る',   ph: '/sərˈvaɪv/', eiken: 3 },
      { en: 'active',  ja: '活動的な',   ph: '/ˈæktɪv/', eiken: 3 },
      { en: 'native',  ja: '出身の',     ph: '/ˈneɪtɪv/', eiken: 'p2' },
      { en: 'creative', ja: '創造的な',  ph: '/kriˈeɪtɪv/', eiken: 2 },
      { en: 'sensitive', ja: '敏感な',   ph: '/ˈsɛnsɪtɪv/', eiken: 2 },
      { en: 'initiative', ja: '主導権',  ph: '/ɪˈnɪʃətɪv/', eiken: 'p1' },
      { en: 'comprehensive', ja: '包括的な', ph: '/ˌkɑːmprɪˈhɛnsɪv/', eiken: 1 },
    ]
  },
  {
    id: 'ent_family',
    theme: '-ent ファミリー',
    words: [
      { en: 'went',    ja: '行った',     ph: '/wɛnt/',   eiken: 5 },
      { en: 'sent',    ja: '送った',     ph: '/sɛnt/',   eiken: 5 },
      { en: 'spent',   ja: '費やした',   ph: '/spɛnt/',  eiken: 4 },
      { en: 'event',   ja: 'イベント',   ph: '/ɪˈvɛnt/', eiken: 4 },
      { en: 'present', ja: 'プレゼント', ph: '/ˈprɛzənt/', eiken: 4 },
      { en: 'student', ja: '生徒',       ph: '/ˈstuːdənt/', eiken: 5 },
      { en: 'different', ja: '異なる',   ph: '/ˈdɪfərənt/', eiken: 4 },
      { en: 'ancient',  ja: '古代の',    ph: '/ˈeɪnʃənt/', eiken: 'p2' },
      { en: 'confident', ja: '自信のある', ph: '/ˈkɑːnfɪdənt/', eiken: 2 },
      { en: 'apparent', ja: '明らかな',  ph: '/əˈpærənt/', eiken: 'p1' },
      { en: 'eloquent', ja: '雄弁な',    ph: '/ˈɛləkwənt/', eiken: 1 },
    ]
  },
  {
    id: 'ture_family',
    theme: '-ture ファミリー',
    words: [
      { en: 'nature',   ja: '自然',       ph: '/ˈneɪtʃər/',  eiken: 4 },
      { en: 'future',   ja: '未来',       ph: '/ˈfjuːtʃər/', eiken: 4 },
      { en: 'picture',  ja: '写真',       ph: '/ˈpɪktʃər/',  eiken: 5 },
      { en: 'culture',  ja: '文化',       ph: '/ˈkʌltʃər/',  eiken: 3 },
      { en: 'adventure', ja: '冒険',      ph: '/ədˈvɛntʃər/', eiken: 3 },
      { en: 'creature', ja: '生き物',     ph: '/ˈkriːtʃər/',  eiken: 3 },
      { en: 'structure', ja: '構造',      ph: '/ˈstrʌktʃər/', eiken: 2 },
      { en: 'furniture', ja: '家具',      ph: '/ˈfɜːrnɪtʃər/', eiken: 3 },
      { en: 'manufacture', ja: '製造する', ph: '/ˌmænjʊˈfæktʃər/', eiken: 2 },
      { en: 'departure', ja: '出発',      ph: '/dɪˈpɑːrtʃər/', eiken: 2 },
    ]
  },
  {
    id: 'ess_adj_family',
    theme: '-less ファミリー',
    words: [
      { en: 'endless',   ja: '終わりのない', ph: '/ˈɛndlɪs/',   eiken: 3 },
      { en: 'careless',  ja: '不注意な',    ph: '/ˈkɛrlɪs/',    eiken: 3 },
      { en: 'useless',   ja: '役に立たない', ph: '/ˈjuːslɪs/',  eiken: 3 },
      { en: 'homeless',  ja: 'ホームレス',  ph: '/ˈhoʊmlɪs/',   eiken: 3 },
      { en: 'hopeless',  ja: '絶望的な',    ph: '/ˈhoʊplɪs/',   eiken: 'p2' },
      { en: 'countless', ja: '無数の',      ph: '/ˈkaʊntlɪs/',  eiken: 2 },
      { en: 'reckless',  ja: '無謀な',      ph: '/ˈrɛklɪs/',    eiken: 'p1' },
      { en: 'relentless', ja: '容赦ない',   ph: '/rɪˈlɛntlɪs/', eiken: 1 },
    ]
  },
  {
    id: 'ment_family',
    theme: '-ment ファミリー',
    words: [
      { en: 'moment',     ja: '瞬間',       ph: '/ˈmoʊmənt/',    eiken: 4 },
      { en: 'comment',    ja: 'コメント',   ph: '/ˈkɑːmɛnt/',    eiken: 3 },
      { en: 'movement',   ja: '動き',       ph: '/ˈmuːvmənt/',    eiken: 3 },
      { en: 'environment', ja: '環境',      ph: '/ɪnˈvaɪrənmənt/', eiken: 3 },
      { en: 'government', ja: '政府',       ph: '/ˈɡʌvərnmənt/,', eiken: 3 },
      { en: 'development', ja: '発展',      ph: '/dɪˈvɛləpmənt/', eiken: 'p2' },
      { en: 'achievement', ja: '達成',      ph: '/əˈtʃiːvmənt/',  eiken: 2 },
      { en: 'astonishment', ja: '驚き',     ph: '/əˈstɑːnɪʃmənt/', eiken: 'p1' },
      { en: 'acknowledgment', ja: '承認',   ph: '/əkˈnɑːlɪdʒmənt/', eiken: 1 },
    ]
  },
  {
    id: 'ck_family',
    theme: '-ck ファミリー',
    words: [
      { en: 'back',   ja: '後ろ',       ph: '/bæk/',   eiken: 5 },
      { en: 'kick',   ja: '蹴る',       ph: '/kɪk/',   eiken: 4 },
      { en: 'pick',   ja: '選ぶ',       ph: '/pɪk/',   eiken: 4 },
      { en: 'sick',   ja: '病気の',     ph: '/sɪk/',   eiken: 5 },
      { en: 'quick',  ja: '速い',       ph: '/kwɪk/',  eiken: 4 },
      { en: 'trick',  ja: 'トリック',   ph: '/trɪk/',  eiken: 3 },
      { en: 'stick',  ja: '棒・くっつく', ph: '/stɪk/', eiken: 4 },
      { en: 'brick',  ja: 'レンガ',     ph: '/brɪk/',  eiken: 3 },
      { en: 'check',  ja: '確認する',   ph: '/tʃɛk/',  eiken: 4 },
      { en: 'neck',   ja: '首',         ph: '/nɛk/',   eiken: 4 },
      { en: 'wreck',  ja: '難破',       ph: '/rɛk/',   eiken: 2 },
      { en: 'flock',  ja: '群れ',       ph: '/flɑːk/', eiken: 2 },
    ]
  },
  {
    id: 'tion_act',
    theme: 'act → action チェーン',
    words: [
      { en: 'act',      ja: '行動する',   ph: '/ækt/',     eiken: 4 },
      { en: 'fact',     ja: '事実',       ph: '/fækt/',    eiken: 4 },
      { en: 'exact',    ja: '正確な',     ph: '/ɪɡˈzækt/', eiken: 3 },
      { en: 'impact',   ja: '影響',       ph: '/ˈɪmpækt/', eiken: 2 },
      { en: 'compact',  ja: 'コンパクトな', ph: '/ˈkɑːmpækt/', eiken: 2 },
      { en: 'extract',  ja: '取り出す',   ph: '/ˈɛkstrækt/', eiken: 'p1' },
      { en: 'abstract', ja: '抽象的な',   ph: '/ˈæbstrækt/', eiken: 'p1' },
      { en: 'distract', ja: '気をそらす', ph: '/dɪˈstrækt/', eiken: 'p1' },
    ]
  },
  {
    id: 'oom_room_ext',
    theme: 'room → classroom チェーン',
    words: [
      { en: 'room',      ja: '部屋',       ph: '/ruːm/',      eiken: 5 },
      { en: 'classroom', ja: '教室',       ph: '/ˈklæsruːm/', eiken: 5 },
      { en: 'bathroom',  ja: '浴室',       ph: '/ˈbæθruːm/',  eiken: 4 },
      { en: 'bedroom',   ja: '寝室',       ph: '/ˈbɛdruːm/',  eiken: 4 },
      { en: 'mushroom',  ja: 'きのこ',     ph: '/ˈmʌʃruːm/', eiken: 4 },
    ]
  },
  {
    id: 'ound_bound',
    theme: 'bound → チェーン',
    words: [
      { en: 'bound',    ja: '束縛された', ph: '/baʊnd/',  eiken: 2 },
      { en: 'rebound',  ja: '跳ね返る',   ph: '/rɪˈbaʊnd/', eiken: 'p1' },
      { en: 'inbound',  ja: '到着する',   ph: '/ˈɪnbaʊnd/', eiken: 'p1' },
      { en: 'outbound', ja: '外向きの',   ph: '/ˈaʊtbaʊnd/', eiken: 'p1' },
    ]
  },
  {
    id: 'ary_family',
    theme: '-ary ファミリー',
    words: [
      { en: 'library',    ja: '図書館',     ph: '/ˈlaɪbrɛri/',   eiken: 5 },
      { en: 'primary',    ja: '主要な',     ph: '/ˈpraɪmɛri/',   eiken: 'p2' },
      { en: 'ordinary',   ja: '普通の',     ph: '/ˈɔːrdɪnɛri/',  eiken: 3 },
      { en: 'necessary',  ja: '必要な',     ph: '/ˈnɛsəsɛri/',   eiken: 3 },
      { en: 'vocabulary',  ja: '語彙',      ph: '/voʊˈkæbjʊlɛri/', eiken: 3 },
      { en: 'temporary',   ja: '一時的な',  ph: '/ˈtɛmpərɛri/',   eiken: 2 },
      { en: 'extraordinary', ja: '並外れた', ph: '/ɪkˈstrɔːrdɪnɛri/', eiken: 'p1' },
      { en: 'voluntary',   ja: '自発的な',  ph: '/ˈvɑːləntɛri/',  eiken: 'p1' },
      { en: 'arbitrary',   ja: '任意の',    ph: '/ˈɑːrbɪtrɛri/',  eiken: 1 },
    ]
  },
  {
    id: 'age_family',
    theme: '-age ファミリー',
    words: [
      { en: 'age',      ja: '年齢',       ph: '/eɪdʒ/',     eiken: 5 },
      { en: 'page',     ja: 'ページ',     ph: '/peɪdʒ/',    eiken: 5 },
      { en: 'stage',    ja: '舞台・段階', ph: '/steɪdʒ/',   eiken: 4 },
      { en: 'village',  ja: '村',         ph: '/ˈvɪlɪdʒ/',  eiken: 4 },
      { en: 'message',  ja: 'メッセージ', ph: '/ˈmɛsɪdʒ/',  eiken: 4 },
      { en: 'language', ja: '言語',       ph: '/ˈlæŋɡwɪdʒ/', eiken: 4 },
      { en: 'damage',   ja: '損害',       ph: '/ˈdæmɪdʒ/',  eiken: 3 },
      { en: 'manage',   ja: '管理する',   ph: '/ˈmænɪdʒ/',  eiken: 3 },
      { en: 'courage',  ja: '勇気',       ph: '/ˈkɜːrɪdʒ/', eiken: 3 },
      { en: 'storage',  ja: '保管',       ph: '/ˈstɔːrɪdʒ/', eiken: 2 },
      { en: 'leverage', ja: '影響力',     ph: '/ˈlɛvərɪdʒ/', eiken: 1 },
      { en: 'sabotage', ja: '妨害',       ph: '/ˈsæbətɑːʒ/', eiken: 1 },
    ]
  },

  // ===== CVC Short Vowel (expanded) =====
  {
    id: 'ad_family', theme: '-ad ファミリー',
    words: [
      { en: 'dad',  ja: 'お父さん',   ph: '/dæd/',  eiken: 5 },
      { en: 'bad',  ja: '悪い',       ph: '/bæd/',  eiken: 5 },
      { en: 'sad',  ja: '悲しい',     ph: '/sæd/',  eiken: 5 },
      { en: 'mad',  ja: '怒った',     ph: '/mæd/',  eiken: 4 },
      { en: 'had',  ja: '持っていた', ph: '/hæd/',  eiken: 5 },
      { en: 'glad', ja: 'うれしい',   ph: '/ɡlæd/', eiken: 3 },
      { en: 'pad',  ja: 'パッド',     ph: '/pæd/',  eiken: 3 },
    ]
  },
  {
    id: 'ag_family', theme: '-ag ファミリー',
    words: [
      { en: 'bag',  ja: 'かばん',     ph: '/bæɡ/',  eiken: 5 },
      { en: 'tag',  ja: 'タグ',       ph: '/tæɡ/',  eiken: 3 },
      { en: 'rag',  ja: 'ぼろ布',     ph: '/ræɡ/',  eiken: 2 },
      { en: 'flag', ja: '旗',         ph: '/flæɡ/', eiken: 4 },
      { en: 'drag', ja: '引きずる',   ph: '/dræɡ/', eiken: 3 },
      { en: 'wag',  ja: '振る',       ph: '/wæɡ/',  eiken: 3 },
      { en: 'brag', ja: '自慢する',   ph: '/bræɡ/', eiken: 2 },
    ]
  },
  {
    id: 'am_family', theme: '-am ファミリー',
    words: [
      { en: 'ham',   ja: 'ハム',       ph: '/hæm/',     eiken: 4 },
      { en: 'jam',   ja: 'ジャム',     ph: '/dʒæm/',    eiken: 4 },
      { en: 'ram',   ja: '雄羊',       ph: '/ræm/',     eiken: 2 },
      { en: 'dam',   ja: 'ダム',       ph: '/dæm/',     eiken: 3 },
      { en: 'slam',  ja: '叩きつける', ph: '/slæm/',    eiken: 2 },
      { en: 'clam',  ja: 'ハマグリ',   ph: '/klæm/',    eiken: 2 },
      { en: 'exam',  ja: '試験',       ph: '/ɪɡˈzæm/', eiken: 4 },
    ]
  },
  {
    id: 'ap_family', theme: '-ap ファミリー',
    words: [
      { en: 'cap',  ja: '帽子',       ph: '/kæp/',  eiken: 5 },
      { en: 'map',  ja: '地図',       ph: '/mæp/',  eiken: 5 },
      { en: 'tap',  ja: '軽くたたく', ph: '/tæp/',  eiken: 3 },
      { en: 'nap',  ja: '昼寝',       ph: '/næp/',  eiken: 3 },
      { en: 'snap', ja: 'パチンと折る', ph: '/snæp/', eiken: 3 },
      { en: 'trap', ja: '罠',         ph: '/træp/', eiken: 3 },
      { en: 'wrap', ja: '包む',       ph: '/ræp/',  eiken: 3 },
      { en: 'clap', ja: '拍手する',   ph: '/klæp/', eiken: 3 },
      { en: 'gap',  ja: '隙間',       ph: '/ɡæp/',  eiken: 3 },
      { en: 'lap',  ja: 'ひざ',       ph: '/læp/',  eiken: 3 },
    ]
  },
  {
    id: 'ed_family', theme: '-ed ファミリー',
    words: [
      { en: 'bed',    ja: 'ベッド',     ph: '/bɛd/',    eiken: 5 },
      { en: 'red',    ja: '赤',         ph: '/rɛd/',    eiken: 5 },
      { en: 'fed',    ja: '食べさせた', ph: '/fɛd/',    eiken: 4 },
      { en: 'led',    ja: '導いた',     ph: '/lɛd/',    eiken: 4 },
      { en: 'shed',   ja: '小屋',       ph: '/ʃɛd/',   eiken: 3 },
      { en: 'sled',   ja: 'そり',       ph: '/slɛd/',  eiken: 3 },
      { en: 'spread', ja: '広げる',     ph: '/sprɛd/', eiken: 3 },
    ]
  },
  {
    id: 'en_family', theme: '-en ファミリー',
    words: [
      { en: 'pen',  ja: 'ペン',   ph: '/pɛn/',  eiken: 5 },
      { en: 'ten',  ja: '10',     ph: '/tɛn/',  eiken: 5 },
      { en: 'hen',  ja: 'めんどり', ph: '/hɛn/', eiken: 4 },
      { en: 'men',  ja: '男性たち', ph: '/mɛn/', eiken: 5 },
      { en: 'den',  ja: '巣穴',   ph: '/dɛn/',  eiken: 3 },
      { en: 'then', ja: 'そのとき', ph: '/ðɛn/', eiken: 5 },
      { en: 'when', ja: 'いつ',   ph: '/wɛn/',  eiken: 5 },
    ]
  },
  {
    id: 'et_family', theme: '-et ファミリー',
    words: [
      { en: 'get', ja: '得る',     ph: '/ɡɛt/', eiken: 5 },
      { en: 'set', ja: '設定する', ph: '/sɛt/', eiken: 5 },
      { en: 'pet', ja: 'ペット',   ph: '/pɛt/', eiken: 5 },
      { en: 'net', ja: '網',       ph: '/nɛt/', eiken: 4 },
      { en: 'met', ja: '会った',   ph: '/mɛt/', eiken: 5 },
      { en: 'wet', ja: '濡れた',   ph: '/wɛt/', eiken: 4 },
      { en: 'let', ja: 'させる',   ph: '/lɛt/', eiken: 5 },
      { en: 'jet', ja: 'ジェット', ph: '/dʒɛt/', eiken: 4 },
      { en: 'bet', ja: '賭ける',   ph: '/bɛt/', eiken: 3 },
    ]
  },
  {
    id: 'ig_family', theme: '-ig ファミリー',
    words: [
      { en: 'big',  ja: '大きい', ph: '/bɪɡ/',  eiken: 5 },
      { en: 'dig',  ja: '掘る',   ph: '/dɪɡ/',  eiken: 4 },
      { en: 'pig',  ja: '豚',     ph: '/pɪɡ/',  eiken: 5 },
      { en: 'wig',  ja: 'かつら', ph: '/wɪɡ/',  eiken: 3 },
      { en: 'fig',  ja: 'いちじく', ph: '/fɪɡ/', eiken: 3 },
      { en: 'twig', ja: '小枝',   ph: '/twɪɡ/', eiken: 3 },
    ]
  },
  {
    id: 'ip_family', theme: '-ip ファミリー',
    words: [
      { en: 'tip',   ja: '先端',       ph: '/tɪp/',   eiken: 4 },
      { en: 'lip',   ja: '唇',         ph: '/lɪp/',   eiken: 4 },
      { en: 'hip',   ja: '腰',         ph: '/hɪp/',   eiken: 3 },
      { en: 'dip',   ja: '浸す',       ph: '/dɪp/',   eiken: 3 },
      { en: 'zip',   ja: 'ジッパー',   ph: '/zɪp/',   eiken: 3 },
      { en: 'ship',  ja: '船',         ph: '/ʃɪp/',   eiken: 5 },
      { en: 'trip',  ja: '旅行',       ph: '/trɪp/',  eiken: 4 },
      { en: 'chip',  ja: 'チップ',     ph: '/tʃɪp/',  eiken: 3 },
      { en: 'drip',  ja: 'しずく',     ph: '/drɪp/',  eiken: 3 },
      { en: 'skip',  ja: 'スキップ',   ph: '/skɪp/',  eiken: 4 },
      { en: 'slip',  ja: '滑る',       ph: '/slɪp/',  eiken: 3 },
      { en: 'grip',  ja: '握る',       ph: '/ɡrɪp/',  eiken: 3 },
      { en: 'clip',  ja: 'クリップ',   ph: '/klɪp/',  eiken: 3 },
      { en: 'flip',  ja: '裏返す',     ph: '/flɪp/',  eiken: 3 },
      { en: 'whip',  ja: 'ムチ',       ph: '/wɪp/',   eiken: 2 },
      { en: 'strip', ja: '細長い',     ph: '/strɪp/', eiken: 2 },
    ]
  },
  {
    id: 'ob_family', theme: '-ob ファミリー',
    words: [
      { en: 'job',   ja: '仕事',       ph: '/dʒɑːb/', eiken: 5 },
      { en: 'rob',   ja: '奪う',       ph: '/rɑːb/',  eiken: 3 },
      { en: 'knob',  ja: 'つまみ',     ph: '/nɑːb/',  eiken: 2 },
      { en: 'mob',   ja: '群衆',       ph: '/mɑːb/',  eiken: 2 },
      { en: 'sob',   ja: 'すすり泣く', ph: '/sɑːb/',  eiken: 2 },
      { en: 'throb', ja: '脈打つ',     ph: '/θrɑːb/', eiken: 'p1' },
    ]
  },
  {
    id: 'og_family', theme: '-og ファミリー',
    words: [
      { en: 'dog',  ja: '犬',         ph: '/dɔːɡ/', eiken: 5 },
      { en: 'log',  ja: '丸太',       ph: '/lɔːɡ/', eiken: 3 },
      { en: 'fog',  ja: '霧',         ph: '/fɔːɡ/', eiken: 3 },
      { en: 'jog',  ja: 'ジョギング', ph: '/dʒɔːɡ/', eiken: 3 },
      { en: 'blog', ja: 'ブログ',     ph: '/blɔːɡ/', eiken: 4 },
      { en: 'frog', ja: 'カエル',     ph: '/frɔːɡ/', eiken: 4 },
      { en: 'hog',  ja: '豚',         ph: '/hɔːɡ/', eiken: 2 },
    ]
  },
  {
    id: 'ub_family', theme: '-ub ファミリー',
    words: [
      { en: 'tub',   ja: '浴槽',   ph: '/tʌb/',   eiken: 3 },
      { en: 'rub',   ja: 'こする', ph: '/rʌb/',   eiken: 3 },
      { en: 'club',  ja: 'クラブ', ph: '/klʌb/',  eiken: 4 },
      { en: 'pub',   ja: 'パブ',   ph: '/pʌb/',   eiken: 3 },
      { en: 'hub',   ja: '中心地', ph: '/hʌb/',   eiken: 2 },
      { en: 'sub',   ja: '代わり', ph: '/sʌb/',   eiken: 3 },
      { en: 'scrub', ja: 'ゴシゴシ洗う', ph: '/skrʌb/', eiken: 2 },
      { en: 'shrub', ja: '低木',   ph: '/ʃrʌb/',  eiken: 2 },
    ]
  },

  // ===== Long Vowel / Magic E =====
  {
    id: 'ape_family', theme: '-ape ファミリー',
    words: [
      { en: 'tape',      ja: 'テープ',   ph: '/teɪp/',      eiken: 4 },
      { en: 'cape',      ja: 'マント',   ph: '/keɪp/',      eiken: 3 },
      { en: 'shape',     ja: '形',       ph: '/ʃeɪp/',      eiken: 4 },
      { en: 'grape',     ja: 'ぶどう',   ph: '/ɡreɪp/',     eiken: 4 },
      { en: 'escape',    ja: '逃げる',   ph: '/ɪˈskeɪp/',   eiken: 3 },
      { en: 'landscape', ja: '風景',     ph: '/ˈlændskeɪp/', eiken: 2 },
    ]
  },
  {
    id: 'ame_family', theme: '-ame ファミリー',
    words: [
      { en: 'name',  ja: '名前',   ph: '/neɪm/',  eiken: 5 },
      { en: 'game',  ja: 'ゲーム', ph: '/ɡeɪm/',  eiken: 5 },
      { en: 'came',  ja: '来た',   ph: '/keɪm/',  eiken: 5 },
      { en: 'same',  ja: '同じ',   ph: '/seɪm/',  eiken: 5 },
      { en: 'blame', ja: '非難する', ph: '/bleɪm/', eiken: 3 },
      { en: 'flame', ja: '炎',     ph: '/fleɪm/', eiken: 3 },
      { en: 'frame', ja: '枠',     ph: '/freɪm/', eiken: 3 },
      { en: 'shame', ja: '恥',     ph: '/ʃeɪm/',  eiken: 3 },
    ]
  },
  {
    id: 'ose_family', theme: '-ose ファミリー',
    words: [
      { en: 'nose',    ja: '鼻',       ph: '/noʊz/',     eiken: 5 },
      { en: 'rose',    ja: 'バラ',     ph: '/roʊz/',     eiken: 4 },
      { en: 'close',   ja: '閉じる',   ph: '/kloʊz/',    eiken: 5 },
      { en: 'chose',   ja: '選んだ',   ph: '/tʃoʊz/',    eiken: 4 },
      { en: 'those',   ja: 'あれら',   ph: '/ðoʊz/',     eiken: 5 },
      { en: 'pose',    ja: 'ポーズ',   ph: '/poʊz/',     eiken: 3 },
      { en: 'compose', ja: '作曲する', ph: '/kəmˈpoʊz/', eiken: 2 },
      { en: 'suppose', ja: '思う',     ph: '/səˈpoʊz/',  eiken: 3 },
      { en: 'propose', ja: '提案する', ph: '/prəˈpoʊz/', eiken: 2 },
    ]
  },
  {
    id: 'oke_family', theme: '-oke ファミリー',
    words: [
      { en: 'joke',    ja: '冗談',     ph: '/dʒoʊk/',    eiken: 4 },
      { en: 'broke',   ja: '壊した',   ph: '/broʊk/',    eiken: 4 },
      { en: 'smoke',   ja: '煙',       ph: '/smoʊk/',    eiken: 4 },
      { en: 'spoke',   ja: '話した',   ph: '/spoʊk/',    eiken: 4 },
      { en: 'stroke',  ja: '一撃',     ph: '/stroʊk/',   eiken: 2 },
      { en: 'awoke',   ja: '目覚めた', ph: '/əˈwoʊk/',   eiken: 2 },
      { en: 'provoke', ja: '怒らせる', ph: '/prəˈvoʊk/', eiken: 2 },
    ]
  },
  {
    id: 'one_family', theme: '-one ファミリー',
    words: [
      { en: 'bone',   ja: '骨',       ph: '/boʊn/',   eiken: 4 },
      { en: 'stone',  ja: '石',       ph: '/stoʊn/',  eiken: 4 },
      { en: 'phone',  ja: '電話',     ph: '/foʊn/',   eiken: 5 },
      { en: 'tone',   ja: '音調',     ph: '/toʊn/',   eiken: 3 },
      { en: 'zone',   ja: '地帯',     ph: '/zoʊn/',   eiken: 3 },
      { en: 'alone',  ja: '一人で',   ph: '/əˈloʊn/', eiken: 4 },
      { en: 'throne', ja: '王座',     ph: '/θroʊn/',  eiken: 2 },
      { en: 'clone',  ja: 'クローン', ph: '/kloʊn/',  eiken: 2 },
    ]
  },
  {
    id: 'ute_family', theme: '-ute ファミリー',
    words: [
      { en: 'cute',    ja: 'かわいい', ph: '/kjuːt/',     eiken: 4 },
      { en: 'mute',    ja: '無言の',   ph: '/mjuːt/',     eiken: 2 },
      { en: 'flute',   ja: 'フルート', ph: '/fluːt/',     eiken: 3 },
      { en: 'brute',   ja: '野獣',     ph: '/bruːt/',     eiken: 'p1' },
      { en: 'compute', ja: '計算する', ph: '/kəmˈpjuːt/', eiken: 2 },
      { en: 'dispute', ja: '論争',     ph: '/dɪˈspjuːt/', eiken: 2 },
    ]
  },

  // ===== Digraphs =====
  {
    id: 'sh_family', theme: 'sh- ファミリー',
    words: [
      { en: 'she',    ja: '彼女',     ph: '/ʃiː/',   eiken: 5 },
      { en: 'ship',   ja: '船',       ph: '/ʃɪp/',   eiken: 5 },
      { en: 'shop',   ja: '店',       ph: '/ʃɑːp/',  eiken: 5 },
      { en: 'shut',   ja: '閉める',   ph: '/ʃʌt/',   eiken: 4 },
      { en: 'shine',  ja: '輝く',     ph: '/ʃaɪn/',  eiken: 4 },
      { en: 'shake',  ja: '振る',     ph: '/ʃeɪk/',  eiken: 4 },
      { en: 'share',  ja: '共有する', ph: '/ʃɛr/',   eiken: 4 },
      { en: 'shell',  ja: '貝殻',     ph: '/ʃɛl/',   eiken: 4 },
      { en: 'shelf',  ja: '棚',       ph: '/ʃɛlf/',  eiken: 4 },
      { en: 'shift',  ja: '移す',     ph: '/ʃɪft/',  eiken: 3 },
      { en: 'shock',  ja: '衝撃',     ph: '/ʃɑːk/',  eiken: 3 },
      { en: 'shout',  ja: '叫ぶ',     ph: '/ʃaʊt/',  eiken: 4 },
      { en: 'show',   ja: '見せる',   ph: '/ʃoʊ/',   eiken: 5 },
      { en: 'shower', ja: 'シャワー', ph: '/ˈʃaʊər/', eiken: 4 },
      { en: 'shrink', ja: '縮む',     ph: '/ʃrɪŋk/', eiken: 2 },
    ]
  },
  {
    id: 'ch_family', theme: 'ch- ファミリー',
    words: [
      { en: 'chin',     ja: 'あご',       ph: '/tʃɪn/',      eiken: 4 },
      { en: 'chip',     ja: 'チップ',     ph: '/tʃɪp/',      eiken: 3 },
      { en: 'chop',     ja: '切り刻む',   ph: '/tʃɑːp/',     eiken: 3 },
      { en: 'chat',     ja: 'おしゃべり', ph: '/tʃæt/',      eiken: 3 },
      { en: 'check',    ja: '確認する',   ph: '/tʃɛk/',      eiken: 4 },
      { en: 'chest',    ja: '胸',         ph: '/tʃɛst/',     eiken: 3 },
      { en: 'child',    ja: '子ども',     ph: '/tʃaɪld/',    eiken: 5 },
      { en: 'choose',   ja: '選ぶ',       ph: '/tʃuːz/',     eiken: 4 },
      { en: 'church',   ja: '教会',       ph: '/tʃɜːrtʃ/',   eiken: 4 },
      { en: 'chain',    ja: '鎖',         ph: '/tʃeɪn/',     eiken: 3 },
      { en: 'chair',    ja: '椅子',       ph: '/tʃɛr/',      eiken: 5 },
      { en: 'change',   ja: '変える',     ph: '/tʃeɪndʒ/',   eiken: 4 },
      { en: 'charge',   ja: '請求する',   ph: '/tʃɑːrdʒ/',   eiken: 3 },
      { en: 'chapter',  ja: '章',         ph: '/ˈtʃæptər/',  eiken: 3 },
      { en: 'champion', ja: 'チャンピオン', ph: '/ˈtʃæmpiən/', eiken: 3 },
    ]
  },
  {
    id: 'th_family', theme: 'th- ファミリー',
    words: [
      { en: 'the',     ja: 'その',       ph: '/ðə/',    eiken: 5 },
      { en: 'this',    ja: 'これ',       ph: '/ðɪs/',   eiken: 5 },
      { en: 'them',    ja: '彼らを',     ph: '/ðɛm/',   eiken: 5 },
      { en: 'think',   ja: '考える',     ph: '/θɪŋk/',  eiken: 5 },
      { en: 'thing',   ja: 'もの',       ph: '/θɪŋ/',   eiken: 5 },
      { en: 'thin',    ja: '薄い',       ph: '/θɪn/',   eiken: 4 },
      { en: 'thick',   ja: '厚い',       ph: '/θɪk/',   eiken: 4 },
      { en: 'thank',   ja: '感謝する',   ph: '/θæŋk/',  eiken: 5 },
      { en: 'three',   ja: '3',          ph: '/θriː/',  eiken: 5 },
      { en: 'throw',   ja: '投げる',     ph: '/θroʊ/',  eiken: 4 },
      { en: 'through', ja: '〜を通して', ph: '/θruː/',  eiken: 4 },
      { en: 'thought', ja: '考え',       ph: '/θɔːt/',  eiken: 4 },
      { en: 'throat',  ja: '喉',         ph: '/θroʊt/', eiken: 3 },
      { en: 'thumb',   ja: '親指',       ph: '/θʌm/',   eiken: 3 },
    ]
  },
  {
    id: 'wh_family', theme: 'wh- ファミリー',
    words: [
      { en: 'what',    ja: '何',       ph: '/wɑːt/',    eiken: 5 },
      { en: 'when',    ja: 'いつ',     ph: '/wɛn/',     eiken: 5 },
      { en: 'where',   ja: 'どこ',     ph: '/wɛr/',     eiken: 5 },
      { en: 'which',   ja: 'どちら',   ph: '/wɪtʃ/',    eiken: 5 },
      { en: 'while',   ja: '〜の間',   ph: '/waɪl/',    eiken: 4 },
      { en: 'white',   ja: '白',       ph: '/waɪt/',    eiken: 5 },
      { en: 'whale',   ja: 'クジラ',   ph: '/weɪl/',    eiken: 4 },
      { en: 'wheat',   ja: '小麦',     ph: '/wiːt/',    eiken: 3 },
      { en: 'wheel',   ja: '車輪',     ph: '/wiːl/',    eiken: 4 },
      { en: 'whisper', ja: 'ささやく', ph: '/ˈwɪspər/', eiken: 3 },
      { en: 'whistle', ja: '口笛',     ph: '/ˈwɪsl/',  eiken: 3 },
    ]
  },
  {
    id: 'ng_family', theme: '-ng ファミリー',
    words: [
      { en: 'sing',   ja: '歌う',       ph: '/sɪŋ/',    eiken: 5 },
      { en: 'ring',   ja: '指輪',       ph: '/rɪŋ/',    eiken: 5 },
      { en: 'king',   ja: '王様',       ph: '/kɪŋ/',    eiken: 4 },
      { en: 'wing',   ja: '翼',         ph: '/wɪŋ/',    eiken: 4 },
      { en: 'bring',  ja: '持ってくる', ph: '/brɪŋ/',   eiken: 5 },
      { en: 'long',   ja: '長い',       ph: '/lɔːŋ/',   eiken: 5 },
      { en: 'song',   ja: '歌',         ph: '/sɔːŋ/',   eiken: 5 },
      { en: 'strong', ja: '強い',       ph: '/strɔːŋ/', eiken: 4 },
      { en: 'young',  ja: '若い',       ph: '/jʌŋ/',    eiken: 4 },
      { en: 'among',  ja: '〜の間で',   ph: '/əˈmʌŋ/',  eiken: 3 },
      { en: 'along',  ja: '〜に沿って', ph: '/əˈlɔːŋ/', eiken: 4 },
      { en: 'spring', ja: '春',         ph: '/sprɪŋ/',  eiken: 5 },
      { en: 'string', ja: '糸',         ph: '/strɪŋ/',  eiken: 3 },
      { en: 'swing',  ja: 'ブランコ',   ph: '/swɪŋ/',   eiken: 4 },
    ]
  },

  // ===== R-controlled vowels =====
  {
    id: 'ar_family', theme: '-ar ファミリー',
    words: [
      { en: 'car',    ja: '車',       ph: '/kɑːr/',    eiken: 5 },
      { en: 'far',    ja: '遠い',     ph: '/fɑːr/',    eiken: 5 },
      { en: 'star',   ja: '星',       ph: '/stɑːr/',   eiken: 5 },
      { en: 'bar',    ja: 'バー',     ph: '/bɑːr/',    eiken: 4 },
      { en: 'jar',    ja: '瓶',       ph: '/dʒɑːr/',   eiken: 4 },
      { en: 'scar',   ja: '傷跡',     ph: '/skɑːr/',   eiken: 2 },
      { en: 'guitar', ja: 'ギター',   ph: '/ɡɪˈtɑːr/', eiken: 4 },
    ]
  },
  {
    id: 'ir_family', theme: '-ir ファミリー',
    words: [
      { en: 'sir',    ja: 'サー',     ph: '/sɜːr/',    eiken: 4 },
      { en: 'bird',   ja: '鳥',       ph: '/bɜːrd/',   eiken: 5 },
      { en: 'girl',   ja: '女の子',   ph: '/ɡɜːrl/',   eiken: 5 },
      { en: 'first',  ja: '最初の',   ph: '/fɜːrst/',  eiken: 5 },
      { en: 'third',  ja: '3番目の',  ph: '/θɜːrd/',   eiken: 5 },
      { en: 'shirt',  ja: 'シャツ',   ph: '/ʃɜːrt/',   eiken: 5 },
      { en: 'stir',   ja: 'かき混ぜる', ph: '/stɜːr/', eiken: 3 },
      { en: 'birth',  ja: '誕生',     ph: '/bɜːrθ/',   eiken: 4 },
      { en: 'circle', ja: '円',       ph: '/ˈsɜːrkl/', eiken: 4 },
    ]
  },
  {
    id: 'ur_family', theme: '-ur ファミリー',
    words: [
      { en: 'fur',     ja: '毛皮',     ph: '/fɜːr/',     eiken: 3 },
      { en: 'burn',    ja: '燃える',   ph: '/bɜːrn/',    eiken: 4 },
      { en: 'turn',    ja: '曲がる',   ph: '/tɜːrn/',    eiken: 5 },
      { en: 'nurse',   ja: '看護師',   ph: '/nɜːrs/',    eiken: 5 },
      { en: 'curve',   ja: 'カーブ',   ph: '/kɜːrv/',    eiken: 3 },
      { en: 'burst',   ja: '破裂する', ph: '/bɜːrst/',   eiken: 2 },
      { en: 'purple',  ja: '紫',       ph: '/ˈpɜːrpl/',  eiken: 4 },
      { en: 'surface', ja: '表面',     ph: '/ˈsɜːrfɪs/', eiken: 3 },
      { en: 'disturb', ja: '邪魔する', ph: '/dɪˈstɜːrb/', eiken: 2 },
    ]
  },

  // ===== Vowel teams =====
  {
    id: 'ee_family', theme: '-ee ファミリー',
    words: [
      { en: 'see',      ja: '見る',     ph: '/siː/',      eiken: 5 },
      { en: 'bee',      ja: 'ハチ',     ph: '/biː/',      eiken: 4 },
      { en: 'tree',     ja: '木',       ph: '/triː/',     eiken: 5 },
      { en: 'free',     ja: '自由な',   ph: '/friː/',     eiken: 5 },
      { en: 'knee',     ja: 'ひざ',     ph: '/niː/',      eiken: 4 },
      { en: 'agree',    ja: '同意する', ph: '/əˈɡriː/',   eiken: 4 },
      { en: 'degree',   ja: '度',       ph: '/dɪˈɡriː/',  eiken: 3 },
      { en: 'employee', ja: '従業員',   ph: '/ɪmˈplɔɪiː/', eiken: 2 },
    ]
  },
  {
    id: 'ea_family', theme: '-ea ファミリー',
    words: [
      { en: 'sea',    ja: '海',     ph: '/siː/',    eiken: 5 },
      { en: 'tea',    ja: 'お茶',   ph: '/tiː/',    eiken: 5 },
      { en: 'eat',    ja: '食べる', ph: '/iːt/',     eiken: 5 },
      { en: 'beat',   ja: '打つ',   ph: '/biːt/',    eiken: 4 },
      { en: 'heat',   ja: '熱',     ph: '/hiːt/',    eiken: 4 },
      { en: 'meat',   ja: '肉',     ph: '/miːt/',    eiken: 5 },
      { en: 'seat',   ja: '座席',   ph: '/siːt/',    eiken: 4 },
      { en: 'clean',  ja: 'きれいな', ph: '/kliːn/', eiken: 5 },
      { en: 'dream',  ja: '夢',     ph: '/driːm/',   eiken: 4 },
      { en: 'stream', ja: '流れ',   ph: '/striːm/',  eiken: 3 },
      { en: 'cream',  ja: 'クリーム', ph: '/kriːm/', eiken: 4 },
      { en: 'mean',   ja: '意味する', ph: '/miːn/', eiken: 4 },
      { en: 'team',   ja: 'チーム', ph: '/tiːm/',    eiken: 5 },
    ]
  },
  {
    id: 'oa_family', theme: '-oa ファミリー',
    words: [
      { en: 'boat',  ja: 'ボート',   ph: '/boʊt/',  eiken: 5 },
      { en: 'coat',  ja: 'コート',   ph: '/koʊt/',  eiken: 5 },
      { en: 'road',  ja: '道',       ph: '/roʊd/',  eiken: 5 },
      { en: 'load',  ja: '荷物',     ph: '/loʊd/',  eiken: 3 },
      { en: 'toast', ja: 'トースト', ph: '/toʊst/', eiken: 4 },
      { en: 'roast', ja: '焼く',     ph: '/roʊst/', eiken: 3 },
      { en: 'coach', ja: 'コーチ',   ph: '/koʊtʃ/', eiken: 3 },
      { en: 'goal',  ja: 'ゴール',   ph: '/ɡoʊl/',  eiken: 4 },
      { en: 'soap',  ja: '石鹸',     ph: '/soʊp/',  eiken: 4 },
      { en: 'float', ja: '浮く',     ph: '/floʊt/', eiken: 3 },
    ]
  },
  {
    id: 'ay_family', theme: '-ay ファミリー',
    words: [
      { en: 'day',     ja: '日',       ph: '/deɪ/',      eiken: 5 },
      { en: 'say',     ja: '言う',     ph: '/seɪ/',      eiken: 5 },
      { en: 'way',     ja: '道',       ph: '/weɪ/',      eiken: 5 },
      { en: 'play',    ja: '遊ぶ',     ph: '/pleɪ/',     eiken: 5 },
      { en: 'stay',    ja: '滞在する', ph: '/steɪ/',     eiken: 5 },
      { en: 'pay',     ja: '払う',     ph: '/peɪ/',      eiken: 5 },
      { en: 'may',     ja: '〜かもしれない', ph: '/meɪ/', eiken: 5 },
      { en: 'pray',    ja: '祈る',     ph: '/preɪ/',     eiken: 3 },
      { en: 'spray',   ja: 'スプレー', ph: '/spreɪ/',    eiken: 3 },
      { en: 'delay',   ja: '遅らせる', ph: '/dɪˈleɪ/',   eiken: 3 },
      { en: 'display', ja: '表示する', ph: '/dɪˈspleɪ/', eiken: 3 },
      { en: 'essay',   ja: 'エッセイ', ph: '/ˈɛseɪ/',    eiken: 3 },
      { en: 'today',   ja: '今日',     ph: '/təˈdeɪ/',   eiken: 5 },
      { en: 'holiday', ja: '休日',     ph: '/ˈhɑːlɪdeɪ/', eiken: 4 },
    ]
  },
  {
    id: 'oi_oy_family', theme: '-oi/-oy ファミリー',
    words: [
      { en: 'oil',     ja: '油',       ph: '/ɔɪl/',      eiken: 4 },
      { en: 'boil',    ja: '沸かす',   ph: '/bɔɪl/',     eiken: 3 },
      { en: 'coin',    ja: '硬貨',     ph: '/kɔɪn/',     eiken: 4 },
      { en: 'join',    ja: '参加する', ph: '/dʒɔɪn/',    eiken: 4 },
      { en: 'point',   ja: '点',       ph: '/pɔɪnt/',    eiken: 4 },
      { en: 'voice',   ja: '声',       ph: '/vɔɪs/',     eiken: 4 },
      { en: 'choice',  ja: '選択',     ph: '/tʃɔɪs/',    eiken: 3 },
      { en: 'noise',   ja: '騒音',     ph: '/nɔɪz/',     eiken: 4 },
      { en: 'boy',     ja: '男の子',   ph: '/bɔɪ/',      eiken: 5 },
      { en: 'joy',     ja: '喜び',     ph: '/dʒɔɪ/',     eiken: 3 },
      { en: 'toy',     ja: 'おもちゃ', ph: '/tɔɪ/',      eiken: 5 },
      { en: 'enjoy',   ja: '楽しむ',   ph: '/ɪnˈdʒɔɪ/', eiken: 5 },
      { en: 'employ',  ja: '雇う',     ph: '/ɪmˈplɔɪ/', eiken: 2 },
      { en: 'destroy', ja: '破壊する', ph: '/dɪˈstrɔɪ/', eiken: 3 },
    ]
  },
  {
    id: 'ou_ow_family', theme: '-ou/-ow ファミリー',
    words: [
      { en: 'out',    ja: '外',       ph: '/aʊt/',    eiken: 5 },
      { en: 'house',  ja: '家',       ph: '/haʊs/',   eiken: 5 },
      { en: 'mouse',  ja: 'ネズミ',   ph: '/maʊs/',   eiken: 5 },
      { en: 'found',  ja: '見つけた', ph: '/faʊnd/',  eiken: 4 },
      { en: 'ground', ja: '地面',     ph: '/ɡraʊnd/', eiken: 4 },
      { en: 'sound',  ja: '音',       ph: '/saʊnd/',  eiken: 5 },
      { en: 'round',  ja: '丸い',     ph: '/raʊnd/',  eiken: 5 },
      { en: 'count',  ja: '数える',   ph: '/kaʊnt/',  eiken: 4 },
      { en: 'cloud',  ja: '雲',       ph: '/klaʊd/',  eiken: 5 },
      { en: 'loud',   ja: 'うるさい', ph: '/laʊd/',   eiken: 4 },
      { en: 'proud',  ja: '誇りに思う', ph: '/praʊd/', eiken: 3 },
      { en: 'now',    ja: '今',       ph: '/naʊ/',    eiken: 5 },
      { en: 'how',    ja: 'どうやって', ph: '/haʊ/',  eiken: 5 },
      { en: 'cow',    ja: '牛',       ph: '/kaʊ/',    eiken: 5 },
      { en: 'town',   ja: '町',       ph: '/taʊn/',   eiken: 5 },
      { en: 'down',   ja: '下',       ph: '/daʊn/',   eiken: 5 },
      { en: 'brown',  ja: '茶色',     ph: '/braʊn/',  eiken: 5 },
      { en: 'crown',  ja: '王冠',     ph: '/kraʊn/',  eiken: 3 },
      { en: 'power',  ja: '力',       ph: '/ˈpaʊər/', eiken: 4 },
      { en: 'flower', ja: '花',       ph: '/ˈflaʊər/', eiken: 5 },
      { en: 'tower',  ja: '塔',       ph: '/ˈtaʊər/', eiken: 3 },
    ]
  },

  // ===== Compound word chains =====
  {
    id: 'sun_compound', theme: 'sun- チェーン',
    words: [
      { en: 'sun',       ja: '太陽',       ph: '/sʌn/',        eiken: 5 },
      { en: 'sunlight',  ja: '日光',       ph: '/ˈsʌnlaɪt/',  eiken: 3 },
      { en: 'sunshine',  ja: '日差し',     ph: '/ˈsʌnʃaɪn/',  eiken: 3 },
      { en: 'sunburn',   ja: '日焼け',     ph: '/ˈsʌnbɜːrn/', eiken: 3 },
      { en: 'sunflower', ja: 'ひまわり',   ph: '/ˈsʌnflaʊər/', eiken: 3 },
    ]
  },
  {
    id: 'rain_compound', theme: 'rain- チェーン',
    words: [
      { en: 'rain',     ja: '雨',           ph: '/reɪn/',       eiken: 5 },
      { en: 'rainbow',  ja: '虹',           ph: '/ˈreɪnboʊ/',  eiken: 4 },
      { en: 'raincoat', ja: 'レインコート', ph: '/ˈreɪnkoʊt/', eiken: 4 },
      { en: 'raindrop', ja: '雨粒',         ph: '/ˈreɪndrɑːp/', eiken: 3 },
    ]
  },
  {
    id: 'bed_compound', theme: 'bed- チェーン',
    words: [
      { en: 'bed',     ja: 'ベッド', ph: '/bɛd/',       eiken: 5 },
      { en: 'bedroom', ja: '寝室',   ph: '/ˈbɛdruːm/', eiken: 5 },
      { en: 'bedtime', ja: '就寝時間', ph: '/ˈbɛdtaɪm/', eiken: 4 },
      { en: 'bedside', ja: '枕元',   ph: '/ˈbɛdsaɪd/', eiken: 3 },
    ]
  },
  {
    id: 'day_compound', theme: 'day チェーン',
    words: [
      { en: 'day',       ja: '日',       ph: '/deɪ/',         eiken: 5 },
      { en: 'today',     ja: '今日',     ph: '/təˈdeɪ/',      eiken: 5 },
      { en: 'birthday',  ja: '誕生日',   ph: '/ˈbɜːrθdeɪ/',  eiken: 5 },
      { en: 'everyday',  ja: '毎日の',   ph: '/ˈɛvrideɪ/',   eiken: 4 },
      { en: 'yesterday', ja: '昨日',     ph: '/ˈjɛstərdeɪ/', eiken: 5 },
    ]
  },
  {
    id: 'book_compound', theme: 'book チェーン',
    words: [
      { en: 'book',      ja: '本',           ph: '/bʊk/',        eiken: 5 },
      { en: 'bookshelf', ja: '本棚',         ph: '/ˈbʊkʃɛlf/',  eiken: 4 },
      { en: 'bookmark',  ja: 'しおり',       ph: '/ˈbʊkmɑːrk/', eiken: 3 },
      { en: 'notebook',  ja: 'ノート',       ph: '/ˈnoʊtbʊk/',  eiken: 5 },
      { en: 'textbook',  ja: '教科書',       ph: '/ˈtɛkstbʊk/', eiken: 4 },
    ]
  },
  {
    id: 'foot_compound', theme: 'foot チェーン',
    words: [
      { en: 'foot',      ja: '足',       ph: '/fʊt/',          eiken: 5 },
      { en: 'football',  ja: 'サッカー', ph: '/ˈfʊtbɔːl/',    eiken: 5 },
      { en: 'footprint', ja: '足跡',     ph: '/ˈfʊtprɪnt/',   eiken: 3 },
      { en: 'footstep',  ja: '足音',     ph: '/ˈfʊtstɛp/',    eiken: 3 },
      { en: 'barefoot',  ja: 'はだしの', ph: '/ˈbɛrfʊt/',     eiken: 2 },
    ]
  },
  {
    id: 'water_compound', theme: 'water チェーン',
    words: [
      { en: 'water',      ja: '水',         ph: '/ˈwɔːtər/',       eiken: 5 },
      { en: 'waterfall',  ja: '滝',         ph: '/ˈwɔːtərfɔːl/',  eiken: 3 },
      { en: 'waterproof', ja: '防水の',     ph: '/ˈwɔːtərpruːf/', eiken: 2 },
      { en: 'underwater', ja: '水中の',     ph: '/ˌʌndərˈwɔːtər/', eiken: 3 },
    ]
  },
  {
    id: 'out_compound', theme: 'out- チェーン',
    words: [
      { en: 'out',         ja: '外に',       ph: '/aʊt/',           eiken: 5 },
      { en: 'outside',     ja: '外側',       ph: '/ˌaʊtˈsaɪd/',    eiken: 5 },
      { en: 'outdoor',     ja: '屋外の',     ph: '/ˈaʊtdɔːr/',     eiken: 4 },
      { en: 'outcome',     ja: '結果',       ph: '/ˈaʊtkʌm/',      eiken: 2 },
      { en: 'output',      ja: '出力',       ph: '/ˈaʊtpʊt/',      eiken: 2 },
      { en: 'outstanding', ja: '際立った',   ph: '/aʊtˈstændɪŋ/',  eiken: 2 },
      { en: 'outgoing',    ja: '社交的な',   ph: '/ˈaʊtɡoʊɪŋ/',    eiken: 2 },
    ]
  },

  // ===== Prefix chains =====
  {
    id: 'un_prefix', theme: 'un- 接頭辞チェーン',
    words: [
      { en: 'happy',   ja: '幸せな',     ph: '/ˈhæpi/',    eiken: 5 },
      { en: 'unhappy', ja: '不幸な',     ph: '/ʌnˈhæpi/',  eiken: 4 },
      { en: 'fair',    ja: '公平な',     ph: '/fɛr/',       eiken: 4 },
      { en: 'unfair',  ja: '不公平な',   ph: '/ʌnˈfɛr/',   eiken: 3 },
      { en: 'lock',    ja: '鍵をかける', ph: '/lɑːk/',      eiken: 4 },
      { en: 'unlock',  ja: '鍵を開ける', ph: '/ʌnˈlɑːk/',  eiken: 3 },
      { en: 'usual',   ja: '普通の',     ph: '/ˈjuːʒuəl/', eiken: 4 },
      { en: 'unusual', ja: '珍しい',     ph: '/ʌnˈjuːʒuəl/', eiken: 3 },
    ]
  },
  {
    id: 're_prefix', theme: 're- 接頭辞チェーン',
    words: [
      { en: 'play',    ja: '遊ぶ',       ph: '/pleɪ/',      eiken: 5 },
      { en: 'replay',  ja: 'もう一度再生', ph: '/riːˈpleɪ/', eiken: 3 },
      { en: 'write',   ja: '書く',       ph: '/raɪt/',      eiken: 5 },
      { en: 'rewrite', ja: '書き直す',   ph: '/riːˈraɪt/',  eiken: 3 },
      { en: 'build',   ja: '建てる',     ph: '/bɪld/',      eiken: 4 },
      { en: 'rebuild', ja: '建て直す',   ph: '/riːˈbɪld/',  eiken: 3 },
      { en: 'turn',    ja: '曲がる',     ph: '/tɜːrn/',     eiken: 5 },
      { en: 'return',  ja: '戻る',       ph: '/rɪˈtɜːrn/',  eiken: 4 },
      { en: 'view',    ja: '景色',       ph: '/vjuː/',      eiken: 4 },
      { en: 'review',  ja: '復習する',   ph: '/rɪˈvjuː/',   eiken: 3 },
    ]
  },
  {
    id: 'dis_prefix', theme: 'dis- 接頭辞チェーン',
    words: [
      { en: 'like',       ja: '好き',       ph: '/laɪk/',        eiken: 5 },
      { en: 'dislike',    ja: '嫌い',       ph: '/dɪsˈlaɪk/',   eiken: 3 },
      { en: 'agree',      ja: '同意する',   ph: '/əˈɡriː/',     eiken: 4 },
      { en: 'disagree',   ja: '反対する',   ph: '/ˌdɪsəˈɡriː/', eiken: 3 },
      { en: 'cover',      ja: '覆う',       ph: '/ˈkʌvər/',     eiken: 4 },
      { en: 'discover',   ja: '発見する',   ph: '/dɪˈskʌvər/',  eiken: 4 },
      { en: 'appear',     ja: '現れる',     ph: '/əˈpɪr/',      eiken: 4 },
      { en: 'disappear',  ja: '消える',     ph: '/ˌdɪsəˈpɪr/',  eiken: 3 },
      { en: 'connect',    ja: 'つなぐ',     ph: '/kəˈnɛkt/',    eiken: 3 },
      { en: 'disconnect', ja: '切断する',   ph: '/ˌdɪskəˈnɛkt/', eiken: 2 },
    ]
  },

  // ===== Suffix chains =====
  {
    id: 'ful_suffix', theme: '-ful 接尾辞チェーン',
    words: [
      { en: 'hope',      ja: '希望',       ph: '/hoʊp/',       eiken: 4 },
      { en: 'hopeful',   ja: '希望に満ちた', ph: '/ˈhoʊpfəl/', eiken: 3 },
      { en: 'care',      ja: '気にかける', ph: '/kɛr/',        eiken: 4 },
      { en: 'careful',   ja: '注意深い',   ph: '/ˈkɛrfəl/',   eiken: 4 },
      { en: 'power',     ja: '力',         ph: '/ˈpaʊər/',     eiken: 4 },
      { en: 'powerful',  ja: '力強い',     ph: '/ˈpaʊərfəl/', eiken: 3 },
      { en: 'wonder',    ja: '不思議',     ph: '/ˈwʌndər/',    eiken: 4 },
      { en: 'wonderful', ja: 'すばらしい', ph: '/ˈwʌndərfəl/', eiken: 4 },
      { en: 'beauty',    ja: '美しさ',     ph: '/ˈbjuːti/',    eiken: 4 },
      { en: 'beautiful', ja: '美しい',     ph: '/ˈbjuːtɪfəl/', eiken: 5 },
      { en: 'peace',     ja: '平和',       ph: '/piːs/',       eiken: 4 },
      { en: 'peaceful',  ja: '平和な',     ph: '/ˈpiːsfəl/',  eiken: 3 },
      { en: 'cheer',     ja: '応援する',   ph: '/tʃɪr/',       eiken: 3 },
      { en: 'cheerful',  ja: '陽気な',     ph: '/ˈtʃɪrfəl/',  eiken: 3 },
    ]
  },
  {
    id: 'ly_suffix', theme: '-ly 接尾辞チェーン',
    words: [
      { en: 'quick',   ja: '速い',       ph: '/kwɪk/',      eiken: 4 },
      { en: 'quickly', ja: 'すばやく',   ph: '/ˈkwɪkli/',   eiken: 4 },
      { en: 'slow',    ja: '遅い',       ph: '/sloʊ/',      eiken: 5 },
      { en: 'slowly',  ja: 'ゆっくり',   ph: '/ˈsloʊli/',   eiken: 4 },
      { en: 'kind',    ja: '親切な',     ph: '/kaɪnd/',     eiken: 5 },
      { en: 'kindly',  ja: '親切に',     ph: '/ˈkaɪndli/',  eiken: 3 },
      { en: 'brave',   ja: '勇敢な',     ph: '/breɪv/',     eiken: 3 },
      { en: 'bravely', ja: '勇敢に',     ph: '/ˈbreɪvli/',  eiken: 3 },
      { en: 'safe',    ja: '安全な',     ph: '/seɪf/',      eiken: 4 },
      { en: 'safely',  ja: '安全に',     ph: '/ˈseɪfli/',   eiken: 4 },
      { en: 'loud',    ja: 'うるさい',   ph: '/laʊd/',      eiken: 4 },
      { en: 'loudly',  ja: '大声で',     ph: '/ˈlaʊdli/',   eiken: 4 },
      { en: 'final',   ja: '最終の',     ph: '/ˈfaɪnl/',    eiken: 4 },
      { en: 'finally', ja: 'ついに',     ph: '/ˈfaɪnəli/',  eiken: 4 },
    ]
  },
  {
    id: 'er_doer_suffix', theme: '-er（する人）チェーン',
    words: [
      { en: 'teach',   ja: '教える',   ph: '/tiːtʃ/',     eiken: 5 },
      { en: 'teacher', ja: '先生',     ph: '/ˈtiːtʃər/',  eiken: 5 },
      { en: 'sing',    ja: '歌う',     ph: '/sɪŋ/',       eiken: 5 },
      { en: 'singer',  ja: '歌手',     ph: '/ˈsɪŋər/',    eiken: 4 },
      { en: 'work',    ja: '働く',     ph: '/wɜːrk/',     eiken: 5 },
      { en: 'worker',  ja: '労働者',   ph: '/ˈwɜːrkər/',  eiken: 4 },
      { en: 'read',    ja: '読む',     ph: '/riːd/',      eiken: 5 },
      { en: 'reader',  ja: '読者',     ph: '/ˈriːdər/',   eiken: 4 },
      { en: 'lead',    ja: '導く',     ph: '/liːd/',      eiken: 4 },
      { en: 'leader',  ja: 'リーダー', ph: '/ˈliːdər/',   eiken: 4 },
      { en: 'drive',   ja: '運転する', ph: '/draɪv/',     eiken: 4 },
      { en: 'driver',  ja: '運転手',   ph: '/ˈdraɪvər/',  eiken: 4 },
      { en: 'farm',    ja: '農場',     ph: '/fɑːrm/',     eiken: 4 },
      { en: 'farmer',  ja: '農家',     ph: '/ˈfɑːrmər/',  eiken: 4 },
    ]
  },
  {
    id: 'est_suffix', theme: '-est 最上級チェーン',
    words: [
      { en: 'fast',      ja: '速い',       ph: '/fæst/',       eiken: 5 },
      { en: 'fastest',   ja: '最も速い',   ph: '/ˈfæstɪst/',   eiken: 4 },
      { en: 'tall',      ja: '高い',       ph: '/tɔːl/',       eiken: 5 },
      { en: 'tallest',   ja: '最も高い',   ph: '/ˈtɔːlɪst/',   eiken: 4 },
      { en: 'big',       ja: '大きい',     ph: '/bɪɡ/',        eiken: 5 },
      { en: 'biggest',   ja: '最も大きい', ph: '/ˈbɪɡɪst/',    eiken: 4 },
      { en: 'small',     ja: '小さい',     ph: '/smɔːl/',      eiken: 5 },
      { en: 'smallest',  ja: '最も小さい', ph: '/ˈsmɔːlɪst/',  eiken: 4 },
      { en: 'long',      ja: '長い',       ph: '/lɔːŋ/',       eiken: 5 },
      { en: 'longest',   ja: '最も長い',   ph: '/ˈlɔːŋɡɪst/', eiken: 4 },
      { en: 'strong',    ja: '強い',       ph: '/strɔːŋ/',     eiken: 4 },
      { en: 'strongest', ja: '最も強い',   ph: '/ˈstrɔːŋɡɪst/', eiken: 4 },
    ]
  },
  {
    id: 'ness_suffix', theme: '-ness 接尾辞チェーン',
    words: [
      { en: 'kind',      ja: '親切な',   ph: '/kaɪnd/',       eiken: 5 },
      { en: 'kindness',  ja: '親切',     ph: '/ˈkaɪndnɪs/',  eiken: 3 },
      { en: 'dark',      ja: '暗い',     ph: '/dɑːrk/',       eiken: 4 },
      { en: 'darkness',  ja: '暗闇',     ph: '/ˈdɑːrknɪs/',  eiken: 3 },
      { en: 'happy',     ja: '幸せな',   ph: '/ˈhæpi/',       eiken: 5 },
      { en: 'happiness', ja: '幸福',     ph: '/ˈhæpinɪs/',   eiken: 3 },
      { en: 'sad',       ja: '悲しい',   ph: '/sæd/',         eiken: 5 },
      { en: 'sadness',   ja: '悲しみ',   ph: '/ˈsædnɪs/',    eiken: 3 },
      { en: 'weak',      ja: '弱い',     ph: '/wiːk/',        eiken: 4 },
      { en: 'weakness',  ja: '弱さ',     ph: '/ˈwiːknɪs/',   eiken: 3 },
      { en: 'ill',       ja: '病気の',   ph: '/ɪl/',          eiken: 4 },
      { en: 'illness',   ja: '病気',     ph: '/ˈɪlnɪs/',     eiken: 3 },
    ]
  },
  {
    id: 'able_suffix', theme: '-able 接尾辞チェーン',
    words: [
      { en: 'read',        ja: '読む',       ph: '/riːd/',          eiken: 5 },
      { en: 'readable',    ja: '読みやすい', ph: '/ˈriːdəbl/',      eiken: 3 },
      { en: 'comfort',     ja: '快適さ',     ph: '/ˈkʌmfərt/',     eiken: 3 },
      { en: 'comfortable', ja: '快適な',     ph: '/ˈkʌmftərəbl/',  eiken: 3 },
      { en: 'reason',      ja: '理由',       ph: '/ˈriːzn/',        eiken: 4 },
      { en: 'reasonable',  ja: '合理的な',   ph: '/ˈriːznəbl/',     eiken: 3 },
      { en: 'enjoy',       ja: '楽しむ',     ph: '/ɪnˈdʒɔɪ/',      eiken: 5 },
      { en: 'enjoyable',   ja: '楽しい',     ph: '/ɪnˈdʒɔɪəbl/',   eiken: 3 },
      { en: 'believe',     ja: '信じる',     ph: '/bɪˈliːv/',       eiken: 4 },
      { en: 'believable',  ja: '信じられる', ph: '/bɪˈliːvəbl/',    eiken: 2 },
    ]
  },

  // ===== Consonant blend families =====
  {
    id: 'bl_family', theme: 'bl- ファミリー',
    words: [
      { en: 'blue',  ja: '青',       ph: '/bluː/',  eiken: 5 },
      { en: 'black', ja: '黒',       ph: '/blæk/',  eiken: 5 },
      { en: 'block', ja: 'ブロック', ph: '/blɑːk/', eiken: 3 },
      { en: 'blind', ja: '目の見えない', ph: '/blaɪnd/', eiken: 3 },
      { en: 'blood', ja: '血',       ph: '/blʌd/',  eiken: 4 },
      { en: 'blow',  ja: '吹く',     ph: '/bloʊ/',  eiken: 4 },
      { en: 'blade', ja: '刃',       ph: '/bleɪd/', eiken: 2 },
      { en: 'blame', ja: '非難する', ph: '/bleɪm/', eiken: 3 },
      { en: 'blank', ja: '空白の',   ph: '/blæŋk/', eiken: 3 },
      { en: 'blast', ja: '爆発',     ph: '/blæst/', eiken: 2 },
      { en: 'blend', ja: '混ぜる',   ph: '/blɛnd/', eiken: 2 },
      { en: 'bless', ja: '祝福する', ph: '/blɛs/',  eiken: 2 },
    ]
  },
  {
    id: 'br_family', theme: 'br- ファミリー',
    words: [
      { en: 'bring',   ja: '持ってくる', ph: '/brɪŋ/',    eiken: 5 },
      { en: 'brown',   ja: '茶色',       ph: '/braʊn/',   eiken: 5 },
      { en: 'break',   ja: '壊す',       ph: '/breɪk/',   eiken: 4 },
      { en: 'bread',   ja: 'パン',       ph: '/brɛd/',    eiken: 5 },
      { en: 'brain',   ja: '脳',         ph: '/breɪn/',   eiken: 4 },
      { en: 'brave',   ja: '勇敢な',     ph: '/breɪv/',   eiken: 3 },
      { en: 'brick',   ja: 'レンガ',     ph: '/brɪk/',    eiken: 3 },
      { en: 'bridge',  ja: '橋',         ph: '/brɪdʒ/',   eiken: 4 },
      { en: 'bright',  ja: '明るい',     ph: '/braɪt/',   eiken: 4 },
      { en: 'broad',   ja: '広い',       ph: '/brɔːd/',   eiken: 3 },
      { en: 'brush',   ja: 'ブラシ',     ph: '/brʌʃ/',    eiken: 4 },
      { en: 'branch',  ja: '枝',         ph: '/bræntʃ/',  eiken: 3 },
    ]
  },
  {
    id: 'cl_family', theme: 'cl- ファミリー',
    words: [
      { en: 'class', ja: 'クラス',   ph: '/klæs/',   eiken: 5 },
      { en: 'clean', ja: 'きれいな', ph: '/kliːn/',  eiken: 5 },
      { en: 'clear', ja: '澄んだ',  ph: '/klɪr/',   eiken: 4 },
      { en: 'climb', ja: '登る',     ph: '/klaɪm/',  eiken: 4 },
      { en: 'clock', ja: '時計',     ph: '/klɑːk/',  eiken: 5 },
      { en: 'close', ja: '閉じる',   ph: '/kloʊz/',  eiken: 5 },
      { en: 'cloud', ja: '雲',       ph: '/klaʊd/',  eiken: 5 },
      { en: 'club',  ja: 'クラブ',   ph: '/klʌb/',   eiken: 4 },
      { en: 'claim', ja: '主張する', ph: '/kleɪm/',  eiken: 2 },
      { en: 'clap',  ja: '拍手する', ph: '/klæp/',   eiken: 3 },
    ]
  },
  {
    id: 'cr_family', theme: 'cr- ファミリー',
    words: [
      { en: 'cross',  ja: '渡る',     ph: '/krɔːs/',   eiken: 4 },
      { en: 'cry',    ja: '泣く',     ph: '/kraɪ/',    eiken: 5 },
      { en: 'cream',  ja: 'クリーム', ph: '/kriːm/',   eiken: 4 },
      { en: 'create', ja: '創造する', ph: '/kriˈeɪt/', eiken: 3 },
      { en: 'crew',   ja: '乗組員',   ph: '/kruː/',    eiken: 3 },
      { en: 'crime',  ja: '犯罪',     ph: '/kraɪm/',   eiken: 3 },
      { en: 'crop',   ja: '作物',     ph: '/krɑːp/',   eiken: 3 },
      { en: 'crowd',  ja: '群衆',     ph: '/kraʊd/',   eiken: 3 },
      { en: 'crown',  ja: '王冠',     ph: '/kraʊn/',   eiken: 3 },
      { en: 'crush',  ja: '押しつぶす', ph: '/krʌʃ/',  eiken: 2 },
      { en: 'crash',  ja: '衝突する', ph: '/kræʃ/',    eiken: 3 },
      { en: 'craft',  ja: '工芸',     ph: '/kræft/',   eiken: 2 },
    ]
  },
  {
    id: 'dr_family', theme: 'dr- ファミリー',
    words: [
      { en: 'draw',  ja: '描く',     ph: '/drɔː/',  eiken: 5 },
      { en: 'dream', ja: '夢',       ph: '/driːm/', eiken: 4 },
      { en: 'dress', ja: 'ドレス',   ph: '/drɛs/',  eiken: 5 },
      { en: 'drink', ja: '飲む',     ph: '/drɪŋk/', eiken: 5 },
      { en: 'drive', ja: '運転する', ph: '/draɪv/', eiken: 4 },
      { en: 'drop',  ja: '落とす',   ph: '/drɑːp/', eiken: 4 },
      { en: 'dry',   ja: '乾いた',   ph: '/draɪ/',  eiken: 5 },
      { en: 'drug',  ja: '薬',       ph: '/drʌɡ/',  eiken: 3 },
      { en: 'drum',  ja: '太鼓',     ph: '/drʌm/',  eiken: 4 },
      { en: 'draft', ja: '下書き',   ph: '/dræft/', eiken: 2 },
      { en: 'drain', ja: '排水する', ph: '/dreɪn/', eiken: 2 },
      { en: 'drama', ja: 'ドラマ',   ph: '/ˈdrɑːmə/', eiken: 3 },
    ]
  },
  {
    id: 'fl_family', theme: 'fl- ファミリー',
    words: [
      { en: 'fly',    ja: '飛ぶ',   ph: '/flaɪ/',   eiken: 5 },
      { en: 'flag',   ja: '旗',     ph: '/flæɡ/',   eiken: 4 },
      { en: 'flat',   ja: '平らな', ph: '/flæt/',   eiken: 3 },
      { en: 'floor',  ja: '床',     ph: '/flɔːr/',  eiken: 5 },
      { en: 'flow',   ja: '流れる', ph: '/floʊ/',   eiken: 3 },
      { en: 'flower', ja: '花',     ph: '/ˈflaʊər/', eiken: 5 },
      { en: 'flash',  ja: '閃光',   ph: '/flæʃ/',   eiken: 3 },
      { en: 'flight', ja: '飛行',   ph: '/flaɪt/',  eiken: 4 },
      { en: 'float',  ja: '浮く',   ph: '/floʊt/',  eiken: 3 },
      { en: 'flood',  ja: '洪水',   ph: '/flʌd/',   eiken: 3 },
      { en: 'flame',  ja: '炎',     ph: '/fleɪm/',  eiken: 3 },
    ]
  },
  {
    id: 'gr_family', theme: 'gr- ファミリー',
    words: [
      { en: 'green', ja: '緑',       ph: '/ɡriːn/',  eiken: 5 },
      { en: 'grow',  ja: '育つ',     ph: '/ɡroʊ/',   eiken: 5 },
      { en: 'great', ja: '素晴らしい', ph: '/ɡreɪt/', eiken: 5 },
      { en: 'group', ja: 'グループ', ph: '/ɡruːp/',  eiken: 4 },
      { en: 'grass', ja: '草',       ph: '/ɡræs/',   eiken: 4 },
      { en: 'grand', ja: '壮大な',   ph: '/ɡrænd/',  eiken: 3 },
      { en: 'grade', ja: '学年',     ph: '/ɡreɪd/',  eiken: 4 },
      { en: 'grab',  ja: 'つかむ',   ph: '/ɡræb/',   eiken: 3 },
      { en: 'graph', ja: 'グラフ',   ph: '/ɡræf/',   eiken: 3 },
      { en: 'grave', ja: '墓',       ph: '/ɡreɪv/',  eiken: 2 },
      { en: 'grip',  ja: '握る',     ph: '/ɡrɪp/',   eiken: 3 },
      { en: 'groan', ja: 'うめく',   ph: '/ɡroʊn/',  eiken: 2 },
    ]
  },
  {
    id: 'sp_family', theme: 'sp- ファミリー',
    words: [
      { en: 'speak',   ja: '話す',     ph: '/spiːk/',    eiken: 5 },
      { en: 'speed',   ja: '速さ',     ph: '/spiːd/',    eiken: 4 },
      { en: 'spend',   ja: '使う',     ph: '/spɛnd/',    eiken: 4 },
      { en: 'spin',    ja: '回転する', ph: '/spɪn/',     eiken: 3 },
      { en: 'sport',   ja: 'スポーツ', ph: '/spɔːrt/',   eiken: 5 },
      { en: 'spot',    ja: '場所',     ph: '/spɑːt/',    eiken: 3 },
      { en: 'space',   ja: '宇宙',     ph: '/speɪs/',    eiken: 4 },
      { en: 'special', ja: '特別な',   ph: '/ˈspɛʃəl/',  eiken: 4 },
      { en: 'spell',   ja: 'つづる',   ph: '/spɛl/',     eiken: 4 },
      { en: 'spirit',  ja: '精神',     ph: '/ˈspɪrɪt/',  eiken: 3 },
      { en: 'split',   ja: '分ける',   ph: '/splɪt/',    eiken: 2 },
      { en: 'spread',  ja: '広げる',   ph: '/sprɛd/',    eiken: 3 },
      { en: 'spring',  ja: '春',       ph: '/sprɪŋ/',    eiken: 5 },
    ]
  },
  {
    id: 'st_family', theme: 'st- ファミリー',
    words: [
      { en: 'stop',   ja: '止まる',   ph: '/stɑːp/',   eiken: 5 },
      { en: 'stand',  ja: '立つ',     ph: '/stænd/',   eiken: 5 },
      { en: 'start',  ja: '始める',   ph: '/stɑːrt/',  eiken: 5 },
      { en: 'stay',   ja: '滞在する', ph: '/steɪ/',    eiken: 5 },
      { en: 'step',   ja: '歩み',     ph: '/stɛp/',    eiken: 4 },
      { en: 'still',  ja: 'まだ',     ph: '/stɪl/',    eiken: 5 },
      { en: 'stone',  ja: '石',       ph: '/stoʊn/',   eiken: 4 },
      { en: 'store',  ja: '店',       ph: '/stɔːr/',   eiken: 5 },
      { en: 'storm',  ja: '嵐',       ph: '/stɔːrm/',  eiken: 4 },
      { en: 'story',  ja: '物語',     ph: '/ˈstɔːri/', eiken: 5 },
      { en: 'street', ja: '通り',     ph: '/striːt/',  eiken: 5 },
      { en: 'strong', ja: '強い',     ph: '/strɔːŋ/',  eiken: 4 },
      { en: 'study',  ja: '勉強する', ph: '/ˈstʌdi/',  eiken: 5 },
      { en: 'style',  ja: 'スタイル', ph: '/staɪl/',   eiken: 3 },
    ]
  },
  {
    id: 'tr_family', theme: 'tr- ファミリー',
    words: [
      { en: 'try',     ja: '試す',     ph: '/traɪ/',     eiken: 5 },
      { en: 'tree',    ja: '木',       ph: '/triː/',     eiken: 5 },
      { en: 'train',   ja: '電車',     ph: '/treɪn/',    eiken: 5 },
      { en: 'track',   ja: '線路',     ph: '/træk/',     eiken: 3 },
      { en: 'trade',   ja: '貿易',     ph: '/treɪd/',    eiken: 3 },
      { en: 'trap',    ja: '罠',       ph: '/træp/',     eiken: 3 },
      { en: 'travel',  ja: '旅行する', ph: '/ˈtrævl/',   eiken: 4 },
      { en: 'treat',   ja: '扱う',     ph: '/triːt/',    eiken: 3 },
      { en: 'trick',   ja: 'トリック', ph: '/trɪk/',     eiken: 3 },
      { en: 'trip',    ja: '旅行',     ph: '/trɪp/',     eiken: 4 },
      { en: 'true',    ja: '本当の',   ph: '/truː/',     eiken: 5 },
      { en: 'trust',   ja: '信頼する', ph: '/trʌst/',    eiken: 3 },
      { en: 'trouble', ja: '問題',     ph: '/ˈtrʌbl/',   eiken: 4 },
    ]
  },
  {
    id: 'sw_family', theme: 'sw- ファミリー',
    words: [
      { en: 'swim',   ja: '泳ぐ',     ph: '/swɪm/',   eiken: 5 },
      { en: 'sweet',  ja: '甘い',     ph: '/swiːt/',  eiken: 5 },
      { en: 'swing',  ja: 'ブランコ', ph: '/swɪŋ/',   eiken: 4 },
      { en: 'switch', ja: 'スイッチ', ph: '/swɪtʃ/',  eiken: 3 },
      { en: 'sweep',  ja: '掃く',     ph: '/swiːp/',  eiken: 3 },
      { en: 'swear',  ja: '誓う',     ph: '/swɛr/',   eiken: 2 },
      { en: 'sword',  ja: '剣',       ph: '/sɔːrd/',  eiken: 3 },
    ]
  },
  {
    id: 'sn_family', theme: 'sn- ファミリー',
    words: [
      { en: 'snow',   ja: '雪',       ph: '/snoʊ/',   eiken: 5 },
      { en: 'snake',  ja: 'ヘビ',     ph: '/sneɪk/',  eiken: 4 },
      { en: 'snap',   ja: 'パチンと折る', ph: '/snæp/', eiken: 3 },
      { en: 'snack',  ja: 'おやつ',   ph: '/snæk/',   eiken: 4 },
      { en: 'sneeze', ja: 'くしゃみ', ph: '/sniːz/',  eiken: 3 },
    ]
  },
  {
    id: 'sm_family', theme: 'sm- ファミリー',
    words: [
      { en: 'small',  ja: '小さい',   ph: '/smɔːl/',   eiken: 5 },
      { en: 'smart',  ja: '賢い',     ph: '/smɑːrt/',  eiken: 4 },
      { en: 'smile',  ja: '微笑む',   ph: '/smaɪl/',   eiken: 5 },
      { en: 'smell',  ja: '匂い',     ph: '/smɛl/',    eiken: 4 },
      { en: 'smooth', ja: '滑らかな', ph: '/smuːð/',   eiken: 3 },
      { en: 'smoke',  ja: '煙',       ph: '/smoʊk/',   eiken: 4 },
      { en: 'smash',  ja: '粉砕する', ph: '/smæʃ/',    eiken: 2 },
    ]
  },
  {
    id: 'pl_family', theme: 'pl- ファミリー',
    words: [
      { en: 'plan',   ja: '計画',     ph: '/plæn/',    eiken: 4 },
      { en: 'play',   ja: '遊ぶ',     ph: '/pleɪ/',    eiken: 5 },
      { en: 'place',  ja: '場所',     ph: '/pleɪs/',   eiken: 5 },
      { en: 'plant',  ja: '植物',     ph: '/plænt/',   eiken: 4 },
      { en: 'please', ja: 'どうぞ',   ph: '/pliːz/',   eiken: 5 },
      { en: 'plus',   ja: 'プラス',   ph: '/plʌs/',    eiken: 4 },
      { en: 'plate',  ja: '皿',       ph: '/pleɪt/',   eiken: 4 },
      { en: 'plain',  ja: '平野',     ph: '/pleɪn/',   eiken: 3 },
    ]
  },
  {
    id: 'pr_family', theme: 'pr- ファミリー',
    words: [
      { en: 'price',   ja: '値段',     ph: '/praɪs/',     eiken: 4 },
      { en: 'print',   ja: '印刷する', ph: '/prɪnt/',     eiken: 4 },
      { en: 'present', ja: 'プレゼント', ph: '/ˈprɛznt/', eiken: 4 },
      { en: 'press',   ja: '押す',     ph: '/prɛs/',      eiken: 3 },
      { en: 'pretty',  ja: 'かわいい', ph: '/ˈprɪti/',    eiken: 5 },
      { en: 'prince',  ja: '王子',     ph: '/prɪns/',     eiken: 4 },
      { en: 'prize',   ja: '賞',       ph: '/praɪz/',     eiken: 3 },
      { en: 'proud',   ja: '誇りに思う', ph: '/praʊd/',   eiken: 3 },
      { en: 'prove',   ja: '証明する', ph: '/pruːv/',     eiken: 3 },
      { en: 'protect', ja: '守る',     ph: '/prəˈtɛkt/',  eiken: 3 },
    ]
  },
  {
    id: 'sl_family', theme: 'sl- ファミリー',
    words: [
      { en: 'sleep', ja: '眠る',   ph: '/sliːp/',  eiken: 5 },
      { en: 'slow',  ja: '遅い',   ph: '/sloʊ/',   eiken: 5 },
      { en: 'slide', ja: '滑る',   ph: '/slaɪd/',  eiken: 4 },
      { en: 'slip',  ja: '滑る',   ph: '/slɪp/',   eiken: 3 },
      { en: 'slim',  ja: '細い',   ph: '/slɪm/',   eiken: 3 },
      { en: 'slice', ja: '一切れ', ph: '/slaɪs/',  eiken: 3 },
      { en: 'slope', ja: '坂',     ph: '/sloʊp/',  eiken: 3 },
    ]
  },
  {
    id: 'tw_family', theme: 'tw- ファミリー',
    words: [
      { en: 'two',    ja: '2',       ph: '/tuː/',    eiken: 5 },
      { en: 'twelve', ja: '12',      ph: '/twɛlv/',  eiken: 5 },
      { en: 'twin',   ja: '双子',   ph: '/twɪn/',   eiken: 3 },
      { en: 'twice',  ja: '2回',     ph: '/twaɪs/',  eiken: 4 },
      { en: 'twist',  ja: 'ねじる', ph: '/twɪst/',  eiken: 3 },
    ]
  },
];

// Flatten all words with family reference for quick lookup
const ALL_WORDS = [];
CHAIN_FAMILIES.forEach(fam => {
  fam.words.forEach((w, idx) => {
    ALL_WORDS.push({
      ...w,
      familyId: fam.id,
      familyTheme: fam.theme,
      indexInFamily: idx
    });
  });
});

// Eiken level order for comparison
const EIKEN_ORDER = { '5': 0, '4': 1, '3': 2, 'p2': 3, '2': 4, 'p1': 5, '1': 6 };
const EIKEN_LABELS = {
  '5': '英検5級', '4': '英検4級', '3': '英検3級',
  'p2': '英検準2級', '2': '英検2級', 'p1': '英検準1級', '1': '英検1級'
};

function eikenDifficulty(level) {
  return EIKEN_ORDER[String(level)] ?? 0;
}
