export default {
    install(Vue) {
        /**
         * @returns 计算当月日期信息
         * @param dateInfo
         */
        Vue.prototype.countDateInfo = function (dateInfo) {
            let _this = this,
                dateArray = [], // 用于存放当月的日历面板数据信息
                thisMonthDateNum, // 存储当前月有多少天
                prevMonthDateNum, // 存储上一个月有多少天
                prevMonthFillNum, // 上一个月填充的天数-日历补全
                nextMonthFillNum, // 下一个月填充的天数-日历补全
                thisMonthFirstDay, // 存储当前月第一天是礼拜几
                prevMonthYear, // 上一个月的年份
                prevMonthMonth, // 上一个月的月份
                nextMonthYear, // 下一个月的年份
                nextMonthMonth, // 下一个月的月份
                fillObj; // 填充的日期信息对象
            dateInfo.month = _this.formatFactory(dateInfo.month);
            // 计算当前月的天数
            thisMonthDateNum = new Date(dateInfo.year, dateInfo.month, 0).getDate();
            // 计算当前月的第一天是礼拜几
            thisMonthFirstDay = new Date(dateInfo.year + '-' + dateInfo.month + '-' + 1).getDay()
            // 计算上一个月需要填充多少天
            prevMonthFillNum = thisMonthFirstDay;
            // 计算上一个月有多少天
            // 如果当前月是一月份,上一个月的年份和月份需要特殊处理
            if (parseInt(dateInfo.month) === 1) {
                prevMonthYear = dateInfo.year - 1;
                prevMonthMonth = 12;
            } else {
                prevMonthYear = dateInfo.year;
                prevMonthMonth = parseInt(dateInfo.month) - 1
            }
            prevMonthDateNum = new Date(prevMonthYear, prevMonthMonth, 0).getDate();
            // 填充上一个月的数据
            for (let i = prevMonthDateNum - prevMonthFillNum + 1; i < prevMonthDateNum + 1; i++) {
                fillObj = {
                    year: prevMonthYear,
                    month: _this.formatFactory(prevMonthMonth),
                    date: _this.formatFactory(i)
                };
                fillObj.timeStamp = _this.initTimeStamp(fillObj);
                dateArray.push(fillObj);
            }
            // 填充当月数据
            for (let i = 1; i < thisMonthDateNum + 1; i++) {
                fillObj = {
                    year: dateInfo.year,
                    month: _this.formatFactory(dateInfo.month),
                    date: _this.formatFactory(i)
                };
                fillObj.timeStamp = _this.initTimeStamp(fillObj);
                dateArray.push(fillObj)
            }
            // 计算下一个月需要填充多少天
            if (dateInfo.month === 12) {
                nextMonthYear = dateInfo.year + 1;
                nextMonthMonth = 1
            } else {
                nextMonthMonth = parseInt(dateInfo.month) + 1;
                nextMonthYear = dateInfo.year
            }
            nextMonthFillNum = 6 - new Date(dateInfo.year + '-' + dateInfo.month + '-' + thisMonthDateNum).getDay()
            for (let i = 1; i <= nextMonthFillNum; i++) {
                fillObj = {
                    year: nextMonthYear,
                    month: _this.formatFactory(nextMonthMonth),
                    date: _this.formatFactory(i)
                };
                fillObj.timeStamp = _this.initTimeStamp(fillObj);
                dateArray.push(fillObj);
            }
            dateInfo.dateArray = dateArray;
            return dateInfo;
        };
        /**
         * @returns 对数据进行格式化转换,年年年年/月月/日日 || {'year':xxx,'month':xxx,'date':xxx}
         * @param dateInfo
         * @param fullDateInfo
         */
        Vue.prototype.format = function (dateInfo, fullDateInfo) {
            let _this = this,
                result;
            if (!fullDateInfo) {
                if (dateInfo.year) {
                    dateInfo = new Date(dateInfo.year + '-' + dateInfo.month + '-' + dateInfo.date);
                } else {
                    dateInfo = new Date(dateInfo);
                }
                result = dateInfo.getFullYear() + '/' + _this.formatFactory(dateInfo.getMonth() + 1) + '/' + _this.formatFactory(dateInfo.getDate());
            } else {
                result = {
                    'year': new Date(dateInfo).getFullYear(),
                    'month': _this.formatFactory(new Date(dateInfo).getMonth() + 1),
                    'date': _this.formatFactory(new Date(dateInfo).getDate())
                }
            }
            return result;
        };

        /**
         * @returns 补充前缀0
         * @param dateInfo
         * @returns {*}
         */
        Vue.prototype.formatFactory = function (dateInfo) {
            if (parseInt(dateInfo) < 10) {
                return '0' + parseInt(dateInfo)
            } else {
                return dateInfo;
            }
        };
        /**
         * @returns 生成时间戳
         * @param dateInfo
         * @returns {number}
         */
        Vue.prototype.initTimeStamp = function (dateInfo) {
            let d = new Date(dateInfo.year + '/' + dateInfo.month + '/' + dateInfo.date);
            return Math.round(d.getTime());
        };
        /**
         * @returns 检测时间格式是否合法
         * @param dateInfo
         */
        Vue.prototype.checkDateStatusInfo = function (dateInfo) {
            let result;
            let simpleReg = /^([1-2]\d{3})[\/|\-](0?[1-9]|10|11|12)[\/|\-]([1-2]?[0-9]|0[1-9]|30|31)$/;
            let complexReg = /^([1-2]\d{3})[\/|\-](0?[1-9]|10|11|12)[\/|\-]([1-2]?[0-9]|0[1-9]|30|31) (0\d{1}|1\d{1}|2[0-3]):[0-5]\d{1}:([0-5]\d{1})$/;
            result = simpleReg.test(dateInfo) || complexReg.test(dateInfo);
            return result;
        };
        /**
         * 点击非当前模块时,返回true
         * @param currentDom
         */
        Vue.prototype.hideDomNode = function (currentDom) {
            $(currentDom).click(function (event) {
                event.stopPropagation();
            });
            $('html').click(function () {
                return false;
            });
        };
    }
}


