
import { useState } from "react";
import { format } from "date-fns";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { AuditEntry } from "@/types/audit";

interface AuditTrailProps {
  entries: AuditEntry[];
}

export const AuditTrail = ({ entries }: AuditTrailProps) => {
  const [sortedEntries, setSortedEntries] = useState<AuditEntry[]>(() => 
    [...entries].sort((a, b) => 
      new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    )
  );

  const getActionDescription = (entry: AuditEntry): string => {
    switch (entry.action) {
      case 'create':
        return 'Created grant record';
      case 'update':
        return `Updated ${entry.field} from "${entry.oldValue}" to "${entry.newValue}"`;
      case 'delete':
        return 'Deleted grant record';
      case 'upload':
        return `Uploaded document: ${entry.details}`;
      case 'download':
        return `Downloaded document: ${entry.details}`;
      case 'delete_document':
        return `Deleted document: ${entry.details}`;
      default:
        return 'Unknown action';
    }
  };

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4">Audit Trail</h3>
      <ScrollArea className="h-[400px]">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date/Time</TableHead>
              <TableHead>User</TableHead>
              <TableHead>Action</TableHead>
              <TableHead>Details</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedEntries.map((entry) => (
              <TableRow key={entry.id}>
                <TableCell className="whitespace-nowrap">
                  {format(new Date(entry.timestamp), "MMM d, yyyy h:mm a")}
                </TableCell>
                <TableCell>{entry.userName}</TableCell>
                <TableCell>{entry.action}</TableCell>
                <TableCell>{getActionDescription(entry)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </ScrollArea>
    </Card>
  );
};
