import React from 'react';
import { v4 as uuid } from "uuid";
import { Activity } from './app/interfaces/Activity';
import Layout from "./app/layout/Layout";
import Dashboard from './features/activities/Dashboard';
import { getActivities, updateActivity, createActivity, deleteActivity } from "./app/services/ActivityService"
import Loader from './app/layout/Loader';


function App() {
  const [activities, setActivities] = React.useState<Activity[]>([])
  const [selectedActivity, setSelectedActivity] = React.useState<Activity | null>(null)
  const [isEditing, setIsEditing] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);
  const [isSubmitting, setIsSubmitting] = React.useState(false)

  React.useEffect(() => {
    async function getInitData() {
      const data = await getActivities()
      // TODO: refactor later to support date format
      const activities: Activity[] = []
      data.forEach(a => {
        a.date = a.date.split("T")[0]
        activities.push(a)
      })

      setActivities(activities)
      setIsLoading((isLoading) => !isLoading)
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
    setIsSubmitting(true)

    debugger;
    // create new activity
    if(!activity.id) {
      activity.id = uuid()
      createActivity(activity)
      .then(() => {
        setActivities([...activities, activity])
        setIsSubmitting(false)
        setIsEditing(false)
      })
      return
    }
    debugger;
    // update activity
    updateActivity(activity)
    .then(() => {
      setActivities([...activities.filter(a => a.id !== activity.id), activity])
      setSelectedActivity(activity)
      setIsEditing(false)
      setIsSubmitting(false)
    })

  }

  function handleDeleteActivity(id: string) {
    setIsSubmitting(true)
    deleteActivity(id)
    .then(() => {
      setActivities([...activities.filter(a => a.id !== id)])
      setIsSubmitting(false)
    })
  }

  if(isLoading) return <Loader />

  return (
    <Layout openForm={handleFormOpen}>
      <Dashboard 
        activities={activities}
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

export default App;
