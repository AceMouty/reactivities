import * as React from "react"
import { Grid, GridColumn } from "semantic-ui-react"
import ActivityList from "./ActivityList"
import { useStore } from "../../../app/stores/store"
import { observer } from "mobx-react-lite"
import Loader from "../../../app/layout/Loader"
import ActivitiesFilter from "./ActivitiesFilter"

function Dashboard() {
  const { activityStore } = useStore();
  const { loadActivities, activityMap } = activityStore
  React.useEffect(() => {
    async function getInitData() {
      if(activityMap.size <= 1) loadActivities();
    }

    getInitData()
  },[activityMap, loadActivities])

  if(activityStore.initialLoading) return <Loader />

    return(
        <Grid>
            <GridColumn width={10}>
                <ActivityList />
            </GridColumn>
            <GridColumn width={6}>
                <ActivitiesFilter />
            </GridColumn>
        </Grid>
    )
}

export default observer(Dashboard)