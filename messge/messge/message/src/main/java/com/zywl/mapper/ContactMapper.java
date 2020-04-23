package com.zywl.mapper;

import com.zywl.pojo.Contact;
import com.zywl.pojo.ContactExample;
import java.util.List;
import org.apache.ibatis.annotations.Param;

public interface ContactMapper {
    int countByExample(ContactExample example);

    int deleteByExample(ContactExample example);

    int deleteByPrimaryKey(Long id);

    int insert(Contact record);

    int insertSelective(Contact record);

    List<Contact> selectByExample(ContactExample example);

    Contact selectByPrimaryKey(Long id);

    int updateByExampleSelective(@Param("record") Contact record, @Param("example") ContactExample example);

    int updateByExample(@Param("record") Contact record, @Param("example") ContactExample example);

    int updateByPrimaryKeySelective(Contact record);

    int updateByPrimaryKey(Contact record);
}