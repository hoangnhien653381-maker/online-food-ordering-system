const ERROR_INVALID_ORDER = "Dữ liệu đơn hàng không hợp lệ";
const ERROR_EMPTY_ORDER = "Đơn hàng phải có ít nhất một món";
const ERROR_INVALID_PROMOTION = "Mã giảm giá không hợp lệ";

function isFiniteNumber(value) {
  return typeof value === "number" && Number.isFinite(value);
}

function calculateSubtotal(items) {
  if (!Array.isArray(items)) {
    throw new Error(ERROR_INVALID_ORDER);
  }
  if (items.length === 0) {
    throw new Error(ERROR_EMPTY_ORDER);
  }
  let subtotal = 0;
  for (const item of items) {
    if (
      !item ||
      !Number.isInteger(item.quantity) ||
      item.quantity <= 0 ||
      !isFiniteNumber(item.unitPrice) ||
      item.unitPrice <= 0
    ) {
      throw new Error(ERROR_INVALID_ORDER);
    }
    subtotal += item.quantity * item.unitPrice;
  }
  return subtotal;
}

function calculateDiscount(subtotal, promotion, now) {
  if (!promotion) {
    return 0;
  }
  const isValidType =
    promotion.discountType === "PERCENT" ||
    promotion.discountType === "FIXED";
  if (
    !isValidType ||
    !isFiniteNumber(promotion.discountValue) ||
    promotion.discountValue <= 0 ||
    !isFiniteNumber(promotion.minOrderAmount) ||
    promotion.minOrderAmount < 0 ||
    (promotion.discountType === "PERCENT" && promotion.discountValue > 100)
  ) {
    throw new Error(ERROR_INVALID_PROMOTION);
  }
  // Mã hết hạn hoặc đơn chưa đạt mức tối thiểu: không giảm, đơn giữ nguyên giá.
  if (promotion.expiryDate < now || subtotal < promotion.minOrderAmount) {
    return 0;
  }
  const discount =
    promotion.discountType === "PERCENT"
      ? Math.round((subtotal * promotion.discountValue) / 100)
      : promotion.discountValue;
  return Math.min(discount, subtotal);
}

/**
 * totalAmount = subtotal + deliveryFee - discountAmount (công thức Lab 06).
 */
function calculateOrderTotal(items, deliveryFee, promotion, now = new Date()) {
  const subtotal = calculateSubtotal(items);
  if (!isFiniteNumber(deliveryFee) || deliveryFee < 0) {
    throw new Error(ERROR_INVALID_ORDER);
  }
  const discountAmount = calculateDiscount(subtotal, promotion, now);
  return {
    subtotal,
    deliveryFee,
    discountAmount,
    totalAmount: subtotal + deliveryFee - discountAmount
  };
}

module.exports = { calculateOrderTotal };
