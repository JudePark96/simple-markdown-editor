var express = require('express');
var router = express.Router();
var marked = require('marked');
const { readFile } = require('../utils/fileHelper');

/* GET users listing. */
router.get('/', async (req, res, next) => {
  const me = await readFile('./public/posts/about_me.md');
  return res.render('me', { page: 'Eun Hwan Park', menuId: 'about me', content: marked(me) });
});

module.exports = router;
