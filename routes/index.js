var express = require('express');
var router = express.Router();
var con = require('../db/connection');
var q = require('../db/query');
var moment = require('moment');
const marked = require('marked');
const { readFile, writeFile } = require('../utils/fileHelper')


/* GET home page. */
router.get('/', async (req, res) => {
  await res.render('index', { page:'Home', menuId:'home' });
});

router.post('/article', async (req, res) => {
  const {title, content} = req.body;

  if (title === '') {
    req.flash('Please, enter your title.')
    return res.redirect('/');
  }


  await writeFile(`./public/posts/${title}.md`, content, 'utf8');
  const conn = await con();
  
  await q(conn, `INSERT INTO article (title, content) VALUES('${title}', "${title}.md");`)
    .catch(console.log);

  return res.redirect('/');
});

router.get('/article', async (req, res) => {
  const conn = await con();
  let articles = await q(conn, `SELECT * FROM ARTICLE;`)
    .catch(() => { res.send('<script type="text/javascript">alert("Error occured.");</script>')});

  // convert format of datetime.
  articles.forEach(e => e.created_at = moment(e.created_at).format(`YYYY-MM-DD HH:mm:ss`));
  
  await res.render('articleList', { page: 'Article', menuId: 'article', articles: articles });
});

router.get('/article/:article_id', async (req, res) => {
  console.log(req.params.article_id)
  const conn = await con();
  const article = await q(conn, `SELECT * FROM ARTICLE WHERE ID = ${req.params.article_id};`)
    .catch(console.log);

  const data = await readFile(`./public/posts/${article[0].content}`);
  const html = marked(data)

  await res.render(
    'article', {
      id: article[0].id,
      content: html,
      page: article[0].title,
      menuId: 'article'
    }
  );
});



module.exports = router;
