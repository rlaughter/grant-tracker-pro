
import { useParams } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GrantDetailHeader } from "@/components/GrantDetailHeader";
import { GrantDocuments } from "@/components/GrantDocuments";
import { GrantTimeline } from "@/components/GrantTimeline";
import { GrantBasicInfo } from "@/components/GrantBasicInfo";
import { GrantGrantorInfo } from "@/components/GrantGrantorInfo";
import { GrantFiscalInfo } from "@/components/GrantFiscalInfo";
import { GrantFinancialTracking } from "@/components/GrantFinancialTracking";

const GrantDetail = () => {
  const { id } = useParams();

  // Mock data - replace with actual data fetching
  const grant = {
    id: Number(id),
    applicationNumber: "APP-2024-001",
    grantNumber: "GRT-2024-001",
    name: "Community Development Grant",
    amount: 250000,
    specialist: "John Doe",
    status: "Active",
    type: "Federal",
    department: "Community Services",
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
            <GrantFiscalInfo fiscal={grant.fiscal} />
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
