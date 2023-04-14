import React, { useState } from "react";
import Dropdown from "rc-dropdown";
import "rc-dropdown/assets/index.css";
import "./style.css";

const Index = ({ children, buttonContent, icon, menu, placement }) => {
  //   console.log("props", props);
  const [visible, setVisible] = useState(false);

  const onVisibleChange = (visible) => {
    setVisible(visible);
  };
  return (
    <Dropdown
      trigger={["click"]}
      onVisibleChange={onVisibleChange}
      visible={visible}
      closeOnSelect={false}
      placement={placement}
      overlay={menu}
      animation="slide-up"
    >
      {children ? (
        children
      ) : (
        <div className="d-flex align-items-center mx-3 cursor-pointer">
          <button className="dropdown-content__btn ">{buttonContent}</button>
          {icon}
        </div>
      )}
    </Dropdown>
  );
};

export default Index;
