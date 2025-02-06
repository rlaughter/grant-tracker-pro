import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { FileText, Download, Printer } from "lucide-react";

interface GrantDetailHeaderProps {
  grant: {
    name: string;
    grantNumber: string;
    status: string;
    type: string;
    amount: number;
    specialist: string;
  };
}

export const GrantDetailHeader = ({ grant }: GrantDetailHeaderProps) => {
  return (
    <Card className="p-6 space-y-6">
      <div className="flex justify-between items-start">
        <div className="space-y-1">
          <h1 className="text-2xl font-semibold tracking-tight">{grant.name}</h1>
          <p className="text-sm text-muted-foreground">Grant #{grant.grantNumber}</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Printer className="h-4 w-4 mr-2" />
            Print
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button size="sm">
            <FileText className="h-4 w-4 mr-2" />
            Edit
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="space-y-1">
          <p className="text-sm font-medium">Status</p>
          <div className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
            grant.status === "Active" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
          }`}>
            {grant.status}
          </div>
        </div>
        <div className="space-y-1">
          <p className="text-sm font-medium">Type</p>
          <p className="text-sm text-muted-foreground">{grant.type}</p>
        </div>
        <div className="space-y-1">
          <p className="text-sm font-medium">Amount</p>
          <p className="text-sm text-muted-foreground">${grant.amount.toLocaleString()}</p>
        </div>
        <div className="space-y-1">
          <p className="text-sm font-medium">Specialist</p>
          <p className="text-sm text-muted-foreground">{grant.specialist}</p>
        </div>
      </div>
    </Card>
  );
};