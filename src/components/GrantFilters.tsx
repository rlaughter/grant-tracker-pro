import { Card } from "@/components/ui/card";
import { Calendar, DollarSign, Filter, User } from "lucide-react";

export const GrantFilters = () => {
  return (
    <Card className="p-4 space-y-4">
      <div className="flex items-center gap-2 text-sm font-medium">
        <Filter className="h-4 w-4" />
        <span>Filters</span>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            Status
          </label>
          <select className="w-full rounded-md border border-input bg-background px-3 py-2">
            <option value="">All Statuses</option>
            <option value="active">Active</option>
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium flex items-center gap-2">
            <DollarSign className="h-4 w-4" />
            Type
          </label>
          <select className="w-full rounded-md border border-input bg-background px-3 py-2">
            <option value="">All Types</option>
            <option value="federal">Federal</option>
            <option value="state">State</option>
            <option value="local">Local</option>
          </select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium flex items-center gap-2">
            <User className="h-4 w-4" />
            Specialist
          </label>
          <select className="w-full rounded-md border border-input bg-background px-3 py-2">
            <option value="">All Specialists</option>
            <option value="john">John Doe</option>
            <option value="jane">Jane Smith</option>
            <option value="mike">Mike Johnson</option>
          </select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            Date Range
          </label>
          <select className="w-full rounded-md border border-input bg-background px-3 py-2">
            <option value="">All Time</option>
            <option value="this-month">This Month</option>
            <option value="last-3-months">Last 3 Months</option>
            <option value="this-year">This Year</option>
          </select>
        </div>
      </div>
    </Card>
  );
};