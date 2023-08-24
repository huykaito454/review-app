import { Modal } from "antd";

const ModalAdmin = (props: any) => {
  return (
    <Modal
      className="p-0 m-0 top-0 float-right h-full"
      title={props.title}
      open={props.isModalOpen}
      onOk={props.handleOk}
      onCancel={props.handleCancel}
    >
      {props.children}
    </Modal>
  );
};

export default ModalAdmin;
