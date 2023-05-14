import React from "react";

const ShowMethodInfo = ({ time = "3-4 days" }) => {
  return (
    <div className="flex flex-col text-[12px]">
      <div className="h-[50%] text-ellipsis overflow-hidden">{time}</div>
    </div>
  );
};

export default ShowMethodInfo;
