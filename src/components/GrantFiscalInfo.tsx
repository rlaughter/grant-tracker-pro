
import { Card } from "@/components/ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronDown } from "lucide-react";

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
}

export const GrantFiscalInfo = ({ fiscal }: GrantFiscalInfoProps) => {
  return (
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
