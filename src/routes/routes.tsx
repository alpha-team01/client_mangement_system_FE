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
} from "../pages";

import {
  CommonLayout,
  DashboardLayout,
  GuestLayout,
  UserAccountLayout,
} from "../layouts";
import React, { ReactNode, useEffect } from "react";
import { AboutPage } from "../pages/About.tsx";
import { AdminPage } from "../pages/admin/AdminPage.tsx";
import { SuperAdminPage } from "../pages/superAdmin/SuperAdminPage.tsx";
import { AuthProvider } from "../context/AuthContext.tsx";
import ProtectedRoute from "./ProtectedRoutes.tsx";
import { PATH_DATA_ENTRY } from "../constants/routes.ts";

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
    element: <SignInPage />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        path: "",
        element: <HomePage />,
      },
    ],
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
    element: <PageWrapper children={<UserAccountLayout />} />,
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
  {
    path: "errors",
    errorElement: <ErrorPage />,
    children: [
      {
        path: "400",
        element: <Error400Page />,
      },
      {
        path: "403",
        element: <Error403Page />,
      },
      {
        path: "404",
        element: <Error404Page />,
      },
      {
        path: "500",
        element: <Error500Page />,
      },
      {
        path: "503",
        element: <Error503Page />,
      },
    ],
  },
  {
    path: "/about",
    element: <PageWrapper children={<DashboardLayout />} />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        path: "",
        element: <AboutPage />,
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
        path: "",
        element: <AdminPage />,
      },
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
        path: "",
        element: <SuperAdminPage />,
      },
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
