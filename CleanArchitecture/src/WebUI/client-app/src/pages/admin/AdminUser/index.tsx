import TableAdmin from "../../../components/admin/Table";
import { Avatar, Form, Input, Popconfirm } from "antd";
import { useEffect, useState } from "react";
import {
  SearchOutlined,
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";
import { Button } from "antd";
import UpdateAdminUser from "./UpdateAdminUser";
import ModalAdmin from "../../../components/admin/Modal";
import { toastError, toastSuccess } from "../../../utils/handleToastResponse";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import {
  AuthClient,
  AuthenticateModel,
  IUserListDto,
  IUserModel,
  UpdateCustomerCommand,
  UserClient,
} from "../../../services/web-api-client";
import { handleGetAllUserData } from "../../../redux/users/usersThunk";
import { ColumnsType } from "antd/es/table";
import instance from "../../../services/base-api-client";
import { setUsers } from "../../../redux/users/usersSlice";
const AdminUser = () => {
  const userList = useAppSelector((state) => state.users.listUserDto);
  const dispatch = useAppDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [titleModal, setTitleModal] = useState("Create User");
  const [currentUser, setCurrentUser] = useState("");
  const [form] = Form.useForm();
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const showModal = (title: string) => {
    setTitleModal(title);
    setIsModalOpen(true);
  };
  useEffect(() => {
    dispatch(handleGetAllUserData());
  }, [dispatch]);
  const columns: ColumnsType<IUserModel> = [
    {
      title: "No.",
      key: "id",
      width: 60,
      render: (_value, _item, index) => (
        <>
          <span>{index + 1}</span>
        </>
      ),
    },
    {
      title: "Name",
      key: "fullName",
      sorter: (a: any, b: any) => a.fullName?.length - b.fullName?.length,
      render: (item) => (
        <>
          <Avatar
            className="cursor-pointer mr-4"
            size="default"
            src={<img src={item.avatar} alt="avatar" />}
          />
          <span>{item.fullName}</span>
        </>
      ),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      sorter: (a: any, b: any) => a.email?.length - b.email?.length,
    },
    {
      title: "Phone",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
      sorter: (a: any, b: any) => Number(a.phoneNumber) - Number(b.phoneNumber),
    },
    {
      title: "Action",
      key: "id",
      width: 80,
      render: (item) => (
        <div className="flex items-center gap-4">
          <Button
            onClick={() => {
              handleTriggerEditUser(item);
            }}
            size="small"
            className="flex items-center justify-center"
            icon={<EditOutlined className="cursor-pointer " />}
          ></Button>
          <Popconfirm
            title="Delete the user"
            onConfirm={() => {
              handleDeleteUser(item);
            }}
            description="Are you sure to delete this user?"
            icon={<QuestionCircleOutlined style={{ color: "red" }} />}
          >
            <Button
              size="small"
              className="flex items-center justify-center"
              icon={<DeleteOutlined className="cursor-pointer" />}
              danger
            ></Button>
          </Popconfirm>
        </div>
      ),
    },
  ];
  const handleDeleteUser = async (item: any) => {
    try {
      const client = new UserClient(undefined, instance());
      const rs = await client.delete(item.id);
      if (rs) {
        toastSuccess("Delete user successfully");
        dispatch(handleGetAllUserData());
      } else {
        toastError("Delete user failed");
      }
    } catch (error) {
      toastError("Delete user failed");
    }
  };
  const handleTriggerEditUser = (item: any) => {
    setCurrentUser(item.id);
    showModal("Update User");
    form.setFieldsValue(item);
    form.setFieldValue("name", item.fullName);
    form.setFieldValue("avatar", null);
  };
  const handleEditUser = async (item: any) => {
    try {
      const client = new UserClient(undefined, instance());
      const rs = await client.updateUserAccount(item);
      if (rs) {
        toastSuccess("Update user successfully");
        handleCancel();
        form.resetFields();
        dispatch(handleGetAllUserData());
      } else {
        toastError("Update user failed");
      }
    } catch (error) {
      toastError("Update user failed");
    }
  };
  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        if (titleModal == "Update User") {
          const data = new UpdateCustomerCommand();
          data.id = currentUser.trim();
          data.email = values.email.trim();
          data.name = values.name.trim();
          data.phoneNumber = values.phoneNumber.trim();
          data.passWord = values.password.trim();
          handleEditUser(data);
        } else {
          const data = new AuthenticateModel();
          data.email = values.email.trim();
          data.name = values.name.trim();
          data.phoneNumber = values.phoneNumber.trim();
          data.password = values.password.trim();
          handleRegister(data);
        }
      })
      .catch((_error) => {
        toastError("Create user failed");
      });
  };
  const handleRegister = async (data: any) => {
    try {
      const client = new AuthClient(undefined, instance());
      const rs = await client.register(data);
      if (rs) {
        toastSuccess("Create user successfully");
        handleCancel();
        form.resetFields();
        dispatch(handleGetAllUserData());
      } else {
        toastError("Create user failed");
      }
    } catch (error) {
      toastError("Create user failed");
    }
  };
  const handleSearch = async (data: any) => {
    const value = data.target.value.toLowerCase().trim();
    if (value) {
      const rs = userList?.filter(
        (item: any) =>
          item.email.trim().toLowerCase().includes(value) ||
          item.fullName.trim().toLowerCase().includes(value) ||
          item.phoneNumber.trim().toLowerCase().includes(value)
      );
      const dataFilter: IUserListDto = {
        listUserDto: rs,
      };
      dispatch(setUsers(dataFilter));
    } else {
      dispatch(handleGetAllUserData());
    }
  };

  return (
    <div className="flex items-start flex-col gap-4 w-full">
      <div className="w-full flex flex-row-reverse items-center justify-between">
        <Button
          type="primary"
          className="flex items-center bg-primary text-white active:scale-90"
          icon={<PlusOutlined />}
          onClick={() => {
            showModal("Create User");
          }}
        >
          Create
        </Button>
        <div className="w-[30%] flex items-center gap-2">
          <Input
            placeholder="Search..."
            onChange={(e) => {
              handleSearch(e);
            }}
            prefix={<SearchOutlined />}
          />
        </div>
      </div>
      <TableAdmin columns={columns} data={userList}></TableAdmin>
      <ModalAdmin
        title={titleModal}
        isModalOpen={isModalOpen}
        handleOk={handleOk}
        okText="Save"
        handleCancel={handleCancel}
      >
        <UpdateAdminUser form={form}></UpdateAdminUser>
      </ModalAdmin>
    </div>
  );
};

export default AdminUser;
