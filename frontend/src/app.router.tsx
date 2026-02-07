import { createBrowserRouter } from "react-router";
import { ResidentLayout } from "./resident/layouts/ResidentLayout";
import { AuthLayout } from './auth/layouts/AuthLayout';
import  { AdminLayout } from "./admin/layouts/AdminLayout";
import { HomePage } from "./resident/pages/HomePage";
import { ChatPage } from "./resident/pages/ChatPage";


export const appRouter = createBrowserRouter([
      {
        path: '/',
        element: <ResidentLayout />,
        children: [
            {
                index: true,
                element: <HomePage />,
            },
            {
                path: 'chat',
                element: <ChatPage />,
            }
        ]
      },

      {
        path: '/auth',
        element: <AuthLayout />,
        children: [
            {
                index: true,
                element: 'login'
            }
        ]
      },

      {
        path: '/admin',
        element: <AdminLayout />,
        children: [
            {
                index: true,
                element: 'dashboard'
            },
            {
                path: 'residents',
                element: 'residents'
            },
            {
                path: 'units',
                element: 'units'
            },
            {
                path: 'payments',
                element: 'payments'
            },
            {
                path: 'cars',
                element: 'cars'
            },
            {
                path: 'expenses',
                element: 'expenses'
            },
            {
                path: 'events',
                element: 'events'
            },
            {
                path: 'reports',
                element: 'reports'
            },
            {
                path: 'chat',
                element: 'chat'
            },
        ],
      }
]);