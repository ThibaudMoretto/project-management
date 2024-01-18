export function camelizeObjectKeys(object: any) {
  return object && Object.keys(object).length > 0
    ? Object.keys(object).reduce((result: any, key) => {
        const camelizedKey = key.replace(/([-_][a-z])/gi, $1 => {
          return $1.toUpperCase().replace('-', '').replace('_', '');
        });
        result[camelizedKey] = object[key];
        return result;
      }, {})
    : {};
}

export function camelizeArrayOfObjects(arrayOfObjects: any) {
  return arrayOfObjects.length > 0
    ? arrayOfObjects.map((object: any) => camelizeObjectKeys(object))
    : [];
}
