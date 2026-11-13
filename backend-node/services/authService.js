class AuthError extends Error {
    constructor(message, statusCode = 400) {
        super(message);
        this.statusCode = statusCode;
        this.name = "AuthError";
    }
}
const bcrypt = require("bcryptjs");

const MIN_PASSWORD_LENGTH = 8;
const BCRYPT_COST = 10;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Lưu tạm trong bộ nhớ; dữ liệu mất khi khởi động lại ứng dụng.
const users = [];
let nextId = 1;

function normalizeEmail(email) {
  return email.trim().toLowerCase();
}

async function register(email, password) {
  if (typeof email !== "string" || typeof password !== "string") {
    throw new AuthError("Email và mật khẩu phải là chuỗi");
  }
  const normalizedEmail = normalizeEmail(email);
  if (!normalizedEmail || !password) {
    throw new AuthError("Email và mật khẩu là bắt buộc");
  }
  if (!EMAIL_PATTERN.test(normalizedEmail)) {
    throw new AuthError("Email không hợp lệ");
  }
  if (password.trim().length === 0 || password.length < MIN_PASSWORD_LENGTH) {
    throw new AuthError("Mật khẩu phải có ít nhất 8 ký tự và không được để trống khoảng trắng", 400);
  }
  const existed = users.some(user => user.email === normalizedEmail);
  if (existed) {
    throw new AuthError("Email đã tồn tại", 409);
  }
  const passwordHash = await bcrypt.hash(password, BCRYPT_COST);
  const user = {
    id: nextId++,
    email: normalizedEmail,
    passwordHash
  };
  users.push(user);
  // Không trả passwordHash về cho nơi gọi hàm.
  return { id: user.id, email: user.email };
}

async function login(email, password) {
  if (
    typeof email !== "string" ||
    typeof password !== "string" ||
    !email.trim() ||
    !password.trim()
  ) {
    throw new AuthError("Email và mật khẩu là bắt buộc", 400);
  }
  const normalizedEmail = normalizeEmail(email);
  const user = users.find(item => item.email === normalizedEmail);
  if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
    // Dùng chung một thông báo để không tiết lộ tài khoản có tồn tại hay không.
    throw new AuthError("Email hoặc mật khẩu không đúng", 401);
  }
  return { id: user.id, email: user.email };
}

module.exports = { register, login };