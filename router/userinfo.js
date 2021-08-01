const express = require('express');
//创建路由对象
const router = express.Router();


// 导入验证数据合法性的中间件
const expressJoi = require('@escook/express-joi');
// 导入需要的验证规则对象
const { update_userinfo_schema } = require('../schema/user')


//导入用户信息的处理函数模块
const userinfo_handle = require('../router_handle/userinfo')


//获取用户基本信息
router.get('/userinfo', userinfo_handle.getuserinfo);
//更新用户基本信息
router.post('/updateUserInfo', userinfo_handle.updateUserInfo);
// 更新用户的基本信息
// router.post('/userinfo', expressJoi(update_userinfo_schema), userinfo_handle.updateUserInfo)
//重置用户密码
router.post('/updatapwd', userinfo_handle.updatePassword);

//删除用户信息
router.post('/delUserInfo', userinfo_handle.delUserinfo)


  //向外共享路由对象
  module.exports = router;