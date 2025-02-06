
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
import { GrantsTable } from "@/components/grants/GrantsTable";
import { mockGrants } from "@/data/mockData";
import { FilterState } from "@/types/grant";

export const GrantsListing = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");

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
    return mockGrants;
  }, []);

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
