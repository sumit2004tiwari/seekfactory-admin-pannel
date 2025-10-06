import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Container, Card, Button, Spinner, Alert } from "react-bootstrap";
import { fetchPost } from "../service";
import type { BlogPost } from "@blog/types";

export default function BlogView() {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    fetchPost(id)
      .then(setPost)
      .catch((e) => setError(e.message));
  }, [id]);

  return (
    <Container className="py-5">
      {!post && !error && (
        <div className="d-flex justify-content-center py-5">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      )}

      {error && <Alert variant="danger">{error}</Alert>}

      {post && (
        <Card>
          {post.coverImageUrl && (
            <Card.Img variant="top" src={post.coverImageUrl} alt={post.title} />
          )}
          <Card.Body>
            <Card.Title as="h1" className="mb-3">{post.title}</Card.Title>
            {/* Render sanitized HTML from backend */}
            <div dangerouslySetInnerHTML={{ __html: post.content }} />
            <div className="d-flex justify-content-end gap-2 mt-4">
              <Button as={Link} to={`/blog/${post._id}/edit`} variant="primary">Edit</Button>
              <Button as={Link} to="/blog" variant="outline-secondary">Back to list</Button>
            </div>
          </Card.Body>
        </Card>
      )}
    </Container>
  );
}
