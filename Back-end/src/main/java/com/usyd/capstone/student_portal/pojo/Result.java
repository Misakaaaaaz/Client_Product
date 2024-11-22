package com.usyd.capstone.student_portal.pojo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Result {
    private Integer code;   // http status code, 1-success; 0-failure
    private String msg;
    private Object data;

    //database C/U/D success
    public static Result success(){
        return new Result(1, "success",null);
    }
    //database R success
    public static Result success(Object data){
        return new Result(1,"success", data);
    }

    //error return
    public static Result error(String msg){
        return new Result(0, msg, null);
    }
}
