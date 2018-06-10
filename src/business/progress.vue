<template>
    <div>
        <l-progress :value="value" :color="color" :bgColor="bgColor" :background="background"
                    :animation="animation"></l-progress>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                value: 80,
                color: '#dedede',
                background: '#dedede',
                bgColor: 'green',
                animation: true
            }
        }
    }
</script>

<style scoped>

</style>