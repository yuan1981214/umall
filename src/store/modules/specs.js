import {reqSpecsList,reqSpecseCount} from '../../utils/ruquest'
const state={
    list:[],
    size:3,
    total:0,
    page:1,
}
const mutations={
    changelist(state,arr){
        state.list=arr;
    },
    changesize(state,a){
        state.size=a;
    },
    changetotal(state,a){
        state.total=a;
    },
    changepage(state,a){
        state.page=a;
        console.log(state.list);
    }
}
const actions={
    reqlistaction(context,bool){
        let params=bool?{}:{page:context.state.page,size:context.state.size};

        reqSpecsList(params).then(res=>{
            let list=res.data.list?res.data.list:[];

            if(list.length==0&&context.state.page>1){
                context.commit('changepage',context.state.page-1);
                context.dispatch('reqlistaction');
                return;
            }

            // list.forEach(item => {
            //     item.attrs = JSON.parse(item.attrs)
            // })
            list.forEach(item=>item.attrs=JSON.parse(item.attrs));
            context.commit('changelist',list)
        })
    },


//请求总数
    reqtotalaction(context){
        reqSpecseCount().then(res=>{
            context.commit('changetotal',res.data.list[0].total)
        })
    },

    //修改页码
    reqpageaction(context,page){
        context.commit('changepage',page);
        context.dispatch('reqlistaction');

    }
}
const getters={
    list(state){
        return state.list;
    },
    size(state){
        return state.size;
    },
    total(state){
        return state.total;
    }
}
export default {
    state,
    mutations,
    actions,
    getters,
    namespaced:true,
}