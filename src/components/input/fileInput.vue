<template>
    <div class="l-input-file">
        <input type="text" class="l-input_input" :placeholder="placeholder" v-model="fileName"
               readonly="readonly">
        <div class="l-input-file-btn pointer" :class="{'upLoad':checked}" @click="checked ? fileUpload : ''">{{checked ?
            '开始上传' : '选择文件'}}
        </div>
        <input type="file" class="l-input_file pointer" @change="uploadFile($event)">
    </div>
</template>

<script>
    let _this = this;
    export default {
        name: "file-input",
        props: {
            placeholder: ''
        },
        data() {
            return {
                checked: false,
                fileName: '',
                filePath: ''
            }
        },
        methods: {
            fileUpload() {
                _this = this;
                alert('文件名：' + _this.fileName + '路径：' + _this.filePath + '     还未对接口做处理');
            },
            uploadFile(e) {
                _this = this;
                _this.filePath = e.target.value;
                _this.fileName = _this.filePath.substring(_this.filePath.lastIndexOf("\\") + 1);
                if (_this.fileName) {
                    _this.checked = true;
                } else {
                    _this.checked = false;
                }
            }
        }
    }
</script>

<style lang="scss">
    .l-input-file {
        position: relative;
        &:hover {
            .l-input-file-btn {
                background: #d7dce6;
            }
        }
        .l-input_input {
            position: absolute;
            z-index: 0;
        }
        .l-input_file {
            position: absolute;
            top: 0;
            right: 0;
            opacity: 0;
            z-index: 1;
        }
        .l-input-file-btn {
            position: absolute;
            top: 0;
            right: 2px;
            line-height: 14px;
            font-size: 14px;
            padding: 8px 10px;
            background: #FFFFFF;
            -webkit-border-radius: 4px 4px 0 0;
            -moz-border-radius: 4px 4px 0 0;
            border-radius: 4px 4px 0 0;
            z-index: 1;
            &.upLoad {
                background: #3673ff;
                color: #FFFFFF;
                z-index: 2;
                &:hover {
                    opacity: 0.9;
                }
            }
        }
    }
</style>
