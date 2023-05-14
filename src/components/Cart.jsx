import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import Box from "@mui/material/Box";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { GET_USER_CART_PRODUCTS } from "../GQL/queries";
import { CREATE_AND_UPDATE_USER_CART } from "../GQL/queries";
import { useQuery, useMutation } from "@apollo/client";
import EmptyCart from "./EmptyCart";

export default function Cart({
  setTotalPrice,
  isBottomSheetOpen,
  setCartData,
}) {
  var {
    data: cartData,
    error,
    loading,
    isRefetching,
    refetch,
  } = useQuery(GET_USER_CART_PRODUCTS, {
    variables: {
      userCartId: "",
    },
  });

  if (!cartData) {
    cartData = { userCart: {} };
  }

  if (!cartData.userCart) {
    cartData = { userCart: {} };
  }

  const { userCart: { ItemCart = [] } = {} } = cartData || {};

  const [updateCartItem, updatedCartItemData] = useMutation(
    CREATE_AND_UPDATE_USER_CART
  );

  const { loading: updateCartLoading, data } = updatedCartItemData;

  const onUpdateCartValue = async ({ quantity, productId }) => {
    const updatedCart = await updateCartItem({
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
  };

  const sortedItemCart = [...ItemCart].sort(function (a, b) {
    return a.product.title.localeCompare(b.product.title);
  });

  const buttons = ({ quantity, productId }) => {
    return [
      <Button
        className="rounded-t-lg"
        sx={{
          background: "rgb(245, 244, 249)",
          border: "none !important",
          width: "10px",
          padding: "6px 6px!important",
        }}
        onClick={() => onUpdateCartValue({ quantity: quantity + 1, productId })}
        key="one"
      >
        <AddIcon color="primary" />
      </Button>,
      <Button
        sx={{
          background: "rgb(245, 244, 249)",
          border: "none !important",
          width: "10px",
          padding: "6px 6px!important",
          color: "rgb(25,118,210)",
        }}
        key="two"
      >
        {quantity}
      </Button>,
      <Button
        sx={{
          background: "rgb(245, 244, 249)",
          border: "none !important",
          width: "10px",
          padding: "6px 6px!important",
        }}
        onClick={() =>
          onUpdateCartValue({ quantity: quantity + -1, productId })
        }
        key="three"
      >
        <RemoveIcon color="primary" />
      </Button>,
    ];
  };

  React.useEffect(() => {
    let totalPrice = 0;

    const result = refetch();

    result.then((fetchedData) => {
      const {
        data: {
          userCart: { ItemCart },
        },
      } = fetchedData;

      const validCardItems = [];

      ItemCart.map((item) => {
        const { price, title } = item.product;
        const quantity = item.Quantity;

        totalPrice += parseInt(price) * quantity;

        if (quantity) {
          validCardItems.push(item);
        }
      });

      setTotalPrice(totalPrice);

      setCartData(validCardItems);
    });
  }, [loading, updateCartLoading]);

  if (!ItemCart.length) {
    return <EmptyCart />;
  }

  return (
    <div
      id="order-list"
      className={`bg-[rgb(245,244,249)] h-[100%] dweb:overflow-hidden dweb:border-none ${
        isBottomSheetOpen ? "overflow-hidden" : "overflow-scroll"
      }`}
    >
      <List className="dweb:overflow-hidden" sx={{ padding: "20px", overflow: "scroll" }}>
        {sortedItemCart.map((item) => {
          const { price, title, description, image } = item.product;
          const quantity = item.Quantity;

          if (!quantity) {
            return <></>;
          }

          return (
            <ListItem
              alignItems="flex-start"
              className="bg-white rounded-lg drop-shadow-xl mb-4"
            >
              <ListItemAvatar className="border-2 border-gray-100 mr-2 rounded-lg drop-shadow-xl">
                <Avatar
                  variant="square"
                  className="m-4 bg-blue-400 h-[40px]"
                  alt="Remy Sharp"
                />
              </ListItemAvatar>
              <ListItemText
                primary={title}
                secondary={
                  <React.Fragment>
                    <Typography
                      sx={{ display: "inline", fontWeight: "bold" }}
                      component="span"
                      variant="body2"
                      color="text.primary"
                    >
                      {`$ ${parseInt(price) * quantity}`}
                    </Typography>
                    <br></br>
                    <div className="max-h-[60px] text-ellipsis overflow-hidden">
                      {description}
                    </div>
                  </React.Fragment>
                }
              />
              <Box className="bg-[rgb(245,244,249)] ml-[10px]">
                <ButtonGroup
                  orientation="vertical"
                  aria-label="vertical contained button group"
                >
                  {buttons({
                    productId: item.product.id,
                    quantity: item.Quantity,
                  })}
                </ButtonGroup>
              </Box>
            </ListItem>
          );
        })}
      </List>
    </div>
  );
}
