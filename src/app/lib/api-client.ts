// const API_BASE_URL = "http://localhost:3000";

// Core request function (the real "engine")
async function request<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  // This should receive a relative URL, so it'll hit Next.js at its default domain (localhost:3000 for local) 
  // and be intercepted by the Next.js catch-all route at app/api/[...path]/route.ts.
  const res = await fetch(endpoint, { 
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    ...options,
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(errorText || `API request failed: ${res.status} ${errorText}`);
  }

  return res.json();
}

// Public API client (thin wrappers over request)
export const apiClient = {
  get<T>(endpoint: string) {
    return request<T>(endpoint, { method: "GET" });
  },

  post<T>(endpoint: string, body?: unknown) {
    return request<T>(endpoint, {
      method: "POST",
      body: body ? JSON.stringify(body) : undefined,
    });
  },

  put<T>(endpoint: string, body?: unknown) {
    return request<T>(endpoint, {
      method: "PUT",
      body: body ? JSON.stringify(body) : undefined,
    });
  },

  patch<T>(endpoint: string, body?: unknown) {
    return request<T>(endpoint, {
      method: "PATCH",
      body: body ? JSON.stringify(body) : undefined,
    });
  },

  delete<T>(endpoint: string) {
    return request<T>(endpoint, { method: "DELETE" });
  },
};