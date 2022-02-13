import { makeAutoObservable, runInAction } from "mobx";
import { Activity } from "../interfaces/Activity";
import { getActivities } from "../services/ActivityService";
import { createActivity, updateActivity } from "../services/ActivityService"
import { v4 as uuid } from "uuid"

export default class ActivityStore {
    activities: Activity[] = []
    selectedActivity: Activity | null = null
    isEditing = false
    loading = false
    initialLoading = false

    constructor() {
        makeAutoObservable(this)
    }

    loadActivities = async () => {
        this.setInitialLoading(!this.initialLoading)

        try {
            const data = await getActivities()
            // TODO: refactor later to support date format
            data.forEach(a => {
                a.date = a.date.split("T")[0]
                this.activities.push(a)
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
        const activity: Activity | undefined = this.activities.find(a => a.id === id)
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
                this.activities.push(activity)
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
                this.activities = [...this.activities.filter(a => a.id !== activity.id), activity]
                this.selectedActivity = activity;
                this.isEditing = false;
            })
        } catch (error) {
            console.log(error)
        } finally {
            this.setLoading(!this.loading)
        }
    }
}