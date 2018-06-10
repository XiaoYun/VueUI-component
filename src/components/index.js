// 开关
import switchButton from './switcher/switcher.vue'
// 单选日历
import datePicker from './datetime/datePicker.vue'
// 多选日历
import dateRange from './datetime/dateRange.vue'
// 图标组件
import icon from './iconbutton/icon.vue'
// 按钮图标-跳转至第一页
import iconFirst from './button/iconFirst.vue'
// 按钮图标-跳转至最后一页
import iconLast from './button/iconLast.vue'
// 按钮图标-上一页
import iconPrev from './button/iconPrev.vue'
// 按钮图标-下一页
import iconNext from './button/iconNext.vue'
// 对话框-弹出框
import dialog from './dialog/dialog.vue'
// 分页组件
import pagination from './pagination/pagination.vue'
// 下拉选择框
import select from './selecter/selecter.vue'
// 进度条
import progress from './progress/progress.vue'
// 文件上传
import fileupload from './input/fileInput.vue'
// 密码输入框
import passwordInput from './input/passwordInput.vue'
// 单选
import radioCheck from './radio/radio.vue'

export default {
    install(Vue) {
        Vue.component('l-switch', switchButton);
        Vue.component('l-datePicker', datePicker);
        Vue.component('l-dateRange', dateRange);
        Vue.component('l-icon', icon);
        Vue.component('l-icon-first', iconFirst);
        Vue.component('l-icon-last', iconLast);
        Vue.component('l-icon-prev', iconPrev);
        Vue.component('l-icon-next', iconNext);
        Vue.component('l-dialog', dialog);
        Vue.component('l-pagination', pagination);
        Vue.component('l-select', select);
        Vue.component('l-progress', progress);
        Vue.component('l-input', passwordInput);
        Vue.component('l-file', fileupload);
        Vue.component('l-radio', radioCheck);
    }
}


