<template>
    <div class="l-input">
        <input :type="show ? 'password' : 'text'" class="l-input-content" v-model="nVal" @blur="responseData"
               :placeholder="placeholder">
        <div class="l-input-icon pointer" v-if="isPassword" @mousedown="toggleShow">
            <l-icon name="yanjing" v-if="show"></l-icon>
            <l-icon name="mimaicon" v-if="!show"></l-icon>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Linput",
        props: {
            isPassword: {
                type: Boolean,
                default: false
            },
            value: {
                type: String,
                default: ''
            },
            placeholder: ''
        },
        data() {
            return {
                show: false,
                nVal: null
            }
        },
        mounted() {
            console.log(this);
            this.nVal = this.value;
            this.show = this.isPassword;
        },
        methods: {
            toggleShow() {
                this.show = !this.show;
            },
            responseData() {
                this.$emit('input', this.nVal);
            }
        }
    }
</script>

<style lang="scss" type="text/css">
    .l-input {
        width: 100%;
        position: relative;
        .l-input-content {
            font-size: 14px;
            line-height: 14px;
            padding: 8px 10px;
            width: calc(100% - 22px);
            border: 1px solid #d7dce6;
            outline: none;
            -webkit-border-radius: 2px;
            -moz-border-radius: 2px;
            border-radius: 2px;
            &:focus {
                border-color: #3673ff;
            }
        }
        .l-input-icon {
            position: absolute;
            top: 0;
            right: 10px;
        }
    }
</style>
