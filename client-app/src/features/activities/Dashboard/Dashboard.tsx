import React from "react"
import { Grid, GridColumn } from "semantic-ui-react"
import { Activity } from "../../../app/interfaces/Activity"
import ActivityList from "./ActivityList"
import Details from "./Details"
import ActivityForm from "./ActivityForm"
import { useStore } from "../../../app/stores/store"
import { observer } from "mobx-react-lite"

interface Props {
    isSubmitting: boolean;
    activities: Activity[];
    createOrUpdateActivity: (activity: Activity) => void;
    deleteActivity: (id: string) => void;
}

function Dashboard({ 
    activities, 
    createOrUpdateActivity,
    deleteActivity,
    isSubmitting
}: Props) {
    const { activityStore } = useStore()
    const { selectedActivity, isEditing } = activityStore
    return(
        <Grid>
            <GridColumn width={10}>
                <ActivityList 
                    activities={activities} 
                    deleteActivity={deleteActivity} 
                    isSubmitting={isSubmitting} 
                />
            </GridColumn>
            <GridColumn width={6}>
                { selectedActivity && !isEditing &&
                  <Details/> 
                }
                { isEditing &&
                    <ActivityForm 
                        createOrUpdateActivity={createOrUpdateActivity}
                        isSubmitting={isSubmitting}
                    />
                }
            </GridColumn>
        </Grid>
    )
}

export default observer(Dashboard)