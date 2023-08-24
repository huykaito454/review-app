import { Button, Input, Avatar, Popconfirm } from "antd";
import {
  SearchOutlined,
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";
import TableAdmin from "../../../components/admin/Table";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { useEffect } from "react";
import { handleGetAllPostData } from "../../../redux/posts/postsThunk";
import { ColumnsType } from "antd/es/table";
import { IPostDto } from "../../../services/web-api-client";
import { useNavigate } from "react-router-dom";
const AdminPosts = () => {
  const partnerList = useAppSelector((state) => state.posts.postDtos);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const columns: ColumnsType<IPostDto> = [
    {
      title: "ID.",
      key: "id",
      dataIndex: "id",
      width: 60,
      sorter: (a: any, b: any) => a.id - b.id,
    },
    {
      title: "Title",
      key: "title",
      sorter: (a: any, b: any) => a.title?.length - b.title?.length,
      render: (item) => (
        <>
          <Avatar
            className="cursor-pointer mr-4"
            size="default"
            shape="square"
            src={<img src={item.thumbnail} alt="image" />}
          />
          <span>{item.title}</span>
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
      title: "Rate",
      key: "rate",
      dataIndex: "rate",
      sorter: (a: any, b: any) => Number(a.rate) - Number(b.rate),
    },
    {
      title: "Action",
      key: "id",
      width: 80,
      render: (item) => (
        <div className="flex items-center gap-4">
          <Button
            onClick={() => {
              handleEdit(item);
            }}
            size="small"
            className="flex items-center justify-center"
            icon={<EditOutlined className="cursor-pointer " />}
          ></Button>
          <Popconfirm
            title="Delete the partner"
            onConfirm={() => {
              handleDelete(item);
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
  const handleDelete = async (item: any) => {};
  const handleEdit = async (item: any) => {};
  useEffect(() => {
    dispatch(handleGetAllPostData());
  }, [dispatch]);
  const handleSearch = async (data: any) => {};
  return (
    <div className="flex items-start flex-col gap-4 page-admin">
      <div className="w-full flex flex-row-reverse items-center justify-between">
        <Button
          type="primary"
          className="flex items-center bg-primary text-white active:scale-90"
          icon={<PlusOutlined />}
          onClick={() => {
            navigate("/admin/new-posts-management");
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
    </div>
  );
};

export default AdminPosts;
