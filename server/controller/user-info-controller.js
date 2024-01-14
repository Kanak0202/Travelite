import User from "../models/User.js";

export const getUser = async(request, response)=>{
    try{
        let userId = request.params.id;
    }catch(error){
        return response.status(500).json({msg: error.message});
    }
}