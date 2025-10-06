import { useEffect, useState } from 'react'
import { Card, CardBody, CardTitle, Col, Row, Badge } from 'react-bootstrap'
import { useNavigate, useParams } from 'react-router-dom'

import { currency } from '@/context/constants'
import SubmissionButton from './components/SubmissionButton'
import PageMetaData from '@/components/PageTitle'

import { useAdminDashboard } from '@/context/admin/StatAndDashboard'

import logoDark from '@/assets/images/logo-dark-full.png'
import logoLight from '@/assets/images/logo-light-full.png'

const InvoiceDetail = () => {
  const { supplierId } = useParams()
  const navigate = useNavigate()
  const { fetchVendorProducts } = useAdminDashboard()
  const [products, setProducts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!supplierId) return

    const fetchProducts = async () => {
      try {
        const res = await fetchVendorProducts(supplierId)
        setProducts(Array.isArray(res) ? res : [])
      } catch (err) {
        console.error('Error fetching vendor products:', err)
        navigate('/pages/error-404-alt')
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [supplierId, fetchVendorProducts, navigate])

  return (
    <>
      <PageMetaData title={`Supplier Products - ${supplierId}`} />

      <Row>
        <Col xs={12}>
          <Card>
            <CardBody>
              <div className="clearfix mb-3">
                <div className="float-sm-end">
                  
                </div>
                <div className="float-sm-start">
                  <CardTitle as={'h5'}>Supplier Products</CardTitle>
                </div>
              </div>

              {loading ? (
                <div className="text-center py-3">Loading products...</div>
              ) : (
                <div className="table-responsive table-borderless text-nowrap table-centered">
                  <table className="table mb-0">
                    <thead className="bg-light bg-opacity-50">
                      <tr>
                        <th className="py-2">Product Name</th>
                        <th className="py-2">Category</th>
                        <th className="py-2">Price</th>
                        <th className="py-2">Min Order Qty</th>
                        <th className="py-2">Origin</th>
                        <th className="py-2">Tags</th>
                        <th className="py-2">Certifications</th>
                        <th className="py-2">Status</th>
                        <th className="py-2">Views</th>
                        <th className="py-2">Inquiries</th>
                        <th className="py-2">Active</th>
                        
                      </tr>
                    </thead>
                    <tbody>
                      {products.length > 0 ? (
                        products.map((p, idx) => (
                          <tr key={idx}>
                            <td>{p.name}</td>
                            <td>{p.category || '-'}</td>
                            <td>{currency}{p.priceRange ?? 0}</td>
                            <td>{p.minOrderQuantity ?? '-'}</td>
                            <td>{p.countryOfOrigin ?? '-'}</td>
                            <td>{p.tags?.join(', ') || '-'}</td>
                            <td>{p.certifications?.join(', ') || '-'}</td>
                            <td>{p.status}</td>
                            <td>{p.views}</td>
                            <td>{p.inquiries}</td>
                            <td>{p.isActive ? 'Yes' : 'No'}</td>
                           
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={12} className="text-center py-3">No products found</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              )}

              <div className="mt-5 mb-1">
                <SubmissionButton />
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </>
  )
}

export default InvoiceDetail
