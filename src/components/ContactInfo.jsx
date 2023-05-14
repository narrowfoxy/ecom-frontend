import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import { userDataContext } from "./UserDataContext";

const ContactInfo = () => {
  const { userContactData = {}, onDataSubmit } =
    React.useContext(userDataContext);

  const [contactData, setContactData] = React.useState({
    userEmail: "",
    userPhoneNumber: "",
  });

  const { email = "", phone_number = "" } = userContactData.userInfo || {};

  React.useEffect(() => {
    setContactData({
      userEmail: email,
      userPhoneNumber: phone_number,
    });
  }, [userContactData]);

  const onUserContactChange = ({ key, value }) => {
    setContactData({
      ...contactData,
      [key]: value,
    });
  };

  const onContactSave = (e) => {
    e.preventDefault();
    onDataSubmit(contactData);
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <form onSubmit={onContactSave}>
        <TextField
          className="w-[100%]"
          sx={{ marginBottom: "1rem" }}
          label="Phone Number"
          type="tel"
          value={contactData.userPhoneNumber}
          onChange={(e) => {
            onUserContactChange({
              key: "userPhoneNumber",
              value: Number(e.target.value),
            });
          }}
        />
        <TextField
          value={contactData.userEmail}
          className="w-[100%]"
          sx={{ marginBottom: "1rem" }}
          label="Email"
          type="email"
          onChange={(e) => {
            onUserContactChange({ key: "userEmail", value: e.target.value });
          }}
        />
        <Button type="submit" variant="contained" className="w-[100%]">
          Save Contact
        </Button>
      </form>
    </div>
  );
};

export default ContactInfo;
