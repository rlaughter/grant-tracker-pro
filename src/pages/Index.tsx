
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { DashboardCard } from "@/components/DashboardCard";
import { GrantsListing } from "@/components/GrantsListing";
import { GrantFilters } from "@/components/GrantFilters";
import { GlobalHistoryLog } from "@/components/GlobalHistoryLog";
import { FileText, DollarSign, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FilterState } from "@/types/grant";
import { mockGrants } from "@/data/mockData";

const Index = () => {
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

  const activeGrantsCount = mockGrants.filter(grant => grant.status === "Active").length;
  const totalSpentAmount = mockGrants.reduce((acc, grant) => acc + (grant.amount * 0.3), 0);

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
      <div className="flex justify-between items-center">
        <div className="space-y-2">
          <h1 className="text-4xl font-semibold tracking-tight text-slate-900">
            Grant Management
          </h1>
          <p className="text-muted-foreground">Track and manage your grants efficiently</p>
        </div>
        <Button onClick={() => navigate("/grants/new")}>
          <Plus className="h-4 w-4 mr-2" />
          New Grant
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <DashboardCard
          title="Total Active Grants"
          value={activeGrantsCount}
          icon={<FileText className="h-8 w-8" />}
          className="dashboard-card-1"
        />
        <DashboardCard
          title="Total Spent"
          value={`$${(totalSpentAmount / 1000000).toFixed(1)}M`}
          icon={<DollarSign className="h-8 w-8" />}
          className="dashboard-card-2"
        />
        <DashboardCard
          title="Total Funding"
          value="$2.4M"
          icon={<DollarSign className="h-8 w-8" />}
          className="dashboard-card-3"
        />
      </div>

      <div className="space-y-6">
        <GrantFilters 
          onSearch={handleSearch} 
          onFilterChange={handleFilterChange}
          startDate={startDate}
          endDate={endDate}
        />
        <GrantsListing 
          searchQuery={searchQuery} 
          filters={filters}
          startDate={startDate}
          endDate={endDate}
        />
        <GlobalHistoryLog />
      </div>
    </div>
  );
};

export default Index;
