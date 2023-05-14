import React, { useContext, useEffect, useState } from "react";
import {
  GET_CATEGORIES,
  GET_PRODUCT_BY_CATEGORY,
  getAllProducts,
} from "../GQL/queries";
import { useQuery, useLazyQuery } from "@apollo/client";
import Progress from "../components/Progress";
import ShoppingCard from "../components/ShoppingCard";
import { formatAllProduct } from "../utilities/formatResponseData";
import { searchDataContext } from "../components/searchDataContext";

const Home = () => {
  const { data, loading, error, refetch } = useQuery(getAllProducts);
  const searchData = useContext(searchDataContext);
  const [product, setProduct] = useState({});
  const [category, setCategory] = useState("");

  const { search } = searchData;

  const {
    data: categoryData,
    loading: categoryLoading,
    error: categoryError,
  } = useQuery(GET_CATEGORIES);

  const [
    loadProducts,
    { called, loading: productsLoading, data: productsData = {} },
  ] = useLazyQuery(GET_PRODUCT_BY_CATEGORY, {
    fetchPolicy: "no-cache",
    variables: {
      where: {
        categories: {
          name: category,
        },
      },
    },
  });

  const { categories } = categoryData || {};

  const onCategoryClick = ({ name }) => {
    setCategory(name);
    const loadProductData = loadProducts();
  };

  useEffect(() => {
    if (!productsLoading) {
      setProduct(productsData);
    }
  }, [productsLoading]);

  if (loading) {
    return (
      <div className="mt-[200px] flex justify-center">
        <Progress />
      </div>
    );
  }

  const productData = (product.products ? product : data).products.filter(
    (product) => {
      return (
        product.title.includes(search.toLowerCase()) ||
        product.title.includes(search)
      );
    }
  );

  return (
    <div>
      <div className="flex flex-row justify-center">
        <div className="flex w-[90%] mx-2 overflow-auto bg-blue-200 mt-2 px-4 rounded-md">
          {(categories || []).map((cate) => {
            return (
              <div
                onClick={() => {
                  onCategoryClick({ name: cate.name });
                }}
                className={`w-[100px] my-4 flex justify-center items-center h-[40px] rounded-md mr-2 ${
                  category == cate.name ? "bg-blue-400" : ""
                }`}
              >
                <div className="mx-2">{cate.name}</div>
              </div>
            );
          })}
        </div>
      </div>
      {productsLoading ? (
        <div className="mt-[200px] flex justify-center">
          <Progress />
        </div>
      ) : (
        <div className="flex justify-between dweb:justify-start m-4 flex-wrap">
          {productData.map((product) => {
            const cardData = formatAllProduct({ data: product });
            return <ShoppingCard key={product.id} {...cardData} />;
          })}
        </div>
      )}
    </div>
  );
};

export default Home;
