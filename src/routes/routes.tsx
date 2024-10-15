import { createBrowserRouter, useLocation } from "react-router-dom";
import {
  AccountDeactivePage,
  Error400Page,
  Error403Page,
  Error404Page,
  Error500Page,
  Error503Page,
  ErrorPage,
  HomePage,
  PasswordResetPage,
  SignInPage,
  SignUpPage,
  UserProfileDetailsPage,
  UserProfileSecurityPage,
  VerifyEmailPage,
  WelcomePage,
  CustomerRegistration,
  CustomerSearch,
  CustomerStatus,
  DataEntryDashboardPage,
  SuperAdminDashBoard,
} from "../pages";

import {
  CommonLayout,
  DashboardLayout,
  GuestLayout,
  UserAccountLayout,
} from "../layouts";
import React, { ReactNode, useEffect } from "react";
import { AboutPage } from "../pages/About.tsx";
import { AdminDashboard, AdminPage } from "../pages/admin/AdminDashboard.tsx";
import { SuperAdminPage } from "../pages/superAdmin/SuperAdminPage.tsx";
import { AuthProvider } from "../context/AuthContext.tsx";
import ProtectedRoute from "./ProtectedRoutes.tsx";
import { PATH_DATA_ENTRY } from "../constants/routes.ts";
import { RegisterUser } from "../pages/superAdmin/RegisterUser.tsx";
import { UserStatus } from "../pages/superAdmin/UserStatus.tsx";

// Custom scroll restoration function
export const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    }); // Scroll to the top when the location changes
  }, [pathname]);

  return null; // This component doesn't render anything
};

type PageProps = {
  children: ReactNode;
};

// Create an HOC to wrap your route components with ScrollToTop
const PageWrapper = ({ children }: PageProps) => {
  return (
    <>
      <ScrollToTop />
      {children}
    </>
  );
};

// Create the router
const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <AuthProvider>
        <SignInPage />
      </AuthProvider>
    ),
    errorElement: <ErrorPage />,
  },
  // {
  //   path: "/home",
  //   element: <PageWrapper children={<GuestLayout />} />,
  //   errorElement: <ErrorPage />,
  //   children: [
  //     {
  //       index: true,
  //       path: "",
  //       element: <HomePage />,
  //     },
  //   ],
  // },

  {
    path: "/user-profile",
    element: (
      <AuthProvider>
        <PageWrapper children={<UserAccountLayout />} />
      </AuthProvider>
  ),
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        path: "details",
        element: <UserProfileDetailsPage />,
      },

      {
        path: "security",
        element: <UserProfileSecurityPage />,
      },
    ],
  },
  {
    path: "/auth",
    element: (
      <AuthProvider>
        <PageWrapper children={<CommonLayout />} />
      </AuthProvider>
    ),
    errorElement: <ErrorPage />,
    children: [
      {
        path: "signup",
        element: <SignUpPage />,
      },
      {
        path: "signin",
        element: <SignInPage />,
      },
      {
        path: "welcome",
        element: <WelcomePage />,
      },
      {
        path: "verify-email",
        element: <VerifyEmailPage />,
      },
      {
        path: "password-reset",
        element: <PasswordResetPage />,
      },
      {
        path: "account-delete",
        element: <AccountDeactivePage />,
      },
    ],
  },

  // admin routes
  {
    path: "/admin",
    element: (
      <AuthProvider>
        {/* <ProtectedRoute allowedRoles={["admin"]}> */}
          <PageWrapper children={<DashboardLayout />} />
        {/* </ProtectedRoute> */}
      </AuthProvider>
    ),
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        path: "dashboard",
        element: <AdminDashboard />,
      },
      {
        index: true,
        path: "search-user",
        element: <SuperAdminPage />, // Change this to AdminPage
      },
      {
        index: true,
        path: "register-user",
        element: <RegisterUser />, //change this to RegisterUser
      },
      {
        index: true,
        path: "user-status",
        element: <UserStatus />,
      },
      {
        index: true,
        path: "search-customer",
        element: <CustomerSearch />,
      },
      {
        index: true,
        path: "register-customer",
        element: <CustomerRegistration />,
      },
      {
        index: true,
        path: "customer-status",
        element: <CustomerStatus />,
      }
    ],
  },

  // super admin routes
  {
    path: "/super-admin",
    element: (
      <AuthProvider>
        {/* <ProtectedRoute allowedRoles={["super admin"]}> */}
          <PageWrapper children={<DashboardLayout />} />
        {/* </ProtectedRoute> */}
      </AuthProvider>
    ),
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        path: "dashboard",
        element: <SuperAdminDashBoard />,
      },
      {
        index: true,
        path: "search-user",
        element: <SuperAdminPage />,
      },
      {
        index: true,
        path: "register-user",
        element: <RegisterUser />,
      },
      {
        index: true,
        path: "user-status",
        element: <UserStatus />,
      },
      {
        index: true,
        path: "search-customer",
        element: <CustomerSearch />,
      },
      {
        index: true,
        path: "register-customer",
        element: <CustomerRegistration />,
      },
      {
        index: true,
        path: "customer-status",
        element: <CustomerStatus />,
      }
    ],
  },

  // data entry routes
  {
    path: "/data-entry",
    element: (
      <AuthProvider>
        {/* <ProtectedRoute allowedRoles={["data entry"]}> */}
          <PageWrapper children={<DashboardLayout />} />
        {/* </ProtectedRoute> */}
      </AuthProvider>
    ),
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        path: PATH_DATA_ENTRY.root,
        element: <DataEntryDashboardPage />,
      },
      {
        index: true,
        path: PATH_DATA_ENTRY.dashbord,
        element: <DataEntryDashboardPage />,
      },
      {
        index: true,
        path: "customer-status",
        element: <CustomerStatus />,
      },
      {
        index: true,
        path: "register-customer",
        element: <CustomerRegistration />,
      },
      {
        index: true,
        path: "search-customer",
        element: <CustomerSearch />,
      },
    ],
  },
]);

export default router;
