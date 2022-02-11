import React from "react"
import { Grid, GridColumn } from "semantic-ui-react"
import { Activity } from "../../../app/interfaces/Activity"
import ActivityList from "./ActivityList"
import Details from "./Details"
import ActivityForm from "./ActivityForm"

interface Props {
    activities: Activity[];
}

export default function Dashboard({ activities }: Props) {
    return(
        <Grid>
            <GridColumn width={10}>
                <ActivityList activities={activities} />
            </GridColumn>
            <GridColumn width={6}>
                { activities.length && 
                  <Details activity={activities[0]}/> }
                <ActivityForm/>
            </GridColumn>
        </Grid>
    )
}