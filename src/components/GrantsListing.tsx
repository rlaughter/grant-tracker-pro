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
import { isWithinInterval, parseISO } from "date-fns";

interface GrantsListingProps {
  searchQuery: string;
  filters: FilterState;
  startDate?: Date | null;
  endDate?: Date | null;
}

export const GrantsListing = ({ searchQuery, filters, startDate, endDate }: GrantsListingProps) => {
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

  const searchFields = [
    'applicationNumber',
    'grantNumber',
    'name',
    'department',
    'specialist',
    'type',
    'status',
    'restrictions'
  ];

  const filteredGrants = useMemo(() => {
    return mockGrants.filter(grant => {
      // Search filter - check multiple fields for the search query
      const matchesSearch = !searchQuery || searchFields.some(field => 
        String(grant[field as keyof typeof grant])
          .toLowerCase()
          .includes(searchQuery.toLowerCase())
      );

      // Status filter
      const matchesStatus = !filters.status || grant.status === filters.status;

      // Type filter
      const matchesType = !filters.type || grant.type === filters.type;

      // Specialist filter
      const matchesSpecialist = !filters.specialist || grant.specialist === filters.specialist;

      // Department filter
      const matchesDepartment = !filters.department || grant.department === filters.department;

      // Date range filter
      const matchesDateRange = (() => {
        if (!startDate && !endDate) return true;
        
        const grantStartDate = parseISO(grant.startDate);
        const grantEndDate = parseISO(grant.endDate);

        if (startDate && endDate) {
          return isWithinInterval(grantStartDate, { start: startDate, end: endDate }) ||
                 isWithinInterval(grantEndDate, { start: startDate, end: endDate });
        }
        
        if (startDate) {
          return grantStartDate >= startDate || grantEndDate >= startDate;
        }
        
        if (endDate) {
          return grantStartDate <= endDate || grantEndDate <= endDate;
        }

        return true;
      })();

      return matchesSearch && 
             matchesStatus && 
             matchesType && 
             matchesSpecialist && 
             matchesDepartment &&
             matchesDateRange;
    });
  }, [searchQuery, filters, startDate, endDate]);

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
