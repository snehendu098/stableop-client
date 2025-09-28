import {
  prepareContractCall,
  sendTransaction,
  getContract,
  readContract,
} from "thirdweb";
import { contract, client } from "./thirdweb-client";
import { AccountAddress, useActiveAccount } from "thirdweb/react";
import { Account } from "thirdweb/wallets";
import { defineChain } from "thirdweb";
// Types
interface PoolStatus {
  liquidity: bigint;
  borrowed: bigint;
  utilizationRate: bigint;
}

// Approve token spending before lending/borrowing
export const approveToken = async (
  { tokenAddress, amount }: { tokenAddress: string; amount: number },
  account: Account
) => {
  try {
    const tokenContract = getContract({
      client,
      chain: defineChain(11155111),
      address: tokenAddress,
    });

    const transaction = await prepareContractCall({
      contract: tokenContract,
      method: "function approve(address spender, uint256 amount)",
      params: [contract.address, BigInt(amount)],
    });

    const { transactionHash } = await sendTransaction({
      transaction,
      account,
    });

    return {
      success: true,
      txHash: transactionHash,
      message: `Token approval successful: ${transactionHash}`,
    };
  } catch (err) {
    return { success: false, error: err };
  }
};

export const borrowFunds = async ({
  amount,
  duration,
  account,
}: {
  amount: string;
  duration: number;
  account: Account;
}) => {
  try {
    const transaction = await prepareContractCall({
      contract,
      method: "borrow",
      params: [account.address, BigInt(amount), BigInt(duration)],
    });
    const { transactionHash } = await sendTransaction({
      transaction,
      account,
    });
    return {
      success: true,
      txHash: transactionHash,
      message: `Txn executed with ${transactionHash}`,
    };
  } catch (err) {
    return { success: false, error: err };
  }
};

export const collateral = async ({
  amount,
  account,
}: {
  amount: string;
  account: Account;
}) => {
  try {
    const transaction = await prepareContractCall({
      contract,
      method: "collateral",
      params: [account.address, BigInt(amount)],
    });
    const { transactionHash } = await sendTransaction({
      transaction,
      account,
    });

    return {
      success: true,
      txHash: transactionHash,
      message: `Txn executed with ${transactionHash}`,
    };
  } catch (err) {
    return { success: false, error: err };
  }
};

export const lendFunds = async ({
  amount,
  duration,
  account,
}: {
  amount: string;
  duration: number;
  account: Account;
}) => {
  try {
    const transaction = await prepareContractCall({
      contract,
      method: "lend",
      params: [account.address, BigInt(amount), BigInt(duration)],
    });

    console.log(transaction);

    const { transactionHash } = await sendTransaction({
      transaction,
      account,
    });

    console.log(transactionHash);

    return {
      success: true,
      txHash: transactionHash,
      message: `Txn executed with ${transactionHash}`,
    };
  } catch (err) {
    return { success: false, error: err };
  }
};

export const liquidate = async (
  { borrowIndex }: { borrowIndex: number },
  account: Account
) => {
  try {
    const transaction = await prepareContractCall({
      contract,
      method: "liquidate",
      params: [account.address, BigInt(borrowIndex)],
    });
    const { transactionHash } = await sendTransaction({
      transaction,
      account,
    });
    return {
      success: true,
      txHash: transactionHash,
      message: `Txn executed with ${transactionHash}`,
    };
  } catch (err) {
    return { success: false, error: err };
  }
};

export const repayLoans = async (
  { loanId }: { loanId: number },
  account: Account
) => {
  try {
    const transaction = await prepareContractCall({
      contract,
      method: "repayLoan",
      params: [BigInt(loanId)],
    });
    const { transactionHash } = await sendTransaction({
      transaction,
      account,
    });
    return {
      success: true,
      txHash: transactionHash,
      message: `Txn executed with ${transactionHash}`,
    };
  } catch (err) {
    return { success: false, error: err };
  }
};

export const withdrawCollateral = async (
  { amount }: { amount: number },
  account: Account
) => {
  try {
    const transaction = await prepareContractCall({
      contract,
      method: "withdrawCollateral",
      params: [BigInt(amount)],
    });
    const { transactionHash } = await sendTransaction({
      transaction,
      account,
    });
    return {
      success: true,
      txHash: transactionHash,
      message: `Txn executed with ${transactionHash}`,
    };
  } catch (err) {
    return { success: false, error: err };
  }
};

export const withdrawLiquidity = async (
  { lendIndex }: { lendIndex: number },
  account: Account
) => {
  try {
    const transaction = await prepareContractCall({
      contract,
      method: "withdrawLiquidity",
      params: [BigInt(lendIndex)],
    });
    const { transactionHash } = await sendTransaction({
      transaction,
      account,
    });
    return {
      success: true,
      txHash: transactionHash,
      message: `Txn executed with ${transactionHash}`,
    };
  } catch (err) {
    return { success: false, error: err };
  }
};
