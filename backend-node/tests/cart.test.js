const { validateAddToCart, MAX_QUANTITY_PER_DISH } = require("../services/cart");

const dish = { dishId: "D1", restaurantId: "R1", isAvailable: true };

describe("validateAddToCart", () => {
  test("CA01: giỏ trống, món còn bán thì cho phép", () => {
    expect(validateAddToCart({ restaurantId: null, items: [] }, dish, 1))
      .toEqual({ allowed: true });
  });

  test("CA02: cùng nhà hàng thì cho phép", () => {
    const cart = { restaurantId: "R1", items: [{ dishId: "D9", quantity: 1 }] };
    expect(validateAddToCart(cart, dish, 2)).toEqual({ allowed: true });
  });

  test("CA03: món của nhà hàng khác thì từ chối", () => {
    const cart = { restaurantId: "R2", items: [{ dishId: "D9", quantity: 1 }] };
    expect(validateAddToCart(cart, dish, 1)).toEqual({
      allowed: false,
      reason: "Giỏ hàng chỉ chứa món của một nhà hàng"
    });
  });

  test("CA04: món hết thì từ chối", () => {
    const soldOut = { ...dish, isAvailable: false };
    expect(validateAddToCart({ restaurantId: null, items: [] }, soldOut, 1))
      .toEqual({ allowed: false, reason: "Món ăn hiện không còn bán" });
  });

  test("CA05: số lượng bằng 0 phải báo lỗi", () => {
    expect(() => validateAddToCart({ restaurantId: null, items: [] }, dish, 0))
      .toThrow("Số lượng không hợp lệ");
  });

  test("CA06: số lượng không phải số nguyên phải báo lỗi", () => {
    expect(() => validateAddToCart({ restaurantId: null, items: [] }, dish, 1.5))
      .toThrow("Số lượng không hợp lệ");
  });

  test("CA07: thiếu thông tin món phải báo lỗi", () => {
    expect(() => validateAddToCart({ restaurantId: null, items: [] }, null, 1))
      .toThrow("Dữ liệu món ăn không hợp lệ");
  });

  test("CA08: danh sách món trong giỏ sai kiểu phải báo lỗi", () => {
    expect(() => validateAddToCart({ restaurantId: null, items: "abc" }, dish, 1))
      .toThrow("Dữ liệu giỏ hàng không hợp lệ");
  });

  test("CA09: số lượng đúng bằng mức tối đa thì cho phép (biên)", () => {
    expect(
      validateAddToCart({ restaurantId: null, items: [] }, dish, MAX_QUANTITY_PER_DISH)
    ).toEqual({ allowed: true });
  });

  test("CA10: cộng dồn vượt mức tối đa thì từ chối (biên)", () => {
    const cart = { restaurantId: "R1", items: [{ dishId: "D1", quantity: 98 }] };
    expect(validateAddToCart(cart, dish, 2)).toEqual({
      allowed: false,
      reason: "Vượt số lượng tối đa cho mỗi món"
    });
  });

  test("CA11: mã món rỗng phải báo lỗi", () => {
    const badDish = { ...dish, dishId: "  " };
    expect(() => validateAddToCart({ restaurantId: null, items: [] }, badDish, 1))
      .toThrow("Dữ liệu món ăn không hợp lệ");
  });
});
