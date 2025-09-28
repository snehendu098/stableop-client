import { convertToModelMessages, stepCountIs, streamText, UIMessage } from "ai";
import { google } from "@ai-sdk/google";
import { contractTools } from "@/lib/ai/contract-tools-schema";

export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json();

  const result = streamText({
    model: google("gemini-2.0-flash"),
    messages: convertToModelMessages(messages),
    tools: contractTools,
    system: `You are a DeFi assistant that helps users interact with a borrowing and lending protocol.
    The lending protocol only works with pyUSD which is a stable coin present on Arbitrum and Ethereum networks.

    When users want to:
    - Borrow money: Use borrowFunds tool
    - Lend money: Use lendFunds tool
    - Repay loans: Use repayLoan tool
    - Deposit collateral: Use withdrawCollateral tool
    - Swap some assets: Use the swapGeneral tool

    Always confirm the action details with the user before proceeding.
    Be helpful and explain what each action does. Also you are being given multiple tools each for doing some specific kinds of tasks, make sure to properly use them`,
    stopWhen: stepCountIs(2),
  });

  return result.toUIMessageStreamResponse();
}
