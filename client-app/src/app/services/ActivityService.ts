import { Activity } from "../interfaces/Activity"
import { doGet, doPost, doPut, doDelete } from "./ApiService"

const serviceURL = "/activities"

export const getActivities = () => {
    return doGet<Activity[]>(serviceURL)
}