import React from "react";
import { useModal } from "@/contexts/ModalContext";
import { Button } from "../ui/button";
import { X } from "lucide-react";

const TransactionLayout = ({ children }: { children: React.ReactNode }) => {
  const { closeModal } = useModal();

  const handleClose = () => {
    console.log("Close button clicked");
    closeModal();
  };

  return (
    <div className="w-screen h-screen fixed z-50 bg-background/50 backdrop-blur-2xl top-0 right-0 flex items-center justify-center">
      <div className="relative">
        <Button
          onClick={handleClose}
          variant="ghost"
          size="icon"
          className="absolute -top-12 -right-12 z-[60] bg-background hover:bg-background/80 border border-border rounded-full shadow-lg transition-all hover:scale-110"
        >
          <X className="h-5 w-5" />
        </Button>
        {children}
      </div>
    </div>
  );
};

export default TransactionLayout;
