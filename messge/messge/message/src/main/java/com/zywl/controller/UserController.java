package com.zywl.controller;

import com.zywl.pojo.User;
import com.zywl.pojo.result.AmResult;
import com.zywl.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;


@Controller
@RequestMapping("/user")
public class UserController {
    @Resource
    private UserService userService;

    @RequestMapping("/login")
    @ResponseBody
    public AmResult userLoginByUser(User user, String vercode, HttpServletRequest req){
        HttpSession session = req.getSession();
        AmResult result = new AmResult();
        String loginCode = (String) session.getAttribute("loginCode");
        if (loginCode.equalsIgnoreCase(vercode)) {//判断验证码
            if(user!=null){
                User loginUser = userService.userLogin(user);
                System.out.println(loginUser+"------");
                if (loginUser!=null){
                    //把用户信息放入session中
                    session.setAttribute("user",loginUser);
                    result.setState(0);
                    result.setMessage("登入成功!");
                }else {
                    //用户名密码错误
                    result.setState(1);
                    result.setMessage("用户名或密码错误，请重新输入!");
                }
            }else {
                //用户名密码错误
                result.setState(1);
                result.setMessage("用户名或密码错误，请重新输入!");
            }
        }else {//验证码输入错误
            result.setState(1);
            result.setMessage("验证码输入错误，请重新输入!");
        }
        return result;
    }


    @RequestMapping("/login/app")
    @ResponseBody
    public AmResult userLoginByapp(User user){
        AmResult result = new AmResult();
            if(user!=null){
                User loginUser = userService.userLogin(user);
                if (loginUser!=null){
                    //把用户信息放入session中
                    result.setState(0);
                    result.setMessage("登入成功!");
                }
            }else {
                //用户名密码错误
                result.setState(1);
                result.setMessage("用户名或密码错误，请重新输入!");
            }
        return result;
    }


    @RequestMapping("/update")
    @ResponseBody
    public int updateUser(User user,HttpServletRequest req){
        HttpSession session = req.getSession();
        User LoginUser = (User) session.getAttribute("user");
        user.setId(LoginUser.getId());
        LoginUser.setPassword(user.getPassword());
        session.setAttribute("user",LoginUser);
        return  userService.updateUser(user);
    }

    @RequestMapping("/regist")
    @ResponseBody
    public AmResult regist(User user){
        return  userService.userRegist(user);
    }
}
