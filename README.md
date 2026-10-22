# Online Food Ordering System

## 1. Giới thiệu

Online Food Ordering System là hệ thống đặt đồ ăn trực tuyến được xây dựng trong khuôn khổ bài thực hành Lab06 và Lab07.

Dự án hướng đến việc hỗ trợ khách hàng tìm kiếm món ăn, lựa chọn món, quản lý giỏ hàng, đặt hàng và theo dõi trạng thái đơn hàng. Hệ thống cũng hướng đến việc hỗ trợ nhà hàng xử lý đơn hàng, thanh toán và giao hàng theo phạm vi thiết kế của nhóm.

## 2. Mục tiêu Lab07

- Quản lý mã nguồn bằng Git và GitHub.
- Áp dụng Git Flow trong quá trình phát triển phần mềm theo nhóm.
- Xây dựng Skeleton Code dựa trên kiến trúc đã thiết kế ở Lab06.
- Thực hành tạo nhánh, commit, push và Pull Request.
- Thực hiện Code Review trước khi tích hợp mã nguồn.
- Quản lý lịch sử phiên bản và tài liệu của dự án.

## 3. Chức năng chính

- Đăng ký và đăng nhập tài khoản.
- Tìm kiếm và xem thông tin món ăn.
- Quản lý giỏ hàng và đặt món.
- Thanh toán và theo dõi trạng thái đơn hàng.
- Hỗ trợ nhà hàng xử lý đơn hàng.
- Hỗ trợ cập nhật trạng thái giao hàng.

Các chức năng cụ thể sẽ được triển khai theo thiết kế và phạm vi đã thống nhất của nhóm.

## 4. Cấu trúc repository

```text
online-food-ordering-system/
├── README.md
├── .gitignore
├── docs/
│   ├── architecture.md
│   ├── database-design.md
│   └── ui-design.md
├── backend/
└── frontend/
```

Đây là cấu trúc tổ chức dự kiến. Các thư mục và công nghệ cụ thể sẽ được điều chỉnh theo kiến trúc của dự án Lab06.

## 5. Quy trình Git Flow

- `main`: lưu phiên bản ổn định của dự án.
- `develop`: tích hợp các chức năng đang phát triển.
- `feature/*`: các nhánh phát triển chức năng riêng.

Thành viên tạo nhánh chức năng từ `develop`, thực hiện commit và push lên GitHub, sau đó tạo Pull Request vào `develop`. Mã nguồn được xem xét và kiểm tra trước khi merge.

## 6. Tài liệu dự án

Thư mục `docs/` dự kiến lưu các tài liệu:

- `architecture.md`: tài liệu kiến trúc hệ thống.
- `database-design.md`: tài liệu thiết kế cơ sở dữ liệu.
- `ui-design.md`: tài liệu thiết kế giao diện người dùng.

## 7. Thành viên

- Nguyễn Hoàng Nhiên – 52400084
- Lê Minh Muôn – 52200255
- Trần Trung Hiếu – 52400047
- Trần Văn Phú – 52100989

## 8. Phạm vi Lab07

Lab07 tập trung vào quy trình triển khai phần mềm, quản lý phiên bản bằng Git/GitHub, xây dựng Skeleton Code, phối hợp phát triển thông qua Pull Request và thực hiện Code Review.
