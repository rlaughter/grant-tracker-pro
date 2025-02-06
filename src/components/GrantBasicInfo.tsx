
import { Card } from "@/components/ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronDown } from "lucide-react";

interface GrantBasicInfoProps {
  grant: {
    applicationNumber: string;
    grantNumber: string;
    name: string;
    department: string;
    masterGrantNumber: string;
    cfdaNumber: string;
  };
}

export const GrantBasicInfo = ({ grant }: GrantBasicInfoProps) => {
  return (
    <Collapsible className="w-full">
      <Card className="p-6">
        <CollapsibleTrigger className="flex items-center justify-between w-full">
          <h3 className="font-medium text-lg">Basic Information</h3>
          <ChevronDown className="h-4 w-4" />
        </CollapsibleTrigger>
        <CollapsibleContent className="pt-4">
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-4">
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
        </CollapsibleContent>
      </Card>
    </Collapsible>
  );
};
