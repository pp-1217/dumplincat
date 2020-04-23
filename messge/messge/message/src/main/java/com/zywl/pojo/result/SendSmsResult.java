package com.zywl.pojo.result;

public class SendSmsResult {
	private String code;
	private int count;
	private String create_date;
	private String mobile;
	private String msg;
	private String smsid;
	private String uid;

	public String getCode() {
		return code;
	}

	public void setCode(String code) {
		this.code = code;
	}

	public int getCount() {
		return count;
	}

	public void setCount(int count) {
		this.count = count;
	}

	public String getCreate_date() {
		return create_date;
	}

	public void setCreate_date(String create_date) {
		this.create_date = create_date;
	}

	public String getMobile() {
		return mobile;
	}

	public void setMobile(String mobile) {
		this.mobile = mobile;
	}

	public String getMsg() {
		return msg;
	}

	public void setMsg(String msg) {
		this.msg = msg;
	}

	public String getSmsid() {
		return smsid;
	}

	public void setSmsid(String smsid) {
		this.smsid = smsid;
	}

	public String getUid() {
		return uid;
	}

	public void setUid(String uid) {
		this.uid = uid;
	}

	@Override
	public String toString() {
		return "SendSmsResult [code=" + code + ", count=" + count + ", create_date=" + create_date + ", mobile="
				+ mobile + ", msg=" + msg + ", smsid=" + smsid + ", uid=" + uid + ", getCode()=" + getCode()
				+ ", getCount()=" + getCount() + ", getCreate_date()=" + getCreate_date() + ", getMobile()="
				+ getMobile() + ", getMsg()=" + getMsg() + ", getSmsid()=" + getSmsid() + ", getUid()=" + getUid()
				+ ", getClass()=" + getClass() + ", hashCode()=" + hashCode() + ", toString()=" + super.toString()
				+ "]";
	}

}
