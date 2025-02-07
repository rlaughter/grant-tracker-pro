
export type Grant = {
  id: number;
  applicationNumber: string;
  grantNumber: string;
  name: string;
  amount: number;
  specialist: string;
  startDate: string;
  endDate: string;
  status: string;
  type: string;
  department: string;
  restrictions: string;
  fiscal?: {
    startYear: number;
    startMonth: string;
    endYear: number;
    endMonth: string;
    requestedAmount: number;
    awardedAmount: number;
  };
};

export type FilterState = {
  status: string;
  type: string;
  specialist: string;
  department: string;
};

export type Specialist = {
  id: number;
  name: string;
};

export type GrantHistoryEntry = {
  id: number;
  grantId: number;
  changeDate: string;
  changedBy: string;
  field: string;
  oldValue: string;
  newValue: string;
  changeType: 'create' | 'update' | 'delete';
};

