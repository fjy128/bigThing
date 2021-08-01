//导入 express 模块
const express = require('express');
//创建 express 的服务器实例
const app = express();
//导入表单验证
const joi = require('@hapi/joi');
//导入配置文件
const config = require('./config');
//导入解析token中间件
const expressJWT = require('express-jwt')

/** 
 * TODO:导入 cors 中间件并注册全局中间件,处理跨域问题
 **/
const cors = require('cors');
app.use(cors());


/** 
 * ?配置解析 application/x-www-form-urlencoded 
 * ?格式的表单数据的中间件
 **/
app.use(express.urlencoded({ extended: false }))

// 托管静态资源文件
app.use('/uploads', express.static('./uploads'))

/**
 * !多次调用res.send()向客户端响应处理失败结果,为res挂载一个全局中间件
 **/
app.use((req,res,next) =>{
  //ststus:0=>成功,1=>失败;默认设置为1
  res.cc = (err, status=1)=>{
    res.send({
      status,
      //状态描述,判断err是错误对象还是字符串
      message:err instanceof Error ? err.message : err,
    })
  }
  next()
})

// 使用 .unless({ path: [/^\/api\//] }) 指定哪些接口不需要进行 Token 的身份认证
app.use(expressJWT({
  secret:config.jwtSecretKey
}).unless({
  path:[/^\/api\//]
}))


/** 
 * @导入并注册路由
 **/
//导入用户登录注册模块
const userRouter = require('./router/user');
app.use('/api', userRouter);
//导入使用用户信息路由模块
const userinfoRouter = require('./router/userinfo');
// 注意：以 /my 开头的接口，都是有权限的接口，需要进行 Token 身份认证,除了‘/api’
app.use('/user', userinfoRouter);
//导入并使用文章分类路由模块
const artCateRouter = require('./router/artcate');
app.use('/cate', artCateRouter)
//导入并使用文章路由模块
const articleRouter = require('./router/article');
app.use('/article', articleRouter)

/**
 * !错误中间件
 * https://www.npmjs.com/package/@escook/express-joi
 **/

app.use((err, req, res, next) => {
  //数据验证失败
  if(err instanceof joi.ValidationError) return res.cc(err);
  //捕获身份认证失败的错误
  if(err.name === 'UnauthorizedError') return res.cc('身份认证失败,请重新登录!')
  //未知错误
  res.cc(err)
})


/** 
 * *调用 app.listen 方法,指定端口号并启动web服务器
 **/
app.listen('3000',() =>{
  console.log('api server running at http://127.0.0.1:3000')
})
