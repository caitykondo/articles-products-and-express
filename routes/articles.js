const express = require('express');
const articlesDB = require('../db/articles');
let router = express.Router();

router.post('/', (req, res) => {
  let articleObj = req.body;

  if(articleObj.title && articleObj.body && articleObj.author){
    articlesDB.addNewArticle(articleObj);
    res.send(articlesDB.articleList);
    res.redirect(303, '/articles');
  }else{
    res.redirect(303, '/articles/new');
  }
});

router.put('/:title', (req, res) => {
  let requestTitle = req.params.title;

  for(let i = 0; i < articlesDB.articleList.length; i++){
    if (requestTitle === articlesDB.articleList[i].title){
      if(req.body.title){
        articlesDB.articleList[i].title = req.body.title;
      }
      if(req.body.body){
        articlesDB.articleList[i].body = req.body.body;
      }
      if(req.body.author){
        articlesDB.articleList[i].author = req.body.author;
      }
    }
  }
  res.send('yas');  
});

module.exports = router;