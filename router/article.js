const express = require('express');
const router = express.Router();;
//导入解析 formdata 格式表单数据包
const multer = require('multer');
//导入处理路径路径的核心模块
const path = require('path');
const router_handle = require('../router_handle/article')

//创建 multer 的实例对象,通过dest属性制定文件的存放路径
const upload = multer({dest:path.join(__dirname, '../uploads')})

//发布新文章
// upload.single() 是一个局部生效的中间件，用来解析 FormData 格式的表单数据
// 将文件类型的数据，解析并挂载到 req.file 属性中
// 将文本类型的数据，解析并挂载到 req.body 属性中
router.post('/add',  upload.single('cover_img'), router_handle.addArticle)

module.exports = router