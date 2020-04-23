package com.zywl.controller;

import com.zywl.pojo.result.GtPageResult;
import com.zywl.service.ContactRecordService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;


@Controller
@RequestMapping("/record")
public class ContactRecord {

    @Autowired
    private ContactRecordService contactRecordService;

    @ResponseBody
    @RequestMapping("/all")
    public GtPageResult selAll(int page,int limit){
        return contactRecordService.selAll(page, limit);
    }
    @ResponseBody
    @RequestMapping("/delete")
     public  int delete(Long id){
        return contactRecordService.delete(id);
    }

}
