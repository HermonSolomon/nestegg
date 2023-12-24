import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
const queryClient = new QueryClient({
  // Set the global cache time to 10 minutes (600,000 milliseconds)
  defaultOptions: {
    queries: {
      staleTime: 300000, // Set the stale time to 5 minutes (300,000 milliseconds)
    },
  },
});
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </React.StrictMode>
);
