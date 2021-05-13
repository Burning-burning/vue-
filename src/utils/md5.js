import md5 from 'js-md5'

export function strToMd5(str) {
  return md5(
    md5(str)
      .split('')
      .reverse()
      .join('')
  )
}
