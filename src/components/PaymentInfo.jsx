import React from "react";
import CheckoutForm from "./CheckoutForm";

const PaymentInfo = ({ setErrorObject, errorObject }) => {
  return (
    <div>
      <CheckoutForm setErrorObject={setErrorObject} errorObject={errorObject} />
    </div>
  );
};

export default PaymentInfo;
