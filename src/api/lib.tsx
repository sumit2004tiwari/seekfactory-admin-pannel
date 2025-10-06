const ADMIN_API_BASE_URL =
  import.meta.env.VITE_ADMIN_API_URL ||
  import.meta.env.VITE_API_URL ||
  "http://localhost:5000/api/admin";

interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  user?: T;
  errors?: string[];
}

interface User {
  id: string;
  name: string;
  email: string;
  role: "buyer" | "supplier" | "admin";
  companyName?: string;
  businessType?: string;
  phone?: string;
  isVerified: boolean;
  createdAt: string;
  updatedAt: string;
}

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
  category: string;
  images: string[];
  user: User; // supplier info
  createdAt: string;
  updatedAt: string;
}

interface LoginCredentials {
  username: string;
  password: string;
}

interface AdminUser extends User {
  role: "admin";
}

class AdminApiClient {
  private baseURL: string;

  constructor() {
    this.baseURL = ADMIN_API_BASE_URL;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const url = `${this.baseURL}${endpoint}`;

    const config: RequestInit = {
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      credentials: "include", // ✅ important for cookie-based auth
      ...options,
    };

    const response = await fetch(url, config);
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || "API error");
    return data;
  }

  // ✅ Admin login (cookie-based)
  async login(credentials: LoginCredentials): Promise<ApiResponse> {
    return this.request("/login", {
      method: "POST",
      body: JSON.stringify(credentials),
    });
  }

  // ✅ Admin logout
  async logout(): Promise<ApiResponse> {
    return this.request("/logout", {
      method: "POST",
    });
  }

  // ✅ Get admin profile
  async getProfile(): Promise<ApiResponse<AdminUser>> {
    return this.request<AdminUser>("/profile", {
      method: "GET",
    });
  }

  // ✅ Example: Admin stats
  // ✅ Buyers
  async getAllBuyers(): Promise<ApiResponse<User[]>> {
    return this.request<User[]>("/getAllBuyers", {
      method: "GET",
    });
  }

  // ✅ Suppliers

  async getAllSuppliers(): Promise<ApiResponse<User[]>> {
    return this.request<User[]>("/suppliers", {
      method: "GET",
    });
  }

  // ✅ Stats
  async getStats(): Promise<ApiResponse<any>> {
    return this.request("/admin-stats", {
      method: "GET",
    });
  }

  async getHomePageStats(): Promise<ApiResponse<any>> {
    return this.request("/homepage", {
      method: "GET"
    })
  }

  async updateHomePageStats(data: any): Promise<ApiResponse<any>> {
    return this.request("/update-homepage", {
      method: "PUT",
      body: JSON.stringify(data)
    });
  }

  async getAboutPageStats(): Promise<ApiResponse<any>> {
    return this.request("/getAbout", {
      method: "GET"
    })
  }

  async updateAboutPageStats(data: any): Promise<ApiResponse<any>> {
    return this.request("/updateAbout", {
      method: "PUT",
      body: JSON.stringify(data)
    })
  }

  async getFooterStats(): Promise<ApiResponse<any>> {
    return this.request("/getFooter", {
      method: "GET"
    })
  }

  async updateFooterStats(data: any): Promise<ApiResponse<any>> {
    return this.request('/update-footer', {
      method: 'PUT',
      body: JSON.stringify(data)
    })
  }

  async toggleUserActive(
    userId: string,
    isActive: boolean
  ): Promise<ApiResponse<User>> {
    return this.request<User>(`/users/${userId}/status`, {
      method: "PUT",
      body: JSON.stringify({ isActive }),
    });
  }

  async updateSupplierStatus(
    supplierId: string,
    isActive: boolean
  ): Promise<ApiResponse<User>> {
    return this.request<User>(`/suppliers/${supplierId}/active`, {
      method: "PATCH",
      body: JSON.stringify({ isActive }),
    });
  }

  // ✅ Products
  async getAllProducts(): Promise<ApiResponse<Product[]>> {
    return this.request<Product[]>("/products");
  }

  async getProductsByVendor(
    vendorId: string
  ): Promise<ApiResponse<Product[]>> {
    return this.request<Product[]>(`/vendors/${vendorId}/products`);
  }

  async deleteProduct(productId: string): Promise<ApiResponse> {
    return this.request(`/products/${productId}`, {
      method: "DELETE",
    });
  }

  // Fetch all categories
  // ✅ Categories
  async getAllCategories(): Promise<ApiResponse<any[]>> {
    return this.request<any[]>("/categories", {
      method: "GET",
    });
  }

  // ✅ Create or update categories in bulk
  async createOrUpdateCategories(categories: any[]): Promise<ApiResponse<any>> {
    return this.request<any>("/categories/bulk", {
      method: "POST",
      body: JSON.stringify({ categories }),
    });
  }

  // ✅ Update featured categories (limit 4)
  async updateFeaturedCategories(featuredIds: string[]): Promise<ApiResponse<any>> {
    return this.request<any>("/categories/featured", {
      method: "POST",
      body: JSON.stringify({ featured: featuredIds }),
    });
  }

  // get contact form data
  async getContactFormData(): Promise<ApiResponse<any[]>> {
    return this.request<any[]>("/getContact", {
      method: "GET",
    });
  }
}

export const adminApiClient = new AdminApiClient();
export type { User, Product, ApiResponse, LoginCredentials, AdminUser };
