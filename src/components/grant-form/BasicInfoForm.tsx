
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface BasicInfoFormProps {
  formData: {
    name: string;
    applicationNumber: string;
    grantNumber: string;
    status: string;
    grantType: string;
    department: string;
    masterGrantNumber: string;
    cfdaNumber: string;
  };
  handleInputChange: (field: string, value: string) => void;
}

export const BasicInfoForm = ({ formData, handleInputChange }: BasicInfoFormProps) => {
  return (
    <Card className="p-6">
      <div className="grid grid-cols-2 gap-6">
        <div className="col-span-2 space-y-2">
          <Label htmlFor="name" className="after:content-['*'] after:ml-0.5 after:text-red-500">Grant Name</Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => handleInputChange("name", e.target.value)}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="applicationNumber" className="after:content-['*'] after:ml-0.5 after:text-red-500">Application #</Label>
          <Input
            id="applicationNumber"
            value={formData.applicationNumber}
            onChange={(e) => handleInputChange("applicationNumber", e.target.value)}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="grantNumber" className="after:content-['*'] after:ml-0.5 after:text-red-500">Grant #</Label>
          <Input
            id="grantNumber"
            value={formData.grantNumber}
            onChange={(e) => handleInputChange("grantNumber", e.target.value)}
            required
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
          <Label htmlFor="grantType" className="after:content-['*'] after:ml-0.5 after:text-red-500">Grant Type</Label>
          <Select
            value={formData.grantType}
            onValueChange={(value) => handleInputChange("grantType", value)}
            required
          >
            <SelectTrigger>
              <SelectValue placeholder="Please Select" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="none">Please Select</SelectItem>
              <SelectItem value="federal">Federal</SelectItem>
              <SelectItem value="state">State</SelectItem>
              <SelectItem value="local">Local</SelectItem>
            </SelectContent>
          </Select>
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
  );
};
