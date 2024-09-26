import { HomeOutlined, BankOutlined } from "@ant-design/icons";
import { Helmet } from "react-helmet-async";
import { PageHeader } from "../../../components";
import { Button, Card, Col, Form, Input, Table } from "antd";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Customer } from "../../../types";



export const CustomerSearch = () => {
  // State for search input
  const [searchTerm, setSearchTerm] = useState<string>("");

  // State for filtered table data
  const [filteredData, setFilteredData] = useState<Customer[]>([]);

  const navigate  = useNavigate();


  const handleClickView = (record: Customer) => {

    navigate(`/data-entry/customer-status`, { state: { customer: record } });

  };


  // Initial table data
  const tableData: Customer[] = [
    {
      key: "1",
      passportNo: "123456789",
      status: "Pending",
      actions: "View",
    },
    {
      key: "2",
      passportNo: "987654321",
      status: "Finished",
      actions: "View",
    },
    
  ];

  // Define columns for the table
  const columns = [
    {
      title: "Passport Number",
      dataIndex: "passportNo",
      key: "passportNo",
    },
    {
      title: "Current Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Actions",
      dataIndex: "actions",
      render: (text: any, record: Customer) => (
        <>
          <Button onClick={() => handleClickView(record)} type="primary">View</Button>
        </>
      ),
    },
  ];



  // Update filtered data based on search term
  useEffect(() => {
    const filtered = tableData.filter(
      (item) =>
        item.passportNo.includes(searchTerm) ||
        item.status.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredData(filtered);
  }, [searchTerm]);

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
          <Table<Customer> columns={columns} dataSource={filteredData} pagination={{ pageSize: 5 }}/>
        </Card>
      </Col>
    </div>
  );
};
