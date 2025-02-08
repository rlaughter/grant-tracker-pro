import { useParams } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GrantDetailHeader } from "@/components/GrantDetailHeader";
import { GrantDocuments } from "@/components/GrantDocuments";
import { GrantTimeline } from "@/components/GrantTimeline";
import { GrantBasicInfo } from "@/components/GrantBasicInfo";
import { GrantGrantorInfo } from "@/components/GrantGrantorInfo";
import { GrantFiscalInfo } from "@/components/GrantFiscalInfo";
import { GrantFinancialTracking } from "@/components/GrantFinancialTracking";
import { useToast } from "@/hooks/use-toast";
import { mockGrants, mockGrantHistory } from "@/data/mockData";
import type { Grant } from "@/types/grant";

const GrantDetail = () => {
  const { id } = useParams();
  const { toast } = useToast();

  // Find the grant in mockGrants
  const grantData = mockGrants.find(g => g.id === Number(id));

  // Mock data combining grant data with additional fields
  const grant = {
    ...grantData,
    grantorType: "Federal",
    grantorId: "FED-001",
    masterGrantNumber: "MGN-2024-001",
    cfdaNumber: "14.218",
    grantorInfo: {
      name: "Department of Education",
      contact: "Jane Smith",
      phone: "(555) 123-4567",
      email: "jane.smith@ed.gov",
      address: "123 Education Ave, Washington DC"
    },
    fiscal: {
      startYear: 2024,
      startMonth: "January",
      endYear: 2025,
      endMonth: "December",
      requestedAmount: 300000,
      awardedAmount: 250000
    }
  };

  const handleFiscalUpdate = (updatedFiscal: any) => {
    // Update mock grants
    const grantIndex = mockGrants.findIndex(g => g.id === grant.id);
    if (grantIndex !== -1) {
      mockGrants[grantIndex] = {
        ...mockGrants[grantIndex],
        fiscal: updatedFiscal
      };
    }

    // Add to history log
    const newHistoryEntry: GrantHistoryEntry = {
      id: mockGrantHistory.length + 1,
      grantId: grant.id,
      changeDate: new Date().toISOString(),
      changedBy: "Current User", // In a real app, this would come from auth context
      field: "fiscal",
      oldValue: JSON.stringify(grant.fiscal),
      newValue: JSON.stringify(updatedFiscal),
      changeType: "update" as const,
      status: grant.status,
      grantType: grant.type,
      specialist: grant.specialist,
      department: grant.department
    };

    mockGrantHistory.push(newHistoryEntry);

    toast({
      title: "Fiscal Information Updated",
      description: "The fiscal information has been successfully updated.",
    });
  };

  if (!grant) {
    return <div>Grant not found</div>;
  }

  return (
    <div className="min-h-screen p-8 space-y-8 animate-fade-in">
      <GrantDetailHeader grant={grant} />
      
      <Tabs defaultValue="details" className="w-full">
        <TabsList className="grid w-full max-w-2xl grid-cols-3">
          <TabsTrigger value="details" className="flex items-center gap-2">
            Details & Finances
          </TabsTrigger>
          <TabsTrigger value="documents" className="flex items-center gap-2">
            Documents
          </TabsTrigger>
          <TabsTrigger value="timeline" className="flex items-center gap-2">
            Timeline
          </TabsTrigger>
        </TabsList>

        <TabsContent value="details">
          <div className="grid gap-6">
            <GrantBasicInfo grant={grant} />
            <GrantGrantorInfo grantorInfo={grant.grantorInfo} />
            <GrantFiscalInfo fiscal={grant.fiscal} onUpdate={handleFiscalUpdate} />
            <GrantFinancialTracking grantId={grant.id} />
          </div>
        </TabsContent>

        <TabsContent value="documents">
          <GrantDocuments grantId={grant.id} />
        </TabsContent>

        <TabsContent value="timeline">
          <GrantTimeline grantId={grant.id} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default GrantDetail;
