import * as React from "react"
import { Link } from "react-router-dom";
import { Button, Item, Label } from "semantic-ui-react";
import { Activity } from "../../../../../app/interfaces/Activity"
import { useStore } from "../../../../../app/stores/store";

interface Props {
    activity: Activity
}

function ActivityListItem({ activity }: Props) {

    // TODO: figure out a better way to track the clicked element
    const [target, setTarget] = React.useState("")
    const { activityStore } = useStore()

    const { deleteExistingActivity, loading} = activityStore

    function handleDeleteActivity(e: React.MouseEvent<HTMLElement>) {
        const id: string | null = e.currentTarget.getAttribute("data-activity-id")
        if(id) {
            setTarget(id)
            deleteExistingActivity(id)
        }
    }

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
                    <Button 
                        as={Link}
                        to={`/activities/${activity.id}`}
                        data-activity-id={activity.id} 
                        floated="right" 
                        content="View" 
                        color="blue" 
                    />
                    <Label basic content={activity.category} />
                </Item.Extra>
            </Item.Content>
        </Item>
    )
}

export default ActivityListItem;