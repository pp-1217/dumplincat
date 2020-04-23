package com.zywl.utils;

import java.util.regex.Pattern;

public class UnicodeChangeUtil {
	

	/**
	 * �ַ����д��� ��б��+u ��ͷ ��Unicode�ַ����������ڰ���ЩUnicode�ַ���ת���ɺ���
	 * @author �ų�
	 *
	 */
	
		// �����ַ���������ʽ
		private static final String singlePattern = "[0-9|a-f|A-F]";
		// 4���ַ���������ʽ
		private static final String pattern = singlePattern + singlePattern +
				singlePattern + singlePattern;
		

		
		/**
		 * �� \\u ��ͷ�ĵ���ת�ɺ��֣��� \\u6B65 ->����
		 * @param str
		 * @return
		 */
		private static String ustartToCn(final String str) {
			StringBuilder sb = new StringBuilder().append("0x")
					.append(str.substring(2, 6));
			Integer codeInteger = Integer.decode(sb.toString());
			int code = codeInteger.intValue();
			char c = (char)code;
			return String.valueOf(c);
		}
		
		/**
		 * �ַ����Ƿ���Unicode�ַ���ͷ��Լ��Unicode�ַ��� \\u��ͷ��
		 * @param str �ַ���
		 * @return true��ʾ��Unicode�ַ���ͷ.
		 */
		private static boolean isStartWithUnicode(final String str) {
			if (null == str || str.length() == 0) {
				return false;
			}
			if (!str.startsWith("\\u")) {
				return false;
			}
			// \u6B65
			if (str.length() < 6) {
				return false;
			}
			String content = str.substring(2, 6);
			
			boolean isMatch = Pattern.matches(pattern, content);
			return isMatch;
		}
		
		/**
		 * �ַ����У������� \\u ��ͷ��UNICODE�ַ�����ȫ���滻�ɺ���
		 * @param strParam
		 * @return
		 */
		public static String unicodeToCn(final String str) {
			// ���ڹ����µ��ַ���
			StringBuilder sb = new StringBuilder();
			// ��������ɨ���ַ�����tmpStr�ǻ�û�б�ɨ���ʣ���ַ�����
			// �����������жϷ�֧��
			// 1. ���ʣ���ַ�����Unicode�ַ���ͷ���Ͱ�Unicodeת���ɺ��֣��ӵ�StringBuilder�С�Ȼ���������Unicode�ַ���
			// 2.��֮�� ���ʣ���ַ�������Unicode�ַ���ͷ������ͨ�ַ�����StringBuilder����������1.
			int length = str.length();
			for (int i = 0; i < length;) {
				String tmpStr = str.substring(i);
				if (isStartWithUnicode(tmpStr)) { // ��֧1
					sb.append(ustartToCn(tmpStr));
					i += 6;
				} else { // ��֧2
					sb.append(str.substring(i, i + 1));
					i++;
				}
			}
			return sb.toString();
		}
	}


