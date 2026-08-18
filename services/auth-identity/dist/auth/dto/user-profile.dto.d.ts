export interface TajikistanGovAttributes {
    tin?: string;
    pinfl?: string;
    passportNumber?: string;
    citizenship?: string;
    governanceRole?: 'CITIZEN' | 'CIVIL_SERVANT' | 'LEGAL_ENTITY_REP' | 'ADMIN';
    organizationTin?: string;
}
export declare class UserProfileDto {
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
