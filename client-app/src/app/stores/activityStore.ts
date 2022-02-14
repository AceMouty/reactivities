import { makeAutoObservable, runInAction } from "mobx";
import { Activity } from "../interfaces/Activity";
import { deleteActivity, getActivities, getActivityDetails } from "../services/ActivityService";
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
        if(this.activityMap.size) return;
        
        this.setInitialLoading(true)
        try {
            const data = await getActivities()
            data.forEach(a => {
                this.setActivity(a)
            })
        }
        catch(e) {
            console.log(e)
        }
        finally {
            this.setInitialLoading(!this.initialLoading)
        }
    }

    loadActivity = async (id: string) => {
        let activity = this.getActivity(id);

        if(activity) {
            this.setSelectedActivity(activity)
            return;
        }

        try {
            activity = await getActivityDetails(id)
            console.log("ACTIVITY FROM ACTION: ", activity)
            this.setActivity(activity)
            this.setSelectedActivity(activity)
            console.log("INITIAL LODAING: ", this.initialLoading)
        } catch(err) {
            console.log(err)
        } finally {
            this.setInitialLoading(!this.initialLoading)
        }
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
            })
        } catch (error) {
            console.log(error)
        } finally {
            this.setLoading(!this.loading)
        }
    }

    // private actions
    setInitialLoading = (state: boolean) => this.initialLoading = state;
    
    setLoading = (state: boolean) => this.loading = state;

    private getActivity = (id: string) => {
        return this.activityMap.get(id);
    }

    private setActivity = (activity: Activity) => {
        // TODO: refactor later to support date format
        activity.date = activity.date.split("T")[0]
        this.activityMap.set(activity.id, activity)
    }

    private setSelectedActivity = (acivity: Activity) => {
        this.selectedActivity = acivity;
    }
}