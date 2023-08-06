import { useEffect, useState } from "react";
import { Button, Input, Form, Popconfirm } from "antd";
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
import { handleGetAllCategoryData } from "../../../redux/categories/categoriesThunk";
import {
  CategoryClient,
  ICategoryDto,
  ICategoryList,
  UpdateCategoryCommand,
} from "../../../services/web-api-client";
import ModalAdmin from "../../../components/admin/Modal";
import UpdateAdminCategory from "./UpdateAdminCategory";
import { toastError, toastSuccess } from "../../../utils/handleToastResponse";
import { setCategories } from "../../../redux/categories/categoriesSlice";
import instance from "../../../services/base-api-client";
const AdminCategory = () => {
  const categoryList = useAppSelector((state) => state.categories.categoryDtos);
  const dispatch = useAppDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [titleModal, setTitleModal] = useState("Create Category");
  const [currentCategory, setCurrentCategory] = useState(0);
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
        const data = new UpdateCategoryCommand();
        data.name = values.name.trim();
        data.description = values.description.trim();
        data.path = values.path.trim();
        if (titleModal == "Update Category") {
          data.id = currentCategory;
        } else {
          data.id = 0;
        }
        handleUpdateCategory(data);
      })
      .catch((_error) => {
        toastError("Create category failed");
      });
  };
  useEffect(() => {
    dispatch(handleGetAllCategoryData());
  }, [dispatch]);
  const columns: ColumnsType<ICategoryDto> = [
    {
      title: "ID.",
      key: "id",
      width: 60,
      dataIndex: "id",
      sorter: (a: any, b: any) => a.id - b.id,
    },
    {
      title: "Name",
      key: "name",
      dataIndex: "name",
      sorter: (a: any, b: any) => a.name?.length - b.name?.length,
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
              handleTriggerEditCategory(item);
            }}
            size="small"
            className="flex items-center justify-center"
            icon={<EditOutlined className="cursor-pointer " />}
          ></Button>

          <Popconfirm
            title="Delete the category"
            onConfirm={() => {
              handleDeleteCategory(item);
            }}
            description="Are you sure to delete this category?"
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
  const handleUpdateCategory = async (data: any) => {
    try {
      const client = new CategoryClient(undefined, instance());
      const rs = await client.update(data);
      if (rs) {
        toastSuccess("Create category successfully");
        handleCancel();
        form.resetFields();
        dispatch(handleGetAllCategoryData());
      } else {
        toastError("Create category failed");
      }
    } catch (error) {
      toastError("Create category failed");
    }
  };
  const handleDeleteCategory = async (item: any) => {
    try {
      const client = new CategoryClient(undefined, instance());
      const rs = await client.delete(item.id);
      if (rs) {
        toastSuccess("Delete category successfully");
        dispatch(handleGetAllCategoryData());
      } else {
        toastError("Delete category failed");
      }
    } catch (error) {
      toastError("Delete category failed");
    }
  };
  const handleTriggerEditCategory = (item: any) => {
    setCurrentCategory(item.id);
    showModal("Update Category");
    form.setFieldsValue(item);
  };
  const handleSearch = async (data: any) => {
    const value = data.target.value.toLowerCase().trim();
    if (value) {
      const rs = categoryList?.filter(
        (item: any) =>
          item.name.trim().toLowerCase().includes(value) ||
          item.description.trim().toLowerCase().includes(value)
      );
      const dataFilter: ICategoryList = {
        categoryDtos: rs,
      };
      dispatch(setCategories(dataFilter));
    } else {
      dispatch(handleGetAllCategoryData());
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
            showModal("Create Category");
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
      <TableAdmin columns={columns} data={categoryList}></TableAdmin>
      <ModalAdmin
        title={titleModal}
        isModalOpen={isModalOpen}
        handleOk={handleOk}
        okText="Save"
        handleCancel={handleCancel}
      >
        <UpdateAdminCategory form={form}></UpdateAdminCategory>
      </ModalAdmin>
    </div>
  );
};

export default AdminCategory;
