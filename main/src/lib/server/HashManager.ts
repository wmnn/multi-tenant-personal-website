import crypto from 'crypto'

export function createHash(stringToBeHashed: string) {
    return crypto.createHash('sha256').update(stringToBeHashed).digest('hex')
}