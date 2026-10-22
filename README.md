# HỆ THỐNG ĐẶT ĐỒ ĂN TRỰC TUYẾN

**Báo cáo thực hành tuần 7 – Software Implementation & Version Control**

## 1. Giới thiệu dự án

Hệ thống đặt đồ ăn trực tuyến là dự án được thực hiện trong khuôn khổ bài thực hành tuần 7, nhằm xây dựng cấu trúc mã nguồn ban đầu cho một ứng dụng đặt đồ ăn trực tuyến và áp dụng các công cụ quản lý phiên bản trong quá trình phát triển phần mềm.

Dự án tập trung vào việc tổ chức mã nguồn theo các thành phần, xây dựng API lấy thông tin món ăn và sử dụng Git/GitHub để quản lý mã nguồn, theo dõi các thay đổi và hỗ trợ phối hợp làm việc nhóm.

## 2. Mục tiêu dự án

Dự án hướng đến các mục tiêu sau:

- Tổ chức mã nguồn thành các thư mục và gói chức năng rõ ràng.
- Xây dựng cấu trúc ứng dụng bằng Java và Spring Boot.
- Xây dựng API phục vụ việc truy xuất danh sách món ăn.
- Sử dụng Git để quản lý phiên bản mã nguồn.
- Sử dụng GitHub để lưu trữ mã nguồn và phối hợp làm việc nhóm.
- Áp dụng quy trình quản lý nhánh với các nhánh `main`, `develop` và `feature/food-ordering`.
- Xây dựng tài liệu mô tả cấu trúc và hướng dẫn chạy ứng dụng.

## 3. Công nghệ và công cụ sử dụng

Dự án sử dụng các công nghệ và công cụ sau:

- **Java 17:** Ngôn ngữ lập trình được sử dụng để xây dựng ứng dụng.
- **Spring Boot 3.5.6:** Framework hỗ trợ phát triển ứng dụng.
- **Spring Web:** Hỗ trợ xây dựng các API web.
- **Apache Maven:** Công cụ quản lý thư viện phụ thuộc và cấu hình xây dựng dự án.
- **Git:** Công cụ quản lý phiên bản mã nguồn.
- **GitHub:** Nền tảng lưu trữ mã nguồn, quản lý nhánh và Pull Request.
- **Eclipse:** Môi trường phát triển được sử dụng để viết và chạy chương trình.

## 4. Cấu trúc dự án

Mã nguồn được tổ chức theo cấu trúc chính như sau:

```text
online-food-ordering-system/
├── docs/
├── src/
│   └── main/
│       ├── java/
│       │   └── com/
│       │       └── foodordering/
│       │           ├── business/
│       │           │   ├── Food.java
│       │           │   ├── FoodService.java
│       │           │   └── OrderService.java
│       │           ├── data/
│       │           │   └── OrderRepository.java
│       │           ├── presentation/
│       │           │   └── FoodController.java
│       │           └── Application.java
│       └── resources/
│           └── application.properties
├── .gitignore
├── database-design.md
├── pom.xml
├── README.md
└── ui-design.md
```

### Mô tả các thành phần chính

- **business/:** Chứa lớp mô hình món ăn `Food.java` và các lớp dịch vụ như `FoodService.java`, `OrderService.java`.
- **data/:** Chứa lớp `OrderRepository.java`, đại diện cho thành phần truy cập dữ liệu.
- **presentation/:** Chứa lớp `FoodController.java`, đảm nhiệm việc tiếp nhận và xử lý các yêu cầu API ở tầng trình bày.
- **Application.java:** Lớp khởi chạy ứng dụng Spring Boot.
- **application.properties:** Tệp cấu hình ứng dụng, bao gồm cổng chạy của máy chủ.
- **pom.xml:** Tệp cấu hình Maven, khai báo các thư viện phụ thuộc và cấu hình xây dựng dự án.
- **docs/:** Thư mục lưu trữ tài liệu thiết kế và mô tả kiến trúc của dự án.
- **database-design.md:** Tài liệu mô tả thiết kế cơ sở dữ liệu.
- **ui-design.md:** Tài liệu mô tả thiết kế giao diện người dùng.

## 5. Hướng dẫn cài đặt và chạy ứng dụng

### 5.1. Yêu cầu môi trường

Trước khi chạy chương trình, cần chuẩn bị:

- JDK 17.
- Apache Maven hoặc môi trường Maven tích hợp trong IDE.
- Eclipse hoặc một môi trường phát triển Java tương thích.

### 5.2. Tải mã nguồn dự án

Mở Terminal hoặc Command Prompt và thực hiện lệnh:

```bash
git clone https://github.com/hoangnhien653381-maker/online-food-ordering-system.git
```

Sau khi tải thành công, mở thư mục dự án trong Eclipse và chờ Maven tải các thư viện phụ thuộc.

### 5.3. Khởi chạy ứng dụng

Có thể chạy ứng dụng bằng một trong hai cách sau.

**Cách 1: Sử dụng Eclipse**

1. Mở dự án trong Eclipse.
2. Tìm lớp `Application.java`.
3. Nhấn chuột phải vào tệp và chọn **Run As → Java Application** hoặc lựa chọn chạy Spring Boot tương ứng với môi trường đã cài đặt.
4. Kiểm tra cửa sổ Console để xác nhận ứng dụng khởi động thành công.

**Cách 2: Sử dụng Maven**

Mở Terminal tại thư mục gốc chứa tệp `pom.xml`, sau đó chạy lệnh:

```bash
mvn spring-boot:run
```

Ứng dụng được cấu hình sử dụng cổng `8080`.

### 5.4. Kiểm thử API

Sau khi ứng dụng khởi động thành công, mở trình duyệt và truy cập địa chỉ:

```text
http://localhost:8080/api/foods
```

API lấy danh sách món ăn hiện tại trả về dữ liệu JSON dự kiến như sau:

```json
[
  "Cơm gà",
  "Phở bò",
  "Bún thịt nướng",
  "Bánh mì"
]
```

Nếu dữ liệu được trả về đúng định dạng JSON, có thể sử dụng kết quả này để kiểm tra hoạt động của API lấy danh sách món ăn.

## 6. Quy trình quản lý phiên bản

Dự án sử dụng Git và GitHub để quản lý các phiên bản mã nguồn thông qua các nhánh chính:

- **`main`:** Nhánh chính của dự án.
- **`develop`:** Nhánh phát triển và tích hợp mã nguồn.
- **`feature/food-ordering`:** Nhánh phục vụ việc phát triển và cập nhật các thành phần chức năng.

Pull Request được sử dụng để đề xuất tích hợp các thay đổi từ nhánh tính năng vào nhánh phát triển. Quá trình này giúp nhóm theo dõi thay đổi, kiểm tra mã nguồn và quản lý việc tích hợp.

## 7. Tình trạng hiện tại của dự án

Ở giai đoạn thực hành tuần 7, dự án đã xây dựng cấu trúc ứng dụng Spring Boot ban đầu, các lớp thành phần chính và API lấy danh sách món ăn. Nhóm đồng thời sử dụng Git/GitHub để quản lý mã nguồn, tổ chức nhánh, theo dõi lịch sử commit và tích hợp thay đổi thông qua Pull Request.

Các chức năng nghiệp vụ mở rộng, xử lý đơn hàng hoàn chỉnh và tích hợp cơ sở dữ liệu cần được tiếp tục triển khai, kiểm thử trong các giai đoạn phát triển tiếp theo.
