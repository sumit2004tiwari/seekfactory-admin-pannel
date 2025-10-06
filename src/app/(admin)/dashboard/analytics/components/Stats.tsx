import { useEffect, useState } from "react";
import { Col, Row, Card } from "react-bootstrap";
import IconifyIcon from "@/components/wrappers/IconifyIcon";
import type { StatType } from "../types";
import axios from "axios";

const StatCard = ({ icon, stat, title, variant }: StatType) => {
  return (
    <Card>
      <Card.Body>
        <Row>
          <Col xs={6}>
            <div className="avatar-md bg-light bg-opacity-50 rounded flex-centered">
              <IconifyIcon icon={icon} className="fs-32 text-success" />
            </div>
          </Col>
          <Col xs={6} className="text-end">
            <p className="text-muted mb-0 text-truncate">{title}</p>
            <h3 className="text-dark mt-2 mb-0">{stat}</h3>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

const Stats = () => {
  const [mappedStats, setMappedStats] = useState<StatType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // 👇 yaha tum apna actual backend ka URL daalna
        const res = await axios.get("http://localhost:5000/api/stats");
        const apiStats = res.data?.stats || {};

        setMappedStats([
          {
            title: "Total Products",
            icon: "solar:leaf-bold-duotone",
            stat: apiStats.products ?? 0,
            variant: "success",
          },
          {
            title: "Total Users",
            icon: "solar:cpu-bolt-line-duotone",
            stat: apiStats.users ?? 0,
            variant: "success",
          },
          {
            title: "Total Vendors",
            icon: "solar:layers-bold-duotone",
            stat: apiStats.totalSuppliers ?? 0,
            variant: "danger",
          },
          {
            title: "No. of Buyers",
            icon: "solar:users-group-two-rounded-bold-duotone",
            stat: apiStats.totalBuyers ?? 0,
            variant: "danger",
          },
        ]);
      } catch (err) {
        console.error("❌ Error fetching stats:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) return <p>Loading stats...</p>;

  return (
    <Row>
      {mappedStats.map((stat, idx) => (
        <Col md={6} xl={3} key={idx}>
          <StatCard {...stat} />
        </Col>
      ))}
    </Row>
  );
};

export default Stats;
