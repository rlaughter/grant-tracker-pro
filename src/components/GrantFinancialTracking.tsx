
import { Card } from "@/components/ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronDown } from "lucide-react";
import { GrantFinancials } from "@/components/GrantFinancials";

interface GrantFinancialTrackingProps {
  grantId: number;
}

export const GrantFinancialTracking = ({ grantId }: GrantFinancialTrackingProps) => {
  return (
    <Collapsible className="w-full">
      <Card className="p-6">
        <CollapsibleTrigger className="flex items-center justify-between w-full">
          <h3 className="font-medium text-lg">Financial Tracking</h3>
          <ChevronDown className="h-4 w-4" />
        </CollapsibleTrigger>
        <CollapsibleContent className="pt-4">
          <GrantFinancials grantId={grantId} />
        </CollapsibleContent>
      </Card>
    </Collapsible>
  );
};
