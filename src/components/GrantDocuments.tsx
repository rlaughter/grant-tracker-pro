import { Card } from "@/components/ui/card";
import { FileText, Download } from "lucide-react";

interface GrantDocumentsProps {
  grantId: number;
}

export const GrantDocuments = ({ grantId }: GrantDocumentsProps) => {
  // Mock data - replace with actual data fetching
  const documents = [
    {
      id: 1,
      name: "Notice of Grant Award.pdf",
      type: "PDF",
      size: "2.4 MB",
      uploadedAt: "2024-01-15",
      uploadedBy: "John Doe",
    },
    {
      id: 2,
      name: "Budget Proposal.xlsx",
      type: "Excel",
      size: "1.8 MB",
      uploadedAt: "2024-01-10",
      uploadedBy: "Jane Smith",
    },
  ];

  return (
    <Card className="p-6">
      <div className="space-y-4">
        {documents.map((doc) => (
          <div
            key={doc.id}
            className="flex items-center justify-between p-4 rounded-lg border hover:bg-muted/50 transition-colors"
          >
            <div className="flex items-center gap-4">
              <FileText className="h-8 w-8 text-muted-foreground" />
              <div>
                <p className="font-medium">{doc.name}</p>
                <p className="text-sm text-muted-foreground">
                  Uploaded on {new Date(doc.uploadedAt).toLocaleDateString()} by {doc.uploadedBy}
                </p>
              </div>
            </div>
            <button className="p-2 hover:bg-muted rounded-full">
              <Download className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>
    </Card>
  );
};