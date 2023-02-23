import axios from 'axios'
import { DOMAIN_MOVIE, ACCESS_TOKEN } from '../utils/Constant/settingSystem'

export class BaseServices{
    put = (url, data) => {
        return axios.put(`${DOMAIN_MOVIE}/${url}`, 
        data, 
        {
            headers: {'Authorization': 'Bearer ' + localStorage.getItem(ACCESS_TOKEN)}
        })
    }
    post = (url, data) => {
        return axios.post(`${DOMAIN_MOVIE}/${url}`, 
        data, 
        {
            headers: {'Authorization': 'Bearer ' + localStorage.getItem(ACCESS_TOKEN)}
        })
    }
    get = (url) => {
        return axios.get(`${DOMAIN_MOVIE}/${url}`, 
        {
            headers: {'Authorization': 'Bearer ' + localStorage.getItem(ACCESS_TOKEN)}
        })
    }
    delete = (url) => {
        return axios.delete(`${DOMAIN_MOVIE}/${url}`, 
        {
            headers: {'Authorization': 'Bearer ' + localStorage.getItem(ACCESS_TOKEN)}
        })
    }
}
