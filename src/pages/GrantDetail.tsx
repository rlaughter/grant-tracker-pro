
import { useParams } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, DollarSign, Calendar, Users, Clock, FileSpreadsheet, FilePieChart } from "lucide-react";
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
      
      <Tabs defaultValue="basic" className="w-full">
        <TabsList className="grid w-full max-w-4xl grid-cols-7">
          <TabsTrigger value="basic" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            Basic Info
          </TabsTrigger>
          <TabsTrigger value="grantor" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            Grantor
          </TabsTrigger>
          <TabsTrigger value="fiscal" className="flex items-center gap-2">
            <DollarSign className="h-4 w-4" />
            Fiscal
          </TabsTrigger>
          <TabsTrigger value="dates" className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            Dates
          </TabsTrigger>
          <TabsTrigger value="matching" className="flex items-center gap-2">
            <FilePieChart className="h-4 w-4" />
            Matching
          </TabsTrigger>
          <TabsTrigger value="documents" className="flex items-center gap-2">
            <FileSpreadsheet className="h-4 w-4" />
            Documents
          </TabsTrigger>
          <TabsTrigger value="timeline" className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            Timeline
          </TabsTrigger>
        </TabsList>

        <TabsContent value="basic">
          <Card className="p-6">
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="font-medium text-lg">Grant Details</h3>
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
                <h3 className="font-medium text-lg">Additional Information</h3>
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
          </Card>
        </TabsContent>

        <TabsContent value="grantor">
          <Card className="p-6">
            <div className="space-y-6">
              <h3 className="font-medium text-lg">Grantor Information</h3>
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
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="fiscal">
          <Card className="p-6">
            <div className="space-y-6">
              <h3 className="font-medium text-lg">Fiscal Information</h3>
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
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="dates">
          <GrantTimeline grantId={grant.id} />
        </TabsContent>

        <TabsContent value="matching">
          <Card className="p-6">
            <div className="space-y-6">
              <h3 className="font-medium text-lg">Matching Requirements</h3>
              <div className="grid grid-cols-2 gap-6">
                <GrantFinancials grantId={grant.id} />
              </div>
            </div>
          </Card>
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
