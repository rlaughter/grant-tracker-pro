
import { Card } from "@/components/ui/card";
import { DollarSign } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { ChartContainer, ChartTooltip } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

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
    expenditures: [
      { category: "Personnel", amount: 35000 },
      { category: "Equipment", amount: 20000 },
      { category: "Supplies", amount: 15000 },
      { category: "Travel", amount: 5000 },
    ]
  };

  const spentPercentage = (financials.spent / financials.awarded) * 100;
  const matchingPercentage = (financials.matchingProvided / financials.matchingRequired) * 100;

  return (
    <div className="space-y-6">
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
            <Progress value={spentPercentage} className="h-2" />
            <p className="text-sm text-muted-foreground">{spentPercentage.toFixed(1)}% of total</p>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <DollarSign className="h-4 w-4 text-muted-foreground" />
              <h3 className="font-medium">Remaining</h3>
            </div>
            <p className="text-2xl font-semibold">${financials.remaining.toLocaleString()}</p>
            <Progress value={100 - spentPercentage} className="h-2" />
            <p className="text-sm text-muted-foreground">{(100 - spentPercentage).toFixed(1)}% of total</p>
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <h3 className="font-medium mb-4">Expenditure Breakdown</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={financials.expenditures}>
              <XAxis dataKey="category" />
              <YAxis />
              <Tooltip content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="rounded-lg border bg-background p-2 shadow-sm">
                      <div className="grid grid-cols-2 gap-2">
                        <span className="font-medium">{payload[0].payload.category}:</span>
                        <span className="font-medium">${payload[0].value?.toLocaleString()}</span>
                      </div>
                    </div>
                  )
                }
                return null
              }} />
              <Bar dataKey="amount" fill="#9b87f5" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>

      <Card className="p-6">
        <h3 className="font-medium mb-4">Matching Requirements</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Required Match</p>
            <p className="text-xl font-semibold">${financials.matchingRequired.toLocaleString()}</p>
          </div>
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Provided Match</p>
            <p className="text-xl font-semibold">${financials.matchingProvided.toLocaleString()}</p>
            <Progress value={matchingPercentage} className="h-2" />
            <p className="text-sm text-muted-foreground">{matchingPercentage.toFixed(1)}% of required match</p>
          </div>
        </div>
      </Card>
    </div>
  );
};
