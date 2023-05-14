import React from "react";

const FailureComponent = () => {
  return (
    <div className="grow">
      <div>
        <img
          src="https://img.freepik.com/free-vector/hand-drawn-design-bankruptcy-concept_23-2148506782.jpg?w=826&t=st=1683869469~exp=1683870069~hmac=cc8e20b9b38df2aae12f73c38bf7b7b2055b57acdd046d6925fcd543bdb61f9b"
          alt=""
          srcset=""
        />
      </div>
      <div className="text-center font-bold text-[20px]">
        Your Payment Failed
      </div>
      <div className="text-center mt-[20px] text-red-500 underline">
        <a href="/">Back to Home</a>
      </div>
    </div>
  );
};

export default FailureComponent;
