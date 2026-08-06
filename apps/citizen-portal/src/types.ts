export type UserRole = 'CITIZEN' | 'OFFICER';

export interface ServiceItem {
  id: string;
  title: string;
  category: 'Identity' | 'Business' | 'Tax' | 'Transport' | 'Health' | 'Housing';
  description: string;
  processingTime: string;
  fee: string;
  department: string;
  popular?: boolean;
}

export interface ApplicationRecord {
  id: string;
  serviceId: string;
  serviceTitle: string;
  category: string;
  applicantName: string;
  nationalId: string;
  submittedAt: string;
  status: 'PENDING_REVIEW' | 'IN_AUDIT' | 'APPROVED' | 'REJECTED';
  stepProgress: number; // 1 to 4
  refCode: string;
  xroadTransactionId: string;
  documents: string[];
  comments?: string;
}

export interface DigitalDocument {
  id: string;
  title: string;
  issuer: string;
  issueDate: string;
  expiryDate: string;
  documentNumber: string;
  verificationHash: string;
  type: 'NATIONAL_ID' | 'DRIVERS_LICENSE' | 'HEALTH_PASS' | 'TAX_TIN';
}
