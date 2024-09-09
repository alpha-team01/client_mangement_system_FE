import { createBrowserRouter, useLocation } from "react-router-dom";
import {
  AccountDeactivePage,
  BiddingDashboardPage,
  DefaultDashboardPage,
  EcommerceDashboardPage,
  Error400Page,
  Error403Page,
  Error404Page,
  Error500Page,
  Error503Page,
  ErrorPage,
  HomePage,
  MarketingDashboardPage,
  PasswordResetPage,
  ProjectsDashboardPage,
  SignInPage,
  SignUpPage,
  SocialDashboardPage,
  UserProfileActionsPage,
  UserProfileActivityPage,
  UserProfileDetailsPage,
  UserProfileFeedbackPage,
  UserProfileHelpPage,
  UserProfileInformationPage,
  UserProfilePreferencesPage,
  UserProfileSecurityPage,
  VerifyEmailPage,
  WelcomePage,
  LearningDashboardPage,
  LogisticsDashboardPage,
  DataEntryPage,
} from "../pages";
import { OrgAdminPage } from "../pages/dashboards/OrgAdmin.tsx";
import { DashboardLayout, GuestLayout, UserAccountLayout } from "../layouts";
import React, { ReactNode, useEffect } from "react";
import { AboutPage } from "../pages/About.tsx";
import { AdminPage } from "../pages/admin/AdminPage.tsx";
import { SuperAdminPage } from "../pages/superAdmin/SuperAdminPage.tsx";

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
  {
    path: "/home",
    element: <PageWrapper children={<GuestLayout />} />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        path: "",
        element: <HomePage />,
      },
    ],
  },
  {
    path: "/dashboards",
    element: <PageWrapper children={<DashboardLayout />} />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        path: "default",
        element: <DefaultDashboardPage />,
      },
      {
        index: true,
        path: "orgadmin",
        element: <OrgAdminPage />,
      },
      {
        path: "projects",
        element: <ProjectsDashboardPage />,
      },
      {
        path: "ecommerce",
        element: <EcommerceDashboardPage />,
      },
      {
        path: "marketing",
        element: <MarketingDashboardPage />,
      },
      {
        path: "social",
        element: <SocialDashboardPage />,
      },
      {
        path: "bidding",
        element: <BiddingDashboardPage />,
      },
      {
        path: "learning",
        element: <LearningDashboardPage />,
      },
      {
        path: "logistics",
        element: <LogisticsDashboardPage />,
      },
    ],
  },
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
        path: "preferences",
        element: <UserProfilePreferencesPage />,
      },
      {
        path: "information",
        element: <UserProfileInformationPage />,
      },
      {
        path: "security",
        element: <UserProfileSecurityPage />,
      },
      {
        path: "activity",
        element: <UserProfileActivityPage />,
      },
      {
        path: "actions",
        element: <UserProfileActionsPage />,
      },
      {
        path: "help",
        element: <UserProfileHelpPage />,
      },
      {
        path: "feedback",
        element: <UserProfileFeedbackPage />,
      },
    ],
  },
  {
    path: "/auth",
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
    element: <PageWrapper children={<DashboardLayout />} />,
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
    element: <PageWrapper children={<DashboardLayout />} />,
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
    element: <PageWrapper children={<DashboardLayout />} />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        path: "",
        element: <DataEntryPage />,
      },
      {
        index: true,
        path: "information",
        element: <UserProfileInformationPage />,
      },
    ],
  },
]);

export default router;
