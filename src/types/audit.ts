
export type AuditAction = 
  | 'create'
  | 'update'
  | 'delete'
  | 'view'
  | 'upload'
  | 'download'
  | 'delete_document';

export interface AuditEntry {
  id: number;
  timestamp: string;
  userId: string;
  userName: string;
  action: AuditAction;
  grantId: number;
  field?: string;
  oldValue?: string;
  newValue?: string;
  details?: string;
  ipAddress?: string;
}

export interface AuditLogProps {
  grantId: number;
  entries: AuditEntry[];
}
