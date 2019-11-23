var express = require('express');
var router = express.Router();

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

/* GET home page. */
router.get('/', async (req, res) => {
  await res.render('index', { page:'Home', menuId:'home' });
});

module.exports = router;
