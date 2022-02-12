import React, { ChangeEvent } from "react";
import { Button, Form, Segment } from "semantic-ui-react";
import { Activity } from "../../../../app/interfaces/Activity";

interface Props {
    activity: Activity | null;
    closeForm: () => void;
    createOrUpdateActivity: (activity: Activity) => void;
}

export default function ActivityForm({ activity: selectedActivity, closeForm, createOrUpdateActivity }: Props) {
    const initialState = selectedActivity ?? {
        id: "",
        title: "",
        category: "",
        description: "",
        date: "",
        city: "",
        venue: ""
    }

    const [activity, setActivity] = React.useState(initialState)

    function handleSubmit(){
        createOrUpdateActivity(activity)
    }

    function handleInputChange(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>){
        const { name, value } = e.target;

        setActivity({...activity, [name]: value})
    }

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
                <Button floated="right" positive type="submit" content="Submit" />
                <Button onClick={closeForm} floated="right" type="button" content="Cancel" />
            </Form>
        </Segment>
    )
}