import { Col, Row } from 'antd';
import {
  MarketingStatsCard,
  PageHeader,
  VisitorsChartCard,
} from '../../components';
import { HomeOutlined, PieChartOutlined } from '@ant-design/icons';
import { Helmet } from 'react-helmet-async';
import { useStylesContext } from '../../context';

export const DataEntryDashboardPage = () => {
  const stylesContext = useStylesContext();
  // const {
  //   data: campaignAds,
  //   error: campaignAdsError,
  //   loading: campaignAdsLoading,
  // } = useFetchData('../mocks/CampaignAds.json');

  return (
    <div>
      <Helmet>
        <title>Dashboard</title>
      </Helmet>
      <PageHeader
        title="Dashboard"
        breadcrumbs={[
          {
            title: (
              <>
                <HomeOutlined />
                <span>home</span>
              </>
            ),
            path: '/',
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
        <Col xs={24} sm={12} lg={12}>
          <MarketingStatsCard
            data={[274, 337, 81, 497]}
            title="New Customers"
            diff={12.5}
            value={16826}
            style={{ height: '100%' }}
          />
        </Col>
        <Col xs={24} sm={12} lg={12}>
          <MarketingStatsCard
            data={[20, 40, 80, 50]}
            title="clicks"
            diff={-2.1}
            value={2219}
            style={{ height: '100%' }}
          />
        </Col>
        <Col xs={24} lg={24}>
          <VisitorsChartCard />
        </Col>
      </Row>
    </div>
  );
};
