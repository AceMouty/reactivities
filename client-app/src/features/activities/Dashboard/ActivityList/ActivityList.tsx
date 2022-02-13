import { observer } from "mobx-react-lite";
import React from "react";
import { Button, Item, Label, Segment } from "semantic-ui-react";
import { useStore } from "../../../../app/stores/store";

export default observer( function ActivityList(){
    // TODO: figure out a better way to track the clicked element
    const [target, setTarget] = React.useState("")
    const { activityStore } = useStore()

    const { deleteExistingActivity, setSelectedActivity, loading, activities} = activityStore

    function handleSelectedActivity(e: any) {
        const id: string | null = e.target.getAttribute("data-activity-id")
        if(id) setSelectedActivity(id)
    }

    function handleDeleteActivity(e: React.MouseEvent<HTMLElement>) {
        const id: string | null = e.currentTarget.getAttribute("data-activity-id")
        if(id) {
            setTarget(id)
            deleteExistingActivity(id)
        }
    }

    return(
        <Segment>
            <Item.Group divided>
                { activities.map( activity => {
                    return (
                        <Item key={activity.id}>
                            <Item.Content>
                                <Item.Header as="a">
                                    { activity.title }
                                </Item.Header>
                                <Item.Meta>
                                    { activity.date }
                                </Item.Meta>
                                <Item.Description>
                                    <div>
                                        { activity.description }
                                    </div>
                                    <div>
                                        {activity.city}, {activity.venue}
                                    </div>
                                </Item.Description>
                                <Item.Extra>
                                    <Button 
                                        loading={loading && target === activity.id} 
                                        data-activity-id={activity.id} 
                                        floated="right" 
                                        content="Delete" 
                                        color="red" 
                                        onClick={handleDeleteActivity} 
                                    />
                                    <Button data-activity-id={activity.id} floated="right" content="View" color="blue" onClick={handleSelectedActivity} />
                                    <Label basic content={activity.category} />
                                </Item.Extra>
                            </Item.Content>
                        </Item>
                    )
                })}
            </Item.Group>
        </Segment>
    )
})