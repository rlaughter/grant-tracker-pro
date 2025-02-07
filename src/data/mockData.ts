
export const specialists = [
  { id: 1, name: "John Doe" },
  { id: 2, name: "Jane Smith" },
  { id: 3, name: "Mike Johnson" },
  { id: 4, name: "Sarah Wilson" },
  { id: 5, name: "Bob Anderson" },
];

export const mockGrants = [
  {
    id: 1,
    applicationNumber: "APP-2024-001",
    grantNumber: "GRT-2024-001",
    name: "Community Development Grant",
    amount: 250000,
    specialist: "John Doe",
    startDate: "2024-01-01",
    endDate: "2025-12-31",
    status: "Active",
    type: "Federal",
    department: "Community Services",
    restrictions: "No equipment purchases above $5,000",
    fiscal: {
      startYear: 2024,
      startMonth: "January",
      endYear: 2025,
      endMonth: "December",
      requestedAmount: 300000,
      awardedAmount: 250000
    }
  },
  {
    id: 2,
    applicationNumber: "APP-2024-002",
    grantNumber: "GRT-2024-002",
    name: "Education Innovation Fund",
    amount: 175000,
    specialist: "Jane Smith",
    startDate: "2024-02-15",
    endDate: "2025-02-14",
    status: "Active",
    type: "State",
    department: "Education",
    restrictions: "Must maintain 80% attendance rate",
  },
  {
    id: 3,
    applicationNumber: "APP-2024-003",
    grantNumber: "GRT-2024-003",
    name: "Environmental Protection Grant",
    amount: 300000,
    specialist: "Mike Johnson",
    startDate: "2024-03-01",
    endDate: "2026-02-28",
    status: "Pending",
    type: "Local",
    department: "Environmental Services",
    restrictions: "Quarterly reporting required",
  },
  {
    id: 4,
    applicationNumber: "APP-2024-004",
    grantNumber: "GRT-2024-004",
    name: "Youth Development Program",
    amount: 150000,
    specialist: "Sarah Wilson",
    startDate: "2024-03-15",
    endDate: "2025-03-14",
    status: "Active",
    type: "State",
    department: "Community Services",
    restrictions: "Youth-focused activities only",
  },
  {
    id: 5,
    applicationNumber: "APP-2024-005",
    grantNumber: "GRT-2024-005",
    name: "STEM Education Initiative",
    amount: 450000,
    specialist: "Bob Anderson",
    startDate: "2024-04-01",
    endDate: "2026-03-31",
    status: "Active",
    type: "Federal",
    department: "Education",
    restrictions: "STEM curriculum development only",
  },
  {
    id: 6,
    applicationNumber: "APP-2024-006",
    grantNumber: "GRT-2024-006",
    name: "Clean Water Project",
    amount: 275000,
    specialist: "Mike Johnson",
    startDate: "2024-05-01",
    endDate: "2025-04-30",
    status: "Pending",
    type: "Local",
    department: "Environmental Services",
    restrictions: "Water quality monitoring required",
  },
  {
    id: 7,
    applicationNumber: "APP-2024-007",
    grantNumber: "GRT-2024-007",
    name: "Digital Literacy Program",
    amount: 200000,
    specialist: "Jane Smith",
    startDate: "2024-06-01",
    endDate: "2025-05-31",
    status: "Active",
    type: "State",
    department: "Education",
    restrictions: "Technology purchases must be pre-approved",
  },
  {
    id: 8,
    applicationNumber: "APP-2024-008",
    grantNumber: "GRT-2024-008",
    name: "Senior Care Services",
    amount: 325000,
    specialist: "John Doe",
    startDate: "2024-07-01",
    endDate: "2025-06-30",
    status: "Active",
    type: "Federal",
    department: "Community Services",
    restrictions: "Senior-focused programs only",
  },
  {
    id: 9,
    applicationNumber: "APP-2024-009",
    grantNumber: "GRT-2024-009",
    name: "Green Energy Initiative",
    amount: 500000,
    specialist: "Sarah Wilson",
    startDate: "2024-08-01",
    endDate: "2026-07-31",
    status: "Pending",
    type: "Federal",
    department: "Environmental Services",
    restrictions: "Renewable energy projects only",
  },
  {
    id: 10,
    applicationNumber: "APP-2024-010",
    grantNumber: "GRT-2024-010",
    name: "Special Education Support",
    amount: 225000,
    specialist: "Bob Anderson",
    startDate: "2024-09-01",
    endDate: "2025-08-31",
    status: "Active",
    type: "State",
    department: "Education",
    restrictions: "Special education resources only",
  }
];

export let mockGrantHistory = [
  {
    id: 1,
    grantId: 1,
    changeDate: "2024-02-06T10:30:00Z",
    changedBy: "John Doe",
    field: "status",
    oldValue: "Pending",
    newValue: "Active",
    changeType: "update" as const,
  },
  {
    id: 2,
    grantId: 1,
    changeDate: "2024-02-05T15:45:00Z",
    changedBy: "Jane Smith",
    field: "amount",
    oldValue: "200000",
    newValue: "250000",
    changeType: "update" as const,
  },
  {
    id: 3,
    grantId: 2,
    changeDate: "2024-02-04T09:15:00Z",
    changedBy: "Mike Johnson",
    field: "all",
    oldValue: "",
    newValue: "",
    changeType: "create" as const,
  },
  {
    id: 4,
    grantId: 1,
    changeDate: "2024-02-03T14:20:00Z",
    changedBy: "John Doe",
    field: "restrictions",
    oldValue: "No restrictions",
    newValue: "No equipment purchases above $5,000",
    changeType: "update" as const,
  },
];
