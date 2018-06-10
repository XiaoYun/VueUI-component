// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import components from './components/index'
import untils from './assets/utils'
import VueWeChatTitle from 'vue-wechat-title';

Vue.use(components);
Vue.use(untils);
Vue.use(VueWeChatTitle);
Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    components: {
        App
    },
    template: '<App/>'
});