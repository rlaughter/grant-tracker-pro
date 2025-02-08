
import { useState } from "react";
import { GrantFilters } from "@/components/GrantFilters";
import { GlobalHistoryLog } from "@/components/GlobalHistoryLog";
import { FilterState } from "@/types/grant";

const GlobalHistory = () => {
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
      <div className="space-y-2">
        <h1 className="text-4xl font-semibold tracking-tight text-slate-900">
          Global History
        </h1>
        <p className="text-muted-foreground">Track all changes across the grant management system</p>
      </div>

      <div className="space-y-6">
        <GrantFilters 
          onSearch={handleSearch} 
          onFilterChange={handleFilterChange}
          startDate={startDate}
          endDate={endDate}
        />
        <GlobalHistoryLog />
      </div>
    </div>
  );
};

export default GlobalHistory;
