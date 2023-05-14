import React from "react";
import Home from "./pages/Home";
import Product from "./components/Product";
import Login from "./components/Login";
import Navigation from "./components/Navigation";
import Signup from "./components/Signup";
import Cart from "./components/Cart";
import Checkout from "./components/Checkout";
import SuccessComponent from "./components/SuccessComponent";
import FailureComponent from "./components/FailureComponent";

const HomePath = (
  <>
    <Navigation />
    <Home />
  </>
);

const ProductPath = (
  <>
    <Navigation hideSearch={true} />
    <Product />
  </>
);

const LoginPath = (
  <>
    <Navigation hideSearch={true} />
    <Login />
  </>
);

const SignupPath = (
  <>
    <Navigation hideSearch={true} />
    <Signup />
  </>
);

const CartPath = (
  <div className="flex flex-col h-[100vh] dweb:bg-white">
    <Navigation hideSearch={true} />
    <Checkout Cart={Cart} />
  </div>
);

const SuccessPath = (
  <>
    <Navigation hideSearch={true} />
    <SuccessComponent />
  </>
);

const FailurePath = (
  <>
    <Navigation hideSearch={true} />
    <FailureComponent />
  </>
)

export const routerMap = [
  {
    path: "/",
    element: HomePath,
  },
  {
    path: "/product/:productId",
    element: ProductPath,
  },
  {
    path: "/login",
    element: LoginPath,
  },
  {
    path: "/signup",
    element: SignupPath,
  },
  {
    path: "/cart",
    element: CartPath,
  },
  {
    path: "/success",
    element: SuccessPath,
  },
  {
    path: "/failure",
    element: FailurePath
  }
];
