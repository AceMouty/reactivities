import React, { SyntheticEvent } from "react";
import { Button, Item, Label, Segment } from "semantic-ui-react";
import { Activity } from "../../../../app/interfaces/Activity";

interface Props {
    activities: Activity[];
    isSubmitting: boolean;
    selectActivity: (id: string) => void;
    deleteActivity: (id: string) => void;
}

export default function ActivityList({ activities, selectActivity, deleteActivity, isSubmitting }: Props){
    // TODO: figure out a better way to track the clicked element
    const [target, setTarget] = React.useState("")
    
    function setSelectedActivity(e: React.MouseEvent<HTMLElement>) {
        const id: string | null = e.currentTarget.getAttribute("data-activity-id")
        if(id) selectActivity(id)
    }

    function handleDeleteActivity(e: React.MouseEvent<HTMLElement>) {
        const id: string | null = e.currentTarget.getAttribute("data-activity-id")
        if(id) {
            setTarget(id)
            deleteActivity(id)
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
                                        loading={isSubmitting && target === activity.id} 
                                        data-activity-id={activity.id} 
                                        floated="right" 
                                        content="Delete" 
                                        color="red" 
                                        onClick={handleDeleteActivity} 
                                    />
                                    <Button data-activity-id={activity.id} floated="right" content="View" color="blue" onClick={setSelectedActivity} />
                                    <Label basic content={activity.category} />
                                </Item.Extra>
                            </Item.Content>
                        </Item>
                    )
                })}
            </Item.Group>
        </Segment>
    )
}