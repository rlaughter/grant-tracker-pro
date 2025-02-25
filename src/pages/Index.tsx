
import { GrantsListing } from "@/components/GrantsListing";
import { GrantFilters } from "@/components/GrantFilters";
import { useState } from "react";
import { FilterState } from "@/types/grant";
import { TestPrimeVue } from "@/components/TestPrimeVue";

export default function Index() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState<FilterState>({
    status: "",
    type: "",
    specialist: "",
    department: "",
  });
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  return (
    <div className="container mx-auto py-6 space-y-6">
      <TestPrimeVue />
      <GrantFilters
        filters={filters}
        onFiltersChange={setFilters}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        startDate={startDate}
        endDate={endDate}
        onStartDateChange={setStartDate}
        onEndDateChange={setEndDate}
      />
      <GrantsListing
        searchQuery={searchQuery}
        filters={filters}
        startDate={startDate}
        endDate={endDate}
      />
    </div>
  );
}
