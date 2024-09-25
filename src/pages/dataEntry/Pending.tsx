import {
  Row,
  Col,
  Card,
  Form,
  Upload,
  Button,
  UploadProps,
  message,
  Flex,
  Table,
  TableProps,
  ConfigProvider,
} from "antd";
import { PlusCircleOutlined, UploadOutlined } from "@ant-design/icons";
import { useState } from "react";
import { ColumnsType, TableRowSelection } from "antd/es/table/interface";
import { set } from "lodash";

interface DataType {
  payment: string;
  amount: number;
  date: string;
}

const data: DataType[] = [];
for (let i = 1; i <= 5; i++) {
  data.push({ payment: "Payment " + i, amount: 100000, date: "2021-11-10" });
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

export const Pending = () => {
  const [totalAmount] = useState<number>(300000);
  const [firstPayment] = useState<number>(100000);
  const [remainingAmount, setRemainingAmount] = useState<number>(200000);
  const [bordered, setBordered] = useState(false);
  const [showHeader, setShowHeader] = useState(false);
  const [showFooter, setShowFooter] = useState(true);
  const [rowSelection, setRowSelection] = useState<
    TableRowSelection<DataType> | undefined
  >(undefined);
  const [tableLayout, setTableLayout] = useState();
  const [yScroll, setYScroll] = useState(true);

  const handleAmountChange = (value: number) => {
    setRemainingAmount(totalAmount - firstPayment - value);
  };

  const handleRemainingAmountChange = (value: number) => {
    setRemainingAmount(value);
  };

  const handleYScrollChange = (enable: boolean) => {
    setYScroll(enable);
  };

  const defaultFooter = () => {
    return <div>Remaining Amount: {remainingAmount}</div>;
  }

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

  const scroll: { y?: number | string } = {};
  if (yScroll) {
    scroll.y = 300;
  }

  const tableProps: TableProps<DataType> = {
    bordered,
    showHeader,
    footer: showFooter ? defaultFooter : undefined,
    rowSelection,
    scroll,
    tableLayout,
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
                    name="country"
                    rules={[
                      {
                        required: true,
                        message: "Please Attach your Offer Letter",
                      },
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
                    name="country"
                    rules={[
                      {
                        required: true,
                        message: "Please Attach your Payment Slip",
                      },
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
                  <Form.Item name="country">
                    <Upload {...props}>
                      <Button icon={<PlusCircleOutlined />}>
                        Add another payment
                      </Button>
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
                  scroll={scroll}
                />
              </ConfigProvider>
            </Flex>
          </Col>
        </Row>
      </Card>
    </>
  );
};


// payment model