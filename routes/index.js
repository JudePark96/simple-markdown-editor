var express = require('express');
var router = express.Router();
var con = require('../db/connection');
var q = require('../db/query');

/* GET home page. */
router.get('/', async (req, res) => {
  await res.render('index', { page:'Home', menuId:'home' });
});

router.post('/article', async (req, res) => {
  const content = req.body.content;
  const conn = await con();
  await q(conn, `INSERT INTO article (content) VALUES('${content}');`)
      .catch(() => { res.send('<script type="text/javascript">alert("Error occured.");</script>')});

  res.send('<script type="text/javascript">alert("Your article has been successfully posted.");</script>');    
  res.redirect('/')
});

router.get('/articles', async (req, res) => {

});


router.get('/test', async (req, res) => {
  const conn = await con();
  const results = await q(conn, 'SELECT * FROM test;').catch(console.log);
  res.json({ results });
})

module.exports = router;
