const express = require('express');
//创建路由
const router = express.Router();

//导入文章分类的路由处理函数模块
const artcate_handler = require('../router_handle/artcate');

//获取文章分类的列表数据
router.get('/getArticleCates', artcate_handler.getArticleCates);
//通过某个用户创建文章分类
router.post('/createArticleCates', artcate_handler.createArticleCates);
//新增文章分类
router.post('/addArticleCates', artcate_handler.addArticleCates);
//根据ID删除文章分类
router.get('/deletecate/:id', artcate_handler.deleteCateById);
// 实现获取文章分类的功能(根据文章ID获取文章分类)
router.get('/getArticleCateById/:id',artcate_handler.getArticleCateById);
// 根据 Id 更新文章分类数据 
router.post('/updateCateById',artcate_handler.updateCateById);

module.exports = router;