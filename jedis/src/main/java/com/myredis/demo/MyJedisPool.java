package com.myredis.demo;
import com.myjedis.utils.JedisPoolUtils;
import org.junit.Test;
import redis.clients.jedis.Jedis;

/*
jedis连接池的使用
 */
public class MyJedisPool {
    @Test
    public void test2(){
        /*
        创建配置对象
        JedisPoolConfig jedisPoolConfig = new JedisPoolConfig();
        jedisPoolConfig.setMaxTotal(50);
        jedisPoolConfig.setMaxIdle(10);
        创建jedis连接池对象
        JedisPool myJedisPool = new JedisPool(jedisPoolConfig,"localhost",6379);
        获取连接
        */
        Jedis jedis = JedisPoolUtils.getJedis();
        jedis.set("hello","jedis");
        //归还连接池  类似c3p0,druid连接池
        jedis.close();
    }

}
