import { Card } from "@/components/ui/card";
import { DollarSign } from "lucide-react";

interface GrantFinancialsProps {
  grantId: number;
}

export const GrantFinancials = ({ grantId }: GrantFinancialsProps) => {
  // Mock data - replace with actual data fetching
  const financials = {
    awarded: 250000,
    spent: 75000,
    remaining: 175000,
    matchingRequired: 50000,
    matchingProvided: 25000,
  };

  return (
    <Card className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <DollarSign className="h-4 w-4 text-muted-foreground" />
            <h3 className="font-medium">Award Amount</h3>
          </div>
          <p className="text-2xl font-semibold">${financials.awarded.toLocaleString()}</p>
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <DollarSign className="h-4 w-4 text-muted-foreground" />
            <h3 className="font-medium">Spent</h3>
          </div>
          <p className="text-2xl font-semibold">${financials.spent.toLocaleString()}</p>
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <DollarSign className="h-4 w-4 text-muted-foreground" />
            <h3 className="font-medium">Remaining</h3>
          </div>
          <p className="text-2xl font-semibold">${financials.remaining.toLocaleString()}</p>
        </div>
      </div>

      <div className="mt-8 pt-8 border-t">
        <h3 className="font-medium mb-4">Matching Requirements</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Required Match</p>
            <p className="text-xl font-semibold">${financials.matchingRequired.toLocaleString()}</p>
          </div>
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Provided Match</p>
            <p className="text-xl font-semibold">${financials.matchingProvided.toLocaleString()}</p>
          </div>
        </div>
      </div>
    </Card>
  );
};