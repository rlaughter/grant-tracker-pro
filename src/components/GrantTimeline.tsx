
import { Card } from "@/components/ui/card";
import { Calendar, Clock, MilestoneIcon, CalendarCheck, CalendarX } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

interface TimelineEvent {
  id: number;
  date: string;
  title: string;
  description: string;
  type: "start" | "report" | "milestone" | "deadline" | "end";
  completed?: boolean;
}

interface GrantTimelineProps {
  grantId: number;
}

export const GrantTimeline = ({ grantId }: GrantTimelineProps) => {
  // Mock data - replace with actual data fetching
  const events: TimelineEvent[] = [
    {
      id: 1,
      date: "2024-01-01",
      title: "Grant Start Date",
      description: "Official start of the grant period",
      type: "start",
      completed: true
    },
    {
      id: 2,
      date: "2024-03-31",
      title: "Q1 Report Due",
      description: "First quarterly progress report submission",
      type: "report",
      completed: true
    },
    {
      id: 3,
      date: "2024-06-15",
      title: "Mid-Year Review",
      description: "Comprehensive review of grant progress and expenditures",
      type: "milestone",
      completed: false
    },
    {
      id: 4,
      date: "2024-09-30",
      title: "Q3 Report Due",
      description: "Third quarterly progress report submission",
      type: "report",
      completed: false
    },
    {
      id: 5,
      date: "2024-11-15",
      title: "Final Report Deadline",
      description: "Submit final report and documentation",
      type: "deadline",
      completed: false
    },
    {
      id: 6,
      date: "2024-12-31",
      title: "Grant End Date",
      description: "Final date for grant activities and expenditures",
      type: "end",
      completed: false
    },
  ];

  const getIcon = (type: TimelineEvent["type"], completed?: boolean) => {
    switch (type) {
      case "start":
        return <Calendar className={cn("h-4 w-4", completed ? "text-green-500" : "text-primary")} />;
      case "report":
        return <Clock className={cn("h-4 w-4", completed ? "text-green-500" : "text-primary")} />;
      case "milestone":
        return <MilestoneIcon className={cn("h-4 w-4", completed ? "text-green-500" : "text-primary")} />;
      case "deadline":
        return <CalendarX className={cn("h-4 w-4", completed ? "text-green-500" : "text-red-500")} />;
      case "end":
        return <CalendarCheck className={cn("h-4 w-4", completed ? "text-green-500" : "text-primary")} />;
      default:
        return <Calendar className={cn("h-4 w-4", completed ? "text-green-500" : "text-primary")} />;
    }
  };

  return (
    <Card className="p-6 animate-fade-in">
      <div className="space-y-2 mb-6">
        <h3 className="text-lg font-semibold">Grant Timeline</h3>
        <p className="text-sm text-muted-foreground">Track important dates and milestones</p>
      </div>
      <div className="relative">
        <div className="absolute left-4 top-0 bottom-0 w-px bg-border" />
        <div className="space-y-8">
          {events.map((event, index) => (
            <div key={event.id} className="relative">
              <div className="flex gap-4 group hover:bg-muted/50 p-2 rounded-lg transition-colors">
                <div className="flex-none relative">
                  <div className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center",
                    event.completed ? "bg-green-100" : "bg-primary/10"
                  )}>
                    {getIcon(event.type, event.completed)}
                  </div>
                </div>
                <div className="space-y-1 flex-1">
                  <div className="flex items-center justify-between">
                    <p className={cn(
                      "font-medium",
                      event.completed && "text-green-600"
                    )}>
                      {event.title}
                    </p>
                    <span className="text-sm text-muted-foreground">
                      {new Date(event.date).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">{event.description}</p>
                  {event.completed && (
                    <span className="text-xs text-green-600 font-medium">Completed</span>
                  )}
                </div>
              </div>
              {index < events.length - 1 && (
                <Separator className="my-4" />
              )}
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
};
