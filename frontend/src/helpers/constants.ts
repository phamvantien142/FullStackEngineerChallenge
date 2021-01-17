export enum UserType {
    admin = 'admin',
    user = 'user'
}

export const UrlPrefixes: {[key in UserType]: string} = {
    [UserType.admin]: '/admin',
    [UserType.user]: ''
}

