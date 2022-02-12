import React, { MouseEventHandler } from "react";
import { Button, Item, Label, Segment } from "semantic-ui-react";
import { Activity } from "../../../../app/interfaces/Activity";

interface Props {
    activities: Activity[];
    selectActivity: (id: string) => void;
    deleteActivity: (id: string) => void;
}

export default function ActivityList({ activities, selectActivity, deleteActivity }: Props){

    function setSelectedActivity(e: any) {
        selectActivity(e.target.getAttribute("data-activity-id"))
    }

    function handleDeleteActivity(e: any) {
        deleteActivity(e.target.getAttribute("data-activity-id"))
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
                                    <Button data-activity-id={activity.id} floated="right" content="Delete" color="red" onClick={handleDeleteActivity} />
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