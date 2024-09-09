import {
  Button,
  Checkbox,
  Col,
  DatePicker,
  Flex,
  Form,
  Input,
  Row,
  Select,
} from "antd";

import { Card } from "../../components";
import {
  MinusCircleOutlined,
  PlusOutlined,
  SaveOutlined,
  StarFilled,
} from "@ant-design/icons";
import { useStylesContext } from "../../context";
import * as dayjs from "dayjs";
import { UploadOutlined } from "@ant-design/icons";
import type { UploadProps } from "antd";
import { message, Upload } from "antd";

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
  country?: string;
  addressLine1?: string;
  addressLine2?: string;
  city?: string;
  postalCode?: string;
  preferred?: boolean;
};

type BirthdayFieldType = {
  dob?: string;
};

export const UserProfileInformationPage = () => {
  const context = useStylesContext();
  const onFinish = (values: any) => {
    console.log("Success:", values);
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
            initialValues={{
              country: "Kenya",
              addressLine1: "828, 18282 ABC Drive, XYZ Rd",
              city: "Nairobi",
              postalCode: "00100",
              preferred: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="on"
            // requiredMark={false}
          >
            <Row gutter={[20, 0]}>
              <Col sm={10} lg={12}>
                <Form.Item<FieldType>
                  label="Passport No"
                  name="country"
                  rules={[
                    {
                      required: true,
                      message: "Please Enter Your Passport Number",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col sm={10} lg={12}>
                <Form.Item<FieldType>
                  label="Passport"
                  name="city"
                  rules={[
                    { required: true, message: "Please enter your city!" },
                  ]}
                >
                  <Upload {...props}>
                    <Button icon={<UploadOutlined />}>Click to Upload</Button>
                  </Upload>
                </Form.Item>
              </Col>
              <Col sm={10} lg={12}>
                <Form.Item<FieldType>
                  label="Police Report Issue Date"
                  name="addressLine1"
                  rules={[
                    {
                      required: true,
                      message: "Please Pick a date",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col sm={10} lg={12}>
                <Form.Item<FieldType>
                  label="Police Report"
                  name="addressLine2"
                  rules={[
                    {
                      required: false,
                      message: "Please enter your address line!",
                    },
                  ]}
                >
                  <Upload {...props}>
                    <Button icon={<UploadOutlined />}>Click to Upload</Button>
                  </Upload>
                </Form.Item>
              </Col>
              <Col sm={10} lg={12}>
                <Form.Item<FieldType>
                  label="CV"
                  name="postalCode"
                  rules={[
                    {
                      required: true,
                      message: "Please enter your postal code!",
                    },
                  ]}
                >
                  <Upload {...props}>
                    <Button icon={<UploadOutlined />}>Click to Upload</Button>
                  </Upload>
                </Form.Item>
              </Col>
              <Col sm={10} lg={12}>
                <Form.Item<FieldType>
                  label="Birth Certificate"
                  name="postalCode"
                  rules={[
                    {
                      required: true,
                      message: "Please enter your postal code!",
                    },
                  ]}
                >
                  <Upload {...props}>
                    <Button icon={<UploadOutlined />}>Click to Upload</Button>
                  </Upload>
                </Form.Item>
              </Col>
              <Col sm={10} lg={12}>
                <Form.Item<FieldType>
                  label="Photo"
                  name="postalCode"
                  rules={[
                    {
                      required: true,
                      // message: "Please enter your postal code!",
                    },
                  ]}
                >
                  <Upload {...props}>
                    <Button icon={<UploadOutlined />}>Click to Upload</Button>
                  </Upload>
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
      {/* <Col sm={24} lg={16}>
        <Card title="Social links">
          <Form
            name="user-profile-social-form"
            onFinish={onFinish}
            autoComplete="off"
          >
            <Form.List name="social-links">
              {(fields, { add, remove }) => (
                <>
                  {fields.map(({ key, name, ...restField }) => (
                    <Flex
                      key={key}
                      align="baseline"
                      gap="small"
                      style={{ marginBottom: 8 }}
                    >
                      <Form.Item
                        {...restField}
                        name={[name, 'social']}
                        rules={[{ required: true, message: 'Missing social' }]}
                        style={{ width: 200 }}
                      >
                        <Select
                          placeholder="social"
                          options={SOCIALS.map((s) => ({ value: s, label: s }))}
                        />
                      </Form.Item>
                      <Form.Item
                        {...restField}
                        name={[name, 'username']}
                        rules={[
                          { required: true, message: 'Missing username' },
                        ]}
                      >
                        <Input placeholder="username" />
                      </Form.Item>
                      <Button
                        type="text"
                        icon={<MinusCircleOutlined />}
                        onClick={() => remove(name)}
                      ></Button>
                    </Flex>
                  ))}
                  <Form.Item>
                    <Button
                      type="default"
                      onClick={() => add()}
                      block
                      icon={<PlusOutlined />}
                    >
                      Add link
                    </Button>
                  </Form.Item>
                </>
              )}
            </Form.List> */}
      {/* <Form.Item>
              <Button type="primary" htmlType="submit" icon={<SaveOutlined />}>
                Save changes
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </Col> */}
      {/* <Col sm={24} lg={8}>
        <Card title="Birthday">
          <Form
            name="user-profile-birhday-form"
            layout="vertical"
            initialValues={{
              dob: dayjs('1996/04/27'),
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="on"
            requiredMark={false}
          >
            <Form.Item<BirthdayFieldType>
              label="Birth date"
              name="dob"
              rules={[
                { required: true, message: 'Please select your birthday!' },
              ]}
            >
              <DatePicker />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" icon={<SaveOutlined />}>
                Save changes
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </Col> */}
    </Row>
  );
};
