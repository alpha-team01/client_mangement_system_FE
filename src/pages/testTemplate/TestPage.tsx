import { Col, Divider, Row } from 'antd';
import { StatsCard } from '../../components/dashboard/marketing/StatsCard/StatsCard';

export const TestPage = () => {
  return (
    <Row justify="space-between">
      <Col span={6} xs={24} sm={12} md={6} lg={5}>
        <StatsCard
          data={[274, 337, 81, 497]}
          diff={12.5}
          title="Exams"
          value={16826}
        />
      </Col>
      
      <Col span={6} xs={24} sm={12} md={6} lg={5}>
        <StatsCard
          data={[274, 337, 81, 497]}
          diff={12.5}
          title="Ongoing Exams"
          value={16826}
        />
      </Col>
      <Col span={6} xs={24} sm={12} md={6} lg={5}>
        <StatsCard
          data={[274, 337, 81, 497]}
          diff={12.5}
          title="Students"
          value={16826}
        />
      </Col>
      <Col span={6} xs={24} sm={12} md={6} lg={5}>
        <StatsCard
          data={[274, 337, 81, 497]}
          diff={12.5}
          title="Submissions"
          value={16826}
        />
      </Col>
    </Row>
  );
};
