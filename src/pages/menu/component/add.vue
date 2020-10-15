<template>
  <el-dialog :title=" info.isedit?'编辑菜单':'添加菜单' " @closed="close" :visible.sync="info.isshow">
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="菜单名称">
        <el-input v-model="form.title"></el-input>
      </el-form-item>
      <el-form-item label="上级菜单">
        <el-select v-model="form.pid" placeholder="请选择上级菜单" @change="judge">
          <el-option v-for="item in list" :key="item.id" :label="item.title" :value="item.id"></el-option>
          
        </el-select>
      </el-form-item>
      <el-form-item label="菜单类型" >
        <el-radio v-model="form.type" disabled :label="1"> 目录</el-radio>
        <el-radio v-model="form.type" disabled :label="2"> 菜单</el-radio>
      </el-form-item>

      <el-form-item label="菜单图标" v-if="form.type==1">
        <el-select v-model="form.icon" placeholder="请选择上级菜单">
          <el-option v-for="item in icons" :key="item" :value="item">
            <i :class="item"></i>
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="菜单地址" v-else>
        <el-select v-model="form.url" placeholder="请选择上级菜单">
          <el-option
            v-for="item in secondrouter"
            :key="item.name"
            :label="item.name"
            :value="'/' + item.path"
          >
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="状态">
        <el-switch v-model="form.status" :active-value="1" :inactive-value="2"></el-switch>
      </el-form-item>
    </el-form>

    <div slot="footer" class="dialog-footer">
      <el-button @click="display">取 消</el-button>
      <el-button type="primary" v-if="info.isedit"   @click="update">修改</el-button>
      <el-button type="primary" v-else @click="addlist()">添加</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { secondrouter } from "../../../router/index";
import { reqAddmenu ,reqGetone,reqUpdate } from "../../../utils/ruquest";
import { successAlert,warningAlert } from '../../../utils/alert'
export default {
  props: ["info"],
  data() {
    return {
      icons: [
        "el-icon-s-tools",
        "el-icon-user",
        "el-icon-camera",
        "el-icon-message-solid",
      ],
      //路由
      secondrouter,
      form: {
        pid:0,
        title:'',
        icon:'',
        type:1,
        status:1,
        url:'',
      },
    };
  },
  methods:{
    addlist(){
      
      reqAddmenu(this.form).then(res=>{
        if(res.data.code==200){
          successAlert(res.data.msg);
          this.clearcon();
          this.display();
          this.reqlistaction();

        }else{
          warningAlert(res.data.msg)
        }
      })
    },
    
    close(){
      if(this.info.isedit){
        this.clearcon();
      }
      
    },
    clearcon(){
      this.form={
        pid:0,
        title:'',
        icon:'',
        type:1,
        status:1,
        url:'',
      }
    },
    display(){
      this.info.isshow = false;
    },
    reqone(id){
      reqGetone(id).then(res=>{
      this.form = res.data.list;
        this.form.id=id;
      })

    },
    update(){
      console.log(this.form);
      
      reqUpdate(this.form).then(res=>{
        if(res.data.code==200){
          this.reqlistaction();
          this.clearcon();
          this.display();


          successAlert(res.data.msg);
        }else{
          warningAlert(res.data.msg)

        }

      })
    },
    judge(){
      if(this.form.pid==0){
        this.form.type=1
      }else{
        this.form.type=2
      }

    },
     ...mapActions({
      reqlistaction: "menu/reqlistaction",
    }),
  },
  computed: {
    ...mapGetters({
      list: "menu/list",
    }),
  },
  mounted() {
    this.reqlistaction();
  },
}

</script>

<style>
</style>