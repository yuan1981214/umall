<template>
  <el-dialog
    :title="info.isedit ? '规格编辑' : '规格添加'"
    @closed="close"
    :visible.sync="info.isshow"
  >
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="规格名称">
        <el-input v-model="form.specsname"></el-input>
      </el-form-item>

      <el-form-item label="规格属性" v-for="(item,index) in attrArr" :key="index" >
        <div class="boxer">
          <el-input v-model="item.value" @change="kook"></el-input>
          <el-button type="primary"  v-if="index==0"  @click="addline">新增规格属性</el-button>
          <el-button type="danger"  v-else  @click="delline(index)">删除</el-button>
        </div>
      </el-form-item>


      <el-form-item label="状态">
        <el-switch
          v-model="form.status"
          :active-value="1"
          :inactive-value="2"
        ></el-switch>
      </el-form-item>
    </el-form>

    <div slot="footer" class="dialog-footer">
      <el-button @click="display">取 消</el-button>
      <el-button type="primary" v-if="info.isedit" @click="update"
        >修改</el-button
      >
      <el-button type="primary" v-else @click="addlist()">添加</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import {
  reqSpecsAdd,
  reqSpecsDetail,
  reqSpecsUpdate,
} from "../../../utils/ruquest";
import { successAlert, warningAlert } from "../../../utils/alert";
export default {
  props: ["info"],
  data() {
    return {
      attrArr:[
        {value:''},
        {value:''},
      ],
      form: {
        specsname: "",
        attrs: "[]",
        status: 1,
      },
    };
  },
  methods: {
    kook(){
      console.log(this.attrArr);
    },
    //点击按钮新增一行
    addline() {
      this.attrArr.push({value:''});
    },
    delline(index){
      this.attrArr.splice(index,1);
    },
    addlist() { 
      this.form.attrs=JSON.stringify(this.attrArr.map(item=>item.value ));
      
      reqSpecsAdd(this.form).then((res) => {
        if (res.data.code == 200) {
          successAlert(res.data.msg);
          this.clearcon();
          this.display();
          this.reqManagelistaction();
          this.reqtotalaction();
        } else {
          warningAlert(res.data.msg);
        }
      });
    },

    close() {
      if (this.info.isedit) {
        this.clearcon();
      }
    },
    clearcon() {
      this.form = {
        specsname: "",
        attrs: "[]",
        status: 1,
      };
      this.attrArr=[
        {value:''},
        {value:''},
      ]
    },
    display() {
      this.info.isshow = false;
    },
    reqone(id) {
      reqSpecsDetail(id).then((res) => {
        this.form = res.data.list[0];
        this.attrArr=JSON.parse(this.form.attrs).map((item)=>({value:item}))

      });
    },
    //更新之前要验证数据是否合格,封装一个验证的方法,每次检测调用该方法
    check(){
      if(this.form.specsname==''){
        warningAlert("不能输入为空!!!")
        return false;
      }

      if(this.attrArr.some(item=>item.value=="")){
        warningAlert("所有的值都必须输入!!!")
        return false;
      }
      return true;
    },
    update() {

      if(!this.check()){
        console.log(this.check(),"222")
          return;
        }
        // this.form.attrs=JSON.stringify(this.attrArr.map(item=>item.value ));
        // this.form.attrs = JSON.stringify(this.attrArr.map((item) => item.value));
        
        this.form.attrs = JSON.stringify(this.attrArr.map((item) => item.value));

      reqSpecsUpdate(this.form).then((res) => {

        if (res.data.code == 200) {
          this.reqManagelistaction();
          this.clearcon();
          this.display();

          successAlert(res.data.msg);
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
    ...mapActions({
      // reqRolelistaction: "role/reqlistaction",
      reqtotalaction: "specs/reqtotalaction",
      reqManagelistaction: "specs/reqlistaction",
    }),
  },
  computed: {
    ...mapGetters({
      list: "role/list",
    }),
  },
  mounted() {
    if (this.list.length == 0) {
      this.reqManagelistaction();
    }
  },
};
</script>

<style scoped>
.boxer {
  display: flex;
  margin: 5px auto;
}
</style>