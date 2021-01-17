import axios from 'axios'
import { UrlPrefixes, UserType } from './constants'

export const apiURL = `http://${process.env.REACT_APP_API_URL || 'localhost:8888'}`

export const fetchGet = async (userType: UserType, path: string) => {
    try {
        const jwtToken = localStorage.getItem(`${userType}_jwt_token`)
        return await axios({
            method: 'get',
            url: `${apiURL}${UrlPrefixes[userType]}${path}`,
            ...jwtToken ? {headers: {Authorization: `Bearer ${jwtToken}`}} : {},
            validateStatus: () => true
        })
    } catch (e) {
        console.log(e)
        throw e
    }
}

export const fetchPost = async (userType: UserType, path: string, data: Object) => {
    try {
        const jwtToken = localStorage.getItem(`${userType}_jwt_token`)
        return await axios({
            method: 'post',
            url: `${apiURL}${UrlPrefixes[userType]}${path}`,
            ...jwtToken ? {headers: {Authorization: `Bearer ${jwtToken}`}} : {},
            validateStatus: () => true,
            data
        })
    } catch (e) {
        console.log(e)
        throw e
    }
}

export const setJwtToken = async (userType: UserType, token: string) => {
    localStorage.setItem(`${userType}_jwt_token`, token)
}