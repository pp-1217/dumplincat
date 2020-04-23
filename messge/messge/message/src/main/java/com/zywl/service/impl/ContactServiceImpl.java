package com.zywl.service.impl;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.zywl.mapper.ContactMapper;
import com.zywl.pojo.Contact;
import com.zywl.pojo.ContactExample;
import com.zywl.pojo.result.GtPageResult;
import com.zywl.service.ContactService;
import com.zywl.utils.IDUtils;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

@Service
public class ContactServiceImpl implements ContactService {

    @Resource
    private ContactMapper contactMapper;

    @Override
    public GtPageResult  selAll(int page,int limit) {
        GtPageResult res = new GtPageResult();
        PageHelper.startPage(page,limit);
        List<Contact> list = contactMapper.selectByExample(new ContactExample());
        PageInfo<Contact> info = new PageInfo<Contact>(list);
        res.setData(info.getList());
        res.setMsg("查询全部成功");
        res.setCount((int) info.getTotal());
        res.setCode(0);
        return  res;
    }

    @Override
    public List<Contact> selAll() {
        return contactMapper.selectByExample(new ContactExample());
    }

    @Override
    public int insertContact(Contact contact) {
        contact.setId(IDUtils.genItemId());
        return contactMapper.insert(contact);
    }

    @Override
    public int deleteById(Long id) {
        return contactMapper.deleteByPrimaryKey(id);
    }

    @Override
    public int updateCoontact(Contact contact) {
        return contactMapper.updateByPrimaryKeySelective(contact);
    }

    @Override
    public Contact selByPhone(String phone) {
        ContactExample example = new ContactExample();
        example.createCriteria().andPhoneEqualTo(phone);
        List<Contact> list = contactMapper.selectByExample(example);
        if(list!=null&&list.size()>0)
            return list.get(0);
        return null;
    }
}
