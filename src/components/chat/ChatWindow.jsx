import React, { useState, useRef, useEffect } from 'react';
import { PaperAirplaneIcon, CommandLineIcon } from '@heroicons/react/24/outline';
import { UserCircleIcon, SparklesIcon } from '@heroicons/react/24/solid';
import { motion, AnimatePresence } from 'framer-motion';
import { format } from 'date-fns';
import sendSound from '../../assets/send.mp3';
import receiveSound from '../../assets/receive.mp3';
import { commands } from '../../lib/rocbot/commands';

// Analytics tracking (replace with real analytics service as needed)
function trackEvent(event, data) {
  if (window && window.gtag) {
    window.gtag('event', event, data);
  }
}

const audioSend = typeof Audio !== 'undefined' ? new Audio(sendSound) : null;
const audioReceive = typeof Audio !== 'undefined' ? new Audio(receiveSound) : null;

const ChatWindow = () => {
  const [messages, setMessages] = useState([
    { role: 'ai', content: 'Hi there! I’m RocBot — your AI assistant. How can I help you today?', timestamp: Date.now() }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [feedback, setFeedback] = useState({}); // { messageIdx: 'up' | 'down' }
  const [messageStatus, setMessageStatus] = useState({}); // { originalUserMessageIdx: 'pending' | 'delivered' | 'failed' }
  const [commandHistory, setCommandHistory] = useState(() => {
    // Consider more specific localStorage keys
    const saved = localStorage.getItem('rmh_rocbot_command_history');
    return saved ? JSON.parse(saved) : [];
  });
  const [historyIndex, setHistoryIndex] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null); // Ref for the textarea
  const suggestionsRef = useRef(null);

  useEffect(() => {
    // Consider more specific localStorage keys
    const savedMessages = localStorage.getItem('rmh_rocbot_messages');
    if (savedMessages) {
      setMessages(JSON.parse(savedMessages));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('rocbot_messages', JSON.stringify(messages));
  }, [messages]);

  useEffect(() => {
    localStorage.setItem('rmh_rocbot_command_history', JSON.stringify(commandHistory));
  }, [commandHistory]);

  const handleInputChange = (e) => {
    const val = e.target.value;
    setInput(val);
    setShowSuggestions(val.startsWith('/'));
    if (val.startsWith('/')) {
      const match = val.slice(1).toLowerCase();
      setSuggestions(
        Object.keys(commands)
          .filter((cmd) => cmd.startsWith(match))
          .map((cmd) => ({
            name: cmd,
            description: commands[cmd].description,
          }))
      );
    } else {
      setSuggestions([]);
    }
    setHistoryIndex(null);
  };

  const handleKeyDown = (e) => {
    if (showSuggestions && suggestions.length > 0) {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setHistoryIndex((idx) => (idx === null ? 0 : Math.min(idx + 1, suggestions.length - 1)));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setHistoryIndex((idx) => (idx === null ? suggestions.length - 1 : Math.max(idx - 1, 0)));
      } else if (e.key === 'Enter' && historyIndex !== null) {
        e.preventDefault();
        setInput('/' + suggestions[historyIndex].name + ' ');
        setShowSuggestions(false);
        setSuggestions([]);
        setHistoryIndex(null);
        inputRef.current?.focus(); // Return focus to input
        return;
      }
    }
    // Command history navigation
    if (!showSuggestions && commandHistory.length > 0) {
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        setHistoryIndex((idx) => {
          const newIdx = idx === null ? commandHistory.length - 1 : Math.max(idx - 1, 0);
          setInput(commandHistory[newIdx]);
          return newIdx;
        });
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setHistoryIndex((idx) => {
          if (idx === null) return null;
          const newIdx = Math.min(idx + 1, commandHistory.length - 1);
          setInput(commandHistory[newIdx]);
          return newIdx;
        });
      }
    }
  };

  const handleSend = async () => {
    if (!input.trim()) return;
    if (input.trim().startsWith('/')) {
      setCommandHistory((prev) => {
        if (prev[prev.length - 1] !== input.trim()) {
          return [...prev, input.trim()];
        }
        return prev;
      });
    }
    const now = Date.now();
    const userMessage = { role: 'user', content: input, timestamp: now };
    const userMessageIndex = messages.length; // Index of the upcoming user message
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setLoading(true);
    setError(null);
    setMessageStatus(prev => ({ ...prev, [userMessageIndex]: 'pending' }));
    trackEvent('chat_message_sent', { content: input });

    // Command parsing
    if (input.trim().startsWith('/')) {
      const [commandName, ...argsArray] = input.trim().substring(1).split(' ');
      const commandArgsString = argsArray.join(' ');

      if (commandName === 'generateLeads') {
        const [industry, region] = commandArgsString.split(' '); // industry is query
        try {
          const res = await fetch('/api/roccloser/generate-leads', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ query: industry, region })
          });
          const data = await res.json();
          if (data.success && data.leads) {
            const preview = data.leads.slice(0, 3).map(lead => `- ${lead.name} (${lead.company || lead.email || 'N/A'})`).join('\n');
            setMessages(prev => [...prev, {
              role: 'ai',
              content: `Lead generation complete. Found ${data.leads.length} lead(s). Preview:\n\n${preview}\n\nType /showLeads to view more.`,
              timestamp: Date.now()
            }]);
          } else {
            setMessages(prev => [...prev, {
              role: 'ai',
              content: `❌ Failed to generate leads: ${data.error || 'Unknown error'}`,
              timestamp: Date.now()
            }]);
          }
        } catch (apiError) {
          setMessages(prev => [...prev, { role: 'ai', content: `❌ Error calling lead generation API: ${apiError.message}`, timestamp: Date.now() }]);
        }
        setMessageStatus(prev => ({ ...prev, [userMessageIndex]: 'delivered' }));
        setLoading(false);
        return;
      }

      const command = commands[commandName];
      if (command) {
        const botResponse = await command.action(argsArray, setMessages);
        setMessages((prev) => [...prev, { role: 'ai', content: botResponse, timestamp: Date.now() }]);
      } else {
        setMessages((prev) => [
          ...prev,
          { role: 'ai', content: `Unknown command: /${commandName}`, timestamp: Date.now() },
        ]);
      }
      setMessageStatus(prev => ({ ...prev, [userMessageIndex]: 'delivered' })); // Command execution is local/quick
      setLoading(false);
      return;
    }

    if (audioSend) audioSend.play();

    try {
      // Call backend proxy endpoint instead of OpenAI directly
      const response = await fetch('/api/openai-proxy', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [
            { role: 'system', content: 'You are RocBot, an expert AI assistant for RocVille Media House.' },
            ...messages,
            userMessage,
          ],
          max_tokens: 256,
          temperature: 0.7,
        }),
      });
      if (!response.ok) throw new Error('AI response failed');
      const data = await response.json();
      const aiContent = data.choices?.[0]?.message?.content || 'Sorry, I could not generate a response.';
      setMessageStatus(prev => ({ ...prev, [userMessageIndex]: 'delivered' }));
      setMessages((prev) => [...prev, { role: 'ai', content: aiContent, timestamp: Date.now() }]);
      if (audioReceive) audioReceive.play();
    } catch (err) {
      setMessageStatus(prev => ({ ...prev, [userMessageIndex]: 'failed' }));
      setMessages((prev) => [...prev, { role: 'ai', content: 'Sorry, there was a problem connecting to the AI.', timestamp: Date.now() }]);
      setError('Failed to connect to AI backend.');
      if (audioReceive) audioReceive.play();
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="fixed z-50 flex flex-col w-full max-w-md overflow-hidden bg-white border rounded-lg shadow-2xl bottom-6 right-6 dark:bg-zinc-900 dark:border-zinc-700">
      <div className="flex items-center gap-2 px-4 py-2 font-semibold border-b bg-zinc-100 dark:bg-zinc-800 dark:border-zinc-700 text-zinc-900 dark:text-white">
        <SparklesIcon className="w-5 h-5 text-blue-500" />
        RocBot — AI Assistant
      </div>
      <div aria-live="polite" className="p-4 space-y-4 overflow-y-auto text-sm h-80 text-zinc-800 dark:text-zinc-100">
        <AnimatePresence initial={false}>
          {messages.map((msg, idx) => (
            <motion.div
              animate={{ opacity: 1, y: 0 }}
              className="flex items-end gap-2 group"
              exit={{ opacity: 0, y: 20 }}
              initial={{ opacity: 0, y: 20 }}
              key={idx}
              transition={{ duration: 0.25 }}
            >
              {msg.role === 'ai' ? (
                <div className="flex-shrink-0">
                  <SparklesIcon className="p-1 text-blue-500 bg-blue-100 rounded-full w-7 h-7 dark:bg-zinc-800" />
                </div>
              ) : (
                <div className="flex-shrink-0">
                  <UserCircleIcon className="w-7 h-7 text-zinc-400 dark:text-zinc-600" />
                </div>
              )}
              <div className="flex flex-col">
                <div className={`px-3 py-2 rounded-lg max-w-[75%] shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-150 ${
                  msg.role === 'user'
                    ? 'ml-auto bg-blue-500 text-white'
                    : 'bg-zinc-200 dark:bg-zinc-700'
                }`} tabIndex={0}>
                  {msg.content}
                </div>
                <span
                  className="mt-1 ml-1 text-xs select-none text-zinc-400 cursor-help"
                  title={msg.timestamp ? format(new Date(msg.timestamp), 'PPpp') : ''}
                >
                  {msg.timestamp ? format(new Date(msg.timestamp), 'HH:mm') : ''}
                  {msg.role === 'user' && messageStatus[idx] === 'pending' && (
                    <span className="ml-2 text-[10px] align-middle text-blue-400 animate-pulse">sending...</span>
                  )}
                  {msg.role === 'user' && messageStatus[idx] === 'failed' && (
                    <span className="ml-2 text-[10px] align-middle text-red-400">failed</span>
                  )}
                </span>
              </div>
              {msg.role === 'ai' && idx !== 0 && (
                <motion.div
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex items-center gap-1 ml-2"
                  exit={{ opacity: 0, scale: 0.8 }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                >
                  <button
                    aria-label="Thumbs up"
                    className={`p-1 rounded-full border border-green-300 hover:bg-green-100 dark:hover:bg-green-900 focus:ring-2 focus:ring-green-400 transition-all duration-150 ${feedback[idx]==='up' ? 'bg-green-200 dark:bg-green-800 scale-110' : ''}`}
                    disabled={!!feedback[idx]}
                    onClick={() => {
                      setFeedback(f => ({ ...f, [idx]: 'up' }));
                      trackEvent('chat_feedback', { type: 'up', message: msg.content, idx });
                    }}
                  >
                    <span aria-label="Thumbs up" role="img">👍</span>
                  </button>
                  <button
                    aria-label="Thumbs down"
                    className={`p-1 rounded-full border border-red-300 hover:bg-red-100 dark:hover:bg-red-900 focus:ring-2 focus:ring-red-400 transition-all duration-150 ${feedback[idx]==='down' ? 'bg-red-200 dark:bg-red-800 scale-110' : ''}`}
                    disabled={!!feedback[idx]}
                    onClick={() => {
                      setFeedback(f => ({ ...f, [idx]: 'down' }));
                      trackEvent('chat_feedback', { type: 'down', message: msg.content, idx });
                    }}
                  >
                    <span aria-label="Thumbs down" role="img">👎</span>
                  </button>
                  <AnimatePresence>
                    {Boolean(feedback[idx]) && (
                      <motion.span
                        animate={{ opacity: 1, scale: 1 }}
                        className="ml-2 text-xs text-zinc-500"
                        exit={{ opacity: 0, scale: 0.8 }}
                        initial={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.2 }}
                      >Thank you!</motion.span>
                    )}
                  </AnimatePresence>
                </motion.div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
        {loading && (
          <div className="flex items-center gap-2 text-zinc-500 dark:text-zinc-300 animate-pulse">
            <SparklesIcon className="w-5 h-5 text-blue-400" />
            RocBot is typing...
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      <div className="relative flex items-center gap-2 px-4 py-3 border-t bg-zinc-50 dark:bg-zinc-800 dark:border-zinc-700">
        {input.startsWith('/') ? (
          <CommandLineIcon className="w-5 h-5 mr-2 text-blue-500" />
        ) : null}
        <textarea
          className={`flex-1 p-2 text-sm border rounded-md outline-none resize-none transition-all duration-150 ${
            // Ensure dark mode styles are comprehensive for textarea states
            input.startsWith('/')
              ? 'bg-blue-50 dark:bg-blue-900 border-blue-400 focus:ring-2 focus:ring-blue-400'
              : 'bg-white dark:bg-zinc-900 border dark:border-zinc-700 focus:ring-2 focus:ring-blue-400'
          } text-zinc-900 dark:text-white`}
          disabled={loading}
          placeholder={input.startsWith('/') ? 'Type a command or /help' : 'Type your message...'}
          rows={1}
          ref={inputRef}
          style={{ paddingLeft: input.startsWith('/') ? '2.5rem' : undefined }}
          value={input}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
        />
        {input && !loading && (
          <button
            aria-label="Clear input"
            className="p-2 rounded-full text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 focus:ring-2 focus:ring-blue-400"
            type="button"
            onClick={() => setInput('')}
          >
            ×
          </button>
        )}
        <button
          className="p-2 text-white bg-blue-600 rounded-full hover:bg-blue-700 disabled:opacity-50 focus:ring-2 focus:ring-blue-400"
          disabled={loading || !input.trim()}
          onClick={handleSend}
        >
          <PaperAirplaneIcon className="w-5 h-5 rotate-45" />
        </button>
        {/* Command auto-suggestions dropdown */}
        {showSuggestions && suggestions.length > 0 && (
          <ul
            className="absolute z-50 overflow-y-auto text-sm bg-white border rounded shadow-lg bottom-20 left-4 w-80 dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 max-h-56"
            ref={suggestionsRef}
            role="listbox"
          >
            {suggestions.map((s, i) => (
              <li
                aria-selected={i === historyIndex}
                className={`flex items-center gap-2 px-4 py-2 cursor-pointer ${i === historyIndex ? 'bg-blue-100 dark:bg-blue-900' : ''}`}
                key={s.name}
                role="option"
                onClick={() => { // Changed from onMouseDown for better accessibility
                  setInput('/' + s.name + ' ');
                  setShowSuggestions(false);
                  setSuggestions([]);
                  setHistoryIndex(null);
                  inputRef.current?.focus(); // Return focus to input
                }}
              >
                <CommandLineIcon className="w-4 h-4 text-blue-400" />
                <span className="font-mono text-blue-600 dark:text-blue-300">/{s.name}</span>
                <span className="ml-2 text-zinc-500">{s.description}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
      {error ? (
        <div className="px-4 py-2 text-xs text-red-600 bg-red-50 dark:bg-red-900 dark:text-red-200">{String(error)}</div>
      ) : null}
    </div>
  );
};

export default ChatWindow;
