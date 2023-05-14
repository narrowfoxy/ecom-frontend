import React from "react";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

const SuccessComponent = () => {
  return (
    <div className="bg-[#86D1EE] grow">
      <div className="flex justify-center">
        <img
        className="dweb:w-[500px] dweb:h-[500px]"
          src="https://img.freepik.com/premium-vector/success-payment-icon-flat-style-approved-money-vector-illustration-isolated-background-successful-pay-sign-business-concept_157943-1354.jpg?w=826"
        />
      </div>
      <div className="text-center font-bold text-[20px] dweb:text-[28px]">
        Your Payment Is Successful
      </div>
      <div className="text-center mt-[20px] text-red-500 underline">
        <a href="/">Back to Home</a>
      </div>
    </div>
  );
};

export default SuccessComponent;
