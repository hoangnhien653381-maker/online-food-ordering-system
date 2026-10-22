# Hệ thống đặt đồ ăn trực tuyến

## 1. Giới thiệu

Hệ thống đặt đồ ăn trực tuyến được xây dựng nhằm hỗ trợ khách hàng tìm kiếm món ăn, quản lý giỏ hàng, đặt hàng và theo dõi trạng thái đơn hàng. Hệ thống cũng hướng đến hỗ trợ các nghiệp vụ xử lý đơn hàng của nhà hàng và giao hàng.

Đây là dự án thực hành môn học, được phát triển theo các yêu cầu của Lab 7 về Software Implementation & Version Control (Git/GitHub).

## 2. Công nghệ sử dụng

- Ngôn ngữ lập trình: Java
- Framework: Spring Boot
- Công cụ quản lý dự án và thư viện: Maven
- Quản lý mã nguồn: Git và GitHub

## 3. Kiến trúc hệ thống

Dự án kế thừa kiến trúc ba lớp đã được thiết kế trong Lab 6:

- Presentation Layer: tiếp nhận tương tác từ người dùng.
- Business Layer: xử lý nghiệp vụ của hệ thống.
- Data Access Layer: tổ chức các thao tác truy cập dữ liệu.

## 4. Cấu trúc dự án

```text
online-food-ordering-system/
├── src/
│   └── main/
│       └── java/
│           └── com/
│               └── foodordering/
│                   ├── Application.java
│                   ├── presentation/
│                   ├── business/
│                   │   ├── FoodService.java
│                   │   └── OrderService.java
│                   └── data/
│                       └── OrderRepository.java
├── docs/
│   ├── architecture.md
│   ├── database-design.md
│   └── ui-design.md
├── pom.xml
└── README.md
```

## 5. Yêu cầu môi trường

- JDK 17 trở lên, tương thích với cấu hình dự án.
- Apache Maven hoặc Maven Wrapper nếu được bổ sung.
- Git để quản lý phiên bản mã nguồn.

## 6. Cách chạy dự án

Tại thư mục gốc chứa file `pom.xml`, thực hiện:

```bash
mvn clean package
mvn spring-boot:run
```

Hiện tại, dự án đang ở giai đoạn Skeleton Code, gồm lớp khởi động và một số lớp nghiệp vụ ban đầu. Các chức năng hoàn chỉnh, giao diện, kết nối cơ sở dữ liệu và xử lý đơn hàng thực tế sẽ được phát triển theo phạm vi dự án.

## 7. Quản lý phiên bản

Nhóm sử dụng Git và GitHub để quản lý mã nguồn.

- `main`: lưu phiên bản ổn định.
- `develop`: tích hợp công việc phát triển.
- `feature/*`: phát triển các chức năng riêng biệt.

Các thay đổi được tích hợp thông qua Pull Request và Code Review theo quy trình làm việc của nhóm.
