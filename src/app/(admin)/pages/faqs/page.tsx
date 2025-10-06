import { useState, useEffect } from "react";
import PageMetaData from "@/components/PageTitle";
import {
  Card,
  Button,
  Form,
  Row,
  Col,
  Container,
  CardBody,
} from "react-bootstrap";
import { useFooter } from "../../../../context/admin/AdminCms"; // Adjust the import path as needed
import data from '@emoji-mart/data';

const FAQs = () => {
  const { about, fetchAbout, updateAbout, loading: contextLoading } = useFooter();

  const [localAbout, setLocalAbout] = useState({
    intro: { title: "", description: "" },
    stats: [],
    mission: "",
    vision: "",
    values: [],
    story: [],
    team: [],
    contact: { address: "", phone: "", email: "" }
  });

  const [saving, setSaving] = useState(false);
  const [localLoading, setLocalLoading] = useState(true);

  // ✅ Fetch about data using context
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLocalLoading(true);
        const aboutData = await fetchAbout();
        setLocalAbout(aboutData || []);

      } catch (err) {
        console.error("Error fetching about data:", err);
      } finally {
        setLocalLoading(false);
      }
    };
    fetchData();
  }, [fetchAbout]);

  // ✅ Sync local state with context when about data changes
  useEffect(() => {
    if (about) {
      setLocalAbout(about);
    }
  }, [about]);

  // ✅ Save about data using context
  const handleSave = async () => {
    try {
      setSaving(true);
      console.log(localAbout, "local about in handle save");
      const updatedData = await updateAbout(localAbout);
      console.log(updatedData, "updated data in handle save");
      if (updatedData) {
        setLocalAbout(updatedData);
        alert("About page updated successfully!");
      } else {
        alert("Failed to update about page");
      }
    } catch (err) {
      console.error("Error updating about page:", err);
      alert("Failed to update about page");
    } finally {
      setSaving(false);
    }
  };

  // ✅ Refresh data
  const handleRefresh = async () => {
    try {
      setLocalLoading(true);
      const aboutData = await fetchAbout();
      if (aboutData) {
        setLocalAbout(aboutData);
        alert("Data refreshed successfully!");
      }
    } catch (err) {
      console.error("Error refreshing data:", err);
      alert("Failed to refresh data");
    } finally {
      setLocalLoading(false);
    }
  };

  if (contextLoading || localLoading) return <p>Loading...</p>;

  return (
    <>
      <PageMetaData title="About Us Editor" />
      <Container className="py-4">

        {/* Refresh Button */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h1>About Page Editor</h1>
          <Button variant="outline-secondary" onClick={handleRefresh}>
            Refresh Data
          </Button>
        </div>

        {/* ================= INTRODUCTION ================= */}
        <Card className="mb-4 shadow-sm">
          <Card.Header as="h5">Introduction</Card.Header>
          <CardBody>
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                value={localAbout.intro?.title || ""}
                onChange={(e) =>
                  setLocalAbout({ ...localAbout, intro: { ...localAbout.intro, title: e.target.value } })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                value={localAbout.intro?.description || ""}
                onChange={(e) =>
                  setLocalAbout({ ...localAbout, intro: { ...localAbout.intro, description: e.target.value } })
                }
              />
            </Form.Group>
          </CardBody>
        </Card>

        {/* ================= STATS ================= */}
        <Card className="mb-4 shadow-sm">
          <Card.Header as="h5">Statistics</Card.Header>
          <CardBody>
            {localAbout.stats?.map((stat, index) => (
              <Row key={index} className="mb-3 align-items-center">
                <Col md={5}>
                  <Form.Label>Value</Form.Label>
                  <Form.Control
                    placeholder="e.g., 25,000+"
                    value={stat.value}
                    onChange={(e) => {
                      const stats = [...localAbout.stats];
                      stats[index].value = e.target.value;
                      setLocalAbout({ ...localAbout, stats });
                    }}
                  />
                </Col>
                <Col md={5}>
                  <Form.Label>Label</Form.Label>
                  <Form.Control
                    placeholder="e.g., Active Suppliers"
                    value={stat.label}
                    onChange={(e) => {
                      const stats = [...localAbout.stats];
                      stats[index].label = e.target.value;
                      setLocalAbout({ ...localAbout, stats });
                    }}
                  />
                </Col>
                <Col md={2} className="text-end">
                  <Button
                    variant="danger"
                    className="mt-4"
                    onClick={() =>
                      setLocalAbout({
                        ...localAbout,
                        stats: localAbout.stats.filter((_, i) => i !== index),
                      })
                    }
                  >
                    Remove
                  </Button>
                </Col>
              </Row>
            ))}
            <Button
              variant="outline-primary"
              onClick={() =>
                setLocalAbout({
                  ...localAbout,
                  stats: [...localAbout.stats, { label: "", value: "" }],
                })
              }
            >
              + Add Statistic
            </Button>
          </CardBody>
        </Card>

        {/* ================= MISSION & VISION ================= */}
        <Card className="mb-4 shadow-sm">
          <Card.Header as="h5">Mission & Vision</Card.Header>
          <CardBody>
            <Form.Group className="mb-3">
              <Form.Label>Mission Statement</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={localAbout.mission || ""}
                onChange={(e) => setLocalAbout({ ...localAbout, mission: e.target.value })}
                placeholder="Our mission is to..."
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Vision Statement</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={localAbout.vision || ""}
                onChange={(e) => setLocalAbout({ ...localAbout, vision: e.target.value })}
                placeholder="Our vision is to..."
              />
            </Form.Group>
          </CardBody>
        </Card>

        {/* ================= VALUES ================= */}
        <Card className="mb-4 shadow-sm">
          <Card.Header as="h5">Company Values</Card.Header>
          <CardBody>
            {Array.isArray(localAbout.values) && localAbout.values?.map((value, index) => (
              <div key={index} className="mb-4 p-3 border rounded">
                <Row className="align-items-center">
                  <Col md={5}>
                    <Form.Group>
                      <Form.Label>Value Title</Form.Label>
                      <Form.Control
                        placeholder="e.g., Trust & Security"
                        value={value.title}
                        onChange={(e) => {
                          const values = [...localAbout.values];
                          values[index].title = e.target.value;
                          setLocalAbout({ ...localAbout, values });
                        }}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label>Description</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={2}
                        placeholder="Description of this value..."
                        value={value.description}
                        onChange={(e) => {
                          const values = [...localAbout.values];
                          values[index].description = e.target.value;
                          setLocalAbout({ ...localAbout, values });
                        }}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={1}>
                    <Button
                      variant="danger"
                      onClick={() =>
                        setLocalAbout({
                          ...localAbout,
                          values: localAbout.values.filter((_, i) => i !== index),
                        })
                      }
                    >
                      ×
                    </Button>
                  </Col>
                </Row>
              </div>
            ))}
            <Button
              variant="outline-primary"
              onClick={() =>
                setLocalAbout({
                  ...localAbout,
                  values: [...localAbout.values, { title: "", description: "" }],
                })
              }
            >
              + Add Value
            </Button>
          </CardBody>
        </Card>

        {/* ================= COMPANY STORY ================= */}
        <Card className="mb-4 shadow-sm">
          <Card.Header as="h5">Company Story Timeline</Card.Header>
          <CardBody>
            {localAbout.story?.map((story, index) => (
              <div key={index} className="mb-4 p-3 border rounded">
                <Row className="align-items-center">
                  <Col md={2}>
                    <Form.Group>
                      <Form.Label>Year</Form.Label>
                      <Form.Control
                        placeholder="e.g., 2009"
                        value={story.year}
                        onChange={(e) => {
                          const storyItems = [...localAbout.story];
                          storyItems[index].year = e.target.value;
                          setLocalAbout({ ...localAbout, story: storyItems });
                        }}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={4}>
                    <Form.Group>
                      <Form.Label>Title</Form.Label>
                      <Form.Control
                        placeholder="e.g., Company Founded"
                        value={story.title}
                        onChange={(e) => {
                          const storyItems = [...localAbout.story];
                          storyItems[index].title = e.target.value;
                          setLocalAbout({ ...localAbout, story: storyItems });
                        }}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={5}>
                    <Form.Group>
                      <Form.Label>Description</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={2}
                        placeholder="Description of this milestone..."
                        value={story.description}
                        onChange={(e) => {
                          const storyItems = [...localAbout.story];
                          storyItems[index].description = e.target.value;
                          setLocalAbout({ ...localAbout, story: storyItems });
                        }}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={1}>
                    <Button
                      variant="danger"
                      onClick={() =>
                        setLocalAbout({
                          ...localAbout,
                          story: localAbout.story.filter((_, i) => i !== index),
                        })
                      }
                    >
                      ×
                    </Button>
                  </Col>
                </Row>
              </div>
            ))}
            <Button
              variant="outline-primary"
              onClick={() =>
                setLocalAbout({
                  ...localAbout,
                  story: [...localAbout.story, { year: "", title: "", description: "" }],
                })
              }
            >
              + Add Story Milestone
            </Button>
          </CardBody>
        </Card>

        {/* ================= TEAM ================= */}
        <Card className="mb-4 shadow-sm">
          <Card.Header as="h5">Team Members</Card.Header>
          <CardBody>
            {localAbout.team?.map((member, index) => (
              <div key={index} className="mb-4 p-3 border rounded">
                <Row className="align-items-center">
                  <Col md={3}>
                    <Form.Group>
                      <Form.Label>Name</Form.Label>
                      <Form.Control
                        placeholder="Full name"
                        value={member.name}
                        onChange={(e) => {
                          const team = [...localAbout.team];
                          team[index].name = e.target.value;
                          setLocalAbout({ ...localAbout, team });
                        }}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={3}>
                    <Form.Group>
                      <Form.Label>Role</Form.Label>
                      <Form.Control
                        placeholder="e.g., CEO"
                        value={member.role}
                        onChange={(e) => {
                          const team = [...localAbout.team];
                          team[index].role = e.target.value;
                          setLocalAbout({ ...localAbout, team });
                        }}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={3}>
                    <Form.Group>
                      <Form.Label>Initials (for avatar)</Form.Label>
                      <Form.Control
                        placeholder="e.g., DC"
                        maxLength={3}
                        value={member.initials}
                        onChange={(e) => {
                          const team = [...localAbout.team];
                          team[index].initials = e.target.value;
                          setLocalAbout({ ...localAbout, team });
                        }}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={2}>
                    <Button
                      variant="danger"
                      className="mt-4"
                      onClick={() =>
                        setLocalAbout({
                          ...localAbout,
                          team: localAbout.team.filter((_, i) => i !== index),
                        })
                      }
                    >
                      Remove
                    </Button>
                  </Col>
                </Row>
                <Form.Group className="mt-2">
                  <Form.Label>Bio</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    placeholder="Short bio about the team member..."
                    value={member.bio}
                    onChange={(e) => {
                      const team = [...localAbout.team];
                      team[index].bio = e.target.value;
                      setLocalAbout({ ...localAbout, team });
                    }}
                  />
                </Form.Group>
              </div>
            ))}
            <Button
              variant="outline-primary"
              onClick={() =>
                setLocalAbout({
                  ...localAbout,
                  team: [...localAbout.team, { name: "", role: "", bio: "", initials: "" }],
                })
              }
            >
              + Add Team Member
            </Button>
          </CardBody>
        </Card>

        {/* ================= CONTACT INFO ================= */}
        <Card className="mb-4 shadow-sm">
          <Card.Header as="h5">Contact Information</Card.Header>
          <CardBody>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Address</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={2}
                    placeholder="Company address"
                    value={localAbout.contact?.address || ""}
                    onChange={(e) =>
                      setLocalAbout({ ...localAbout, contact: { ...localAbout.contact, address: e.target.value } })
                    }
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Phone</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Phone number"
                    value={localAbout.contact?.phone || ""}
                    onChange={(e) =>
                      setLocalAbout({ ...localAbout, contact: { ...localAbout.contact, phone: e.target.value } })
                    }
                  />
                </Form.Group>
              </Col>
            </Row>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Contact email"
                value={localAbout.contact?.email || ""}
                onChange={(e) =>
                  setLocalAbout({ ...localAbout, contact: { ...localAbout.contact, email: e.target.value } })
                }
              />
            </Form.Group>
          </CardBody>
        </Card>

        {/* ================= ACTION BUTTONS ================= */}
        <div className="text-end mt-4">
          <Button
            variant="outline-secondary"
            className="me-2"
            onClick={handleRefresh}
            disabled={saving}
          >
            Refresh
          </Button>
          <Button
            variant="primary"
            size="lg"
            onClick={handleSave}
            disabled={saving}
          >
            {saving ? "Saving..." : "Save About Page"}
          </Button>
        </div>
      </Container>
    </>
  );
};

export default FAQs;