import axios, { AxiosResponse } from "axios"

const sleep = (delay: number) => {
    return new Promise((resolve) => {
        setTimeout(resolve, delay)
    })
}

const baseURL = "http://localhost:5000/api"
axios.defaults.baseURL = baseURL;

// use to mock server latency
axios.interceptors.response.use(async response => {
    try {
        await sleep(2000)
        return response
    } catch (err) {
        console.log(err)
        return await Promise.reject(err)
    }
})

const requestBody = <T>(res: AxiosResponse<T>) => res.data

export const doGet = <T>(uri: string) => {
    return axios.get<T>(uri).then(requestBody);
}

export const doPost = (uri: string, data: {}) => {
    return axios.post(uri, data).then(requestBody);
}

export const doPut = (uri: string, data: {}) => {
    return axios.get(uri, data).then(requestBody);
}

export const doDelete = (uri: string) => {
    return axios.get(uri).then(requestBody);
}