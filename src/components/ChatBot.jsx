import React, { useState } from 'react';
import axios from 'axios';

export function ChatBot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: 'user', text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');

    try {
      const response = await axios.post('https://api.openai.com/v1/chat/completions', {
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: input }],
      }, {
        headers: {
          Authorization: `Bearer YOUR_API_KEY`,
        },
      });

      const botMessage = {
        sender: 'bot',
        text: response.data.choices[0].message.content,
      };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error('Error fetching AI response:', error);
      const errorMessage = { sender: 'bot', text: 'Sorry, something went wrong. Please try again later.' };
      setMessages((prev) => [...prev, errorMessage]);
    }
  };

  return (
    <div className="p-4 bg-gray-100 rounded-md w-80">
      <h2 className="text-lg font-bold mb-4">Chat with AI</h2>
      <div className="h-64 overflow-y-auto bg-white p-2 border rounded-md mb-4">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`mb-2 ${msg.sender === 'user' ? 'text-right' : 'text-left'}`}
          >
            <span
              className={`inline-block p-2 rounded-md ${
                msg.sender === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'
              }`}
            >
              {msg.text}
            </span>
          </div>
        ))}
      </div>
      <div className="flex items-center">
        <input
          className="flex-1 p-2 border rounded-md mr-2"
          placeholder="Type your message..."
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          onClick={sendMessage}
        >
          Send
        </button>
      </div>
    </div>
  );
}
