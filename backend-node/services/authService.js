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
    throw new Error("Email và mật khẩu phải là chuỗi");
  }
  const normalizedEmail = normalizeEmail(email);
  if (!normalizedEmail || !password) {
    throw new Error("Email và mật khẩu là bắt buộc");
  }
  if (!EMAIL_PATTERN.test(normalizedEmail)) {
    throw new Error("Email không hợp lệ");
  }
  if (password.length < MIN_PASSWORD_LENGTH) {
    throw new Error("Mật khẩu phải có ít nhất 8 ký tự");
  }
  const existed = users.some(user => user.email === normalizedEmail);
  if (existed) {
    throw new Error("Email đã tồn tại");
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
    !password
  ) {
    throw new Error("Email và mật khẩu là bắt buộc");
  }
  const normalizedEmail = normalizeEmail(email);
  const user = users.find(item => item.email === normalizedEmail);
  if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
    // Dùng chung một thông báo để không tiết lộ tài khoản có tồn tại hay không.
    throw new Error("Email hoặc mật khẩu không đúng");
  }
  return { id: user.id, email: user.email };
}

module.exports = { register, login };
