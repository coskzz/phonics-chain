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
