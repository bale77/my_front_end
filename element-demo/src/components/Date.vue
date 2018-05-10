<template>
<div>
    <el-date-picker
      v-model="value1"
      type="date"
      placeholder="选择日期"
      :picker-options="pickerOptions0">
    </el-date-picker>
	<div>{{value1}}</div>
</div>
</template>
<script>
	export default{
		data(){
			return {
				value1:'',
				pickerOptions0:''
			}
		}
	}
</script>