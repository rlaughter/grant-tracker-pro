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
import { Button } from "@/components/ui/button";
import { UserPen } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState, useMemo } from "react";
import { useToast } from "@/components/ui/use-toast";
import { SearchBar } from "@/components/SearchBar";

// Mock specialists data - replace with real data later
const specialists = [
  { id: 1, name: "John Doe" },
  { id: 2, name: "Jane Smith" },
  { id: 3, name: "Mike Johnson" },
  { id: 4, name: "Sarah Wilson" },
  { id: 5, name: "Bob Anderson" },
];

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

type FilterState = {
  status: string;
  type: string;
  specialist: string;
  department: string;
};

export const GrantsListing = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedGrant, setSelectedGrant] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState<FilterState>({
    status: "",
    type: "",
    specialist: "",
    department: "",
  });

  const handleRowClick = (grantId: number) => {
    navigate(`/grants/${grantId}`);
  };

  const formatDate = (dateString: string) => {
    return format(new Date(dateString), 'MM/dd/yyyy');
  };

  const handleSpecialistChange = (specialistName: string) => {
    toast({
      title: "Specialist Updated",
      description: `Grant specialist has been updated to ${specialistName}`,
    });
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleFilterChange = (key: keyof FilterState, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const filteredGrants = useMemo(() => {
    return mockGrants.filter(grant => {
      const matchesSearch = searchQuery.toLowerCase() === '' || 
        Object.values(grant).some(value => 
          String(value).toLowerCase().includes(searchQuery.toLowerCase())
        );

      const matchesStatus = !filters.status || grant.status === filters.status;
      const matchesType = !filters.type || grant.type === filters.type;
      const matchesSpecialist = !filters.specialist || grant.specialist === filters.specialist;
      const matchesDepartment = !filters.department || grant.department === filters.department;

      return matchesSearch && matchesStatus && matchesType && matchesSpecialist && matchesDepartment;
    });
  }, [searchQuery, filters]);

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4 mb-4">
        <SearchBar onSearch={handleSearch} placeholder="Search grants..." />
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Select onValueChange={(value) => handleFilterChange('status', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Filter by Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Statuses</SelectItem>
              <SelectItem value="Active">Active</SelectItem>
              <SelectItem value="Pending">Pending</SelectItem>
              <SelectItem value="Expired">Expired</SelectItem>
            </SelectContent>
          </Select>

          <Select onValueChange={(value) => handleFilterChange('type', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Filter by Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Types</SelectItem>
              <SelectItem value="Federal">Federal</SelectItem>
              <SelectItem value="State">State</SelectItem>
              <SelectItem value="Local">Local</SelectItem>
            </SelectContent>
          </Select>

          <Select onValueChange={(value) => handleFilterChange('specialist', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Filter by Specialist" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Specialists</SelectItem>
              {specialists.map((specialist) => (
                <SelectItem key={specialist.id} value={specialist.name}>
                  {specialist.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select onValueChange={(value) => handleFilterChange('department', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Filter by Department" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Departments</SelectItem>
              <SelectItem value="Community Services">Community Services</SelectItem>
              <SelectItem value="Education">Education</SelectItem>
              <SelectItem value="Environmental Services">Environmental Services</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <ScrollArea className="h-[600px] rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>App #</TableHead>
              <TableHead>Grant #</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Department</TableHead>
              <TableHead>Specialist</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Start Date</TableHead>
              <TableHead>End Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Restrictions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredGrants.map((grant) => (
              <TableRow
                key={grant.id}
                className="cursor-pointer hover:bg-muted/50"
                onClick={(e) => {
                  // Prevent row click when clicking the specialist button
                  if (!(e.target as HTMLElement).closest('.specialist-button')) {
                    handleRowClick(grant.id);
                  }
                }}
              >
                <TableCell>{grant.applicationNumber}</TableCell>
                <TableCell>{grant.grantNumber}</TableCell>
                <TableCell className="font-medium">{grant.name}</TableCell>
                <TableCell>{grant.department}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    {grant.specialist}
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="specialist-button h-8 w-8"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedGrant(grant.id);
                          }}
                        >
                          <UserPen className="h-4 w-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Assign Grant Specialist</DialogTitle>
                        </DialogHeader>
                        <Select onValueChange={handleSpecialistChange}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a specialist" />
                          </SelectTrigger>
                          <SelectContent>
                            {specialists.map((specialist) => (
                              <SelectItem 
                                key={specialist.id} 
                                value={specialist.name}
                              >
                                {specialist.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </DialogContent>
                    </Dialog>
                  </div>
                </TableCell>
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
