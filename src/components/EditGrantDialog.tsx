
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Edit } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface EditGrantDialogProps {
  grant: {
    id: number;
    applicationNumber: string;
    grantNumber: string;
    name: string;
    amount: number;
    specialist: string;
    status: string;
    type: string;
    department: string;
    grantorType: string;
    grantorId: string;
    masterGrantNumber: string | null;
    cfdaNumber: string | null;
    grantorInfo: {
      name: string;
      contact: string;
      phone: string;
      email: string;
      address: string;
    };
  };
  onUpdate: (updatedGrant: any) => void;
}

export const EditGrantDialog = ({ grant, onUpdate }: EditGrantDialogProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState(grant);
  const { toast } = useToast();

  const handleInputChange = (field: string, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleGrantorInfoChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      grantorInfo: {
        ...prev.grantorInfo,
        [field]: value
      }
    }));
  };

  const handleSubmit = () => {
    onUpdate(formData);
    setIsOpen(false);
    toast({
      title: "Grant Updated",
      description: "The grant has been successfully updated.",
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button size="sm">
          <Edit className="h-4 w-4 mr-2" />
          Edit
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Edit Grant</DialogTitle>
        </DialogHeader>
        <div className="grid gap-6 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Grant Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="amount">Amount</Label>
              <Input
                id="amount"
                type="number"
                value={formData.amount}
                onChange={(e) => handleInputChange("amount", Number(e.target.value))}
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
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Pending">Pending</SelectItem>
                  <SelectItem value="Expired">Expired</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="type">Type</Label>
              <Select
                value={formData.type}
                onValueChange={(value) => handleInputChange("type", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Federal">Federal</SelectItem>
                  <SelectItem value="State">State</SelectItem>
                  <SelectItem value="Local">Local</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-medium">Grantor Information</h4>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="grantorName">Grantor Name</Label>
                <Input
                  id="grantorName"
                  value={formData.grantorInfo.name}
                  onChange={(e) => handleGrantorInfoChange("name", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="grantorContact">Contact Person</Label>
                <Input
                  id="grantorContact"
                  value={formData.grantorInfo.contact}
                  onChange={(e) => handleGrantorInfoChange("contact", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="grantorPhone">Phone</Label>
                <Input
                  id="grantorPhone"
                  value={formData.grantorInfo.phone}
                  onChange={(e) => handleGrantorInfoChange("phone", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="grantorEmail">Email</Label>
                <Input
                  id="grantorEmail"
                  value={formData.grantorInfo.email}
                  onChange={(e) => handleGrantorInfoChange("email", e.target.value)}
                />
              </div>
              <div className="space-y-2 col-span-2">
                <Label htmlFor="grantorAddress">Address</Label>
                <Input
                  id="grantorAddress"
                  value={formData.grantorInfo.address}
                  onChange={(e) => handleGrantorInfoChange("address", e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSubmit}>
              Save Changes
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
