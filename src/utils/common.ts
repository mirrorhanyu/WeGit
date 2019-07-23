const isEmptyObject = (object) => {
  return object == null || !Object.keys(object).length;
}

export {
  isEmptyObject as default
}
