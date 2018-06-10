<template>
    <div>
        <l-input :isPassword="true" placeholder="可切换状态的输入框" v-model="value"></l-input>
        <l-input placeholder="单纯的输入框" v-model="value"></l-input>
    </div>
</template>

<script>
	export default {
		name: 'l-input',
		data() {
			return {
				value: ''
			}
		}
	}
</script>

<style scoped>

</style>