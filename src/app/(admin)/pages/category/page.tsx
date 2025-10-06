import React, { useEffect, useState } from "react";
import { Container, Row, Col, Form, Button, Card, Alert, Spinner } from "react-bootstrap";
import { useAdminDashboard } from "@/context/admin/StatAndDashboard"; // ✅ adjust path if needed

const CategoryPage = () => {
  const {
    categories,
    fetchCategories,
    saveCategories,
    updateFeaturedCategories,
    loading,
  } = useAdminDashboard();

  const [localCategories, setLocalCategories] = useState<
    { _id?: string; name: string; subcategories: string[]; featured: boolean }[]
  >([]);
  const [message, setMessage] = useState("");

  // ✅ Load categories from context
  useEffect(() => {
    fetchCategories();
  }, []);

  // ✅ Sync local editable state when context updates
useEffect(() => {
  if (categories?.length) {
    console.log(categories , "categories to display in local");
    setLocalCategories(
      categories.map((cat) => ({
        _id: cat._id,
        name: cat.name || "",
        subcategories: Array.isArray(cat.subcategories)
          ? cat.subcategories.map((sub: any) => sub.name || "")
          : [""], // fallback
        featured: cat.featured || false,
      }))
    );
  } else {
    setLocalCategories([{ name: "", subcategories: [""], featured: false }]);
  }
}, [categories]);



  // ✅ Add new category
  const handleAddCategory = () => {
    setLocalCategories([
      ...localCategories,
      { name: "", subcategories: [""], featured: false },
    ]);
  };

  // ✅ Remove category
  const handleRemoveCategory = (index: number) => {
    const updated = [...localCategories];
    updated.splice(index, 1);
    setLocalCategories(updated);
  };

  // ✅ Update category name
  const handleCategoryNameChange = (index: number, value: string) => {
    const updated = [...localCategories];
    updated[index].name = value;
    setLocalCategories(updated);
  };

  // ✅ Add subcategory
  const handleAddSubcategory = (catIndex: number) => {
    const updated = [...localCategories];
    updated[catIndex].subcategories.push("");
    setLocalCategories(updated);
  };

  // ✅ Remove subcategory
  const handleRemoveSubcategory = (catIndex: number, subIndex: number) => {
    const updated = [...localCategories];
    updated[catIndex].subcategories.splice(subIndex, 1);
    setLocalCategories(updated);
  };

  // ✅ Update subcategory value
  const handleSubcategoryChange = (catIndex: number, subIndex: number, value: string) => {
    const updated = [...localCategories];
    updated[catIndex].subcategories[subIndex] = value;
    setLocalCategories(updated);
  };

  // ✅ Toggle featured (limit 4)
  const handleToggleFeatured = (index: number) => {
    const featuredCount = localCategories.filter((c) => c.featured).length;
    const updated = [...localCategories];

    if (!updated[index].featured && featuredCount >= 4) {
      setMessage("⚠️ You can only mark up to 4 categories as featured!");
      return;
    }

    updated[index].featured = !updated[index].featured;
    setLocalCategories(updated);
  };

  // ✅ Save all (create/update)
  const handleSaveAll = async () => {
    try {
      await saveCategories(localCategories);
      setMessage("✅ Categories saved successfully!");
    } catch (error) {
      console.error(error);
      setMessage("❌ Error saving categories.");
    }
  };

  // ✅ Save featured only
  const handleSaveFeatured = async () => {
    try {
      const featuredIds = localCategories
        .filter((c) => c.featured)
        .map((c) => c._id)
        .filter(Boolean) as string[];

      if (!featuredIds.length) {
        setMessage("⚠️ Please select at least one featured category!");
        return;
      }

      await updateFeaturedCategories(featuredIds);
      setMessage("⭐ Featured categories updated successfully!");
    } catch (error) {
      console.error(error);
      setMessage("❌ Error updating featured categories.");
    }
  };

  return (
    <Container className="my-4">
      <h2 className="mb-4 text-center">🗂️ Category & Subcategory Management</h2>

      {message && <Alert variant="info">{message}</Alert>}

      {loading ? (
        <div className="text-center my-5">
          <Spinner animation="border" />
        </div>
      ) : (
        <>
          {localCategories.map((cat, catIndex) => (
            <Card key={catIndex} className="mb-4 shadow-sm">
              <Card.Body>
                <Row className="align-items-center mb-3">
                  <Col md={8}>
                    <Form.Label>Category Name</Form.Label>
                    <Form.Control
                      placeholder="Enter category name"
                      value={cat.name}
                      onChange={(e) => handleCategoryNameChange(catIndex, e.target.value)}
                    />
                  </Col>
                  <Col md={3}>
                    <Form.Check
                      type="checkbox"
                      label="Featured"
                      checked={cat.featured}
                      onChange={() => handleToggleFeatured(catIndex)}
                      className="mt-4"
                    />
                  </Col>
                  <Col md={1} className="text-end">
                    <Button
                      variant="outline-danger"
                      className="mt-4"
                      onClick={() => handleRemoveCategory(catIndex)}
                    >
                      🗑
                    </Button>
                  </Col>
                </Row>

                <h6 className="mb-2">Subcategories</h6>
                {cat.subcategories.map((sub, subIndex) => (
                  <Row key={subIndex} className="align-items-center mb-2">
                    <Col md={10}>
                      <Form.Control
                        placeholder="Enter subcategory name"
                        value={sub}
                        onChange={(e) =>
                          handleSubcategoryChange(catIndex, subIndex, e.target.value)
                        }
                      />
                    </Col>
                    <Col md={2} className="text-end">
                      {cat.subcategories.length > 1 && (
                        <Button
                          variant="outline-danger"
                          size="sm"
                          onClick={() => handleRemoveSubcategory(catIndex, subIndex)}
                        >
                          Remove
                        </Button>
                      )}
                    </Col>
                  </Row>
                ))}

                <Button
                  variant="outline-primary"
                  size="sm"
                  onClick={() => handleAddSubcategory(catIndex)}
                >
                  + Add Subcategory
                </Button>
              </Card.Body>
            </Card>
          ))}

          <div className="text-center mt-4">
            <Button variant="success" onClick={handleAddCategory} className="me-2">
              + Add Another Category
            </Button>
            <Button variant="primary" onClick={handleSaveAll} className="me-2">
              💾 Save All Categories
            </Button>
            {/* <Button variant="warning" onClick={handleSaveFeatured}>
              ⭐ Save Featured Categories
            </Button> */}
          </div>
        </>
      )}
    </Container>
  );
};

export default CategoryPage;
