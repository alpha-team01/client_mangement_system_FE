import {
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  Row,
  message,
  Upload,
  Select,
} from "antd";
import { Card } from "../../components";
import { SaveOutlined, UploadOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { uploadCustomerFile, registerCustomer, getAllAdminUsers } from "../../api/services/Common";

type FieldType = {
  passNum?: string;
  prIssueDate?: string;
  passUrl?: string;
  prUrl?: string;
  CVurl?: string;
  BcUrl?: string;
  photoUrl?: string;
  userId?: number;
};

export const CustomerRegistration = () => {
  const [form] = Form.useForm();
  const [passNum, setPassNum] = useState("");
  const [prIssueDate, setPrIssueDate] = useState("");
  const [uploadedFiles, setUploadedFiles] = useState({});
  const [loading, setLoading] = useState(false);
  const [fileList, setFileList] = useState<any>({});
  const [fileURLs, setFileURLs] = useState<any>({}); // Store the uploaded URLs

  const [ownerList, setOwnerList] = useState<any[]>([]); // Full owner list
  const [filteredOwners, setFilteredOwners] = useState<any[]>([]); // Filtered owner list

  const [submitBtnLoading, setSubmitBtnLoading] = useState(false);

  // Fetch owner list once on component mount
  useEffect(() => {
     getAllAdminUsers().then((res) => {
        const data = res.data.responseObject;
        const options = data.map((item: any) => ({
          label: item.fullName,
          value: item.id,
        }));
        setOwnerList(options);
        setFilteredOwners(options); // Set initial filtered list to be the full list
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  // Function to filter the owners based on search input
  const handleOwnerSearch = (searchText: string) => {
    if (!searchText) {
      // If no search text, reset to full owner list
      setFilteredOwners(ownerList);
    } else {
      // Filter owner list based on search text
      const filtered = ownerList.filter((owner) =>
        owner.label.toLowerCase().includes(searchText.toLowerCase())
      );
      setFilteredOwners(filtered);
    }
  };

  const handleBeforeUpload = (file: any, fileType: "passport" | "policeReport" | "cv" | "birthCertificate" | "photo") => {
    setFileList((prevFiles: any) => ({
      ...prevFiles,
      [fileType]: file,
    }));
    return false; // Prevent automatic upload
  };

  const handleSubmit = async (values: any) => {
    try {
      setSubmitBtnLoading(true);
      const uploadedFileURLs: any = {};
  
      // Upload each file
      for (const fileType in fileList) {
        const file = fileList[fileType];
        const fileURL = await uploadCustomerFile(file, fileType as "passport" | "policeReport" | "cv" | "birthCertificate" | "photo", values.passNum);
        uploadedFileURLs[fileType] = fileURL;
      }
  
      //  change the date format to dd-MM-yyyy
      const dateNew = new Date(values.prIssueDate);
      const day = dateNew.getDate().toString().padStart(2, '0');
      const month = (dateNew.getMonth() + 1).toString().padStart(2, '0');
      const year = dateNew.getFullYear();


      // Prepare form data to register the customer
      const formDataToSubmit = {
        passportNumber: values.passNum,
        policeReportIssueDate: `${day}-${month}-${year}`,
        passportDocUrl: uploadedFileURLs.passport,
        policeReportDocUrl: uploadedFileURLs.policeReport,
        cvUrl: uploadedFileURLs.cv,
        birthCertificateDocUrl: uploadedFileURLs.birthCertificate,
        photoUrl: uploadedFileURLs.photo,
        userId: values.userId,
      };
  
      // Register the customer
      const res = await registerCustomer(formDataToSubmit);
      console.log(res);
      if (res.httpStatusCode === 200) {
        form.resetFields();
        setFileList({});
        setFileURLs({});
        message.success('Customer registered successfully!');
      } else {
        message.error('Failed to register customer.');
      }
      
    } catch (error) {
      message.error('Failed to register customer.');
      console.error(error);
    } finally {
      setSubmitBtnLoading(false);
    }
  };

  const uploadProps = (fileType:  "passport" | "policeReport" | "cv" | "birthCertificate" | "photo") => ({
    name: "file",
    multiple: false,
    beforeUpload: (file: any) => handleBeforeUpload(file, fileType),
  });

  return (
    <Row>
      <Col span={24}>
        <Card title="Customer Registration">
          <Form
            form={form}
            name="customer-registration-form"
            layout="vertical"
            onFinish={handleSubmit}
          >
            <Row gutter={[20, 0]}>
              <Col sm={10} lg={12}>
                <Form.Item<FieldType>
                  label="Passport No"
                  name="passNum"
                  rules={[
                    { required: true, message: "Please enter passport number" },
                  ]}
                >
                  <Input onChange={(e) => setPassNum(e.target.value)} />
                </Form.Item>
              </Col>
              <Col sm={10} lg={12}>
                <Form.Item<FieldType>
                  label="Passport"
                  name="passUrl"
                  rules={[
                    { required: true, message: "Please upload passport" },
                  ]}
                >
                  <Upload {...uploadProps("passport")}>
                    <Button icon={<UploadOutlined />}>Upload Passport</Button>
                  </Upload>
                </Form.Item>
              </Col>
              <Col sm={10} lg={12}>
                <Form.Item<FieldType>
                  label="Police Report Issue Date"
                  name="prIssueDate"
                  rules={[
                    { required: true, message: "Please select issue date" },
                  ]}
                >
                  <DatePicker
                    onChange={(date, dateString) => setPrIssueDate(dateString)}
                  />
                </Form.Item>
              </Col>
              <Col sm={10} lg={12}>
                <Form.Item<FieldType>
                  label="Police Report"
                  name="prUrl"
                  rules={[
                    { required: true, message: "Please upload police report" },
                  ]}
                >
                  <Upload {...uploadProps("policeReport")}>
                    <Button icon={<UploadOutlined />}>
                      Upload Police Report
                    </Button>
                  </Upload>
                </Form.Item>
              </Col>
              <Col sm={10} lg={12}>
                <Form.Item<FieldType>
                  label="CV"
                  name="CVurl"
                  rules={[{ required: true, message: "Please upload CV" }]}
                >
                  <Upload {...uploadProps("cv")}>
                    <Button icon={<UploadOutlined />}>Upload CV</Button>
                  </Upload>
                </Form.Item>
              </Col>
              <Col sm={10} lg={12}>
                <Form.Item<FieldType>
                  label="Birth Certificate"
                  name="BcUrl"
                  rules={[
                    {
                      required: true,
                      message: "Please upload birth certificate",
                    },
                  ]}
                >
                  <Upload {...uploadProps("birthCertificate")}>
                    <Button icon={<UploadOutlined />}>
                      Upload Birth Certificate
                    </Button>
                  </Upload>
                </Form.Item>
              </Col>
              <Col sm={10} lg={12}>
                <Form.Item<FieldType>
                  label="Photo"
                  name="photoUrl"
                  rules={[{ required: true, message: "Please upload photo" }]}
                >
                  <Upload {...uploadProps("photo")}>
                    <Button icon={<UploadOutlined />}>Upload Photo</Button>
                  </Upload>
                </Form.Item>
              </Col>
              <Col sm={10} lg={12}>
                <Form.Item<FieldType>
                  label="Owner"
                  name="userId"
                  rules={[{ required: true, message: "Please select owner" }]}
                >
                  <Select
                    showSearch
                    placeholder="Search owner"
                    filterOption={false} // Disable default filtering to use custom filtering
                    onSearch={handleOwnerSearch} // Custom search handler
                    options={filteredOwners} // Display filtered owners
                  />
                </Form.Item>
              </Col>
            </Row>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                loading={submitBtnLoading}
                icon={<SaveOutlined />}
              >
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </Col>
    </Row>
  );
};
