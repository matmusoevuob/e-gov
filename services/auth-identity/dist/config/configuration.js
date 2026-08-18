"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = () => {
    const baseUrl = process.env.KEYCLOAK_BASE_URL || 'https://auth.gov.tj/auth';
    const realm = process.env.KEYCLOAK_REALM || 'egov-tj';
    const clientId = process.env.KEYCLOAK_CLIENT_ID || 'egov-portal-client';
    return {
        port: parseInt(process.env.PORT || '3000', 10),
        environment: process.env.NODE_ENV || 'development',
        keycloak: {
            baseUrl,
            realm,
            clientId,
            clientSecret: process.env.KEYCLOAK_CLIENT_SECRET || 'secret-placeholder',
            issuer: `${baseUrl}/realms/${realm}`,
            jwksUri: `${baseUrl}/realms/${realm}/protocol/openid-connect/certs`,
        },
        pki: {
            trustedRootsPem: process.env.PKI_TRUSTED_ROOTS
                ? process.env.PKI_TRUSTED_ROOTS.split(';')
                : [],
            crlCheckEnabled: process.env.PKI_CRL_CHECK_ENABLED === 'true',
            ocspCheckEnabled: process.env.PKI_OCSP_CHECK_ENABLED === 'true',
            supportedPolicies: [
                '1.2.860.1.1',
                '2.16.840.1.101.3.4.2.1',
            ],
            allowSelfSignedTestCertificates: process.env.NODE_ENV !== 'production',
        },
    };
};
//# sourceMappingURL=configuration.js.map