
import { useState } from "react";
import { DashboardCard } from "@/components/DashboardCard";
import { SearchBar } from "@/components/SearchBar";
import { GrantsListing } from "@/components/GrantsListing";
import { GrantFilters } from "@/components/GrantFilters";
import { BarChart3, FileText, Users, DollarSign } from "lucide-react";

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    // Implement search logic here
  };

  return (
    <div className="min-h-screen p-8 space-y-8 animate-fade-in">
      <div className="space-y-2">
        <h1 className="text-4xl font-semibold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-purple-900">
          Grant Management
        </h1>
        <p className="text-muted-foreground">Track and manage your grants efficiently</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <DashboardCard
          title="Total Active Grants"
          value="24"
          icon={<FileText className="h-8 w-8" />}
          className="dashboard-card-1"
        />
        <DashboardCard
          title="Grant Specialists"
          value="8"
          icon={<Users className="h-8 w-8" />}
          className="dashboard-card-2"
        />
        <DashboardCard
          title="Total Funding"
          value="$2.4M"
          icon={<DollarSign className="h-8 w-8" />}
          className="dashboard-card-3"
        />
        <DashboardCard
          title="Success Rate"
          value="87%"
          icon={<BarChart3 className="h-8 w-8" />}
          className="dashboard-card-4"
        />
      </div>

      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <SearchBar onSearch={handleSearch} placeholder="Search grants..." />
        </div>
        
        <GrantFilters />
        
        <GrantsListing />
      </div>
    </div>
  );
};

export default Index;
