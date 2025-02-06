
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Download, Upload, X, File } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface GrantDocumentsProps {
  grantId: number;
}

interface Document {
  id: number;
  name: string;
  type: string;
  size: string;
  uploadedAt: string;
  uploadedBy: string;
}

export const GrantDocuments = ({ grantId }: GrantDocumentsProps) => {
  const { toast } = useToast();
  const [isDragging, setIsDragging] = useState(false);
  
  // Mock data - replace with actual data fetching
  const [documents, setDocuments] = useState<Document[]>([
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
  ]);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = Array.from(e.dataTransfer.files);
    handleFileUpload(files);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      handleFileUpload(files);
    }
  };

  const handleFileUpload = (files: File[]) => {
    // Mock upload - replace with actual upload logic
    const newDocuments = files.map((file, index) => ({
      id: documents.length + index + 1,
      name: file.name,
      type: file.type.split("/")[1].toUpperCase(),
      size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
      uploadedAt: new Date().toISOString().split("T")[0],
      uploadedBy: "Current User", // Replace with actual user
    }));

    setDocuments([...documents, ...newDocuments]);
    toast({
      title: "Files uploaded successfully",
      description: `${files.length} file(s) have been uploaded.`,
    });
  };

  const handleDownload = (doc: Document) => {
    // Mock download - replace with actual download logic
    toast({
      title: "Download started",
      description: `Downloading ${doc.name}...`,
    });
  };

  const handleDelete = (docId: number) => {
    // Mock delete - replace with actual delete logic
    setDocuments(documents.filter(doc => doc.id !== docId));
    toast({
      title: "Document deleted",
      description: "The document has been removed.",
    });
  };

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <div 
          className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
            isDragging ? "border-primary bg-primary/10" : "border-muted"
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <div className="flex flex-col items-center gap-2">
            <Upload className="h-8 w-8 text-muted-foreground" />
            <p className="text-lg font-medium">Drag and drop files here</p>
            <p className="text-sm text-muted-foreground">or</p>
            <Button
              variant="outline"
              onClick={() => document.getElementById("file-upload")?.click()}
            >
              Choose Files
            </Button>
            <input
              id="file-upload"
              type="file"
              multiple
              className="hidden"
              onChange={handleFileSelect}
            />
          </div>
        </div>
      </Card>

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
                    {doc.size} • Uploaded on {new Date(doc.uploadedAt).toLocaleDateString()} by {doc.uploadedBy}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleDownload(doc)}
                >
                  <Download className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleDelete(doc.id)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
          
          {documents.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              <File className="h-8 w-8 mx-auto mb-2" />
              <p>No documents uploaded yet</p>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};
