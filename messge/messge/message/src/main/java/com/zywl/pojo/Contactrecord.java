package com.zywl.pojo;

public class Contactrecord {
    private Long contactid;

    private String realname;

    private String phone;

    private String content;

    private String posttime;

    private Integer status;

    public Long getContactid() {
        return contactid;
    }

    public void setContactid(Long contactid) {
        this.contactid = contactid;
    }

    public String getRealname() {
        return realname;
    }

    public void setRealname(String realname) {
        this.realname = realname == null ? null : realname.trim();
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone == null ? null : phone.trim();
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content == null ? null : content.trim();
    }

    public String getPosttime() {
        return posttime;
    }

    public void setPosttime(String posttime) {
        this.posttime = posttime == null ? null : posttime.trim();
    }

    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }
}