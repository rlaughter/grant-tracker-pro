
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { UserPen, ArrowUpDown } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { format } from "date-fns";
import { Grant, Specialist } from "@/types/grant";
import { specialists } from "@/data/mockData";
import { useState } from "react";

interface GrantsTableProps {
  grants: Grant[];
  onRowClick: (grantId: number) => void;
  onSpecialistChange: (specialistName: string) => void;
}

type SortConfig = {
  key: keyof Grant | null;
  direction: 'asc' | 'desc';
};

export const GrantsTable = ({ grants, onRowClick, onSpecialistChange }: GrantsTableProps) => {
  const [sortConfig, setSortConfig] = useState<SortConfig>({ key: null, direction: 'asc' });

  const formatDate = (dateString: string) => {
    return format(new Date(dateString), 'MM/dd/yyyy');
  };

  const sortedGrants = [...grants].sort((a, b) => {
    if (!sortConfig.key) return 0;

    let aValue = a[sortConfig.key];
    let bValue = b[sortConfig.key];

    // Handle special cases for formatting
    if (sortConfig.key === 'amount') {
      return sortConfig.direction === 'asc' ? 
        (a.amount - b.amount) : 
        (b.amount - a.amount);
    }

    if (sortConfig.key === 'startDate' || sortConfig.key === 'endDate') {
      return sortConfig.direction === 'asc' ? 
        new Date(aValue as string).getTime() - new Date(bValue as string).getTime() :
        new Date(bValue as string).getTime() - new Date(aValue as string).getTime();
    }

    // Default string comparison
    const compareResult = String(aValue).localeCompare(String(bValue));
    return sortConfig.direction === 'asc' ? compareResult : -compareResult;
  });

  const handleSort = (key: keyof Grant) => {
    setSortConfig(current => ({
      key,
      direction: current.key === key && current.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const SortableHeader = ({ column, label }: { column: keyof Grant, label: string }) => (
    <TableHead>
      <Button 
        variant="ghost" 
        onClick={() => handleSort(column)}
        className="hover:bg-transparent"
      >
        {label}
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    </TableHead>
  );

  return (
    <div className="relative w-full border rounded-md">
      <ScrollArea className="h-[600px]">
        <Table>
          <TableHeader>
            <TableRow>
              <SortableHeader column="applicationNumber" label="App #" />
              <SortableHeader column="grantNumber" label="Grant #" />
              <SortableHeader column="name" label="Name" />
              <SortableHeader column="department" label="Department" />
              <SortableHeader column="specialist" label="Specialist" />
              <SortableHeader column="amount" label="Amount" />
              <SortableHeader column="startDate" label="Start Date" />
              <SortableHeader column="endDate" label="End Date" />
              <SortableHeader column="status" label="Status" />
              <SortableHeader column="type" label="Type" />
              <SortableHeader column="restrictions" label="Restrictions" />
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedGrants.map((grant) => (
              <TableRow
                key={grant.id}
                className="cursor-pointer hover:bg-muted/50"
                onClick={(e) => {
                  if (!(e.target as HTMLElement).closest('.specialist-button')) {
                    onRowClick(grant.id);
                  }
                }}
              >
                <TableCell className="whitespace-nowrap">{grant.applicationNumber}</TableCell>
                <TableCell className="whitespace-nowrap">{grant.grantNumber}</TableCell>
                <TableCell className="font-medium whitespace-nowrap">{grant.name}</TableCell>
                <TableCell className="whitespace-nowrap">{grant.department}</TableCell>
                <TableCell className="whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    {grant.specialist}
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="specialist-button h-8 w-8"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <UserPen className="h-4 w-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Assign Grant Specialist</DialogTitle>
                        </DialogHeader>
                        <Select onValueChange={onSpecialistChange}>
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
                <TableCell className="whitespace-nowrap">${grant.amount.toLocaleString()}</TableCell>
                <TableCell className="whitespace-nowrap">{formatDate(grant.startDate)}</TableCell>
                <TableCell className="whitespace-nowrap">{formatDate(grant.endDate)}</TableCell>
                <TableCell className="whitespace-nowrap">
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
                <TableCell className="whitespace-nowrap">{grant.type}</TableCell>
                <TableCell className="max-w-[200px] truncate" title={grant.restrictions}>
                  {grant.restrictions}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
};

