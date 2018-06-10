<template>
    <div class='left-menu pull-left'>
        <ul>
            <li v-for='item in menuList' v-text='item.name' class='li-list' @click='changeItemContent(item)'></li>
        </ul>
    </div>
</template>

<script>
    export default {
        name: 'leftMenu',
        data() {
            return {
                menuList: []
            }
        },
        mounted() {
            let _this = this;
            _this.menuList = [
                {
                    'id': 'home',
                    'name': '主页',
                    'router': 'home'
                },
                {
                    'id': 'datePicker',
                    'name': '单选日期',
                    'router': 'datePicker'
                },
                {
                    'id': 'dateRange',
                    'name': '多选日期',
                    'router': 'dateRange'
                },
                {
                    'id': 'switcher',
                    'name': '开关',
                    'router': 'switcher'
                },
                {
                    'id': 'button',
                    'name': '按钮',
                    'router': 'button'
                },
                {
                    'id': 'popups',
                    'name': '弹窗',
                    'router': 'popups'
                },
                {
                    'id': 'pagination',
                    'name': '分页',
                    'router': 'pagination'
                },
                {
                    'id': 'select',
                    'name': '下拉选择框',
                    'router': 'selecter'
                },
                {
                    'id': 'progress',
                    'name': '进度条',
                    'router': 'progress'
                },
                {
                    'id': 'lInput',
                    'name': '密码输入框-带状态切换',
                    'router': 'lInput'
                },
                {
                    'id': 'radio',
                    'name': '单选框',
                    'router': 'radio'
                }
            ]
        },
        methods: {
            changeItemContent(item) {
                let _this = this
                _this.$router.push({path: item.router})
            }
        }
    }
</script>

<style>
    .left-menu {
        height: 100%;
        width: 200px;
        background: #666666;
    }

    .left-menu .li-list {
        line-height: 24px;
        color: #ffffff;
        cursor: pointer;
    }
</style>
