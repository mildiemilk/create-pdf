const express = require('express')
const R = require('ramda')
const imageToBase64 = require('image-to-base64')
const generatePDF = require('../generatePDF')
const createDocDefinition = require('../../index')

const router = express.Router()

const transformImageFn = (key, data) => {
  const path = R.pathOr(key, key.split('.'), data)
  return imageToBase64(path)
    .then(
      (response) => {
        return `data:image/jpeg;base64,${response}`
      }
    )
    .catch(
      (error) => {
        console.log('err', error)
      }
    )
}

router.get('/', async (req, res, next) => {
  const state = {
    insured: {
      firstname: {
        value: 'milk'
      }
    },
    attachment: { value: 'src/example/image/test.jpg' }
  }
  const template = {
    content: [
      { text: 'insured.firstname.value' },
      'Another paragraph, this time a little bit longer to make sure, this line will be divided into at least two lines',
      { image: 'attachment.value' },
    ]
  };

  const docDefinition = await createDocDefinition(template, state, transformImageFn)
  generatePDF(docDefinition)
  res.status(200).json({
    message: 'Generate pdf success'
  })
});

module.exports = router;
