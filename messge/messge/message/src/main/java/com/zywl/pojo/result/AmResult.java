package com.zywl.pojo.result;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


//lombok插件
@Data
@NoArgsConstructor
@AllArgsConstructor
public class AmResult {
    private String message;
    private int state;

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public int getState() {
        return state;
    }

    public void setState(int state) {
        this.state = state;
    }
}
