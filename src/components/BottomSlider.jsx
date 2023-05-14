import React, { useState } from "react";
import { Button, Divider } from "@mui/material";
import CheckoutForm from "./CheckoutForm";
import BottomSliderHeader from "./BottomSliderHeader";
import ShippingInfo from "./ShippingInfo";
import DetailAccordian from "./DetailAccordian";

const BottomSlider = ({ isBottomSheetOpen, setIsBottomSheetOpen }) => {
  const defaultClassName =
    "border fixed bottom-0 w-[100vw] transition-height duration-500 bg-white z-50 overflow-scroll dweb:overflow-hidden dweb:w-[50%]";

  return (
    <>
      <Button
        className="w-[200px]"
        variant="contained"
        onClick={() => {
          setIsBottomSheetOpen(!isBottomSheetOpen);
        }}
      >
        Checkout
      </Button>
      <div
        className={`${defaultClassName} ${
          isBottomSheetOpen ? "h-[60%] block rounded-t-[15px] py-2 px-4" : "h-0"
        }`}
      >
        <BottomSliderHeader
          setIsBottomSheetOpen={setIsBottomSheetOpen}
          isBottomSheetOpen={isBottomSheetOpen}
        />
        <Divider />
        <DetailAccordian />
      </div>
    </>
  );
};

export default BottomSlider;
