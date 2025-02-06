
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";

const NewGrant = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    applicationNumber: "",
    grantNumber: "",
    status: "active",
    grantType: "local",
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
    // Here you would typically save the grant data
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
            <Card className="p-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="applicationNumber">Application #</Label>
                  <Input
                    id="applicationNumber"
                    value={formData.applicationNumber}
                    onChange={(e) => handleInputChange("applicationNumber", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="grantNumber">Grant #</Label>
                  <Input
                    id="grantNumber"
                    value={formData.grantNumber}
                    onChange={(e) => handleInputChange("grantNumber", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <Select
                    value={formData.status}
                    onValueChange={(value) => handleInputChange("status", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="grantType">Grant Type</Label>
                  <Select
                    value={formData.grantType}
                    onValueChange={(value) => handleInputChange("grantType", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="federal">Federal</SelectItem>
                      <SelectItem value="state">State</SelectItem>
                      <SelectItem value="local">Local</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="col-span-2 space-y-2">
                  <Label htmlFor="name">Grant Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="department">Department</Label>
                  <Input
                    id="department"
                    value={formData.department}
                    onChange={(e) => handleInputChange("department", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="masterGrantNumber">Master Grant Number</Label>
                  <Input
                    id="masterGrantNumber"
                    value={formData.masterGrantNumber}
                    onChange={(e) => handleInputChange("masterGrantNumber", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="cfdaNumber">Federal CFDA Number</Label>
                  <Input
                    id="cfdaNumber"
                    value={formData.cfdaNumber}
                    onChange={(e) => handleInputChange("cfdaNumber", e.target.value)}
                  />
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="grantor" className="space-y-4">
            <Card className="p-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="grantorId">CID (Grantor ID)</Label>
                  <Input
                    id="grantorId"
                    value={formData.grantorId}
                    onChange={(e) => handleInputChange("grantorId", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="grantorContact">Contact Name</Label>
                  <Input
                    id="grantorContact"
                    value={formData.grantorContact}
                    onChange={(e) => handleInputChange("grantorContact", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="grantorPhone">Phone</Label>
                  <Input
                    id="grantorPhone"
                    value={formData.grantorPhone}
                    onChange={(e) => handleInputChange("grantorPhone", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="grantorEmail">Email</Label>
                  <Input
                    id="grantorEmail"
                    value={formData.grantorEmail}
                    onChange={(e) => handleInputChange("grantorEmail", e.target.value)}
                  />
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="fiscal" className="space-y-4">
            <Card className="p-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="startFiscalYear">Starting Fiscal Year</Label>
                  <Input
                    id="startFiscalYear"
                    value={formData.startFiscalYear}
                    onChange={(e) => handleInputChange("startFiscalYear", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="startFiscalMonth">Starting Fiscal Month</Label>
                  <Select
                    value={formData.startFiscalMonth}
                    onValueChange={(value) => handleInputChange("startFiscalMonth", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select month" />
                    </SelectTrigger>
                    <SelectContent>
                      {["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"].map((month) => (
                        <SelectItem key={month} value={month.toLowerCase()}>{month}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="endFiscalYear">Ending Fiscal Year</Label>
                  <Input
                    id="endFiscalYear"
                    value={formData.endFiscalYear}
                    onChange={(e) => handleInputChange("endFiscalYear", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="endFiscalMonth">Ending Fiscal Month</Label>
                  <Select
                    value={formData.endFiscalMonth}
                    onValueChange={(value) => handleInputChange("endFiscalMonth", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select month" />
                    </SelectTrigger>
                    <SelectContent>
                      {["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"].map((month) => (
                        <SelectItem key={month} value={month.toLowerCase()}>{month}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="requestedAmount">Requested Amount</Label>
                  <Input
                    id="requestedAmount"
                    type="number"
                    value={formData.requestedAmount}
                    onChange={(e) => handleInputChange("requestedAmount", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="awardedAmount">Awarded Amount</Label>
                  <Input
                    id="awardedAmount"
                    type="number"
                    value={formData.awardedAmount}
                    onChange={(e) => handleInputChange("awardedAmount", e.target.value)}
                  />
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="matching" className="space-y-4">
            <Card className="p-6">
              <p className="text-muted-foreground">Matching and billing information will be implemented in the next phase.</p>
            </Card>
          </TabsContent>

          <TabsContent value="subgrants" className="space-y-4">
            <Card className="p-6">
              <p className="text-muted-foreground">Sub-grants information will be implemented in the next phase.</p>
            </Card>
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
