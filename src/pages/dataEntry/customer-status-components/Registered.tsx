import { UploadOutlined, SaveOutlined } from "@ant-design/icons";
import {
  UploadProps,
  message,
  Row,
  Col,
  Card,
  Input,
  Upload,
  Button,
  Form,
} from "antd";
import { useStylesContext } from "../../../context";
import { RegistrationDetails } from "../../../types";

type FieldType = {
  country: string;
  city: string;
  addressLine1: string;
  addressLine2?: string;
  postalCode: string;
  preferred: boolean;
};

type RegisteredProps = {
  data ?: RegistrationDetails;
  isEditable: boolean; // Prop to control editability
  onSave: () => void;
};

export const Registered = ({data, isEditable, onSave }: RegisteredProps) => {
  const context = useStylesContext();
  const onFinish = (values: any) => {
    console.log("Success:", values);
    onSave();
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
        <Card style={{ backgroundColor: "#fff" }}>
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
            requiredMark={false}
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
                  <Input disabled={!isEditable} />
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
                  <Upload {...props}  disabled={!isEditable}>
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
                  <Input disabled={!isEditable} />
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
                  <Upload {...props}  disabled={!isEditable}>
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
                  <Upload {...props}  disabled={!isEditable}>
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
                  <Upload {...props}  disabled={!isEditable}>
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
                      message: "Please enter your postal code!",
                    },
                  ]}
                >
                  <Upload {...props}  disabled={!isEditable}>
                    <Button icon={<UploadOutlined />}>Click to Upload</Button>
                  </Upload>
                </Form.Item>
              </Col>
            </Row>

            {isEditable && (
              <Form.Item>
                <Button type="primary" htmlType="submit" icon={<SaveOutlined />}>
                  Save changes
                </Button>
              </Form.Item>
            )}
          </Form>
        </Card>
      </Col>
    </Row>
  );
};
