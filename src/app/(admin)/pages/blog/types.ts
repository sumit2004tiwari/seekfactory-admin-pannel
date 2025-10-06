// Blog domain types
// All blog-related types must live inside this folder per project rules.

export interface BlogPost {
  id: string;
  title: string;
  html: string; // Sanitized HTML content
  coverImageUrl?: string | null;
  createdAt: string; // ISO string
  updatedAt: string; // ISO string
}

export interface CreatePostInput {
  title: string;
  html: string; // Raw HTML from editor; will be sanitized on backend
  coverImageUrl?: string | null;
}

export interface UpdatePostInput {
  title?: string;
  html?: string;
  coverImageUrl?: string | null;
}
