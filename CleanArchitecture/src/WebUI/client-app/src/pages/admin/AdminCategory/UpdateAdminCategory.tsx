import { Form, Input } from "antd";
const { TextArea } = Input;
const onFinish = (values: any) => {
  console.log("Success:", values);
};

const onFinishFailed = (errorInfo: any) => {
  console.log("Failed:", errorInfo);
};
const UpdateAdminCategory = (props: any) => {
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
          <TextArea className="max-h-[250px]" />
        </Form.Item>
      </Form>
    </div>
  );
};

export default UpdateAdminCategory;
