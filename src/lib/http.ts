import ky from "ky";
// Validate and sanitize API URL
const baseURL = import.meta.env.VITE_API_URL || "/api";
const rawBaseURL =
  baseURL.startsWith("http") || baseURL.startsWith("/") ? baseURL : "/api"; // Fallback to safe default

// We'll update this to use Redux store after store is created
let getAuthToken = () => localStorage.getItem("auth_token");

export const http = ky.create({
  prefixUrl: rawBaseURL.replace(/\/+$/, ""), // Remove trailing slashes
  timeout: 30000,
  // Include cookies for session-based auth
  credentials: "include",
  hooks: {
    beforeRequest: [
      (request) => {
        // Add auth token if available (legacy token-based auth; safe to keep alongside cookie auth)
        const token = getAuthToken();
        if (token) {
          request.headers.set("Authorization", `Bearer ${token}`);
        }

        // Add common headers (let ky set Content-Type based on body)
        request.headers.set("Accept", "application/json");
      },
    ],
    afterResponse: [
      (_request, _options, response) => {
        // Handle common response scenarios
        if (response.status === 401) {
          // Clear invalid token
          localStorage.removeItem("auth_token");
          // Optionally redirect to login
          if (!window.location.pathname.startsWith("/auth")) {
            window.location.href = "/auth/login";
          }
        }

        // Throw on non-ok responses to normalize error handling
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }

        return response;
      },
    ],
    beforeError: [
      async (error) => {
        const { response } = error;
        if (response?.body) {
          try {
            const errorBody = (await response.json()) as Record<
              string,
              unknown
            >;
            error.name = "HTTPError";
            error.message =
              (errorBody.message as string) ||
              (errorBody.detail as string) ||
              `${response.status} ${response.statusText}`;
            // Add status and body as custom properties
            Object.assign(error, {
              status: response.status,
              body: errorBody,
            });
          } catch {
            error.name = "HTTPError";
            error.message = `${response.status} ${response.statusText}`;
            Object.assign(error, { status: response.status });
          }
        }
        return error;
      },
    ],
  },
  retry: {
    limit: 3,
    methods: ["get", "post", "put", "patch", "delete"],
    statusCodes: [408, 413, 429, 500, 502, 503, 504],
    // backoffLimit: 30000,
  },
});

// Function to update auth token getter (called after store is created)
export const setAuthTokenGetter = (getter: () => string | null) => {
  getAuthToken = getter;
};

// Export typed methods for better DX
export const api = {
  get: <T>(url: string, options?: Parameters<typeof http.get>[1]) =>
    http.get(url, options).json<T>(),

  post: <T>(url: string, options?: Parameters<typeof http.post>[1]) =>
    http.post(url, options).json<T>(),

  put: <T>(url: string, options?: Parameters<typeof http.put>[1]) =>
    http.put(url, options).json<T>(),

  patch: <T>(url: string, options?: Parameters<typeof http.patch>[1]) =>
    http.patch(url, options).json<T>(),

  delete: <T>(url: string, options?: Parameters<typeof http.delete>[1]) =>
    http.delete(url, options).json<T>(),
};

// Utility to normalize API errors to a single shape
export async function normalizeHttpError(
  e: unknown
): Promise<{ message: string; status?: number; body?: unknown }> {
  if (typeof e === "object" && e && "response" in e) {
    try {
      const res = (e as { response?: Response }).response as Response;
      const data = await res
        .clone()
        .json()
        .catch(() => null);
      if (data && typeof data === "object") {
        // Try common fields
        const msg = ((data as Record<string, unknown>).message ||
          (data as Record<string, unknown>).error ||
          (data as Record<string, unknown>).detail ||
          JSON.stringify(data)) as string;
        return { message: msg, status: res.status, body: data };
      }
      const text = await res
        .clone()
        .text()
        .catch(() => "");
      return {
        message: text || `${res.status} ${res.statusText}`,
        status: res.status,
      };
    } catch {
      // fallthrough
    }
  }

  // Check if error was processed by beforeError hook
  if (typeof e === "object" && e && "status" in e && "body" in e) {
    return {
      message: e instanceof Error ? e.message : "Unexpected error",
      status: (e as { status: number }).status,
      body: (e as { body: unknown }).body,
    };
  }

  return { message: e instanceof Error ? e.message : "Unexpected error" };
}
