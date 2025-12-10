# 🏠 會員留言板系統

<div align="center">

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

**使用 Node.js + Express + MongoDB 打造的全端會員管理與留言板系統**

[功能特色](#-功能特色) • [技術架構](#-技術架構) • [快速開始](#-快速開始) • [路由文件](#-api-路由) • [專案結構](#-專案結構)

</div>

---

## 📖 專案簡介

這是一個功能完整的會員管理系統，整合了使用者註冊、登入驗證、Session 管理以及即時留言板功能。專案採用現代化的全端開發技術棧，展示了從前端到後端、從資料庫到部署的完整開發流程。

### 🎯 開發目標

- 學習並實踐 **RESTful API** 設計原則
- 掌握 **MongoDB** 非關聯式資料庫操作
- 理解 **Session** 認證機制
- 實作完整的 **CRUD** 操作
- 運用 **EJS** 模板引擎進行伺服器端渲染

---

## ✨ 功能特色

### 🔐 會員系統
- ✅ **使用者註冊** - 信箱重複驗證機制
- ✅ **安全登入** - Session 狀態管理
- ✅ **登出功能** - 清除使用者 Session
- ✅ **錯誤處理** - 友善的錯誤訊息提示

### 💬 留言板系統
- ✅ **發表留言** - 登入會員可發表意見
- ✅ **即時顯示** - 按時間倒序排列
- ✅ **會員專屬** - 僅限登入會員使用

### 🔒 安全性
- ✅ **環境變數管理** - 敏感資訊與程式碼分離
- ✅ **Session 加密** - 使用 Secret Key 保護
- ✅ **路由保護** - 未登入自動重導向

---

## 🛠 技術架構

### 後端技術
| 技術 | 版本 | 用途 |
|------|------|------|
| **Node.js** | v18+ | JavaScript 執行環境 |
| **Express.js** | v5.1.0 | Web 應用框架 |
| **MongoDB** | v6.16.0 | NoSQL 資料庫 |
| **express-session** | v1.18.1 | Session 管理 |
| **dotenv** | latest | 環境變數管理 |

### 前端技術
| 技術 | 用途 |
|------|------|
| **EJS** | 伺服器端模板引擎 |
| **HTML5** | 網頁結構 |
| **CSS3** | 樣式設計 |

### 資料庫設計

#### 集合（Collection）: `member`
```javascript
{
  _id: ObjectId,
  email: String,      // 會員信箱（唯一）
  password: String,   // 密碼
  name: String,       // 顯示名稱
  time: Number        // 註冊時間戳記
}
```

#### 集合（Collection）: `message`
```javascript
{
  _id: ObjectId,
  name: String,       // 留言者名稱
  content: String,    // 留言內容
  time: Number        // 留言時間戳記
}
```

---

## 🚀 快速開始

### 系統需求

- **Node.js** v18.0.0 或更高版本
- **npm** v9.0.0 或更高版本
- **MongoDB Atlas** 帳號（或本地 MongoDB）

### 安裝步驟

#### 1️⃣ 複製專案

```bash
git clone https://github.com/Tai-Ju/member-message-system.git
cd member-message-system
```

#### 2️⃣ 安裝依賴套件

```bash
npm install
```

安裝的套件包括：
- `express` - Web 框架
- `mongodb` - MongoDB 驅動程式
- `express-session` - Session 管理
- `ejs` - 模板引擎
- `dotenv` - 環境變數管理

#### 3️⃣ 設定環境變數

複製 `.env.example` 為 `.env`：

```bash
# Windows
copy .env.example .env

# macOS / Linux
cp .env.example .env
```

編輯 `.env` 檔案，填入你的設定：

```env
# MongoDB 連線字串（從 MongoDB Atlas 取得）
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/?retryWrites=true&w=majority

# Session 密鑰（建議使用隨機字串）
SESSION_SECRET=your-random-secret-key-here

# 伺服器端口
PORT=3000
```

#### 4️⃣ 啟動伺服器

```bash
node index.js
```

看到以下訊息代表啟動成功：

```
Database Ready
Server Started on http://127.0.0.1:3000
```

#### 5️⃣ 開啟瀏覽器

訪問 `http://localhost:3000` 開始使用！

---

## 📁 專案結構

```
member-message-system/
│
├── 📂 public/                    # 靜態資源目錄
│   └── index.html               # 首頁 HTML
│
├── 📂 views/                     # EJS 模板目錄
│   ├── index.ejs                # 登入/註冊頁面
│   ├── member.ejs               # 會員專區頁面
│   └── error.ejs                # 錯誤訊息頁面
│
├── 📄 index.js                   # 主程式進入點
├── 📄 package.json               # 專案設定檔
├── 📄 package-lock.json          # 套件版本鎖定
│
├── 📄 .env.example               # 環境變數範本
├── 📄 .gitignore                 # Git 忽略清單
└── 📄 README.md                  # 專案說明文件
```

---

## 🔌 API 路由

### 公開路由

| 方法 | 路徑 | 說明 | 參數 |
|------|------|------|------|
| `GET` | `/` | 顯示首頁（登入/註冊） | - |
| `POST` | `/signup` | 註冊新帳戶 | `name`, `email`, `password` |
| `POST` | `/signin` | 會員登入 | `email`, `password` |
| `GET` | `/error` | 顯示錯誤訊息 | `message`（查詢參數） |

### 受保護路由（需要登入）

| 方法 | 路徑 | 說明 | 參數 |
|------|------|------|------|
| `GET` | `/member` | 會員專區（留言列表） | - |
| `POST` | `/message` | 發表留言 | `content` |
| `GET` | `/signout` | 登出 | - |

### 請求範例

#### 註冊新帳戶
```http
POST /signup
Content-Type: application/x-www-form-urlencoded

name=張三&email=test@example.com&password=123456
```

#### 會員登入
```http
POST /signin
Content-Type: application/x-www-form-urlencoded

email=test@example.com&password=123456
```

#### 發表留言
```http
POST /message
Content-Type: application/x-www-form-urlencoded
Cookie: connect.sid=...

content=這是一則留言
```

---

## 🔧 環境變數說明

| 變數名稱 | 必填 | 說明 | 範例值 |
|---------|------|------|--------|
| `MONGODB_URI` | ✅ | MongoDB 連線字串 | `mongodb+srv://user:pass@cluster.mongodb.net/` |
| `SESSION_SECRET` | ✅ | Session 加密金鑰 | `random-secret-key-12345` |
| `PORT` | ❌ | 伺服器監聽端口 | `3000` (預設值) |

### 🔐 如何取得 MongoDB 連線字串

1. 前往 [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. 建立免費的 Cluster
3. 點擊 **"Connect"** → **"Connect your application"**
4. 複製連線字串，替換 `<username>` 和 `<password>`

---

## 🎨 功能展示

### 1. 註冊新帳戶
- 填寫姓名、信箱、密碼
- 系統自動檢查信箱是否重複
- 註冊成功後跳轉至登入頁面

### 2. 會員登入
- 輸入信箱與密碼
- 驗證成功後建立 Session
- 自動導向會員專區

### 3. 會員專區
- 顯示歡迎訊息（含會員名稱）
- 查看所有留言（最新在上）
- 發表新留言

### 4. 留言功能
- 輸入留言內容
- 自動記錄留言時間
- 即時顯示在頁面上

### 5. 登出功能
- 清除 Session 資料
- 返回登入頁面

---

## 🛡️ 安全性考量

### 已實作
- ✅ 環境變數保護敏感資訊（`.env` 不上傳）
- ✅ Session Secret Key 加密
- ✅ 路由保護（未登入無法訪問會員功能）
- ✅ 信箱重複驗證

### 建議改進（未來版本）
- 🔄 密碼加密（bcrypt）
- 🔄 CSRF 保護
- 🔄 XSS 防護
- 🔄 SQL/NoSQL Injection 防護
- 🔄 密碼強度驗證
- 🔄 信箱格式驗證
- 🔄 驗證碼機制

---

## 🐛 問題排解

### 問題 1：無法連接資料庫
**錯誤訊息**：`MongoServerError: bad auth`

**解決方法**：
1. 檢查 `.env` 中的 `MONGODB_URI` 是否正確
2. 確認 MongoDB Atlas 的 IP 白名單設定
3. 檢查帳號密碼是否包含特殊字元（需要進行 URL 編碼）

### 問題 2：伺服器無法啟動
**錯誤訊息**：`Error: Cannot find module 'express'`

**解決方法**：
```bash
npm install
```

### 問題 3：Session 無法保持
**可能原因**：Session Secret 未設定

**解決方法**：
確保 `.env` 中有設定 `SESSION_SECRET`

### 問題 4：連接埠 3000 已被佔用
**錯誤訊息**：`EADDRINUSE: address already in use`

**解決方法**：
```bash
# 方法 1：更改 .env 中的 PORT 為其他數字
PORT=3001

# 方法 2：關閉佔用 3000 連接埠的程式
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# macOS / Linux
lsof -ti:3000 | xargs kill -9
```

---

## 📚 學習資源

### 官方文件
- [Node.js 官方文件](https://nodejs.org/docs/)
- [Express.js 官方文件](https://expressjs.com/)
- [MongoDB Node.js Driver](https://www.mongodb.com/docs/drivers/node/)
- [EJS 模板引擎](https://ejs.co/)

### 推薦教學
- [Node.js 完整指南](https://nodejs.dev/learn)
- [Express.js 教學](https://developer.mozilla.org/zh-TW/docs/Learn/Server-side/Express_Nodejs)
- [MongoDB 大學](https://university.mongodb.com/)

---


</div>
