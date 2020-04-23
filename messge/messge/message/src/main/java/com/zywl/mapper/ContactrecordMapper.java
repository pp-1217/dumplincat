package com.zywl.mapper;

import com.zywl.pojo.Contactrecord;
import com.zywl.pojo.ContactrecordExample;
import java.util.List;
import org.apache.ibatis.annotations.Param;

public interface ContactrecordMapper {
    int countByExample(ContactrecordExample example);

    int deleteByExample(ContactrecordExample example);

    int insert(Contactrecord record);

    int insertSelective(Contactrecord record);

    List<Contactrecord> selectByExample(ContactrecordExample example);

    int updateByExampleSelective(@Param("record") Contactrecord record, @Param("example") ContactrecordExample example);

    int updateByExample(@Param("record") Contactrecord record, @Param("example") ContactrecordExample example);
}