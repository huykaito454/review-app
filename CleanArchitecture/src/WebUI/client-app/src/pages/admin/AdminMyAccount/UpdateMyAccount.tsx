import { Form, Input, UploadFile } from "antd";
import Upload, { RcFile } from "antd/es/upload";
import { useEffect, useState } from "react";
import ImgCrop from "antd-img-crop";
const onFinish = (values: any) => {
  console.log("Success:", values);
};

const onFinishFailed = (errorInfo: any) => {
  console.log("Failed:", errorInfo);
};
const UpdateMyAccount = (props: any) => {
  const [avatarFile, setAvatarFile] = useState<any>(null);
  useEffect(() => {
    if (avatarFile) {
      props.form.setFieldValue("avatar", avatarFile);
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
    if (file.type.includes("image")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result;
        setAvatarFile(base64);
      };
      reader.readAsDataURL(file);
    }
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
          label="Full Name"
          name="name"
          rules={[{ required: true, message: "Please input your full name!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: "Please input your email!" },
            {
              type: "email",
              message: "The input is not valid email!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="phoneNumber"
          label="Phone Number"
          rules={[
            { required: true, message: "Please input your phone number!" },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          name="confirm"
          label="Confirm Password"
          dependencies={["password"]}
          hasFeedback
          rules={[
            {
              required: true,
              message: "Please confirm your password!",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("The two passwords that you entered do not match!")
                );
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item label="Image" name="avatar">
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

export default UpdateMyAccount;
