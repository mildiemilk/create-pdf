import * as R from 'ramda'

const mapArrayTemplate = (item, data, transformImageFn) => R.reduce(async (acc, cur) => [
  ...await acc,
  await mapTemplate(cur, data, transformImageFn),
], [])(item)

const mapTemplate = async (item, data, transformImageFn) => {
  switch (R.type(item)) {
    case 'String': return R.pathOr(item, item.split('.'), data)
    case 'Object': return R.reduce(async (acc, key) => ({
      ...await acc,
      [key]: key === 'image' ?
        await transformImageFn(item[key])
        : await mapTemplate(item[key], data, transformImageFn),
    }), {})(R.keys(item))
    case 'Array': return mapArrayTemplate(item, data, transformImageFn)
    default:
      return item
  }
}

const createDocDefinition = async (template, data, transformImageFn = R.identity) => {
  return mapArrayTemplate(template, data, transformImageFn)
}

export default createDocDefinition
