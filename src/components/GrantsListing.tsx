import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";
import { DollarSign, FileText, User, Calendar } from "lucide-react";
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
    name: "Community Development Grant",
    amount: 250000,
    specialist: "John Doe",
    startDate: "2024-01-01",
    status: "Active",
    type: "Federal",
  },
  {
    id: 2,
    name: "Education Innovation Fund",
    amount: 175000,
    specialist: "Jane Smith",
    startDate: "2024-02-15",
    status: "Active",
    type: "State",
  },
  {
    id: 3,
    name: "Environmental Protection Grant",
    amount: 300000,
    specialist: "Mike Johnson",
    startDate: "2024-03-01",
    status: "Pending",
    type: "Local",
  },
];

export const GrantsListing = () => {
  return (
    <div className="space-y-4">
      <ScrollArea className="h-[600px] rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Specialist</TableHead>
              <TableHead>Start Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Type</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockGrants.map((grant) => (
              <TableRow key={grant.id} className="cursor-pointer hover:bg-muted/50">
                <TableCell className="font-medium">{grant.name}</TableCell>
                <TableCell>${grant.amount.toLocaleString()}</TableCell>
                <TableCell>{grant.specialist}</TableCell>
                <TableCell>{new Date(grant.startDate).toLocaleDateString()}</TableCell>
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