import React from 'react';
import logo from './logo.svg';
import './App.css';
import axios from "axios";
import { Header, List } from 'semantic-ui-react';

function App() {
  const [activities, setActivities] = React.useState([])

  React.useEffect(() => {
    async function getActivities() {
      const res = await axios("http://localhost:5000/api/activities")
      const data = res.data
      return data
    }

    getActivities()
    .then(data => setActivities(data))

  },[])

  return (
    <div>
      <Header as="h2" icon="users" content="Reactivities" />
      <List>
        {activities.map((activity: any) => {
          return <List.Item key={activity.id}>{ activity.title }</List.Item>
        })}
      </List>
    </div>
  );
}

export default App;
