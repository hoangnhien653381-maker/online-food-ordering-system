package com.foodordering.business;

import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;

@Service
public class FoodService {

    public List<String> getFoodList() {
        return Arrays.asList(
                "Cơm gà",
                "Phở bò",
                "Bún thịt nướng",
                "Bánh mì"
        );
    }
}
