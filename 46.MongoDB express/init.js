const mongoose = require('mongoose');
const chat = require("./models/chat.js")
//here we are adding data in case if we empty our databse so from here we can add some data
//so that we can use this to put some data in the DB because its good to have some initial data while working

main()
  .then(() => {
    console.log("connection Successful");
  })
  .catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
}

let Allchats = [
    {
        from:"SagarRaj",
        to:"NitP",
        msg:"Machayenge bht baar",
        created_at:new Date()//utc
    },
    {
        from:"Anjali",
        to:"NitP",
        msg:"Billi love h hamara",
        created_at:new Date()//utc
    },
    {
        from:"Jyoti",
        to:"NitP",
        msg:" Mai psnd krti ayush  ko usko dungi choco",
        created_at:new Date()//utc
    },
    {
        from:"Aparna",
        to:"NitP",
        msg:"Apun ich asi mard h haa haa haaa",
        created_at:new Date()//utc
    },
]

chat.insertMany(Allchats).then(()=>{console.log("data send");});