import * as R from 'ramda'

const mapTemplate = async (item, data, getImageFn, key) => {
  if (key === 'image') {
    return getImageFn ? await getImageFn(item) : item
  }
  switch (R.type(item)) {
    case 'String': return R.pathOr(item, item.split('.'), data)
    case 'Object': return R.reduce(async (acc, key) => ({
      ...await acc,
      [key]: await mapTemplate(item[key], data, getImageFn, key),
    }), {})(R.keys(item))
    case 'Array': return R.reduce(async (acc, cur) => [
      ...await acc,
      await mapTemplate(cur, data, getImageFn),
    ], [])(item)
    default:
      return item
  }
}

const createDocDefinition = async (template, data, getImageFn) => {
  return R.reduce(async (acc, cur) => [
    ...await acc,
    await mapTemplate(cur, data, getImageFn),
  ], [])(template)
}

export default createDocDefinition
