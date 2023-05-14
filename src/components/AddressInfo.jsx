import * as React from "react";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";
import { userDataContext } from "./UserDataContext";

const AddressInfo = () => {
  const { userContactData = {}, onDataSubmit } =
    React.useContext(userDataContext);

  const {
    location = "",
    unit = "",
    state = "",
    postal_code: postal = "",
  } = userContactData.userInfo || {};

  const [userAddress, setUserAddress] = React.useState({
    userLocation: location,
    userUnit: unit,
    userState: state,
    userPostal: postal,
  });

  React.useEffect(() => {
    setUserAddress({
      userLocation: location,
      userUnit: unit,
      userState: state,
      userPostal: postal,
    });
  }, [userContactData]);

  const onUserAddressChange = ({ key, value }) => {
    setUserAddress({
      ...userAddress,
      [key]: value,
    });
  };

  const onAddressSave = (e) => {
    e.preventDefault();
    onDataSubmit(userAddress);
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <form onSubmit={onAddressSave}>
        <TextField
          className="w-[100%]"
          value={userAddress.userLocation}
          sx={{ marginBottom: "1rem" }}
          label="Address"
          type="text"
          onChange={(e) =>
            onUserAddressChange({ key: "userLocation", value: e.target.value })
          }
          required
        />
        <TextField
          className="w-[100%]"
          sx={{ marginBottom: "1rem" }}
          value={userAddress.userUnit}
          label="Unit / Floor"
          type="text"
          onChange={(e) =>
            onUserAddressChange({ key: "userUnit", value: e.target.value })
          }
          required
        />
        <TextField
          value={userAddress.userState}
          className="w-[100%]"
          sx={{ marginBottom: "1rem" }}
          label="State"
          type="text"
          onChange={(e) =>
            onUserAddressChange({
              key: "userState",
              value: e.target.value,
            })
          }
          required
        />
        <TextField
          value={userAddress.userPostal}
          className="w-[100%]"
          sx={{ marginBottom: "1rem" }}
          label="Postal Code"
          type="number"
          onChange={(e) =>
            onUserAddressChange({
              key: "userPostal",
              value: Number(e.target.value),
            })
          }
          required
        />
        <Button variant="contained" type="submit" className="w-[100%]">
          Save Address
        </Button>
      </form>
    </div>
  );
};

export default AddressInfo;
