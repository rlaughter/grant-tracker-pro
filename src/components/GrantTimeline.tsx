import { Card } from "@/components/ui/card";
import { Calendar } from "lucide-react";

interface GrantTimelineProps {
  grantId: number;
}

export const GrantTimeline = ({ grantId }: GrantTimelineProps) => {
  // Mock data - replace with actual data fetching
  const events = [
    {
      id: 1,
      date: "2024-01-01",
      title: "Grant Start Date",
      description: "Official start of the grant period",
    },
    {
      id: 2,
      date: "2024-03-31",
      title: "Q1 Report Due",
      description: "First quarterly progress report submission",
    },
    {
      id: 3,
      date: "2024-12-31",
      title: "Grant End Date",
      description: "Final date for grant activities and expenditures",
    },
  ];

  return (
    <Card className="p-6">
      <div className="space-y-8">
        {events.map((event) => (
          <div key={event.id} className="flex gap-4">
            <div className="flex-none">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                <Calendar className="h-4 w-4 text-primary" />
              </div>
            </div>
            <div className="space-y-1">
              <p className="font-medium">{event.title}</p>
              <p className="text-sm text-muted-foreground">{event.description}</p>
              <p className="text-sm text-muted-foreground">
                {new Date(event.date).toLocaleDateString()}
              </p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};