import React from "react";
import { useContext } from "react";
import { userDataContext } from "./UserDataContext";

const ShowContactDetails = () => {
  const contactData = useContext(userDataContext);
  const { userContactData } = contactData || {};
  const { userInfo } = userContactData || {};

  const { phone_number, email } = userInfo || {};

  return (
    <div className="flex flex-col text-[12px]">
      <div className="h-[50%] text-ellipsis overflow-hidden">
        {phone_number}
      </div>
      <div className="h-[20%] text-ellipsis overflow-hidden">{email}</div>
    </div>
  );
};

export default ShowContactDetails;
