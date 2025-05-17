/**
 * @typedef {Object} Command
 * @property {string} description - A brief description of the command.
 * @property {(args: string[], setMessages?: Function) => Promise<string | void>} action - The function to execute when the command is called.
 *           `args` are the arguments passed to the command.
 *           `setMessages` is an optional function to manipulate the chat messages directly (e.g., for /clear).
 *           Should return a promise that resolves to a string (message to display) or void.
 */

/**
 * @type {Object.<string, Command>}
 */
export const commands = {
  help: {
    description: 'List all available commands',
    action: async () => {
      const availableCommands = Object.keys(commands)
        .map(name => `/${name} - ${commands[name].description}`)
        .join('\n');
      return `**Available Commands:**\n${availableCommands}`;
    },
  },
  clear: {
    description: 'Clear the chat history',
    /**
     * @param {string[]} _args - Command arguments (not used by clear).
     * @param {(messages: any[]) => void} setMessages - Function to update the messages state.
     */
    action: async (_args, setMessages) => {
      if (typeof setMessages === 'function') {
        setMessages([]);
        return 'Chat history cleared.';
      }
      return 'Error: Could not clear messages. `setMessages` function not provided.';
    },
  },
  theme: {
    description: 'Switch between light, dark, or system theme',
    /**
     * @param {string[]} args - Command arguments. Expects one argument: 'light', 'dark', or 'system'.
     */
    action: async (args) => {
      const theme = args[0]?.toLowerCase();
      const validThemes = ['light', 'dark', 'system'];

      if (!theme || !validThemes.includes(theme)) {
        return 'Usage: /theme [light|dark|system]';
      }

      try {
        // Remove previous theme classes
        document.documentElement.classList.remove('light', 'dark');

        if (theme === 'system') {
          localStorage.removeItem('darkMode'); // Clear explicit preference
          // If system, let the browser's preference (or the initial script in index.html) take over.
          // The initial script in index.html should handle applying 'dark' if system prefers dark.
          // We might need to re-evaluate if the system preference is dark.
          if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            document.documentElement.classList.add('dark');
          }
        } else if (theme === 'light') {
          localStorage.setItem('darkMode', 'false');
          // document.documentElement.classList.remove('dark'); // Already removed above
        } else if (theme === 'dark') {
          localStorage.setItem('darkMode', 'true');
          document.documentElement.classList.add('dark');
        } else {
          // This case should not be reached due to validation above, but as a fallback:
          document.documentElement.classList.add(theme); // 'light' or 'dark'
          localStorage.setItem('darkMode', theme === 'dark' ? 'true' : 'false');
        }
        return `Theme set to **${theme}** mode.`;
      } catch (error) {
        console.error("Error setting theme:", error);
        return "Could not save theme preference. Local storage might be disabled.";
      }
    },
  },
  feedback: {
    description: 'Send feedback to RocBot team',
    /**
     * @param {string[]} args - Command arguments. The feedback message.
     */
    action: async (args) => {
      const feedback = args.join(' ');
      if (!feedback.trim()) {
        return 'Usage: /feedback [your message]. Please provide your feedback after the command.';
      }

      console.log('Feedback submitted:', feedback);
      // TODO: Integrate with an actual feedback submission mechanism (e.g., API call).
      // Example:
      // try {
      //   await fetch('/api/feedback', { method: 'POST', body: JSON.stringify({ feedback }) });
      //   return 'Thanks for your feedback! We’ll use it to improve RocBot.';
      // } catch (error) {
      //   return 'Sorry, there was an issue submitting your feedback. Please try again later.';
      // }
      return 'Thanks for your feedback! (Logged to console for now)';
    },
  },
};
