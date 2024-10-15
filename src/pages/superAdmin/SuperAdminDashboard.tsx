import { Col, Row, Spin } from "antd"; // Import Spin from Ant Design
import {
  DeliveryAnalyticsCard,
  LogisticsStatsCard,
  PageHeader,
} from "../../components";
import {
  BlockOutlined,
  ExceptionOutlined,
  HomeOutlined,
  PieChartOutlined,
  TeamOutlined,
  UsergroupAddOutlined,
} from "@ant-design/icons";
import { Helmet } from "react-helmet-async";
import { useStylesContext } from "../../context";
import { useAuth } from "../../context/AuthContext";
import { useFetchData } from "../../hooks";
import { getDashboardCardStats } from "../../api/services/Common";
import { useEffect, useState } from "react";

export const SuperAdminDashBoard = () => {
  const stylesContext = useStylesContext();
  interface Stat {
    icon: React.ComponentType;
    value: number;
    title: string;
    diff: number | null;
  }

  const [STATS, setSTATS] = useState<Stat[]>([]);
  const [loading, setLoading] = useState(true); // Add loading state
  const { user } = useAuth();

  useEffect(() => {
    setLoading(true); // Set loading to true before fetching data
    getDashboardCardStats().then((res) => {
      console.log("Dashboard stats:", res);
      const data = res.responseObject;

      // add property icon to each object
      const stats = data.map((s: { title: string; value: number; diff: number | null; }) => {
        let icon = null;
        switch (s.title.toLowerCase()) {
          case "total customers registered today":
            icon = UsergroupAddOutlined;
            break;
          case "total customers":
            icon = TeamOutlined;
            break;
          case "total customers with expiring police reports":
            icon = ExceptionOutlined;
            break;
          default:
            icon = BlockOutlined;
        }

        return { ...s, icon };
      });

      setSTATS(stats);
      console.log("STATS:", stats);
      setLoading(false); // Set loading to false after data is loaded
    }).catch((error) => {
      console.error("Error fetching dashboard stats:", error);
      setLoading(false); // Ensure loading is false even on error
    });
  }, []); // Empty dependency array to run only on mount

  const {
    data: deliveryAnalyticsData,
    loading: deliveryAnalyticsDataLoading,
    error: deliveryAnalyticsDataError,
  } = useFetchData("../mocks/DeliveryAnalytics.json");

  // Show loading screen until all data is fetched
  if (loading || deliveryAnalyticsDataLoading) {
    return (
      <div style={{ textAlign: 'center', padding: '50px' }}>
        <Spin size="large" /> {/* Show loading spinner */}
        <p>Loading dashboard...</p> {/* Loading message */}
      </div>
    );
  }

  return (
    <div>
      <Helmet>
        <title>Dashboard </title>
      </Helmet>
      <PageHeader
        title={"Dashboard"}
        breadcrumbs={[
          {
            title: (
              <>
                <HomeOutlined />
                <span>home</span>
              </>
            ),
            path: "/",
          },
          {
            title: (
              <>
                <PieChartOutlined />
                <span>dashboard</span>
              </>
            ),
          },
        ]}
      />
      <Row {...stylesContext?.rowProps}>
        {user?.role === "Data Entry" && "Welcome to the Data Entry Dashboard"}
        {STATS.length > 0 ? (
          STATS.map((s) => (
            <Col xs={24} sm={12} xl={8} key={s.title}>
              <LogisticsStatsCard {...s} />
            </Col>
          ))
        ) : (
          <p>No data available</p> // Show a message if no data is loaded
        )}

        <Col xs={24} xl={24}>
          <DeliveryAnalyticsCard
            data={deliveryAnalyticsData}
            loading={deliveryAnalyticsDataLoading}
            error={deliveryAnalyticsDataError}
          />
        </Col>
      </Row>
    </div>
  );
};
