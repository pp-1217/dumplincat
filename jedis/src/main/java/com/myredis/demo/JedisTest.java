package com.myredis.demo;
import org.junit.Test;
import redis.clients.jedis.Jedis;

import java.util.List;
import java.util.Map;
import java.util.Set;


public class JedisTest {
    @Test
    public void test1(){
        //1.获取连接
        Jedis jedis = new Jedis("localhost",6379); //ip地址和端口号
        //2.操作
        /*
        String结构
         */
        jedis.set("userName","zhangsan");
        //获取
        jedis.get("userName");
        //3.关闭连接
        jedis.close();
        /*
        hash结构
         */
        Long hset1 = jedis.hset("myhash", "name", "wq");
        Long hset = jedis.hset("myhash", "age", "23");
        //获取hash
        jedis.hget("myhash","name");
        //获取hash中所有map的值
         Map<String, String> myhash = jedis.hgetAll("myhash");
         //遍历Key
        Set<String> keys = myhash.keySet();
        for(String key : keys){
            String value = myhash.get(key);
        }
        System.out.println(hset);
        System.out.println(hset1);

        /*
        list结构
         */
        //存储
        jedis.lpush("mylist", "a", "b","c");
        jedis.rpush("mylist","a","b","c");
        //范围获取
        List<String> mylist = jedis.lrange("mylist", 0, -1);
        //弹出
        String mylist1 = jedis.lpop("mylist");  //c
        /*
        set结构
         */
        jedis.sadd("password","123");
        jedis.smembers("password");
        /*
        sortedset
         */
        jedis.zadd("sex",30,"1");

    }
}

