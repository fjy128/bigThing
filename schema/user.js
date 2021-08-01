const Joi = require('@hapi/joi')
/**
 * *string() 值必须是字符串
 * ?alphanum() 值只能是包含 a-zA-Z0-9 的字符串
 * TODO:min(length) 最小长度
 * TODO:max(length) 最大长度
 * ?required() 值是必填项，不能为 undefined
 * ?pattern(正则表达式) 值必须符合正则表达式的规则
 */
//用户名的验证规则
const userName = Joi.string().alphanum().min(3).max(20).required();

//密码的验证规则
const passWord =  Joi.string().pattern(/^[\S]{6,20}$/).required();

// 定义 id, nickname, emial 的验证规则
const id = Joi.number().integer().min(1).required()
const nickname = Joi.string().required()
const email = Joi.string().email().required()

//注册和登录表单的验证规则对象
exports.reg_login_schema = {
  //表示需要对req.body中的数据进行验证
  body:{
    userName,
    passWord,
  }
}

// 验证规则对象 - 更新用户基本信息
exports.update_userinfo_schema = {
  body: {
    id,
    nickname,
    email,
  },
}