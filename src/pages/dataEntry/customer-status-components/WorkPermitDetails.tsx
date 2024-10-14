import {
  Row,
  Col,
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
import { InboxOutlined, PlusCircleOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { ColumnsType } from "antd/es/table/interface";
import { useLocation } from "react-router-dom";
import { Customer } from "../../../types";
import {
  getCustomerStateWiseDocDetails,
  makeCustomerPayment,
  uploadWorkPermit,
  uploadWorkPermitPaymentSlip,
  uploadWorkPermitToDb,
} from "../../../api/services/Common";
import { useAuth } from "../../../context/AuthContext";
import { capitalizeFirstLetter, formatCurrency } from "../../../utils";

interface DataType {
  key: string;
  payment: string;
  amount: number;
  date: string;
  paymentReceiptUrl?: string;
}

interface PendingProps {
  workPermitData: {
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

export const WorkPermitDetails = ({ workPermitData }: PendingProps) => {
  const [bordered] = useState(false);
  const [showFooter] = useState(true);

  const [paymentModel, setPaymentModel] = useState(false);
  const [workPermitModal, setWorkPermitModal] = useState(false);
  const [tableData, setTableData] = useState<DataType[]>([]);

  const { user } = useAuth();
  const location = useLocation();
  const [fileList, setFileList] = useState<any[]>([]);

  const { Dragger } = Upload;
  const [paymentForm] = Form.useForm();
  const [workPermitForm] = Form.useForm();

  const [loadmingPayment, setLoadingPayment] = useState(false);
  const [loadingWorkPermit, setLoadingWorkPermit] = useState(false);

  const [data, setData] = useState<any>({
    stateWisePaymentDetails: [],
    totalAmount: 0,
    remainingAmount: 0,
    docUrl: "",
  });

  const columns: ColumnsType<DataType> = [
    {
      title: "Payment Received By",
      dataIndex: "payment",
      key: "payment",
      render: (text: string) => <strong>{capitalizeFirstLetter(text)}</strong>,
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      align: "right",
      render: (amount: number) => formatCurrency(amount),
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      align: "right",
    },
    {
      title: "View Slip",
      key: "view",
      align: "right",
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

  useEffect(() => {
    setData(
      workPermitData ?? {
        stateWisePaymentDetails: [],
        totalAmount: 0,
        remainingAmount: 0,
        docUrl: "",
      }
    );
  }, []);

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
  }, [data]);

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

  const handleAddWorkPermitPayment = () => {
    setPaymentModel(true);
  };

  const handleWorkPermit = () => {
    setWorkPermitModal(true);
  };

  const handleModalClose = () => {
    paymentForm.resetFields();
    setPaymentModel(false);
    setFileList([]); // Reset file list
  };

  const handleWorkPermitClose = () => {
    workPermitForm.resetFields();
    setWorkPermitModal(false);
    setFileList([]); // Reset file
  };

  const handleOnFinishPayment = async (values: any) => {
    if (loadmingPayment) return;
    setLoadingPayment(true);

    const { customer } = location.state as { customer: Customer };

    if (!fileList.length) return message.error("Please upload a payment slip.");

    try {
      // Upload payment slip and prepare form data
      const paymentSlipUrl = await uploadWorkPermitPaymentSlip(
        fileList[0],
        customer.key
      );
      const formDataToSubmit = {
        customerId: customer.key,
        userId: user?.id,
        amount: values.amount,
        stateId: 3,
        paymentSlipUrl,
      };

      const response = await makeCustomerPayment(formDataToSubmit);

      if (response.httpStatusCode !== 200) throw new Error("Payment failed.");

      // Retrieve user name or default to "Admin"
      const updaatedData = await getCustomerStateWiseDocDetails(
        customer.key,
        3
      );
      setData(updaatedData.responseObject);

      handleModalClose();

      message.success("Payment made successfully!");
    } catch (error) {
      message.error("Failed to make payment.");
      console.error(error);
    } finally {
      setLoadingPayment(false);
    }
  };

  const handleOnFinishUploadWorkPermit = async () => {
    if (loadingWorkPermit) return;
    setLoadingWorkPermit(true);

    const { customer } = location.state as { customer: Customer };

    if (!fileList.length)
      return message.error("Please upload an offer letter.");

    try {
      // Upload offer letter and prepare form data
      const workPermitUrl = await uploadWorkPermit(fileList[0], customer.key);

      // set the offer letter URL to the database
      const requestBody = {
        userId: user?.id,
        stateId: 3,
        paymentSlipUrl: workPermitUrl,
      };

      const response = await uploadWorkPermitToDb(requestBody, customer.key)
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
        const updaatedData = await getCustomerStateWiseDocDetails(
          customer.key,
          3
        );
        setData(updaatedData.responseObject);

        handleModalClose();
        message.success("Offer letter uploaded successfully!");
      }

      // Update offer letter URL
    } catch (error) {
      message.error("Failed to upload offer letter.");
      console.error(error);
    } finally {
      setLoadingWorkPermit(false);
    }
  };

  const defaultFooter = () => (
    <Row>
      <Col span={12}>
        <strong>Total Amount</strong>
      </Col>
      <Col span={12} style={{ textAlign: "right" }}>
        <strong>{formatCurrency(data.totalAmount)}</strong>
      </Col>
      <Col span={12}>
        <strong>Remaining Amount</strong>
      </Col>
      <Col span={12} style={{ textAlign: "right" }}>
        <strong>{formatCurrency(data.remainingAmount)}</strong>
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
      <Row>
        <Col sm={24} lg={8}>
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
                      View Work Permit
                    </Button>
                  ) : (
                    <>
                      <Button
                        icon={<PlusCircleOutlined />}
                        onClick={handleWorkPermit}
                      >
                        Attach Work Permit
                      </Button>
                      <Modal
                        open={workPermitModal}
                        onCancel={handleWorkPermitClose}
                        onOk={() => workPermitForm.submit()} // Submit the form when OK is clicked
                        confirmLoading={loadingWorkPermit}
                      >
                        <Form
                          form={workPermitForm}
                          name="workPermitForm}"
                          layout="vertical"
                          onFinish={handleOnFinishUploadWorkPermit}
                        >
                          <Form.Item
                            name="workPermit"
                            label="Attach Work Permit"
                            rules={[
                              {
                                required: true,
                                message: "Please upload a work permit",
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
                  onClick={handleAddWorkPermitPayment}
                  disabled={data.remainingAmount <= 0}
                >
                  Add Payment
                </Button>
              </Col>
              <Modal
                open={paymentModel}
                onCancel={handleModalClose}
                onOk={() => paymentForm.submit()} // Submit the form when OK is clicked
                confirmLoading={loadmingPayment}
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
          sm={24}
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
    </>
  );
};
