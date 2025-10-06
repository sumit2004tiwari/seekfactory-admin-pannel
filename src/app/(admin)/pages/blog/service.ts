// Blog API client - all blog-specific client logic isolated here
import type { BlogPost, CreatePostInput, UpdatePostInput } from "./types";

const BASE = "http://localhost:5000/api/admin";

export async function fetchPosts(): Promise<BlogPost[]> {
  const res = await fetch(`${BASE}/posts`);
  if (!res.ok) throw new Error("Failed to fetch posts");
  return res.json();
}

export async function fetchPost(id: string): Promise<BlogPost> {
  const res = await fetch(`${BASE}/posts/${id}`);
  if (!res.ok) throw new Error("Failed to fetch post");
  return res.json();
}

export async function createPost(input: CreatePostInput): Promise<BlogPost> {
  const res = await fetch(`${BASE}/posts`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });
  if (!res.ok) throw new Error("Failed to create post");
  return res.json();
}

export async function updatePost(id: string, input: UpdatePostInput): Promise<BlogPost> {
  const res = await fetch(`${BASE}/posts/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });
  if (!res.ok) throw new Error("Failed to update post");
  return res.json();
}

export async function uploadImage(file: File): Promise<{ url: string }> {
  const form = new FormData();
  form.append("image", file);
  const res = await fetch(`${BASE}/upload-image`, { method: "POST", body: form });
  if (!res.ok) throw new Error("Image upload failed");
  return res.json();
}
