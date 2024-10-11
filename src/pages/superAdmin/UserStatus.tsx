import {
    Button,
    Col,
    Form,
    Input,
    Row,
    Modal 
  } from "antd";
  
  import { Card } from "../../components";
  import {
      EditFilled,
    EditOutlined,
    KeyOutlined,
    SaveOutlined,
  } from "@ant-design/icons";
  import { useStylesContext } from "../../context";
  import { message } from "antd";
import { useEffect, useState } from "react";
import { userRegistration } from "../../api/services/Admin";
import { User } from "../../types/user";
import { useLocation } from "react-router-dom";
import { KeyBindings } from "@antv/xflow-core";
  
  type FieldType = {
    fullName?:string,
    email?:string,
    password?:string,
  };
  
  
  export const UserStatus = () => {
    const location = useLocation();
    const [fullName,setFullname] = useState("");
    const [email,setemail] = useState("");
    const [password,setpassword] = useState("");
    const [iseditable,setiseditable] = useState(true)

    const [isModalOpen, setIsModalOpen] = useState(false);

     const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    useEffect(() => {
        const { user } = location.state as { user: User };
        console.log("location", user);

        setFullname(user.name)
        console.log("FullName",fullName)
        setemail(user.email)
        console.log("Email",email)
        // const customerStatus = toLower(customer.status.title);
        
        // if (customerStatus === "registered") {
        //   setCurrent(0);
        // } else if (customerStatus === "offer information") {
        //   setCurrent(1);
        // } else if (customerStatus === "work permit details") {
        //   setCurrent(2);
        // } else if (customerStatus === "visa information") {
        //   setCurrent(3);
        // }
    
      }, [location]);

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
    
    const handleEditClick = () => {
        setiseditable(!iseditable)
        console.log("editable", iseditable)
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
              initialValues={{
                fullName:fullName,
                email:email,
              }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="on"
              requiredMark={false}
            >
              <Row gutter={[20, 0]}>
                <Col sm={10} lg={12}>
                  <Form.Item<FieldType>
                    label="Full Name"
                    name= "fullName"
                    rules={[
                      {
                        required: true,
                        message: "Please Enter Your Full Name",
                      },
                    ]}
                  >
                    <Input placeholder={fullName} disabled={iseditable}/>
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
                    <Input placeholder={email} disabled={iseditable}/>
                  </Form.Item>
                </Col>
              </Row>
  
              <Form.Item>
                <Button type="primary" htmlType="submit" icon={<SaveOutlined />}>
                  Save changes
                </Button>
                <Button  icon={<EditOutlined />} onClick={handleEditClick} type="primary">
                  {iseditable ? "Edit" : "Cancel Edit"} 
                </Button>
                <Button  icon={<KeyOutlined />} onClick={showModal} type="primary">
                  Change Password 
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Col>
      </Row>
      <Modal title="Change Your Password" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
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
              <Row gutter={[40, 0]}>
                <Col sm={20} lg={40}>
                  <Form.Item<FieldType>
                    label="Type New Password"
                    name= "password"
                    rules={[
                      {
                        required: true,
                        message: "Please Enter Your New Password",
                      },
                    ]}
                  >
                    <Input placeholder={"New Password"}/>
                  </Form.Item>
                </Col>
                </Row>
                </Form>
                </Card>
                </Col>
                </Row>
      </Modal>
      </div>
    );
  };
  