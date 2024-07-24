import {
  Badge,
  BadgeProps,
  Table,
  TableProps,
  Tag,
  TagProps,
  Typography,
} from 'antd';
import { Exams } from '../../../../types';

const COLUMNS = [
  {
    title: 'Name',
    dataIndex: 'exam_name',
    key: 'exam_name',
    render: (_: any, { exam_name }: Exams) => (
      <Typography.Paragraph
        ellipsis={{ rows: 1 }}
        className="text-capitalize"
        style={{ marginBottom: 0 }}
      >
        {exam_name.substring(0, 20)}
      </Typography.Paragraph>
    ),
  },
  {
    title: 'Code',
    dataIndex: 'exam_code',
    key: 'exam_code',
  },
  {
    title: 'Category',
    dataIndex: 'exam_category',
    key: 'exam_category',
    render: (_: any) => <span className="text-capitalize">{_}</span>,
  },
  {
    title: 'Priority',
    dataIndex: 'exam_priority',
    key: 'exam_priority',
    render: (_: any) => {
      let color: TagProps['color'];

      if (_ === 'low') {
        color = 'cyan';
      } else if (_ === 'medium') {
        color = 'geekblue';
      } else {
        color = 'magenta';
      }

      return (
        <Tag color={color} className="text-capitalize">
          {_}
        </Tag>
      );
    },
  },
  {
    title: 'Status',
    dataIndex: 'exam_status',
    key: 'exam_status',
    render: (_: any) => {
      let status: BadgeProps['status'];

      if (_ === 'Upcoming') {
        status = 'default';
      } else if (_ === 'Active') {
        status = 'success';
      } else {
        status = 'processing';
      }

      return <Badge status={status} text={_} className="text-capitalize" />;
    },
  },
  {
    title: 'Start date',
    dataIndex: 'exam_start_date',
    key: 'exam_start_date',
  },
  {
    title: 'End date',
    dataIndex: 'exam_end_date',
    key: 'exam_end_date',
  },
  {
    title: 'No of proctors',
    dataIndex: 'exam_proctors',
    key: 'exam_proctors',
    render: (_: any) => _.length,
  },
];

type Props = {
  data: Exams[];
} & TableProps<any>;

export const ExamsTable = ({ data, ...others }: Props) => {
  return (
    <Table
      dataSource={data}
      columns={COLUMNS}
      className="overflow-scroll"
      {...others}
    />
  );
};
