import { useState, useEffect } from "react";
import PageMetaData from "@/components/PageTitle";
import { Card, Button, Form, Row, Col, Container } from "react-bootstrap";
import { adminApiClient } from "../../../../api/lib"; // ✅ adminApiClient import

const Timeline = () => {
  const [footer, setFooter] = useState<any>({
    companyName: "",
    tagline: "",
    email: "",
    phone: "",
    address: "",
    sections: [],
    copyright: "",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // ✅ Get Footer on mount
  useEffect(() => {
    const fetchFooter = async () => {
      try {
        const res = await adminApiClient.getFooterStats();
        console.log(res.data, "footer data from backend");
        if (res.success && res.data) {
          setFooter(res.data || {});
        }
      } catch (err) {
        console.error("❌ Error fetching footer:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchFooter();
  }, []);

  // ✅ Update Footer
  const handleSave = async () => {
    try {
      setSaving(true);
      const res = await adminApiClient.updateFooterStats(footer);
      if (res.success) {
        setFooter(res.data); // backend se updated data aa gaya to UI refresh
        alert("Footer updated successfully!");
      } else {
        alert("Update failed: " + res.message);
      }
    } catch (err) {
      console.error("❌ Error updating footer:", err);
      alert("Failed to update footer");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <>
      <PageMetaData title="Footer Editor" />
      <Container className="py-4">
        {/* Company Info */}
        <Card className="mb-4 shadow-sm">
          <Card.Header as="h5">Company Info</Card.Header>
          <Card.Body>
            <Form.Group className="mb-3">
              <Form.Label>Company Name</Form.Label>
              <Form.Control
                type="text"
                value={footer.companyName}
                onChange={(e) => setFooter({ ...footer, companyName: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Tagline</Form.Label>
              <Form.Control
                as="textarea"
                rows={2}
                value={footer.tagline}
                onChange={(e) => setFooter({ ...footer, tagline: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={footer.email}
                onChange={(e) => setFooter({ ...footer, email: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Phone</Form.Label>
              <Form.Control
                type="text"
                value={footer.phone}
                onChange={(e) => setFooter({ ...footer, phone: e.target.value })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                value={footer.address}
                onChange={(e) => setFooter({ ...footer, address: e.target.value })}
              />
            </Form.Group>
          </Card.Body>
        </Card>

        {/* Sections */}
        <Card className="mb-4 shadow-sm">
          <Card.Header as="h5">Sections</Card.Header>
          <Card.Body>
            {footer.sections?.map((section: any, idx: number) => (
              <div key={idx} className="mb-4 border p-3 rounded">
                <Row className="mb-2">
                  <Col>
                    <Form.Control
                      placeholder="Section Title"
                      value={section.title}
                      onChange={(e) => {
                        const sections = [...footer.sections];
                        sections[idx].title = e.target.value;
                        setFooter({ ...footer, sections });
                      }}
                    />
                  </Col>
                  <Col xs="auto">
                    <Button
                      variant="danger"
                      onClick={() =>
                        setFooter({
                          ...footer,
                          sections: footer.sections.filter((_: any, i: number) => i !== idx),
                        })
                      }
                    >
                      X
                    </Button>
                  </Col>
                </Row>

                {section.links?.map((link: any, i: number) => (
                  <Row key={i} className="mb-2">
                    <Col>
                      <Form.Control
                        placeholder="Label"
                        value={link.label}
                        onChange={(e) => {
                          const sections = [...footer.sections];
                          sections[idx].links[i].label = e.target.value;
                          setFooter({ ...footer, sections });
                        }}
                      />
                    </Col>
                    <Col>
                      <Form.Control
                        placeholder="URL"
                        value={link.url}
                        onChange={(e) => {
                          const sections = [...footer.sections];
                          sections[idx].links[i].url = e.target.value;
                          setFooter({ ...footer, sections });
                        }}
                      />
                    </Col>
                    <Col xs="auto">
                      <Button
                        variant="danger"
                        onClick={() => {
                          const sections = [...footer.sections];
                          sections[idx].links = sections[idx].links.filter((_: any, li: number) => li !== i);
                          setFooter({ ...footer, sections });
                        }}
                      >
                        X
                      </Button>
                    </Col>
                  </Row>
                ))}
                <Button
                  size="sm"
                  onClick={() => {
                    const sections = [...footer.sections];
                    sections[idx].links.push({ label: "", url: "" });
                    setFooter({ ...footer, sections });
                  }}
                >
                  + Add Link
                </Button>
              </div>
            ))}
            <Button
              size="sm"
              onClick={() =>
                setFooter({
                  ...footer,
                  sections: [...footer.sections, { title: "", links: [] }],
                })
              }
            >
              + Add Section
            </Button>
          </Card.Body>
        </Card>

        {/* Copyright */}
        <Card className="mb-4 shadow-sm">
          <Card.Header as="h5">Copyright</Card.Header>
          <Card.Body>
            <Form.Control
              type="text"
              value={footer.copyright}
              onChange={(e) => setFooter({ ...footer, copyright: e.target.value })}
            />
          </Card.Body>
        </Card>

        {/* Save */}
        <div className="text-end">
          <Button variant="primary" size="lg" onClick={handleSave} disabled={saving}>
            {saving ? "Saving..." : "Save Footer"}
          </Button>
        </div>
      </Container>
    </>
  );
};

export default Timeline;
