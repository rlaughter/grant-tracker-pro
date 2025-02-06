
import { Card } from "@/components/ui/card";
import { Calendar, DollarSign, Filter, User } from "lucide-react";
import { FilterState } from "@/types/grant";

interface GrantFiltersProps {
  onSearch: (query: string) => void;
  onFilterChange: (key: keyof FilterState, value: string) => void;
}

export const GrantFilters = ({ onSearch, onFilterChange }: GrantFiltersProps) => {
  return (
    <Card className="p-6 space-y-4 bg-white/80 backdrop-blur-sm border border-purple-100 shadow-lg hover:shadow-xl transition-all duration-300">
      <div className="flex items-center gap-2 text-sm font-medium text-purple-700">
        <Filter className="h-4 w-4" />
        <span>Filters</span>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium flex items-center gap-2 text-purple-600">
            <Calendar className="h-4 w-4" />
            Status
          </label>
          <select 
            className="w-full rounded-md border border-purple-100 bg-white/50 px-3 py-2 focus:border-purple-300 focus:ring-purple-300 transition-colors"
            onChange={(e) => onFilterChange('status', e.target.value)}
          >
            <option value="all">All Statuses</option>
            <option value="Active">Active</option>
            <option value="Pending">Pending</option>
            <option value="Expired">Expired</option>
          </select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium flex items-center gap-2 text-purple-600">
            <DollarSign className="h-4 w-4" />
            Type
          </label>
          <select 
            className="w-full rounded-md border border-purple-100 bg-white/50 px-3 py-2 focus:border-purple-300 focus:ring-purple-300 transition-colors"
            onChange={(e) => onFilterChange('type', e.target.value)}
          >
            <option value="all">All Types</option>
            <option value="Federal">Federal</option>
            <option value="State">State</option>
            <option value="Local">Local</option>
          </select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium flex items-center gap-2 text-purple-600">
            <User className="h-4 w-4" />
            Specialist
          </label>
          <select 
            className="w-full rounded-md border border-purple-100 bg-white/50 px-3 py-2 focus:border-purple-300 focus:ring-purple-300 transition-colors"
            onChange={(e) => onFilterChange('specialist', e.target.value)}
          >
            <option value="all">All Specialists</option>
            <option value="John Doe">John Doe</option>
            <option value="Jane Smith">Jane Smith</option>
            <option value="Mike Johnson">Mike Johnson</option>
          </select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium flex items-center gap-2 text-purple-600">
            <Calendar className="h-4 w-4" />
            Department
          </label>
          <select 
            className="w-full rounded-md border border-purple-100 bg-white/50 px-3 py-2 focus:border-purple-300 focus:ring-purple-300 transition-colors"
            onChange={(e) => onFilterChange('department', e.target.value)}
          >
            <option value="all">All Departments</option>
            <option value="Community Services">Community Services</option>
            <option value="Education">Education</option>
            <option value="Environmental Services">Environmental Services</option>
          </select>
        </div>
      </div>
    </Card>
  );
};
