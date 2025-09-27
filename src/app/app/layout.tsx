"use client";

import React from "react";
import { SwapProvider, useSwap } from "@/contexts/SwapContext";
import Swap from "@/components/transaction-components/Swap";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <SwapProvider>
      <ClientState />
      <div>{children}</div>
    </SwapProvider>
  );
};

export default Layout;

const ClientState = () => {
  const { isSwapOpen } = useSwap();

  return isSwapOpen ? <Swap /> : <></>;
};
