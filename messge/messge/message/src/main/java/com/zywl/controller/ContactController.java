package com.zywl.controller;

import com.zywl.pojo.Contact;
import com.zywl.pojo.result.GtPageResult;
import com.zywl.service.ContactService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

@Controller
@RequestMapping("/contact")
public class ContactController {

    @Autowired
    private ContactService contactService;


    @RequestMapping("/all")
    @ResponseBody
    public GtPageResult selAll(int page, int limit) {
        return contactService.selAll(page,limit);
    }

    @RequestMapping("/insert")
    @ResponseBody
    public int insert(Contact contact) {
        return contactService.insertContact(contact);
    }
    @RequestMapping("/update")
    @ResponseBody
    public int update(Contact contact) {
        return contactService.updateCoontact(contact);
    }
    @RequestMapping("delete")
    @ResponseBody
    public int delete(Long id) {
        return contactService.deleteById(id);
    }
}