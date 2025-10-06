import { ToastContainer } from "react-toastify";
import { HelmetProvider } from "react-helmet-async";

import { AdminAuthProvider } from "@/context/admin/AuthContext";
import { LayoutProvider } from "@/context/useLayoutContext";
import { NotificationProvider } from "@/context/useNotificationContext";
import { FooterProvider } from "@/context/admin/AdminCms"; // ✅ import
import { AdminDashboardProvider } from "@/context/admin/StatAndDashboard"; // ✅ import

import type { ChildrenType } from "@/types/component-props";

const AppProvidersWrapper = ({ children }: ChildrenType) => {
  return (
    <HelmetProvider>
      <AdminAuthProvider>
        <AdminDashboardProvider> {/* ✅ wrap here */}
          <FooterProvider>
          <LayoutProvider>
            <NotificationProvider>
              {children}
              <ToastContainer theme="colored" />
            </NotificationProvider>
          </LayoutProvider>
          </FooterProvider>
        </AdminDashboardProvider>
      </AdminAuthProvider>
    </HelmetProvider>
  );
};

export default AppProvidersWrapper; 
