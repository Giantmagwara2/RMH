export const commands = {
  help: {
    description: 'List all available commands',
    action: async () => {
      return [
        '**Available Commands:**',
        '/help - Show this help message',
        '/clear - Clear the chat history',
        '/theme [light|dark|system] - Switch chat theme',
        '/feedback [your message] - Send feedback to RocBot',
      ].join('\n');
    },
  },
  clear: {
    description: 'Clear the chat history',
    action: async (_args, setMessages) => {
      setMessages([]);
      return 'Chat history cleared.';
    },
  },
  theme: {
    description: 'Switch between light, dark, or system theme',
    action: async (args) => {
      const theme = args[0]?.toLowerCase();
      if (!['light', 'dark', 'system'].includes(theme)) {
        return 'Usage: /theme [light|dark|system]';
      }
      localStorage.setItem('theme', theme);
      document.documentElement.classList.remove('light', 'dark');
      if (theme !== 'system') {
        document.documentElement.classList.add(theme);
      }
      return `Theme set to **${theme}** mode.`;
    },
  },
  feedback: {
    description: 'Send feedback to RocBot team',
    action: async (args) => {
      const feedback = args.join(' ');
      if (!feedback) return 'Please provide feedback after the command.';
      // TODO: Integrate with feedback backend
      return 'Thanks for your feedback! We’ll use it to improve RocBot.';
    },
  },
};
