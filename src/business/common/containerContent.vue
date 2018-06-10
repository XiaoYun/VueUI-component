<template>
	<div class="container-content pull-left">
		<div class="right-container">
			右侧展示区域
		</div>
	</div>
</template>

<script>
    import leftMenu from './leftMenu.vue'

    export default {
        component: {
            leftMenu: leftMenu
        },
        data() {
            return {}
        },
        mounted() {
            console.log("右侧内容区域被加载完毕.现执行初始化");
        }
    }
</script>

<style>
	.container-content {
		background: #d7dce6;
		width: calc(100% - 230px);
		margin-left: 10px;
		padding: 10px;
	}
</style>
