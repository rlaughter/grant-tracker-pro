
import { useMemo } from "react";
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
import { GrantsTable } from "@/components/grants/GrantsTable";
import { mockGrants } from "@/data/mockData";
import { FilterState } from "@/types/grant";

interface GrantsListingProps {
  searchQuery: string;
  filters: FilterState;
}

export const GrantsListing = ({ searchQuery, filters }: GrantsListingProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleRowClick = (grantId: number) => {
    navigate(`/grants/${grantId}`);
  };

  const handleSpecialistChange = (specialistName: string) => {
    toast({
      title: "Specialist Updated",
      description: `Grant specialist has been updated to ${specialistName}`,
    });
  };

  const filteredGrants = useMemo(() => {
    return mockGrants.filter(grant => {
      // Search filter - check if any field contains the search query
      const matchesSearch = !searchQuery || 
        Object.values(grant).some(value => 
          String(value).toLowerCase().includes(searchQuery.toLowerCase())
        );

      // Status filter
      const matchesStatus = !filters.status || grant.status === filters.status;

      // Type filter
      const matchesType = !filters.type || grant.type === filters.type;

      // Specialist filter
      const matchesSpecialist = !filters.specialist || grant.specialist === filters.specialist;

      // Department filter
      const matchesDepartment = !filters.department || grant.department === filters.department;

      // All filters must match for the grant to be included
      return matchesSearch && 
             matchesStatus && 
             matchesType && 
             matchesSpecialist && 
             matchesDepartment;
    });
  }, [searchQuery, filters]);

  return (
    <div className="space-y-4">
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
