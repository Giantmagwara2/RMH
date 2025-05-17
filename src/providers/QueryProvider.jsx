import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import PropTypes from 'prop-types';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // Data is considered fresh for 5 minutes
      refetchOnWindowFocus: false, // Disable refetching on window focus
      retry: 1, // Retry failed queries once
      cacheTime: 1000 * 60 * 10, // Cache data for 10 minutes
      onError: (error) => {
        console.error('Query Error:', error);
      },
    },
    mutations: {
      onError: (error) => {
        console.error('Mutation Error:', error);
      },
    },
  },
  queryCache: {
    onError: (error) => {
      console.error('Query Cache Error:', error);
    },
  },
});

export function QueryProvider({ children }) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}