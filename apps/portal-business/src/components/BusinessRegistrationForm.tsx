import React, { useState } from 'react';
import { BusinessRegistrationData, BusinessType } from '../types';
import { TAJIK_REGIONS, SECTORS_LIST, TAJIK_BANKS } from '../data/mockData';
import { 
  Building2, 
  User, 
  MapPin, 
  Receipt, 
  ShieldCheck, 
  ArrowRight, 
  ArrowLeft, 
  CheckCircle2, 
  FileText, 
  Upload, 
  Key, 
  Sparkles, 
  AlertCircle,
  Download
} from 'lucide-react';

interface FormProps {
  onSubmitSuccess: (newApp: any) => void;
  onCancel: () => void;
}

const INITIAL_DATA: BusinessRegistrationData = {
  businessType: 'llc',
  fullNameTajik: '',
  fullNameRussian: '',
  fullNameEnglish: '',
  shortName: '',
  economicSector: SECTORS_LIST[0],
  primaryActivityCode: '41.20',
  founderName: '',
  founderPassport: '',
  founderTin: '',
  founderCitizenship: 'Ҷумҳурии Тоҷикистон',
  founderShare: 100,
  directorName: '',
  directorPassport: '',
  directorPhone: '+992 ',
  directorEmail: '',
  authorizedCapital: 10000,
  region: TAJIK_REGIONS[0],
  cityDistrict: 'Ноҳияи Исмоили Сомонӣ',
  streetAddress: '',
  officeNumber: '',
  addressProofType: 'lease_agreement',
  addressProofFileName: '',
  taxRegime: 'simplified',
  taxOfficeRegion: 'Мақомоти андози н. Исмоили Сомонӣ',
  selectedBank: TAJIK_BANKS[0],
  accountCurrency: 'TJS',
  declarationAgreed: false,
  eSignatureKeyId: ''
};

export const BusinessRegistrationForm: React.FC<FormProps> = ({ onSubmitSuccess, onCancel }) => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [formData, setFormData] = useState<BusinessRegistrationData>(INITIAL_DATA);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [eKeyVerified, setEKeyVerified] = useState<boolean>(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [generatedAppNumber, setGeneratedAppNumber] = useState<string>('');

  const updateField = (field: keyof BusinessRegistrationData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => {
        const newErr = { ...prev };
        delete newErr[field];
        return newErr;
      });
    }
  };

  const autofillSampleData = () => {
    setFormData({
      businessType: 'llc',
      fullNameTajik: 'Ҷамъияти дорои масъулияти маҳдуди "Памир ИТ Технолоҷиз"',
      fullNameRussian: 'Общество с ограниченной ответственностью "Памир ИТ Технологии"',
      fullNameEnglish: 'Pamir IT Technologies LLC',
      shortName: 'ҶДММ "Памир ИТ"',
      economicSector: 'Технологияҳои иттилоотӣ (IT) ва алоқа',
      primaryActivityCode: '62.01',
      founderName: 'Мирзоев Фирӯз Ғафурович',
      founderPassport: 'A0472198',
      founderTin: '030091823',
      founderCitizenship: 'Ҷумҳурии Тоҷикистон',
      founderShare: 100,
      directorName: 'Мирзоев Фирӯз Ғафурович',
      directorPassport: 'A0472198',
      directorPhone: '+992 90 777 4422',
      directorEmail: 'firuz@pamir-it.tj',
      authorizedCapital: 25000,
      region: 'ш. Душанбе',
      cityDistrict: 'Ноҳияи Шохмансур',
      streetAddress: 'кӯчаи Айни, бинои 14A',
      officeNumber: '304',
      addressProofType: 'lease_agreement',
      addressProofFileName: 'Dogovor_Ijora_Ayni14.pdf',
      taxRegime: 'simplified',
      taxOfficeRegion: 'Мақомоти андози н. Шохмансур',
      selectedBank: 'ЗАО "Алиф Банк"',
      accountCurrency: 'TJS',
      declarationAgreed: true,
      eSignatureKeyId: 'EKEY-TJ-2026-8819'
    });
    setEKeyVerified(true);
  };

  const validateStep = (step: number): boolean => {
    const errs: Record<string, string> = {};

    if (step === 1) {
      if (!formData.fullNameTajik.trim()) errs.fullNameTajik = 'Номи пурраи тоҷикиро ворид кунед';
      if (!formData.shortName.trim()) errs.shortName = 'Номи кӯтоҳшударо ворид кунед';
    } else if (step === 2) {
      if (!formData.founderName.trim()) errs.founderName = 'Номи пурраи муассисро ворид кунед';
      if (!formData.founderPassport.trim()) errs.founderPassport = 'Рақами шиноснома лозим аст';
      if (!formData.directorName.trim()) errs.directorName = 'Номи директори иҷроияро ворид кунед';
    } else if (step === 3) {
      if (!formData.streetAddress.trim()) errs.streetAddress = 'Суроғаи кӯча ва биноро ворид намоед';
      if (formData.authorizedCapital < 500) errs.authorizedCapital = 'Сармояи низомномавӣ бояд аз 500 сомонӣ кам набошад';
    } else if (step === 4) {
      if (!formData.selectedBank) errs.selectedBank = 'Бонкро барои кушодани ҳисоб интихоб кунед';
    } else if (step === 5) {
      if (!formData.declarationAgreed) errs.declarationAgreed = 'Бояд бо шартҳо ва эъломия розигӣ диҳед';
      if (!eKeyVerified) errs.eSignatureKeyId = 'Калиди рақамии E-Key-ро тасдиқ кунед';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, 5));
    }
  };

  const handlePrev = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = () => {
    if (!validateStep(5)) return;

    setIsSubmitting(true);
    setTimeout(() => {
      const appNum = `TJ-REG-2026-${Math.floor(1000 + Math.random() * 9000)}`;
      setGeneratedAppNumber(appNum);
      setIsSubmitting(false);
      setIsSubmitted(true);

      const newAppRecord = {
        id: `app-${Date.now()}`,
        applicationNumber: appNum,
        type: 'registration',
        title: `Бақайдгирии ${formData.shortName}`,
        category: formData.businessType === 'llc' ? 'Ҷамъияти дорои масъулияти маҳдуд (ҶДММ)' : 'Соҳибкори инфиродӣ (СИ)',
        submittedDate: new Date().toISOString().split('T')[0],
        updatedDate: new Date().toISOString().split('T')[0],
        status: 'under_review',
        processingStage: 'Ирсол ба Мақомоти андоз ва Вазорати адлия барои санҷиши худкор',
        progressPercent: 35,
        applicantName: formData.founderName,
        tin: formData.founderTin || '040089123',
        feeAmount: 320,
        paymentStatus: 'paid',
        details: formData
      };

      onSubmitSuccess(newAppRecord);
    }, 1500);
  };

  if (isSubmitted) {
    return (
      <div className="glass-panel rounded-2xl p-8 max-w-2xl mx-auto text-center space-y-6 animate-fade-in my-8">
        <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 rounded-full flex items-center justify-center mx-auto ring-8 ring-emerald-50 dark:ring-emerald-900/30">
          <CheckCircle2 className="w-10 h-10" />
        </div>

        <div>
          <span className="px-3 py-1 bg-emerald-100 text-emerald-800 dark:bg-emerald-900/50 dark:text-emerald-300 text-xs font-bold rounded-full uppercase tracking-wider">
            Дархост бо муваффақият қабул шуд
          </span>
          <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white mt-3">
            Ариза барои бақайдгирии давлатӣ сабт гардид!
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">
            Рақами ягонаи пайгирии аризаи шумо: <strong className="text-emerald-600 dark:text-emerald-400 font-mono text-base">{generatedAppNumber}</strong>
          </p>
        </div>

        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-left text-xs space-y-2">
          <div className="font-bold text-slate-800 dark:text-slate-200">Маълумоти мухтасари ариза:</div>
          <div className="grid grid-cols-2 gap-2 text-slate-600 dark:text-slate-400">
            <div>Номи корхона: <span className="font-semibold text-slate-800 dark:text-slate-200">{formData.shortName}</span></div>
            <div>Намуди ташкилӣ: <span className="font-semibold text-slate-800 dark:text-slate-200">{formData.businessType.toUpperCase()}</span></div>
            <div>Муассис: <span className="font-semibold text-slate-800 dark:text-slate-200">{formData.founderName}</span></div>
            <div>Бонки интихобшуда: <span className="font-semibold text-slate-800 dark:text-slate-200">{formData.selectedBank}</span></div>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <button 
            onClick={onCancel}
            className="btn btn-primary"
          >
            Гузариш ба Шабакаи Идоракунӣ (Dashboard)
          </button>
          <button 
            onClick={() => alert(`Квитансияи пардохт ва нусхаи аризаи ${generatedAppNumber} боргирӣ шуд.`)}
            className="btn btn-outline"
          >
            <Download className="w-4 h-4" /> Боргирии квитансия ва нусха
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="glass-panel rounded-2xl p-6 sm:p-8 max-w-4xl mx-auto space-y-8 animate-fade-in my-4">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-700 pb-5">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
            <Building2 className="w-4 h-4" /> Мақомоти ягонаи андози ҶТ
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">
            Формаи интерактивии бақайдгирии тиҷорат (biz.gov.tj)
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Бақайдгирии давлатии шахси ҳуқуқӣ ва соҳибкорони инфиродӣ дар системаи "Тирезаи ягона"
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={autofillSampleData}
            className="btn btn-sm bg-amber-500 hover:bg-amber-600 text-white shadow-sm text-xs"
            title="Автоматик пур кардани форма бо маълумоти тестӣ"
          >
            <Sparkles className="w-3.5 h-3.5" /> Маълумоти намунавӣ
          </button>
          <button
            onClick={onCancel}
            className="btn btn-sm btn-outline text-xs"
          >
            Инфироъ (Баромад)
          </button>
        </div>
      </div>

      {/* Step Indicator Progress */}
      <div className="step-indicator">
        {[
          { step: 1, title: 'Намуд ва Ном', icon: Building2 },
          { step: 2, title: 'Муассисон', icon: User },
          { step: 3, title: 'Суроға ва Сармоя', icon: MapPin },
          { step: 4, title: 'Андоз ва Бонк', icon: Receipt },
          { step: 5, title: 'Имзои рақамӣ', icon: ShieldCheck }
        ].map((item) => {
          const isActive = currentStep === item.step;
          const isCompleted = currentStep > item.step;
          return (
            <div 
              key={item.step} 
              className={`step-item ${isActive ? 'active' : ''} ${isCompleted ? 'completed' : ''}`}
            >
              <div className="step-circle">
                {isCompleted ? <CheckCircle2 className="w-5 h-5 text-emerald-600" /> : item.step}
              </div>
              <span className="step-title hidden md:inline">{item.title}</span>
            </div>
          );
        })}
      </div>

      {/* Step Contents */}
      <div className="bg-slate-50/50 dark:bg-slate-900/50 p-6 rounded-xl border border-slate-200/80 dark:border-slate-800">
        
        {/* STEP 1: Legal Entity & Name */}
        {currentStep === 1 && (
          <div className="space-y-6 animate-fade-in">
            <h3 className="text-base font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2">
              <Building2 className="w-5 h-5 text-emerald-600" /> Марҳилаи 1: Интихоби шакли ташкилию ҳуқуқӣ ва номи тиҷорат
            </h3>

            <div className="form-group">
              <label className="form-label">Шакли ташкилию ҳуқуқии субъект</label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { id: 'llc', label: 'ҶДММ (ООО)', desc: 'Ҷамъияти дорои масъулияти маҳдуд' },
                  { id: 'sole_proprietorship', label: 'СИ (ИП)', desc: 'Соҳибкори инфиродӣ бо шаҳодатнома' },
                  { id: 'jsc', label: 'ҶСК (АО)', desc: 'Ҷамъияти саҳомии кушода/пӯшида' }
                ].map(type => (
                  <div
                    key={type.id}
                    onClick={() => updateField('businessType', type.id as BusinessType)}
                    className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                      formData.businessType === type.id
                        ? 'border-emerald-600 bg-emerald-50/50 dark:bg-emerald-950/30'
                        : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800'
                    }`}
                  >
                    <div className="font-extrabold text-sm text-slate-900 dark:text-white">{type.label}</div>
                    <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">{type.desc}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="form-group">
                <label className="form-label">Номи пурраи фирмавӣ ба забони тоҷикӣ *</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="Мсн: Ҷамъияти дорои масъулияти маҳдуди 'Сомон-Тех'"
                  value={formData.fullNameTajik}
                  onChange={e => updateField('fullNameTajik', e.target.value)}
                />
                {errors.fullNameTajik && <span className="text-xs text-red-500">{errors.fullNameTajik}</span>}
              </div>

              <div className="form-group">
                <label className="form-label">Номи кӯтоҳшуда барои мӯҳр ва ҳуҷҷатҳо *</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="Мсн: ҶДММ 'Сомон-Тех'"
                  value={formData.shortName}
                  onChange={e => updateField('shortName', e.target.value)}
                />
                {errors.shortName && <span className="text-xs text-red-500">{errors.shortName}</span>}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="form-group">
                <label className="form-label">Ном ба забони русӣ (фирменное наименование)</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="Мсн: ООО 'Сомон-Тех'"
                  value={formData.fullNameRussian}
                  onChange={e => updateField('fullNameRussian', e.target.value)}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Ном ба забони англисӣ (Legal English Name)</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="Msn: Somon-Tech LLC"
                  value={formData.fullNameEnglish}
                  onChange={e => updateField('fullNameEnglish', e.target.value)}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="form-group">
                <label className="form-label">Сектори фаъолияти иқтисодӣ</label>
                <select
                  className="form-select"
                  value={formData.economicSector}
                  onChange={e => updateField('economicSector', e.target.value)}
                >
                  {SECTORS_LIST.map((s, idx) => (
                    <option key={idx} value={s}>{s}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Коди намуди фаъолият (ОКВЭД / КҶФИ ҶТ)</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="Коди 4-рақама (Мсн: 62.01)"
                  value={formData.primaryActivityCode}
                  onChange={e => updateField('primaryActivityCode', e.target.value)}
                />
              </div>
            </div>
          </div>
        )}

        {/* STEP 2: Founders & Management */}
        {currentStep === 2 && (
          <div className="space-y-6 animate-fade-in">
            <h3 className="text-base font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2">
              <User className="w-5 h-5 text-emerald-600" /> Марҳилаи 2: Маълумот дар бораи муассисон ва роҳбарикунандагон
            </h3>

            <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/50 flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <p className="text-xs text-emerald-900 dark:text-emerald-200">
                Маълумоти шиносномавӣ ва ШИН худкор тавассути пойгоҳи маълумоти ягонаи аҳолии Ҷумҳурии Тоҷикистон (Единый Реестр Населения) тасдиқ карда мешавад.
              </p>
            </div>

            <div className="border border-slate-200 dark:border-slate-700 rounded-xl p-4 space-y-4">
              <h4 className="font-bold text-xs uppercase tracking-wider text-slate-500">Муассиси асосӣ (Учредитель)</h4>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="form-group">
                  <label className="form-label">Номи пурра (Ф.И.О.) муассис *</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="Раҳимов Алишер Ҷамшедович"
                    value={formData.founderName}
                    onChange={e => updateField('founderName', e.target.value)}
                  />
                  {errors.founderName && <span className="text-xs text-red-500">{errors.founderName}</span>}
                </div>

                <div className="form-group">
                  <label className="form-label">Серия ва рақами шиноснома *</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="А0123456"
                    value={formData.founderPassport}
                    onChange={e => updateField('founderPassport', e.target.value)}
                  />
                  {errors.founderPassport && <span className="text-xs text-red-500">{errors.founderPassport}</span>}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="form-group">
                  <label className="form-label">ШИН (ИНН)-и муассис</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="040058912"
                    value={formData.founderTin}
                    onChange={e => updateField('founderTin', e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Шаҳрвандӣ</label>
                  <input
                    type="text"
                    className="form-input"
                    value={formData.founderCitizenship}
                    onChange={e => updateField('founderCitizenship', e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Ҳисса дар сармоя (%)</label>
                  <input
                    type="number"
                    className="form-input"
                    value={formData.founderShare}
                    onChange={e => updateField('founderShare', Number(e.target.value))}
                  />
                </div>
              </div>
            </div>

            <div className="border border-slate-200 dark:border-slate-700 rounded-xl p-4 space-y-4">
              <h4 className="font-bold text-xs uppercase tracking-wider text-slate-500">Директори генералии корхона (Иҷроия)</h4>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="form-group">
                  <label className="form-label">Номи пурра (Ф.И.О.) директор *</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="Раҳимов Алишер Ҷамшедович"
                    value={formData.directorName}
                    onChange={e => updateField('directorName', e.target.value)}
                  />
                  {errors.directorName && <span className="text-xs text-red-500">{errors.directorName}</span>}
                </div>

                <div className="form-group">
                  <label className="form-label">Шиносномаи директор</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="А0123456"
                    value={formData.directorPassport}
                    onChange={e => updateField('directorPassport', e.target.value)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="form-group">
                  <label className="form-label">Рақами телефони мобилӣ</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="+992 93 555 1234"
                    value={formData.directorPhone}
                    onChange={e => updateField('directorPhone', e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Почтаи электронӣ (E-mail)</label>
                  <input
                    type="email"
                    className="form-input"
                    placeholder="director@company.tj"
                    value={formData.directorEmail}
                    onChange={e => updateField('directorEmail', e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* STEP 3: Capital & Address */}
        {currentStep === 3 && (
          <div className="space-y-6 animate-fade-in">
            <h3 className="text-base font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-emerald-600" /> Марҳилаи 3: Ҷойгиршавӣ, Суроғаи ҳуқуқӣ ва Сармоя
            </h3>

            <div className="form-group">
              <label className="form-label">Сармояи низомномавии ҷамъият (бо сомонӣ TJS)</label>
              <input
                type="number"
                className="form-input text-lg font-bold"
                value={formData.authorizedCapital}
                onChange={e => updateField('authorizedCapital', Number(e.target.value))}
              />
              <span className="form-hint">Толори ҳадди ақал мувофиқи қонунгузории ҶТ: 500 TJS</span>
              {errors.authorizedCapital && <span className="text-xs text-red-500">{errors.authorizedCapital}</span>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="form-group">
                <label className="form-label">Вилоят / Шаҳр</label>
                <select
                  className="form-select"
                  value={formData.region}
                  onChange={e => updateField('region', e.target.value)}
                >
                  {TAJIK_REGIONS.map((reg, idx) => (
                    <option key={idx} value={reg}>{reg}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Ноҳия / Маҳал</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="Ноҳияи Исмоили Сомонӣ"
                  value={formData.cityDistrict}
                  onChange={e => updateField('cityDistrict', e.target.value)}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-2 form-group">
                <label className="form-label">Кӯча ва рақами бино *</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="кӯчаи Рӯдакӣ, бинои 45"
                  value={formData.streetAddress}
                  onChange={e => updateField('streetAddress', e.target.value)}
                />
                {errors.streetAddress && <span className="text-xs text-red-500">{errors.streetAddress}</span>}
              </div>

              <div className="form-group">
                <label className="form-label">Рақами офис/ҳуҷра</label>
                <input
                  type="text"
                  className="form-input"
                  placeholder="Офиси 12"
                  value={formData.officeNumber}
                  onChange={e => updateField('officeNumber', e.target.value)}
                />
              </div>
            </div>

            {/* Document Upload Simulation */}
            <div className="border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-xl p-6 text-center space-y-3 bg-white dark:bg-slate-800">
              <Upload className="w-8 h-8 text-emerald-600 mx-auto" />
              <div>
                <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200">
                  Боргирии ҳуҷҷати тасдиқкунандаи суроғаи ҳуқуқӣ (Шартномаи иҷора ё ордер)
                </h4>
                <p className="text-[11px] text-slate-500 mt-1">Форматҳои қабулшаванда: PDF, JPG, PNG (то 10 MB)</p>
              </div>
              <button 
                type="button"
                onClick={() => updateField('addressProofFileName', 'Dogovor_Ijora_Verified.pdf')}
                className="btn btn-outline btn-sm text-xs"
              >
                <FileText className="w-3.5 h-3.5 text-emerald-600" />
                {formData.addressProofFileName ? `Файл боргирӣ шуд: ${formData.addressProofFileName}` : 'Интихоби файл аз компютер'}
              </button>
            </div>
          </div>
        )}

        {/* STEP 4: Tax Regime & Bank */}
        {currentStep === 4 && (
          <div className="space-y-6 animate-fade-in">
            <h3 className="text-base font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2">
              <Receipt className="w-5 h-5 text-emerald-600" /> Марҳилаи 4: Низоми андозбандӣ ва Хизматномаи кушодани ҳисоби бонкӣ
            </h3>

            <div className="form-group">
              <label className="form-label">Интихоби низоми андозбандӣ (Мақомоти андози ҶТ)</label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {[
                  { id: 'simplified', name: 'Низоми соддакардашуда', desc: '6% аз даромад (барои тиҷорати хурд ва миёна)' },
                  { id: 'general', name: 'Низоми умумӣ (НДС)', desc: 'Андоз аз арзиши иловашуда (14%) ва андоз аз фоида (18%)' },
                  { id: 'patent', name: 'Патент / Иҷозатнома', desc: 'Маблағи собит барои фаъолияти инфиродӣ' }
                ].map(item => (
                  <div
                    key={item.id}
                    onClick={() => updateField('taxRegime', item.id)}
                    className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                      formData.taxRegime === item.id
                        ? 'border-emerald-600 bg-emerald-50/50 dark:bg-emerald-950/30'
                        : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800'
                    }`}
                  >
                    <div className="font-bold text-xs text-slate-900 dark:text-white">{item.name}</div>
                    <div className="text-[11px] text-slate-500 mt-1">{item.desc}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="form-group">
                <label className="form-label">Инспекцияи андоз мувофиқи суроға</label>
                <input
                  type="text"
                  className="form-input"
                  value={formData.taxOfficeRegion}
                  onChange={e => updateField('taxOfficeRegion', e.target.value)}
                />
              </div>

              <div className="form-group">
                <label className="form-label">Интегратсияи бонкӣ (Кушодани автоматии ҳисоб) *</label>
                <select
                  className="form-select"
                  value={formData.selectedBank}
                  onChange={e => updateField('selectedBank', e.target.value)}
                >
                  {TAJIK_BANKS.map((b, idx) => (
                    <option key={idx} value={b}>{b}</option>
                  ))}
                </select>
                <span className="form-hint">Ҳисоби бонкии тиҷоратӣ пас аз бақайдгирӣ худкор кушода мешавад</span>
              </div>
            </div>
          </div>
        )}

        {/* STEP 5: E-Signature & Submission */}
        {currentStep === 5 && (
          <div className="space-y-6 animate-fade-in">
            <h3 className="text-base font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-600" /> Марҳилаи 5: Санҷиши ниҳоӣ ва Имзои рақамии E-Key
            </h3>

            {/* Summary review box */}
            <div className="p-4 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-3">
              <div className="font-bold text-xs uppercase tracking-wider text-slate-500">Муоинаи ариза пеш аз ирсол</div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
                <div>
                  <span className="text-slate-400 block">Номи фирмавӣ:</span>
                  <span className="font-bold text-slate-800 dark:text-slate-200">{formData.shortName}</span>
                </div>
                <div>
                  <span className="text-slate-400 block">Шакл:</span>
                  <span className="font-bold text-slate-800 dark:text-slate-200">{formData.businessType.toUpperCase()}</span>
                </div>
                <div>
                  <span className="text-slate-400 block">Муассис:</span>
                  <span className="font-bold text-slate-800 dark:text-slate-200">{formData.founderName}</span>
                </div>
                <div>
                  <span className="text-slate-400 block">Сармоя:</span>
                  <span className="font-bold text-slate-800 dark:text-slate-200">{formData.authorizedCapital} TJS</span>
                </div>
                <div>
                  <span className="text-slate-400 block">Суроға:</span>
                  <span className="font-bold text-slate-800 dark:text-slate-200">{formData.region}, {formData.streetAddress}</span>
                </div>
                <div>
                  <span className="text-slate-400 block">Бонк:</span>
                  <span className="font-bold text-slate-800 dark:text-slate-200">{formData.selectedBank}</span>
                </div>
              </div>
            </div>

            {/* E-signature widget */}
            <div className="p-5 rounded-xl bg-emerald-950 text-white space-y-4 shadow-lg border border-emerald-800">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Key className="w-5 h-5 text-amber-400" />
                  <span className="font-bold text-sm">Низоми ягонаи имзои электронӣ (E-Key / ASAN IMZO)</span>
                </div>
                <span className="px-2 py-0.5 text-[10px] font-extrabold bg-emerald-800 text-emerald-200 rounded">
                  Стандарти давлатӣ ҶТ
                </span>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-3">
                <input
                  type="text"
                  className="w-full px-3 py-2 text-xs rounded-lg bg-emerald-900/60 border border-emerald-700 text-white placeholder-emerald-400 font-mono focus:outline-none"
                  placeholder="ИД-и Калиди рақамӣ (Мсн: EKEY-TJ-8819)"
                  value={formData.eSignatureKeyId}
                  onChange={e => updateField('eSignatureKeyId', e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => {
                    if (!formData.eSignatureKeyId) updateField('eSignatureKeyId', 'EKEY-TJ-2026-9912');
                    setEKeyVerified(true);
                  }}
                  className={`btn btn-sm shrink-0 ${eKeyVerified ? 'bg-emerald-500 text-white' : 'bg-amber-500 text-slate-950 font-bold hover:bg-amber-400'}`}
                >
                  {eKeyVerified ? '✓ Калид тасдиқ шуд' : 'Тасдиқи E-Key'}
                </button>
              </div>
              {errors.eSignatureKeyId && <span className="text-xs text-amber-300">{errors.eSignatureKeyId}</span>}
            </div>

            {/* Declaration Checkbox */}
            <div className="flex items-start gap-3 p-3 rounded-lg border border-slate-200 dark:border-slate-700">
              <input
                type="checkbox"
                id="decl"
                className="mt-1 w-4 h-4 text-emerald-600 rounded focus:ring-emerald-500"
                checked={formData.declarationAgreed}
                onChange={e => updateField('declarationAgreed', e.target.checked)}
              />
              <label htmlFor="decl" className="text-xs text-slate-700 dark:text-slate-300 cursor-pointer">
                Ман тасдиқ мекунам, ки ҳамаи маълумоти воридшуда дуруст буда, мувофиқи Кодекси андози Ҷумҳурии Тоҷикистон ва Қонуни ҶТ "Дар бораи бақайдгирии давлатии шахсони ҳуқуқӣ" мебошад.
              </label>
            </div>
            {errors.declarationAgreed && <span className="text-xs text-red-500">{errors.declarationAgreed}</span>}
          </div>
        )}

      </div>

      {/* Footer Nav Controls */}
      <div className="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-slate-700">
        <button
          type="button"
          onClick={handlePrev}
          disabled={currentStep === 1}
          className="btn btn-outline text-xs disabled:opacity-50"
        >
          <ArrowLeft className="w-4 h-4" /> Қадами қаблӣ
        </button>

        <div className="text-xs text-slate-400 font-semibold">
          Марҳилаи {currentStep} аз 5
        </div>

        {currentStep < 5 ? (
          <button
            type="button"
            onClick={handleNext}
            className="btn btn-primary text-xs"
          >
            Қадами навбатӣ <ArrowRight className="w-4 h-4" />
          </button>
        ) : (
          <button
            type="button"
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="btn bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-lg"
          >
            {isSubmitting ? (
              <span className="flex items-center gap-2">
                <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Дар ҳоли ирсол ба Реестр...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" /> Ирсоли ариза ва пардохти боҷ (320 TJS)
              </span>
            )}
          </button>
        )}
      </div>
    </div>
  );
};
