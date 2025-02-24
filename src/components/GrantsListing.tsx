
import { useMemo, useState } from "react";
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

const ITEMS_PER_PAGE = 10;

export const GrantsListing = ({ searchQuery, filters, startDate, endDate }: GrantsListingProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [currentPage, setCurrentPage] = useState(1);

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

  // Pagination calculations
  const totalPages = Math.ceil(filteredGrants.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedGrants = filteredGrants.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  // Generate page numbers to display
  const getPageNumbers = () => {
    if (totalPages <= 1) return [];
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  };

  return (
    <div className="space-y-4">
      <GrantsTable 
        grants={paginatedGrants}
        onRowClick={handleRowClick}
        onSpecialistChange={handleSpecialistChange}
      />

      {totalPages > 1 && (
        <Pagination>
          <PaginationContent>
            {currentPage > 1 && (
              <PaginationItem>
                <PaginationPrevious 
                  href="#" 
                  onClick={(e) => {
                    e.preventDefault();
                    setCurrentPage(prev => prev - 1);
                  }} 
                />
              </PaginationItem>
            )}
            
            {getPageNumbers().map(pageNum => (
              <PaginationItem key={pageNum}>
                <PaginationLink 
                  href="#" 
                  isActive={currentPage === pageNum}
                  onClick={(e) => {
                    e.preventDefault();
                    setCurrentPage(pageNum);
                  }}
                >
                  {pageNum}
                </PaginationLink>
              </PaginationItem>
            ))}

            {currentPage < totalPages && (
              <PaginationItem>
                <PaginationNext 
                  href="#" 
                  onClick={(e) => {
                    e.preventDefault();
                    setCurrentPage(prev => prev + 1);
                  }} 
                />
              </PaginationItem>
            )}
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
};
