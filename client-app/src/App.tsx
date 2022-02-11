import React from 'react';
import axios from "axios";
import { Activity } from './app/interfaces/Activity';
import Layout from "./app/layout/Layout";
import Dashboard from './features/activities/Dashboard';

function App() {
  const [activities, setActivities] = React.useState<Activity[]>([])
  const [selectedActivity, setSelectedActivity] = React.useState<Activity | null>(null)
  const [isEditing, setIsEditing] = React.useState(false);

  React.useEffect(() => {
    async function getActivities() {
      const res = await axios.get<Activity[]>("http://localhost:5000/api/activities")
      const data = res.data
      setActivities(data)
    }

    getActivities()
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
      />
    </Layout>
  );
}

export default App;
