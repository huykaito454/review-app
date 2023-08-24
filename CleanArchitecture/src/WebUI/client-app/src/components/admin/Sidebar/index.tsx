import { Menu, MenuProps } from "antd";
import { useState } from "react";
import Sider from "antd/es/layout/Sider";
const rootSubmenuKeys = ["sub1", "sub2"];
const SidebarAdmin = (props: any) => {
  const [current, setCurrent] = useState(location.pathname);
  const [openKeys, setOpenKeys] = useState([""]);
  const onOpenChange: MenuProps["onOpenChange"] = (keys) => {
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
    if (rootSubmenuKeys.indexOf(latestOpenKey!) === -1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };
  const onClick: MenuProps["onClick"] = (e: any) => {
    setCurrent(e.key);
  };
  return (
    <Sider
      className="select-none"
      theme="light"
      trigger={null}
      collapsible
      collapsed={props.collapsed}
      onCollapse={(value) => props.setCollapsed(value)}
    >
      <Menu
        onClick={onClick}
        theme="light"
        openKeys={openKeys}
        onOpenChange={onOpenChange}
        selectedKeys={[current]}
        mode="inline"
        items={props.items}
      />
    </Sider>
  );
};

export default SidebarAdmin;
