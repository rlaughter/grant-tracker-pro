
import { Card } from "@/components/ui/card";

export const PlaceholderForm = ({ title }: { title: string }) => {
  return (
    <Card className="p-6">
      <p className="text-muted-foreground">{title} will be implemented in the next phase.</p>
    </Card>
  );
};
