
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
