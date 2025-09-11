import { WorldVectorMap } from '@/components/VectorMap'
import IconifyIcon from '@/components/wrappers/IconifyIcon'
import { toAlphaNumber } from '@/utils/change-casing'
import { Card, CardBody, Col, Dropdown, DropdownItem, DropdownMenu, DropdownToggle, ProgressBar, Row } from 'react-bootstrap'
import { Fragment } from 'react/jsx-runtime'
import { countries } from '../data'

const SessionByBrowser = () => {
  const options = {
    map: 'world',
    zoomOnScroll: !0,
    zoomButtons: !1,
    markersSelectable: !0,
    markers: [
      { name: 'India', coords: [20.8617, 80.1954] },
     
      { name: 'China', coords: [35.8617, 104.1954] },
    ],
    markerStyle: {
      initial: { fill: '#7f56da' },
      selected: { fill: '#1bb394' },
    },
    labels: { markers: { render: (e: any) => e.name } },
    regionStyle: {
      initial: { fill: 'rgba(169,183,197, 0.3)', fillOpacity: 1 },
    },
  }

  return (
    <Card>
      <div className="d-flex card-header justify-content-between align-items-center border-bottom border-dashed">
        <h4 className="card-title">Sessions by Country</h4>
        
      </div>
      <CardBody className="py-0">
        <Row className="align-items-center">
          <Col lg={7}>
            <div id="world-map-markers" className="mt-3">
              <WorldVectorMap height="220px" width="100%" options={options} />
            </div>
          </Col>
          <Col lg={5} dir="ltr">
            <div className="p-3 pb-0">
              {countries.map((country, idx) => (
                <Fragment key={idx}>
                  <div className="d-flex justify-content-between align-items-center">
                    <p className="mb-1">
                      <IconifyIcon icon={country.icon} className="fs-16 align-middle me-1" /> <span className="align-middle">{country.name}</span>
                    </p>
                  </div>
                  <Row className="align-items-center mb-3">
                    <Col>
                      <ProgressBar className="progress-soft progress-sm" now={country.value} variant={country.variant} />
                    </Col>
                   
                  </Row>
                </Fragment>
              ))}
            </div>
          </Col>
        </Row>
      </CardBody>
    </Card>
  )
}

export default SessionByBrowser
