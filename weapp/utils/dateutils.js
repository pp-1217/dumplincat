module.exports = {


    parseNowDay:function(){
        var date = new Date();
        var y = date.getFullYear();
        var m = date.getMonth() + 1;
        m = m < 10 ? ('0' + m) : m;
        var d = date.getDate();
        d = d < 10 ? ('0' + d) : d;
        return y + '/' + m + '/' + d ;
    },

    /**
     * 2017-05-19 09:25:26
     *  1495157126000 -> 2017/05/19
     */
    dayFormatDateTime: function (timeStamp) {
        var date = new Date();
        date.setTime(timeStamp);
        var y = date.getFullYear();
        var m = date.getMonth() + 1;
        m = m < 10 ? ('0' + m) : m;
        var d = date.getDate();
        d = d < 10 ? ('0' + d) : d;
        return y + '/' + m + '/' + d ;
    },

    /**
     *  1495157126000 -> 2017/05/19
     */
    dayFormatDateTimeStr: function (timeStamp) {
        var date = new Date();
        date.setTime(timeStamp);
        var y = date.getFullYear();
        var m = date.getMonth() + 1;
        m = m < 10 ? ('0' + m) : m;
        var d = date.getDate();
        d = d < 10 ? ('0' + d) : d;
        return y + '年' + m + '月' + d+'日' ;
    },
    //2018-08-26 17:37
    dayParseSplie: function (str) {
        let arr=(str.split(" ")[0]).split("-")

        return arr[0] + '/' + arr[1] + '/' + arr[2] ;
    },

    //2018-08-26 17:37
    dayParse: function (str) {
        let arr=(str.split(" ")[0]).split("-")

        return arr[0] + '年' + arr[1] + '月' + arr[2]+'日' ;
    },

    /**
    *  1495157126000 -> 2017-05-19 09:25:26
    */
    formatDateTime: function (timeStamp) {
        var date = new Date();
        date.setTime(timeStamp);
        var y = date.getFullYear();
        var m = date.getMonth() + 1;
        m = m < 10 ? ('0' + m) : m;
        var d = date.getDate();
        d = d < 10 ? ('0' + d) : d;
        var h = date.getHours();
        h = h < 10 ? ('0' + h) : h;
        var minute = date.getMinutes();
        var second = date.getSeconds();
        minute = minute < 10 ? ('0' + minute) : minute;
        second = second < 10 ? ('0' + second) : second;
        return y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + second;
    },

    /**
     * 比较时间大小 t1-t2
     * @param time1 2008/01/01
     * @param time2 2008/01/01
     */
    compareTime:function (time1, time2) {
        let array =  time1.split("/");
        let array2 =  time2.split("/");

        let dt = new Date(array[0], array[1], array[2]);

        let dt2 = new Date(array2[0], array2[1], array2[2]);

        return dt>dt2;
    }
}