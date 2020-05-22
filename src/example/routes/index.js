const express = require('express');
const router = express.Router();
const generatePDF = require('../../generatePDF')

router.get('/', async (req, res, next) => {
  const docDefinition = {
    content: [
      'hi milk',
      'Another paragraph, this time a little bit longer to make sure, this line will be divided into at least two lines'
    ]
  };
  generatePDF(docDefinition)
  res.status(200).json({
    message: 'Generate pdf success'
  })
});

module.exports = router;
