"use client";

import React, { useEffect, useRef, useState } from "react";
import { Message as MessageProps, useChat } from "ai/react";
import Form from "@/components/form";
import Message from "@/components/message";
import cx from "@/utils/cx";
import PoweredBy from "@/components/powered-by";

export default function Home() {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [state, setSelectedOption] = useState<{ streaming: boolean }>({
    streaming: false,
  });

  const { messages, input, handleInputChange, handleSubmit } = useChat({
    api: "/api/guru",
    onResponse: () => {
      setSelectedOption((prevState) => ({
        ...prevState,
        streaming: false,
      }));
    },
    initialMessages: [
      {
        id: "0",
        role: "system",
        content: `**Welcome to DegreeGuru**, your ultimate companion in navigating the academic landscape of Stanford.

Here&apos;s how it works:

1. **Ask Your Question:** Simply type your question into the text field at the bottom of the page.

2. **Get Informed:** Hit enter or click the Send button, and watch as DegreeGuru works its magic.

Ready to dive in? See an example question and answer below to get a taste of what DegreeGuru can offer.`,
      },
      {
        id: "1",
        role: "user",
        content: "I am interested in aviation. What program can I study?",
      },
      {
        id: "2",
        role: "system",
        content: `Hello,
        
At Stanford University, you can study aviation through the Department of Aeronautics and Astronautics. This department offers programs in aerospace engineering, aeronautics, and astronautics. Students learn flight basics through design in AA 100: Introduction to Aeronautics and Astronautics. The department has a rich history and highly decorated faculty, making it one of the top aerospace engineering departments in the nation. You can find more information about the programs and research collaborations on the department's official website: [Department of Aeronautics and Astronautics at Stanford University](https://aa.stanford.edu/).

If you have any further questions or need more details, feel free to ask.

Promoting knowledge for all, DegreeGuru`,
      },
    ],
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
