package com.zywl.controller;

import com.zywl.pojo.Contact;
import com.zywl.pojo.Contactrecord;
import com.zywl.pojo.result.SendSmsResult;
import com.zywl.pojo.result.SmsConfiguration;
import com.zywl.service.ContactRecordService;
import com.zywl.service.ContactService;
import com.zywl.utils.HttpClientUtil;
import com.zywl.utils.JsonUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.text.SimpleDateFormat;
import java.util.Date;

@RestController
@RequestMapping("/sms")
public class SmsController {

    @Autowired
    private volatile SmsConfiguration smsConfiguration;
    @Autowired
    private ContactService contactService;
    @Autowired
    private ContactRecordService contactRecordService;

    private SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");

    @RequestMapping("/send")
    public int sendSms(String mobile){
        setParamAndMobile(mobile, mobile);//参数即是手机号，又是参数
        String json = JsonUtils.objectToJson(smsConfiguration);
        String rs = HttpClientUtil.doPostJson(smsConfiguration.getResturl(), json);
        SendSmsResult rsjson = JsonUtils.jsonToPojo(rs, SendSmsResult.class);
        clearParamAndMobile();
        Contactrecord record = new Contactrecord();
        Contact contact = contactService.selByPhone(mobile);
        record.setRealname(contact.getRealname());
        record.setContactid(contact.getId());
        record.setContent(smsConfiguration.getContent());
        record.setPhone(mobile);
        String date = format.format(new Date());
        record.setPosttime(date);
        int flat=0;
        if(rsjson.getMsg().equals("OK")){
           System.out.println("发送成功!");
            record.setStatus(1);
           //存记录
            flat= 1;
        }else {
           System.out.println("发送失败!");
           System.out.println("代码："+rsjson.getCode()+"   "+"错误信息："+rsjson.getMsg());
            record.setStatus(2);
           //存记录
        }
        contactRecordService.insert(record);
        return flat;
    }


    private void setParamAndMobile(String param,String mobile){
        smsConfiguration.setParam(param);
        smsConfiguration.setMobile(mobile);
    }
    private  void clearParamAndMobile(){
        smsConfiguration.setMobile("");
        smsConfiguration.setParam("");
    }
}
