<template>
  <el-dialog
    :title="info.isedit ? '编辑管理员' : '添加管理员'"
    @closed="close"
    :visible.sync="info.isshow"
  >
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="所属角色">
        <el-select v-model="form.roleid" placeholder="请选择上级菜单">
          <el-option label="请选择" disabled value=""></el-option>
          <el-option
            v-for="item in list"
            :key="item.id"
            :label="item.rolename"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="用户名">
        <el-input v-model="form.username"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="form.password"></el-input>
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
import { reqManageAdd, reqManageDetail, reqManageUpdate } from "../../../utils/ruquest";
import { successAlert, warningAlert } from "../../../utils/alert";
export default {
  props: ["info"],
  data() {
    return {
      form: {
          roleid:'',
          username:'',
          password:'',
          status: 1,
      },
    };
  },
  methods: {
    addlist() {
      reqManageAdd(this.form).then((res) => {
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
          roleid:'',
          username:'',
          password:'',
          status: 1,
      };
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
      reqRolelistaction: "role/reqlistaction",
      reqtotalaction: "manage/reqtotalaction",
      reqManagelistaction: "manage/reqlistaction",


    }),
  },
  computed: {
    ...mapGetters({
      list: "role/list",
    }),
  },
  mounted() {
    if (this.list.length == 0) {
      this.reqRolelistaction();
    }
  },
};
</script>

<style>
</style>