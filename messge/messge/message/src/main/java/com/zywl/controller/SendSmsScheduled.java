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
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.RequestMapping;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

@Component
public class SendSmsScheduled {


    @Autowired
    private volatile SmsConfiguration smsConfiguration;
    @Autowired
    private ContactService contactService;
    @Autowired
    private ContactRecordService contactRecordService;

    private SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");


    private void setParamAndMobile(String param,String mobile){
        smsConfiguration.setParam(param);
        smsConfiguration.setMobile(mobile);
    }
    private  void clearParamAndMobile(){
        smsConfiguration.setMobile("");
        smsConfiguration.setParam("");
    }

    //定时发送短信  spring自带的scheduler定时器:每分钟的第20秒发送一次短信
    @Scheduled(cron = "20 * * * * ?")
    public void schedulel(){
        System.out.println("开始执行定时发送短信");
        List<Contact> list = contactService.selAll();
        for (Contact c : list) {
            setParamAndMobile(c.getPhone(), c.getPhone());//参数即是手机号，又是参数
            String json = JsonUtils.objectToJson(smsConfiguration);
            String rs = HttpClientUtil.doPostJson(smsConfiguration.getResturl(), json);
            SendSmsResult rsjson = JsonUtils.jsonToPojo(rs, SendSmsResult.class);
            Contactrecord record = new Contactrecord();
            record.setRealname(c.getRealname());
            record.setContactid(c.getId());
            record.setContent(smsConfiguration.getContent());
            record.setPhone(c.getPhone());
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
        }
            clearParamAndMobile();
    }
}
