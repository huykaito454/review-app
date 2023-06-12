import { Avatar, Card, Form } from "antd";
import { Tabs } from "antd";
import type { TabsProps } from "antd";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import {
  ContactsOutlined,
  PhoneOutlined,
  SettingOutlined,
  EditOutlined,
  EllipsisOutlined,
} from "@ant-design/icons";
import { useEffect, useState } from "react";
import {
  UpdateCustomerCommand,
  UserClient,
} from "../../../services/web-api-client";
import { toastError, toastSuccess } from "../../../utils/handleToastResponse";
import instance from "../../../services/base-api-client";
import { handleGetUserData } from "../../../redux/user/userThunk";
import ModalAdmin from "../../../components/admin/Modal";
import UpdateMyAccount from "./UpdateMyAccount";
const onChange = (key: string) => {
  console.log(key);
};

const items: TabsProps["items"] = [
  {
    key: "1",
    label: `My Posts`,
    children: `Content of Tab Pane My Posts`,
  },
  {
    key: "2",
    label: `Activity`,
    children: `Content of Tab Pane Activity`,
  },
];
const AdminMyAccount = () => {
  const user = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [titleModal, setTitleModal] = useState("Update Profile");
  const [form] = Form.useForm();
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const showModal = () => {
    form.setFieldsValue(user);
    form.setFieldValue("name", user.fullName);
    form.setFieldValue("avatar", null);
    setIsModalOpen(true);
  };
  useEffect(() => {}, [dispatch]);

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        const data = new UpdateCustomerCommand();
        data.email = values.email.trim();
        data.name = values.name.trim();
        data.phoneNumber = values.phoneNumber.trim();
        data.passWord = values.password.trim();
        if (values.avatar) {
          data.avatar = values.avatar;
        }
        handleEditUser(data);
      })
      .catch((error) => {
        toastError("Update profile failed");
      });
  };
  const handleEditUser = async (item: any) => {
    try {
      const client = new UserClient(undefined, instance());
      const rs = await client.updateUserAccount(item);
      if (rs) {
        toastSuccess("Update profile successfully");
        handleCancel();
        form.resetFields();
        dispatch(handleGetUserData());
      } else {
        toastError("Update user failed");
      }
    } catch (error) {
      toastError("Update user failed");
    }
  };
  return (
    <div className="flex items-start gap-4 w-full h-full">
      <div className="w-1/3">
        <Card
          bodyStyle={{ paddingTop: 0 }}
          actions={[
            <SettingOutlined key="setting" />,
            <EditOutlined
              key="edit"
              onClick={(e: any) => {
                showModal();
              }}
            />,
            <EllipsisOutlined key="ellipsis" />,
          ]}
        >
          <div className="flex flex-col items-center gap-5 py-4 px-10">
            <Avatar
              className="cursor-pointer w-32 h-32"
              size="large"
              src={<img src={user.avatar} alt="avatar" />}
            />
            <span className="font-medium text-lg ">{user.fullName}</span>
            <div className="w-full flex flex-col gap-2 items-start justify-center">
              <div className="flex items-center justify-start gap-2">
                <ContactsOutlined />
                <span>{user.email}</span>
              </div>
              <div className="flex items-center justify-start gap-2">
                <PhoneOutlined />
                <span>{user.phoneNumber}</span>
              </div>
            </div>
          </div>
        </Card>
      </div>
      <div className="w-2/3">
        <Card bodyStyle={{ paddingTop: 0 }}>
          <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
        </Card>
      </div>
      <ModalAdmin
        title={titleModal}
        isModalOpen={isModalOpen}
        handleOk={handleOk}
        okText="Save"
        handleCancel={handleCancel}
      >
        <UpdateMyAccount form={form}></UpdateMyAccount>
      </ModalAdmin>
    </div>
  );
};

export default AdminMyAccount;
