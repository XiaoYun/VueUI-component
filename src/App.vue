<template>
    <div id="app">
        <!-- 顶部导航区域 -->
        <header-content></header-content>
        <!-- 中间内容区域 -->
        <div class="content">
            <left-menu></left-menu>
            <div class="content_container pull-left">
                <router-view v-wechat-title="$route.name"></router-view>
            </div>
        </div>
    </div>
</template>
<script>
    import headerContent from "./business/common/headerContent.vue";
    import containerContent from "./business/common/containerContent.vue";
    import leftMenu from "./business/common/leftMenu.vue";
    import icon from "./assets/lib/font";

    export default {
        name: "App",
        components: {
            headerContent,
            containerContent,
            leftMenu,
            icon
        },
        mounted() {
            // 初始化时判断是否存在路由信息,如果不存在路由信息,则跳转至首页
            if (!this.$router.history.current.name) {
                this.$router.push({
                    path: "home"
                });
            }
        }
    };
</script>

<style>
    @import url(./style/common.css);

    #app {
        font-family: "Avenir", Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        color: #2c3e50;
    }

    .content_container {
        width: calc(100% - 220px);
        margin: 10px;
    }
</style>
