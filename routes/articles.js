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

router.get('/:title', (req, res) => {

});

module.exports = router;