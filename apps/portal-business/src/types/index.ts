export type Language = 'tj' | 'ru' | 'en';

export type BusinessType = 'sole_proprietorship' | 'llc' | 'jsc' | 'branch';

export interface BusinessRegistrationData {
  // Step 1: Legal Entity & Name
  businessType: BusinessType;
  fullNameTajik: string;
  fullNameRussian: string;
  fullNameEnglish: string;
  shortName: string;
  economicSector: string;
  primaryActivityCode: string;
  
  // Step 2: Founders & Management
  founderName: string;
  founderPassport: string;
  founderTin: string;
  founderCitizenship: string;
  founderShare: number;
  directorName: string;
  directorPassport: string;
  directorPhone: string;
  directorEmail: string;

  // Step 3: Capital & Address
  authorizedCapital: number; // in TJS
  region: string;
  cityDistrict: string;
  streetAddress: string;
  officeNumber: string;
  addressProofType: 'lease_agreement' | 'ownership_deed' | 'guarantee_letter';
  addressProofFileName?: string;

  // Step 4: Tax Regime & Bank Account
  taxRegime: 'simplified' | 'general' | 'patent';
  taxOfficeRegion: string;
  selectedBank: string;
  accountCurrency: 'TJS' | 'USD' | 'EUR' | 'RUB';

  // Step 5: Declaration & E-Sig
  declarationAgreed: boolean;
  eSignatureKeyId: string;
}

export type ApplicationStatus = 'draft' | 'under_review' | 'action_required' | 'approved' | 'rejected';

export interface ApplicationRecord {
  id: string;
  applicationNumber: string;
  type: 'registration' | 'permit';
  title: string;
  category: string;
  submittedDate: string;
  updatedDate: string;
  status: ApplicationStatus;
  processingStage: string;
  progressPercent: number;
  applicantName: string;
  tin?: string;
  feeAmount: number;
  paymentStatus: 'paid' | 'pending' | 'waived';
  notes?: string;
  details?: Partial<BusinessRegistrationData> | Record<string, any>;
  certificateNumber?: string;
}

export interface PermitCategory {
  id: string;
  code: string;
  titleTajik: string;
  titleRussian: string;
  titleEnglish: string;
  authority: string;
  sector: string;
  processingDays: number;
  feeTJS: number;
  validityYears: number;
  requiredDocuments: string[];
  description: string;
}

export interface MetricCardData {
  title: string;
  value: string | number;
  change?: string;
  trend?: 'up' | 'down' | 'neutral';
  icon: string;
  description: string;
}
