const articleList = [];

function addNewArticle(article) {
  article.urlTitle = encodeURIComponent(article.title);
  articleList.push(article);
}

module.exports = {
  articleList,
  addNewArticle
};