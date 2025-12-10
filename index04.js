// server.mjs
import { createServer } from 'node:http';
// 建立一個後端的網路程式
const server = createServer((req, res) => {
//console.log(req)
  let url=req.url;
  if(url==="/"){
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end('<h3>Hello World!</h3><u>test</u>');
  }else if (url==="/abd"){
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.end('<h3>Hello World!</h3><u>ABC</u>');
}else{
    res.writeHead(404, { 'Content-Type': 'text/html' });
    res.end('404 Not Found');
}
});

// 啟動伺服器 http://127.0.0.1:1500/路徑
server.listen(1500, '127.0.0.1', () => {
  console.log('Listening on 127.0.0.1:1500');
});

// run with `node server.mjs`
