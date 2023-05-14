import React from "react";
import Carousel from "react-material-ui-carousel";
import { Paper } from "@mui/material";

function CarouselWrapper({ images }) {

  return (
    <div className="w-[90%] sm:w-[75%]">
      <Carousel navButtonsAlwaysInvisible={true}>
        {images.map((item) => (
          <div key={item.id} className="flex justify-center h-[340px] tablet:h-[540px]">
            <img src={'https://picsum.photos/700/300'} className="object-contain"/>
          </div>
        ))}
      </Carousel>
    </div>
  );
}

function Item(props) {
  return <>Hii</>;
}

export default CarouselWrapper;
