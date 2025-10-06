// Express routes and server-side logic for the Blog module
// All blog-related backend logic is encapsulated in this file and imported by the main server

import type { Express, RequestHandler } from "express";
import express from "express";
import fs from "fs";
import path from "path";
import multer from "multer";
import sanitizeHtml from "sanitize-html";
import { randomUUID } from "crypto";
import type { BlogPost } from "./types";

const DATA_FILE = path.resolve("blog/data.json");
const UPLOAD_DIR = path.resolve("uploads");

// Ensure directories/files exist
function ensureStorage() {
  if (!fs.existsSync(UPLOAD_DIR)) fs.mkdirSync(UPLOAD_DIR, { recursive: true });
  if (!fs.existsSync(DATA_FILE)) fs.writeFileSync(DATA_FILE, JSON.stringify([]));
}

function readPosts(): BlogPost[] {
  ensureStorage();
  const raw = fs.readFileSync(DATA_FILE, "utf-8");
  return JSON.parse(raw) as BlogPost[];
}

function writePosts(posts: BlogPost[]) {
  ensureStorage();
  fs.writeFileSync(DATA_FILE, JSON.stringify(posts, null, 2));
}

// Configure multer to store files on disk, not as base64
const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, UPLOAD_DIR),
  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname) || "";
    cb(null, `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`);
  },
});
const upload = multer({ storage });

// Sanitize HTML using a safe, but fairly permissive, allowlist suitable for blog content
function sanitize(html: string) {
  return sanitizeHtml(html, {
    allowedTags: [
      "p",
      "div",
      "span",
      "strong",
      "em",
      "u",
      "s",
      "blockquote",
      "ul",
      "ol",
      "li",
      "a",
      "img",
      "h1",
      "h2",
      "h3",
      "h4",
      "h5",
      "h6",
      "code",
      "pre",
      "hr",
      "br",
    ],
    allowedAttributes: {
      a: ["href", "name", "target", "rel"],
      img: ["src", "alt", "title"],
      '*': ["class"],
    },
    allowedSchemes: ["http", "https", "data"],
    // Disallow base64 images by stripping data URLs from img tags
    transformTags: {
      img: (tagName, attribs) => {
        const src = attribs.src || "";
        if (src.startsWith("data:")) {
          // Drop base64 images entirely
          return { tagName: "span", text: "" } as any;
        }
        return { tagName, attribs } as any;
      },
    },
  });
}

export function registerBlogRoutes(app: Express) {
  ensureStorage();

  // Serve uploaded images via /uploads
  app.use("/uploads", express.static(UPLOAD_DIR));

  // List posts
  const listPosts: RequestHandler = (_req, res) => {
    const posts = readPosts().sort((a, b) => b.createdAt.localeCompare(a.createdAt));
    res.json(posts);
  };

  // Get post by id
  const getPost: RequestHandler = (req, res) => {
    const posts = readPosts();
    const post = posts.find((p) => p.id === req.params.id);
    if (!post) return res.status(404).json({ error: "Not found" });
    res.json(post);
  };

  // Create post
  const createPost: RequestHandler = (req, res) => {
    const { title, html, coverImageUrl } = req.body as { title?: string; html?: string; coverImageUrl?: string | null };
    if (!title || !html) return res.status(400).json({ error: "Missing title or html" });

    const sanitized = sanitize(html);

    const now = new Date().toISOString();
    const post: BlogPost = {
      id: randomUUID(),
      title: title.trim(),
      html: sanitized,
      coverImageUrl: coverImageUrl || null,
      createdAt: now,
      updatedAt: now,
    };
    const posts = readPosts();
    posts.push(post);
    writePosts(posts);
    res.status(201).json(post);
  };

  // Update post
  const updatePost: RequestHandler = (req, res) => {
    const { title, html, coverImageUrl } = req.body as { title?: string; html?: string; coverImageUrl?: string | null };
    const posts = readPosts();
    const idx = posts.findIndex((p) => p.id === req.params.id);
    if (idx === -1) return res.status(404).json({ error: "Not found" });

    const updated: BlogPost = { ...posts[idx] };
    if (typeof title === "string") updated.title = title.trim();
    if (typeof html === "string") updated.html = sanitize(html);
    if (typeof coverImageUrl !== "undefined") updated.coverImageUrl = coverImageUrl;
    updated.updatedAt = new Date().toISOString();

    posts[idx] = updated;
    writePosts(posts);
    res.json(updated);
  };

  // Image upload (multipart) -> returns a backend-served URL
  const uploadImageHandler: RequestHandler = (req, res) => {
    // multer puts the file on disk; this handler just returns the public URL
    const file = (req as any).file as Express.Multer.File | undefined;
    if (!file) return res.status(400).json({ error: "No file" });
    const url = `/uploads/${file.filename}`;
    res.json({ url });
  };

  // Routes
  app.get("/api/blog/posts", listPosts);
  app.get("/api/blog/posts/:id", getPost);
  app.post("/api/blog/posts", createPost);
  app.put("/api/blog/posts/:id", updatePost);
  app.post("/api/blog/upload-image", upload.single("image"), uploadImageHandler);
}
