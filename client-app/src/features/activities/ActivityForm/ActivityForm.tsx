import { observer } from "mobx-react-lite";
import React, { ChangeEvent, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Button, Form, Segment } from "semantic-ui-react";
import Loader from "../../../app/layout/Loader";
import { useStore } from "../../../app/stores/store";
import { v4 as uuid } from "uuid"

function ActivityForm() {
    const history = useHistory()
    const { activityStore } = useStore()
    const { 
        loadActivity, 
        loading, 
        createNewActivity, 
        updateExistingActivity,
        initialLoading
     } = activityStore
    const { id } = useParams<{id: string}>()

    const [activity, setActivity] = React.useState({
        id: "",
        title: "",
        category: "",
        description: "",
        date: "",
        city: "",
        venue: ""
    })

    useEffect(() => {
        function init() {
            if(id) {
                loadActivity(id)
                .then(activity => {
                    if(activity) setActivity(activity);
                })
                .catch(err => console.log(err))
            }
        }

        init();
    }, [id, loadActivity])

    function handleSubmit(){
        if(activity.id.length === 0) {
            let newActivity = {...activity, id: uuid()}
            
            createNewActivity(newActivity)
            .then(() => history.push(`/activities/${newActivity.id}`))
            .catch(err => console.log(err))
            return;
        }

        updateExistingActivity(activity)
        .then(() => history.push(`/activities/${activity.id}`))
    }

    function handleInputChange(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>){
        const { name, value } = e.target;

        setActivity({...activity, [name]: value})
    }

    if (initialLoading) return <Loader />

    return (
        <Segment clearing>
            <Form onSubmit={handleSubmit} autoComplete="off">
                <Form.Input 
                    placeholder="Title"
                    name="title"
                    value={activity.title}
                    onChange={handleInputChange}
                />
                <Form.TextArea 
                    placeholder="Description"
                    name="description"
                    value={activity.description}
                    onChange={handleInputChange}
                />
                <Form.Input 
                    placeholder="Category"
                    name="category"
                    value={activity.category}
                    onChange={handleInputChange}
                />
                <Form.Input 
                    placeholder="Date"
                    name="date"
                    value={activity.date}
                    onChange={handleInputChange}
                    type="date"
                />
                <Form.Input 
                    placeholder="City"
                    name="city"
                    value={activity.city}
                    onChange={handleInputChange}
                />
                <Form.Input 
                    placeholder="Venue"
                    name="venue"
                    value={activity.venue}
                    onChange={handleInputChange}
                />
                <Button loading={loading} floated="right" positive type="submit" content="Submit" />
                <Button floated="right" type="button" content="Cancel" />
            </Form>
        </Segment>
    )
}

export default observer(ActivityForm)