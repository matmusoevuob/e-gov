import * as forge from 'node-forge';

export interface ExtractedGovIdentity {
  commonName: string;
  organization?: string;
  organizationalUnit?: string;
  country?: string;
  email?: string;
  serialNumber?: string;
  tin?: string; // Tax Identification Number (ИНН)
  pinfl?: string; // Personal ID / FIN (ПИНФЛ / СНИЛС)
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

export class PkiUtils {
  /**
   * Parse a PEM or Base64 string into a forge Certificate object.
   */
  public static parseCertificate(pemOrBase64: string): forge.pki.Certificate {
    let cleanPem = pemOrBase64.trim();
    if (!cleanPem.startsWith('-----BEGIN CERTIFICATE-----')) {
      // Wrap base64 raw string if needed
      cleanPem = `-----BEGIN CERTIFICATE-----\n${cleanPem.match(/.{1,64}/g)?.join('\n')}\n-----END CERTIFICATE-----`;
    }
    return forge.pki.certificateFromPem(cleanPem);
  }

  /**
   * Extract attributes and governance details from an X.509 Certificate.
   */
  public static extractCertificateInfo(cert: forge.pki.Certificate): ParsedCertificateInfo {
    const now = new Date();
    const notBefore = cert.validity.notBefore;
    const notAfter = cert.validity.notAfter;
    const isCurrentlyValid = now >= notBefore && now <= notAfter;

    // Helper to get field value by short/long name or OID
    const getField = (attributes: forge.pki.CertificateField[], ...keys: string[]): string | undefined => {
      for (const key of keys) {
        const found = attributes.find(
          (attr) => attr.name === key || attr.shortName === key || attr.type === key,
        );
        if (found && typeof found.value === 'string') {
          return found.value;
        }
      }
      return undefined;
    };

    const subjectAttrs = cert.subject.attributes;
    const issuerAttrs = cert.issuer.attributes;

    const commonName = getField(subjectAttrs, 'commonName', 'CN') || 'Unknown CN';
    const organization = getField(subjectAttrs, 'organizationName', 'O');
    const organizationalUnit = getField(subjectAttrs, 'organizationalUnitName', 'OU');
    const country = getField(subjectAttrs, 'countryName', 'C');
    const email = getField(subjectAttrs, 'emailAddress', 'E');
    const serialNumber = getField(subjectAttrs, 'serialNumber', 'SN');
    const givenName = getField(subjectAttrs, 'givenName', 'GN');
    const surname = getField(subjectAttrs, 'surname', 'ST'); // or surname attribute
    const title = getField(subjectAttrs, 'title', 'T');

    // Tajikistan Govt digital ID custom fields or standard SANs
    // INN (ТИН) often stored in serialNumber, OID 1.2.860.1.1, or subject attributes
    const tin = getField(subjectAttrs, '1.2.860.1.1', '1.2.643.100.4', 'serialNumber') || serialNumber;
    const pinfl = getField(subjectAttrs, '1.2.860.1.2', '1.2.643.100.3') || undefined;

    // Extract SANs (Subject Alternative Names)
    const sanList: string[] = [];
    const sanExt = cert.getExtension('subjectAltName') as { altNames?: { type: number; value: string }[] } | null;
    if (sanExt && sanExt.altNames) {
      for (const altName of sanExt.altNames) {
        if (altName.value) {
          sanList.push(altName.value);
        }
      }
    }

    // Extract Key Usages
    const keyUsage: string[] = [];
    const keyUsageExt = cert.getExtension('keyUsage') as {
      digitalSignature?: boolean;
      nonRepudiation?: boolean;
      keyEncipherment?: boolean;
      dataEncipherment?: boolean;
      keyAgreement?: boolean;
      keyCertSign?: boolean;
      cRLSign?: boolean;
    } | null;

    if (keyUsageExt) {
      if (keyUsageExt.digitalSignature) keyUsage.push('digitalSignature');
      if (keyUsageExt.nonRepudiation) keyUsage.push('nonRepudiation');
      if (keyUsageExt.keyEncipherment) keyUsage.push('keyEncipherment');
      if (keyUsageExt.keyCertSign) keyUsage.push('keyCertSign');
      if (keyUsageExt.cRLSign) keyUsage.push('cRLSign');
    }

    // Extract Extended Key Usages
    const extKeyUsage: string[] = [];
    const extKeyUsageExt = cert.getExtension('extKeyUsage') as { [key: string]: boolean } | null;
    if (extKeyUsageExt) {
      Object.keys(extKeyUsageExt).forEach((key) => {
        if (extKeyUsageExt[key]) extKeyUsage.push(key);
      });
    }

    // SHA-256 Fingerprint
    const der = forge.asn1.toDer(forge.pki.certificateToAsn1(cert)).getBytes();
    const md = forge.md.sha256.create();
    md.update(der);
    const fingerprintSha256 = md.digest().toHex();

    // Issuer Info
    const issuerCn = getField(issuerAttrs, 'commonName', 'CN') || 'Unknown Issuer';
    const issuerOrg = getField(issuerAttrs, 'organizationName', 'O');
    const issuerCountry = getField(issuerAttrs, 'countryName', 'C');

    const isSelfSigned = cert.issuer.hash === cert.subject.hash;

    return {
      subject: {
        commonName,
        organization,
        organizationalUnit,
        country,
        email,
        serialNumber,
        tin,
        pinfl,
        givenName,
        surname,
        title,
        sanList,
      },
      issuer: {
        commonName: issuerCn,
        organization: issuerOrg,
        country: issuerCountry,
      },
      validity: {
        notBefore,
        notAfter,
        isCurrentlyValid,
      },
      fingerprintSha256,
      serialNumberHex: cert.serialNumber,
      signatureAlgorithm: forge.pki.oids[(cert as any).sigoid || (cert as any).signatureOid] || (cert as any).sigoid || (cert as any).signatureOid || 'rsaEncryption',
      keyUsage,
      extKeyUsage,
      isSelfSigned,
    };
  }

  /**
   * Verify digital signature for a challenge string using user certificate's public key.
   */
  public static verifySignature(
    cert: forge.pki.Certificate,
    challengeData: string,
    signatureBase64: string,
  ): boolean {
    try {
      const publicKey = cert.publicKey as forge.pki.rsa.PublicKey;
      const signatureBytes = forge.util.decode64(signatureBase64);

      const md = forge.md.sha256.create();
      md.update(challengeData, 'utf8');

      return publicKey.verify(md.digest().getBytes(), signatureBytes);
    } catch {
      return false;
    }
  }

  /**
   * Helper to generate a mock government self-signed certificate for unit tests/local dev.
   */
  public static generateMockGovCertificate(params: {
    cn: string;
    organization?: string;
    tin?: string;
    validDays?: number;
  }): { certPem: string; privateKeyPem: string } {
    const keys = forge.pki.rsa.generateKeyPair(2048);
    const cert = forge.pki.createCertificate();
    cert.publicKey = keys.publicKey;
    cert.serialNumber = '01' + Date.now().toString(16);
    cert.validity.notBefore = new Date();
    cert.validity.notAfter = new Date();
    cert.validity.notAfter.setDate(cert.validity.notBefore.getDate() + (params.validDays || 365));

    const attrs = [
      { name: 'countryName', value: 'TJ' },
      { name: 'organizationName', value: params.organization || 'Republic of Tajikistan E-Government CA' },
      { name: 'commonName', value: params.cn },
    ];

    if (params.tin) {
      attrs.push({ name: 'serialNumber', value: params.tin });
    }

    cert.setSubject(attrs);
    cert.setIssuer(attrs);

    cert.setExtensions([
      { name: 'basicConstraints', cA: false },
      {
        name: 'keyUsage',
        digitalSignature: true,
        nonRepudiation: true,
        keyEncipherment: true,
      },
      {
        name: 'extKeyUsage',
        clientAuth: true,
        emailProtection: true,
      },
      {
        name: 'subjectAltName',
        altNames: [
          { type: 1, value: `${params.cn.toLowerCase().replace(/\s+/g, '.')}@gov.tj` },
          { type: 2, value: 'auth.gov.tj' },
        ],
      },
    ]);

    cert.sign(keys.privateKey, forge.md.sha256.create());

    return {
      certPem: forge.pki.certificateToPem(cert),
      privateKeyPem: forge.pki.privateKeyToPem(keys.privateKey),
    };
  }
}
