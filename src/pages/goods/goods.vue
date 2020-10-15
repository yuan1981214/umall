<template>
  <div class="mt25">
      <el-button  type="primary" @click="add">添加</el-button>
      <v-list @edit="edit"></v-list>
      <v-add ref="add" :info="info"></v-add>
  </div>
</template>
<script>
import vList from './component/list'
import vAdd from './component/add'
import { mapGetters, mapActions } from "vuex";
export default {
  props: [],
  components: {
      vList,
      vAdd
  },
  data() {
    return {
        info:{
            isshow:false,
            isedit:true,
        }
    };
  },
  computed: {
    ...mapGetters({}),
  },
  methods: {
    ...mapActions({}),
    add(){
      this.info.isshow=true;
      this.info.isedit=false;
    },

    edit(uid){
      this.info.isshow=true;
      this.info.isedit=true;
      this.$refs.add.reqone(uid)
      
    }
    
  },
  mounted() {},
};
</script>
<style scoped>
</style>