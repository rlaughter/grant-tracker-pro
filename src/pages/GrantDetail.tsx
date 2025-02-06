import { useParams } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, DollarSign, Calendar, Users } from "lucide-react";
import { GrantDetailHeader } from "@/components/GrantDetailHeader";
import { GrantDocuments } from "@/components/GrantDocuments";
import { GrantFinancials } from "@/components/GrantFinancials";
import { GrantTimeline } from "@/components/GrantTimeline";

const GrantDetail = () => {
  const { id } = useParams();

  // Mock data - replace with actual data fetching
  const grant = {
    id: Number(id),
    name: "Community Development Grant",
    amount: 250000,
    specialist: "John Doe",
    startDate: "2024-01-01",
    endDate: "2024-12-31",
    status: "Active",
    type: "Federal",
    description: "Supporting local community development initiatives",
    grantor: "Department of Housing and Urban Development",
    grantNumber: "CDG-2024-001",
  };

  return (
    <div className="min-h-screen p-8 space-y-8 animate-fade-in">
      <GrantDetailHeader grant={grant} />
      
      <Tabs defaultValue="documents" className="w-full">
        <TabsList className="grid w-full max-w-2xl grid-cols-4">
          <TabsTrigger value="documents" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            Documents
          </TabsTrigger>
          <TabsTrigger value="financials" className="flex items-center gap-2">
            <DollarSign className="h-4 w-4" />
            Financials
          </TabsTrigger>
          <TabsTrigger value="timeline" className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            Timeline
          </TabsTrigger>
          <TabsTrigger value="team" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            Team
          </TabsTrigger>
        </TabsList>

        <TabsContent value="documents">
          <GrantDocuments grantId={grant.id} />
        </TabsContent>
        
        <TabsContent value="financials">
          <GrantFinancials grantId={grant.id} />
        </TabsContent>
        
        <TabsContent value="timeline">
          <GrantTimeline grantId={grant.id} />
        </TabsContent>
        
        <TabsContent value="team">
          <Card className="p-6">Team management coming soon...</Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default GrantDetail;