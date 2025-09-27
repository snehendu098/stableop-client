// lib/contract-tools.ts
import { InferUITools, tool, UIDataTypes, UIMessage } from "ai";
import { z } from "zod";

export const contractTools = {
  borrowFunds: tool({
    description: "Borrow funds from the lending protocol",
    inputSchema: z.object({
      amount: z.string().describe("Amount to borrow in USD"),
    }),
    outputSchema: z.object({
      text: z.string(),
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

  swapUsdcToPyUsd: tool({
    description:
      "Swap USDC to pyUSD - optimized direct swap for USDC to PayPal USD conversion",
    inputSchema: z.object({
      amount: z.string().describe(
        `The amount of USDC to swap to pyUSD.

EXAMPLES:
- "I want to swap 100 USDC to pyUSD" → amount: "100"
- "Convert 50.5 USDC to PayPal USD" → amount: "50.5"
- "Swap 1000 USDC" → amount: "1000"
- "Trade 0.1 USDC for pyUSD" → amount: "0.1"

USER INPUT VARIATIONS:
- "Swap 100 USDC to pyUSD" → amount: "100"
- "Convert 50 USDC" → amount: "50"
- "Trade fifty dollars USDC" → amount: "50"
- "Exchange 1k USDC" → amount: "1000"
- "Swap all my USDC to pyUSD" → amount: "[current USDC balance]"

DECIMAL HANDLING:
- "Swap 1.5 USDC" → amount: "1.5"
- "Convert 0.001 USDC" → amount: "0.001"
- "Trade 2.5k USDC" → amount: "2500"`
      ),
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
