import { observer } from "mobx-react-lite";
import { Item, Segment } from "semantic-ui-react";
import { useStore } from "../../../../app/stores/store";
import ActivityListItem from "./ActivityListItem"

export default observer( function ActivityList(){
    const { activityStore } = useStore()

    const { activities } = activityStore

    return(
        <Segment>
            <Item.Group divided>
                { activities.map( activity => {
                    return <ActivityListItem key={activity.id} activity={activity}/>
                })}
            </Item.Group>
        </Segment>
    )
})