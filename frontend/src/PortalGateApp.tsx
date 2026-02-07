import { RouterProvider } from "react-router"
import { appRouter } from "./app.router"
import { Toaster } from "sonner"


export const PortalGateApp = () => {

  return (
    <>
      <Toaster />
      <RouterProvider router={appRouter} />
    </>
  )
}

