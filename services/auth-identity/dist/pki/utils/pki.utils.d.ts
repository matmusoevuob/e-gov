import * as forge from 'node-forge';
export interface ExtractedGovIdentity {
    commonName: string;
    organization?: string;
    organizationalUnit?: string;
    country?: string;
    email?: string;
    serialNumber?: string;
    tin?: string;
    pinfl?: string;
    givenName?: string;
    surname?: string;
    title?: string;
    sanList: string[];
}
export interface ParsedCertificateInfo {
    subject: ExtractedGovIdentity;
    issuer: {
        commonName: string;
        organization?: string;
        country?: string;
    };
    validity: {
        notBefore: Date;
        notAfter: Date;
        isCurrentlyValid: boolean;
    };
    fingerprintSha256: string;
    serialNumberHex: string;
    signatureAlgorithm: string;
    keyUsage: string[];
    extKeyUsage: string[];
    isSelfSigned: boolean;
}
export declare class PkiUtils {
    static parseCertificate(pemOrBase64: string): forge.pki.Certificate;
    static extractCertificateInfo(cert: forge.pki.Certificate): ParsedCertificateInfo;
    static verifySignature(cert: forge.pki.Certificate, challengeData: string, signatureBase64: string): boolean;
    static generateMockGovCertificate(params: {
        cn: string;
        organization?: string;
        tin?: string;
        validDays?: number;
    }): {
        certPem: string;
        privateKeyPem: string;
    };
}
