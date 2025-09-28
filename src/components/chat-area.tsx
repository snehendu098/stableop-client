"use client";

import React, { useState, useRef, useEffect } from "react";
import { ScrollArea } from "./ui/scroll-area";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { useChat } from "@ai-sdk/react";
import { ChatMessage } from "@/lib/ai/contract-tools-schema";
import { DefaultChatTransport } from "ai";
import ReactMarkdown from "react-markdown";
import { useModal } from "@/contexts/ModalContext";

const ChatArea = () => {
  const [input, setInput] = useState("");
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const { openModal } = useModal();

  const { messages, status, sendMessage, addToolResult } = useChat<ChatMessage>(
    {
      transport: new DefaultChatTransport({
        api: "/api/chat",
      }),
      onToolCall: async ({ toolCall }) => {
        // Handle different tools
        const input = toolCall.input as any; // Type assertion for tool input

        switch (toolCall.toolName) {
          case "borrowFunds":
            openModal("borrow", { amount: input.amount });
            break;

          case "lendFunds":
            openModal("lend", { amount: input.amount });
            break;

          case "depositCollateral":
            openModal("depositCollateral", { amount: input.amount });
            break;

          case "repayLoan":
            // Handle repay loan logic here
            break;

          case "withdrawCollateral":
            // Handle withdraw collateral logic here
            break;

          case "swapGeneral":
            console.log("swapGeneral tool called");
            openModal("swap");
            break;

          case "sendpyUSD":
            openModal("send", {
              amount: input?.amount,
              address: input?.address,
            });
            break;

          default:
            // Handle unknown tools
            break;
        }
      },
    }
  );

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() === "") return;

    sendMessage({
      text: input,
    });

    setInput("");
  };

  console.log(messages);

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const isLoading = status === "streaming" || status === "submitted";

  return (
    <div className="col-span-2 rounded-3xl bg-card flex p-6 flex-col">
      <ScrollArea className="h-[80%] max-h-[65vh] pr-4" ref={scrollAreaRef}>
        <div className="space-y-4">
          {messages.map((item) => (
            <div
              key={item.id}
              className={cn(
                "w-full flex wrap-break-word",
                item.role === "assistant" ? "justify-start" : "justify-end"
              )}
            >
              <div
                className={cn(
                  "p-4 max-w-4/5 rounded-2xl border-2",
                  item.role === "assistant" ? "bg-background" : "bg-primary"
                )}
              >
                {item.parts.map((part, idx) => {
                  switch (part.type) {
                    case "text":
                      return (
                        <div
                          key={`${item.id}-${idx}`}
                          className="prose dark:prose-invert"
                        >
                          <ReactMarkdown>{part.text}</ReactMarkdown>
                        </div>
                      );

                    case "tool-borrowFunds":
                      switch (part.state) {
                        case "input-streaming":
                          return (
                            <div key={`${item.id}`}>Fetching input...</div>
                          );
                        case "input-available":
                          return (
                            <div key={`${item.id}`}>
                              Trying to borrow {part.input?.amount}
                            </div>
                          );

                        case "output-available":
                          return (
                            <div key={`${item.id}`}>
                              Txn executed succesfully
                            </div>
                          );

                        case "output-error":
                          return (
                            <div key={`${item.id}`}>Txn Error detected</div>
                          );
                        default:
                          return null;
                      }

                    case "tool-swapGeneral":
                      switch (part.state) {
                        case "input-streaming":
                          return (
                            <div key={`${item.id}`}>
                              Opening swap interface...
                            </div>
                          );
                        case "input-available":
                          return (
                            <div key={`${item.id}`}>Swap interface opened</div>
                          );
                        case "output-available":
                          return (
                            <div key={`${item.id}`}>Swap interface ready</div>
                          );
                        case "output-error":
                          return (
                            <div key={`${item.id}`}>
                              Failed to open swap interface
                            </div>
                          );
                        default:
                          return null;
                      }

                    // case "tool-sendpyUSD":
                    //   switch (part.state) {
                    //     case "input-streaming":
                    //       return (
                    //         <div key={`${item.id}`}>
                    //           Preparing pyUSD transfer...
                    //         </div>
                    //       );
                    //     case "input-available":
                    //       return (
                    //         <div key={`${item.id}`}>
                    //           Preparing transfer for {part.input?.amount} pyUSD
                    //           to {part.input?.address}...
                    //         </div>
                    //       );
                    //     case "output-available":
                    //       return (
                    //         <div key={`${item.id}`}>
                    //           Transfer interface opened
                    //         </div>
                    //       );
                    //     case "output-error":
                    //       return (
                    //         <div key={`${item.id}`}>
                    //           Failed to open transfer interface
                    //         </div>
                    //       );
                    //     default:
                    //       return null;
                    //   }

                    default:
                      return null;
                  }
                })}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>
      <form
        onSubmit={handleSubmit}
        className="h-[20%] rounded-2xl flex flex-col gap-3"
      >
        <Textarea
          placeholder="Message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyPress}
          className="flex-1 border max-h-[10vh] rounded-xl text-white placeholder:text-gray-400 resize-none focus-visible:ring-0 p-4"
        />
        <Button
          type="submit"
          disabled={input.trim() === "" || isLoading}
          className="w-full bg-purple-600 hover:bg-purple-700 text-white rounded-xl py-3 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? "Sending..." : "Send"}
        </Button>
      </form>
    </div>
  );
};

export default ChatArea;
