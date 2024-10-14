import { Button, Col, Form, Input, message, Row } from 'antd';
import { Card } from '../../components';
import { SaveOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import { updateUsersAccountDetails } from '../../api/services/Common';
import { useAuth } from '../../context/AuthContext';

type FieldType = {
  firstName?: string;
  lastName?: string;
  email?: string;
};


export const UserProfileDetailsPage = () => {
  const { user, setUser } = useAuth();

  const [saveBtnLoading, setSaveBtnLoading] = useState(false);
  
  const [form] = Form.useForm();
  
  useEffect(() => {
    form.setFieldsValue({
      firstName: user?.firstName,
      lastName: user?.lastName,
      email: user?.email,
    });
  }, [form]);

  const onFinish = async (values: any) => {
    setSaveBtnLoading(true);
    console.log('Succeswwes:', values);

    try {
      const updateUserResponse = await updateUsersAccountDetails(values, user?.id);

      if (updateUserResponse.httpStatusCode === 200) {
        console.log('Success:', updateUserResponse.data);
        // Update the user in local storage to set the new values which doesnt come from the response
        const updatedUser = { ...user, ...values };
        localStorage.setItem('user', JSON.stringify(updatedUser));
        setUser(updatedUser);

        form.setFieldsValue({
          firstName: updatedUser?.firstName,
          lastName: updatedUser?.lastName,
          email: updatedUser?.email
        });
      } else {
        console.log('Failed:', updateUserResponse);
      }

      message.success('User details updated successfully');
    } catch (error) {
      console.log('Failed:', error);

      // Show error message
      message.error("Failed to update user's details");
    } finally {
      setSaveBtnLoading(false);
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Card>
      <Form
        name="user-profile-details-form"
        layout="vertical"
        form={form}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="on"
        requiredMark={false}
      >
        <Row gutter={[16, 0]}>
          <Col sm={24} lg={12}>
            <Form.Item<FieldType>
              label="First name"
              name="firstName"
              rules={[
                { required: true, message: 'Please input your first name!' },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          
          <Col sm={24} lg={12}>
            <Form.Item<FieldType>
              label="Last name"
              name="lastName"
              rules={[
                { required: true, message: 'Please input your last name!' },
              ]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col sm={24} lg={12}>
            <Form.Item<FieldType>
              label="Email"
              name="email"
              rules={[{ required: true, message: 'Please input your email!' }]}
            >
              <Input />
            </Form.Item>
          </Col>
          
        </Row>

        <Form.Item>
          <Button type="primary" htmlType="submit" icon={<SaveOutlined />} loading={saveBtnLoading}>
            Save changes
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};
