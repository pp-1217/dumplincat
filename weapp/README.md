# SaledProject

#### 项目介绍
售后微信小程序

#### 软件架构
软件架构说明


#### 安装教程

1. xxxx
2. xxxx
3. xxxx

#### 使用说明

1. xxxx
2. xxxx
3. xxxx

#### 参与贡献

1. Fork 本项目
2. 新建 Feat_xxx 分支
3. 提交代码
4. 新建 Pull Request


#### 其他
淡黑色 #8a8a8a 淡淡黑色 cdcdcd
https://youzan.github.io/zanui-weapp/#/zanui/base/icon
图标 8a8a8a

padding 20rpx 6rpx;
font-size:14pt  10pt;

本地先判断userid（>0），没有就调用登录

认证->申请分类 增加选择(增加接口，7.2)====>分类（bus，""）

		 增加删除文件功能（增加接口,7.3），附件一共限制上传5个，选择后即上传，可以删除。

审核->个人简历可以打开；图片、视屏合并为附件，点击后进入下个界面播放

		 等级评定：ability为下拉框直接选择

接单记录->提交维修记录(5.7,5.8)

个人信息->无法编辑修改，只能看

let index=e.currentTarget.dataset.index;
		 

问题：
1.维修申请（5.3） 上传后返回结果 不是JSON（带了"\"）
2.接单 里边没有价钱,设备，名称（填申请描述？），提交申请时未上传标题、设备等信息
3.获取积分接口

4.维修调试记录 需要获取维修id，只能通过 接单记录获取。和接单记录是不是重复了？


    维修申请->维修申请记录列表(5.5,就是发单列表)->维修记录(发单详情，展示发单信息、接单工程师的信息，接单工程师的出勤记录<维修记录>
) ->完成订单(客户来确认订单是否完成)

    接单记录->接单列表->维修记录列表(button，确认完成；)




5.维修完成接口？(显示在维修记录 列表下面)


6. 7.1 获取待评分认证通知数量   405

7.资料-》我要上传，逻辑与其他上传不一致

8.积分兑换 返回结果为空时，data变成数组了


标题，所需积分必填啊，默认给0
时间较长的操作给个加载中
资料库上传只允许传一个
接口说明，post提交的时候，没写在文档里的不要给回去

资料库video给出左右margin,视频下方给出标题、所需积分
资料库类别切换后，直接跳到第二页了(page 变成2了？)
资料库上传 类别未提交

购买记录 分为积分和购买两个界面，参数写死。只区分payType

--------------------------------
积分兑换 没有规格
接单记录  后台没有？

------------------- 2018.08.28
1.提交表单，成功后返回上页(完成)
2.模块显隐权限，见图片1。没有认证的不显示两个商城，不显示考核，不显示接单
3.通知接口修改，改一下，我给你返回List，你打开菜单的时候判断List是不是szie为0，有就调用第二个接口。见图片2(完成)
4.积分商城，修改。见图3。推荐人默认成自己(完成)

------------------- 2018.08.29
 "tabBar": {
     "selectedColor": "#4090E2",
     "list": [
       {
         "pagePath": "pages/index/index",
         "text": "首页",
         "iconPath": "/pages/img/ic_home.png",
         "selectedIconPath": "/pages/img/ic_home_selected.png"
       },
       {
         "pagePath": "pages/bill/bill",
         "text": "接单",
         "iconPath": "/pages/img/ic_bill.png",
         "selectedIconPath": "/pages/img/ic_bill_selected.png"
       },
       {
         "pagePath": "pages/me/me",
         "text": "我的",
         "iconPath": "/pages/img/ic_user.png",
         "selectedIconPath": "/pages/img/ic_user_selected.png"
       }
     ]
   },


------------------- 2018.09.12
积分图片 1:1 aspectFit

------------------- 2018.10.09
ios 无法登陆授权问题 暂未解决  版本 1.0.6
