import React, { useEffect } from "react";
import TransactionLayout from "./Layout";
import { SwapWidget } from "thirdweb/react";
import { client } from "@/lib/thirdweb-client";
import { useSwap } from "@/contexts/SwapContext";

const Swap = () => {
  const { isSwapOpen } = useSwap();

  useEffect(() => {
    console.log(isSwapOpen);
  }, [isSwapOpen]);

  if (!isSwapOpen) {
    return null;
  }

  return (
    <TransactionLayout>
      <SwapWidget client={client} />
    </TransactionLayout>
  );
};

export default Swap;
