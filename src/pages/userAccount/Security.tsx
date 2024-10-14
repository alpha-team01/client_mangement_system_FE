import {
  Button,
  Col,
  Form,
  Input,
  Row,
} from 'antd';
import { useStylesContext } from '../../context';
import { Card } from '../../components';
import {
  SaveOutlined,
} from '@ant-design/icons';


const onFinish = (values: any) => {
  console.log('Success:', values);
};

const onFinishFailed = (errorInfo: any) => {
  console.log('Failed:', errorInfo);
};

type FieldType = {
  currentPassword?: string;
  newPassword?: string;
  reEnterPassword?: string;
};

export const UserProfileSecurityPage = () => {
  const stylesContext = useStylesContext();

  return (
    <Row {...stylesContext?.rowProps}>
      <Col span={24}>
        <Card title="Change your password">
          <Form
            name="form-change-password"
            layout="vertical"
            labelCol={{ span: 8 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            requiredMark={false}
          >
            <Form.Item<FieldType>
              label="Current password"
              name="currentPassword"
              rules={[
                {
                  required: true,
                  message: 'Please input your current password!',
                },
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item<FieldType>
              label="New password"
              name="newPassword"
              rules={[
                { required: true, message: 'Please input your new password!' },
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item<FieldType>
              label="Reenter password"
              name="reEnterPassword"
              rules={[
                {
                  required: true,
                  message: 'Please re-input your new password!!',
                },
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" icon={<SaveOutlined />}>
                Save changes
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </Col>
    </Row>
  );
};
