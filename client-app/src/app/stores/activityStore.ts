import { makeAutoObservable, runInAction } from "mobx";
import { Activity } from "../interfaces/Activity";
import { deleteActivity, getActivities } from "../services/ActivityService";
import { createActivity, updateActivity } from "../services/ActivityService"
import { v4 as uuid } from "uuid"

export default class ActivityStore {
    activityMap: Map<string, Activity> = new Map<string, Activity>();
    selectedActivity: Activity | null = null
    isEditing = false
    loading = false
    initialLoading = true

    constructor() {
        makeAutoObservable(this)
    }

    // computed properties
    get activitiesByDate() {
        return Array.from(this.activityMap.values())
                    .sort((a, b) => Date.parse(a.date) - Date.parse(b.date))
    }

    get activities() {
        return this.activitiesByDate
    }

    // actions
    loadActivities = async () => {
        try {
            const data = await getActivities()
            // TODO: refactor later to support date format
            data.forEach(a => {
                a.date = a.date.split("T")[0]
                this.activityMap.set(a.id, a)
            })
        }
        catch(e) {
            console.log(e)
        }
        finally {
            this.setInitialLoading(!this.initialLoading)
        }
    }

    setInitialLoading = (state: boolean) => this.initialLoading = state;
    
    setLoading = (state: boolean) => this.loading = state;

    setSelectedActivity = (id: string) => {
        const activity: Activity | undefined = this.activityMap.get(id)
        if (activity) {
            this.selectedActivity = activity;
        }
    }

    clearSelectedActivity = () => {
        this.selectedActivity = null;
    }

    openActivityForm = (id?: string) => {
        id ? this.setSelectedActivity(id) : this.clearSelectedActivity()
        this.isEditing = true;
    }

    closeActivityForm = () => {
        this.isEditing = false;
    }


    createNewActivity = async (activity: Activity) =>  {
        this.setLoading(!this.loading)
        activity.id = uuid()

        try {
            await createActivity(activity)
            runInAction(() => {
                this.activityMap.set(activity.id, activity)
                this.selectedActivity = activity
                this.isEditing = false;
            })
        } catch (error) {
            console.log(error)
        } finally {
            this.setLoading(!this.loading)
        }
    }

    updateExistingActivity = async (activity: Activity) => {
        this.setLoading(!this.loading)
        try {
            await updateActivity(activity)
            runInAction(() => {
                this.activityMap.set(activity.id, activity)
                this.selectedActivity = activity;
                this.isEditing = false;
            })
        } catch (error) {
            console.log(error)
        } finally {
            this.setLoading(!this.loading)
        }
    }

    deleteExistingActivity = async (id: string) => {
        this.setLoading(!this.loading)
        try {
            await deleteActivity(id)
            runInAction(() => {
                this.activityMap.delete(id)
                if(this.selectedActivity?.id === id) this.clearSelectedActivity()
            })
        } catch (error) {
            console.log(error)
        } finally {
            this.setLoading(!this.loading)
        }
    }
}