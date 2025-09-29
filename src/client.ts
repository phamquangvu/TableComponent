import { QueryClient } from "@tanstack/react-query";

interface HttpError {
  response?: {
    status: number;
  };
}

function isHttpError(error: unknown): error is HttpError {
  return typeof error === "object" && error !== null && "response" in error;
}

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      gcTime: 1000 * 60 * 10, // 10 minutes
      retry: (failureCount, error: unknown) => {
        // Don't retry on 4xx errors except 408, 429
        if (
          isHttpError(error) &&
          error.response &&
          error.response.status >= 400 &&
          error.response.status < 500
        ) {
          return ![408, 429].includes(error.response.status);
        }
        return failureCount < 3;
      },
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
      refetchOnWindowFocus: false,
    },
    mutations: {
      retry: false,
    },
  },
});
