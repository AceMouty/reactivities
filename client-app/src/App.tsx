import Layout from "./app/layout/Layout";
import Activities from "./pages/Activities";
import { observer } from 'mobx-react-lite';
import { Route, Switch, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import ActivityForm from './features/activities/Dashboard/ActivityForm';
import ActivityDetails from "./pages/ActivityDetails/ActivityDetails";


function App() {
  const location = useLocation()

  return (
    <Layout>
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route exact path="/activities" component={Activities}/>
        <Route path="/activities/:id" component={ActivityDetails}/>
        <Route key={location.key} exact path={["/createActivity", "/manage/:id"]} component={ActivityForm}/>
      </Switch>
    </Layout>
  );
}

export default observer(App);
