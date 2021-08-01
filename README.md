## 这是一个基于node+express+mySql实现用户登录注册、个人中心、文章管理接口编写项目

注意: 仅仅是一个个人练习新技术demo,中间固然存在很多问题,也有很多东西没有写完,后续有空会补上

## 项目运行
```
nodemon app.js(需安装nodemon)
```
## 服务器运行
### 安装mySql环境
 1、mySql;
 2、mySqlworkbench

 ### mySql安装地址(mac版)
 https://downloads.mysql.com/archives/community/

### 运行服务器
  直接打开workbench,连接就好

## 项目创建步骤  

```
1、新建项目名称
2、进入项目文件夹
3、初始化项目并执行命令: npm init -y
4、安装express包并执行命令:npm i express@4.17.1
5、在项目中创建app.js并写入下面代码:

// 导入 express 模块
const express = require('express')
// 创建 express 的服务器实例
const app = express()

// write your code here...

// 调用 app.listen 方法，指定端口号并启动web服务器
app.listen(3007, function () {
  console.log('api server running at http://127.0.0.1:3007')
})

6、配置cors跨域问题执行下面代码

安装cors
npm i cors@2.8.5

在 app.js 中导入并配置 cors 中间件：
// 导入 cors 中间件
const cors = require('cors')
// 将 cors 注册为全局中间件
app.use(cors())

7、配置解析表单数据中间件
配置解析 application/x-www-form-urlencoded 格式的表单数据
app.use(express.urlencoded({ extended: false }))

8、初始化路由文件
1)新建 router 文件夹，用来存放所有的路由模块
(路由模块中，只存放客户端的请求与处理函数之间的映射关系)
2)新建 router_handler 文件夹，用来存放所有的 路由处理函数模块
(路由处理函数模块中，专门负责存放每个路由对应的处理函数)

```

二、项目中遇到问题及解决方案
问题1:使用node连接数据库,出现如下报错:
  ER_NOT_SUPPORTED_AUTH_MODE: Client does not support authentication protocol requested by server; consider upgrading MySQL client"
  解决方案:进入mySQL终端界面输入如下代码并执行:
  ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '自己的密码';
  原因:8.0mysql引入了caching_sha2_password模块作为默认身份验证插件，nodejs还没有跟进


个人中心:




三、其他注意事项:
1、数据库mysql密码:13434403
2、全局安装nodemon 就能自动监听nonde项目变动

四、待处理问题:
1、Cannot mix different versions of joi schemas
原因四项目中使用@escook/express-joi跟@hapi/joi


//需要改进的地方
1、用户修改基本信息的时候,不能修改密码,应该在数据库做限制;
2、即使修改用户密码的数据成功,用户登录的密码也是不正确的,所以不做密码修改;
3、创建文章分类:需要改进的地方是通过token查出当前用户创建的数据(已解决)
4、不同用户可以创建相同的文章分类

mySQL数据查询命令https://www.cnblogs.com/168vincent/p/9201089.html