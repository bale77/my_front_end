/*
request ： 收到的请求信息；

response ： 收到请求后做出的响应。

所以这段代码所执行的操作就是：

当收到请求时，

1、使用 response.writeHead() 函数发送一个HTTP状态200 和 HTTP头的内容类型（content-type）

2、使用 response.write() 函数在HTTP相应主体中发送文本“Hello World”。

3、调用 response.end() 完成响应。
*/
var http = require("http");   
  
function onRequest(request, response) {   
  
 response.writeHead(200, {"Content-Type": "text/plain"});   
  
 response.write("Hello World");   
  
 response.end();  
  
}   
  
http.createServer(onRequest).listen(8888);  