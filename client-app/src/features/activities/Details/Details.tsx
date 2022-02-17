import * as React from "react"
import { observer } from "mobx-react-lite"
import { Link, useParams } from "react-router-dom"
import { Button, Card, Grid, Image } from "semantic-ui-react"
import Loader from "../../../app/layout/Loader"
import { useStore } from "../../../app/stores/store"
import ActivityDetailsHeader from "./ActivityDetailsHeader"
import ActivityDetailsInfo from "./ActivityDetailsInfo"
import ActivityDetailsChat from "./ActivityDetailsChat"
import ActivityDetailsSidebar from "./ActivityDetailsSidebar"

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
        <Grid>
            <Grid.Column width={10}>
                <ActivityDetailsHeader/>
                <ActivityDetailsInfo/>
                <ActivityDetailsChat/>
            </Grid.Column>
            <Grid.Column width={6}>
                <ActivityDetailsSidebar/>
            </Grid.Column>
        </Grid>
    )
}

export default observer(Details)