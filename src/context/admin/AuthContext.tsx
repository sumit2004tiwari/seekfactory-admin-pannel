import React, { createContext, useContext, useEffect, useState } from "react";
import {
  adminApiClient,
  AdminUser,
  LoginCredentials,
} from "../../api/lib.tsx";

interface AdminAuthContextType {
  admin: AdminUser | null;
  loading: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => Promise<void>;
  fetchProfile: () => Promise<void>;
}

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(
  undefined
);

export const AdminAuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [admin, setAdmin] = useState<AdminUser | null>(null);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch profile on mount
  useEffect(() => {
    fetchProfile();
  }, []);

  const login = async (credentials: LoginCredentials) => {
    setLoading(true);
    try {
      await adminApiClient.login(credentials);
      await fetchProfile();
    } catch (error) {
      console.error("Admin login failed:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

    const logout = async () => {
    setLoading(true);
    try {
      await adminApiClient.logout();
      setAdmin(null);

      // ✅ auto redirect after logout
      window.location.href = "/auth/sign-in";
    } catch (error) {
      console.error("Admin logout failed:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchProfile = async () => {
    try {
      const res = await adminApiClient.getProfile();
      if (res.success && res.user) {
        setAdmin(res.user);
      } else {
        setAdmin(null);
      }
    } catch {
      setAdmin(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminAuthContext.Provider
      value={{ admin, loading, login, logout, fetchProfile }}
    >
      {children}
    </AdminAuthContext.Provider>
  );
};

// ✅ Custom hook to use context
export const useAdminAuth = () => {
  const context = useContext(AdminAuthContext);
  if (!context) {
    throw new Error("useAdminAuth must be used within AdminAuthProvider");
  }
  return context;
};
