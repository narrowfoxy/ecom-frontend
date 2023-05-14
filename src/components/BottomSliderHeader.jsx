import React from "react";
import AddCardIcon from "@mui/icons-material/AddCard";

const BottomSliderHeader = ({ setIsBottomSheetOpen, isBottomSheetOpen }) => {
  return (
    <div className="flex flex-row justify-between font-bold mb-2">
      <div className="text-lg">
        <AddCardIcon />
        Pay
      </div>
      <div
        onClick={() => {
          setIsBottomSheetOpen(!isBottomSheetOpen);
        }}
        className="text-blue-400"
      >
        Cancel
      </div>
    </div>
  );
};

export default BottomSliderHeader;
