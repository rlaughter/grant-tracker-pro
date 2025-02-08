
import { format } from "date-fns";
import { Clock, Edit, Plus, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import type { GrantHistoryEntry } from "@/types/grant";

interface GrantHistoryTableProps {
  sortedHistory: GrantHistoryEntry[];
  sortField: "changedBy" | "changeDate";
  sortOrder: "asc" | "desc";
  onGrantClick: (grantId: number) => void;
  onSortToggle: (field: "changedBy" | "changeDate") => void;
}

const getChangeIcon = (changeType: "create" | "update" | "delete") => {
  switch (changeType) {
    case "create":
      return <Plus className="h-4 w-4 text-green-500" />;
    case "update":
      return <Edit className="h-4 w-4 text-blue-500" />;
    case "delete":
      return <Trash className="h-4 w-4 text-red-500" />;
  }
};

const getChangeDescription = (entry: GrantHistoryEntry): string => {
  switch (entry.changeType) {
    case "create":
      return "Grant created";
    case "delete":
      return "Grant deleted";
    case "update":
      return `Changed ${entry.field} from "${entry.oldValue}" to "${entry.newValue}"`;
  }
};

export const GrantHistoryTable = ({ 
  sortedHistory, 
  sortField, 
  sortOrder, 
  onGrantClick,
  onSortToggle 
}: GrantHistoryTableProps) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-8"></TableHead>
          <TableHead>Grant #</TableHead>
          <TableHead>Change</TableHead>
          <TableHead 
            className="cursor-pointer hover:bg-muted/50"
            onClick={() => onSortToggle("changedBy")}
          >
            User {sortField === "changedBy" && (sortOrder === "asc" ? "↑" : "↓")}
          </TableHead>
          <TableHead 
            className="cursor-pointer hover:bg-muted/50"
            onClick={() => onSortToggle("changeDate")}
          >
            Time {sortField === "changeDate" && (sortOrder === "asc" ? "↑" : "↓")}
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {sortedHistory.map((entry) => (
          <TableRow key={entry.id}>
            <TableCell>{getChangeIcon(entry.changeType)}</TableCell>
            <TableCell>
              <Button 
                variant="link" 
                className="p-0 h-auto font-normal"
                onClick={() => onGrantClick(entry.grantId)}
              >
                {`GRT-${entry.grantId.toString().padStart(4, '0')}`}
              </Button>
            </TableCell>
            <TableCell>{getChangeDescription(entry)}</TableCell>
            <TableCell>{entry.changedBy}</TableCell>
            <TableCell>
              {format(new Date(entry.changeDate), "MMM d, yyyy h:mm a")}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
