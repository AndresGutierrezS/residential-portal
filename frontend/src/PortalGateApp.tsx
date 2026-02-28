import { RouterProvider } from "react-router"
import { appRouter } from "./app.router"
import { Toaster } from "sonner"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { CheckAuthProvider } from "./auth/providers/CheckAuthProvider";

const queryClient = new QueryClient();

export const PortalGateApp = () => {

  return (
    <>
      <QueryClientProvider client={queryClient} >
        <CheckAuthProvider >
          <Toaster />
          <RouterProvider router={appRouter} />
        </CheckAuthProvider>
      </QueryClientProvider>
    </>
  )
}

