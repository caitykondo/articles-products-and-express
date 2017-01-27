const express = require('express');
const db = require('./../db.js');
let router = express.Router();

router.route('/')
  .get((req, res)=> {
    db.any('SELECT * FROM articles')
    .then(articles => {
      console.log(articles);
      res.render('./articles/index', {articles});
    })
    .catch(err =>{
      res.render('./articles/error');
    });
  })
  .post((req, res) => {
    let articleObj = req.body;
    articleObj.url_title = encodeURIComponent(articleObj.title);
    console.log(articleObj.url_title);
    let query = `INSERT INTO articles( title, body, author, url_title) VALUES ('${articleObj.title}', '${articleObj.body}', '${articleObj.author}', '${articleObj.url_title}');`;
    console.log(query);
    if(articleObj.title && articleObj.body && articleObj.author && articleObj.url_title){
      db.none(query)
      .then(result => {
        res.redirect('/articles');
      })
      .catch(err => {
        res.send('One of your values is invalid!');
      });
    }else{
      res.redirect('/articles/new');
    }

    // let articleObj = req.body;

    // if(articleObj.title && articleObj.body && articleObj.author){
    //   articlesDB.addNewArticle(articleObj);
    //   res.redirect(303, '/articles');
    // }else{
    //   res.redirect(303, '/articles/new');
    // }
  });

router.put('/:title', (req, res) => {
  articlesDB.editArticle(req);
  res.redirect(303, `/articles/${req.urlTitle}`);  
});

router.delete('/:title', (req, res) => {
  articlesDB.deleteArticle(req);
  res.redirect(303, '/');
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