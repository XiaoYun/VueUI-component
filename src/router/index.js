import Vue from 'vue'
import Router from 'vue-router'
import home from './../business/home.vue'
import datePicker from './../business/datePicker.vue'
import dateRange from './../business/dateRange.vue'
import switcher from './../business/switcher.vue'
import button from './../business/button.vue'
import pagination from './../business/pagination.vue'
import select from './../business/selecter.vue'
import progress from './../business/progress.vue'
import lInput from './../business/lInput.vue'
import radioCheck from './../business/radioCheck.vue'
import fileInput from './../business/fileInput.vue'

Vue.use(Router);

export default new Router({
    history: true,
    routes: [
        {
            path: '/home',
            name: '主页',
            component: home
        },
        {
            path: '/datePicker',
            name: '单选日期',
            component: datePicker
        },
        {
            path: '/dateRange',
            name: '日期范围',
            component: dateRange
        },
        {
            path: '/switcher',
            name: '开关',
            component: switcher
        },
        {
            path: '/button',
            name: '按钮',
            component: button
        },
        {
            path: '/pagination',
            name: '分页',
            component: pagination
        },
        {
            path: '/selecter',
            name: '下拉选择框',
            component: select
        },
        {
            path: '/progress',
            name: '进度条',
            component: progress
        },
        {
            path: '/lInput',
            name: '密码输入框',
            component: lInput
        },
        {
            path: '/radio',
            name: '单选框',
            component: radioCheck
        },
        {
            path: '/fileInput',
            name: '文件上传',
            component: fileInput
        }
    ]
})
