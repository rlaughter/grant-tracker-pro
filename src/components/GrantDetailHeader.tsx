
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { FileText, Download, Printer, Edit, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface GrantDetailHeaderProps {
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
  };
}

export const GrantDetailHeader = ({ grant }: GrantDetailHeaderProps) => {
  const navigate = useNavigate();

  return (
    <Card className="p-6">
      <div className="flex flex-col space-y-6">
        <div className="flex items-center justify-between">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => navigate(-1)}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Grants
          </Button>
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
              <Edit className="h-4 w-4 mr-2" />
              Edit
            </Button>
          </div>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <h1 className="text-2xl font-semibold tracking-tight">{grant.name}</h1>
            <div className="flex gap-4">
              <p className="text-sm text-muted-foreground">Application #{grant.applicationNumber}</p>
              <p className="text-sm text-muted-foreground">Grant #{grant.grantNumber}</p>
              {grant.masterGrantNumber && (
                <p className="text-sm text-muted-foreground">Master Grant #{grant.masterGrantNumber}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-4 gap-6">
            <div className="space-y-1">
              <p className="text-sm font-medium">Status</p>
              <div className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                grant.status === "Active" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
              }`}>
                {grant.status}
              </div>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium">Amount</p>
              <p className="text-sm text-muted-foreground">${grant.amount.toLocaleString()}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium">Department</p>
              <p className="text-sm text-muted-foreground">{grant.department}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium">Specialist</p>
              <p className="text-sm text-muted-foreground">{grant.specialist}</p>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};
