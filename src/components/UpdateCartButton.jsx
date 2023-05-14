import React, { useContext, useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import ButtonGroup from "@mui/material/ButtonGroup";
import { Button } from "@mui/material";
import { useMutation, useQuery } from "@apollo/client";
import {
  CREATE_AND_UPDATE_USER_CART,
  GET_USER_CART_PRODUCTS,
} from "../GQL/queries";
import { getCurrentProductData } from "../utilities/getCurrentProductData";
import { useNavigate } from "react-router-dom";
import { reloadDataContext } from "./reloadDataContext";
import Progress from "./Progress";

const UpdateCartButton = ({ price, isLoggedIn, productId }) => {
  const reloadData = useContext(reloadDataContext);

  const {
    data: { userCart } = {},
    error,
    loading,
    refetch,
  } = useQuery(GET_USER_CART_PRODUCTS, {
    variables: {
      userCartId: "",
    },
  });

  const [updateCartItem, updatedCartItemData] = useMutation(
    CREATE_AND_UPDATE_USER_CART
  );

  const { loading: loadingData } = updatedCartItemData;

  const navigate = useNavigate();

  useEffect(() => {
    refetch().then(() => {
      reloadData.setIsReloadData(!reloadData.isReloadData);
    });
  }, [loadingData]);

  const onClickNonLoggedInButton = () => {
    navigate("/login");
  };

  const [quantity, setQuantity] = useState(0);

  const updateOnClick = async ({ quantity }) => {
    const resultData = await updateCartItem({
      variables: {
        input: {
          data: {
            ItemCart: [
              {
                Quantity: quantity,
                product: productId,
              },
            ],
          },
        },
      },
    });
    setQuantity(quantity);
  };

  useEffect(() => {
    if (userCart && !loading) {
      const productData = getCurrentProductData({ userCart, productId });
      setQuantity(productData.Quantity);
    }
  }, [loading]);

  function getCartButton() {
    if (isLoggedIn) {
      return quantity ? (
        <ButtonGroup
          variant="contained"
          aria-label="outlined primary button group"
        >
          <Button
            variant="contained"
            disabled={!quantity}
            onClick={() => {
              updateOnClick({ quantity: quantity - 1 });
            }}
          >
            <RemoveIcon />
          </Button>
          <Button variant="contained">
            {loadingData ? <Progress /> : quantity}
          </Button>
          <Button
            variant="contained"
            onClick={() => {
              updateOnClick({ quantity: quantity + 1 });
            }}
          >
            <AddIcon />
          </Button>
        </ButtonGroup>
      ) : (
        <Button
          onClick={() => updateOnClick({ quantity: quantity + 1 })}
          variant="contained"
        >
          {loadingData ? <Progress /> : <>Add to Cart</>}
        </Button>
      );
    } else {
      return (
        <Button onClick={onClickNonLoggedInButton} variant="contained">
          Login to Add in cart
        </Button>
      );
    }
  }

  const cartButton = getCartButton();

  return (
    <div className="mb-4 flex justify-between">
      <div className="text-2xl text-green-500">₹ {price}</div>
      {cartButton}
    </div>
  );
};

export default UpdateCartButton;
