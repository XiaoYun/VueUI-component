<template>
    <div>
        <div style="width:100%;margin-bottom:10px;">
            <l-datePicker placeholder="日期选择提示文本" v-model="dateInfo" :limit="limits" @change="changeDateInfo"
                          style="width:140px;"></l-datePicker>
        </div>
        <div style="width: 100%;margin-top: 15px;">你选择的是：{{dateInfo}}</div>
        <h4>调用指令:</h4>
        <code>
            &lt;l-datePicker placeholder="日期选择提示文本" :limit="limits" style="width:140px;"&gt;&lt;/l-datePicker&gt;
        </code>
        <h4>参数列表:</h4>
        <code>
            <b>placeholder</b>默认提示文本
            <br/>
            <b>:limit</b>日期分割符 只能传递 / 或者 -
            <br/>
            <b>style</b>主要用于调整输入框的宽度
        </code>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                limits: '/',
                dateInfo: '2018-03-21'
            }
        },
        methods: {
            changeDateInfo(res) {
                this.dateInfo = res;
            }
        }
    }
</script>

<style>

</style>
