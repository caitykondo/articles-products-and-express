const express = require('express');
const db = require('./../db.js');
let router = express.Router();

router.route('/')
  .get((req, res)=> {
    db.any('SELECT * FROM articles')
    .then(articles => {
      res.render('./articles/', {articles});
    })
    .catch(err =>{
      res.render('./articles/', {error: true});
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
        res.render('./articles/new', {post_error: true});
      });
    }else{
      res.render('./articles/new', {incomplete_error: true});
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
    query += `, bodyp = '${article.body}'`;
  }
  if (article.author){
    query += `, author = '${article.author}'`;
  }
  return `UPDATE articles SET ${query} WHERE url_title LIKE '${url}' RETURNING *;`;
}

router.route('/:title')
  .get((req, res) => {
    let query = `SELECT * FROM articles WHERE url_title LIKE '${encodeURIComponent(req.params.title)}' LIMIT 1;`

    db.one(query)
    .then(article => {
      res.render('./articles/article', article);
    })
    .catch(err =>{
      res.render('./articles/article', {error: true});
    })
  })
  .put((req, res) => {
    let query = updateArticleQuery(req.body, encodeURIComponent(req.params.title));

    db.one(query)
    .then(article => {
      res.render('./articles/article', article);
    })
    .catch(err => {
      res.render('.articles/article', {error: true});  
    })
  })
  .delete((req, res) => {
    let query = `DELETE FROM articles WHERE url_title LIKE '${encodeURIComponent(req.params.title)}';`;

    db.none(query)
    .then(article => {
      res.redirect(303, '/articles');
    })
    .catch(err => {
      res.render('./articles', {delete_error: true});
    })
  });

router.route('/:title/edit')
  .get((req, res) => {
    let query = `SELECT * FROM articles WHERE url_title LIKE '${encodeURIComponent(req.params.title)}' LIMIT 1;`

    db.one(query)
    .then(article => {
      res.render('./articles/edit', article);
    })
    .catch(err => {
      console.log(err);
      res.redirect(303, `/articles/${encodeURIComponent(req.params.title)}`)
    })
  });

module.exports = router;