
import { Card } from "@/components/ui/card";
import { Calendar, DollarSign, Filter, User, Search } from "lucide-react";
import { FilterState } from "@/types/grant";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { useState, useEffect } from "react";

interface GrantFiltersProps {
  onSearch: (query: string, startDate?: Date | null, endDate?: Date | null) => void;
  onFilterChange: (key: keyof FilterState, value: string) => void;
  startDate?: Date | null;
  endDate?: Date | null;
}

export const GrantFilters = ({ onSearch, onFilterChange, startDate, endDate }: GrantFiltersProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [startDateStr, setStartDateStr] = useState<string>("");
  const [endDateStr, setEndDateStr] = useState<string>("");
  const { toast } = useToast();

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      const parsedStartDate = startDateStr ? new Date(startDateStr) : null;
      const parsedEndDate = endDateStr ? new Date(endDateStr) : null;
      
      onSearch(searchTerm, parsedStartDate, parsedEndDate);
      
      if (searchTerm.length > 0) {
        toast({
          title: "Searching grants...",
          description: `Looking for grants matching "${searchTerm}"${startDateStr ? ` from ${startDateStr}` : ''}${endDateStr ? ` to ${endDateStr}` : ''}`,
          duration: 2000,
        });
      }
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [searchTerm, startDateStr, endDateStr, onSearch, toast]);

  return (
    <Card className="p-6 space-y-4 bg-white/80 backdrop-blur-sm border border-purple-100 shadow-lg hover:shadow-xl transition-all duration-300">
      <div className="flex items-center gap-2 text-sm font-medium text-purple-700">
        <Filter className="h-4 w-4" />
        <span>Search & Filters</span>
      </div>
      
      <div className="flex gap-4 items-center w-full">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-purple-400 transition-colors group-focus-within:text-purple-600" />
          <Input
            type="text"
            placeholder="Search grants..."
            value={searchTerm}
            className="pl-10 h-12 bg-white/50 backdrop-blur-sm border border-purple-100 shadow-sm transition-all duration-300 focus:shadow-md focus:border-purple-300 focus:ring-purple-300"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <Input
          type="date"
          placeholder="Start Date"
          value={startDateStr}
          className="h-12 w-40 bg-white/50 backdrop-blur-sm border border-purple-100 shadow-sm transition-all duration-300 focus:shadow-md focus:border-purple-300 focus:ring-purple-300"
          onChange={(e) => setStartDateStr(e.target.value)}
        />
        
        <Input
          type="date"
          placeholder="End Date"
          value={endDateStr}
          className="h-12 w-40 bg-white/50 backdrop-blur-sm border border-purple-100 shadow-sm transition-all duration-300 focus:shadow-md focus:border-purple-300 focus:ring-purple-300"
          onChange={(e) => setEndDateStr(e.target.value)}
        />
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
