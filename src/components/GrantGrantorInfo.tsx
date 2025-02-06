
import { Card } from "@/components/ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronDown } from "lucide-react";

interface GrantorInfo {
  name: string;
  contact: string;
  phone: string;
  email: string;
  address: string;
}

interface GrantGrantorInfoProps {
  grantorInfo: GrantorInfo;
}

export const GrantGrantorInfo = ({ grantorInfo }: GrantGrantorInfoProps) => {
  return (
    <Collapsible defaultOpen className="w-full">
      <Card className="p-6">
        <CollapsibleTrigger className="flex items-center justify-between w-full">
          <h3 className="font-medium text-lg">Grantor Information</h3>
          <ChevronDown className="h-4 w-4" />
        </CollapsibleTrigger>
        <CollapsibleContent className="pt-4">
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Grantor Name</p>
              <p className="font-medium">{grantorInfo.name}</p>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Contact Person</p>
              <p className="font-medium">{grantorInfo.contact}</p>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Phone</p>
              <p className="font-medium">{grantorInfo.phone}</p>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">Email</p>
              <p className="font-medium">{grantorInfo.email}</p>
            </div>
            <div className="space-y-2 col-span-2">
              <p className="text-sm text-muted-foreground">Address</p>
              <p className="font-medium">{grantorInfo.address}</p>
            </div>
          </div>
        </CollapsibleContent>
      </Card>
    </Collapsible>
  );
};
