<template>
  <div class="warp">
   
    <div class="inner">
       <h3>登录</h3>
      <div class="item">
        <el-input v-model="input" placeholder="请输入用户名"></el-input>
      </div>
      <div class="item">
        <el-input
          v-model="input"
          show-password
          placeholder="请输入密码"
        ></el-input>
      </div>

      <div class="item">
        <el-button type="primary" @click="login" >登录</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return {
      input:'',
    }
  },
  methods:{
    login(){
      this.$router.push('/')
    }
  }
};
</script>

<style scoped>
.warp {
  width: 100vw;
  height: 100vh;
  background: linear-gradient(to right, #553443, #303d60);
  position: relative;
}
.inner{
  position: absolute;
  padding:20px;
  text-align: center;
  border-radius: 10px;
  background-color: #fff;
  left:50%;
  top:50%;
  transform: translate(-50%,-50%);

}
.item{
  margin-top:10px;
}
</style>