import { useEffect, useState } from "react";
import { Button, Input, Form, Popconfirm, Avatar } from "antd";
import {
  SearchOutlined,
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";
import { ColumnsType } from "antd/es/table";
import TableAdmin from "../../../components/admin/Table";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import {
  IPartnerDto,
  IPartnerList,
  PartnerClient,
  UpdatePartnerCommand,
} from "../../../services/web-api-client";
import ModalAdmin from "../../../components/admin/Modal";
import { toastError, toastSuccess } from "../../../utils/handleToastResponse";
import instance from "../../../services/base-api-client";
import UpdateAdminPartner from "./UpdateAdminPartner";
import { handleGetAllPartnerData } from "../../../redux/partners/partnersThunk";
import { setPartners } from "../../../redux/partners/partnersSlice";
const AdminPartner = () => {
  const partnerList = useAppSelector((state) => state.partners.partnerDtos);
  const dispatch = useAppDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [titleModal, setTitleModal] = useState("Create Partner");
  const [currentPartner, setCurrentPartner] = useState(0);
  const [form] = Form.useForm();
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const showModal = (title: string) => {
    setTitleModal(title);
    setIsModalOpen(true);
  };
  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        const data = new UpdatePartnerCommand();
        data.name = values.name.trim();
        data.description = values.description.trim();
        data.path = values.path.trim();
        if (values.image) {
          data.image = values.image;
        }
        if (titleModal == "Update Partner") {
          data.id = currentPartner;
        } else {
          data.id = 0;
        }
        handleUpdatePartner(data);
      })
      .catch((_error) => {
        toastError("Create partner failed");
      });
  };
  useEffect(() => {
    dispatch(handleGetAllPartnerData());
  }, [dispatch]);
  const columns: ColumnsType<IPartnerDto> = [
    {
      title: "ID.",
      key: "id",
      dataIndex: "id",
      width: 60,
      sorter: (a: any, b: any) => a.id - b.id,
    },
    {
      title: "Name",
      key: "name",
      sorter: (a: any, b: any) => a.name?.length - b.name?.length,
      render: (item) => (
        <>
          <Avatar
            className="cursor-pointer mr-4"
            size="default"
            shape="square"
            src={<img src={item.image} alt="image" />}
          />
          <span>{item.name}</span>
        </>
      ),
    },
    {
      title: "Description",
      key: "description",
      render: (item) => (
        <span className="text-no-wrap-2">{item.description}</span>
      ),
      sorter: (a: any, b: any) => a.description?.length - b.description?.length,
    },
    {
      title: "Action",
      key: "id",
      width: 80,
      render: (item) => (
        <div className="flex items-center gap-4">
          <Button
            onClick={() => {
              handleTriggerEditPartner(item);
            }}
            size="small"
            className="flex items-center justify-center"
            icon={<EditOutlined className="cursor-pointer " />}
          ></Button>
          <Popconfirm
            title="Delete the partner"
            onConfirm={() => {
              handleDeletePartner(item);
            }}
            description="Are you sure to delete this partner?"
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
  const handleUpdatePartner = async (data: any) => {
    try {
      const client = new PartnerClient(undefined, instance());
      const rs = await client.update(data);
      if (rs) {
        toastSuccess("Create partner successfully");
        handleCancel();
        form.resetFields();
        dispatch(handleGetAllPartnerData());
      } else {
        toastError("Create partner failed");
      }
    } catch (error) {
      toastError("Create partner failed");
    }
  };
  const handleDeletePartner = async (item: any) => {
    try {
      const client = new PartnerClient(undefined, instance());
      const rs = await client.delete(item.id);
      if (rs) {
        toastSuccess("Delete partner successfully");
        dispatch(handleGetAllPartnerData());
      } else {
        toastError("Delete partner failed");
      }
    } catch (error) {
      toastError("Delete partner failed");
    }
  };
  const handleTriggerEditPartner = (item: any) => {
    setCurrentPartner(item.id);
    showModal("Update Partner");
    form.setFieldsValue(item);
    form.setFieldValue("image", null);
  };
  const handleSearch = async (data: any) => {
    const value = data.target.value.toLowerCase().trim();
    if (value) {
      const rs = partnerList?.filter(
        (item: any) =>
          item.name.trim().toLowerCase().includes(value) ||
          item.description.trim().toLowerCase().includes(value)
      );
      const dataFilter: IPartnerList = {
        partnerDtos: rs,
      };
      dispatch(setPartners(dataFilter));
    } else {
      dispatch(handleGetAllPartnerData());
    }
  };
  return (
    <div className="flex items-start flex-col gap-4 page-admin">
      <div className="w-full flex flex-row-reverse items-center justify-between">
        <Button
          type="primary"
          className="flex items-center bg-primary text-white active:scale-90"
          icon={<PlusOutlined />}
          onClick={() => {
            showModal("Create Partner");
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
      <TableAdmin columns={columns} data={partnerList}></TableAdmin>
      <ModalAdmin
        title={titleModal}
        isModalOpen={isModalOpen}
        handleOk={handleOk}
        okText="Save"
        handleCancel={handleCancel}
      >
        <UpdateAdminPartner form={form}></UpdateAdminPartner>
      </ModalAdmin>
    </div>
  );
};

export default AdminPartner;
