import { HomeOutlined, BankOutlined } from "@ant-design/icons";
import { Helmet } from "react-helmet-async";
import { PageHeader } from "../../components";
import { Button, Card, Col, Form, Input, Table } from "antd";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getallUsers } from "../../api/services/Common";
import { User } from "../../types/user";
import { result } from "lodash";
import Password from "antd/es/input/Password";



export const SuperAdminPage = () => {
    const [searchTerm, setSearchTerm] = useState<string>("");

  // State for filtered table data
  const [filteredData, setFilteredData] = useState<User[]>([]);
  const [tableData, settableData] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const navigate  = useNavigate();


  const handleClickView = (record: User) => {

    navigate(`/super-admin/user-status`, { state: { user: record } });

  };

  const handleClickEdit = (record: User) => {

    navigate(`/data-entry/customer-status`, { state: { customer: record } });

  };

  useEffect(() => {
    setLoading(true);
    getallUsers().then((res) => {
      console.log("Hello",res)
      //  res.data.responseObject convert a json object to array
      const results = res.data.responseObject;
      console.log("fullname",results)
      const data = [];
      let index = 0;
      // Extract and map only the required fields from the response
      // const data = results.map((item :any) => {
  
      //   while(item.id!=0){
      //     console.log("item_id",item.id)
      //   return {
      //     key: item.id, // Unique key for Ant Design Table
      //     name: item.fullName, // Required field
      //     email:item.email,
      //   };
      // };
      // });
      while (index < results.length) {
        const item = results[index]; // Get the current item in the array
      
        // Push the transformed object into the data array
        if(item.id!= 0){
        data.push({
          key: item.id,        // Unique key for Ant Design Table
          name: item.fullName, // Required field
          email: item.email,
          password:item.hasedPassword   // Email field
        });
        }
        index++; // Increment the index to move to the next item
      }
      console.log("data", data)
  
      settableData(data); // Set the state with the new data
      setFilteredData(data); // Step 2: Also set filteredData initially
      setLoading(false); // Step 2: Set loading to false after data is fetched
    });
  }, []);

  // Define columns for the table
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Actions",
      dataIndex: "actions",
      render: (text:any,record: User) => (
        <>
          <Button onClick={() => handleClickView(record)} type="primary">View</Button>
          <Button onClick={() => handleClickView(record)} type="primary">Edit</Button>
        </>
      ),
    },
  ];



  // Update filtered data based on search term
  useEffect(() => {
    const filtered = tableData.filter(
        (item) =>
            item.name.includes(searchTerm) ||  // Change here to use passportNo
            item.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredData(filtered);
}, [searchTerm, tableData]); 

  console.log("filteredData", filteredData);

  // Handle input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div>
      <Helmet>
        <title>Search User</title>
      </Helmet>
      <PageHeader
        title={"Search User"}
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
                <span>Search User</span>
              </>
            ),
          },
        ]}
      />

      <Col span={24}>
        <Form>
          <Form.Item label="Search User">
            <Input
              placeholder="Search by Name or Email"
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </Form.Item>
        </Form>
      </Col>

      <Col span={24}>
        <Card style={{ backgroundColor: "#fff" }}>
          <Table<User> columns={columns} dataSource={filteredData} pagination={{ pageSize: 5 }} loading={loading} />
        </Card>
      </Col>
    </div>
  );
}
