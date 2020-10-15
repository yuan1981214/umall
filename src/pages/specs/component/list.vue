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
        label="规格编号"
        sortable
        width="180"
      ></el-table-column>
      <el-table-column
        prop="specsname"
        label="规格名称"
        sortable
        width="180"
      ></el-table-column>
      <el-table-column  label="规格属性" sortable width="180">
        <template slot-scope="scope">
            <el-tag
          v-for="item in scope.row.attrs"
          :key="item.label"
          :label="item"
         
        >
          {{ item }}
        </el-tag>
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
      <el-table-column prop="status" label="操作">
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
import { reqSpecsDel } from "../../../utils/ruquest";
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      list: "specs/list",
      size: "specs/size",
      total: "specs/total",
    }),
  },
  methods: {
    ...mapActions({
      reqlistaction: "specs/reqlistaction",
      reqtotalaction: "specs/reqtotalaction",
      reqpageaction: "specs/reqpageaction",
    }),
    changepage(e) {
      this.reqpageaction(e);
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
          reqSpecsDel(id).then((res) => {
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

<style>
</style>