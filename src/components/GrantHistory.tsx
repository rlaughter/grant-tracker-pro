
import { format } from "date-fns";
import { Clock, Edit, Plus, Trash } from "lucide-react";
import { Card } from "@/components/ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChevronDown } from "lucide-react";
import { mockGrantHistory } from "@/data/mockData";
import type { GrantHistoryEntry } from "@/types/grant";

interface GrantHistoryProps {
  grantId: number;
}

const getChangeIcon = (changeType: "create" | "update" | "delete") => {
  switch (changeType) {
    case "create":
      return <Plus className="h-4 w-4 text-green-500" />;
    case "update":
      return <Edit className="h-4 w-4 text-blue-500" />;
    case "delete":
      return <Trash className="h-4 w-4 text-red-500" />;
  }
};

const getChangeDescription = (entry: GrantHistoryEntry): string => {
  switch (entry.changeType) {
    case "create":
      return "Grant created";
    case "delete":
      return "Grant deleted";
    case "update":
      return `Changed ${entry.field} from "${entry.oldValue}" to "${entry.newValue}"`;
  }
};

export const GrantHistory = ({ grantId }: GrantHistoryProps) => {
  const history = mockGrantHistory.filter((entry) => entry.grantId === grantId);

  return (
    <Collapsible defaultOpen className="w-full">
      <Card className="p-6">
        <CollapsibleTrigger className="flex items-center justify-between w-full">
          <div className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            <h3 className="font-medium text-lg">Change History</h3>
          </div>
          <ChevronDown className="h-4 w-4" />
        </CollapsibleTrigger>
        <CollapsibleContent className="pt-4">
          <ScrollArea className="h-[400px] pr-4">
            <div className="space-y-4">
              {history.map((entry) => (
                <div
                  key={entry.id}
                  className="flex items-start gap-4 p-4 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
                >
                  <div className="mt-1">{getChangeIcon(entry.changeType)}</div>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium">
                      {getChangeDescription(entry)}
                    </p>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span>{entry.changedBy}</span>
                      <span>•</span>
                      <span>
                        {format(new Date(entry.changeDate), "MMM d, yyyy h:mm a")}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </CollapsibleContent>
      </Card>
    </Collapsible>
  );
};
