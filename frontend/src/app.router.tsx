import { createBrowserRouter } from "react-router";
import { AuthLayout } from './auth/layouts/AuthLayout';
import  { AdminLayout } from "./admin/layouts/AdminLayout";
import { ResidentLayout } from "./resident/layouts/ResidentLayout";
import { HomePage } from "./resident/pages/HomePage";
import { ChatPage } from "./resident/pages/ChatPage";
import { LoginPage } from "./auth/pages/LoginPage";
import { DashboardPage } from "./admin/pages/DashboardPage";
import { ResidentsPage } from "./admin/pages/ResidentsPage";
import { UnitsPage } from "./admin/pages/UnitsPage";
import { PaymentsPage } from "./admin/pages/PaymentsPage";
import { CarsPage } from "./admin/cars/pages/CarsPage";
import { ExpensesPage } from "./admin/pages/ExpensesPage";
import { EventsPage } from "./admin/pages/EventsPage";
import { ReportsPage } from "./admin/pages/ReportsPage";
import { AdminChatPage } from "./admin/pages/AdminChatPage";
import { AdminRoute } from "./auth/guards/AdminRoute";
import { AuthenticatedRoute } from "./auth/guards/AuthenticatedRoute";
import { NotAuthenticatedRoute } from "./auth/guards/NotAuthenticatedRoute";
import { RegisterPage } from "./auth/pages/RegisterPage";
import { VerifyEmailPage } from "./auth/pages/VerifyEmailPage";
import { ChangePasswordPage } from "./auth/pages/ChangePasswordPage";
import path from "node:path";


export const appRouter = createBrowserRouter([
      {
        path: '/',
        element: 
            <AuthenticatedRoute >
                <ResidentLayout />
            </AuthenticatedRoute>,
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
        element: 
            <NotAuthenticatedRoute >
                <AuthLayout />
            </NotAuthenticatedRoute>,
        children: [
            {
                index: true,
                element: <LoginPage />
            },
            {
                path: 'register',
                element: <RegisterPage />
            },
            {
                path: 'verify-email',
                element: <VerifyEmailPage />
            }
        ]
      },

      {
        path: '/admin',
        element: 
            <AdminRoute >
                <AdminLayout />
            </AdminRoute>
            ,
        children: [
            {
                index: true,
                element: <DashboardPage />
            },
            {
                path: 'residents',
                element: <ResidentsPage />
            },
            {
                path: 'units',
                element: <UnitsPage />
            },
            {
                path: 'payments',
                element: <PaymentsPage />
            },
            {
                path: 'cars',
                element: <CarsPage />
            },
            {
                path: 'expenses',
                element: <ExpensesPage />
            },
            {
                path: 'events',
                element: <EventsPage />
            },
            {
                path: 'reports',
                element: <ReportsPage />
            },
            {
                path: 'chat',
                element: <AdminChatPage />
            },
        ],
      },
      {
        path: '/account',
        element: 
            <AuthenticatedRoute >
                <AuthLayout />
            </AuthenticatedRoute>,
        children: [
            {
                path: 'change-password',
                element: <ChangePasswordPage />
            }
        ]
     }   
]);