<template>
    <div class="modal-bg" v-if="showDialog">
        <div class="modal" id="test">
            <div class="modal-header" @mousedown="dragDialog">
                <a class="close" @click="close">
                    <l-icon name="icon-tanchuangguanbi"></l-icon>
                </a>
                <slot name="header"></slot>
            </div>
            <div class="modal-body">
                <slot></slot>
            </div>
            <div class="modal-footer">
                <slot name="footer"></slot>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "modal",
        props: {
            dialogName: {
                type: String,
                default: ""
            }
        },
        data() {
            return {
                showDialog: false
            };
        },
        mounted() {
            this.showDialog = true;
        },
        methods: {
            close() {
                this.showDialog = false;
            },
            dragDialog(ev) {
                let _this = this;
                let $tar = $("#test .modal-header");
                $tar.addClass("draging");
                let oDiv = $tar[0],
                    disX = 0,
                    disY = 0,
                    oDivLeft = 0,
                    oDivTop = 0,
                    pDisX = 0,
                    pDisY = 0,
                    oEvent = ev,
                    par = oDiv.parentNode;
                disX = oEvent.clientX;
                disY = oEvent.clientY;
                let pDis = _this.getPos(par);
                pDisX = pDis.left;
                pDisY = pDis.top;
                let minLeft = 100 - $(par).width();
                if (oDiv.setCapture) {
                    oDiv.onmousemove = mouseMove;
                    oDiv.onmouseup = mouseUp;
                    oDiv.setCapture();
                } else {
                    oDiv.onmousemove = mouseMove;
                    oDiv.onmouseup = mouseUp;
                }

                function mouseMove(event) {
                    let e = event || window.event;
                    oDivLeft = e.clientX - disX;
                    oDivTop = e.clientY - disY;
                    par.style.marginLeft = 0;
                    let left = pDisX + oDivLeft,
                        top = pDisY + oDivTop;
                    top = top < 0 ? 0 : top;
                    par.style.left = left + "px";
                    par.style.top = top + "px";
                }

                function mouseUp(event) {
                    let e = event || window.event;
                    $tar.removeClass("draging");
                    this.onmousemove = null;
                    this.onmouseup = null;
                    if (oDiv.releaseCapture) {
                        oDiv.releaseCapture();
                    }
                }
            },
            getPos(dom) {
                let e = dom;
                let t = e.offsetTop;
                let l = e.offsetLeft;
                let height = e.offsetHeight;
                while ((e = e.offsetParent)) {
                    t += e.offsetTop;
                    l += e.offsetLeft;
                }
                return {
                    top: t,
                    left: l
                };
            }
        }
    };
</script>

<style>
    .modal-bg {
        width: 100%;
        left: 0;
        top: 0;
        height: 100%;
        position: fixed;
        background-color: rgba(0, 0, 0, 0.3);
    }

    .modal {
        width: 520px;
        position: absolute;
        bottom: auto;
        right: 0;
        left: 0;
        top: 10%;
        z-index: 999;
        margin: 0 auto;
        background-color: transparent;
        outline: none;
        border: 1px solid rgba(0, 0, 0, 0.3);
        border-radius: 8px;
        box-shadow: 0 3px 7px rgba(0, 0, 0, 0.3);
        background-clip: padding-box;
    }

    .modal .modal-header {
        font-weight: 500;
        line-height: 40px;
        min-height: 40px;
        color: #ffffff;
        background-color: #3673ff;
        border-radius: 8px 8px 0 0;
        text-align: center;
        cursor: grab;
        cursor: -webkit-grab;
    }

    .modal .modal-body {
        background-color: #ffffff;
        padding: 8px 15px;
        min-height: 300px;
    }

    .modal .modal-footer {
        padding: 10px;
        text-align: right;
        border-radius: 0 0 8px 8px;
        background-color: #d7dce6;
        box-shadow: 0 1px 0 #ffffff;
    }

    .modal .close {
        position: absolute;
        right: 13px;
        top: 12px;
        cursor: pointer;
    }

    .modal .close .icon {
        color: #ffffff;
        font-size: 14px;
    }

    .draging {
        cursor: -webkit-grabbing !important;
        cursor: -moz-grabbing !important;
        cursor: grabbing !important;
    }
</style>
