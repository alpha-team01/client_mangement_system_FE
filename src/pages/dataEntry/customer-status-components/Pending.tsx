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
  Modal,
  Input,
  Space,
} from "antd";
import {
  InboxOutlined,
  PlusCircleOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import { useEffect, useState } from "react";
import { ColumnsType } from "antd/es/table/interface";
import { useLocation } from "react-router-dom";
import { Customer } from "../../../types";
import {
  makeCustomerPayment,
  uploadCustomerPaymentSlip,
  uploadOfferLetter,
  uploadOfferLetterToDb,
} from "../../../api/services/Common";
import { set } from "lodash";

interface DataType {
  key: string;
  payment: string;
  amount: number;
  date: string;
  paymentReceiptUrl?: string;
}

interface PendingProps {
  data: {
    stateWisePaymentDetails: Array<{
      id: string;
      receivedBy: string;
      amount: number;
      receivedDate: string;
    }>;
    totalAmount: number;
    remainingAmount: number;
    docUrl: string;
  };
}

export const Pending = ({ data }: PendingProps) => {
  const [bordered] = useState(false);
  const [showFooter] = useState(true);

  const [paymentModel, setPaymentModel] = useState(false);
  const [offerLetterModal, setOfferLetterModal] = useState(false);
  const [tableData, setTableData] = useState<DataType[]>([]);

  useEffect(() => {
    setTableData(
      data.stateWisePaymentDetails.map((item: any, index: number) => {
        return {
          key: index.toString(),
          payment: item.receivedBy,
          amount: item.amount,
          date: item.receivedDate,
          paymentReceiptUrl: item.paymentReceiptUrl,
        };
      })
    );
  }, []);

  const columns: ColumnsType<DataType> = [
    {
      title: "Payment Received By",
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
    {
      title: "View Slip",
      key: "view",
      render: (text: any, record: DataType) => (
        <Button
          type="link"
          onClick={() => {
            window.open(record.paymentReceiptUrl, "_blank");
          }}
        >
          View
        </Button>
      ),
    },
  ];

  const location = useLocation();
  const [fileList, setFileList] = useState<any[]>([]);

  const { Dragger } = Upload;
  const [paymentForm] = Form.useForm();
  const [offerLetterForm] = Form.useForm();

  // Handle file selection
  const handleBeforeUpload = (file: any) => {
    setFileList([file]); // Keep a single file in the state
    return false; // Prevent automatic upload
  };

  const uploadProps: UploadProps = {
    name: "file",
    multiple: false,
    beforeUpload: handleBeforeUpload, // Update the state with selected file
  };

  const handleAddPayment = () => {
    setPaymentModel(true);
  };

  const handleOfferLetter = () => {
    setOfferLetterModal(true);
  };

  const handleModalClose = () => {
    paymentForm.resetFields();
    setPaymentModel(false);
    setFileList([]); // Reset file list
  };

  const handleOfferLetterClose = () => {
    offerLetterForm.resetFields();
    setOfferLetterModal(false);
    setFileList([]); // Reset file
  };

  const handleOnFinishPayment = async (values: any) => {
    const { customer } = location.state as { customer: Customer };

    if (!fileList.length) return message.error("Please upload a payment slip.");

    try {
      // Upload payment slip and prepare form data
      const paymentSlipUrl = await uploadCustomerPaymentSlip(
        fileList[0],
        customer.key
      );
      const formDataToSubmit = {
        customerId: customer.key,
        userId: 9,
        amount: values.amount,
        stateId: 2,
        paymentSlipUrl,
      };

      const response = await makeCustomerPayment(formDataToSubmit);

      if (response.httpStatusCode !== 200) throw new Error("Payment failed.");

      // Retrieve user name or default to "Admin"
      const user = JSON.parse(localStorage.getItem("user") || "{}");
      const userName = `${user.firstName ?? "Admin"} ${
        user.lastName ?? ""
      }`.trim();

      // Update table and remaining amount
      setTableData([
        ...tableData,
        {
          key: Math.random().toString(),
          payment: userName,
          amount: values.amount,
          date: new Date().toLocaleDateString(),
          paymentReceiptUrl: paymentSlipUrl,
        },
      ]);
      set(data, "remainingAmount", data.remainingAmount - values.amount);

      handleModalClose();
      message.success("Payment made successfully!");
    } catch (error) {
      message.error("Failed to make payment.");
      console.error(error);
    }
  };

  const handleOnFinishUploadOfferLetter = async () => {
    const { customer } = location.state as { customer: Customer };

    if (!fileList.length)
      return message.error("Please upload an offer letter.");

    try {
      // Upload offer letter and prepare form data
      const offerLetterUrl = await uploadOfferLetter(fileList[0], customer.key);

      // set the offer letter URL to the database
      const requestBody = {
        customerId: customer.key,
        userId: 9,
        docUrl: offerLetterUrl,
      };

      const response = await uploadOfferLetterToDb(requestBody)
        .then((res) => {
          if (res.httpStatusCode !== 200)
            throw new Error("Failed to upload offer");

          return res;
        })
        .catch((error) => {
          console.error(error);
          message.error("Failed to upload offer letter.");
        });

      if (response.httpStatusCode === 200) {
        set(data, "docUrl", offerLetterUrl);

        handleModalClose();
        message.success("Offer letter uploaded successfully!");
      }

      // Update offer letter URL
    } catch (error) {
      message.error("Failed to upload offer letter.");
      console.error(error);
    }
  };

  const defaultFooter = () => (
    <Row>
      <Col span={12}>
        <strong>Total Amount</strong>
      </Col>
      <Col span={12}>
        <strong>{data.totalAmount}</strong>
      </Col>
      <Col span={12}>
        <strong>Remaining Amount</strong>
      </Col>
      <Col span={12}>
        <strong>{data.remainingAmount}</strong>
      </Col>
    </Row>
  );

  const validateUrl = (url: string) => {
    try {
      new URL(url);
      return true;
    } catch (error) {
      return false;
    }
  };

  return (
    <>
      <Card style={{ backgroundColor: "#fff", marginTop: "1rem" }}>
        <Row>
          <Col sm={10} lg={8}>
          <Space direction={"vertical"} size={"large"}>
            <Row gutter={[20, 0]}>
              <Col sm={10} lg={12}>
                {
                  // check if data.docUrl is a vaild URl
                  validateUrl(data.docUrl) ? (
                    <Button
                      type="link"
                      onClick={() => {
                        window.open(data.docUrl, "_blank");
                      }}
                    >
                      View Offer Letter
                    </Button>
                  ) : (
                    <>
                      <Button
                        icon={<PlusCircleOutlined />}
                        onClick={handleOfferLetter}
                      >
                        Attach Offer Letter
                      </Button>
                      <Modal
                        open={offerLetterModal}
                        onCancel={handleOfferLetterClose}
                        onOk={() => offerLetterForm.submit()} // Submit the form when OK is clicked
                      >
                        <Form
                          form={offerLetterForm}
                          name="offerLetterForm}"
                          layout="vertical"
                          onFinish={handleOnFinishUploadOfferLetter}
                        >
                          <Form.Item
                            name="offerLetter"
                            label="Attach Offer Letter"
                            rules={[
                              {
                                required: true,
                                message: "Please upload offer letter",
                              },
                            ]}
                          >
                            <Dragger {...uploadProps}>
                              <p className="ant-upload-drag-icon">
                                <InboxOutlined />
                              </p>
                              <p className="ant-upload-text">
                                Click or drag file to this area to upload
                              </p>
                              <p className="ant-upload-hint">
                                Support PDF and Image files only. Maximum size
                                of 2MB
                              </p>
                            </Dragger>
                          </Form.Item>
                        </Form>
                      </Modal>
                    </>
                  )
                }
              </Col>
            </Row>

            <Row gutter={[20, 0]}>
              <Col sm={10} lg={12}>
                <Button
                  icon={<PlusCircleOutlined />}
                  onClick={handleAddPayment}
                  disabled={data.remainingAmount <= 0}
                >
                  Add another payment
                </Button>
              </Col>
              <Modal
                open={paymentModel}
                onCancel={handleModalClose}
                onOk={() => paymentForm.submit()} // Submit the form when OK is clicked
              >
                <Form
                  form={paymentForm}
                  name="paymentForm"
                  layout="vertical"
                  onFinish={handleOnFinishPayment}
                >
                  <Form.Item
                    name="amount"
                    label="Amount"
                    rules={[
                      { required: true, message: "Please input the amount" },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item
                    name="paymentSlip"
                    label="Payment Slip"
                    rules={[
                      {
                        required: true,
                        message: "Please upload a payment slip",
                      },
                    ]}
                  >
                    <Dragger {...uploadProps}>
                      <p className="ant-upload-drag-icon">
                        <InboxOutlined />
                      </p>
                      <p className="ant-upload-text">
                        Click or drag file to this area to upload slip
                      </p>
                      <p className="ant-upload-hint">
                        Support PDF and Image files only. Maximum size of 2MB
                      </p>
                    </Dragger>
                  </Form.Item>
                </Form>
              </Modal>
            </Row>
          </Space>
            
          </Col>

          <Col
            sm={10}
            lg={16}
            style={{
              borderLeft: "2px solid #1890ff",
              padding: "20px",
              display: "flex",
            }}
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
                bordered={bordered}
                showHeader
                footer={showFooter ? defaultFooter : undefined}
                dataSource={tableData}
                columns={columns}
                pagination={false}
                scroll={{ y: 300 }}
              />
            </ConfigProvider>
          </Col>
        </Row>
      </Card>
    </>
  );
};
