import { Activity } from "../interfaces/Activity"
import { doGet, doPost, doPut, doDelete } from "./ApiService"

const serviceURL = "/activities"

export const getActivities = () => {
    return doGet<Activity[]>(serviceURL)
}

export const getActivityDetails = (id: string) => {
    return doGet<Activity>(`${serviceURL}/${id}`)
}

export const createActivity = (activity: Activity) => {
    return doPost(serviceURL, activity)
}

export const updateActivity = (activity: Activity) => {
    return doPut(`${serviceURL}/${activity.id}`, activity)
}

export const deleteActivity = (id: string) => {
    return doDelete(`${serviceURL}/${id}`)
}