import { UploadOutlined } from "@ant-design/icons";
import type { UploadProps } from "antd";
import { message, Upload } from "antd";

import {
  Button,
  Col,
  Form,
  Row,
} from "antd";
import { Card } from "../../components";
import { useStylesContext } from "../../context";

export const WorkPermitDetails = () => {
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
            requiredMark={true}
          >
            <Row gutter={[20, 0]}>
              <Col sm={10} lg={12}>
                <Form.Item
                  label="Attach Work Permit"
                  name="country"
                  rules={[
                    {
                      required: true,
                      message: "Please Attach you Work Permit",
                    },
                  ]}
                >
                  <Upload {...props}>
                    <Button icon={<UploadOutlined />}>Click to Upload</Button>
                  </Upload>
                </Form.Item>
              </Col>
              <Col sm={10} lg={12}>
                <Form.Item
                  label="Add Slip"
                  name="country"
                  rules={[
                    {
                      required: true,
                      message: "Please Attach your Slip",
                    },
                  ]}
                >
                  <Upload {...props}>
                    <Button icon={<UploadOutlined />}>Click to Upload</Button>
                  </Upload>
                </Form.Item>
              </Col>
            </Row>
            
          </Form>
        </Card>
      </Col>
    </Row>
  );
};
