import React, { createContext, useContext, useEffect, useState } from "react";
import { adminApiClient } from "../../api/lib";

export interface Footer {
  companyName: string;
  tagline: string;
  email: string;
  phone: string;
  address: string;
  sections: { title: string; links: { label: string; url: string }[] }[];
  copyright: string;
}

interface FooterContextType {
  footer: Footer | null;
  about: About | null;
  loading: boolean;
  fetchFooter: () => Promise<void>;
  updateFooter: (data: Footer) => Promise<void>;
  fetchAbout: () => Promise<void>;
  updateAbout: (data: any) => Promise<void>;
  fetchHomePage: () => Promise<void>;
  updateHomePage: (data: any) => Promise<void>;

}

const FooterContext = createContext<FooterContextType | undefined>(undefined);

export const FooterProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [footer, setFooter] = useState<Footer | null>(null);
  const [about, setAbout] = useState<About | null>(null);
  const [homePage, setHomePage] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // ✅ Get footer
  const fetchFooter = async () => {
    try {
      const res = await adminApiClient.getFooterStats();
      setFooter(res.data || null);
    } catch (error) {
      console.error("❌ Error fetching footer:", error);
      setFooter(null);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Update footer
  const updateFooter = async (data: Footer) => {
    try {
      console.log("📤 Sending footer update:", data);
      const res = await adminApiClient.updateFooterStats(data);
      if (res.success) {
        setFooter(res.data); // update context state
      } else {
        console.error("❌ Footer update failed:", res.message);
      }
    } catch (error) {
      console.error("❌ Error updating footer:", error);
    }
  };

  // ✅ Get about
  const fetchAbout = async () => {
    try {
      const res = await adminApiClient.getAboutPageStats();
      setAbout(res.data || null);
      return res;
    } catch (error) {
      console.error("❌ Error fetching about:", error);
      return null;
    }
  };

  // ✅ Update about
  const updateAbout = async (data: any) => {
    try {
      console.log("📤 data going in ipdate in cms:", data);
      const res = await adminApiClient.updateAboutPageStats(data);
      if (res.success) {
        return res.data;
      } else {
        console.error("❌ About update failed:", res.message);
      }
    } catch (error) {
      console.error("❌ Error updating about:", error);
    }
  };

  const fetchHomePage = async () => {
    try {
      const res = await adminApiClient.getHomePageStats();
      setHomePage(res.data || null);   // ✅ update state
      return res;
    } catch (error) {
      console.error("❌ Error fetching homepage:", error);
      return null;
    }
  };

  const updateHomePage = async (data: any) => {
    try {
      const res = await adminApiClient.updateHomePageStats(data);
      console.log(res , "res from update homepage");
      if (res.success) {
        setHomePage(res.data);  // ✅ update context after update
      }
      return res;
    } catch (error) {
      console.error("❌ Error updating homepage:", error);
      return null;
    }
  };


  useEffect(() => {
    (async () => {
      await fetchFooter();
      await fetchHomePage();
    })();
  }, []);


  return (
    <FooterContext.Provider value={{
      footer, about, homePage, loading,
      fetchFooter, updateFooter,
      fetchAbout, updateAbout,
      fetchHomePage, updateHomePage
    }}>
      {children}
    </FooterContext.Provider>
  );
};

export const useFooter = () => {
  const context = useContext(FooterContext);
  if (!context) {
    throw new Error("useFooter must be used within FooterProvider");
  }
  return context;
};
