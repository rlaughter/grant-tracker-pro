
import { Clock } from "lucide-react";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { mockGrantHistory } from "@/data/grantHistory";
import { mockGrants } from "@/data/grants";
import type { GrantHistoryEntry, FilterState } from "@/types/grant";
import { useState } from "react";
import { GrantHistoryTable } from "@/components/history/GrantHistoryTable";
import { GrantDetailsDialog } from "@/components/history/GrantDetailsDialog";

interface GlobalHistoryLogProps {
  searchQuery?: string;
  filters?: FilterState;
  startDate?: Date | null;
  endDate?: Date | null;
}

type SortField = "changedBy" | "changeDate" | "grantId";
type SortOrder = "asc" | "desc";

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
      entry.changedBy.toLowerCase().includes(query)
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
    } else if (sortField === "grantId") {
      return sortOrder === "asc" 
        ? a.grantId - b.grantId
        : b.grantId - a.grantId;
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
          <GrantHistoryTable 
            sortedHistory={sortedHistory}
            sortField={sortField}
            sortOrder={sortOrder}
            onGrantClick={handleGrantClick}
            onSortToggle={toggleSort}
          />
        </ScrollArea>
      </Card>

      <GrantDetailsDialog 
        isOpen={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        selectedGrant={selectedGrant}
      />
    </>
  );
};

