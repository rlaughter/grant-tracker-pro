import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { BasicInfoForm } from "@/components/grant-form/BasicInfoForm";
import { GrantorInfoForm } from "@/components/grant-form/GrantorInfoForm";
import { FiscalInfoForm } from "@/components/grant-form/FiscalInfoForm";
import { PlaceholderForm } from "@/components/grant-form/PlaceholderForm";
import { auditService } from "@/services/AuditService";

const NewGrant = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    applicationNumber: "",
    grantNumber: "",
    status: "active",
    grantType: "none",
    name: "",
    department: "",
    masterGrantNumber: "",
    cfdaNumber: "",
    grantorId: "",
    grantorContact: "",
    grantorPhone: "",
    grantorEmail: "",
    startFiscalYear: "",
    startFiscalMonth: "",
    endFiscalYear: "",
    endFiscalMonth: "",
    requestedAmount: "",
    awardedAmount: "",
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate required fields
    if (!formData.name || !formData.applicationNumber || !formData.grantNumber) {
      toast({
        title: "Error",
        description: "Please fill in all required fields: Grant Name, Application #, and Grant #",
        variant: "destructive",
      });
      return;
    }

    // Validate grant type
    if (!formData.grantType || formData.grantType === "none") {
      toast({
        title: "Error",
        description: "Please select a Grant Type",
        variant: "destructive",
      });
      return;
    }

    // Log the creation action
    auditService.logAction(
      "current-user-id",
      "Current User",
      "create",
      1 //mockGrants.length + 1 - mockGrants is not available here
    );

    toast({
      title: "Success",
      description: "Grant created successfully",
    });
    navigate("/");
  };

  return (
    <div className="min-h-screen p-8 space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">New Grant Entry</h1>
          <p className="text-muted-foreground">Create a new grant record</p>
        </div>
        <Button variant="outline" onClick={() => navigate("/")}>
          Cancel
        </Button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Tabs defaultValue="basic" className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="basic">Basic Info</TabsTrigger>
            <TabsTrigger value="grantor">Grantor Info</TabsTrigger>
            <TabsTrigger value="fiscal">Fiscal Info</TabsTrigger>
            <TabsTrigger value="matching">Matching/Billing</TabsTrigger>
            <TabsTrigger value="subgrants">Sub-Grants</TabsTrigger>
          </TabsList>

          <TabsContent value="basic" className="space-y-4">
            <BasicInfoForm formData={formData} handleInputChange={handleInputChange} />
          </TabsContent>

          <TabsContent value="grantor" className="space-y-4">
            <GrantorInfoForm formData={formData} handleInputChange={handleInputChange} />
          </TabsContent>

          <TabsContent value="fiscal" className="space-y-4">
            <FiscalInfoForm formData={formData} handleInputChange={handleInputChange} />
          </TabsContent>

          <TabsContent value="matching" className="space-y-4">
            <PlaceholderForm title="Matching and billing information" />
          </TabsContent>

          <TabsContent value="subgrants" className="space-y-4">
            <PlaceholderForm title="Sub-grants information" />
          </TabsContent>
        </Tabs>

        <div className="flex justify-end gap-4">
          <Button variant="outline" type="button" onClick={() => navigate("/")}>
            Cancel
          </Button>
          <Button type="submit">Create Grant</Button>
        </div>
      </form>
    </div>
  );
};

export default NewGrant;
