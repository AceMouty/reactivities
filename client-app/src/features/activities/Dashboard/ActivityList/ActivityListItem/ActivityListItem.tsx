import * as React from "react"
import { Link } from "react-router-dom";
import { Button, Icon, Item, Label, Segment } from "semantic-ui-react";
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
        <Segment.Group>
            <Segment>
                <Item.Group>
                    <Item>
                        <Item.Image size="tiny" circular src={`/assets/Images/user.png`} />
                        <Item.Content>
                            <Item.Header 
                                as={Link} 
                                to={`/activities/${activity.id}`}
                            >
                                { activity.title }
                            </Item.Header>
                            <Item.Description>
                                Hosted By John
                            </Item.Description>
                        </Item.Content>
                    </Item>
                </Item.Group>
            </Segment>
            <Segment>
                <span>
                    <Icon name="clock"/> {activity.date}
                    <Icon name="marker"/> {activity.venue}
                </span>
            </Segment>
            <Segment secondary>
                Atendees Here
            </Segment>
            <Segment >
                {activity.description}
                <Button 
                    as={Link} 
                    to={`/activities/${activity.id}`}
                    color="teal"
                    floated="right"
                    content="View"
                />
            </Segment>
        </Segment.Group>
    )
}

export default ActivityListItem;