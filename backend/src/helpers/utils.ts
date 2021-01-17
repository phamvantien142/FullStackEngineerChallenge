import bcrypt from 'bcryptjs'

export const comparePassword = (hash: string, pwd: string) => bcrypt.compare(pwd, hash)
export const hashPassword = async (pwd: string) => await bcrypt.hash(pwd, await bcrypt.genSalt(10))