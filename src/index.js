import * as R from 'ramda'

const mapTemplate = async (item, data, transformImageFn) => {
  switch (R.type(item)) {
    case 'String': return R.pathOr(item, item.split('.'), data)
    case 'Object': return R.reduce(async (acc, key) => {
      if (key === 'image') return {
        ...await acc,
        [key]: await transformImageFn(item[key]),
      }
      return {
        ...await acc,
        [key]: await mapTemplate(item[key], data, transformImageFn),
      }
    }, {})(R.keys(item))
    case 'Array': return R.reduce(async (acc, cur) => [
      ...await acc,
      await mapTemplate(cur, data, transformImageFn),
    ], [])(item)
    default:
      return item
  }
}

const createDocDefinition = async (template, data, transformImageFn = R.identity) => {
  return R.reduce(async (acc, cur) => [
    ...await acc,
    await mapTemplate(cur, data, transformImageFn),
  ], [])(template)
}

export default createDocDefinition
