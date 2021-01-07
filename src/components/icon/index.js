import React from "react";

const Icon = ({ id = "times", className }) => {
  return <i className={`icon fa fa-${id} ${className}`} />;
};

export default Icon;
