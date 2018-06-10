<template>
    <div class="date-picker un-select">
        <div class="date-picker-input">
            <input type="text" class="form-input date-input" :placeholder="placeholder" :value="value"
                   @click="init">
            <div class="icons-content">
                <l-icon name="date" class="icons pull-left pointer" v-if="!value"
                        @click.native="init"></l-icon>
                <l-icon name="delete" class="icons pull-left pointer icons-delete" v-if="value"
                        @click.native="empty"></l-icon>
            </div>
        </div>
        <div class="date-picker-list" v-if="showPicker">
            <!-- 顶部年月显示及年月切换 -->
            <div class="date-tool date-picker-content">
                <l-icon-first class="pull-left" @click.native="changeYear(-1)"></l-icon-first>
                <l-icon-prev class="pull-left" @click.native="changeMonth(-1)"></l-icon-prev>
                <div class="current-date text-center pull-left">
                    <span>{{dateInfoList.year}}</span>
                    <span>年</span>
                    <span>{{dateInfoList.month}}</span>
                    <span>月</span>
                </div>
                <l-icon-next class="pull-left" @click.native="changeMonth(1)"></l-icon-next>
                <l-icon-last class="pull-left" @click.native="changeYear(1)"></l-icon-last>
            </div>
            <!-- 周列表 -->
            <div class="date-picker-week-list date-picker-content-list">
                <ul>
                    <li class="text-center pull-left" v-for="item in weekList" :key="item">{{item}}</li>
                </ul>
            </div>
            <!-- 日列表 -->
            <div class="date-picker-date-list date-picker-content-list">
                <ul>
                    <li class="pointer text-center pull-left"
                        v-for="(item,index) in dateInfoList.dateArray"
                        :class="{
                            'otherMonth':item.year !== dateInfoList.year || item.month !== dateInfoList.month,
                            'weekDay': (index+1)%7 === 0 || index%7 === 0,
                            'active':item.year === selectDateInfo.year && item.month === selectDateInfo.month && item.date === selectDateInfo.date
                        }"
                        @click="chooseDate(item)">
                        <span v-if="item.year === currentDateInfo.year && item.month === currentDateInfo.month && item.date === currentDateInfo.date"></span>
                        {{item.date}}
                    </li>
                </ul>
            </div>
            <!-- 底部按钮区域 -->
            <div class="date-picker-content date-picker-button-area">
                <div class="pull-right">
                    <button class="btn btn-cancel btn-small pointer" @click="empty">清空</button>
                    <button class="btn btn-primary btn-small pointer" @click="today">今天</button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'datePicker',
        props: {
            placeholder: '',
            limits: '',
            value: ''
        },
        data() {
            return {
                showPicker: false, // 是否显示面板
                weekList: ['日', '一', '二', '三', '四', '五', '六'], // 周期列表
                checkDate: '', // 选择的日期信息
                dateInfoList: {}, // 日历面板中的日期信息
                currentDateInfo: {}, // 计算机系统的当前日期面板信息
                selectDateInfo: {} // 用户选中的日期面板信息
            }
        },
        mounted() {
            let _this = this;
            $('html').click(function () {
                _this.showPicker = false
            });
            $('.date-picker').click(function (event) {
                let e = event || window.event;
                e.stopPropagation()
            });
            if (_this.date) {
                _this.checkInfo();
            }
        },
        methods: {
            /**
             * @returns 检测日期的合法性
             */
            checkInfo() {
                let _this = this,
                    result = false,
                    dateInfo;
                result = _this.checkDateStatusInfo(_this.date);
                _this.currentDateInfo = _this.format(new Date(), true);
                if (result) {
                    dateInfo = _this.format(_this.date);
                    // 显示至输入框的日期数据信息
                    _this.checkDate = dateInfo;
                    // 存储之前选中的日期数据信息
                    _this.selectDateInfo = _this.format(dateInfo, true);
                }
            },
            /**
             * @returns 初始化
             */
            init() {
                let _this = this;
                _this.showPicker = true;
                _this.checkInfo();
                if (_this.checkDate) {
                    _this.dateInfoList = _this.countDateInfo(_this.format(_this.checkDate, true));
                } else {
                    _this.dateInfoList = _this.countDateInfo(_this.format(new Date(), true));
                }
            },
            /**
             * @returns 改变日历面板的年份
             * @param num
             */
            changeYear(num) {
                let _this = this;
                _this.dateInfoList.year = _this.dateInfoList.year + num;
                _this.dateInfoList = _this.countDateInfo(_this.dateInfoList);
            },
            /**
             * TODO
             * @returns 改变日历面板的月份
             * @param num
             */
            changeMonth(num) {
                let _this = this;
                if (num === 1 && parseInt(_this.dateInfoList.month) === 12) {
                    _this.dateInfoList.year += 1;
                    _this.dateInfoList.month = '01';
                } else if (num === -1 && parseInt(_this.dateInfoList.month) === 1) {
                    _this.dateInfoList.year -= 1;
                    _this.dateInfoList.month = 12;
                } else {
                    _this.dateInfoList.month = _this.formatFactory(parseInt(_this.dateInfoList.month) + num);
                }
                _this.dateInfoList = _this.countDateInfo(_this.dateInfoList);
            },
            /**
             * @returns 选中指定天
             * @param item
             */
            chooseDate(item) {
                let _this = this;
                _this.checkDate = _this.format(item);
                _this.responseDateInfo();
            },
            /**
             * @returns 选中当前天
             */
            today() {
                let _this = this;
                _this.checkDate = _this.format(_this.currentDateInfo);
                _this.responseDateInfo();
            },
            /**
             * 清空当前的选中的日期信息
             */
            empty() {
                let _this = this;
                _this.checkDate = '';
                _this.responseDateInfo();
            },
            /**
             * @returns 返回日期数据信息
             */
            responseDateInfo() {
                let _this = this;
                _this.showPicker = false;
                _this.dateInfoList = {};
                _this.selectDateInfo = {};
                _this.currentDateInfo = {};
                _this.$emit('input', _this.checkDate);
                _this.$emit('change', _this.checkDate);
            }
        }
    }
</script>
<style>
    .date-picker {
        display: inline-block;
        min-width: 160px;
    }

    .date-picker .date-picker-input {
        height: 32px;
    }

    .date-picker .date-input {
        width: 100%;
        font-size: 12px;
    }

    .date-picker .icons-content {
        width: 16px;
        height: 16px;
        margin-left: calc(100% - 28px);
        margin-top: -24px;
        position: relative;
    }

    .date-picker .icons-delete:hover {
        color: #ff0000;
    }

    .date-picker .date-picker-list {
        width: 238px;
        font-size: 14px;
        overflow: hidden;
        border: 1px solid #d7dce6;
        background: #ffffff;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.25);
        border-radius: 4px;
        position: absolute;
    }

    .date-picker .date-picker-content {
        padding: 10px;
        width: 100%;
        float: left;
    }

    .date-picker .date-picker-content-list {
        overflow: hidden;
        padding: 0 6px;
    }

    .date-picker .date-picker-date-list {
        border-bottom: 1px solid #d7dce6;
    }

    .date-picker .date-tool {
        border-bottom: 1px solid #d7dce6;
    }

    .date-picker .date-tool .icon-btn {
        margin: 0 3px;
    }

    .date-picker .date-tool .icon-btn:nth-child(1) {
        margin: 0 3px 0 0;
    }

    .date-picker .date-tool .icon-btn:nth-last-child(1) {
        margin: 0 0 0 3px;
    }

    .date-picker .date-tool .current-date {
        width: 102px;
        line-height: 24px;
    }

    .date-picker li {
        margin: 1px 1px 1px;
        border: 1px solid #ffffff;
    }

    .date-picker .date-picker-content-list li {
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

    .date-picker .date-picker-week-list li {
        width: 32px;
        margin: 1px 0 1px;
        text-align: center;
        line-height: 32px;
        height: 32px;
        font-size: 14px;
        padding: 0;
        background: #ffffff;
        color: #666666 !important;
        font-weight: 600 !important;
    }

    .date-picker .date-picker-date-list li {
        color: #333333;
        position: relative;
    }

    .date-picker .date-picker-date-list li:hover {
        color: #3673ff;
    }

    .date-picker .date-picker-date-list .active {
        border-radius: 100%;
        color: #fff !important;
        background: #3673ff !important;
        width: 26px;
        height: 26px;
        margin: 4px 3px 4px;
        font-weight: 600;
        line-height: 26px;
    }

    .date-picker .date-picker-date-list .weekDay {
        color: #ff7b4d;
    }

    .date-picker .date-picker-date-list .otherMonth {
        color: #c3c3c3;
    }

    .date-picker .date-picker-date-list .today {
        color: #ffffff;
        font-weight: bold;
        border-color: #3673ff;
        background: #3673ff;
    }

    .date-picker .date-picker-date-list .today:hover {
        color: #ffffff;
    }

    .date-picker .date-picker-date-list span {
        position: absolute;
        padding: 3px;
        background: #ff0000;
        right: 5px;
        border-radius: 100%;
    }

    .date-picker .date-picker-button-area {
        background: #f9f9f9;
    }
</style>