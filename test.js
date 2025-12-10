
import { MongoClient, ServerApiVersion } from 'mongodb';
const uri = "mongodb+srv://root:root1234@mycluster.nwlqsnz.mongodb.net/?retryWrites=true&w=majority&appName=Mycluster";
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // 連線到資料庫
    await client.connect();
    // 開始操作資料
    // 決定要操作的資料庫名稱 Database
    const db=client.db("website")
    // 決定要操作的集合名稱 Collection
    const collection=db.collection("user");
    // 學習 CRUD (Create, Read, Update, Delete)
    // 新增一筆資料
    /*
    let result=await collection.insertOne({
        email:"ply@ply.com",password:"ply", name:"ply", level:3
    });
    console.log(result);
    */
    // 新增多筆資料
    /*
    let result=await collection.insertMany([
        {email:"aaa@ply.com",password:"ply", name:"ply", level:3},
        {email:"bbb@ply.com",password:"ply", name:"ply", level:4},
        {email:"ccc@ply.com",password:"ply", name:"ply", level:5},
        {email:"ddd@ply.com",password:"ply", name:"ply", level:6},
        {email:"eee@ply.com",password:"ply", name:"ply", level:7}
    ]);
    console.log(result);
    */
   // 更新一筆資料
   /*
    let result=await collection.updateOne({
        email:"aaa@ply.com"
    },{
        $set:{
            name:"丁滿"
        }
    });
    console.log(result);
    */
   // 更新多筆資料
   /*
   let result=await collection.updateMany({
        name:"ply"
   },{
    $set:{
        name:"abc"
        }
    });
    console.log(result);
    */
   // 刪除一筆資料
   /*let result=await collection.deleteOne({
    level:7
   });
   console.log(result);
   */
  // 刪除多筆資料 collection.deleteMany(篩選條件)
  // 篩除集合中的所有資料 collection.deleteMany({});
  // 取得一筆資料
  /*let result=await collection.findOne({
    email:"ply@ply.com"
  });
  console.log(result);
  */
 // 邏輯運算 $and $or
 /*let result=await collection.findOne({
    $and:[
        {email:"ply@ply.com"},
        {password:"ply"}
    ]
  });
  console.log(result);
  */
 // 取得多筆資料
 /*
 let cursor=await collection.find({});
 for await (const doc of cursor){
    console.log(doc);
 }
    */
// 使用比較運算 $eq, $gt, $gte, $lt, $lte
/*
let cursor=await collection.find({
    level:{
        $gt:3
    }
});
for await (const doc of cursor){
    console.log(doc);
 }
 */
// 排序
let cursor=await collection.find({
    level:{
        $gt:3
    }
}).sort({
    level:1
});
for await (const doc of cursor){
    console.log(doc);
 }
  } finally {
    await client.close();
  }
}
run().catch(console.dir);
