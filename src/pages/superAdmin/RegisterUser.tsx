import {
    Button,
    Col,
    Form,
    Input,
    Row,
  } from "antd";
  
  import { Card } from "../../components";
  import {
    SaveOutlined,
  } from "@ant-design/icons";
  import { useStylesContext } from "../../context";
  import { message } from "antd";
// import { registerUser } from "../../api/services/DataEntry";
import axios from "axios";
import { useEffect, useState } from "react";
import { userRegistration } from "../../api/services/Admin";
import { User } from "../../types/user";
import { useLocation } from "react-router-dom";
  
  type FieldType = {
    firstName?:string,
    lastName?:string,
    email?:string,
    password?:string,
  };
  
  
  export const RegisterUser = () => {
    

    const context = useStylesContext();
    const onFinish = async (values: any) => {
      console.log("Success:", values);

      try {
       userRegistration(values).then((res) => {
        if (res.status === 200) {
            console.log('Success:', res.data);
          } else {
            message.error('Login failed');
          }
        })
  
        // const res = await registerUser(values);
        // console.log(res);
      } catch (error) {
        console.error("Failed to register", error);
        message.error("registration failed");
      } finally {
        // setLoading(false);
      }
    };
  
    const onFinishFailed = (errorInfo: any) => {
      console.log("Failed:", errorInfo);
    };
    
    return (
        <div>
        <h1>Register User</h1>
      <Row {...context?.rowProps}>
        <Col span={24}>
          <Card title="">
            <Form
              name="user-profile-address-form"
              layout="vertical"
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="on"
              requiredMark={false}
            >
              <Row gutter={[20, 0]}>
                <Col sm={10} lg={12}>
                  <Form.Item<FieldType>
                    label="First Name"
                    name="firstName"
                    rules={[
                      {
                        required: true,
                        message: "Please Enter Your First Name",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col sm={10} lg={12}>
                  <Form.Item<FieldType>
                    label="last Name"
                    name="lastName"
                    rules={[
                      {
                        required: true,
                        message: "Please Enter Your Last Name",
                      },
                    ]}
                  >
                    <Input  />
                  </Form.Item>
                </Col>
                <Col sm={10} lg={12}>
                  <Form.Item<FieldType>
                    label="Email"
                    name="email"
                    rules={[
                      { required: true, message: "Please enter Email" },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col sm={10} lg={12}>
                  <Form.Item<FieldType>
                    label="Password"
                    name="password"
                    rules={[
                      { required: true, message: "Please enter Password" },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </Col>

                
              </Row>
  
              <Form.Item>
                <Button type="primary" htmlType="submit" icon={<SaveOutlined />}>
                  Save changes
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Col>
      </Row>
      </div>
    );
  };
  