/*
 Navicat Premium Data Transfer

 Source Server         : ALISeverMysql
 Source Server Type    : MySQL
 Source Server Version : 50631
 Source Schema         : audio

 Target Server Type    : MySQL
 Target Server Version : 50631
 File Encoding         : 65001

 Date: 26/02/2020 19:33:52
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for message_send
-- ----------------------------


-- ----------------------------
-- Table structure for contact
-- ----------------------------
DROP TABLE IF EXISTS `contact`;
CREATE TABLE `contact`  (
  `id` bigint(10) NOT NULL COMMENT '联系人id',
  `realname` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '联系人姓名',
  `phone` char(11) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL COMMENT '电话',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of contact
-- ----------------------------
INSERT INTO `contact` VALUES (1001, '张三', '18851203179');


-- ----------------------------
-- Table structure for contactrecord
-- ----------------------------
DROP TABLE IF EXISTS `contactrecord`;
CREATE TABLE `contactrecord`  (
  `contactid` bigint(20) NOT NULL COMMENT '联系电话',
  `realname` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '姓名',
  `phone` char(11) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '电话',
  `content` varchar(500) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '内容',
  `posttime` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '发送时间',
  `status` int(1) NOT NULL COMMENT '状态1为正常2为异常'
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of contactrecord
-- ----------------------------

INSERT INTO `contactrecord` VALUES (1001, '张三', '18851203179', '您好，当前水压过低，请重新设定参数。', '2020-02-26 19:18:06', 1);
INSERT INTO `contactrecord` VALUES (1001, '张三', '18851203179', '您好，当前水压过低，请重新设定参数。', '2020-02-26 19:30:02', 1);



-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user`  (
  `id` bigint(20) NOT NULL COMMENT 'id',
  `username` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '用户名',
  `realname` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '真实名字',
  `password` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '密码',
  `head_picture_url` varchar(200) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '头像URL',
  `create_time` datetime(0) NOT NULL COMMENT '创建日期',
  `update_time` datetime(0) NOT NULL COMMENT '修改日期',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Compact;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES (1, 'zs', 'zs', 'abc123', NULL, '2020-02-26 10:16:03', '2020-02-26 16:16:05');

SET FOREIGN_KEY_CHECKS = 1;
