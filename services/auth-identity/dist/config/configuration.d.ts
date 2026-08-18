export interface KeycloakConfig {
    baseUrl: string;
    realm: string;
    clientId: string;
    clientSecret: string;
    issuer: string;
    jwksUri: string;
}
export interface PkiConfig {
    trustedRootsPem: string[];
    crlCheckEnabled: boolean;
    ocspCheckEnabled: boolean;
    supportedPolicies: string[];
    allowSelfSignedTestCertificates: boolean;
}
export interface AppConfig {
    port: number;
    environment: string;
    keycloak: KeycloakConfig;
    pki: PkiConfig;
}
declare const _default: () => AppConfig;
export default _default;
