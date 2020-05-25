## Court

A library to create docDefinition for [pdfMake library](https://github.com/bpampuch/pdfmake)

### What is docDefinition

   > https://pdfmake.github.io/docs/document-definition-object

### Concept

  - Input required 2 params
    - Template is structure of docDefinition but may have a state key
    - State in redux state or sync state
  - Output 
    - The structures of template and output are the same but the value of the key from state is resolved

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
