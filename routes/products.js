const express = require('express');
let router = express.Router();

router.get('/', (req, res) => {
  res.send('sanity check');
});

console.log('products working');

module.exports = router;