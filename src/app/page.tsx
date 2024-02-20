"use client";

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link'
import { useChat } from 'ai/react';
import Message from './components/Message';
import Landing from './components/Landing';
import PoweredBy from './components/PoweredBy';

export default function Home() {
  const [state, setSelectedOption] = useState<{streaming: boolean}>({streaming: false});

  const { messages, input, handleInputChange, handleSubmit } = useChat({
    api: "/api/guru",
    onFinish: () => {
      setSelectedOption(prevState => ({
        ...prevState,
        streaming: false
      }));
    }
  });

  // move view to the bottom of the messages when messages change
  const messagesEndRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <div className="p:2 flex h-screen flex-col items-center bg-[#F0F0F0]">

      <div className="h-[7.5vh] w-full bg-[#FFFFFF] pr-40 border-b flex flex-row justify-between">
        <div className="p-4">
          <h1 >
            <Link className="text-xl font-semibold text-[#43403B]" href="/">
              DegreeGuru
            </Link>
          </h1>
        </div>
      </div>
      
      <div className="h-[84vh] transition-all w-3/4 lg:w-1/2 flex flex-col items-center border-x scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-1 overflow-y-scroll">
        <Landing/>
        {
          messages.map(m => (<Message message={m} key={m.id}/>))
        }
        <div ref={messagesEndRef} />
      </div>

      <div className="h-[8.5vh] absolute bottom-0 lg:left-1/4 w-3/4 lg:w-1/2 text-sm border border-gray-200">
          <form
            onSubmit={e => {
              handleSubmit(e);
              setSelectedOption(prevState => ({
                ...prevState,
                streaming: true
              }));
            }}
            className="m-auto flex items-center justify-center space-x-4 p-4"
          >
            <input
              id="message"
              type="text"
              disabled={state.streaming}
              value={input}
              onChange={handleInputChange}
              x-model="newMessage"
              placeholder="Your question..."
              className="transition flex-1 rounded-md border border-gray-300 p-2"  
            />
            <button
              className="transition rounded-md bg-gray-800 px-4 py-2 text-[#F0F0F0] disabled:bg-gray-300"
              disabled={state.streaming}
            >
              Send
            </button>
          </form>
      </div>

      <PoweredBy/>
    </div>
  );
}
