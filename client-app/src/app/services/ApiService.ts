import axios, { AxiosResponse } from "axios"

const baseURL = "http://localhost:5000/api"
axios.defaults.baseURL = baseURL;

const requestBody = <T>(res: AxiosResponse<T>) => res.data

export const doGet = <T>(uri: string) => {
    return axios.get<T>(uri).then(requestBody);
}

export const doPost = (uri: string, data: {}) => {
    return axios.post(uri).then(requestBody);
}

export const doPut = (uri: string, data: {}) => {
    return axios.get(uri).then(requestBody);
}

export const doDelete = (uri: string) => {
    return axios.get(uri).then(requestBody);
}