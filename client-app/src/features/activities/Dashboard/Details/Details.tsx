import { observer } from "mobx-react-lite"
import { Button, Card, Image } from "semantic-ui-react"
import { useStore } from "../../../../app/stores/store"

function Details() {
    const { activityStore } = useStore()
    const { selectedActivity: activity } = activityStore

    function handleCancel() {
        activityStore.clearSelectedActivity()
    }

    function handleOpenActivityForm(e: any) {
        const id: string | null = e.target.getAttribute("data-activity-id")
        if(id) activityStore.openActivityForm(id);
    }

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
                        onClick={handleOpenActivityForm} 
                    />
                    <Button basic color="grey" content="Cancel" onClick={handleCancel}/>
                </Button.Group>
            </Card.Content>
        </Card>
    )
}

export default observer(Details)