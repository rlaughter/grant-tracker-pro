
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SearchBar } from "@/components/SearchBar";
import { specialists } from "@/data/mockData";
import { FilterState } from "@/types/grant";

interface GrantFiltersProps {
  onSearch: (query: string) => void;
  onFilterChange: (key: keyof FilterState, value: string) => void;
}

export const GrantFilters = ({ onSearch, onFilterChange }: GrantFiltersProps) => {
  return (
    <div className="space-y-4">
      <SearchBar onSearch={onSearch} placeholder="Search grants..." />
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Select onValueChange={(value) => onFilterChange('status', value)}>
          <SelectTrigger>
            <SelectValue placeholder="Filter by Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">All Statuses</SelectItem>
            <SelectItem value="Active">Active</SelectItem>
            <SelectItem value="Pending">Pending</SelectItem>
            <SelectItem value="Expired">Expired</SelectItem>
          </SelectContent>
        </Select>

        <Select onValueChange={(value) => onFilterChange('type', value)}>
          <SelectTrigger>
            <SelectValue placeholder="Filter by Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">All Types</SelectItem>
            <SelectItem value="Federal">Federal</SelectItem>
            <SelectItem value="State">State</SelectItem>
            <SelectItem value="Local">Local</SelectItem>
          </SelectContent>
        </Select>

        <Select onValueChange={(value) => onFilterChange('specialist', value)}>
          <SelectTrigger>
            <SelectValue placeholder="Filter by Specialist" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">All Specialists</SelectItem>
            {specialists.map((specialist) => (
              <SelectItem key={specialist.id} value={specialist.name}>
                {specialist.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select onValueChange={(value) => onFilterChange('department', value)}>
          <SelectTrigger>
            <SelectValue placeholder="Filter by Department" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">All Departments</SelectItem>
            <SelectItem value="Community Services">Community Services</SelectItem>
            <SelectItem value="Education">Education</SelectItem>
            <SelectItem value="Environmental Services">Environmental Services</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};
