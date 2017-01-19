const express = require('express');
const articlesDB = require('../db/articles');
let router = express.Router();

router.post('/', (req, res) => {
  let articleObj = req.body;

  if(articleObj.title && articleObj.body && articleObj.author){
    articlesDB.addNewArticle(articleObj);
    res.redirect(303, '/articles');
  }else{
    res.redirect(303, '/articles/new');
  }
});

router.put('/:title', (req, res) => {
  articlesDB.editArticle(req);
  res.redirect(303, `/articles/${req.urlTitle}`);  
});

router.delete('/:title', (req, res) => {
  articlesDB.deleteArticle(req);
  res.redirect(303, '/');
});

router.get('/', (req, res)=> {
  res.render('./articles/index', articlesDB.data);
});

router.get('/new', (req, res) => {
  res.render('./articles/new', articlesDB.data);
});

router.get('/:title', (req, res) => {
  let articleRequested = articlesDB.findArticleByTitle(req.params.title);
  if(articleRequested){
    let i = articlesDB.articleList.indexOf(articleRequested);
    res.render('./articles/article', articlesDB.data.articles[i]);
  }else{
    res.redirect(303, '/articles/error');
  }
});

router.get('/:title/edit', (req, res) => {
  let articleRequested = articlesDB.findArticleByTitle(req.params.title);
  if(articleRequested){
    let i = articlesDB.articleList.indexOf(articleRequested);
    res.render('./articles/edit', articlesDB.data.articles[i]);
  }else{
    res.redirect(303, '/articles/error');
  }
});

module.exports = router;