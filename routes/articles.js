
const db = require('./../db');
const express = require('express');
const articleQueries = require('./../articleQueries')
let router = express.Router();

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
      articleQueries.postIndex(req.body)
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
    db.none(articleQueries.deleteTitle(req))
    .then(article => {
      res.redirect(303, '/articles');
    })
    .catch(err => {
      res.render('./articles', {delete_error: true});
    })
  });

router.route('/:title/edit')
  .get((req, res) => {
    db.one(articleQueries.editTitle(req))
    .then(article => {
      res.render('./articles/edit', article);
    })
    .catch(err => {
      res.redirect(303, `/articles/${encodeURIComponent(req.params.title)}`)
    })
  });

module.exports = router;