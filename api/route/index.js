var express = require('express');
var router = express.Router({
  mergeParams: true
});
router.get('/list', function (req, res, next) {
  res.status(200);
  res.send(JSON.stringify({
    'timeData': 'aaaaaaa',
    'errorMsg': 'ddddd'
  }))
})
module.exports = router;