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
  vendorProducts: any[];
  loading: boolean;
  fetchBuyers: () => Promise<void>;
  fetchSuppliers: () => Promise<void>;
  fetchStats: () => Promise<void>;
  fetchVendorProducts: (vendorId: string) => Promise<any[]>;
  toggleSupplierStatus: (supplierId: string, isActive: boolean) => Promise<void>; // ✅ new
  fetchCategories: () => Promise<void>;
  saveCategories: (categories: Category[]) => Promise<void>;
  updateFeaturedCategories: (featuredIds: string[]) => Promise<void>;
}

const AdminDashboardContext = createContext<AdminDashboardContextType | undefined>(undefined);

export const AdminDashboardProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [buyers, setBuyers] = useState<User[]>([]);
  const [suppliers, setSuppliers] = useState<User[]>([]);
  const [vendorProducts, setVendorProducts] = useState<any[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [contacts, setContacts] = useState<any[]>([]);
  
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

    useEffect(() => {
      (async () => {
        await Promise.all([fetchBuyers(), fetchSuppliers(), fetchStats(), fetchCategories()]);
        setLoading(false);
      })();
    }, []);
  

  const fetchBuyers = async () => {
    try {
      const res = await adminApiClient.getAllBuyers();
      setBuyers(Array.isArray(res.data) ? res.data : []);
    } catch (error) {
      console.error("❌ Error fetching buyers:", error);
      setBuyers([]);
    }
  };

  const fetchSuppliers = async () => {
    try {
      const res = await adminApiClient.getAllSuppliers();
      setSuppliers(Array.isArray(res.data) ? res.data : []);
    } catch (error) {
      console.error("❌ Error fetching suppliers:", error);
      setSuppliers([]);
    }
  };

  const fetchStats = async () => {
    try {
      const res = await adminApiClient.getStats();

      setStats(res.data?.stats || {});
    } catch (error) {
      console.error("❌ Error fetching stats:", error);
      setStats({});
    }
  };

  const fetchVendorProducts = async (vendorId: string) => {
    try {
      const res = await adminApiClient.getProductsByVendor(vendorId);
      const products = Array.isArray(res.data) ? res.data : [];
      setVendorProducts(products);
      return products;
    } catch (error) {
      console.error("❌ Error fetching vendor products:", error);
      setVendorProducts([]);
      return [];
    }
  };

  // ✅ New: toggle supplier active status
  const toggleSupplierStatus = async (supplierId: string, isActive: boolean) => {
    try {
      const res = await adminApiClient.updateSupplierStatus(supplierId, isActive);
      console.log("✅ Supplier status updated:", res);

      // Update the local suppliers state so UI reflects change immediately
      setSuppliers((prev) =>
        prev.map((s) =>
          s.id === supplierId ? { ...s, isVerified: isActive } : s
        )
      );
    } catch (error) {
      console.error("❌ Error updating supplier status:", error);
    }
  };

  // ✅ Fetch Categories
  const fetchCategories = async () => {
    try {
      const res = await adminApiClient.getAllCategories();
      console.log(res.data, "fetched categories");
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

  const fetchContact = async () => {
    try {
      const res = await adminApiClient.getContactFormData();
      console.log(res.data , "copntact res ")
      setContacts(Array.isArray(res.data) ? res.data : []);
    } catch (error) {
      console.error("❌ Error fetching contacts:", error);
      setContacts([]);
    }
  }

  useEffect(() => {
    (async () => {
      await fetchBuyers();
      await fetchSuppliers();
      await fetchStats();
      await fetchContact();
      setLoading(false);
    })();
  }, []);

  return (
    <AdminDashboardContext.Provider
      value={{
        buyers,
        suppliers,
        stats,
        vendorProducts,
        loading,
        fetchBuyers,
        fetchSuppliers,
        fetchStats,
        fetchVendorProducts,
        toggleSupplierStatus, // ✅ added here
        categories,
        fetchCategories,
        saveCategories,
        updateFeaturedCategories,
        contacts,
        fetchContact,
      }}
    >
      {children}
    </AdminDashboardContext.Provider>
  );
};

export const useAdminDashboard = () => {
  const context = useContext(AdminDashboardContext);
  if (!context) {
    throw new Error("useAdminDashboard must be used within AdminDashboardProvider");
  }
  return context;
};
