import SimplebarReactClient from '@/components/wrappers/SimplebarReactClient'
import { toAlphaNumber } from '@/utils/change-casing'
import type { ApexOptions } from 'apexcharts'
import ReactApexChart from 'react-apexcharts'
import { Button, Card, CardBody, CardTitle, Col, Row } from 'react-bootstrap'
import { onlineUsers } from '../data'

const Conversions = () => {


  const performanceChartOpts: ApexOptions = {
    series: [
      {
        name: 'Page Views',
        type: 'bar',
        data: [34, 65, 46, 68, 49, 61, 42, 44, 78, 52, 63, 67],
      },
      {
        name: 'Clicks',
        type: 'area',
        data: [8, 12, 7, 17, 21, 11, 5, 9, 7, 29, 12, 35],
      },
    ],
    chart: {
      height: 313,
      type: 'line',
      toolbar: {
        show: false,
      },
    },
    stroke: {
      dashArray: [0, 0],
      width: [0, 2],
      curve: 'smooth',
    },
    fill: {
      opacity: [1, 1],
      type: ['solid', 'gradient'],
      gradient: {
        type: 'vertical',
        inverseColors: false,
        opacityFrom: 0.5,
        opacityTo: 0,
        stops: [0, 90],
      },
    },
    markers: {
      size: [0, 0],
      strokeWidth: 2,
      hover: {
        size: 4,
      },
    },
    xaxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      axisTicks: {
        show: false,
      },
      axisBorder: {
        show: false,
      },
    },
    yaxis: {
      min: 0,
      axisBorder: {
        show: false,
      },
    },
    grid: {
      show: true,
      strokeDashArray: 3,
      xaxis: {
        lines: {
          show: false,
        },
      },
      yaxis: {
        lines: {
          show: true,
        },
      },
      padding: {
        top: 0,
        right: -2,
        bottom: 0,
        left: 10,
      },
    },
    legend: {
      show: true,
      horizontalAlign: 'center',
      offsetX: 0,
      offsetY: 5,
      markers: {
        width: 9,
        height: 9,
        radius: 6,
      },
      itemMargin: {
        horizontal: 10,
        vertical: 0,
      },
    },
    plotOptions: {
      bar: {
        columnWidth: '30%',
        barHeight: '70%',
        borderRadius: 3,
      },
    },
    colors: ['#1bb394', '#1e84c4'],
    tooltip: {
      shared: true,
      y: [
        {
          formatter: function (y) {
            if (typeof y !== 'undefined') {
              return y.toFixed(1) + 'k'
            }
            return y
          },
        },
        {
          formatter: function (y) {
            if (typeof y !== 'undefined') {
              return y.toFixed(1) + 'k'
            }
            return y
          },
        },
      ],
    },
  }

  return (
    <Card>
      <CardBody className="p-0">
        <Row className="g-0">
          
          <Col lg={9} className="border-start border-end">
            <div className="p-3">
              <div className="d-flex justify-content-between align-items-center">
                <CardTitle as="h4">Performance</CardTitle>
                
              </div>
              
              <div dir="ltr">
                <ReactApexChart height={313} options={performanceChartOpts} series={performanceChartOpts.series} type="line" />
              </div>
            </div>
          </Col>
          <Col lg={3}>
            <div className="d-flex justify-content-between p-3">
              <CardTitle>Session By Browser</CardTitle>
            </div>
            <SimplebarReactClient className="px-3" style={{ maxHeight: 310, height: 'auto', overflow: 'hidden, scroll' }}>
              {onlineUsers.map((user, idx) => (
                <div className="row p-2" key={idx}>
                  <span className="col-4  fw-medium">{user.name}</span>
                  <span className="col-4 text-center fw-medium">{user.percentage}</span>
                  <span className="col-4 text-end fw-medium">&nbsp;{toAlphaNumber(user.amount)}</span>
                </div>
              ))}
            </SimplebarReactClient>
            <div className="text-center p-3">
              <button type="button" className="btn btn-light shadow-none w-100">
                View All
              </button>
            </div>
          </Col>
        </Row>
      </CardBody>
    </Card>
  )
}

export default Conversions
