## Court

A library to create docDefinition for [pdfMake library](https://github.com/bpampuch/pdfmake)

### What is docDefinition

> https://pdfmake.github.io/docs/document-definition-object

### Concept

- Input receive 3 values (template, state, transformImageFn)
  - template : structure of docDefinition, it can have a state key
  - state : redux state or sync state
  - transformImageFn : function to transform image (optional)
- Output 
  - Structure of template and output are the same but value of key from state is resolved

## Example

### Template

```js
{
  content: [
    'This is a standard paragraph, using default style',
    { text: 'insured.firstname.value', fontSize: 15 },
    {
      text: [
        'This paragraph is defined as an array of elements to make it possible to ',
        { text: 'insured.lastname.value', fontSize: 15 },
        'than the rest.'
      ]
    }
  ]
}
```

### State

```js
{
  insured: {
    firstName: {
      value: 'appman'
    },
    lastName: {
      value: 'agentmate'
    },
  },
}
```

### Output

```js
{
  content: [
    'This is a standard paragraph, using default style',
    { text: 'appman', fontSize: 15 },
    {
      text: [
        'This paragraph is defined as an array of elements to make it possible to ',
        { text: 'agentmate', fontSize: 15 },
        'than the rest.'
      ]
    }
  ]
}
```

## Usage

```js
import createDocDefinition from 'court'
const output = createDocDefinition(template, state)
```

## How to use docDefinition with pdfMake 

For examples, use pdfMake in Server-side

```js
yarn dev
``` 

then, open http://localhost:8080, it will generate pdf in `pdf/example.pdf`

or you can pass your docDefinition to function `generatePDF` and when this function is called, it will generate new pdf.
