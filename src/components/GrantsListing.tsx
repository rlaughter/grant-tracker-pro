import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useNavigate } from "react-router-dom";
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
    status: "Active",
    type: "Federal",
    department: "Community Services",
    grantorType: "Federal",
    grantorId: "FED-001",
    masterGrantNumber: null,
    cfdaNumber: "14.218",
  },
  {
    id: 2,
    applicationNumber: "APP-2024-002",
    grantNumber: "GRT-2024-002",
    name: "Education Innovation Fund",
    amount: 175000,
    specialist: "Jane Smith",
    startDate: "2024-02-15",
    status: "Active",
    type: "State",
    department: "Education",
    grantorType: "State",
    grantorId: "ST-001",
    masterGrantNumber: null,
    cfdaNumber: null,
  },
  {
    id: 3,
    applicationNumber: "APP-2024-003",
    grantNumber: "GRT-2024-003",
    name: "Environmental Protection Grant",
    amount: 300000,
    specialist: "Mike Johnson",
    startDate: "2024-03-01",
    status: "Pending",
    type: "Local",
    department: "Environmental Services",
    grantorType: "Local",
    grantorId: "LOC-001",
    masterGrantNumber: null,
    cfdaNumber: null,
  },
];

export const GrantsListing = () => {
  const navigate = useNavigate();

  const handleRowClick = (grantId: number) => {
    navigate(`/grants/${grantId}`);
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
              <TableHead>Status</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Grantor Type</TableHead>
              <TableHead>CFDA #</TableHead>
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
                <TableCell>{grant.grantorType}</TableCell>
                <TableCell>{grant.cfdaNumber || "N/A"}</TableCell>
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