<template>
  <div id="app">
    <el-button>button</el-button>
    <el-button type="primary">primary</el-button>
    <el-button type="danger">danger</el-button>
    <el-button type="success">success</el-button>
    <el-button type="warning">warning</el-button>
    <el-button type="info" icon="close">info</el-button>
    <br>
    {{msg}}
    <br>
    <el-button type="primary" size="small">small primary</el-button>
    <br>
    <span class="el-icon-delete">delete</span>
    <br>
    <el-row>
      <el-col :span="12" class="bd">12</el-col>
      <el-col :span="12" class="bd">12</el-col>
    </el-row>
    <el-row>
      <el-col :span="8">8</el-col>
      <el-col :span="8">8</el-col>
      <el-col :span="8">8</el-col>
    </el-row>
    <Date></Date>
  </div>
</template>

<script>
import Date from './components/Date.vue'
export default {
  name: 'app',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  components:{
    Date
  }
}
</script>

<style scoped lang="less">
@color:red;
.h50(){
  height:50px;
}
.bd{
  .h50;
  border:1px solid @color;
}
</style>
