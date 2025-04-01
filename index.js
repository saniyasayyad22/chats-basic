const express=require("express");
const app=express();
const mongoose=require("mongoose");
const Chat =require("./models/chat.js");
const path=require("path");
const port=8080;
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"/views"));
app.use(express.static(path.join(__dirname,"/public")));
var methodOverride = require('method-override');
app.use(methodOverride('_method'));
main()
 .then(()=>{
    console.log("connected successfully");
 }).catch((err)=>{
    console.log(err)
 });
async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/whatsapp");
}

app.use(express.urlencoded({extended:true}));
app.get("/chats",async(req,res)=>{
    const chats= await Chat.find();
    res.render("index.ejs",{chats});
});
app.get("/chats/new",(req,res)=>{
    res.render("new.ejs");
});
app.post("/chats",(req,res)=>{
    let {from,msg,to}=req.body;
   
    
    const chat=new Chat({
        from:from,
        msg:msg,
        to:to,
       
    });
    chat.save();
    res.redirect("/chats");
});
app.get("/chats/:id/edit",async(req,res)=>{
    let{id}=req.params;
    const chat=await Chat.findById(id);
    console.log(chat);
    res.render("edit.ejs",{chat});
});
app.patch("/chats/:id",async(req,res)=>{
    let{id}=req.params;
    let{msg}=req.body;
    const chat=await Chat.findByIdAndUpdate(id,{msg:msg});
    res.redirect("/chats");
})
app.delete("/chats/:id/delete",async(req,res)=>{
    let{id}=req.params;
    const chat=await Chat.findByIdAndDelete(id);
    res.redirect("/chats");
})
app.listen(port,()=>{
    console.log("listen request");
});