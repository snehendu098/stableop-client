// lib/contract-tools.ts
import { InferUITools, tool, UIDataTypes, UIMessage } from "ai";
import { z } from "zod";

export const contractTools = {
  borrowFunds: tool({
    description: "Borrow funds from the lending protocol",
    inputSchema: z.object({
      address: z.string().describe("Collateral amount in USD"),
      amount: z.string().describe("Amount to borrow in USD"),
    }),
  }),

  lendFunds: tool({
    description: "Lend funds to the protocol",
    inputSchema: z.object({
      amount: z.string().describe("Amount to lend in USD"),
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
};

export type ChatTools = InferUITools<typeof contractTools>;
export type ChatMessage = UIMessage<never, UIDataTypes, ChatTools>;
