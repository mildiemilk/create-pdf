const createDocDefinition = require('./index')

const mockData = {
  insured: {
    firstname: {
      value: 'AppMan',
    },
    lastname: {
      value: 'AgentMate',
    },
    gender: {
      value: {
        key: 'M',
        code: 'M',
      },
      dirty: true,
    },
    occupation: {
      value: {
        code: 'ก001004',
        key: 'ก001004',
        favorite: false,
      },
      dirty: true,
    },
    documentType: {
      value: {
        code: '1A',
        key: 'THAI_NATIONAL_ID_CARD',
      },
      dirty: true,
    },
    nationality: {
      value: {
        code: 'AF',
        key: 'AF',
      },
      dirty: true,
    },
    maritalStatus: {
      value: {
        code: '1',
        key: 'single',
      },
      dirty: true,
    },
    occupationJobDescription: {
      value: 'Test',
      dirty: true,
    }
  }
}

describe('createDocDefinition', () => {
  describe('When docDefinition template is styling', () => {
    const template = [{
      content: [
        'This is a standard paragraph, using default style',
        { text: 'insured.firstname.value', fontSize: 15 },
        {
          text: [
            'milk',
            { text: 'insured.lastname.value', fontSize: 15 },
            'than the rest.'
          ]
        }
      ],
      styles: {
        header: {
          fontSize: 22,
          bold: true
        },
        anotherStyle: {
          italics: true,
          alignment: 'right'
        }
      }
    }]
    it('Should map correctly', () => {
      const result = createDocDefinition(template, mockData)
      expect(result).toMatchSnapshot()
    })
  })
  describe('When docDefinition template is columns', () => {
    const template = [
      {
        content: [
          'Just string',
          {
            columns: [
              {
                width: 'auto',
                text: 'insured.firstname.value'
              },
              {
                width: '*',
                text: 'Second column'
              },
              {
                // fixed width
                width: 100,
                text: 'insured.maritalStatus.value'
              },
              {
                // % width
                width: '20%',
                text: 'insured.nationality.value.code'
              }
            ],
            columnGap: 10
          },
          'milk eiei'
        ]
      }
    ]
    it('Should map correctly', () => {
      const result = createDocDefinition(template, mockData)
      expect(result).toMatchSnapshot()
    })
  })
  describe('When docDefinition template is table', () => {
    const template = [
      {
        content: [
          {
            layout: 'insured.documentType.value.code',
            table: {
              headerRows: 1,
              widths: ['*', 'auto', 100, '*'],

              body: [
                ['First', 'Second', 'insured.firstname.value', 'The last one'],
                ['Value 1', 'insured.occupation.value.favorite', 33, 'Value 4'],
                [{ text: 'insured.lastname.value', bold: true }, 'Val 2', 'Val 3', 'insured.occupationJobDescription.value']
              ]
            }
          }
        ]
      }
    ]
    it('Should map correctly', () => {
      const result = createDocDefinition(template, mockData)
      expect(result).toMatchSnapshot()
    })
  })
  describe('When docDefinition template is list', () => {
    const template = [
      {
        content: [
          'insured.firstname.value',
          {
            ul: [
              'Item 1',
              'Item 2',
              'insured.lastname.value',
              { text: 'insured.documentType.value.key', bold: true },
            ]
          },
          'Numbered list example:',
          {
            ol: [
              'Item 1',
              'Item 2',
              'insured.firstname.value'
            ]
          }
        ]
      }
    ]
    it('Should map correctly', () => {
      const result = createDocDefinition(template, mockData)
      expect(result).toMatchSnapshot()
    })
  })
  describe('When docDefinition template is headers and footers', () => {
    const template = [
      {
        header: 'insured.lastname.value',
        footer: {
          columns: [
            'insured.firstname.value',
            { text: 'Right part', alignment: 'right' }
          ]
        },
        content: [
          'This is a standard paragraph, using default style',
          { text: 'insured.firstname.value', fontSize: 15 },
          {
            text: [
              'milk',
              { text: 'insured.lastname.value', fontSize: 15 },
              'than the rest.'
            ]
          }
        ]
      }
    ]
    it('Should map correctly', () => {
      const result = createDocDefinition(template, mockData)
      expect(result).toMatchSnapshot()
    })
  })
  describe('When docDefinition template is stack of paragraphs', () => {
    const template = [
      {
        content: [
          'insured.firstname.value',
          'paragraph 2',
          {
            columns: [
              'first column is a simple text',
              'insured.firstname.value',
              [
                'paragraph A',
                'insured.firstname.value',
                'these paragraphs will be rendered one below another inside the column',
                [
                  'insured.firstname.value',
                  'milk'
                ],
              ]
            ]
          }
        ]
      }
    ]
    it('Should map correctly', () => {
      const result = createDocDefinition(template, mockData)
      expect(result).toMatchSnapshot()
    })
  })
  describe('When docDefinition template is table of contents', () => {
    const template = [
      {
        content: [
          {
            toc: {
              title: { text: 'insured.firstname.value', style: 'header' }
            }
          },
          {
            text: 'insured.lastname.value',
            style: 'header',
            tocItem: true,
          }
        ]
      }
    ]
    it('Should map correctly', () => {
      const result = createDocDefinition(template, mockData)
      expect(result).toMatchSnapshot()
    })
  })
  describe('When docDefinition template is encryption and access privileges', () => {
    const template = [
      {
        userPassword: 'insured.firstname.value',
        ownerPassword: '123456',
        permissions: {
          printing: 'highResolution',
          modifying: false,
          copying: false,
          annotating: 'insured.lastname.value',
          fillingForms: true,
          contentAccessibility: true,
          documentAssembly: true
        },
        content: [
          'milk',
          'insured.firstname.value'
        ]
      }
    ]
    it('Should map correctly', () => {
      const result = createDocDefinition(template, mockData)
      expect(result).toMatchSnapshot()
    })
  })
})