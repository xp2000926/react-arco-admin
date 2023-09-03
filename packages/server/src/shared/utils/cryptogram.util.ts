import * as crypto from 'crypto'
/**
 * 随机盐
 * @param {number} len 长度
 * @return {string}
 */
export const makeSalt = (len = 3): string =>
  crypto.randomBytes(len).toString('base64')
/**
 * 使用盐加密明文密码
 * @param {string} password 密码
 * @param {string} salt 密码盐
 * @return {string}
 */
export const encryptPassword = (password: string, salt: string): string => {
  if (!password || !salt) {
    return ''
  }
  const tempSalt = Buffer.from(salt, 'base64')
  return (
    // 10000 代表迭代次数 16代表长度
    crypto.pbkdf2Sync(password, tempSalt, 10000, 16, 'sha1').toString('base64')
  )
}
