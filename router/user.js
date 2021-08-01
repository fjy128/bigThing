const express = require('express');

//创建路由对象
const router = express.Router();

//导入用户路由处理函数模块
const userhandler = require('../router_handle/user');

//1、导入验证表单数据中间件
const expressJoi = require('@escook/express-joi');

//2、导入需要的表单验证规则对象
const {reg_login_schema} = require('../schema/user')

//注册新用户
// 3. 在注册新用户的路由中，声明局部中间件，对当前请求中携带的数据进行验证
// 3.1 数据验证通过后，会把这次请求流转给后面的路由处理函数
// 3.2 数据验证失败后，终止后续代码的执行，并抛出一个全局的 Error 错误，进入全局错误级别中间件中进行处理

// router.post('/reguser', expressJoi(reg_login_schema), userhandler.regUser)
router.post('/reguser',  userhandler.regUser)

//登陆
// router.post('/login', expressJoi(reg_login_schema), userhandler.login)
router.post('/login', userhandler.login)

// 获取全部用户信息
router.get('/getAlluserInfo', userhandler.getAlluserInfo)

//将路由对象共享出去
module.exports = router