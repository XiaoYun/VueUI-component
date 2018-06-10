<template>
    <div role="radio" class="l-radio pointer" :class="{'not-allowed':disabled,'checked': value === cValue}"
         @click.stop="changeRadio">
        <span class="l-radio-item pull-left" :class="{'not-allowed':disabled}">
            <l-icon name="radio-checked" class="pull-left" v-if="value === cValue"></l-icon>
            <l-icon name="radio" class="pull-left" v-else></l-icon>
            <input type="radio" class="l-radio-input" :value="value" @click.stop="">
        </span>
        <span class="l-radio-label pull-left">
            <slot></slot>
        </span>
    </div>
</template>

<script>
    export default {
        name: "radio",
        props: {
            value: '',
            cValue: '',
            disabled: ''
        },
        methods: {
            changeRadio() {
                let _this = this;
                if (_this.disabled) {
                    return
                }
                let checked = _this.cValue;
                _this.$emit('input', checked);
            }
        }
    }
</script>

<style lang="scss">
    .l-radio {
        font-weight: 500;
        line-height: 1;
        position: relative;
        display: inline-block;
        white-space: normal;
        outline: none;
        -moz-user-select: none;
        user-select: none;
        -ms-user-select: none;
        -webkit-user-select: none;
    }

    .l-radio-item {
        white-space: normal;
        outline: none;
        display: inline-block;
        position: relative;
        vertical-align: middle;
    }

    .l-radio-input {
        opacity: 0;
        outline: none;
        position: absolute;
        z-index: -1;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        margin: 0;
    }

    .l-radio-label {
        padding-left: 8px;
        display: inline-block;
        vertical-align: middle;
    }

    .l-radio-label .icons {
        margin-right: 5px;
    }

    .l-radio.checked .l-radio-label {
        color: #3673ff;
    }

    .l-radio.not-allowed .l-radio-label {
        color: #cacaca;
    }

    .l-radio.not-allowed .icons {
        -webkit-filter: grayscale(100%);
        filter: grayscale(100%);
    }
</style>
