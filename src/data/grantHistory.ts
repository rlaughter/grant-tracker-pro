
import type { GrantHistoryEntry } from "@/types/grant";

export const mockGrantHistory: GrantHistoryEntry[] = [
  {
    id: 1,
    grantId: 1,
    changeDate: "2024-02-06T10:30:00Z",
    changedBy: "John Doe",
    field: "status",
    oldValue: "Pending",
    newValue: "Active",
    changeType: "update" as const,
    status: "Active",
    grantType: "Federal",
    specialist: "John Doe",
    department: "Community Services"
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
    status: "Active",
    grantType: "Federal",
    specialist: "John Doe",
    department: "Community Services"
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
    status: "Active",
    grantType: "State",
    specialist: "Jane Smith",
    department: "Education"
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
    status: "Active",
    grantType: "Federal",
    specialist: "John Doe",
    department: "Community Services"
  }
];
