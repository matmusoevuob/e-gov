export type Language = 'TJ' | 'EN' | 'UZ' | 'RU';

export interface ServiceItemTranslation {
  title: string;
  description: string;
  department: string;
  processingTime: string;
  category: string;
}

export interface DocumentTranslation {
  title: string;
  issuer: string;
}

export interface Translations {
  // Navigation & Header
  portalTitle: string;
  portalSubtitle: string;
  citizenHub: string;
  servicesCatalog: string;
  govidWallet: string;
  officerConsole: string;
  eIdVerified: string;
  officerMode: string;
  citizenMode: string;
  searchPlaceholder: string;
  systemOperational: string;
  securityProtocol: string;
  quickShortcuts: string;
  notificationsTitle: string;
  markAllRead: string;
  
  // Dashboard
  welcomeTitle: string;
  welcomeDesc: string;
  activeApps: string;
  underReview: string;
  verifiedCredentials: string;
  issuedDocs: string;
  govpayBalance: string;
  noFeesDue: string;
  nextAppointment: string;
  nextAppointmentDesc: string;
  newApplicationBtn: string;
  applicationRecords: string;
  securityAuditTrail: string;
  popularServices: string;
  viewDetailsBtn: string;

  // Table & Status
  thServiceTitle: string;
  thRefCode: string;
  thSubmitted: string;
  thStatus: string;
  thAction: string;
  statusApproved: string;
  statusInAudit: string;
  statusPendingReview: string;
  statusRejected: string;

  // Wizard & Buttons
  cancelBtn: string;
  previousBtn: string;
  nextStepBtn: string;
  executeSignBtn: string;
  signingProgress: string;
  approveAppBtn: string;
  rejectAppBtn: string;
  downloadPdfBtn: string;
  generateQrBtn: string;
  hideQrBtn: string;

  // Wizard Detail Strings
  step1Title: string;
  step2Title: string;
  step3Title: string;
  step4Title: string;
  nationalIdLabel: string;
  applicantNameLabel: string;
  emailLabel: string;
  dragUploadPrompt: string;
  uploadAcceptedTypes: string;
  serviceProcessingFee: string;
  treasuryLevy: string;
  totalPayable: string;
  pkiBindingTitle: string;
  pkiNotice: string;
  submittedSuccessTitle: string;
  submittedSuccessDesc: string;
  refCodeLabel: string;
  xroadTxLabel: string;

  // Categories
  catAll: string;
  catIdentity: string;
  catBusiness: string;
  catTax: string;
  catTransport: string;
  catHealth: string;
  catHousing: string;

  // Vault
  digitalPassTitle: string;
  officialVerificationQr: string;
  scanQrPrompt: string;
  cardholderName: string;
  docNumberLabel: string;
  expiryDateLabel: string;
  issuerLabel: string;
  clickToFlip: string;

  // Officer Portal
  officerConsoleTitle: string;
  triageQueueTitle: string;
  pendingAuditCount: string;
  approvedTodayCount: string;
  auditConsoleTitle: string;
  verifiedAttachments: string;
  decisionRecorded: string;

  // GovBot Assistant
  botName: string;
  botOnlineStatus: string;
  botWelcomeMessage: string;
  botInputPlaceholder: string;
  passportReply: string;
  businessReply: string;
  taxReply: string;
  defaultReply: string;

  // Vault Documents
  vaultDocs: Record<string, DocumentTranslation>;

  // Services
  services: Record<string, ServiceItemTranslation>;
}

export const translations: Record<Language, Translations> = {
  TJ: {
    portalTitle: 'Портали Ягонаи Ҳукумати Электронӣ (gov.tj)',
    portalSubtitle: 'ХИЗМАТҲОИ ДАВЛАТӢ ВА ИДЕНТИФИКАТСИЯИ ДИҶИТАЛИИ ҶУМҲУРИИ ТОҶИКИСТОН',
    citizenHub: 'Кабинети Шаҳрванд',
    servicesCatalog: 'Каталоги Хизматрасониҳо',
    govidWallet: 'Ҳамёни GovID',
    officerConsole: 'Консоли Мутахассис',
    eIdVerified: 'e-ID Тасдиқшуда',
    officerMode: 'Реҷими Мутахассис',
    citizenMode: 'Реҷими Шаҳрванд',
    searchPlaceholder: 'Ҷустуҷӯи хизматрасониҳои давлатӣ ва ҳуҷҷатҳо...',
    systemOperational: 'Система Фаъол Аст',
    securityProtocol: 'Протоколи Бехатарӣ: X-Road v6 (gov.tj)',
    quickShortcuts: 'ХИЗМАТҲОИ ТЕЗФАҲМ',
    notificationsTitle: 'Огоҳиномаҳо',
    markAllRead: 'Ҳамаро хондашуда ҳисоб кардан',

    welcomeTitle: 'Хуш омадед, Сомони Раҳматов',
    welcomeDesc: 'Идоракунии ҳуҷҷатҳои диҷиталии расмӣ ва пайгирии аризаҳо тавассути системаи ягонаи давлатии X-Road (gov.tj).',
    activeApps: 'Аризаҳои Фаъол',
    underReview: 'Дар Баррасии Мутахассис',
    verifiedCredentials: 'Ҳуҷҷатҳои Тасдиқшуда',
    issuedDocs: 'Ҳуҷҷатҳои Додашуда',
    govpayBalance: 'Баланси Ҳисоби GovPay',
    noFeesDue: 'Қарз Ворид Нашудааст',
    nextAppointment: 'Қабули Навбатӣ',
    nextAppointmentDesc: 'Соати 10:30 • Идораи Сабти Ҳолати Фуқарои Душанбе',
    newApplicationBtn: 'Ирсоли Аризаи Нав',
    applicationRecords: 'Рӯйхати Аризаҳо',
    securityAuditTrail: 'Журнали Аудити Бехатарӣ',
    popularServices: 'Хизматрасониҳои Машҳур',
    viewDetailsBtn: 'Дидани Муфассал',

    thServiceTitle: 'Номи Хизматрасонӣ',
    thRefCode: 'Коди Ариза',
    thSubmitted: 'Санаи Ирсол',
    thStatus: 'Мақом',
    thAction: 'Амал',
    statusApproved: 'ТАСДИҚШУДА',
    statusInAudit: 'ДАР САНҶИШ',
    statusPendingReview: 'ДАР БАРРАСӢ',
    statusRejected: 'РАДШУДА',

    cancelBtn: 'Рад кардан ва Баргаштан ба Портал',
    previousBtn: 'Баргаштан ба Марҳилаи Қаблӣ',
    nextStepBtn: 'Тасдиқ ва Гузариш ба Марҳилаи Нав',
    executeSignBtn: 'Гузоштани Имзои Рақамии ЭРИ ва Ирсол',
    signingProgress: 'Имзокунии рамзӣ ва ирсол тавассути X-Road...',
    approveAppBtn: 'Тасдиқи Шаҳодатнома ва Додани Ҳуҷҷат',
    rejectAppBtn: 'Рад кардани Ариза бо Эзоҳ',
    downloadPdfBtn: 'Боргирии PDF-и Имзошудаи Расмӣ',
    generateQrBtn: 'Сохтани QR-коди Тасдиқ',
    hideQrBtn: 'Пинҳон кардани QR-код',

    step1Title: 'Марҳилаи 1: Тасдиқи Маълумоти e-ID Шаҳрванд',
    step2Title: 'Марҳилаи 2: Боргирии Ҳуҷҷатҳо ва Санҷиши X-Road',
    step3Title: 'Марҳилаи 3: Пардохти Боҷи Давлатӣ тавассути GovPay',
    step4Title: 'Марҳилаи 4: Гузоштани Имзои Рақамии ЭРИ',
    nationalIdLabel: 'Рақами e-ID-и Миллӣ',
    applicantNameLabel: 'Ному Насаби Аризадиҳанда (Дар e-ID)',
    emailLabel: 'Почтаи Электронии Расмӣ (gov.tj)',
    dragUploadPrompt: 'Барои боргирии ҳуҷҷати зарурӣ пахш кунед',
    uploadAcceptedTypes: 'Форматҳо: PDF, PNG, Файли Сертификати ЭРИ (Макс 10MB)',
    serviceProcessingFee: 'Боҷи Хизматрасонӣ',
    treasuryLevy: 'Боҷи Хазинадорӣ',
    totalPayable: 'Маблағи Умумии Пардохт тавассути GovPay',
    pkiBindingTitle: 'Пайвасткунии Сертификати Рақамии ЭРИ X.509',
    pkiNotice: 'Гузоштани имзои рақамӣ саҳеҳии ҳуҷҷатҳоро мувоқиқи қонунгузории Ҷумҳурии Тоҷикистон тасдиқ мекунад.',
    submittedSuccessTitle: 'Ариза Бо Муваффақият Ирсол Шуд!',
    submittedSuccessDesc: 'Аризаи шумо бо имзои рақамӣ тасдиқ шуда, тавассути системаи X-Road ба вазорат фиристода шуд.',
    refCodeLabel: 'Коди Расмии Истинод',
    xroadTxLabel: 'ID-и Транзаксияи X-Road',

    catAll: 'ҲАМАИ ХИЗМАТҲО',
    catIdentity: 'Шахсият',
    catBusiness: 'Тиҷорат',
    catTax: 'Андоз',
    catTransport: 'Транспорт',
    catHealth: 'Тандурустӣ',
    catHousing: 'Манзил',

    digitalPassTitle: 'Шаҳодатномаи Расмии Шахсият',
    officialVerificationQr: 'QR-коди Расмии Тасдиқ',
    scanQrPrompt: 'Скан кардан дар терминали нозирон барои санҷиши ЭРИ',
    cardholderName: 'СОМОНИ РАҲМАТОВ',
    docNumberLabel: 'РАҚАМИ ҲУҶҶАТ',
    expiryDateLabel: 'МӮҲЛАТИ ЭЪТИБОР',
    issuerLabel: 'ОРГАНИ ДИҲАНДА',
    clickToFlip: 'Барои чаппа кардан пахш кунед ↺',

    officerConsoleTitle: 'Консоли Мутахассиси Вазорат оид ба Баррасии Аризаҳо',
    triageQueueTitle: 'Рӯйхати Аризаҳо барои Баррасӣ',
    pendingAuditCount: 'Аризаҳои Интизорӣ',
    approvedTodayCount: 'Тасдиқшудаҳои Имрӯз',
    auditConsoleTitle: 'Консоли Аудит ва Санҷиши Ариза',
    verifiedAttachments: 'Ҳуҷҷатҳои Замимашудаи Тасдиқшуда',
    decisionRecorded: 'Қарори Сабтшуда',

    botName: 'Ёрдамчии Виртуалӣ GovBot',
    botOnlineStatus: '● 24/7 Фаъол',
    botWelcomeMessage: 'Салом! Ман ёрдамчии виртуалии GovBot мебошам. Чӣ тавр ба шумо дар бораи хизматрасониҳои давлатии Тоҷикистон кумак кунам?',
    botInputPlaceholder: 'Савол диҳед (паспорт, тиҷорат, андоз)...',
    passportReply: 'Барои ивази паспорти биометрӣ сурати нав ва боҷи 45$ тавассути GovPay лозим аст. Муҳлат: 3 рӯзи корӣ.',
    businessReply: 'Рӯйхатгирии ҶДММ 24 соат вақт мегирад. СИН-и тиҷоратӣ ба таври худкор сохта мешавад.',
    taxReply: 'Супоридани декларацияи андоз бе ройгон иҷро мешавад. Ҳисобкунӣ худкор аст.',
    defaultReply: 'Барои истифодаи ин хизматрасонӣ ба каталоги хизматрасониҳо гузаред ва аризаро пур кунед.',

    vaultDocs: {
      doc_id: {
        title: 'Гувоҳномаи Диҷиталии Шахсият (e-ID)',
        issuer: 'Вазорати Корҳои Дохилии Ҷумҳурии Тоҷикистон'
      },
      doc_dl: {
        title: 'Шаҳодатномаи Биометрии Ронандагӣ (Категорияи B)',
        issuer: 'Раёсати Бозрасии Давлатии Автомобилӣ'
      },
      doc_health: {
        title: 'Картаи Умумии Суғуртаи Тиббии Давлатӣ',
        issuer: 'Вазорати Тандурустӣ ва Ҳифзи Иҷтимоӣ'
      },
      doc_tax: {
        title: 'Шаҳодатномаи СИН (СУП)-и Андозсупоранда',
        issuer: 'Кумитаи Андози Назди Ҳукумати ҶТ'
      }
    },

    services: {
      srv_passport: {
        title: 'Иваз ва Додани Паспорти Биометрӣ',
        description: 'Расидан ва тасдиқи паспорти биометрии миллӣ тавассути ЭРИ.',
        department: 'Вазорати Корҳои Дохилии Ҷумҳурии Тоҷикистон',
        processingTime: '3 Рӯзи Корӣ',
        category: 'Шахсият'
      },
      srv_business: {
        title: 'Рӯйхатгирии ҶДММ (Бизнес)',
        description: 'Тайёр кардани ҳуҷҷатҳо ва гирифтани СИН-и тиҷоратӣ.',
        department: 'Вазорати Танзими Иқтисод ва Савдо',
        processingTime: '24 Соат',
        category: 'Тиҷорат'
      },
      srv_tax: {
        title: 'Супоридани Декларатсияи Андоз аз Даромад',
        description: 'Ҳисоби худкори андоз ва пардохт тавассути GovPay.',
        department: 'Кумитаи Андози Назди Ҳукумати Ҷумҳурии Тоҷикистон',
        processingTime: 'Фаврӣ',
        category: 'Андоз'
      },
      srv_driver: {
        title: 'Ивази Шаҳодатномаи Ронандагӣ',
        description: 'Санҷиши худкори маълумотномаи тиббӣ тавассути X-Road.',
        department: 'Бозрасии Давлатии Автомобилии ВКИ ҶТ',
        processingTime: '1 Рӯзи Корӣ',
        category: 'Транспорт'
      },
      srv_health: {
        title: 'Гирифтани Картаи Суғуртаи Тиббӣ',
        description: 'Аъзогӣ ба системаи тиббии давлатӣ.',
        department: 'Вазорати Тандурустӣ ва Ҳифзи Иҷтимоии Аҳолӣ',
        processingTime: 'Фаврӣ',
        category: 'Тандурустӣ'
      },
      srv_property: {
        title: 'Маълумотномаи Кадастри Мулк',
        description: 'Иқтибоси расмии кадастрӣ оид ба моликияти манзил.',
        department: 'Кумитаи ДКМ ва Аэродезияи ҶТ',
        processingTime: '2 Соат',
        category: 'Манзил'
      }
    }
  },
  EN: {
    portalTitle: 'e-Gov Tajikistan Portal (gov.tj)',
    portalSubtitle: 'REPUBLIC OF TAJIKISTAN PUBLIC SERVICES & DIGITAL IDENTITY GATEWAY',
    citizenHub: 'Citizen Hub',
    servicesCatalog: 'Services Catalog',
    govidWallet: 'GovID Wallet',
    officerConsole: 'Officer Console',
    eIdVerified: 'e-ID Verified',
    officerMode: 'Officer Mode',
    citizenMode: 'Citizen Mode',
    searchPlaceholder: 'Search official Tajikistan services, e-ID records, permits...',
    systemOperational: 'System Operational',
    securityProtocol: 'Security Protocol: X-Road v6 (gov.tj)',
    quickShortcuts: 'QUICK SHORTCUTS',
    notificationsTitle: 'Notifications',
    markAllRead: 'Mark all as read',

    welcomeTitle: 'Welcome, Somoni Rahmatov',
    welcomeDesc: 'Manage your official Tajikistan digital identity, submit public service applications, and track status via X-Road inter-agency bus (gov.tj).',
    activeApps: 'Active Applications',
    underReview: 'Under Officer Review',
    verifiedCredentials: 'Verified Credentials',
    issuedDocs: 'Issued Credentials',
    govpayBalance: 'GovPay Account Balance',
    noFeesDue: 'No Outstanding Fees',
    nextAppointment: 'Next Civil Appointment',
    nextAppointmentDesc: '10:30 AM • Dushanbe Civil Registry Hall',
    newApplicationBtn: 'Start New Application',
    applicationRecords: 'Application Records',
    securityAuditTrail: 'Security Audit Trail',
    popularServices: 'Popular Services',
    viewDetailsBtn: 'Inspect Record',

    thServiceTitle: 'Service Title',
    thRefCode: 'Reference Code',
    thSubmitted: 'Submitted',
    thStatus: 'Status',
    thAction: 'Action',
    statusApproved: 'APPROVED',
    statusInAudit: 'IN AUDIT',
    statusPendingReview: 'PENDING REVIEW',
    statusRejected: 'REJECTED',

    cancelBtn: 'Discard & Return to Portal',
    previousBtn: 'Return to Previous Step',
    nextStepBtn: 'Confirm & Proceed to Next Step',
    executeSignBtn: 'Execute PKI Digital Signature & Transmit',
    signingProgress: 'Cryptographically Signing & Transmitting via X-Road...',
    approveAppBtn: 'Issue Official Certificate & Stamp Approval',
    rejectAppBtn: 'Reject Application with Note',
    downloadPdfBtn: 'Download Signed Official PDF',
    generateQrBtn: 'Generate Verification QR Code',
    hideQrBtn: 'Hide Verification QR Code',

    step1Title: 'Step 1: Applicant Profile & e-ID Verification',
    step2Title: 'Step 2: Document Upload & X-Road Auto Audit',
    step3Title: 'Step 3: GovPay Treasury Clearing Fee Payment',
    step4Title: 'Step 4: PKI Cryptographic Digital Signature (e-Sign)',
    nationalIdLabel: 'National e-ID Number',
    applicantNameLabel: 'Applicant Name (e-ID Registered)',
    emailLabel: 'Official Notification Email (gov.tj)',
    dragUploadPrompt: 'Click to upload required supporting document',
    uploadAcceptedTypes: 'Accepted: PDF, PNG, PKI Certificate File (Max 10MB)',
    serviceProcessingFee: 'Service Processing Fee',
    treasuryLevy: 'Treasury Clearing Levy',
    totalPayable: 'Total Payable via GovPay',
    pkiBindingTitle: 'X.509 PKI Digital Certificate Binding',
    pkiNotice: 'Executing this digital signature legally certifies document authenticity under Tajikistan state regulations.',
    submittedSuccessTitle: 'Application Successfully Transmitted!',
    submittedSuccessDesc: 'Your application has been cryptographically signed and routed to the ministry review queue via X-Road.',
    refCodeLabel: 'Official Reference Code',
    xroadTxLabel: 'X-Road Transaction ID',

    catAll: 'ALL SERVICES',
    catIdentity: 'Identity',
    catBusiness: 'Business',
    catTax: 'Tax',
    catTransport: 'Transport',
    catHealth: 'Health',
    catHousing: 'Housing',

    digitalPassTitle: 'Official Pass Card',
    officialVerificationQr: 'Official Verification QR Code',
    scanQrPrompt: 'Scan via official inspector terminal to verify PKI hash',
    cardholderName: 'SOMONI RAHMATOV',
    docNumberLabel: 'DOCUMENT NO.',
    expiryDateLabel: 'EXPIRY DATE',
    issuerLabel: 'ISSUING AUTHORITY',
    clickToFlip: 'Click card to flip ↺',

    officerConsoleTitle: 'Ministry Officer Application Triage & Audit Console',
    triageQueueTitle: 'Application Review Queue',
    pendingAuditCount: 'Pending Audit',
    approvedTodayCount: 'Approved Today',
    auditConsoleTitle: 'Application Inspection Console',
    verifiedAttachments: 'Verified Attachments',
    decisionRecorded: 'Decision Recorded',

    botName: 'GovBot Virtual Assistant',
    botOnlineStatus: '● Online 24/7',
    botWelcomeMessage: 'Hello! I am GovBot. How can I assist you with Tajikistan public services, e-ID, or business registry today?',
    botInputPlaceholder: 'Ask a question (passport, business, tax)...',
    passportReply: 'Biometric passport renewal requires a new photo and $45 fee via GovPay. Processing time: 3 business days.',
    businessReply: 'LLC entity registration takes 24 hours. Commercial TIN is generated automatically.',
    taxReply: 'Annual tax return e-filing is free of charge with automated tax calculations.',
    defaultReply: 'To use this service, please navigate to the Services Catalog and submit an application.',

    vaultDocs: {
      doc_id: {
        title: 'National Digital Identity Pass (e-ID)',
        issuer: 'Ministry of Internal Affairs of Republic of Tajikistan'
      },
      doc_dl: {
        title: 'Biometric Driver\'s License (Category B)',
        issuer: 'State Traffic Inspection (GAI Tajikistan)'
      },
      doc_health: {
        title: 'Universal Health Insurance Card',
        issuer: 'Ministry of Health & Social Protection'
      },
      doc_tax: {
        title: 'Taxpayer Registration Certificate (TIN)',
        issuer: 'Tax Committee under Government of Tajikistan'
      }
    },

    services: {
      srv_passport: {
        title: 'Biometric E-Passport Renewal & Issue',
        description: 'Apply for or renew official biometric national e-passport with digital signature verification.',
        department: 'Ministry of Internal Affairs of Republic of Tajikistan',
        processingTime: '3 Business Days',
        category: 'Identity'
      },
      srv_business: {
        title: 'LLC Business Entity Registration',
        description: 'Instant digital company incorporation, TIN assignment, and automated commercial registry listing.',
        department: 'Ministry of Economic Development & Trade',
        processingTime: '24 Hours',
        category: 'Business'
      },
      srv_tax: {
        title: 'Annual Income Tax Return E-Filing',
        description: 'Automated tax calculations, deductions check, and GovPay digital treasury clearing.',
        department: 'Tax Committee under Government of Tajikistan',
        processingTime: 'Instant',
        category: 'Tax'
      },
      srv_driver: {
        title: "Digital Driver's License Renewal",
        description: "Renew category B driver's permit with automatic medical certificate verification via X-Road.",
        department: 'State Traffic Inspection (GAI Tajikistan)',
        processingTime: '1 Business Day',
        category: 'Transport'
      },
      srv_health: {
        title: 'National Health Insurance Card Issue',
        description: 'Enroll in state digital health coverage and assign primary care clinic.',
        department: 'Ministry of Health & Social Protection',
        processingTime: 'Instant',
        category: 'Health'
      },
      srv_property: {
        title: 'Land Title & Real Estate Registry Check',
        description: 'Extract official electronic land property ownership certificate with cryptographic verification watermark.',
        department: 'State Land Committee of Tajikistan',
        processingTime: '2 Hours',
        category: 'Housing'
      }
    }
  },
  RU: {
    portalTitle: 'Единый Портал Электронного Правительства (gov.tj)',
    portalSubtitle: 'ГОСУДАРСТВЕННЫЕ УСЛУГИ И ЦИФРОВАЯ ИДЕНТИФИКАЦИЯ РЕСПУБЛИКИ ТАДЖИКИСТАН',
    citizenHub: 'Кабинет Гражданина',
    servicesCatalog: 'Каталог Услуг',
    govidWallet: 'Кошелек GovID',
    officerConsole: 'Консоль Оператора',
    eIdVerified: 'e-ID Подтвержден',
    officerMode: 'Режим Оператора',
    citizenMode: 'Режим Гражданина',
    searchPlaceholder: 'Поиск государственных услуг, e-ID и разрешений в Таджикистане...',
    systemOperational: 'Система Работает',
    securityProtocol: 'Протокол Безопасности: X-Road v6 (gov.tj)',
    quickShortcuts: 'БЫСТРЫЕ УСЛУГИ',
    notificationsTitle: 'Уведомления',
    markAllRead: 'Отметить все как прочитанные',

    welcomeTitle: 'Добро пожаловать, Сомони Рахматов',
    welcomeDesc: 'Управляйте цифровыми документами Республики Таджикистан, подавайте заявления и отслеживайте статус через X-Road (gov.tj).',
    activeApps: 'Активные Заявления',
    underReview: 'На Рассмотрении Оператора',
    verifiedCredentials: 'Подтвержденные Документы',
    issuedDocs: 'Выданные Документы',
    govpayBalance: 'Баланс Счета GovPay',
    noFeesDue: 'Задолженность Отсутствует',
    nextAppointment: 'Следующий Прием',
    nextAppointmentDesc: '10:30 • Зал Гражданской Регистрации Душанбе',
    newApplicationBtn: 'Подать Новое Заявление',
    applicationRecords: 'Реестр Заявлений',
    securityAuditTrail: 'Журнал Аудита Безопасности',
    popularServices: 'Популярные Услуги',
    viewDetailsBtn: 'Просмотреть Заявление',

    thServiceTitle: 'Наименование Услуги',
    thRefCode: 'Код Заявления',
    thSubmitted: 'Дата Подачи',
    thStatus: 'Статус',
    thAction: 'Действие',
    statusApproved: 'УТВЕРЖДЕНО',
    statusInAudit: 'В ПРОВЕРКЕ',
    statusPendingReview: 'НА РАССМОТРЕНИИ',
    statusRejected: 'ОТКЛОНЕНО',

    cancelBtn: 'Отменить и Вернуться на Портал',
    previousBtn: 'Вернуться к Предыдущему Шагу',
    nextStepBtn: 'Подтвердить и Перейти к Следующему Шагу',
    executeSignBtn: 'Выполнить ЭЦП Подписание и Отправить',
    signingProgress: 'Выполняется ЭЦП подписание через X-Road...',
    approveAppBtn: 'Утвердить Заявление и Выдать Документ',
    rejectAppBtn: 'Отклонить Заявление с Примечанием',
    downloadPdfBtn: 'Скачать Подписанный Официальный PDF',
    generateQrBtn: 'Сформировать Проверочный QR-код',
    hideQrBtn: 'Скрыть QR-код',

    step1Title: 'Шаг 1: Проверка Данных e-ID Гражданина',
    step2Title: 'Шаг 2: Загрузка Документов и Проверка X-Road',
    step3Title: 'Шаг 3: Оплата Государственной Пошлины GovPay',
    step4Title: 'Шаг 4: ЭЦП Подписание Документа',
    nationalIdLabel: 'Номер Национального e-ID',
    applicantNameLabel: 'ФИО Заявителя (Зарегистрировано в e-ID)',
    emailLabel: 'Официальный Email для Уведомлений (gov.tj)',
    dragUploadPrompt: 'Нажмите для загрузки необходимого документа',
    uploadAcceptedTypes: 'Форматы: PDF, PNG, Файл Сертификата ЭЦП (Макс 10MB)',
    serviceProcessingFee: 'Пошлина за Услугу',
    treasuryLevy: 'Казначейский Сбор',
    totalPayable: 'Итого к Оплате через GovPay',
    pkiBindingTitle: 'Привязка Сертификата ЭЦП X.509',
    pkiNotice: 'Выполнение ЭЦП подтверждает подлинность документов в соответствии с законодательством Республики Таджикистан.',
    submittedSuccessTitle: 'Заявление Успешно Отправлено!',
    submittedSuccessDesc: 'Ваше заявление подписано ЭЦП и отправлено в ведомство через систему X-Road.',
    refCodeLabel: 'Официальный Код Ссылки',
    xroadTxLabel: 'ID Транзакции X-Road',

    catAll: 'ВСЕ УСЛУГИ',
    catIdentity: 'Удостоверение',
    catBusiness: 'Бизнес',
    catTax: 'Налоги',
    catTransport: 'Транспорт',
    catHealth: 'Здравоохранение',
    catHousing: 'Недвижимость',

    digitalPassTitle: 'Официальное Удостоверение Личности',
    officialVerificationQr: 'Официальный Проверочный QR-код',
    scanQrPrompt: 'Сканируйте через терминал инспектора для проверки ЭЦП',
    cardholderName: 'СОМОНИ РАХМАТОВ',
    docNumberLabel: 'НОМЕР ДОКУМЕНТА',
    expiryDateLabel: 'СРОК ДЕЙСТВИЯ',
    issuerLabel: 'ВЫДАВШИЙ ОРГАН',
    clickToFlip: 'Нажмите для переворота ↺',

    officerConsoleTitle: 'Консоль Оператора Ведомства по Рассмотрению Заявлений',
    triageQueueTitle: 'Очередь Заявлений на Рассмотрение',
    pendingAuditCount: 'Ожидают Аудита',
    approvedTodayCount: 'Утверждено Сегодня',
    auditConsoleTitle: 'Консоль Проверки и Аудита Заявления',
    verifiedAttachments: 'Подтвержденные Вложения',
    decisionRecorded: 'Зафиксированное Решение',

    botName: 'Виртуальный Помощник GovBot',
    botOnlineStatus: '● 24/7 Онлайн',
    botWelcomeMessage: 'Здравствуйте! Я виртуальный помощник GovBot. Чем могу помочь вам по госуслугам Республики Таджикистан?',
    botInputPlaceholder: 'Задайте вопрос (паспорт, бизнес, налоги)...',
    passportReply: 'Для замены биометрического паспорта необходимо новое фото и пошлина 45$ через GovPay. Срок: 3 рабочих дня.',
    businessReply: 'Регистрация ООО занимает 24 часа. ИНН присваивается автоматически.',
    taxReply: 'Подача налоговой декларации бесплатна. Расчет налога выполняется автоматически.',
    defaultReply: 'Для получения этой услуги перейдите в каталог услуг и заложите заявление.',

    vaultDocs: {
      doc_id: {
        title: 'Национальное Цифровое Удостоверение Личности (e-ID)',
        issuer: 'Министерство Внутренних Дел Республики Таджикистан'
      },
      doc_dl: {
        title: 'Биометрическое Водительское Удостоверение (Категория B)',
        issuer: 'УГАИ МВД Республики Таджикистан'
      },
      doc_health: {
        title: 'Единая Карта Медицинского Страхования',
        issuer: 'Министерство Здравоохранения и Соцзащиты РТ'
      },
      doc_tax: {
        title: 'Свидетельство ИНН Налогоплательщика',
        issuer: 'Налоговый Комитет при Правительстве РТ'
      }
    },

    services: {
      srv_passport: {
        title: 'Оформление и Выдача Биометрического Паспорта',
        description: 'Подача заявления на биометрический паспорт Республики Таджикистан.',
        department: 'Министерство Внутренних Дел Республики Таджикистан',
        processingTime: '3 Рабочих Дня',
        category: 'Удостоверение'
      },
      srv_business: {
        title: 'Регистрация ООО (Бизнес Субъекта)',
        description: 'Онлайн регистрация юридического лица и получение ИНН в Таджикистане.',
        department: 'Министерство Экономического Развития и Торговли РТ',
        processingTime: '24 Часа',
        category: 'Бизнес'
      },
      srv_tax: {
        title: 'Подача Налоговой Декларации',
        description: 'Расчет налогов и оплата пошлины через GovPay.',
        department: 'Налоговый Комитет при Правительстве РТ',
        processingTime: 'Мгновенно',
        category: 'Налоги'
      },
      srv_driver: {
        title: 'Замена Водительского Удостоверения',
        description: 'Автоматическая проверка медицинской справки через X-Road.',
        department: 'УГАИ МВД Республики Таджикистан',
        processingTime: '1 Рабочий День',
        category: 'Транспорт'
      },
      srv_health: {
        title: 'Оформление Карты Медицинского Страхования',
        description: 'Регистрация в системе медпомощи Республики Таджикистан.',
        department: 'Министерство Здравоохранения и Соцзащиты РТ',
        processingTime: 'Мгновенно',
        category: 'Здравоохранение'
      },
      srv_property: {
        title: 'Выписка из Кадастра Недвижимости',
        description: 'Официальная электронная выписка о правах на собственность.',
        department: 'Государственный Земельный Комитет РТ',
        processingTime: '2 Часа',
        category: 'Недвижимость'
      }
    }
  },
  UZ: {
    portalTitle: 'Tojikiston E-Hukumat Portali (gov.tj)',
    portalSubtitle: 'TOJIKISTON RESPUBLIKASI DAVLAT XIZMATLARI VA RAQAMLI SHAXS PORTALI',
    citizenHub: 'Fuqaro Kabineti',
    servicesCatalog: 'Xizmatlar Katalogi',
    govidWallet: 'GovID Hamyoni',
    officerConsole: 'Boshqaruv Konsoli',
    eIdVerified: 'e-ID Tasdiqlangan',
    officerMode: 'Xodim Rejimi',
    citizenMode: 'Fuqaro Rejimi',
    searchPlaceholder: 'Tojikiston davlat xizmatlari va e-ID hujjatlarini qidirish...',
    systemOperational: 'Tizim Ishlamoqda',
    securityProtocol: 'Xavfsizlik Protokoli: X-Road v6 (gov.tj)',
    quickShortcuts: 'TEZKOR XIZMATLAR',
    notificationsTitle: 'Bildirishnomalar',
    markAllRead: 'Hammasini o‘qilgan qilish',

    welcomeTitle: 'Xush kelibsiz, Somoni Rahmatov',
    welcomeDesc: 'Tojikiston Respublikasi raqamli shaxsingizni boshqaring va X-Road tizimi orqali kuzating (gov.tj).',
    activeApps: 'Faol Arizalar',
    underReview: 'Xodim Ko‘rib Chiqmoqda',
    verifiedCredentials: 'Tasdiqlangan Hujjatlar',
    issuedDocs: 'Berilgan Hujjatlar',
    govpayBalance: 'GovPay Hisob Balansi',
    noFeesDue: 'Qarzdorlik Yo‘q',
    nextAppointment: 'Navbatdagi Qabul',
    nextAppointmentDesc: 'Soat 10:30 • Dushanbe Fuqarolik Holati Idorasi',
    newApplicationBtn: 'Yangi Ariza Topshirish',
    applicationRecords: 'Arizalar Ro‘yxati',
    securityAuditTrail: 'Xavfsizlik Auditi Jurnali',
    popularServices: 'Ommabop Xizmatlar',
    viewDetailsBtn: 'Arizani Ko‘rish',

    thServiceTitle: 'Xizmat Nomi',
    thRefCode: 'Ariza Kodi',
    thSubmitted: 'Topshirilgan Sana',
    thStatus: 'Holati',
    thAction: 'Amal',
    statusApproved: 'TASDIQLANDI',
    statusInAudit: 'TEKSHIRUVDA',
    statusPendingReview: 'KO‘RIB CHIQILMOQDA',
    statusRejected: 'RAD ETILDI',

    cancelBtn: 'Bekor Qilish va Portalga Qaytish',
    previousBtn: 'Oldingi Bosqichga Qaytish',
    nextStepBtn: 'Tasdiqlash va Keyingi Bosqichga O‘tish',
    executeSignBtn: 'ERI Raqamli Imzo Bilan Tasdiqlash',
    signingProgress: 'X-Road orqali imzolanmoqda va yuborilmoqda...',
    approveAppBtn: 'Rasmiy Hujjatni Tasdiqlash va Berish',
    rejectAppBtn: 'Arizani Izoh Bilan Rad Etish',
    downloadPdfBtn: 'Imzolangan Rasmiy PDF Hujjatni Yuklash',
    generateQrBtn: 'QR Tekshiruv Kodini Yaratish',
    hideQrBtn: 'QR Kodni Yashirish',

    step1Title: '1-Bosqich: Fuqaro e-ID Ma’lumotlarini Tasdiqlash',
    step2Title: '2-Bosqich: Hujjatlarni Yuklash va X-Road Tekshiruvi',
    step3Title: '3-Bosqich: GovPay Davlat Bojini To‘lash',
    step4Title: '4-Bosqich: ERI Raqamli Imzo Bilan Tasdiqlash',
    nationalIdLabel: 'Milliy e-ID Raqami',
    applicantNameLabel: 'Ariza Beruvchi Ismi (e-ID Tizimida)',
    emailLabel: 'Rasmiy Elektron Pochtasi (gov.tj)',
    dragUploadPrompt: 'Kerakli hujjatni yuklash uchun bosing',
    uploadAcceptedTypes: 'Formatlar: PDF, PNG, ERI Sertifikat Fayli (Maks 10MB)',
    serviceProcessingFee: 'Xizmat Boji',
    treasuryLevy: 'Xazinachilik Boji',
    totalPayable: 'GovPay Orqali To‘lanadigan Jami Summa',
    pkiBindingTitle: 'X.509 ERI Sertifikatini Biriktirish',
    pkiNotice: 'Raqamli imzo qo‘yish Tojikiston Respublikasi qonunchiligiga muvofiq hujjatlar haqqoniyligini tasdiqlaydi.',
    submittedSuccessTitle: 'Ariza Muvaffaqiyatli Yuborildi!',
    submittedSuccessDesc: 'Arizangiz raqamli imzo bilan tasdiqlandi va X-Road orqali vazirlikka yuborildi.',
    refCodeLabel: 'Rasmiy Havola Kodi',
    xroadTxLabel: 'X-Road Tranzaksiya ID',

    catAll: 'BARCHA XIZMATLAR',
    catIdentity: 'Shaxsiyat',
    catBusiness: 'Biznes',
    catTax: 'Soliq',
    catTransport: 'Transport',
    catHealth: 'Sog‘liqni Saqlash',
    catHousing: 'Uy-Joy',

    digitalPassTitle: 'Rasmiy Shaxsiy Guvohnoma',
    officialVerificationQr: 'Rasmiy QR Tekshiruv Kodi',
    scanQrPrompt: 'ERI kodini tekshirish uchun inspektor terminalida skanerlang',
    cardholderName: 'SOMONI RAHMATOV',
    docNumberLabel: 'HUJJAT RAQAMI',
    expiryDateLabel: 'AMAL QILISH MUDDATI',
    issuerLabel: 'BERGAN TASHKILOT',
    clickToFlip: 'Aylantirish uchun bosing ↺',

    officerConsoleTitle: 'Vazirlik Xodimining Arizalarni Ko‘rib Chiqish Konsoli',
    triageQueueTitle: 'Ko‘rib Chiqiladigan Arizalar Ro‘yxati',
    pendingAuditCount: 'Kutilayotgan Arizalar',
    approvedTodayCount: 'Bugun Tasdiqlanganlar',
    auditConsoleTitle: 'Ariza Auditi va Tekshiruv Konsoli',
    verifiedAttachments: 'Tasdiqlangan Ilova Hujjatlar',
    decisionRecorded: 'Saqlangan Qaror',

    botName: 'GovBot Virtual Yordamchisi',
    botOnlineStatus: '● 24/7 Onlayn',
    botWelcomeMessage: 'Assalomu alaykum! Men GovBot virtual yordamchisiman. Sizga Tojikiston davlat xizmatlari bo‘yicha qanday yordam bera olaman?',
    botInputPlaceholder: 'Savol bering (pasport, biznes, soliq)...',
    passportReply: 'Biometrik pasportni almashtirish uchun yangi fotosurat va GovPay orqali 45$ boj kerak. Muddat: 3 ish kuni.',
    businessReply: 'MCHJ ro‘yxatdan o‘tkazish 24 soat vaqt oladi. STIR raqami avtomatik beriladi.',
    taxReply: 'Soliq deklaratsiyasini topshirish bepul. Avtomatik hisob-kitob qilinadi.',
    defaultReply: 'Ushbu xizmatdan foydalanish uchun xizmatlar katalogiga o‘ting va arizani to‘ldiring.',

    vaultDocs: {
      doc_id: {
        title: 'Milliy Raqamli Guvohnoma Pass (e-ID)',
        issuer: 'Tojikiston Respublikasi Ichki Ishlar Vazirligi'
      },
      doc_dl: {
        title: 'Biometrik Haydovchilik Guvohnomasi (B Kategoriya)',
        issuer: 'Tojikiston Yo‘l Harakati Xavfsizligi (GAI)'
      },
      doc_health: {
        title: 'Davlat Umumiy Tibbiy Sug‘urta Kartasi',
        issuer: 'Sog‘liqni Saqlash va Aholi Ijtimoiy Himoyasi Vazirligi'
      },
      doc_tax: {
        title: 'Soliq To‘lovchi STIR Guvohnomasi',
        issuer: 'Tojikiston Respublikasi Soliq Qo‘mitasi'
      }
    },

    services: {
      srv_passport: {
        title: 'Biometrik Pasportni Yangilash va Berish',
        description: 'Tojikiston Respublikasi biometrik fuqarolik pasportini rasmiylashtirish.',
        department: 'Tojikiston Respublikasi Ichki Ishlar Vazirligi',
        processingTime: '3 Ish Kuni',
        category: 'Shaxsiyat'
      },
      srv_business: {
        title: 'MCHJ Biznes Subyektini Ro‘yxatdan O‘tkazish',
        description: 'Kompaniyani onlayn ro‘yxatdan o‘tkazish va STIR raqamini olish.',
        department: 'Tojikiston Iqtisodiy Rivojlanish Vazirligi',
        processingTime: '24 Soat',
        category: 'Biznes'
      },
      srv_tax: {
        title: 'Yillik Daromad Soliq Deklaratsiyasini Topshirish',
        description: 'Avtomatik soliq hisob-kitobi va GovPay orqali to‘lov qilish.',
        department: 'Tojikiston Respublikasi Soliq Qo‘mitasi',
        processingTime: 'Zudlik bilan',
        category: 'Soliq'
      },
      srv_driver: {
        title: 'Haydovchilik Guvohnomasini Yangilash',
        description: 'X-Road orqali tibbiy ma’lumotnomani tekshirish bilan almashtirish.',
        department: 'Tojikiston Yo‘l Harakati Xavfsizligi (GAI)',
        processingTime: '1 Ish Kuni',
        category: 'Transport'
      },
      srv_health: {
        title: 'Tibbiy Sug‘urta Kartasini Olish',
        description: 'Tojikiston davlat bepul tibbiy xizmatlar tizimiga biriktirish.',
        department: 'Sog‘liqni Saqlash va Aholi Ijtimoiy Himoyasi Vazirligi',
        processingTime: 'Zudlik bilan',
        category: 'Sog‘liqni Saqlash'
      },
      srv_property: {
        title: 'Ko‘chmas Mulk Kadastr Ma’lumotnomasini Olish',
        description: 'Mulk egaligi haqida rasmiy elektron kadastr ko‘chirmasi.',
        department: 'Tojikiston Respublikasi Davlat Yer Qo‘mitasi',
        processingTime: '2 Soat',
        category: 'Uy-Joy'
      }
    }
  }
};
