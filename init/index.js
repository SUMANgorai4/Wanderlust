const mongoose=require("mongoose");
const initData=require("./data.js");
const Listing = require("../models/listing.js");

const MONGO_URL="mongodb://127.0.0.1:27017/wanderlust";


main()
 .then(res =>{
    console.log("connected to db");
 }).catch(err=>{
    console.log(err);
 });


async function main() {
    await mongoose.connect(MONGO_URL); 
}


// creating the functions
const initDB = async ()=>{
   await Listing.deleteMany({}); // first clean the DB
   initData.data=initData.data.map((Obj)=>({...Obj,owner:"69c6d8c3e33cf1650d1ee584"}));
   await Listing.insertMany(initData.data);
     console.log("data was initialized");

}

initDB(); // call the function