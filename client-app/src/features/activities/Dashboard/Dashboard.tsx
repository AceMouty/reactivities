import { Grid, GridColumn } from "semantic-ui-react"
import ActivityList from "./ActivityList"
import Details from "./Details"
import ActivityForm from "./ActivityForm"
import { useStore } from "../../../app/stores/store"
import { observer } from "mobx-react-lite"

function Dashboard() {
    const { activityStore } = useStore()
    const { selectedActivity, isEditing } = activityStore
    return(
        <Grid>
            <GridColumn width={10}>
                <ActivityList />
            </GridColumn>
            <GridColumn width={6}>
                { selectedActivity && !isEditing &&
                  <Details/> 
                }
                { isEditing &&
                    <ActivityForm />
                }
            </GridColumn>
        </Grid>
    )
}

export default observer(Dashboard)