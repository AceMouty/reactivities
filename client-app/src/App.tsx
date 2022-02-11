import React from 'react';
import axios from "axios";
import { Activity } from './app/interfaces/Activity';
import Layout from "./app/layout/Layout";
import Dashboard from './features/activities/Dashboard/Dashboard';

function App() {
  const [activities, setActivities] = React.useState<Activity[]>([])

  React.useEffect(() => {
    async function getActivities() {
      const res = await axios.get<Activity[]>("http://localhost:5000/api/activities")
      const data = res.data
      setActivities(data)
    }

    getActivities()
  },[])

  return (
    <Layout>
      <Dashboard activities={activities} />
    </Layout>
  );
}

export default App;
