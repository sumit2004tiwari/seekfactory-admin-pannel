import { useEffect, useRef, useState } from "react";
import { Container, Row, Col, Form, Button, Card, Alert, Spinner } from "react-bootstrap";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Underline from "@tiptap/extension-underline";
import LinkExtension from "@tiptap/extension-link";
import TextAlign from "@tiptap/extension-text-align";
import Placeholder from "@tiptap/extension-placeholder";
import Highlight from "@tiptap/extension-highlight";
import { fetchPost, updatePost, uploadImage } from "../service";
import type { BlogPost } from "@blog/types";
import EditorToolbar from "./EditorToolbar";

export default function BlogEdit() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [loading, setLoading] = useState(true);
  const [post, setPost] = useState<BlogPost | null>(null);
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
      Placeholder.configure({ placeholder: "Update your story..." }),
    ],
    content: "",
    editorProps: {
      attributes: { class: "form-control p-3" },
    },
  });

  // Load post
  useEffect(() => {
    if (!id) return;
    setLoading(true);
    fetchPost(id)
      .then((p) => {
        setPost(p);
        setTitle(p.title);
        setCoverImageUrl(p.coverImageUrl ?? null);
        // Load existing HTML into the editor
        setTimeout(() => {
          editor?.commands.setContent(p.content, false);
        }, 0);
      })
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, editor]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id) return;
    setError(null);
    try {
      const content = editor?.getHTML() ?? "";
      if (!title.trim()) throw new Error("Title is required");
      if (!content || content === "<p></p>") throw new Error("Content cannot be empty");
      await updatePost(id, { title: title.trim(), content, coverImageUrl });
      navigate(`/blog/${id}`);
    } catch (err: any) {
      setError(err.message || "Failed to update post");
    }
  };

  const onSelectImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const { url } = await uploadImage(file);
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
          <h1 className="mb-0">Edit Post</h1>
          <div className="text-muted">All content is sanitized on save</div>
        </Col>
      </Row>

      {loading && (
        <div className="d-flex justify-content-center py-5">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      )}

      {!loading && (
        <Card>
          <Card.Body>
            {error && <Alert variant="danger" className="mb-3">{error}</Alert>}

            <Form onSubmit={onSubmit}>
              <Form.Group className="mb-3" controlId="postTitle">
                <Form.Label>Title</Form.Label>
                <Form.Control type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
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
                  <Button variant="outline-secondary" onClick={() => fileInputRef.current?.click()}>
                    Upload
                  </Button>
                  <input ref={fileInputRef} type="file" accept="image/*" className="d-none" onChange={onSelectImage} />
                </div>
              </Form.Group>

              <Form.Group className="mb-3" controlId="postContent">
                <Form.Label>Content</Form.Label>
                <EditorToolbar editor={editor} onPickImage={() => fileInputRef.current?.click()} />
                <div className="border rounded">
                  <EditorContent editor={editor} />
                </div>
              </Form.Group>

              <div className="d-flex justify-content-end gap-2">
                <Button as={Link} to={id ? `/blog/${id}` : "/blog"} variant="secondary">Cancel</Button>
                <Button variant="primary" type="submit">Save Changes</Button>
              </div>
            </Form>
          </Card.Body>
        </Card>
      )}
    </Container>
  );
}
