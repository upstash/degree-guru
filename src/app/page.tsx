"use client"

import { useChat } from 'ai/react';

import Header from "./components/Header";

export default function Home() {
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    api: "api/guru"
  });

  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex flex-col items-center justify-center flex-grow p-4">
        {messages.map(m => (
          <div key={m.id} className="whitespace-pre-wrap">
            {m.role === 'user' ? 'User: ' : 'AI: '}
            {m.content}
          </div>
        ))}
        
        <div>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              value={input}
              onChange={handleInputChange}
              placeholder="Enter text"
              className="bg-black text-white p-2 rounded-none border-none"
            />
          </form>
        </div>
      </div>
    </div>
  );
}
