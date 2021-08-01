const db = require('../db/index');

//获取文章分类列表数据处理函数
exports.getArticleCates = (req, res) => {
  // res.send('ok')
  //导入数据库操作模块
  const db = require('../db/index');
  //根据分类的状态,获取所有违背删除的分类列表数据,is_delete为0表示没有被删除的数据
  const sql = `select * from ev_article_cate where is_delete=0 and userId=${req.user[0].id} order by id asc`;
  console.log(req.user)
  db.query(sql, (err, results) => {
    if(err) return res.cc(err);
    res.send({
      status:0,
      length:results.length,
      data:results
    })
  })
}

//通过不同用户账户创建数据(无用)
exports.createArticleCates = (req, res) => {
  const {name, alias} = req.body;
  //查询分类名称与别名是否被占用
  const _sql = `select * from ev_article_cate where name=? or alias=?`;
  db.query(_sql, [name,alias], (err, results) => {
    if(err) return res.cc(err);
    // 分类名称 和 分类别名 都被占用
    let len = results.length;
    let {name:_name,alias:_alias} = results[0];
    console.log(results)
  if (len === 2) return res.cc('分类名称与别名被占用，请更换后重试!')
  if (len === 1 && _name === name && _alias === alias) return res.cc('分类名称与别名被占用，请更换后重试！')
  // // 分类名称 或 分类别名 被占用
  // if (results.length === 1 && results[0].name === req.body.name) return res.cc('分类名称被占用，请更换后重试！')
  // if (results.length === 1 && results[0].alias === req.body.alias) return res.cc('分类别名被占用，请更换后重试！')
  })
  // console.log(name,alias,33)
  const sql = `insert into ev_article_cate set ?`
  const bodyData = {
        name,
        alias,
        userId:req.user[0].id,
        is_delete:0     
      }
      db.query(sql, bodyData, (err, results) => {
        if(err) return res.cc(err);
        if (results.affectedRows !== 1) return res.cc('新增文章分类失败！')
        res.cc('新增文章分类成功!',0)
      })
}

//新增文章分类的处理函数
exports.addArticleCates = (req, res) => {
// TODO:定义查询 分类名称 与 分类别名 是否被占用的 SQL 语句
const sql = `select * from ev_article_cate where name=? or alias=?`
// 执行查重操作
db.query(sql, [req.body.name, req.body.alias], (err, results) => {
  // 执行 SQL 语句失败
  if (err) return res.cc(err)
  // 分类名称 和 分类别名 都被占用
  if (results.length === 2) return res.cc('分类名称与别名被占用，请更换后重试！')
  if (results.length === 1 && results[0].name === req.body.name && results[0].alias === req.body.alias) return res.cc('分类名称与别名被占用，请更换后重试！')
  // 分类名称 或 分类别名 被占用
  // if (results.length === 1 && results[0].name === req.body.name) return res.cc('分类名称被占用，请更换后重试！')
  // if (results.length === 1 && results[0].alias === req.body.alias) return res.cc('分类别名被占用，请更换后重试！')

  // TODO：新增文章分类
  const sql = `insert into ev_article_cate set ?`;
    req.body.userId=req.user[0].id,
    req.body.is_delete=0
  db.query(sql, req.body, (err, results) => {
  // SQL 语句执行失败
  if (err) return res.cc(err)
  // SQL 语句执行成功，但是影响行数不等于 1
  if (results.affectedRows !== 1) return res.cc('新增文章分类失败！')
  // 新增文章分类成功
  res.cc('新增文章分类成功！', 0)
})
})
}

//根据ID删除文章
//TODO:当前没有根据用户删除自己创建的数据,应根据用户ID进行删除
exports.deleteCateById = (req, res) => {
  const sql = `update ev_article_cate set is_delete=1 where id=?`;
  db.query(sql, req.params.id, (err, results) => {
    console.log(results.affectedRows,req.params.id)
    if(err) return res.cc(err);
    if(results.affectedRows !== 1) return res.cc('删除文章分类失败!');
    res.cc('删除文章分类成功!', 0)
  }) 
}

  // 实现获取文章分类单个数据(根据文章ID获取文章分类)
  //TODO:存在问题,is_delete值为1是是不能查询出来的,只能查出为0的数据
exports.getArticleCateById = (req, res) => {
  const sql = `select * from ev_article_cate where id=?`;
  db.query(sql, req.params.id, (err, results) => {
    if(err) return res.cc(err);
    if(results.length !== 1) return res.cc('获取文章分类数据失败!');
    res.send({
      status:0,
      data:results[0],
    })
  })
}

//根据 Id 更新文章分类数据
exports.updateCateById = (req, res) => {
  // 定义查询 分类名称 与 分类别名 是否被占用的 SQL 语句
  const sql = `select * from ev_article_cate where name=? or alias=?`
  let {id, name, alias} = req.body;
  db.query(sql, [name, alias], (err, results) => {
    console.log(results)
    console.log(id,name,alias,req.body)
    if(err) return res.cc(err);
    // 分类名称 或 分类别名 被占用
  if (results.length === 1 && results[0].name === req.body.name) return res.cc('数据已更新,无需再更新!')
  if (results.length === 1 && results[0].alias === req.body.alias) return res.cc('数据已更新,无需再更新！')

  // TODO：更新文章分类
  const sql = `update ev_article_cate set ? where id=?`;
  db.query(sql, [req.body, req.body.id], (err, results) => {
    if(err) return res.cc(err);
    if(results.affectedRows !== 1) return res.cc('更新文章分类失败!');
    res.cc('更新文章分类成功!',0)
  })
  })
}

