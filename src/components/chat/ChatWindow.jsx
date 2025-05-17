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

const LOCALSTORAGE_MESSAGES_KEY = 'rmh_rocbot_messages';
const LOCALSTORAGE_COMMAND_HISTORY_KEY = 'rmh_rocbot_command_history';
const OPENAI_API_PROXY_ENDPOINT = '/api/openai-proxy';
const LEAD_GENERATION_ENDPOINT = '/api/roccloser/generate-leads';
const OPENAI_DEFAULT_MODEL = 'gpt-3.5-turbo';
const OPENAI_SYSTEM_PROMPT = 'You are RocBot, an expert AI assistant for RocVille Media House. Be concise and helpful.';
const MAX_TOKENS_RESPONSE = 200;

const audioSend = typeof Audio !== 'undefined' ? new Audio(sendSound) : null;
const audioReceive = typeof Audio !== 'undefined' ? new Audio(receiveSound) : null;

let messageIdCounter = 0;
const generateMessageId = () => `msg-${Date.now()}-${messageIdCounter++}`;

const getInitialMessages = () => {
  const saved = localStorage.getItem(LOCALSTORAGE_MESSAGES_KEY);
  if (saved) {
    try {
      const parsedMessages = JSON.parse(saved);
      // Ensure all messages have an ID, for backward compatibility
      return parsedMessages.map(msg => ({ ...msg, id: msg.id || generateMessageId() }));
    } catch (e) {
      console.error("Failed to parse messages from localStorage", e);
      // Fallback to default if parsing fails
    }
  }
  return [{ role: 'ai', content: 'Hi there! I’m RocBot — your AI assistant. How can I help you today?', timestamp: Date.now(), id: generateMessageId() }];
};

const MessageItem = React.memo(({ message, status, currentFeedback, onFeedbackClick }) => (
  <motion.div
    animate={{ opacity: 1, y: 0 }}
    className="flex items-end gap-2 group"
    exit={{ opacity: 0, y: 20 }}
    initial={{ opacity: 0, y: 20 }}
    key={message.id} // Use unique ID as key
    transition={{ duration: 0.25 }}
  >
    {message.role === 'ai' ? (
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
        message.role === 'user'
          ? 'ml-auto bg-blue-500 text-white'
          : 'bg-zinc-200 dark:bg-zinc-700'
      }`} tabIndex={0}>
        {message.content}
      </div>
      <span
        className="mt-1 ml-1 text-xs select-none text-zinc-400 cursor-help"
        title={message.timestamp ? format(new Date(message.timestamp), 'PPpp') : ''}
      >
        {message.timestamp ? format(new Date(message.timestamp), 'HH:mm') : ''}
        {message.role === 'user' && status === 'pending' && (
          <span className="ml-2 text-[10px] align-middle text-blue-400 animate-pulse">sending...</span>
        )}
        {message.role === 'user' && status === 'failed' && (
          <span className="ml-2 text-[10px] align-middle text-red-400">failed</span>
        )}
      </span>
    </div>
    {message.role === 'ai' && message.id !== getInitialMessages()[0].id && ( // Don't show feedback for initial message
      <motion.div
        animate={{ opacity: 1, scale: 1 }}
        className="flex items-center gap-1 ml-2"
        exit={{ opacity: 0, scale: 0.8 }}
        initial={{ opacity: 0, scale: 0.8 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      >
        <button
          aria-label="Thumbs up"
          className={`p-1 rounded-full border border-green-300 hover:bg-green-100 dark:hover:bg-green-900 focus:ring-2 focus:ring-green-400 transition-all duration-150 ${currentFeedback ==='up' ? 'bg-green-200 dark:bg-green-800 scale-110' : ''}`}
          disabled={!!currentFeedback}
          onClick={() => onFeedbackClick(message.id, 'up')}
        >
          <span aria-label="Thumbs up" role="img">👍</span>
        </button>
        <button
          aria-label="Thumbs down"
          className={`p-1 rounded-full border border-red-300 hover:bg-red-100 dark:hover:bg-red-900 focus:ring-2 focus:ring-red-400 transition-all duration-150 ${currentFeedback ==='down' ? 'bg-red-200 dark:bg-red-800 scale-110' : ''}`}
          disabled={!!currentFeedback}
          onClick={() => onFeedbackClick(message.id, 'down')}
        >
          <span aria-label="Thumbs down" role="img">👎</span>
        </button>
        <AnimatePresence>
          {Boolean(currentFeedback) && (
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
));
MessageItem.displayName = 'MessageItem';

const ChatWindow = () => {
  const [messages, setMessages] = useState(getInitialMessages);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [feedback, setFeedback] = useState({}); // { messageId: 'up' | 'down' }
  const [messageStatus, setMessageStatus] = useState({}); // { messageId: 'pending' | 'delivered' | 'failed' }
  const [commandHistory, setCommandHistory] = useState(() => {
    const saved = localStorage.getItem(LOCALSTORAGE_COMMAND_HISTORY_KEY);
    return saved ? JSON.parse(saved) : [];
  });
  const [historyIndex, setHistoryIndex] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null); // Ref for the textarea
  const suggestionsRef = useRef(null);

  useEffect(() => {
    localStorage.setItem(LOCALSTORAGE_MESSAGES_KEY, JSON.stringify(messages));
  }, [messages]);

  useEffect(() => {
    localStorage.setItem(LOCALSTORAGE_COMMAND_HISTORY_KEY, JSON.stringify(commandHistory));
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

  const activeSuggestionId = (historyIndex !== null && suggestions[historyIndex]) ? `suggestion-${suggestions[historyIndex].name}` : undefined;

  const handleKeyDown = (e) => {
    if (showSuggestions && suggestions.length > 0) {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setHistoryIndex((prevIdx) => (prevIdx === null ? 0 : Math.min(prevIdx + 1, suggestions.length - 1)));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setHistoryIndex((prevIdx) => (prevIdx === null ? suggestions.length - 1 : Math.max(prevIdx - 1, 0)));
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
        setHistoryIndex((prevIdx) => {
          const newIdx = prevIdx === null ? commandHistory.length - 1 : Math.max(prevIdx - 1, 0);
          setInput(commandHistory[newIdx]);
          return newIdx;
        });
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setHistoryIndex((prevIdx) => {
          if (prevIdx === null) return null;
          const newIdx = Math.min(prevIdx + 1, commandHistory.length - 1);
          setInput(commandHistory[newIdx]);
          return newIdx;
        });
      }
    }
  };
  
  // Helper function to process commands
  const processCommand = async (fullCommand, userMessageId) => {
    setCommandHistory((prev) => {
      if (prev.length === 0 || prev[prev.length - 1] !== fullCommand) {
        return [...prev, fullCommand];
      }
      return prev;
    });

    const [commandName, ...argsArray] = fullCommand.substring(1).split(' ');
    const commandArgsString = argsArray.join(' ');

    if (commandName === 'generateLeads') {
      const [industry, region] = commandArgsString.split(' ');
      try {
        const res = await fetch(LEAD_GENERATION_ENDPOINT, {
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
            timestamp: Date.now(),
            id: generateMessageId(),
          }]);
        } else {
          setMessages(prev => [...prev, {
            role: 'ai',
            content: `❌ Failed to generate leads: ${data.error || 'Unknown error'}`,
            timestamp: Date.now(),
            id: generateMessageId(),
          }]);
        }
      } catch (apiError) {
        setMessages(prev => [...prev, { role: 'ai', content: `❌ Error calling lead generation API: ${apiError.message}`, timestamp: Date.now(), id: generateMessageId() }]);
      }
    } else {
      const command = commands[commandName];
      if (command && command.action) {
        const botResponse = await command.action(argsArray, setMessages); // Pass setMessages
        // If command.action returns a string, it means it didn't handle setMessages itself.
        if (typeof botResponse === 'string' && botResponse.length > 0) {
          setMessages((prev) => [...prev, { role: 'ai', content: botResponse, timestamp: Date.now(), id: generateMessageId() }]);
        }
      } else {
        setMessages((prev) => [
          ...prev,
          { role: 'ai', content: `Unknown command: /${commandName}`, timestamp: Date.now(), id: generateMessageId() },
        ]);
      }
    }
    setMessageStatus(prev => ({ ...prev, [userMessageId]: 'delivered' }));
    setLoading(false);
  };

  // Helper function to fetch AI response
  const fetchAIResponse = async (allMessagesForContext, userMessageId) => {
    if (audioSend) audioSend.play(); // Play send sound for non-commands
    try {
      const response = await fetch(OPENAI_API_PROXY_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: OPENAI_DEFAULT_MODEL,
          messages: [
            { role: 'system', content: OPENAI_SYSTEM_PROMPT },
            ...allMessagesForContext.map(({id, ...msg}) => msg), // Send to API without local ID
          ],
          max_tokens: MAX_TOKENS_RESPONSE,
          temperature: 0.7,
        }),
      });
      if (!response.ok) throw new Error('AI response failed');
      const data = await response.json();
      const aiContent = data.choices?.[0]?.message?.content || 'Sorry, I could not generate a response.';
      
      setMessageStatus(prev => ({ ...prev, [userMessageId]: 'delivered' }));
      setMessages((prev) => [...prev, { role: 'ai', content: aiContent, timestamp: Date.now(), id: generateMessageId() }]);
      if (audioReceive) audioReceive.play();
    } catch (err) {
      setMessageStatus(prev => ({ ...prev, [userMessageId]: 'failed' }));
      setMessages((prev) => [...prev, { role: 'ai', content: 'Sorry, there was a problem connecting to the AI.', timestamp: Date.now(), id: generateMessageId() }]);
      setError(err.message || 'Failed to connect to AI backend.');
      // Do not play receive sound on error
    } finally {
      setLoading(false);
    }
  };

  const handleSend = async () => {
    const trimmedInput = input.trim();
    if (!trimmedInput) return;

    const now = Date.now();
    const userMessageId = generateMessageId();
    const userMessage = { role: 'user', content: trimmedInput, timestamp: now, id: userMessageId };
    
    const updatedMessages = [...messages, userMessage]; // Create the next state of messages
    setMessages(updatedMessages);
    
    setInput('');
    setLoading(true);
    setError(null);
    setMessageStatus(prev => ({ ...prev, [userMessageId]: 'pending' }));
    trackEvent('chat_message_sent', { content: trimmedInput });

    if (trimmedInput.startsWith('/')) {
      await processCommand(trimmedInput, userMessageId);
    } else {
      await fetchAIResponse(updatedMessages, userMessageId);
    }
  };

  const handleFeedbackClick = (messageId, feedbackType) => {
    setFeedback(f => ({ ...f, [messageId]: feedbackType }));
    trackEvent('chat_feedback', { type: feedbackType, message_id: messageId });
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
            <MessageItem
              key={msg.id}
              message={msg}
              status={messageStatus[msg.id]}
              currentFeedback={feedback[msg.id]}
              onFeedbackClick={handleFeedbackClick}
            />
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
          aria-activedescendant={activeSuggestionId}
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
                id={`suggestion-${s.name}`} // ID for aria-activedescendant
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
