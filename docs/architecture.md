# System Architecture

## 1. Tổng quan

Hệ thống đặt đồ ăn trực tuyến được thiết kế nhằm hỗ trợ khách hàng tìm kiếm món ăn, quản lý giỏ hàng, đặt hàng và theo dõi trạng thái đơn hàng. Hệ thống đồng thời hỗ trợ các nghiệp vụ xử lý đơn hàng của nhà hàng và giao hàng theo phạm vi dự án.

## 2. Kiến trúc hệ thống

Tài liệu này được xây dựng dựa trên thiết kế kiến trúc đã thực hiện trong Lab06.

Các thành phần chính cần được mô tả theo sơ đồ kiến trúc của nhóm:

- **Presentation Layer:** giao diện để người dùng tương tác với hệ thống.
- **Application Layer:** xử lý các nghiệp vụ của hệ thống đặt đồ ăn trực tuyến.
- **Data Layer:** quản lý và truy xuất dữ liệu của hệ thống.

## 3. Luồng xử lý tổng quát

1. Người dùng tương tác với giao diện.
2. Yêu cầu được chuyển đến thành phần xử lý nghiệp vụ.
3. Thành phần nghiệp vụ truy xuất hoặc cập nhật dữ liệu khi cần.
4. Hệ thống trả kết quả về giao diện cho người dùng.

## 4. Tài liệu tham chiếu

Sơ đồ kiến trúc và các thiết kế chi tiết được tham chiếu từ báo cáo Lab06 của nhóm.

**Lưu ý:** Nội dung này là khung tài liệu ban đầu. Khi hoàn thiện, cần đối chiếu tên các tầng, thành phần và công nghệ với sơ đồ kiến trúc thực tế của Lab06.
