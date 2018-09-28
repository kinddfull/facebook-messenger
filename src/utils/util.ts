export const isSame = (a, b) => {
  return a === b
}

export const findObject = (a: any[], b: object) => {
  return a.find(_a => _a in b)
}
