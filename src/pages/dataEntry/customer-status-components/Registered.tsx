import { UploadOutlined, SaveOutlined } from "@ant-design/icons";
import {
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
import { useEffect, useState } from "react";

type FieldType = {
  passportNumber?: string;
  passport?: string;
  policeReportIssueDate?: string;
  policeReport?: string;
  cv?: string;
  birthCertificate?: string;
  photo?: string;
};

type RegisteredProps = {
  data?: RegistrationDetails; // Pass customer data here
};

export const Registered = ({ data }: RegisteredProps) => {
  const context = useStylesContext();
  const [isEditable,  setIsEditable] = useState<boolean>(false);

  const [form] = Form.useForm();

  const handleSaveChanges = (values: any) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  // Update form fields when data is available/fetched
  useEffect(() => {
    if (data) {
      form.setFieldsValue({
        passportNumber: data.passportNumber,
        policeReportIssueDate: data.policeReportIssueDate,
        // Other fields as needed
      });
    }
  }, [data, form]);


  return (
    <Row {...context?.rowProps}>
      <Col span={24}>
        <Card style={{ backgroundColor: "#fff" }}>
          <Form
            form={form}
            name="user-profile-address-form"
            layout="vertical"
            onFinish={handleSaveChanges}
            onFinishFailed={onFinishFailed}
            autoComplete="on"
            requiredMark={false}
          >
            <Row gutter={[20, 0]}>
              <Col sm={10} lg={12}>
                <Form.Item<FieldType>
                  label="Passport No"
                  name="passportNumber"
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
                  name="passport"
                  rules={[
                    { required: true, message: "Please upload your passport!" },
                  ]}
                >
                  {data?.passportDocUrl ? (
                    <a href={data.passportDocUrl} target="_blank" rel="noopener noreferrer">
                      View Passport
                    </a>
                  ) : (
                    <Upload disabled={!isEditable}>
                      <Button icon={<UploadOutlined />}>Click to Upload</Button>
                    </Upload>
                  )}
                </Form.Item>
              </Col>

              <Col sm={10} lg={12}>
                <Form.Item<FieldType>
                  label="Police Report Issue Date"
                  name="policeReportIssueDate"
                  rules={[
                    {
                      required: true,
                      message: "Please enter the Police Report Issue Date",
                    },
                  ]}
                >
                  <Input disabled={!isEditable} />
                </Form.Item>
              </Col>

              <Col sm={10} lg={12}>
                <Form.Item<FieldType>
                  label="Police Report"
                  name="policeReport"
                  rules={[
                    { required: true, message: "Please upload your police report!" },
                  ]}
                >
                  {data?.policeReportDocUrl ? (
                    <a href={data.policeReportDocUrl} target="_blank" rel="noopener noreferrer">
                      View Police Report
                    </a>
                  ) : (
                    <Upload disabled={!isEditable}>
                      <Button icon={<UploadOutlined />}>Click to Upload</Button>
                    </Upload>
                  )}
                </Form.Item>
              </Col>

              <Col sm={10} lg={12}>
                <Form.Item<FieldType>
                  label="CV"
                  name="cv"
                  rules={[
                    { required: true, message: "Please upload your CV!" },
                  ]}
                >
                  {data?.cvUrl ? (
                    <a href={data.cvUrl} target="_blank" rel="noopener noreferrer">
                      View CV
                    </a>
                  ) : (
                    <Upload disabled={!isEditable}>
                      <Button icon={<UploadOutlined />}>Click to Upload</Button>
                    </Upload>
                  )}
                </Form.Item>
              </Col>

              <Col sm={10} lg={12}>
                <Form.Item<FieldType>
                  label="Birth Certificate"
                  name="birthCertificate"
                  rules={[
                    { required: true, message: "Please upload your birth certificate!" },
                  ]}
                >
                  {data?.birthCertificateDoUrl ? (
                    <a href={data.birthCertificateDoUrl} target="_blank" rel="noopener noreferrer">
                      View Birth Certificate
                    </a>
                  ) : (
                    <Upload disabled={!isEditable}>
                      <Button icon={<UploadOutlined />}>Click to Upload</Button>
                    </Upload>
                  )}
                </Form.Item>
              </Col>

              <Col sm={10} lg={12}>
                <Form.Item<FieldType>
                  label="Photo"
                  name="photo"
                  rules={[
                    { required: true, message: "Please upload your photo!" },
                  ]}
                >
                  {data?.photoUrl ? (
                    <a href={data.photoUrl} target="_blank" rel="noopener noreferrer">
                      View Photo
                    </a>
                  ) : (
                    <Upload disabled={!isEditable}>
                      <Button icon={<UploadOutlined />}>Click to Upload</Button>
                    </Upload>
                  )}
                </Form.Item>
              </Col>
            </Row>

            {isEditable ? (
              <Form.Item>
                <Button type="primary" htmlType="submit" icon={<SaveOutlined />} onClick={handleSaveChanges}>
                  Save changes
                </Button>
              </Form.Item>
            ) : (
              <Button
                type="primary"
                onClick={() => setIsEditable(true)}
              >
                Edit
              </Button>
            )
            }
          </Form>
        </Card>
      </Col>
    </Row>
  );
};
