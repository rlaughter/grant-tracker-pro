
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface GrantorInfoFormProps {
  formData: {
    grantorId: string;
    grantorContact: string;
    grantorPhone: string;
    grantorEmail: string;
  };
  handleInputChange: (field: string, value: string) => void;
}

export const GrantorInfoForm = ({ formData, handleInputChange }: GrantorInfoFormProps) => {
  return (
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
  );
};
