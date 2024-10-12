import { HomeOutlined, BankOutlined } from "@ant-design/icons";
import { Helmet } from "react-helmet-async";
import { PageHeader } from "../../components";
import { Button, Card, Col, Form, Input, message, Table } from "antd";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Customer } from "../../types";
import { getAllCustomers } from "../../api/services/Common";

export const CustomerSearch = () => {
  // State for search input
  const [searchTerm, setSearchTerm] = useState<string>("");

  // State for filtered table data
  const [filteredData, setFilteredData] = useState<Customer[]>([]);
  const [tableData, settableData] = useState<Customer[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const navigate = useNavigate();

  const handleClickView = (record: Customer) => {
    navigate(`/data-entry/customer-status`, { state: { customer: record } });
  };

  useEffect(() => {
    setLoading(true);
    getAllCustomers()
      .then((res) => {
        //  res.data.responseObject convert a json object to array
        const results = res.data.responseObject;

        // Extract and map only the required fields from the response
        console.log(results);
        const data = results.map((item: any) => {
          // console.log(item);
          return {
            key: item.customerId, // Unique key for Ant Design Table
            passportNo: item.passportNumber, // Required field
            status: {
              title: item.step || "N/A", // Use "N/A" if step is null
              description: item.step || "N/A", // Same for description
            },
            actions: "View", // Static value for actions
          };
        });

        settableData(data); // Set the state with the new data
        setFilteredData(data); // Step 2: Also set filteredData initially
        setLoading(false); // Step 2: Set loading to false after data is fetched
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        message.error("Failed to fetch data");
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
        <>
          <div>
            <strong>{record.status.title}</strong>
            <br />
            <span>{record.status.description}</span>
          </div>
        </>
      ),
    },
    {
      title: "Actions",
      dataIndex: "actions",
      render: (text: any, record: Customer) => (
        <>
          <Button onClick={() => handleClickView(record)} type="primary">
            View
          </Button>
        </>
      ),
    },
  ];

  // Update filtered data based on search term
  useEffect(() => {
    const filtered = tableData.filter(
      (item) =>
        item.passportNo.includes(searchTerm) || // Change here to use passportNo
        item.status.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredData(filtered);
  }, [searchTerm, tableData]);

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
          <Table<Customer>
            columns={columns}
            dataSource={filteredData}
            pagination={{ pageSize: 5 }}
            loading={loading}
          />
        </Card>
      </Col>
    </div>
  );
};
