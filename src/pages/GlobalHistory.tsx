
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GrantFilters } from "@/components/GrantFilters";
import { GlobalHistoryLog } from "@/components/GlobalHistoryLog";
import { FilterState } from "@/types/grant";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const GlobalHistory = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [filters, setFilters] = useState<FilterState>({
    status: "",
    type: "",
    specialist: "",
    department: "",
  });

  const handleSearch = (query: string, newStartDate?: Date | null, newEndDate?: Date | null) => {
    setSearchQuery(query);
    if (newStartDate !== undefined) setStartDate(newStartDate);
    if (newEndDate !== undefined) setEndDate(newEndDate);
  };

  const handleFilterChange = (key: keyof FilterState, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value === 'all' ? '' : value }));
  };

  return (
    <div className="min-h-screen p-8 space-y-8 animate-fade-in">
      <div className="space-y-6">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => navigate("/")}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Grants
        </Button>
        
        <div className="space-y-2">
          <h1 className="text-4xl font-semibold tracking-tight text-slate-900">
            Global History
          </h1>
          <p className="text-muted-foreground">Track all changes across the grant management system</p>
        </div>
      </div>

      <div className="space-y-6">
        <GrantFilters 
          onSearch={handleSearch} 
          onFilterChange={handleFilterChange}
          startDate={startDate}
          endDate={endDate}
        />
        <GlobalHistoryLog 
          searchQuery={searchQuery}
          filters={filters}
          startDate={startDate}
          endDate={endDate}
        />
      </div>
    </div>
  );
};

export default GlobalHistory;
