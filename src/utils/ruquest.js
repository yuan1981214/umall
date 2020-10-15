import { data } from 'autoprefixer';
import axios from 'axios';
import qs from 'qs';
import Vue from 'vue';
Vue.prototype.$imgpre='http://localhost:3000'

let baseurl = '/api'

axios.interceptors.response.use(res=>{
    console.group('--------本次请求地址是:'+res.config.url);
    console.log(res);
    console.groupEnd();
    return res;
})

    // <=======菜单管理接口========>

export const reqAddmenu=(obj)=>{
    return axios({
        url:baseurl+'/api/menuadd',
        method:'post',
        data:qs.stringify(obj)
    })
}
export const reqMenulist=()=>{
    return axios({
        url:baseurl+"/api/menulist",
        params:{
            istree:true,
        }
    })
}
export const reqDellist=(id)=>{
    return axios({
        url:baseurl+"/api/menudelete",
        method:'post',
        data:qs.stringify({id,})
    })
}

export const reqGetone=(id)=>{
    return axios({
        url:baseurl+"/api/menuinfo",
        params:{id,}
    })
}
export const reqUpdate=(obj)=>{
    return axios({
        url:baseurl+"/api/menuedit",
        method:'post',
        data:qs.stringify(obj)
    })
}

//   <===========角色管理接口请求===========>


//角色列表
export const reqRolelist=()=>{
    return axios({
        url:baseurl+"/api/rolelist",
    })
}

//角色添加
export const reqAddrole=(obj)=>{
    return axios({
        url:baseurl+'/api/roleadd',
        method:'post',
        data:qs.stringify(obj)
    })
}
//获取一条角色信息
export const reqGetonerole=(id)=>{
    return axios({
        url:baseurl+"/api/roleinfo",
        params:{id}
    })
}
//角色修改
export const reqUpdaterole=(obj)=>{
    return axios({
        url:baseurl+"/api/roleedit",
        method:'post',
        data:qs.stringify(obj)
    })
}

//角色删除

export const reqDelrole=(id)=>{
    return axios({
        url:baseurl+"/api/roledelete",
        method:'post',
        data:qs.stringify({id,})
    })
}


//==============管理员管理==========
/*********管理员管理***************/
//添加
export const reqManageAdd=(params)=>{
    return axios({
        url:baseurl+"/api/useradd",
        method:"post",
        data:qs.stringify(params)
    })
}

//管理员总数
export const reqManageCount=()=>{
    return axios({
        url:baseurl+"/api/usercount",
    })
}

//列表 params={page:1,size:10}
export const reqManageList=(params)=>{
    return axios({
        url:baseurl+"/api/userlist",
        method:"get",
        params:params
    })
}
//删除
export const reqManageDel=(uid)=>{
    return axios({
        url:baseurl+"/api/userdelete",
        method:"post",
        data:qs.stringify({uid:uid})
    })
}

//1条
export const reqManageDetail=(uid)=>{
    return axios({
        url:baseurl+"/api/userinfo",
        method:"get",
        params:{
            uid:uid
        }
    })
}

//修改
export const reqManageUpdate=(params)=>{
    return axios({
        url:baseurl+"/api/useredit",
        method:"post",
        data:qs.stringify(params)
    })
}


//   <===========商品分类接口请求===========>


//商品分类列表
export const reqCatelist=(obj)=>{
    return axios({
        url:baseurl+"/api/catelist",
        params:
            obj,
        
    })
}

//商品添加
export const reqCateadd=(obj)=>{

    let data = new FormData()

    for(let i in obj){
        data.append(i,obj[i]);
    }
    return axios({
        url:baseurl+'/api/cateadd',
        method:'post',
        data:data,
    })
}
//获取一条商品信息
export const reqGetonecate=(id)=>{
    return axios({
        url:baseurl+"/api/cateinfo",
        params:{id}
    })
}
//商品修改
export const reqUpdatecate=(obj)=>{
    let data = new FormData()

    for(let i in obj){
        data.append(i,obj[i]);
    }
    return axios({
        url:baseurl+"/api/cateedit",
        method:'post',
        data,
    })
}

//商品删除

export const reqDelcate=(id)=>{
    return axios({
        url:baseurl+"/api/catedelete",
        method:'post',
        data:qs.stringify({id,})
    })
}



//==============商品分类管理==========
/*********管理员管理***************/
//添加
export const reqSpecsAdd=(params)=>{
    return axios({
        url:baseurl+"/api/specsadd",
        method:"post",
        data:qs.stringify(params)
    })
}

//管理员总数
export const reqSpecseCount=()=>{
    return axios({
        url:baseurl+"/api/specscount",
    })
}

//列表 params={page:1,size:10}
export const reqSpecsList=(params)=>{
    return axios({
        url:baseurl+"/api/specslist",
        method:"get",
        params:params
    })
}
//删除
export const reqSpecsDel=(id)=>{
    return axios({
        url:baseurl+"/api/specsdelete",
        method:"post",
        data:qs.stringify({id:id})
    })
}

//1条
export const reqSpecsDetail=(id)=>{
    return axios({
        url:baseurl+"/api/specsinfo",
        method:"get",
        params:{
            id:id
        }
    })
}

//修改
export const reqSpecsUpdate=(params)=>{
    return axios({
        url:baseurl+"/api/specsedit",
        method:"post",
        data:qs.stringify(params)
    })
}

//<==============商品管理=================>
//商品添加
export const reqGoodsadd=(obj)=>{

    let data=new FormData();
    for(let i in obj){
        data.append(i,obj[i]);
    }
    return axios({
        url:baseurl+'/api/goodsadd',
        method:'post',
        data:data,
    })
}

//商品总数
export const reqGoodscount=()=>{
    return axios({
        url:baseurl+'/api/goodscount',
    })
}
//商品列表
export const reqGoodslist=(obj)=>{
    return axios({
        url:baseurl+'/api/goodslist',
        params:obj
    })
}
//一条
export const reqGoodsinfo=(id)=>{
    return axios({
        url:baseurl+'/api/goodsinfo',
        params:{
            id,
        }
    })
}
//商品修改
export const reqGoodsedit=(obj)=>{
    let data=new FormData();
    for(let i in obj){
        data.append(i,obj[i]);
    }
    return axios({
        url:baseurl+'/api/goodsedit',
        method:'post',
        data:data,
    })

}
//商品删除
export const reqGoodsdel=(id)=>{
    return axios({
        url:baseurl+"/api/goodsdelete",
        method:"post",
        data:{
            id,
        }
    })
}