const mongoose=require("mongoose");
const Chat =require("./models/chat.js");
main()
 .then(()=>{
    console.log("connected successfully");
 }).catch((err)=>{
    console.log(err)
 });
async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/whatsapp");
}
let chats=[
    {
        from:"saniya",
        msg:"Hello!How are you",
        to:"khushi",
        
    },
    {
        from:"shreya",
        msg:"Hello!can you send me notes",
        to:"shraddha",
        
    },
    {
        from:"mahir",
        msg:"Hey!Do you want to drink cofee with me",
        to:"saniya",
       
    },
    {
        from:"amayra",
        msg:"Hello!when was our practical?",
        to:"khushi",
        
    },
    
]
Chat.insertMany(chats);
