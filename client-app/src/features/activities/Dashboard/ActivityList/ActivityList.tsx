import * as React from "react";
import { observer } from "mobx-react-lite";
import { Item, Segment, Header } from "semantic-ui-react";
import { useStore } from "../../../../app/stores/store";
import ActivityListItem from "./ActivityListItem"

export default observer( function ActivityList(){
    const { activityStore } = useStore()

    const { groupedActivites } = activityStore

    return(
        <>
            {groupedActivites.map(([group, activities]) => (
                <React.Fragment key={group}>
                    <Header sub color="teal">
                        {group}
                    </Header>
                    { activities.map( activity => {
                        return <ActivityListItem key={activity.id} activity={activity}/>
                    })}
                </React.Fragment>
            ))}
        </>
    )
})