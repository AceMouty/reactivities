import Layout from "./app/layout/Layout";
import Activities from "./pages/Activities";
import { observer } from 'mobx-react-lite';
import { Route, Switch, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import ActivityForm from './features/activities/ActivityForm';
import ActivityDetails from "./pages/ActivityDetails/ActivityDetails";


function App() {
  const location = useLocation()

  return (
    
      <Switch>
        <Route exact path="/" component={Home}/>
        <Layout>
          <Route exact path="/activities" component={Activities}/>
          <Route path="/activities/:id" component={ActivityDetails}/>
          <Route key={location.key} exact path={["/createActivity", "/manage/:id"]} component={ActivityForm}/>
        </Layout>
      </Switch>
  );
}

export default observer(App);
