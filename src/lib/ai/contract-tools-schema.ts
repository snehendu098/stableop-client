// lib/contract-tools.ts
import { InferUITools, tool, UIDataTypes, UIMessage } from "ai";
import { z } from "zod";

export const contractTools = {
  borrowFunds: tool({
    description: "Borrow funds from the lending protocol",
    inputSchema: z.object({
      amount: z.string().describe("Amount to borrow in USD"),
    }),
  }),

  lendFunds: tool({
    description: "Lend funds to the protocol",
    inputSchema: z.object({
      amount: z.string().describe("Amount to lend in USD"),
    }),
  }),

  depositCollateral: tool({
    description: "Withdraw collateral from a loan",
    inputSchema: z.object({
      amount: z.string().describe("Amount of collateral to deposit"),
    }),
  }),

  repayLoan: tool({
    description: "Repay an existing loan",
    inputSchema: z.object({
      loanId: z.string().describe("ID of the loan to repay"),
      amount: z.string().describe("Amount to repay in USD"),
    }),
  }),

  withdrawCollateral: tool({
    description: "Withdraw collateral from a loan",
    inputSchema: z.object({
      loanId: z.string().describe("ID of the loan"),
      amount: z.string().describe("Amount of collateral to withdraw"),
    }),
  }),

  swapGeneral: tool({
    description:
      "Open general swap interface for any asset to any other asset - triggers UI swap component when USDC to pyUSD direct swap is not applicable",
    inputSchema: z.object({}),
    outputSchema: z.string(),
  }),
};

export type ChatTools = InferUITools<typeof contractTools>;
export type ChatMessage = UIMessage<never, UIDataTypes, ChatTools>;
