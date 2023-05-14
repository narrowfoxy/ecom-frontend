import React, { useContext, useState } from "react";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { routerMap } from "./router";
import { reloadDataContext } from "./components/reloadDataContext";
import { searchDataContext } from "./components/searchDataContext";

const stripePromise = loadStripe(
  "pk_test_51MgM6kSDFKrdPLJ7hBNfnyrKOx5GHvkEI1vBpySB80mjp5GgRDxISZP08AIkrjSKiD2PI3fT2IycMzuVdwHeKR7L00heXhBYXf"
);

const router = createBrowserRouter(routerMap);

function App() {
  const [isReloadData, setIsReloadData] = useState(false);
  const [search, setSearch] = useState("");

  const options = {
    // passing the client secret obtained from the server
    clientSecret: "{{CLIENT_SECRET}}",
  };

  return (
    <Elements stripe={stripePromise}>
      <searchDataContext.Provider value={{ search, setSearch }}>
        <reloadDataContext.Provider value={{ isReloadData, setIsReloadData }}>
          <RouterProvider router={router} />
        </reloadDataContext.Provider>
      </searchDataContext.Provider>
    </Elements>
  );
}

export default App;
