const express = require('express');
const path = require('path');
const fs = require('fs');

const router = express.Router();

router.get('/', (req, res) => {
  const filePath = path.join(__dirname, './dashboard.json');
  const file = fs.readFileSync(filePath, 'UTF-8');

  res.json(JSON.parse(file));
});

module.exports = router;
