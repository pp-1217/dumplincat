package com.zywl.service.impl;

import com.zywl.mapper.UserMapper;
import com.zywl.pojo.User;
import com.zywl.pojo.UserExample;
import com.zywl.pojo.result.AmResult;
import com.zywl.service.UserService;
import com.zywl.utils.IDUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

@Service
public class UserServiceImpl implements UserService {
    @Resource
    private UserMapper userMapper;

    @Override
    public User userLogin(User user) {
        UserExample example = new UserExample();
        example.createCriteria().andUsernameEqualTo(user.getUsername()).andPasswordEqualTo(user.getPassword());
        List<User> users = userMapper.selectByExample(example);
        if(users!=null&&users.size()>0){
            return  users.get(0);
        }
        return null;
    }

    @Override
    public AmResult userRegist(User user) {
        AmResult result = new AmResult();
        //先查询该用户有没有注册
        UserExample example = new UserExample();
        example.createCriteria().andUsernameEqualTo(user.getUsername());
        List<User> users = userMapper.selectByExample(example);
        if(users!=null&&users.size()>0){
            result.setMessage("该用户已注册！");
            result.setState(1);
        }else {
            long id = IDUtils.genItemId();
            user.setId(id);
            SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
            String date = format.format(new Date());
            user.setCreateTime(date);
            user.setUpdateTime(date);
            int rs = userMapper.insert(user);
            if (rs>0){
                result.setMessage("注册成功！");
                result.setState(0);
            }
        }
        return result;
    }

    @Override
    public int updateUser(User user) {
        return userMapper.updateByPrimaryKeySelective(user);
    }


}
