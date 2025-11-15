import { pbkdf2Sync, randomBytes } from "crypto";


export function hashPassword(password): { salt:string, hash:string } {
    const salt = randomBytes(16).toString('hex')
    const hash = pbkdf2Sync(password, salt, 310000, 64, 'sha512').toString('hex')
  
    return { salt, hash }
}

export function verifyPassword(password:string, salt:string, storedHash:string): boolean {
    const hash = pbkdf2Sync(password, salt, 310000, 64, 'sha512').toString('hex')
    return hash === storedHash
}