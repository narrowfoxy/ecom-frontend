export const validateFormData = (data) => {
  const error = {};

  Object.keys(data || {}).map((element) => {
    if (!data[element]) {
      error[element] = true;
    }
  });

  return error;
};
