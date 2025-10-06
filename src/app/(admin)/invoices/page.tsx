import { useEffect, useState } from 'react'
import { Card, CardBody, CardTitle, Col, Row, Form } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import PageMetaData from '@/components/PageTitle'
import { useAdminDashboard } from '@/context/admin/StatAndDashboard'
import { adminApiClient } from '@/api/lib' // make sure this has updateSupplierStatus API

const Invoices = () => {
  const { suppliers, loading, fetchSuppliers } = useAdminDashboard()
  const navigate = useNavigate()
  const [localSuppliers, setLocalSuppliers] = useState<any[]>([])

  // Sync local state with context suppliers
  useEffect(() => {
    setLocalSuppliers(suppliers)
  }, [suppliers])

  // Fetch suppliers if not already loaded
  useEffect(() => {
    if (suppliers.length === 0) fetchSuppliers()
  }, [suppliers, fetchSuppliers])

  const handleSupplierClick = (supplierId: string) => {
    navigate(`/invoices/${supplierId}`)
  }

  const formatAddress = (address: any) => {
    if (!address) return ''
    const addr = typeof address === 'string' ? JSON.parse(address) : address
    return `${addr.street || ''}, ${addr.city || ''}, ${addr.state || ''}, ${addr.country || ''}, ${addr.zipCode || ''}`
  }

  const toggleActive = async (supplierId: string, currentStatus: boolean) => {
    try {
      // Call backend API to update supplier status
      const res = await adminApiClient.updateSupplierStatus(supplierId, !currentStatus)

      // Update local state to reflect change immediately
      setLocalSuppliers((prev) =>
        prev.map((s) =>
          s._id === supplierId ? { ...s, isActive: !currentStatus } : s
        )
      )
    } catch (err) {
      console.error('Failed to update supplier status', err)
      alert('Failed to update supplier status')
    }
  }

  return (
    <>
      <PageMetaData title="Suppliers" />
      <Row>
        <Col xs={12}>
          <Card>
            <CardBody>
              <CardTitle as="h5" className="mb-3">Supplier List</CardTitle>
              {loading ? (
                <p>Loading suppliers...</p>
              ) : (
                <div className="table-responsive table-bordered text-nowrap">
                  <table className="table mb-0">
                    <thead className="bg-light bg-opacity-50">
                      <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Company</th>
                        <th>Business Type</th>
                        <th>Phone</th>
                        <th>Role</th>
                        <th>Verified</th>
                        <th>Active</th>
                        <th>Avatar</th>
                        <th>Last Login</th>
                        <th>Created At</th>
                        <th>Updated At</th>
                        <th>Address</th>
                      </tr>
                    </thead>
                    <tbody>
                      {localSuppliers.map((s) => (
                        <tr key={s._id} style={{ cursor: 'pointer' }} onClick={() => handleSupplierClick(s._id)}>
                          <td>{s.name}</td>
                          <td>{s.email}</td>
                          <td>{s.companyName}</td>
                          <td>{s.businessType}</td>
                          <td>{s.phone}</td>
                          <td>{s.role}</td>
                          <td>{s.isVerified ? 'Yes' : 'No'}</td>
                          <td onClick={(e) => e.stopPropagation()}>
                            <Form.Check
                              type="switch"
                              id={`active-switch-${s._id}`}
                              checked={s.isActive}
                              onChange={() => toggleActive(s._id, s.isActive)}
                            />
                          </td>
                          <td>
                            {s.avatar ? <img src={s.avatar} alt="avatar" height={30} /> : 'N/A'}
                          </td>
                          <td>{s.lastLogin ? new Date(s.lastLogin).toLocaleString() : 'N/A'}</td>
                          <td>{s.createdAt ? new Date(s.createdAt).toLocaleString() : 'N/A'}</td>
                          <td>{s.updatedAt ? new Date(s.updatedAt).toLocaleString() : 'N/A'}</td>
                          <td>{formatAddress(s.address)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </CardBody>
          </Card>
        </Col>
      </Row>
    </>
  )
}

export default Invoices
