<template>
    <div id="progressInfo" :class="{'progress':value > 0 && animation}"
         :style="{'width':width+'px','height':height+'px','background-color':background}">
        <div class="progress-container" :style="{'width':value+'%'}">
            <span class="load" :style="{'background-color':bgColor}"></span>
        </div>
        <div class="progress-value" :style="{'color':color}">{{value+'%'}}</div>
    </div>
</template>

<script>
    export default {
        name: 'progressInfo',
        props: {
            value: {
                type: Number,
                default: 0
            },
            animation: {
                type: Boolean,
                default: true
            },
            color: {
                type: String,
                default: '#ffffff'
            },
            bgColor: {
                type: String,
                default: '#ff7300'
            },
            background: {
                type: String,
                default: '#d7dce6'
            },
            height: {
                type: Number,
                default: 20
            },
            width: {
                type: Number,
                default: 300
            }
        }
    }
</script>

<style scoped>
    .progress {
        height: 20px;
        box-shadow: none;
        overflow: visible;
        position: relative;
        border-radius: 10px;
    }

    .progress-container {
        height: 100%;
    }

    .load {
        float: left;
        height: 100%;
        width: 100%;
        font-size: 12px;
        line-height: 20px;
        color: #fff;
        text-align: center;
        -webkit-box-shadow: inset 0 -1px 0 rgba(0, 0, 0, .15);
        box-shadow: inset 0 -1px 0 rgba(0, 0, 0, .15);
        -moz-animation: progressing 2.5s ease-in;
        -webkit-animation: progressing 2.5s ease-in;
        border-radius: 10px;
    }

    .progress-value {
        margin-top: -20px;
        width: 100%;
        color: #ffffff;
        float: left;
        text-align: center;
        text-shadow: 1px 1px 1px #000000;
    }

    @-moz-keyframes progressing {
        0% {
            width: 0;
        }
        100% {
            width: 100%;
        }
    }

    @-webkit-keyframes progressing {
        0% {
            width: 0;
        }
        100% {
            width: 100%;
        }
    }
</style>