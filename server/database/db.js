import mongoose from "mongoose";

const Connection = async(username, password)=>{
    const URL = `mongodb+srv://${username}:${password}@cluster0.fsz85zm.mongodb.net/?retryWrites=true&w=majority`;
    try{
        await mongoose.connect(URL, {useNewUrlParser:true});
        console.log("Connected successfully to DB");
    }catch(error){
        console.log("Error occured while connecting to DB", error);
    }
}

export default Connection;