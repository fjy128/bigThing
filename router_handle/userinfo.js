//导入数据库模块
const db = require('../db/index.js');
// 即可使用 bcrypt.compareSync(提交的密码，数据库中的密码) 方法验证密码是否正确
// compareSync() 函数的返回值为布尔值，true 表示密码正确，false 表示密码错误
const bcrypt = require('bcryptjs')


//获取某个用户基本信息(通过token得到)
exports.getuserinfo = (req, res) => {
  //根据用户的ID,查询用户的基本信息,注意:问了防止用户的密码泄漏,需要排除passWord
  // const sql = `select id, userName, nickName, email, user_pic from ev_users where id=?`;
  const sqlStr = `select id, userName, nickName, email, age, sex, phone, birthday from ev_users where id=?`
  db.query(sqlStr, req.user[0].id, (err, results) =>{
    if(err) return res.cc(err);
    if(results.length !== 1) return res.cc('获取用户信息失败!');
    res.send({
      status:0,
      message:'获取用户基本信息成功!',
      data:results[0],
    })
  })
}


//更新用户基本信息(通过token),用户的id是必传的且不能更改,其他信息都可以随意更改
exports.updateUserInfo = (req, res) => {
const sqlStr = `update ev_users set userName=?, nickName=?, email=?, age=?, sex=?, phone=?, birthday=? where id=?`;
 db.query(sqlStr, [req.body, req.body.id], (err, results) => {
   if(err) return res.cc(err);
   if(results.affectedRows !==1) return res.cc('修改用户基本信息失败');
   return res.cc('修改用户基本信息成功!', 0)
 })
}


//重制用户密码 需要参数oldPwd,newPwd
exports.updatePassword = (req, res) => {
  const sqlStr = `select * from ev_users where id=?`;
  db.query(sqlStr, req.user[0].id, (err,results) => {
    if(err) return res.cc(err);
    if(results.length !== 1) return res.cc('用户不存在');
    const compareResult = bcrypt.compareSync(req.body.oldPwd, results[0].passWord)
    if(!compareResult) return res.cc('愿密码错误');
    const sql = `update ev_users set passWord=? where id=?`;
    //对新密码进行加密处理
    const newPwd = bcrypt.hashSync(req.body.newPwd, 10);
    //根据id更新用户的密码
    db.query(sql, [newPwd, req.user[0].id], (err, results) => {
      if(err) return res.cc(err);
      if(results.affectedRows !==1 ) return res.cc('更新密码失败!');
      //更新密码成功
      res.cc('更新密码成功!', 0)
    })
  })
}

//删除用户名 参数id
exports.delUserinfo = (req, res) => {
  const delSql = 'delete from ev_users where id=?'
  db.query(delSql, req.body.id, (err, results) => {
    // if(err) return res.cc(err);
    if(err) return res.json(results);
    return res.cc('删除成功!',0)
    
  })
}