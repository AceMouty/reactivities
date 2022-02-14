import * as React from "react"
import { observer } from "mobx-react-lite"
import { useParams } from "react-router-dom"
import { Button, Card, Image } from "semantic-ui-react"
import Loader from "../../../../app/layout/Loader"
import { useStore } from "../../../../app/stores/store"

function Details() {
    const { activityStore } = useStore();
    const { id } = useParams<{id: string}>();
    const { selectedActivity: activity, loadActivity, initialLoading } = activityStore;

    React.useEffect(() => {
        function loadInitData() {
            if(id) loadActivity(id);
        }

        loadInitData();
    }, [id, loadActivity])

    if(initialLoading || !activity) return <Loader />

    return (
        <Card fluid>
            <Image src={`/assets/Images/categoryImages/${activity?.category}.jpg`} />
            <Card.Content>
            <Card.Header>{ activity?.title }</Card.Header>
            <Card.Meta>
                <span className='date'>{ activity?.date }</span>
            </Card.Meta>
            <Card.Description>
                { activity?.description }
            </Card.Description>
            </Card.Content>
            <Card.Content extra>
                <Button.Group widths={2}>
                    <Button 
                        basic 
                        color="blue" 
                        content="Edit" 
                        data-activity-id={activity?.id}
                    />
                    <Button basic color="grey" content="Cancel" />
                </Button.Group>
            </Card.Content>
        </Card>
    )
}

export default observer(Details)