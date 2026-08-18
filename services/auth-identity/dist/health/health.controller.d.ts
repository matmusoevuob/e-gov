export declare class HealthController {
    getLiveness(): {
        status: string;
        service: string;
        domain: string;
        timestamp: string;
    };
    getReadiness(): {
        status: string;
        service: string;
        domain: string;
        components: {
            keycloakOidc: string;
            pkiValidationEngine: string;
        };
        timestamp: string;
    };
}
