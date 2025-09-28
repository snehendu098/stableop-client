"use client";

import React from "react";
import TransactionLayout from "./Layout";
import { Button } from "../ui/button";
import Image from "next/image";
import { useModal } from "@/contexts/ModalContext";
import { borrowFunds, collateral, lendFunds } from "@/lib/thirdweb-functions";
import { useActiveAccount } from "thirdweb/react";

export const Borrow = ({ data }: any) => {
  const { closeModal } = useModal();
  const account = useActiveAccount();

  if (!account) return null;

  return (
    <TransactionLayout>
      <div className="w-96 p-4 space-y-8 bg-card rounded-2xl">
        <p className="text-2xl">Borrow Funds</p>
        <div className="w-full text-center flex items-center justify-center text-4xl font-semibold">
          <div className="flex space-x-4">
            <Image src={"/image.png"} alt="img" height={20} width={40} />
            <p>{data.amount}</p>
          </div>
        </div>
        <Button
          onClick={async () => {
            await borrowFunds({
              amount: data.amount,
              duration: 604800,
              account,
            });
            // closeModal();
          }}
          className="w-full"
        >
          Borrow
        </Button>
      </div>
    </TransactionLayout>
  );
};

export const Lend = ({ data }: any) => {
  const { closeModal } = useModal();
  const account = useActiveAccount();

  if (!account) return null;
  return (
    <TransactionLayout>
      <div className="w-96 p-4 space-y-8 bg-card rounded-2xl">
        <p className="text-2xl">Lend Funds</p>
        <div className="w-full text-center flex items-center justify-center text-4xl font-semibold">
          <div className="flex space-x-4">
            <Image src={"/image.png"} alt="img" height={20} width={40} />
            <p>{data.amount}</p>
          </div>
        </div>
        <Button
          onClick={async () => {
            await lendFunds({ amount: data.amount, duration: 604800, account });
            // closeModal();
          }}
          className="w-full"
        >
          Lend
        </Button>
      </div>
    </TransactionLayout>
  );
};

export const Deposit = ({ data }: any) => {
  const { closeModal } = useModal();
  const account = useActiveAccount();

  if (!account) return null;

  return (
    <TransactionLayout>
      <div className="w-96 p-4 space-y-8 bg-card rounded-2xl">
        <p className="text-2xl">Deposit Funds</p>
        <div className="w-full text-center flex items-center justify-center text-4xl font-semibold">
          <div className="flex space-x-4">
            <Image src={"/image.png"} alt="img" height={20} width={40} />
            <p>{data.amount}</p>
          </div>
        </div>
        <Button
          onClick={async () => {
            await collateral({ amount: data.amount, account });
            // closeModal();
          }}
          className="w-full"
        >
          Deposit Collateral
        </Button>
      </div>
    </TransactionLayout>
  );
};
