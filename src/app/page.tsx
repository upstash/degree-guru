"use client";

import { useState } from 'react';
import Link from 'next/link'
import { useChat } from 'ai/react';
import Message from './components/Message';
import { Choices, ChoicesType } from './components/Choices';
import Landing from './components/Landing';

export default function Home() {
  const [state, setSelectedOption] = useState<{
    selected: ChoicesType;
    showLanding: boolean;
    streaming: boolean
  }>({
    selected: "Stanford",
    showLanding: true,
    streaming: false
  });

  const { messages, input, handleInputChange, handleSubmit, setMessages } = useChat({
    api: "/api/guru",
    onFinish: () => {
      setSelectedOption(prevState => ({
        ...prevState,
        streaming: false
      }));
    }
  });

  return (
    <div className="p:2 flex min-h-screen flex-col items-center justify-between bg-[#F0F0F0]">
      <div className="w-full bg-[#FFFFFF] pr-40 border-b flex flex-row justify-between">
        <div className="p-4">
          <h1 >
            <Link className="text-xl font-semibold text-[#43403B]" href="/">
              DegreeGuru
            </Link>
          </h1>
        </div>
        <div>
          <Choices
            handleChange={(key) => {
              setSelectedOption(prevState => ({
                ...prevState,
                selected: key as ChoicesType
              }));
            }}
            selected={state.selected}
            disabled={state.streaming}
          />
        </div>
        <div>
          {/* empty div */}
        </div>
      </div>
      <div className="transition-all w-3/4 lg:w-1/2 flex flex-col justify-between items-center flex-grow border-x">
        <div
          id="messages" 
          className="transition scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch flex flex-col overflow-y-auto w-full"
        >
          <Landing/>
          {
            messages.map(m => (<Message message={m} key={m.id}/>))
          }
        </div>
        <div className="border-t border-gray-200 w-full relative">
            <form
              onSubmit={e => {
                handleSubmit(e, {
                  data: {
                    vectorStore: state.selected
                  },
                });
                setSelectedOption(prevState => ({
                  ...prevState,
                  showLanding: false,
                  streaming: true
                }));
              }}
              className="m-auto flex w-full max-w-screen-lg items-center justify-center space-x-4 p-4"
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
      </div>
    </div>
    
  );
}
