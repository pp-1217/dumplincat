package com.zywl.service;

import com.zywl.pojo.Contactrecord;
import com.zywl.pojo.result.GtPageResult;

import java.util.List;


public interface ContactRecordService {

    int insert(Contactrecord contactrecord);

    int delete(Long id);

    GtPageResult selAll(int page, int limit);
}
