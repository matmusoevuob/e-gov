import crypto from 'node:crypto';
import { User, UserRole, AuthSession, PkiCertificate } from '../types/index.js';

export class DbService {
  private usersMap = new Map<string, User>();
  private certsMap = new Map<string, PkiCertificate>();
  private sessionsMap = new Map<string, AuthSession>();

  constructor() {
    this.seedDatabase();
  }

  private seedDatabase() {
    // Seed Citizen User
    const citizen: User = {
      id: 'usr_citizen_001',
      nationalId: 'AA1234567',
      fullName: 'Alisher Navoi',
      email: 'alisher.navoi@citizen.gov.uz',
      phoneNumber: '+998901112233',
      role: UserRole.CITIZEN,
      mfaEnabled: true,
      mfaSecret: '123456', // Test MFA Code
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    this.usersMap.set(citizen.nationalId, citizen);

    // Seed Government Officer User
    const officer: User = {
      id: 'usr_officer_002',
      nationalId: 'OF9988776',
      fullName: 'Chief Officer Karimova',
      email: 'officer.karimova@egov.gov.uz',
      phoneNumber: '+998909998877',
      role: UserRole.OFFICER,
      mfaEnabled: true,
      mfaSecret: '654321', // Test MFA Code
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    this.usersMap.set(officer.nationalId, officer);
  }

  public findUserByNationalId(nationalId: string): User | undefined {
    return this.usersMap.get(nationalId);
  }

  public findUserById(id: string): User | undefined {
    return Array.from(this.usersMap.values()).find(u => u.id === id);
  }

  public createSession(userId: string, idToken?: string, ipAddress?: string, userAgent?: string): AuthSession {
    const sessionToken = `EGOV_SESS_${crypto.randomBytes(24).toString('hex')}`;
    const session: AuthSession = {
      id: `sess_${crypto.randomUUID()}`,
      userId,
      sessionToken,
      idToken,
      ipAddress,
      userAgent,
      expiresAt: new Date(Date.now() + 24 * 3600 * 1000).toISOString(),
      createdAt: new Date().toISOString()
    };
    this.sessionsMap.set(sessionToken, session);
    return session;
  }

  public getSession(sessionToken: string): AuthSession | undefined {
    const session = this.sessionsMap.get(sessionToken);
    if (session && new Date(session.expiresAt) < new Date()) {
      this.sessionsMap.delete(sessionToken);
      return undefined;
    }
    return session;
  }
}
