"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PkiUtils = void 0;
const forge = require("node-forge");
class PkiUtils {
    static parseCertificate(pemOrBase64) {
        let cleanPem = pemOrBase64.trim();
        if (!cleanPem.startsWith('-----BEGIN CERTIFICATE-----')) {
            cleanPem = `-----BEGIN CERTIFICATE-----\n${cleanPem.match(/.{1,64}/g)?.join('\n')}\n-----END CERTIFICATE-----`;
        }
        return forge.pki.certificateFromPem(cleanPem);
    }
    static extractCertificateInfo(cert) {
        const now = new Date();
        const notBefore = cert.validity.notBefore;
        const notAfter = cert.validity.notAfter;
        const isCurrentlyValid = now >= notBefore && now <= notAfter;
        const getField = (attributes, ...keys) => {
            for (const key of keys) {
                const found = attributes.find((attr) => attr.name === key || attr.shortName === key || attr.type === key);
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
        const surname = getField(subjectAttrs, 'surname', 'ST');
        const title = getField(subjectAttrs, 'title', 'T');
        const tin = getField(subjectAttrs, '1.2.860.1.1', '1.2.643.100.4', 'serialNumber') || serialNumber;
        const pinfl = getField(subjectAttrs, '1.2.860.1.2', '1.2.643.100.3') || undefined;
        const sanList = [];
        const sanExt = cert.getExtension('subjectAltName');
        if (sanExt && sanExt.altNames) {
            for (const altName of sanExt.altNames) {
                if (altName.value) {
                    sanList.push(altName.value);
                }
            }
        }
        const keyUsage = [];
        const keyUsageExt = cert.getExtension('keyUsage');
        if (keyUsageExt) {
            if (keyUsageExt.digitalSignature)
                keyUsage.push('digitalSignature');
            if (keyUsageExt.nonRepudiation)
                keyUsage.push('nonRepudiation');
            if (keyUsageExt.keyEncipherment)
                keyUsage.push('keyEncipherment');
            if (keyUsageExt.keyCertSign)
                keyUsage.push('keyCertSign');
            if (keyUsageExt.cRLSign)
                keyUsage.push('cRLSign');
        }
        const extKeyUsage = [];
        const extKeyUsageExt = cert.getExtension('extKeyUsage');
        if (extKeyUsageExt) {
            Object.keys(extKeyUsageExt).forEach((key) => {
                if (extKeyUsageExt[key])
                    extKeyUsage.push(key);
            });
        }
        const der = forge.asn1.toDer(forge.pki.certificateToAsn1(cert)).getBytes();
        const md = forge.md.sha256.create();
        md.update(der);
        const fingerprintSha256 = md.digest().toHex();
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
            signatureAlgorithm: forge.pki.oids[cert.sigoid || cert.signatureOid] || cert.sigoid || cert.signatureOid || 'rsaEncryption',
            keyUsage,
            extKeyUsage,
            isSelfSigned,
        };
    }
    static verifySignature(cert, challengeData, signatureBase64) {
        try {
            const publicKey = cert.publicKey;
            const signatureBytes = forge.util.decode64(signatureBase64);
            const md = forge.md.sha256.create();
            md.update(challengeData, 'utf8');
            return publicKey.verify(md.digest().getBytes(), signatureBytes);
        }
        catch {
            return false;
        }
    }
    static generateMockGovCertificate(params) {
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
exports.PkiUtils = PkiUtils;
//# sourceMappingURL=pki.utils.js.map