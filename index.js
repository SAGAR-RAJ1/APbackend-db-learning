const express = require('express');
const app = express();
const path = require('path');
const chat = require("./models/chat.js")
const methodoverride = require("method-override")

//mongoose setup
const mongoose = require('mongoose');

main()
  .then(() => {
    console.log("connection Successful");
  })
  .catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
}

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.set("views",path.join(__dirname, "views"));
app.use(methodoverride("_method"))


// let chat1 = new chat({
//     from:"Sagar",
//     to:"NitP",
//     msg:"Machayenge",
//     created_at:new Date()//utc
// });
// chat1.save().then((res)=>{console.log(res);})


//? Home Route
app.get('/', (req, res)=> {
   res.send("Server is Working!!!!")
});


//? Index Route

app.get('/chats', async(req, res)=> {
  let chats = await chat.find();
  // console.log(chats);
    res.render("index.ejs",{chats});
});
//? New chat route

app.get('/chats/new', (req, res)=> {
  res.render("new.ejs")
});

//? create route
app.post('/chats', (req, res)=> {
  let {from , to , msg}=req.body;
  let newchat = new chat({
    from:from,
    to:to,
    msg:msg,
    created_at:new Date()
  })
 newchat
 .save()
 .then(()=>{
  console.log("Added to database");
 })
 .catch((err)=>{
  console.log(err);
 });

 res.redirect("/chats")

});
//? Edit chat route

app.get('/chats/:id/edit',  async(req, res)=> {
  let {id} = req.params;
   let editchat = await chat.findById(id);

  res.render("edit.ejs",{editchat});
});
//? update chat route

app.put('/chats/:id',  async(req, res)=> {
  let {id} = req.params;
  let {msg:newmsg} = req.body;
  let updatedChat = await chat.findByIdAndUpdate(
    id,
    {msg:newmsg},
    {runValidators:true,new:true}
  )
  console.log(updatedChat);
  res.redirect("/chats")
});

app.listen(3000);