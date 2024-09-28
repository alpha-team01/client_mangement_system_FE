import React, { useEffect, useRef, useState } from "react";
import { ConfigProvider, Layout, Menu, MenuProps, SiderProps } from "antd";
import {
  BugOutlined,
  LoginOutlined,
  PieChartOutlined,
  ProductOutlined,
  SearchOutlined,
  UsergroupAddOutlined,
} from "@ant-design/icons";
import { Logo } from "../../components";
import { Link, useLocation } from "react-router-dom";
import { PATH_DASHBOARD, PATH_DOCS, PATH_ERROR } from "../../constants";
import { COLOR } from "../../App.tsx";
import { PATH_HOME } from "../../constants/routes.ts";
import { DashboardLayout } from '../dashboards/index';

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

const itemsTest: MenuProps["items"] = [
  getItem("Dashboards", "dashboards", <PieChartOutlined />, [
    getItem(<Link to={PATH_DASHBOARD.default}>Default</Link>, "default", null),
    getItem(
      <Link to={PATH_DASHBOARD.projects}>Projects</Link>,
      "projects",
      null,
    ),
  ]),

  getItem("Pages", "pages", null, [], "group"),

  getItem("Errors", "errors", <BugOutlined />, [
    getItem(<Link to={PATH_ERROR.error400}>400</Link>, "400", null),
    getItem(<Link to={PATH_ERROR.error403}>403</Link>, "403", null),
    getItem(<Link to={PATH_ERROR.error404}>404</Link>, "404", null),
    getItem(<Link to={PATH_ERROR.error500}>500</Link>, "500", null),
    getItem(<Link to={PATH_ERROR.error503}>503</Link>, "503", null),
  ]),

  getItem("Help", "help", null, [], "group"),
  getItem(
    <Link to={PATH_DOCS.productRoadmap} target="_blank">
      Roadmap
    </Link>,
    "product-roadmap",
    <ProductOutlined />,
  ),
];

const adminItems: MenuProps["items"] = [
  getItem("Admin", "admin", <PieChartOutlined />, [
    getItem(<Link to="/admin">Admin</Link>, "admin", null),
  ]),
];

const superAdminItems: MenuProps["items"] = [
  getItem("Super Admin", "super-admin", <PieChartOutlined />, [
    getItem(<Link to="/super-admin">Super Admin</Link>, "super-admin", null),
  ]),
];

const dataEntryItems: MenuProps["items"] = [
  getItem(
    <Link to="/data-entry/">Dashboard</Link>,
    "data-entry/", <PieChartOutlined />,
  ),
  getItem(<Link to="/data-entry/search-customer">Search Customer</Link>, "data-entry", <SearchOutlined />),
  getItem(
    <Link to="/data-entry/register-customer">Customer Registration</Link>,
    "data-entry/information", <UsergroupAddOutlined />,
  ),
];

const rootSubmenuKeys = ["dashboards", "corporate", "user-profile"];

type SideNavProps = SiderProps;

const SideNav = ({ ...others }: SideNavProps) => {
  const nodeRef = useRef(null);
  const { pathname } = useLocation();
  const [openKeys, setOpenKeys] = useState([""]);
  const [current, setCurrent] = useState("");
  const [items, setItems] = useState<MenuProps["items"]>(itemsTest);

  useEffect(() => {
    // if url pathhass admin, then add admin menu
    if (pathname.includes("/admin")) {
      setItems(adminItems);
    } else if (pathname.includes("/super-admin")) {
      setItems(superAdminItems);
    } else if (pathname.includes("/data-entry")) {
      setItems(dataEntryItems);
    } else {
      setItems(dataEntryItems);
    }

    // add the item signout at the end of each item list
    setItems((prev) => [
      ...(prev || []),
      getItem("Sign Out", "sign-out", <LoginOutlined />),
    ]);
  }, []);

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
    setCurrent(paths[paths.length - 1]);
  }, [pathname]);

  return (
    <Sider ref={nodeRef} breakpoint="lg" collapsedWidth="0" {...others}>
      <Logo
        color="black"
        asLink
        href={PATH_HOME.root}
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
          selectedKeys={[current]}
          style={{ border: "none" }}
        />
      </ConfigProvider>
    </Sider>
  );
};

export default SideNav;
