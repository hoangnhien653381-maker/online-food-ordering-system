const PAYMENT_STATUSES = ["UNPAID", "PROCESSING", "SUCCESS", "FAILED"];
const ORDER_STATUSES = [
  "PENDING_CONFIRM",
  "PREPARING",
  "READY_FOR_PICKUP",
  "DELIVERING",
  "COMPLETED",
  "CANCELLED",
  "DELIVERY_ISSUE"
];
const ERROR_INVALID_PAYMENT = "Dữ liệu thanh toán không hợp lệ";

function assertValidOrder(order) {
  if (
    !order ||
    typeof order.totalAmount !== "number" ||
    !Number.isFinite(order.totalAmount) ||
    order.totalAmount <= 0 ||
    !ORDER_STATUSES.includes(order.status) ||
    !PAYMENT_STATUSES.includes(order.paymentStatus)
  ) {
    throw new Error(ERROR_INVALID_PAYMENT);
  }
}

function validatePayment(order, amount) {
  assertValidOrder(order);
  if (typeof amount !== "number" || !Number.isFinite(amount) || amount <= 0) {
    throw new Error(ERROR_INVALID_PAYMENT);
  }
  if (order.status === "CANCELLED") {
    return { valid: false, reason: "Đơn hàng đã hủy" };
  }
  if (order.paymentStatus === "SUCCESS") {
    return { valid: false, reason: "Đơn hàng đã được thanh toán" };
  }
  if (order.paymentStatus === "PROCESSING") {
    return { valid: false, reason: "Giao dịch đang được xử lý" };
  }
  if (amount !== order.totalAmount) {
    return {
      valid: false,
      reason: "Số tiền thanh toán không khớp tổng tiền đơn"
    };
  }
  // Đơn UNPAID hoặc FAILED được phép thanh toán (hoặc thử lại).
  return { valid: true };
}

function canRefund(order) {
  assertValidOrder(order);
  return order.status === "CANCELLED" && order.paymentStatus === "SUCCESS";
}

module.exports = { validatePayment, canRefund };
