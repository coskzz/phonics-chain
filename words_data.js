// Phonics Chain — Word Data
// eiken: 5=5級, 4=4級, 3=3級, p2=準2級, 2=2級, p1=準1級, 1=1級
// Each chain: array of words linked by letter addition/change/extension

const CHAIN_FAMILIES = [
  // ---- Simple CVC / short vowel chains ----
  {
    id: 'at_family',
    theme: '-at ファミリー',
    words: [
      { en: 'at',    ja: '〜に・〜で', ph: '/æt/',    eiken: 5, pos: '前置詞' },
      { en: 'cat',   ja: '猫',         ph: '/kæt/',   eiken: 5, pos: '名詞' },
      { en: 'bat',   ja: 'コウモリ',   ph: '/bæt/',   eiken: 4, pos: '名詞' },
      { en: 'hat',   ja: '帽子',       ph: '/hæt/',   eiken: 5, pos: '名詞' },
      { en: 'mat',   ja: 'マット',     ph: '/mæt/',   eiken: 3, pos: '名詞' },
      { en: 'flat',  ja: '平らな',     ph: '/flæt/',  eiken: 3, pos: '形容詞' },
      { en: 'chat',  ja: 'おしゃべり', ph: '/tʃæt/',  eiken: 3, pos: '動詞' },
      { en: 'that',  ja: 'あれ',       ph: '/ðæt/',   eiken: 5, pos: '代名詞' },
    ]
  },
  {
    id: 'an_family',
    theme: '-an ファミリー',
    words: [
      { en: 'an',    ja: '1つの',      ph: '/æn/',    eiken: 5, pos: '冠詞' },
      { en: 'can',   ja: 'できる',     ph: '/kæn/',   eiken: 5, pos: '動詞' },
      { en: 'man',   ja: '男性',       ph: '/mæn/',   eiken: 5, pos: '名詞' },
      { en: 'ran',   ja: '走った',     ph: '/ræn/',   eiken: 5, pos: '動詞' },
      { en: 'fan',   ja: 'ファン',     ph: '/fæn/',   eiken: 4, pos: '名詞' },
      { en: 'pan',   ja: '鍋',         ph: '/pæn/',   eiken: 4, pos: '名詞' },
      { en: 'plan',  ja: '計画',       ph: '/plæn/',  eiken: 4, pos: '名詞' },
      { en: 'scan',  ja: 'スキャン',   ph: '/skæn/',  eiken: 'p2', pos: '動詞' },
      { en: 'ban',   ja: '禁止する',   ph: '/bæn/',   eiken: 2, pos: '動詞' },
      { en: 'clan',  ja: '一族',       ph: '/klæn/',  eiken: 'p1', pos: '名詞' },
    ]
  },
  {
    id: 'in_family',
    theme: '-in ファミリー',
    words: [
      { en: 'in',    ja: '〜の中に',   ph: '/ɪn/',    eiken: 5, pos: '前置詞' },
      { en: 'pin',   ja: 'ピン',       ph: '/pɪn/',   eiken: 4, pos: '名詞' },
      { en: 'win',   ja: '勝つ',       ph: '/wɪn/',   eiken: 4, pos: '動詞' },
      { en: 'tin',   ja: '缶',         ph: '/tɪn/',   eiken: 3, pos: '名詞' },
      { en: 'thin',  ja: '薄い',       ph: '/θɪn/',   eiken: 4, pos: '形容詞' },
      { en: 'spin',  ja: '回転する',   ph: '/spɪn/',  eiken: 3, pos: '動詞' },
      { en: 'twin',  ja: '双子',       ph: '/twɪn/',  eiken: 3, pos: '名詞' },
      { en: 'grin',  ja: 'にやりと笑う', ph: '/ɡrɪn/', eiken: 2, pos: '動詞' },
    ]
  },
  {
    id: 'it_family',
    theme: '-it ファミリー',
    words: [
      { en: 'it',    ja: 'それ',       ph: '/ɪt/',    eiken: 5, pos: '代名詞' },
      { en: 'sit',   ja: '座る',       ph: '/sɪt/',   eiken: 5, pos: '動詞' },
      { en: 'hit',   ja: '打つ',       ph: '/hɪt/',   eiken: 4, pos: '動詞' },
      { en: 'bit',   ja: '少し',       ph: '/bɪt/',   eiken: 4, pos: '名詞' },
      { en: 'fit',   ja: '合う',       ph: '/fɪt/',   eiken: 3, pos: '動詞' },
      { en: 'kit',   ja: 'セット',     ph: '/kɪt/',   eiken: 3, pos: '名詞' },
      { en: 'spit',  ja: '吐く',       ph: '/spɪt/',  eiken: 2, pos: '動詞' },
      { en: 'knit',  ja: '編む',       ph: '/nɪt/',   eiken: 2, pos: '動詞' },
      { en: 'slit',  ja: '切れ目',     ph: '/slɪt/',  eiken: 'p1', pos: '名詞' },
    ]
  },
  {
    id: 'ot_family',
    theme: '-ot ファミリー',
    words: [
      { en: 'hot',   ja: '暑い・熱い', ph: '/hɑːt/',  eiken: 5, pos: '形容詞' },
      { en: 'not',   ja: '〜ではない', ph: '/nɑːt/',  eiken: 5, pos: '副詞' },
      { en: 'got',   ja: '得た',       ph: '/ɡɑːt/',  eiken: 5, pos: '動詞' },
      { en: 'dot',   ja: '点',         ph: '/dɑːt/',  eiken: 4, pos: '名詞' },
      { en: 'lot',   ja: 'たくさん',   ph: '/lɑːt/',  eiken: 5, pos: '名詞' },
      { en: 'pot',   ja: '鍋',         ph: '/pɑːt/',  eiken: 4, pos: '名詞' },
      { en: 'shot',  ja: '発砲・ショット', ph: '/ʃɑːt/', eiken: 3, pos: '名詞' },
      { en: 'spot',  ja: '場所・見つける', ph: '/spɑːt/', eiken: 3, pos: '名詞' },
      { en: 'knot',  ja: '結び目',     ph: '/nɑːt/',  eiken: 2, pos: '名詞' },
      { en: 'slot',  ja: 'スロット',   ph: '/slɑːt/', eiken: 'p1', pos: '名詞' },
    ]
  },
  {
    id: 'un_family',
    theme: '-un ファミリー',
    words: [
      { en: 'run',   ja: '走る',       ph: '/rʌn/',   eiken: 5, pos: '動詞' },
      { en: 'fun',   ja: '楽しい',     ph: '/fʌn/',   eiken: 5, pos: '形容詞' },
      { en: 'sun',   ja: '太陽',       ph: '/sʌn/',   eiken: 5, pos: '名詞' },
      { en: 'gun',   ja: '銃',         ph: '/ɡʌn/',   eiken: 4, pos: '名詞' },
      { en: 'bun',   ja: '丸パン',     ph: '/bʌn/',   eiken: 3, pos: '名詞' },
      { en: 'stun',  ja: '気絶させる', ph: '/stʌn/',  eiken: 2, pos: '動詞' },
      { en: 'spun',  ja: 'spinの過去形', ph: '/spʌn/', eiken: 2, pos: '動詞' },
    ]
  },
  {
    id: 'op_family',
    theme: '-op ファミリー',
    words: [
      { en: 'top',   ja: '頂上',       ph: '/tɑːp/',  eiken: 5, pos: '名詞' },
      { en: 'hop',   ja: 'ぴょんと跳ぶ', ph: '/hɑːp/', eiken: 4, pos: '動詞' },
      { en: 'pop',   ja: 'ポン（と音がする）', ph: '/pɑːp/', eiken: 4, pos: '動詞' },
      { en: 'stop',  ja: '止まる',     ph: '/stɑːp/', eiken: 5, pos: '動詞' },
      { en: 'shop',  ja: '店',         ph: '/ʃɑːp/',  eiken: 5, pos: '名詞' },
      { en: 'drop',  ja: '落とす',     ph: '/drɑːp/', eiken: 4, pos: '名詞' },
      { en: 'crop',  ja: '作物',       ph: '/krɑːp/', eiken: 3, pos: '名詞' },
      { en: 'chop',  ja: '切る',       ph: '/tʃɑːp/', eiken: 3, pos: '動詞' },
    ]
  },
  {
    id: 'ug_family',
    theme: '-ug ファミリー',
    words: [
      { en: 'bug',   ja: '虫',         ph: '/bʌɡ/',   eiken: 4, pos: '名詞' },
      { en: 'hug',   ja: '抱きしめる', ph: '/hʌɡ/',   eiken: 4, pos: '動詞' },
      { en: 'mug',   ja: 'マグカップ', ph: '/mʌɡ/',   eiken: 3, pos: '名詞' },
      { en: 'rug',   ja: 'じゅうたん', ph: '/rʌɡ/',   eiken: 3, pos: '名詞' },
      { en: 'plug',  ja: 'プラグ',     ph: '/plʌɡ/',  eiken: 3, pos: '名詞' },
      { en: 'drug',  ja: '薬・ドラッグ', ph: '/drʌɡ/', eiken: 3, pos: '名詞' },
      { en: 'slug',  ja: 'ナメクジ',   ph: '/slʌɡ/',  eiken: 'p1', pos: '名詞' },
      { en: 'shrug', ja: '肩をすくめる', ph: '/ʃrʌɡ/', eiken: 'p1', pos: '動詞' },
    ]
  },
  // ---- Long vowel / magic-e chains ----
  {
    id: 'ake_family',
    theme: '-ake ファミリー',
    words: [
      { en: 'make',  ja: '作る',       ph: '/meɪk/',  eiken: 5, pos: '動詞' },
      { en: 'take',  ja: '取る',       ph: '/teɪk/',  eiken: 5, pos: '動詞' },
      { en: 'cake',  ja: 'ケーキ',     ph: '/keɪk/',  eiken: 5, pos: '名詞' },
      { en: 'lake',  ja: '湖',         ph: '/leɪk/',  eiken: 4, pos: '名詞' },
      { en: 'bake',  ja: '焼く',       ph: '/beɪk/',  eiken: 4, pos: '動詞' },
      { en: 'wake',  ja: '起きる',     ph: '/weɪk/',  eiken: 4, pos: '動詞' },
      { en: 'shake', ja: '振る',       ph: '/ʃeɪk/',  eiken: 3, pos: '動詞' },
      { en: 'snake', ja: 'ヘビ',       ph: '/sneɪk/', eiken: 4, pos: '名詞' },
      { en: 'stake', ja: '賭け・杭',   ph: '/steɪk/', eiken: 2, pos: '名詞' },
    ]
  },
  {
    id: 'ine_family',
    theme: '-ine ファミリー',
    words: [
      { en: 'line',  ja: '線',         ph: '/laɪn/',  eiken: 5, pos: '名詞' },
      { en: 'fine',  ja: '元気な・罰金', ph: '/faɪn/', eiken: 5, pos: '形容詞' },
      { en: 'mine',  ja: '私のもの',   ph: '/maɪn/',  eiken: 5, pos: '名詞' },
      { en: 'nine',  ja: '9',          ph: '/naɪn/',  eiken: 5, pos: '名詞' },
      { en: 'wine',  ja: 'ワイン',     ph: '/waɪn/',  eiken: 4, pos: '名詞' },
      { en: 'pine',  ja: '松',         ph: '/paɪn/',  eiken: 3, pos: '名詞' },
      { en: 'shine', ja: '輝く',       ph: '/ʃaɪn/',  eiken: 3, pos: '動詞' },
      { en: 'spine', ja: '背骨',       ph: '/spaɪn/', eiken: 2, pos: '名詞' },
      { en: 'vine',  ja: 'つる',       ph: '/vaɪn/',  eiken: 2, pos: '名詞' },
      { en: 'divine', ja: '神聖な',    ph: '/dɪˈvaɪn/', eiken: 'p1', pos: '形容詞' },
    ]
  },
  {
    id: 'ight_family',
    theme: '-ight ファミリー',
    words: [
      { en: 'right', ja: '正しい・右', ph: '/raɪt/',  eiken: 5, pos: '名詞' },
      { en: 'night', ja: '夜',         ph: '/naɪt/',  eiken: 5, pos: '名詞' },
      { en: 'light', ja: '光',         ph: '/laɪt/',  eiken: 5, pos: '名詞' },
      { en: 'fight', ja: '戦う',       ph: '/faɪt/',  eiken: 4, pos: '名詞' },
      { en: 'sight', ja: '視力・景色', ph: '/saɪt/',  eiken: 3, pos: '名詞' },
      { en: 'might', ja: '〜かもしれない', ph: '/maɪt/', eiken: 4, pos: '名詞' },
      { en: 'tight', ja: 'きつい',     ph: '/taɪt/',  eiken: 3, pos: '形容詞' },
      { en: 'flight', ja: '飛行',      ph: '/flaɪt/', eiken: 3, pos: '名詞' },
      { en: 'bright', ja: '明るい',    ph: '/braɪt/', eiken: 3, pos: '形容詞' },
      { en: 'slight', ja: 'わずかな',  ph: '/slaɪt/', eiken: 2, pos: '形容詞' },
      { en: 'knight', ja: '騎士',      ph: '/naɪt/',  eiken: 2, pos: '名詞' },
      { en: 'fright', ja: '恐怖',      ph: '/fraɪt/', eiken: 2, pos: '名詞' },
      { en: 'blight', ja: '荒廃',      ph: '/blaɪt/', eiken: 1, pos: '名詞' },
      { en: 'plight', ja: '苦境',      ph: '/plaɪt/', eiken: 1, pos: '名詞' },
    ]
  },
  {
    id: 'ore_family',
    theme: '-ore ファミリー',
    words: [
      { en: 'more',  ja: 'もっと',     ph: '/mɔːr/',  eiken: 5, pos: '副詞' },
      { en: 'store', ja: '店',         ph: '/stɔːr/', eiken: 5, pos: '名詞' },
      { en: 'score', ja: '点数',       ph: '/skɔːr/', eiken: 4, pos: '動詞' },
      { en: 'bore',  ja: '退屈させる', ph: '/bɔːr/',  eiken: 3, pos: '名詞' },
      { en: 'core',  ja: '核心',       ph: '/kɔːr/',  eiken: 'p2', pos: '名詞' },
      { en: 'shore', ja: '海岸',       ph: '/ʃɔːr/',  eiken: 3, pos: '名詞' },
      { en: 'snore', ja: 'いびきをかく', ph: '/snɔːr/', eiken: 2, pos: '動詞' },
      { en: 'ignore', ja: '無視する',  ph: '/ɪɡˈnɔːr/', eiken: 3, pos: '動詞' },
      { en: 'explore', ja: '探検する', ph: '/ɪkˈsplɔːr/', eiken: 3, pos: '動詞' },
      { en: 'restore', ja: '復元する', ph: '/rɪˈstɔːr/', eiken: 2, pos: '動詞' },
      { en: 'implore', ja: '懇願する', ph: '/ɪmˈplɔːr/', eiken: 1, pos: '名詞' },
    ]
  },
  // ---- Rain chain (from brainstorming) ----
  {
    id: 'ain_family',
    theme: '-ain ファミリー',
    words: [
      { en: 'rain',   ja: '雨',         ph: '/reɪn/',   eiken: 5, pos: '名詞' },
      { en: 'main',   ja: '主な',       ph: '/meɪn/',   eiken: 4, pos: '形容詞' },
      { en: 'pain',   ja: '痛み',       ph: '/peɪn/',   eiken: 4, pos: '名詞' },
      { en: 'gain',   ja: '得る',       ph: '/ɡeɪn/',   eiken: 3, pos: '名詞' },
      { en: 'train',  ja: '電車',       ph: '/treɪn/',  eiken: 5, pos: '名詞' },
      { en: 'brain',  ja: '脳',         ph: '/breɪn/',  eiken: 3, pos: '名詞' },
      { en: 'chain',  ja: '鎖',         ph: '/tʃeɪn/',  eiken: 3, pos: '名詞' },
      { en: 'plain',  ja: '明白な',     ph: '/pleɪn/',  eiken: 'p2', pos: '形容詞' },
      { en: 'strain', ja: '負担・緊張', ph: '/streɪn/', eiken: 2, pos: '名詞' },
      { en: 'obtain', ja: '得る',       ph: '/əbˈteɪn/', eiken: 2, pos: '動詞' },
      { en: 'sustain', ja: '維持する',  ph: '/səˈsteɪn/', eiken: 'p1', pos: '動詞' },
      { en: 'refrain', ja: '控える',   ph: '/rɪˈfreɪn/', eiken: 'p1', pos: '動詞' },
      { en: 'constrain', ja: '制約する', ph: '/kənˈstreɪn/', eiken: 1, pos: '動詞' },
      { en: 'disdain', ja: '軽蔑',     ph: '/dɪsˈdeɪn/', eiken: 1, pos: '動詞' },
    ]
  },
  {
    id: 'and_family',
    theme: '-and ファミリー',
    words: [
      { en: 'and',    ja: 'そして',     ph: '/ænd/',   eiken: 5, pos: '接続詞' },
      { en: 'hand',   ja: '手',         ph: '/hænd/',  eiken: 5, pos: '名詞' },
      { en: 'band',   ja: 'バンド',     ph: '/bænd/',  eiken: 4, pos: '名詞' },
      { en: 'land',   ja: '土地',       ph: '/lænd/',  eiken: 4, pos: '名詞' },
      { en: 'sand',   ja: '砂',         ph: '/sænd/',  eiken: 4, pos: '名詞' },
      { en: 'stand',  ja: '立つ',       ph: '/stænd/', eiken: 5, pos: '動詞' },
      { en: 'brand',  ja: 'ブランド',   ph: '/brænd/', eiken: 3, pos: '名詞' },
      { en: 'grand',  ja: '壮大な',     ph: '/ɡrænd/', eiken: 3, pos: '形容詞' },
      { en: 'demand', ja: '要求する',   ph: '/dɪˈmænd/', eiken: 3, pos: '動詞' },
      { en: 'expand', ja: '拡大する',   ph: '/ɪkˈspænd/', eiken: 2, pos: '動詞' },
      { en: 'command', ja: '命令する',  ph: '/kəˈmænd/', eiken: 2, pos: '動詞' },
      { en: 'reprimand', ja: '叱責する', ph: '/ˈrɛprɪmænd/', eiken: 1, pos: '動詞' },
    ]
  },
  {
    id: 'ear_family',
    theme: '-ear ファミリー',
    words: [
      { en: 'ear',   ja: '耳',         ph: '/ɪr/',    eiken: 5, pos: '名詞' },
      { en: 'hear',  ja: '聞く',       ph: '/hɪr/',   eiken: 5, pos: '動詞' },
      { en: 'near',  ja: '近い',       ph: '/nɪr/',   eiken: 5, pos: '形容詞' },
      { en: 'dear',  ja: '親愛なる',   ph: '/dɪr/',   eiken: 4, pos: '形容詞' },
      { en: 'fear',  ja: '恐怖',       ph: '/fɪr/',   eiken: 3, pos: '名詞' },
      { en: 'year',  ja: '年',         ph: '/jɪr/',   eiken: 5, pos: '名詞' },
      { en: 'clear', ja: '明らかな',   ph: '/klɪr/',  eiken: 4, pos: '形容詞' },
      { en: 'appear', ja: '現れる',    ph: '/əˈpɪr/', eiken: 3, pos: '動詞' },
      { en: 'disappear', ja: '消える', ph: '/dɪsəˈpɪr/', eiken: 3, pos: '動詞' },
      { en: 'shear', ja: '刈る',       ph: '/ʃɪr/',   eiken: 1, pos: '名詞' },
    ]
  },
  {
    id: 'ound_family',
    theme: '-ound ファミリー',
    words: [
      { en: 'found',  ja: '見つけた',   ph: '/faʊnd/',  eiken: 5, pos: '動詞' },
      { en: 'round',  ja: '丸い',       ph: '/raʊnd/',  eiken: 5, pos: '名詞' },
      { en: 'sound',  ja: '音',         ph: '/saʊnd/',  eiken: 5, pos: '名詞' },
      { en: 'ground', ja: '地面',       ph: '/ɡraʊnd/', eiken: 4, pos: '名詞' },
      { en: 'around', ja: '周りに',     ph: '/əˈraʊnd/', eiken: 5, pos: '前置詞' },
      { en: 'bound',  ja: '束縛された', ph: '/baʊnd/',  eiken: 2, pos: '名詞' },
      { en: 'wound',  ja: '傷',         ph: '/wuːnd/',  eiken: 2, pos: '名詞' },
      { en: 'hound',  ja: '猟犬',       ph: '/haʊnd/',  eiken: 'p1', pos: '名詞' },
      { en: 'compound', ja: '化合物',   ph: '/ˈkɑːmpaʊnd/', eiken: 2, pos: '名詞' },
      { en: 'profound', ja: '深い',     ph: '/prəˈfaʊnd/', eiken: 'p1', pos: '形容詞' },
      { en: 'astound', ja: '驚かせる',  ph: '/əˈstaʊnd/', eiken: 1, pos: '名詞' },
    ]
  },
  {
    id: 'ack_family',
    theme: '-ack ファミリー',
    words: [
      { en: 'back',   ja: '後ろ',       ph: '/bæk/',   eiken: 5, pos: '名詞' },
      { en: 'black',  ja: '黒い',       ph: '/blæk/',  eiken: 5, pos: '形容詞' },
      { en: 'pack',   ja: '詰める',     ph: '/pæk/',   eiken: 4, pos: '名詞' },
      { en: 'track',  ja: '道・追跡',   ph: '/træk/',  eiken: 3, pos: '名詞' },
      { en: 'crack',  ja: 'ひび',       ph: '/kræk/',  eiken: 3, pos: '名詞' },
      { en: 'snack',  ja: 'おやつ',     ph: '/snæk/',  eiken: 4, pos: '名詞' },
      { en: 'stack',  ja: '積み重ね',   ph: '/stæk/',  eiken: 'p2', pos: '名詞' },
      { en: 'attack', ja: '攻撃する',   ph: '/əˈtæk/', eiken: 3, pos: '動詞' },
      { en: 'knack',  ja: 'コツ',       ph: '/næk/',   eiken: 'p1', pos: '名詞' },
    ]
  },
  {
    id: 'old_family',
    theme: '-old ファミリー',
    words: [
      { en: 'old',    ja: '古い',       ph: '/oʊld/',  eiken: 5, pos: '形容詞' },
      { en: 'cold',   ja: '寒い',       ph: '/koʊld/', eiken: 5, pos: '形容詞' },
      { en: 'gold',   ja: '金',         ph: '/ɡoʊld/', eiken: 5, pos: '名詞' },
      { en: 'hold',   ja: '持つ',       ph: '/hoʊld/', eiken: 4, pos: '動詞' },
      { en: 'told',   ja: '言った',     ph: '/toʊld/', eiken: 5, pos: '動詞' },
      { en: 'bold',   ja: '大胆な',     ph: '/boʊld/', eiken: 2, pos: '形容詞' },
      { en: 'fold',   ja: '折る',       ph: '/foʊld/', eiken: 3, pos: '動詞' },
      { en: 'sold',   ja: '売った',     ph: '/soʊld/', eiken: 5, pos: '動詞' },
      { en: 'mold',   ja: 'カビ・型',   ph: '/moʊld/', eiken: 2, pos: '名詞' },
      { en: 'unfold', ja: '展開する',   ph: '/ʌnˈfoʊld/', eiken: 2, pos: '動詞' },
      { en: 'behold', ja: '見よ',       ph: '/bɪˈhoʊld/', eiken: 1, pos: '動詞' },
    ]
  },
  {
    id: 'all_family',
    theme: '-all ファミリー',
    words: [
      { en: 'all',    ja: '全部',       ph: '/ɔːl/',   eiken: 5, pos: '名詞' },
      { en: 'ball',   ja: 'ボール',     ph: '/bɔːl/',  eiken: 5, pos: '名詞' },
      { en: 'call',   ja: '呼ぶ',       ph: '/kɔːl/',  eiken: 5, pos: '名詞' },
      { en: 'tall',   ja: '背が高い',   ph: '/tɔːl/',  eiken: 5, pos: '形容詞' },
      { en: 'wall',   ja: '壁',         ph: '/wɔːl/',  eiken: 5, pos: '名詞' },
      { en: 'fall',   ja: '落ちる',     ph: '/fɔːl/',  eiken: 5, pos: '名詞' },
      { en: 'small',  ja: '小さい',     ph: '/smɔːl/', eiken: 5, pos: '形容詞' },
      { en: 'hall',   ja: 'ホール',     ph: '/hɔːl/',  eiken: 4, pos: '名詞' },
      { en: 'install', ja: 'インストールする', ph: '/ɪnˈstɔːl/', eiken: 2, pos: '動詞' },
      { en: 'stall',  ja: '屋台・失速', ph: '/stɔːl/', eiken: 'p1', pos: '名詞' },
      { en: 'appall', ja: 'ぞっとさせる', ph: '/əˈpɔːl/', eiken: 1, pos: '動詞' },
    ]
  },
  {
    id: 'ell_family',
    theme: '-ell ファミリー',
    words: [
      { en: 'tell',   ja: '伝える',     ph: '/tɛl/',   eiken: 5, pos: '動詞' },
      { en: 'well',   ja: '上手に',     ph: '/wɛl/',   eiken: 5, pos: '名詞' },
      { en: 'sell',   ja: '売る',       ph: '/sɛl/',   eiken: 5, pos: '動詞' },
      { en: 'bell',   ja: 'ベル',       ph: '/bɛl/',   eiken: 5, pos: '名詞' },
      { en: 'fell',   ja: '落ちた',     ph: '/fɛl/',   eiken: 5, pos: '動詞' },
      { en: 'spell',  ja: 'つづる',     ph: '/spɛl/',  eiken: 4, pos: '名詞' },
      { en: 'shell',  ja: '貝殻',       ph: '/ʃɛl/',   eiken: 3, pos: '名詞' },
      { en: 'smell',  ja: 'におい',     ph: '/smɛl/',  eiken: 4, pos: '動詞' },
      { en: 'dwell',  ja: '住む',       ph: '/dwɛl/',  eiken: 2, pos: '動詞' },
      { en: 'excel',  ja: '優れる',     ph: '/ɪkˈsɛl/', eiken: 'p1', pos: '動詞' },
      { en: 'compel', ja: '強いる',     ph: '/kəmˈpɛl/', eiken: 'p1', pos: '動詞' },
      { en: 'propel', ja: '推進する',   ph: '/prəˈpɛl/', eiken: 1, pos: '名詞' },
    ]
  },
  {
    id: 'ess_family',
    theme: '-ess ファミリー',
    words: [
      { en: 'less',    ja: 'より少ない', ph: '/lɛs/',   eiken: 5, pos: '形容詞' },
      { en: 'dress',   ja: 'ドレス',    ph: '/drɛs/',  eiken: 5, pos: '動詞' },
      { en: 'press',   ja: '押す',      ph: '/prɛs/',  eiken: 4, pos: '名詞' },
      { en: 'guess',   ja: '推測する',  ph: '/ɡɛs/',   eiken: 4, pos: '名詞' },
      { en: 'stress',  ja: 'ストレス',  ph: '/strɛs/', eiken: 3, pos: '名詞' },
      { en: 'bless',   ja: '祝福する',  ph: '/blɛs/',  eiken: 2, pos: '名詞' },
      { en: 'express', ja: '表現する',  ph: '/ɪkˈsprɛs/', eiken: 3, pos: '動詞' },
      { en: 'impress', ja: '印象づける', ph: '/ɪmˈprɛs/', eiken: 'p2', pos: '動詞' },
      { en: 'compress', ja: '圧縮する', ph: '/kəmˈprɛs/', eiken: 2, pos: '動詞' },
      { en: 'suppress', ja: '抑える',   ph: '/səˈprɛs/', eiken: 'p1', pos: '動詞' },
      { en: 'transgress', ja: '違反する', ph: '/trænzˈɡrɛs/', eiken: 1, pos: '動詞' },
    ]
  },
  {
    id: 'ate_family',
    theme: '-ate ファミリー',
    words: [
      { en: 'late',    ja: '遅い',       ph: '/leɪt/',  eiken: 5, pos: '形容詞' },
      { en: 'date',    ja: '日付',       ph: '/deɪt/',  eiken: 5, pos: '名詞' },
      { en: 'gate',    ja: '門',         ph: '/ɡeɪt/',  eiken: 5, pos: '名詞' },
      { en: 'state',   ja: '状態・州',   ph: '/steɪt/', eiken: 4, pos: '名詞' },
      { en: 'plate',   ja: '皿',         ph: '/pleɪt/', eiken: 4, pos: '名詞' },
      { en: 'create',  ja: '作り出す',   ph: '/kriˈeɪt/', eiken: 3, pos: '動詞' },
      { en: 'debate',  ja: '議論',       ph: '/dɪˈbeɪt/', eiken: 'p2', pos: '動詞' },
      { en: 'private', ja: '個人的な',   ph: '/ˈpraɪvɪt/', eiken: 3, pos: '形容詞' },
      { en: 'separate', ja: '分ける',    ph: '/ˈsɛpəreɪt/', eiken: 2, pos: '動詞' },
      { en: 'elaborate', ja: '手の込んだ', ph: '/ɪˈlæbərɪt/', eiken: 'p1', pos: '動詞' },
    ]
  },
  {
    id: 'tion_family',
    theme: '-tion ファミリー',
    words: [
      { en: 'station',  ja: '駅',         ph: '/ˈsteɪʃən/',  eiken: 5, pos: '名詞' },
      { en: 'question', ja: '質問',       ph: '/ˈkwɛstʃən/', eiken: 5, pos: '名詞' },
      { en: 'action',   ja: '行動',       ph: '/ˈækʃən/',    eiken: 4, pos: '名詞' },
      { en: 'section',  ja: '部分',       ph: '/ˈsɛkʃən/',   eiken: 3, pos: '名詞' },
      { en: 'mention',  ja: '言及する',   ph: '/ˈmɛnʃən/',   eiken: 3, pos: '名詞' },
      { en: 'attention', ja: '注意',      ph: '/əˈtɛnʃən/',  eiken: 3, pos: '名詞' },
      { en: 'education', ja: '教育',      ph: '/ˌɛdʒʊˈkeɪʃən/', eiken: 3, pos: '名詞' },
      { en: 'situation', ja: '状況',      ph: '/ˌsɪtʃuˈeɪʃən/', eiken: 3, pos: '名詞' },
      { en: 'condition', ja: '条件・状態', ph: '/kənˈdɪʃən/', eiken: 3, pos: '名詞' },
      { en: 'solution',  ja: '解決策',    ph: '/səˈluːʃən/',  eiken: 'p2', pos: '名詞' },
      { en: 'revolution', ja: '革命',     ph: '/ˌrɛvəˈluːʃən/', eiken: 2, pos: '名詞' },
      { en: 'constitution', ja: '憲法',   ph: '/ˌkɑːnstɪˈtuːʃən/', eiken: 'p1', pos: '名詞' },
      { en: 'institution', ja: '機関',    ph: '/ˌɪnstɪˈtuːʃən/', eiken: 'p1', pos: '名詞' },
    ]
  },
  {
    id: 'ice_family',
    theme: '-ice ファミリー',
    words: [
      { en: 'ice',     ja: '氷',         ph: '/aɪs/',    eiken: 5, pos: '名詞' },
      { en: 'rice',    ja: '米',          ph: '/raɪs/',   eiken: 5, pos: '名詞' },
      { en: 'nice',    ja: 'すてきな',    ph: '/naɪs/',   eiken: 5, pos: '形容詞' },
      { en: 'price',   ja: '値段',        ph: '/praɪs/',  eiken: 4, pos: '名詞' },
      { en: 'twice',   ja: '2回',         ph: '/twaɪs/',  eiken: 4, pos: '副詞' },
      { en: 'slice',   ja: '一切れ',      ph: '/slaɪs/',  eiken: 3, pos: '名詞' },
      { en: 'advice',  ja: '助言',        ph: '/ədˈvaɪs/', eiken: 3, pos: '名詞' },
      { en: 'device',  ja: '装置',        ph: '/dɪˈvaɪs/', eiken: 'p2', pos: '名詞' },
      { en: 'sacrifice', ja: '犠牲',      ph: '/ˈsækrɪfaɪs/', eiken: 2, pos: '名詞' },
      { en: 'prejudice', ja: '偏見',      ph: '/ˈprɛdʒʊdɪs/', eiken: 'p1', pos: '名詞' },
    ]
  },
  {
    id: 'ank_family',
    theme: '-ank ファミリー',
    words: [
      { en: 'bank',   ja: '銀行',       ph: '/bæŋk/',  eiken: 5, pos: '名詞' },
      { en: 'thank',  ja: '感謝する',   ph: '/θæŋk/',  eiken: 5, pos: '動詞' },
      { en: 'rank',   ja: '順位',       ph: '/ræŋk/',  eiken: 3, pos: '名詞' },
      { en: 'blank',  ja: '空白の',     ph: '/blæŋk/', eiken: 3, pos: '形容詞' },
      { en: 'tank',   ja: 'タンク',     ph: '/tæŋk/',  eiken: 4, pos: '名詞' },
      { en: 'frank',  ja: '率直な',     ph: '/fræŋk/', eiken: 2, pos: '形容詞' },
      { en: 'crank',  ja: 'クランク',   ph: '/kræŋk/', eiken: 'p1', pos: '名詞' },
      { en: 'plank',  ja: '板',         ph: '/plæŋk/', eiken: 'p1', pos: '名詞' },
    ]
  },
  {
    id: 'ow_family',
    theme: '-ow ファミリー',
    words: [
      { en: 'know',   ja: '知る',       ph: '/noʊ/',   eiken: 5, pos: '動詞' },
      { en: 'show',   ja: '見せる',     ph: '/ʃoʊ/',   eiken: 5, pos: '動詞' },
      { en: 'snow',   ja: '雪',         ph: '/snoʊ/',  eiken: 5, pos: '名詞' },
      { en: 'grow',   ja: '育つ',       ph: '/ɡroʊ/',  eiken: 4, pos: '動詞' },
      { en: 'blow',   ja: '吹く',       ph: '/bloʊ/',  eiken: 4, pos: '動詞' },
      { en: 'flow',   ja: '流れる',     ph: '/floʊ/',  eiken: 3, pos: '動詞' },
      { en: 'slow',   ja: '遅い',       ph: '/sloʊ/',  eiken: 5, pos: '形容詞' },
      { en: 'throw',  ja: '投げる',     ph: '/θroʊ/',  eiken: 4, pos: '名詞' },
      { en: 'follow', ja: 'ついて行く', ph: '/ˈfɑːloʊ/', eiken: 4, pos: '動詞' },
      { en: 'shadow', ja: '影',         ph: '/ˈʃædoʊ/', eiken: 3, pos: '名詞' },
      { en: 'borrow', ja: '借りる',     ph: '/ˈbɑːroʊ/', eiken: 3, pos: '動詞' },
      { en: 'swallow', ja: '飲み込む',  ph: '/ˈswɑːloʊ/', eiken: 2, pos: '動詞' },
      { en: 'bestow', ja: '授ける',     ph: '/bɪˈstoʊ/', eiken: 1, pos: '動詞' },
    ]
  },
  {
    id: 'oom_family',
    theme: '-oom ファミリー',
    words: [
      { en: 'room',   ja: '部屋',       ph: '/ruːm/',  eiken: 5, pos: '名詞' },
      { en: 'boom',   ja: 'ブーム',     ph: '/buːm/',  eiken: 3, pos: '名詞' },
      { en: 'bloom',  ja: '花が咲く',   ph: '/bluːm/', eiken: 2, pos: '名詞' },
      { en: 'broom',  ja: 'ほうき',     ph: '/bruːm/', eiken: 3, pos: '名詞' },
      { en: 'doom',   ja: '破滅',       ph: '/duːm/',  eiken: 'p1', pos: '名詞' },
      { en: 'gloom',  ja: '暗がり',     ph: '/ɡluːm/', eiken: 'p1', pos: '名詞' },
      { en: 'groom',  ja: '花婿',       ph: '/ɡruːm/', eiken: 2, pos: '名詞' },
      { en: 'mushroom', ja: 'きのこ',   ph: '/ˈmʌʃruːm/', eiken: 4, pos: '名詞' },
    ]
  },
  {
    id: 'aw_family',
    theme: '-aw ファミリー',
    words: [
      { en: 'saw',    ja: '見た',       ph: '/sɔː/',   eiken: 5, pos: '名詞' },
      { en: 'draw',   ja: '描く',       ph: '/drɔː/',  eiken: 5, pos: '動詞' },
      { en: 'law',    ja: '法律',       ph: '/lɔː/',   eiken: 4, pos: '名詞' },
      { en: 'raw',    ja: '生の',       ph: '/rɔː/',   eiken: 3, pos: '形容詞' },
      { en: 'jaw',    ja: 'あご',       ph: '/dʒɔː/',  eiken: 2, pos: '名詞' },
      { en: 'claw',   ja: 'かぎ爪',    ph: '/klɔː/',  eiken: 2, pos: '名詞' },
      { en: 'straw',  ja: 'わら',       ph: '/strɔː/', eiken: 3, pos: '名詞' },
      { en: 'flaw',   ja: '欠陥',       ph: '/flɔː/',  eiken: 'p1', pos: '名詞' },
      { en: 'thaw',   ja: '解ける',     ph: '/θɔː/',   eiken: 'p1', pos: '動詞' },
      { en: 'withdraw', ja: '引き出す', ph: '/wɪðˈdrɔː/', eiken: 2, pos: '動詞' },
    ]
  },
  {
    id: 'ive_family',
    theme: '-ive ファミリー',
    words: [
      { en: 'live',    ja: '住む',       ph: '/lɪv/',    eiken: 5, pos: '動詞' },
      { en: 'give',    ja: '与える',     ph: '/ɡɪv/',    eiken: 5, pos: '動詞' },
      { en: 'five',    ja: '5',          ph: '/faɪv/',   eiken: 5, pos: '名詞' },
      { en: 'drive',   ja: '運転する',   ph: '/draɪv/',  eiken: 4, pos: '動詞' },
      { en: 'arrive',  ja: '到着する',   ph: '/əˈraɪv/', eiken: 4, pos: '動詞' },
      { en: 'survive', ja: '生き残る',   ph: '/sərˈvaɪv/', eiken: 3, pos: '動詞' },
      { en: 'active',  ja: '活動的な',   ph: '/ˈæktɪv/', eiken: 3, pos: '形容詞' },
      { en: 'native',  ja: '出身の',     ph: '/ˈneɪtɪv/', eiken: 'p2', pos: '形容詞' },
      { en: 'creative', ja: '創造的な',  ph: '/kriˈeɪtɪv/', eiken: 2, pos: '形容詞' },
      { en: 'sensitive', ja: '敏感な',   ph: '/ˈsɛnsɪtɪv/', eiken: 2, pos: '形容詞' },
      { en: 'initiative', ja: '主導権',  ph: '/ɪˈnɪʃətɪv/', eiken: 'p1', pos: '名詞' },
      { en: 'comprehensive', ja: '包括的な', ph: '/ˌkɑːmprɪˈhɛnsɪv/', eiken: 1, pos: '形容詞' },
    ]
  },
  {
    id: 'ent_family',
    theme: '-ent ファミリー',
    words: [
      { en: 'went',    ja: '行った',     ph: '/wɛnt/',   eiken: 5, pos: '動詞' },
      { en: 'sent',    ja: '送った',     ph: '/sɛnt/',   eiken: 5, pos: '動詞' },
      { en: 'spent',   ja: '費やした',   ph: '/spɛnt/',  eiken: 4, pos: '動詞' },
      { en: 'event',   ja: 'イベント',   ph: '/ɪˈvɛnt/', eiken: 4, pos: '名詞' },
      { en: 'present', ja: 'プレゼント', ph: '/ˈprɛzənt/', eiken: 4, pos: '名詞' },
      { en: 'student', ja: '生徒',       ph: '/ˈstuːdənt/', eiken: 5, pos: '名詞' },
      { en: 'different', ja: '異なる',   ph: '/ˈdɪfərənt/', eiken: 4, pos: '形容詞' },
      { en: 'ancient',  ja: '古代の',    ph: '/ˈeɪnʃənt/', eiken: 'p2', pos: '形容詞' },
      { en: 'confident', ja: '自信のある', ph: '/ˈkɑːnfɪdənt/', eiken: 2, pos: '形容詞' },
      { en: 'apparent', ja: '明らかな',  ph: '/əˈpærənt/', eiken: 'p1', pos: '形容詞' },
      { en: 'eloquent', ja: '雄弁な',    ph: '/ˈɛləkwənt/', eiken: 1, pos: '形容詞' },
    ]
  },
  {
    id: 'ture_family',
    theme: '-ture ファミリー',
    words: [
      { en: 'nature',   ja: '自然',       ph: '/ˈneɪtʃər/',  eiken: 4, pos: '名詞' },
      { en: 'future',   ja: '未来',       ph: '/ˈfjuːtʃər/', eiken: 4, pos: '名詞' },
      { en: 'picture',  ja: '写真',       ph: '/ˈpɪktʃər/',  eiken: 5, pos: '名詞' },
      { en: 'culture',  ja: '文化',       ph: '/ˈkʌltʃər/',  eiken: 3, pos: '名詞' },
      { en: 'adventure', ja: '冒険',      ph: '/ədˈvɛntʃər/', eiken: 3, pos: '名詞' },
      { en: 'creature', ja: '生き物',     ph: '/ˈkriːtʃər/',  eiken: 3, pos: '名詞' },
      { en: 'structure', ja: '構造',      ph: '/ˈstrʌktʃər/', eiken: 2, pos: '名詞' },
      { en: 'furniture', ja: '家具',      ph: '/ˈfɜːrnɪtʃər/', eiken: 3, pos: '名詞' },
      { en: 'manufacture', ja: '製造する', ph: '/ˌmænjʊˈfæktʃər/', eiken: 2, pos: '動詞' },
      { en: 'departure', ja: '出発',      ph: '/dɪˈpɑːrtʃər/', eiken: 2, pos: '名詞' },
    ]
  },
  {
    id: 'ess_adj_family',
    theme: '-less ファミリー',
    words: [
      { en: 'endless',   ja: '終わりのない', ph: '/ˈɛndlɪs/',   eiken: 3, pos: '形容詞' },
      { en: 'careless',  ja: '不注意な',    ph: '/ˈkɛrlɪs/',    eiken: 3, pos: '形容詞' },
      { en: 'useless',   ja: '役に立たない', ph: '/ˈjuːslɪs/',  eiken: 3, pos: '形容詞' },
      { en: 'homeless',  ja: 'ホームレス',  ph: '/ˈhoʊmlɪs/',   eiken: 3, pos: '形容詞' },
      { en: 'hopeless',  ja: '絶望的な',    ph: '/ˈhoʊplɪs/',   eiken: 'p2', pos: '形容詞' },
      { en: 'countless', ja: '無数の',      ph: '/ˈkaʊntlɪs/',  eiken: 2, pos: '形容詞' },
      { en: 'reckless',  ja: '無謀な',      ph: '/ˈrɛklɪs/',    eiken: 'p1', pos: '形容詞' },
      { en: 'relentless', ja: '容赦ない',   ph: '/rɪˈlɛntlɪs/', eiken: 1, pos: '形容詞' },
    ]
  },
  {
    id: 'ment_family',
    theme: '-ment ファミリー',
    words: [
      { en: 'moment',     ja: '瞬間',       ph: '/ˈmoʊmənt/',    eiken: 4, pos: '名詞' },
      { en: 'comment',    ja: 'コメント',   ph: '/ˈkɑːmɛnt/',    eiken: 3, pos: '名詞' },
      { en: 'movement',   ja: '動き',       ph: '/ˈmuːvmənt/',    eiken: 3, pos: '名詞' },
      { en: 'environment', ja: '環境',      ph: '/ɪnˈvaɪrənmənt/', eiken: 3, pos: '名詞' },
      { en: 'government', ja: '政府',       ph: '/ˈɡʌvərnmənt/,', eiken: 3, pos: '名詞' },
      { en: 'development', ja: '発展',      ph: '/dɪˈvɛləpmənt/', eiken: 'p2', pos: '名詞' },
      { en: 'achievement', ja: '達成',      ph: '/əˈtʃiːvmənt/',  eiken: 2, pos: '名詞' },
      { en: 'astonishment', ja: '驚き',     ph: '/əˈstɑːnɪʃmənt/', eiken: 'p1', pos: '名詞' },
      { en: 'acknowledgment', ja: '承認',   ph: '/əkˈnɑːlɪdʒmənt/', eiken: 1, pos: '名詞' },
    ]
  },
  {
    id: 'ck_family',
    theme: '-ck ファミリー',
    words: [
      { en: 'back',   ja: '後ろ',       ph: '/bæk/',   eiken: 5, pos: '名詞' },
      { en: 'kick',   ja: '蹴る',       ph: '/kɪk/',   eiken: 4, pos: '動詞' },
      { en: 'pick',   ja: '選ぶ',       ph: '/pɪk/',   eiken: 4, pos: '動詞' },
      { en: 'sick',   ja: '病気の',     ph: '/sɪk/',   eiken: 5, pos: '形容詞' },
      { en: 'quick',  ja: '速い',       ph: '/kwɪk/',  eiken: 4, pos: '形容詞' },
      { en: 'trick',  ja: 'トリック',   ph: '/trɪk/',  eiken: 3, pos: '名詞' },
      { en: 'stick',  ja: '棒・くっつく', ph: '/stɪk/', eiken: 4, pos: '動詞' },
      { en: 'brick',  ja: 'レンガ',     ph: '/brɪk/',  eiken: 3, pos: '名詞' },
      { en: 'check',  ja: '確認する',   ph: '/tʃɛk/',  eiken: 4, pos: '動詞' },
      { en: 'neck',   ja: '首',         ph: '/nɛk/',   eiken: 4, pos: '名詞' },
      { en: 'wreck',  ja: '難破',       ph: '/rɛk/',   eiken: 2, pos: '名詞' },
      { en: 'flock',  ja: '群れ',       ph: '/flɑːk/', eiken: 2, pos: '名詞' },
    ]
  },
  {
    id: 'tion_act',
    theme: 'act → action チェーン',
    words: [
      { en: 'act',      ja: '行動する',   ph: '/ækt/',     eiken: 4, pos: '動詞' },
      { en: 'fact',     ja: '事実',       ph: '/fækt/',    eiken: 4, pos: '名詞' },
      { en: 'exact',    ja: '正確な',     ph: '/ɪɡˈzækt/', eiken: 3, pos: '形容詞' },
      { en: 'impact',   ja: '影響',       ph: '/ˈɪmpækt/', eiken: 2, pos: '名詞' },
      { en: 'compact',  ja: 'コンパクトな', ph: '/ˈkɑːmpækt/', eiken: 2, pos: '名詞' },
      { en: 'extract',  ja: '取り出す',   ph: '/ˈɛkstrækt/', eiken: 'p1', pos: '動詞' },
      { en: 'abstract', ja: '抽象的な',   ph: '/ˈæbstrækt/', eiken: 'p1', pos: '形容詞' },
      { en: 'distract', ja: '気をそらす', ph: '/dɪˈstrækt/', eiken: 'p1', pos: '動詞' },
    ]
  },
  {
    id: 'oom_room_ext',
    theme: 'room → classroom チェーン',
    words: [
      { en: 'room',      ja: '部屋',       ph: '/ruːm/',      eiken: 5, pos: '名詞' },
      { en: 'classroom', ja: '教室',       ph: '/ˈklæsruːm/', eiken: 5, pos: '名詞' },
      { en: 'bathroom',  ja: '浴室',       ph: '/ˈbæθruːm/',  eiken: 4, pos: '名詞' },
      { en: 'bedroom',   ja: '寝室',       ph: '/ˈbɛdruːm/',  eiken: 4, pos: '名詞' },
      { en: 'mushroom',  ja: 'きのこ',     ph: '/ˈmʌʃruːm/', eiken: 4, pos: '名詞' },
    ]
  },
  {
    id: 'ound_bound',
    theme: 'bound → チェーン',
    words: [
      { en: 'bound',    ja: '束縛された', ph: '/baʊnd/',  eiken: 2, pos: '名詞' },
      { en: 'rebound',  ja: '跳ね返る',   ph: '/rɪˈbaʊnd/', eiken: 'p1', pos: '動詞' },
      { en: 'inbound',  ja: '到着する',   ph: '/ˈɪnbaʊnd/', eiken: 'p1', pos: '形容詞' },
      { en: 'outbound', ja: '外向きの',   ph: '/ˈaʊtbaʊnd/', eiken: 'p1', pos: '形容詞' },
    ]
  },
  {
    id: 'ary_family',
    theme: '-ary ファミリー',
    words: [
      { en: 'library',    ja: '図書館',     ph: '/ˈlaɪbrɛri/',   eiken: 5, pos: '名詞' },
      { en: 'primary',    ja: '主要な',     ph: '/ˈpraɪmɛri/',   eiken: 'p2', pos: '形容詞' },
      { en: 'ordinary',   ja: '普通の',     ph: '/ˈɔːrdɪnɛri/',  eiken: 3, pos: '形容詞' },
      { en: 'necessary',  ja: '必要な',     ph: '/ˈnɛsəsɛri/',   eiken: 3, pos: '形容詞' },
      { en: 'vocabulary',  ja: '語彙',      ph: '/voʊˈkæbjʊlɛri/', eiken: 3, pos: '名詞' },
      { en: 'temporary',   ja: '一時的な',  ph: '/ˈtɛmpərɛri/',   eiken: 2, pos: '形容詞' },
      { en: 'extraordinary', ja: '並外れた', ph: '/ɪkˈstrɔːrdɪnɛri/', eiken: 'p1', pos: '形容詞' },
      { en: 'voluntary',   ja: '自発的な',  ph: '/ˈvɑːləntɛri/',  eiken: 'p1', pos: '形容詞' },
      { en: 'arbitrary',   ja: '任意の',    ph: '/ˈɑːrbɪtrɛri/',  eiken: 1, pos: '形容詞' },
    ]
  },
  {
    id: 'age_family',
    theme: '-age ファミリー',
    words: [
      { en: 'age',      ja: '年齢',       ph: '/eɪdʒ/',     eiken: 5, pos: '名詞' },
      { en: 'page',     ja: 'ページ',     ph: '/peɪdʒ/',    eiken: 5, pos: '名詞' },
      { en: 'stage',    ja: '舞台・段階', ph: '/steɪdʒ/',   eiken: 4, pos: '名詞' },
      { en: 'village',  ja: '村',         ph: '/ˈvɪlɪdʒ/',  eiken: 4, pos: '名詞' },
      { en: 'message',  ja: 'メッセージ', ph: '/ˈmɛsɪdʒ/',  eiken: 4, pos: '名詞' },
      { en: 'language', ja: '言語',       ph: '/ˈlæŋɡwɪdʒ/', eiken: 4, pos: '名詞' },
      { en: 'damage',   ja: '損害',       ph: '/ˈdæmɪdʒ/',  eiken: 3, pos: '名詞' },
      { en: 'manage',   ja: '管理する',   ph: '/ˈmænɪdʒ/',  eiken: 3, pos: '動詞' },
      { en: 'courage',  ja: '勇気',       ph: '/ˈkɜːrɪdʒ/', eiken: 3, pos: '名詞' },
      { en: 'storage',  ja: '保管',       ph: '/ˈstɔːrɪdʒ/', eiken: 2, pos: '名詞' },
      { en: 'leverage', ja: '影響力',     ph: '/ˈlɛvərɪdʒ/', eiken: 1, pos: '名詞' },
      { en: 'sabotage', ja: '妨害',       ph: '/ˈsæbətɑːʒ/', eiken: 1, pos: '名詞' },
    ]
  },

  // ===== CVC Short Vowel (expanded) =====
  {
    id: 'ad_family', theme: '-ad ファミリー',
    words: [
      { en: 'dad',  ja: 'お父さん',   ph: '/dæd/',  eiken: 5, pos: '名詞' },
      { en: 'bad',  ja: '悪い',       ph: '/bæd/',  eiken: 5, pos: '形容詞' },
      { en: 'sad',  ja: '悲しい',     ph: '/sæd/',  eiken: 5, pos: '形容詞' },
      { en: 'mad',  ja: '怒った',     ph: '/mæd/',  eiken: 4, pos: '形容詞' },
      { en: 'had',  ja: '持っていた', ph: '/hæd/',  eiken: 5, pos: '名詞' },
      { en: 'glad', ja: 'うれしい',   ph: '/ɡlæd/', eiken: 3, pos: '形容詞' },
      { en: 'pad',  ja: 'パッド',     ph: '/pæd/',  eiken: 3, pos: '名詞' },
    ]
  },
  {
    id: 'ag_family', theme: '-ag ファミリー',
    words: [
      { en: 'bag',  ja: 'かばん',     ph: '/bæɡ/',  eiken: 5, pos: '名詞' },
      { en: 'tag',  ja: 'タグ',       ph: '/tæɡ/',  eiken: 3, pos: '名詞' },
      { en: 'rag',  ja: 'ぼろ布',     ph: '/ræɡ/',  eiken: 2, pos: '名詞' },
      { en: 'flag', ja: '旗',         ph: '/flæɡ/', eiken: 4, pos: '名詞' },
      { en: 'drag', ja: '引きずる',   ph: '/dræɡ/', eiken: 3, pos: '動詞' },
      { en: 'wag',  ja: '振る',       ph: '/wæɡ/',  eiken: 3, pos: '動詞' },
      { en: 'brag', ja: '自慢する',   ph: '/bræɡ/', eiken: 2, pos: '動詞' },
    ]
  },
  {
    id: 'am_family', theme: '-am ファミリー',
    words: [
      { en: 'ham',   ja: 'ハム',       ph: '/hæm/',     eiken: 4, pos: '名詞' },
      { en: 'jam',   ja: 'ジャム',     ph: '/dʒæm/',    eiken: 4, pos: '名詞' },
      { en: 'ram',   ja: '雄羊',       ph: '/ræm/',     eiken: 2, pos: '名詞' },
      { en: 'dam',   ja: 'ダム',       ph: '/dæm/',     eiken: 3, pos: '名詞' },
      { en: 'slam',  ja: '叩きつける', ph: '/slæm/',    eiken: 2, pos: '動詞' },
      { en: 'clam',  ja: 'ハマグリ',   ph: '/klæm/',    eiken: 2, pos: '名詞' },
      { en: 'exam',  ja: '試験',       ph: '/ɪɡˈzæm/', eiken: 4, pos: '名詞' },
    ]
  },
  {
    id: 'ap_family', theme: '-ap ファミリー',
    words: [
      { en: 'cap',  ja: '帽子',       ph: '/kæp/',  eiken: 5, pos: '名詞' },
      { en: 'map',  ja: '地図',       ph: '/mæp/',  eiken: 5, pos: '名詞' },
      { en: 'tap',  ja: '軽くたたく', ph: '/tæp/',  eiken: 3, pos: '名詞' },
      { en: 'nap',  ja: '昼寝',       ph: '/næp/',  eiken: 3, pos: '名詞' },
      { en: 'snap', ja: 'パチンと折る', ph: '/snæp/', eiken: 3, pos: '動詞' },
      { en: 'trap', ja: '罠',         ph: '/træp/', eiken: 3, pos: '名詞' },
      { en: 'wrap', ja: '包む',       ph: '/ræp/',  eiken: 3, pos: '動詞' },
      { en: 'clap', ja: '拍手する',   ph: '/klæp/', eiken: 3, pos: '動詞' },
      { en: 'gap',  ja: '隙間',       ph: '/ɡæp/',  eiken: 3, pos: '名詞' },
      { en: 'lap',  ja: 'ひざ',       ph: '/læp/',  eiken: 3, pos: '名詞' },
    ]
  },
  {
    id: 'ed_family', theme: '-ed ファミリー',
    words: [
      { en: 'bed',    ja: 'ベッド',     ph: '/bɛd/',    eiken: 5, pos: '名詞' },
      { en: 'red',    ja: '赤',         ph: '/rɛd/',    eiken: 5, pos: '形容詞' },
      { en: 'fed',    ja: '食べさせた', ph: '/fɛd/',    eiken: 4, pos: '動詞' },
      { en: 'led',    ja: '導いた',     ph: '/lɛd/',    eiken: 4, pos: '動詞' },
      { en: 'shed',   ja: '小屋',       ph: '/ʃɛd/',   eiken: 3, pos: '動詞' },
      { en: 'sled',   ja: 'そり',       ph: '/slɛd/',  eiken: 3, pos: '名詞' },
      { en: 'spread', ja: '広げる',     ph: '/sprɛd/', eiken: 3, pos: '動詞' },
    ]
  },
  {
    id: 'en_family', theme: '-en ファミリー',
    words: [
      { en: 'pen',  ja: 'ペン',   ph: '/pɛn/',  eiken: 5, pos: '名詞' },
      { en: 'ten',  ja: '10',     ph: '/tɛn/',  eiken: 5, pos: '名詞' },
      { en: 'hen',  ja: 'めんどり', ph: '/hɛn/', eiken: 4, pos: '名詞' },
      { en: 'men',  ja: '男性たち', ph: '/mɛn/', eiken: 5, pos: '名詞' },
      { en: 'den',  ja: '巣穴',   ph: '/dɛn/',  eiken: 3, pos: '名詞' },
      { en: 'then', ja: 'そのとき', ph: '/ðɛn/', eiken: 5, pos: '副詞' },
      { en: 'when', ja: 'いつ',   ph: '/wɛn/',  eiken: 5, pos: '副詞' },
    ]
  },
  {
    id: 'et_family', theme: '-et ファミリー',
    words: [
      { en: 'get', ja: '得る',     ph: '/ɡɛt/', eiken: 5, pos: '動詞' },
      { en: 'set', ja: '設定する', ph: '/sɛt/', eiken: 5, pos: '動詞' },
      { en: 'pet', ja: 'ペット',   ph: '/pɛt/', eiken: 5, pos: '名詞' },
      { en: 'net', ja: '網',       ph: '/nɛt/', eiken: 4, pos: '名詞' },
      { en: 'met', ja: '会った',   ph: '/mɛt/', eiken: 5, pos: '動詞' },
      { en: 'wet', ja: '濡れた',   ph: '/wɛt/', eiken: 4, pos: '形容詞' },
      { en: 'let', ja: 'させる',   ph: '/lɛt/', eiken: 5, pos: '動詞' },
      { en: 'jet', ja: 'ジェット', ph: '/dʒɛt/', eiken: 4, pos: '名詞' },
      { en: 'bet', ja: '賭ける',   ph: '/bɛt/', eiken: 3, pos: '動詞' },
    ]
  },
  {
    id: 'ig_family', theme: '-ig ファミリー',
    words: [
      { en: 'big',  ja: '大きい', ph: '/bɪɡ/',  eiken: 5, pos: '形容詞' },
      { en: 'dig',  ja: '掘る',   ph: '/dɪɡ/',  eiken: 4, pos: '動詞' },
      { en: 'pig',  ja: '豚',     ph: '/pɪɡ/',  eiken: 5, pos: '名詞' },
      { en: 'wig',  ja: 'かつら', ph: '/wɪɡ/',  eiken: 3, pos: '名詞' },
      { en: 'fig',  ja: 'いちじく', ph: '/fɪɡ/', eiken: 3, pos: '名詞' },
      { en: 'twig', ja: '小枝',   ph: '/twɪɡ/', eiken: 3, pos: '名詞' },
    ]
  },
  {
    id: 'ip_family', theme: '-ip ファミリー',
    words: [
      { en: 'tip',   ja: '先端',       ph: '/tɪp/',   eiken: 4, pos: '名詞' },
      { en: 'lip',   ja: '唇',         ph: '/lɪp/',   eiken: 4, pos: '名詞' },
      { en: 'hip',   ja: '腰',         ph: '/hɪp/',   eiken: 3, pos: '名詞' },
      { en: 'dip',   ja: '浸す',       ph: '/dɪp/',   eiken: 3, pos: '名詞' },
      { en: 'zip',   ja: 'ジッパー',   ph: '/zɪp/',   eiken: 3, pos: '名詞' },
      { en: 'ship',  ja: '船',         ph: '/ʃɪp/',   eiken: 5, pos: '名詞' },
      { en: 'trip',  ja: '旅行',       ph: '/trɪp/',  eiken: 4, pos: '名詞' },
      { en: 'chip',  ja: 'チップ',     ph: '/tʃɪp/',  eiken: 3, pos: '名詞' },
      { en: 'drip',  ja: 'しずく',     ph: '/drɪp/',  eiken: 3, pos: '動詞' },
      { en: 'skip',  ja: 'スキップ',   ph: '/skɪp/',  eiken: 4, pos: '動詞' },
      { en: 'slip',  ja: '滑る',       ph: '/slɪp/',  eiken: 3, pos: '動詞' },
      { en: 'grip',  ja: '握る',       ph: '/ɡrɪp/',  eiken: 3, pos: '名詞' },
      { en: 'clip',  ja: 'クリップ',   ph: '/klɪp/',  eiken: 3, pos: '動詞' },
      { en: 'flip',  ja: '裏返す',     ph: '/flɪp/',  eiken: 3, pos: '動詞' },
      { en: 'whip',  ja: 'ムチ',       ph: '/wɪp/',   eiken: 2, pos: '名詞' },
      { en: 'strip', ja: '細長い',     ph: '/strɪp/', eiken: 2, pos: '名詞' },
    ]
  },
  {
    id: 'ob_family', theme: '-ob ファミリー',
    words: [
      { en: 'job',   ja: '仕事',       ph: '/dʒɑːb/', eiken: 5, pos: '名詞' },
      { en: 'rob',   ja: '奪う',       ph: '/rɑːb/',  eiken: 3, pos: '動詞' },
      { en: 'knob',  ja: 'つまみ',     ph: '/nɑːb/',  eiken: 2, pos: '名詞' },
      { en: 'mob',   ja: '群衆',       ph: '/mɑːb/',  eiken: 2, pos: '名詞' },
      { en: 'sob',   ja: 'すすり泣く', ph: '/sɑːb/',  eiken: 2, pos: '動詞' },
      { en: 'throb', ja: '脈打つ',     ph: '/θrɑːb/', eiken: 'p1', pos: '動詞' },
    ]
  },
  {
    id: 'og_family', theme: '-og ファミリー',
    words: [
      { en: 'dog',  ja: '犬',         ph: '/dɔːɡ/', eiken: 5, pos: '名詞' },
      { en: 'log',  ja: '丸太',       ph: '/lɔːɡ/', eiken: 3, pos: '名詞' },
      { en: 'fog',  ja: '霧',         ph: '/fɔːɡ/', eiken: 3, pos: '名詞' },
      { en: 'jog',  ja: 'ジョギング', ph: '/dʒɔːɡ/', eiken: 3, pos: '動詞' },
      { en: 'blog', ja: 'ブログ',     ph: '/blɔːɡ/', eiken: 4, pos: '動詞' },
      { en: 'frog', ja: 'カエル',     ph: '/frɔːɡ/', eiken: 4, pos: '名詞' },
      { en: 'hog',  ja: '豚',         ph: '/hɔːɡ/', eiken: 2, pos: '名詞' },
    ]
  },
  {
    id: 'ub_family', theme: '-ub ファミリー',
    words: [
      { en: 'tub',   ja: '浴槽',   ph: '/tʌb/',   eiken: 3, pos: '名詞' },
      { en: 'rub',   ja: 'こする', ph: '/rʌb/',   eiken: 3, pos: '動詞' },
      { en: 'club',  ja: 'クラブ', ph: '/klʌb/',  eiken: 4, pos: '名詞' },
      { en: 'pub',   ja: 'パブ',   ph: '/pʌb/',   eiken: 3, pos: '名詞' },
      { en: 'hub',   ja: '中心地', ph: '/hʌb/',   eiken: 2, pos: '名詞' },
      { en: 'sub',   ja: '代わり', ph: '/sʌb/',   eiken: 3, pos: '名詞' },
      { en: 'scrub', ja: 'ゴシゴシ洗う', ph: '/skrʌb/', eiken: 2, pos: '動詞' },
      { en: 'shrub', ja: '低木',   ph: '/ʃrʌb/',  eiken: 2, pos: '名詞' },
    ]
  },

  // ===== Long Vowel / Magic E =====
  {
    id: 'ape_family', theme: '-ape ファミリー',
    words: [
      { en: 'tape',      ja: 'テープ',   ph: '/teɪp/',      eiken: 4, pos: '名詞' },
      { en: 'cape',      ja: 'マント',   ph: '/keɪp/',      eiken: 3, pos: '名詞' },
      { en: 'shape',     ja: '形',       ph: '/ʃeɪp/',      eiken: 4, pos: '名詞' },
      { en: 'grape',     ja: 'ぶどう',   ph: '/ɡreɪp/',     eiken: 4, pos: '名詞' },
      { en: 'escape',    ja: '逃げる',   ph: '/ɪˈskeɪp/',   eiken: 3, pos: '動詞' },
      { en: 'landscape', ja: '風景',     ph: '/ˈlændskeɪp/', eiken: 2, pos: '名詞' },
    ]
  },
  {
    id: 'ame_family', theme: '-ame ファミリー',
    words: [
      { en: 'name',  ja: '名前',   ph: '/neɪm/',  eiken: 5, pos: '名詞' },
      { en: 'game',  ja: 'ゲーム', ph: '/ɡeɪm/',  eiken: 5, pos: '名詞' },
      { en: 'came',  ja: '来た',   ph: '/keɪm/',  eiken: 5, pos: '動詞' },
      { en: 'same',  ja: '同じ',   ph: '/seɪm/',  eiken: 5, pos: '形容詞' },
      { en: 'blame', ja: '非難する', ph: '/bleɪm/', eiken: 3, pos: '動詞' },
      { en: 'flame', ja: '炎',     ph: '/fleɪm/', eiken: 3, pos: '名詞' },
      { en: 'frame', ja: '枠',     ph: '/freɪm/', eiken: 3, pos: '名詞' },
      { en: 'shame', ja: '恥',     ph: '/ʃeɪm/',  eiken: 3, pos: '名詞' },
    ]
  },
  {
    id: 'ose_family', theme: '-ose ファミリー',
    words: [
      { en: 'nose',    ja: '鼻',       ph: '/noʊz/',     eiken: 5, pos: '名詞' },
      { en: 'rose',    ja: 'バラ',     ph: '/roʊz/',     eiken: 4, pos: '名詞' },
      { en: 'close',   ja: '閉じる',   ph: '/kloʊz/',    eiken: 5, pos: '動詞' },
      { en: 'chose',   ja: '選んだ',   ph: '/tʃoʊz/',    eiken: 4, pos: '動詞' },
      { en: 'those',   ja: 'あれら',   ph: '/ðoʊz/',     eiken: 5, pos: '代名詞' },
      { en: 'pose',    ja: 'ポーズ',   ph: '/poʊz/',     eiken: 3, pos: '名詞' },
      { en: 'compose', ja: '作曲する', ph: '/kəmˈpoʊz/', eiken: 2, pos: '動詞' },
      { en: 'suppose', ja: '思う',     ph: '/səˈpoʊz/',  eiken: 3, pos: '動詞' },
      { en: 'propose', ja: '提案する', ph: '/prəˈpoʊz/', eiken: 2, pos: '動詞' },
    ]
  },
  {
    id: 'oke_family', theme: '-oke ファミリー',
    words: [
      { en: 'joke',    ja: '冗談',     ph: '/dʒoʊk/',    eiken: 4, pos: '名詞' },
      { en: 'broke',   ja: '壊した',   ph: '/broʊk/',    eiken: 4, pos: '動詞' },
      { en: 'smoke',   ja: '煙',       ph: '/smoʊk/',    eiken: 4, pos: '名詞' },
      { en: 'spoke',   ja: '話した',   ph: '/spoʊk/',    eiken: 4, pos: '動詞' },
      { en: 'stroke',  ja: '一撃',     ph: '/stroʊk/',   eiken: 2, pos: '名詞' },
      { en: 'awoke',   ja: '目覚めた', ph: '/əˈwoʊk/',   eiken: 2, pos: '動詞' },
      { en: 'provoke', ja: '怒らせる', ph: '/prəˈvoʊk/', eiken: 2, pos: '動詞' },
    ]
  },
  {
    id: 'one_family', theme: '-one ファミリー',
    words: [
      { en: 'bone',   ja: '骨',       ph: '/boʊn/',   eiken: 4, pos: '名詞' },
      { en: 'stone',  ja: '石',       ph: '/stoʊn/',  eiken: 4, pos: '名詞' },
      { en: 'phone',  ja: '電話',     ph: '/foʊn/',   eiken: 5, pos: '名詞' },
      { en: 'tone',   ja: '音調',     ph: '/toʊn/',   eiken: 3, pos: '名詞' },
      { en: 'zone',   ja: '地帯',     ph: '/zoʊn/',   eiken: 3, pos: '名詞' },
      { en: 'alone',  ja: '一人で',   ph: '/əˈloʊn/', eiken: 4, pos: '形容詞' },
      { en: 'throne', ja: '王座',     ph: '/θroʊn/',  eiken: 2, pos: '名詞' },
      { en: 'clone',  ja: 'クローン', ph: '/kloʊn/',  eiken: 2, pos: '名詞' },
    ]
  },
  {
    id: 'ute_family', theme: '-ute ファミリー',
    words: [
      { en: 'cute',    ja: 'かわいい', ph: '/kjuːt/',     eiken: 4, pos: '形容詞' },
      { en: 'mute',    ja: '無言の',   ph: '/mjuːt/',     eiken: 2, pos: '形容詞' },
      { en: 'flute',   ja: 'フルート', ph: '/fluːt/',     eiken: 3, pos: '名詞' },
      { en: 'brute',   ja: '野獣',     ph: '/bruːt/',     eiken: 'p1', pos: '名詞' },
      { en: 'compute', ja: '計算する', ph: '/kəmˈpjuːt/', eiken: 2, pos: '動詞' },
      { en: 'dispute', ja: '論争',     ph: '/dɪˈspjuːt/', eiken: 2, pos: '動詞' },
    ]
  },

  // ===== Digraphs =====
  {
    id: 'sh_family', theme: 'sh- ファミリー',
    words: [
      { en: 'she',    ja: '彼女',     ph: '/ʃiː/',   eiken: 5, pos: '代名詞' },
      { en: 'ship',   ja: '船',       ph: '/ʃɪp/',   eiken: 5, pos: '名詞' },
      { en: 'shop',   ja: '店',       ph: '/ʃɑːp/',  eiken: 5, pos: '名詞' },
      { en: 'shut',   ja: '閉める',   ph: '/ʃʌt/',   eiken: 4, pos: '動詞' },
      { en: 'shine',  ja: '輝く',     ph: '/ʃaɪn/',  eiken: 4, pos: '動詞' },
      { en: 'shake',  ja: '振る',     ph: '/ʃeɪk/',  eiken: 4, pos: '動詞' },
      { en: 'share',  ja: '共有する', ph: '/ʃɛr/',   eiken: 4, pos: '動詞' },
      { en: 'shell',  ja: '貝殻',     ph: '/ʃɛl/',   eiken: 4, pos: '名詞' },
      { en: 'shelf',  ja: '棚',       ph: '/ʃɛlf/',  eiken: 4, pos: '名詞' },
      { en: 'shift',  ja: '移す',     ph: '/ʃɪft/',  eiken: 3, pos: '動詞' },
      { en: 'shock',  ja: '衝撃',     ph: '/ʃɑːk/',  eiken: 3, pos: '動詞' },
      { en: 'shout',  ja: '叫ぶ',     ph: '/ʃaʊt/',  eiken: 4, pos: '動詞' },
      { en: 'show',   ja: '見せる',   ph: '/ʃoʊ/',   eiken: 5, pos: '動詞' },
      { en: 'shower', ja: 'シャワー', ph: '/ˈʃaʊər/', eiken: 4, pos: '名詞' },
      { en: 'shrink', ja: '縮む',     ph: '/ʃrɪŋk/', eiken: 2, pos: '動詞' },
    ]
  },
  {
    id: 'ch_family', theme: 'ch- ファミリー',
    words: [
      { en: 'chin',     ja: 'あご',       ph: '/tʃɪn/',      eiken: 4, pos: '名詞' },
      { en: 'chip',     ja: 'チップ',     ph: '/tʃɪp/',      eiken: 3, pos: '名詞' },
      { en: 'chop',     ja: '切り刻む',   ph: '/tʃɑːp/',     eiken: 3, pos: '動詞' },
      { en: 'chat',     ja: 'おしゃべり', ph: '/tʃæt/',      eiken: 3, pos: '動詞' },
      { en: 'check',    ja: '確認する',   ph: '/tʃɛk/',      eiken: 4, pos: '動詞' },
      { en: 'chest',    ja: '胸',         ph: '/tʃɛst/',     eiken: 3, pos: '名詞' },
      { en: 'child',    ja: '子ども',     ph: '/tʃaɪld/',    eiken: 5, pos: '名詞' },
      { en: 'choose',   ja: '選ぶ',       ph: '/tʃuːz/',     eiken: 4, pos: '動詞' },
      { en: 'church',   ja: '教会',       ph: '/tʃɜːrtʃ/',   eiken: 4, pos: '名詞' },
      { en: 'chain',    ja: '鎖',         ph: '/tʃeɪn/',     eiken: 3, pos: '名詞' },
      { en: 'chair',    ja: '椅子',       ph: '/tʃɛr/',      eiken: 5, pos: '名詞' },
      { en: 'change',   ja: '変える',     ph: '/tʃeɪndʒ/',   eiken: 4, pos: '動詞' },
      { en: 'charge',   ja: '請求する',   ph: '/tʃɑːrdʒ/',   eiken: 3, pos: '名詞' },
      { en: 'chapter',  ja: '章',         ph: '/ˈtʃæptər/',  eiken: 3, pos: '名詞' },
      { en: 'champion', ja: 'チャンピオン', ph: '/ˈtʃæmpiən/', eiken: 3, pos: '名詞' },
    ]
  },
  {
    id: 'th_family', theme: 'th- ファミリー',
    words: [
      { en: 'the',     ja: 'その',       ph: '/ðə/',    eiken: 5, pos: '冠詞' },
      { en: 'this',    ja: 'これ',       ph: '/ðɪs/',   eiken: 5, pos: '代名詞' },
      { en: 'them',    ja: '彼らを',     ph: '/ðɛm/',   eiken: 5, pos: '代名詞' },
      { en: 'think',   ja: '考える',     ph: '/θɪŋk/',  eiken: 5, pos: '動詞' },
      { en: 'thing',   ja: 'もの',       ph: '/θɪŋ/',   eiken: 5, pos: '名詞' },
      { en: 'thin',    ja: '薄い',       ph: '/θɪn/',   eiken: 4, pos: '形容詞' },
      { en: 'thick',   ja: '厚い',       ph: '/θɪk/',   eiken: 4, pos: '形容詞' },
      { en: 'thank',   ja: '感謝する',   ph: '/θæŋk/',  eiken: 5, pos: '動詞' },
      { en: 'three',   ja: '3',          ph: '/θriː/',  eiken: 5, pos: '名詞' },
      { en: 'throw',   ja: '投げる',     ph: '/θroʊ/',  eiken: 4, pos: '名詞' },
      { en: 'through', ja: '〜を通して', ph: '/θruː/',  eiken: 4, pos: '前置詞' },
      { en: 'thought', ja: '考え',       ph: '/θɔːt/',  eiken: 4, pos: '名詞' },
      { en: 'throat',  ja: '喉',         ph: '/θroʊt/', eiken: 3, pos: '名詞' },
      { en: 'thumb',   ja: '親指',       ph: '/θʌm/',   eiken: 3, pos: '名詞' },
    ]
  },
  {
    id: 'wh_family', theme: 'wh- ファミリー',
    words: [
      { en: 'what',    ja: '何',       ph: '/wɑːt/',    eiken: 5, pos: '代名詞' },
      { en: 'when',    ja: 'いつ',     ph: '/wɛn/',     eiken: 5, pos: '副詞' },
      { en: 'where',   ja: 'どこ',     ph: '/wɛr/',     eiken: 5, pos: '副詞' },
      { en: 'which',   ja: 'どちら',   ph: '/wɪtʃ/',    eiken: 5, pos: '代名詞' },
      { en: 'while',   ja: '〜の間',   ph: '/waɪl/',    eiken: 4, pos: '接続詞' },
      { en: 'white',   ja: '白',       ph: '/waɪt/',    eiken: 5, pos: '形容詞' },
      { en: 'whale',   ja: 'クジラ',   ph: '/weɪl/',    eiken: 4, pos: '名詞' },
      { en: 'wheat',   ja: '小麦',     ph: '/wiːt/',    eiken: 3, pos: '名詞' },
      { en: 'wheel',   ja: '車輪',     ph: '/wiːl/',    eiken: 4, pos: '名詞' },
      { en: 'whisper', ja: 'ささやく', ph: '/ˈwɪspər/', eiken: 3, pos: '動詞' },
      { en: 'whistle', ja: '口笛',     ph: '/ˈwɪsl/',  eiken: 3, pos: '動詞' },
    ]
  },
  {
    id: 'ng_family', theme: '-ng ファミリー',
    words: [
      { en: 'sing',   ja: '歌う',       ph: '/sɪŋ/',    eiken: 5, pos: '動詞' },
      { en: 'ring',   ja: '指輪',       ph: '/rɪŋ/',    eiken: 5, pos: '名詞' },
      { en: 'king',   ja: '王様',       ph: '/kɪŋ/',    eiken: 4, pos: '名詞' },
      { en: 'wing',   ja: '翼',         ph: '/wɪŋ/',    eiken: 4, pos: '名詞' },
      { en: 'bring',  ja: '持ってくる', ph: '/brɪŋ/',   eiken: 5, pos: '動詞' },
      { en: 'long',   ja: '長い',       ph: '/lɔːŋ/',   eiken: 5, pos: '形容詞' },
      { en: 'song',   ja: '歌',         ph: '/sɔːŋ/',   eiken: 5, pos: '名詞' },
      { en: 'strong', ja: '強い',       ph: '/strɔːŋ/', eiken: 4, pos: '形容詞' },
      { en: 'young',  ja: '若い',       ph: '/jʌŋ/',    eiken: 4, pos: '形容詞' },
      { en: 'among',  ja: '〜の間で',   ph: '/əˈmʌŋ/',  eiken: 3, pos: '前置詞' },
      { en: 'along',  ja: '〜に沿って', ph: '/əˈlɔːŋ/', eiken: 4, pos: '前置詞' },
      { en: 'spring', ja: '春',         ph: '/sprɪŋ/',  eiken: 5, pos: '名詞' },
      { en: 'string', ja: '糸',         ph: '/strɪŋ/',  eiken: 3, pos: '名詞' },
      { en: 'swing',  ja: 'ブランコ',   ph: '/swɪŋ/',   eiken: 4, pos: '名詞' },
    ]
  },

  // ===== R-controlled vowels =====
  {
    id: 'ar_family', theme: '-ar ファミリー',
    words: [
      { en: 'car',    ja: '車',       ph: '/kɑːr/',    eiken: 5, pos: '名詞' },
      { en: 'far',    ja: '遠い',     ph: '/fɑːr/',    eiken: 5, pos: '形容詞' },
      { en: 'star',   ja: '星',       ph: '/stɑːr/',   eiken: 5, pos: '名詞' },
      { en: 'bar',    ja: 'バー',     ph: '/bɑːr/',    eiken: 4, pos: '名詞' },
      { en: 'jar',    ja: '瓶',       ph: '/dʒɑːr/',   eiken: 4, pos: '名詞' },
      { en: 'scar',   ja: '傷跡',     ph: '/skɑːr/',   eiken: 2, pos: '名詞' },
      { en: 'guitar', ja: 'ギター',   ph: '/ɡɪˈtɑːr/', eiken: 4, pos: '名詞' },
    ]
  },
  {
    id: 'ir_family', theme: '-ir ファミリー',
    words: [
      { en: 'sir',    ja: 'サー',     ph: '/sɜːr/',    eiken: 4, pos: '名詞' },
      { en: 'bird',   ja: '鳥',       ph: '/bɜːrd/',   eiken: 5, pos: '名詞' },
      { en: 'girl',   ja: '女の子',   ph: '/ɡɜːrl/',   eiken: 5, pos: '名詞' },
      { en: 'first',  ja: '最初の',   ph: '/fɜːrst/',  eiken: 5, pos: '形容詞' },
      { en: 'third',  ja: '3番目の',  ph: '/θɜːrd/',   eiken: 5, pos: '形容詞' },
      { en: 'shirt',  ja: 'シャツ',   ph: '/ʃɜːrt/',   eiken: 5, pos: '名詞' },
      { en: 'stir',   ja: 'かき混ぜる', ph: '/stɜːr/', eiken: 3, pos: '動詞' },
      { en: 'birth',  ja: '誕生',     ph: '/bɜːrθ/',   eiken: 4, pos: '名詞' },
      { en: 'circle', ja: '円',       ph: '/ˈsɜːrkl/', eiken: 4, pos: '名詞' },
    ]
  },
  {
    id: 'ur_family', theme: '-ur ファミリー',
    words: [
      { en: 'fur',     ja: '毛皮',     ph: '/fɜːr/',     eiken: 3, pos: '名詞' },
      { en: 'burn',    ja: '燃える',   ph: '/bɜːrn/',    eiken: 4, pos: '動詞' },
      { en: 'turn',    ja: '曲がる',   ph: '/tɜːrn/',    eiken: 5, pos: '動詞' },
      { en: 'nurse',   ja: '看護師',   ph: '/nɜːrs/',    eiken: 5, pos: '名詞' },
      { en: 'curve',   ja: 'カーブ',   ph: '/kɜːrv/',    eiken: 3, pos: '名詞' },
      { en: 'burst',   ja: '破裂する', ph: '/bɜːrst/',   eiken: 2, pos: '動詞' },
      { en: 'purple',  ja: '紫',       ph: '/ˈpɜːrpl/',  eiken: 4, pos: '形容詞' },
      { en: 'surface', ja: '表面',     ph: '/ˈsɜːrfɪs/', eiken: 3, pos: '名詞' },
      { en: 'disturb', ja: '邪魔する', ph: '/dɪˈstɜːrb/', eiken: 2, pos: '名詞' },
    ]
  },

  // ===== Vowel teams =====
  {
    id: 'ee_family', theme: '-ee ファミリー',
    words: [
      { en: 'see',      ja: '見る',     ph: '/siː/',      eiken: 5, pos: '動詞' },
      { en: 'bee',      ja: 'ハチ',     ph: '/biː/',      eiken: 4, pos: '名詞' },
      { en: 'tree',     ja: '木',       ph: '/triː/',     eiken: 5, pos: '名詞' },
      { en: 'free',     ja: '自由な',   ph: '/friː/',     eiken: 5, pos: '形容詞' },
      { en: 'knee',     ja: 'ひざ',     ph: '/niː/',      eiken: 4, pos: '名詞' },
      { en: 'agree',    ja: '同意する', ph: '/əˈɡriː/',   eiken: 4, pos: '動詞' },
      { en: 'degree',   ja: '度',       ph: '/dɪˈɡriː/',  eiken: 3, pos: '名詞' },
      { en: 'employee', ja: '従業員',   ph: '/ɪmˈplɔɪiː/', eiken: 2, pos: '名詞' },
    ]
  },
  {
    id: 'ea_family', theme: '-ea ファミリー',
    words: [
      { en: 'sea',    ja: '海',     ph: '/siː/',    eiken: 5, pos: '名詞' },
      { en: 'tea',    ja: 'お茶',   ph: '/tiː/',    eiken: 5, pos: '名詞' },
      { en: 'eat',    ja: '食べる', ph: '/iːt/',     eiken: 5, pos: '動詞' },
      { en: 'beat',   ja: '打つ',   ph: '/biːt/',    eiken: 4, pos: '動詞' },
      { en: 'heat',   ja: '熱',     ph: '/hiːt/',    eiken: 4, pos: '動詞' },
      { en: 'meat',   ja: '肉',     ph: '/miːt/',    eiken: 5, pos: '名詞' },
      { en: 'seat',   ja: '座席',   ph: '/siːt/',    eiken: 4, pos: '名詞' },
      { en: 'clean',  ja: 'きれいな', ph: '/kliːn/', eiken: 5, pos: '動詞' },
      { en: 'dream',  ja: '夢',     ph: '/driːm/',   eiken: 4, pos: '名詞' },
      { en: 'stream', ja: '流れ',   ph: '/striːm/',  eiken: 3, pos: '名詞' },
      { en: 'cream',  ja: 'クリーム', ph: '/kriːm/', eiken: 4, pos: '名詞' },
      { en: 'mean',   ja: '意味する', ph: '/miːn/', eiken: 4, pos: '動詞' },
      { en: 'team',   ja: 'チーム', ph: '/tiːm/',    eiken: 5, pos: '名詞' },
    ]
  },
  {
    id: 'oa_family', theme: '-oa ファミリー',
    words: [
      { en: 'boat',  ja: 'ボート',   ph: '/boʊt/',  eiken: 5, pos: '名詞' },
      { en: 'coat',  ja: 'コート',   ph: '/koʊt/',  eiken: 5, pos: '名詞' },
      { en: 'road',  ja: '道',       ph: '/roʊd/',  eiken: 5, pos: '名詞' },
      { en: 'load',  ja: '荷物',     ph: '/loʊd/',  eiken: 3, pos: '動詞' },
      { en: 'toast', ja: 'トースト', ph: '/toʊst/', eiken: 4, pos: '名詞' },
      { en: 'roast', ja: '焼く',     ph: '/roʊst/', eiken: 3, pos: '動詞' },
      { en: 'coach', ja: 'コーチ',   ph: '/koʊtʃ/', eiken: 3, pos: '名詞' },
      { en: 'goal',  ja: 'ゴール',   ph: '/ɡoʊl/',  eiken: 4, pos: '名詞' },
      { en: 'soap',  ja: '石鹸',     ph: '/soʊp/',  eiken: 4, pos: '名詞' },
      { en: 'float', ja: '浮く',     ph: '/floʊt/', eiken: 3, pos: '動詞' },
    ]
  },
  {
    id: 'ay_family', theme: '-ay ファミリー',
    words: [
      { en: 'day',     ja: '日',       ph: '/deɪ/',      eiken: 5, pos: '名詞' },
      { en: 'say',     ja: '言う',     ph: '/seɪ/',      eiken: 5, pos: '動詞' },
      { en: 'way',     ja: '道',       ph: '/weɪ/',      eiken: 5, pos: '名詞' },
      { en: 'play',    ja: '遊ぶ',     ph: '/pleɪ/',     eiken: 5, pos: '動詞' },
      { en: 'stay',    ja: '滞在する', ph: '/steɪ/',     eiken: 5, pos: '動詞' },
      { en: 'pay',     ja: '払う',     ph: '/peɪ/',      eiken: 5, pos: '動詞' },
      { en: 'may',     ja: '〜かもしれない', ph: '/meɪ/', eiken: 5, pos: '動詞' },
      { en: 'pray',    ja: '祈る',     ph: '/preɪ/',     eiken: 3, pos: '動詞' },
      { en: 'spray',   ja: 'スプレー', ph: '/spreɪ/',    eiken: 3, pos: '動詞' },
      { en: 'delay',   ja: '遅らせる', ph: '/dɪˈleɪ/',   eiken: 3, pos: '動詞' },
      { en: 'display', ja: '表示する', ph: '/dɪˈspleɪ/', eiken: 3, pos: '動詞' },
      { en: 'essay',   ja: 'エッセイ', ph: '/ˈɛseɪ/',    eiken: 3, pos: '名詞' },
      { en: 'today',   ja: '今日',     ph: '/təˈdeɪ/',   eiken: 5, pos: '副詞' },
      { en: 'holiday', ja: '休日',     ph: '/ˈhɑːlɪdeɪ/', eiken: 4, pos: '名詞' },
    ]
  },
  {
    id: 'oi_oy_family', theme: '-oi/-oy ファミリー',
    words: [
      { en: 'oil',     ja: '油',       ph: '/ɔɪl/',      eiken: 4, pos: '名詞' },
      { en: 'boil',    ja: '沸かす',   ph: '/bɔɪl/',     eiken: 3, pos: '動詞' },
      { en: 'coin',    ja: '硬貨',     ph: '/kɔɪn/',     eiken: 4, pos: '名詞' },
      { en: 'join',    ja: '参加する', ph: '/dʒɔɪn/',    eiken: 4, pos: '動詞' },
      { en: 'point',   ja: '点',       ph: '/pɔɪnt/',    eiken: 4, pos: '名詞' },
      { en: 'voice',   ja: '声',       ph: '/vɔɪs/',     eiken: 4, pos: '名詞' },
      { en: 'choice',  ja: '選択',     ph: '/tʃɔɪs/',    eiken: 3, pos: '名詞' },
      { en: 'noise',   ja: '騒音',     ph: '/nɔɪz/',     eiken: 4, pos: '名詞' },
      { en: 'boy',     ja: '男の子',   ph: '/bɔɪ/',      eiken: 5, pos: '名詞' },
      { en: 'joy',     ja: '喜び',     ph: '/dʒɔɪ/',     eiken: 3, pos: '名詞' },
      { en: 'toy',     ja: 'おもちゃ', ph: '/tɔɪ/',      eiken: 5, pos: '名詞' },
      { en: 'enjoy',   ja: '楽しむ',   ph: '/ɪnˈdʒɔɪ/', eiken: 5, pos: '動詞' },
      { en: 'employ',  ja: '雇う',     ph: '/ɪmˈplɔɪ/', eiken: 2, pos: '動詞' },
      { en: 'destroy', ja: '破壊する', ph: '/dɪˈstrɔɪ/', eiken: 3, pos: '動詞' },
    ]
  },
  {
    id: 'ou_ow_family', theme: '-ou/-ow ファミリー',
    words: [
      { en: 'out',    ja: '外',       ph: '/aʊt/',    eiken: 5, pos: '副詞' },
      { en: 'house',  ja: '家',       ph: '/haʊs/',   eiken: 5, pos: '名詞' },
      { en: 'mouse',  ja: 'ネズミ',   ph: '/maʊs/',   eiken: 5, pos: '名詞' },
      { en: 'found',  ja: '見つけた', ph: '/faʊnd/',  eiken: 4, pos: '動詞' },
      { en: 'ground', ja: '地面',     ph: '/ɡraʊnd/', eiken: 4, pos: '名詞' },
      { en: 'sound',  ja: '音',       ph: '/saʊnd/',  eiken: 5, pos: '名詞' },
      { en: 'round',  ja: '丸い',     ph: '/raʊnd/',  eiken: 5, pos: '名詞' },
      { en: 'count',  ja: '数える',   ph: '/kaʊnt/',  eiken: 4, pos: '動詞' },
      { en: 'cloud',  ja: '雲',       ph: '/klaʊd/',  eiken: 5, pos: '名詞' },
      { en: 'loud',   ja: 'うるさい', ph: '/laʊd/',   eiken: 4, pos: '形容詞' },
      { en: 'proud',  ja: '誇りに思う', ph: '/praʊd/', eiken: 3, pos: '形容詞' },
      { en: 'now',    ja: '今',       ph: '/naʊ/',    eiken: 5, pos: '副詞' },
      { en: 'how',    ja: 'どうやって', ph: '/haʊ/',  eiken: 5, pos: '副詞' },
      { en: 'cow',    ja: '牛',       ph: '/kaʊ/',    eiken: 5, pos: '名詞' },
      { en: 'town',   ja: '町',       ph: '/taʊn/',   eiken: 5, pos: '名詞' },
      { en: 'down',   ja: '下',       ph: '/daʊn/',   eiken: 5, pos: '副詞' },
      { en: 'brown',  ja: '茶色',     ph: '/braʊn/',  eiken: 5, pos: '形容詞' },
      { en: 'crown',  ja: '王冠',     ph: '/kraʊn/',  eiken: 3, pos: '名詞' },
      { en: 'power',  ja: '力',       ph: '/ˈpaʊər/', eiken: 4, pos: '名詞' },
      { en: 'flower', ja: '花',       ph: '/ˈflaʊər/', eiken: 5, pos: '名詞' },
      { en: 'tower',  ja: '塔',       ph: '/ˈtaʊər/', eiken: 3, pos: '名詞' },
    ]
  },

  // ===== Compound word chains =====
  {
    id: 'sun_compound', theme: 'sun- チェーン',
    words: [
      { en: 'sun',       ja: '太陽',       ph: '/sʌn/',        eiken: 5, pos: '名詞' },
      { en: 'sunlight',  ja: '日光',       ph: '/ˈsʌnlaɪt/',  eiken: 3, pos: '名詞' },
      { en: 'sunshine',  ja: '日差し',     ph: '/ˈsʌnʃaɪn/',  eiken: 3, pos: '名詞' },
      { en: 'sunburn',   ja: '日焼け',     ph: '/ˈsʌnbɜːrn/', eiken: 3, pos: '名詞' },
      { en: 'sunflower', ja: 'ひまわり',   ph: '/ˈsʌnflaʊər/', eiken: 3, pos: '名詞' },
    ]
  },
  {
    id: 'rain_compound', theme: 'rain- チェーン',
    words: [
      { en: 'rain',     ja: '雨',           ph: '/reɪn/',       eiken: 5, pos: '名詞' },
      { en: 'rainbow',  ja: '虹',           ph: '/ˈreɪnboʊ/',  eiken: 4, pos: '名詞' },
      { en: 'raincoat', ja: 'レインコート', ph: '/ˈreɪnkoʊt/', eiken: 4, pos: '名詞' },
      { en: 'raindrop', ja: '雨粒',         ph: '/ˈreɪndrɑːp/', eiken: 3, pos: '名詞' },
    ]
  },
  {
    id: 'bed_compound', theme: 'bed- チェーン',
    words: [
      { en: 'bed',     ja: 'ベッド', ph: '/bɛd/',       eiken: 5, pos: '名詞' },
      { en: 'bedroom', ja: '寝室',   ph: '/ˈbɛdruːm/', eiken: 5, pos: '名詞' },
      { en: 'bedtime', ja: '就寝時間', ph: '/ˈbɛdtaɪm/', eiken: 4, pos: '名詞' },
      { en: 'bedside', ja: '枕元',   ph: '/ˈbɛdsaɪd/', eiken: 3, pos: '名詞' },
    ]
  },
  {
    id: 'day_compound', theme: 'day チェーン',
    words: [
      { en: 'day',       ja: '日',       ph: '/deɪ/',         eiken: 5, pos: '名詞' },
      { en: 'today',     ja: '今日',     ph: '/təˈdeɪ/',      eiken: 5, pos: '副詞' },
      { en: 'birthday',  ja: '誕生日',   ph: '/ˈbɜːrθdeɪ/',  eiken: 5, pos: '名詞' },
      { en: 'everyday',  ja: '毎日の',   ph: '/ˈɛvrideɪ/',   eiken: 4, pos: '形容詞' },
      { en: 'yesterday', ja: '昨日',     ph: '/ˈjɛstərdeɪ/', eiken: 5, pos: '副詞' },
    ]
  },
  {
    id: 'book_compound', theme: 'book チェーン',
    words: [
      { en: 'book',      ja: '本',           ph: '/bʊk/',        eiken: 5, pos: '名詞' },
      { en: 'bookshelf', ja: '本棚',         ph: '/ˈbʊkʃɛlf/',  eiken: 4, pos: '名詞' },
      { en: 'bookmark',  ja: 'しおり',       ph: '/ˈbʊkmɑːrk/', eiken: 3, pos: '名詞' },
      { en: 'notebook',  ja: 'ノート',       ph: '/ˈnoʊtbʊk/',  eiken: 5, pos: '名詞' },
      { en: 'textbook',  ja: '教科書',       ph: '/ˈtɛkstbʊk/', eiken: 4, pos: '名詞' },
    ]
  },
  {
    id: 'foot_compound', theme: 'foot チェーン',
    words: [
      { en: 'foot',      ja: '足',       ph: '/fʊt/',          eiken: 5, pos: '名詞' },
      { en: 'football',  ja: 'サッカー', ph: '/ˈfʊtbɔːl/',    eiken: 5, pos: '名詞' },
      { en: 'footprint', ja: '足跡',     ph: '/ˈfʊtprɪnt/',   eiken: 3, pos: '名詞' },
      { en: 'footstep',  ja: '足音',     ph: '/ˈfʊtstɛp/',    eiken: 3, pos: '名詞' },
      { en: 'barefoot',  ja: 'はだしの', ph: '/ˈbɛrfʊt/',     eiken: 2, pos: '形容詞' },
    ]
  },
  {
    id: 'water_compound', theme: 'water チェーン',
    words: [
      { en: 'water',      ja: '水',         ph: '/ˈwɔːtər/',       eiken: 5, pos: '名詞' },
      { en: 'waterfall',  ja: '滝',         ph: '/ˈwɔːtərfɔːl/',  eiken: 3, pos: '名詞' },
      { en: 'waterproof', ja: '防水の',     ph: '/ˈwɔːtərpruːf/', eiken: 2, pos: '形容詞' },
      { en: 'underwater', ja: '水中の',     ph: '/ˌʌndərˈwɔːtər/', eiken: 3, pos: '形容詞' },
    ]
  },
  {
    id: 'out_compound', theme: 'out- チェーン',
    words: [
      { en: 'out',         ja: '外に',       ph: '/aʊt/',           eiken: 5, pos: '副詞' },
      { en: 'outside',     ja: '外側',       ph: '/ˌaʊtˈsaɪd/',    eiken: 5, pos: '副詞' },
      { en: 'outdoor',     ja: '屋外の',     ph: '/ˈaʊtdɔːr/',     eiken: 4, pos: '形容詞' },
      { en: 'outcome',     ja: '結果',       ph: '/ˈaʊtkʌm/',      eiken: 2, pos: '名詞' },
      { en: 'output',      ja: '出力',       ph: '/ˈaʊtpʊt/',      eiken: 2, pos: '名詞' },
      { en: 'outstanding', ja: '際立った',   ph: '/aʊtˈstændɪŋ/',  eiken: 2, pos: '形容詞' },
      { en: 'outgoing',    ja: '社交的な',   ph: '/ˈaʊtɡoʊɪŋ/',    eiken: 2, pos: '形容詞' },
    ]
  },

  // ===== Prefix chains =====
  {
    id: 'un_prefix', theme: 'un- 接頭辞チェーン',
    words: [
      { en: 'happy',   ja: '幸せな',     ph: '/ˈhæpi/',    eiken: 5, pos: '形容詞' },
      { en: 'unhappy', ja: '不幸な',     ph: '/ʌnˈhæpi/',  eiken: 4, pos: '形容詞' },
      { en: 'fair',    ja: '公平な',     ph: '/fɛr/',       eiken: 4, pos: '形容詞' },
      { en: 'unfair',  ja: '不公平な',   ph: '/ʌnˈfɛr/',   eiken: 3, pos: '形容詞' },
      { en: 'lock',    ja: '鍵をかける', ph: '/lɑːk/',      eiken: 4, pos: '動詞' },
      { en: 'unlock',  ja: '鍵を開ける', ph: '/ʌnˈlɑːk/',  eiken: 3, pos: '動詞' },
      { en: 'usual',   ja: '普通の',     ph: '/ˈjuːʒuəl/', eiken: 4, pos: '形容詞' },
      { en: 'unusual', ja: '珍しい',     ph: '/ʌnˈjuːʒuəl/', eiken: 3, pos: '形容詞' },
    ]
  },
  {
    id: 're_prefix', theme: 're- 接頭辞チェーン',
    words: [
      { en: 'play',    ja: '遊ぶ',       ph: '/pleɪ/',      eiken: 5, pos: '動詞' },
      { en: 'replay',  ja: 'もう一度再生', ph: '/riːˈpleɪ/', eiken: 3, pos: '動詞' },
      { en: 'write',   ja: '書く',       ph: '/raɪt/',      eiken: 5, pos: '動詞' },
      { en: 'rewrite', ja: '書き直す',   ph: '/riːˈraɪt/',  eiken: 3, pos: '動詞' },
      { en: 'build',   ja: '建てる',     ph: '/bɪld/',      eiken: 4, pos: '動詞' },
      { en: 'rebuild', ja: '建て直す',   ph: '/riːˈbɪld/',  eiken: 3, pos: '動詞' },
      { en: 'turn',    ja: '曲がる',     ph: '/tɜːrn/',     eiken: 5, pos: '動詞' },
      { en: 'return',  ja: '戻る',       ph: '/rɪˈtɜːrn/',  eiken: 4, pos: '動詞' },
      { en: 'view',    ja: '景色',       ph: '/vjuː/',      eiken: 4, pos: '動詞' },
      { en: 'review',  ja: '復習する',   ph: '/rɪˈvjuː/',   eiken: 3, pos: '動詞' },
    ]
  },
  {
    id: 'dis_prefix', theme: 'dis- 接頭辞チェーン',
    words: [
      { en: 'like',       ja: '好き',       ph: '/laɪk/',        eiken: 5, pos: '動詞' },
      { en: 'dislike',    ja: '嫌い',       ph: '/dɪsˈlaɪk/',   eiken: 3, pos: '動詞' },
      { en: 'agree',      ja: '同意する',   ph: '/əˈɡriː/',     eiken: 4, pos: '動詞' },
      { en: 'disagree',   ja: '反対する',   ph: '/ˌdɪsəˈɡriː/', eiken: 3, pos: '動詞' },
      { en: 'cover',      ja: '覆う',       ph: '/ˈkʌvər/',     eiken: 4, pos: '動詞' },
      { en: 'discover',   ja: '発見する',   ph: '/dɪˈskʌvər/',  eiken: 4, pos: '動詞' },
      { en: 'appear',     ja: '現れる',     ph: '/əˈpɪr/',      eiken: 4, pos: '動詞' },
      { en: 'disappear',  ja: '消える',     ph: '/ˌdɪsəˈpɪr/',  eiken: 3, pos: '動詞' },
      { en: 'connect',    ja: 'つなぐ',     ph: '/kəˈnɛkt/',    eiken: 3, pos: '動詞' },
      { en: 'disconnect', ja: '切断する',   ph: '/ˌdɪskəˈnɛkt/', eiken: 2, pos: '動詞' },
    ]
  },

  // ===== Suffix chains =====
  {
    id: 'ful_suffix', theme: '-ful 接尾辞チェーン',
    words: [
      { en: 'hope',      ja: '希望',       ph: '/hoʊp/',       eiken: 4, pos: '名詞' },
      { en: 'hopeful',   ja: '希望に満ちた', ph: '/ˈhoʊpfəl/', eiken: 3, pos: '形容詞' },
      { en: 'care',      ja: '気にかける', ph: '/kɛr/',        eiken: 4, pos: '名詞' },
      { en: 'careful',   ja: '注意深い',   ph: '/ˈkɛrfəl/',   eiken: 4, pos: '形容詞' },
      { en: 'power',     ja: '力',         ph: '/ˈpaʊər/',     eiken: 4, pos: '名詞' },
      { en: 'powerful',  ja: '力強い',     ph: '/ˈpaʊərfəl/', eiken: 3, pos: '形容詞' },
      { en: 'wonder',    ja: '不思議',     ph: '/ˈwʌndər/',    eiken: 4, pos: '動詞' },
      { en: 'wonderful', ja: 'すばらしい', ph: '/ˈwʌndərfəl/', eiken: 4, pos: '形容詞' },
      { en: 'beauty',    ja: '美しさ',     ph: '/ˈbjuːti/',    eiken: 4, pos: '名詞' },
      { en: 'beautiful', ja: '美しい',     ph: '/ˈbjuːtɪfəl/', eiken: 5, pos: '形容詞' },
      { en: 'peace',     ja: '平和',       ph: '/piːs/',       eiken: 4, pos: '名詞' },
      { en: 'peaceful',  ja: '平和な',     ph: '/ˈpiːsfəl/',  eiken: 3, pos: '形容詞' },
      { en: 'cheer',     ja: '応援する',   ph: '/tʃɪr/',       eiken: 3, pos: '名詞' },
      { en: 'cheerful',  ja: '陽気な',     ph: '/ˈtʃɪrfəl/',  eiken: 3, pos: '形容詞' },
    ]
  },
  {
    id: 'ly_suffix', theme: '-ly 接尾辞チェーン',
    words: [
      { en: 'quick',   ja: '速い',       ph: '/kwɪk/',      eiken: 4, pos: '形容詞' },
      { en: 'quickly', ja: 'すばやく',   ph: '/ˈkwɪkli/',   eiken: 4, pos: '副詞' },
      { en: 'slow',    ja: '遅い',       ph: '/sloʊ/',      eiken: 5, pos: '形容詞' },
      { en: 'slowly',  ja: 'ゆっくり',   ph: '/ˈsloʊli/',   eiken: 4, pos: '副詞' },
      { en: 'kind',    ja: '親切な',     ph: '/kaɪnd/',     eiken: 5, pos: '形容詞' },
      { en: 'kindly',  ja: '親切に',     ph: '/ˈkaɪndli/',  eiken: 3, pos: '副詞' },
      { en: 'brave',   ja: '勇敢な',     ph: '/breɪv/',     eiken: 3, pos: '形容詞' },
      { en: 'bravely', ja: '勇敢に',     ph: '/ˈbreɪvli/',  eiken: 3, pos: '副詞' },
      { en: 'safe',    ja: '安全な',     ph: '/seɪf/',      eiken: 4, pos: '形容詞' },
      { en: 'safely',  ja: '安全に',     ph: '/ˈseɪfli/',   eiken: 4, pos: '副詞' },
      { en: 'loud',    ja: 'うるさい',   ph: '/laʊd/',      eiken: 4, pos: '形容詞' },
      { en: 'loudly',  ja: '大声で',     ph: '/ˈlaʊdli/',   eiken: 4, pos: '副詞' },
      { en: 'final',   ja: '最終の',     ph: '/ˈfaɪnl/',    eiken: 4, pos: '名詞' },
      { en: 'finally', ja: 'ついに',     ph: '/ˈfaɪnəli/',  eiken: 4, pos: '副詞' },
    ]
  },
  {
    id: 'er_doer_suffix', theme: '-er（する人）チェーン',
    words: [
      { en: 'teach',   ja: '教える',   ph: '/tiːtʃ/',     eiken: 5, pos: '名詞' },
      { en: 'teacher', ja: '先生',     ph: '/ˈtiːtʃər/',  eiken: 5, pos: '名詞' },
      { en: 'sing',    ja: '歌う',     ph: '/sɪŋ/',       eiken: 5, pos: '動詞' },
      { en: 'singer',  ja: '歌手',     ph: '/ˈsɪŋər/',    eiken: 4, pos: '名詞' },
      { en: 'work',    ja: '働く',     ph: '/wɜːrk/',     eiken: 5, pos: '動詞' },
      { en: 'worker',  ja: '労働者',   ph: '/ˈwɜːrkər/',  eiken: 4, pos: '名詞' },
      { en: 'read',    ja: '読む',     ph: '/riːd/',      eiken: 5, pos: '動詞' },
      { en: 'reader',  ja: '読者',     ph: '/ˈriːdər/',   eiken: 4, pos: '名詞' },
      { en: 'lead',    ja: '導く',     ph: '/liːd/',      eiken: 4, pos: '名詞' },
      { en: 'leader',  ja: 'リーダー', ph: '/ˈliːdər/',   eiken: 4, pos: '名詞' },
      { en: 'drive',   ja: '運転する', ph: '/draɪv/',     eiken: 4, pos: '動詞' },
      { en: 'driver',  ja: '運転手',   ph: '/ˈdraɪvər/',  eiken: 4, pos: '名詞' },
      { en: 'farm',    ja: '農場',     ph: '/fɑːrm/',     eiken: 4, pos: '名詞' },
      { en: 'farmer',  ja: '農家',     ph: '/ˈfɑːrmər/',  eiken: 4, pos: '名詞' },
    ]
  },
  {
    id: 'est_suffix', theme: '-est 最上級チェーン',
    words: [
      { en: 'fast',      ja: '速い',       ph: '/fæst/',       eiken: 5, pos: '形容詞' },
      { en: 'fastest',   ja: '最も速い',   ph: '/ˈfæstɪst/',   eiken: 4, pos: '形容詞' },
      { en: 'tall',      ja: '高い',       ph: '/tɔːl/',       eiken: 5, pos: '形容詞' },
      { en: 'tallest',   ja: '最も高い',   ph: '/ˈtɔːlɪst/',   eiken: 4, pos: '形容詞' },
      { en: 'big',       ja: '大きい',     ph: '/bɪɡ/',        eiken: 5, pos: '形容詞' },
      { en: 'biggest',   ja: '最も大きい', ph: '/ˈbɪɡɪst/',    eiken: 4, pos: '形容詞' },
      { en: 'small',     ja: '小さい',     ph: '/smɔːl/',      eiken: 5, pos: '形容詞' },
      { en: 'smallest',  ja: '最も小さい', ph: '/ˈsmɔːlɪst/',  eiken: 4, pos: '形容詞' },
      { en: 'long',      ja: '長い',       ph: '/lɔːŋ/',       eiken: 5, pos: '形容詞' },
      { en: 'longest',   ja: '最も長い',   ph: '/ˈlɔːŋɡɪst/', eiken: 4, pos: '形容詞' },
      { en: 'strong',    ja: '強い',       ph: '/strɔːŋ/',     eiken: 4, pos: '形容詞' },
      { en: 'strongest', ja: '最も強い',   ph: '/ˈstrɔːŋɡɪst/', eiken: 4, pos: '形容詞' },
    ]
  },
  {
    id: 'ness_suffix', theme: '-ness 接尾辞チェーン',
    words: [
      { en: 'kind',      ja: '親切な',   ph: '/kaɪnd/',       eiken: 5, pos: '形容詞' },
      { en: 'kindness',  ja: '親切',     ph: '/ˈkaɪndnɪs/',  eiken: 3, pos: '名詞' },
      { en: 'dark',      ja: '暗い',     ph: '/dɑːrk/',       eiken: 4, pos: '形容詞' },
      { en: 'darkness',  ja: '暗闇',     ph: '/ˈdɑːrknɪs/',  eiken: 3, pos: '名詞' },
      { en: 'happy',     ja: '幸せな',   ph: '/ˈhæpi/',       eiken: 5, pos: '形容詞' },
      { en: 'happiness', ja: '幸福',     ph: '/ˈhæpinɪs/',   eiken: 3, pos: '名詞' },
      { en: 'sad',       ja: '悲しい',   ph: '/sæd/',         eiken: 5, pos: '形容詞' },
      { en: 'sadness',   ja: '悲しみ',   ph: '/ˈsædnɪs/',    eiken: 3, pos: '名詞' },
      { en: 'weak',      ja: '弱い',     ph: '/wiːk/',        eiken: 4, pos: '形容詞' },
      { en: 'weakness',  ja: '弱さ',     ph: '/ˈwiːknɪs/',   eiken: 3, pos: '名詞' },
      { en: 'ill',       ja: '病気の',   ph: '/ɪl/',          eiken: 4, pos: '名詞' },
      { en: 'illness',   ja: '病気',     ph: '/ˈɪlnɪs/',     eiken: 3, pos: '名詞' },
    ]
  },
  {
    id: 'able_suffix', theme: '-able 接尾辞チェーン',
    words: [
      { en: 'read',        ja: '読む',       ph: '/riːd/',          eiken: 5, pos: '動詞' },
      { en: 'readable',    ja: '読みやすい', ph: '/ˈriːdəbl/',      eiken: 3, pos: '形容詞' },
      { en: 'comfort',     ja: '快適さ',     ph: '/ˈkʌmfərt/',     eiken: 3, pos: '名詞' },
      { en: 'comfortable', ja: '快適な',     ph: '/ˈkʌmftərəbl/',  eiken: 3, pos: '形容詞' },
      { en: 'reason',      ja: '理由',       ph: '/ˈriːzn/',        eiken: 4, pos: '名詞' },
      { en: 'reasonable',  ja: '合理的な',   ph: '/ˈriːznəbl/',     eiken: 3, pos: '形容詞' },
      { en: 'enjoy',       ja: '楽しむ',     ph: '/ɪnˈdʒɔɪ/',      eiken: 5, pos: '動詞' },
      { en: 'enjoyable',   ja: '楽しい',     ph: '/ɪnˈdʒɔɪəbl/',   eiken: 3, pos: '形容詞' },
      { en: 'believe',     ja: '信じる',     ph: '/bɪˈliːv/',       eiken: 4, pos: '動詞' },
      { en: 'believable',  ja: '信じられる', ph: '/bɪˈliːvəbl/',    eiken: 2, pos: '形容詞' },
    ]
  },

  // ===== Consonant blend families =====
  {
    id: 'bl_family', theme: 'bl- ファミリー',
    words: [
      { en: 'blue',  ja: '青',       ph: '/bluː/',  eiken: 5, pos: '形容詞' },
      { en: 'black', ja: '黒',       ph: '/blæk/',  eiken: 5, pos: '形容詞' },
      { en: 'block', ja: 'ブロック', ph: '/blɑːk/', eiken: 3, pos: '名詞' },
      { en: 'blind', ja: '目の見えない', ph: '/blaɪnd/', eiken: 3, pos: '形容詞' },
      { en: 'blood', ja: '血',       ph: '/blʌd/',  eiken: 4, pos: '名詞' },
      { en: 'blow',  ja: '吹く',     ph: '/bloʊ/',  eiken: 4, pos: '動詞' },
      { en: 'blade', ja: '刃',       ph: '/bleɪd/', eiken: 2, pos: '名詞' },
      { en: 'blame', ja: '非難する', ph: '/bleɪm/', eiken: 3, pos: '動詞' },
      { en: 'blank', ja: '空白の',   ph: '/blæŋk/', eiken: 3, pos: '形容詞' },
      { en: 'blast', ja: '爆発',     ph: '/blæst/', eiken: 2, pos: '名詞' },
      { en: 'blend', ja: '混ぜる',   ph: '/blɛnd/', eiken: 2, pos: '名詞' },
      { en: 'bless', ja: '祝福する', ph: '/blɛs/',  eiken: 2, pos: '名詞' },
    ]
  },
  {
    id: 'br_family', theme: 'br- ファミリー',
    words: [
      { en: 'bring',   ja: '持ってくる', ph: '/brɪŋ/',    eiken: 5, pos: '動詞' },
      { en: 'brown',   ja: '茶色',       ph: '/braʊn/',   eiken: 5, pos: '形容詞' },
      { en: 'break',   ja: '壊す',       ph: '/breɪk/',   eiken: 4, pos: '動詞' },
      { en: 'bread',   ja: 'パン',       ph: '/brɛd/',    eiken: 5, pos: '名詞' },
      { en: 'brain',   ja: '脳',         ph: '/breɪn/',   eiken: 4, pos: '名詞' },
      { en: 'brave',   ja: '勇敢な',     ph: '/breɪv/',   eiken: 3, pos: '形容詞' },
      { en: 'brick',   ja: 'レンガ',     ph: '/brɪk/',    eiken: 3, pos: '名詞' },
      { en: 'bridge',  ja: '橋',         ph: '/brɪdʒ/',   eiken: 4, pos: '名詞' },
      { en: 'bright',  ja: '明るい',     ph: '/braɪt/',   eiken: 4, pos: '形容詞' },
      { en: 'broad',   ja: '広い',       ph: '/brɔːd/',   eiken: 3, pos: '形容詞' },
      { en: 'brush',   ja: 'ブラシ',     ph: '/brʌʃ/',    eiken: 4, pos: '名詞' },
      { en: 'branch',  ja: '枝',         ph: '/bræntʃ/',  eiken: 3, pos: '名詞' },
    ]
  },
  {
    id: 'cl_family', theme: 'cl- ファミリー',
    words: [
      { en: 'class', ja: 'クラス',   ph: '/klæs/',   eiken: 5, pos: '名詞' },
      { en: 'clean', ja: 'きれいな', ph: '/kliːn/',  eiken: 5, pos: '動詞' },
      { en: 'clear', ja: '澄んだ',  ph: '/klɪr/',   eiken: 4, pos: '形容詞' },
      { en: 'climb', ja: '登る',     ph: '/klaɪm/',  eiken: 4, pos: '動詞' },
      { en: 'clock', ja: '時計',     ph: '/klɑːk/',  eiken: 5, pos: '名詞' },
      { en: 'close', ja: '閉じる',   ph: '/kloʊz/',  eiken: 5, pos: '動詞' },
      { en: 'cloud', ja: '雲',       ph: '/klaʊd/',  eiken: 5, pos: '名詞' },
      { en: 'club',  ja: 'クラブ',   ph: '/klʌb/',   eiken: 4, pos: '名詞' },
      { en: 'claim', ja: '主張する', ph: '/kleɪm/',  eiken: 2, pos: '動詞' },
      { en: 'clap',  ja: '拍手する', ph: '/klæp/',   eiken: 3, pos: '動詞' },
    ]
  },
  {
    id: 'cr_family', theme: 'cr- ファミリー',
    words: [
      { en: 'cross',  ja: '渡る',     ph: '/krɔːs/',   eiken: 4, pos: '動詞' },
      { en: 'cry',    ja: '泣く',     ph: '/kraɪ/',    eiken: 5, pos: '動詞' },
      { en: 'cream',  ja: 'クリーム', ph: '/kriːm/',   eiken: 4, pos: '名詞' },
      { en: 'create', ja: '創造する', ph: '/kriˈeɪt/', eiken: 3, pos: '動詞' },
      { en: 'crew',   ja: '乗組員',   ph: '/kruː/',    eiken: 3, pos: '名詞' },
      { en: 'crime',  ja: '犯罪',     ph: '/kraɪm/',   eiken: 3, pos: '名詞' },
      { en: 'crop',   ja: '作物',     ph: '/krɑːp/',   eiken: 3, pos: '名詞' },
      { en: 'crowd',  ja: '群衆',     ph: '/kraʊd/',   eiken: 3, pos: '名詞' },
      { en: 'crown',  ja: '王冠',     ph: '/kraʊn/',   eiken: 3, pos: '名詞' },
      { en: 'crush',  ja: '押しつぶす', ph: '/krʌʃ/',  eiken: 2, pos: '動詞' },
      { en: 'crash',  ja: '衝突する', ph: '/kræʃ/',    eiken: 3, pos: '動詞' },
      { en: 'craft',  ja: '工芸',     ph: '/kræft/',   eiken: 2, pos: '名詞' },
    ]
  },
  {
    id: 'dr_family', theme: 'dr- ファミリー',
    words: [
      { en: 'draw',  ja: '描く',     ph: '/drɔː/',  eiken: 5, pos: '動詞' },
      { en: 'dream', ja: '夢',       ph: '/driːm/', eiken: 4, pos: '名詞' },
      { en: 'dress', ja: 'ドレス',   ph: '/drɛs/',  eiken: 5, pos: '動詞' },
      { en: 'drink', ja: '飲む',     ph: '/drɪŋk/', eiken: 5, pos: '動詞' },
      { en: 'drive', ja: '運転する', ph: '/draɪv/', eiken: 4, pos: '動詞' },
      { en: 'drop',  ja: '落とす',   ph: '/drɑːp/', eiken: 4, pos: '名詞' },
      { en: 'dry',   ja: '乾いた',   ph: '/draɪ/',  eiken: 5, pos: '動詞' },
      { en: 'drug',  ja: '薬',       ph: '/drʌɡ/',  eiken: 3, pos: '名詞' },
      { en: 'drum',  ja: '太鼓',     ph: '/drʌm/',  eiken: 4, pos: '名詞' },
      { en: 'draft', ja: '下書き',   ph: '/dræft/', eiken: 2, pos: '名詞' },
      { en: 'drain', ja: '排水する', ph: '/dreɪn/', eiken: 2, pos: '名詞' },
      { en: 'drama', ja: 'ドラマ',   ph: '/ˈdrɑːmə/', eiken: 3, pos: '名詞' },
    ]
  },
  {
    id: 'fl_family', theme: 'fl- ファミリー',
    words: [
      { en: 'fly',    ja: '飛ぶ',   ph: '/flaɪ/',   eiken: 5, pos: '動詞' },
      { en: 'flag',   ja: '旗',     ph: '/flæɡ/',   eiken: 4, pos: '名詞' },
      { en: 'flat',   ja: '平らな', ph: '/flæt/',   eiken: 3, pos: '形容詞' },
      { en: 'floor',  ja: '床',     ph: '/flɔːr/',  eiken: 5, pos: '名詞' },
      { en: 'flow',   ja: '流れる', ph: '/floʊ/',   eiken: 3, pos: '動詞' },
      { en: 'flower', ja: '花',     ph: '/ˈflaʊər/', eiken: 5, pos: '名詞' },
      { en: 'flash',  ja: '閃光',   ph: '/flæʃ/',   eiken: 3, pos: '動詞' },
      { en: 'flight', ja: '飛行',   ph: '/flaɪt/',  eiken: 4, pos: '名詞' },
      { en: 'float',  ja: '浮く',   ph: '/floʊt/',  eiken: 3, pos: '動詞' },
      { en: 'flood',  ja: '洪水',   ph: '/flʌd/',   eiken: 3, pos: '名詞' },
      { en: 'flame',  ja: '炎',     ph: '/fleɪm/',  eiken: 3, pos: '名詞' },
    ]
  },
  {
    id: 'gr_family', theme: 'gr- ファミリー',
    words: [
      { en: 'green', ja: '緑',       ph: '/ɡriːn/',  eiken: 5, pos: '形容詞' },
      { en: 'grow',  ja: '育つ',     ph: '/ɡroʊ/',   eiken: 5, pos: '動詞' },
      { en: 'great', ja: '素晴らしい', ph: '/ɡreɪt/', eiken: 5, pos: '形容詞' },
      { en: 'group', ja: 'グループ', ph: '/ɡruːp/',  eiken: 4, pos: '名詞' },
      { en: 'grass', ja: '草',       ph: '/ɡræs/',   eiken: 4, pos: '名詞' },
      { en: 'grand', ja: '壮大な',   ph: '/ɡrænd/',  eiken: 3, pos: '形容詞' },
      { en: 'grade', ja: '学年',     ph: '/ɡreɪd/',  eiken: 4, pos: '名詞' },
      { en: 'grab',  ja: 'つかむ',   ph: '/ɡræb/',   eiken: 3, pos: '動詞' },
      { en: 'graph', ja: 'グラフ',   ph: '/ɡræf/',   eiken: 3, pos: '名詞' },
      { en: 'grave', ja: '墓',       ph: '/ɡreɪv/',  eiken: 2, pos: '名詞' },
      { en: 'grip',  ja: '握る',     ph: '/ɡrɪp/',   eiken: 3, pos: '名詞' },
      { en: 'groan', ja: 'うめく',   ph: '/ɡroʊn/',  eiken: 2, pos: '動詞' },
    ]
  },
  {
    id: 'sp_family', theme: 'sp- ファミリー',
    words: [
      { en: 'speak',   ja: '話す',     ph: '/spiːk/',    eiken: 5, pos: '動詞' },
      { en: 'speed',   ja: '速さ',     ph: '/spiːd/',    eiken: 4, pos: '名詞' },
      { en: 'spend',   ja: '使う',     ph: '/spɛnd/',    eiken: 4, pos: '動詞' },
      { en: 'spin',    ja: '回転する', ph: '/spɪn/',     eiken: 3, pos: '動詞' },
      { en: 'sport',   ja: 'スポーツ', ph: '/spɔːrt/',   eiken: 5, pos: '名詞' },
      { en: 'spot',    ja: '場所',     ph: '/spɑːt/',    eiken: 3, pos: '名詞' },
      { en: 'space',   ja: '宇宙',     ph: '/speɪs/',    eiken: 4, pos: '名詞' },
      { en: 'special', ja: '特別な',   ph: '/ˈspɛʃəl/',  eiken: 4, pos: '形容詞' },
      { en: 'spell',   ja: 'つづる',   ph: '/spɛl/',     eiken: 4, pos: '名詞' },
      { en: 'spirit',  ja: '精神',     ph: '/ˈspɪrɪt/',  eiken: 3, pos: '名詞' },
      { en: 'split',   ja: '分ける',   ph: '/splɪt/',    eiken: 2, pos: '動詞' },
      { en: 'spread',  ja: '広げる',   ph: '/sprɛd/',    eiken: 3, pos: '動詞' },
      { en: 'spring',  ja: '春',       ph: '/sprɪŋ/',    eiken: 5, pos: '名詞' },
    ]
  },
  {
    id: 'st_family', theme: 'st- ファミリー',
    words: [
      { en: 'stop',   ja: '止まる',   ph: '/stɑːp/',   eiken: 5, pos: '動詞' },
      { en: 'stand',  ja: '立つ',     ph: '/stænd/',   eiken: 5, pos: '動詞' },
      { en: 'start',  ja: '始める',   ph: '/stɑːrt/',  eiken: 5, pos: '動詞' },
      { en: 'stay',   ja: '滞在する', ph: '/steɪ/',    eiken: 5, pos: '動詞' },
      { en: 'step',   ja: '歩み',     ph: '/stɛp/',    eiken: 4, pos: '名詞' },
      { en: 'still',  ja: 'まだ',     ph: '/stɪl/',    eiken: 5, pos: '副詞' },
      { en: 'stone',  ja: '石',       ph: '/stoʊn/',   eiken: 4, pos: '名詞' },
      { en: 'store',  ja: '店',       ph: '/stɔːr/',   eiken: 5, pos: '名詞' },
      { en: 'storm',  ja: '嵐',       ph: '/stɔːrm/',  eiken: 4, pos: '名詞' },
      { en: 'story',  ja: '物語',     ph: '/ˈstɔːri/', eiken: 5, pos: '名詞' },
      { en: 'street', ja: '通り',     ph: '/striːt/',  eiken: 5, pos: '名詞' },
      { en: 'strong', ja: '強い',     ph: '/strɔːŋ/',  eiken: 4, pos: '形容詞' },
      { en: 'study',  ja: '勉強する', ph: '/ˈstʌdi/',  eiken: 5, pos: '動詞' },
      { en: 'style',  ja: 'スタイル', ph: '/staɪl/',   eiken: 3, pos: '名詞' },
    ]
  },
  {
    id: 'tr_family', theme: 'tr- ファミリー',
    words: [
      { en: 'try',     ja: '試す',     ph: '/traɪ/',     eiken: 5, pos: '動詞' },
      { en: 'tree',    ja: '木',       ph: '/triː/',     eiken: 5, pos: '名詞' },
      { en: 'train',   ja: '電車',     ph: '/treɪn/',    eiken: 5, pos: '名詞' },
      { en: 'track',   ja: '線路',     ph: '/træk/',     eiken: 3, pos: '名詞' },
      { en: 'trade',   ja: '貿易',     ph: '/treɪd/',    eiken: 3, pos: '動詞' },
      { en: 'trap',    ja: '罠',       ph: '/træp/',     eiken: 3, pos: '名詞' },
      { en: 'travel',  ja: '旅行する', ph: '/ˈtrævl/',   eiken: 4, pos: '動詞' },
      { en: 'treat',   ja: '扱う',     ph: '/triːt/',    eiken: 3, pos: '動詞' },
      { en: 'trick',   ja: 'トリック', ph: '/trɪk/',     eiken: 3, pos: '名詞' },
      { en: 'trip',    ja: '旅行',     ph: '/trɪp/',     eiken: 4, pos: '名詞' },
      { en: 'true',    ja: '本当の',   ph: '/truː/',     eiken: 5, pos: '形容詞' },
      { en: 'trust',   ja: '信頼する', ph: '/trʌst/',    eiken: 3, pos: '名詞' },
      { en: 'trouble', ja: '問題',     ph: '/ˈtrʌbl/',   eiken: 4, pos: '名詞' },
    ]
  },
  {
    id: 'sw_family', theme: 'sw- ファミリー',
    words: [
      { en: 'swim',   ja: '泳ぐ',     ph: '/swɪm/',   eiken: 5, pos: '動詞' },
      { en: 'sweet',  ja: '甘い',     ph: '/swiːt/',  eiken: 5, pos: '形容詞' },
      { en: 'swing',  ja: 'ブランコ', ph: '/swɪŋ/',   eiken: 4, pos: '名詞' },
      { en: 'switch', ja: 'スイッチ', ph: '/swɪtʃ/',  eiken: 3, pos: '名詞' },
      { en: 'sweep',  ja: '掃く',     ph: '/swiːp/',  eiken: 3, pos: '動詞' },
      { en: 'swear',  ja: '誓う',     ph: '/swɛr/',   eiken: 2, pos: '動詞' },
      { en: 'sword',  ja: '剣',       ph: '/sɔːrd/',  eiken: 3, pos: '名詞' },
    ]
  },
  {
    id: 'sn_family', theme: 'sn- ファミリー',
    words: [
      { en: 'snow',   ja: '雪',       ph: '/snoʊ/',   eiken: 5, pos: '名詞' },
      { en: 'snake',  ja: 'ヘビ',     ph: '/sneɪk/',  eiken: 4, pos: '名詞' },
      { en: 'snap',   ja: 'パチンと折る', ph: '/snæp/', eiken: 3, pos: '動詞' },
      { en: 'snack',  ja: 'おやつ',   ph: '/snæk/',   eiken: 4, pos: '名詞' },
      { en: 'sneeze', ja: 'くしゃみ', ph: '/sniːz/',  eiken: 3, pos: '動詞' },
    ]
  },
  {
    id: 'sm_family', theme: 'sm- ファミリー',
    words: [
      { en: 'small',  ja: '小さい',   ph: '/smɔːl/',   eiken: 5, pos: '形容詞' },
      { en: 'smart',  ja: '賢い',     ph: '/smɑːrt/',  eiken: 4, pos: '形容詞' },
      { en: 'smile',  ja: '微笑む',   ph: '/smaɪl/',   eiken: 5, pos: '動詞' },
      { en: 'smell',  ja: '匂い',     ph: '/smɛl/',    eiken: 4, pos: '動詞' },
      { en: 'smooth', ja: '滑らかな', ph: '/smuːð/',   eiken: 3, pos: '形容詞' },
      { en: 'smoke',  ja: '煙',       ph: '/smoʊk/',   eiken: 4, pos: '名詞' },
      { en: 'smash',  ja: '粉砕する', ph: '/smæʃ/',    eiken: 2, pos: '動詞' },
    ]
  },
  {
    id: 'pl_family', theme: 'pl- ファミリー',
    words: [
      { en: 'plan',   ja: '計画',     ph: '/plæn/',    eiken: 4, pos: '名詞' },
      { en: 'play',   ja: '遊ぶ',     ph: '/pleɪ/',    eiken: 5, pos: '動詞' },
      { en: 'place',  ja: '場所',     ph: '/pleɪs/',   eiken: 5, pos: '名詞' },
      { en: 'plant',  ja: '植物',     ph: '/plænt/',   eiken: 4, pos: '名詞' },
      { en: 'please', ja: 'どうぞ',   ph: '/pliːz/',   eiken: 5, pos: '名詞' },
      { en: 'plus',   ja: 'プラス',   ph: '/plʌs/',    eiken: 4, pos: '前置詞' },
      { en: 'plate',  ja: '皿',       ph: '/pleɪt/',   eiken: 4, pos: '名詞' },
      { en: 'plain',  ja: '平野',     ph: '/pleɪn/',   eiken: 3, pos: '形容詞' },
    ]
  },
  {
    id: 'pr_family', theme: 'pr- ファミリー',
    words: [
      { en: 'price',   ja: '値段',     ph: '/praɪs/',     eiken: 4, pos: '名詞' },
      { en: 'print',   ja: '印刷する', ph: '/prɪnt/',     eiken: 4, pos: '動詞' },
      { en: 'present', ja: 'プレゼント', ph: '/ˈprɛznt/', eiken: 4, pos: '名詞' },
      { en: 'press',   ja: '押す',     ph: '/prɛs/',      eiken: 3, pos: '名詞' },
      { en: 'pretty',  ja: 'かわいい', ph: '/ˈprɪti/',    eiken: 5, pos: '形容詞' },
      { en: 'prince',  ja: '王子',     ph: '/prɪns/',     eiken: 4, pos: '名詞' },
      { en: 'prize',   ja: '賞',       ph: '/praɪz/',     eiken: 3, pos: '名詞' },
      { en: 'proud',   ja: '誇りに思う', ph: '/praʊd/',   eiken: 3, pos: '形容詞' },
      { en: 'prove',   ja: '証明する', ph: '/pruːv/',     eiken: 3, pos: '動詞' },
      { en: 'protect', ja: '守る',     ph: '/prəˈtɛkt/',  eiken: 3, pos: '動詞' },
    ]
  },
  {
    id: 'sl_family', theme: 'sl- ファミリー',
    words: [
      { en: 'sleep', ja: '眠る',   ph: '/sliːp/',  eiken: 5, pos: '動詞' },
      { en: 'slow',  ja: '遅い',   ph: '/sloʊ/',   eiken: 5, pos: '形容詞' },
      { en: 'slide', ja: '滑る',   ph: '/slaɪd/',  eiken: 4, pos: '動詞' },
      { en: 'slip',  ja: '滑る',   ph: '/slɪp/',   eiken: 3, pos: '動詞' },
      { en: 'slim',  ja: '細い',   ph: '/slɪm/',   eiken: 3, pos: '形容詞' },
      { en: 'slice', ja: '一切れ', ph: '/slaɪs/',  eiken: 3, pos: '名詞' },
      { en: 'slope', ja: '坂',     ph: '/sloʊp/',  eiken: 3, pos: '名詞' },
    ]
  },
  {
    id: 'tw_family', theme: 'tw- ファミリー',
    words: [
      { en: 'two',    ja: '2',       ph: '/tuː/',    eiken: 5, pos: '名詞' },
      { en: 'twelve', ja: '12',      ph: '/twɛlv/',  eiken: 5, pos: '名詞' },
      { en: 'twin',   ja: '双子',   ph: '/twɪn/',   eiken: 3, pos: '名詞' },
      { en: 'twice',  ja: '2回',     ph: '/twaɪs/',  eiken: 4, pos: '副詞' },
      { en: 'twist',  ja: 'ねじる', ph: '/twɪst/',  eiken: 3, pos: '動詞' },
    ]
  },
  // ---- 追加分（rimes / affixes / roots / onsets）----
  {
    id: "ab_family",
    theme: "-ab ファミリー",
    words: [
      {en: "cab",ja: "タクシー",ph: "/kæb/",eiken: 4,pos: "名詞"},
      {en: "crab",ja: "カニ",ph: "/kræb/",eiken: 4,pos: "名詞"},
      {en: "lab",ja: "研究室",ph: "/læb/",eiken: 3,pos: "名詞"},
      {en: "tab",ja: "つまみ・勘定",ph: "/tæb/",eiken: 2,pos: "名詞"},
      {en: "jab",ja: "軽く突く",ph: "/dʒæb/",eiken: 2,pos: "動詞"},
      {en: "slab",ja: "厚板",ph: "/slæb/",eiken: "p1",pos: "名詞"},
      {en: "drab",ja: "単調な",ph: "/dræb/",eiken: 1,pos: "形容詞"},
      {en: "scab",ja: "かさぶた",ph: "/skæb/",eiken: "p1",pos: "名詞"},
      {en: "kebab",ja: "ケバブ",ph: "/kəˈbɑːb/",eiken: 2,pos: "名詞"},
    ]
  },
  {
    id: "ash_family",
    theme: "-ash ファミリー",
    words: [
      {en: "cash",ja: "現金",ph: "/kæʃ/",eiken: 4,pos: "名詞"},
      {en: "wash",ja: "洗う",ph: "/wɑːʃ/",eiken: 5,pos: "動詞"},
      {en: "dash",ja: "突進する",ph: "/dæʃ/",eiken: 3,pos: "動詞"},
      {en: "trash",ja: "ごみ",ph: "/træʃ/",eiken: 3,pos: "名詞"},
      {en: "rash",ja: "発疹・軽率な",ph: "/ræʃ/",eiken: "p2",pos: "名詞"},
      {en: "splash",ja: "はねかける",ph: "/splæʃ/",eiken: 2,pos: "動詞"},
      {en: "clash",ja: "衝突する",ph: "/klæʃ/",eiken: 2,pos: "動詞"},
      {en: "slash",ja: "切りつける・削減する",ph: "/slæʃ/",eiken: "p1",pos: "動詞"},
      {en: "gnash",ja: "歯ぎしりする",ph: "/næʃ/",eiken: 1,pos: "動詞"},
      {en: "stash",ja: "隠す",ph: "/stæʃ/",eiken: 1,pos: "動詞"},
      {en: "lash",ja: "むち打つ",ph: "/læʃ/",eiken: 1,pos: "動詞"},
      {en: "backlash",ja: "反発",ph: "/ˈbæklæʃ/",eiken: 1,pos: "名詞"},
      {en: "eyelash",ja: "まつげ",ph: "/ˈaɪlæʃ/",eiken: 2,pos: "名詞"},
    ]
  },
  {
    id: "ast_family",
    theme: "-ast ファミリー",
    words: [
      {en: "last",ja: "最後の",ph: "/læst/",eiken: 5,pos: "形容詞"},
      {en: "past",ja: "過去",ph: "/pæst/",eiken: 4,pos: "名詞"},
      {en: "cast",ja: "配役・投げる",ph: "/kæst/",eiken: 3,pos: "名詞"},
      {en: "vast",ja: "広大な",ph: "/væst/",eiken: "p2",pos: "形容詞"},
      {en: "contrast",ja: "対照",ph: "/ˈkɑːntræst/",eiken: "p2",pos: "名詞"},
      {en: "forecast",ja: "予報",ph: "/ˈfɔːrkæst/",eiken: "p2",pos: "名詞"},
      {en: "broadcast",ja: "放送する",ph: "/ˈbrɔːdkæst/",eiken: "p2",pos: "動詞"},
      {en: "breakfast",ja: "朝食",ph: "/ˈbrekfəst/",eiken: 5,pos: "名詞"},
      {en: "outcast",ja: "のけ者",ph: "/ˈaʊtkæst/",eiken: "p1",pos: "名詞"},
      {en: "steadfast",ja: "不動の",ph: "/ˈstedfæst/",eiken: 1,pos: "形容詞"},
      {en: "enthusiast",ja: "熱狂的愛好者",ph: "/ɪnˈθuːziæst/",eiken: "p1",pos: "名詞"},
    ]
  },
  {
    id: "amp_family",
    theme: "-amp ファミリー",
    words: [
      {en: "camp",ja: "キャンプ",ph: "/kæmp/",eiken: 5,pos: "名詞"},
      {en: "lamp",ja: "ランプ",ph: "/læmp/",eiken: 4,pos: "名詞"},
      {en: "stamp",ja: "切手",ph: "/stæmp/",eiken: 4,pos: "名詞"},
      {en: "damp",ja: "湿った",ph: "/dæmp/",eiken: 2,pos: "形容詞"},
      {en: "cramp",ja: "けいれん",ph: "/kræmp/",eiken: "p1",pos: "名詞"},
      {en: "clamp",ja: "締め具",ph: "/klæmp/",eiken: "p1",pos: "名詞"},
      {en: "champ",ja: "チャンピオン",ph: "/tʃæmp/",eiken: 2,pos: "名詞"},
      {en: "swamp",ja: "沼地",ph: "/swɑːmp/",eiken: 2,pos: "名詞"},
      {en: "revamp",ja: "改良する",ph: "/riːˈvæmp/",eiken: 1,pos: "動詞"},
      {en: "tramp",ja: "放浪者",ph: "/træmp/",eiken: "p1",pos: "名詞"},
    ]
  },
  {
    id: "ang_family",
    theme: "-ang ファミリー",
    words: [
      {en: "bang",ja: "バンという音",ph: "/bæŋ/",eiken: 3,pos: "名詞"},
      {en: "hang",ja: "掛ける",ph: "/hæŋ/",eiken: 3,pos: "動詞"},
      {en: "sang",ja: "歌った",ph: "/sæŋ/",eiken: 4,pos: "動詞"},
      {en: "rang",ja: "鳴った",ph: "/ræŋ/",eiken: 4,pos: "動詞"},
      {en: "gang",ja: "一団",ph: "/ɡæŋ/",eiken: 2,pos: "名詞"},
      {en: "fang",ja: "牙",ph: "/fæŋ/",eiken: "p1",pos: "名詞"},
      {en: "slang",ja: "俗語",ph: "/slæŋ/",eiken: "p2",pos: "名詞"},
      {en: "twang",ja: "鼻にかかる声",ph: "/twæŋ/",eiken: 1,pos: "名詞"},
      {en: "boomerang",ja: "ブーメラン",ph: "/ˈbuːməræŋ/",eiken: 2,pos: "名詞"},
    ]
  },
  {
    id: "ant_family",
    theme: "-ant ファミリー",
    words: [
      {en: "want",ja: "欲しい",ph: "/wɑːnt/",eiken: 5,pos: "動詞"},
      {en: "giant",ja: "巨人",ph: "/ˈdʒaɪənt/",eiken: 3,pos: "名詞"},
      {en: "grant",ja: "与える・補助金",ph: "/ɡrænt/",eiken: 2,pos: "動詞"},
      {en: "chant",ja: "唱える",ph: "/tʃænt/",eiken: 2,pos: "動詞"},
      {en: "slant",ja: "傾く",ph: "/slænt/",eiken: "p1",pos: "動詞"},
      {en: "elegant",ja: "優雅な",ph: "/ˈelɪɡənt/",eiken: "p2",pos: "形容詞"},
      {en: "important",ja: "重要な",ph: "/ɪmˈpɔːrtnt/",eiken: 4,pos: "形容詞"},
      {en: "restaurant",ja: "レストラン",ph: "/ˈrestərɑːnt/",eiken: 4,pos: "名詞"},
      {en: "assistant",ja: "助手",ph: "/əˈsɪstənt/",eiken: 3,pos: "名詞"},
      {en: "pleasant",ja: "楽しい",ph: "/ˈpleznt/",eiken: 3,pos: "形容詞"},
      {en: "abundant",ja: "豊富な",ph: "/əˈbʌndənt/",eiken: "p1",pos: "形容詞"},
      {en: "reluctant",ja: "気が進まない",ph: "/rɪˈlʌktənt/",eiken: "p1",pos: "形容詞"},
      {en: "arrogant",ja: "傲慢な",ph: "/ˈærəɡənt/",eiken: "p1",pos: "形容詞"},
    ]
  },
  {
    id: "ask_family",
    theme: "-ask ファミリー",
    words: [
      {en: "task",ja: "仕事・課題",ph: "/tæsk/",eiken: 3,pos: "名詞"},
      {en: "mask",ja: "仮面・マスク",ph: "/mæsk/",eiken: 3,pos: "名詞"},
      {en: "flask",ja: "フラスコ・水筒",ph: "/flæsk/",eiken: "p1",pos: "名詞"},
      {en: "bask",ja: "日光浴する",ph: "/bæsk/",eiken: 1,pos: "動詞"},
      {en: "cask",ja: "樽",ph: "/kæsk/",eiken: 1,pos: "名詞"},
      {en: "multitask",ja: "同時に複数の作業をする",ph: "/ˌmʌltiˈtæsk/",eiken: "p1",pos: "動詞"},
    ]
  },
  {
    id: "atch_family",
    theme: "-atch ファミリー",
    words: [
      {en: "catch",ja: "捕まえる",ph: "/kætʃ/",eiken: 4,pos: "動詞"},
      {en: "match",ja: "試合・マッチ",ph: "/mætʃ/",eiken: 4,pos: "名詞"},
      {en: "watch",ja: "見る・腕時計",ph: "/wɑːtʃ/",eiken: 5,pos: "動詞"},
      {en: "patch",ja: "つぎ当て",ph: "/pætʃ/",eiken: 2,pos: "名詞"},
      {en: "batch",ja: "一回分",ph: "/bætʃ/",eiken: "p1",pos: "名詞"},
      {en: "hatch",ja: "孵化する",ph: "/hætʃ/",eiken: 2,pos: "動詞"},
      {en: "latch",ja: "掛け金",ph: "/lætʃ/",eiken: "p1",pos: "名詞"},
      {en: "scratch",ja: "引っかく",ph: "/skrætʃ/",eiken: 2,pos: "動詞"},
      {en: "snatch",ja: "ひったくる",ph: "/snætʃ/",eiken: "p1",pos: "動詞"},
      {en: "dispatch",ja: "派遣する",ph: "/dɪˈspætʃ/",eiken: "p1",pos: "動詞"},
    ]
  },
  {
    id: "end_family",
    theme: "-end ファミリー",
    words: [
      {en: "send",ja: "送る",ph: "/send/",eiken: 4,pos: "動詞"},
      {en: "lend",ja: "貸す",ph: "/lend/",eiken: 4,pos: "動詞"},
      {en: "bend",ja: "曲げる",ph: "/bend/",eiken: 3,pos: "動詞"},
      {en: "trend",ja: "傾向",ph: "/trend/",eiken: "p2",pos: "名詞"},
      {en: "attend",ja: "出席する",ph: "/əˈtend/",eiken: 3,pos: "動詞"},
      {en: "pretend",ja: "ふりをする",ph: "/prɪˈtend/",eiken: 3,pos: "動詞"},
      {en: "extend",ja: "延長する",ph: "/ɪkˈstend/",eiken: "p2",pos: "動詞"},
      {en: "depend",ja: "頼る",ph: "/dɪˈpend/",eiken: 3,pos: "動詞"},
      {en: "recommend",ja: "勧める",ph: "/ˌrekəˈmend/",eiken: 3,pos: "動詞"},
    ]
  },
  {
    id: "end_family_2",
    theme: "-end ファミリー2",
    words: [
      {en: "weekend",ja: "週末",ph: "/ˈwiːkend/",eiken: 5,pos: "名詞"},
      {en: "legend",ja: "伝説",ph: "/ˈledʒənd/",eiken: 2,pos: "名詞"},
      {en: "suspend",ja: "一時停止する",ph: "/səˈspend/",eiken: "p1",pos: "動詞"},
      {en: "comprehend",ja: "理解する",ph: "/ˌkɑːmprɪˈhend/",eiken: "p1",pos: "動詞"},
      {en: "friend",ja: "友だち",ph: "/frend/",eiken: 5,pos: "名詞"},
      {en: "defend",ja: "守る",ph: "/dɪˈfend/",eiken: 2,pos: "動詞"},
      {en: "offend",ja: "怒らせる",ph: "/əˈfend/",eiken: "p1",pos: "動詞"},
      {en: "intend",ja: "意図する",ph: "/ɪnˈtend/",eiken: "p2",pos: "動詞"},
    ]
  },
  {
    id: "ench_family",
    theme: "-ench ファミリー",
    words: [
      {en: "bench",ja: "ベンチ",ph: "/bentʃ/",eiken: 3,pos: "名詞"},
      {en: "french",ja: "フランスの",ph: "/frentʃ/",eiken: 4,pos: "形容詞"},
      {en: "trench",ja: "溝",ph: "/trentʃ/",eiken: "p1",pos: "名詞"},
      {en: "wrench",ja: "レンチ・ねじる",ph: "/rentʃ/",eiken: 1,pos: "名詞"},
      {en: "drench",ja: "びしょ濡れにする",ph: "/drentʃ/",eiken: 1,pos: "動詞"},
      {en: "quench",ja: "（渇きを）いやす",ph: "/kwentʃ/",eiken: 1,pos: "動詞"},
      {en: "stench",ja: "悪臭",ph: "/stentʃ/",eiken: 1,pos: "名詞"},
      {en: "clench",ja: "握りしめる",ph: "/klentʃ/",eiken: 1,pos: "動詞"},
    ]
  },
  {
    id: "est_family",
    theme: "-est ファミリー",
    words: [
      {en: "best",ja: "最も良い",ph: "/best/",eiken: 5,pos: "形容詞"},
      {en: "rest",ja: "休む",ph: "/rest/",eiken: 4,pos: "動詞"},
      {en: "test",ja: "テスト",ph: "/test/",eiken: 5,pos: "名詞"},
      {en: "nest",ja: "巣",ph: "/nest/",eiken: 3,pos: "名詞"},
      {en: "guest",ja: "客",ph: "/ɡest/",eiken: 3,pos: "名詞"},
      {en: "west",ja: "西",ph: "/west/",eiken: 4,pos: "名詞"},
      {en: "quest",ja: "探求",ph: "/kwest/",eiken: "p1",pos: "名詞"},
      {en: "contest",ja: "コンテスト",ph: "/ˈkɑːntest/",eiken: 3,pos: "名詞"},
      {en: "protest",ja: "抗議する",ph: "/prəˈtest/",eiken: "p2",pos: "動詞"},
      {en: "request",ja: "依頼",ph: "/rɪˈkwest/",eiken: "p2",pos: "名詞"},
    ]
  },
  {
    id: "est_family_2",
    theme: "-est ファミリー2",
    words: [
      {en: "suggest",ja: "提案する",ph: "/səɡˈdʒest/",eiken: "p2",pos: "動詞"},
      {en: "invest",ja: "投資する",ph: "/ɪnˈvest/",eiken: 2,pos: "動詞"},
      {en: "manifest",ja: "明らかにする",ph: "/ˈmænɪfest/",eiken: 1,pos: "動詞"},
      {en: "modest",ja: "謙虚な",ph: "/ˈmɑːdɪst/",eiken: 2,pos: "形容詞"},
      {en: "honest",ja: "正直な",ph: "/ˈɑːnɪst/",eiken: 3,pos: "形容詞"},
      {en: "interest",ja: "興味",ph: "/ˈɪntrəst/",eiken: 4,pos: "名詞"},
      {en: "forest",ja: "森",ph: "/ˈfɔːrɪst/",eiken: 4,pos: "名詞"},
      {en: "harvest",ja: "収穫",ph: "/ˈhɑːrvɪst/",eiken: 2,pos: "名詞"},
      {en: "digest",ja: "消化する",ph: "/daɪˈdʒest/",eiken: "p1",pos: "動詞"},
    ]
  },
  {
    id: "ick_family",
    theme: "-ick ファミリー",
    words: [
      {en: "click",ja: "クリックする",ph: "/klɪk/",eiken: 3,pos: "動詞"},
      {en: "lick",ja: "なめる",ph: "/lɪk/",eiken: 2,pos: "動詞"},
      {en: "chick",ja: "ひよこ",ph: "/tʃɪk/",eiken: 2,pos: "名詞"},
      {en: "limerick",ja: "五行戯詩",ph: "/ˈlɪmərɪk/",eiken: 1,pos: "名詞"},
      {en: "maverick",ja: "一匹狼",ph: "/ˈmævərɪk/",eiken: 1,pos: "名詞"},
      {en: "lipstick",ja: "口紅",ph: "/ˈlɪpstɪk/",eiken: 2,pos: "名詞"},
      {en: "toothpick",ja: "つまようじ",ph: "/ˈtuːθpɪk/",eiken: 2,pos: "名詞"},
      {en: "homesick",ja: "ホームシックの",ph: "/ˈhoʊmsɪk/",eiken: 2,pos: "形容詞"},
      {en: "seasick",ja: "船酔いの",ph: "/ˈsiːsɪk/",eiken: 2,pos: "形容詞"},
      {en: "gimmick",ja: "仕掛け",ph: "/ˈɡɪmɪk/",eiken: 1,pos: "名詞"},
      {en: "slick",ja: "つるつるした・巧妙な",ph: "/slɪk/",eiken: 1,pos: "形容詞"},
      {en: "flick",ja: "はじく",ph: "/flɪk/",eiken: 1,pos: "動詞"},
    ]
  },
  {
    id: "ill_family",
    theme: "-ill ファミリー",
    words: [
      {en: "hill",ja: "丘",ph: "/hɪl/",eiken: 4,pos: "名詞"},
      {en: "fill",ja: "満たす",ph: "/fɪl/",eiken: 3,pos: "動詞"},
      {en: "kill",ja: "殺す",ph: "/kɪl/",eiken: 3,pos: "動詞"},
      {en: "skill",ja: "技能",ph: "/skɪl/",eiken: 3,pos: "名詞"},
      {en: "spill",ja: "こぼす",ph: "/spɪl/",eiken: 2,pos: "動詞"},
      {en: "drill",ja: "訓練・ドリル",ph: "/drɪl/",eiken: 2,pos: "名詞"},
      {en: "chill",ja: "寒気・冷やす",ph: "/tʃɪl/",eiken: 2,pos: "名詞"},
      {en: "thrill",ja: "ぞくぞくさせる",ph: "/θrɪl/",eiken: 2,pos: "動詞"},
    ]
  },
  {
    id: "ill_family_2",
    theme: "-ill ファミリー2",
    words: [
      {en: "grill",ja: "グリル",ph: "/ɡrɪl/",eiken: 2,pos: "名詞"},
      {en: "bill",ja: "請求書",ph: "/bɪl/",eiken: 3,pos: "名詞"},
      {en: "fulfill",ja: "果たす",ph: "/fʊlˈfɪl/",eiken: "p1",pos: "動詞"},
      {en: "windmill",ja: "風車",ph: "/ˈwɪndmɪl/",eiken: 2,pos: "名詞"},
      {en: "instill",ja: "教え込む",ph: "/ɪnˈstɪl/",eiken: 1,pos: "動詞"},
      {en: "will",ja: "〜だろう・意志",ph: "/wɪl/",eiken: 4,pos: "名詞"},
      {en: "treadmill",ja: "ランニングマシン",ph: "/ˈtredmɪl/",eiken: 2,pos: "名詞"},
      {en: "goodwill",ja: "好意",ph: "/ˌɡʊdˈwɪl/",eiken: 1,pos: "名詞"},
    ]
  },
  {
    id: "ink_family",
    theme: "-ink ファミリー",
    words: [
      {en: "pink",ja: "ピンク",ph: "/pɪŋk/",eiken: 5,pos: "形容詞"},
      {en: "sink",ja: "沈む・流し",ph: "/sɪŋk/",eiken: 3,pos: "動詞"},
      {en: "wink",ja: "ウインク",ph: "/wɪŋk/",eiken: 2,pos: "動詞"},
      {en: "blink",ja: "まばたきする",ph: "/blɪŋk/",eiken: 2,pos: "動詞"},
      {en: "link",ja: "つなぐ",ph: "/lɪŋk/",eiken: 3,pos: "動詞"},
      {en: "brink",ja: "瀬戸際",ph: "/brɪŋk/",eiken: 1,pos: "名詞"},
      {en: "rethink",ja: "考え直す",ph: "/ˌriːˈθɪŋk/",eiken: "p1",pos: "動詞"},
    ]
  },
  {
    id: "int_family",
    theme: "-int ファミリー",
    words: [
      {en: "mint",ja: "ミント",ph: "/mɪnt/",eiken: 3,pos: "名詞"},
      {en: "hint",ja: "ヒント",ph: "/hɪnt/",eiken: 3,pos: "名詞"},
      {en: "paint",ja: "塗る・絵の具",ph: "/peɪnt/",eiken: 4,pos: "動詞"},
      {en: "sprint",ja: "全力疾走する",ph: "/sprɪnt/",eiken: 2,pos: "動詞"},
      {en: "squint",ja: "目を細める",ph: "/skwɪnt/",eiken: 1,pos: "動詞"},
      {en: "glint",ja: "きらめく",ph: "/ɡlɪnt/",eiken: 1,pos: "動詞"},
      {en: "blueprint",ja: "青写真",ph: "/ˈbluːprɪnt/",eiken: "p1",pos: "名詞"},
      {en: "complaint",ja: "苦情",ph: "/kəmˈpleɪnt/",eiken: "p2",pos: "名詞"},
      {en: "appoint",ja: "任命する",ph: "/əˈpɔɪnt/",eiken: 2,pos: "動詞"},
      {en: "disappoint",ja: "失望させる",ph: "/ˌdɪsəˈpɔɪnt/",eiken: 3,pos: "動詞"},
    ]
  },
  {
    id: "ish_family",
    theme: "-ish ファミリー",
    words: [
      {en: "fish",ja: "魚",ph: "/fɪʃ/",eiken: 5,pos: "名詞"},
      {en: "dish",ja: "皿・料理",ph: "/dɪʃ/",eiken: 4,pos: "名詞"},
      {en: "wish",ja: "願う",ph: "/wɪʃ/",eiken: 4,pos: "動詞"},
      {en: "finish",ja: "終える",ph: "/ˈfɪnɪʃ/",eiken: 4,pos: "動詞"},
      {en: "polish",ja: "磨く",ph: "/ˈpɑːlɪʃ/",eiken: 2,pos: "動詞"},
      {en: "publish",ja: "出版する",ph: "/ˈpʌblɪʃ/",eiken: "p2",pos: "動詞"},
      {en: "punish",ja: "罰する",ph: "/ˈpʌnɪʃ/",eiken: 2,pos: "動詞"},
      {en: "selfish",ja: "わがままな",ph: "/ˈselfɪʃ/",eiken: 2,pos: "形容詞"},
      {en: "foolish",ja: "ばかな",ph: "/ˈfuːlɪʃ/",eiken: 3,pos: "形容詞"},
      {en: "cherish",ja: "大切にする",ph: "/ˈtʃerɪʃ/",eiken: "p1",pos: "動詞"},
      {en: "vanish",ja: "消える",ph: "/ˈvænɪʃ/",eiken: 2,pos: "動詞"},
      {en: "establish",ja: "設立する",ph: "/ɪˈstæblɪʃ/",eiken: "p2",pos: "動詞"},
      {en: "accomplish",ja: "成し遂げる",ph: "/əˈkɑːmplɪʃ/",eiken: 2,pos: "動詞"},
      {en: "diminish",ja: "減少する",ph: "/dɪˈmɪnɪʃ/",eiken: "p1",pos: "動詞"},
      {en: "flourish",ja: "繁栄する",ph: "/ˈflɜːrɪʃ/",eiken: "p1",pos: "動詞"},
    ]
  },
  {
    id: "itch_family",
    theme: "-itch ファミリー",
    words: [
      {en: "pitch",ja: "投げる・音の高さ",ph: "/pɪtʃ/",eiken: 2,pos: "名詞"},
      {en: "witch",ja: "魔女",ph: "/wɪtʃ/",eiken: 3,pos: "名詞"},
      {en: "ditch",ja: "溝",ph: "/dɪtʃ/",eiken: "p1",pos: "名詞"},
      {en: "stitch",ja: "縫い目",ph: "/stɪtʃ/",eiken: "p1",pos: "名詞"},
      {en: "twitch",ja: "ぴくぴく動く",ph: "/twɪtʃ/",eiken: 1,pos: "動詞"},
      {en: "glitch",ja: "不具合",ph: "/ɡlɪtʃ/",eiken: 1,pos: "名詞"},
    ]
  },
  {
    id: "ock_family",
    theme: "-ock ファミリー",
    words: [
      {en: "rock",ja: "岩",ph: "/rɑːk/",eiken: 3,pos: "名詞"},
      {en: "sock",ja: "靴下",ph: "/sɑːk/",eiken: 4,pos: "名詞"},
      {en: "knock",ja: "ノックする",ph: "/nɑːk/",eiken: 3,pos: "動詞"},
      {en: "dock",ja: "波止場",ph: "/dɑːk/",eiken: "p1",pos: "名詞"},
      {en: "padlock",ja: "南京錠",ph: "/ˈpædlɑːk/",eiken: "p1",pos: "名詞"},
      {en: "gridlock",ja: "交通渋滞・行き詰まり",ph: "/ˈɡrɪdlɑːk/",eiken: 1,pos: "名詞"},
    ]
  },
  {
    id: "ong_family",
    theme: "-ong ファミリー",
    words: [
      {en: "wrong",ja: "間違った",ph: "/rɔːŋ/",eiken: 4,pos: "形容詞"},
      {en: "belong",ja: "属する",ph: "/bɪˈlɔːŋ/",eiken: 3,pos: "動詞"},
      {en: "prolong",ja: "長引かせる",ph: "/prəˈlɔːŋ/",eiken: "p1",pos: "動詞"},
      {en: "lifelong",ja: "生涯の",ph: "/ˈlaɪflɔːŋ/",eiken: 2,pos: "形容詞"},
      {en: "headlong",ja: "まっさかさまに",ph: "/ˈhedlɔːŋ/",eiken: 1,pos: "副詞"},
      {en: "oblong",ja: "長方形の",ph: "/ˈɑːblɔːŋ/",eiken: 1,pos: "形容詞"},
    ]
  },
  {
    id: "uck_family",
    theme: "-uck ファミリー",
    words: [
      {en: "duck",ja: "アヒル",ph: "/dʌk/",eiken: 4,pos: "名詞"},
      {en: "luck",ja: "運",ph: "/lʌk/",eiken: 3,pos: "名詞"},
      {en: "truck",ja: "トラック",ph: "/trʌk/",eiken: 4,pos: "名詞"},
      {en: "stuck",ja: "動けない",ph: "/stʌk/",eiken: 2,pos: "形容詞"},
      {en: "struck",ja: "打った",ph: "/strʌk/",eiken: 2,pos: "動詞"},
      {en: "pluck",ja: "摘む",ph: "/plʌk/",eiken: "p1",pos: "動詞"},
      {en: "tuck",ja: "押し込む",ph: "/tʌk/",eiken: "p1",pos: "動詞"},
      {en: "suck",ja: "吸う",ph: "/sʌk/",eiken: 2,pos: "動詞"},
      {en: "woodchuck",ja: "ウッドチャック",ph: "/ˈwʊdtʃʌk/",eiken: 1,pos: "名詞"},
    ]
  },
  {
    id: "uff_family",
    theme: "-uff ファミリー",
    words: [
      {en: "stuff",ja: "もの",ph: "/stʌf/",eiken: 3,pos: "名詞"},
      {en: "puff",ja: "ぷっと吹く",ph: "/pʌf/",eiken: 2,pos: "動詞"},
      {en: "cuff",ja: "袖口",ph: "/kʌf/",eiken: "p1",pos: "名詞"},
      {en: "bluff",ja: "はったり",ph: "/blʌf/",eiken: 1,pos: "名詞"},
      {en: "fluff",ja: "綿毛",ph: "/flʌf/",eiken: 1,pos: "名詞"},
      {en: "gruff",ja: "ぶっきらぼうな",ph: "/ɡrʌf/",eiken: 1,pos: "形容詞"},
      {en: "scuff",ja: "すり減らす",ph: "/skʌf/",eiken: 1,pos: "動詞"},
      {en: "handcuff",ja: "手錠",ph: "/ˈhændkʌf/",eiken: "p1",pos: "名詞"},
    ]
  },
  {
    id: "ump_family",
    theme: "-ump ファミリー",
    words: [
      {en: "jump",ja: "跳ぶ",ph: "/dʒʌmp/",eiken: 5,pos: "動詞"},
      {en: "bump",ja: "ぶつかる",ph: "/bʌmp/",eiken: 2,pos: "動詞"},
      {en: "pump",ja: "ポンプ",ph: "/pʌmp/",eiken: 2,pos: "名詞"},
      {en: "dump",ja: "捨てる",ph: "/dʌmp/",eiken: 2,pos: "動詞"},
      {en: "lump",ja: "塊",ph: "/lʌmp/",eiken: "p1",pos: "名詞"},
      {en: "stump",ja: "切り株",ph: "/stʌmp/",eiken: 1,pos: "名詞"},
      {en: "plump",ja: "ふっくらした",ph: "/plʌmp/",eiken: "p1",pos: "形容詞"},
      {en: "slump",ja: "暴落する",ph: "/slʌmp/",eiken: "p1",pos: "動詞"},
      {en: "grump",ja: "不平家",ph: "/ɡrʌmp/",eiken: 1,pos: "名詞"},
    ]
  },
  {
    id: "unch_family",
    theme: "-unch ファミリー",
    words: [
      {en: "lunch",ja: "昼食",ph: "/lʌntʃ/",eiken: 5,pos: "名詞"},
      {en: "bunch",ja: "束",ph: "/bʌntʃ/",eiken: 2,pos: "名詞"},
      {en: "punch",ja: "殴る",ph: "/pʌntʃ/",eiken: 2,pos: "動詞"},
      {en: "crunch",ja: "バリバリかむ",ph: "/krʌntʃ/",eiken: "p1",pos: "動詞"},
      {en: "hunch",ja: "予感",ph: "/hʌntʃ/",eiken: 1,pos: "名詞"},
      {en: "munch",ja: "むしゃむしゃ食べる",ph: "/mʌntʃ/",eiken: 1,pos: "動詞"},
      {en: "brunch",ja: "ブランチ",ph: "/brʌntʃ/",eiken: 2,pos: "名詞"},
    ]
  },
  {
    id: "ung_family",
    theme: "-ung ファミリー",
    words: [
      {en: "hung",ja: "掛けた",ph: "/hʌŋ/",eiken: 3,pos: "動詞"},
      {en: "lung",ja: "肺",ph: "/lʌŋ/",eiken: 2,pos: "名詞"},
      {en: "sung",ja: "歌われた",ph: "/sʌŋ/",eiken: 3,pos: "動詞"},
      {en: "stung",ja: "刺した",ph: "/stʌŋ/",eiken: "p1",pos: "動詞"},
      {en: "swung",ja: "振った",ph: "/swʌŋ/",eiken: "p1",pos: "動詞"},
      {en: "clung",ja: "しがみついた",ph: "/klʌŋ/",eiken: 1,pos: "動詞"},
      {en: "flung",ja: "投げた",ph: "/flʌŋ/",eiken: 1,pos: "動詞"},
      {en: "rung",ja: "はしごの段",ph: "/rʌŋ/",eiken: 1,pos: "名詞"},
    ]
  },
  {
    id: "unk_family",
    theme: "-unk ファミリー",
    words: [
      {en: "junk",ja: "がらくた",ph: "/dʒʌŋk/",eiken: 2,pos: "名詞"},
      {en: "trunk",ja: "幹・トランク",ph: "/trʌŋk/",eiken: 2,pos: "名詞"},
      {en: "skunk",ja: "スカンク",ph: "/skʌŋk/",eiken: 2,pos: "名詞"},
      {en: "chunk",ja: "大きな塊",ph: "/tʃʌŋk/",eiken: "p1",pos: "名詞"},
      {en: "bunk",ja: "寝台",ph: "/bʌŋk/",eiken: "p1",pos: "名詞"},
      {en: "drunk",ja: "酔った",ph: "/drʌŋk/",eiken: 2,pos: "形容詞"},
      {en: "shrunk",ja: "縮んだ",ph: "/ʃrʌŋk/",eiken: "p1",pos: "動詞"},
    ]
  },
  {
    id: "ush_family",
    theme: "-ush ファミリー",
    words: [
      {en: "rush",ja: "急ぐ",ph: "/rʌʃ/",eiken: 3,pos: "動詞"},
      {en: "push",ja: "押す",ph: "/pʊʃ/",eiken: 4,pos: "動詞"},
      {en: "blush",ja: "赤面する",ph: "/blʌʃ/",eiken: 2,pos: "動詞"},
      {en: "flush",ja: "流す",ph: "/flʌʃ/",eiken: "p1",pos: "動詞"},
      {en: "hush",ja: "静かにさせる",ph: "/hʌʃ/",eiken: "p1",pos: "動詞"},
      {en: "plush",ja: "豪華な",ph: "/plʌʃ/",eiken: 1,pos: "形容詞"},
      {en: "ambush",ja: "待ち伏せ",ph: "/ˈæmbʊʃ/",eiken: 1,pos: "名詞"},
    ]
  },
  {
    id: "ust_family",
    theme: "-ust ファミリー",
    words: [
      {en: "must",ja: "〜しなければならない",ph: "/mʌst/",eiken: 4,pos: "動詞"},
      {en: "just",ja: "ちょうど",ph: "/dʒʌst/",eiken: 4,pos: "副詞"},
      {en: "dust",ja: "ほこり",ph: "/dʌst/",eiken: 3,pos: "名詞"},
      {en: "rust",ja: "さび",ph: "/rʌst/",eiken: 2,pos: "名詞"},
      {en: "crust",ja: "パンの皮・地殻",ph: "/krʌst/",eiken: "p1",pos: "名詞"},
      {en: "gust",ja: "突風",ph: "/ɡʌst/",eiken: "p1",pos: "名詞"},
      {en: "adjust",ja: "調整する",ph: "/əˈdʒʌst/",eiken: "p2",pos: "動詞"},
      {en: "disgust",ja: "嫌悪",ph: "/dɪsˈɡʌst/",eiken: 2,pos: "名詞"},
      {en: "robust",ja: "頑丈な",ph: "/roʊˈbʌst/",eiken: "p1",pos: "形容詞"},
      {en: "august",ja: "8月",ph: "/ˈɔːɡəst/",eiken: 5,pos: "名詞"},
      {en: "unjust",ja: "不公平な",ph: "/ˌʌnˈdʒʌst/",eiken: 1,pos: "形容詞"},
      {en: "entrust",ja: "任せる",ph: "/ɪnˈtrʌst/",eiken: 1,pos: "動詞"},
      {en: "distrust",ja: "不信",ph: "/dɪsˈtrʌst/",eiken: 1,pos: "名詞"},
    ]
  },
  {
    id: "elt_family",
    theme: "-elt ファミリー",
    words: [
      {en: "belt",ja: "ベルト",ph: "/belt/",eiken: 3,pos: "名詞"},
      {en: "felt",ja: "感じた",ph: "/felt/",eiken: 4,pos: "動詞"},
      {en: "melt",ja: "溶ける",ph: "/melt/",eiken: 3,pos: "動詞"},
      {en: "knelt",ja: "ひざまずいた",ph: "/nelt/",eiken: 1,pos: "動詞"},
      {en: "smelt",ja: "製錬する",ph: "/smelt/",eiken: 1,pos: "動詞"},
      {en: "pelt",ja: "投げつける",ph: "/pelt/",eiken: 1,pos: "動詞"},
    ]
  },
  {
    id: "ift_family",
    theme: "-ift ファミリー",
    words: [
      {en: "gift",ja: "贈り物",ph: "/ɡɪft/",eiken: 3,pos: "名詞"},
      {en: "lift",ja: "持ち上げる",ph: "/lɪft/",eiken: 3,pos: "動詞"},
      {en: "drift",ja: "漂う",ph: "/drɪft/",eiken: "p1",pos: "動詞"},
      {en: "swift",ja: "迅速な",ph: "/swɪft/",eiken: "p1",pos: "形容詞"},
      {en: "thrift",ja: "倹約",ph: "/θrɪft/",eiken: 1,pos: "名詞"},
      {en: "uplift",ja: "高揚させる",ph: "/ʌpˈlɪft/",eiken: 1,pos: "動詞"},
    ]
  },
  {
    id: "ade_family",
    theme: "-ade ファミリー",
    words: [
      {en: "made",ja: "作った",ph: "/meɪd/",eiken: 4,pos: "動詞"},
      {en: "shade",ja: "日陰",ph: "/ʃeɪd/",eiken: 2,pos: "名詞"},
      {en: "fade",ja: "薄れる",ph: "/feɪd/",eiken: 2,pos: "動詞"},
      {en: "invade",ja: "侵略する",ph: "/ɪnˈveɪd/",eiken: "p1",pos: "動詞"},
      {en: "parade",ja: "パレード",ph: "/pəˈreɪd/",eiken: 3,pos: "名詞"},
      {en: "decade",ja: "10年間",ph: "/ˈdekeɪd/",eiken: "p2",pos: "名詞"},
      {en: "persuade",ja: "説得する",ph: "/pərˈsweɪd/",eiken: 2,pos: "動詞"},
      {en: "upgrade",ja: "格上げする",ph: "/ˌʌpˈɡreɪd/",eiken: 2,pos: "動詞"},
      {en: "lemonade",ja: "レモネード",ph: "/ˌleməˈneɪd/",eiken: 3,pos: "名詞"},
      {en: "crusade",ja: "改革運動",ph: "/kruːˈseɪd/",eiken: 1,pos: "名詞"},
    ]
  },
  {
    id: "ail_family",
    theme: "-ail ファミリー",
    words: [
      {en: "mail",ja: "郵便",ph: "/meɪl/",eiken: 4,pos: "名詞"},
      {en: "tail",ja: "しっぽ",ph: "/teɪl/",eiken: 3,pos: "名詞"},
      {en: "nail",ja: "爪・くぎ",ph: "/neɪl/",eiken: 3,pos: "名詞"},
      {en: "sail",ja: "航海する",ph: "/seɪl/",eiken: 3,pos: "動詞"},
      {en: "fail",ja: "失敗する",ph: "/feɪl/",eiken: 3,pos: "動詞"},
      {en: "trail",ja: "小道",ph: "/treɪl/",eiken: "p1",pos: "名詞"},
      {en: "snail",ja: "カタツムリ",ph: "/sneɪl/",eiken: 2,pos: "名詞"},
      {en: "detail",ja: "詳細",ph: "/ˈdiːteɪl/",eiken: "p2",pos: "名詞"},
      {en: "email",ja: "電子メール",ph: "/ˈiːmeɪl/",eiken: 4,pos: "名詞"},
      {en: "retail",ja: "小売り",ph: "/ˈriːteɪl/",eiken: "p1",pos: "名詞"},
      {en: "prevail",ja: "普及する・勝る",ph: "/prɪˈveɪl/",eiken: 1,pos: "動詞"},
      {en: "derail",ja: "脱線させる",ph: "/dɪˈreɪl/",eiken: 1,pos: "動詞"},
    ]
  },
  {
    id: "ave_family",
    theme: "-ave ファミリー",
    words: [
      {en: "gave",ja: "与えた",ph: "/ɡeɪv/",eiken: 4,pos: "動詞"},
      {en: "save",ja: "救う・貯める",ph: "/seɪv/",eiken: 4,pos: "動詞"},
      {en: "wave",ja: "波・手を振る",ph: "/weɪv/",eiken: 3,pos: "名詞"},
      {en: "cave",ja: "洞窟",ph: "/keɪv/",eiken: 3,pos: "名詞"},
      {en: "crave",ja: "切望する",ph: "/kreɪv/",eiken: 1,pos: "動詞"},
      {en: "slave",ja: "奴隷",ph: "/sleɪv/",eiken: 2,pos: "名詞"},
      {en: "behave",ja: "振る舞う",ph: "/bɪˈheɪv/",eiken: 3,pos: "動詞"},
      {en: "engrave",ja: "彫る",ph: "/ɪnˈɡreɪv/",eiken: 1,pos: "動詞"},
      {en: "microwave",ja: "電子レンジ",ph: "/ˈmaɪkrəweɪv/",eiken: 3,pos: "名詞"},
    ]
  },
  {
    id: "aze_family",
    theme: "-aze ファミリー",
    words: [
      {en: "maze",ja: "迷路",ph: "/meɪz/",eiken: 2,pos: "名詞"},
      {en: "gaze",ja: "見つめる",ph: "/ɡeɪz/",eiken: "p1",pos: "動詞"},
      {en: "haze",ja: "もや",ph: "/heɪz/",eiken: 1,pos: "名詞"},
      {en: "graze",ja: "草を食べる",ph: "/ɡreɪz/",eiken: 1,pos: "動詞"},
      {en: "blaze",ja: "炎",ph: "/bleɪz/",eiken: "p1",pos: "名詞"},
      {en: "glaze",ja: "うわぐすり",ph: "/ɡleɪz/",eiken: 1,pos: "名詞"},
      {en: "amaze",ja: "驚かせる",ph: "/əˈmeɪz/",eiken: 3,pos: "動詞"},
      {en: "craze",ja: "大流行",ph: "/kreɪz/",eiken: 1,pos: "名詞"},
    ]
  },
  {
    id: "eak_family",
    theme: "-eak ファミリー",
    words: [
      {en: "peak",ja: "頂上",ph: "/piːk/",eiken: "p2",pos: "名詞"},
      {en: "leak",ja: "漏れる",ph: "/liːk/",eiken: "p1",pos: "動詞"},
      {en: "beak",ja: "くちばし",ph: "/biːk/",eiken: 2,pos: "名詞"},
      {en: "creak",ja: "きしむ",ph: "/kriːk/",eiken: 1,pos: "動詞"},
      {en: "squeak",ja: "キーキー鳴る",ph: "/skwiːk/",eiken: 1,pos: "動詞"},
      {en: "sneak",ja: "こっそり動く",ph: "/sniːk/",eiken: "p1",pos: "動詞"},
      {en: "streak",ja: "筋・連続",ph: "/striːk/",eiken: 1,pos: "名詞"},
      {en: "freak",ja: "熱狂者",ph: "/friːk/",eiken: "p1",pos: "名詞"},
      {en: "bleak",ja: "荒涼とした",ph: "/bliːk/",eiken: 1,pos: "形容詞"},
    ]
  },
  {
    id: "eal_family",
    theme: "-eal ファミリー",
    words: [
      {en: "meal",ja: "食事",ph: "/miːl/",eiken: 3,pos: "名詞"},
      {en: "deal",ja: "取引・扱う",ph: "/diːl/",eiken: 3,pos: "動詞"},
      {en: "real",ja: "本当の",ph: "/ˈriːəl/",eiken: 4,pos: "形容詞"},
      {en: "seal",ja: "アザラシ・封をする",ph: "/siːl/",eiken: 2,pos: "名詞"},
      {en: "steal",ja: "盗む",ph: "/stiːl/",eiken: 3,pos: "動詞"},
      {en: "heal",ja: "治す",ph: "/hiːl/",eiken: 2,pos: "動詞"},
      {en: "reveal",ja: "明らかにする",ph: "/rɪˈviːl/",eiken: "p2",pos: "動詞"},
      {en: "appeal",ja: "訴える",ph: "/əˈpiːl/",eiken: "p2",pos: "動詞"},
      {en: "ideal",ja: "理想的な",ph: "/aɪˈdiːəl/",eiken: 2,pos: "形容詞"},
      {en: "conceal",ja: "隠す",ph: "/kənˈsiːl/",eiken: "p1",pos: "動詞"},
      {en: "squeal",ja: "悲鳴を上げる",ph: "/skwiːl/",eiken: 1,pos: "動詞"},
      {en: "oatmeal",ja: "オートミール",ph: "/ˈoʊtmiːl/",eiken: 2,pos: "名詞"},
    ]
  },
  {
    id: "eam_family",
    theme: "-eam ファミリー",
    words: [
      {en: "steam",ja: "蒸気",ph: "/stiːm/",eiken: 3,pos: "名詞"},
      {en: "beam",ja: "光線",ph: "/biːm/",eiken: "p1",pos: "名詞"},
      {en: "scream",ja: "叫ぶ",ph: "/skriːm/",eiken: 3,pos: "動詞"},
      {en: "gleam",ja: "かすかに光る",ph: "/ɡliːm/",eiken: 1,pos: "動詞"},
      {en: "seam",ja: "縫い目",ph: "/siːm/",eiken: 1,pos: "名詞"},
      {en: "downstream",ja: "下流に",ph: "/ˌdaʊnˈstriːm/",eiken: 1,pos: "副詞"},
      {en: "mainstream",ja: "主流",ph: "/ˈmeɪnstriːm/",eiken: "p1",pos: "名詞"},
      {en: "daydream",ja: "白昼夢",ph: "/ˈdeɪdriːm/",eiken: 2,pos: "名詞"},
    ]
  },
  {
    id: "ean_family",
    theme: "-ean ファミリー",
    words: [
      {en: "wean",ja: "乳離れさせる",ph: "/wiːn/",eiken: 1,pos: "動詞"},
      {en: "ocean",ja: "海",ph: "/ˈoʊʃn/",eiken: 4,pos: "名詞"},
      {en: "bean",ja: "豆",ph: "/biːn/",eiken: 3,pos: "名詞"},
      {en: "lean",ja: "寄りかかる",ph: "/liːn/",eiken: 2,pos: "動詞"},
      {en: "glean",ja: "拾い集める",ph: "/ɡliːn/",eiken: 1,pos: "動詞"},
      {en: "subterranean",ja: "地下の",ph: "/ˌsʌbtəˈreɪniən/",eiken: 1,pos: "形容詞"},
      {en: "cerulean",ja: "空色の",ph: "/səˈruːliən/",eiken: 1,pos: "形容詞"},
    ]
  },
  {
    id: "eat_family",
    theme: "-eat ファミリー",
    words: [
      {en: "neat",ja: "きちんとした",ph: "/niːt/",eiken: 2,pos: "形容詞"},
      {en: "cheat",ja: "ずるをする",ph: "/tʃiːt/",eiken: 2,pos: "動詞"},
      {en: "repeat",ja: "繰り返す",ph: "/rɪˈpiːt/",eiken: 3,pos: "動詞"},
      {en: "defeat",ja: "打ち負かす",ph: "/dɪˈfiːt/",eiken: "p2",pos: "動詞"},
      {en: "retreat",ja: "退却する",ph: "/rɪˈtriːt/",eiken: "p1",pos: "動詞"},
      {en: "threat",ja: "脅威",ph: "/θret/",eiken: "p2",pos: "名詞"},
      {en: "sweat",ja: "汗",ph: "/swet/",eiken: 2,pos: "名詞"},
    ]
  },
  {
    id: "eed_family",
    theme: "-eed ファミリー",
    words: [
      {en: "need",ja: "必要とする",ph: "/niːd/",eiken: 4,pos: "動詞"},
      {en: "feed",ja: "えさをやる",ph: "/fiːd/",eiken: 3,pos: "動詞"},
      {en: "seed",ja: "種",ph: "/siːd/",eiken: 3,pos: "名詞"},
      {en: "weed",ja: "雑草",ph: "/wiːd/",eiken: 2,pos: "名詞"},
      {en: "greed",ja: "強欲",ph: "/ɡriːd/",eiken: "p1",pos: "名詞"},
      {en: "breed",ja: "繁殖させる",ph: "/briːd/",eiken: 2,pos: "動詞"},
      {en: "bleed",ja: "出血する",ph: "/bliːd/",eiken: 2,pos: "動詞"},
      {en: "indeed",ja: "本当に",ph: "/ɪnˈdiːd/",eiken: "p2",pos: "副詞"},
      {en: "succeed",ja: "成功する",ph: "/səkˈsiːd/",eiken: 3,pos: "動詞"},
      {en: "proceed",ja: "進む",ph: "/proʊˈsiːd/",eiken: "p1",pos: "動詞"},
      {en: "exceed",ja: "超える",ph: "/ɪkˈsiːd/",eiken: "p1",pos: "動詞"},
    ]
  },
  {
    id: "eel_family",
    theme: "-eel ファミリー",
    words: [
      {en: "feel",ja: "感じる",ph: "/fiːl/",eiken: 4,pos: "動詞"},
      {en: "heel",ja: "かかと",ph: "/hiːl/",eiken: 2,pos: "名詞"},
      {en: "peel",ja: "皮をむく",ph: "/piːl/",eiken: 2,pos: "動詞"},
      {en: "steel",ja: "鋼鉄",ph: "/stiːl/",eiken: 2,pos: "名詞"},
      {en: "kneel",ja: "ひざまずく",ph: "/niːl/",eiken: "p1",pos: "動詞"},
      {en: "reel",ja: "リール・よろめく",ph: "/riːl/",eiken: 1,pos: "名詞"},
    ]
  },
  {
    id: "eep_family",
    theme: "-eep ファミリー",
    words: [
      {en: "keep",ja: "保つ",ph: "/kiːp/",eiken: 4,pos: "動詞"},
      {en: "deep",ja: "深い",ph: "/diːp/",eiken: 3,pos: "形容詞"},
      {en: "jeep",ja: "ジープ",ph: "/dʒiːp/",eiken: 2,pos: "名詞"},
      {en: "weep",ja: "泣く",ph: "/wiːp/",eiken: "p1",pos: "動詞"},
      {en: "steep",ja: "険しい",ph: "/stiːp/",eiken: 2,pos: "形容詞"},
      {en: "creep",ja: "忍び寄る",ph: "/kriːp/",eiken: "p1",pos: "動詞"},
      {en: "asleep",ja: "眠って",ph: "/əˈsliːp/",eiken: 3,pos: "形容詞"},
      {en: "oversleep",ja: "寝過ごす",ph: "/ˌoʊvərˈsliːp/",eiken: 3,pos: "動詞"},
    ]
  },
  {
    id: "eet_family",
    theme: "-eet ファミリー",
    words: [
      {en: "meet",ja: "会う",ph: "/miːt/",eiken: 5,pos: "動詞"},
      {en: "feet",ja: "足（複数）",ph: "/fiːt/",eiken: 4,pos: "名詞"},
      {en: "sheet",ja: "シーツ・1枚",ph: "/ʃiːt/",eiken: 3,pos: "名詞"},
      {en: "greet",ja: "あいさつする",ph: "/ɡriːt/",eiken: 3,pos: "動詞"},
      {en: "fleet",ja: "艦隊",ph: "/fliːt/",eiken: 1,pos: "名詞"},
      {en: "discreet",ja: "慎重な",ph: "/dɪˈskriːt/",eiken: 1,pos: "形容詞"},
    ]
  },
  {
    id: "ide_family",
    theme: "-ide ファミリー",
    words: [
      {en: "ride",ja: "乗る",ph: "/raɪd/",eiken: 4,pos: "動詞"},
      {en: "side",ja: "側",ph: "/saɪd/",eiken: 4,pos: "名詞"},
      {en: "wide",ja: "広い",ph: "/waɪd/",eiken: 3,pos: "形容詞"},
      {en: "hide",ja: "隠す",ph: "/haɪd/",eiken: 3,pos: "動詞"},
      {en: "guide",ja: "案内する",ph: "/ɡaɪd/",eiken: 3,pos: "動詞"},
      {en: "pride",ja: "誇り",ph: "/praɪd/",eiken: 2,pos: "名詞"},
      {en: "bride",ja: "花嫁",ph: "/braɪd/",eiken: 2,pos: "名詞"},
      {en: "tide",ja: "潮",ph: "/taɪd/",eiken: 2,pos: "名詞"},
      {en: "decide",ja: "決める",ph: "/dɪˈsaɪd/",eiken: 3,pos: "動詞"},
      {en: "provide",ja: "提供する",ph: "/prəˈvaɪd/",eiken: "p2",pos: "動詞"},
      {en: "divide",ja: "分ける",ph: "/dɪˈvaɪd/",eiken: 2,pos: "動詞"},
      {en: "coincide",ja: "同時に起こる",ph: "/ˌkoʊɪnˈsaɪd/",eiken: 1,pos: "動詞"},
    ]
  },
  {
    id: "ife_family",
    theme: "-ife ファミリー",
    words: [
      {en: "life",ja: "生活・命",ph: "/laɪf/",eiken: 4,pos: "名詞"},
      {en: "wife",ja: "妻",ph: "/waɪf/",eiken: 4,pos: "名詞"},
      {en: "knife",ja: "ナイフ",ph: "/naɪf/",eiken: 4,pos: "名詞"},
      {en: "strife",ja: "争い",ph: "/straɪf/",eiken: 1,pos: "名詞"},
      {en: "wildlife",ja: "野生生物",ph: "/ˈwaɪldlaɪf/",eiken: "p2",pos: "名詞"},
      {en: "midwife",ja: "助産師",ph: "/ˈmɪdwaɪf/",eiken: 1,pos: "名詞"},
      {en: "nightlife",ja: "夜の娯楽",ph: "/ˈnaɪtlaɪf/",eiken: "p1",pos: "名詞"},
      {en: "afterlife",ja: "来世",ph: "/ˈæftərlaɪf/",eiken: 1,pos: "名詞"},
    ]
  },
  {
    id: "ike_family",
    theme: "-ike ファミリー",
    words: [
      {en: "bike",ja: "自転車",ph: "/baɪk/",eiken: 5,pos: "名詞"},
      {en: "hike",ja: "ハイキング",ph: "/haɪk/",eiken: 3,pos: "名詞"},
      {en: "strike",ja: "打つ・ストライキ",ph: "/straɪk/",eiken: 2,pos: "動詞"},
      {en: "spike",ja: "スパイク・急増",ph: "/spaɪk/",eiken: 1,pos: "名詞"},
      {en: "alike",ja: "似ている",ph: "/əˈlaɪk/",eiken: 2,pos: "形容詞"},
      {en: "unlike",ja: "〜と違って",ph: "/ʌnˈlaɪk/",eiken: "p2",pos: "前置詞"},
      {en: "childlike",ja: "子どもらしい",ph: "/ˈtʃaɪldlaɪk/",eiken: 1,pos: "形容詞"},
    ]
  },
  {
    id: "ile_family",
    theme: "-ile ファミリー",
    words: [
      {en: "mile",ja: "マイル",ph: "/maɪl/",eiken: 3,pos: "名詞"},
      {en: "file",ja: "ファイル",ph: "/faɪl/",eiken: 3,pos: "名詞"},
      {en: "pile",ja: "山・積み重ね",ph: "/paɪl/",eiken: 2,pos: "名詞"},
      {en: "tile",ja: "タイル",ph: "/taɪl/",eiken: 2,pos: "名詞"},
      {en: "profile",ja: "プロフィール",ph: "/ˈproʊfaɪl/",eiken: "p2",pos: "名詞"},
      {en: "mobile",ja: "移動式の・携帯電話",ph: "/ˈmoʊbl/",eiken: 3,pos: "形容詞"},
      {en: "hostile",ja: "敵意のある",ph: "/ˈhɑːstl/",eiken: "p1",pos: "形容詞"},
      {en: "fragile",ja: "壊れやすい",ph: "/ˈfrædʒl/",eiken: "p1",pos: "形容詞"},
      {en: "reptile",ja: "爬虫類",ph: "/ˈreptaɪl/",eiken: 2,pos: "名詞"},
      {en: "exile",ja: "亡命",ph: "/ˈeɡzaɪl/",eiken: 1,pos: "名詞"},
      {en: "versatile",ja: "多才な",ph: "/ˈvɜːrsətl/",eiken: 1,pos: "形容詞"},
    ]
  },
  {
    id: "ime_family",
    theme: "-ime ファミリー",
    words: [
      {en: "time",ja: "時間",ph: "/taɪm/",eiken: 5,pos: "名詞"},
      {en: "lime",ja: "ライム",ph: "/laɪm/",eiken: 2,pos: "名詞"},
      {en: "prime",ja: "主要な",ph: "/praɪm/",eiken: "p1",pos: "形容詞"},
      {en: "slime",ja: "ねばねば",ph: "/slaɪm/",eiken: 1,pos: "名詞"},
      {en: "chime",ja: "チャイム",ph: "/tʃaɪm/",eiken: 2,pos: "名詞"},
      {en: "anytime",ja: "いつでも",ph: "/ˈenitaɪm/",eiken: 3,pos: "副詞"},
      {en: "lifetime",ja: "一生",ph: "/ˈlaɪftaɪm/",eiken: 2,pos: "名詞"},
      {en: "sometime",ja: "いつか",ph: "/ˈsʌmtaɪm/",eiken: 3,pos: "副詞"},
      {en: "regime",ja: "政権",ph: "/reɪˈʒiːm/",eiken: 1,pos: "名詞"},
      {en: "sublime",ja: "崇高な",ph: "/səˈblaɪm/",eiken: 1,pos: "形容詞"},
      {en: "overtime",ja: "残業",ph: "/ˈoʊvərtaɪm/",eiken: 2,pos: "名詞"},
      {en: "pastime",ja: "気晴らし",ph: "/ˈpæstaɪm/",eiken: 1,pos: "名詞"},
    ]
  },
  {
    id: "ipe_family",
    theme: "-ipe ファミリー",
    words: [
      {en: "pipe",ja: "パイプ",ph: "/paɪp/",eiken: 3,pos: "名詞"},
      {en: "ripe",ja: "熟した",ph: "/raɪp/",eiken: 2,pos: "形容詞"},
      {en: "wipe",ja: "拭く",ph: "/waɪp/",eiken: 2,pos: "動詞"},
      {en: "swipe",ja: "さっと動かす",ph: "/swaɪp/",eiken: "p1",pos: "動詞"},
      {en: "stripe",ja: "しま模様",ph: "/straɪp/",eiken: 2,pos: "名詞"},
      {en: "recipe",ja: "レシピ",ph: "/ˈresəpi/",eiken: 3,pos: "名詞"},
      {en: "gripe",ja: "不平",ph: "/ɡraɪp/",eiken: 1,pos: "名詞"},
      {en: "snipe",ja: "狙撃する",ph: "/snaɪp/",eiken: 1,pos: "動詞"},
      {en: "bagpipe",ja: "バグパイプ",ph: "/ˈbæɡpaɪp/",eiken: 1,pos: "名詞"},
    ]
  },
  {
    id: "ire_family",
    theme: "-ire ファミリー",
    words: [
      {en: "fire",ja: "火",ph: "/ˈfaɪər/",eiken: 4,pos: "名詞"},
      {en: "tire",ja: "タイヤ・疲れさせる",ph: "/ˈtaɪər/",eiken: 3,pos: "名詞"},
      {en: "hire",ja: "雇う",ph: "/ˈhaɪər/",eiken: 2,pos: "動詞"},
      {en: "wire",ja: "針金",ph: "/ˈwaɪər/",eiken: 2,pos: "名詞"},
      {en: "desire",ja: "願望",ph: "/dɪˈzaɪər/",eiken: "p2",pos: "名詞"},
      {en: "admire",ja: "感心する",ph: "/ədˈmaɪər/",eiken: 2,pos: "動詞"},
      {en: "entire",ja: "全体の",ph: "/ɪnˈtaɪər/",eiken: "p2",pos: "形容詞"},
      {en: "require",ja: "必要とする",ph: "/rɪˈkwaɪər/",eiken: "p2",pos: "動詞"},
      {en: "inspire",ja: "奮い立たせる",ph: "/ɪnˈspaɪər/",eiken: 2,pos: "動詞"},
      {en: "retire",ja: "引退する",ph: "/rɪˈtaɪər/",eiken: 2,pos: "動詞"},
      {en: "empire",ja: "帝国",ph: "/ˈempaɪər/",eiken: 2,pos: "名詞"},
      {en: "umpire",ja: "審判",ph: "/ˈʌmpaɪər/",eiken: 2,pos: "名詞"},
      {en: "satire",ja: "風刺",ph: "/ˈsætaɪər/",eiken: 1,pos: "名詞"},
    ]
  },
  {
    id: "ite_family",
    theme: "-ite ファミリー",
    words: [
      {en: "bite",ja: "かむ",ph: "/baɪt/",eiken: 3,pos: "動詞"},
      {en: "kite",ja: "凧",ph: "/kaɪt/",eiken: 4,pos: "名詞"},
      {en: "quite",ja: "かなり",ph: "/kwaɪt/",eiken: 3,pos: "副詞"},
      {en: "invite",ja: "招待する",ph: "/ɪnˈvaɪt/",eiken: 3,pos: "動詞"},
      {en: "polite",ja: "礼儀正しい",ph: "/pəˈlaɪt/",eiken: 3,pos: "形容詞"},
      {en: "favorite",ja: "お気に入りの",ph: "/ˈfeɪvərɪt/",eiken: 5,pos: "形容詞"},
      {en: "despite",ja: "〜にもかかわらず",ph: "/dɪˈspaɪt/",eiken: "p2",pos: "前置詞"},
      {en: "unite",ja: "団結させる",ph: "/juˈnaɪt/",eiken: 2,pos: "動詞"},
      {en: "appetite",ja: "食欲",ph: "/ˈæpɪtaɪt/",eiken: 2,pos: "名詞"},
      {en: "opposite",ja: "反対の",ph: "/ˈɑːpəzɪt/",eiken: 3,pos: "形容詞"},
      {en: "infinite",ja: "無限の",ph: "/ˈɪnfɪnət/",eiken: "p1",pos: "形容詞"},
      {en: "satellite",ja: "衛星",ph: "/ˈsætəlaɪt/",eiken: 2,pos: "名詞"},
    ]
  },
  {
    id: "oad_family",
    theme: "-oad ファミリー",
    words: [
      {en: "toad",ja: "ヒキガエル",ph: "/toʊd/",eiken: 2,pos: "名詞"},
      {en: "abroad",ja: "海外へ",ph: "/əˈbrɔːd/",eiken: 3,pos: "副詞"},
      {en: "railroad",ja: "鉄道",ph: "/ˈreɪlroʊd/",eiken: 3,pos: "名詞"},
      {en: "download",ja: "ダウンロードする",ph: "/ˈdaʊnloʊd/",eiken: 3,pos: "動詞"},
      {en: "upload",ja: "アップロードする",ph: "/ˈʌploʊd/",eiken: 3,pos: "動詞"},
      {en: "overload",ja: "積みすぎる",ph: "/ˌoʊvərˈloʊd/",eiken: 1,pos: "動詞"},
      {en: "crossroad",ja: "交差点",ph: "/ˈkrɔːsroʊd/",eiken: "p1",pos: "名詞"},
    ]
  },
  {
    id: "ode_family",
    theme: "-ode ファミリー",
    words: [
      {en: "code",ja: "暗号・規則",ph: "/koʊd/",eiken: 2,pos: "名詞"},
      {en: "mode",ja: "方式・モード",ph: "/moʊd/",eiken: "p2",pos: "名詞"},
      {en: "rode",ja: "乗った",ph: "/roʊd/",eiken: 4,pos: "動詞"},
      {en: "node",ja: "結節点",ph: "/noʊd/",eiken: 1,pos: "名詞"},
      {en: "erode",ja: "浸食する",ph: "/ɪˈroʊd/",eiken: 1,pos: "動詞"},
      {en: "explode",ja: "爆発する",ph: "/ɪkˈsploʊd/",eiken: 2,pos: "動詞"},
      {en: "episode",ja: "エピソード",ph: "/ˈepɪsoʊd/",eiken: 2,pos: "名詞"},
      {en: "decode",ja: "解読する",ph: "/diːˈkoʊd/",eiken: "p1",pos: "動詞"},
      {en: "corrode",ja: "腐食する",ph: "/kəˈroʊd/",eiken: 1,pos: "動詞"},
    ]
  },
  {
    id: "ole_family",
    theme: "-ole ファミリー",
    words: [
      {en: "hole",ja: "穴",ph: "/hoʊl/",eiken: 3,pos: "名詞"},
      {en: "pole",ja: "棒・極",ph: "/poʊl/",eiken: 2,pos: "名詞"},
      {en: "role",ja: "役割",ph: "/roʊl/",eiken: "p2",pos: "名詞"},
      {en: "mole",ja: "もぐら・ほくろ",ph: "/moʊl/",eiken: 2,pos: "名詞"},
      {en: "whole",ja: "全体の",ph: "/hoʊl/",eiken: 3,pos: "形容詞"},
      {en: "stole",ja: "盗んだ",ph: "/stoʊl/",eiken: 3,pos: "動詞"},
      {en: "console",ja: "慰める",ph: "/kənˈsoʊl/",eiken: 1,pos: "動詞"},
      {en: "parole",ja: "仮釈放",ph: "/pəˈroʊl/",eiken: 1,pos: "名詞"},
      {en: "casserole",ja: "キャセロール",ph: "/ˈkæsəroʊl/",eiken: 1,pos: "名詞"},
    ]
  },
  {
    id: "ope_family",
    theme: "-ope ファミリー",
    words: [
      {en: "rope",ja: "ロープ",ph: "/roʊp/",eiken: 3,pos: "名詞"},
      {en: "scope",ja: "範囲",ph: "/skoʊp/",eiken: "p1",pos: "名詞"},
      {en: "cope",ja: "対処する",ph: "/koʊp/",eiken: "p2",pos: "動詞"},
      {en: "grope",ja: "手探りする",ph: "/ɡroʊp/",eiken: 1,pos: "動詞"},
      {en: "envelope",ja: "封筒",ph: "/ˈenvəloʊp/",eiken: 3,pos: "名詞"},
      {en: "telescope",ja: "望遠鏡",ph: "/ˈtelɪskoʊp/",eiken: 2,pos: "名詞"},
      {en: "microscope",ja: "顕微鏡",ph: "/ˈmaɪkrəskoʊp/",eiken: 2,pos: "名詞"},
      {en: "antelope",ja: "レイヨウ",ph: "/ˈæntɪloʊp/",eiken: 1,pos: "名詞"},
    ]
  },
  {
    id: "ote_family",
    theme: "-ote ファミリー",
    words: [
      {en: "note",ja: "メモ",ph: "/noʊt/",eiken: 4,pos: "名詞"},
      {en: "vote",ja: "投票する",ph: "/voʊt/",eiken: 2,pos: "動詞"},
      {en: "quote",ja: "引用する",ph: "/kwoʊt/",eiken: "p1",pos: "動詞"},
      {en: "wrote",ja: "書いた",ph: "/roʊt/",eiken: 4,pos: "動詞"},
      {en: "promote",ja: "促進する",ph: "/prəˈmoʊt/",eiken: "p2",pos: "動詞"},
      {en: "remote",ja: "遠く離れた",ph: "/rɪˈmoʊt/",eiken: "p2",pos: "形容詞"},
      {en: "devote",ja: "捧げる",ph: "/dɪˈvoʊt/",eiken: "p1",pos: "動詞"},
      {en: "footnote",ja: "脚注",ph: "/ˈfʊtnoʊt/",eiken: 1,pos: "名詞"},
      {en: "anecdote",ja: "逸話",ph: "/ˈænɪkdoʊt/",eiken: 1,pos: "名詞"},
      {en: "antidote",ja: "解毒剤",ph: "/ˈæntɪdoʊt/",eiken: 1,pos: "名詞"},
    ]
  },
  {
    id: "une_family",
    theme: "-une ファミリー",
    words: [
      {en: "tune",ja: "曲",ph: "/tuːn/",eiken: 2,pos: "名詞"},
      {en: "dune",ja: "砂丘",ph: "/duːn/",eiken: 1,pos: "名詞"},
      {en: "prune",ja: "剪定する",ph: "/pruːn/",eiken: 1,pos: "動詞"},
      {en: "immune",ja: "免疫のある",ph: "/ɪˈmjuːn/",eiken: "p1",pos: "形容詞"},
      {en: "fortune",ja: "財産・運",ph: "/ˈfɔːrtʃən/",eiken: 2,pos: "名詞"},
      {en: "commune",ja: "共同体",ph: "/ˈkɑːmjuːn/",eiken: 1,pos: "名詞"},
      {en: "misfortune",ja: "不運",ph: "/ˌmɪsˈfɔːrtʃən/",eiken: "p1",pos: "名詞"},
      {en: "opportune",ja: "好都合な",ph: "/ˌɑːpərˈtuːn/",eiken: 1,pos: "形容詞"},
    ]
  },
  {
    id: "ure_family",
    theme: "-ure ファミリー",
    words: [
      {en: "cure",ja: "治す",ph: "/kjʊr/",eiken: 2,pos: "動詞"},
      {en: "pure",ja: "純粋な",ph: "/pjʊr/",eiken: 2,pos: "形容詞"},
      {en: "sure",ja: "確かな",ph: "/ʃʊr/",eiken: 4,pos: "形容詞"},
      {en: "secure",ja: "安全な",ph: "/sɪˈkjʊr/",eiken: "p2",pos: "形容詞"},
      {en: "endure",ja: "耐える",ph: "/ɪnˈdʊr/",eiken: "p1",pos: "動詞"},
      {en: "mature",ja: "成熟した",ph: "/məˈtʃʊr/",eiken: "p1",pos: "形容詞"},
      {en: "obscure",ja: "あいまいな",ph: "/əbˈskjʊr/",eiken: 1,pos: "形容詞"},
      {en: "figure",ja: "数字・姿",ph: "/ˈfɪɡjər/",eiken: 3,pos: "名詞"},
      {en: "measure",ja: "測る",ph: "/ˈmeʒər/",eiken: "p2",pos: "動詞"},
      {en: "pleasure",ja: "喜び",ph: "/ˈpleʒər/",eiken: 3,pos: "名詞"},
      {en: "treasure",ja: "宝物",ph: "/ˈtreʒər/",eiken: 3,pos: "名詞"},
      {en: "failure",ja: "失敗",ph: "/ˈfeɪljər/",eiken: 2,pos: "名詞"},
      {en: "pressure",ja: "圧力",ph: "/ˈpreʃər/",eiken: "p2",pos: "名詞"},
      {en: "procedure",ja: "手続き",ph: "/prəˈsiːdʒər/",eiken: "p1",pos: "名詞"},
    ]
  },
  {
    id: "ead_family",
    theme: "-ead ファミリー",
    words: [
      {en: "head",ja: "頭",ph: "/hed/",eiken: 5,pos: "名詞"},
      {en: "dead",ja: "死んだ",ph: "/ded/",eiken: 3,pos: "形容詞"},
      {en: "thread",ja: "糸",ph: "/θred/",eiken: 2,pos: "名詞"},
      {en: "dread",ja: "恐れる",ph: "/dred/",eiken: 1,pos: "動詞"},
      {en: "instead",ja: "代わりに",ph: "/ɪnˈsted/",eiken: 3,pos: "副詞"},
      {en: "ahead",ja: "前方に",ph: "/əˈhed/",eiken: 3,pos: "副詞"},
      {en: "forehead",ja: "額",ph: "/ˈfɔːrhed/",eiken: 2,pos: "名詞"},
      {en: "overhead",ja: "頭上に",ph: "/ˌoʊvərˈhed/",eiken: 1,pos: "副詞"},
      {en: "widespread",ja: "広範囲の",ph: "/ˈwaɪdspred/",eiken: "p1",pos: "形容詞"},
    ]
  },
  {
    id: "ook_family",
    theme: "-ook ファミリー",
    words: [
      {en: "look",ja: "見る",ph: "/lʊk/",eiken: 5,pos: "動詞"},
      {en: "cook",ja: "料理する",ph: "/kʊk/",eiken: 5,pos: "動詞"},
      {en: "took",ja: "取った",ph: "/tʊk/",eiken: 4,pos: "動詞"},
      {en: "hook",ja: "フック",ph: "/hʊk/",eiken: 2,pos: "名詞"},
      {en: "shook",ja: "振った",ph: "/ʃʊk/",eiken: 3,pos: "動詞"},
      {en: "brook",ja: "小川",ph: "/brʊk/",eiken: 1,pos: "名詞"},
      {en: "crook",ja: "悪党",ph: "/krʊk/",eiken: 1,pos: "名詞"},
      {en: "outlook",ja: "見通し",ph: "/ˈaʊtlʊk/",eiken: "p1",pos: "名詞"},
      {en: "overlook",ja: "見落とす",ph: "/ˌoʊvərˈlʊk/",eiken: "p1",pos: "動詞"},
      {en: "cookbook",ja: "料理本",ph: "/ˈkʊkbʊk/",eiken: 2,pos: "名詞"},
    ]
  },
  {
    id: "ool_family",
    theme: "-ool ファミリー",
    words: [
      {en: "pool",ja: "プール",ph: "/puːl/",eiken: 5,pos: "名詞"},
      {en: "cool",ja: "涼しい",ph: "/kuːl/",eiken: 5,pos: "形容詞"},
      {en: "fool",ja: "ばか者",ph: "/fuːl/",eiken: 3,pos: "名詞"},
      {en: "tool",ja: "道具",ph: "/tuːl/",eiken: 3,pos: "名詞"},
      {en: "wool",ja: "羊毛",ph: "/wʊl/",eiken: 2,pos: "名詞"},
      {en: "drool",ja: "よだれを垂らす",ph: "/druːl/",eiken: 1,pos: "動詞"},
      {en: "spool",ja: "糸巻き",ph: "/spuːl/",eiken: 1,pos: "名詞"},
      {en: "stool",ja: "腰掛け",ph: "/stuːl/",eiken: 2,pos: "名詞"},
      {en: "carpool",ja: "相乗り",ph: "/ˈkɑːrpuːl/",eiken: 1,pos: "名詞"},
    ]
  },
  {
    id: "oon_family",
    theme: "-oon ファミリー",
    words: [
      {en: "moon",ja: "月",ph: "/muːn/",eiken: 5,pos: "名詞"},
      {en: "noon",ja: "正午",ph: "/nuːn/",eiken: 4,pos: "名詞"},
      {en: "soon",ja: "すぐに",ph: "/suːn/",eiken: 4,pos: "副詞"},
      {en: "spoon",ja: "スプーン",ph: "/spuːn/",eiken: 4,pos: "名詞"},
      {en: "balloon",ja: "風船",ph: "/bəˈluːn/",eiken: 3,pos: "名詞"},
      {en: "cartoon",ja: "漫画",ph: "/kɑːrˈtuːn/",eiken: 3,pos: "名詞"},
      {en: "afternoon",ja: "午後",ph: "/ˌæftərˈnuːn/",eiken: 5,pos: "名詞"},
      {en: "raccoon",ja: "アライグマ",ph: "/ræˈkuːn/",eiken: 2,pos: "名詞"},
      {en: "typhoon",ja: "台風",ph: "/taɪˈfuːn/",eiken: 3,pos: "名詞"},
      {en: "cocoon",ja: "まゆ",ph: "/kəˈkuːn/",eiken: 1,pos: "名詞"},
      {en: "lagoon",ja: "潟",ph: "/ləˈɡuːn/",eiken: 1,pos: "名詞"},
    ]
  },
  {
    id: "oot_family",
    theme: "-oot ファミリー",
    words: [
      {en: "boot",ja: "ブーツ",ph: "/buːt/",eiken: 3,pos: "名詞"},
      {en: "root",ja: "根",ph: "/ruːt/",eiken: 2,pos: "名詞"},
      {en: "shoot",ja: "撃つ",ph: "/ʃuːt/",eiken: 3,pos: "動詞"},
      {en: "hoot",ja: "ホーと鳴く",ph: "/huːt/",eiken: 1,pos: "動詞"},
      {en: "scoot",ja: "さっと動く",ph: "/skuːt/",eiken: 1,pos: "動詞"},
      {en: "reboot",ja: "再起動する",ph: "/ˌriːˈbuːt/",eiken: "p1",pos: "動詞"},
      {en: "uproot",ja: "根こそぎにする",ph: "/ʌpˈruːt/",eiken: 1,pos: "動詞"},
    ]
  },
  {
    id: "own_family",
    theme: "-own ファミリー",
    words: [
      {en: "gown",ja: "ガウン",ph: "/ɡaʊn/",eiken: 2,pos: "名詞"},
      {en: "frown",ja: "顔をしかめる",ph: "/fraʊn/",eiken: "p1",pos: "動詞"},
      {en: "drown",ja: "おぼれる",ph: "/draʊn/",eiken: 2,pos: "動詞"},
      {en: "clown",ja: "ピエロ",ph: "/klaʊn/",eiken: 3,pos: "名詞"},
      {en: "known",ja: "知られている",ph: "/noʊn/",eiken: 3,pos: "形容詞"},
      {en: "grown",ja: "成長した",ph: "/ɡroʊn/",eiken: 3,pos: "形容詞"},
      {en: "shown",ja: "示された",ph: "/ʃoʊn/",eiken: 3,pos: "動詞"},
      {en: "downtown",ja: "繁華街",ph: "/ˌdaʊnˈtaʊn/",eiken: 3,pos: "名詞"},
      {en: "unknown",ja: "未知の",ph: "/ˌʌnˈnoʊn/",eiken: 2,pos: "形容詞"},
      {en: "renown",ja: "名声",ph: "/rɪˈnaʊn/",eiken: 1,pos: "名詞"},
      {en: "countdown",ja: "秒読み",ph: "/ˈkaʊntdaʊn/",eiken: 2,pos: "名詞"},
    ]
  },
  {
    id: "out_family",
    theme: "-out ファミリー",
    words: [
      {en: "about",ja: "〜について",ph: "/əˈbaʊt/",eiken: 5,pos: "前置詞"},
      {en: "scout",ja: "偵察する",ph: "/skaʊt/",eiken: 2,pos: "動詞"},
      {en: "spout",ja: "噴出する",ph: "/spaʊt/",eiken: 1,pos: "動詞"},
      {en: "sprout",ja: "芽",ph: "/spraʊt/",eiken: "p1",pos: "名詞"},
      {en: "trout",ja: "マス",ph: "/traʊt/",eiken: 1,pos: "名詞"},
      {en: "stout",ja: "太った",ph: "/staʊt/",eiken: 1,pos: "形容詞"},
      {en: "throughout",ja: "〜の間ずっと",ph: "/θruːˈaʊt/",eiken: "p2",pos: "前置詞"},
      {en: "without",ja: "〜なしで",ph: "/wɪˈðaʊt/",eiken: 4,pos: "前置詞"},
      {en: "workout",ja: "運動",ph: "/ˈwɜːrkaʊt/",eiken: 2,pos: "名詞"},
      {en: "burnout",ja: "燃え尽き",ph: "/ˈbɜːrnaʊt/",eiken: 1,pos: "名詞"},
      {en: "devout",ja: "信心深い",ph: "/dɪˈvaʊt/",eiken: 1,pos: "形容詞"},
    ]
  },
  {
    id: "ouse_family",
    theme: "-ouse ファミリー",
    words: [
      {en: "blouse",ja: "ブラウス",ph: "/blaʊs/",eiken: 3,pos: "名詞"},
      {en: "spouse",ja: "配偶者",ph: "/spaʊs/",eiken: "p1",pos: "名詞"},
      {en: "rouse",ja: "目覚めさせる",ph: "/raʊz/",eiken: 1,pos: "動詞"},
      {en: "arouse",ja: "呼び起こす",ph: "/əˈraʊz/",eiken: 1,pos: "動詞"},
      {en: "grouse",ja: "不平を言う",ph: "/ɡraʊs/",eiken: 1,pos: "動詞"},
      {en: "warehouse",ja: "倉庫",ph: "/ˈwerhaʊs/",eiken: "p1",pos: "名詞"},
      {en: "lighthouse",ja: "灯台",ph: "/ˈlaɪthaʊs/",eiken: 2,pos: "名詞"},
      {en: "greenhouse",ja: "温室",ph: "/ˈɡriːnhaʊs/",eiken: "p2",pos: "名詞"},
      {en: "dollhouse",ja: "ドールハウス",ph: "/ˈdɑːlhaʊs/",eiken: 2,pos: "名詞"},
      {en: "treehouse",ja: "ツリーハウス",ph: "/ˈtriːhaʊs/",eiken: 2,pos: "名詞"},
    ]
  },
  {
    id: "orn_family",
    theme: "-orn ファミリー",
    words: [
      {en: "born",ja: "生まれた",ph: "/bɔːrn/",eiken: 4,pos: "形容詞"},
      {en: "corn",ja: "トウモロコシ",ph: "/kɔːrn/",eiken: 3,pos: "名詞"},
      {en: "horn",ja: "角・クラクション",ph: "/hɔːrn/",eiken: 2,pos: "名詞"},
      {en: "torn",ja: "破れた",ph: "/tɔːrn/",eiken: 2,pos: "形容詞"},
      {en: "worn",ja: "すり切れた",ph: "/wɔːrn/",eiken: 2,pos: "形容詞"},
      {en: "sworn",ja: "誓った",ph: "/swɔːrn/",eiken: 1,pos: "形容詞"},
      {en: "thorn",ja: "とげ",ph: "/θɔːrn/",eiken: 1,pos: "名詞"},
      {en: "scorn",ja: "軽蔑",ph: "/skɔːrn/",eiken: 1,pos: "名詞"},
      {en: "adorn",ja: "飾る",ph: "/əˈdɔːrn/",eiken: 1,pos: "動詞"},
      {en: "popcorn",ja: "ポップコーン",ph: "/ˈpɑːpkɔːrn/",eiken: 3,pos: "名詞"},
      {en: "acorn",ja: "どんぐり",ph: "/ˈeɪkɔːrn/",eiken: 2,pos: "名詞"},
      {en: "newborn",ja: "新生児",ph: "/ˈnuːbɔːrn/",eiken: "p1",pos: "名詞"},
      {en: "stubborn",ja: "頑固な",ph: "/ˈstʌbərn/",eiken: "p1",pos: "形容詞"},
    ]
  },
  {
    id: "ark_family",
    theme: "-ark ファミリー",
    words: [
      {en: "park",ja: "公園",ph: "/pɑːrk/",eiken: 5,pos: "名詞"},
      {en: "mark",ja: "印",ph: "/mɑːrk/",eiken: 3,pos: "名詞"},
      {en: "bark",ja: "ほえる",ph: "/bɑːrk/",eiken: 3,pos: "動詞"},
      {en: "shark",ja: "サメ",ph: "/ʃɑːrk/",eiken: 3,pos: "名詞"},
      {en: "spark",ja: "火花",ph: "/spɑːrk/",eiken: "p1",pos: "名詞"},
      {en: "remark",ja: "意見",ph: "/rɪˈmɑːrk/",eiken: "p1",pos: "名詞"},
      {en: "landmark",ja: "目印",ph: "/ˈlændmɑːrk/",eiken: "p1",pos: "名詞"},
      {en: "embark",ja: "乗り出す",ph: "/ɪmˈbɑːrk/",eiken: 1,pos: "動詞"},
      {en: "benchmark",ja: "基準",ph: "/ˈbentʃmɑːrk/",eiken: 1,pos: "名詞"},
      {en: "trademark",ja: "商標",ph: "/ˈtreɪdmɑːrk/",eiken: "p1",pos: "名詞"},
    ]
  },
  {
    id: "arm_family",
    theme: "-arm ファミリー",
    words: [
      {en: "harm",ja: "害",ph: "/hɑːrm/",eiken: "p2",pos: "名詞"},
      {en: "alarm",ja: "警報",ph: "/əˈlɑːrm/",eiken: 3,pos: "名詞"},
      {en: "charm",ja: "魅力",ph: "/tʃɑːrm/",eiken: 2,pos: "名詞"},
      {en: "swarm",ja: "群れ",ph: "/swɔːrm/",eiken: 1,pos: "名詞"},
      {en: "warm",ja: "暖かい",ph: "/wɔːrm/",eiken: 4,pos: "形容詞"},
      {en: "disarm",ja: "武装解除する",ph: "/dɪsˈɑːrm/",eiken: 1,pos: "動詞"},
      {en: "forearm",ja: "前腕",ph: "/ˈfɔːrɑːrm/",eiken: 1,pos: "名詞"},
      {en: "firearm",ja: "銃器",ph: "/ˈfaɪərɑːrm/",eiken: 1,pos: "名詞"},
    ]
  },
  {
    id: "art_family",
    theme: "-art ファミリー",
    words: [
      {en: "part",ja: "部分",ph: "/pɑːrt/",eiken: 4,pos: "名詞"},
      {en: "cart",ja: "カート",ph: "/kɑːrt/",eiken: 3,pos: "名詞"},
      {en: "dart",ja: "ダーツ・突進する",ph: "/dɑːrt/",eiken: 1,pos: "名詞"},
      {en: "chart",ja: "図表",ph: "/tʃɑːrt/",eiken: "p2",pos: "名詞"},
      {en: "apart",ja: "離れて",ph: "/əˈpɑːrt/",eiken: "p2",pos: "副詞"},
      {en: "depart",ja: "出発する",ph: "/dɪˈpɑːrt/",eiken: 2,pos: "動詞"},
      {en: "counterpart",ja: "対応するもの",ph: "/ˈkaʊntərpɑːrt/",eiken: 1,pos: "名詞"},
      {en: "sweetheart",ja: "恋人",ph: "/ˈswiːthɑːrt/",eiken: 2,pos: "名詞"},
      {en: "quart",ja: "クオート",ph: "/kwɔːrt/",eiken: 1,pos: "名詞"},
    ]
  },
  {
    id: "ard_family",
    theme: "-ard ファミリー",
    words: [
      {en: "card",ja: "カード",ph: "/kɑːrd/",eiken: 5,pos: "名詞"},
      {en: "hard",ja: "難しい・固い",ph: "/hɑːrd/",eiken: 4,pos: "形容詞"},
      {en: "yard",ja: "庭",ph: "/jɑːrd/",eiken: 3,pos: "名詞"},
      {en: "guard",ja: "守る",ph: "/ɡɑːrd/",eiken: 2,pos: "動詞"},
      {en: "lard",ja: "ラード",ph: "/lɑːrd/",eiken: 1,pos: "名詞"},
      {en: "regard",ja: "みなす",ph: "/rɪˈɡɑːrd/",eiken: "p2",pos: "動詞"},
      {en: "reward",ja: "報酬",ph: "/rɪˈwɔːrd/",eiken: "p2",pos: "名詞"},
      {en: "award",ja: "賞",ph: "/əˈwɔːrd/",eiken: 3,pos: "名詞"},
      {en: "standard",ja: "基準",ph: "/ˈstændərd/",eiken: "p2",pos: "名詞"},
      {en: "backyard",ja: "裏庭",ph: "/ˌbækˈjɑːrd/",eiken: 2,pos: "名詞"},
      {en: "keyboard",ja: "キーボード",ph: "/ˈkiːbɔːrd/",eiken: 3,pos: "名詞"},
      {en: "discard",ja: "捨てる",ph: "/dɪˈskɑːrd/",eiken: 1,pos: "動詞"},
      {en: "leopard",ja: "ヒョウ",ph: "/ˈlepərd/",eiken: 2,pos: "名詞"},
      {en: "wizard",ja: "魔法使い",ph: "/ˈwɪzərd/",eiken: 2,pos: "名詞"},
    ]
  },
  {
    id: "erve_family",
    theme: "-erve ファミリー",
    words: [
      {en: "serve",ja: "仕える・出す",ph: "/sɜːrv/",eiken: 3,pos: "動詞"},
      {en: "nerve",ja: "神経",ph: "/nɜːrv/",eiken: "p2",pos: "名詞"},
      {en: "swerve",ja: "急にそれる",ph: "/swɜːrv/",eiken: 1,pos: "動詞"},
      {en: "verve",ja: "活気",ph: "/vɜːrv/",eiken: 1,pos: "名詞"},
      {en: "deserve",ja: "値する",ph: "/dɪˈzɜːrv/",eiken: "p2",pos: "動詞"},
      {en: "observe",ja: "観察する",ph: "/əbˈzɜːrv/",eiken: "p2",pos: "動詞"},
      {en: "reserve",ja: "予約する",ph: "/rɪˈzɜːrv/",eiken: 3,pos: "動詞"},
      {en: "preserve",ja: "保存する",ph: "/prɪˈzɜːrv/",eiken: "p2",pos: "動詞"},
      {en: "conserve",ja: "保護する",ph: "/kənˈsɜːrv/",eiken: "p1",pos: "動詞"},
    ]
  },
  {
    id: "urn_family",
    theme: "-urn ファミリー",
    words: [
      {en: "churn",ja: "かき回す",ph: "/tʃɜːrn/",eiken: 1,pos: "動詞"},
      {en: "spurn",ja: "はねつける",ph: "/spɜːrn/",eiken: 1,pos: "動詞"},
      {en: "adjourn",ja: "延期する",ph: "/əˈdʒɜːrn/",eiken: 1,pos: "動詞"},
      {en: "sojourn",ja: "滞在",ph: "/ˈsoʊdʒɜːrn/",eiken: 1,pos: "名詞"},
      {en: "downturn",ja: "景気後退",ph: "/ˈdaʊntɜːrn/",eiken: "p1",pos: "名詞"},
      {en: "overturn",ja: "ひっくり返す",ph: "/ˌoʊvərˈtɜːrn/",eiken: "p1",pos: "動詞"},
      {en: "upturn",ja: "好転",ph: "/ˈʌptɜːrn/",eiken: 1,pos: "名詞"},
    ]
  },
  {
    id: "urse_family",
    theme: "-urse ファミリー",
    words: [
      {en: "purse",ja: "財布",ph: "/pɜːrs/",eiken: 3,pos: "名詞"},
      {en: "curse",ja: "呪い",ph: "/kɜːrs/",eiken: "p1",pos: "名詞"},
      {en: "course",ja: "コース・進路",ph: "/kɔːrs/",eiken: 3,pos: "名詞"},
      {en: "discourse",ja: "談話",ph: "/ˈdɪskɔːrs/",eiken: 1,pos: "名詞"},
      {en: "reimburse",ja: "払い戻す",ph: "/ˌriːɪmˈbɜːrs/",eiken: 1,pos: "動詞"},
      {en: "disburse",ja: "支出する",ph: "/dɪsˈbɜːrs/",eiken: 1,pos: "動詞"},
    ]
  },
  {
    id: "ort_family",
    theme: "-ort ファミリー",
    words: [
      {en: "port",ja: "港",ph: "/pɔːrt/",eiken: 3,pos: "名詞"},
      {en: "fort",ja: "砦",ph: "/fɔːrt/",eiken: "p1",pos: "名詞"},
      {en: "snort",ja: "鼻を鳴らす",ph: "/snɔːrt/",eiken: 1,pos: "動詞"},
      {en: "effort",ja: "努力",ph: "/ˈefərt/",eiken: "p2",pos: "名詞"},
      {en: "export",ja: "輸出する",ph: "/ɪkˈspɔːrt/",eiken: "p2",pos: "動詞"},
      {en: "import",ja: "輸入する",ph: "/ɪmˈpɔːrt/",eiken: "p2",pos: "動詞"},
      {en: "resort",ja: "行楽地",ph: "/rɪˈzɔːrt/",eiken: 2,pos: "名詞"},
      {en: "escort",ja: "護衛する",ph: "/ɪˈskɔːrt/",eiken: 1,pos: "動詞"},
      {en: "distort",ja: "ゆがめる",ph: "/dɪˈstɔːrt/",eiken: 1,pos: "動詞"},
      {en: "passport",ja: "パスポート",ph: "/ˈpæspɔːrt/",eiken: 3,pos: "名詞"},
      {en: "airport",ja: "空港",ph: "/ˈerpɔːrt/",eiken: 4,pos: "名詞"},
      {en: "cohort",ja: "集団",ph: "/ˈkoʊhɔːrt/",eiken: 1,pos: "名詞"},
    ]
  },
  {
    id: "sion_suffix",
    theme: "-sion 接尾辞チェーン",
    words: [
      {en: "decision",ja: "決定",ph: "/dɪˈsɪʒən/",eiken: 3,pos: "名詞"},
      {en: "television",ja: "テレビ",ph: "/ˈtɛləˌvɪʒən/",eiken: 5,pos: "名詞"},
      {en: "vision",ja: "視力・展望",ph: "/ˈvɪʒən/",eiken: "p2",pos: "名詞"},
      {en: "mission",ja: "使命",ph: "/ˈmɪʃən/",eiken: "p2",pos: "名詞"},
      {en: "permission",ja: "許可",ph: "/pərˈmɪʃən/",eiken: 3,pos: "名詞"},
      {en: "expression",ja: "表現",ph: "/ɪkˈsprɛʃən/",eiken: 3,pos: "名詞"},
      {en: "impression",ja: "印象",ph: "/ɪmˈprɛʃən/",eiken: "p2",pos: "名詞"},
      {en: "discussion",ja: "議論",ph: "/dɪˈskʌʃən/",eiken: 3,pos: "名詞"},
      {en: "explosion",ja: "爆発",ph: "/ɪkˈsploʊʒən/",eiken: 2,pos: "名詞"},
      {en: "conclusion",ja: "結論",ph: "/kənˈkluʒən/",eiken: "p2",pos: "名詞"},
      {en: "confusion",ja: "混乱",ph: "/kənˈfjuʒən/",eiken: 2,pos: "名詞"},
      {en: "division",ja: "分割・部門",ph: "/dɪˈvɪʒən/",eiken: 2,pos: "名詞"},
      {en: "extension",ja: "延長",ph: "/ɪkˈstɛnʃən/",eiken: 2,pos: "名詞"},
      {en: "tension",ja: "緊張",ph: "/ˈtɛnʃən/",eiken: 2,pos: "名詞"},
      {en: "version",ja: "版",ph: "/ˈvɜrʒən/",eiken: "p2",pos: "名詞"},
      {en: "profession",ja: "職業",ph: "/prəˈfɛʃən/",eiken: 2,pos: "名詞"},
      {en: "admission",ja: "入場・入学",ph: "/ədˈmɪʃən/",eiken: 2,pos: "名詞"},
      {en: "invasion",ja: "侵略",ph: "/ɪnˈveɪʒən/",eiken: "p1",pos: "名詞"},
      {en: "erosion",ja: "浸食",ph: "/ɪˈroʊʒən/",eiken: "p1",pos: "名詞"},
    ]
  },
  {
    id: "ity_suffix",
    theme: "-ity 接尾辞チェーン",
    words: [
      {en: "city",ja: "都市",ph: "/ˈsɪti/",eiken: 5,pos: "名詞"},
      {en: "activity",ja: "活動",ph: "/ækˈtɪvəti/",eiken: 3,pos: "名詞"},
      {en: "ability",ja: "能力",ph: "/əˈbɪləti/",eiken: "p2",pos: "名詞"},
      {en: "quality",ja: "質",ph: "/ˈkwɑləti/",eiken: "p2",pos: "名詞"},
      {en: "reality",ja: "現実",ph: "/riˈæləti/",eiken: 2,pos: "名詞"},
      {en: "security",ja: "安全",ph: "/sɪˈkjʊrəti/",eiken: 2,pos: "名詞"},
      {en: "community",ja: "地域社会",ph: "/kəˈmjunəti/",eiken: "p2",pos: "名詞"},
      {en: "opportunity",ja: "機会",ph: "/ˌɑpərˈtunəti/",eiken: 3,pos: "名詞"},
      {en: "electricity",ja: "電気",ph: "/ɪˌlɛkˈtrɪsəti/",eiken: "p2",pos: "名詞"},
      {en: "creativity",ja: "創造性",ph: "/ˌkrieɪˈtɪvəti/",eiken: 2,pos: "名詞"},
      {en: "curiosity",ja: "好奇心",ph: "/ˌkjʊriˈɑsəti/",eiken: 2,pos: "名詞"},
      {en: "diversity",ja: "多様性",ph: "/dɪˈvɜrsəti/",eiken: 2,pos: "名詞"},
      {en: "responsibility",ja: "責任",ph: "/rɪˌspɑnsəˈbɪləti/",eiken: 2,pos: "名詞"},
      {en: "majority",ja: "大多数",ph: "/məˈdʒɔrəti/",eiken: 2,pos: "名詞"},
      {en: "authority",ja: "権威",ph: "/əˈθɔrəti/",eiken: 2,pos: "名詞"},
      {en: "popularity",ja: "人気",ph: "/ˌpɑpjəˈlærəti/",eiken: 2,pos: "名詞"},
      {en: "capacity",ja: "容量・能力",ph: "/kəˈpæsəti/",eiken: "p1",pos: "名詞"},
      {en: "integrity",ja: "誠実さ",ph: "/ɪnˈtɛɡrəti/",eiken: "p1",pos: "名詞"},
      {en: "hostility",ja: "敵意",ph: "/hɑˈstɪləti/",eiken: "p1",pos: "名詞"},
    ]
  },
  {
    id: "ize_suffix",
    theme: "-ize 接尾辞チェーン",
    words: [
      {en: "size",ja: "大きさ",ph: "/saɪz/",eiken: 5,pos: "名詞"},
      {en: "realize",ja: "気づく",ph: "/ˈriəˌlaɪz/",eiken: 3,pos: "動詞"},
      {en: "organize",ja: "組織する",ph: "/ˈɔrɡəˌnaɪz/",eiken: "p2",pos: "動詞"},
      {en: "recognize",ja: "認識する",ph: "/ˈrɛkəɡˌnaɪz/",eiken: "p2",pos: "動詞"},
      {en: "apologize",ja: "謝る",ph: "/əˈpɑləˌdʒaɪz/",eiken: 3,pos: "動詞"},
      {en: "memorize",ja: "暗記する",ph: "/ˈmɛməˌraɪz/",eiken: "p2",pos: "動詞"},
      {en: "criticize",ja: "批判する",ph: "/ˈkrɪtəˌsaɪz/",eiken: 2,pos: "動詞"},
      {en: "emphasize",ja: "強調する",ph: "/ˈɛmfəˌsaɪz/",eiken: 2,pos: "動詞"},
      {en: "summarize",ja: "要約する",ph: "/ˈsʌməˌraɪz/",eiken: 2,pos: "動詞"},
      {en: "modernize",ja: "近代化する",ph: "/ˈmɑdərˌnaɪz/",eiken: "p1",pos: "動詞"},
      {en: "specialize",ja: "専門にする",ph: "/ˈspɛʃəˌlaɪz/",eiken: 2,pos: "動詞"},
      {en: "symbolize",ja: "象徴する",ph: "/ˈsɪmbəˌlaɪz/",eiken: "p1",pos: "動詞"},
      {en: "minimize",ja: "最小にする",ph: "/ˈmɪnəˌmaɪz/",eiken: "p1",pos: "動詞"},
      {en: "maximize",ja: "最大にする",ph: "/ˈmæksəˌmaɪz/",eiken: "p1",pos: "動詞"},
      {en: "utilize",ja: "利用する",ph: "/ˈjutəˌlaɪz/",eiken: "p1",pos: "動詞"},
      {en: "stabilize",ja: "安定させる",ph: "/ˈsteɪbəˌlaɪz/",eiken: "p1",pos: "動詞"},
    ]
  },
  {
    id: "ify_suffix",
    theme: "-ify 接尾辞チェーン",
    words: [
      {en: "identify",ja: "特定する",ph: "/aɪˈdɛntəˌfaɪ/",eiken: 2,pos: "動詞"},
      {en: "classify",ja: "分類する",ph: "/ˈklæsəˌfaɪ/",eiken: 2,pos: "動詞"},
      {en: "simplify",ja: "単純化する",ph: "/ˈsɪmpləˌfaɪ/",eiken: 2,pos: "動詞"},
      {en: "modify",ja: "修正する",ph: "/ˈmɑdəˌfaɪ/",eiken: "p1",pos: "動詞"},
      {en: "notify",ja: "知らせる",ph: "/ˈnoʊtəˌfaɪ/",eiken: "p1",pos: "動詞"},
      {en: "justify",ja: "正当化する",ph: "/ˈdʒʌstəˌfaɪ/",eiken: "p1",pos: "動詞"},
      {en: "clarify",ja: "明らかにする",ph: "/ˈklærəˌfaɪ/",eiken: "p1",pos: "動詞"},
      {en: "amplify",ja: "増幅する",ph: "/ˈæmpləˌfaɪ/",eiken: 1,pos: "動詞"},
      {en: "verify",ja: "確かめる",ph: "/ˈvɛrəˌfaɪ/",eiken: "p1",pos: "動詞"},
      {en: "terrify",ja: "怖がらせる",ph: "/ˈtɛrəˌfaɪ/",eiken: "p1",pos: "動詞"},
      {en: "purify",ja: "浄化する",ph: "/ˈpjʊrəˌfaɪ/",eiken: 1,pos: "動詞"},
      {en: "qualify",ja: "資格を得る",ph: "/ˈkwɑləˌfaɪ/",eiken: 2,pos: "動詞"},
      {en: "intensify",ja: "強める",ph: "/ɪnˈtɛnsəˌfaɪ/",eiken: 1,pos: "動詞"},
      {en: "diversify",ja: "多様化する",ph: "/dɪˈvɜrsəˌfaɪ/",eiken: 1,pos: "動詞"},
    ]
  },
  {
    id: "ous_suffix",
    theme: "-ous 接尾辞チェーン",
    words: [
      {en: "famous",ja: "有名な",ph: "/ˈfeɪməs/",eiken: 4,pos: "形容詞"},
      {en: "dangerous",ja: "危険な",ph: "/ˈdeɪndʒərəs/",eiken: 3,pos: "形容詞"},
      {en: "nervous",ja: "緊張した",ph: "/ˈnɜrvəs/",eiken: 3,pos: "形容詞"},
      {en: "generous",ja: "気前のよい",ph: "/ˈdʒɛnərəs/",eiken: 2,pos: "形容詞"},
      {en: "enormous",ja: "巨大な",ph: "/ɪˈnɔrməs/",eiken: 2,pos: "形容詞"},
      {en: "jealous",ja: "嫉妬深い",ph: "/ˈdʒɛləs/",eiken: 2,pos: "形容詞"},
      {en: "humorous",ja: "ユーモアのある",ph: "/ˈhjumərəs/",eiken: 2,pos: "形容詞"},
      {en: "numerous",ja: "多数の",ph: "/ˈnumərəs/",eiken: 2,pos: "形容詞"},
      {en: "continuous",ja: "連続した",ph: "/kənˈtɪnjuəs/",eiken: 2,pos: "形容詞"},
      {en: "tremendous",ja: "ものすごい",ph: "/trɪˈmɛndəs/",eiken: 2,pos: "形容詞"},
      {en: "marvelous",ja: "すばらしい",ph: "/ˈmɑrvələs/",eiken: "p2",pos: "形容詞"},
      {en: "poisonous",ja: "有毒な",ph: "/ˈpɔɪzənəs/",eiken: 2,pos: "形容詞"},
      {en: "mountainous",ja: "山の多い",ph: "/ˈmaʊntənəs/",eiken: 2,pos: "形容詞"},
      {en: "rigorous",ja: "厳格な",ph: "/ˈrɪɡərəs/",eiken: 1,pos: "形容詞"},
      {en: "ridiculous",ja: "ばかげた",ph: "/rɪˈdɪkjələs/",eiken: "p1",pos: "形容詞"},
      {en: "hazardous",ja: "危険な",ph: "/ˈhæzərdəs/",eiken: "p1",pos: "形容詞"},
      {en: "monotonous",ja: "単調な",ph: "/məˈnɑtənəs/",eiken: 1,pos: "形容詞"},
      {en: "unanimous",ja: "満場一致の",ph: "/juˈnænəməs/",eiken: 1,pos: "形容詞"},
    ]
  },
  {
    id: "ious_suffix",
    theme: "-ious 接尾辞チェーン",
    words: [
      {en: "delicious",ja: "おいしい",ph: "/dɪˈlɪʃəs/",eiken: 4,pos: "形容詞"},
      {en: "serious",ja: "深刻な",ph: "/ˈsɪriəs/",eiken: 3,pos: "形容詞"},
      {en: "curious",ja: "好奇心の強い",ph: "/ˈkjʊriəs/",eiken: 3,pos: "形容詞"},
      {en: "various",ja: "さまざまな",ph: "/ˈvɛriəs/",eiken: "p2",pos: "形容詞"},
      {en: "anxious",ja: "心配な",ph: "/ˈæŋkʃəs/",eiken: 2,pos: "形容詞"},
      {en: "obvious",ja: "明らかな",ph: "/ˈɑbviəs/",eiken: 2,pos: "形容詞"},
      {en: "previous",ja: "以前の",ph: "/ˈpriviəs/",eiken: 2,pos: "形容詞"},
      {en: "precious",ja: "貴重な",ph: "/ˈprɛʃəs/",eiken: 2,pos: "形容詞"},
      {en: "religious",ja: "宗教の",ph: "/rɪˈlɪdʒəs/",eiken: 2,pos: "形容詞"},
      {en: "mysterious",ja: "神秘的な",ph: "/mɪˈstɪriəs/",eiken: 2,pos: "形容詞"},
      {en: "conscious",ja: "意識している",ph: "/ˈkɑnʃəs/",eiken: 2,pos: "形容詞"},
      {en: "ambitious",ja: "野心的な",ph: "/æmˈbɪʃəs/",eiken: 2,pos: "形容詞"},
      {en: "furious",ja: "激怒した",ph: "/ˈfjʊriəs/",eiken: "p1",pos: "形容詞"},
      {en: "glorious",ja: "栄光ある",ph: "/ˈɡlɔriəs/",eiken: 2,pos: "形容詞"},
      {en: "cautious",ja: "慎重な",ph: "/ˈkɔʃəs/",eiken: "p1",pos: "形容詞"},
      {en: "luxurious",ja: "豪華な",ph: "/lʌɡˈʒʊriəs/",eiken: "p1",pos: "形容詞"},
      {en: "suspicious",ja: "疑わしい",ph: "/səˈspɪʃəs/",eiken: "p1",pos: "形容詞"},
      {en: "notorious",ja: "悪名高い",ph: "/noʊˈtɔriəs/",eiken: 1,pos: "形容詞"},
    ]
  },
  {
    id: "al_suffix",
    theme: "-al 接尾辞チェーン",
    words: [
      {en: "animal",ja: "動物",ph: "/ˈænəməl/",eiken: 5,pos: "名詞"},
      {en: "hospital",ja: "病院",ph: "/ˈhɑspɪtəl/",eiken: 5,pos: "名詞"},
      {en: "local",ja: "地元の",ph: "/ˈloʊkəl/",eiken: 3,pos: "形容詞"},
      {en: "natural",ja: "自然の",ph: "/ˈnætʃərəl/",eiken: 3,pos: "形容詞"},
      {en: "national",ja: "国の",ph: "/ˈnæʃənəl/",eiken: 3,pos: "形容詞"},
      {en: "musical",ja: "音楽の",ph: "/ˈmjuzɪkəl/",eiken: 3,pos: "形容詞"},
      {en: "personal",ja: "個人の",ph: "/ˈpɜrsənəl/",eiken: "p2",pos: "形容詞"},
      {en: "cultural",ja: "文化の",ph: "/ˈkʌltʃərəl/",eiken: "p2",pos: "形容詞"},
      {en: "traditional",ja: "伝統的な",ph: "/trəˈdɪʃənəl/",eiken: "p2",pos: "形容詞"},
      {en: "environmental",ja: "環境の",ph: "/ɪnˌvaɪrənˈmɛntəl/",eiken: 2,pos: "形容詞"},
      {en: "arrival",ja: "到着",ph: "/əˈraɪvəl/",eiken: 2,pos: "名詞"},
      {en: "survival",ja: "生存",ph: "/sərˈvaɪvəl/",eiken: 2,pos: "名詞"},
      {en: "approval",ja: "承認",ph: "/əˈpruvəl/",eiken: 2,pos: "名詞"},
      {en: "proposal",ja: "提案",ph: "/prəˈpoʊzəl/",eiken: 2,pos: "名詞"},
      {en: "removal",ja: "除去",ph: "/rɪˈmuvəl/",eiken: "p1",pos: "名詞"},
      {en: "refusal",ja: "拒否",ph: "/rɪˈfjuzəl/",eiken: "p1",pos: "名詞"},
      {en: "emotional",ja: "感情的な",ph: "/ɪˈmoʊʃənəl/",eiken: 2,pos: "形容詞"},
      {en: "essential",ja: "不可欠な",ph: "/ɪˈsɛnʃəl/",eiken: 2,pos: "形容詞"},
      {en: "potential",ja: "潜在的な",ph: "/pəˈtɛnʃəl/",eiken: 2,pos: "形容詞"},
    ]
  },
  {
    id: "ical_suffix",
    theme: "-ical 接尾辞チェーン",
    words: [
      {en: "practical",ja: "実用的な",ph: "/ˈpræktɪkəl/",eiken: 2,pos: "形容詞"},
      {en: "physical",ja: "身体の",ph: "/ˈfɪzɪkəl/",eiken: 2,pos: "形容詞"},
      {en: "typical",ja: "典型的な",ph: "/ˈtɪpɪkəl/",eiken: 2,pos: "形容詞"},
      {en: "historical",ja: "歴史の",ph: "/hɪˈstɔrɪkəl/",eiken: 2,pos: "形容詞"},
      {en: "logical",ja: "論理的な",ph: "/ˈlɑdʒɪkəl/",eiken: 2,pos: "形容詞"},
      {en: "medical",ja: "医療の",ph: "/ˈmɛdɪkəl/",eiken: "p2",pos: "形容詞"},
      {en: "chemical",ja: "化学の",ph: "/ˈkɛmɪkəl/",eiken: 2,pos: "形容詞"},
      {en: "political",ja: "政治の",ph: "/pəˈlɪtɪkəl/",eiken: 2,pos: "形容詞"},
      {en: "critical",ja: "批判的な・重大な",ph: "/ˈkrɪtɪkəl/",eiken: 2,pos: "形容詞"},
      {en: "technical",ja: "技術的な",ph: "/ˈtɛknɪkəl/",eiken: 2,pos: "形容詞"},
      {en: "classical",ja: "古典的な",ph: "/ˈklæsɪkəl/",eiken: 2,pos: "形容詞"},
      {en: "electrical",ja: "電気の",ph: "/ɪˈlɛktrɪkəl/",eiken: 2,pos: "形容詞"},
      {en: "biological",ja: "生物学の",ph: "/ˌbaɪəˈlɑdʒɪkəl/",eiken: "p1",pos: "形容詞"},
      {en: "economical",ja: "経済的な",ph: "/ˌɛkəˈnɑmɪkəl/",eiken: "p1",pos: "形容詞"},
      {en: "ethical",ja: "倫理的な",ph: "/ˈɛθɪkəl/",eiken: "p1",pos: "形容詞"},
      {en: "identical",ja: "同一の",ph: "/aɪˈdɛntɪkəl/",eiken: "p1",pos: "形容詞"},
      {en: "skeptical",ja: "懐疑的な",ph: "/ˈskɛptɪkəl/",eiken: 1,pos: "形容詞"},
    ]
  },
  {
    id: "ic_suffix",
    theme: "-ic 接尾辞チェーン",
    words: [
      {en: "music",ja: "音楽",ph: "/ˈmjuzɪk/",eiken: 5,pos: "名詞"},
      {en: "picnic",ja: "ピクニック",ph: "/ˈpɪknɪk/",eiken: 4,pos: "名詞"},
      {en: "traffic",ja: "交通",ph: "/ˈtræfɪk/",eiken: 3,pos: "名詞"},
      {en: "magic",ja: "魔法",ph: "/ˈmædʒɪk/",eiken: 3,pos: "名詞"},
      {en: "plastic",ja: "プラスチック",ph: "/ˈplæstɪk/",eiken: 3,pos: "名詞"},
      {en: "topic",ja: "話題",ph: "/ˈtɑpɪk/",eiken: 3,pos: "名詞"},
      {en: "public",ja: "公共の",ph: "/ˈpʌblɪk/",eiken: 3,pos: "形容詞"},
      {en: "basic",ja: "基本的な",ph: "/ˈbeɪsɪk/",eiken: "p2",pos: "形容詞"},
      {en: "electric",ja: "電気の",ph: "/ɪˈlɛktrɪk/",eiken: "p2",pos: "形容詞"},
      {en: "scientific",ja: "科学的な",ph: "/ˌsaɪənˈtɪfɪk/",eiken: 2,pos: "形容詞"},
      {en: "specific",ja: "特定の",ph: "/spəˈsɪfɪk/",eiken: 2,pos: "形容詞"},
      {en: "economic",ja: "経済の",ph: "/ˌɛkəˈnɑmɪk/",eiken: 2,pos: "形容詞"},
      {en: "realistic",ja: "現実的な",ph: "/ˌriəˈlɪstɪk/",eiken: 2,pos: "形容詞"},
      {en: "tragic",ja: "悲劇的な",ph: "/ˈtrædʒɪk/",eiken: 2,pos: "形容詞"},
      {en: "academic",ja: "学問の",ph: "/ˌækəˈdɛmɪk/",eiken: 2,pos: "形容詞"},
      {en: "dramatic",ja: "劇的な",ph: "/drəˈmætɪk/",eiken: 2,pos: "形容詞"},
      {en: "enthusiastic",ja: "熱心な",ph: "/ɪnˌθuziˈæstɪk/",eiken: 2,pos: "形容詞"},
      {en: "optimistic",ja: "楽観的な",ph: "/ˌɑptəˈmɪstɪk/",eiken: "p1",pos: "形容詞"},
      {en: "pessimistic",ja: "悲観的な",ph: "/ˌpɛsəˈmɪstɪk/",eiken: "p1",pos: "形容詞"},
    ]
  },
  {
    id: "ance_suffix",
    theme: "-ance 接尾辞チェーン",
    words: [
      {en: "chance",ja: "機会",ph: "/tʃæns/",eiken: 3,pos: "名詞"},
      {en: "dance",ja: "踊り",ph: "/dæns/",eiken: 5,pos: "名詞"},
      {en: "distance",ja: "距離",ph: "/ˈdɪstəns/",eiken: 3,pos: "名詞"},
      {en: "entrance",ja: "入口",ph: "/ˈɛntrəns/",eiken: 3,pos: "名詞"},
      {en: "balance",ja: "バランス",ph: "/ˈbæləns/",eiken: "p2",pos: "名詞"},
      {en: "importance",ja: "重要性",ph: "/ɪmˈpɔrtəns/",eiken: 2,pos: "名詞"},
      {en: "performance",ja: "演技・性能",ph: "/pərˈfɔrməns/",eiken: "p2",pos: "名詞"},
      {en: "appearance",ja: "外見",ph: "/əˈpɪrəns/",eiken: 2,pos: "名詞"},
      {en: "insurance",ja: "保険",ph: "/ɪnˈʃʊrəns/",eiken: 2,pos: "名詞"},
      {en: "guidance",ja: "指導",ph: "/ˈɡaɪdəns/",eiken: 2,pos: "名詞"},
      {en: "assistance",ja: "援助",ph: "/əˈsɪstəns/",eiken: 2,pos: "名詞"},
      {en: "resistance",ja: "抵抗",ph: "/rɪˈzɪstəns/",eiken: 2,pos: "名詞"},
      {en: "tolerance",ja: "寛容",ph: "/ˈtɑlərəns/",eiken: "p1",pos: "名詞"},
      {en: "abundance",ja: "豊富",ph: "/əˈbʌndəns/",eiken: "p1",pos: "名詞"},
      {en: "annoyance",ja: "いらだち",ph: "/əˈnɔɪəns/",eiken: "p1",pos: "名詞"},
      {en: "reluctance",ja: "気が進まないこと",ph: "/rɪˈlʌktəns/",eiken: 1,pos: "名詞"},
    ]
  },
  {
    id: "ence_suffix",
    theme: "-ence 接尾辞チェーン",
    words: [
      {en: "science",ja: "科学",ph: "/ˈsaɪəns/",eiken: 4,pos: "名詞"},
      {en: "difference",ja: "違い",ph: "/ˈdɪfərəns/",eiken: 3,pos: "名詞"},
      {en: "sentence",ja: "文",ph: "/ˈsɛntəns/",eiken: 3,pos: "名詞"},
      {en: "experience",ja: "経験",ph: "/ɪkˈspɪriəns/",eiken: 3,pos: "名詞"},
      {en: "audience",ja: "観客",ph: "/ˈɔdiəns/",eiken: "p2",pos: "名詞"},
      {en: "silence",ja: "沈黙",ph: "/ˈsaɪləns/",eiken: "p2",pos: "名詞"},
      {en: "evidence",ja: "証拠",ph: "/ˈɛvədəns/",eiken: 2,pos: "名詞"},
      {en: "influence",ja: "影響",ph: "/ˈɪnfluəns/",eiken: 2,pos: "名詞"},
      {en: "conference",ja: "会議",ph: "/ˈkɑnfərəns/",eiken: 2,pos: "名詞"},
      {en: "reference",ja: "参照",ph: "/ˈrɛfərəns/",eiken: 2,pos: "名詞"},
      {en: "preference",ja: "好み",ph: "/ˈprɛfərəns/",eiken: 2,pos: "名詞"},
      {en: "patience",ja: "忍耐",ph: "/ˈpeɪʃəns/",eiken: 2,pos: "名詞"},
      {en: "confidence",ja: "自信",ph: "/ˈkɑnfədəns/",eiken: 2,pos: "名詞"},
      {en: "existence",ja: "存在",ph: "/ɪɡˈzɪstəns/",eiken: 2,pos: "名詞"},
      {en: "independence",ja: "独立",ph: "/ˌɪndɪˈpɛndəns/",eiken: 2,pos: "名詞"},
      {en: "violence",ja: "暴力",ph: "/ˈvaɪələns/",eiken: 2,pos: "名詞"},
      {en: "consequence",ja: "結果",ph: "/ˈkɑnsəˌkwɛns/",eiken: "p1",pos: "名詞"},
      {en: "coincidence",ja: "偶然の一致",ph: "/koʊˈɪnsɪdəns/",eiken: "p1",pos: "名詞"},
    ]
  },
  {
    id: "ant_suffix",
    theme: "-ant 接尾辞チェーン",
    words: [
      {en: "elephant",ja: "象",ph: "/ˈɛləfənt/",eiken: 5,pos: "名詞"},
      {en: "participant",ja: "参加者",ph: "/pɑrˈtɪsəpənt/",eiken: 2,pos: "名詞"},
      {en: "significant",ja: "重要な",ph: "/sɪɡˈnɪfɪkənt/",eiken: 2,pos: "形容詞"},
      {en: "constant",ja: "一定の",ph: "/ˈkɑnstənt/",eiken: 2,pos: "形容詞"},
      {en: "distant",ja: "遠い",ph: "/ˈdɪstənt/",eiken: 2,pos: "形容詞"},
      {en: "relevant",ja: "関連のある",ph: "/ˈrɛləvənt/",eiken: "p1",pos: "形容詞"},
      {en: "tolerant",ja: "寛容な",ph: "/ˈtɑlərənt/",eiken: "p1",pos: "形容詞"},
      {en: "dominant",ja: "支配的な",ph: "/ˈdɑmənənt/",eiken: "p1",pos: "形容詞"},
    ]
  },
  {
    id: "ent_adj_suffix",
    theme: "-ent 形容詞チェーン",
    words: [
      {en: "excellent",ja: "すばらしい",ph: "/ˈɛksələnt/",eiken: 3,pos: "形容詞"},
      {en: "patient",ja: "忍耐強い",ph: "/ˈpeɪʃənt/",eiken: 2,pos: "形容詞"},
      {en: "recent",ja: "最近の",ph: "/ˈrisənt/",eiken: 2,pos: "形容詞"},
      {en: "silent",ja: "静かな",ph: "/ˈsaɪlənt/",eiken: "p2",pos: "形容詞"},
      {en: "efficient",ja: "効率的な",ph: "/ɪˈfɪʃənt/",eiken: 2,pos: "形容詞"},
      {en: "sufficient",ja: "十分な",ph: "/səˈfɪʃənt/",eiken: "p1",pos: "形容詞"},
      {en: "independent",ja: "独立した",ph: "/ˌɪndɪˈpɛndənt/",eiken: 2,pos: "形容詞"},
      {en: "violent",ja: "暴力的な",ph: "/ˈvaɪələnt/",eiken: 2,pos: "形容詞"},
      {en: "frequent",ja: "頻繁な",ph: "/ˈfrikwənt/",eiken: 2,pos: "形容詞"},
      {en: "evident",ja: "明らかな",ph: "/ˈɛvədənt/",eiken: "p1",pos: "形容詞"},
      {en: "permanent",ja: "永続的な",ph: "/ˈpɜrmənənt/",eiken: 2,pos: "形容詞"},
      {en: "innocent",ja: "無罪の",ph: "/ˈɪnəsənt/",eiken: 2,pos: "形容詞"},
      {en: "fluent",ja: "流暢な",ph: "/ˈfluənt/",eiken: 2,pos: "形容詞"},
      {en: "prominent",ja: "著名な",ph: "/ˈprɑmənənt/",eiken: 1,pos: "形容詞"},
    ]
  },
  {
    id: "ism_suffix",
    theme: "-ism 接尾辞チェーン",
    words: [
      {en: "tourism",ja: "観光業",ph: "/ˈtʊrɪzəm/",eiken: 2,pos: "名詞"},
      {en: "criticism",ja: "批判",ph: "/ˈkrɪtəˌsɪzəm/",eiken: 2,pos: "名詞"},
      {en: "optimism",ja: "楽観主義",ph: "/ˈɑptəˌmɪzəm/",eiken: "p1",pos: "名詞"},
      {en: "pessimism",ja: "悲観主義",ph: "/ˈpɛsəˌmɪzəm/",eiken: 1,pos: "名詞"},
      {en: "racism",ja: "人種差別",ph: "/ˈreɪˌsɪzəm/",eiken: "p1",pos: "名詞"},
      {en: "terrorism",ja: "テロ",ph: "/ˈtɛrəˌrɪzəm/",eiken: "p1",pos: "名詞"},
      {en: "realism",ja: "現実主義",ph: "/ˈriəˌlɪzəm/",eiken: "p1",pos: "名詞"},
      {en: "journalism",ja: "報道",ph: "/ˈdʒɜrnəˌlɪzəm/",eiken: "p1",pos: "名詞"},
      {en: "capitalism",ja: "資本主義",ph: "/ˈkæpətəˌlɪzəm/",eiken: 1,pos: "名詞"},
      {en: "heroism",ja: "英雄的行為",ph: "/ˈhɛroʊˌɪzəm/",eiken: 1,pos: "名詞"},
      {en: "mechanism",ja: "仕組み",ph: "/ˈmɛkəˌnɪzəm/",eiken: "p1",pos: "名詞"},
      {en: "patriotism",ja: "愛国心",ph: "/ˈpeɪtriəˌtɪzəm/",eiken: 1,pos: "名詞"},
      {en: "egoism",ja: "利己主義",ph: "/ˈiɡoʊˌɪzəm/",eiken: 1,pos: "名詞"},
    ]
  },
  {
    id: "ist_suffix",
    theme: "-ist 接尾辞チェーン",
    words: [
      {en: "artist",ja: "芸術家",ph: "/ˈɑrtɪst/",eiken: 3,pos: "名詞"},
      {en: "pianist",ja: "ピアニスト",ph: "/piˈænɪst/",eiken: 4,pos: "名詞"},
      {en: "scientist",ja: "科学者",ph: "/ˈsaɪəntɪst/",eiken: 3,pos: "名詞"},
      {en: "dentist",ja: "歯医者",ph: "/ˈdɛntɪst/",eiken: 3,pos: "名詞"},
      {en: "tourist",ja: "観光客",ph: "/ˈtʊrɪst/",eiken: 3,pos: "名詞"},
      {en: "journalist",ja: "記者",ph: "/ˈdʒɜrnəlɪst/",eiken: 2,pos: "名詞"},
      {en: "specialist",ja: "専門家",ph: "/ˈspɛʃəlɪst/",eiken: 2,pos: "名詞"},
      {en: "novelist",ja: "小説家",ph: "/ˈnɑvəlɪst/",eiken: 2,pos: "名詞"},
      {en: "violinist",ja: "バイオリン奏者",ph: "/ˌvaɪəˈlɪnɪst/",eiken: 3,pos: "名詞"},
      {en: "guitarist",ja: "ギタリスト",ph: "/ɡɪˈtɑrɪst/",eiken: 3,pos: "名詞"},
      {en: "economist",ja: "経済学者",ph: "/ɪˈkɑnəmɪst/",eiken: "p1",pos: "名詞"},
      {en: "biologist",ja: "生物学者",ph: "/baɪˈɑlədʒɪst/",eiken: "p1",pos: "名詞"},
      {en: "psychologist",ja: "心理学者",ph: "/saɪˈkɑlədʒɪst/",eiken: "p1",pos: "名詞"},
      {en: "optimist",ja: "楽観主義者",ph: "/ˈɑptəmɪst/",eiken: "p1",pos: "名詞"},
      {en: "activist",ja: "活動家",ph: "/ˈæktəvɪst/",eiken: "p1",pos: "名詞"},
    ]
  },
  {
    id: "ship_suffix",
    theme: "-ship 接尾辞チェーン",
    words: [
      {en: "friendship",ja: "友情",ph: "/ˈfrɛndʃɪp/",eiken: 3,pos: "名詞"},
      {en: "relationship",ja: "関係",ph: "/rɪˈleɪʃənˌʃɪp/",eiken: 2,pos: "名詞"},
      {en: "leadership",ja: "指導力",ph: "/ˈlidərˌʃɪp/",eiken: 2,pos: "名詞"},
      {en: "membership",ja: "会員資格",ph: "/ˈmɛmbərˌʃɪp/",eiken: 2,pos: "名詞"},
      {en: "championship",ja: "選手権",ph: "/ˈtʃæmpiənˌʃɪp/",eiken: 2,pos: "名詞"},
      {en: "partnership",ja: "協力関係",ph: "/ˈpɑrtnərˌʃɪp/",eiken: "p1",pos: "名詞"},
      {en: "ownership",ja: "所有権",ph: "/ˈoʊnərˌʃɪp/",eiken: "p1",pos: "名詞"},
      {en: "scholarship",ja: "奨学金",ph: "/ˈskɑlərˌʃɪp/",eiken: 2,pos: "名詞"},
      {en: "citizenship",ja: "市民権",ph: "/ˈsɪtəzənˌʃɪp/",eiken: "p1",pos: "名詞"},
      {en: "hardship",ja: "苦難",ph: "/ˈhɑrdʃɪp/",eiken: "p1",pos: "名詞"},
      {en: "sponsorship",ja: "後援",ph: "/ˈspɑnsərˌʃɪp/",eiken: 1,pos: "名詞"},
      {en: "internship",ja: "インターンシップ",ph: "/ˈɪntɜrnˌʃɪp/",eiken: "p1",pos: "名詞"},
      {en: "censorship",ja: "検閲",ph: "/ˈsɛnsərˌʃɪp/",eiken: 1,pos: "名詞"},
    ]
  },
  {
    id: "hood_suffix",
    theme: "-hood 接尾辞チェーン",
    words: [
      {en: "childhood",ja: "子ども時代",ph: "/ˈtʃaɪldˌhʊd/",eiken: 3,pos: "名詞"},
      {en: "neighborhood",ja: "近所",ph: "/ˈneɪbərˌhʊd/",eiken: "p2",pos: "名詞"},
      {en: "likelihood",ja: "可能性",ph: "/ˈlaɪkliˌhʊd/",eiken: 1,pos: "名詞"},
      {en: "adulthood",ja: "成人期",ph: "/əˈdʌltˌhʊd/",eiken: "p1",pos: "名詞"},
      {en: "parenthood",ja: "親であること",ph: "/ˈpɛrəntˌhʊd/",eiken: 1,pos: "名詞"},
      {en: "motherhood",ja: "母であること",ph: "/ˈmʌðərˌhʊd/",eiken: "p1",pos: "名詞"},
      {en: "fatherhood",ja: "父であること",ph: "/ˈfɑðərˌhʊd/",eiken: "p1",pos: "名詞"},
      {en: "brotherhood",ja: "兄弟愛",ph: "/ˈbrʌðərˌhʊd/",eiken: "p1",pos: "名詞"},
      {en: "livelihood",ja: "生計",ph: "/ˈlaɪvliˌhʊd/",eiken: 1,pos: "名詞"},
      {en: "falsehood",ja: "うそ",ph: "/ˈfɔlsˌhʊd/",eiken: 1,pos: "名詞"},
      {en: "babyhood",ja: "赤ちゃん時代",ph: "/ˈbeɪbiˌhʊd/",eiken: 1,pos: "名詞"},
      {en: "sisterhood",ja: "姉妹関係",ph: "/ˈsɪstərˌhʊd/",eiken: 1,pos: "名詞"},
    ]
  },
  {
    id: "ward_suffix",
    theme: "-ward 接尾辞チェーン",
    words: [
      {en: "forward",ja: "前へ",ph: "/ˈfɔrwərd/",eiken: 3,pos: "副詞"},
      {en: "backward",ja: "後ろへ",ph: "/ˈbækwərd/",eiken: 2,pos: "副詞"},
      {en: "toward",ja: "〜の方へ",ph: "/tɔrd/",eiken: 3,pos: "前置詞"},
      {en: "upward",ja: "上へ",ph: "/ˈʌpwərd/",eiken: 2,pos: "副詞"},
      {en: "downward",ja: "下へ",ph: "/ˈdaʊnwərd/",eiken: 2,pos: "副詞"},
      {en: "afterward",ja: "その後",ph: "/ˈæftərwərd/",eiken: 2,pos: "副詞"},
      {en: "awkward",ja: "ぎこちない",ph: "/ˈɔkwərd/",eiken: "p1",pos: "形容詞"},
      {en: "inward",ja: "内側へ",ph: "/ˈɪnwərd/",eiken: "p1",pos: "副詞"},
      {en: "outward",ja: "外側へ",ph: "/ˈaʊtwərd/",eiken: "p1",pos: "形容詞"},
      {en: "homeward",ja: "家路の",ph: "/ˈhoʊmwərd/",eiken: 1,pos: "副詞"},
      {en: "eastward",ja: "東へ",ph: "/ˈistwərd/",eiken: 1,pos: "副詞"},
      {en: "westward",ja: "西へ",ph: "/ˈwɛstwərd/",eiken: 1,pos: "副詞"},
    ]
  },
  {
    id: "ory_suffix",
    theme: "-ory 接尾辞チェーン",
    words: [
      {en: "history",ja: "歴史",ph: "/ˈhɪstəri/",eiken: 4,pos: "名詞"},
      {en: "memory",ja: "記憶",ph: "/ˈmɛməri/",eiken: 3,pos: "名詞"},
      {en: "factory",ja: "工場",ph: "/ˈfæktəri/",eiken: 3,pos: "名詞"},
      {en: "victory",ja: "勝利",ph: "/ˈvɪktəri/",eiken: "p2",pos: "名詞"},
      {en: "category",ja: "分類",ph: "/ˈkætəˌɡɔri/",eiken: 2,pos: "名詞"},
      {en: "territory",ja: "領土",ph: "/ˈtɛrəˌtɔri/",eiken: "p1",pos: "名詞"},
      {en: "theory",ja: "理論",ph: "/ˈθiəri/",eiken: 2,pos: "名詞"},
      {en: "laboratory",ja: "実験室",ph: "/ˈlæbrəˌtɔri/",eiken: 2,pos: "名詞"},
      {en: "directory",ja: "名簿",ph: "/dəˈrɛktəri/",eiken: "p1",pos: "名詞"},
      {en: "inventory",ja: "在庫",ph: "/ˈɪnvənˌtɔri/",eiken: 1,pos: "名詞"},
      {en: "mandatory",ja: "義務的な",ph: "/ˈmændəˌtɔri/",eiken: 1,pos: "形容詞"},
      {en: "satisfactory",ja: "満足のいく",ph: "/ˌsætɪsˈfæktəri/",eiken: "p1",pos: "形容詞"},
      {en: "compulsory",ja: "強制的な",ph: "/kəmˈpʌlsəri/",eiken: 1,pos: "形容詞"},
    ]
  },
  {
    id: "ery_suffix",
    theme: "-ery 接尾辞チェーン",
    words: [
      {en: "bakery",ja: "パン屋",ph: "/ˈbeɪkəri/",eiken: 3,pos: "名詞"},
      {en: "grocery",ja: "食料品",ph: "/ˈɡroʊsəri/",eiken: 2,pos: "名詞"},
      {en: "discovery",ja: "発見",ph: "/dɪˈskʌvəri/",eiken: 2,pos: "名詞"},
      {en: "delivery",ja: "配達",ph: "/dɪˈlɪvəri/",eiken: 2,pos: "名詞"},
      {en: "recovery",ja: "回復",ph: "/rɪˈkʌvəri/",eiken: 2,pos: "名詞"},
      {en: "bravery",ja: "勇敢さ",ph: "/ˈbreɪvəri/",eiken: "p1",pos: "名詞"},
      {en: "scenery",ja: "景色",ph: "/ˈsinəri/",eiken: 2,pos: "名詞"},
      {en: "machinery",ja: "機械類",ph: "/məˈʃinəri/",eiken: "p1",pos: "名詞"},
      {en: "slavery",ja: "奴隷制度",ph: "/ˈsleɪvəri/",eiken: "p1",pos: "名詞"},
      {en: "surgery",ja: "手術",ph: "/ˈsɜrdʒəri/",eiken: 2,pos: "名詞"},
      {en: "mystery",ja: "謎",ph: "/ˈmɪstəri/",eiken: 3,pos: "名詞"},
      {en: "pottery",ja: "陶器",ph: "/ˈpɑtəri/",eiken: "p1",pos: "名詞"},
      {en: "brewery",ja: "醸造所",ph: "/ˈbruəri/",eiken: 1,pos: "名詞"},
      {en: "nursery",ja: "保育所",ph: "/ˈnɜrsəri/",eiken: "p1",pos: "名詞"},
    ]
  },
  {
    id: "ative_suffix",
    theme: "-ative 接尾辞チェーン",
    words: [
      {en: "negative",ja: "否定的な",ph: "/ˈnɛɡətɪv/",eiken: 2,pos: "形容詞"},
      {en: "talkative",ja: "おしゃべりな",ph: "/ˈtɔkətɪv/",eiken: 2,pos: "形容詞"},
      {en: "relative",ja: "親戚",ph: "/ˈrɛlətɪv/",eiken: 2,pos: "名詞"},
      {en: "alternative",ja: "代わりの",ph: "/ɔlˈtɜrnətɪv/",eiken: 2,pos: "形容詞"},
      {en: "representative",ja: "代表者",ph: "/ˌrɛprɪˈzɛntətɪv/",eiken: "p1",pos: "名詞"},
      {en: "conservative",ja: "保守的な",ph: "/kənˈsɜrvətɪv/",eiken: "p1",pos: "形容詞"},
      {en: "informative",ja: "有益な",ph: "/ɪnˈfɔrmətɪv/",eiken: "p1",pos: "形容詞"},
      {en: "imaginative",ja: "想像力豊かな",ph: "/ɪˈmædʒənətɪv/",eiken: "p1",pos: "形容詞"},
      {en: "cooperative",ja: "協力的な",ph: "/koʊˈɑpərətɪv/",eiken: "p1",pos: "形容詞"},
      {en: "decorative",ja: "装飾的な",ph: "/ˈdɛkərətɪv/",eiken: 1,pos: "形容詞"},
      {en: "argumentative",ja: "論争好きな",ph: "/ˌɑrɡjəˈmɛntətɪv/",eiken: 1,pos: "形容詞"},
    ]
  },
  {
    id: "ible_suffix",
    theme: "-ible 接尾辞チェーン",
    words: [
      {en: "possible",ja: "可能な",ph: "/ˈpɑsəbəl/",eiken: 3,pos: "形容詞"},
      {en: "impossible",ja: "不可能な",ph: "/ɪmˈpɑsəbəl/",eiken: 3,pos: "形容詞"},
      {en: "terrible",ja: "ひどい",ph: "/ˈtɛrəbəl/",eiken: 3,pos: "形容詞"},
      {en: "horrible",ja: "恐ろしい",ph: "/ˈhɔrəbəl/",eiken: 2,pos: "形容詞"},
      {en: "visible",ja: "目に見える",ph: "/ˈvɪzəbəl/",eiken: 2,pos: "形容詞"},
      {en: "invisible",ja: "目に見えない",ph: "/ɪnˈvɪzəbəl/",eiken: 2,pos: "形容詞"},
      {en: "flexible",ja: "柔軟な",ph: "/ˈflɛksəbəl/",eiken: 2,pos: "形容詞"},
      {en: "responsible",ja: "責任のある",ph: "/rɪˈspɑnsəbəl/",eiken: 2,pos: "形容詞"},
      {en: "sensible",ja: "分別のある",ph: "/ˈsɛnsəbəl/",eiken: "p1",pos: "形容詞"},
      {en: "incredible",ja: "信じられない",ph: "/ɪnˈkrɛdəbəl/",eiken: 2,pos: "形容詞"},
      {en: "edible",ja: "食べられる",ph: "/ˈɛdəbəl/",eiken: 1,pos: "形容詞"},
      {en: "accessible",ja: "利用しやすい",ph: "/əkˈsɛsəbəl/",eiken: "p1",pos: "形容詞"},
      {en: "compatible",ja: "互換性のある",ph: "/kəmˈpætəbəl/",eiken: 1,pos: "形容詞"},
      {en: "feasible",ja: "実現可能な",ph: "/ˈfizəbəl/",eiken: 1,pos: "形容詞"},
    ]
  },
  {
    id: "ish_suffix",
    theme: "-ish 接尾辞チェーン",
    words: [
      {en: "english",ja: "英語",ph: "/ˈɪŋɡlɪʃ/",eiken: 5,pos: "名詞"},
      {en: "childish",ja: "子どもっぽい",ph: "/ˈtʃaɪldɪʃ/",eiken: 2,pos: "形容詞"},
      {en: "abolish",ja: "廃止する",ph: "/əˈbɑlɪʃ/",eiken: 1,pos: "動詞"},
      {en: "stylish",ja: "おしゃれな",ph: "/ˈstaɪlɪʃ/",eiken: 2,pos: "形容詞"},
    ]
  },
  {
    id: "en_verb_suffix",
    theme: "-en 動詞チェーン",
    words: [
      {en: "widen",ja: "広げる",ph: "/ˈwaɪdən/",eiken: "p1",pos: "動詞"},
      {en: "shorten",ja: "短くする",ph: "/ˈʃɔrtən/",eiken: 2,pos: "動詞"},
      {en: "lengthen",ja: "長くする",ph: "/ˈlɛŋkθən/",eiken: "p1",pos: "動詞"},
      {en: "strengthen",ja: "強める",ph: "/ˈstrɛŋkθən/",eiken: "p1",pos: "動詞"},
      {en: "weaken",ja: "弱める",ph: "/ˈwikən/",eiken: "p1",pos: "動詞"},
      {en: "darken",ja: "暗くする",ph: "/ˈdɑrkən/",eiken: "p1",pos: "動詞"},
      {en: "brighten",ja: "明るくする",ph: "/ˈbraɪtən/",eiken: "p1",pos: "動詞"},
      {en: "soften",ja: "柔らかくする",ph: "/ˈsɔfən/",eiken: "p1",pos: "動詞"},
      {en: "tighten",ja: "締める",ph: "/ˈtaɪtən/",eiken: "p1",pos: "動詞"},
      {en: "loosen",ja: "緩める",ph: "/ˈlusən/",eiken: "p1",pos: "動詞"},
      {en: "threaten",ja: "脅す",ph: "/ˈθrɛtən/",eiken: 2,pos: "動詞"},
      {en: "frighten",ja: "怖がらせる",ph: "/ˈfraɪtən/",eiken: 2,pos: "動詞"},
      {en: "sharpen",ja: "鋭くする",ph: "/ˈʃɑrpən/",eiken: "p1",pos: "動詞"},
      {en: "deepen",ja: "深める",ph: "/ˈdipən/",eiken: "p1",pos: "動詞"},
      {en: "broaden",ja: "広げる",ph: "/ˈbrɔdən/",eiken: "p1",pos: "動詞"},
    ]
  },
  {
    id: "some_suffix",
    theme: "-some 接尾辞チェーン",
    words: [
      {en: "awesome",ja: "すごい",ph: "/ˈɔsəm/",eiken: 3,pos: "形容詞"},
      {en: "handsome",ja: "ハンサムな",ph: "/ˈhænsəm/",eiken: 3,pos: "形容詞"},
      {en: "lonesome",ja: "寂しい",ph: "/ˈloʊnsəm/",eiken: "p1",pos: "形容詞"},
      {en: "troublesome",ja: "厄介な",ph: "/ˈtrʌbəlsəm/",eiken: "p1",pos: "形容詞"},
      {en: "tiresome",ja: "うんざりする",ph: "/ˈtaɪərsəm/",eiken: 1,pos: "形容詞"},
      {en: "wholesome",ja: "健全な",ph: "/ˈhoʊlsəm/",eiken: 1,pos: "形容詞"},
      {en: "fearsome",ja: "恐ろしい",ph: "/ˈfɪrsəm/",eiken: 1,pos: "形容詞"},
      {en: "quarrelsome",ja: "けんか好きな",ph: "/ˈkwɔrəlsəm/",eiken: 1,pos: "形容詞"},
      {en: "burdensome",ja: "負担になる",ph: "/ˈbɜrdənsəm/",eiken: 1,pos: "形容詞"},
      {en: "cumbersome",ja: "扱いにくい",ph: "/ˈkʌmbərsəm/",eiken: 1,pos: "形容詞"},
    ]
  },
  {
    id: "ure_suffix",
    theme: "-ure 接尾辞チェーン",
    words: [
      {en: "exposure",ja: "さらされること",ph: "/ɪkˈspoʊʒər/",eiken: "p1",pos: "名詞"},
      {en: "closure",ja: "閉鎖",ph: "/ˈkloʊʒər/",eiken: "p1",pos: "名詞"},
      {en: "leisure",ja: "余暇",ph: "/ˈliʒər/",eiken: 2,pos: "名詞"},
      {en: "seizure",ja: "押収・発作",ph: "/ˈsiʒər/",eiken: 1,pos: "名詞"},
      {en: "enclosure",ja: "囲い",ph: "/ɪnˈkloʊʒər/",eiken: 1,pos: "名詞"},
      {en: "composure",ja: "落ち着き",ph: "/kəmˈpoʊʒər/",eiken: 1,pos: "名詞"},
    ]
  },
  {
    id: "in_prefix",
    theme: "in- 接頭辞チェーン",
    words: [
      {en: "inside",ja: "内側",ph: "/ɪnˈsaɪd/",eiken: 4,pos: "副詞"},
      {en: "indoor",ja: "屋内の",ph: "/ˈɪnˌdɔr/",eiken: 3,pos: "形容詞"},
      {en: "include",ja: "含む",ph: "/ɪnˈklud/",eiken: "p2",pos: "動詞"},
      {en: "increase",ja: "増える",ph: "/ɪnˈkris/",eiken: "p2",pos: "動詞"},
      {en: "income",ja: "収入",ph: "/ˈɪnˌkʌm/",eiken: 2,pos: "名詞"},
      {en: "inform",ja: "知らせる",ph: "/ɪnˈfɔrm/",eiken: 2,pos: "動詞"},
      {en: "insist",ja: "主張する",ph: "/ɪnˈsɪst/",eiken: 2,pos: "動詞"},
      {en: "injure",ja: "けがをさせる",ph: "/ˈɪndʒər/",eiken: 2,pos: "動詞"},
      {en: "inherit",ja: "相続する",ph: "/ɪnˈhɛrɪt/",eiken: "p1",pos: "動詞"},
      {en: "inevitable",ja: "避けられない",ph: "/ɪˈnɛvɪtəbəl/",eiken: "p1",pos: "形容詞"},
      {en: "insight",ja: "洞察",ph: "/ˈɪnˌsaɪt/",eiken: "p1",pos: "名詞"},
      {en: "incorrect",ja: "不正確な",ph: "/ˌɪnkəˈrɛkt/",eiken: 2,pos: "形容詞"},
      {en: "inaccurate",ja: "不正確な",ph: "/ɪnˈækjərət/",eiken: "p1",pos: "形容詞"},
      {en: "inadequate",ja: "不十分な",ph: "/ɪnˈædɪkwət/",eiken: 1,pos: "形容詞"},
    ]
  },
  {
    id: "im_prefix",
    theme: "im- 接頭辞チェーン",
    words: [
      {en: "image",ja: "イメージ",ph: "/ˈɪmɪdʒ/",eiken: 3,pos: "名詞"},
      {en: "imagine",ja: "想像する",ph: "/ɪˈmædʒɪn/",eiken: 3,pos: "動詞"},
      {en: "improve",ja: "改善する",ph: "/ɪmˈpruv/",eiken: "p2",pos: "動詞"},
      {en: "impose",ja: "課す",ph: "/ɪmˈpoʊz/",eiken: "p1",pos: "動詞"},
      {en: "immediate",ja: "即座の",ph: "/ɪˈmidiət/",eiken: 2,pos: "形容詞"},
      {en: "impolite",ja: "失礼な",ph: "/ˌɪmpəˈlaɪt/",eiken: 2,pos: "形容詞"},
      {en: "impatient",ja: "短気な",ph: "/ɪmˈpeɪʃənt/",eiken: 2,pos: "形容詞"},
      {en: "imperfect",ja: "不完全な",ph: "/ɪmˈpɜrfɪkt/",eiken: "p1",pos: "形容詞"},
      {en: "immature",ja: "未熟な",ph: "/ˌɪməˈtʃʊr/",eiken: "p1",pos: "形容詞"},
      {en: "immoral",ja: "不道徳な",ph: "/ɪˈmɔrəl/",eiken: 1,pos: "形容詞"},
      {en: "immortal",ja: "不死の",ph: "/ɪˈmɔrtəl/",eiken: 1,pos: "形容詞"},
      {en: "impractical",ja: "非実用的な",ph: "/ɪmˈpræktɪkəl/",eiken: 1,pos: "形容詞"},
      {en: "implement",ja: "実行する",ph: "/ˈɪmpləˌmɛnt/",eiken: 1,pos: "動詞"},
      {en: "implication",ja: "含意",ph: "/ˌɪmplɪˈkeɪʃən/",eiken: 1,pos: "名詞"},
    ]
  },
  {
    id: "il_prefix",
    theme: "il- 接頭辞チェーン",
    words: [
      {en: "illegal",ja: "違法な",ph: "/ɪˈliɡəl/",eiken: "p2",pos: "形容詞"},
      {en: "illustrate",ja: "説明する",ph: "/ˈɪləˌstreɪt/",eiken: "p1",pos: "動詞"},
      {en: "illusion",ja: "錯覚",ph: "/ɪˈluʒən/",eiken: "p1",pos: "名詞"},
      {en: "illogical",ja: "非論理的な",ph: "/ɪˈlɑdʒɪkəl/",eiken: 1,pos: "形容詞"},
      {en: "illiterate",ja: "読み書きのできない",ph: "/ɪˈlɪtərət/",eiken: 1,pos: "形容詞"},
    ]
  },
  {
    id: "ir_prefix",
    theme: "ir- 接頭辞チェーン",
    words: [
      {en: "irregular",ja: "不規則な",ph: "/ɪˈrɛɡjələr/",eiken: "p1",pos: "形容詞"},
      {en: "irrelevant",ja: "無関係の",ph: "/ɪˈrɛləvənt/",eiken: 1,pos: "形容詞"},
      {en: "irresponsible",ja: "無責任な",ph: "/ˌɪrɪˈspɑnsəbəl/",eiken: "p1",pos: "形容詞"},
      {en: "irrational",ja: "不合理な",ph: "/ɪˈræʃənəl/",eiken: 1,pos: "形容詞"},
      {en: "irritate",ja: "いらいらさせる",ph: "/ˈɪrɪˌteɪt/",eiken: "p1",pos: "動詞"},
      {en: "irrigation",ja: "かんがい",ph: "/ˌɪrɪˈɡeɪʃən/",eiken: 1,pos: "名詞"},
    ]
  },
  {
    id: "inter_prefix",
    theme: "inter- 接頭辞チェーン",
    words: [
      {en: "internet",ja: "インターネット",ph: "/ˈɪntərˌnɛt/",eiken: 3,pos: "名詞"},
      {en: "interview",ja: "面接",ph: "/ˈɪntərˌvju/",eiken: 3,pos: "名詞"},
      {en: "international",ja: "国際的な",ph: "/ˌɪntərˈnæʃənəl/",eiken: 3,pos: "形容詞"},
      {en: "interrupt",ja: "さえぎる",ph: "/ˌɪntəˈrʌpt/",eiken: 2,pos: "動詞"},
      {en: "interact",ja: "交流する",ph: "/ˌɪntərˈækt/",eiken: "p1",pos: "動詞"},
      {en: "interpret",ja: "解釈する",ph: "/ɪnˈtɜrprɪt/",eiken: "p1",pos: "動詞"},
      {en: "interval",ja: "間隔",ph: "/ˈɪntərvəl/",eiken: "p1",pos: "名詞"},
      {en: "interfere",ja: "干渉する",ph: "/ˌɪntərˈfɪr/",eiken: "p1",pos: "動詞"},
      {en: "intersection",ja: "交差点",ph: "/ˌɪntərˈsɛkʃən/",eiken: "p1",pos: "名詞"},
      {en: "intervene",ja: "介入する",ph: "/ˌɪntərˈvin/",eiken: 1,pos: "動詞"},
      {en: "interaction",ja: "相互作用",ph: "/ˌɪntərˈækʃən/",eiken: "p1",pos: "名詞"},
      {en: "interpreter",ja: "通訳者",ph: "/ɪnˈtɜrprɪtər/",eiken: 2,pos: "名詞"},
      {en: "interior",ja: "内部",ph: "/ɪnˈtɪriər/",eiken: 2,pos: "名詞"},
    ]
  },
  {
    id: "trans_prefix",
    theme: "trans- 接頭辞チェーン",
    words: [
      {en: "transport",ja: "輸送する",ph: "/trænsˈpɔrt/",eiken: 2,pos: "動詞"},
      {en: "transfer",ja: "移す",ph: "/trænsˈfɜr/",eiken: 2,pos: "動詞"},
      {en: "translate",ja: "翻訳する",ph: "/trænzˈleɪt/",eiken: "p2",pos: "動詞"},
      {en: "translation",ja: "翻訳",ph: "/trænzˈleɪʃən/",eiken: 2,pos: "名詞"},
      {en: "transform",ja: "変形させる",ph: "/trænsˈfɔrm/",eiken: "p1",pos: "動詞"},
      {en: "transportation",ja: "交通機関",ph: "/ˌtrænspərˈteɪʃən/",eiken: 2,pos: "名詞"},
      {en: "transition",ja: "移行",ph: "/trænˈzɪʃən/",eiken: "p1",pos: "名詞"},
      {en: "transmit",ja: "送信する",ph: "/trænzˈmɪt/",eiken: 1,pos: "動詞"},
      {en: "transparent",ja: "透明な",ph: "/trænsˈpɛrənt/",eiken: "p1",pos: "形容詞"},
      {en: "transplant",ja: "移植",ph: "/ˈtrænsˌplænt/",eiken: 1,pos: "名詞"},
      {en: "transaction",ja: "取引",ph: "/trænˈzækʃən/",eiken: 1,pos: "名詞"},
      {en: "transformation",ja: "変化",ph: "/ˌtrænsfərˈmeɪʃən/",eiken: "p1",pos: "名詞"},
    ]
  },
  {
    id: "sub_prefix",
    theme: "sub- 接頭辞チェーン",
    words: [
      {en: "subway",ja: "地下鉄",ph: "/ˈsʌbˌweɪ/",eiken: 3,pos: "名詞"},
      {en: "subject",ja: "教科・主題",ph: "/ˈsʌbdʒɪkt/",eiken: 4,pos: "名詞"},
      {en: "submit",ja: "提出する",ph: "/səbˈmɪt/",eiken: "p1",pos: "動詞"},
      {en: "substitute",ja: "代用する",ph: "/ˈsʌbstəˌtut/",eiken: "p1",pos: "動詞"},
      {en: "subtitle",ja: "字幕",ph: "/ˈsʌbˌtaɪtəl/",eiken: 2,pos: "名詞"},
      {en: "suburb",ja: "郊外",ph: "/ˈsʌbɜrb/",eiken: 2,pos: "名詞"},
      {en: "subtract",ja: "引く",ph: "/səbˈtrækt/",eiken: "p1",pos: "動詞"},
      {en: "submarine",ja: "潜水艦",ph: "/ˈsʌbməˌrin/",eiken: "p1",pos: "名詞"},
      {en: "subsidy",ja: "補助金",ph: "/ˈsʌbsɪdi/",eiken: 1,pos: "名詞"},
      {en: "substance",ja: "物質",ph: "/ˈsʌbstəns/",eiken: 2,pos: "名詞"},
      {en: "subtle",ja: "微妙な",ph: "/ˈsʌtəl/",eiken: "p1",pos: "形容詞"},
      {en: "subscribe",ja: "定期購読する",ph: "/səbˈskraɪb/",eiken: 1,pos: "動詞"},
      {en: "subconscious",ja: "潜在意識の",ph: "/sʌbˈkɑnʃəs/",eiken: 1,pos: "形容詞"},
    ]
  },
  {
    id: "super_prefix",
    theme: "super- 接頭辞チェーン",
    words: [
      {en: "supermarket",ja: "スーパー",ph: "/ˈsupərˌmɑrkɪt/",eiken: 5,pos: "名詞"},
      {en: "superman",ja: "スーパーマン",ph: "/ˈsupərˌmæn/",eiken: 3,pos: "名詞"},
      {en: "superior",ja: "優れた",ph: "/səˈpɪriər/",eiken: "p1",pos: "形容詞"},
      {en: "superstar",ja: "スーパースター",ph: "/ˈsupərˌstɑr/",eiken: 3,pos: "名詞"},
      {en: "supervise",ja: "監督する",ph: "/ˈsupərˌvaɪz/",eiken: 1,pos: "動詞"},
      {en: "supervisor",ja: "監督者",ph: "/ˈsupərˌvaɪzər/",eiken: "p1",pos: "名詞"},
      {en: "superstition",ja: "迷信",ph: "/ˌsupərˈstɪʃən/",eiken: "p1",pos: "名詞"},
      {en: "superficial",ja: "表面的な",ph: "/ˌsupərˈfɪʃəl/",eiken: 1,pos: "形容詞"},
      {en: "supernatural",ja: "超自然の",ph: "/ˌsupərˈnætʃərəl/",eiken: 1,pos: "形容詞"},
      {en: "supersonic",ja: "超音速の",ph: "/ˌsupərˈsɑnɪk/",eiken: 1,pos: "形容詞"},
    ]
  },
  {
    id: "over_prefix",
    theme: "over- 接頭辞チェーン",
    words: [
      {en: "overseas",ja: "海外へ",ph: "/ˌoʊvərˈsiz/",eiken: 2,pos: "副詞"},
      {en: "overcome",ja: "克服する",ph: "/ˌoʊvərˈkʌm/",eiken: 2,pos: "動詞"},
      {en: "overnight",ja: "一晩中",ph: "/ˌoʊvərˈnaɪt/",eiken: 2,pos: "副詞"},
      {en: "overweight",ja: "太りすぎの",ph: "/ˌoʊvərˈweɪt/",eiken: 2,pos: "形容詞"},
      {en: "overall",ja: "全体の",ph: "/ˌoʊvərˈɔl/",eiken: "p1",pos: "形容詞"},
      {en: "overwhelm",ja: "圧倒する",ph: "/ˌoʊvərˈwɛlm/",eiken: 1,pos: "動詞"},
      {en: "overflow",ja: "あふれる",ph: "/ˌoʊvərˈfloʊ/",eiken: "p1",pos: "動詞"},
      {en: "overhear",ja: "ふと耳にする",ph: "/ˌoʊvərˈhɪr/",eiken: "p1",pos: "動詞"},
      {en: "overeat",ja: "食べ過ぎる",ph: "/ˌoʊvərˈit/",eiken: 2,pos: "動詞"},
      {en: "overlap",ja: "重なる",ph: "/ˌoʊvərˈlæp/",eiken: 1,pos: "動詞"},
      {en: "overestimate",ja: "過大評価する",ph: "/ˌoʊvərˈɛstəˌmeɪt/",eiken: 1,pos: "動詞"},
    ]
  },
  {
    id: "under_prefix",
    theme: "under- 接頭辞チェーン",
    words: [
      {en: "understand",ja: "理解する",ph: "/ˌʌndərˈstænd/",eiken: 4,pos: "動詞"},
      {en: "underground",ja: "地下の",ph: "/ˈʌndərˌɡraʊnd/",eiken: 3,pos: "形容詞"},
      {en: "underline",ja: "下線を引く",ph: "/ˈʌndərˌlaɪn/",eiken: 2,pos: "動詞"},
      {en: "underwear",ja: "下着",ph: "/ˈʌndərˌwɛr/",eiken: 2,pos: "名詞"},
      {en: "undergo",ja: "経験する",ph: "/ˌʌndərˈɡoʊ/",eiken: 1,pos: "動詞"},
      {en: "undertake",ja: "引き受ける",ph: "/ˌʌndərˈteɪk/",eiken: 1,pos: "動詞"},
      {en: "underestimate",ja: "過小評価する",ph: "/ˌʌndərˈɛstəˌmeɪt/",eiken: 1,pos: "動詞"},
      {en: "undermine",ja: "むしばむ",ph: "/ˌʌndərˈmaɪn/",eiken: 1,pos: "動詞"},
      {en: "underlying",ja: "根本的な",ph: "/ˌʌndərˈlaɪɪŋ/",eiken: 1,pos: "形容詞"},
      {en: "undergraduate",ja: "学部生",ph: "/ˌʌndərˈɡrædʒuət/",eiken: "p1",pos: "名詞"},
      {en: "understanding",ja: "理解",ph: "/ˌʌndərˈstændɪŋ/",eiken: 2,pos: "名詞"},
    ]
  },
  {
    id: "mis_prefix",
    theme: "mis- 接頭辞チェーン",
    words: [
      {en: "mistake",ja: "誤り",ph: "/mɪˈsteɪk/",eiken: 3,pos: "名詞"},
      {en: "miss",ja: "逃す",ph: "/mɪs/",eiken: 4,pos: "動詞"},
      {en: "misunderstand",ja: "誤解する",ph: "/ˌmɪsʌndərˈstænd/",eiken: 2,pos: "動詞"},
      {en: "mislead",ja: "誤解させる",ph: "/mɪsˈlid/",eiken: "p1",pos: "動詞"},
      {en: "misplace",ja: "置き忘れる",ph: "/mɪsˈpleɪs/",eiken: 1,pos: "動詞"},
      {en: "misuse",ja: "誤用",ph: "/mɪsˈjuz/",eiken: "p1",pos: "動詞"},
      {en: "mischief",ja: "いたずら",ph: "/ˈmɪstʃɪf/",eiken: 1,pos: "名詞"},
      {en: "misery",ja: "みじめさ",ph: "/ˈmɪzəri/",eiken: "p1",pos: "名詞"},
      {en: "misbehave",ja: "行儀悪くする",ph: "/ˌmɪsbɪˈheɪv/",eiken: 1,pos: "動詞"},
      {en: "misinterpret",ja: "誤解する",ph: "/ˌmɪsɪnˈtɜrprɪt/",eiken: 1,pos: "動詞"},
    ]
  },
  {
    id: "non_prefix",
    theme: "non- 接頭辞チェーン",
    words: [
      {en: "nonstop",ja: "直行の",ph: "/ˌnɑnˈstɑp/",eiken: 2,pos: "形容詞"},
      {en: "nonsense",ja: "ばかげたこと",ph: "/ˈnɑnsɛns/",eiken: 2,pos: "名詞"},
      {en: "nonfiction",ja: "ノンフィクション",ph: "/ˌnɑnˈfɪkʃən/",eiken: "p1",pos: "名詞"},
      {en: "nonprofit",ja: "非営利の",ph: "/ˌnɑnˈprɑfɪt/",eiken: "p1",pos: "形容詞"},
      {en: "nonverbal",ja: "言葉を使わない",ph: "/ˌnɑnˈvɜrbəl/",eiken: 1,pos: "形容詞"},
      {en: "nonviolent",ja: "非暴力の",ph: "/ˌnɑnˈvaɪələnt/",eiken: 1,pos: "形容詞"},
      {en: "nonexistent",ja: "存在しない",ph: "/ˌnɑnɪɡˈzɪstənt/",eiken: 1,pos: "形容詞"},
      {en: "nonsmoker",ja: "非喫煙者",ph: "/ˌnɑnˈsmoʊkər/",eiken: "p1",pos: "名詞"},
      {en: "nonetheless",ja: "それにもかかわらず",ph: "/ˌnʌnðəˈlɛs/",eiken: 1,pos: "副詞"},
      {en: "nonchalant",ja: "無頓着な",ph: "/ˌnɑnʃəˈlɑnt/",eiken: 1,pos: "形容詞"},
    ]
  },
  {
    id: "anti_prefix",
    theme: "anti- 接頭辞チェーン",
    words: [
      {en: "antique",ja: "骨董品",ph: "/ænˈtik/",eiken: "p1",pos: "名詞"},
      {en: "antibiotic",ja: "抗生物質",ph: "/ˌæntibaɪˈɑtɪk/",eiken: 1,pos: "名詞"},
      {en: "antisocial",ja: "非社交的な",ph: "/ˌæntiˈsoʊʃəl/",eiken: 1,pos: "形容詞"},
      {en: "antivirus",ja: "ウイルス対策の",ph: "/ˈæntiˌvaɪrəs/",eiken: "p1",pos: "形容詞"},
      {en: "antibody",ja: "抗体",ph: "/ˈæntiˌbɑdi/",eiken: 1,pos: "名詞"},
      {en: "antiwar",ja: "反戦の",ph: "/ˌæntiˈwɔr/",eiken: 1,pos: "形容詞"},
      {en: "anticipate",ja: "予期する",ph: "/ænˈtɪsəˌpeɪt/",eiken: 1,pos: "動詞"},
      {en: "antiseptic",ja: "消毒剤",ph: "/ˌæntəˈsɛptɪk/",eiken: 1,pos: "名詞"},
    ]
  },
  {
    id: "ex_prefix",
    theme: "ex- 接頭辞チェーン",
    words: [
      {en: "exit",ja: "出口",ph: "/ˈɛɡzɪt/",eiken: 3,pos: "名詞"},
      {en: "example",ja: "例",ph: "/ɪɡˈzæmpəl/",eiken: 3,pos: "名詞"},
      {en: "exercise",ja: "運動",ph: "/ˈɛksərˌsaɪz/",eiken: 3,pos: "名詞"},
      {en: "explain",ja: "説明する",ph: "/ɪkˈspleɪn/",eiken: 3,pos: "動詞"},
      {en: "expensive",ja: "高価な",ph: "/ɪkˈspɛnsɪv/",eiken: 4,pos: "形容詞"},
      {en: "expect",ja: "期待する",ph: "/ɪkˈspɛkt/",eiken: "p2",pos: "動詞"},
      {en: "exhibit",ja: "展示する",ph: "/ɪɡˈzɪbɪt/",eiken: "p1",pos: "動詞"},
      {en: "exclude",ja: "除外する",ph: "/ɪkˈsklud/",eiken: "p1",pos: "動詞"},
      {en: "exhaust",ja: "疲れさせる",ph: "/ɪɡˈzɔst/",eiken: "p1",pos: "動詞"},
      {en: "exaggerate",ja: "誇張する",ph: "/ɪɡˈzædʒəˌreɪt/",eiken: "p1",pos: "動詞"},
      {en: "expert",ja: "専門家",ph: "/ˈɛkspərt/",eiken: 2,pos: "名詞"},
      {en: "exotic",ja: "異国風の",ph: "/ɪɡˈzɑtɪk/",eiken: "p1",pos: "形容詞"},
    ]
  },
  {
    id: "pro_prefix",
    theme: "pro- 接頭辞チェーン",
    words: [
      {en: "problem",ja: "問題",ph: "/ˈprɑbləm/",eiken: 4,pos: "名詞"},
      {en: "program",ja: "番組・計画",ph: "/ˈproʊɡræm/",eiken: 4,pos: "名詞"},
      {en: "promise",ja: "約束",ph: "/ˈprɑmɪs/",eiken: 3,pos: "名詞"},
      {en: "project",ja: "計画",ph: "/ˈprɑdʒɛkt/",eiken: "p2",pos: "名詞"},
      {en: "produce",ja: "生産する",ph: "/prəˈdus/",eiken: "p2",pos: "動詞"},
      {en: "progress",ja: "進歩",ph: "/ˈprɑɡrɛs/",eiken: 2,pos: "名詞"},
      {en: "profit",ja: "利益",ph: "/ˈprɑfɪt/",eiken: 2,pos: "名詞"},
      {en: "prohibit",ja: "禁止する",ph: "/proʊˈhɪbɪt/",eiken: "p1",pos: "動詞"},
      {en: "prospect",ja: "見込み",ph: "/ˈprɑˌspɛkt/",eiken: 1,pos: "名詞"},
      {en: "proficient",ja: "熟達した",ph: "/prəˈfɪʃənt/",eiken: 1,pos: "形容詞"},
    ]
  },
  {
    id: "pre_prefix",
    theme: "pre- 接頭辞チェーン",
    words: [
      {en: "prepare",ja: "準備する",ph: "/prɪˈpɛr/",eiken: 3,pos: "動詞"},
      {en: "prefer",ja: "好む",ph: "/prɪˈfɜr/",eiken: "p2",pos: "動詞"},
      {en: "predict",ja: "予測する",ph: "/prɪˈdɪkt/",eiken: 2,pos: "動詞"},
      {en: "prevent",ja: "防ぐ",ph: "/prɪˈvɛnt/",eiken: 2,pos: "動詞"},
      {en: "preview",ja: "試写",ph: "/ˈpriˌvju/",eiken: 2,pos: "名詞"},
      {en: "prefecture",ja: "県",ph: "/ˈprifɛktʃər/",eiken: 2,pos: "名詞"},
      {en: "precise",ja: "正確な",ph: "/prɪˈsaɪs/",eiken: "p1",pos: "形容詞"},
      {en: "premature",ja: "時期尚早の",ph: "/ˌpriməˈtʃʊr/",eiken: 1,pos: "形容詞"},
      {en: "presume",ja: "推定する",ph: "/prɪˈzum/",eiken: 1,pos: "動詞"},
      {en: "precede",ja: "先行する",ph: "/prɪˈsid/",eiken: 1,pos: "動詞"},
      {en: "preliminary",ja: "予備の",ph: "/prɪˈlɪməˌnɛri/",eiken: 1,pos: "形容詞"},
    ]
  },
  {
    id: "con_prefix",
    theme: "con- 接頭辞チェーン",
    words: [
      {en: "concert",ja: "コンサート",ph: "/ˈkɑnsərt/",eiken: 4,pos: "名詞"},
      {en: "continue",ja: "続ける",ph: "/kənˈtɪnju/",eiken: 3,pos: "動詞"},
      {en: "contact",ja: "連絡する",ph: "/ˈkɑntækt/",eiken: "p2",pos: "動詞"},
      {en: "contain",ja: "含む",ph: "/kənˈteɪn/",eiken: 2,pos: "動詞"},
      {en: "control",ja: "管理する",ph: "/kənˈtroʊl/",eiken: "p2",pos: "動詞"},
      {en: "consider",ja: "よく考える",ph: "/kənˈsɪdər/",eiken: 2,pos: "動詞"},
      {en: "concern",ja: "心配",ph: "/kənˈsɜrn/",eiken: 2,pos: "名詞"},
      {en: "confirm",ja: "確認する",ph: "/kənˈfɜrm/",eiken: 2,pos: "動詞"},
      {en: "consume",ja: "消費する",ph: "/kənˈsum/",eiken: 2,pos: "動詞"},
      {en: "contribute",ja: "貢献する",ph: "/kənˈtrɪbjut/",eiken: 2,pos: "動詞"},
      {en: "construct",ja: "建設する",ph: "/kənˈstrʌkt/",eiken: "p1",pos: "動詞"},
      {en: "convince",ja: "納得させる",ph: "/kənˈvɪns/",eiken: "p1",pos: "動詞"},
      {en: "conclude",ja: "結論づける",ph: "/kənˈklud/",eiken: "p1",pos: "動詞"},
      {en: "conduct",ja: "行う",ph: "/kənˈdʌkt/",eiken: "p1",pos: "動詞"},
      {en: "consent",ja: "同意",ph: "/kənˈsɛnt/",eiken: 1,pos: "名詞"},
      {en: "contemplate",ja: "熟考する",ph: "/ˈkɑntəmˌpleɪt/",eiken: 1,pos: "動詞"},
    ]
  },
  {
    id: "com_prefix",
    theme: "com- 接頭辞チェーン",
    words: [
      {en: "come",ja: "来る",ph: "/kʌm/",eiken: 5,pos: "動詞"},
      {en: "computer",ja: "コンピューター",ph: "/kəmˈpjutər/",eiken: 5,pos: "名詞"},
      {en: "company",ja: "会社",ph: "/ˈkʌmpəni/",eiken: 3,pos: "名詞"},
      {en: "compare",ja: "比べる",ph: "/kəmˈpɛr/",eiken: "p2",pos: "動詞"},
      {en: "complete",ja: "完成させる",ph: "/kəmˈplit/",eiken: "p2",pos: "動詞"},
      {en: "communicate",ja: "意思を伝え合う",ph: "/kəˈmjunəˌkeɪt/",eiken: 2,pos: "動詞"},
      {en: "compete",ja: "競う",ph: "/kəmˈpit/",eiken: 2,pos: "動詞"},
      {en: "complain",ja: "不平を言う",ph: "/kəmˈpleɪn/",eiken: 2,pos: "動詞"},
      {en: "complex",ja: "複雑な",ph: "/kəmˈplɛks/",eiken: 2,pos: "形容詞"},
      {en: "commercial",ja: "コマーシャル",ph: "/kəˈmɜrʃəl/",eiken: 2,pos: "名詞"},
      {en: "combine",ja: "組み合わせる",ph: "/kəmˈbaɪn/",eiken: "p1",pos: "動詞"},
      {en: "commit",ja: "犯す・委ねる",ph: "/kəˈmɪt/",eiken: "p1",pos: "動詞"},
      {en: "compensate",ja: "補償する",ph: "/ˈkɑmpənˌseɪt/",eiken: 1,pos: "動詞"},
      {en: "compromise",ja: "妥協",ph: "/ˈkɑmprəˌmaɪz/",eiken: "p1",pos: "名詞"},
    ]
  },
  {
    id: "de_prefix",
    theme: "de- 接頭辞チェーン",
    words: [
      {en: "desk",ja: "机",ph: "/dɛsk/",eiken: 5,pos: "名詞"},
      {en: "design",ja: "デザイン",ph: "/dɪˈzaɪn/",eiken: 3,pos: "名詞"},
      {en: "describe",ja: "描写する",ph: "/dɪˈskraɪb/",eiken: 2,pos: "動詞"},
      {en: "develop",ja: "発達させる",ph: "/dɪˈvɛləp/",eiken: 2,pos: "動詞"},
      {en: "decrease",ja: "減る",ph: "/dɪˈkris/",eiken: 2,pos: "動詞"},
      {en: "deliver",ja: "配達する",ph: "/dɪˈlɪvər/",eiken: 2,pos: "動詞"},
      {en: "detect",ja: "発見する",ph: "/dɪˈtɛkt/",eiken: "p1",pos: "動詞"},
      {en: "deceive",ja: "だます",ph: "/dɪˈsiv/",eiken: 1,pos: "動詞"},
      {en: "deteriorate",ja: "悪化する",ph: "/dɪˈtɪriəˌreɪt/",eiken: 1,pos: "動詞"},
    ]
  },
  {
    id: "en_prefix",
    theme: "en- 接頭辞チェーン",
    words: [
      {en: "end",ja: "終わり",ph: "/ɛnd/",eiken: 5,pos: "名詞"},
      {en: "enter",ja: "入る",ph: "/ˈɛntər/",eiken: 3,pos: "動詞"},
      {en: "enough",ja: "十分な",ph: "/ɪˈnʌf/",eiken: 3,pos: "形容詞"},
      {en: "energy",ja: "エネルギー",ph: "/ˈɛnərdʒi/",eiken: 3,pos: "名詞"},
      {en: "engine",ja: "エンジン",ph: "/ˈɛndʒɪn/",eiken: 3,pos: "名詞"},
      {en: "enemy",ja: "敵",ph: "/ˈɛnəmi/",eiken: 2,pos: "名詞"},
      {en: "encourage",ja: "励ます",ph: "/ɪnˈkɜrɪdʒ/",eiken: 2,pos: "動詞"},
      {en: "enable",ja: "可能にする",ph: "/ɪˈneɪbəl/",eiken: "p1",pos: "動詞"},
      {en: "enlarge",ja: "拡大する",ph: "/ɪnˈlɑrdʒ/",eiken: "p1",pos: "動詞"},
      {en: "enrich",ja: "豊かにする",ph: "/ɪnˈrɪtʃ/",eiken: 1,pos: "動詞"},
      {en: "ensure",ja: "確実にする",ph: "/ɪnˈʃʊr/",eiken: "p1",pos: "動詞"},
      {en: "enclose",ja: "同封する",ph: "/ɪnˈkloʊz/",eiken: "p1",pos: "動詞"},
      {en: "endanger",ja: "危険にさらす",ph: "/ɪnˈdeɪndʒər/",eiken: "p1",pos: "動詞"},
      {en: "entertain",ja: "楽しませる",ph: "/ˌɛntərˈteɪn/",eiken: 2,pos: "動詞"},
      {en: "envy",ja: "うらやむ",ph: "/ˈɛnvi/",eiken: "p1",pos: "動詞"},
    ]
  },
  {
    id: "em_prefix",
    theme: "em- 接頭辞チェーン",
    words: [
      {en: "empty",ja: "空の",ph: "/ˈɛmpti/",eiken: 3,pos: "形容詞"},
      {en: "emergency",ja: "緊急事態",ph: "/ɪˈmɜrdʒənsi/",eiken: 2,pos: "名詞"},
      {en: "emotion",ja: "感情",ph: "/ɪˈmoʊʃən/",eiken: 2,pos: "名詞"},
      {en: "empower",ja: "権限を与える",ph: "/ɪmˈpaʊər/",eiken: 1,pos: "動詞"},
      {en: "embrace",ja: "抱きしめる",ph: "/ɪmˈbreɪs/",eiken: "p1",pos: "動詞"},
      {en: "embarrass",ja: "恥ずかしい思いをさせる",ph: "/ɪmˈbærəs/",eiken: "p1",pos: "動詞"},
      {en: "emphasis",ja: "強調",ph: "/ˈɛmfəsɪs/",eiken: "p1",pos: "名詞"},
      {en: "emerge",ja: "現れる",ph: "/ɪˈmɜrdʒ/",eiken: "p1",pos: "動詞"},
      {en: "emit",ja: "放出する",ph: "/ɪˈmɪt/",eiken: 1,pos: "動詞"},
      {en: "empathy",ja: "共感",ph: "/ˈɛmpəθi/",eiken: 1,pos: "名詞"},
    ]
  },
  {
    id: "fore_prefix",
    theme: "fore- 接頭辞チェーン",
    words: [
      {en: "foreign",ja: "外国の",ph: "/ˈfɔrən/",eiken: 3,pos: "形容詞"},
      {en: "foreigner",ja: "外国人",ph: "/ˈfɔrənər/",eiken: 3,pos: "名詞"},
      {en: "forever",ja: "永遠に",ph: "/fərˈɛvər/",eiken: 3,pos: "副詞"},
      {en: "foresee",ja: "予見する",ph: "/fɔrˈsi/",eiken: 1,pos: "動詞"},
      {en: "foremost",ja: "最も重要な",ph: "/ˈfɔrˌmoʊst/",eiken: 1,pos: "形容詞"},
      {en: "forefront",ja: "最前線",ph: "/ˈfɔrˌfrʌnt/",eiken: 1,pos: "名詞"},
      {en: "foreground",ja: "前景",ph: "/ˈfɔrˌɡraʊnd/",eiken: 1,pos: "名詞"},
      {en: "foresight",ja: "先見の明",ph: "/ˈfɔrˌsaɪt/",eiken: 1,pos: "名詞"},
      {en: "forerunner",ja: "先駆者",ph: "/ˈfɔrˌrʌnər/",eiken: 1,pos: "名詞"},
    ]
  },
  {
    id: "auto_prefix",
    theme: "auto- 接頭辞チェーン",
    words: [
      {en: "automatic",ja: "自動の",ph: "/ˌɔtəˈmætɪk/",eiken: 2,pos: "形容詞"},
      {en: "automobile",ja: "自動車",ph: "/ˈɔtəmoʊˌbil/",eiken: "p1",pos: "名詞"},
      {en: "autograph",ja: "サイン",ph: "/ˈɔtəˌɡræf/",eiken: 2,pos: "名詞"},
      {en: "autobiography",ja: "自伝",ph: "/ˌɔtəbaɪˈɑɡrəfi/",eiken: 1,pos: "名詞"},
      {en: "automation",ja: "自動化",ph: "/ˌɔtəˈmeɪʃən/",eiken: 1,pos: "名詞"},
      {en: "autonomy",ja: "自治",ph: "/ɔˈtɑnəmi/",eiken: 1,pos: "名詞"},
      {en: "autonomous",ja: "自律的な",ph: "/ɔˈtɑnəməs/",eiken: 1,pos: "形容詞"},
      {en: "automatically",ja: "自動的に",ph: "/ˌɔtəˈmætɪkli/",eiken: "p1",pos: "副詞"},
    ]
  },
  {
    id: "tele_prefix",
    theme: "tele- 接頭辞チェーン",
    words: [
      {en: "telephone",ja: "電話",ph: "/ˈtɛləˌfoʊn/",eiken: 4,pos: "名詞"},
      {en: "telegram",ja: "電報",ph: "/ˈtɛləˌɡræm/",eiken: "p1",pos: "名詞"},
      {en: "telecommute",ja: "在宅勤務する",ph: "/ˌtɛləkəˈmjut/",eiken: 1,pos: "動詞"},
      {en: "telepathy",ja: "テレパシー",ph: "/təˈlɛpəθi/",eiken: 1,pos: "名詞"},
      {en: "telework",ja: "テレワーク",ph: "/ˈtɛləˌwɜrk/",eiken: "p1",pos: "名詞"},
      {en: "telegraph",ja: "電信",ph: "/ˈtɛləˌɡræf/",eiken: 1,pos: "名詞"},
      {en: "televise",ja: "テレビ放送する",ph: "/ˈtɛləˌvaɪz/",eiken: 1,pos: "動詞"},
    ]
  },
  {
    id: "micro_prefix",
    theme: "micro- 接頭辞チェーン",
    words: [
      {en: "microphone",ja: "マイク",ph: "/ˈmaɪkrəˌfoʊn/",eiken: 2,pos: "名詞"},
      {en: "microchip",ja: "マイクロチップ",ph: "/ˈmaɪkroʊˌtʃɪp/",eiken: "p1",pos: "名詞"},
      {en: "microbe",ja: "微生物",ph: "/ˈmaɪkroʊb/",eiken: 1,pos: "名詞"},
      {en: "microorganism",ja: "微生物",ph: "/ˌmaɪkroʊˈɔrɡəˌnɪzəm/",eiken: 1,pos: "名詞"},
      {en: "microplastic",ja: "マイクロプラスチック",ph: "/ˌmaɪkroʊˈplæstɪk/",eiken: "p1",pos: "名詞"},
      {en: "microscopic",ja: "顕微鏡でしか見えない",ph: "/ˌmaɪkrəˈskɑpɪk/",eiken: 1,pos: "形容詞"},
    ]
  },
  {
    id: "semi_prefix",
    theme: "semi- 接頭辞チェーン",
    words: [
      {en: "semifinal",ja: "準決勝",ph: "/ˌsɛmiˈfaɪnəl/",eiken: 2,pos: "名詞"},
      {en: "semicircle",ja: "半円",ph: "/ˈsɛmiˌsɜrkəl/",eiken: 1,pos: "名詞"},
      {en: "semicolon",ja: "セミコロン",ph: "/ˈsɛmiˌkoʊlən/",eiken: 1,pos: "名詞"},
      {en: "semiconductor",ja: "半導体",ph: "/ˌsɛmikənˈdʌktər/",eiken: 1,pos: "名詞"},
      {en: "seminar",ja: "セミナー",ph: "/ˈsɛməˌnɑr/",eiken: 2,pos: "名詞"},
      {en: "semiannual",ja: "年2回の",ph: "/ˌsɛmiˈænjuəl/",eiken: 1,pos: "形容詞"},
      {en: "semiprecious",ja: "半貴石の",ph: "/ˌsɛmiˈprɛʃəs/",eiken: 1,pos: "形容詞"},
      {en: "semiautomatic",ja: "半自動の",ph: "/ˌsɛmiˌɔtəˈmætɪk/",eiken: 1,pos: "形容詞"},
      {en: "semiformal",ja: "略式礼装の",ph: "/ˌsɛmiˈfɔrməl/",eiken: 1,pos: "形容詞"},
      {en: "semiweekly",ja: "週2回の",ph: "/ˌsɛmiˈwikli/",eiken: 1,pos: "形容詞"},
      {en: "semifinalist",ja: "準決勝進出者",ph: "/ˌsɛmiˈfaɪnəlɪst/",eiken: 1,pos: "名詞"},
    ]
  },
  {
    id: "multi_prefix",
    theme: "multi- 接頭辞チェーン",
    words: [
      {en: "multiply",ja: "かけ算する",ph: "/ˈmʌltəˌplaɪ/",eiken: 2,pos: "動詞"},
      {en: "multiple",ja: "多数の",ph: "/ˈmʌltəpəl/",eiken: "p1",pos: "形容詞"},
      {en: "multimedia",ja: "マルチメディア",ph: "/ˌmʌltiˈmidiə/",eiken: "p1",pos: "名詞"},
      {en: "multinational",ja: "多国籍の",ph: "/ˌmʌltiˈnæʃənəl/",eiken: 1,pos: "形容詞"},
      {en: "multicultural",ja: "多文化の",ph: "/ˌmʌltiˈkʌltʃərəl/",eiken: "p1",pos: "形容詞"},
      {en: "multitude",ja: "多数",ph: "/ˈmʌltəˌtud/",eiken: 1,pos: "名詞"},
      {en: "multilingual",ja: "多言語の",ph: "/ˌmʌltiˈlɪŋɡwəl/",eiken: 1,pos: "形容詞"},
      {en: "multiplication",ja: "かけ算",ph: "/ˌmʌltəplɪˈkeɪʃən/",eiken: 2,pos: "名詞"},
    ]
  },
  {
    id: "in_neg_prefix",
    theme: "in- 否定の接頭辞チェーン",
    words: [
      {en: "inactive",ja: "活動していない",ph: "/ɪnˈæktɪv/",eiken: "p1",pos: "形容詞"},
      {en: "incapable",ja: "できない",ph: "/ɪnˈkeɪpəbəl/",eiken: 1,pos: "形容詞"},
      {en: "incomplete",ja: "不完全な",ph: "/ˌɪnkəmˈplit/",eiken: "p1",pos: "形容詞"},
      {en: "inconvenient",ja: "不便な",ph: "/ˌɪnkənˈvinjənt/",eiken: 2,pos: "形容詞"},
      {en: "inconsistent",ja: "一貫しない",ph: "/ˌɪnkənˈsɪstənt/",eiken: 1,pos: "形容詞"},
      {en: "indirect",ja: "間接的な",ph: "/ˌɪndəˈrɛkt/",eiken: "p1",pos: "形容詞"},
      {en: "informal",ja: "形式ばらない",ph: "/ɪnˈfɔrməl/",eiken: 2,pos: "形容詞"},
      {en: "insecure",ja: "不安な",ph: "/ˌɪnsɪˈkjʊr/",eiken: "p1",pos: "形容詞"},
      {en: "insufficient",ja: "不十分な",ph: "/ˌɪnsəˈfɪʃənt/",eiken: 1,pos: "形容詞"},
      {en: "insensitive",ja: "無神経な",ph: "/ɪnˈsɛnsətɪv/",eiken: 1,pos: "形容詞"},
      {en: "invalid",ja: "無効な",ph: "/ɪnˈvælɪd/",eiken: 1,pos: "形容詞"},
      {en: "inappropriate",ja: "不適切な",ph: "/ˌɪnəˈproʊpriət/",eiken: "p1",pos: "形容詞"},
      {en: "incompetent",ja: "無能な",ph: "/ɪnˈkɑmpətənt/",eiken: 1,pos: "形容詞"},
      {en: "indifferent",ja: "無関心な",ph: "/ɪnˈdɪfərənt/",eiken: "p1",pos: "形容詞"},
      {en: "inexpensive",ja: "安価な",ph: "/ˌɪnɪkˈspɛnsɪv/",eiken: 2,pos: "形容詞"},
      {en: "inefficient",ja: "非効率な",ph: "/ˌɪnɪˈfɪʃənt/",eiken: 1,pos: "形容詞"},
    ]
  },
  {
    id: "de2_prefix",
    theme: "de- 接頭辞チェーン（離れて・下へ）",
    words: [
      {en: "deposit",ja: "預金",ph: "/dɪˈpɑzɪt/",eiken: "p1",pos: "名詞"},
      {en: "depress",ja: "落ち込ませる",ph: "/dɪˈprɛs/",eiken: "p1",pos: "動詞"},
      {en: "derive",ja: "由来する",ph: "/dɪˈraɪv/",eiken: 1,pos: "動詞"},
      {en: "detach",ja: "取り外す",ph: "/dɪˈtætʃ/",eiken: 1,pos: "動詞"},
      {en: "delete",ja: "削除する",ph: "/dɪˈlit/",eiken: 2,pos: "動詞"},
      {en: "decline",ja: "断る・減少する",ph: "/dɪˈklaɪn/",eiken: "p1",pos: "動詞"},
      {en: "degrade",ja: "劣化させる",ph: "/dɪˈɡreɪd/",eiken: 1,pos: "動詞"},
      {en: "dehydrate",ja: "脱水する",ph: "/diˈhaɪˌdreɪt/",eiken: 1,pos: "動詞"},
      {en: "defrost",ja: "解凍する",ph: "/diˈfrɔst/",eiken: 1,pos: "動詞"},
      {en: "deforestation",ja: "森林破壊",ph: "/diˌfɔrɪˈsteɪʃən/",eiken: 1,pos: "名詞"},
      {en: "deduct",ja: "差し引く",ph: "/dɪˈdʌkt/",eiken: 1,pos: "動詞"},
      {en: "depression",ja: "不況・憂うつ",ph: "/dɪˈprɛʃən/",eiken: "p1",pos: "名詞"},
    ]
  },
  {
    id: "con2_prefix",
    theme: "con- 接頭辞チェーン（共に）",
    words: [
      {en: "conversation",ja: "会話",ph: "/ˌkɑnvərˈseɪʃən/",eiken: 3,pos: "名詞"},
      {en: "convenient",ja: "便利な",ph: "/kənˈvinjənt/",eiken: 3,pos: "形容詞"},
      {en: "confuse",ja: "混乱させる",ph: "/kənˈfjuz/",eiken: 2,pos: "動詞"},
      {en: "congratulate",ja: "祝う",ph: "/kənˈɡrætʃəˌleɪt/",eiken: 2,pos: "動詞"},
      {en: "consist",ja: "成る",ph: "/kənˈsɪst/",eiken: "p1",pos: "動詞"},
      {en: "convert",ja: "変える",ph: "/kənˈvɜrt/",eiken: 1,pos: "動詞"},
      {en: "convey",ja: "伝える",ph: "/kənˈveɪ/",eiken: 1,pos: "動詞"},
      {en: "conservation",ja: "保護",ph: "/ˌkɑnsərˈveɪʃən/",eiken: "p1",pos: "名詞"},
      {en: "consult",ja: "相談する",ph: "/kənˈsʌlt/",eiken: "p1",pos: "動詞"},
      {en: "contract",ja: "契約",ph: "/ˈkɑntrækt/",eiken: "p1",pos: "名詞"},
      {en: "context",ja: "文脈",ph: "/ˈkɑntɛkst/",eiken: "p1",pos: "名詞"},
      {en: "controversy",ja: "論争",ph: "/ˈkɑntrəˌvɜrsi/",eiken: 1,pos: "名詞"},
      {en: "conscience",ja: "良心",ph: "/ˈkɑnʃəns/",eiken: 1,pos: "名詞"},
    ]
  },
  {
    id: "com2_prefix",
    theme: "com- 接頭辞チェーン（共に）",
    words: [
      {en: "comedy",ja: "喜劇",ph: "/ˈkɑmədi/",eiken: 2,pos: "名詞"},
      {en: "comic",ja: "漫画",ph: "/ˈkɑmɪk/",eiken: 3,pos: "名詞"},
      {en: "companion",ja: "仲間",ph: "/kəmˈpænjən/",eiken: "p1",pos: "名詞"},
      {en: "compass",ja: "方位磁針",ph: "/ˈkʌmpəs/",eiken: 2,pos: "名詞"},
      {en: "compassion",ja: "思いやり",ph: "/kəmˈpæʃən/",eiken: 1,pos: "名詞"},
      {en: "compile",ja: "編集する",ph: "/kəmˈpaɪl/",eiken: 1,pos: "動詞"},
      {en: "compliment",ja: "ほめ言葉",ph: "/ˈkɑmpləmənt/",eiken: "p1",pos: "名詞"},
      {en: "component",ja: "構成要素",ph: "/kəmˈpoʊnənt/",eiken: 1,pos: "名詞"},
      {en: "comprise",ja: "構成する",ph: "/kəmˈpraɪz/",eiken: 1,pos: "動詞"},
      {en: "commute",ja: "通勤する",ph: "/kəˈmjut/",eiken: "p1",pos: "動詞"},
      {en: "commodity",ja: "商品",ph: "/kəˈmɑdəti/",eiken: 1,pos: "名詞"},
    ]
  },
  {
    id: "ex2_prefix",
    theme: "ex- 接頭辞チェーン（外へ）",
    words: [
      {en: "examine",ja: "調べる",ph: "/ɪɡˈzæmɪn/",eiken: 2,pos: "動詞"},
      {en: "exchange",ja: "交換する",ph: "/ɪksˈtʃeɪndʒ/",eiken: 2,pos: "動詞"},
      {en: "excite",ja: "興奮させる",ph: "/ɪkˈsaɪt/",eiken: 3,pos: "動詞"},
      {en: "excuse",ja: "言い訳",ph: "/ɪkˈskjus/",eiken: 3,pos: "名詞"},
      {en: "exhibition",ja: "展覧会",ph: "/ˌɛksəˈbɪʃən/",eiken: 2,pos: "名詞"},
      {en: "expedition",ja: "遠征",ph: "/ˌɛkspəˈdɪʃən/",eiken: 1,pos: "名詞"},
      {en: "experiment",ja: "実験",ph: "/ɪkˈspɛrəmənt/",eiken: 2,pos: "名詞"},
      {en: "expose",ja: "さらす",ph: "/ɪkˈspoʊz/",eiken: "p1",pos: "動詞"},
      {en: "external",ja: "外部の",ph: "/ɪkˈstɜrnəl/",eiken: 1,pos: "形容詞"},
      {en: "extinct",ja: "絶滅した",ph: "/ɪkˈstɪŋkt/",eiken: "p1",pos: "形容詞"},
    ]
  },
  {
    id: "pro2_prefix",
    theme: "pro- 接頭辞チェーン（前へ）",
    words: [
      {en: "process",ja: "過程",ph: "/ˈprɑsɛs/",eiken: 2,pos: "名詞"},
      {en: "product",ja: "製品",ph: "/ˈprɑdʌkt/",eiken: 2,pos: "名詞"},
      {en: "professor",ja: "教授",ph: "/prəˈfɛsər/",eiken: 2,pos: "名詞"},
      {en: "prompt",ja: "迅速な",ph: "/prɑmpt/",eiken: 1,pos: "形容詞"},
      {en: "pronounce",ja: "発音する",ph: "/prəˈnaʊns/",eiken: 2,pos: "動詞"},
      {en: "proof",ja: "証拠",ph: "/pruf/",eiken: 2,pos: "名詞"},
      {en: "proper",ja: "適切な",ph: "/ˈprɑpər/",eiken: 2,pos: "形容詞"},
      {en: "property",ja: "財産",ph: "/ˈprɑpərti/",eiken: "p1",pos: "名詞"},
      {en: "prosper",ja: "繁栄する",ph: "/ˈprɑspər/",eiken: 1,pos: "動詞"},
      {en: "proverb",ja: "ことわざ",ph: "/ˈprɑvərb/",eiken: "p1",pos: "名詞"},
      {en: "proportion",ja: "割合",ph: "/prəˈpɔrʃən/",eiken: 1,pos: "名詞"},
    ]
  },
  {
    id: "pre2_prefix",
    theme: "pre- 接頭辞チェーン（前に）",
    words: [
      {en: "precaution",ja: "予防策",ph: "/prɪˈkɔʃən/",eiken: 1,pos: "名詞"},
      {en: "predecessor",ja: "前任者",ph: "/ˈprɛdəˌsɛsər/",eiken: 1,pos: "名詞"},
      {en: "pregnant",ja: "妊娠している",ph: "/ˈprɛɡnənt/",eiken: "p1",pos: "形容詞"},
      {en: "premium",ja: "割増金",ph: "/ˈprimiəm/",eiken: 1,pos: "名詞"},
      {en: "prescription",ja: "処方箋",ph: "/prɪˈskrɪpʃən/",eiken: "p1",pos: "名詞"},
      {en: "presence",ja: "存在",ph: "/ˈprɛzəns/",eiken: "p1",pos: "名詞"},
      {en: "president",ja: "大統領",ph: "/ˈprɛzɪdənt/",eiken: 3,pos: "名詞"},
      {en: "prescribe",ja: "処方する",ph: "/prɪˈskraɪb/",eiken: 1,pos: "動詞"},
      {en: "predominant",ja: "優勢な",ph: "/prɪˈdɑmənənt/",eiken: 1,pos: "形容詞"},
      {en: "prehistoric",ja: "先史時代の",ph: "/ˌprihɪˈstɔrɪk/",eiken: 1,pos: "形容詞"},
    ]
  },
  {
    id: "ic2_suffix",
    theme: "-ic 接尾辞チェーン（2）",
    words: [
      {en: "athletic",ja: "運動の",ph: "/æθˈlɛtɪk/",eiken: "p1",pos: "形容詞"},
      {en: "artistic",ja: "芸術的な",ph: "/ɑrˈtɪstɪk/",eiken: "p1",pos: "形容詞"},
      {en: "historic",ja: "歴史的に重要な",ph: "/hɪˈstɔrɪk/",eiken: 2,pos: "形容詞"},
      {en: "heroic",ja: "英雄的な",ph: "/hɪˈroʊɪk/",eiken: 1,pos: "形容詞"},
      {en: "energetic",ja: "精力的な",ph: "/ˌɛnərˈdʒɛtɪk/",eiken: 2,pos: "形容詞"},
      {en: "sympathetic",ja: "同情的な",ph: "/ˌsɪmpəˈθɛtɪk/",eiken: "p1",pos: "形容詞"},
      {en: "democratic",ja: "民主的な",ph: "/ˌdɛməˈkrætɪk/",eiken: "p1",pos: "形容詞"},
      {en: "domestic",ja: "国内の",ph: "/dəˈmɛstɪk/",eiken: "p1",pos: "形容詞"},
      {en: "fantastic",ja: "すばらしい",ph: "/fænˈtæstɪk/",eiken: 3,pos: "形容詞"},
      {en: "gigantic",ja: "巨大な",ph: "/dʒaɪˈɡæntɪk/",eiken: "p1",pos: "形容詞"},
      {en: "romantic",ja: "ロマンチックな",ph: "/roʊˈmæntɪk/",eiken: 2,pos: "形容詞"},
      {en: "rhythmic",ja: "リズミカルな",ph: "/ˈrɪðmɪk/",eiken: 1,pos: "形容詞"},
      {en: "systematic",ja: "体系的な",ph: "/ˌsɪstəˈmætɪk/",eiken: 1,pos: "形容詞"},
      {en: "strategic",ja: "戦略的な",ph: "/strəˈtidʒɪk/",eiken: 1,pos: "形容詞"},
      {en: "authentic",ja: "本物の",ph: "/ɔˈθɛntɪk/",eiken: 1,pos: "形容詞"},
      {en: "chronic",ja: "慢性の",ph: "/ˈkrɑnɪk/",eiken: 1,pos: "形容詞"},
    ]
  },
  {
    id: "spect_root",
    theme: "-spect 語根チェーン",
    words: [
      {en: "inspect",ja: "検査する",ph: "/ɪnˈspekt/",eiken: 3,pos: "動詞"},
      {en: "respect",ja: "尊敬する",ph: "/rɪˈspekt/",eiken: 3,pos: "動詞"},
      {en: "suspect",ja: "疑う",ph: "/səˈspekt/",eiken: 2,pos: "動詞"},
      {en: "aspect",ja: "側面",ph: "/ˈæspekt/",eiken: 2,pos: "名詞"},
      {en: "introspect",ja: "内省する",ph: "/ˌɪntrəˈspekt/",eiken: 1,pos: "動詞"},
      {en: "retrospect",ja: "回顧",ph: "/ˈretrəspekt/",eiken: 1,pos: "名詞"},
      {en: "disrespect",ja: "無礼",ph: "/ˌdɪsrɪˈspekt/",eiken: "p2",pos: "名詞"},
    ]
  },
  {
    id: "port_root",
    theme: "-port 語根チェーン",
    words: [
      {en: "report",ja: "報告する",ph: "/rɪˈpɔːrt/",eiken: 3,pos: "動詞"},
      {en: "support",ja: "支える",ph: "/səˈpɔːrt/",eiken: 3,pos: "動詞"},
      {en: "deport",ja: "国外追放する",ph: "/dɪˈpɔːrt/",eiken: "p1",pos: "動詞"},
      {en: "seaport",ja: "港町",ph: "/ˈsiːpɔːrt/",eiken: 2,pos: "名詞"},
      {en: "purport",ja: "〜と称する",ph: "/pərˈpɔːrt/",eiken: 1,pos: "動詞"},
      {en: "rapport",ja: "信頼関係",ph: "/ræˈpɔːr/",eiken: 1,pos: "名詞"},
    ]
  },
  {
    id: "dict_root",
    theme: "-dict 語根チェーン",
    words: [
      {en: "contradict",ja: "矛盾する",ph: "/ˌkɑːntrəˈdɪkt/",eiken: "p1",pos: "動詞"},
      {en: "verdict",ja: "評決",ph: "/ˈvɜːrdɪkt/",eiken: "p1",pos: "名詞"},
      {en: "addict",ja: "中毒者",ph: "/ˈædɪkt/",eiken: "p1",pos: "名詞"},
      {en: "edict",ja: "布告",ph: "/ˈiːdɪkt/",eiken: 1,pos: "名詞"},
      {en: "interdict",ja: "禁止する",ph: "/ˌɪntərˈdɪkt/",eiken: 1,pos: "動詞"},
    ]
  },
  {
    id: "duce_root",
    theme: "-duce 語根チェーン",
    words: [
      {en: "reduce",ja: "減らす",ph: "/rɪˈduːs/",eiken: 3,pos: "動詞"},
      {en: "introduce",ja: "紹介する",ph: "/ˌɪntrəˈduːs/",eiken: 4,pos: "動詞"},
      {en: "induce",ja: "誘発する",ph: "/ɪnˈduːs/",eiken: "p1",pos: "動詞"},
      {en: "deduce",ja: "推論する",ph: "/dɪˈduːs/",eiken: "p1",pos: "動詞"},
      {en: "seduce",ja: "誘惑する",ph: "/sɪˈduːs/",eiken: 1,pos: "動詞"},
      {en: "reproduce",ja: "再生する",ph: "/ˌriːprəˈduːs/",eiken: 2,pos: "動詞"},
      {en: "adduce",ja: "証拠として挙げる",ph: "/əˈduːs/",eiken: 1,pos: "動詞"},
    ]
  },
  {
    id: "duct_root",
    theme: "-duct 語根チェーン",
    words: [
      {en: "abduct",ja: "誘拐する",ph: "/æbˈdʌkt/",eiken: 1,pos: "動詞"},
      {en: "induct",ja: "就任させる",ph: "/ɪnˈdʌkt/",eiken: 1,pos: "動詞"},
      {en: "aqueduct",ja: "水道橋",ph: "/ˈækwɪdʌkt/",eiken: 1,pos: "名詞"},
      {en: "viaduct",ja: "高架橋",ph: "/ˈvaɪədʌkt/",eiken: 1,pos: "名詞"},
      {en: "byproduct",ja: "副産物",ph: "/ˈbaɪprɑːdʌkt/",eiken: "p1",pos: "名詞"},
    ]
  },
  {
    id: "struct_root",
    theme: "-struct 語根チェーン",
    words: [
      {en: "instruct",ja: "指示する",ph: "/ɪnˈstrʌkt/",eiken: 2,pos: "動詞"},
      {en: "obstruct",ja: "妨げる",ph: "/əbˈstrʌkt/",eiken: "p1",pos: "動詞"},
      {en: "reconstruct",ja: "再建する",ph: "/ˌriːkənˈstrʌkt/",eiken: "p1",pos: "動詞"},
      {en: "deconstruct",ja: "解体する",ph: "/ˌdiːkənˈstrʌkt/",eiken: 1,pos: "動詞"},
      {en: "destruct",ja: "自爆する",ph: "/dɪˈstrʌkt/",eiken: 1,pos: "動詞"},
    ]
  },
  {
    id: "ject_root",
    theme: "-ject 語根チェーン",
    words: [
      {en: "object",ja: "物体",ph: "/ˈɑːbdʒɪkt/",eiken: 3,pos: "名詞"},
      {en: "reject",ja: "拒否する",ph: "/rɪˈdʒekt/",eiken: 2,pos: "動詞"},
      {en: "inject",ja: "注射する",ph: "/ɪnˈdʒekt/",eiken: "p1",pos: "動詞"},
      {en: "eject",ja: "追い出す",ph: "/ɪˈdʒekt/",eiken: 1,pos: "動詞"},
      {en: "interject",ja: "口をはさむ",ph: "/ˌɪntərˈdʒekt/",eiken: 1,pos: "動詞"},
      {en: "abject",ja: "みじめな",ph: "/ˈæbdʒekt/",eiken: 1,pos: "形容詞"},
    ]
  },
  {
    id: "mit_root",
    theme: "-mit 語根チェーン",
    words: [
      {en: "admit",ja: "認める",ph: "/ədˈmɪt/",eiken: 2,pos: "動詞"},
      {en: "permit",ja: "許可する",ph: "/pərˈmɪt/",eiken: 2,pos: "動詞"},
      {en: "omit",ja: "省く",ph: "/oʊˈmɪt/",eiken: "p1",pos: "動詞"},
      {en: "remit",ja: "送金する",ph: "/rɪˈmɪt/",eiken: 1,pos: "動詞"},
      {en: "summit",ja: "頂上",ph: "/ˈsʌmɪt/",eiken: 2,pos: "名詞"},
      {en: "limit",ja: "制限",ph: "/ˈlɪmɪt/",eiken: 3,pos: "名詞"},
      {en: "hermit",ja: "隠者",ph: "/ˈhɜːrmɪt/",eiken: 1,pos: "名詞"},
    ]
  },
  {
    id: "scribe_root",
    theme: "-scribe 語根チェーン",
    words: [
      {en: "inscribe",ja: "刻む",ph: "/ɪnˈskraɪb/",eiken: 1,pos: "動詞"},
      {en: "transcribe",ja: "書き写す",ph: "/trænˈskraɪb/",eiken: 1,pos: "動詞"},
      {en: "ascribe",ja: "〜のせいにする",ph: "/əˈskraɪb/",eiken: 1,pos: "動詞"},
      {en: "circumscribe",ja: "制限する",ph: "/ˈsɜːrkəmskraɪb/",eiken: 1,pos: "動詞"},
    ]
  },
  {
    id: "script_root",
    theme: "-script 語根チェーン",
    words: [
      {en: "manuscript",ja: "原稿",ph: "/ˈmænjuskrɪpt/",eiken: "p1",pos: "名詞"},
      {en: "transcript",ja: "成績証明書",ph: "/ˈtrænskrɪpt/",eiken: "p1",pos: "名詞"},
      {en: "postscript",ja: "追伸",ph: "/ˈpoʊstskrɪpt/",eiken: 2,pos: "名詞"},
      {en: "conscript",ja: "徴集兵",ph: "/ˈkɑːnskrɪpt/",eiken: 1,pos: "名詞"},
      {en: "nondescript",ja: "特徴のない",ph: "/ˌnɑːndɪˈskrɪpt/",eiken: 1,pos: "形容詞"},
      {en: "subscript",ja: "下付き文字",ph: "/ˈsʌbskrɪpt/",eiken: 1,pos: "名詞"},
      {en: "superscript",ja: "上付き文字",ph: "/ˈsuːpərskrɪpt/",eiken: 1,pos: "名詞"},
    ]
  },
  {
    id: "vert_root",
    theme: "-vert 語根チェーン",
    words: [
      {en: "divert",ja: "そらす",ph: "/daɪˈvɜːrt/",eiken: "p1",pos: "動詞"},
      {en: "invert",ja: "逆さにする",ph: "/ɪnˈvɜːrt/",eiken: 1,pos: "動詞"},
      {en: "revert",ja: "戻る",ph: "/rɪˈvɜːrt/",eiken: 1,pos: "動詞"},
      {en: "subvert",ja: "覆す",ph: "/səbˈvɜːrt/",eiken: 1,pos: "動詞"},
      {en: "avert",ja: "避ける",ph: "/əˈvɜːrt/",eiken: 1,pos: "動詞"},
      {en: "introvert",ja: "内向的な人",ph: "/ˈɪntrəvɜːrt/",eiken: "p1",pos: "名詞"},
      {en: "extrovert",ja: "外向的な人",ph: "/ˈekstrəvɜːrt/",eiken: "p1",pos: "名詞"},
    ]
  },
  {
    id: "verse_root",
    theme: "-verse 語根チェーン",
    words: [
      {en: "universe",ja: "宇宙",ph: "/ˈjuːnɪvɜːrs/",eiken: 2,pos: "名詞"},
      {en: "reverse",ja: "逆にする",ph: "/rɪˈvɜːrs/",eiken: 2,pos: "動詞"},
      {en: "diverse",ja: "多様な",ph: "/daɪˈvɜːrs/",eiken: "p1",pos: "形容詞"},
      {en: "adverse",ja: "不利な",ph: "/ədˈvɜːrs/",eiken: 1,pos: "形容詞"},
      {en: "converse",ja: "会話する",ph: "/kənˈvɜːrs/",eiken: 1,pos: "動詞"},
      {en: "inverse",ja: "逆の",ph: "/ˌɪnˈvɜːrs/",eiken: 1,pos: "形容詞"},
      {en: "traverse",ja: "横断する",ph: "/trəˈvɜːrs/",eiken: 1,pos: "動詞"},
      {en: "averse",ja: "嫌って",ph: "/əˈvɜːrs/",eiken: 1,pos: "形容詞"},
    ]
  },
  {
    id: "pose_root",
    theme: "-pose 語根チェーン",
    words: [
      {en: "purpose",ja: "目的",ph: "/ˈpɜːrpəs/",eiken: 3,pos: "名詞"},
      {en: "oppose",ja: "反対する",ph: "/əˈpoʊz/",eiken: 2,pos: "動詞"},
      {en: "dispose",ja: "処分する",ph: "/dɪˈspoʊz/",eiken: 1,pos: "動詞"},
      {en: "transpose",ja: "置き換える",ph: "/trænsˈpoʊz/",eiken: 1,pos: "動詞"},
      {en: "depose",ja: "退位させる",ph: "/dɪˈpoʊz/",eiken: 1,pos: "動詞"},
      {en: "repose",ja: "休息",ph: "/rɪˈpoʊz/",eiken: 1,pos: "名詞"},
      {en: "decompose",ja: "分解する",ph: "/ˌdiːkəmˈpoʊz/",eiken: 1,pos: "動詞"},
    ]
  },
  {
    id: "ceive_root",
    theme: "-ceive 語根チェーン",
    words: [
      {en: "receive",ja: "受け取る",ph: "/rɪˈsiːv/",eiken: 3,pos: "動詞"},
      {en: "perceive",ja: "知覚する",ph: "/pərˈsiːv/",eiken: "p1",pos: "動詞"},
      {en: "conceive",ja: "思いつく",ph: "/kənˈsiːv/",eiken: 1,pos: "動詞"},
      {en: "misconceive",ja: "誤解する",ph: "/ˌmɪskənˈsiːv/",eiken: 1,pos: "動詞"},
      {en: "preconceive",ja: "予想する",ph: "/ˌpriːkənˈsiːv/",eiken: 1,pos: "動詞"},
    ]
  },
  {
    id: "cept_root",
    theme: "-cept 語根チェーン",
    words: [
      {en: "accept",ja: "受け入れる",ph: "/əkˈsept/",eiken: 3,pos: "動詞"},
      {en: "except",ja: "〜を除いて",ph: "/ɪkˈsept/",eiken: 3,pos: "前置詞"},
      {en: "concept",ja: "概念",ph: "/ˈkɑːnsept/",eiken: "p1",pos: "名詞"},
      {en: "intercept",ja: "横取りする",ph: "/ˌɪntərˈsept/",eiken: 1,pos: "動詞"},
      {en: "precept",ja: "教訓",ph: "/ˈpriːsept/",eiken: 1,pos: "名詞"},
      {en: "percept",ja: "知覚対象",ph: "/ˈpɜːrsept/",eiken: 1,pos: "名詞"},
    ]
  },
  {
    id: "tain_root",
    theme: "-tain 語根チェーン",
    words: [
      {en: "maintain",ja: "維持する",ph: "/meɪnˈteɪn/",eiken: 2,pos: "動詞"},
      {en: "retain",ja: "保持する",ph: "/rɪˈteɪn/",eiken: "p1",pos: "動詞"},
      {en: "detain",ja: "拘留する",ph: "/dɪˈteɪn/",eiken: 1,pos: "動詞"},
      {en: "attain",ja: "達成する",ph: "/əˈteɪn/",eiken: 1,pos: "動詞"},
      {en: "abstain",ja: "控える",ph: "/əbˈsteɪn/",eiken: 1,pos: "動詞"},
      {en: "pertain",ja: "関係する",ph: "/pərˈteɪn/",eiken: 1,pos: "動詞"},
      {en: "certain",ja: "確かな",ph: "/ˈsɜːrtn/",eiken: 3,pos: "形容詞"},
      {en: "captain",ja: "船長",ph: "/ˈkæptɪn/",eiken: 4,pos: "名詞"},
      {en: "mountain",ja: "山",ph: "/ˈmaʊntn/",eiken: 5,pos: "名詞"},
      {en: "fountain",ja: "噴水",ph: "/ˈfaʊntn/",eiken: 3,pos: "名詞"},
      {en: "curtain",ja: "カーテン",ph: "/ˈkɜːrtn/",eiken: 4,pos: "名詞"},
    ]
  },
  {
    id: "sist_root",
    theme: "-sist 語根チェーン",
    words: [
      {en: "resist",ja: "抵抗する",ph: "/rɪˈzɪst/",eiken: 2,pos: "動詞"},
      {en: "assist",ja: "手伝う",ph: "/əˈsɪst/",eiken: "p2",pos: "動詞"},
      {en: "persist",ja: "固執する",ph: "/pərˈsɪst/",eiken: "p1",pos: "動詞"},
      {en: "subsist",ja: "生きていく",ph: "/səbˈsɪst/",eiken: 1,pos: "動詞"},
      {en: "desist",ja: "やめる",ph: "/dɪˈzɪst/",eiken: 1,pos: "動詞"},
    ]
  },
  {
    id: "fer_root",
    theme: "-fer 語根チェーン",
    words: [
      {en: "offer",ja: "申し出る",ph: "/ˈɔːfər/",eiken: 3,pos: "動詞"},
      {en: "refer",ja: "参照する",ph: "/rɪˈfɜːr/",eiken: 2,pos: "動詞"},
      {en: "differ",ja: "異なる",ph: "/ˈdɪfər/",eiken: "p1",pos: "動詞"},
      {en: "suffer",ja: "苦しむ",ph: "/ˈsʌfər/",eiken: 2,pos: "動詞"},
      {en: "infer",ja: "推測する",ph: "/ɪnˈfɜːr/",eiken: 1,pos: "動詞"},
      {en: "confer",ja: "協議する",ph: "/kənˈfɜːr/",eiken: 1,pos: "動詞"},
      {en: "defer",ja: "延期する",ph: "/dɪˈfɜːr/",eiken: 1,pos: "動詞"},
      {en: "buffer",ja: "緩衝材",ph: "/ˈbʌfər/",eiken: 1,pos: "名詞"},
    ]
  },
  {
    id: "form_root",
    theme: "-form 語根チェーン",
    words: [
      {en: "perform",ja: "演じる",ph: "/pərˈfɔːrm/",eiken: 3,pos: "動詞"},
      {en: "reform",ja: "改革する",ph: "/rɪˈfɔːrm/",eiken: 2,pos: "動詞"},
      {en: "conform",ja: "従う",ph: "/kənˈfɔːrm/",eiken: 1,pos: "動詞"},
      {en: "uniform",ja: "制服",ph: "/ˈjuːnɪfɔːrm/",eiken: 3,pos: "名詞"},
      {en: "platform",ja: "ホーム",ph: "/ˈplætfɔːrm/",eiken: 3,pos: "名詞"},
      {en: "deform",ja: "変形させる",ph: "/dɪˈfɔːrm/",eiken: 1,pos: "動詞"},
    ]
  },
  {
    id: "cede_root",
    theme: "-cede 語根チェーン",
    words: [
      {en: "recede",ja: "後退する",ph: "/rɪˈsiːd/",eiken: 1,pos: "動詞"},
      {en: "concede",ja: "認める",ph: "/kənˈsiːd/",eiken: 1,pos: "動詞"},
      {en: "secede",ja: "脱退する",ph: "/sɪˈsiːd/",eiken: 1,pos: "動詞"},
      {en: "intercede",ja: "仲裁する",ph: "/ˌɪntərˈsiːd/",eiken: 1,pos: "動詞"},
      {en: "accede",ja: "同意する",ph: "/əkˈsiːd/",eiken: 1,pos: "動詞"},
    ]
  },
  {
    id: "vent_root",
    theme: "-vent 語根チェーン",
    words: [
      {en: "invent",ja: "発明する",ph: "/ɪnˈvent/",eiken: 3,pos: "動詞"},
      {en: "convent",ja: "修道院",ph: "/ˈkɑːnvent/",eiken: 1,pos: "名詞"},
      {en: "advent",ja: "到来",ph: "/ˈædvent/",eiken: 1,pos: "名詞"},
      {en: "circumvent",ja: "回避する",ph: "/ˌsɜːrkəmˈvent/",eiken: 1,pos: "動詞"},
      {en: "solvent",ja: "溶剤",ph: "/ˈsɑːlvənt/",eiken: 1,pos: "名詞"},
    ]
  },
  {
    id: "vise_root",
    theme: "-vise 語根チェーン",
    words: [
      {en: "advise",ja: "助言する",ph: "/ədˈvaɪz/",eiken: 2,pos: "動詞"},
      {en: "revise",ja: "改訂する",ph: "/rɪˈvaɪz/",eiken: "p1",pos: "動詞"},
      {en: "devise",ja: "考案する",ph: "/dɪˈvaɪz/",eiken: 1,pos: "動詞"},
      {en: "improvise",ja: "即興でやる",ph: "/ˈɪmprəvaɪz/",eiken: 1,pos: "動詞"},
    ]
  },
  {
    id: "graph_root",
    theme: "-graph 語根チェーン",
    words: [
      {en: "paragraph",ja: "段落",ph: "/ˈpærəɡræf/",eiken: 2,pos: "名詞"},
      {en: "photograph",ja: "写真",ph: "/ˈfoʊtəɡræf/",eiken: 3,pos: "名詞"},
      {en: "monograph",ja: "専攻論文",ph: "/ˈmɑːnəɡræf/",eiken: 1,pos: "名詞"},
      {en: "seismograph",ja: "地震計",ph: "/ˈsaɪzməɡræf/",eiken: 1,pos: "名詞"},
      {en: "polygraph",ja: "うそ発見器",ph: "/ˈpɑːliɡræf/",eiken: 1,pos: "名詞"},
    ]
  },
  {
    id: "phone_root",
    theme: "-phone 語根チェーン",
    words: [
      {en: "smartphone",ja: "スマートフォン",ph: "/ˈsmɑːrtfoʊn/",eiken: 3,pos: "名詞"},
      {en: "headphone",ja: "ヘッドホン",ph: "/ˈhedfoʊn/",eiken: 3,pos: "名詞"},
      {en: "earphone",ja: "イヤホン",ph: "/ˈɪrfoʊn/",eiken: 3,pos: "名詞"},
      {en: "saxophone",ja: "サックス",ph: "/ˈsæksəfoʊn/",eiken: 2,pos: "名詞"},
      {en: "xylophone",ja: "木琴",ph: "/ˈzaɪləfoʊn/",eiken: 2,pos: "名詞"},
      {en: "megaphone",ja: "拡声器",ph: "/ˈmeɡəfoʊn/",eiken: 2,pos: "名詞"},
      {en: "homophone",ja: "同音異義語",ph: "/ˈhɑːməfoʊn/",eiken: 1,pos: "名詞"},
    ]
  },
  {
    id: "logy_root",
    theme: "-logy 語根チェーン",
    words: [
      {en: "biology",ja: "生物学",ph: "/baɪˈɑːlədʒi/",eiken: 2,pos: "名詞"},
      {en: "ecology",ja: "生態学",ph: "/iˈkɑːlədʒi/",eiken: "p1",pos: "名詞"},
      {en: "psychology",ja: "心理学",ph: "/saɪˈkɑːlədʒi/",eiken: "p1",pos: "名詞"},
      {en: "technology",ja: "技術",ph: "/tekˈnɑːlədʒi/",eiken: 3,pos: "名詞"},
      {en: "geology",ja: "地質学",ph: "/dʒiˈɑːlədʒi/",eiken: "p1",pos: "名詞"},
      {en: "apology",ja: "謝罪",ph: "/əˈpɑːlədʒi/",eiken: 2,pos: "名詞"},
      {en: "theology",ja: "神学",ph: "/θiˈɑːlədʒi/",eiken: 1,pos: "名詞"},
      {en: "sociology",ja: "社会学",ph: "/ˌsoʊsiˈɑːlədʒi/",eiken: "p1",pos: "名詞"},
      {en: "archaeology",ja: "考古学",ph: "/ˌɑːrkiˈɑːlədʒi/",eiken: "p1",pos: "名詞"},
      {en: "mythology",ja: "神話",ph: "/mɪˈθɑːlədʒi/",eiken: 1,pos: "名詞"},
      {en: "anthology",ja: "選集",ph: "/ænˈθɑːlədʒi/",eiken: 1,pos: "名詞"},
      {en: "ideology",ja: "イデオロギー",ph: "/ˌaɪdiˈɑːlədʒi/",eiken: 1,pos: "名詞"},
      {en: "chronology",ja: "年代順",ph: "/krəˈnɑːlədʒi/",eiken: 1,pos: "名詞"},
    ]
  },
  {
    id: "meter_root",
    theme: "-meter 語根チェーン",
    words: [
      {en: "thermometer",ja: "温度計",ph: "/θərˈmɑːmɪtər/",eiken: 2,pos: "名詞"},
      {en: "barometer",ja: "気圧計",ph: "/bəˈrɑːmɪtər/",eiken: 1,pos: "名詞"},
      {en: "speedometer",ja: "速度計",ph: "/spɪˈdɑːmɪtər/",eiken: 1,pos: "名詞"},
      {en: "diameter",ja: "直径",ph: "/daɪˈæmɪtər/",eiken: "p1",pos: "名詞"},
      {en: "perimeter",ja: "周囲",ph: "/pəˈrɪmɪtər/",eiken: 1,pos: "名詞"},
      {en: "kilometer",ja: "キロメートル",ph: "/kɪˈlɑːmɪtər/",eiken: 3,pos: "名詞"},
      {en: "centimeter",ja: "センチメートル",ph: "/ˈsentɪmiːtər/",eiken: 3,pos: "名詞"},
      {en: "millimeter",ja: "ミリメートル",ph: "/ˈmɪlɪmiːtər/",eiken: 2,pos: "名詞"},
      {en: "parameter",ja: "媒介変数",ph: "/pəˈræmɪtər/",eiken: 1,pos: "名詞"},
    ]
  },
  {
    id: "lude_root",
    theme: "-lude 語根チェーン",
    words: [
      {en: "prelude",ja: "前奏曲",ph: "/ˈpreljuːd/",eiken: 1,pos: "名詞"},
      {en: "interlude",ja: "合間",ph: "/ˈɪntərluːd/",eiken: 1,pos: "名詞"},
      {en: "allude",ja: "ほのめかす",ph: "/əˈluːd/",eiken: 1,pos: "動詞"},
      {en: "elude",ja: "逃れる",ph: "/ɪˈluːd/",eiken: 1,pos: "動詞"},
      {en: "delude",ja: "欺く",ph: "/dɪˈluːd/",eiken: 1,pos: "動詞"},
      {en: "collude",ja: "共謀する",ph: "/kəˈluːd/",eiken: 1,pos: "動詞"},
    ]
  },
  {
    id: "fuse_root",
    theme: "-fuse 語根チェーン",
    words: [
      {en: "refuse",ja: "断る",ph: "/rɪˈfjuːz/",eiken: 2,pos: "動詞"},
      {en: "diffuse",ja: "拡散する",ph: "/dɪˈfjuːz/",eiken: 1,pos: "動詞"},
      {en: "infuse",ja: "吹き込む",ph: "/ɪnˈfjuːz/",eiken: 1,pos: "動詞"},
      {en: "defuse",ja: "和らげる",ph: "/diːˈfjuːz/",eiken: 1,pos: "動詞"},
      {en: "suffuse",ja: "満たす",ph: "/səˈfjuːz/",eiken: 1,pos: "動詞"},
      {en: "profuse",ja: "豊富な",ph: "/prəˈfjuːs/",eiken: 1,pos: "形容詞"},
    ]
  },
  {
    id: "pel_root",
    theme: "-pel 語根チェーン",
    words: [
      {en: "expel",ja: "追放する",ph: "/ɪkˈspel/",eiken: 1,pos: "動詞"},
      {en: "repel",ja: "追い払う",ph: "/rɪˈpel/",eiken: 1,pos: "動詞"},
      {en: "dispel",ja: "払いのける",ph: "/dɪˈspel/",eiken: 1,pos: "動詞"},
      {en: "impel",ja: "駆り立てる",ph: "/ɪmˈpel/",eiken: 1,pos: "動詞"},
      {en: "chapel",ja: "礼拝堂",ph: "/ˈtʃæpl/",eiken: 2,pos: "名詞"},
      {en: "lapel",ja: "襟",ph: "/ləˈpel/",eiken: 1,pos: "名詞"},
      {en: "rappel",ja: "懸垂下降する",ph: "/ræˈpel/",eiken: 1,pos: "動詞"},
    ]
  },
  {
    id: "pend_root",
    theme: "-pend 語根チェーン",
    words: [
      {en: "append",ja: "付け加える",ph: "/əˈpend/",eiken: 1,pos: "動詞"},
      {en: "expend",ja: "費やす",ph: "/ɪkˈspend/",eiken: 1,pos: "動詞"},
      {en: "stipend",ja: "給付金",ph: "/ˈstaɪpend/",eiken: 1,pos: "名詞"},
      {en: "impend",ja: "差し迫る",ph: "/ɪmˈpend/",eiken: 1,pos: "動詞"},
    ]
  },
  {
    id: "rupt_root",
    theme: "-rupt 語根チェーン",
    words: [
      {en: "erupt",ja: "噴火する",ph: "/ɪˈrʌpt/",eiken: "p1",pos: "動詞"},
      {en: "corrupt",ja: "堕落した",ph: "/kəˈrʌpt/",eiken: "p1",pos: "形容詞"},
      {en: "abrupt",ja: "突然の",ph: "/əˈbrʌpt/",eiken: 1,pos: "形容詞"},
      {en: "disrupt",ja: "混乱させる",ph: "/dɪsˈrʌpt/",eiken: 1,pos: "動詞"},
      {en: "bankrupt",ja: "破産した",ph: "/ˈbæŋkrʌpt/",eiken: "p1",pos: "形容詞"},
    ]
  },
  {
    id: "ounce_root",
    theme: "-ounce ファミリー",
    words: [
      {en: "announce",ja: "発表する",ph: "/əˈnaʊns/",eiken: 2,pos: "動詞"},
      {en: "denounce",ja: "非難する",ph: "/dɪˈnaʊns/",eiken: 1,pos: "動詞"},
      {en: "renounce",ja: "放棄する",ph: "/rɪˈnaʊns/",eiken: 1,pos: "動詞"},
      {en: "bounce",ja: "弾む",ph: "/baʊns/",eiken: 2,pos: "動詞"},
      {en: "pounce",ja: "飛びかかる",ph: "/paʊns/",eiken: 1,pos: "動詞"},
    ]
  },
  {
    id: "late_root",
    theme: "-late チェーン",
    words: [
      {en: "relate",ja: "関係させる",ph: "/rɪˈleɪt/",eiken: 2,pos: "動詞"},
      {en: "chocolate",ja: "チョコレート",ph: "/ˈtʃɑːklət/",eiken: 5,pos: "名詞"},
      {en: "calculate",ja: "計算する",ph: "/ˈkælkjuleɪt/",eiken: 2,pos: "動詞"},
      {en: "isolate",ja: "孤立させる",ph: "/ˈaɪsəleɪt/",eiken: "p1",pos: "動詞"},
      {en: "regulate",ja: "規制する",ph: "/ˈreɡjuleɪt/",eiken: "p1",pos: "動詞"},
      {en: "stimulate",ja: "刺激する",ph: "/ˈstɪmjuleɪt/",eiken: "p1",pos: "動詞"},
      {en: "accumulate",ja: "蓄積する",ph: "/əˈkjuːmjəleɪt/",eiken: "p1",pos: "動詞"},
      {en: "violate",ja: "違反する",ph: "/ˈvaɪəleɪt/",eiken: "p1",pos: "動詞"},
      {en: "formulate",ja: "策定する",ph: "/ˈfɔːrmjuleɪt/",eiken: 1,pos: "動詞"},
      {en: "speculate",ja: "推測する",ph: "/ˈspekjuleɪt/",eiken: 1,pos: "動詞"},
      {en: "simulate",ja: "模擬実験する",ph: "/ˈsɪmjuleɪt/",eiken: 1,pos: "動詞"},
      {en: "circulate",ja: "循環する",ph: "/ˈsɜːrkjəleɪt/",eiken: "p1",pos: "動詞"},
    ]
  },
  {
    id: "ply_root",
    theme: "-ply 語根チェーン",
    words: [
      {en: "apply",ja: "申し込む",ph: "/əˈplaɪ/",eiken: 2,pos: "動詞"},
      {en: "reply",ja: "返事する",ph: "/rɪˈplaɪ/",eiken: 3,pos: "動詞"},
      {en: "supply",ja: "供給する",ph: "/səˈplaɪ/",eiken: 2,pos: "動詞"},
      {en: "imply",ja: "ほのめかす",ph: "/ɪmˈplaɪ/",eiken: "p1",pos: "動詞"},
      {en: "comply",ja: "従う",ph: "/kəmˈplaɪ/",eiken: 1,pos: "動詞"},
    ]
  },
  {
    id: "cide_root",
    theme: "-cide 語根チェーン",
    words: [
      {en: "pesticide",ja: "殺虫剤",ph: "/ˈpestɪsaɪd/",eiken: 1,pos: "名詞"},
      {en: "herbicide",ja: "除草剤",ph: "/ˈhɜːrbɪsaɪd/",eiken: 1,pos: "名詞"},
      {en: "insecticide",ja: "殺虫剤",ph: "/ɪnˈsektɪsaɪd/",eiken: 1,pos: "名詞"},
      {en: "germicide",ja: "殺菌剤",ph: "/ˈdʒɜːrmɪsaɪd/",eiken: 1,pos: "名詞"},
    ]
  },
  {
    id: "scope_root",
    theme: "-scope 語根チェーン",
    words: [
      {en: "horoscope",ja: "星占い",ph: "/ˈhɔːrəskoʊp/",eiken: 1,pos: "名詞"},
      {en: "periscope",ja: "潜望鏡",ph: "/ˈperɪskoʊp/",eiken: 1,pos: "名詞"},
      {en: "kaleidoscope",ja: "万華鏡",ph: "/kəˈlaɪdəskoʊp/",eiken: 1,pos: "名詞"},
      {en: "stethoscope",ja: "聴診器",ph: "/ˈsteθəskoʊp/",eiken: 1,pos: "名詞"},
    ]
  },
  {
    id: "cracy_root",
    theme: "-cracy 語根チェーン",
    words: [
      {en: "democracy",ja: "民主主義",ph: "/dɪˈmɑːkrəsi/",eiken: "p2",pos: "名詞"},
      {en: "bureaucracy",ja: "官僚制",ph: "/bjʊˈrɑːkrəsi/",eiken: 1,pos: "名詞"},
      {en: "aristocracy",ja: "貴族",ph: "/ˌærɪˈstɑːkrəsi/",eiken: 1,pos: "名詞"},
      {en: "autocracy",ja: "独裁政治",ph: "/ɔːˈtɑːkrəsi/",eiken: 1,pos: "名詞"},
      {en: "theocracy",ja: "神権政治",ph: "/θiˈɑːkrəsi/",eiken: 1,pos: "名詞"},
      {en: "meritocracy",ja: "実力主義社会",ph: "/ˌmerɪˈtɑːkrəsi/",eiken: 1,pos: "名詞"},
    ]
  },
  {
    id: "gram_root",
    theme: "-gram 語根チェーン",
    words: [
      {en: "diagram",ja: "図",ph: "/ˈdaɪəɡræm/",eiken: "p1",pos: "名詞"},
      {en: "kilogram",ja: "キログラム",ph: "/ˈkɪləɡræm/",eiken: 3,pos: "名詞"},
      {en: "hologram",ja: "ホログラム",ph: "/ˈhɑːləɡræm/",eiken: 1,pos: "名詞"},
      {en: "anagram",ja: "アナグラム",ph: "/ˈænəɡræm/",eiken: 1,pos: "名詞"},
      {en: "monogram",ja: "モノグラム",ph: "/ˈmɑːnəɡræm/",eiken: 1,pos: "名詞"},
      {en: "milligram",ja: "ミリグラム",ph: "/ˈmɪlɪɡræm/",eiken: 2,pos: "名詞"},
    ]
  },
  {
    id: "sphere_root",
    theme: "-sphere 語根チェーン",
    words: [
      {en: "atmosphere",ja: "大気",ph: "/ˈætməsfɪr/",eiken: 2,pos: "名詞"},
      {en: "hemisphere",ja: "半球",ph: "/ˈhemɪsfɪr/",eiken: "p1",pos: "名詞"},
      {en: "biosphere",ja: "生物圏",ph: "/ˈbaɪoʊsfɪr/",eiken: 1,pos: "名詞"},
      {en: "stratosphere",ja: "成層圏",ph: "/ˈstrætəsfɪr/",eiken: 1,pos: "名詞"},
      {en: "troposphere",ja: "対流圏",ph: "/ˈtroʊpəsfɪr/",eiken: 1,pos: "名詞"},
      {en: "ionosphere",ja: "電離層",ph: "/aɪˈɑːnəsfɪr/",eiken: 1,pos: "名詞"},
    ]
  },
  {
    id: "pire_root",
    theme: "-pire チェーン",
    words: [
      {en: "expire",ja: "期限が切れる",ph: "/ɪkˈspaɪər/",eiken: "p1",pos: "動詞"},
      {en: "vampire",ja: "吸血鬼",ph: "/ˈvæmpaɪər/",eiken: 2,pos: "名詞"},
      {en: "aspire",ja: "熱望する",ph: "/əˈspaɪər/",eiken: 1,pos: "動詞"},
      {en: "conspire",ja: "共謀する",ph: "/kənˈspaɪər/",eiken: 1,pos: "動詞"},
      {en: "perspire",ja: "汗をかく",ph: "/pərˈspaɪər/",eiken: 1,pos: "動詞"},
    ]
  },
  {
    id: "tude_root",
    theme: "-tude 語根チェーン",
    words: [
      {en: "attitude",ja: "態度",ph: "/ˈætɪtuːd/",eiken: "p2",pos: "名詞"},
      {en: "altitude",ja: "高度",ph: "/ˈæltɪtuːd/",eiken: "p1",pos: "名詞"},
      {en: "latitude",ja: "緯度",ph: "/ˈlætɪtuːd/",eiken: "p1",pos: "名詞"},
      {en: "longitude",ja: "経度",ph: "/ˈlɑːndʒɪtuːd/",eiken: "p1",pos: "名詞"},
      {en: "magnitude",ja: "規模",ph: "/ˈmæɡnɪtuːd/",eiken: 1,pos: "名詞"},
      {en: "solitude",ja: "孤独",ph: "/ˈsɑːlətuːd/",eiken: 1,pos: "名詞"},
      {en: "gratitude",ja: "感謝",ph: "/ˈɡrætɪtuːd/",eiken: "p1",pos: "名詞"},
      {en: "aptitude",ja: "適性",ph: "/ˈæptɪtuːd/",eiken: 1,pos: "名詞"},
    ]
  },
  {
    id: "cycle_root",
    theme: "-cycle チェーン",
    words: [
      {en: "bicycle",ja: "自転車",ph: "/ˈbaɪsɪkl/",eiken: 4,pos: "名詞"},
      {en: "recycle",ja: "リサイクルする",ph: "/ˌriːˈsaɪkl/",eiken: 3,pos: "動詞"},
      {en: "motorcycle",ja: "オートバイ",ph: "/ˈmoʊtərsaɪkl/",eiken: 3,pos: "名詞"},
      {en: "tricycle",ja: "三輪車",ph: "/ˈtraɪsɪkl/",eiken: 2,pos: "名詞"},
      {en: "unicycle",ja: "一輪車",ph: "/ˈjuːnɪsaɪkl/",eiken: 2,pos: "名詞"},
      {en: "lifecycle",ja: "ライフサイクル",ph: "/ˈlaɪfsaɪkl/",eiken: 1,pos: "名詞"},
    ]
  },
  {
    id: "fect_root",
    theme: "-fect 語根チェーン",
    words: [
      {en: "perfect",ja: "完璧な",ph: "/ˈpɜːrfɪkt/",eiken: 3,pos: "形容詞"},
      {en: "effect",ja: "効果",ph: "/ɪˈfekt/",eiken: 2,pos: "名詞"},
      {en: "affect",ja: "影響する",ph: "/əˈfekt/",eiken: 2,pos: "動詞"},
      {en: "infect",ja: "感染させる",ph: "/ɪnˈfekt/",eiken: "p1",pos: "動詞"},
      {en: "defect",ja: "欠陥",ph: "/ˈdiːfekt/",eiken: 1,pos: "名詞"},
      {en: "disinfect",ja: "消毒する",ph: "/ˌdɪsɪnˈfekt/",eiken: 1,pos: "動詞"},
    ]
  },
  {
    id: "lect_root",
    theme: "-lect 語根チェーン",
    words: [
      {en: "select",ja: "選ぶ",ph: "/sɪˈlekt/",eiken: "p2",pos: "動詞"},
      {en: "collect",ja: "集める",ph: "/kəˈlekt/",eiken: 3,pos: "動詞"},
      {en: "elect",ja: "選出する",ph: "/ɪˈlekt/",eiken: "p1",pos: "動詞"},
      {en: "neglect",ja: "怠る",ph: "/nɪˈɡlekt/",eiken: "p1",pos: "動詞"},
      {en: "reflect",ja: "反射する",ph: "/rɪˈflekt/",eiken: 2,pos: "動詞"},
      {en: "intellect",ja: "知性",ph: "/ˈɪntəlekt/",eiken: 1,pos: "名詞"},
      {en: "dialect",ja: "方言",ph: "/ˈdaɪəlekt/",eiken: 1,pos: "名詞"},
      {en: "recollect",ja: "思い出す",ph: "/ˌrekəˈlekt/",eiken: 1,pos: "動詞"},
    ]
  },
  {
    id: "gate_root",
    theme: "-gate チェーン",
    words: [
      {en: "navigate",ja: "航行する",ph: "/ˈnævɪɡeɪt/",eiken: 1,pos: "動詞"},
      {en: "investigate",ja: "調査する",ph: "/ɪnˈvestɪɡeɪt/",eiken: "p1",pos: "動詞"},
      {en: "delegate",ja: "代表",ph: "/ˈdelɪɡət/",eiken: 1,pos: "名詞"},
      {en: "irrigate",ja: "灌漑する",ph: "/ˈɪrɪɡeɪt/",eiken: 1,pos: "動詞"},
      {en: "mitigate",ja: "和らげる",ph: "/ˈmɪtɪɡeɪt/",eiken: 1,pos: "動詞"},
      {en: "aggregate",ja: "総計",ph: "/ˈæɡrɪɡət/",eiken: 1,pos: "名詞"},
      {en: "propagate",ja: "繁殖させる",ph: "/ˈprɑːpəɡeɪt/",eiken: 1,pos: "動詞"},
    ]
  },
  {
    id: "dent_root",
    theme: "-dent チェーン",
    words: [
      {en: "accident",ja: "事故",ph: "/ˈæksɪdənt/",eiken: 3,pos: "名詞"},
      {en: "incident",ja: "出来事",ph: "/ˈɪnsɪdənt/",eiken: "p1",pos: "名詞"},
      {en: "resident",ja: "住民",ph: "/ˈrezɪdənt/",eiken: "p1",pos: "名詞"},
      {en: "precedent",ja: "前例",ph: "/ˈpresɪdənt/",eiken: 1,pos: "名詞"},
    ]
  },
  {
    id: "cess_root",
    theme: "-cess チェーン",
    words: [
      {en: "access",ja: "接近",ph: "/ˈækses/",eiken: "p1",pos: "名詞"},
      {en: "success",ja: "成功",ph: "/səkˈses/",eiken: 3,pos: "名詞"},
      {en: "excess",ja: "超過",ph: "/ɪkˈses/",eiken: 1,pos: "名詞"},
      {en: "recess",ja: "休憩",ph: "/rɪˈses/",eiken: 1,pos: "名詞"},
      {en: "princess",ja: "王女",ph: "/ˈprɪnses/",eiken: 4,pos: "名詞"},
    ]
  },
  {
    id: "some_compound",
    theme: "some- チェーン",
    words: [
      {en: "something",ja: "何か",ph: "/ˈsʌmθɪŋ/",eiken: 5,pos: "代名詞"},
      {en: "somebody",ja: "誰か",ph: "/ˈsʌmbɑːdi/",eiken: 4,pos: "代名詞"},
      {en: "someone",ja: "誰か",ph: "/ˈsʌmwʌn/",eiken: 4,pos: "代名詞"},
      {en: "somewhere",ja: "どこかに",ph: "/ˈsʌmwer/",eiken: 4,pos: "副詞"},
      {en: "sometimes",ja: "時々",ph: "/ˈsʌmtaɪmz/",eiken: 5,pos: "副詞"},
      {en: "someday",ja: "いつか",ph: "/ˈsʌmdeɪ/",eiken: 4,pos: "副詞"},
      {en: "somehow",ja: "どうにかして",ph: "/ˈsʌmhaʊ/",eiken: 3,pos: "副詞"},
      {en: "somewhat",ja: "いくぶん",ph: "/ˈsʌmwʌt/",eiken: 2,pos: "副詞"},
    ]
  },
  {
    id: "every_compound",
    theme: "every- チェーン",
    words: [
      {en: "everything",ja: "すべて",ph: "/ˈevriθɪŋ/",eiken: 4,pos: "代名詞"},
      {en: "everyone",ja: "みんな",ph: "/ˈevriwʌn/",eiken: 4,pos: "代名詞"},
      {en: "everybody",ja: "みんな",ph: "/ˈevribɑːdi/",eiken: 4,pos: "代名詞"},
      {en: "everywhere",ja: "どこでも",ph: "/ˈevriwer/",eiken: 4,pos: "副詞"},
      {en: "everyplace",ja: "どこでも",ph: "/ˈevripleɪs/",eiken: 1,pos: "副詞"},
    ]
  },
  {
    id: "any_compound",
    theme: "any- チェーン",
    words: [
      {en: "anything",ja: "何か",ph: "/ˈeniθɪŋ/",eiken: 4,pos: "代名詞"},
      {en: "anyone",ja: "誰か",ph: "/ˈeniwʌn/",eiken: 4,pos: "代名詞"},
      {en: "anybody",ja: "誰か",ph: "/ˈenibɑːdi/",eiken: 4,pos: "代名詞"},
      {en: "anywhere",ja: "どこでも",ph: "/ˈeniwer/",eiken: 4,pos: "副詞"},
      {en: "anyway",ja: "とにかく",ph: "/ˈeniweɪ/",eiken: 3,pos: "副詞"},
      {en: "anymore",ja: "もはや",ph: "/ˌeniˈmɔːr/",eiken: 3,pos: "副詞"},
      {en: "anyhow",ja: "とにかく",ph: "/ˈenihaʊ/",eiken: 2,pos: "副詞"},
    ]
  },
  {
    id: "time_root",
    theme: "-time チェーン",
    words: [
      {en: "lunchtime",ja: "昼食時間",ph: "/ˈlʌntʃtaɪm/",eiken: 4,pos: "名詞"},
      {en: "daytime",ja: "昼間",ph: "/ˈdeɪtaɪm/",eiken: 3,pos: "名詞"},
      {en: "nighttime",ja: "夜間",ph: "/ˈnaɪttaɪm/",eiken: 3,pos: "名詞"},
      {en: "meantime",ja: "その間",ph: "/ˈmiːntaɪm/",eiken: "p1",pos: "名詞"},
      {en: "halftime",ja: "ハーフタイム",ph: "/ˈhæftaɪm/",eiken: 3,pos: "名詞"},
      {en: "summertime",ja: "夏季",ph: "/ˈsʌmərtaɪm/",eiken: 3,pos: "名詞"},
      {en: "wartime",ja: "戦時",ph: "/ˈwɔːrtaɪm/",eiken: 2,pos: "名詞"},
      {en: "springtime",ja: "春",ph: "/ˈsprɪŋtaɪm/",eiken: 3,pos: "名詞"},
      {en: "playtime",ja: "遊び時間",ph: "/ˈpleɪtaɪm/",eiken: 4,pos: "名詞"},
    ]
  },
  {
    id: "way_root",
    theme: "-way チェーン",
    words: [
      {en: "highway",ja: "幹線道路",ph: "/ˈhaɪweɪ/",eiken: 3,pos: "名詞"},
      {en: "railway",ja: "鉄道",ph: "/ˈreɪlweɪ/",eiken: 3,pos: "名詞"},
      {en: "hallway",ja: "廊下",ph: "/ˈhɔːlweɪ/",eiken: 3,pos: "名詞"},
      {en: "doorway",ja: "戸口",ph: "/ˈdɔːrweɪ/",eiken: 2,pos: "名詞"},
      {en: "runway",ja: "滑走路",ph: "/ˈrʌnweɪ/",eiken: 2,pos: "名詞"},
      {en: "driveway",ja: "私道",ph: "/ˈdraɪvweɪ/",eiken: 2,pos: "名詞"},
      {en: "gateway",ja: "入り口",ph: "/ˈɡeɪtweɪ/",eiken: "p1",pos: "名詞"},
      {en: "walkway",ja: "歩道",ph: "/ˈwɔːkweɪ/",eiken: 2,pos: "名詞"},
      {en: "freeway",ja: "高速道路",ph: "/ˈfriːweɪ/",eiken: 2,pos: "名詞"},
      {en: "pathway",ja: "小道",ph: "/ˈpæθweɪ/",eiken: "p1",pos: "名詞"},
      {en: "midway",ja: "中途で",ph: "/ˌmɪdˈweɪ/",eiken: 1,pos: "副詞"},
    ]
  },
  {
    id: "land_root",
    theme: "-land チェーン",
    words: [
      {en: "island",ja: "島",ph: "/ˈaɪlənd/",eiken: 3,pos: "名詞"},
      {en: "homeland",ja: "祖国",ph: "/ˈhoʊmlænd/",eiken: 2,pos: "名詞"},
      {en: "farmland",ja: "農地",ph: "/ˈfɑːrmlænd/",eiken: 2,pos: "名詞"},
      {en: "wonderland",ja: "不思議の国",ph: "/ˈwʌndərlænd/",eiken: 2,pos: "名詞"},
      {en: "mainland",ja: "本土",ph: "/ˈmeɪnlænd/",eiken: "p1",pos: "名詞"},
      {en: "highland",ja: "高地",ph: "/ˈhaɪlənd/",eiken: 2,pos: "名詞"},
      {en: "inland",ja: "内陸の",ph: "/ˈɪnlənd/",eiken: "p1",pos: "形容詞"},
      {en: "wetland",ja: "湿地",ph: "/ˈwetlænd/",eiken: "p1",pos: "名詞"},
      {en: "grassland",ja: "草原",ph: "/ˈɡræslænd/",eiken: 2,pos: "名詞"},
      {en: "wasteland",ja: "荒れ地",ph: "/ˈweɪstlænd/",eiken: 1,pos: "名詞"},
      {en: "woodland",ja: "森林地帯",ph: "/ˈwʊdlənd/",eiken: 1,pos: "名詞"},
      {en: "lowland",ja: "低地",ph: "/ˈloʊlənd/",eiken: 1,pos: "名詞"},
    ]
  },
  {
    id: "house_root",
    theme: "-house チェーン",
    words: [
      {en: "farmhouse",ja: "農家",ph: "/ˈfɑːrmhaʊs/",eiken: 2,pos: "名詞"},
      {en: "doghouse",ja: "犬小屋",ph: "/ˈdɔːɡhaʊs/",eiken: 3,pos: "名詞"},
      {en: "clubhouse",ja: "クラブハウス",ph: "/ˈklʌbhaʊs/",eiken: 2,pos: "名詞"},
      {en: "courthouse",ja: "裁判所",ph: "/ˈkɔːrthaʊs/",eiken: 1,pos: "名詞"},
      {en: "powerhouse",ja: "原動力",ph: "/ˈpaʊərhaʊs/",eiken: 1,pos: "名詞"},
      {en: "townhouse",ja: "タウンハウス",ph: "/ˈtaʊnhaʊs/",eiken: 2,pos: "名詞"},
      {en: "birdhouse",ja: "鳥の巣箱",ph: "/ˈbɜːrdhaʊs/",eiken: 3,pos: "名詞"},
    ]
  },
  {
    id: "fire_compound",
    theme: "fire- チェーン",
    words: [
      {en: "fireworks",ja: "花火",ph: "/ˈfaɪərwɜːrks/",eiken: 3,pos: "名詞"},
      {en: "firefighter",ja: "消防士",ph: "/ˈfaɪərfaɪtər/",eiken: 3,pos: "名詞"},
      {en: "fireplace",ja: "暖炉",ph: "/ˈfaɪərpleɪs/",eiken: 2,pos: "名詞"},
      {en: "firewood",ja: "まき",ph: "/ˈfaɪərwʊd/",eiken: 2,pos: "名詞"},
      {en: "fireman",ja: "消防士",ph: "/ˈfaɪərmən/",eiken: 3,pos: "名詞"},
      {en: "firefly",ja: "ホタル",ph: "/ˈfaɪərflaɪ/",eiken: 2,pos: "名詞"},
      {en: "fireproof",ja: "耐火性の",ph: "/ˈfaɪərpruːf/",eiken: 1,pos: "形容詞"},
      {en: "firewall",ja: "ファイアウォール",ph: "/ˈfaɪərwɔːl/",eiken: 1,pos: "名詞"},
      {en: "fireball",ja: "火の玉",ph: "/ˈfaɪərbɔːl/",eiken: 2,pos: "名詞"},
    ]
  },
  {
    id: "hand_compound",
    theme: "hand- チェーン",
    words: [
      {en: "handbag",ja: "ハンドバッグ",ph: "/ˈhændbæɡ/",eiken: 3,pos: "名詞"},
      {en: "handshake",ja: "握手",ph: "/ˈhændʃeɪk/",eiken: 2,pos: "名詞"},
      {en: "handwriting",ja: "筆跡",ph: "/ˈhændraɪtɪŋ/",eiken: 2,pos: "名詞"},
      {en: "handmade",ja: "手作りの",ph: "/ˌhændˈmeɪd/",eiken: 3,pos: "形容詞"},
      {en: "handkerchief",ja: "ハンカチ",ph: "/ˈhæŋkərtʃɪf/",eiken: 3,pos: "名詞"},
      {en: "handful",ja: "一握り",ph: "/ˈhændfʊl/",eiken: "p1",pos: "名詞"},
      {en: "handbook",ja: "手引書",ph: "/ˈhændbʊk/",eiken: 2,pos: "名詞"},
      {en: "handrail",ja: "手すり",ph: "/ˈhændreɪl/",eiken: 1,pos: "名詞"},
      {en: "handicraft",ja: "手工芸",ph: "/ˈhændikræft/",eiken: 1,pos: "名詞"},
      {en: "handle",ja: "取っ手",ph: "/ˈhændl/",eiken: 3,pos: "名詞"},
    ]
  },
  {
    id: "head_compound",
    theme: "head- チェーン",
    words: [
      {en: "headache",ja: "頭痛",ph: "/ˈhedeɪk/",eiken: 3,pos: "名詞"},
      {en: "headline",ja: "見出し",ph: "/ˈhedlaɪn/",eiken: 2,pos: "名詞"},
      {en: "headquarters",ja: "本部",ph: "/ˈhedkwɔːrtərz/",eiken: "p1",pos: "名詞"},
      {en: "headlight",ja: "ヘッドライト",ph: "/ˈhedlaɪt/",eiken: 2,pos: "名詞"},
      {en: "headband",ja: "ヘアバンド",ph: "/ˈhedbænd/",eiken: 3,pos: "名詞"},
      {en: "headmaster",ja: "校長",ph: "/ˌhedˈmæstər/",eiken: 2,pos: "名詞"},
      {en: "headway",ja: "前進",ph: "/ˈhedweɪ/",eiken: 1,pos: "名詞"},
      {en: "headstrong",ja: "頑固な",ph: "/ˈhedstrɔːŋ/",eiken: 1,pos: "形容詞"},
    ]
  },
  {
    id: "home_compound",
    theme: "home- チェーン",
    words: [
      {en: "homework",ja: "宿題",ph: "/ˈhoʊmwɜːrk/",eiken: 5,pos: "名詞"},
      {en: "hometown",ja: "故郷",ph: "/ˈhoʊmtaʊn/",eiken: 3,pos: "名詞"},
      {en: "homemade",ja: "手作りの",ph: "/ˌhoʊmˈmeɪd/",eiken: 3,pos: "形容詞"},
      {en: "homeroom",ja: "ホームルーム",ph: "/ˈhoʊmruːm/",eiken: 3,pos: "名詞"},
      {en: "homepage",ja: "ホームページ",ph: "/ˈhoʊmpeɪdʒ/",eiken: 3,pos: "名詞"},
      {en: "homestay",ja: "ホームステイ",ph: "/ˈhoʊmsteɪ/",eiken: 3,pos: "名詞"},
      {en: "homeowner",ja: "住宅所有者",ph: "/ˈhoʊmoʊnər/",eiken: 1,pos: "名詞"},
    ]
  },
  {
    id: "snow_compound",
    theme: "snow- チェーン",
    words: [
      {en: "snowman",ja: "雪だるま",ph: "/ˈsnoʊmæn/",eiken: 4,pos: "名詞"},
      {en: "snowball",ja: "雪玉",ph: "/ˈsnoʊbɔːl/",eiken: 3,pos: "名詞"},
      {en: "snowflake",ja: "雪片",ph: "/ˈsnoʊfleɪk/",eiken: 2,pos: "名詞"},
      {en: "snowfall",ja: "降雪",ph: "/ˈsnoʊfɔːl/",eiken: 2,pos: "名詞"},
      {en: "snowboard",ja: "スノーボード",ph: "/ˈsnoʊbɔːrd/",eiken: 3,pos: "名詞"},
      {en: "snowstorm",ja: "吹雪",ph: "/ˈsnoʊstɔːrm/",eiken: 2,pos: "名詞"},
      {en: "snowy",ja: "雪の多い",ph: "/ˈsnoʊi/",eiken: 4,pos: "形容詞"},
      {en: "snowplow",ja: "除雪車",ph: "/ˈsnoʊplaʊ/",eiken: 1,pos: "名詞"},
    ]
  },
  {
    id: "sea_compound",
    theme: "sea- チェーン",
    words: [
      {en: "seafood",ja: "海産物",ph: "/ˈsiːfuːd/",eiken: 3,pos: "名詞"},
      {en: "seaside",ja: "海辺",ph: "/ˈsiːsaɪd/",eiken: 3,pos: "名詞"},
      {en: "seashell",ja: "貝殻",ph: "/ˈsiːʃel/",eiken: 3,pos: "名詞"},
      {en: "seaweed",ja: "海藻",ph: "/ˈsiːwiːd/",eiken: 2,pos: "名詞"},
      {en: "seagull",ja: "カモメ",ph: "/ˈsiːɡʌl/",eiken: 2,pos: "名詞"},
      {en: "seashore",ja: "海岸",ph: "/ˈsiːʃɔːr/",eiken: 2,pos: "名詞"},
      {en: "seabed",ja: "海底",ph: "/ˈsiːbed/",eiken: 1,pos: "名詞"},
    ]
  },
  {
    id: "air_compound",
    theme: "air- チェーン",
    words: [
      {en: "airplane",ja: "飛行機",ph: "/ˈerpleɪn/",eiken: 4,pos: "名詞"},
      {en: "airline",ja: "航空会社",ph: "/ˈerlaɪn/",eiken: 3,pos: "名詞"},
      {en: "aircraft",ja: "航空機",ph: "/ˈerkræft/",eiken: "p1",pos: "名詞"},
      {en: "airmail",ja: "航空便",ph: "/ˈermeɪl/",eiken: 3,pos: "名詞"},
      {en: "airbag",ja: "エアバッグ",ph: "/ˈerbæɡ/",eiken: 2,pos: "名詞"},
      {en: "airtight",ja: "密閉した",ph: "/ˈertaɪt/",eiken: 1,pos: "形容詞"},
      {en: "airfare",ja: "航空運賃",ph: "/ˈerfer/",eiken: 2,pos: "名詞"},
      {en: "airspace",ja: "領空",ph: "/ˈerspeɪs/",eiken: 1,pos: "名詞"},
      {en: "airflow",ja: "気流",ph: "/ˈerfloʊ/",eiken: 1,pos: "名詞"},
    ]
  },
  {
    id: "back_compound",
    theme: "back- チェーン",
    words: [
      {en: "background",ja: "背景",ph: "/ˈbækɡraʊnd/",eiken: 2,pos: "名詞"},
      {en: "backpack",ja: "リュック",ph: "/ˈbækpæk/",eiken: 3,pos: "名詞"},
      {en: "backbone",ja: "背骨",ph: "/ˈbækboʊn/",eiken: "p1",pos: "名詞"},
      {en: "backfire",ja: "裏目に出る",ph: "/ˌbækˈfaɪər/",eiken: 1,pos: "動詞"},
      {en: "backstage",ja: "舞台裏で",ph: "/ˌbækˈsteɪdʒ/",eiken: 2,pos: "副詞"},
      {en: "backup",ja: "予備",ph: "/ˈbækʌp/",eiken: 2,pos: "名詞"},
      {en: "backlog",ja: "未処理の仕事",ph: "/ˈbæklɔːɡ/",eiken: 1,pos: "名詞"},
    ]
  },
  {
    id: "work_root",
    theme: "-work チェーン",
    words: [
      {en: "housework",ja: "家事",ph: "/ˈhaʊswɜːrk/",eiken: 3,pos: "名詞"},
      {en: "teamwork",ja: "チームワーク",ph: "/ˈtiːmwɜːrk/",eiken: 3,pos: "名詞"},
      {en: "network",ja: "ネットワーク",ph: "/ˈnetwɜːrk/",eiken: 2,pos: "名詞"},
      {en: "framework",ja: "枠組み",ph: "/ˈfreɪmwɜːrk/",eiken: "p1",pos: "名詞"},
      {en: "artwork",ja: "芸術作品",ph: "/ˈɑːrtwɜːrk/",eiken: 2,pos: "名詞"},
      {en: "paperwork",ja: "事務処理",ph: "/ˈpeɪpərwɜːrk/",eiken: "p1",pos: "名詞"},
      {en: "woodwork",ja: "木工",ph: "/ˈwʊdwɜːrk/",eiken: 1,pos: "名詞"},
      {en: "patchwork",ja: "パッチワーク",ph: "/ˈpætʃwɜːrk/",eiken: 1,pos: "名詞"},
      {en: "groundwork",ja: "基礎",ph: "/ˈɡraʊndwɜːrk/",eiken: 1,pos: "名詞"},
      {en: "overwork",ja: "働きすぎ",ph: "/ˌoʊvərˈwɜːrk/",eiken: 2,pos: "名詞"},
      {en: "schoolwork",ja: "学業",ph: "/ˈskuːlwɜːrk/",eiken: 3,pos: "名詞"},
    ]
  },
  {
    id: "side_root",
    theme: "-side チェーン",
    words: [
      {en: "beside",ja: "〜のそばに",ph: "/bɪˈsaɪd/",eiken: 3,pos: "前置詞"},
      {en: "countryside",ja: "田舎",ph: "/ˈkʌntrisaɪd/",eiken: 2,pos: "名詞"},
      {en: "roadside",ja: "道端",ph: "/ˈroʊdsaɪd/",eiken: 2,pos: "名詞"},
      {en: "upside",ja: "上側",ph: "/ˈʌpsaɪd/",eiken: 2,pos: "名詞"},
      {en: "downside",ja: "欠点",ph: "/ˈdaʊnsaɪd/",eiken: "p1",pos: "名詞"},
      {en: "hillside",ja: "丘の斜面",ph: "/ˈhɪlsaɪd/",eiken: 2,pos: "名詞"},
      {en: "riverside",ja: "川岸",ph: "/ˈrɪvərsaɪd/",eiken: 2,pos: "名詞"},
      {en: "poolside",ja: "プールサイド",ph: "/ˈpuːlsaɪd/",eiken: 2,pos: "名詞"},
      {en: "offside",ja: "オフサイド",ph: "/ˌɔːfˈsaɪd/",eiken: 1,pos: "形容詞"},
      {en: "fireside",ja: "炉端",ph: "/ˈfaɪərsaɪd/",eiken: 1,pos: "名詞"},
      {en: "mountainside",ja: "山腹",ph: "/ˈmaʊntnsaɪd/",eiken: 1,pos: "名詞"},
    ]
  },
  {
    id: "ball_root",
    theme: "-ball チェーン",
    words: [
      {en: "basketball",ja: "バスケットボール",ph: "/ˈbæskɪtbɔːl/",eiken: 5,pos: "名詞"},
      {en: "volleyball",ja: "バレーボール",ph: "/ˈvɑːlibɔːl/",eiken: 5,pos: "名詞"},
      {en: "softball",ja: "ソフトボール",ph: "/ˈsɔːftbɔːl/",eiken: 4,pos: "名詞"},
      {en: "dodgeball",ja: "ドッジボール",ph: "/ˈdɑːdʒbɔːl/",eiken: 4,pos: "名詞"},
      {en: "handball",ja: "ハンドボール",ph: "/ˈhændbɔːl/",eiken: 3,pos: "名詞"},
      {en: "eyeball",ja: "眼球",ph: "/ˈaɪbɔːl/",eiken: 2,pos: "名詞"},
      {en: "meatball",ja: "ミートボール",ph: "/ˈmiːtbɔːl/",eiken: 3,pos: "名詞"},
      {en: "baseball",ja: "野球",ph: "/ˈbeɪsbɔːl/",eiken: 5,pos: "名詞"},
      {en: "pinball",ja: "ピンボール",ph: "/ˈpɪnbɔːl/",eiken: 2,pos: "名詞"},
    ]
  },
  {
    id: "man_root",
    theme: "-man チェーン",
    words: [
      {en: "postman",ja: "郵便配達人",ph: "/ˈpoʊstmən/",eiken: 4,pos: "名詞"},
      {en: "fisherman",ja: "漁師",ph: "/ˈfɪʃərmən/",eiken: 3,pos: "名詞"},
      {en: "policeman",ja: "警察官",ph: "/pəˈliːsmən/",eiken: 4,pos: "名詞"},
      {en: "businessman",ja: "実業家",ph: "/ˈbɪznəsmæn/",eiken: 3,pos: "名詞"},
      {en: "chairman",ja: "議長",ph: "/ˈtʃermən/",eiken: 2,pos: "名詞"},
      {en: "salesman",ja: "販売員",ph: "/ˈseɪlzmən/",eiken: 3,pos: "名詞"},
      {en: "spokesman",ja: "スポークスマン",ph: "/ˈspoʊksmən/",eiken: "p1",pos: "名詞"},
      {en: "gentleman",ja: "紳士",ph: "/ˈdʒentlmən/",eiken: 3,pos: "名詞"},
      {en: "cameraman",ja: "カメラマン",ph: "/ˈkæmrəmæn/",eiken: 2,pos: "名詞"},
    ]
  },
  {
    id: "light_root",
    theme: "-light チェーン",
    words: [
      {en: "flashlight",ja: "懐中電灯",ph: "/ˈflæʃlaɪt/",eiken: 3,pos: "名詞"},
      {en: "moonlight",ja: "月光",ph: "/ˈmuːnlaɪt/",eiken: 3,pos: "名詞"},
      {en: "spotlight",ja: "スポットライト",ph: "/ˈspɑːtlaɪt/",eiken: 2,pos: "名詞"},
      {en: "daylight",ja: "日光",ph: "/ˈdeɪlaɪt/",eiken: 2,pos: "名詞"},
      {en: "candlelight",ja: "ろうそくの明かり",ph: "/ˈkændllaɪt/",eiken: 2,pos: "名詞"},
      {en: "highlight",ja: "見どころ",ph: "/ˈhaɪlaɪt/",eiken: 2,pos: "名詞"},
      {en: "starlight",ja: "星明かり",ph: "/ˈstɑːrlaɪt/",eiken: 2,pos: "名詞"},
      {en: "streetlight",ja: "街灯",ph: "/ˈstriːtlaɪt/",eiken: 2,pos: "名詞"},
      {en: "twilight",ja: "夕暮れ",ph: "/ˈtwaɪlaɪt/",eiken: 1,pos: "名詞"},
    ]
  },
  {
    id: "graphy_root",
    theme: "-graphy 語根チェーン",
    words: [
      {en: "photography",ja: "写真撮影",ph: "/fəˈtɑːɡrəfi/",eiken: 2,pos: "名詞"},
      {en: "biography",ja: "伝記",ph: "/baɪˈɑːɡrəfi/",eiken: "p1",pos: "名詞"},
      {en: "geography",ja: "地理",ph: "/dʒiˈɑːɡrəfi/",eiken: 3,pos: "名詞"},
      {en: "calligraphy",ja: "書道",ph: "/kəˈlɪɡrəfi/",eiken: 2,pos: "名詞"},
      {en: "choreography",ja: "振り付け",ph: "/ˌkɔːriˈɑːɡrəfi/",eiken: 1,pos: "名詞"},
      {en: "bibliography",ja: "参考文献",ph: "/ˌbɪbliˈɑːɡrəfi/",eiken: 1,pos: "名詞"},
      {en: "oceanography",ja: "海洋学",ph: "/ˌoʊʃəˈnɑːɡrəfi/",eiken: 1,pos: "名詞"},
      {en: "cartography",ja: "地図作成法",ph: "/kɑːrˈtɑːɡrəfi/",eiken: 1,pos: "名詞"},
    ]
  },
  {
    id: "nomy_root",
    theme: "-nomy 語根チェーン",
    words: [
      {en: "economy",ja: "経済",ph: "/ɪˈkɑːnəmi/",eiken: 2,pos: "名詞"},
      {en: "astronomy",ja: "天文学",ph: "/əˈstrɑːnəmi/",eiken: "p1",pos: "名詞"},
      {en: "gastronomy",ja: "美食",ph: "/ɡæˈstrɑːnəmi/",eiken: 1,pos: "名詞"},
      {en: "taxonomy",ja: "分類学",ph: "/tækˈsɑːnəmi/",eiken: 1,pos: "名詞"},
      {en: "agronomy",ja: "農学",ph: "/əˈɡrɑːnəmi/",eiken: 1,pos: "名詞"},
    ]
  },
  {
    id: "cian_root",
    theme: "-cian チェーン",
    words: [
      {en: "musician",ja: "音楽家",ph: "/mjuˈzɪʃn/",eiken: 3,pos: "名詞"},
      {en: "magician",ja: "手品師",ph: "/məˈdʒɪʃn/",eiken: 3,pos: "名詞"},
      {en: "physician",ja: "内科医",ph: "/fɪˈzɪʃn/",eiken: "p1",pos: "名詞"},
      {en: "politician",ja: "政治家",ph: "/ˌpɑːləˈtɪʃn/",eiken: 2,pos: "名詞"},
      {en: "technician",ja: "技術者",ph: "/tekˈnɪʃn/",eiken: "p1",pos: "名詞"},
      {en: "electrician",ja: "電気技師",ph: "/ɪˌlekˈtrɪʃn/",eiken: 2,pos: "名詞"},
      {en: "mathematician",ja: "数学者",ph: "/ˌmæθəməˈtɪʃn/",eiken: "p1",pos: "名詞"},
      {en: "beautician",ja: "美容師",ph: "/bjuːˈtɪʃn/",eiken: 1,pos: "名詞"},
      {en: "optician",ja: "眼鏡屋",ph: "/ɑːpˈtɪʃn/",eiken: 1,pos: "名詞"},
      {en: "statistician",ja: "統計学者",ph: "/ˌstætɪˈstɪʃn/",eiken: 1,pos: "名詞"},
    ]
  },
  {
    id: "tele_compound",
    theme: "tele- 語根チェーン",
    words: [
      {en: "telecommunication",ja: "電気通信",ph: "/ˌtelikəˌmjuːnɪˈkeɪʃn/",eiken: 1,pos: "名詞"},
      {en: "teleport",ja: "瞬間移動する",ph: "/ˈtelɪpɔːrt/",eiken: 1,pos: "動詞"},
      {en: "teleconference",ja: "テレビ会議",ph: "/ˈtelikɑːnfərəns/",eiken: 1,pos: "名詞"},
      {en: "telephoto",ja: "望遠写真の",ph: "/ˌteliˈfoʊtoʊ/",eiken: 1,pos: "形容詞"},
    ]
  },
  {
    id: "bio_compound",
    theme: "bio- 語根チェーン",
    words: [
      {en: "biodiversity",ja: "生物多様性",ph: "/ˌbaɪoʊdaɪˈvɜːrsəti/",eiken: 1,pos: "名詞"},
      {en: "biotechnology",ja: "生物工学",ph: "/ˌbaɪoʊtekˈnɑːlədʒi/",eiken: 1,pos: "名詞"},
      {en: "biochemistry",ja: "生化学",ph: "/ˌbaɪoʊˈkemɪstri/",eiken: 1,pos: "名詞"},
      {en: "biofuel",ja: "バイオ燃料",ph: "/ˈbaɪoʊfjuːəl/",eiken: 1,pos: "名詞"},
      {en: "biodegradable",ja: "生分解性の",ph: "/ˌbaɪoʊdɪˈɡreɪdəbl/",eiken: 1,pos: "形容詞"},
      {en: "biomass",ja: "バイオマス",ph: "/ˈbaɪoʊmæs/",eiken: 1,pos: "名詞"},
      {en: "biometric",ja: "生体認証の",ph: "/ˌbaɪoʊˈmetrɪk/",eiken: 1,pos: "形容詞"},
    ]
  },
  {
    id: "photo_compound",
    theme: "photo- 語根チェーン",
    words: [
      {en: "photographer",ja: "写真家",ph: "/fəˈtɑːɡrəfər/",eiken: 3,pos: "名詞"},
      {en: "photocopy",ja: "コピー",ph: "/ˈfoʊtoʊkɑːpi/",eiken: 2,pos: "名詞"},
      {en: "photosynthesis",ja: "光合成",ph: "/ˌfoʊtoʊˈsɪnθəsɪs/",eiken: 1,pos: "名詞"},
      {en: "photogenic",ja: "写真写りのよい",ph: "/ˌfoʊtoʊˈdʒenɪk/",eiken: 1,pos: "形容詞"},
      {en: "photon",ja: "光子",ph: "/ˈfoʊtɑːn/",eiken: 1,pos: "名詞"},
      {en: "photobook",ja: "写真集",ph: "/ˈfoʊtoʊbʊk/",eiken: 2,pos: "名詞"},
    ]
  },
  {
    id: "geo_compound",
    theme: "geo- 語根チェーン",
    words: [
      {en: "geometry",ja: "幾何学",ph: "/dʒiˈɑːmətri/",eiken: "p1",pos: "名詞"},
      {en: "geothermal",ja: "地熱の",ph: "/ˌdʒiːoʊˈθɜːrml/",eiken: 1,pos: "形容詞"},
      {en: "geopolitics",ja: "地政学",ph: "/ˌdʒiːoʊˈpɑːlətɪks/",eiken: 1,pos: "名詞"},
      {en: "geographical",ja: "地理的な",ph: "/ˌdʒiːəˈɡræfɪkl/",eiken: "p1",pos: "形容詞"},
      {en: "geologist",ja: "地質学者",ph: "/dʒiˈɑːlədʒɪst/",eiken: 1,pos: "名詞"},
      {en: "geomagnetic",ja: "地磁気の",ph: "/ˌdʒiːoʊmæɡˈnetɪk/",eiken: 1,pos: "形容詞"},
    ]
  },
  {
    id: "board_root",
    theme: "-board チェーン",
    words: [
      {en: "blackboard",ja: "黒板",ph: "/ˈblækbɔːrd/",eiken: 4,pos: "名詞"},
      {en: "cupboard",ja: "食器棚",ph: "/ˈkʌbərd/",eiken: 3,pos: "名詞"},
      {en: "skateboard",ja: "スケートボード",ph: "/ˈskeɪtbɔːrd/",eiken: 3,pos: "名詞"},
      {en: "dashboard",ja: "計器盤",ph: "/ˈdæʃbɔːrd/",eiken: 1,pos: "名詞"},
      {en: "billboard",ja: "広告板",ph: "/ˈbɪlbɔːrd/",eiken: 2,pos: "名詞"},
      {en: "cardboard",ja: "段ボール",ph: "/ˈkɑːrdbɔːrd/",eiken: 2,pos: "名詞"},
      {en: "whiteboard",ja: "ホワイトボード",ph: "/ˈwaɪtbɔːrd/",eiken: 3,pos: "名詞"},
      {en: "surfboard",ja: "サーフボード",ph: "/ˈsɜːrfbɔːrd/",eiken: 2,pos: "名詞"},
      {en: "aboard",ja: "乗って",ph: "/əˈbɔːrd/",eiken: 2,pos: "副詞"},
      {en: "overboard",ja: "船外へ",ph: "/ˈoʊvərbɔːrd/",eiken: 1,pos: "副詞"},
    ]
  },
  {
    id: "ground_root",
    theme: "-ground チェーン",
    words: [
      {en: "playground",ja: "遊び場",ph: "/ˈpleɪɡraʊnd/",eiken: 4,pos: "名詞"},
      {en: "campground",ja: "キャンプ場",ph: "/ˈkæmpɡraʊnd/",eiken: 2,pos: "名詞"},
      {en: "battleground",ja: "戦場",ph: "/ˈbætlɡraʊnd/",eiken: 1,pos: "名詞"},
      {en: "fairground",ja: "遊園地",ph: "/ˈferɡraʊnd/",eiken: 1,pos: "名詞"},
      {en: "aboveground",ja: "地上の",ph: "/əˈbʌvɡraʊnd/",eiken: 1,pos: "形容詞"},
    ]
  },
  {
    id: "fish_root",
    theme: "-fish チェーン",
    words: [
      {en: "goldfish",ja: "金魚",ph: "/ˈɡoʊldfɪʃ/",eiken: 3,pos: "名詞"},
      {en: "jellyfish",ja: "クラゲ",ph: "/ˈdʒelifɪʃ/",eiken: 2,pos: "名詞"},
      {en: "starfish",ja: "ヒトデ",ph: "/ˈstɑːrfɪʃ/",eiken: 2,pos: "名詞"},
      {en: "catfish",ja: "ナマズ",ph: "/ˈkætfɪʃ/",eiken: 2,pos: "名詞"},
      {en: "shellfish",ja: "貝類",ph: "/ˈʃelfɪʃ/",eiken: 1,pos: "名詞"},
      {en: "swordfish",ja: "メカジキ",ph: "/ˈsɔːrdfɪʃ/",eiken: 1,pos: "名詞"},
    ]
  },
  {
    id: "berry_root",
    theme: "-berry チェーン",
    words: [
      {en: "strawberry",ja: "イチゴ",ph: "/ˈstrɔːberi/",eiken: 5,pos: "名詞"},
      {en: "blueberry",ja: "ブルーベリー",ph: "/ˈbluːberi/",eiken: 3,pos: "名詞"},
      {en: "raspberry",ja: "ラズベリー",ph: "/ˈræzberi/",eiken: 2,pos: "名詞"},
      {en: "cranberry",ja: "クランベリー",ph: "/ˈkrænberi/",eiken: 2,pos: "名詞"},
      {en: "blackberry",ja: "ブラックベリー",ph: "/ˈblækberi/",eiken: 2,pos: "名詞"},
      {en: "gooseberry",ja: "スグリ",ph: "/ˈɡuːsberi/",eiken: 1,pos: "名詞"},
      {en: "mulberry",ja: "桑の実",ph: "/ˈmʌlberi/",eiken: 1,pos: "名詞"},
    ]
  },
  {
    id: "ache_root",
    theme: "-ache チェーン",
    words: [
      {en: "toothache",ja: "歯痛",ph: "/ˈtuːθeɪk/",eiken: 3,pos: "名詞"},
      {en: "stomachache",ja: "腹痛",ph: "/ˈstʌməkeɪk/",eiken: 3,pos: "名詞"},
      {en: "backache",ja: "腰痛",ph: "/ˈbækeɪk/",eiken: 2,pos: "名詞"},
      {en: "earache",ja: "耳痛",ph: "/ˈɪreɪk/",eiken: 2,pos: "名詞"},
      {en: "heartache",ja: "心痛",ph: "/ˈhɑːrteɪk/",eiken: 1,pos: "名詞"},
    ]
  },
  {
    id: "mate_root",
    theme: "-mate チェーン",
    words: [
      {en: "classmate",ja: "同級生",ph: "/ˈklæsmeɪt/",eiken: 4,pos: "名詞"},
      {en: "roommate",ja: "ルームメイト",ph: "/ˈruːmmeɪt/",eiken: 3,pos: "名詞"},
      {en: "teammate",ja: "チームメイト",ph: "/ˈtiːmmeɪt/",eiken: 3,pos: "名詞"},
      {en: "schoolmate",ja: "学友",ph: "/ˈskuːlmeɪt/",eiken: 3,pos: "名詞"},
      {en: "playmate",ja: "遊び友達",ph: "/ˈpleɪmeɪt/",eiken: 2,pos: "名詞"},
      {en: "checkmate",ja: "チェックメイト",ph: "/ˈtʃekmeɪt/",eiken: 1,pos: "名詞"},
    ]
  },
  {
    id: "proof_root",
    theme: "-proof チェーン",
    words: [
      {en: "soundproof",ja: "防音の",ph: "/ˈsaʊndpruːf/",eiken: 1,pos: "形容詞"},
      {en: "bulletproof",ja: "防弾の",ph: "/ˈbʊlɪtpruːf/",eiken: 1,pos: "形容詞"},
      {en: "foolproof",ja: "確実な",ph: "/ˈfuːlpruːf/",eiken: 1,pos: "形容詞"},
      {en: "childproof",ja: "子供が開けられない",ph: "/ˈtʃaɪldpruːf/",eiken: 1,pos: "形容詞"},
      {en: "shockproof",ja: "耐衝撃の",ph: "/ˈʃɑːkpruːf/",eiken: 1,pos: "形容詞"},
      {en: "rainproof",ja: "防水の",ph: "/ˈreɪnpruːf/",eiken: 1,pos: "形容詞"},
    ]
  },
  {
    id: "craft_root",
    theme: "-craft チェーン",
    words: [
      {en: "spacecraft",ja: "宇宙船",ph: "/ˈspeɪskræft/",eiken: "p1",pos: "名詞"},
      {en: "witchcraft",ja: "魔術",ph: "/ˈwɪtʃkræft/",eiken: 1,pos: "名詞"},
      {en: "watercraft",ja: "船舶",ph: "/ˈwɔːtərkræft/",eiken: 1,pos: "名詞"},
      {en: "statecraft",ja: "政治手腕",ph: "/ˈsteɪtkræft/",eiken: 1,pos: "名詞"},
      {en: "hovercraft",ja: "ホバークラフト",ph: "/ˈhʌvərkræft/",eiken: 1,pos: "名詞"},
    ]
  },
  {
    id: "fr_onset2",
    theme: "fr- ファミリー",
    words: [
      {en: "fry",ja: "揚げる",ph: "/fraɪ/",eiken: 3,pos: "動詞"},
      {en: "fraud",ja: "詐欺",ph: "/frɔːd/",eiken: 2,pos: "名詞"},
      {en: "fresh",ja: "新鮮な",ph: "/freʃ/",eiken: 3,pos: "形容詞"},
      {en: "front",ja: "前",ph: "/frʌnt/",eiken: 4,pos: "名詞"},
      {en: "frost",ja: "霜",ph: "/frɔːst/",eiken: 2,pos: "名詞"},
      {en: "fruit",ja: "果物",ph: "/fruːt/",eiken: 5,pos: "名詞"},
      {en: "freeze",ja: "凍る",ph: "/friːz/",eiken: 3,pos: "動詞"},
      {en: "frenzy",ja: "熱狂",ph: "/ˈfrenzi/",eiken: "p1",pos: "名詞"},
      {en: "fridge",ja: "冷蔵庫",ph: "/frɪdʒ/",eiken: 3,pos: "名詞"},
    ]
  },
  {
    id: "fr_onset2b",
    theme: "fr- ファミリー",
    words: [
      {en: "frugal",ja: "質素な",ph: "/ˈfruːɡəl/",eiken: "p1",pos: "形容詞"},
      {en: "freight",ja: "貨物",ph: "/freɪt/",eiken: "p1",pos: "名詞"},
      {en: "fraction",ja: "一部・分数",ph: "/ˈfrækʃən/",eiken: 2,pos: "名詞"},
      {en: "fragment",ja: "破片",ph: "/ˈfræɡmənt/",eiken: 2,pos: "名詞"},
      {en: "friction",ja: "摩擦",ph: "/ˈfrɪkʃən/",eiken: 2,pos: "名詞"},
      {en: "frontier",ja: "辺境",ph: "/frʌnˈtɪr/",eiken: "p1",pos: "名詞"},
      {en: "frivolous",ja: "軽薄な",ph: "/ˈfrɪvələs/",eiken: 1,pos: "形容詞"},
      {en: "frustrate",ja: "いらいらさせる",ph: "/ˈfrʌstreɪt/",eiken: 2,pos: "動詞"},
    ]
  },
  {
    id: "gl_onset2",
    theme: "gl- ファミリー",
    words: [
      {en: "glow",ja: "光る",ph: "/ɡloʊ/",eiken: 2,pos: "動詞"},
      {en: "glue",ja: "のり",ph: "/ɡluː/",eiken: 3,pos: "名詞"},
      {en: "glum",ja: "むっつりした",ph: "/ɡlʌm/",eiken: 1,pos: "形容詞"},
      {en: "glare",ja: "にらむ",ph: "/ɡler/",eiken: "p1",pos: "動詞"},
      {en: "glass",ja: "ガラス",ph: "/ɡlæs/",eiken: 4,pos: "名詞"},
      {en: "glide",ja: "滑空する",ph: "/ɡlaɪd/",eiken: "p1",pos: "動詞"},
      {en: "globe",ja: "地球",ph: "/ɡloʊb/",eiken: 2,pos: "名詞"},
      {en: "glory",ja: "栄光",ph: "/ˈɡlɔːri/",eiken: 2,pos: "名詞"},
    ]
  },
  {
    id: "gl_onset2b",
    theme: "gl- ファミリー",
    words: [
      {en: "glove",ja: "手袋",ph: "/ɡlʌv/",eiken: 4,pos: "名詞"},
      {en: "glance",ja: "ちらっと見る",ph: "/ɡlæns/",eiken: 2,pos: "動詞"},
      {en: "global",ja: "世界的な",ph: "/ˈɡloʊbəl/",eiken: 2,pos: "形容詞"},
      {en: "gloomy",ja: "陰気な",ph: "/ˈɡluːmi/",eiken: "p1",pos: "形容詞"},
      {en: "glacier",ja: "氷河",ph: "/ˈɡleɪʃər/",eiken: "p1",pos: "名詞"},
      {en: "glimpse",ja: "ちらりと見ること",ph: "/ɡlɪmps/",eiken: "p1",pos: "名詞"},
      {en: "glitter",ja: "きらめく",ph: "/ˈɡlɪtər/",eiken: "p1",pos: "動詞"},
      {en: "glossary",ja: "用語集",ph: "/ˈɡlɑːsəri/",eiken: "p1",pos: "名詞"},
    ]
  },
  {
    id: "sc_onset2",
    theme: "sc- ファミリー",
    words: [
      {en: "scale",ja: "規模",ph: "/skeɪl/",eiken: 2,pos: "名詞"},
      {en: "scant",ja: "乏しい",ph: "/skænt/",eiken: 1,pos: "形容詞"},
      {en: "scare",ja: "怖がらせる",ph: "/sker/",eiken: 3,pos: "動詞"},
      {en: "scarf",ja: "マフラー",ph: "/skɑːrf/",eiken: 3,pos: "名詞"},
      {en: "scene",ja: "場面",ph: "/siːn/",eiken: 3,pos: "名詞"},
      {en: "scold",ja: "しかる",ph: "/skoʊld/",eiken: 2,pos: "動詞"},
      {en: "scarce",ja: "乏しい",ph: "/skers/",eiken: "p1",pos: "形容詞"},
      {en: "scheme",ja: "計画",ph: "/skiːm/",eiken: "p1",pos: "名詞"},
    ]
  },
  {
    id: "sc_onset2b",
    theme: "sc- ファミリー",
    words: [
      {en: "scandal",ja: "不祥事",ph: "/ˈskændəl/",eiken: 2,pos: "名詞"},
      {en: "scatter",ja: "まき散らす",ph: "/ˈskætər/",eiken: "p1",pos: "動詞"},
      {en: "scholar",ja: "学者",ph: "/ˈskɑːlər/",eiken: 2,pos: "名詞"},
      {en: "scenario",ja: "筋書き",ph: "/səˈnerioʊ/",eiken: "p1",pos: "名詞"},
      {en: "schedule",ja: "予定",ph: "/ˈskedʒuːl/",eiken: 3,pos: "名詞"},
      {en: "scissors",ja: "はさみ",ph: "/ˈsɪzərz/",eiken: 3,pos: "名詞"},
    ]
  },
  {
    id: "sk_onset2",
    theme: "sk- ファミリー",
    words: [
      {en: "ski",ja: "スキーをする",ph: "/skiː/",eiken: 4,pos: "動詞"},
      {en: "skid",ja: "横滑りする",ph: "/skɪd/",eiken: 1,pos: "動詞"},
      {en: "skim",ja: "ざっと読む",ph: "/skɪm/",eiken: "p1",pos: "動詞"},
      {en: "skin",ja: "皮膚",ph: "/skɪn/",eiken: 3,pos: "名詞"},
      {en: "skate",ja: "スケートをする",ph: "/skeɪt/",eiken: 4,pos: "動詞"},
      {en: "skier",ja: "スキーをする人",ph: "/ˈskiːər/",eiken: 3,pos: "名詞"},
      {en: "skirt",ja: "スカート",ph: "/skɜːrt/",eiken: 4,pos: "名詞"},
      {en: "skull",ja: "頭蓋骨",ph: "/skʌl/",eiken: 2,pos: "名詞"},
    ]
  },
  {
    id: "sk_onset2b",
    theme: "sk- ファミリー",
    words: [
      {en: "sketch",ja: "スケッチ",ph: "/sketʃ/",eiken: 2,pos: "名詞"},
      {en: "skinny",ja: "やせた",ph: "/ˈskɪni/",eiken: 3,pos: "形容詞"},
      {en: "skyline",ja: "空の輪郭",ph: "/ˈskaɪlaɪn/",eiken: 2,pos: "名詞"},
      {en: "skeleton",ja: "骸骨",ph: "/ˈskelɪtən/",eiken: 2,pos: "名詞"},
      {en: "skillful",ja: "熟練した",ph: "/ˈskɪlfəl/",eiken: 2,pos: "形容詞"},
      {en: "skyscraper",ja: "超高層ビル",ph: "/ˈskaɪskreɪpər/",eiken: 2,pos: "名詞"},
    ]
  },
  {
    id: "scr_onset2",
    theme: "scr- ファミリー",
    words: [
      {en: "scrap",ja: "くず",ph: "/skræp/",eiken: 2,pos: "名詞"},
      {en: "screw",ja: "ねじ",ph: "/skruː/",eiken: 2,pos: "名詞"},
      {en: "scrape",ja: "こすり取る",ph: "/skreɪp/",eiken: "p1",pos: "動詞"},
      {en: "screen",ja: "画面",ph: "/skriːn/",eiken: 3,pos: "名詞"},
      {en: "script",ja: "台本",ph: "/skrɪpt/",eiken: 2,pos: "名詞"},
      {en: "scroll",ja: "スクロールする",ph: "/skroʊl/",eiken: 2,pos: "動詞"},
      {en: "scruffy",ja: "みすぼらしい",ph: "/ˈskrʌfi/",eiken: 1,pos: "形容詞"},
      {en: "scramble",ja: "急いで動く",ph: "/ˈskræmbəl/",eiken: "p1",pos: "動詞"},
      {en: "scribble",ja: "走り書きする",ph: "/ˈskrɪbəl/",eiken: "p1",pos: "動詞"},
      {en: "scrutiny",ja: "精査",ph: "/ˈskruːtəni/",eiken: 1,pos: "名詞"},
      {en: "scrupulous",ja: "綿密な",ph: "/ˈskruːpjələs/",eiken: 1,pos: "形容詞"},
      {en: "scrutinize",ja: "綿密に調べる",ph: "/ˈskruːtənaɪz/",eiken: 1,pos: "動詞"},
    ]
  },
  {
    id: "sprl_onset2",
    theme: "spr-/spl- ファミリー",
    words: [
      {en: "spree",ja: "浮かれ騒ぎ",ph: "/spriː/",eiken: 1,pos: "名詞"},
      {en: "sprain",ja: "ねんざする",ph: "/spreɪn/",eiken: "p1",pos: "動詞"},
      {en: "sprawl",ja: "手足を伸ばす",ph: "/sprɔːl/",eiken: 1,pos: "動詞"},
      {en: "sprite",ja: "妖精",ph: "/spraɪt/",eiken: 1,pos: "名詞"},
      {en: "spruce",ja: "トウヒ",ph: "/spruːs/",eiken: 1,pos: "名詞"},
      {en: "splurge",ja: "散財する",ph: "/splɜːrdʒ/",eiken: 1,pos: "動詞"},
      {en: "splatter",ja: "はね散らす",ph: "/ˈsplætər/",eiken: 1,pos: "動詞"},
      {en: "splendid",ja: "すばらしい",ph: "/ˈsplendɪd/",eiken: "p1",pos: "形容詞"},
      {en: "splinter",ja: "とげ",ph: "/ˈsplɪntər/",eiken: 1,pos: "名詞"},
      {en: "sprinkle",ja: "振りかける",ph: "/ˈsprɪŋkəl/",eiken: "p1",pos: "動詞"},
      {en: "sprinkler",ja: "散水器",ph: "/ˈsprɪŋklər/",eiken: 2,pos: "名詞"},
    ]
  },
  {
    id: "str_onset2",
    theme: "str- ファミリー",
    words: [
      {en: "strap",ja: "ひも",ph: "/stræp/",eiken: "p2",pos: "名詞"},
      {en: "stray",ja: "迷う",ph: "/streɪ/",eiken: "p1",pos: "動詞"},
      {en: "strait",ja: "海峡",ph: "/streɪt/",eiken: 1,pos: "名詞"},
      {en: "strict",ja: "厳しい",ph: "/strɪkt/",eiken: 3,pos: "形容詞"},
      {en: "stride",ja: "大またで歩く",ph: "/straɪd/",eiken: "p1",pos: "動詞"},
      {en: "strive",ja: "努力する",ph: "/straɪv/",eiken: "p1",pos: "動詞"},
      {en: "stroll",ja: "散歩する",ph: "/stroʊl/",eiken: "p1",pos: "動詞"},
      {en: "strange",ja: "奇妙な",ph: "/streɪndʒ/",eiken: 4,pos: "形容詞"},
      {en: "stretch",ja: "伸ばす",ph: "/stretʃ/",eiken: 3,pos: "動詞"},
    ]
  },
  {
    id: "str_onset2b",
    theme: "str- ファミリー",
    words: [
      {en: "stranger",ja: "見知らぬ人",ph: "/ˈstreɪndʒər/",eiken: 3,pos: "名詞"},
      {en: "strategy",ja: "戦略",ph: "/ˈstrætədʒi/",eiken: 2,pos: "名詞"},
      {en: "strength",ja: "力",ph: "/streŋkθ/",eiken: 3,pos: "名詞"},
      {en: "struggle",ja: "奮闘する",ph: "/ˈstrʌɡəl/",eiken: 2,pos: "動詞"},
      {en: "strenuous",ja: "激しい",ph: "/ˈstrenjuəs/",eiken: 1,pos: "形容詞"},
      {en: "stringent",ja: "厳格な",ph: "/ˈstrɪndʒənt/",eiken: 1,pos: "形容詞"},
      {en: "streamline",ja: "合理化する",ph: "/ˈstriːmlaɪn/",eiken: 1,pos: "動詞"},
    ]
  },
  {
    id: "squ_onset2",
    theme: "squ- ファミリー",
    words: [
      {en: "squad",ja: "班",ph: "/skwɑːd/",eiken: "p1",pos: "名詞"},
      {en: "squat",ja: "しゃがむ",ph: "/skwɑːt/",eiken: 1,pos: "動詞"},
      {en: "squid",ja: "イカ",ph: "/skwɪd/",eiken: 2,pos: "名詞"},
      {en: "square",ja: "正方形",ph: "/skwer/",eiken: 3,pos: "名詞"},
      {en: "squash",ja: "押しつぶす",ph: "/skwɑːʃ/",eiken: "p1",pos: "動詞"},
      {en: "squeeze",ja: "しぼる",ph: "/skwiːz/",eiken: 2,pos: "動詞"},
      {en: "squabble",ja: "口げんか",ph: "/ˈskwɑːbəl/",eiken: 1,pos: "名詞"},
      {en: "squander",ja: "浪費する",ph: "/ˈskwɑːndər/",eiken: 1,pos: "動詞"},
      {en: "squirrel",ja: "リス",ph: "/ˈskwɜːrəl/",eiken: 3,pos: "名詞"},
    ]
  },
  {
    id: "shr_onset2",
    theme: "shr- ファミリー",
    words: [
      {en: "shred",ja: "細かく切る",ph: "/ʃred/",eiken: 1,pos: "動詞"},
      {en: "shrewd",ja: "抜け目のない",ph: "/ʃruːd/",eiken: 1,pos: "形容詞"},
      {en: "shriek",ja: "悲鳴を上げる",ph: "/ʃriːk/",eiken: 1,pos: "動詞"},
      {en: "shrill",ja: "甲高い",ph: "/ʃrɪl/",eiken: 1,pos: "形容詞"},
      {en: "shrimp",ja: "エビ",ph: "/ʃrɪmp/",eiken: 3,pos: "名詞"},
      {en: "shrine",ja: "神社",ph: "/ʃraɪn/",eiken: 2,pos: "名詞"},
      {en: "shroud",ja: "覆う",ph: "/ʃraʊd/",eiken: 1,pos: "動詞"},
      {en: "shrivel",ja: "しなびる",ph: "/ˈʃrɪvəl/",eiken: 1,pos: "動詞"},
      {en: "shrinkage",ja: "縮小",ph: "/ˈʃrɪŋkɪdʒ/",eiken: 1,pos: "名詞"},
    ]
  },
  {
    id: "thr_onset2",
    theme: "thr- ファミリー",
    words: [
      {en: "thrive",ja: "繁栄する",ph: "/θraɪv/",eiken: "p1",pos: "動詞"},
      {en: "thrust",ja: "押し込む",ph: "/θrʌst/",eiken: 1,pos: "動詞"},
      {en: "thriller",ja: "スリラー",ph: "/ˈθrɪlər/",eiken: 2,pos: "名詞"},
      {en: "threshold",ja: "入口・境界",ph: "/ˈθreʃhoʊld/",eiken: 1,pos: "名詞"},
      {en: "thrilling",ja: "わくわくする",ph: "/ˈθrɪlɪŋ/",eiken: 2,pos: "形容詞"},
    ]
  },
  {
    id: "kn_onset2",
    theme: "kn- ファミリー",
    words: [
      {en: "knuckle",ja: "指の関節",ph: "/ˈnʌkəl/",eiken: 1,pos: "名詞"},
      {en: "knapsack",ja: "リュック",ph: "/ˈnæpsæk/",eiken: 2,pos: "名詞"},
      {en: "knowledge",ja: "知識",ph: "/ˈnɑːlɪdʒ/",eiken: 3,pos: "名詞"},
      {en: "knowledgeable",ja: "博識な",ph: "/ˈnɑːlɪdʒəbəl/",eiken: "p1",pos: "形容詞"},
    ]
  },
  {
    id: "wr_onset2",
    theme: "wr- ファミリー",
    words: [
      {en: "wrath",ja: "激怒",ph: "/ræθ/",eiken: 1,pos: "名詞"},
      {en: "wrist",ja: "手首",ph: "/rɪst/",eiken: 3,pos: "名詞"},
      {en: "wreath",ja: "花輪",ph: "/riːθ/",eiken: 1,pos: "名詞"},
      {en: "wrapper",ja: "包み紙",ph: "/ˈræpər/",eiken: 2,pos: "名詞"},
      {en: "wrestle",ja: "格闘する",ph: "/ˈresəl/",eiken: 2,pos: "動詞"},
      {en: "wriggle",ja: "身をくねらせる",ph: "/ˈrɪɡəl/",eiken: 1,pos: "動詞"},
      {en: "wrinkle",ja: "しわ",ph: "/ˈrɪŋkəl/",eiken: 2,pos: "名詞"},
      {en: "written",ja: "書かれた",ph: "/ˈrɪtən/",eiken: 3,pos: "形容詞"},
      {en: "wretched",ja: "みじめな",ph: "/ˈretʃɪd/",eiken: 1,pos: "形容詞"},
    ]
  },
  {
    id: "ph_onset2",
    theme: "ph- ファミリー",
    words: [
      {en: "phase",ja: "段階",ph: "/feɪz/",eiken: "p1",pos: "名詞"},
      {en: "photo",ja: "写真",ph: "/ˈfoʊtoʊ/",eiken: 4,pos: "名詞"},
      {en: "phobia",ja: "恐怖症",ph: "/ˈfoʊbiə/",eiken: 1,pos: "名詞"},
      {en: "phrase",ja: "句",ph: "/freɪz/",eiken: 3,pos: "名詞"},
      {en: "phantom",ja: "幻",ph: "/ˈfæntəm/",eiken: 1,pos: "名詞"},
      {en: "physics",ja: "物理学",ph: "/ˈfɪzɪks/",eiken: 2,pos: "名詞"},
      {en: "pharmacy",ja: "薬局",ph: "/ˈfɑːrməsi/",eiken: 2,pos: "名詞"},
    ]
  },
  {
    id: "ph_onset2b",
    theme: "ph- ファミリー",
    words: [
      {en: "physicist",ja: "物理学者",ph: "/ˈfɪzɪsɪst/",eiken: "p1",pos: "名詞"},
      {en: "phenomenal",ja: "驚異的な",ph: "/fəˈnɑːmɪnəl/",eiken: 1,pos: "形容詞"},
      {en: "phenomenon",ja: "現象",ph: "/fəˈnɑːmənɑːn/",eiken: "p1",pos: "名詞"},
      {en: "philosophy",ja: "哲学",ph: "/fəˈlɑːsəfi/",eiken: 2,pos: "名詞"},
      {en: "philosopher",ja: "哲学者",ph: "/fəˈlɑːsəfər/",eiken: "p1",pos: "名詞"},
      {en: "pharmaceutical",ja: "製薬の",ph: "/ˌfɑːrməˈsuːtɪkəl/",eiken: 1,pos: "形容詞"},
    ]
  },
  {
    id: "qu_onset2",
    theme: "qu- ファミリー",
    words: [
      {en: "quit",ja: "やめる",ph: "/kwɪt/",eiken: 2,pos: "動詞"},
      {en: "quiz",ja: "クイズ",ph: "/kwɪz/",eiken: 4,pos: "名詞"},
      {en: "queen",ja: "女王",ph: "/kwiːn/",eiken: 4,pos: "名詞"},
      {en: "queue",ja: "列",ph: "/kjuː/",eiken: "p1",pos: "名詞"},
      {en: "quiet",ja: "静かな",ph: "/ˈkwaɪət/",eiken: 4,pos: "形容詞"},
      {en: "quota",ja: "割り当て",ph: "/ˈkwoʊtə/",eiken: "p1",pos: "名詞"},
      {en: "quaint",ja: "古風で趣のある",ph: "/kweɪnt/",eiken: 1,pos: "形容詞"},
    ]
  },
  {
    id: "qu_onset2b",
    theme: "qu- ファミリー",
    words: [
      {en: "quiver",ja: "震える",ph: "/ˈkwɪvər/",eiken: 1,pos: "動詞"},
      {en: "quarrel",ja: "口論",ph: "/ˈkwɔːrəl/",eiken: 2,pos: "名詞"},
      {en: "quarter",ja: "4分の1",ph: "/ˈkwɔːrtər/",eiken: 3,pos: "名詞"},
      {en: "quantity",ja: "量",ph: "/ˈkwɑːntəti/",eiken: 2,pos: "名詞"},
      {en: "quarantine",ja: "隔離",ph: "/ˈkwɔːrəntiːn/",eiken: "p1",pos: "名詞"},
      {en: "qualification",ja: "資格",ph: "/ˌkwɑːləfɪˈkeɪʃən/",eiken: 2,pos: "名詞"},
      {en: "questionnaire",ja: "アンケート",ph: "/ˌkwestʃəˈner/",eiken: "p1",pos: "名詞"},
    ]
  },
  {
    id: "cl_onset2",
    theme: "cl- ファミリー",
    words: [
      {en: "clue",ja: "手がかり",ph: "/kluː/",eiken: 2,pos: "名詞"},
      {en: "clerk",ja: "店員",ph: "/klɜːrk/",eiken: 3,pos: "名詞"},
      {en: "cliff",ja: "崖",ph: "/klɪf/",eiken: 2,pos: "名詞"},
      {en: "cloth",ja: "布",ph: "/klɔːθ/",eiken: 3,pos: "名詞"},
      {en: "clause",ja: "条項",ph: "/klɔːz/",eiken: "p1",pos: "名詞"},
      {en: "clergy",ja: "聖職者",ph: "/ˈklɜːrdʒi/",eiken: 1,pos: "名詞"},
      {en: "clever",ja: "賢い",ph: "/ˈklevər/",eiken: 3,pos: "形容詞"},
      {en: "client",ja: "顧客",ph: "/ˈklaɪənt/",eiken: 2,pos: "名詞"},
      {en: "climax",ja: "最高潮",ph: "/ˈklaɪmæks/",eiken: "p1",pos: "名詞"},
      {en: "clinic",ja: "診療所",ph: "/ˈklɪnɪk/",eiken: 2,pos: "名詞"},
      {en: "closet",ja: "クローゼット",ph: "/ˈklɑːzɪt/",eiken: 2,pos: "名詞"},
    ]
  },
  {
    id: "cl_onset2b",
    theme: "cl- ファミリー",
    words: [
      {en: "clumsy",ja: "不器用な",ph: "/ˈklʌmzi/",eiken: "p1",pos: "形容詞"},
      {en: "clutch",ja: "しっかりつかむ",ph: "/klʌtʃ/",eiken: 1,pos: "動詞"},
      {en: "classic",ja: "古典的な",ph: "/ˈklæsɪk/",eiken: 2,pos: "形容詞"},
      {en: "climate",ja: "気候",ph: "/ˈklaɪmət/",eiken: 2,pos: "名詞"},
      {en: "clothes",ja: "服",ph: "/kloʊz/",eiken: 4,pos: "名詞"},
      {en: "cluster",ja: "集団",ph: "/ˈklʌstər/",eiken: "p1",pos: "名詞"},
      {en: "clinical",ja: "臨床の",ph: "/ˈklɪnɪkəl/",eiken: 1,pos: "形容詞"},
      {en: "clandestine",ja: "秘密の",ph: "/klænˈdestɪn/",eiken: 1,pos: "形容詞"},
    ]
  },
  {
    id: "bl_onset2",
    theme: "bl- ファミリー",
    words: [
      {en: "blur",ja: "ぼやける",ph: "/blɜːr/",eiken: "p1",pos: "動詞"},
      {en: "blunt",ja: "率直な",ph: "/blʌnt/",eiken: 1,pos: "形容詞"},
      {en: "blanket",ja: "毛布",ph: "/ˈblæŋkɪt/",eiken: 3,pos: "名詞"},
      {en: "blatant",ja: "露骨な",ph: "/ˈbleɪtənt/",eiken: 1,pos: "形容詞"},
      {en: "blister",ja: "水ぶくれ",ph: "/ˈblɪstər/",eiken: 1,pos: "名詞"},
      {en: "blossom",ja: "花",ph: "/ˈblɑːsəm/",eiken: "p1",pos: "名詞"},
      {en: "blunder",ja: "大失敗",ph: "/ˈblʌndər/",eiken: 1,pos: "名詞"},
      {en: "blizzard",ja: "吹雪",ph: "/ˈblɪzərd/",eiken: "p1",pos: "名詞"},
    ]
  },
  {
    id: "br_onset2",
    theme: "br- ファミリー",
    words: [
      {en: "bribe",ja: "賄賂",ph: "/braɪb/",eiken: 1,pos: "名詞"},
      {en: "brief",ja: "短い",ph: "/briːf/",eiken: 2,pos: "形容詞"},
      {en: "brisk",ja: "きびきびした",ph: "/brɪsk/",eiken: 1,pos: "形容詞"},
      {en: "breath",ja: "息",ph: "/breθ/",eiken: 3,pos: "名詞"},
      {en: "breeze",ja: "そよ風",ph: "/briːz/",eiken: 2,pos: "名詞"},
      {en: "browse",ja: "閲覧する",ph: "/braʊz/",eiken: "p1",pos: "動詞"},
      {en: "bruise",ja: "あざ",ph: "/bruːz/",eiken: "p1",pos: "名詞"},
    ]
  },
  {
    id: "br_onset2b",
    theme: "br- ファミリー",
    words: [
      {en: "brutal",ja: "残忍な",ph: "/ˈbruːtəl/",eiken: "p1",pos: "形容詞"},
      {en: "breadth",ja: "幅",ph: "/bredθ/",eiken: 1,pos: "名詞"},
      {en: "breathe",ja: "呼吸する",ph: "/briːð/",eiken: 2,pos: "動詞"},
      {en: "brittle",ja: "もろい",ph: "/ˈbrɪtəl/",eiken: 1,pos: "形容詞"},
      {en: "brother",ja: "兄弟",ph: "/ˈbrʌðər/",eiken: 5,pos: "名詞"},
      {en: "brochure",ja: "パンフレット",ph: "/broʊˈʃʊr/",eiken: "p1",pos: "名詞"},
      {en: "brilliant",ja: "見事な",ph: "/ˈbrɪljənt/",eiken: 2,pos: "形容詞"},
      {en: "breakthrough",ja: "大躍進",ph: "/ˈbreɪkθruː/",eiken: "p1",pos: "名詞"},
    ]
  },
  {
    id: "cr_onset2",
    theme: "cr- ファミリー",
    words: [
      {en: "crawl",ja: "はう",ph: "/krɔːl/",eiken: "p1",pos: "動詞"},
      {en: "crazy",ja: "狂った",ph: "/ˈkreɪzi/",eiken: 3,pos: "形容詞"},
      {en: "crisp",ja: "パリッとした",ph: "/krɪsp/",eiken: "p1",pos: "形容詞"},
      {en: "crude",ja: "粗野な",ph: "/kruːd/",eiken: 1,pos: "形容詞"},
      {en: "cruel",ja: "残酷な",ph: "/ˈkruːəl/",eiken: 2,pos: "形容詞"},
      {en: "crumb",ja: "パンくず",ph: "/krʌm/",eiken: 1,pos: "名詞"},
      {en: "crayon",ja: "クレヨン",ph: "/ˈkreɪɑːn/",eiken: 4,pos: "名詞"},
      {en: "credit",ja: "信用",ph: "/ˈkredɪt/",eiken: 2,pos: "名詞"},
      {en: "crisis",ja: "危機",ph: "/ˈkraɪsɪs/",eiken: 2,pos: "名詞"},
      {en: "critic",ja: "批評家",ph: "/ˈkrɪtɪk/",eiken: 2,pos: "名詞"},
    ]
  },
  {
    id: "cr_onset2b",
    theme: "cr- ファミリー",
    words: [
      {en: "cruise",ja: "船旅",ph: "/kruːz/",eiken: 2,pos: "名詞"},
      {en: "crucial",ja: "極めて重要な",ph: "/ˈkruːʃəl/",eiken: "p1",pos: "形容詞"},
      {en: "crumble",ja: "崩れる",ph: "/ˈkrʌmbəl/",eiken: 1,pos: "動詞"},
      {en: "crystal",ja: "水晶",ph: "/ˈkrɪstəl/",eiken: 2,pos: "名詞"},
      {en: "credible",ja: "信用できる",ph: "/ˈkredəbəl/",eiken: 1,pos: "形容詞"},
      {en: "crackdown",ja: "取り締まり",ph: "/ˈkrækdaʊn/",eiken: 1,pos: "名詞"},
      {en: "criterion",ja: "基準",ph: "/kraɪˈtɪriən/",eiken: 1,pos: "名詞"},
      {en: "crocodile",ja: "ワニ",ph: "/ˈkrɑːkədaɪl/",eiken: 3,pos: "名詞"},
    ]
  },
  {
    id: "dr_onset2",
    theme: "dr- ファミリー",
    words: [
      {en: "dragon",ja: "ドラゴン",ph: "/ˈdræɡən/",eiken: 4,pos: "名詞"},
      {en: "drawer",ja: "引き出し",ph: "/drɔːr/",eiken: 3,pos: "名詞"},
      {en: "dreary",ja: "わびしい",ph: "/ˈdrɪri/",eiken: 1,pos: "形容詞"},
      {en: "drowsy",ja: "眠い",ph: "/ˈdraʊzi/",eiken: 1,pos: "形容詞"},
      {en: "drastic",ja: "思い切った",ph: "/ˈdræstɪk/",eiken: "p1",pos: "形容詞"},
      {en: "drawing",ja: "絵",ph: "/ˈdrɔːɪŋ/",eiken: 3,pos: "名詞"},
      {en: "dresser",ja: "鏡台",ph: "/ˈdresər/",eiken: 2,pos: "名詞"},
      {en: "drizzle",ja: "霧雨",ph: "/ˈdrɪzəl/",eiken: 1,pos: "名詞"},
      {en: "drought",ja: "干ばつ",ph: "/draʊt/",eiken: "p1",pos: "名詞"},
      {en: "drawback",ja: "欠点",ph: "/ˈdrɔːbæk/",eiken: 1,pos: "名詞"},
      {en: "dragonfly",ja: "トンボ",ph: "/ˈdræɡənflaɪ/",eiken: 3,pos: "名詞"},
    ]
  },
  {
    id: "fl_onset2",
    theme: "fl- ファミリー",
    words: [
      {en: "flu",ja: "インフルエンザ",ph: "/fluː/",eiken: 3,pos: "名詞"},
      {en: "flee",ja: "逃げる",ph: "/fliː/",eiken: "p1",pos: "動詞"},
      {en: "flair",ja: "才能",ph: "/fler/",eiken: 1,pos: "名詞"},
      {en: "flake",ja: "薄片",ph: "/fleɪk/",eiken: 1,pos: "名詞"},
      {en: "fluid",ja: "液体",ph: "/ˈfluːɪd/",eiken: "p1",pos: "名詞"},
      {en: "flavor",ja: "風味",ph: "/ˈfleɪvər/",eiken: 2,pos: "名詞"},
      {en: "fluffy",ja: "ふわふわの",ph: "/ˈflʌfi/",eiken: 2,pos: "形容詞"},
      {en: "flatten",ja: "平らにする",ph: "/ˈflætən/",eiken: 1,pos: "動詞"},
      {en: "flatter",ja: "お世辞を言う",ph: "/ˈflætər/",eiken: "p1",pos: "動詞"},
      {en: "fluctuate",ja: "変動する",ph: "/ˈflʌktʃueɪt/",eiken: 1,pos: "動詞"},
      {en: "flexibility",ja: "柔軟性",ph: "/ˌfleksəˈbɪləti/",eiken: "p1",pos: "名詞"},
    ]
  },
  {
    id: "gr_onset2",
    theme: "gr- ファミリー",
    words: [
      {en: "grain",ja: "穀物",ph: "/ɡreɪn/",eiken: 2,pos: "名詞"},
      {en: "grasp",ja: "つかむ",ph: "/ɡræsp/",eiken: "p1",pos: "動詞"},
      {en: "grief",ja: "深い悲しみ",ph: "/ɡriːf/",eiken: "p1",pos: "名詞"},
      {en: "grind",ja: "すりつぶす",ph: "/ɡraɪnd/",eiken: "p1",pos: "動詞"},
      {en: "gross",ja: "総計の",ph: "/ɡroʊs/",eiken: 1,pos: "形容詞"},
      {en: "greedy",ja: "欲張りな",ph: "/ˈɡriːdi/",eiken: 2,pos: "形容詞"},
      {en: "grieve",ja: "深く悲しむ",ph: "/ɡriːv/",eiken: 1,pos: "動詞"},
      {en: "gradual",ja: "徐々の",ph: "/ˈɡrædʒuəl/",eiken: 2,pos: "形容詞"},
      {en: "grammar",ja: "文法",ph: "/ˈɡræmər/",eiken: 3,pos: "名詞"},
    ]
  },
  {
    id: "gr_onset2b",
    theme: "gr- ファミリー",
    words: [
      {en: "grandma",ja: "おばあちゃん",ph: "/ˈɡrænmɑː/",eiken: 5,pos: "名詞"},
      {en: "grandpa",ja: "おじいちゃん",ph: "/ˈɡrænpɑː/",eiken: 5,pos: "名詞"},
      {en: "gravity",ja: "重力",ph: "/ˈɡrævəti/",eiken: 2,pos: "名詞"},
      {en: "grumble",ja: "不平を言う",ph: "/ˈɡrʌmbəl/",eiken: 1,pos: "動詞"},
      {en: "graduate",ja: "卒業する",ph: "/ˈɡrædʒueɪt/",eiken: 2,pos: "動詞"},
      {en: "grateful",ja: "感謝している",ph: "/ˈɡreɪtfəl/",eiken: 2,pos: "形容詞"},
      {en: "gruesome",ja: "ぞっとする",ph: "/ˈɡruːsəm/",eiken: 1,pos: "形容詞"},
      {en: "grievance",ja: "不満",ph: "/ˈɡriːvəns/",eiken: 1,pos: "名詞"},
    ]
  },
  {
    id: "pl_onset2",
    theme: "pl- ファミリー",
    words: [
      {en: "plead",ja: "嘆願する",ph: "/pliːd/",eiken: 1,pos: "動詞"},
      {en: "plague",ja: "疫病",ph: "/pleɪɡ/",eiken: 1,pos: "名詞"},
      {en: "planet",ja: "惑星",ph: "/ˈplænɪt/",eiken: 3,pos: "名詞"},
      {en: "pledge",ja: "誓約",ph: "/pledʒ/",eiken: 1,pos: "名詞"},
      {en: "plenty",ja: "たくさん",ph: "/ˈplenti/",eiken: 3,pos: "名詞"},
      {en: "plunge",ja: "突っ込む",ph: "/plʌndʒ/",eiken: 1,pos: "動詞"},
      {en: "plural",ja: "複数の",ph: "/ˈplʊrəl/",eiken: 2,pos: "形容詞"},
      {en: "plateau",ja: "高原",ph: "/plæˈtoʊ/",eiken: 1,pos: "名詞"},
      {en: "plumber",ja: "配管工",ph: "/ˈplʌmər/",eiken: 2,pos: "名詞"},
      {en: "plausible",ja: "もっともらしい",ph: "/ˈplɔːzəbəl/",eiken: 1,pos: "形容詞"},
      {en: "plentiful",ja: "豊富な",ph: "/ˈplentɪfəl/",eiken: "p1",pos: "形容詞"},
    ]
  },
  {
    id: "pr_onset2b",
    theme: "pr- ファミリー",
    words: [
      {en: "prudent",ja: "慎重な",ph: "/ˈpruːdənt/",eiken: 1,pos: "形容詞"},
      {en: "practice",ja: "練習する",ph: "/ˈpræktɪs/",eiken: 4,pos: "動詞"},
      {en: "prestige",ja: "名声",ph: "/preˈstiːʒ/",eiken: 1,pos: "名詞"},
      {en: "priority",ja: "優先事項",ph: "/praɪˈɔːrəti/",eiken: "p1",pos: "名詞"},
      {en: "pristine",ja: "手つかずの",ph: "/ˈprɪstiːn/",eiken: 1,pos: "形容詞"},
      {en: "probably",ja: "たぶん",ph: "/ˈprɑːbəbli/",eiken: 3,pos: "副詞"},
      {en: "prolific",ja: "多作の",ph: "/prəˈlɪfɪk/",eiken: 1,pos: "形容詞"},
      {en: "privilege",ja: "特権",ph: "/ˈprɪvəlɪdʒ/",eiken: "p1",pos: "名詞"},
    ]
  },
  {
    id: "sl_onset2",
    theme: "sl- ファミリー",
    words: [
      {en: "sly",ja: "ずる賢い",ph: "/slaɪ/",eiken: 1,pos: "形容詞"},
      {en: "sleepy",ja: "眠い",ph: "/ˈsliːpi/",eiken: 4,pos: "形容詞"},
      {en: "sleeve",ja: "そで",ph: "/sliːv/",eiken: 2,pos: "名詞"},
      {en: "slogan",ja: "標語",ph: "/ˈsloʊɡən/",eiken: "p1",pos: "名詞"},
      {en: "sloppy",ja: "ずさんな",ph: "/ˈslɑːpi/",eiken: 1,pos: "形容詞"},
      {en: "slender",ja: "ほっそりした",ph: "/ˈslendər/",eiken: 1,pos: "形容詞"},
      {en: "slipper",ja: "スリッパ",ph: "/ˈslɪpər/",eiken: 3,pos: "名詞"},
      {en: "slumber",ja: "眠り",ph: "/ˈslʌmbər/",eiken: 1,pos: "名詞"},
      {en: "slightly",ja: "わずかに",ph: "/ˈslaɪtli/",eiken: 2,pos: "副詞"},
      {en: "slippery",ja: "滑りやすい",ph: "/ˈslɪpəri/",eiken: 2,pos: "形容詞"},
      {en: "slaughter",ja: "虐殺",ph: "/ˈslɔːtər/",eiken: 1,pos: "名詞"},
    ]
  },
  {
    id: "sm_onset2",
    theme: "sm- ファミリー",
    words: [
      {en: "smog",ja: "スモッグ",ph: "/smɑːɡ/",eiken: 2,pos: "名詞"},
      {en: "smack",ja: "ぴしゃりと打つ",ph: "/smæk/",eiken: 1,pos: "動詞"},
      {en: "smear",ja: "塗りつける",ph: "/smɪr/",eiken: 1,pos: "動詞"},
      {en: "smirk",ja: "にやにや笑う",ph: "/smɜːrk/",eiken: 1,pos: "動詞"},
      {en: "smoky",ja: "煙い",ph: "/ˈsmoʊki/",eiken: 2,pos: "形容詞"},
      {en: "smoker",ja: "喫煙者",ph: "/ˈsmoʊkər/",eiken: 2,pos: "名詞"},
      {en: "smudge",ja: "汚れ",ph: "/smʌdʒ/",eiken: 1,pos: "名詞"},
      {en: "smitten",ja: "夢中になった",ph: "/ˈsmɪtən/",eiken: 1,pos: "形容詞"},
      {en: "smother",ja: "窒息させる",ph: "/ˈsmʌðər/",eiken: 1,pos: "動詞"},
      {en: "smuggle",ja: "密輸する",ph: "/ˈsmʌɡəl/",eiken: 1,pos: "動詞"},
      {en: "smoothly",ja: "滑らかに",ph: "/ˈsmuːðli/",eiken: 2,pos: "副詞"},
    ]
  },
  {
    id: "sn_onset2",
    theme: "sn- ファミリー",
    words: [
      {en: "snag",ja: "障害",ph: "/snæɡ/",eiken: 1,pos: "名詞"},
      {en: "snob",ja: "俗物",ph: "/snɑːb/",eiken: 1,pos: "名詞"},
      {en: "sniff",ja: "においをかぐ",ph: "/snɪf/",eiken: "p1",pos: "動詞"},
      {en: "sneaker",ja: "スニーカー",ph: "/ˈsniːkər/",eiken: 3,pos: "名詞"},
      {en: "snorkel",ja: "シュノーケル",ph: "/ˈsnɔːrkəl/",eiken: 2,pos: "名詞"},
      {en: "snapshot",ja: "スナップ写真",ph: "/ˈsnæpʃɑːt/",eiken: 1,pos: "名詞"},
    ]
  },
  {
    id: "sp_onset2",
    theme: "sp- ファミリー",
    words: [
      {en: "spicy",ja: "辛い",ph: "/ˈspaɪsi/",eiken: 3,pos: "形容詞"},
      {en: "spoil",ja: "台無しにする",ph: "/spɔɪl/",eiken: "p1",pos: "動詞"},
      {en: "sphere",ja: "球体",ph: "/sfɪr/",eiken: "p1",pos: "名詞"},
      {en: "spider",ja: "クモ",ph: "/ˈspaɪdər/",eiken: 3,pos: "名詞"},
      {en: "sponge",ja: "スポンジ",ph: "/spʌndʒ/",eiken: 2,pos: "名詞"},
      {en: "sparkle",ja: "輝く",ph: "/ˈspɑːrkəl/",eiken: "p1",pos: "動詞"},
      {en: "sparrow",ja: "スズメ",ph: "/ˈspæroʊ/",eiken: 2,pos: "名詞"},
    ]
  },
  {
    id: "sp_onset2b",
    theme: "sp- ファミリー",
    words: [
      {en: "speaker",ja: "話者",ph: "/ˈspiːkər/",eiken: 3,pos: "名詞"},
      {en: "species",ja: "種",ph: "/ˈspiːʃiːz/",eiken: 2,pos: "名詞"},
      {en: "spinach",ja: "ホウレンソウ",ph: "/ˈspɪnɪtʃ/",eiken: 3,pos: "名詞"},
      {en: "sponsor",ja: "スポンサー",ph: "/ˈspɑːnsər/",eiken: 2,pos: "名詞"},
      {en: "sporadic",ja: "散発的な",ph: "/spəˈrædɪk/",eiken: 1,pos: "形容詞"},
      {en: "spontaneous",ja: "自発的な",ph: "/spɑːnˈteɪniəs/",eiken: 1,pos: "形容詞"},
    ]
  },
  {
    id: "st_onset2",
    theme: "st- ファミリー",
    words: [
      {en: "stew",ja: "シチュー",ph: "/stuː/",eiken: 2,pos: "名詞"},
      {en: "steer",ja: "操縦する",ph: "/stɪr/",eiken: "p1",pos: "動詞"},
      {en: "stern",ja: "厳格な",ph: "/stɜːrn/",eiken: 1,pos: "形容詞"},
      {en: "stiff",ja: "硬い",ph: "/stɪf/",eiken: "p1",pos: "形容詞"},
      {en: "stable",ja: "安定した",ph: "/ˈsteɪbəl/",eiken: 2,pos: "形容詞"},
      {en: "stairs",ja: "階段",ph: "/sterz/",eiken: 4,pos: "名詞"},
      {en: "statue",ja: "像",ph: "/ˈstætʃuː/",eiken: 3,pos: "名詞"},
      {en: "status",ja: "地位",ph: "/ˈsteɪtəs/",eiken: "p1",pos: "名詞"},
      {en: "steady",ja: "安定した",ph: "/ˈstedi/",eiken: 2,pos: "形容詞"},
    ]
  },
  {
    id: "st_onset2b",
    theme: "st- ファミリー",
    words: [
      {en: "sticky",ja: "べとべとした",ph: "/ˈstɪki/",eiken: 2,pos: "形容詞"},
      {en: "stingy",ja: "けちな",ph: "/ˈstɪndʒi/",eiken: 1,pos: "形容詞"},
      {en: "sturdy",ja: "頑丈な",ph: "/ˈstɜːrdi/",eiken: 1,pos: "形容詞"},
      {en: "stadium",ja: "スタジアム",ph: "/ˈsteɪdiəm/",eiken: 3,pos: "名詞"},
      {en: "stamina",ja: "体力",ph: "/ˈstæmɪnə/",eiken: "p1",pos: "名詞"},
      {en: "stomach",ja: "胃",ph: "/ˈstʌmək/",eiken: 3,pos: "名詞"},
      {en: "stagnant",ja: "停滞した",ph: "/ˈstæɡnənt/",eiken: 1,pos: "形容詞"},
      {en: "stationery",ja: "文房具",ph: "/ˈsteɪʃəneri/",eiken: 2,pos: "名詞"},
      {en: "statistics",ja: "統計",ph: "/stəˈtɪstɪks/",eiken: "p1",pos: "名詞"},
      {en: "stereotype",ja: "固定観念",ph: "/ˈsteriətaɪp/",eiken: "p1",pos: "名詞"},
    ]
  },
  {
    id: "sw_onset2",
    theme: "sw- ファミリー",
    words: [
      {en: "swan",ja: "白鳥",ph: "/swɑːn/",eiken: 3,pos: "名詞"},
      {en: "swap",ja: "交換する",ph: "/swɑːp/",eiken: "p1",pos: "動詞"},
      {en: "sway",ja: "揺れる",ph: "/sweɪ/",eiken: 1,pos: "動詞"},
      {en: "swell",ja: "膨らむ",ph: "/swel/",eiken: "p1",pos: "動詞"},
      {en: "swirl",ja: "渦巻く",ph: "/swɜːrl/",eiken: 1,pos: "動詞"},
      {en: "sweater",ja: "セーター",ph: "/ˈswetər/",eiken: 4,pos: "名詞"},
      {en: "swiftly",ja: "素早く",ph: "/ˈswɪftli/",eiken: "p1",pos: "副詞"},
      {en: "swimmer",ja: "泳ぐ人",ph: "/ˈswɪmər/",eiken: 3,pos: "名詞"},
      {en: "swollen",ja: "腫れた",ph: "/ˈswoʊlən/",eiken: 1,pos: "形容詞"},
      {en: "swimsuit",ja: "水着",ph: "/ˈswɪmsuːt/",eiken: 3,pos: "名詞"},
    ]
  },
  {
    id: "tr_onset2",
    theme: "tr- ファミリー",
    words: [
      {en: "tray",ja: "お盆",ph: "/treɪ/",eiken: 2,pos: "名詞"},
      {en: "trait",ja: "特性",ph: "/treɪt/",eiken: 1,pos: "名詞"},
      {en: "trial",ja: "裁判",ph: "/ˈtraɪəl/",eiken: 2,pos: "名詞"},
      {en: "tribe",ja: "部族",ph: "/traɪb/",eiken: "p1",pos: "名詞"},
      {en: "truth",ja: "真実",ph: "/truːθ/",eiken: 3,pos: "名詞"},
      {en: "treaty",ja: "条約",ph: "/ˈtriːti/",eiken: 1,pos: "名詞"},
      {en: "trophy",ja: "トロフィー",ph: "/ˈtroʊfi/",eiken: 3,pos: "名詞"},
    ]
  },
  {
    id: "tr_onset2b",
    theme: "tr- ファミリー",
    words: [
      {en: "tragedy",ja: "悲劇",ph: "/ˈtrædʒədi/",eiken: "p1",pos: "名詞"},
      {en: "trigger",ja: "引き起こす",ph: "/ˈtrɪɡər/",eiken: "p1",pos: "動詞"},
      {en: "triumph",ja: "勝利",ph: "/ˈtraɪʌmf/",eiken: 1,pos: "名詞"},
      {en: "trivial",ja: "ささいな",ph: "/ˈtrɪviəl/",eiken: 1,pos: "形容詞"},
      {en: "trumpet",ja: "トランペット",ph: "/ˈtrʌmpɪt/",eiken: 3,pos: "名詞"},
      {en: "tranquil",ja: "静かな",ph: "/ˈtræŋkwɪl/",eiken: 1,pos: "形容詞"},
      {en: "trespass",ja: "不法侵入する",ph: "/ˈtrespəs/",eiken: 1,pos: "動詞"},
      {en: "triangle",ja: "三角形",ph: "/ˈtraɪæŋɡəl/",eiken: 3,pos: "名詞"},
      {en: "tropical",ja: "熱帯の",ph: "/ˈtrɑːpɪkəl/",eiken: 2,pos: "形容詞"},
      {en: "tradition",ja: "伝統",ph: "/trəˈdɪʃən/",eiken: 2,pos: "名詞"},
    ]
  },
  {
    id: "sh_onset2",
    theme: "sh- ファミリー",
    words: [
      {en: "shy",ja: "恥ずかしがりの",ph: "/ʃaɪ/",eiken: 3,pos: "形容詞"},
      {en: "shoe",ja: "靴",ph: "/ʃuː/",eiken: 5,pos: "名詞"},
      {en: "sharp",ja: "鋭い",ph: "/ʃɑːrp/",eiken: 3,pos: "形容詞"},
      {en: "sheep",ja: "ヒツジ",ph: "/ʃiːp/",eiken: 4,pos: "名詞"},
      {en: "sheer",ja: "全くの",ph: "/ʃɪr/",eiken: 1,pos: "形容詞"},
      {en: "shiny",ja: "ぴかぴかの",ph: "/ˈʃaɪni/",eiken: 3,pos: "形容詞"},
      {en: "shield",ja: "盾",ph: "/ʃiːld/",eiken: "p1",pos: "名詞"},
      {en: "shallow",ja: "浅い",ph: "/ˈʃæloʊ/",eiken: 2,pos: "形容詞"},
    ]
  },
  {
    id: "sh_onset2b",
    theme: "sh- ファミリー",
    words: [
      {en: "shampoo",ja: "シャンプー",ph: "/ʃæmˈpuː/",eiken: 3,pos: "名詞"},
      {en: "shatter",ja: "粉々にする",ph: "/ˈʃætər/",eiken: 1,pos: "動詞"},
      {en: "shelter",ja: "避難所",ph: "/ˈʃeltər/",eiken: 2,pos: "名詞"},
      {en: "shudder",ja: "身震いする",ph: "/ˈʃʌdər/",eiken: 1,pos: "動詞"},
      {en: "shuttle",ja: "定期往復便",ph: "/ˈʃʌtəl/",eiken: 2,pos: "名詞"},
      {en: "shopping",ja: "買い物",ph: "/ˈʃɑːpɪŋ/",eiken: 5,pos: "名詞"},
      {en: "shortage",ja: "不足",ph: "/ˈʃɔːrtɪdʒ/",eiken: 2,pos: "名詞"},
      {en: "shoulder",ja: "肩",ph: "/ˈʃoʊldər/",eiken: 3,pos: "名詞"},
      {en: "shortcoming",ja: "欠点",ph: "/ˈʃɔːrtkʌmɪŋ/",eiken: 1,pos: "名詞"},
    ]
  },
  {
    id: "ch_onset2",
    theme: "ch- ファミリー",
    words: [
      {en: "chew",ja: "かむ",ph: "/tʃuː/",eiken: 2,pos: "動詞"},
      {en: "chalk",ja: "チョーク",ph: "/tʃɔːk/",eiken: 3,pos: "名詞"},
      {en: "chaos",ja: "混沌",ph: "/ˈkeɪɑːs/",eiken: "p1",pos: "名詞"},
      {en: "chase",ja: "追いかける",ph: "/tʃeɪs/",eiken: 2,pos: "動詞"},
      {en: "cheap",ja: "安い",ph: "/tʃiːp/",eiken: 4,pos: "形容詞"},
      {en: "cheese",ja: "チーズ",ph: "/tʃiːz/",eiken: 4,pos: "名詞"},
      {en: "cherry",ja: "サクランボ",ph: "/ˈtʃeri/",eiken: 4,pos: "名詞"},
      {en: "chilly",ja: "肌寒い",ph: "/ˈtʃɪli/",eiken: "p1",pos: "形容詞"},
      {en: "chorus",ja: "合唱",ph: "/ˈkɔːrəs/",eiken: 2,pos: "名詞"},
    ]
  },
  {
    id: "ch_onset2b",
    theme: "ch- ファミリー",
    words: [
      {en: "channel",ja: "チャンネル",ph: "/ˈtʃænəl/",eiken: 2,pos: "名詞"},
      {en: "charity",ja: "慈善",ph: "/ˈtʃærəti/",eiken: 2,pos: "名詞"},
      {en: "chicken",ja: "ニワトリ",ph: "/ˈtʃɪkɪn/",eiken: 5,pos: "名詞"},
      {en: "chimney",ja: "煙突",ph: "/ˈtʃɪmni/",eiken: 2,pos: "名詞"},
      {en: "challenge",ja: "挑戦",ph: "/ˈtʃælɪndʒ/",eiken: 2,pos: "名詞"},
      {en: "character",ja: "性格",ph: "/ˈkærəktər/",eiken: 2,pos: "名詞"},
      {en: "chemistry",ja: "化学",ph: "/ˈkemɪstri/",eiken: 2,pos: "名詞"},
    ]
  },
  {
    id: "th_onset2",
    theme: "th- ファミリー",
    words: [
      {en: "theft",ja: "窃盗",ph: "/θeft/",eiken: 1,pos: "名詞"},
      {en: "theme",ja: "テーマ",ph: "/θiːm/",eiken: 2,pos: "名詞"},
      {en: "thief",ja: "泥棒",ph: "/θiːf/",eiken: 2,pos: "名詞"},
      {en: "thigh",ja: "太もも",ph: "/θaɪ/",eiken: 1,pos: "名詞"},
      {en: "thesis",ja: "論文",ph: "/ˈθiːsɪs/",eiken: 1,pos: "名詞"},
      {en: "thirty",ja: "30",ph: "/ˈθɜːrti/",eiken: 5,pos: "名詞"},
      {en: "theater",ja: "劇場",ph: "/ˈθiːətər/",eiken: 3,pos: "名詞"},
      {en: "therapy",ja: "治療",ph: "/ˈθerəpi/",eiken: "p1",pos: "名詞"},
    ]
  },
  {
    id: "th_onset2b",
    theme: "th- ファミリー",
    words: [
      {en: "thirsty",ja: "のどが渇いた",ph: "/ˈθɜːrsti/",eiken: 3,pos: "形容詞"},
      {en: "thunder",ja: "雷",ph: "/ˈθʌndər/",eiken: 3,pos: "名詞"},
      {en: "thirteen",ja: "13",ph: "/ˌθɜːrˈtiːn/",eiken: 5,pos: "名詞"},
      {en: "thorough",ja: "徹底的な",ph: "/ˈθɜːroʊ/",eiken: 1,pos: "形容詞"},
      {en: "thousand",ja: "1000",ph: "/ˈθaʊzənd/",eiken: 4,pos: "名詞"},
      {en: "therefore",ja: "それゆえ",ph: "/ˈðerfɔːr/",eiken: 2,pos: "副詞"},
      {en: "thoroughly",ja: "徹底的に",ph: "/ˈθɜːroʊli/",eiken: "p1",pos: "副詞"},
      {en: "thoughtful",ja: "思いやりのある",ph: "/ˈθɔːtfəl/",eiken: 2,pos: "形容詞"},
    ]
  },
  {
    id: "wh_onset2",
    theme: "wh- ファミリー",
    words: [
      {en: "who",ja: "誰",ph: "/huː/",eiken: 5,pos: "代名詞"},
      {en: "why",ja: "なぜ",ph: "/waɪ/",eiken: 5,pos: "副詞"},
      {en: "whim",ja: "気まぐれ",ph: "/wɪm/",eiken: 1,pos: "名詞"},
      {en: "whine",ja: "泣き言を言う",ph: "/waɪn/",eiken: 1,pos: "動詞"},
      {en: "whirl",ja: "ぐるぐる回る",ph: "/wɜːrl/",eiken: 1,pos: "動詞"},
      {en: "whose",ja: "誰の",ph: "/huːz/",eiken: 5,pos: "代名詞"},
      {en: "wholly",ja: "完全に",ph: "/ˈhoʊli/",eiken: 1,pos: "副詞"},
      {en: "whereas",ja: "〜である一方",ph: "/werˈæz/",eiken: "p1",pos: "接続詞"},
    ]
  },
  {
    id: "wh_onset2b",
    theme: "wh- ファミリー",
    words: [
      {en: "whether",ja: "〜かどうか",ph: "/ˈweðər/",eiken: 2,pos: "接続詞"},
      {en: "whisker",ja: "ひげ",ph: "/ˈwɪskər/",eiken: 1,pos: "名詞"},
      {en: "whoever",ja: "誰でも",ph: "/huːˈevər/",eiken: 2,pos: "代名詞"},
      {en: "whatever",ja: "何でも",ph: "/wʌtˈevər/",eiken: 2,pos: "代名詞"},
      {en: "whenever",ja: "いつでも",ph: "/wenˈevər/",eiken: 2,pos: "接続詞"},
      {en: "wherever",ja: "どこでも",ph: "/werˈevər/",eiken: 2,pos: "接続詞"},
      {en: "wholesale",ja: "卸売りの",ph: "/ˈhoʊlseɪl/",eiken: 1,pos: "形容詞"},
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
