export const addToCart = (item) => {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  const index = cart.findIndex((cartItem) => cartItem === item);

  if (index == -1) {
    cart.push(item);
  }

  localStorage.setItem("cart", JSON.stringify(cart));
};

export const removeFromCart = (itemId) => {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  const updatedCart = cart.filter((item) => item !== itemId);

  localStorage.setItem("cart", JSON.stringify(updatedCart));
};

export const getCart = () => {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  return cart;
};
