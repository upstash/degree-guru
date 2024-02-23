"use client";

import React, { useEffect, useRef, useState } from "react";
import { Message as MessageProps, useChat } from "ai/react";
import Form from "@/components/form";
import Message from "@/components/message";
import cx from "@/utils/cx";
import PoweredBy from "@/components/powered-by";
import { INITIAL_MESSAGES } from "@/utils/const";

export default function Home() {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [state, setSelectedOption] = useState<{ streaming: boolean }>({
    streaming: false,
  });

  const { messages, input, handleInputChange, handleSubmit } = useChat({
    api: "/api/guru",
    initialMessages: INITIAL_MESSAGES,
    onResponse: () => {
      setSelectedOption((prevState) => ({
        ...prevState,
        streaming: false,
      }));
    },
  });

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView();
    }
  }, [messages]);

  return (
    <main className="relative max-w-screen-md p-4 md:p-6 mx-auto flex min-h-lvh !pb-[180px] overflow-y-scroll">
      <div className="">
        {messages.map((message: MessageProps) => {
          return <Message key={message.id} {...message} />;
        })}
        {state.streaming && (
          <Message id="0" content="Loading..." role="system" />
        )}

        {/* bottom ref */}
        <div ref={messagesEndRef} />
      </div>

      <div
        className={cx(
          "fixed z-10 bottom-0 inset-x-0",
          "flex justify-center items-center",
          "bg-gray-100",
        )}
      >
        <span
          className="absolute bottom-full h-10 inset-x-0 from-gray-100/0
         bg-gradient-to-b to-gray-100 pointer-events-none"
        />

        <div className="w-full max-w-screen-md rounded-xl px-4 md:px-5 py-6">
          <Form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit(e);
              setSelectedOption((prevState) => ({
                ...prevState,
                streaming: true,
              }));
            }}
            inputProps={{
              disabled: state.streaming,
              value: input,
              onChange: handleInputChange,
            }}
            buttonProps={{
              disabled: state.streaming,
            }}
          />
          <PoweredBy />
        </div>
      </div>
    </main>
  );
}
