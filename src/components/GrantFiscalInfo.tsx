
import { Card } from "@/components/ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ChevronDown, Edit } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

interface FiscalInfo {
  startYear: number;
  startMonth: string;
  endYear: number;
  endMonth: string;
  requestedAmount: number;
  awardedAmount: number;
}

interface GrantFiscalInfoProps {
  fiscal: FiscalInfo;
  onUpdate?: (updatedFiscal: FiscalInfo) => void;
}

const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

export const GrantFiscalInfo = ({ fiscal, onUpdate }: GrantFiscalInfoProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState(fiscal);
  const { toast } = useToast();

  const handleInputChange = (field: keyof FiscalInfo, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      [field]: field.includes('Year') || field.includes('Amount') ? Number(value) : value
    }));
  };

  const handleSubmit = () => {
    if (onUpdate) {
      onUpdate(formData);
    }
    setIsOpen(false);
    toast({
      title: "Fiscal Information Updated",
      description: "The fiscal information has been successfully updated.",
    });
  };

  return (
    <Collapsible defaultOpen className="w-full">
      <Card className="p-6">
        <div className="flex items-center justify-between w-full">
          <CollapsibleTrigger className="flex items-center gap-2">
            <h3 className="font-medium text-lg">Fiscal Information</h3>
            <ChevronDown className="h-4 w-4" />
          </CollapsibleTrigger>
          {onUpdate && (
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
              <DialogTrigger asChild>
                <Button size="sm">
                  <Edit className="h-4 w-4 mr-2" />
                  Edit
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Edit Fiscal Information</DialogTitle>
                </DialogHeader>
                <div className="grid gap-6 py-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="startYear">Start Year</Label>
                      <Input
                        id="startYear"
                        type="number"
                        value={formData.startYear}
                        onChange={(e) => handleInputChange("startYear", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="startMonth">Start Month</Label>
                      <Select
                        value={formData.startMonth}
                        onValueChange={(value) => handleInputChange("startMonth", value)}
                      >
                        <SelectTrigger className="bg-white border-purple-100 hover:border-purple-200">
                          <SelectValue placeholder="Select month" />
                        </SelectTrigger>
                        <SelectContent className="bg-white/95 backdrop-blur-sm border-purple-100 shadow-lg z-50">
                          {months.map((month) => (
                            <SelectItem 
                              key={month} 
                              value={month}
                              className="hover:bg-purple-50"
                            >
                              {month}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="endYear">End Year</Label>
                      <Input
                        id="endYear"
                        type="number"
                        value={formData.endYear}
                        onChange={(e) => handleInputChange("endYear", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="endMonth">End Month</Label>
                      <Select
                        value={formData.endMonth}
                        onValueChange={(value) => handleInputChange("endMonth", value)}
                      >
                        <SelectTrigger className="bg-white border-purple-100 hover:border-purple-200">
                          <SelectValue placeholder="Select month" />
                        </SelectTrigger>
                        <SelectContent className="bg-white/95 backdrop-blur-sm border-purple-100 shadow-lg z-50">
                          {months.map((month) => (
                            <SelectItem 
                              key={month} 
                              value={month}
                              className="hover:bg-purple-50"
                            >
                              {month}
                            </SelectItem>
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
          )}
        </div>
        <CollapsibleContent className="pt-4">
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Start Year</p>
              <p className="font-medium">{fiscal.startYear}</p>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Start Month</p>
              <p className="font-medium">{fiscal.startMonth}</p>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">End Year</p>
              <p className="font-medium">{fiscal.endYear}</p>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">End Month</p>
              <p className="font-medium">{fiscal.endMonth}</p>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Requested Amount</p>
              <p className="font-medium">${fiscal.requestedAmount.toLocaleString()}</p>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Awarded Amount</p>
              <p className="font-medium">${fiscal.awardedAmount.toLocaleString()}</p>
            </div>
          </div>
        </CollapsibleContent>
      </Card>
    </Collapsible>
  );
};
