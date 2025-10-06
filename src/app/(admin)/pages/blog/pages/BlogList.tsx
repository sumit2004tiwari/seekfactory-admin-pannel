import { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button, Spinner, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import { fetchPosts } from "../service";
// import type { BlogPost } from "@blog/types";

export default function BlogList() {
  const [posts, setPosts] = useState<BlogPost[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchPosts()
      .then(setPosts)
      .catch((e) => setError(e.message));
  }, []);

  return (
    <Container className="py-5">
      <Row className="mb-4 align-items-center">
        <Col>
          <h1 className="mb-0">Blog</h1>
          <div className="text-muted">All posts are sanitized and stored as HTML</div>
        </Col>
        <Col xs="auto">
          <Button as={Link} to="/blog/new" variant="primary">
            New Post
          </Button>
        </Col>
      </Row>

      {error && <Alert variant="danger">{error}</Alert>}

      {!posts && !error && (
        <div className="d-flex justify-content-center py-5">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      )}

      {posts && posts.length === 0 && (
        <Card>
          <Card.Body>
            <Card.Text className="mb-0">No posts yet. Click "New Post" to create your first article.</Card.Text>
          </Card.Body>
        </Card>
      )}

      {posts && posts.length > 0 && (
        <Row xs={1} md={2} lg={3} className="g-4">
          {posts.map((post) => (
            <Col key={post.id}>
              <Card className="h-100">
                {post.coverImageUrl && (
                  <Card.Img variant="top" src={post.coverImageUrl} alt={post.title} />
                )}
                <Card.Body>
                  <Card.Title className="mb-2">
                    <Link to={`/blog/${post.id}`} className="text-decoration-none">{post.title}</Link>
                  </Card.Title>
                  <Card.Text className="text-muted mb-3">
                    {new Date(post.createdAt).toLocaleDateString()}
                  </Card.Text>
                  <div className="d-flex gap-2">
                    <Button as={Link} to={`/blog/${post._id}`} variant="outline-secondary" size="sm">View</Button>
                    <Button as={Link} to={`/blog/${post._id}/edit`} variant="primary" size="sm">Edit</Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
}
