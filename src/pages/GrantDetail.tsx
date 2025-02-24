
import { useParams } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GrantDetailHeader } from "@/components/GrantDetailHeader";
import { GrantDocuments } from "@/components/GrantDocuments";
import { GrantTimeline } from "@/components/GrantTimeline";
import { GrantBasicInfo } from "@/components/GrantBasicInfo";
import { GrantGrantorInfo } from "@/components/GrantGrantorInfo";
import { GrantFiscalInfo } from "@/components/GrantFiscalInfo";
import { GrantFinancialTracking } from "@/components/GrantFinancialTracking";
import { AuditTrail } from "@/components/AuditTrail";
import { useToast } from "@/hooks/use-toast";
import { mockGrants } from "@/data/grants";
import { auditService } from "@/services/AuditService";

const GrantDetail = () => {
  const { id } = useParams();
  const { toast } = useToast();
  const grantId = Number(id);

  // Find the grant in mockGrants
  const grantData = mockGrants.find(g => g.id === grantId);

  // Get audit entries for this grant
  const auditEntries = auditService.getAuditLog(grantId);

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
    // Log the update action
    auditService.logAction(
      "current-user-id",
      "Current User",
      "update",
      grantId,
      {
        field: "fiscal",
        oldValue: JSON.stringify(grant.fiscal),
        newValue: JSON.stringify(updatedFiscal)
      }
    );

    // Update mock grants
    const grantIndex = mockGrants.findIndex(g => g.id === grant.id);
    if (grantIndex !== -1) {
      mockGrants[grantIndex] = {
        ...mockGrants[grantIndex],
        fiscal: updatedFiscal
      };
    }

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
        <TabsList className="grid w-full max-w-2xl grid-cols-4">
          <TabsTrigger value="details">
            Details & Finances
          </TabsTrigger>
          <TabsTrigger value="documents">
            Documents
          </TabsTrigger>
          <TabsTrigger value="timeline">
            Timeline
          </TabsTrigger>
          <TabsTrigger value="audit">
            Audit Trail
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

        <TabsContent value="audit">
          <AuditTrail entries={auditEntries} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default GrantDetail;
