import { useState, useRef } from "react";
import { Container, Row, Col, Form, Button, Card, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Underline from "@tiptap/extension-underline";
import LinkExtension from "@tiptap/extension-link";
import TextAlign from "@tiptap/extension-text-align";
import Placeholder from "@tiptap/extension-placeholder";
import Highlight from "@tiptap/extension-highlight";
import { createPost, uploadImage } from "../service";
import EditorToolbar from "./EditorToolbar";

export default function BlogEditor() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [coverImageUrl, setCoverImageUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Image.configure({ inline: false }),
      Underline,
      LinkExtension.configure({ openOnClick: false, autolink: true }),
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      Highlight,
      Placeholder.configure({ placeholder: "Write your story..." }),
    ],
    content: "<p>Start writing your post...</p>",
    editorProps: {
      attributes: { class: "form-control p-3" },
    },
  });

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      let content = editor?.getHTML() ?? "";

      // 👉 Fix image URLs before saving
      content = content.replace(
        /<img\s+[^>]*src="(\/[^"]+)"/g,
        `<img src="http://localhost:5000$1"`
      );

      if (!title.trim()) throw new Error("Title is required");
      if (!content || content === "<p></p>") throw new Error("Content cannot be empty");

      // 👉 Prefix cover image if it’s a relative path
      const finalCoverUrl = coverImageUrl?.startsWith("http")
        ? coverImageUrl
        : coverImageUrl
        ? `http://localhost:5000${coverImageUrl}`
        : null;

      await createPost({ title: title.trim(), content, coverImageUrl: finalCoverUrl });
      navigate("/pages/blog");
    } catch (err: any) {
      setError(err.message || "Failed to save post");
    }
  };

  const onSelectImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const { url } = await uploadImage(file);
      // If no cover image yet, set it from the first uploaded image
      if (!coverImageUrl) setCoverImageUrl(url);
      editor?.chain().focus().setImage({ src: url }).run();
    } catch (err: any) {
      setError(err.message || "Image upload failed");
    } finally {
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  return (
    <Container className="py-5">
      <Row className="mb-4">
        <Col>
          <h1 className="mb-0">New Post</h1>
          <div className="text-muted">HTML is sanitized on the server before saving</div>
        </Col>
      </Row>

      <Card>
        <Card.Body>
          {error && (
            <Alert variant="danger" className="mb-3">
              {error}
            </Alert>
          )}

          <Form onSubmit={onSubmit}>
            <Form.Group className="mb-3" controlId="postTitle">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter a descriptive title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="postCover">
              <Form.Label>Cover Image (optional)</Form.Label>
              <div className="d-flex gap-2 align-items-center">
                <Form.Control
                  type="text"
                  placeholder="Paste an image URL or upload below"
                  value={coverImageUrl ?? ""}
                  onChange={(e) => setCoverImageUrl(e.target.value || null)}
                />
                <Button
                  variant="outline-secondary"
                  onClick={() => fileInputRef.current?.click()}
                >
                  Upload
                </Button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="d-none"
                  onChange={onSelectImage}
                />
              </div>
              <Form.Text className="text-muted">
                Images are uploaded to the backend; base64 is never stored.
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="postContent">
              <Form.Label>Content</Form.Label>
              <EditorToolbar editor={editor} onPickImage={() => fileInputRef.current?.click()} />
              <div className="border rounded">
                <EditorContent editor={editor} />
              </div>
            </Form.Group>

            <div className="d-flex justify-content-end gap-2">
              <Button variant="secondary" onClick={() => navigate("/pages/blog")}>
                Cancel
              </Button>
              <Button variant="primary" type="submit">
                Publish
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}
