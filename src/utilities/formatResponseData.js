export const formatAllProduct = ({ data }) => {
  const { price, title: name, image: images, category, description, id } = data;

  return {
    id,
    name,
    price,
    images,
    description,
    category,
  };
};
