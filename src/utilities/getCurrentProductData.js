export const getCurrentProductData = ({ userCart = {}, productId = "" }) => {
  const { ItemCart = [] } = userCart;

  const item = ItemCart.find((item) => item.product.id == productId);

  return item || { Quantity: 0 };
};
