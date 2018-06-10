<template>
	<div class="switch-button">
		<div class="switch-normal" :class="{'disabled':disabled ,'active':status}" @click="changeStatus">
			<div class="switch-list" :class="{'active':status}">
				<span v-if="!status">开</span>
			</div>
			<div class="switch-list" :class="{'active':!status}">
				<span v-if="status">关</span>
			</div>
		</div>
	</div>
</template>
<script>
export default {
  props: {
    status: true, //当前状态
    disabled: false, // 是否需要禁用
    label: false, // 是否文本开关
    small: false // 是否小尺寸开关
  },
  methods: {
    changeStatus() {
      let _this = this,
        status = ''
      if (_this.status) {
        status = false
      } else {
        status = true
      }
	  _this.$emit('update:status',status);
      _this.$emit('change', status)
    }
  }
}
</script>

<style>
.switch-button {
  user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  -webkit-user-select: none;
}

.switch-normal {
  display: inline-block;
  width: 44px;
  height: 22px;
  background: rgba(0, 0, 0, 0.25);
  cursor: pointer;
  border-radius: 40px;
  color: #ffffff;
  line-height: 22px;
}

.switch-normal.active {
  background: #3dbd7d;
}

.switch-normal .switch-list {
  width: 18px;
  height: 18px;
  text-align: center;
  line-height: 19px;
  margin: 2px;
  float: left;
  font-size: 12px;
  transition-duration: 5s;
  transition: ease-in-out;
}

.switch-normal .switch-list.active {
  width: 18px;
  height: 18px;
  background: #ffffff;
  border-radius: 100%;
  text-align: center;
  transition-duration: 5s;
  transition: ease-in-out;
}
</style>
