import { Form, Input, Upload } from "antd";
import type { RcFile, UploadFile } from "antd/es/upload/interface";
import ImgCrop from "antd-img-crop";
import { useEffect, useState } from "react";
const { TextArea } = Input;
const onFinish = (values: any) => {
  console.log("Success:", values);
};

const onFinishFailed = (errorInfo: any) => {
  console.log("Failed:", errorInfo);
};

const UpdateAdminPartner = (props: any) => {
  const [avatarFile, setAvatarFile] = useState<any>(null);
  useEffect(() => {
    if (avatarFile) {
      props.form.setFieldValue("image", avatarFile);
    }
  }, [avatarFile]);

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
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result;
      setAvatarFile(base64);
    };
    reader.readAsDataURL(file);
    return false;
  };

  return (
    <div className="h-full">
      <Form
        form={props.form}
        name="form_in_modal"
        layout="vertical"
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: "Please input your name!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Path"
          name="path"
          rules={[{ required: true, message: "Please input your path!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Description"
          name="description"
          rules={[
            { required: true, message: "Please input your description!" },
          ]}
        >
          <TextArea className="max-h-[200px]" />
        </Form.Item>
        <Form.Item label="Image" name="image">
          <ImgCrop rotationSlider>
            <Upload
              accept="image/*"
              listType="picture-card"
              onPreview={onPreview}
              maxCount={1}
              onRemove={() => {
                setAvatarFile(null);
              }}
              beforeUpload={(file: any) => handleAvatarUpload(file)}
            >
              + Upload
            </Upload>
          </ImgCrop>
        </Form.Item>
      </Form>
    </div>
  );
};

export default UpdateAdminPartner;
