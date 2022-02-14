import * as React from "react"
import { Grid, GridColumn } from "semantic-ui-react"
import ActivityList from "./ActivityList"
import Details from "./Details"
import ActivityForm from "./ActivityForm"
import { useStore } from "../../../app/stores/store"
import { observer } from "mobx-react-lite"
import Loader from "../../../app/layout/Loader"

function Dashboard() {
    const { activityStore } = useStore();
    const { selectedActivity, isEditing } = activityStore;

  React.useEffect(() => {
    async function getInitData() {
      activityStore.loadActivities()
    }

    getInitData()
  },[])

  if(activityStore.initialLoading) return <Loader />

    return(
        <Grid>
            <GridColumn width={10}>
                <ActivityList />
            </GridColumn>
            <GridColumn width={6}>
                <h2>Activity Filters</h2>
            </GridColumn>
        </Grid>
    )
}

export default observer(Dashboard)