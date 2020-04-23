package com.zywl.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.imageio.ImageIO;
import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.awt.*;
import java.awt.image.BufferedImage;
import java.util.Random;

@Controller
public class verifiCodeImgController {

	@RequestMapping("/verifiCode")
	public void geiVerifiCodeImg(HttpServletResponse resp, HttpServletRequest req) throws Exception {
					 ServletOutputStream os = resp.getOutputStream();
					 BufferedImage img = new BufferedImage(75, 48, 1);
					 Graphics graphics = img.getGraphics();
					 graphics.setColor(Color.WHITE);
					 graphics.fillRect(0, 0, 75, 48);
					 String s = "ABCefghDEFGHI23456JKLTUVuvwsyzWXYZ17890abcdijklnmopqrNNOPQRSst";
					 char[] str = s.toCharArray();
					 String code = "";
					 Random r = new Random();
					 graphics.setFont(new Font("楷体", 3, 22));
					 Color[] colors = { Color.blue, Color.GREEN, Color.RED, Color.darkGray, Color.BLACK, Color.GRAY };
					 for (int i = 0; i <= 3; i++)
		    	     {
						 graphics.setColor(colors[r.nextInt(colors.length)]);
						 int index = r.nextInt(s.length());
						 code = code + str[index];
						 graphics.drawString(str[index]+"", 16 * i, 30 + r.nextInt(11));
						 //graphics.drawS
		              }
					 graphics.setColor(Color.GRAY);
					 for (int i = 0; i <= 3; i++)
					 {
						 graphics.drawLine(r.nextInt(75), r.nextInt(48), r.nextInt(75), r.nextInt(48));
					 }
					 HttpSession session = req.getSession();
					 System.out.println("后台系统生成的登陆验证码" + code);
					 session.setAttribute("loginCode", code);
					 ImageIO.write(img, "jpg", os);
					
	}

    @RequestMapping("/registVerifiCode")
    public void getRegistiVerifiCodeImg(HttpServletResponse resp, HttpServletRequest req) throws Exception {
        ServletOutputStream os = resp.getOutputStream();
        BufferedImage img = new BufferedImage(75, 48, 1);
        Graphics graphics = img.getGraphics();
        graphics.setColor(Color.WHITE);
        graphics.fillRect(0, 0, 75, 48);
        String s = "ABCefghDEFGHI23456JKLTUVuvwsyzWXYZ17890abcdijklnmopqrNNOPQRSst";
        char[] str = s.toCharArray();
        String code = "";
        Random r = new Random();
        graphics.setFont(new Font("楷体", 3, 22));
        Color[] colors = { Color.blue, Color.GREEN, Color.RED, Color.darkGray, Color.BLACK, Color.GRAY };
        for (int i = 0; i <= 3; i++)
        {
            graphics.setColor(colors[r.nextInt(colors.length)]);
            int index = r.nextInt(s.length());
            code = code + str[index];
            graphics.drawString(str[index]+"", 16 * i, 30 + r.nextInt(11));
            //graphics.drawS
        }
        graphics.setColor(Color.GRAY);
        for (int i = 0; i <= 3; i++)
        {
            graphics.drawLine(r.nextInt(75), r.nextInt(48), r.nextInt(75), r.nextInt(48));
        }
        HttpSession session = req.getSession();
        System.out.println("后台系统生成的注册验证码" + code);
        session.setAttribute("registCode", code);
        ImageIO.write(img, "jpg", os);

    }
	@RequestMapping("/getVerifiCode")
	@ResponseBody
	public String AjaxGetCode(HttpSession session) {
		return session.getAttribute("registerCode").toString();
	}
}

