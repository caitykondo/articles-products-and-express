const express = require('express');
let router = express.Router();

router.get('/', (req, res) => {
  res.send('sanity check');
});

module.exports = router;