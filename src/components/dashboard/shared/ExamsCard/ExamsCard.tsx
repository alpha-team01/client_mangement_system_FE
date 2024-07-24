import {
  Card as AntdCard,
  CardProps,
  Descriptions,
  DescriptionsProps,
  Flex,
  Tooltip,
  Typography,
} from 'antd';
import {
  CalendarOutlined,
  ClockCircleOutlined,
  UsergroupAddOutlined,
} from '@ant-design/icons';
import { Exams } from '../../../../types';

import './styles.css';

const { Text, Title } = Typography;

type Props = {
  exams: Exams;
  size?: 'small' | 'default';
} & CardProps;

export const ExamsCard = (props: Props) => {
  const {
    size,
    exams: {
      exam_id,
      exam_name,
      exam_type,
      exam_date,
      exam_duration,
      exam_status,
      exam_subject,
      exam_description,
      exam_location,
      exam_category,
      exam_priority,
      exam_proctors,
      exam_start_date,
      exam_end_date,
    },
    ...others
  } = props;

  const items: DescriptionsProps['items'] = [
    {
      key: 'exam_name',
      label: 'Exam Name',
      children: (
        <span className="text-capitalize">{exam_name.slice(0, 36)}...</span>
      ),
      span: 24,
    },
    {
      key: 'exam_type',
      label: 'Exam Type',
      children: exam_type,
      span: 24,
    },
    {
      key: 'exam_date',
      label: 'Exam Date',
      children: exam_date,
      span: 24,
    },
    {
      key: 'exam_duration',
      label: 'Exam Duration',
      children: <span className="text-capitalize">{exam_duration}</span>,
      span: 24,
    },
    {
      key: 'exam_location',
      label: 'Location',
      children: exam_location,
      span: 24,
    },
    // {
    //   key: 'project_priority',
    //   label: 'Priority',
    //   children: <span className="text-capitalize">{priority}</span>,
    // },
    // {
    //   key: 'project_status',
    //   label: 'Status',
    //   children: <span className="text-capitalize">{status}</span>,
    // },
    // {
    //   key: 'team_size',
    //   label: <UsergroupAddOutlined />,
    //   children: (
    //     <Tooltip title="Team size">
    //       <Typography.Text>{team_size}</Typography.Text>
    //     </Tooltip>
    //   ),
    // },
    {
      key: 'period',
      label: <ClockCircleOutlined />,
      children: (
        <Tooltip title="Project duration (months)">
          <Typography.Text>{exam_duration}</Typography.Text>
        </Tooltip>
      ),
    },
    {
      key: 'end_date',
      label: <CalendarOutlined />,
      children: (
        <Tooltip title="Project end date">
          <Typography.Text>{exam_end_date}</Typography.Text>
        </Tooltip>
      ),
    },
  ];

  return size === 'small' ? (
    <AntdCard
      bordered
      hoverable={true}
      className="project-small-card"
      {...others}
    >
      <Title level={5} className="text-capitalize m-0">
        {exam_name.slice(0, 15)}
      </Title>
      <br />
      <Flex wrap="wrap" gap="small" className="text-capitalize">
        <Text>
          Exam name: <b>{exam_name},</b>
        </Text>
        <Text>
          Exam Date: <b>{exam_date},</b>
        </Text>
        <Text>
          Exam Description: <b>{exam_description},</b>
        </Text>
        <Text>
          Type: <b>{exam_category},</b>
        </Text>
        <Text>
          Location: <b>{exam_location}</b>
        </Text>
      </Flex>
    </AntdCard>
  ) : (
    <AntdCard bordered hoverable={true} {...others}>
      <Descriptions
        items={items}
        column={{ xxl: 2, xl: 2, lg: 2, md: 1, sm: 1, xs: 1 }}
      />
    </AntdCard>
  );
};
