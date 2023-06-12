import React, { useState, useEffect } from "react";
import {
  AppstoreOutlined,
  BarChartOutlined,
  FormOutlined,
  LinkOutlined,
  SettingOutlined,
  UserOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Layout, Progress, theme } from "antd";
const { Content } = Layout;
import HeaderAdmin from "../../components/admin/Header";
import SidebarAdmin from "../../components/admin/Sidebar";
import { Outlet, Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { handleGetUserData } from "../../redux/user/userThunk";

const AdminLayout = () => {
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  useEffect(() => {
    dispatch(handleGetUserData());
  }, []);
  if (user.disable || !user) {
    navigate("/");
  }
  return (
    <>
      {!user.disable ? (
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
      ) : (
        <></>
      )}
    </>
  );
};
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
  getItem("Dashboard", "sub1", <AppstoreOutlined />, [
    getItem(<Link to={"/admin"}>Analysis</Link>, "/admin"),
    getItem(<Link to={"/admin/monitor"}>Monitor</Link>, "/admin/monitor"),
  ]),
  getItem(
    <Link to={"/admin/user-management"}>User</Link>,
    "/admin/user-management",
    <UserOutlined />
  ),
  getItem("System", "sub2", <AppstoreOutlined />, [
    getItem(
      <Link to={"/admin/category-management"}>Category</Link>,
      "/admin/category-management"
    ),
    getItem(
      <Link to={"/admin/partner-management"}>Partner</Link>,
      "/admin/partner-management"
    ),
    // getItem(
    //   <Link to={"/admin/about-me-management"}>About me</Link>,
    //   "/admin/about-me-management"
    // ),
  ]),
  getItem("Links", "sub3", <LinkOutlined />, [
    getItem(
      <Link to={"/admin/ads-management"}>Ads</Link>,
      "/admin/ads-management"
    ),
    getItem(
      <Link to={"/admin/affiliate-links-management"}>Affiliate Links</Link>,
      "/admin/affiliate-links-management"
    ),
  ]),
  getItem("Articles", "sub4", <FormOutlined />, [
    getItem(
      <Link to={"/admin/posts-management"}>View Articles</Link>,
      "/admin/posts-management"
    ),
    getItem(
      <Link to={"/admin/new-posts-management"}>Add New Article</Link>,
      "/admin/new-posts-management"
    ),
  ]),
  getItem(
    <Link to={"/admin/report-management"}>Report</Link>,
    "/admin/report-management",
    <BarChartOutlined />
  ),
  getItem(
    <Link to={"/admin/setting-management"}>Setting</Link>,
    "/admin/setting-management",
    <SettingOutlined />
  ),
];

export default AdminLayout;
