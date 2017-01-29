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
  },
  deleteTitle: (req) => `DELETE FROM articles WHERE url_title LIKE '${encodeURIComponent(req.params.title)}';`,
  editTitle: (req) => `SELECT * FROM articles WHERE url_title LIKE '${encodeURIComponent(req.params.title)}' LIMIT 1;`
}

module.exports = articleQueries;