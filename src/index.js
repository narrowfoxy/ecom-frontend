import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "../src/dist/output.css";
import App from "./App";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import { BrowserRouter } from "react-router-dom";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";

import { setContext } from "@apollo/client/link/context";

const httpLink = createHttpLink({
  uri: `${process.env.REACT_APP_LOCAL_HOST}/graphql`,
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem("jwt");
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      Authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const stripePromise = loadStripe(
  "sk_test_51N67DwSILv4UO8xHKy4scd4aukoKSMhvz5EP5s77ghNpkC1foCscqzEUytkOKVGTHMS5Or4KLkvoa5BiJBixATAT00jo7O79ND"
);

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <Elements stripe={stripePromise}>
        <App />
      </Elements>
    </ApolloProvider>
  </React.StrictMode>
);
