import {
  Row,
  Col,
  Card,
  Form,
  Upload,
  Button,
  UploadProps,
  message,
  Table,
  ConfigProvider,
  Flex,
} from "antd";
import { PlusCircleOutlined, UploadOutlined } from "@ant-design/icons";
import { useState } from "react";
import { ColumnsType } from "antd/es/table/interface";
import { StateWiseDocDetails } from '../../../types/customerStatus';

interface DataType {
  key: string;
  payment: string;
  amount: number;
  date: string;
}

const data: DataType[] = [];
for (let i = 1; i <= 5; i++) {
  data.push({ key: `${i}`, payment: "Payment " + i, amount: 100000, date: "2021-11-10" });
}

const columns: ColumnsType<DataType> = [
  {
    title: "Payment",
    dataIndex: "payment",
    key: "payment",
  },
  {
    title: "Amount",
    dataIndex: "amount",
    key: "amount",
  },
  {
    title: "Date",
    dataIndex: "date",
    key: "date",
  },
];

export const Pending = ({data}) => {
  const [totalAmount] = useState<number>(300000);
  const [firstPayment] = useState<number>(100000);
  const [remainingAmount, setRemainingAmount] = useState<number>(200000);
  const [bordered, setBordered] = useState(false);
  const [showHeader, setShowHeader] = useState(false);
  const [showFooter, setShowFooter] = useState(true);

  console.log("data", data);


  // Handle Upload component logic properly with fileList prop
  const [fileList, setFileList] = useState<any[]>([]);

  const props: UploadProps = {
    name: "file",
    action: "https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload",
    headers: {
      authorization: "authorization-text",
    },
    fileList, // Use fileList instead of value
    onChange(info) {
      const { file, fileList: newFileList } = info;
      setFileList(newFileList); // Update fileList when file is uploaded

      if (file.status === "done") {
        message.success(`${file.name} file uploaded successfully`);
      } else if (file.status === "error") {
        message.error(`${file.name} file upload failed.`);
      }
    },
  };

  const defaultFooter = () => <div>Remaining Amount: {remainingAmount}</div>;

  const tableProps = {
    bordered,
    showHeader,
    footer: showFooter ? defaultFooter : undefined,
    dataSource: data,
    columns,
    pagination: false,
  };

  return (
    <>
      <Card style={{ backgroundColor: "#fff", marginTop: "1rem" }}>
        <Row>
          <Col sm={10} lg={12}>
            <Form name="inProgress" layout="vertical">
              <Row gutter={[20, 0]}>
                <Col sm={10} lg={12}>
                  <Form.Item
                    label="Attach Offer Letter"
                    name="offerLetter"
                    rules={[
                      { required: true, message: "Please Attach your Offer Letter" },
                    ]}
                  >
                    <Upload {...props}>
                      <Button icon={<UploadOutlined />}>Click to Upload</Button>
                    </Upload>
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={[20, 0]}>
                <Col sm={10} lg={12}>
                  <Form.Item
                    label="Payment Slip"
                    name="paymentSlip"
                    rules={[
                      { required: true, message: "Please Attach your Payment Slip" },
                    ]}
                  >
                    <Upload {...props}>
                      <Button icon={<UploadOutlined />}>Click to Upload</Button>
                    </Upload>
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={[20, 0]}>
                <Col sm={10} lg={12}>
                  <Form.Item name="additionalPayment">
                    <Upload {...props}>
                      <Button icon={<PlusCircleOutlined />}>Add another payment</Button>
                    </Upload>
                  </Form.Item>
                </Col>
              </Row>
            </Form>
          </Col>

          <Col
            sm={10}
            lg={12}
            style={{
              borderLeft: "2px solid #1890ff",
              padding: "20px",
              display: "flex",
            }}
          >
            <Flex
              // align={"center"}
              justify="center"
              vertical
              style={{ flexGrow: "1" }}
            >
              <ConfigProvider
                theme={{
                  components: {
                    Table: {
                      footerBg: "#f0f2f5",
                    },
                  },
                }}
              >
                <Table
                  {...tableProps}
                  pagination={false}
                  columns={columns}
                  dataSource={data}
                  scroll={{ y: 300 }}
                />
              </ConfigProvider>
            </Flex>
          </Col>
        </Row>
      </Card>
    </>
  );
};
