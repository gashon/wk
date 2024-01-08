import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { QueryClientProvider } from "@tanstack/react-query";
import { Analytics } from "@gashon/analytics";
import { Toaster } from "@/components/ui/sonner";

import { queryClient } from "@/lib/react-query";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <Analytics
        apiKey="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdXRob3JfaWQiOiJlOWJhM2U0ZC0yOTI4LTQxZTYtOTQ2ZS1lNTAwZWUyNzRkYTciLCJwcm9qZWN0X2lkIjoiYjA2NGY0MjYtM2JkZS00OGFlLTk0MmQtYWJkZDE5YjgxZDkxIiwiY3JlYXRlZF9hdCI6IjIwMjMtMTItMzBUMDc6NTU6MjEuMzUxWiIsImlhdCI6MTcwMzkyMjkyMX0.zrD_UJ73kmoFMGu9IDOqSP0vkKr9HskRlxDqeYjQr08"
        endpoint="https://analytics-fawn-nine.vercel.app/api/analytics"
        trackSession
        trackClickEvents
        disableOnDev
        disableNotifications
      />
      <Toaster />
      <Component {...pageProps} />
    </QueryClientProvider>
  );
}
