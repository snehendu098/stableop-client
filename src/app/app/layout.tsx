"use client";

import React from "react";
import { ModalProvider, useModal } from "@/contexts/ModalContext";
import Swap from "@/components/transaction-components/Swap";
import {
  Borrow,
  Deposit,
  Lend,
} from "@/components/transaction-components/Transactional";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <ModalProvider>
      <ModalRenderer />
      <div>{children}</div>
    </ModalProvider>
  );
};

export default Layout;

const ModalRenderer = () => {
  const { isModalOpen, modalType, modalData } = useModal();

  console.log(
    "ModalRenderer - isModalOpen:",
    isModalOpen,
    "modalType:",
    modalType,
    "modalData:",
    modalData
  );

  if (!isModalOpen) {
    return <></>;
  }

  switch (modalType) {
    case "swap":
      console.log("Rendering Swap component");
      return <Swap />;

    case "borrow":
      return <Borrow data={modalData} />;

    case "lend":
      return <Lend data={modalData} />;

    case "depositCollateral":
      return <Deposit data={modalData} />;

    // Add more modal types here as needed
    // case "borrow":
    //   return <BorrowComponent data={modalData} />;
    // case "lend":
    //   return <LendComponent data={modalData} />;

    default:
      console.log("Unknown modal type:", modalType);
      return <></>;
  }
};
