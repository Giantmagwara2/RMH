import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

const OPENAI_API_URL = 'https://api.openai.com/v1/chat/completions';
const OPENAI_MODEL = 'gpt-3.5-turbo';
// IMPORTANT: Store your API key in an environment variable
const API_KEY = import.meta.env.VITE_OPENAI_API_KEY || process.env.REACT_APP_OPENAI_API_KEY;

export function ChatBot() {
  const [messages, setMessages] = useState([
    {
      sender: 'bot',
      text: "Hi there! How can I help you with RocVille Media House today?",
    },
    {
      sender: 'bot',
      text: "You can ask me about our services (web design, branding, digital marketing), portfolio, or get a budget estimate.",
    },
    // Initial welcome messages could be added here, for example:
    // { sender: 'bot', text: "Welcome to our chat! How can I assist you today?" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: 'user', text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      if (!API_KEY) {
        throw new Error(
          "OpenAI API key is not configured. Please set it in your environment variables. For Vite, use VITE_OPENAI_API_KEY.  For Create React App, use REACT_APP_OPENAI_API_KEY"
        );
      }

      const chatHistory = messages.map(msg => ({ role: msg.sender, content: msg.text }));
      if (chatHistory.length > 0) {
      }
      const response = await axios.post(OPENAI_API_URL, {
        model: OPENAI_MODEL,
        messages: [{ role: 'user', content: input }],
      }, {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          'Content-Type': 'application/json',
        },
      });

      const botMessage = {
        sender: 'bot',
        text: response.data.choices[0]?.message?.content || 'Sorry, I could not generate a response.',
      };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error('Error fetching AI response:', error);
      let displayError = 'Sorry, something went wrong. Please try again later.';
      if (error.message.includes("API key")) {
        displayError = error.message;
      } else if (error.response) {
        // Handle API errors (e.g., rate limits, auth issues)
        displayError = `Error ${error.response.status}: ${error.response.data?.error?.message || 'Failed to get response from AI.'}`;
      }
      const errorMessage = { sender: 'bot', text: displayError, isError: true };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  return (
    <div className="p-4 bg-gray-100 rounded-md w-80">
      <h2 className="mb-4 text-lg font-bold">Chat with AI</h2>
      <div className="h-64 p-2 mb-4 overflow-y-auto bg-white border rounded-md">
        {messages.map((msg, index) => (
          <div
            key={`${msg.sender}-${index}`} // More robust key
            className={`mb-2 ${msg.sender === 'user' ? 'text-right' : 'text-left'}`}
          >
            <span
              className={`inline-block p-2 rounded-md ${
                msg.sender === 'user'
                  ? 'bg-blue-500 text-white'
                  : msg.isError ? 'bg-red-200 text-red-800' : 'bg-gray-200 text-gray-800'
              }`}
            >
              {msg.text}
            </span>
          </div>
        ))}
        {isLoading && (
          <div className="text-left"><span className="inline-block p-2 text-gray-800 bg-gray-200 rounded-md">Bot is typing...</span></div>
        )}
        <div ref={messagesEndRef} />
      </div>
      <form onSubmit={(e) => { e.preventDefault(); sendMessage(); }} className="flex items-center">
        <input
          className="flex-1 p-2 mr-2 border rounded-md"
          placeholder="Type your message..."
          type="text"
          value={input}
          onChange={handleInputChange}
        />
        <button
          type="submit"
          className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 disabled:bg-blue-300"
          disabled={isLoading || !input.trim()}
        >
          {isLoading ? 'Sending...' : 'Send'}
        </button>
      </form>
    </div>
  );
}
