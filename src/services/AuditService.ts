
import { AuditAction, AuditEntry } from "@/types/audit";

class AuditService {
  private static instance: AuditService;
  private auditLog: AuditEntry[] = [];

  private constructor() {}

  public static getInstance(): AuditService {
    if (!AuditService.instance) {
      AuditService.instance = new AuditService();
    }
    return AuditService.instance;
  }

  public async logAction(
    userId: string,
    userName: string,
    action: AuditAction,
    grantId: number,
    details?: {
      field?: string;
      oldValue?: string;
      newValue?: string;
      details?: string;
    }
  ): Promise<void> {
    const auditEntry: AuditEntry = {
      id: this.auditLog.length + 1,
      timestamp: new Date().toISOString(),
      userId,
      userName,
      action,
      grantId,
      ...details
    };

    this.auditLog.push(auditEntry);
    console.log('Audit entry created:', auditEntry);
    
    // In a real application, this would make an API call to store the audit entry
    // await this.saveAuditEntry(auditEntry);
  }

  public getAuditLog(grantId?: number): AuditEntry[] {
    if (grantId) {
      return this.auditLog.filter(entry => entry.grantId === grantId);
    }
    return this.auditLog;
  }
}

export const auditService = AuditService.getInstance();
