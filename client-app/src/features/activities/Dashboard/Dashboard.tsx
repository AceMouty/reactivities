import React from "react"
import { Grid, GridColumn } from "semantic-ui-react"
import { Activity } from "../../../app/interfaces/Activity"
import ActivityList from "./ActivityList"
import Details from "./Details"
import ActivityForm from "./ActivityForm"

interface Props {
    activities: Activity[];
    selectedActivity: Activity | null;
    selectActivity: (id: string) => void;
    clearActivity: () => void;
    isEditing: boolean;
    openForm: (id: string) => void;
    closeForm: () => void;
}

export default function Dashboard({ 
    activities, 
    selectActivity, 
    clearActivity, 
    selectedActivity,
    isEditing,
    openForm,
    closeForm
}: Props) {
    return(
        <Grid>
            <GridColumn width={10}>
                <ActivityList activities={activities} selectActivity={selectActivity} />
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
                  <ActivityForm closeForm={closeForm} activity={selectedActivity}/>
                }
            </GridColumn>
        </Grid>
    )
}