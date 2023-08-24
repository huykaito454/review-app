import { UploadOutlined } from "@ant-design/icons";
import { Button, Card, Input, Form, UploadFile, Select } from "antd";
import Upload, { RcFile } from "antd/es/upload";
const { TextArea } = Input;
import ReactQuill from "react-quill";
import EditorToolbar, { modules, formats } from "./EditorToolbar";
import "react-quill/dist/quill.snow.css";
import { useState, useRef, useEffect } from "react";
import { toastError, toastSuccess } from "../../../utils/handleToastResponse";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { handleGetAllCategoryData } from "../../../redux/categories/categoriesThunk";
import {
  CategoryDto,
  PostClient,
  UpdatePostCommand,
} from "../../../services/web-api-client";
import instance from "../../../services/base-api-client";
import { useNavigate } from "react-router-dom";
import Quill from "quill";
const AdminNewPost = () => {
  const categoryList = useAppSelector((state) => state.categories.categoryDtos);
  const [value, setValue] = useState<any>(null);
  const navigate = useNavigate();
  const [categoryOption, setCategoryOption] = useState<any>([]);
  const [thumbnailFile, setThumbnailFile] = useState<any>(null);
  const [form] = Form.useForm();
  const quillRef = useRef<any>(null);
  const dispatch = useAppDispatch();
  const handleSubmit = () => {
    form
      .validateFields()
      .then((values) => {
        if (true) {
          const data = new UpdatePostCommand();
          data.title = values.title.trim();
          data.description = values.description.trim();
          data.path = values.path.trim();
          data.rate = values.rate.toString();
          data.category = values.category;
          data.content = value;
          if (values.thumbnail) {
            data.thumbnail = values.thumbnail;
          }
          if (true) {
            data.id = 0;
          }
          handleUpdate(data);
        }
      })
      .catch((_error) => {
        toastError("Create post failed");
      });
  };
  const handleUpdate = async (data: any) => {
    try {
      const client = new PostClient(undefined, instance());
      const rs = await client.update(data);
      if (rs) {
        toastSuccess("Create post successfully");
        navigate("/admin/posts-management");
      } else {
        toastError("Create post failed");
      }
    } catch (error) {
      toastError("Create post failed");
    }
  };
  useEffect(() => {
    dispatch(handleGetAllCategoryData());
    if (categoryList && categoryOption.length <= 0) {
      let options: any = [];
      categoryList.forEach((item: CategoryDto) => {
        options.push({ value: item.id, label: item.name });
      });
      setCategoryOption(options);
    }
  }, [dispatch, categoryOption]);
  useEffect(() => {
    if (thumbnailFile) {
      form.setFieldValue("thumbnail", thumbnailFile);
    }
  }, [thumbnailFile]);

  const onPreview = async (file: UploadFile) => {
    let src = file.url as string;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj as RcFile);
        reader.onload = () => resolve(reader.result as string);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
  };
  const handleAvatarUpload = async (file: any) => {
    if (file.type.includes("image")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result;
        setThumbnailFile(base64);
      };
      reader.readAsDataURL(file);
    }
    return false;
  };
  return (
    <div className="flex items-start flex-row-reverse gap-4 page-admin">
      <div className="w-[70%] h-full">
        <EditorToolbar toolbarId={"t1"} />
        <ReactQuill
          ref={quillRef}
          theme="snow"
          value={value}
          onChange={setValue}
          placeholder={"Write something awesome..."}
          modules={modules("t1")}
          formats={formats}
        />
      </div>
      <Card className="w-[30%] border-[#d2d2d2] rounded-none">
        <div className="flex gap-2 flex-col">
          <Form
            name="form_in_modal"
            layout="vertical"
            form={form}
            style={{ maxWidth: 600 }}
            initialValues={{ remember: true }}
            autoComplete="off"
          >
            <Form.Item
              label="Title"
              name="title"
              rules={[{ required: true, message: "Please input title!" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Path"
              name="path"
              rules={[{ required: true, message: "Please input path!" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Rate"
              name="rate"
              rules={[{ required: true, message: "Please input rate!" }]}
            >
              <Input type="number" />
            </Form.Item>
            <Form.Item
              label="Category"
              name="category"
              rules={[{ required: true, message: "Please input path!" }]}
            >
              <Select
                placeholder="Select Category"
                defaultValue={null}
                options={categoryOption}
              />
            </Form.Item>
            <Form.Item
              name="description"
              label="Description"
              rules={[{ required: true, message: "Please input description!" }]}
            >
              <TextArea className="max-h-[250px]" />
            </Form.Item>
            <Form.Item label="Thumbnail" name="thumbnail">
              <Upload
                accept="image/*"
                listType="picture-card"
                onPreview={onPreview}
                maxCount={1}
                onRemove={() => {
                  setThumbnailFile(null);
                }}
                beforeUpload={(file: any) => handleAvatarUpload(file)}
              >
                + Upload
              </Upload>
            </Form.Item>
          </Form>
          <div className="w-full flex justify-end">
            <Button
              type="primary"
              className="flex items-center bg-primary text-white active:scale-90"
              icon={<UploadOutlined />}
              onClick={handleSubmit}
            >
              Post
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default AdminNewPost;
