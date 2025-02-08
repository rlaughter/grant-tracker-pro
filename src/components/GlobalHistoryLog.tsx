
import { format } from "date-fns";
import { Clock, Edit, Plus, Trash, X } from "lucide-react";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { mockGrantHistory } from "@/data/grantHistory";
import { mockGrants } from "@/data/grants";
import type { GrantHistoryEntry, FilterState } from "@/types/grant";
import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import GrantDetail from "@/pages/GrantDetail";

interface GlobalHistoryLogProps {
  searchQuery?: string;
  filters?: FilterState;
  startDate?: Date | null;
  endDate?: Date | null;
}

type SortField = "changedBy" | "changeDate";
type SortOrder = "asc" | "desc";

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

export const GlobalHistoryLog = ({ 
  searchQuery = "", 
  filters = { status: "", type: "", specialist: "", department: "" }, 
  startDate, 
  endDate 
}: GlobalHistoryLogProps) => {
  const [sortField, setSortField] = useState<SortField>("changeDate");
  const [sortOrder, setSortOrder] = useState<SortOrder>("desc");
  const [selectedGrantId, setSelectedGrantId] = useState<number | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Filter history entries based on search query and filters
  let filteredHistory = [...mockGrantHistory];

  // Apply search filter
  if (searchQuery) {
    const query = searchQuery.toLowerCase();
    filteredHistory = filteredHistory.filter(entry => 
      entry.grantId.toString().includes(query) ||
      entry.changedBy.toLowerCase().includes(query) ||
      getChangeDescription(entry).toLowerCase().includes(query)
    );
  }

  // Apply date filters
  if (startDate) {
    filteredHistory = filteredHistory.filter(entry => 
      new Date(entry.changeDate) >= startDate
    );
  }
  if (endDate) {
    filteredHistory = filteredHistory.filter(entry => 
      new Date(entry.changeDate) <= endDate
    );
  }

  // Apply other filters - only if they are not empty strings
  if (filters.status) {
    filteredHistory = filteredHistory.filter(entry => 
      entry.status.toLowerCase() === filters.status.toLowerCase()
    );
  }
  if (filters.type) {
    filteredHistory = filteredHistory.filter(entry => 
      entry.grantType.toLowerCase() === filters.type.toLowerCase()
    );
  }
  if (filters.specialist) {
    filteredHistory = filteredHistory.filter(entry => 
      entry.specialist.toLowerCase() === filters.specialist.toLowerCase()
    );
  }
  if (filters.department) {
    filteredHistory = filteredHistory.filter(entry => 
      entry.department.toLowerCase() === filters.department.toLowerCase()
    );
  }

  // Sort history entries
  const sortedHistory = filteredHistory.sort((a, b) => {
    if (sortField === "changeDate") {
      const dateA = new Date(a.changeDate).getTime();
      const dateB = new Date(b.changeDate).getTime();
      return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
    } else {
      const valueA = a[sortField].toLowerCase();
      const valueB = b[sortField].toLowerCase();
      return sortOrder === "asc" 
        ? valueA.localeCompare(valueB)
        : valueB.localeCompare(valueA);
    }
  });

  const toggleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  const handleGrantClick = (grantId: number) => {
    setSelectedGrantId(grantId);
    setIsDialogOpen(true);
  };

  return (
    <>
      <Card className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <Clock className="h-5 w-5" />
          <h3 className="font-medium text-lg">Global Change History</h3>
        </div>
        <ScrollArea className="h-[400px]">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-8"></TableHead>
                <TableHead>Grant #</TableHead>
                <TableHead>Change</TableHead>
                <TableHead 
                  className="cursor-pointer hover:bg-muted/50"
                  onClick={() => toggleSort("changedBy")}
                >
                  User {sortField === "changedBy" && (sortOrder === "asc" ? "↑" : "↓")}
                </TableHead>
                <TableHead 
                  className="cursor-pointer hover:bg-muted/50"
                  onClick={() => toggleSort("changeDate")}
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
                      onClick={() => handleGrantClick(entry.grantId)}
                    >
                      GRT-{entry.grantId.toString().padStart(4, '0')}
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
        </ScrollArea>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Grant Details</h2>
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => setIsDialogOpen(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          {selectedGrantId && (
            <div className="grant-detail-wrapper">
              <GrantDetail id={selectedGrantId.toString()} />
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};
