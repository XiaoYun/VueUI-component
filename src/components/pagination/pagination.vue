<template>
    <div class="pagination un-select">
        <ul class="pull-right">
            <li>
                共 {{page.totalCount}} 条
            </li>
            <li>
                <div class="pagination-pageSize pointer" @click="showPageSize = !showPageSize">
                    <div class="pull-left">{{page.pageSize}}条</div>
                    <l-icon name="right" class="select-icons" :class="{'active':showPageSize}"></l-icon>
                </div>
                <div class="pagination-pageSize-list" v-if="showPageSize">
                    <ul>
                        <li v-for="item in pageSizeList" class="pointer text-center" :key="item"
                            @click="page.pageSize = item,showPageSize = false,responsePageInfo"
                            :class="{'active':item === page.pageSize,'normal':item !== page.pageSize}">{{item}}
                        </li>
                        <div class="dropdown-arrow"></div>
                    </ul>
                </div>
            </li>
            <li>
                第
                <span class="pagination-currentPage">{{page.pageIndex}}</span> / {{page.totalPage}} 页
            </li>
            <li>
                <l-icon-first class="pull-left" :class="{'not-allowed':page.pageIndex == 1}"
                              @click.native="goFirst"></l-icon-first>
                <l-icon-prev class="pull-left" :class="{'not-allowed':page.pageIndex == 1}"
                             @click.native="prevPage"></l-icon-prev>
                <input class="pull-left currentPage-input" onfocus="this.select()" type="text" v-model="currentPage"
                       @keyup.enter="enterPage">
                <l-icon-next class="pull-left" :class="{'not-allowed':page.pageIndex == page.totalPage}"
                             @click.native="nextPage"></l-icon-next>
                <l-icon-last class="pull-left" :class="{'not-allowed':page.pageIndex == page.totalPage}"
                             @click.native="goLast"></l-icon-last>
            </li>
        </ul>
    </div>
</template>
<script>
	export default {
		name: 'pagination',
		props: {
			pageInfo: {
				type: Object,
				default: {
					pageSize: {
						type: Number,
						default: 0
					},
					pageIndex: {
						type: Number,
						default: 1
					},
					totalPage: {
						type: Number,
						default: 1
					},
					totalCount: {
						type: Number,
						default: 0
					}
				}
			},
			isSmall: {
				type: Boolean,
				default: false
			}
		},
		data() {
			return {
				page: '',
				pageSizeList: [ '10', '15', '20', '30', '40', '50', '100', '150', '200' ],
				currentPage: null,
				showPageSize: false
			}
		},
		mounted() {
			let _this = this
			_this.page = _this.pageInfo
			_this.currentPage = _this.page.pageIndex
			$('html').click(function () {
				if (_this.showPageSize) {
					_this.showPageSize = false
				}
			})
			$('.pagination-pageSize').click(function (e) {
				let ev = e || window.event
				ev.stopPropagation()
			})
		},
		methods: {
			/**
			 * @function 快速跳转到第一页
			 */
			goFirst() {
				let _this = this
				if (_this.page.pageIndex > 1) {
					_this.page.pageIndex = 1
					_this.responsePageInfo()
				}
			},
			/**
			 * @function 快速跳转到最后一页
			 */
			goLast() {
				let _this = this
				if (_this.page.pageIndex < _this.page.totalPage) {
					_this.page.pageIndex = _this.page.totalPage
					_this.responsePageInfo()
				}
			},
			/**
			 * @function 上一页
			 */
			prevPage() {
				let _this = this
				if (_this.page.pageIndex > 1) {
					_this.page.pageIndex = _this.page.pageIndex - 1
					_this.responsePageInfo()
				}
			},
			/**
			 * @function 下一页
			 */
			nextPage() {
				let _this = this
				if (_this.page.pageIndex < _this.page.totalPage) {
					_this.page.pageIndex = _this.page.pageIndex + 1
					_this.responsePageInfo()
				}
			},
			/**@function 跳转至指定页码 */
			enterPage() {
				let _this = this
				if (1 <= _this.currentPage && _this.currentPage <= _this.page.totalPage) {
					_this.page.pageIndex = _this.currentPage
					_this.responsePageInfo()
				}
				else {
					_this.currentPage = _this.page.pageIndex
				}
			},
			/**
			 * @description 返回分页数据信息
			 */
			responsePageInfo() {
				this.currentPage = this.page.pageIndex
				this.$emit('change', this.page)
			}
		}
	}
</script>
<style lang="scss">
    .pagination {
        margin: 10px 0;
        width: 100%;
        color: #444444;
        font-size: 14px;
        display: inline-block;
        li {
            float: left;
            line-height: 28px;
            margin: 0 3px;
            .currentPage-input {
                height: 28px;
                line-height: 28px;
                display: inline-block;
                width: 60px;
                text-align: center;
                border: 1px solid #d7dce6;
                -webkit-border-radius: 0;
                -moz-border-radius: 0;
                border-radius: 0;
                &:focus {
                    border-color: #3673ff;
                }
            }
            .icon-prev {
                border-radius: 0 4px 4px 0;
            }
            .icon-next {
                border-radius: 0 4px 4px 0;
            }
            .icon-btn {
                margin: 0 3px;
                width: 28px;
                height: 28px;
                .icon {
                    color: #999999;
                    margin: 8px 8px 8px;
                }
                &:hover .icon {
                    color: #3673ff;
                }
            }
            .icon-prev {
                margin-right: 0;
            }
            .icon-next {
                margin-left: 0;
            }
            .pagination-currentPage {
                color: #3673ff;
            }
            .pagination-pageSize {
                width: 60px;
                height: 28px;
                padding-left: 5px;
                line-height: 28px;
                border-radius: 4px;
                border: 1px solid #d7dce6;
                position: relative;
            }
            .select-icons {
                color: #d7dce6;
                position: absolute;
                top: 0;
                right: 3px;
                bottom: 0;
                transform: rotate(90deg);
                left: auto;
                z-index: 0;
                margin: auto 0;
                transition: transform 0.3s;
                width: 10px;
                &.active {
                    transform: rotate(-90deg);
                }
            }
            .pagination-pageSize-list {
                width: 151px;
                height: 91px;
                box-shadow: 0 1px 8px 2px rgba(0, 0, 0, 0.3);
                position: absolute;
                margin-top: -128px;
                background: #fff;
                border-top: 1px dotted #d7dce6;
                border-left: 1px dotted #d7dce6;
                li {
                    width: 50px;
                    height: 30px;
                    line-height: 30px;
                    margin: 0;
                }
                .normal {
                    border-right: 1px dotted #d7dce6;
                    border-bottom: 1px dotted #d7dce6;
                    &:hover {
                        background: #f3f6ff;
                    }
                }
                .active {
                    background: #3673ff;
                    color: #ffffff;
                    border: 1px dotted #d7dce6;
                    margin-top: -1px;
                    margin-left: -1px;
                    width: 51px;
                    height: 31px;
                }
            }
        }
    }
    
    .dropdown-arrow {
        position: absolute;
        display: block;
        width: 0;
        height: 0;
        border: 6px solid transparent;
        filter: drop-shadow(0 2px 12px rgba(0, 0, 0, 0.1));
        top: 89px;
        left: 20px;
        margin: 0 auto;
        border-bottom-width: 0;
        border-top-color: #ffffff;
    }
</style>