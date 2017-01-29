const express = require('express');
const db = require('./../db.js');
let router = express.Router();

let articleQueries = {
  getIndex: 'SELECT * FROM articles',
  postIndex: (req) => `INSERT INTO articles (title, body, author, url_title) VALUES ('${req.body.title}', '${req.body.body}', '${req.body.author}', '${req.body.url_title}');`,
  getTitle: (req) => `SELECT * FROM articles WHERE url_title LIKE '${encodeURIComponent(req.params.title)}' LIMIT 1;`,
  putTitle: (req) => {
    let article = req.body;
    let url = encodeURIComponent(req.params.title);
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
}

router.route('/')
  .get((req, res)=> {
    db.any(articleQueries.getIndex)
    .then(articles => {
      res.render('./articles/', {articles});
    })
    .catch(err =>{
      res.render('./articles/', {error: true});
    });
  })
  .post((req, res) => {
    req.body.url_title = encodeURIComponent(req.body.title);
    if(req.body.title && req.body.body && req.body.author){
      db.none(articleQueries.postIndex(req))
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

router.route('/:title')
  .get((req, res) => {
    db.one(articleQueries.getTitle(req))
    .then(article => {
      res.render('./articles/article', article);
    })
    .catch(err =>{
      res.render('./articles/article', {error: true});
    })
  })
  .put((req, res) => {
    db.one(articleQueries.putTitle(req))
    .then(article => {
      res.render('./articles/article', article);
    })
    .catch(err => {
      res.send(err);  
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