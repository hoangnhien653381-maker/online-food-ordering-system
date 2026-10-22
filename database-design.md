# Database Design

## 1. Tổng quan

Tài liệu này mô tả thiết kế cơ sở dữ liệu của hệ thống đặt đồ ăn trực tuyến. Nội dung được xây dựng dựa trên sơ đồ ERD và thiết kế cơ sở dữ liệu đã thực hiện trong Lab06.

## 2. Mục đích

Cơ sở dữ liệu hỗ trợ lưu trữ và quản lý dữ liệu phục vụ các nghiệp vụ chính của hệ thống, bao gồm:

- Thông tin tài khoản người dùng.
- Thông tin nhà hàng và món ăn.
- Giỏ hàng và đơn hàng.
- Thông tin thanh toán.
- Thông tin giao hàng và trạng thái đơn hàng.

Các thực thể và thuộc tính cụ thể được xác định theo sơ đồ ERD của nhóm.

## 3. Thiết kế dữ liệu

Sơ đồ ERD trong báo cáo Lab06 là tài liệu tham chiếu chính cho cấu trúc cơ sở dữ liệu.

Khi hoàn thiện phần triển khai, nhóm cần đối chiếu tên bảng, thuộc tính, khóa chính, khóa ngoại và các mối quan hệ với sơ đồ ERD đã thống nhất.

## 4. Nguyên tắc cập nhật

- Thống nhất cấu trúc dữ liệu trước khi tích hợp mã nguồn.
- Trao đổi với các thành viên trước khi thay đổi thiết kế ảnh hưởng đến chức năng khác.
- Cập nhật tài liệu khi thiết kế cơ sở dữ liệu có thay đổi.
- Không đưa mật khẩu thật, dữ liệu cá nhân của khách hàng hoặc thông tin thanh toán nhạy cảm vào repository.

## 5. Tài liệu tham chiếu

Báo cáo Lab06 – Hệ thống đặt đồ ăn trực tuyến, phần thiết kế cơ sở dữ liệu và sơ đồ ERD.
