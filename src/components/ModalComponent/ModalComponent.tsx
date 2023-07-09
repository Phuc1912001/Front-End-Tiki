import { Modal } from "antd";

const ModalComponent = ({
  title = "Modal",
  isOpen = false,
  children,
  ...rests
}: any) => {
  return (
    <Modal title={title} open={isOpen} {...rests}>
      {children}
    </Modal>
  );
};

export default ModalComponent;
