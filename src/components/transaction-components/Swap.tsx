import React from "react";
import TransactionLayout from "./Layout";
import { SwapWidget } from "thirdweb/react";
import { client } from "@/lib/thirdweb-client";

const Swap = () => {
  console.log("Swap component rendering");

  return (
    <TransactionLayout>
      <SwapWidget client={client} />
    </TransactionLayout>
  );
};

export default Swap;
