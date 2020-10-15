import {reqCatelist} from '../../utils/ruquest'
const state={
    list:[],
}
const mutations={
    changelist(state,arr){
        state.list=arr;
    }
}
const actions={
    reqlistaction(context){
        reqCatelist({istree:true}).then(res=>{
            let list=res.data.list?res.data.list:[];
            context.commit('changelist',list)
        })
    }
}
const getters={
    list(state){
        return state.list;
    }
}
export default {
    state,
    mutations,
    actions,
    getters,
    namespaced:true,
}