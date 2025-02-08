
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
import { GrantDetailHeader } from "@/components/GrantDetailHeader";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GrantBasicInfo } from "@/components/GrantBasicInfo";
import { GrantGrantorInfo } from "@/components/GrantGrantorInfo";
import { GrantFiscalInfo } from "@/components/GrantFiscalInfo";
import { GrantFinancialTracking } from "@/components/GrantFinancialTracking";
import { GrantDocuments } from "@/components/GrantDocuments";
import { GrantTimeline } from "@/components/GrantTimeline";

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

  // Apply other filters
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

  // Find the selected grant data
  const selectedGrant = selectedGrantId 
    ? {
        ...mockGrants.find(g => g.id === selectedGrantId),
        grantorType: "Federal",
        grantorId: "FED-001",
        masterGrantNumber: "MGN-2024-001",
        cfdaNumber: "14.218",
        grantorInfo: {
          name: "Department of Education",
          contact: "Jane Smith",
          phone: "(555) 123-4567",
          email: "jane.smith@ed.gov",
          address: "123 Education Ave, Washington DC"
        }
      }
    : null;

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
          {selectedGrant && (
            <div className="space-y-8">
              <GrantDetailHeader grant={selectedGrant} />
              
              <Tabs defaultValue="details" className="w-full">
                <TabsList className="grid w-full max-w-2xl grid-cols-3">
                  <TabsTrigger value="details" className="flex items-center gap-2">
                    Details & Finances
                  </TabsTrigger>
                  <TabsTrigger value="documents" className="flex items-center gap-2">
                    Documents
                  </TabsTrigger>
                  <TabsTrigger value="timeline" className="flex items-center gap-2">
                    Timeline
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="details">
                  <div className="grid gap-6">
                    <GrantBasicInfo grant={selectedGrant} />
                    <GrantGrantorInfo grantorInfo={selectedGrant.grantorInfo} />
                    <GrantFiscalInfo 
                      fiscal={selectedGrant.fiscal}
                      onUpdate={() => {}} // Empty function since we don't want to update from the dialog
                    />
                    <GrantFinancialTracking grantId={selectedGrant.id} />
                  </div>
                </TabsContent>

                <TabsContent value="documents">
                  <GrantDocuments grantId={selectedGrant.id} />
                </TabsContent>

                <TabsContent value="timeline">
                  <GrantTimeline grantId={selectedGrant.id} />
                </TabsContent>
              </Tabs>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

