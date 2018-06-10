<template>
    <div style="width:100%;">
        <l-select :height="300" :width="200" v-model="selected" :defaultSelectedId="selectedId" :options="dataList"
                  :searcher="true"
                  :hasIcons="true" @change="changeSelect" :deleteItem="true">
        </l-select>
        <h4>调用指令:</h4>
        <code>
            &lt;l-select :height="300" :width="200" v-model="selected" :defaultSelectedId="selectedId"
            :options="dataList"
            :searcher="true"
            :hasIcons="true" @change="changeSelect" :deleteItem="true"&gt;&lt;/l-selecter&gt;
        </code>
        <h4>参数列表:</h4>
        <code>
            <br/> :v-model:承载选中的选项数据,不需通过函数体取值,会返回对应一整条数据
            <br/> :defaultSelectedId:默认选中的选项ID
            <br/> :options:选项的数组
            <br/> :searcher:是否需要筛选，默认false,只支持true/false
            <br/> :hasIcons:选项是否有图标,默认false，只支持true/false,如果需要支持图标,需要在options里面的每一个选项增加一个iconClass
            <br/> :height:下拉列表的高度,默认200px
            <br/> :width:下拉选择框的宽度,默认240px
            <br/> :deleteItem:是否可删除选中项，默认false，只支持true/false
        </code>
    </div>

</template>

<script>
	export default {
		data() {
			return {
				'dataList': [],
				'selected': '',
				'selectedId': 1
			}
		},
		mounted() {
			this.init()
		},
		methods: {
			init() {
				for (var i = 0; i < 30; i++) {
					var obj = {
						'id': i,
						'icons': Math.random() > 0.3 ? 'pdf' : Math.random() > 0.6 ? 'keyboard' : 'user',
						'name': '第 ' + i + ' 个'
					}
					this.dataList.push(obj)
				}
			},
			changeSelect() {
				console.log(this.selected)
			}
		}
	}
</script>