import React, { useContext, useState } from "react";
import { validateFormData } from "../utilities/formValidator";
import { Alert } from "@mui/material";

import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { userDataContext } from "./UserDataContext";
import { useMutation } from "@apollo/client";
import { CREATE_AND_UPDATE_USER_CART, CREATE_ORDER } from "../GQL/queries";
import { useNavigate } from "react-router-dom";
import { reloadDataContext } from "./reloadDataContext";

const CheckoutForm = ({ setErrorObject, errorObject }) => {
  const stripe = useStripe();
  const elements = useElements();

  const formData = useContext(userDataContext);
  const reloadData = useContext(reloadDataContext);

  const [postOrderDetails, orderDetails] = useMutation(CREATE_ORDER);

  const [updateCartItem, updatedCartItemData] = useMutation(
    CREATE_AND_UPDATE_USER_CART
  );

  const [isFormDataDone, setisFormDataDone] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    var { userContactData: { userInfo = {} } = {}, cartData = [] } = formData;

    userInfo = userInfo || { };

    const formValidateData = validateFormData(userInfo);
    setErrorObject(formValidateData);
    const cardElement = elements.getElement(CardElement);

    if (!Object.keys(errorObject).length) {
      const payload = await stripe.createToken(cardElement);

      let price = 0;

      cartData.map((ele) => {
        price += ele.Quantity * ele.product.price;
      });

      const orderData = await postOrderDetails({
        variables: {
          input: {
            data: {
              city: userInfo.city,
              state: userInfo.state,
              amount: parseInt(price),
              items: cartData,
              pin: userInfo.postal_code,
              ShippingAddress: userInfo.location,
              token: payload.token.id,
              user: "",
            },
          },
        },
      });

      const updatedCart = await updateCartItem({
        variables: {
          input: {
            data: {
              ItemCart: [],
            },
          },
        },
      });

      if (updateCartItem) {
        reloadData.setIsReloadData(!reloadData.isReloadData);
        navigate("/success");
      }
    }
  };

  const onCardChange = (card) => {
    if (card.complete) {
      setisFormDataDone(true);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement onChange={(card) => onCardChange(card)} />
      <button type="submit" disabled={!stripe || !elements || !isFormDataDone}>
        Pay
      </button>
    </form>
  );
};

export default CheckoutForm;
