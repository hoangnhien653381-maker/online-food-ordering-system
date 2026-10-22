package com.foodordering.data;

import org.springframework.stereotype.Repository;

@Repository
public class OrderRepository {

    public String getRepositoryStatus() {
        return "OrderRepository is ready.";
    }
}
