import React, { useState, useEffect } from "react";
import {
  AppstoreOutlined,
  BarChartOutlined,
  FormOutlined,
  HomeOutlined,
  LinkOutlined,
  SettingOutlined,
  UserOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Layout, theme } from "antd";
const { Content } = Layout;
import HeaderAdmin from "../../components/admin/Header";
import SidebarAdmin from "../../components/admin/Sidebar";
import { Outlet, NavLink } from "react-router-dom";
type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem(
    <NavLink to={"/admin"}>Dashboard</NavLink>,
    "/admin",
    <HomeOutlined />
  ),
  getItem(
    <NavLink to={"/admin/user-management"}>User</NavLink>,
    "/admin/user-management",
    <UserOutlined />
  ),
  getItem("System", "sub1", <AppstoreOutlined />, [
    getItem(
      <NavLink to={"/admin/category-management"}>Category</NavLink>,
      "/admin/category-management"
    ),
    getItem(
      <NavLink to={"/admin/partner-management"}>Partner</NavLink>,
      "/admin/partner-management"
    ),
    getItem(
      <NavLink to={"/admin/about-me-management"}>About me</NavLink>,
      "/admin/about-me-management"
    ),
  ]),
  getItem("Links", "sub2", <LinkOutlined />, [
    getItem(
      <NavLink to={"/admin/ads-management"}>Ads</NavLink>,
      "/admin/ads-management"
    ),
    getItem(
      <NavLink to={"/admin/affiliate-links-management"}>
        Affiliate Links
      </NavLink>,
      "/admin/affiliate-links-management"
    ),
  ]),
  getItem(
    <NavLink to={"/admin/posts-management"}>Posts</NavLink>,
    "8",
    <FormOutlined />
  ),
  getItem(
    <NavLink to={"/admin/report-management"}>Report</NavLink>,
    "9",
    <BarChartOutlined />
  ),
  getItem(
    <NavLink to={"/admin/setting-management"}>Setting</NavLink>,
    "10",
    <SettingOutlined />
  ),
];

const AdminLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  useEffect(() => {}, []);
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <SidebarAdmin
        collapsed={collapsed}
        setCollapsed={setCollapsed}
        items={items}
      ></SidebarAdmin>
      <Layout>
        <HeaderAdmin
          collapsed={collapsed}
          setCollapsed={setCollapsed}
          colorBgContainer={colorBgContainer}
        ></HeaderAdmin>
        <Content style={{ margin: "8px 8px" }}>
          <div
            className="h-full shadow"
            style={{
              padding: 16,
              minHeight: 360,
              background: colorBgContainer,
            }}
          >
            <Outlet></Outlet>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminLayout;
