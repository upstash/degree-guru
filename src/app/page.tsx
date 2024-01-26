"use client"

import { useChat } from 'ai/react';

import Header from "./components/Header";

interface MyData {
  output: string;
  sources: string[];
}

export default function Home() {
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    api: "api/guru"
  });

  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex flex-col items-center justify-center flex-grow p-4">
        {messages.map((m) => {
          let contentToRender;

          if (m.role === 'user') {
            contentToRender = `User: ${m.content}`;
          } else if (m.content.includes("_no_streaming_response_")) {
            const parsedContent: MyData = JSON.parse(m.content);
            const setsources = Array.from(new Set(parsedContent.sources).values());
            contentToRender = `AI: ${parsedContent.output}\n\nSources:\n${setsources
              .map((url: string) => `- ${url}\n`)
              .join('')}`;
          } else {
            contentToRender = `AI: ${m.content}`;
          }

          return (
            <div key={m.id} className="whitespace-pre-wrap max-w-md my-4">
              {contentToRender}
            </div>
          );
        })}

        <div className="w-full max-w-md">
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              value={input}
              onChange={handleInputChange}
              placeholder="Enter text"
              className="w-full bg-black text-white p-2 rounded-none border-none"
            />
          </form>
        </div>
      </div>
    </div>

  );
}
