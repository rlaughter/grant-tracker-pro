
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

// Mock data - replace with real data later
const mockGrants = [
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
];

export const GrantsListing = () => {
  const navigate = useNavigate();

  const handleRowClick = (grantId: number) => {
    navigate(`/grants/${grantId}`);
  };

  const formatDate = (dateString: string) => {
    return format(new Date(dateString), 'MM/dd/yyyy');
  };

  return (
    <div className="space-y-4">
      <ScrollArea className="h-[600px] rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>App #</TableHead>
              <TableHead>Grant #</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Department</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Start Date</TableHead>
              <TableHead>End Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Restrictions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockGrants.map((grant) => (
              <TableRow
                key={grant.id}
                className="cursor-pointer hover:bg-muted/50"
                onClick={() => handleRowClick(grant.id)}
              >
                <TableCell>{grant.applicationNumber}</TableCell>
                <TableCell>{grant.grantNumber}</TableCell>
                <TableCell className="font-medium">{grant.name}</TableCell>
                <TableCell>{grant.department}</TableCell>
                <TableCell>${grant.amount.toLocaleString()}</TableCell>
                <TableCell>{formatDate(grant.startDate)}</TableCell>
                <TableCell>{formatDate(grant.endDate)}</TableCell>
                <TableCell>
                  <span
                    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      grant.status === "Active"
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {grant.status}
                  </span>
                </TableCell>
                <TableCell>{grant.type}</TableCell>
                <TableCell className="max-w-[200px] truncate" title={grant.restrictions}>
                  {grant.restrictions}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </ScrollArea>
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href="#" />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#" isActive>1</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">2</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">3</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationNext href="#" />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};
