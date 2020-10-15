<template>
  <el-dialog
    :title="info.isedit ? '编辑角色' : '添加角色'"
    @closed="close"
    :visible.sync="info.isshow"
  >
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="角色名称">
        <el-input v-model="form.rolename"></el-input>
      </el-form-item>

      <el-form-item label="角色权限">
        <el-tree
         :data="list"
            show-checkbox
            default-expand-all
            node-key="id"
            ref="tree"
           :props="{ children: 'children', label: 'title' }"
        >
        </el-tree>
      </el-form-item>

      <el-form-item label="状态">
        <el-switch
          v-model="form.status"
          :active-value="1"
          :inactive-value="2"
        ></el-switch>
      </el-form-item>
    </el-form>
    <!-- <el-button type="danger" @click="getKeys">key</el-button> -->
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
  reqAddrole,
  reqGetonerole,
  reqUpdaterole,
} from "../../../utils/ruquest";
import { successAlert, warningAlert } from "../../../utils/alert";
export default {
  props: ["info"],
  data() {
    return {
      form: {
        rolename: "",
        menus: "[]",
        status: 1,
      },
    };
  },
  methods: {
    addlist() {
      //点击添加按钮,先获取树形菜单的值;
      this.form.menus = JSON.stringify(this.$refs.tree.getCheckedKeys());
      reqAddrole(this.form).then((res) => {
        if (res.data.code == 200) {
          successAlert(res.data.msg);
          this.clearcon();
          this.display();
          this.reqRolelistaction();
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
        rolename: "",
        menus: "[]",
        status: 1,
      };
    //   this.$refs.tree.setCheckedkeys([]);
    },
    display() {
      this.info.isshow = false;
    },

    reqGetone(id) {
      reqGetonerole(id).then((res) => {
        this.form = res.data.list;
        this.form.id = id;

        //给树形控件赋值 ====>
         this.$refs.tree.setCheckedKeys(JSON.parse(this.form.menus))
      });
    },

    update() {
      reqUpdaterole(this.form).then((res) => {
        if (res.data.code == 200) {
          this.reqRolelistaction();
          this.clearcon();
          this.display();

          successAlert(res.data.msg);
        } else {
          warningAlert(res.data.msg);
        }
      });
    },

    // judge() {
    //   if (this.form.pid == 0) {
    //     this.form.type = 1;
    //   } else {
    //     this.form.type = 2;
    //   }
    // },
    ...mapActions({
      reqlistaction: "menu/reqlistaction",
      reqRolelistaction: "role/reqlistaction",
    }),
  },
  computed: {
    ...mapGetters({
      list: "menu/list",
    }),
  },
  mounted() {
    if (this.list.length == 0) {
      this.reqlistaction();
    }
  },
//   getKeys() {
//     console.log(this.$refs.ref1.getCheckedkeys(), "ref");
//   },
};
</script>

<style>
</style>