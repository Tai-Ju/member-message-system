// 準備和資料庫的連線
import { MongoClient, ServerApiVersion } from 'mongodb';
const uri = "mongodb+srv://root:root1234@mycluster.nwlqsnz.mongodb.net/?retryWrites=true&w=majority&appName=Mycluster";
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});
let db=null; // 一開始還沒連到資料庫
async function run() {
    await client.connect();
    db=client.db("website")
    console.log("Databass Ready");
}
run().catch(console.dir);

// 準備網站伺服器
import express from "express";
import bodyParser from "body-parser";
import session from "express-session";  

const app=express(); 
app.use(session({
  secret: "jklqweklwerklqwesdf",
  resave: false,
  saveUninitialized: true
}))
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
app.set("view engine", "ejs");

// 顯示會員頁面與留言列表
app.get("/member", async function(req, res) {
    if (!req.session.member) {
        res.redirect("/");
    } else {
        let collection=db.collection("message");
        let result=await collection.find({}).sort({
            time:-1
        });
        let data=[];
        for await (const message of cursor){
            data.push(message);
        }
        res.render("member.ejs", {
            name: req.session.member.name,
            data:data
        });
    }
});

// 註冊新帳戶
app.post("/signup",async function(req,res){
    let name=req.body.name;
    let email=req.body.email;
    let password=req.body.password;
    // 把資料存放到資料庫裡
    let collection=db.collection("member");
    let result=await collection.findOne({
        email:email
    })
    if(result===null){ // 沒有重複
        await collection.insertOne({
            email:email,password:password,name:name,
            time:Date.now()
        });
        res.redirect("/");
    }else{ // 有重複
        res.redirect("/error?message=信箱重複");
    }
});

// 使用者登入
// 使用 POST 方法，處理來自路徑 /signin 的請求，內部包含 password=字串
app.post("/signin", async function(req,res){
    let email=req.body.email;
    let password=req.body.password;
    // 驗證是否正確
    let collection=await db.collection("member");
    let result=await collection.findOne({
        $and:[
            {email:email},
            {password:password}
        ]
    })
    if(result===null){ // 登入失敗
        res.redirect("/error?message=郵件密碼錯誤");
    }else{ // 登入成功
         // 將登入資訊，記錄到使用者的狀態中， req.session.名稱=資料;
        req.session.member={
            email:result.email, name:result.name
        };
        res.redirect("/member");
    }
});

// 顯示錯誤訊息
app.get("/error",function(req,res){
    let message=req.query.message;
    res.render("error.ejs",{message:message});
})

//使用者登出
app.get("/signout",function(req,res){
    delete req.session.member;
    res.redirect("/");
});

// 發表留言
app.post("/message",async function(req,res){
    if(!req.session.member){
        req.redirect("/");
        return;
    }
    let content=req.body.content;
    let name=req.session.member.name;
    // 放進資料庫
    let collection=db.collection("message");
    await collection.insertOne({
        name:name, content:content, time:Date.now()
    });
    res.redirect("/member");
});

// 啟動伺服器在 http://127.0.0.1:3000/
app.listen(3000,function(){
    console.log("Server Started");
});

