
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { UserPen } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { format } from "date-fns";
import { Grant, Specialist } from "@/types/grant";
import { specialists } from "@/data/mockData";

interface GrantsTableProps {
  grants: Grant[];
  onRowClick: (grantId: number) => void;
  onSpecialistChange: (specialistName: string) => void;
}

export const GrantsTable = ({ grants, onRowClick, onSpecialistChange }: GrantsTableProps) => {
  const formatDate = (dateString: string) => {
    return format(new Date(dateString), 'MM/dd/yyyy');
  };

  return (
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
          {grants.map((grant) => (
            <TableRow
              key={grant.id}
              className="cursor-pointer hover:bg-muted/50"
              onClick={(e) => {
                if (!(e.target as HTMLElement).closest('.specialist-button')) {
                  onRowClick(grant.id);
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
  );
};
