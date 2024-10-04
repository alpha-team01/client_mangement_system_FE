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
import {
  FacebookFilled,
  GoogleOutlined,
  TwitterOutlined,
} from "@ant-design/icons";
import { Logo } from "../../components";
import { useMediaQuery } from "react-responsive";
import { PATH_AUTH } from "../../constants/routes";
import { useNavigate } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import { doGoogleSignIn, doSignInWithEmailAndPassword } from "../../firebase/auth";
import { useAuth } from "../../context/authContext/authContext";
import React from "react";
import { PATH_ADMIN } from "../../constants/routes";
import { postSignIn } from "../../api/services/Auth";
import axios from "axios";

const { Title, Text, Link } = Typography;

type FieldType = {
  email?: string;
  password?: string;
  remember?: boolean;
};

export const SignInPage = React.memo(() => {
  const auth = useAuth();
  const userLoggedIn = auth?.userLoggedIn;

  const {
    token: { colorPrimary },
  } = theme.useToken();
  const isMobile = useMediaQuery({ maxWidth: 769 });
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);



  const onFinish = async (values: any) => {
    console.log("Success:", values);
    setLoading(true);

    try {
      // const apiUrl = "https://cms-sys-1c02ac3c74f6.herokuapp.com/cmSys/api/user/login";
      // axios.post(apiUrl, values, {
      //   headers: {
      //     'Content-Type': "application/json"
      //   }
      // }).then((res) => {
      //   console.log(res);
      // })

      const res = await postSignIn(values);
      console.log(res);
    } catch (error) {
      console.error("Failed to sign in", error);
      message.error("Login failed");
    } finally {
      setLoading(false);
    }
        
  }

  const onFinishFailed = useCallback((errorInfo: any) => {
    console.log("Failed:", errorInfo);
  }, []);

  const onFinishGoogle = useCallback( async () => {
    setGoogleLoading(true);
    
    try {
      await doGoogleSignIn();
      if (auth?.userLoggedIn) {
        navigate(PATH_ADMIN.index);
      } else {
        throw new Error("Login failed");
      }
    } catch (error) {
      console.error("Failed to sign in", error);
      message.error("Login failed");
    } finally {
      setGoogleLoading(false);
    }
  }, [auth, navigate]);

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
          <Divider className="m-0">or</Divider>
          <Flex
            vertical={isMobile}
            gap="small"
            wrap="wrap"
            style={{ width: "100%" }}
          >
            <Button icon={<GoogleOutlined />} onClick={onFinishGoogle} loading={googleLoading}>Sign in with Google</Button>
            <Button icon={<FacebookFilled />}>Sign in with Facebook</Button>
            <Button icon={<TwitterOutlined />}>Sign in with Twitter</Button>
          </Flex>
        </Flex>
      </Col>
    </Row>
  );
});
