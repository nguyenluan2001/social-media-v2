const likeResolver={
   Like:{
       user:async (parent,args,{userHelper})=>{
        return await userHelper.getUser(parent.id)
       }
   }
}
module.exports=likeResolver