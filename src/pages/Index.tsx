import { useState } from "react";
import { DashboardCard } from "@/components/DashboardCard";
import { SearchBar } from "@/components/SearchBar";
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
        <h1 className="text-4xl font-semibold tracking-tight">Grant Management</h1>
        <p className="text-muted-foreground">Track and manage your grants efficiently</p>
      </div>

      <SearchBar onSearch={handleSearch} />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <DashboardCard
          title="Total Active Grants"
          value="24"
          icon={<FileText className="h-8 w-8" />}
        />
        <DashboardCard
          title="Grant Specialists"
          value="8"
          icon={<Users className="h-8 w-8" />}
        />
        <DashboardCard
          title="Total Funding"
          value="$2.4M"
          icon={<DollarSign className="h-8 w-8" />}
        />
        <DashboardCard
          title="Success Rate"
          value="87%"
          icon={<BarChart3 className="h-8 w-8" />}
        />
      </div>

      <div className="glass-card p-6 rounded-lg animate-slide-up">
        <h2 className="text-xl font-semibold mb-4">Recent Grants</h2>
        <div className="space-y-4">
          {/* Placeholder for recent grants list */}
          <p className="text-muted-foreground">No recent grants to display</p>
        </div>
      </div>
    </div>
  );
};

export default Index;