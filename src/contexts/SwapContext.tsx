"use client";

import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";

interface SwapContextType {
  isSwapOpen: boolean;
  openSwap: () => void;
  closeSwap: () => void;
}

const SwapContext = createContext<SwapContextType | undefined>(undefined);

export const SwapProvider = ({ children }: { children: ReactNode }) => {
  const [isSwapOpen, setIsSwapOpen] = useState(false);

  useEffect(() => {
    console.log("SwapContext - isSwapOpen changed to:", isSwapOpen);
  }, [isSwapOpen]);

  const openSwap = () => {
    console.log("Opening swap");
    setIsSwapOpen(true);
  };
  const closeSwap = () => {
    console.log("Closing swap - before:", isSwapOpen);
    setIsSwapOpen(false);
    console.log("Closing swap - after setState called");
  };

  return (
    <SwapContext.Provider value={{ isSwapOpen, openSwap, closeSwap }}>
      {children}
    </SwapContext.Provider>
  );
};

export const useSwap = () => {
  const context = useContext(SwapContext);
  if (context === undefined) {
    throw new Error("useSwap must be used within a SwapProvider");
  }
  return context;
};