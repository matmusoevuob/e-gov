export declare class RequestAuthChallengeDto {
    tinOrId?: string;
}
export declare class VerifyAuthChallengeDto {
    challengeId: string;
    certificatePem: string;
    signatureBase64: string;
}
