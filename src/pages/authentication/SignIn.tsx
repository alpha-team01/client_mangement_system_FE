import {
  Button,
  Checkbox,
  Col,
  Divider,
  Flex,
  Form,
  Input,
  message,
  Row,
  theme,
  Typography,
} from "antd";
import { Logo } from "../../components";
import { useMediaQuery } from "react-responsive";
import { PATH_AUTH } from "../../constants/routes";
import { useCallback, useState } from "react";
import React from "react";
import { postSignIn } from "../../api/services/Auth";
import { useAuth } from "../../context/AuthContext";

const { Title, Text, Link } = Typography;

type FieldType = {
  email?: string;
  password?: string;
  remember?: boolean;
};

export const SignInPage = React.memo(() => {
  const {
    token: { colorPrimary },
  } = theme.useToken();

  const isMobile = useMediaQuery({ maxWidth: 769 });

  const [loading, setLoading] = useState(false);


  const {login} = useAuth();

  const onFinish = async (values: any) => {
    console.log("Success:", values);

    setLoading(true);

    postSignIn(values)
      .then((res) => {
        if (res.status === 200) {
          console.log('Success:', res.data);
          login(res.data.responseObject);
          message.success('Login successful');
        } else {
          message.error('Login failed');
        }
      })
      .catch((error) => {
        console.log('Failed:', error);
        if (error.response && error.response.status === 400) {
          message.error('Invalid credentials. Please try again.');
        } else {
          message.error('An error occurred. Please try again.');
        }
      })
      .finally(() => {
        setLoading(false);
      });
        
  }

  const onFinishFailed = useCallback((errorInfo: any) => {
    console.log("Failed:", errorInfo);
  }, []);


  return (
    <Row style={{ minHeight: isMobile ? "auto" : "100vh", overflow: "hidden" }}>
      <Col xs={24} lg={12}>
        <Flex
          vertical
          align="center"
          justify="center"
          className="text-center"
          style={{ background: colorPrimary, height: "100%", padding: "1rem" }}
        >
          <Logo color="white" />
          <Title level={2} className="text-white">
            Welcome back to Client Management System
          </Title>
          <Text className="text-white" style={{ fontSize: 18 }}>
            Log in to start your journey with our secure and seamless client management platform.
          </Text>
        </Flex>
      </Col>
      <Col xs={24} lg={12}>
        <Flex
          vertical
          align={isMobile ? "center" : "flex-start"}
          justify="center"
          gap="middle"
          style={{ height: "100%", padding: "2rem" }}
        >
          <Title className="m-0">Login</Title>
          <Flex gap={4}>
            <Text>Don't have an account?</Text>
            <Link href={PATH_AUTH.signup}>Create an account here</Link>
          </Flex>
          <Form
            name="sign-up-form"
            layout="vertical"
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            requiredMark={false}
          >
            <Row gutter={[8, 0]}>
              <Col xs={24}>
                <Form.Item<FieldType>
                  label="Email"
                  name="email"
                  rules={[
                    { required: true, message: "Please input your email" },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col xs={24}>
                <Form.Item<FieldType>
                  label="Password"
                  name="password"
                  rules={[
                    { required: true, message: "Please input your password!" },
                  ]}
                >
                  <Input.Password />
                </Form.Item>
              </Col>
              <Col xs={24}>
                <Form.Item<FieldType> name="remember" valuePropName="checked">
                  <Checkbox>Remember me</Checkbox>
                </Form.Item>
              </Col>
            </Row>
            <Form.Item>
              <Flex align="center" justify="space-between">
                <Button
                  type="primary"
                  htmlType="submit"
                  size="middle"
                  loading={loading}
                >
                  Continue
                </Button>
                <Link href={PATH_AUTH.passwordReset}>Forgot password?</Link>
              </Flex>
            </Form.Item>
          </Form>
        </Flex>
      </Col>
    </Row>
  );
});
