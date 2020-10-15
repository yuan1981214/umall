<template>
  <div>
    <el-table
      :data="list"
      style="width: 100%; margin-bottom: 20px"
      row-key="id"
      border
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
    >
      <el-table-column
        prop="id"
        label="商品编号"
        sortable
        width="80px"
      ></el-table-column>
      <el-table-column
        prop="goodsname"
        label="商品名称"
        sortable
         width="80px"
      ></el-table-column>
      <el-table-column
        prop="price"
        label="商品价格"
        sortable
        width="80px"
      ></el-table-column>

        
    <el-table-column label="图片"   width="122px">
      <template slot-scope="scope" v-if="scope.row.img!='null'" >
          <div class="imgbox">
                <img   :src="$imgpre+scope.row.img" alt="">
          </div>
      </template>
    </el-table-column>
    
      
      <el-table-column
        prop="isnew"
        label="是否新品"
        sortable
      
      >
      <template slot-scope="scope">
        <el-tag  v-if="scope.row.isnew==1">是</el-tag>
        <el-tag  v-else>否</el-tag>
        
      </template>
      </el-table-column>
      <el-table-column
        prop="ishot"
        label="是否热卖"
        sortable
      >
      <template slot-scope="scope">
        <el-tag  v-if="scope.row.ishot==1">是</el-tag>
        <el-tag  v-else>否</el-tag>
        
      </template>
      </el-table-column>


      <el-table-column prop="status" label="状态">
        <template slot-scope="scope">
          <el-button v-if="scope.row.status == 1" type="primary"
            >启用</el-button
          >
          <el-button v-else type="info">禁用</el-button>
        </template>
      </el-table-column>

      <el-table-column prop="status" label="操作" >
        
            <template slot-scope="scope">
          <el-button type="primary" @click="edit(scope.row.id)"
            >编辑</el-button
          >
          <el-button type="danger" @click="del(scope.row.id)">删除</el-button>
        </template>
       
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      background
      layout="prev, pager, next"
      :page-size="size"
      :total="total"
       @current-change="changepage"
    >
     
    </el-pagination>
  </div>
</template>

<script>
import { reqGoodsdel } from "../../../utils/ruquest";
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      list: "goods/list",
      size:"goods/size",
      total:"goods/total"
    }),
  },
  methods: {
    ...mapActions({
      reqlistaction: "goods/reqlistaction",
      reqtotalaction:"goods/reqtotalaction",
      reqpageaction:"goods/reqpageaction",
    }),
    changepage(e){
      this.reqpageaction(e)
      
    },

    edit(id) {
      this.$emit("edit", id);
    },
    del(id) {
      this.$confirm("确定要删除吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          reqGoodsdel(id).then((res) => {
            if (res.data.code == 200) {
              this.$message({
                type: "success",
                message: "删除成功!",
              });
              this.reqlistaction();
              this.reqtotalaction();
            } else {
              this.$message({
                type: "warning",
                message: res.data.msg,
              });
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
  },
  mounted() {
    this.reqlistaction();
    this.reqtotalaction();
  },
};
</script>

<style scoped>
.imgbox img{
    width: 100px;
    height: 100px;
}
.widthend{
    width:200px;
}
</style>