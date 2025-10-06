import React, { createContext, useContext, useEffect, useState } from "react";
import { adminApiClient, User } from "../../api/lib";

interface Category {
  _id?: string;
  name: string;
  subcategories: string[];
  featured: boolean;
}

interface AdminDashboardContextType {
  buyers: User[];
  suppliers: User[];
  stats: any;
  categories: Category[];
  loading: boolean;
  fetchBuyers: () => Promise<void>;
  fetchSuppliers: () => Promise<void>;
  fetchStats: () => Promise<void>;
  fetchVendorProducts: (vendorId: string) => Promise<void>;
  fetchCategories: () => Promise<void>;
  saveCategories: (categories: Category[]) => Promise<void>;
  updateFeaturedCategories: (featuredIds: string[]) => Promise<void>;
}

const AdminDashboardContext = createContext<AdminDashboardContextType | undefined>(undefined);

export const AdminDashboardProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [buyers, setBuyers] = useState<User[]>([]);
  const [suppliers, setSuppliers] = useState<User[]>([]);
  const [vendorProducts, setVendorProducts] = useState<any[]>([]);
  const [stats, setStats] = useState<any>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch all on mount
  useEffect(() => {
    (async () => {
      await Promise.all([fetchBuyers(), fetchSuppliers(), fetchStats(), fetchCategories()]);
      setLoading(false);
    })();
  }, []);

  // ✅ Buyers
  const fetchBuyers = async () => {
    try {
      const res = await adminApiClient.getAllBuyers();
      setBuyers(Array.isArray(res.data) ? res.data : []);
    } catch (error) {
      console.error("Error fetching buyers:", error);
      setBuyers([]);
    }
  };

  // ✅ Suppliers
  const fetchSuppliers = async () => {
    try {
      const res = await adminApiClient.getAllSuppliers();
      setSuppliers(Array.isArray(res.data) ? res.data : []);
    } catch (error) {
      console.error("Error fetching suppliers:", error);
      setSuppliers([]);
    }
  };

  // ✅ Stats
  const fetchStats = async () => {
    try {
      const res = await adminApiClient.getStats();
      setStats(res.data || {});
    } catch (error) {
      console.error("Error fetching stats:", error);
      setStats({});
    }
  };

  // ✅ Products (Vendor-wise)
  const fetchVendorProducts = async (vendorId: string) => {
    try {
      const res = await adminApiClient.getProductsByVendor(vendorId);
      setVendorProducts(Array.isArray(res.data) ? res.data : []);
      return res.data;
    } catch (error) {
      console.error("Error fetching vendor products:", error);
      setVendorProducts([]);
      return [];
    }
  };

  // ✅ Fetch Categories
  const fetchCategories = async () => {
    try {
      const res = await adminApiClient.getAllCategories();
      setCategories(Array.isArray(res.data) ? res.data : []);
    } catch (error) {
      console.error("Error fetching categories:", error);
      setCategories([]);
    }
  };

  // ✅ Create or Update Categories
  const saveCategories = async (newCategories: Category[]) => {
    try {
      const res = await adminApiClient.createOrUpdateCategories(newCategories);
      console.log("saveCategories", res);
      await fetchCategories(); // refresh list
    } catch (error) {
      console.error("Error saving categories:", error);
    }
  };

  // ✅ Update featured categories
  const updateFeaturedCategories = async (featuredIds: string[]) => {
    try {
      const res = await adminApiClient.updateFeaturedCategories(featuredIds);
      console.log("updateFeaturedCategories", res);
      await fetchCategories(); // refresh again
    } catch (error) {
      console.error("Error updating featured categories:", error);
    }
  };

  return (
    <AdminDashboardContext.Provider
      value={{
        buyers,
        suppliers,
        stats,
        categories,
        loading,
        fetchBuyers,
        fetchSuppliers,
        fetchStats,
        fetchVendorProducts,
        fetchCategories,
        saveCategories,
        updateFeaturedCategories,
      }}
    >
      {children}
    </AdminDashboardContext.Provider>
  );
};

// ✅ Custom hook
export const useAdminDashboard = () => {
  const context = useContext(AdminDashboardContext);
  if (!context) {
    throw new Error("useAdminDashboard must be used within AdminDashboardProvider");
  }
  return context;
};
