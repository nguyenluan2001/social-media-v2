const userResolver={
    Query:{
        getUser:async (parents,{id})=>{
            return  {
                username:"luan",
                email:"abc@gmail.com",
                gender:"male"
            }
        },
        checkAuth:async (_,args,{userHelper,req})=>{
            return userHelper.checkAuth(req)
        }
    },
    Mutation:{
        register:async (parent,args,{userHelper})=>{
            return userHelper.register(args)
           
        },
        login:async (_,args,{userHelper})=>{
            return userHelper.login(args)
        }
    }
}
module.exports=userResolver