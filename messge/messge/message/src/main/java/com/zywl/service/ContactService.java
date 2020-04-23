package com.zywl.service;

import com.zywl.pojo.Contact;
import com.zywl.pojo.result.GtPageResult;

import java.util.List;

public interface ContactService {

    GtPageResult selAll(int page, int limit);

    List<Contact> selAll();

    int insertContact(Contact contact);

    int deleteById(Long id);

    int updateCoontact(Contact contact);

    Contact selByPhone(String phone);
}
