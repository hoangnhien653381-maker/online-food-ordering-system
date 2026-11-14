const MAX_QUANTITY_PER_DISH = 99;

function validateAddToCart(cart, dish, quantity) {
  if (!cart || !Array.isArray(cart.items)) {
    throw new Error("Dữ liệu giỏ hàng không hợp lệ");
  }
  if (
    !dish ||
    typeof dish.dishId !== "string" ||
    dish.dishId.trim() === "" ||
    typeof dish.restaurantId !== "string" ||
    dish.restaurantId.trim() === "" ||
    typeof dish.isAvailable !== "boolean"
  ) {
    throw new Error("Dữ liệu món ăn không hợp lệ");
  }
  if (!Number.isInteger(quantity) || quantity <= 0) {
    throw new Error("Số lượng không hợp lệ");
  }
  if (!dish.isAvailable) {
    return { allowed: false, reason: "Món ăn hiện không còn bán" };
  }
  // Giỏ hàng chỉ chứa món của một nhà hàng.
  if (cart.restaurantId && cart.restaurantId !== dish.restaurantId) {
    return {
      allowed: false,
      reason: "Giỏ hàng chỉ chứa món của một nhà hàng"
    };
  }
  const existing = cart.items.find(item => item.dishId === dish.dishId);
  const currentQuantity = existing ? existing.quantity : 0;
  if (currentQuantity + quantity > MAX_QUANTITY_PER_DISH) {
    return { allowed: false, reason: "Vượt số lượng tối đa cho mỗi món" };
  }
  return { allowed: true };
}

module.exports = { validateAddToCart, MAX_QUANTITY_PER_DISH };
