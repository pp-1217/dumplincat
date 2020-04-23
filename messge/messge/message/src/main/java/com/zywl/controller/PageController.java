package com.zywl.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class PageController {

    /**
     * 默认进入登陆页面
     * @return
     */
    @RequestMapping("/")
    public String DefaultLoginPage(){
        return "/login";
    }

    /**
     * 主页面
     * @return
     */
    @RequestMapping("/page/index")
    public String indexPage(){
        return "/index";
    }

    /**
     * 默认主页
     * @return
     */
    @RequestMapping("/page/homepage")
    public String homepage(){
        return "/homepage";
    }

    /**
     * 分类管理页面
     * @return
     */
    @RequestMapping("/page/contact")
    public String classifyPage(){
        return "/contact";
    }

    /**
     * 音频文字管理页面
     * @return
     */
    @RequestMapping("/page/contactRecord")
    public String audioPage(){
        return "/contactRecord";
    }

    @RequestMapping("/page/password")
    public String passwordPage(){
        return "/password";
    }


}
