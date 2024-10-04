import {
    Button,
    Col,
    DatePicker,
    Form,
    Input,
    Row,
  } from "antd";
  
  import { Card } from "../../components";
  import {
    SaveOutlined,
  } from "@ant-design/icons";
  import { useStylesContext } from "../../context";
  import { UploadOutlined } from "@ant-design/icons";
  import type { UploadProps } from "antd";
  import { message, Upload } from "antd";
import { registerUser } from "../../api/services/DataEntry";
import axios from "axios";
import { useState } from "react";
  
  const SOCIALS = [
    "Facebook",
    "Instagram",
    "Twitter",
    "LinkedIn",
    "Mastodon",
    "Threads",
    "YouTube",
    "WhatsApp",
    "Tiktok",
    "Telegram",
    "QQ",
    "WeChat",
  ];
  
  type FieldType = {
    passNum?: string;
    prIssueDate?: string;
    passUrl?: string;
    prUrl?: string;
    CVurl?: string;
    BcUrl?:string;
    photoUrl?: boolean;
  };
  
  
  export const CustomerRegistration = () => {

    const [passNum,setpassNum] = useState("");
    const [prIssueDate,setprIssueDate] = useState("");
    const [passUrl,setpassUrl] = useState("");
    const [prUrl,setprUrl] = useState("");
    const [CVUrl,setCVUrl] = useState("");
    const [BCUrl,setBCUrl] = useState("");
    const [photoUrl,setphotoUrl] = useState("");
    const [roleId,setroleId] = useState(0);
    const [stateID,setstateID] = useState(0);

    const context = useStylesContext();
    const onFinish = async (values: any) => {
      console.log("Success:", values);

      try {
        const apiUrl = "https://cms-sys-1c02ac3c74f6.herokuapp.com/cmSys/api/user/login";
        axios.post(apiUrl, {
          // headers: {
          //   'Content-Type': "application/json"
          // }
            passportNumber: passNum,
            policeReportIssueDate: prUrl,
            passportDocUrl: passUrl,
            policeReportDocUrl: prUrl,
            cvUrl: CVUrl,
            birthCertificateDoUrl: BCUrl,
            photoUrl: photoUrl,
            roleId: roleId,
            stateId: stateID
        }).then((res) => {
          console.log(res);
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
    const props: UploadProps = {
      name: "file",
      action: "https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload",
      headers: {
        authorization: "authorization-text",
      },
      onChange(info) {
        if (info.file.status !== "uploading") {
          console.log(info.file, info.fileList);
        }
        if (info.file.status === "done") {
          message.success(`${info.file.name} file uploaded successfully`);
        } else if (info.file.status === "error") {
          message.error(`${info.file.name} file upload failed.`);
        }
      },
    };
    return (
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
                    label="Passport No"
                    name="passNum"
                    rules={[
                      {
                        required: true,
                        message: "Please Enter Your Passport Number",
                      },
                    ]}
                  >
                    <Input onChange={(e) => setpassNum(e.target.value)} />
                  </Form.Item>
                </Col>
                <Col sm={10} lg={12}>
                  <Form.Item<FieldType>
                    label="Passport"
                    name="passUrl"
                    rules={[
                      { required: true, message: "Please enter your city!" },
                    ]}
                  >
                    {/* <Upload {...props}>
                      <Button icon={<UploadOutlined />}>Click to Upload</Button>
                    </Upload> */}
                    <Input onChange={(e) => setpassUrl(e.target.value)} />
                  </Form.Item>
                </Col>
                <Col sm={10} lg={12}>
                  <Form.Item<FieldType>
                    label="Police Report Issue Date"
                    name="prIssueDate"
                    rules={[
                      {
                        required: true,
                        message: "Please Pick a date",
                      },
                    ]}
                  >
                    {/* <DatePicker onChange={(e) => setprIssueDate(e.target.value)} /> */}
                    <Input onChange={(e) => setprIssueDate(e.target.value)} />
                  </Form.Item>
                </Col>
                <Col sm={10} lg={12}>
                  <Form.Item<FieldType>
                    label="Police Report"
                    name="prUrl"
                    rules={[
                      {
                        required: false,
                        message: "Please enter your address line!",
                      },
                    ]}
                  >
                    {/* <Upload {...props}>
                      <Button icon={<UploadOutlined />}>Click to Upload</Button>
                    </Upload> */}
                    <Input onChange={(e) => setprUrl(e.target.value)} />
                  </Form.Item>
                </Col>
                <Col sm={10} lg={12}>
                  <Form.Item<FieldType>
                    label="CV"
                    name="CVurl"
                    rules={[
                      {
                        required: true,
                        message: "Please enter your postal code!",
                      },
                    ]}
                  >
                    {/* <Upload {...props}>
                      <Button icon={<UploadOutlined />}>Click to Upload</Button>
                    </Upload> */}
                    <Input onChange={(e) => setCVUrl(e.target.value)} />
                  </Form.Item>
                </Col>
                <Col sm={10} lg={12}>
                  <Form.Item<FieldType>
                    label="Birth Certificate"
                    name="BcUrl"
                    rules={[
                      {
                        required: true,
                        message: "Please enter your postal code!",
                      },
                    ]}
                  >
                    {/* <Upload {...props}>
                      <Button icon={<UploadOutlined />}>Click to Upload</Button>
                    </Upload> */}
                    <Input onChange={(e) => setBCUrl(e.target.value)} />
                  </Form.Item>
                </Col>
                <Col sm={10} lg={12}>
                  <Form.Item<FieldType>
                    label="Photo"
                    name="photoUrl"
                    rules={[
                      {
                        required: true,
                        message: "Please enter your postal code!",
                      },
                    ]}
                  >
                    <Input onChange={(e) => setphotoUrl(e.target.value)} />
                    {/* <Upload {...props}>
                      <Button icon={<UploadOutlined />}>Click to Upload</Button>
                    </Upload> */}
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
    );
  };
  