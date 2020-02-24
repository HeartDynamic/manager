import CryptoJS from 'crypto-js'

export function encrypt(username: string, password: string, captcha: string, key: string): string {
    const hash_passwd = CryptoJS.SHA1(password).toString()
    const hash_data = CryptoJS.enc.Utf8.parse(CryptoJS.SHA1(username + hash_passwd).toString())
    const hash_key = CryptoJS.enc.Utf8.parse(key + captcha)
    const encrypted = CryptoJS.AES.encrypt(hash_data, hash_key, {
        iv: hash_key,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7,
    })
    return encrypted.toString()
}
