import React from "react";

const CustomInput = ({ ...props }) => {
  return (
    <div className="flex w-full text-black px-2">
        {/* <div>
            {props.icon && <div>
                {props.icon}</div>}
        </div> */}
      {/* <div> */}
        <input
          type={props.type}
          placeholder={props.placeholder}
          value={props.value}
          onChange={props.onChange}
          name={props.name}
        />
      {/* </div> */}
    </div>
  );
};

export default CustomInput;
