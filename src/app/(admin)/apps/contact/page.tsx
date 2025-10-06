import React, { useContext } from "react";
import { Card, Table, Container, Row, Col } from "react-bootstrap";
import { useAdminDashboard } from "@/context/admin/StatAndDashboard"; // your context file

const ContactsPage = () => {
  const { contacts } = useAdminDashboard();
  console.log(contacts , "contacts in page")

  return (
    <Container fluid className="py-4">
      <Row>
        <Col>
          <Card className="shadow-sm border-0">
            <Card.Header className="bg-primary text-white">
              <h4 className="mb-0">Customer Enquiries</h4>
            </Card.Header>
            <Card.Body>
              {contacts?.length > 0 ? (
                <Table striped bordered hover responsive className="align-middle">
                  <thead className="table-dark">
                    <tr>
                      <th>#</th>
                      <th>Full Name</th>
                      <th>Company</th>
                      <th>Email</th>
                      <th>Subject</th>
                      <th>Message</th>
                    </tr>
                  </thead>
                  <tbody>
                    {contacts.map((contact, index) => (
                      <tr key={contact._id}>
                        <td>{index + 1}</td>
                        <td>{contact.FirstName} {contact.LastName}</td>
                        <td>{contact.Company}</td>
                        <td>{contact.Email}</td>
                        <td>{contact.Subject}</td>
                        <td>{contact.Message}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              ) : (
                <div className="text-center py-4">
                  <p className="text-muted">No enquiries found yet.</p>
                </div>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ContactsPage;
