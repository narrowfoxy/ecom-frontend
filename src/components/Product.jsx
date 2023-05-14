import { useQuery } from "@apollo/client";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getProductById } from "../GQL/queries";
import { formatAllProduct } from "../utilities/formatResponseData";
import Progress from "../components/Progress";
import styled from "styled-components";
import Carousel from "./Carousel";
import { Button } from "@mui/material";
import UpdateCartButton from "./UpdateCartButton";

const Product = () => {
  const { productId = "" } = useParams();
  const { navigate } = useNavigate();

  const isLoggedIn = localStorage.getItem("jwt");

  const { data, loading, error } = useQuery(getProductById, {
    variables: {
      productId: productId,
    },
  });

  if (loading) {
    return (
      <div className="mt-[200px] flex justify-center">
        <Progress />
      </div>
    );
  }

  const TitleDiv = styled.div`
    margin: 20px 0px;
    font-size: 1.5rem;
  `;

  if (data) {
    var { product } = data;
    var formattedData = formatAllProduct({ data: product });
    var { name, price, images, description } = formattedData;
  }

  return (
    <div className="dweb:m-auto dweb:w-[50%] mweb:m-[20px] ">
      <TitleDiv>{name}</TitleDiv>
      <div>{description}</div>
      <div className="flex justify-center">
        <Carousel images={images} />
      </div>
      <UpdateCartButton
        isLoggedIn={isLoggedIn}
        price={price}
        productId={productId}
      />
    </div>
  );
};

export default Product;
