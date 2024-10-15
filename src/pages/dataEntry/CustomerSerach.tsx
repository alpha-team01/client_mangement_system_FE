import { HomeOutlined, BankOutlined } from "@ant-design/icons";
import { Helmet } from "react-helmet-async";
import { PageHeader } from "../../components";
import { Button, Card, Col, Form, Input, message, Table, Tabs } from "antd";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Customer } from "../../types";
import { getAllCustomers } from "../../api/services/Common";
import moment from "moment";
import { set } from "lodash";

export const CustomerSearch = () => {
  // State for search input
  const [searchTerm, setSearchTerm] = useState<string>("");

  // State for filtered table data
  const [filteredData, setFilteredData] = useState<Customer[]>([]);
  const [filerExpiringData, setFilterExpiringData] = useState<Customer[]>([]);
  const [tableData, setTableData] = useState<Customer[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const [expiringData, setExpiringData] = useState<Customer[]>([]); // Expiring police report data
  const navigate = useNavigate();

  const handleClickView = (record: Customer) => {
    navigate(`/data-entry/customer-status`, { state: { customer: record } });
  };

  useEffect(() => {
    setLoading(true);
    getAllCustomers()
      .then((res) => {
        const results = res.data.responseObject;

        const data = results.map((item: any) => {
          
          return {
            key: item.customerId,
            passportNo: item.passportNumber,
            policeReportExpDate: item.policeReportExpDate, // Store the issued date as a moment object
            status: {
              title: item.step || "N/A",
              description: item.step || "N/A",
            },
            actions: "View",
          };
        });

        setTableData(data);
        setFilteredData(data);

        // Filter for customers whose police reports will expire within a week
        const now = moment();
        const expiring = data.filter((item : any) => {
          if (item.policeReportExpDate) {
            const expDate = moment(item.policeReportExpDate);
            console.log("Police report exp date:", item.policeReportExpDate);
            return expDate.diff(now, "days") <= 7; // Check if the police report will expire within a week
          }
          return false; // Skip entries with null policeReportExpDate
        });
        setExpiringData(expiring);
        setFilterExpiringData(expiring);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        message.error("Failed to fetch data");
      }).finally(() => {
        setLoading(false);
      });
  }, []);

  // Define columns for the table
  const columns = [
    {
      title: "Passport Number",
      dataIndex: "passportNo",
      key: "passportNo",
    },
    {
      title: "Current Status",
      key: "status",
      render: (text: any, record: Customer) => (
        <div>
          <strong>{record.status.title}</strong>
          <br />
          <span>{record.status.description}</span>
        </div>
      ),
    },
    {
      title: "Police Report Expiry Date",
      dataIndex: "policeReportExpDate",
      key: "policeReportExpDate",
    },
    {
      title: "Actions",
      dataIndex: "actions",
      render: (text: any, record: Customer) => (
        <Button onClick={() => handleClickView(record)} type="primary">
          View
        </Button>
      ),
    },
  ];

  // Update filtered data based on search term
  useEffect(() => {
    const filtered = tableData.filter(
      (item) =>
        item.passportNo.includes(searchTerm) ||
        item.status.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredData(filtered);
  }, [searchTerm, tableData]);

  // Filter for customers whose police reports will expire within a week
  useEffect(() => {
    const filtered = expiringData.filter(
      (item) =>
        item.passportNo.includes(searchTerm) ||
        item.status.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilterExpiringData(filtered);
  }, [searchTerm, expiringData]);
  

  // Handle input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div>
      <Helmet>
        <title>Search Customers</title>
      </Helmet>
      <PageHeader
        title={"Search Customers"}
        breadcrumbs={[
          {
            title: (
              <>
                <HomeOutlined />
                <span>Home</span>
              </>
            ),
            path: "/",
          },
          {
            title: (
              <>
                <BankOutlined />
                <span>Search Customers</span>
              </>
            ),
          },
        ]}
      />

      <Col span={24}>
        <Form>
          <Form.Item label="Search Customer">
            <Input
              placeholder="Search by Passport Number or Status"
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </Form.Item>
        </Form>
      </Col>

      <Col span={24}>
        <Card style={{ backgroundColor: "#fff" }}>
          <Tabs defaultActiveKey="1">
            <Tabs.TabPane tab="All Customers" key="1">
              <Table<Customer>
                columns={columns}
                dataSource={filteredData}
                pagination={{ pageSize: 5 }}
                loading={loading}
              />
            </Tabs.TabPane>

            <Tabs.TabPane tab="Expiring Police Reports" key="2">
              <Table<Customer>
                columns={columns}
                dataSource={filerExpiringData} // Display only expiring police reports data
                pagination={{ pageSize: 5 }}
                loading={loading}
              />
            </Tabs.TabPane>
          </Tabs>
        </Card>
      </Col>
    </div>
  );
};
