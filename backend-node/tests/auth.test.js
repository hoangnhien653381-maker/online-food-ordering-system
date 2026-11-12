const request = require("supertest");
const app = require("../app");

describe("API Đăng ký / Đăng nhập", () => {
  const email = `khach_${Date.now()}_${Math.random().toString(36).slice(2, 8)}@example.com`;
  const password = "Khach@1234";

  test("Đăng ký tài khoản thành công", async () => {
    const response = await request(app)
      .post("/api/auth/register")
      .send({ email, password });
    expect(response.status).toBe(201);
    expect(response.body.user.email).toBe(email);
    expect(response.body.user.passwordHash).toBeUndefined();
  });

  test("Không cho đăng ký trùng email", async () => {
    const response = await request(app)
      .post("/api/auth/register")
      .send({ email, password });
    expect(response.status).toBe(409);
  });

  test("Đăng nhập thành công", async () => {
    const response = await request(app)
      .post("/api/auth/login")
      .send({ email, password });
    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Đăng nhập thành công");
  });

  test("Từ chối mật khẩu sai", async () => {
    const response = await request(app)
      .post("/api/auth/login")
      .send({ email, password: "WrongPass123" });
    expect(response.status).toBe(401);
  });

  test("Từ chối mật khẩu quá ngắn", async () => {
    const response = await request(app)
      .post("/api/auth/register")
      .send({ email: `short_${Date.now()}@example.com`, password: "123" });
    expect(response.status).toBe(400);
  });

  test("Từ chối email không hợp lệ", async () => {
    const response = await request(app)
      .post("/api/auth/register")
      .send({ email: "khong-phai-email", password });
    expect(response.status).toBe(400);
  });

  test("Từ chối khi thiếu mật khẩu", async () => {
    const response = await request(app)
      .post("/api/auth/register")
      .send({ email: `missing_${Date.now()}@example.com` });
    expect(response.status).toBe(400);
  });
});
