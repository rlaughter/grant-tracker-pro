import { useParams } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronDown, ChevronUp } from "lucide-react";
import { GrantDetailHeader } from "@/components/GrantDetailHeader";
import { GrantDocuments } from "@/components/GrantDocuments";
import { GrantFinancials } from "@/components/GrantFinancials";
import { GrantTimeline } from "@/components/GrantTimeline";

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
            <Collapsible className="w-full">
              <Card className="p-6">
                <CollapsibleTrigger className="flex items-center justify-between w-full">
                  <h3 className="font-medium text-lg">Basic Information</h3>
                  <ChevronDown className="h-4 w-4" />
                </CollapsibleTrigger>
                <CollapsibleContent className="pt-4">
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <p className="text-sm text-muted-foreground">Application Number</p>
                        <p className="font-medium">{grant.applicationNumber}</p>
                      </div>
                      <div className="space-y-2">
                        <p className="text-sm text-muted-foreground">Grant Number</p>
                        <p className="font-medium">{grant.grantNumber}</p>
                      </div>
                      <div className="space-y-2">
                        <p className="text-sm text-muted-foreground">Grant Name</p>
                        <p className="font-medium">{grant.name}</p>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <p className="text-sm text-muted-foreground">Department</p>
                        <p className="font-medium">{grant.department}</p>
                      </div>
                      <div className="space-y-2">
                        <p className="text-sm text-muted-foreground">Master Grant Number</p>
                        <p className="font-medium">{grant.masterGrantNumber}</p>
                      </div>
                      <div className="space-y-2">
                        <p className="text-sm text-muted-foreground">CFDA Number</p>
                        <p className="font-medium">{grant.cfdaNumber}</p>
                      </div>
                    </div>
                  </div>
                </CollapsibleContent>
              </Card>
            </Collapsible>

            <Collapsible className="w-full">
              <Card className="p-6">
                <CollapsibleTrigger className="flex items-center justify-between w-full">
                  <h3 className="font-medium text-lg">Grantor Information</h3>
                  <ChevronDown className="h-4 w-4" />
                </CollapsibleTrigger>
                <CollapsibleContent className="pt-4">
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <p className="text-sm text-muted-foreground">Grantor Name</p>
                      <p className="font-medium">{grant.grantorInfo.name}</p>
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm text-muted-foreground">Contact Person</p>
                      <p className="font-medium">{grant.grantorInfo.contact}</p>
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm text-muted-foreground">Phone</p>
                      <p className="font-medium">{grant.grantorInfo.phone}</p>
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm text-muted-foreground">Email</p>
                      <p className="font-medium">{grant.grantorInfo.email}</p>
                    </div>
                    <div className="space-y-2 col-span-2">
                      <p className="text-sm text-muted-foreground">Address</p>
                      <p className="font-medium">{grant.grantorInfo.address}</p>
                    </div>
                  </div>
                </CollapsibleContent>
              </Card>
            </Collapsible>

            <Collapsible className="w-full">
              <Card className="p-6">
                <CollapsibleTrigger className="flex items-center justify-between w-full">
                  <h3 className="font-medium text-lg">Fiscal Information</h3>
                  <ChevronDown className="h-4 w-4" />
                </CollapsibleTrigger>
                <CollapsibleContent className="pt-4">
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <p className="text-sm text-muted-foreground">Start Year</p>
                      <p className="font-medium">{grant.fiscal.startYear}</p>
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm text-muted-foreground">Start Month</p>
                      <p className="font-medium">{grant.fiscal.startMonth}</p>
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm text-muted-foreground">End Year</p>
                      <p className="font-medium">{grant.fiscal.endYear}</p>
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm text-muted-foreground">End Month</p>
                      <p className="font-medium">{grant.fiscal.endMonth}</p>
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm text-muted-foreground">Requested Amount</p>
                      <p className="font-medium">${grant.fiscal.requestedAmount.toLocaleString()}</p>
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm text-muted-foreground">Awarded Amount</p>
                      <p className="font-medium">${grant.fiscal.awardedAmount.toLocaleString()}</p>
                    </div>
                  </div>
                </CollapsibleContent>
              </Card>
            </Collapsible>

            <Collapsible className="w-full">
              <Card className="p-6">
                <CollapsibleTrigger className="flex items-center justify-between w-full">
                  <h3 className="font-medium text-lg">Financial Tracking</h3>
                  <ChevronDown className="h-4 w-4" />
                </CollapsibleTrigger>
                <CollapsibleContent className="pt-4">
                  <GrantFinancials grantId={grant.id} />
                </CollapsibleContent>
              </Card>
            </Collapsible>
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
