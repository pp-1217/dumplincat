package com.zywl.utils;

import java.util.Random;

public class RandomCodeUtil {
	
	public static String getCode() {
		Random random = new Random();
		StringBuilder sb = new StringBuilder();
		for(int i=0;i<6;i++)
		{
			sb.append(random.nextInt(10));
		}
		return sb.toString();
	}
}
