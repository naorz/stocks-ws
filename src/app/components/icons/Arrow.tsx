import React, { SVGProps } from "react";

const Arrow = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      width={20}
      height={20}
      fill="none"
      id="svg5"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M2.469 5.469a1.6 1.6 0 0 1 2.262 0L10 10.737l5.269-5.268A1.6 1.6 0 0 1 17.53 7.73l-6.4 6.4a1.6 1.6 0 0 1-2.262 0l-6.4-6.4a1.6 1.6 0 0 1 0-2.262Z"
        fill="black"
      />
    </svg>
  );
};

export default Arrow;
