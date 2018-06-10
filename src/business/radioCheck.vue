<template>
    <div>
        <l-radio v-model="radioValue" cValue="Louis">Louis</l-radio>
        <l-radio v-model="radioValue" cValue="Dansemacabre">Dansemacabre</l-radio>
    </div>
</template>

<script>
	export default {
		name: 'radio-check',
		data() {
			return {
				radioValue: [ 'Louis', 'Dansemacabre' ]
			}
		}
	}
</script>

<style scoped>

</style>