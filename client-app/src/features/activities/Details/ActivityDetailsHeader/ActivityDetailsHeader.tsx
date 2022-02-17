import { observer } from 'mobx-react-lite';
import * as React from 'react'
import {Button, Header, Item, Segment, Image} from 'semantic-ui-react'
import { Activity } from '../../../../app/interfaces/Activity';
import styles from "./ActivityDetailsHeader.module.css"

interface Props {
    activity: Activity
}

// TODO: Fix image styling
export default observer (function ActivityDetailedHeader({activity}: Props) {
    return (
        <Segment.Group>
            <Segment basic attached='top' style={{padding: '0'}}>
                <Image src={`/assets/Images/categoryImages/${activity.category}.jpg`} fluid className={styles.activityImageStyle}/>
                <Segment className={styles.activityImageTextStyle} basic>
                    <Item.Group>
                        <Item>
                            <Item.Content>
                                <Header
                                    size='huge'
                                    content={activity.title}
                                    style={{color: 'white'}}
                                />
                                <p>{activity.date}</p>
                                <p>
                                    Hosted by <strong>Bob</strong>
                                </p>
                            </Item.Content>
                        </Item>
                    </Item.Group>
                </Segment>
            </Segment>
            <Segment clearing attached='bottom'>
                <Button color='teal'>Join Activity</Button>
                <Button>Cancel attendance</Button>
                <Button color='orange' floated='right'>
                    Manage Event
                </Button>
            </Segment>
        </Segment.Group>
    )
})