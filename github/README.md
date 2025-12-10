# Member Message System

使用 Node.js + Express + MongoDB 建立的會員系統與留言板

## 功能特色

- ✅ 會員註冊與登入
- ✅ Session 管理
- ✅ 留言發表功能
- ✅ MongoDB 資料儲存
- ✅ 環境變數保護敏感資訊

## 技術棧

- **後端框架**: Express.js
- **資料庫**: MongoDB Atlas
- **模板引擎**: EJS
- **Session 管理**: express-session
- **環境變數**: dotenv

## 專案結構

```
member-message-system/
├── views/              # EJS 模板檔案
│   ├── index.ejs      # 登入/註冊頁面
│   ├── member.ejs     # 會員頁面
│   └── error.ejs      # 錯誤頁面
├── public/            # 靜態資源（CSS、JS、圖片）
├── index.js           # 主程式
├── package.json       # 專案設定
├── .env.example       # 環境變數範本
├── .gitignore         # Git 忽略檔案清單
└── README.md          # 專案說明
```

## 安裝步驟

### 1. Clone 專案

```bash
git clone https://github.com/你的帳號/member-message-system.git
cd member-message-system
```

### 2. 安裝依賴套件

```bash
npm install
```

### 3. 設定環境變數

複製 `.env.example` 為 `.env`：

```bash
cp .env.example .env
```

編輯 `.env` 檔案，填入你的設定：

```env
MONGODB_URI=你的MongoDB連線字串
SESSION_SECRET=你的隨機密鑰
PORT=3000
```

### 4. 啟動伺服器

```bash
node index.js
```

### 5. 開啟瀏覽器

訪問 `http://localhost:3000`

## 環境變數說明

| 變數名稱 | 說明 | 範例 |
|---------|------|------|
| `MONGODB_URI` | MongoDB 連線字串 | `mongodb+srv://user:pass@cluster.mongodb.net/` |
| `SESSION_SECRET` | Session 加密密鑰 | 任意隨機字串 |
| `PORT` | 伺服器端口 | `3000` |

## 資料庫結構

### website.member（會員集合）

```javascript
{
  email: String,     // 會員信箱
  password: String,  // 密碼（建議加密）
  name: String,      // 會員名稱
  time: Number       // 註冊時間戳
}
```

### website.message（留言集合）

```javascript
{
  name: String,      // 留言者名稱
  content: String,   // 留言內容
  time: Number       // 留言時間戳
}
```

## API 路由

| 方法 | 路徑 | 說明 |
|-----|------|------|
| GET | `/` | 首頁（登入/註冊） |
| GET | `/member` | 會員頁面 |
| POST | `/signup` | 註冊新帳戶 |
| POST | `/signin` | 會員登入 |
| GET | `/signout` | 會員登出 |
| POST | `/message` | 發表留言 |
| GET | `/error` | 錯誤訊息頁面 |

## 安全性注意事項

⚠️ **重要提醒**：

1. **不要**將 `.env` 檔案上傳到 GitHub
2. **不要**在程式碼中硬編碼密碼或 API 金鑰
3. 建議使用 bcrypt 對密碼進行加密（目前版本未實作）
4. 定期更換 `SESSION_SECRET`

## 待改進項目

- [ ] 密碼加密（bcrypt）
- [ ] 表單驗證
- [ ] 錯誤處理優化
- [ ] 前端樣式美化
- [ ] 留言編輯/刪除功能
- [ ] 分頁功能

## 學習資源

- [Express.js 官方文件](https://expressjs.com/)
- [MongoDB Node.js Driver](https://www.mongodb.com/docs/drivers/node/)
- [EJS 模板引擎](https://ejs.co/)

## 授權

MIT License

## 作者

RURU - 台大資工系統訓練班專案
```

---

## 貢獻

歡迎提交 Issue 或 Pull Request！
