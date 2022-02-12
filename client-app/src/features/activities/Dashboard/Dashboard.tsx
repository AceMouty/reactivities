import React from "react"
import { Grid, GridColumn } from "semantic-ui-react"
import { Activity } from "../../../app/interfaces/Activity"
import ActivityList from "./ActivityList"
import Details from "./Details"
import ActivityForm from "./ActivityForm"

interface Props {
    isEditing: boolean;
    isSubmitting: boolean;
    activities: Activity[];
    selectedActivity: Activity | null;
    selectActivity: (id: string) => void;
    clearActivity: () => void;
    openForm: (id: string) => void;
    closeForm: () => void;
    createOrUpdateActivity: (activity: Activity) => void;
    deleteActivity: (id: string) => void;
}

export default function Dashboard({ 
    activities, 
    selectActivity, 
    clearActivity, 
    selectedActivity,
    isEditing,
    openForm,
    closeForm,
    createOrUpdateActivity,
    deleteActivity,
    isSubmitting
}: Props) {
    return(
        <Grid>
            <GridColumn width={10}>
                <ActivityList 
                    activities={activities} 
                    selectActivity={selectActivity} 
                    deleteActivity={deleteActivity} 
                    isSubmitting={isSubmitting} 
                />
            </GridColumn>
            <GridColumn width={6}>
                { selectedActivity && !isEditing &&
                  <Details 
                    activity={selectedActivity} 
                    clearActivity={clearActivity}
                    openForm={openForm}
                  /> 
                }
                { isEditing &&
                    <ActivityForm 
                        closeForm={closeForm} 
                        activity={selectedActivity} 
                        createOrUpdateActivity={createOrUpdateActivity}
                        isSubmitting={isSubmitting}
                    />
                }
            </GridColumn>
        </Grid>
    )
}