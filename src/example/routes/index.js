const express = require('express')
const generatePDF = require('../generatePDF')
const createDocDefinition = required('../../index.js')

const router = express.Router()

router.get('/', async (req, res, next) => {
  const state = {
    insured: {
      firstname: {
        value: 'milk'
      }
    }
  }
  const template = {
    content: [
      'insured.firstname.value',
      'Another paragraph, this time a little bit longer to make sure, this line will be divided into at least two lines'
    ]
  };
  const docDefinition = createDocDefinition(template, state)
  generatePDF(docDefinition)
  res.status(200).json({
    message: 'Generate pdf success'
  })
});

module.exports = router;
