import { Avatar, Button, MenuProps } from "antd";
import { Header } from "antd/es/layout/layout";
import {
  LogoutOutlined,
  UserOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from "@ant-design/icons";
import { Dropdown } from "antd";
const items: MenuProps["items"] = [
  {
    key: "1",
    label: <span>My account</span>,
    icon: <UserOutlined />,
  },
  {
    key: "2",
    danger: true,
    label: <span>Logout</span>,
    icon: <LogoutOutlined />,
  },
];

const HeaderAdmin = (props: any) => {
  return (
    <Header
      className="shadow flex items-center justify-between select-none"
      style={{
        padding: 0,
        background: props.colorBgContainer,
        paddingBottom: 2,
      }}
    >
      <Button
        type="text"
        icon={props.collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        onClick={() => props.setCollapsed(!props.collapsed)}
        style={{
          fontSize: "16px",
          width: 64,
          height: 64,
        }}
      />
      <Dropdown className="mr-2" menu={{ items }}>
        <a onClick={(e) => e.preventDefault()}>
          <Avatar
            className="cursor-pointer mr-2"
            size="large"
            src={
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/0/0f/IU_posing_for_Marie_Claire_Korea_March_2022_issue_03.jpg"
                alt="avatar"
              />
            }
          />
        </a>
      </Dropdown>
    </Header>
  );
};

export default HeaderAdmin;
