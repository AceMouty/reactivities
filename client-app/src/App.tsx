import React from 'react';
import { v4 as uuid } from "uuid";
import { Activity } from './app/interfaces/Activity';
import Layout from "./app/layout/Layout";
import Dashboard from './features/activities/Dashboard';
import { getActivities, updateActivity, createActivity, deleteActivity } from "./app/services/ActivityService"
import Loader from './app/layout/Loader';
import { useStore } from './app/stores/store';
import { observer } from 'mobx-react-lite';


function App() {
  const { activityStore } = useStore();

  const [activities, setActivities] = React.useState<Activity[]>([])
  const [selectedActivity, setSelectedActivity] = React.useState<Activity | null>(null)
  const [isEditing, setIsEditing] = React.useState(false);
  const [isSubmitting, setIsSubmitting] = React.useState(false)

  React.useEffect(() => {
    async function getInitData() {
      activityStore.loadActivities()
    }

    getInitData()
  },[])

  function handleSelectedActivity(id: string) {
    const activity: Activity | undefined = activities.find(a => a.id === id);
    if(activity) setSelectedActivity(activity)
  }

  function handleClearActivity(){
    setSelectedActivity(null)
  }

  function handleFormOpen(id? : string) {
    id ? handleSelectedActivity(id) : handleClearActivity()
    setIsEditing(true)
  }

  function handleFormClose() {
    setIsEditing(false)
  }

  function handleCreateOrUpdateActivity(activity: Activity) {
    setIsSubmitting((isSubmitting) => !isSubmitting)

    // create new activity
    if(!activity.id) {
      activity.id = uuid()
      createActivity(activity)
      .then(() => {
        setActivities([...activities, activity])
        setIsSubmitting((isSubmitting) => !isSubmitting)
        setIsEditing((isEditing) => !isEditing)
      })
      return
    }
    
    // update activity
    updateActivity(activity)
    .then(() => {
      setActivities([...activities.filter(a => a.id !== activity.id), activity])
      setSelectedActivity(activity)
      setIsEditing((isEditing) => !isEditing)
      setIsSubmitting((isSubmitting) => isSubmitting)
    })

  }

  function handleDeleteActivity(id: string) {
    setIsSubmitting((isSubmitting) => !isSubmitting)
    deleteActivity(id)
    .then(() => {
      setActivities([...activities.filter(a => a.id !== id)])
      setIsSubmitting((isSubmitting) => !isSubmitting)
    })
  }

  if(activityStore.initialLoading) return <Loader />

  return (
    <Layout openForm={handleFormOpen}>
      <Dashboard 
        activities={activityStore.activities}
        selectedActivity={selectedActivity}
        selectActivity={handleSelectedActivity}
        clearActivity={handleClearActivity} 
        isEditing={isEditing}
        openForm={handleFormOpen}
        closeForm={handleFormClose}
        createOrUpdateActivity={handleCreateOrUpdateActivity}
        deleteActivity={handleDeleteActivity}
        isSubmitting={isSubmitting}
      />
    </Layout>
  );
}

export default observer(App);
