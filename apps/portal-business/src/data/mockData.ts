import { ApplicationRecord, PermitCategory } from '../types';

export const PERMIT_CATEGORIES: PermitCategory[] = [
  {
    id: 'p-01',
    code: 'LIC-CNST-2026',
    titleTajik: 'Иҷозатнома барои фаъолияти сохтмонӣ ва лоиҳакашӣ (Категорияи I)',
    titleRussian: 'Лицензия на строительную и проектную деятельность (Категория I)',
    titleEnglish: 'Construction and Engineering Design Permit (Category I)',
    authority: 'Кумитаи меъморӣ ва сохтмони назди Ҳукумати ҶТ',
    sector: 'Сохтмон ва меъморӣ',
    processingDays: 7,
    feeTJS: 1200,
    validityYears: 3,
    requiredDocuments: [
      'Оиннома ва Шаҳодатномаи бақайдгирии давлатӣ',
      'Ҳуҷҷатҳо дар бораи тахассуси мутахассисон ва муҳандисон',
      'Шаҳодатномаи мавҷудияти таҷҳизоту техникаи сохтмонӣ',
      'Шартномаи суғуртаи масъулияти гражданиву касбӣ'
    ],
    description: 'Иҷозатномаи расмӣ барои сохтмони биноҳои истиқоматӣ, ҷамъиятӣ ва саноатӣ дар қаламрави Ҷумҳурии Тоҷикистон.'
  },
  {
    id: 'p-02',
    code: 'LIC-FOOD-2026',
    titleTajik: 'Шаҳодатномаи бехатарии маҳсулоти хӯрокворӣ ва гигиена (Фитосанитарӣ)',
    titleRussian: 'Сертификат безопасности пищевых продуктов и гигиены',
    titleEnglish: 'Food Safety and Sanitary Compliance Certificate',
    authority: 'Хадамоти назорати давлатии санитариву эпидемиологӣ',
    sector: 'Истеҳсолот ва хӯроки омма',
    processingDays: 3,
    feeTJS: 450,
    validityYears: 1,
    requiredDocuments: [
      'Аризаи намунавӣ ва нусхаи ШИНИ соҳибкор',
      'Хулосаи азназаргузаронии гигиении бино ва таҷҳизот',
      'Китобчаҳои тиббии кормандон',
      'Нақшаи назорати сифат ва амнияти истеҳсолот (HACCP)'
    ],
    description: 'Барои корхонаҳои хӯроки омма, коркарди маҳсулоти кишоварзӣ ва мағозаҳои маҳсулоти хӯрокворӣ.'
  },
  {
    id: 'p-03',
    code: 'LIC-TRSP-2026',
    titleTajik: 'Иҷозатнома барои фаъолияти боркашонӣ ва мусофирбарии байналмилалӣ',
    titleRussian: 'Лицензия на международные грузовые и пассажирские перевозки',
    titleEnglish: 'International Transport & Freight Operator License',
    authority: 'Вазорати нақлиёти Ҷумҳурии Тоҷикистон',
    sector: 'Нақлиёт ва логистика',
    processingDays: 5,
    feeTJS: 850,
    validityYears: 2,
    requiredDocuments: [
      'Ҳуҷҷатҳои тасдиқкунандаи моликияти воситаҳои нақлиёт',
      'Шаҳодатномаи муоинаи техникии нақлиёт',
      'Гувоҳномаи ронандагии дараҷаи дахлдори ронандагон',
      'Полиси суғуртаи байналмилалии CMR'
    ],
    description: 'Иҷозати расмӣ барои ҳамлу нақли байнишаҳрӣ ва байналмилалии бор ва мусофирон.'
  },
  {
    id: 'p-04',
    code: 'LIC-TELE-2026',
    titleTajik: 'Иҷозатнома барои хизматрасонии алоқаи телекоммуникатсионӣ ва Интернет',
    titleRussian: 'Лицензия на телекоммуникационные услуги и Интернет',
    titleEnglish: 'Telecommunications & ISP Operating Permit',
    authority: 'Хадамоти алоқаи назди Ҳукумати Ҷумҳурии Тоҷикистон',
    sector: 'Технологияҳои алоқа ва IT',
    processingDays: 10,
    feeTJS: 2500,
    validityYears: 5,
    requiredDocuments: [
      'Лоиҳаи техникии шабакаи алоқа',
      'Шаҳодатномаи мувофиқати таҷҳизоти радиоэлектронӣ',
      'Азназаргузаронии бехатарии киберӣ ва маълумот'
    ],
    description: 'Барои провайдерҳои интернетӣ, операторони алоқа ва хизматрасониҳои додаҳо.'
  },
  {
    id: 'p-05',
    code: 'LIC-MEDC-2026',
    titleTajik: 'Иҷозатнома барои фаъолияти фарматсевтӣ ва фурӯши доруворӣ',
    titleRussian: 'Лицензия на фармацевтическую деятельность и аптечную сеть',
    titleEnglish: 'Pharmaceutical & Pharmacy Retail Permit',
    authority: 'Хадамоти назорати давлатии фаъолияти фарматсевтӣ',
    sector: 'Тандурустӣ ва фарматсевтика',
    processingDays: 8,
    feeTJS: 1600,
    validityYears: 3,
    requiredDocuments: [
      'Дипломи фарматсевтии роҳбар ва дорусозон',
      'Шартномаи иҷора ё моликияти бинои дорухона',
      'Шаҳодатномаи риояи шароити нигоҳдории доруҳо (температура ва намнокӣ)'
    ],
    description: 'Барои кушодани дорухонаҳо, нигоҳдорӣ ва воридоти воситаҳои табобатӣ.'
  },
  {
    id: 'p-06',
    code: 'LIC-EXPL-2026',
    titleTajik: 'Иҷозати тиҷорати хориҷӣ (Импорт / Экспорт ва расмиёти гумрукӣ)',
    titleRussian: 'Разрешение на внешнеэкономическую деятельность (Импорт/Экспорт)',
    titleEnglish: 'Foreign Trade & Customs Clearance Authorization',
    authority: 'Хадамоти гумруки назди Ҳукумати Ҷумҳурии Тоҷикистон',
    sector: 'Тиҷорат ва гумрук',
    processingDays: 2,
    feeTJS: 350,
    validityYears: 1,
    requiredDocuments: [
      'Шартномаи тиҷоратии байналмилалӣ (Контракт)',
      'Гувоҳномаи пайдоиши мол (Certificate of Origin)',
      'Ҳисобнома-фактура (Invoice)'
    ],
    description: 'Барои содирот ва воридоти молҳо тавассути сарҳади давлатии Ҷумҳурии Тоҷикистон.'
  }
];

export const MOCK_APPLICATIONS: ApplicationRecord[] = [
  {
    id: 'app-101',
    applicationNumber: 'TJ-REG-2026-0884',
    type: 'registration',
    title: 'Бақайдгирии ҶДММ "Сомон Сохтмон ва Сифат"',
    category: 'Ҷамъияти дорои масъулияти маҳдуд (ҶДММ)',
    submittedDate: '2026-08-01',
    updatedDate: '2026-08-05',
    status: 'approved',
    processingStage: 'Бақайдгирӣ пурра анҷом ёфт. Шаҳодатнома дода шуд.',
    progressPercent: 100,
    applicantName: 'Раҳимов Алишер Ҷамшедович',
    tin: '040058912',
    feeAmount: 320,
    paymentStatus: 'paid',
    certificateNumber: 'E-REG-TJ-2026-994102',
    details: {
      businessType: 'llc',
      fullNameTajik: 'Ҷамъияти дорои масъулияти маҳдуди "Сомон Сохтмон ва Сифат"',
      fullNameRussian: 'Общество с ограниченной ответственностью "Сомон Сохтмон ва Сифат"',
      fullNameEnglish: 'Somon Construction & Quality LLC',
      shortName: 'ҶДММ "Сомон Сохтмон"',
      economicSector: 'Сохтмони биноҳо ва иншоот',
      primaryActivityCode: '41.20',
      founderName: 'Раҳимов Алишер Ҷамшедович',
      founderPassport: 'A0987654',
      founderTin: '040058912',
      founderCitizenship: 'Ҷумҳурии Тоҷикистон',
      founderShare: 100,
      directorName: 'Раҳимов Алишер Ҷамшедович',
      directorPassport: 'A0987654',
      directorPhone: '+992 93 555 1234',
      directorEmail: 'alisher@somon-build.tj',
      authorizedCapital: 10000,
      region: 'ш. Душанбе',
      cityDistrict: 'Ноҳияи Исмоили Сомонӣ',
      streetAddress: 'кӯчаи Рӯдакӣ, бинои 45',
      officeNumber: '12',
      addressProofType: 'lease_agreement',
      addressProofFileName: 'Ijora_Rudaki45.pdf',
      taxRegime: 'simplified',
      taxOfficeRegion: 'Мақомоти андози н. Исмоили Сомонӣ',
      selectedBank: 'КВД СБ ҶТ "Амонатбонк"',
      accountCurrency: 'TJS',
      declarationAgreed: true,
      eSignatureKeyId: 'EKEY-TJ-8841-XYZ'
    }
  },
  {
    id: 'app-102',
    applicationNumber: 'TJ-PERM-2026-0419',
    type: 'permit',
    title: 'Иҷозатнома барои фаъолияти сохтмонӣ (Категорияи I)',
    category: 'Сохтмон ва меъморӣ',
    submittedDate: '2026-08-04',
    updatedDate: '2026-08-06',
    status: 'under_review',
    processingStage: 'Азназаргузаронии ҳуҷҷатҳо дар Кумитаи меъморӣ ва сохтмон',
    progressPercent: 65,
    applicantName: 'Раҳимов Алишер Ҷамшедович (ҶДММ "Сомон Сохтмон")',
    tin: '040058912',
    feeAmount: 1200,
    paymentStatus: 'paid',
    notes: 'Ҳуҷҷатҳои техникии муҳандисон тасдиқ шуданд. Санҷиши майдони сохтмон ба нақша гирифта шудааст.'
  },
  {
    id: 'app-103',
    applicationNumber: 'TJ-REG-2026-0912',
    type: 'registration',
    title: 'Бақайдгирии Соҳибкори инфиродӣ "Зарифзода Парвиз"',
    category: 'Соҳибкори инфиродӣ (СИ)',
    submittedDate: '2026-08-05',
    updatedDate: '2026-08-06',
    status: 'action_required',
    processingStage: 'Интизории ворид кардани маълумоти иловагии шиноснома',
    progressPercent: 40,
    applicantName: 'Зарифзода Парвиз Неъматович',
    tin: '035091823',
    feeAmount: 150,
    paymentStatus: 'pending',
    notes: 'Лутфан нусхаи скани шиносномаро бо суроғаи истиқомат боргирӣ намоед.'
  },
  {
    id: 'app-104',
    applicationNumber: 'TJ-PERM-2026-0390',
    type: 'permit',
    title: 'Шаҳодатномаи бехатарии маҳсулоти хӯрокворӣ ва гигиена',
    category: 'Истеҳсолот ва хӯроки омма',
    submittedDate: '2026-07-28',
    updatedDate: '2026-07-30',
    status: 'approved',
    processingStage: 'Шаҳодатномаи фитосанитарӣ дода шуд.',
    progressPercent: 100,
    applicantName: 'ҶДММ "Помир Оби Пок"',
    tin: '050011944',
    feeAmount: 450,
    paymentStatus: 'paid',
    certificateNumber: 'SAN-CERT-TJ-2026-4411'
  }
];

export const TAJIK_REGIONS = [
  'ш. Душанбе',
  'Вилояти Суғд',
  'Вилояти Хатлон',
  'ВМКБ (Вилояти Мухтори Кӯҳистони Бадахшон)',
  'Ноҳияҳои тобеи марказ (НТМ)'
];

export const SECTORS_LIST = [
  'Сохтмон ва меъморӣ',
  'Истеҳсолот ва саноат',
  'Кишоварзӣ ва агробизнес',
  'Технологияҳои иттилоотӣ (IT) ва алоқа',
  'Тиҷорат ва хизматрасонӣ',
  'Тандурустӣ ва фарматсевтика',
  'Нақлиёт ва логистика',
  'Туризм ва меҳмоннавозӣ',
  'Маориф ва омӯзиш'
];

export const TAJIK_BANKS = [
  'КВД СБ ҶТ "Амонатбонк"',
  'ОАО "Ориёнбонк"',
  'ЗАО "Алиф Банк"',
  'ЗАО "Банк Эсхата"',
  'ЗАО "Международный Банк Таджикистана"',
  'ЗАО "Спитамен Банк"'
];
