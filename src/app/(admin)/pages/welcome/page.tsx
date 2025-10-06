import { useState, useEffect } from "react";
import PageMetaData from "@/components/PageTitle";
import {
  Card,
  Button,
  Form,
  Row,
  Col,
  Container,
} from "react-bootstrap";
import { useFooter } from "../../../../context/admin/AdminCms";  // ✅ context hook

const Welcome = () => {
  const { homePage, fetchHomePage, updateHomePage, loading } = useFooter();
  const [localHomepage, setLocalHomepage] = useState<any>({
    hero: { title: "", subtitle: "", ctaButtons: [] },
    stats: [],
    categoriesIntro: { title: "", description: "" },
    categories: [],
    howItWorks: { title: "", description: "", buyers: [], suppliers: [] },
    whyChoose: [],
    features: [],
    testimonials: [],
    ctas: [],
  });

  const [saving, setSaving] = useState(false);

  // ✅ Fetch homepage on mount
  useEffect(() => {
    const loadData = async () => {
      const res = await fetchHomePage();
      console.log(res , "res from fetch homepage");
      if (res) {
        setLocalHomepage(res);
      }
    };
    loadData();
  }, [fetchHomePage]);

  // ✅ Sync context when it updates
  useEffect(() => {
    if (homePage) setLocalHomepage(homePage);
  }, [homePage]);

  // ✅ Save
  const handleSave = async () => {
    try {
      setSaving(true);
      console.log("📤 Saving homepage:", localHomepage);
      const res = await updateHomePage(localHomepage);
      console.log(res , "res from update homepage");
      if (res?.success) {
        alert("Homepage updated successfully!");
      } else {
        alert("Failed to update homepage");
      }
    } catch (err) {
      console.error("❌ Error updating homepage:", err);
      alert("Failed to update homepage");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <>
      <PageMetaData title="Homepage Editor" />
      <Container className="py-4">

        {/* ================= HERO ================= */}
        <Card className="mb-4 shadow-sm">
          <Card.Header as="h5">Hero Section</Card.Header>
          <Card.Body>
            <Form.Group className="mb-3">
              <Form.Label>Hero Title</Form.Label>
              <Form.Control
                type="text"
                value={localHomepage.hero?.title || ""}
                onChange={(e) =>
                  setLocalHomepage({ ...localHomepage, hero: { ...localHomepage.hero, title: e.target.value } })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Hero Subtitle</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={localHomepage.hero?.subtitle || ""}
                onChange={(e) =>
                  setLocalHomepage({ ...localHomepage, hero: { ...localHomepage.hero, subtitle: e.target.value } })
                }
              />
            </Form.Group>

            <h6>CTA Buttons</h6>
            {localHomepage.hero?.ctaButtons?.map((btn: any, i: number) => (
              <Row key={i} className="mb-2">
                <Col>
                  <Form.Control
                    placeholder="Label"
                    value={btn.label}
                    onChange={(e) => {
                      const ctas = [...localHomepage.hero.ctaButtons];
                      ctas[i].label = e.target.value;
                      setLocalHomepage({ ...localHomepage, hero: { ...localHomepage.hero, ctaButtons: ctas } });
                    }}
                  />
                </Col>
                <Col>
                  <Form.Control
                    placeholder="URL"
                    value={btn.url}
                    onChange={(e) => {
                      const ctas = [...localHomepage.hero.ctaButtons];
                      ctas[i].url = e.target.value;
                      setLocalHomepage({ ...localHomepage, hero: { ...localHomepage.hero, ctaButtons: ctas } });
                    }}
                  />
                </Col>
                <Col xs="auto">
                  <Button
                    variant="danger"
                    onClick={() =>
                      setLocalHomepage({
                        ...localHomepage,
                        hero: {
                          ...localHomepage.hero,
                          ctaButtons: localHomepage.hero.ctaButtons.filter((_: any, idx: number) => idx !== i),
                        },
                      })
                    }
                  >
                    X
                  </Button>
                </Col>
              </Row>
            ))}
            <Button
              size="sm"
              onClick={() =>
                setLocalHomepage({
                  ...localHomepage,
                  hero: { ...localHomepage.hero, ctaButtons: [...(localHomepage.hero.ctaButtons || []), { label: "", url: "" }] },
                })
              }
            >
              + Add CTA
            </Button>
          </Card.Body>
        </Card>

        {/* ================= STATS ================= */}
        <Card className="mb-4 shadow-sm">
          <Card.Header as="h5">Stats</Card.Header>
          <Card.Body>
            {localHomepage.stats?.map((s: any, i: number) => (
              <Row key={i} className="mb-2">
                <Col>
                  <Form.Control
                    placeholder="Value"
                    value={s.value}
                    onChange={(e) => {
                      const stats = [...localHomepage.stats];
                      stats[i].value = e.target.value;
                      setLocalHomepage({ ...localHomepage, stats });
                    }}
                  />
                </Col>
                <Col>
                  <Form.Control
                    placeholder="Label"
                    value={s.label}
                    onChange={(e) => {
                      const stats = [...localHomepage.stats];
                      stats[i].label = e.target.value;
                      setLocalHomepage({ ...localHomepage, stats });
                    }}
                  />
                </Col>
                <Col xs="auto">
                  <Button
                    variant="danger"
                    onClick={() =>
                      setLocalHomepage({
                        ...localHomepage,
                        stats: localHomepage.stats.filter((_: any, idx: number) => idx !== i),
                      })
                    }
                  >
                    X
                  </Button>
                </Col>
              </Row>
            ))}
            <Button
              size="sm"
              onClick={() => setLocalHomepage({ ...localHomepage, stats: [...localHomepage.stats, { value: "", label: "" }] })}
            >
              + Add Stat
            </Button>
          </Card.Body>
        </Card>

        {/* ================= CATEGORIES INTRO ================= */}
        <Card className="mb-4 shadow-sm">
          <Card.Header as="h5">Categories Intro</Card.Header>
          <Card.Body>
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                value={localHomepage.categoriesIntro?.title || ""}
                onChange={(e) => setLocalHomepage({ ...localHomepage, categoriesIntro: { ...localHomepage.categoriesIntro, title: e.target.value } })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={localHomepage.categoriesIntro?.description || ""}
                onChange={(e) => setLocalHomepage({ ...localHomepage, categoriesIntro: { ...localHomepage.categoriesIntro, description: e.target.value } })}
              />
            </Form.Group>
          </Card.Body>
        </Card>

        {/* ================= CATEGORIES ================= */}
        <Card className="mb-4 shadow-sm">
          <Card.Header as="h5">Categories</Card.Header>
          <Card.Body>
            {localHomepage.categories?.map((cat: any, i: number) => (
              <Row key={i} className="mb-2">
                <Col><Form.Control placeholder="Title" value={cat.title} onChange={(e) => {
                  const categories = [...localHomepage.categories]; categories[i].title = e.target.value;
                  setLocalHomepage({ ...localHomepage, categories });
                }} /></Col>
                <Col><Form.Control placeholder="Description" value={cat.description} onChange={(e) => {
                  const categories = [...localHomepage.categories]; categories[i].description = e.target.value;
                  setLocalHomepage({ ...localHomepage, categories });
                }} /></Col>
                <Col><Form.Control placeholder="Products" value={cat.productCount} onChange={(e) => {
                  const categories = [...localHomepage.categories]; categories[i].productCount = e.target.value;
                  setLocalHomepage({ ...localHomepage, categories });
                }} /></Col>
                <Col><Form.Control placeholder="Image URL" value={cat.image} onChange={(e) => {
                  const categories = [...localHomepage.categories]; categories[i].image = e.target.value;
                  setLocalHomepage({ ...localHomepage, categories });
                }} /></Col>
                <Col><Form.Control placeholder="URL" value={cat.url} onChange={(e) => {
                  const categories = [...localHomepage.categories]; categories[i].url = e.target.value;
                  setLocalHomepage({ ...localHomepage, categories });
                }} /></Col>
                <Col xs="auto"><Button variant="danger" onClick={() => setLocalHomepage({ ...localHomepage, categories: localHomepage.categories.filter((_: any, idx: number) => idx !== i) })}>X</Button></Col>
              </Row>
            ))}
            <Button size="sm" onClick={() => setLocalHomepage({ ...localHomepage, categories: [...localHomepage.categories, { title: "", description: "", productCount: "", image: "", url: "" }] })}>+ Add Category</Button>
          </Card.Body>
        </Card>

        {/* ================= HOW IT WORKS ================= */}
        <Card className="mb-4 shadow-sm">
          <Card.Header as="h5">How It Works</Card.Header>
          <Card.Body>
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                value={localHomepage.howItWorks?.title || ""}
                onChange={(e) => setLocalHomepage({ ...localHomepage, howItWorks: { ...localHomepage.howItWorks, title: e.target.value } })}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={localHomepage.howItWorks?.description || ""}
                onChange={(e) => setLocalHomepage({ ...localHomepage, howItWorks: { ...localHomepage.howItWorks, description: e.target.value } })}
              />
            </Form.Group>
            <h6>Buyers Steps</h6>
            {localHomepage.howItWorks?.buyers?.map((b: any, i: number) => (
              <Row key={i} className="mb-2">
                <Col><Form.Control placeholder="Step #" type="number" value={b.step} onChange={(e) => {
                  const buyers = [...localHomepage.howItWorks.buyers]; buyers[i].step = e.target.value; setLocalHomepage({ ...localHomepage, howItWorks: { ...localHomepage.howItWorks, buyers } });
                }} /></Col>
                <Col><Form.Control placeholder="Title" value={b.title} onChange={(e) => {
                  const buyers = [...localHomepage.howItWorks.buyers]; buyers[i].title = e.target.value; setLocalHomepage({ ...localHomepage, howItWorks: { ...localHomepage.howItWorks, buyers } });
                }} /></Col>
                <Col><Form.Control placeholder="Description" value={b.description} onChange={(e) => {
                  const buyers = [...localHomepage.howItWorks.buyers]; buyers[i].description = e.target.value; setLocalHomepage({ ...localHomepage, howItWorks: { ...localHomepage.howItWorks, buyers } });
                }} /></Col>
                <Col xs="auto"><Button variant="danger" onClick={() => setLocalHomepage({ ...localHomepage, howItWorks: { ...localHomepage.howItWorks, buyers: localHomepage.howItWorks.buyers.filter((_: any, idx: number) => idx !== i) } })}>X</Button></Col>
              </Row>
            ))}
            <Button size="sm" onClick={() => setLocalHomepage({ ...localHomepage, howItWorks: { ...localHomepage.howItWorks, buyers: [...(localHomepage.howItWorks.buyers || []), { step: "", title: "", description: "", highlights: [] }] } })}>+ Add Buyer Step</Button>
            <hr />
            <h6>Suppliers Steps</h6>
            {localHomepage.howItWorks?.suppliers?.map((s: any, i: number) => (
              <Row key={i} className="mb-2">
                <Col><Form.Control placeholder="Step #" type="number" value={s.step} onChange={(e) => {
                  const suppliers = [...localHomepage.howItWorks.suppliers]; suppliers[i].step = e.target.value; setLocalHomepage({ ...localHomepage, howItWorks: { ...localHomepage.howItWorks, suppliers } });
                }} /></Col>
                <Col><Form.Control placeholder="Title" value={s.title} onChange={(e) => {
                  const suppliers = [...localHomepage.howItWorks.suppliers]; suppliers[i].title = e.target.value; setLocalHomepage({ ...localHomepage, howItWorks: { ...localHomepage.howItWorks, suppliers } });
                }} /></Col>
                <Col><Form.Control placeholder="Description" value={s.description} onChange={(e) => {
                  const suppliers = [...localHomepage.howItWorks.suppliers]; suppliers[i].description = e.target.value; setLocalHomepage({ ...localHomepage, howItWorks: { ...localHomepage.howItWorks, suppliers } });
                }} /></Col>
                <Col xs="auto"><Button variant="danger" onClick={() => setLocalHomepage({ ...localHomepage, howItWorks: { ...localHomepage.howItWorks, suppliers: localHomepage.howItWorks.suppliers.filter((_: any, idx: number) => idx !== i) } })}>X</Button></Col>
              </Row>
            ))}
            <Button size="sm" onClick={() => setLocalHomepage({ ...localHomepage, howItWorks: { ...localHomepage.howItWorks, suppliers: [...(localHomepage.howItWorks.suppliers || []), { step: "", title: "", description: "", highlights: [] }] } })}>+ Add Supplier Step</Button>
          </Card.Body>
        </Card>

        {/* ================= WHY CHOOSE ================= */}
        <Card className="mb-4 shadow-sm">
          <Card.Header as="h5">Why Choose Us</Card.Header>
          <Card.Body>
            {localHomepage.whyChoose?.map((w: any, i: number) => (
              <Row key={i} className="mb-2">
                <Col><Form.Control placeholder="Title" value={w.title} onChange={(e) => { const whyChoose = [...localHomepage.whyChoose]; whyChoose[i].title = e.target.value; setLocalHomepage({ ...localHomepage, whyChoose }); }} /></Col>
                <Col><Form.Control placeholder="Description" value={w.description} onChange={(e) => { const whyChoose = [...localHomepage.whyChoose]; whyChoose[i].description = e.target.value; setLocalHomepage({ ...localHomepage, whyChoose }); }} /></Col>
                <Col><Form.Control placeholder="Icon" value={w.icon} onChange={(e) => { const whyChoose = [...localHomepage.whyChoose]; whyChoose[i].icon = e.target.value; setLocalHomepage({ ...localHomepage, whyChoose }); }} /></Col>
                <Col xs="auto"><Button variant="danger" onClick={() => setLocalHomepage({ ...localHomepage, whyChoose: localHomepage.whyChoose.filter((_: any, idx: number) => idx !== i) })}>X</Button></Col>
              </Row>
            ))}
            <Button size="sm" onClick={() => setLocalHomepage({ ...localHomepage, whyChoose: [...localHomepage.whyChoose, { title: "", description: "", icon: "" }] })}>+ Add Reason</Button>
          </Card.Body>
        </Card>

        {/* ================= FEATURES ================= */}
        <Card className="mb-4 shadow-sm">
          <Card.Header as="h5">Features</Card.Header>
          <Card.Body>
            {localHomepage.features?.map((f: any, i: number) => (
              <Row key={i} className="mb-2">
                <Col><Form.Control placeholder="Title" value={f.title} onChange={(e) => { const features = [...localHomepage.features]; features[i].title = e.target.value; setLocalHomepage({ ...localHomepage, features }); }} /></Col>
                <Col><Form.Control placeholder="Description" value={f.description} onChange={(e) => { const features = [...localHomepage.features]; features[i].description = e.target.value; setLocalHomepage({ ...localHomepage, features }); }} /></Col>
                <Col xs="auto"><Button variant="danger" onClick={() => setLocalHomepage({ ...localHomepage, features: localHomepage.features.filter((_: any, idx: number) => idx !== i) })}>X</Button></Col>
              </Row>
            ))}
            <Button size="sm" onClick={() => setLocalHomepage({ ...localHomepage, features: [...localHomepage.features, { title: "", description: "" }] })}>+ Add Feature</Button>
          </Card.Body>
        </Card>

        {/* ================= TESTIMONIALS ================= */}
        <Card className="mb-4 shadow-sm">
          <Card.Header as="h5">Testimonials</Card.Header>
          <Card.Body>
            {localHomepage.testimonials?.map((t: any, i: number) => (
              <Row key={i} className="mb-2">
                <Col><Form.Control placeholder="Name" value={t.name} onChange={(e) => { const testimonials = [...localHomepage.testimonials]; testimonials[i].name = e.target.value; setLocalHomepage({ ...localHomepage, testimonials }); }} /></Col>
                <Col><Form.Control placeholder="Role" value={t.role} onChange={(e) => { const testimonials = [...localHomepage.testimonials]; testimonials[i].role = e.target.value; setLocalHomepage({ ...localHomepage, testimonials }); }} /></Col>
                <Col><Form.Control placeholder="Company" value={t.company} onChange={(e) => { const testimonials = [...localHomepage.testimonials]; testimonials[i].company = e.target.value; setLocalHomepage({ ...localHomepage, testimonials }); }} /></Col>
                <Col><Form.Control placeholder="Message" value={t.message} onChange={(e) => { const testimonials = [...localHomepage.testimonials]; testimonials[i].message = e.target.value; setLocalHomepage({ ...localHomepage, testimonials }); }} /></Col>
                <Col xs="auto"><Button variant="danger" onClick={() => setLocalHomepage({ ...localHomepage, testimonials: localHomepage.testimonials.filter((_: any, idx: number) => idx !== i) })}>X</Button></Col>
              </Row>
            ))}
            <Button size="sm" onClick={() => setLocalHomepage({ ...localHomepage, testimonials: [...localHomepage.testimonials, { name: "", role: "", company: "", message: "" }] })}>+ Add Testimonial</Button>
          </Card.Body>
        </Card>

        {/* ================= CALL TO ACTION ================= */}
        <Card className="mb-4 shadow-sm">
          <Card.Header as="h5">Call To Action (CTA)</Card.Header>
          <Card.Body>
            {localHomepage.ctas?.map((c: any, i: number) => (
              <Row key={i} className="mb-2">
                <Col><Form.Control placeholder="Title" value={c.title} onChange={(e) => { const ctas = [...localHomepage.ctas]; ctas[i].title = e.target.value; setLocalHomepage({ ...localHomepage, ctas }); }} /></Col>
                <Col><Form.Control placeholder="Description" value={c.description} onChange={(e) => { const ctas = [...localHomepage.ctas]; ctas[i].description = e.target.value; setLocalHomepage({ ...localHomepage, ctas }); }} /></Col>
                <Col><Form.Control placeholder="Button Label" value={c.buttonLabel} onChange={(e) => { const ctas = [...localHomepage.ctas]; ctas[i].buttonLabel = e.target.value; setLocalHomepage({ ...localHomepage, ctas }); }} /></Col>
                <Col><Form.Control placeholder="Button URL" value={c.buttonUrl} onChange={(e) => { const ctas = [...localHomepage.ctas]; ctas[i].buttonUrl = e.target.value; setLocalHomepage({ ...localHomepage, ctas }); }} /></Col>
                <Col xs="auto"><Button variant="danger" onClick={() => setLocalHomepage({ ...localHomepage, ctas: localHomepage.ctas.filter((_: any, idx: number) => idx !== i) })}>X</Button></Col>
              </Row>
            ))}
            <Button size="sm" onClick={() => setLocalHomepage({ ...localHomepage, ctas: [...localHomepage.ctas, { title: "", description: "", buttonLabel: "", buttonUrl: "" }] })}>+ Add CTA</Button>
          </Card.Body>
        </Card>

        {/* ================= SAVE BUTTON ================= */}
        <div className="text-end mt-4">
          <Button variant="primary" size="lg" onClick={handleSave} disabled={saving}>
            {saving ? "Saving..." : "Save Homepage"}
          </Button>
        </div>
      </Container>
    </>
  );
};

export default Welcome;
