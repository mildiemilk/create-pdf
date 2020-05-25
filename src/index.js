import * as R from 'ramda'

const mapTemplate = (value, data) => {
  switch (R.type(value)) {
    case 'String': return R.pathOr(value, value.split('.'), data)
    case 'Object': return R.mapObjIndexed((value) => mapTemplate(value, data))(value)
    case 'Array': return R.map(item => mapTemplate(item, data))(value)
    default:
      return value
  }
}
const createDocDefinition = (template, data) => {
  return template.map((item) => mapTemplate(item, data))
}

export default createDocDefinition
