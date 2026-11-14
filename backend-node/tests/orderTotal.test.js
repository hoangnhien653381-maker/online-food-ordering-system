const { calculateOrderTotal } = require("../services/orderTotal");

const NOW = new Date("2026-11-13T00:00:00Z");
const items = [
  { quantity: 2, unitPrice: 50000 },
  { quantity: 1, unitPrice: 30000 }
];

describe("calculateOrderTotal", () => {
  test("OT01: có mã giảm 10%, tổng 132.000", () => {
    const promotion = {
      discountType: "PERCENT",
      discountValue: 10,
      minOrderAmount: 0,
      expiryDate: new Date("2026-12-31T00:00:00Z")
    };
    expect(calculateOrderTotal(items, 15000, promotion, NOW)).toEqual({
      subtotal: 130000,
      deliveryFee: 15000,
      discountAmount: 13000,
      totalAmount: 132000
    });
  });

  test("OT02: không có mã giảm giá", () => {
    expect(calculateOrderTotal(items, 15000, null, NOW).totalAmount)
      .toBe(145000);
  });

  test("OT03: phí giao hàng bằng 0", () => {
    expect(calculateOrderTotal(items, 0, null, NOW).totalAmount)
      .toBe(130000);
  });

  test("OT04: giảm số tiền cố định 20.000", () => {
    const promotion = {
      discountType: "FIXED",
      discountValue: 20000,
      minOrderAmount: 0,
      expiryDate: new Date("2026-12-31T00:00:00Z")
    };
    expect(calculateOrderTotal(items, 15000, promotion, NOW).totalAmount)
      .toBe(125000);
  });

  test("OT05: mức giảm không vượt tiền món (biên)", () => {
    const promotion = {
      discountType: "FIXED",
      discountValue: 500000,
      minOrderAmount: 0,
      expiryDate: new Date("2026-12-31T00:00:00Z")
    };
    const result = calculateOrderTotal(items, 15000, promotion, NOW);
    expect(result.discountAmount).toBe(130000);
    expect(result.totalAmount).toBe(15000);
  });

  test("OT06: chưa đạt mức tối thiểu thì không giảm", () => {
    const promotion = {
      discountType: "PERCENT",
      discountValue: 10,
      minOrderAmount: 200000,
      expiryDate: new Date("2026-12-31T00:00:00Z")
    };
    expect(calculateOrderTotal(items, 15000, promotion, NOW).discountAmount)
      .toBe(0);
  });

  test("OT07: mã hết hạn thì không giảm", () => {
    const promotion = {
      discountType: "PERCENT",
      discountValue: 10,
      minOrderAmount: 0,
      expiryDate: new Date("2026-01-01T00:00:00Z")
    };
    expect(calculateOrderTotal(items, 15000, promotion, NOW).discountAmount)
      .toBe(0);
  });

  test("OT08: danh sách món rỗng phải báo lỗi", () => {
    expect(() => calculateOrderTotal([], 15000, null, NOW))
      .toThrow("Đơn hàng phải có ít nhất một món");
  });

  test("OT09: số lượng bằng 0 phải báo lỗi", () => {
    expect(() =>
      calculateOrderTotal([{ quantity: 0, unitPrice: 50000 }], 0, null, NOW)
    ).toThrow("Dữ liệu đơn hàng không hợp lệ");
  });

  test("OT10: phí giao hàng âm phải báo lỗi", () => {
    expect(() => calculateOrderTotal(items, -1, null, NOW))
      .toThrow("Dữ liệu đơn hàng không hợp lệ");
  });

  test("OT11: đơn giá là chuỗi phải báo lỗi", () => {
    expect(() =>
      calculateOrderTotal([{ quantity: 1, unitPrice: "abc" }], 0, null, NOW)
    ).toThrow("Dữ liệu đơn hàng không hợp lệ");
  });

  test("OT12: giảm phần trăm vượt 100 phải báo lỗi", () => {
    const promotion = {
      discountType: "PERCENT",
      discountValue: 150,
      minOrderAmount: 0,
      expiryDate: new Date("2026-12-31T00:00:00Z")
    };
    expect(() => calculateOrderTotal(items, 0, promotion, NOW))
      .toThrow("Mã giảm giá không hợp lệ");
  });

  test("OT13: phí giao hàng NaN phải báo lỗi", () => {
    expect(() => calculateOrderTotal(items, NaN, null, NOW))
      .toThrow("Dữ liệu đơn hàng không hợp lệ");
  });

  test("OT14: danh sách món không phải mảng phải báo lỗi", () => {
    expect(() => calculateOrderTotal("abc", 0, null, NOW))
      .toThrow("Dữ liệu đơn hàng không hợp lệ");
  });

  test("OT15: không truyền now thì dùng thời điểm hiện tại", () => {
    const promotion = {
      discountType: "PERCENT",
      discountValue: 10,
      minOrderAmount: 0,
      expiryDate: new Date("2999-12-31T00:00:00Z")
    };
    const result = calculateOrderTotal(items, 15000, promotion);
    expect(result.discountAmount).toBe(13000);
    expect(result.totalAmount).toBe(132000);
  });
});
