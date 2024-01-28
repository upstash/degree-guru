"use client"

import { useChat } from 'ai/react';
import Message from './components/Message';

export default function Home() {
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    api: "/api/guru"
  });
  return (
    <div className="p:2 flex min-h-screen flex-col items-center justify-between bg-[#F0F0F0]">
      <div className="mb-1 w-full bg-[#FFFFFF] p-4 px-4 pt-4">
        <h1 className="text-lg font-semibold">DegreeGuru</h1>
      </div>
      <div className="w-1/2 flex flex-col justify-between items-center flex-grow">
        <div
          id="messages"
          className="scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch flex flex-col overflow-y-auto"
        >
          {
            messages.map(m => (<Message message={m}/>))
          }
        </div>
        <div className="border-t-2 border-gray-200 w-full relative flex">
            <form
              onSubmit={handleSubmit}
              className="m-auto flex w-full max-w-screen-lg items-center justify-center space-x-4 p-4"
            >
              <input
                id="message"
                type="text"
                value={input}
                onChange={handleInputChange}
                x-model="newMessage"
                placeholder="Your message..."
                className="flex-1 rounded-md border border-gray-300 p-2"  
              />
              <button className="rounded-md bg-gray-800 px-4 py-2 text-white">
                Send
              </button>
            </form>
        </div>
      </div>
    </div>
    
  );
}