
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GrantDetailHeader } from "@/components/GrantDetailHeader";
import { GrantBasicInfo } from "@/components/GrantBasicInfo";
import { GrantGrantorInfo } from "@/components/GrantGrantorInfo";
import { GrantFiscalInfo } from "@/components/GrantFiscalInfo";
import { GrantFinancialTracking } from "@/components/GrantFinancialTracking";
import { GrantDocuments } from "@/components/GrantDocuments";
import { GrantTimeline } from "@/components/GrantTimeline";
import type { Grant } from "@/types/grant";

interface GrantDetailsDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  selectedGrant: Grant & {
    grantorType: string;
    grantorId: string;
    masterGrantNumber: string;
    cfdaNumber: string;
    grantorInfo: {
      name: string;
      contact: string;
      phone: string;
      email: string;
      address: string;
    };
  } | null;
}

export const GrantDetailsDialog = ({ 
  isOpen, 
  onOpenChange, 
  selectedGrant 
}: GrantDetailsDialogProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Grant Details</h2>
          {/* Removed the duplicate close button here */}
        </div>
        {selectedGrant && (
          <div className="space-y-8">
            <GrantDetailHeader grant={selectedGrant} />
            
            <Tabs defaultValue="details" className="w-full">
              <TabsList className="grid w-full max-w-2xl grid-cols-3">
                <TabsTrigger value="details" className="flex items-center gap-2">
                  Details & Finances
                </TabsTrigger>
                <TabsTrigger value="documents" className="flex items-center gap-2">
                  Documents
                </TabsTrigger>
                <TabsTrigger value="timeline" className="flex items-center gap-2">
                  Timeline
                </TabsTrigger>
              </TabsList>

              <TabsContent value="details">
                <div className="grid gap-6">
                  <GrantBasicInfo grant={selectedGrant} />
                  <GrantGrantorInfo grantorInfo={selectedGrant.grantorInfo} />
                  <GrantFiscalInfo 
                    fiscal={selectedGrant.fiscal}
                    onUpdate={() => {}} // Empty function since we don't want to update from the dialog
                  />
                  <GrantFinancialTracking grantId={selectedGrant.id} />
                </div>
              </TabsContent>

              <TabsContent value="documents">
                <GrantDocuments grantId={selectedGrant.id} />
              </TabsContent>

              <TabsContent value="timeline">
                <GrantTimeline grantId={selectedGrant.id} />
              </TabsContent>
            </Tabs>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

