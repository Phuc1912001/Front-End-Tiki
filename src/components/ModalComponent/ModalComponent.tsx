import { Modal } from "antd";
import "./ModalComponent.scss";
const ModalComponent = ({
  title = "Modal",
  isOpen = false,
  children,
  ...rests
}: any) => {
  return (
    <Modal title={title} open={isOpen} {...rests}>
      <div className="modal-content-wrapper">
        <div className="modal-content">{children}</div>
      </div>
    </Modal>
  );
};

export default ModalComponent;
