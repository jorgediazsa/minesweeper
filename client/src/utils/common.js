import crypto from 'crypto'
import CryptoJS from 'crypto-js'

const incrementalKey = 1

const token = crypto.createCipher('aes-128-cbc', incrementalKey.toString()).final('hex')


const encrypt = text => CryptoJS
                                .AES
                                .encrypt(text, token)
                                .toString()

const decrypt = text => CryptoJS
                                .AES
                                .decrypt(text, token)
                                .toString(CryptoJS.enc.Utf8)

export const setData = (key, value) => localStorage.setItem(`${token}${key}`, encrypt(JSON.stringify(value)))

export const getData = key => checkData(key)
                                ? JSON.parse(decrypt(localStorage.getItem(`${token}${key}`)))
                                : null

export const checkData = key => !!localStorage.getItem(`${token}${key}`)

export const deleteData = key => localStorage.removeItem(`${token}${key}`)