import { Button, Card, CardBody, Col, Row } from 'react-bootstrap'
import { useAdminDashboard } from "@/context/admin/StatAndDashboard";

import PageMetaData from '@/components/PageTitle'
import IconifyIcon from '@/components/wrappers/IconifyIcon'

const TODO = () => {
  const { buyers, loading } = useAdminDashboard();
  console.log(buyers , "buyers")

  return (
    <>
      <PageMetaData title="All Buyers" />
      <Row>
        <Col>
          <Card>
            <CardBody>
              <div className="d-flex flex-wrap justify-content-between gap-3">
                <div className="search-bar">
                  <span>
                    <IconifyIcon icon="bx:search-alt" />
                  </span>
                  <input
                    type="search"
                    className="form-control"
                    id="search"
                    placeholder="Search buyer..."
                  />
                </div>
                {/* <div>
                  <Button
                    variant="primary"
                    className="d-inline-flex align-items-center"
                  >
                    <IconifyIcon icon="bx:plus" className="me-1" />
                    Add Buyer
                  </Button>
                </div> */}
              </div>
            </CardBody>

            <div>
              <div className="table-responsive table-centered">
                <table className="table text-nowrap mb-0">
                  <thead className="bg-light bg-opacity-50">
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Phone</th>
                      <th>Company</th>
                      <th>Verified</th>
                      <th>Active</th>
                      <th>Last Login</th>
                      <th>Created</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {!loading && buyers.length > 0 ? (
                      buyers.map((buyer, idx) => (
                        <tr key={buyer._id || idx}>
                          <td>{buyer.name}</td>
                          <td>{buyer.email}</td>
                          <td>{buyer.phone || "N/A"}</td>
                          <td>{buyer.companyName || "-"}</td>
                          <td>
                            <span
                              className={`badge ${
                                buyer.isVerified
                                  ? "badge-soft-success"
                                  : "badge-soft-danger"
                              }`}
                            >
                              {buyer.isVerified ? "Verified" : "Not Verified"}
                            </span>
                          </td>
                          <td>
                            <span
                              className={`badge ${
                                buyer.isActive
                                  ? "badge-soft-success"
                                  : "badge-soft-danger"
                              }`}
                            >
                              {buyer.isActive ? "Active" : "Inactive"}
                            </span>
                          </td>
                          <td>
                            {buyer.lastLogin
                              ? new Date(buyer.lastLogin).toDateString()
                              : "Never"}
                          </td>
                          <td>{new Date(buyer.createdAt).toDateString()}</td>
                          <td>
                            <Button
                              variant="soft-secondary"
                              size="sm"
                              className="me-2"
                            >
                              <IconifyIcon icon="bx:edit" className="fs-16" />
                            </Button>
                            <Button
                              variant="soft-danger"
                              size="sm"
                              type="button"
                            >
                              <IconifyIcon icon="bx:trash" className="fs-16" />
                            </Button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={9} className="text-center py-3">
                          {loading ? "Loading buyers..." : "No buyers found"}
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default TODO;
