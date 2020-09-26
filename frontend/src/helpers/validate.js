export function validURL(str) {
  var pattern = new RegExp('^https?:\\/\\/?')

  return !!pattern.test(str)
}
