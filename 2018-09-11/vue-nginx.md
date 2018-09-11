在vue路由模式为history的时候，刷新页面会出现404问题。我们只需要在服务器配置如果URL匹配不到任何静态资源，就跳转到默认的index.html。

```javascript

server {
        listen 8105; // 表示你nginx监听的端口号
        root /home/admin/sites/vue-nginx/dist; // vue打包后的文件夹dist目录
        index index.html; 
        location / {
                 try_files $uri $uri/ /index.html; 
        }
}

```
