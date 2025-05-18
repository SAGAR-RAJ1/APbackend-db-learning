const express = require('express');
const app = express();
const path = require('path');
const chat = require("./models/chat.js")

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



// let chat1 = new chat({
//     from:"Sagar",
//     to:"NitP",
//     msg:"Machayenge",
//     created_at:new Date()//utc
// });
// chat1.save().then((res)=>{console.log(res);})





app.get('/', function(req, res) {
    res.send("welcome");
});
app.listen(3000);