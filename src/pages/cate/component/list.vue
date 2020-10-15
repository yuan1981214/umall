<template>
  <el-table
    :data="list"
    style="width: 100%; margin-bottom: 20px"
    row-key="id"
    border
    :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
  >
    <el-table-column
      prop="id"
      label="分类编号"
      sortable
      width="180"
    ></el-table-column>
    <el-table-column
      prop="catename"
      label="分类名称"
      sortable
      width="180"
    ></el-table-column>
    
    <el-table-column label="图片" >
      <template slot-scope="scope" v-if="scope.row.img!='null'" >
          <div class="imgbox">
                <img   :src="$imgpre+scope.row.img" alt="">
          </div>
      </template>
    </el-table-column>
    
    
    
    
    <el-table-column prop="status" label="状态">
      <template slot-scope="scope">
        <el-button v-if="scope.row.status == 1" type="primary">启用</el-button>
        <el-button v-else type="info">禁用</el-button>
      </template>
    </el-table-column>
    <el-table-column prop="status" label="操作">
      <template slot-scope="scope">
        <el-button type="primary" @click="edit(scope.row.id)">编辑</el-button>
        <el-button type="danger" @click="del(scope.row.id)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
import { reqDelcate } from "../../../utils/ruquest";
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      list: "cate/list",
    }),
  },
  methods: {
    ...mapActions({
      reqlistaction: "cate/reqlistaction",
    }),

    edit(id){
      this.$emit('edit',id)
    },
    del(id) {
      this.$confirm("确定要删除吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          reqDelcate(id).then((res) => {
            if (res.data.code == 200) {
              this.$message({
                type: "success",
                message: "删除成功!",
              });
              this.reqlistaction();
            }else{
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
  },
};
</script>

<style scoped>
.imgbox img{
    width: 100px;
    height: 100px;
}
</style>