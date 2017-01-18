const articleList = [];

function addNewArticle(article){
  article.urlTitle = encodeURIComponent(article.title);
  articleList.push(article);
}

function editArticle(req){
  for(let i = 0; i < articleList.length; i++){
    if (req.params.title === articleList[i].title){
      if(req.body.title){
        articleList[i].title = req.body.title;
      }
      if(req.body.body){
        articleList[i].body = req.body.body;
      }
      if(req.body.author){
        articleList[i].author = req.body.author;
      }
    }
  }
}

function deleteArticle(req){
  for(let i = 0; i < articleList.length; i++){
    if (req.params.title === articleList[i].title){
      articleList.splice(i, 1);
    }
  }
}

module.exports = {
  data: {
    "articles": articleList
  },
  articleList,
  addNewArticle,
  editArticle,
  deleteArticle
};