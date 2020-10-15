<template>
  <div class="warp">
      <el-dialog
    :title="info.isedit ? '商品分类编辑' : '商品分类添加'"
    @closed="close"
    :visible.sync="info.isshow"
  >
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="上级分类">
        <el-select v-model="form.pid" placeholder="请选择上级菜单">
          <el-option label="请选择" disabled value=""></el-option>
          <el-option label="顶级菜单"  :value="0"></el-option>
          <el-option
            v-for="item in list"
            :key="item.id"
            :label="item.catename"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="分类名称">
        <el-input v-model="form.catename"></el-input>
      </el-form-item>


      <el-form-item label="图片" v-if="form.pid!==0" >
        <div class="imgbox">
            <img  class="picture" :src="imgurl" alt="">
            <h1 class="text">+</h1>
            <input type="file" class="btn" @change="upload">
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
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { reqCateadd, reqGetonecate, reqUpdatecate } from "../../../utils/ruquest";
import { successAlert, warningAlert } from "../../../utils/alert";
export default {
  props: ["info"],
  data() {
    return {
        imgurl:'',
      form: {
          pid:0,
          catename:'',
          img:null,
          status: 1,
      },
    };
  },
  methods: {
    addlist() {
      reqCateadd(this.form).then((res) => {
        if (res.data.code == 200) {
          successAlert(res.data.msg);
          this.clearcon();
          this.display();
          this.reqCatelistaction();
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
    upload(e){
        let file = e.target.files[0];

        if(file.size>2*1024*1024){
            warningAlert('文件超出大小!!!');
            return;
        }

        let imgbox=['.jpg','.jpeg','.gif','.png'];
        let extname=file.name.slice(file.name.lastIndexOf('.'));
        if(!imgbox.some(item=>extname==item)){
            warningAlert('请选择正确的图片格式!!!');
            return;
        }
        this.imgurl=URL.createObjectURL(file);
        this.form.img=file;

    },

    close() {
      if (this.info.isedit) {
        this.clearcon();
      }
    },
    clearcon() {
      this.form = {
          pid:'',
          catename:'',
          img:null,
          status: 1,
      };
      this.imgurl='';
    },
    display() {
      this.info.isshow = false;
    },
    reqone(id) {
      reqGetonecate(id).then((res) => {
        this.form = res.data.list;
        this.form.id=id
        this.imgurl= this.form.img

      });
    },
    update() {
      reqUpdatecate(this.form).then((res) => {
        if (res.data.code == 200) {
          this.reqCatelistaction();
          this.clearcon();
          this.display();

          successAlert(res.data.msg);
        } else {
          warningAlert(res.data.msg);
        }
      });
    },
    ...mapActions({
      reqCatelistaction: "cate/reqlistaction",
    //   reqManagelistaction: "manage/reqlistaction",

    }),
  },
  computed: {
    ...mapGetters({
      list: "cate/list",
    }),
  },
  mounted() {
    if (this.list.length == 0) {
      this.reqCatelistaction();
    }
  },
};
</script>

<style lang="stylus" scoped>
.imgbox{
    width: 100px;height: 100px;
    text-align: center;
    line-height: 100px;
    border:1px dashed #999; 
    position: relative;
}
.imgbox .picture{
    position: absolute;
    top: 0;
    left:0;
    width: 100px;height: 100px;
}
.imgbox .text{
    font-weight: 300;
    
}
.warp >>> .btn{
    position: absolute;
    top: 0;
    left:0;
    width: 100px;height: 100px;
    border:none ;
    opacity: 0;
}

</style>