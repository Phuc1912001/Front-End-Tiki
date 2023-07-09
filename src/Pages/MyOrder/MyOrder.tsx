import React, { useState } from "react";
import { Button, Tooltip } from "antd";

const MyOrder = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenChange = (newIsOpen: any) => {
    setIsOpen(newIsOpen);
  };

  const handleButtonClick = () => {
    // Đóng tooltip
    setIsOpen(false);
  };

  return (
    <div>
      <Tooltip
        title="Tooltip Content"
        trigger="click"
        open={isOpen}
        onOpenChange={handleOpenChange}
        overlay={<Button onClick={handleButtonClick}>Đóng</Button>}
      >
        <Button type="primary">Mở tooltip</Button>
      </Tooltip>
    </div>
  );
};

export default MyOrder;
