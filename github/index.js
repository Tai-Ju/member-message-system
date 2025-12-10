// 載入環境變數
import dotenv from 'dotenv';
dotenv.config();

// 準備和資料庫的連線
import { MongoClient, ServerApiVersion } from 'mongodb';

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

let db = null; // 一開始還沒連到資料庫

async function run() {
    try {
        await client.connect();
        db = client.db("website");
        console.log("Database Ready");
    } catch (error) {
        console.error("資料庫連線失敗:", error.message);
        process.exit(1);
    }
}
run().catch(console.dir);

// 準備網站伺服器
import express from "express";
import bodyParser from "body-parser";
import session from "express-session";  

const app = express(); 

app.use(session({
  secret: process.env.SESSION_SECRET || "default-secret-key",
  resave: false,
  saveUninitialized: true
}));

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.set("view engine", "ejs");

// 首頁路由
app.get("/", function(req, res) {
    res.render("index.ejs");
});

// 顯示會員頁面與留言列表
app.get("/member", async function(req, res) {
    if (!req.session.member) {
        res.redirect("/");
    } else {
        try {
            let collection = db.collection("message");
            let result = await collection.find({}).sort({
                time: -1
            });
            let data = [];
            for await (const message of result) {
                data.push(message);
            }
            res.render("member.ejs", {
                name: req.session.member.name,
                data: data
            });
        } catch (error) {
            console.error("取得留言失敗:", error);
            res.redirect("/error?message=無法載入留言");
        }
    }
});

// 註冊新帳戶
app.post("/signup", async function(req, res) {
    let name = req.body.name;
    let email = req.body.email;
    let password = req.body.password;
    
    try {
        // 把資料存放到資料庫裡
        let collection = db.collection("member");
        let result = await collection.findOne({
            email: email
        });
        
        if (result === null) { // 沒有重複
            await collection.insertOne({
                email: email,
                password: password,
                name: name,
                time: Date.now()
            });
            res.redirect("/");
        } else { // 有重複
            res.redirect("/error?message=信箱重複");
        }
    } catch (error) {
        console.error("註冊失敗:", error);
        res.redirect("/error?message=註冊失敗，請稍後再試");
    }
});

// 使用者登入
app.post("/signin", async function(req, res) {
    let email = req.body.email;
    let password = req.body.password;
    
    try {
        // 驗證是否正確
        let collection = db.collection("member");
        let result = await collection.findOne({
            $and: [
                {email: email},
                {password: password}
            ]
        });
        
        if (result === null) { // 登入失敗
            res.redirect("/error?message=郵件或密碼錯誤");
        } else { // 登入成功
            // 將登入資訊記錄到使用者的狀態中
            req.session.member = {
                email: result.email,
                name: result.name
            };
            res.redirect("/member");
        }
    } catch (error) {
        console.error("登入失敗:", error);
        res.redirect("/error?message=登入失敗，請稍後再試");
    }
});

// 顯示錯誤訊息
app.get("/error", function(req, res) {
    let message = req.query.message;
    res.render("error.ejs", {message: message});
});

// 使用者登出
app.get("/signout", function(req, res) {
    delete req.session.member;
    res.redirect("/");
});

// 發表留言
app.post("/message", async function(req, res) {
    if (!req.session.member) {
        res.redirect("/");
        return;
    }
    
    let content = req.body.content;
    let name = req.session.member.name;
    
    try {
        // 放進資料庫
        let collection = db.collection("message");
        await collection.insertOne({
            name: name,
            content: content,
            time: Date.now()
        });
        res.redirect("/member");
    } catch (error) {
        console.error("發表留言失敗:", error);
        res.redirect("/error?message=發表留言失敗");
    }
});

// 啟動伺服器
const PORT = process.env.PORT || 3000;
app.listen(PORT, function() {
    console.log(`Server Started on http://127.0.0.1:${PORT}`);
});
