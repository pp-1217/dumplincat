const commont = require('./commont.js')

module.exports = {
    //网络请求
    getHttpRequest: function(url, method, data, useOpenid) {

        return new Promise(function(resolve, reject) {
            commont.log("start net request " + url + "," + method + "," + JSON.stringify(data));

            let headers = {
                "Content-Type": "application/json;charset=utf-8",
                "type": "weixin"
            };
            if (useOpenid) {
                let openId = wx.getStorageSync("userId");
                if (openId) {
                    headers.key = openId;
                } else {
                    commont.log("openid is null , please login first !");
                }
            }

            wx.request({
                url: url,
                method: method,
                data: data,
                header: headers,
                success: function(res) {
                    commont.log("source result is " + JSON.stringify(res));
                    if (res.data.status == 200) {
                        resolve(res.data.data);
                    } else {
                        reject(res.data.msg);
                    }
                },
                fail: function(res) {
                    commont.log("request fail and " + JSON.stringify(res));
                    reject("getCommontRequest fail ");
                },
                complete: function(res) {

                }
            })
        });
    },


    //网络请求上传文件
    getHttpUploadRequest: function(url, filePath) {
        return new Promise(function(resolve, reject) {
            commont.log("start net upload ");

            let headers = {
                "Content-Type": "application/json;charset=utf-8",
                "type": "weixin"
            };
            let openId = wx.getStorageSync("userId");
            if (openId) {
                headers.key = openId;
            } else {
                commont.log("openid is null , please login first !");
            }

            commont.log("upload head is " + JSON.stringify(headers));

            const uploadTask = wx.uploadFile({
                url: url, //仅为示例，非真实的接口地址
                filePath: filePath,
                name: 'file',
                header: headers,
                success: function(res) {
                    console.log("source result is " + JSON.stringify(res.data));
                    let formData = JSON.parse(res.data.replace('\\', ''));
                    if (formData.status == 200) {
                        resolve(formData.data);
                    } else {
                        reject(formData.msg);
                    }
                },
                fail: function(res) {
                    commont.log("request fail and " + JSON.stringify(res));
                    reject("getCommontRequest fail ");
                },
                complete: function(res) {

                }
            });

            uploadTask.onProgressUpdate((res) => {
                commont.log('上传进度', res.progress)
                commont.log('已经上传的数据长度', res.totalBytesSent)
                commont.log('预期需要上传的数据总长度', res.totalBytesExpectedToSend)
            })

        });
    }




}