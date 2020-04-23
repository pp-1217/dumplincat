package com.zywl.service.impl;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.zywl.mapper.ContactrecordMapper;
import com.zywl.pojo.Contact;
import com.zywl.pojo.ContactExample;
import com.zywl.pojo.Contactrecord;
import com.zywl.pojo.ContactrecordExample;
import com.zywl.pojo.result.GtPageResult;
import com.zywl.service.ContactRecordService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.annotation.Resource;
import java.util.List;

@Service
public class ContactRecordServiceImpl implements ContactRecordService {
    @Resource
    private ContactrecordMapper contactrecordMapper;

    @Override
    public int insert(Contactrecord contactrecord) {
        return contactrecordMapper.insert(contactrecord);
    }

    @Override
    public int delete(Long id) {
        ContactrecordExample example = new ContactrecordExample();
        example.createCriteria().andContactidEqualTo(id);
        return contactrecordMapper.deleteByExample(example);
    }

    @Override
    public GtPageResult selAll(int page,int limit) {
        GtPageResult res = new GtPageResult();
        PageHelper.startPage(page,limit);
        List<Contactrecord> list = contactrecordMapper.selectByExample(new ContactrecordExample());
        PageInfo<Contactrecord> info = new PageInfo<Contactrecord>(list);
        res.setData(info.getList());
        res.setMsg("查询全部成功");
        res.setCount((int) info.getTotal());
        res.setCode(0);
        return res;
    }
}
