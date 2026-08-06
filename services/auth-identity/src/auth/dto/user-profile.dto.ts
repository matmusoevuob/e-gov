export interface TajikistanGovAttributes {
  tin?: string; // Tax ID Number (ИНН)
  pinfl?: string; // Personal Identifier (ПИНФЛ)
  passportNumber?: string;
  citizenship?: string;
  governanceRole?: 'CITIZEN' | 'CIVIL_SERVANT' | 'LEGAL_ENTITY_REP' | 'ADMIN';
  organizationTin?: string;
}

export class UserProfileDto {
  sub: string;
  preferredUsername: string;
  email?: string;
  emailVerified?: boolean;
  givenName?: string;
  familyName?: string;
  name?: string;
  roles: string[];
  govAttributes: TajikistanGovAttributes;
}
