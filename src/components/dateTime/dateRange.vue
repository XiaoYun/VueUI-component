<template>
    <div class="date-range un-select">
        <div class="date-range-input">
            <input type="text" :class="{'focus':showPicker}" class="form-input date-input" :placeholder="placeholder"
                   readonly v-model="checkDateInfo"
                   @click="init"/>
            <div class="icons-content">
                <l-icon name="date" class="icons pull-left pointer" v-if="!checkDateInfo" @click.native="init">
                </l-icon>
                <l-icon
                        name="delete"
                        class="icons pull-left pointer icons-delete"
                        v-if="checkDateInfo"
                        @click.native="emptyDateInfo">
                </l-icon>
            </div>
        </div>
        <div class="date-range-list" v-if="showPicker">
            <div class="date-range-pickerList">
                <div class="date-range-date pull-left  date-range-content">
                    <!-- 顶部年月显示及年月切换 -->
                    <div class="date-tool date-range-content">
                        <l-icon-first class="pull-left" @click.native="changeYearInfo(-1,true)"></l-icon-first>
                        <l-icon-prev class="pull-left" @click.native="changeMonthInfo(-1,true)"></l-icon-prev>
                        <div class="current-date text-center pull-left">
                            <span>{{leftDateInfo.year}}</span>
                            <span>年</span>
                            <span>{{leftDateInfo.month}}</span>
                            <span>月</span>
                        </div>
                        <l-icon-next class="pull-left" @click.native="changeMonthInfo(1,true)"></l-icon-next>
                        <l-icon-last class="pull-left" @click.native="changeYearInfo(1,true)"></l-icon-last>
                    </div>
                    <!-- 周列表 -->
                    <div class="date-range-dataList date-range-weekList date-range-content">
                        <ul>
                            <li class="text-center pull-left" v-for="item in weekList">{{item}}</li>
                        </ul>
                    </div>
                    <!-- 日历面板数据列表 -->
                    <div class="date-range-dataList date-range-content">
                        <ul>
                            <li class="text-center pointer pull-left"
                                @click="selectDate(item)"
                                :class="{
                                    'weekDay': (index+1)%7 === 0 || index%7 === 0,
                                    'otherMonth':item.month !== leftDateInfo.month,
                                    'during':item.timeStamp >= beginDateInfo.timeStamp && item.timeStamp <= endDateInfo.timeStamp,
                                    'beginDuring':item.timeStamp === beginDateInfo.timeStamp,
                                    'endDuring':item.timeStamp === endDateInfo.timeStamp
                                }"
                                v-for="(item,index) in leftDateInfo.dateArray">
                                <!--左侧的年份大于起始日期年份且小于结束日期的年份情况-->
                                <div :class="{'currentDate':(item.year === beginDateInfo.year && item.month === beginDateInfo.month && item.date === beginDateInfo.date) || (item.year === endDateInfo.year && item.month === endDateInfo.month && item.date === endDateInfo.date)}">
                                    <span v-if="item.year === currentDateInfo.year && item.month === currentDateInfo.month && item.date === currentDateInfo.date"></span>
                                    {{item.date}}
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="date-range-date pull-left  date-range-content">
                    <!-- 顶部年月显示及年月切换 -->
                    <div class="date-tool date-range-content">
                        <l-icon-first class="pull-left" @click.native="changeYearInfo(-1)"></l-icon-first>
                        <l-icon-prev class="pull-left" @click.native="changeMonthInfo(-1)"></l-icon-prev>
                        <div class="current-date text-center pull-left">
                            <span>{{rightDateInfo.year}}</span>
                            <span>年</span>
                            <span>{{rightDateInfo.month}}</span>
                            <span>月</span>
                        </div>
                        <l-icon-next class="pull-left" @click.native="changeMonthInfo(1)"></l-icon-next>
                        <l-icon-last class="pull-left" @click.native="changeYearInfo(1)"></l-icon-last>
                    </div>
                    <!-- 周列表 -->
                    <div class="date-range-dataList date-range-weekList date-range-content">
                        <ul>
                            <li class="text-center pull-left" v-for="item in weekList">{{item}}</li>
                        </ul>
                    </div>
                    <!-- 日历面板数据列表 -->
                    <div class="date-range-dataList date-range-content">
                        <ul>
                            <li class="text-center pointer pull-left"
                                v-for="(item,index) in rightDateInfo.dateArray"
                                @click="selectDate(item,true)"
                                :class="{
                                    'weekDay': (index+1)%7 === 0 || index%7 === 0,
                                    'otherMonth':item.month !== rightDateInfo.month,
                                    'during':item.timeStamp >= beginDateInfo.timeStamp && item.timeStamp <= endDateInfo.timeStamp,
                                    'beginDuring':item.timeStamp === beginDateInfo.timeStamp,
                                    'endDuring':item.timeStamp === endDateInfo.timeStamp
                                    }">
                                <div :class="{'currentDate':(item.year === beginDateInfo.year && item.month === beginDateInfo.month && item.date === beginDateInfo.date) || (item.year === endDateInfo.year && item.month === endDateInfo.month && item.date === endDateInfo.date)}">
                                    <span v-if="item.year === currentDateInfo.year && item.month === currentDateInfo.month && item.date === currentDateInfo.date"></span>
                                    {{item.date}}
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="date-range-footer pull-left">
                <div class="pull-right">
                    <button class="btn btn-cancel btn-small pointer" @click="emptyDateInfo">清空</button>
                    <button class="btn btn-primary btn-small pointer" @click="setDateValue">确定</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'dateRange',
        props: {
            // 开始日期
            beginDate: {
                type: String,
                default: ''
            },
            // 结束日期
            endDate: {
                type: String,
                default: ''
            },
            // 提示文本
            placeholder: {
                type: String,
                default: '请选择日期范围'
            },
            // 是否需要检测时间先后顺序
            needReset: {
                type: Boolean,
                default: true
            },
            // 日期分隔符
            limits: {
                type: String,
                default: '/'
            }
        },
        data() {
            return {
                showPicker: false, // 是否显示日历面板
                weekList: ['日', '一', '二', '三', '四', '五', '六'], // 周期列表
                leftDateInfo: {}, // 左侧面板日期信息
                rightDateInfo: {}, // 右侧面板日期信息
                beginDateInfo: {}, // 开始日期信息
                endDateInfo: {}, // 结束日期信息
                currentDateInfo: {}, // 当前系统日期信息
                checkDateInfo: '', // 选中的日期信息
                dateLimits: '', // 日期分隔符
                rangeItem: null,
            }
        },
        mounted() {
            let _this = this;
            $('html').click(function () {
                _this.showPicker = false
            });
            $('.date-range').click(function (event) {
                let e = event || window.event;
                e.stopPropagation()
            });
            // 检测分隔符
            if (_this.limits !== '/' && _this.limits !== '-') {
                _this.dateLimits = '/';
            } else {
                _this.dateLimits = _this.limits;
            }
            _this.checkDateStatus();
        },
        methods: {
            /**
             * @returns 日期信息初始化
             */
            init() {
                let _this = this,
                    beginDate,
                    endDate;
                _this.checkDateStatus();
                if (_this.beginDateInfo.year && _this.endDateInfo.year) {
                    beginDate = {
                        'year': _this.beginDateInfo.year,
                        'month': _this.beginDateInfo.month,
                        'date': _this.beginDateInfo.date
                    };
                    endDate = {
                        'year': _this.endDateInfo.year,
                        'month': _this.endDateInfo.month,
                        'date': _this.endDateInfo.date
                    };
                } else if (!_this.beginDateInfo.year && !_this.endDateInfo.year) {
                    beginDate = _this.format(new Date(), true);
                    endDate = {
                        'year': new Date().getFullYear(),
                        'month': _this.formatFactory(new Date().getMonth() + 2),
                        'date': new Date().getDate()
                    };
                } else if (_this.beginDateInfo.year && !_this.endDateInfo.year) {
                    beginDate = {
                        'year': _this.beginDateInfo.year,
                        'month': _this.beginDateInfo.month,
                        'date': _this.beginDateInfo.date
                    };
                    endDate = {
                        'year': _this.beginDateInfo.year,
                        'month': _this.formatFactory(parseInt(_this.beginDateInfo.month) + 1),
                        'date': _this.beginDateInfo.date
                    }
                } else if (!_this.beginDateInfo.year && _this.endDateInfo.year) {
                    beginDate = {
                        'year': _this.endDateInfo.year,
                        'month': _this.formatFactory(parseInt(_this.endDateInfo.month) - 1),
                        'date': _this.endDateInfo.date
                    };
                    endDate = {
                        'year': _this.endDateInfo.year,
                        'month': _this.endDateInfo.month,
                        'date': _this.endDateInfo.date
                    };
                }
                _this.currentDateInfo = _this.format(new Date(), true);
                if (_this.beginDateInfo.year && _this.endDateInfo.year && _this.beginDateInfo.year === _this.endDateInfo.year && _this.beginDateInfo.month === _this.endDateInfo.month) {
                    endDate = {
                        'year': _this.endDateInfo.year,
                        'month': _this.formatFactory(parseInt(_this.endDateInfo.month) + 1),
                        'date': _this.endDateInfo.date
                    }
                }
                _this.leftDateInfo = _this.countDateInfo(beginDate);
                _this.rightDateInfo = _this.countDateInfo(endDate);
                _this.showPicker = true;
            },
            /**
             * @returns 检查日期信息是否合法,日期信息是否需要重置
             */
            checkDateStatus() {
                let _this = this,
                    beginDate = "",
                    endDate = "";
                let simpleReg = /^((((1[6-9]|[2-9]\d)\d{2})-(0?[13578]|1[02])-(0?[1-9]|[12]\d|3[01]))|(((1[6-9]|[2-9]\d)\d{2})-(0?[13456789]|1[012])-(0?[1-9]|[12]\d|30))|(((1[6-9]|[2-9]\d)\d{2})-0?2-(0?[1-9]|1\d|2[0-8]))|(((1[6-9]|[2-9]\d)(0[48]|[2468][048]|[13579][26])|((16|[2468][048]|[3579][26])00))-0?2-29-))$/;
                let complexReg = /^((((1[6-9]|[2-9]\d)\d{2})-(0?[13578]|1[02])-(0?[1-9]|[12]\d|3[01]))|(((1[6-9]|[2-9]\d)\d{2})-(0?[13456789]|1[012])-(0?[1-9]|[12]\d|30))|(((1[6-9]|[2-9]\d)\d{2})-0?2-(0?[1-9]|1\d|2[0-8]))|(((1[6-9]|[2-9]\d)(0[48]|[2468][048]|[13579][26])|((16|[2468][048]|[3579][26])00))-0?2-29-))\s+(20|21|22|23|[0-1]\d):[0-5]\d:[0-5]\d$/;
                //  如果存在开始日期信息,将开始日期信息存储,并进行对应处理
                if (_this.beginDate && (simpleReg.test(_this.beginDate) || complexReg.test(_this.beginDate))) {
                    beginDate = _this.format(_this.beginDate);
                }
                //  如果存在结束日期信息,将结束日期信息存储,并进行对应处理
                if (_this.endDate && (simpleReg.test(_this.endDate) || complexReg.test(_this.endDate))) {
                    endDate = _this.format(_this.endDate);
                }
                /**
                 * 如果同时存在起始日期信息和结束日期信息
                 * 需要判断是否需要对起始日期和结束日期进行时间对换
                 */
                if (beginDate && endDate && _this.needReset) {
                    let beginDateInfo = {},
                        endDateInfo = {},
                        dateInfo;
                    beginDateInfo = _this.format(beginDate, true);
                    endDateInfo = _this.format(endDate, true);
                    /**
                     * 将起始日期和结束日期对换
                     * 场景：
                     * 1、起始日期的年份大于结束日期的年份
                     * 2、起始日期的年份等于结束日期的年份，但是起始日期的月份大于结束日期的月份
                     * 3、起始日期的年份等于结束日期的年份且起始日期的月份等于结束日期的月份，但是起始日期的天大于结束日期的天
                     */
                    if (beginDateInfo.year > endDateInfo.year || (beginDateInfo.year === endDateInfo.year && beginDateInfo.month > endDateInfo.month) || (beginDateInfo.year === endDateInfo.year && beginDateInfo.month === endDateInfo.month && beginDateInfo.date > endDateInfo.date)) {
                        dateInfo = beginDate;
                        beginDate = endDate;
                        endDate = dateInfo;
                    }
                }
                // 将开始日期信息赋值,进行对应显示
                if (beginDate) {
                    _this.beginDateInfo = _this.format(beginDate, true);
                    _this.beginDateInfo.timeStamp = _this.initTimeStamp(_this.beginDateInfo);
                }
                // 将结束日期信息赋值,进行对应显示
                if (endDate) {
                    _this.endDateInfo = _this.format(endDate, true);
                    _this.endDateInfo.timeStamp = _this.initTimeStamp(_this.endDateInfo);
                }
                // 把传递过来的日期信息显示在输入框上
                if (beginDate && endDate) {
                    _this.checkDateInfo = beginDate + ' - ' + endDate;
                } else if (beginDate && !endDate) {
                    _this.checkDateInfo = beginDate + ' - ' + endDate;
                } else if (!beginDate && endDate) {
                    _this.checkDateInfo = ' - ' + endDate;
                }
            },
            /**
             * @param item 选择的日期对应属性
             * @param isRight 是否为右侧面板的数据信息
             */
            selectDate(item, isRight) {
                let _this = this,
                    beginDate = {};
                if ((isRight && item.year === _this.rightDateInfo.year && item.month === _this.rightDateInfo.month) || (!isRight && item.year === _this.leftDateInfo.year && item.month === _this.leftDateInfo.month)) {
                    if (_this.beginDateInfo.year && _this.endDateInfo.year) {
                        _this.beginDateInfo = {};
                        _this.endDateInfo = {};
                        if (isRight) {
                            _this.endDateInfo = item;
                        } else {
                            _this.beginDateInfo = item;
                        }
                    } else if (_this.beginDateInfo.year && !_this.endDateInfo.year) {
                        if (item.year > _this.beginDateInfo.year || (item.year === _this.beginDateInfo.year && item.month > _this.beginDateInfo.month) || (item.year === _this.beginDateInfo.year && item.month === _this.beginDateInfo.month && item.date > _this.beginDateInfo.date)) {
                            _this.endDateInfo = item;
                        } else {
                            beginDate = _this.beginDateInfo;
                            _this.endDateInfo = beginDate;
                            _this.beginDateInfo = item;
                        }
                    } else if (_this.endDateInfo.year && !_this.beginDateInfo.year) {
                        if (item.year > _this.endDateInfo.year || (item.year === _this.endDateInfo.year && item.month > _this.endDateInfo.month) || (item.year === _this.endDateInfo.year && item.month === _this.endDateInfo.month && item.date > _this.endDateInfo.date)) {
                            beginDate = _this.endDateInfo;
                            _this.endDateInfo = item;
                            _this.beginDateInfo = beginDate;
                        } else {
                            _this.beginDateInfo = item;
                        }
                    } else {
                        if (isRight) {
                            _this.endDateInfo = item;
                        } else {
                            _this.beginDateInfo = item;
                        }
                    }
                }
            },
            /**
             * @param num 月份的增减数量
             * @param isLeft 是否为左侧面板数据
             */
            changeMonthInfo(num, isLeft) {
                let _this = this,
                    leftDateInfo = {
                        'year': _this.leftDateInfo.year,
                        'month': _this.leftDateInfo.month,
                        'date': _this.leftDateInfo.date
                    },
                    rightDateInfo = {
                        'year': _this.rightDateInfo.year,
                        'month': _this.rightDateInfo.month,
                        'date': _this.rightDateInfo.date
                    };
                if (isLeft) {
                    if (num === -1 && parseInt(_this.leftDateInfo.month) === 1) {
                        leftDateInfo = {
                            'year': _this.leftDateInfo.year - 1,
                            'month': '12',
                            'date': _this.leftDateInfo.date
                        }
                    } else if (num === 1 && parseInt(_this.leftDateInfo.month) === 12) {
                        leftDateInfo = {
                            'year': _this.leftDateInfo.year + 1,
                            'month': '01',
                            'date': _this.leftDateInfo.date
                        }
                    } else {
                        leftDateInfo = {
                            'year': _this.leftDateInfo.year,
                            'month': _this.formatFactory(parseInt(_this.leftDateInfo.month) + num),
                            'date': _this.leftDateInfo.date
                        };
                    }
                    // 如果左侧月份的增加之后的值强等于右侧面板数据,那么右侧面板数据需要做出对应的调整--保证两个面板数据不是同年同月
                    if (leftDateInfo.year === _this.rightDateInfo.year && leftDateInfo.month === _this.rightDateInfo.month) {
                        rightDateInfo = {
                            'year': parseInt(leftDateInfo.month) === 12 ? leftDateInfo.year - 1 : leftDateInfo.year,
                            'month': parseInt(leftDateInfo.month) === 12 ? '01' : _this.formatFactory(parseInt(leftDateInfo.month) + 1),
                            'date': leftDateInfo.date
                        };
                    }
                } else {
                    if (num === -1 && parseInt(_this.rightDateInfo.month) === 1) {
                        rightDateInfo = {
                            'year': _this.rightDateInfo.year - 1,
                            'month': '12',
                            'date': _this.rightDateInfo.date
                        }
                    } else if (num === 1 && parseInt(_this.rightDateInfo.month) === 12) {
                        rightDateInfo = {
                            'year': _this.rightDateInfo.year + 1,
                            'month': '01',
                            'date': _this.rightDateInfo.date
                        }
                    } else {
                        rightDateInfo = {
                            'year': _this.rightDateInfo.year,
                            'month': _this.formatFactory(parseInt(_this.rightDateInfo.month) + num),
                            'date': _this.rightDateInfo.date
                        };
                    }
                    // 如果左侧月份的增加之后的值强等于右侧面板数据,那么右侧面板数据需要做出对应的调整--保证两个面板数据不是同年同月
                    if (rightDateInfo.year === _this.leftDateInfo.year && rightDateInfo.month === _this.leftDateInfo.month) {
                        leftDateInfo = {
                            'year': parseInt(rightDateInfo.month) === 1 ? rightDateInfo.year - 1 : rightDateInfo.year,
                            'month': parseInt(rightDateInfo.month) === 1 ? '12' : _this.formatFactory(parseInt(rightDateInfo.month) - 1),
                            'date': rightDateInfo.date
                        }
                    }
                }
                _this.leftDateInfo = _this.countDateInfo(leftDateInfo);
                _this.rightDateInfo = _this.countDateInfo(rightDateInfo);
            },
            /**
             * @param num 年份的增减数量
             * @param isLeft 是否为左侧面板数据
             */
            changeYearInfo(num, isLeft) {
                let _this = this,
                    leftDateInfo,
                    rightDateInfo;
                if (isLeft) {
                    leftDateInfo = {
                        'year': _this.leftDateInfo.year + num,
                        'month': _this.leftDateInfo.month,
                        'date': _this.leftDateInfo.date
                    };
                    if (num === 1 && (_this.leftDateInfo.year === _this.rightDateInfo.year || (_this.leftDateInfo.year === _this.rightDateInfo.year - 1 && _this.leftDateInfo.month > _this.rightDateInfo.month))) {
                        rightDateInfo = {
                            'year': _this.rightDateInfo.year + num,
                            'month': _this.rightDateInfo.month,
                            'date': _this.rightDateInfo.date
                        }
                    } else {
                        rightDateInfo = _this.rightDateInfo;
                    }
                } else {
                    rightDateInfo = {
                        'year': _this.rightDateInfo.year + num,
                        'month': _this.rightDateInfo.month,
                        'date': _this.rightDateInfo.date
                    };
                    if (num === -1 && (_this.leftDateInfo.year === _this.rightDateInfo.year || (_this.leftDateInfo.year === _this.rightDateInfo.year - 1 && _this.leftDateInfo.month > _this.rightDateInfo.month))) {
                        leftDateInfo = {
                            'year': _this.leftDateInfo.year + num,
                            'month': _this.leftDateInfo.month,
                            'date': _this.leftDateInfo.date
                        };
                    } else {
                        leftDateInfo = _this.leftDateInfo;
                    }
                }
                _this.leftDateInfo = _this.countDateInfo(leftDateInfo);
                _this.rightDateInfo = _this.countDateInfo(rightDateInfo);
            },
            /**
             * @description 清空日期信息
             */
            emptyDateInfo() {
                let _this = this;
                _this.beginDateInfo = '';
                _this.endDateInfo = '';
                _this.checkDateInfo = '';
                _this.showPicker = false;
                _this.$emit('update:beginDate', '');
                _this.$emit('update:endDate', '');
                _this.$emit('change');
            },
            /**
             * @description 执行日期信息返回
             */
            setDateValue() {
                let _this = this,
                    beginDate = "",
                    endDate = "";
                _this.showPicker = false;
                if (_this.beginDateInfo.year && _this.endDateInfo.year) {
                    beginDate = _this.format(_this.beginDateInfo);
                    endDate = _this.format(_this.endDateInfo);
                    _this.checkDateInfo = beginDate + ' - ' + endDate;
                } else if (_this.beginDateInfo.year && !_this.endDateInfo.year) {
                    beginDate = _this.format(_this.beginDateInfo);
                    _this.checkDateInfo = beginDate + ' - ';
                } else if (!_this.beginDateInfo.year && _this.endDateInfo.year) {
                    endDate = _this.format(_this.endDateInfo);
                    _this.checkDateInfo = ' - ' + endDate;
                } else {
                    _this.checkDateInfo = '';
                }
                _this.$emit('update:beginDate', beginDate);
                _this.$emit('update:endDate', endDate);
                _this.$emit('change');
            }
        }
    }
</script>

<style>
    .date-range {
        display: inline-block;
        min-width: 200px;
    }

    .date-range .date-range-input {
        height: 32px;
    }

    .date-range .date-input {
        width: 100%;
        font-size: 12px;
    }

    .date-range .date-input.focus {
        border-color: #3673ff;
    }

    .date-range .icons-content {
        width: 16px;
        height: 16px;
        margin-left: calc(100% - 28px);
        margin-top: -24px;
        position: relative;
    }

    .date-range .icons-delete:hover {
        color: #ff0000;
    }

    .date-range .date-range-list {
        width: 466px;
        font-size: 14px;
        overflow: hidden;
        border: 1px solid #d7dce6;
        background: #ffffff;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.25);
        border-radius: 4px;
        position: absolute;
    }

    .date-range .date-range-dataList {
        padding: 0 4px;
    }

    .date-range .date-range-pickerList {
        overflow: hidden;
    }

    .date-range .date-range-date {
        width: 232px;
        margin: 0;
        display: inline-block;
    }

    .date-range .date-tool {
        border-bottom: 1px solid #d7dce6;
        padding: 10px;
        display: inline-block;
        width: 100%;
    }

    .date-range .date-tool .icon-btn {
        margin: 0 3px;
    }

    .date-range .date-tool .current-date {
        width: 90px;
        line-height: 24px;
    }

    .date-range .date-range-content {
        display: inline-block;
    }

    .date-range .date-range-content li {
        width: 32px;
        margin: 1px 0 1px;
        text-align: center;
        line-height: 32px;
        height: 32px;
        font-size: 14px;
        padding: 0;
        background: #ffffff;
        color: #333333;
    }

    .date-range .date-range-content li div {
        position: relative;
    }

    .date-range .date-range-content li span {
        position: absolute;
        padding: 3px;
        background: #ff0000;
        right: 5px;
        border-radius: 100%;
    }

    .date-range .date-range-content li:hover {
        color: #3673ff !important;
    }

    .date-range .date-range-content .weekDay {
        color: #ff7b4d !important;
    }

    .date-range .date-range-content .today {
        color: #ffffff;
        font-weight: bold;
        border-color: #3673ff;
        background: #3673ff;
    }

    .date-range .date-range-content .currentDate {
        border-radius: 100%;
        color: #fff !important;
        background: #3673ff !important;
        width: 26px;
        height: 26px;
        margin: 4px 3px 4px;
        font-weight: 600;
        line-height: 26px;
    }

    .date-range .date-range-content .during {
        background: rgba(171, 222, 222, 0.25);
        font-weight: 600;
        color: #666666;
    }

    .date-range .date-range-content .beginDuring {
        -webkit-border-radius: 100% 0 0 100%;
        -moz-border-radius: 100% 0 0 100%;
        border-radius: 100% 0 0 100%;
    }

    .date-range .date-range-content .endDuring {
        -webkit-border-radius: 0 100% 100% 0;
        -moz-border-radius: 0 100% 100% 0;
        border-radius: 0 100% 100% 0;
    }

    .date-range .date-range-content .otherMonth,
    .date-range .date-range-content .otherMonth:hover {
        color: #c3c3c3 !important;
        cursor: not-allowed;
    }

    .date-range .date-range-weekList li {
        color: #666666 !important;
        font-weight: 600 !important;
    }

    .date-range .date-range-weekList li:hover {
        color: #666666 !important;
        font-weight: 600 !important;
    }

    .date-range .date-range-footer {
        background: #f9f9f9;
        padding: 10px;
        display: inline-block;
        width: 100%;
        border-top: 1px solid #d7dce6;
    }
</style>