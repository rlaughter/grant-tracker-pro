
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

interface FiscalInfoFormProps {
  formData: {
    startFiscalYear: string;
    startFiscalMonth: string;
    endFiscalYear: string;
    endFiscalMonth: string;
    requestedAmount: string;
    awardedAmount: string;
  };
  handleInputChange: (field: string, value: string) => void;
}

export const FiscalInfoForm = ({ formData, handleInputChange }: FiscalInfoFormProps) => {
  return (
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
  );
};
