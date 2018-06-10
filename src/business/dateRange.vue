<template>
    <div>
        <l-dateRange :beginDate.sync="beginDate" :limits="limits" :endDate.sync="endDate" @change="callBack"
                     placeholder="请选择一个日期范围"></l-dateRange>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                limits: ':',
                beginDate: "2018-4-15",
                endDate: "2018-3-16 11:11:11"
            }
        },
        methods: {
            callBack() {
                console.log(this.endDate);
                console.log(this.beginDate);
            }
        }
    }
</script>

<style>
</style>
