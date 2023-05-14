import React, { useEffect, useState } from "react";
import BottomSlider from "./BottomSlider";
import { userDataContext } from "./UserDataContext";
import { useMutation, useQuery } from "@apollo/client";
import { GET_USER_CONTACT_INFO, POST_USER_CONTACT_DATA } from "../GQL/queries";

const Checkout = ({ Cart }) => {
  const [totalPrice, setTotalPrice] = useState(0);
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);

  const [cartData, setCartData] = useState([]);

  const {
    data: userInfo,
    loading,
    error,
    refetch,
  } = useQuery(GET_USER_CONTACT_INFO, {
    variables: {
      userInfoId: "",
    },
  });

  const [postUserContactData, userContactModifiedData] = useMutation(
    POST_USER_CONTACT_DATA
  );

  const { data: postMutateData } = userContactModifiedData;

  const [userContactData, setUserContactData] = useState(userInfo);

  useEffect(() => {
    if (userInfo) {
      setUserContactData(userInfo);
    }
  }, [loading]);

  useEffect(() => {
    const refetchedData = refetch();
    refetchedData.then((data) => {
      const { data: userMutationData } = data;
      setUserContactData(userMutationData);
    });
  }, [postMutateData]);

  const onDataSubmit = (data) => {
    const userMapping = {
      userLocation: "location",
      userUnit: "unit",
      userState: "state",
      userPostal: "postal_code",
      userPhoneNumber: "phone_number",
      userEmail: "email",
    };

    const postData = {};

    for (let key in data) {
      postData[userMapping[key]] = data[key];
    }

    const userPostData = postUserContactData({
      variables: {
        input: {
          data: postData,
        },
      },
    });
  };

  const closeOnModalOpen = (e) => {
    if (isBottomSheetOpen) {
      e.stopPropagation();
      setIsBottomSheetOpen(!isBottomSheetOpen);
    }
  };

  return (
    <userDataContext.Provider
      value={{ userContactData, setUserContactData, onDataSubmit, cartData }}
    >
      <div className="bg-[rgb(245,244,249)] flex flex-col items-between overflow-auto grow dweb:w-[50%] dweb:m-auto">
        <div
          onClick={(e) => closeOnModalOpen(e)}
          className={`overflow-auto grow ${
            isBottomSheetOpen ? "opacity-30" : ""
          } ${
            !cartData.length ? "bg-white" : ""
          }`}
        >
          <Cart
            setCartData={setCartData}
            isBottomSheetOpen={isBottomSheetOpen}
            setTotalPrice={setTotalPrice}
            totalPrice={totalPrice}
          />
        </div>
        {!cartData.length ? null : (
          <div className="min-h-[120px] relative flex flex-col items-center bg-[rgb(245,244,249)]">
            <div className="flex justify-between w-[100%] p-4 border-t-2 border-grey-200">
              <div>Total</div>
              <div>{`$ ${totalPrice}`}</div>
            </div>
            <BottomSlider
              isBottomSheetOpen={isBottomSheetOpen}
              setIsBottomSheetOpen={setIsBottomSheetOpen}
            />
          </div>
        )}
      </div>
    </userDataContext.Provider>
  );
};

export default Checkout;
