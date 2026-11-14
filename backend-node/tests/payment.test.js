const { validatePayment, canRefund } = require("../services/payment");

const unpaidOrder = {
  totalAmount: 132000,
  status: "PENDING_CONFIRM",
  paymentStatus: "UNPAID"
};

describe("validatePayment", () => {
  test("PA01: đơn chưa thanh toán, đúng số tiền thì hợp lệ", () => {
    expect(validatePayment(unpaidOrder, 132000)).toEqual({ valid: true });
  });

  test("PA02: thanh toán thất bại trước đó được thử lại", () => {
    const failed = { ...unpaidOrder, paymentStatus: "FAILED" };
    expect(validatePayment(failed, 132000)).toEqual({ valid: true });
  });

  test("PA03: đơn đã thanh toán thì từ chối", () => {
    const paid = { ...unpaidOrder, paymentStatus: "SUCCESS" };
    expect(validatePayment(paid, 132000)).toEqual({
      valid: false,
      reason: "Đơn hàng đã được thanh toán"
    });
  });

  test("PA04: giao dịch đang xử lý thì từ chối", () => {
    const processing = { ...unpaidOrder, paymentStatus: "PROCESSING" };
    expect(validatePayment(processing, 132000)).toEqual({
      valid: false,
      reason: "Giao dịch đang được xử lý"
    });
  });

  test("PA05: đơn đã hủy thì từ chối", () => {
    const cancelled = { ...unpaidOrder, status: "CANCELLED" };
    expect(validatePayment(cancelled, 132000)).toEqual({
      valid: false,
      reason: "Đơn hàng đã hủy"
    });
  });

  test("PA06: số tiền không khớp tổng tiền đơn thì từ chối", () => {
    expect(validatePayment(unpaidOrder, 100000)).toEqual({
      valid: false,
      reason: "Số tiền thanh toán không khớp tổng tiền đơn"
    });
  });

  test("PA07: số tiền bằng 0 phải báo lỗi", () => {
    expect(() => validatePayment(unpaidOrder, 0))
      .toThrow("Dữ liệu thanh toán không hợp lệ");
  });

  test("PA08: số tiền âm phải báo lỗi", () => {
    expect(() => validatePayment(unpaidOrder, -100))
      .toThrow("Dữ liệu thanh toán không hợp lệ");
  });

  test("PA09: số tiền NaN phải báo lỗi", () => {
    expect(() => validatePayment(unpaidOrder, NaN))
      .toThrow("Dữ liệu thanh toán không hợp lệ");
  });

  test("PA10: số tiền là chuỗi phải báo lỗi", () => {
    expect(() => validatePayment(unpaidOrder, "abc"))
      .toThrow("Dữ liệu thanh toán không hợp lệ");
  });

  test("PA11: thiếu đơn hàng phải báo lỗi", () => {
    expect(() => validatePayment(null, 132000))
      .toThrow("Dữ liệu thanh toán không hợp lệ");
  });

  test("PA12: trạng thái thanh toán không tồn tại phải báo lỗi", () => {
    const unknown = { ...unpaidOrder, paymentStatus: "UNKNOWN" };
    expect(() => validatePayment(unknown, 132000))
      .toThrow("Dữ liệu thanh toán không hợp lệ");
  });
});

describe("canRefund", () => {
  test("RF01: đơn hủy đã thanh toán thì được hoàn tiền", () => {
    const order = { ...unpaidOrder, status: "CANCELLED", paymentStatus: "SUCCESS" };
    expect(canRefund(order)).toBe(true);
  });

  test("RF02: đơn hủy chưa thanh toán thì không hoàn tiền", () => {
    const order = { ...unpaidOrder, status: "CANCELLED" };
    expect(canRefund(order)).toBe(false);
  });

  test("RF03: đơn chưa hủy thì không hoàn tiền", () => {
    const order = { ...unpaidOrder, paymentStatus: "SUCCESS" };
    expect(canRefund(order)).toBe(false);
  });

  test("RF04: dữ liệu đơn không hợp lệ phải báo lỗi", () => {
    expect(() => canRefund(undefined))
      .toThrow("Dữ liệu thanh toán không hợp lệ");
  });
});
