package com.zywl.service;

import com.zywl.pojo.User;
import com.zywl.pojo.result.AmResult;

public interface UserService {
    /**
     * 用户登陆
     * @param user
     * @return
     */
    User userLogin(User user);

    /**
     * 用户注册
     * @param user
     * @return
     */
    AmResult userRegist(User user);

    int updateUser(User user);


}
