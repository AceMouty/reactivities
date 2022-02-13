import React from 'react';
import Layout from "./app/layout/Layout";
import Dashboard from './features/activities/Dashboard';
import Loader from './app/layout/Loader';
import { useStore } from './app/stores/store';
import { observer } from 'mobx-react-lite';


function App() {
  const { activityStore } = useStore();

  React.useEffect(() => {
    async function getInitData() {
      activityStore.loadActivities()
    }

    getInitData()
  },[])

  if(activityStore.initialLoading) return <Loader />

  return (
    <Layout>
      <Dashboard />
    </Layout>
  );
}

export default observer(App);
