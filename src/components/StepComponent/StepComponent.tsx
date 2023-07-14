import { Steps } from "antd";
import React from "react";

const StepComponent = ({ current = 0, items = [] }: any) => {
  return (
    <Steps current={current}>
      {items.map((item: any) => {
        return (
          <Steps.Step
            key={item.title}
            title={item.title}
            description={item.description}
          />
        );
      })}
    </Steps>
  );
};

export default StepComponent;
