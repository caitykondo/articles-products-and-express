const express = require('express');
const db = require('./../db.js');
let router = express.Router();

router.route('/')
  .get((req, res)=> {
    db.any('SELECT * FROM articles')
    .then(articles => {
      res.render('./articles/index', {articles});
    })
    .catch(err =>{
      res.send('./articles/error');
    });
  })
  .post((req, res) => {
    let articleObj = req.body;
    articleObj.url_title = encodeURIComponent(articleObj.title);
    let query = `INSERT INTO articles (title, body, author, url_title) VALUES ('${articleObj.title}', '${articleObj.body}', '${articleObj.author}', '${articleObj.url_title}');`;
    if(articleObj.title && articleObj.body && articleObj.author){
      db.none(query)
      .then(result => {
        res.redirect(303, '/articles');
      })
      .catch(err => {
        res.send('/articles/new');
      });
    }else{
      res.redirect('/articles/new');
    }
  });

router.route('/new')
.get((req, res) => {
  res.render('./articles/new');
});


function updateArticleQuery (article, url){
  let query = '';
  if (article.title){
    query += `title = '${article.title}'`;
  }
  if (article.body){
    query += `, body = '${article.body}'`;
  }
  if (article.author){
    query += `, author = '${article.author}'`;
  }
  return `UPDATE articles SET ${query} WHERE url_title LIKE '${url}' RETURNING *;`;
}



router.route('/:title')
  .get((req, res) => {
    let query = `SELECT * FROM articles WHERE url_title LIKE '${encodeURIComponent(req.params.title)}';`
    console.log(query);
    db.one(query)
    .then(article => {
      res.render('./articles/article', article);
    })
    .catch(err =>{
      res.redirect('/articles/new');
    })
  })
  .put((req, res) => {
    let query = updateArticleQuery(req.body, encodeURIComponent(req.params.title));

    console.log(query);
    db.one(query)
    .then(article => {
      res.render('./articles/article', article);
    })
    .catch(err => {
      console.log(err);
      res.send(`/articles/${req.params.title}/edit`);  
    })
  })
  .delete((req, res) => {
    articlesDB.deleteArticle(req);
    res.redirect(303, '/');
  });



router.get('/:title/edit', (req, res) => {
  // let articleRequested = articlesDB.findArticleByTitle(req.params.title);
  // if(articleRequested){
  //   let i = articlesDB.articleList.indexOf(articleRequested);
  //   res.render('./articles/edit', articlesDB.data.articles[i]);
  // }else{
  //   res.redirect(303, '/articles/error');
  // }
});

module.exports = router;