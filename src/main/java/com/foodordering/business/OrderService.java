package com.foodordering.business;

import org.springframework.stereotype.Service;

@Service
public class OrderService {

    public String createOrder(String customerName, String foodName) {
        if (customerName == null || customerName.trim().isEmpty()) {
            return "Tên khách hàng không được để trống.";
        }

        if (foodName == null || foodName.trim().isEmpty()) {
            return "Tên món ăn không được để trống.";
        }

        return "Đơn hàng đã được khởi tạo cho khách hàng: "
                + customerName
                + ", món ăn: "
                + foodName;
    }
}
