import React, { useContext } from "react";
import { userDataContext } from "./UserDataContext";

const ShowAddressDetails = () => {
  const addressData = useContext(userDataContext);

  const { userContactData } = addressData || {};
  const { userInfo } = userContactData || {};

  const {
    location = "",
    unit = "",
    state = "",
    postal_code = "",
  } = userInfo || {};

  return (
    <div className="flex flex-col text-[12px]">
      <div className="h-[50%] text-ellipsis overflow-hidden">{location}</div>
      <div className="h-[20%] text-ellipsis overflow-hidden">{unit}</div>
      <div className="h-[20%] text-ellipsis overflow-hidden">{state}</div>
      <div className="h-[10%] text-ellipsis overflow-hidden">{postal_code}</div>
    </div>
  );
};

export default ShowAddressDetails;
