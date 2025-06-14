export function isEmptyObject(obj: object) {
  return !(!Array.isArray(obj) && Object.keys(obj).length === 0);
}
