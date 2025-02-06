
import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { GrantFilters } from "@/components/grants/GrantFilters";
import { GrantsTable } from "@/components/grants/GrantsTable";
import { mockGrants } from "@/data/mockData";
import { FilterState } from "@/types/grant";

export const GrantsListing = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState<FilterState>({
    status: "",
    type: "",
    specialist: "",
    department: "",
  });

  const handleRowClick = (grantId: number) => {
    navigate(`/grants/${grantId}`);
  };

  const handleSpecialistChange = (specialistName: string) => {
    toast({
      title: "Specialist Updated",
      description: `Grant specialist has been updated to ${specialistName}`,
    });
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleFilterChange = (key: keyof FilterState, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const filteredGrants = useMemo(() => {
    return mockGrants.filter(grant => {
      const matchesSearch = searchQuery.toLowerCase() === '' || 
        Object.values(grant).some(value => 
          String(value).toLowerCase().includes(searchQuery.toLowerCase())
        );

      const matchesStatus = !filters.status || grant.status === filters.status;
      const matchesType = !filters.type || grant.type === filters.type;
      const matchesSpecialist = !filters.specialist || grant.specialist === filters.specialist;
      const matchesDepartment = !filters.department || grant.department === filters.department;

      return matchesSearch && matchesStatus && matchesType && matchesSpecialist && matchesDepartment;
    });
  }, [searchQuery, filters]);

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4 mb-4">
        <GrantFilters 
          onSearch={handleSearch}
          onFilterChange={handleFilterChange}
        />
      </div>

      <GrantsTable 
        grants={filteredGrants}
        onRowClick={handleRowClick}
        onSpecialistChange={handleSpecialistChange}
      />

      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href="#" />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#" isActive>1</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">2</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">3</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationNext href="#" />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};
