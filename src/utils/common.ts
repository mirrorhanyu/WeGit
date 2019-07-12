const isEmptyObject = (object: Object) => {
  return !Object.keys(object).length;
}

export {
  isEmptyObject as default
}
