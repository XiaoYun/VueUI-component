<template>
    <div>
        <l-switch :status.sync="status" @change="changeSwitch"></l-switch>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                status: true
            }
        },
        methods: {
            changeSwitch(res) {
            }
        }
    }
</script>

<style>
</style>
