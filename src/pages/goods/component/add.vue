<template>
  <el-dialog
    :title="info.isedit ? '商品编辑' : '商品添加'"
    @closed="close"
    :visible.sync="info.isshow"
  >
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="一级分类">
        <el-select v-model="form.first_cateid" placeholder="请选择上级菜单" @change="changefirst">
          <el-option label="请选择" disabled value=""></el-option>
          <el-option
            v-for="item in list"
            :key="item.id"
            :label="item.catename"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="二级分类">
        <el-select v-model="form.second_cateid" placeholder="请选择上级菜单">
          <el-option label="请选择" disabled value=""></el-option>
          <el-option
            v-for="item in secondcatelist"
            :key="item.id"
            :label="item.catename"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="商品名称">
        <el-input v-model="form.goodsname"></el-input>
      </el-form-item>
      <el-form-item label="价格">
        <el-input v-model="form.price"></el-input>
      </el-form-item>
      <el-form-item label="市场价格">
        <el-input v-model="form.market_price"></el-input>
      </el-form-item>

      <el-form-item label="图片"  >
        <div class="imgbox">
            <img  class="picture" v-if="imgurl" :src="imgurl" alt="">
            <h1 class="text">+</h1>
            <input type="file" v-if="info.isshow" class="btn" @change="upload">
        </div>
      </el-form-item>

       <el-form-item label="商品规格">
        <el-select v-model="form.specsid" placeholder="请选择" @change="changespecs">
          <el-option label="请选择" disabled value=""></el-option>
          <el-option
            v-for="item in specslist"
            :key="item.id"
            :label="item.specsname"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="规格属性">
        <el-select v-model="form.specsattr" placeholder="请选择" multiple>
          <el-option label="请选择" disabled value=""></el-option>
          <el-option
            v-for="item in goodsAttrList"
            :key="item"
            :label="item"
            :value="item"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="是否新品">
          <el-radio v-model="form.isnew" :label="1">是</el-radio>
          <el-radio v-model="form.isnew" :label="2">否</el-radio>
      </el-form-item>
      <el-form-item label="是否热卖">
        <el-radio v-model="form.ishot" :label="1">是</el-radio>
          <el-radio v-model="form.ishot" :label="2">否</el-radio>
      </el-form-item>
      <el-form-item label="规格描述">
        <textarea name="" v-model="form.description" id="" cols="30" rows="10"></textarea>
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
import {reqCatelist, reqGoodsadd, reqGoodsinfo, reqGoodsedit } from "../../../utils/ruquest";
import { successAlert, warningAlert } from "../../../utils/alert";
export default {
  props: ["info"],
  data() {
    return {
      secondcatelist:[],
      //图片地址
      imgurl: "",
      //商品属性list
      goodsAttrList: [],
      form: {
        first_cateid:"",
        second_cateid:"",
        goodsname:'',
        price:'',
        market_price:'',
        img:null,
        description:'',
        specsid:0,
        specsattr:[],
        isnew:1,
        ishot:1,
        status: 1,
      },
    };
  },
  methods: {
      //上传图片
      upload(e){
        let file=e.target.files[0];
        this.imgurl=URL.createObjectURL(file);
        this.form.img=file;
      },
      //改变父级下拉菜单
      //二级菜单
      changefirst(){
        reqCatelist({pid:this.form.first_cateid}).then(res=>{
          this.secondcatelist=res.data.list;
        })
      },
      //商品规格变化时 请求商品属性 :
      changespecs(){
        this.form.specsattr=[];
        this.getattr();

      },
      //获得商品属性数组
      getattr(){
        let obj=this.specslist.find(item=>item.id==this.form.specsid);
        this.goodsAttrList=obj.attrs;

      },
    addlist() {
      

      let data={
        ...this.form,
        specsattr:JSON.stringify(this.form.specsattr)
      }
      console.log(data);
      reqGoodsadd(data).then((res) => {
        if (res.data.code == 200) {
          successAlert(res.data.msg);
          this.clearcon();
          this.display();
          this.reqGoodslistaction();
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
        first_cateid:"",
        second_cateid:"",
        goodsname:'',
        price:'',
        market_price:'',
        img:null,
        description:'',
        specsid:0,
        specsattr:[],
        isnew:1,
        ishot:1,
        status: 1,
      };
      this.secondcatelist=[],
      //图片地址
      this.imgurl= "",
      //商品属性list
      this.goodsAttrList=[];
    },
    display() {
      this.info.isshow = false;
    },
    reqone(uid) {
      reqManageDetail(uid).then((res) => {
        this.form = res.data.list;
        this.form.password = '';
      });
    },
    update() {
      reqManageUpdate(this.form).then((res) => {
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
      reqCatelistaction: "cate/reqlistaction",
      reqtotalaction: "manage/reqtotalaction",
      reqManagelistaction: "manage/reqlistaction",
      reqSpecslistaction: "specs/reqlistaction",
      reqGoodslistaction: "goods/reqlistaction",


    }),
  },
  computed: {
    ...mapGetters({
      list: "cate/list",
      specslist:'specs/list'
    }),
  },
  mounted() {
    if (this.list.length == 0) {
      this.reqCatelistaction();
    }

    
      this.reqSpecslistaction(true);
    
  },
};
</script>

<style scoped>

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
.btn{
    position: absolute;
    top: 0;
    left:0;
    width: 100px;height: 100px;
    border:none ;
    opacity: 0;
}
</style>