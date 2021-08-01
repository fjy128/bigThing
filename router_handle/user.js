/**
* TODO:这里定义和用户相关的路由处理函数,供 /router/user.js 模块进行处理
**/

//导入数据库
const db = require('../db/index');
//导入用户密码加密模块
const bcrypt = require('bcryptjs');
//导入生成Token字符串包
const jwt = require('jsonwebtoken');
//导入配置文件
const config = require('../config')

 
//注册用户处理函数
exports.regUser = (req, res) =>{

  //获取客户端提交过来的用户信息
  const userinfo = req.body;
  let {userName,passWord} = userinfo;
  let readPwd = passWord

  // 检测表单数据是否合法--不为空
  if(!userName || !passWord) return res.cc('用户名或密码不能为空')

  // 检测用户名是否被占用
  const sqlStr = 'select * from ev_users where userName=?';
  db.query(sqlStr, [userName], (err,results) => {
    // 执行sql语句失败
    if(err) return res.cc(err.message)
    // 用户名被占用
    if(results.length > 0) return res.cc('用户名被占用,请更换其他用户名')
  })

    //加密,10表示加密的长度;
    userinfo.passWord = bcrypt.hashSync(passWord, 10);

    //定义插入新用户sql语句
  const sql = `insert into ev_users set ?`;
  const bodyData = {
        userName:userinfo.userName,
        passWord:userinfo.passWord,
        nickName:userinfo.nickName,
        email:userinfo.email,
        age:userinfo.age,
        sex:userinfo.sex,
        phone:userinfo.phone,
        birthday:userinfo.birthday,
        readPwd:readPwd,      
      }
  //调用db.query()SQL语句
    db.query(sql, bodyData,(err,results) =>{
        //执行sql语句错误
        if(err) return res.cc(err.message)
        if(results.affectedRows !== 1) return res.cc('注册失败,请稍后再试')
        //注册成功
        res.cc('注册成功!',0)
      }
    )
  }

//登录
exports.login = (req, res) =>{
  const userinfo = req.body;
  const sql = `select * from ev_users where userName=?`;
  db.query(sql, userinfo.userName, (err, results) => {
    if(err) return res.cc(err);
    if(results.length !== 1) return res.cc('登录失败,用户不存在!');
    //判断用户输入的密码和数据库存储的密码进行对比
    const compareResult = bcrypt.compareSync(userinfo.passWord, results[0].passWord);
    //如果比对的结果等于false, 证明用户输入的密码错误
    if(!compareResult) return res.cc('登录失败,登录密码不正确!');
    //登录成功生成Token--在生成Token字符串的时候,一定要剔除密码和头像的值
    const user = {...results, passWord:'', user_pic:''};
    //user:需要加密的对象,config.jwtSecretKey:加密时需要用到的密钥
    const tokenStr = jwt.sign(user, config.jwtSecretKey,{
      expiresIn:'4h'//token有效期
    });
    //将生成的Token字符串响应给客户端:
    res.send({
      status:0,
      message:'登录成功!',
      token:`Bearer ${tokenStr}`
    })

  })
 
}

//获取所有用户信息
exports.getAlluserInfo = (req, res) => {
  ``
  const sqlUser = `select id, userName, nickName, email, age, sex, phone, birthday from ev_users`;
  db.query(sqlUser, (err, results) => {
    if(err) return res.cc(err);
    let data = {
      status:200,
      length:results.length,
      data:results
    }
    return res.json(data)
  })

}