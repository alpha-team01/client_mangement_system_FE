import React, { useEffect, useRef, useState } from "react";
import { ConfigProvider, Layout, Menu, MenuProps, SiderProps } from "antd";
import {
  LoginOutlined,
  PieChartOutlined,
  SearchOutlined,
  UsergroupAddOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Logo } from "../../components";
import { Link, useLocation } from "react-router-dom";
import { COLOR } from "../../App.tsx";
import { useAuth } from "../../context/AuthContext.tsx";

const { Sider } = Layout;

type MenuItem = Required<MenuProps>["items"][number];

const getItem = (
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: "group",
): MenuItem => {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
};

const adminItems: MenuProps["items"] = [
  getItem(<Link to="/admin/dashboard">DashBoard</Link>,"dashboard" ,<PieChartOutlined />),
  getItem("Customer", "customer", <UserOutlined />, [
    getItem(<Link to="/admin/search-customer">Search Customer</Link>, "admin/search-customer", <SearchOutlined />),
  getItem(
    <Link to="/admin/register-customer">Customer Registration</Link>,
    "admin/register-customer", <UsergroupAddOutlined />,
  ),
  ]),
  getItem("User", "user", <PieChartOutlined />, [
    getItem(<Link to="/admin/search-user">Search User</Link>, "admin/search-user", <SearchOutlined />),
  getItem(
    <Link to="/admin/register-user">User Registration</Link>,
    "admin/register-user", <UsergroupAddOutlined />,
  ),
  ]),
];

const superAdminItems: MenuProps["items"] = [
  getItem(<Link to="/super-admin/dashboard">DashBoard</Link>,"dashboard" ,<PieChartOutlined />),
  getItem("Customer", "customer", <UserOutlined />, [
    getItem(<Link to="/super-admin/search-customer">Search Customer</Link>, "super-admin/search-customer", <SearchOutlined />),
  getItem(
    <Link to="/super-admin/register-customer">Customer Registration</Link>,
    "super-admin/register-customer", <UsergroupAddOutlined />,
  ),
  ]),
  getItem("User", "user", <UserOutlined />, [
    getItem(<Link to="/super-admin/search-user">Search User</Link>, "super-admin/search-user", <SearchOutlined />),
  getItem(
    <Link to="/super-admin/register-user">User Registration</Link>,
    "super-admin/register-user", <UsergroupAddOutlined />,
  ),
  ]),
];

const dataEntryItems: MenuProps["items"] = [
  getItem(
    <Link to="/data-entry/">Dashboard</Link>,
    "/data-entry/", <PieChartOutlined />,
  ),
  getItem(<Link to="/data-entry/search-customer">Search Customer</Link>, "/data-entry/search-customer", <SearchOutlined />),
  getItem(
    <Link to="/data-entry/register-customer">Customer Registration</Link>,
    "/data-entry/register-customer", <UsergroupAddOutlined />,
  ),
];

const rootSubmenuKeys = ["customer", "user"];

type SideNavProps = SiderProps;

const SideNav = ({ ...others }: SideNavProps) => {
  const nodeRef = useRef(null);
  const { user, logout } = useAuth();

  const { pathname } = useLocation();
  const [openKeys, setOpenKeys] = useState([""]);
  const [items, setItems] = useState<MenuProps["items"]>();


  useEffect(() => {
    
    if (user?.role.toLowerCase() === "admin") {
      setItems(adminItems);
    } else if (user?.role.toLowerCase() === "super admin") {
      setItems(superAdminItems);
    } else if (user?.role.toLowerCase() === "data entry") {
      setItems(dataEntryItems);
    } 

    // add the item signout at the end of each item list
    setItems((prev) => [
      ...(prev || []),
      getItem(<span onClick={logout}>Sign Out</span>, "sign-out", <LoginOutlined />),
    ]);
  }, [user]);

  const onClick: MenuProps["onClick"] = (e) => {
    console.log("click ", e);
  };

  const onOpenChange: MenuProps["onOpenChange"] = (keys) => {
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
    if (latestOpenKey && rootSubmenuKeys.indexOf(latestOpenKey!) === -1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };

  useEffect(() => {
    const paths = pathname.split("/");
    setOpenKeys(paths);
  }, [pathname]);

  return (
    <Sider ref={nodeRef} breakpoint="lg" collapsedWidth="0" {...others}>
      <Logo
        color="black"
        justify="center"
        gap="small"
        imgSize={{ h: 28, w: 28 }}
        style={{ padding: "1rem 0" }}
      />
      <ConfigProvider
        theme={{
          components: {
            Menu: {
              itemBg: "none",
              itemSelectedBg: COLOR["100"],
              itemHoverBg: COLOR["50"],
              itemSelectedColor: COLOR["600"],
            },
          },
        }}
      >
        <Menu
          mode="inline"
          items={items}
          onClick={onClick}
          openKeys={openKeys}
          onOpenChange={onOpenChange}
          style={{ border: "none" }}
        />
      </ConfigProvider>
    </Sider>
  );
};

export default SideNav;
