<template>
    <div class="select" :style="{'width':width+'px'}">
        <div class="select-input pointer" :class="{'active':showList}" @click="showList = !showList">
            <input type="text" readonly="readonly" :disabled="disabled"
                   class="l-input pointer un-select"
                   :value="value.name"
                   :placeholder="placeholder">
            <l-icon name="right" class="select-icons" :class="{'active':showList}"
                    v-if="!deleteItem || (deleteItem && !value.name)"></l-icon>
            <l-icon name="delete" class="delete-icons" v-if="value.name && deleteItem"
                    @click.native.stop="deleteChecked"></l-icon>
        </div>
        <div class="select-drop" v-show="showList">
            <div class="select-arrow"></div>
            <div class="select-searcher" v-if="searcher">
                <input type="text" @focus="focusSearch = true" @blur="focusSearch = false"
                       class="l-input searcher-input" v-model="filterValue"
                       @keyup="filterSelect">
                <l-icon name="search" class="searchIcons" :class="{'active':focusSearch}"></l-icon>
            </div>
            <div class="select-list">
                <ul :style="{'max-height': searcher ? height-50+'px': height+'px'}">
                    <div class="no-data-tips" @click="responseData" v-if="list.length === 0">没有符合条件的数据。</div>
                    <li class="pointer" v-for="item in list" v-bind:key="item.id" @click="responseData(item)"
                        :class="{'selected':selected === item}">
                        <l-icon v-if="hasIcons" :name="item.icons"></l-icon>
                        {{item.name}}
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
	export default {
		name: 'selecter',
		props: {
			options: {
				type: Array,
				default: []
			},
			placeholder: {
				type: String,
				default: '请选择一个选项'
			},
			searcher: {
				type: Boolean,
				default: false
			},
			value: null,
			defaultSelectedId: null,
			height: {
				type: Number,
				default: 200
			},
			hasIcons: {
				type: Boolean,
				default: false
			},
			width: {
				type: Number,
				default: 240
			},
			disabled: {
				type: Boolean,
				default: false
			},
			deleteItem: {
				type: Boolean,
				default: false
			}
		},
		data() {
			return {
				list: [], // 显示的数组
				showList: false,
				filterValue: '',
				selected: '',
				focusSearch: false
			}
		},
		mounted() {
			this.init()
		},
		methods: {
			/**
			 * @function 初始化设置，用来做值的清空处理以及对应的事件处理
			 */
			init() {
				let _this = this
				_this.list = _this.options
				_this.selected = _this.value
				_this.filterValue = ''
				$('html').click(function () {
					_this.responseData()
				})
				$(_this.$el).click(function (event) {
					event.stopPropagation()
				})
			},
			/**
			 * @function 用来做本地搜索过滤，按照名称进行过滤查询
			 */
			filterSelect() {
				let _this = this,
					len = _this.options.length
				if (_this.filterValue) {
					_this.list = []
					for (let i = 0; i < len; i++) {
						if (_this.options[ i ].name.indexOf(_this.filterValue) > -1) {
							_this.list.push(_this.options[ i ])
						}
					}
				}
				else {
					_this.list = _this.options
				}
			},
			/**
			 * @function 设置默认选中选项,根据前端传递过来的ID值进行强判断处理
			 * @function 如果ID强相等，那么则认为该选项是默认选项
			 */
			setDefaultSelect(id) {
				let _this = this
				for (let i = 0; i < _this.options.length; i++) {
					if (id === _this.options[ i ].id) {
						_this.selected = _this.options[ i ]
						break
					}
				}
			},
			deleteChecked() {
				let _this = this
				_this.showList = false
				_this.filterValue = ''
				_this.list = _this.options
				_this.selected = ''
				_this.$emit('input', _this.selected)
				_this.$emit('change')
			},
			/**
			 * @function 用来返回给前端用户选择的选项，返回值是用户选择的整条数据记录
			 */
			responseData(item) {
				let _this = this
				_this.showList = false
				_this.filterValue = ''
				_this.list = _this.options
				if (item && item.name) {
					_this.selected = item
					_this.$emit('input', _this.selected)
					_this.$emit('change')
				}
			}
		}
	}
</script>

<style lang="scss">
    .select {
        display: inline-block;
        position: relative;
        .select-input {
            position: relative;
            &.active {
                input {
                    border-color: #3673ff !important;
                }
                .select-icons {
                    color: #3673ff;
                }
            }
            input:focus {
                border-color: #d7dce6;
            }
            .select-icons {
                color: #d7dce6;
                position: absolute;
                top: 0;
                right: 9px;
                bottom: 0;
                left: auto;
                z-index: 0;
                transform: rotate(90deg);
                margin: auto 0;
                transition: transform 0.3s;
                width: 10px;
                &.active {
                    transform: rotate(-90deg);
                    color: #3673ff;
                }
            }
            .delete-icons {
                color: #d7dce6;
                position: absolute;
                top: 0;
                right: 9px;
                bottom: 0;
                left: auto;
                z-index: 0;
                transform: rotate(90deg);
                margin: auto 0;
                transition: transform 0.3s;
                width: 14px;
                &:hover {
                    color: #FF0000;
                }
            }
        }
        .select-drop {
            position: absolute;
            top: 34px;
            right: auto;
            bottom: auto;
            left: auto;
            z-index: 2;
            width: 100%;
            padding: 10px 0;
            border-radius: 4px;
            background-color: #fff;
            border: 1px solid #d7dce6;
            box-shadow: 0 2px 12px 0 rgba(0, 0, 0, .1);
            box-sizing: border-box;
            margin: 10px 0;
            .select-arrow {
                border: 8px solid transparent;
                filter: drop-shadow(0 2px 12px rgba(0, 0, 0, .03));
                top: -8px;
                left: 20px;
                margin: 0 auto;
                border-top-width: 0;
                float: left;
                position: absolute;
                border-bottom-color: #d7dce6;
                &:after {
                    position: absolute;
                    display: block;
                    width: 0;
                    height: 0;
                    border: 8px solid transparent;
                    content: " ";
                    top: 1px;
                    margin-left: -8px;
                    border-top-width: 0;
                    border-bottom-color: #fff;
                }
            }
            .select-searcher {
                padding: 5px 10px 10px 10px;
                .l-input {
                    padding-right: 25px;
                }
                .searchIcons {
                    position: absolute;
                    right: 16px;
                    width: 16px;
                    top: 24px;
                    color: #999999;
                    &.active {
                        color: #3673ff;
                    }
                }
            }
            .select-list {
                background: #ffffff;
                overflow-y: auto;
                .no-data-tips {
                    height: 30px;
                    line-height: 30px;
                    padding: 0 10px;
                    color: #999999;
                    font-size: 14px;
                }
                li {
                    height: 40px;
                    line-height: 40px;
                    padding: 0 10px;
                    font-size: 14px;
                    font-weight: 400;
                    color: #666666;
                    &:hover {
                        background: #f1f5ff;
                    }
                    &.selected {
                        color: #3673ff;
                        background: #ffffff;
                        font-weight: bold;
                        .icon {
                            color: #3673ff;
                        }
                    }
                }
            }
        }
    }
</style>