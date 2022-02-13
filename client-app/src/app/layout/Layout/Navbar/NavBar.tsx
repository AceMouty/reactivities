import React from "react";
import { Button, Container, Menu } from "semantic-ui-react";
import { useStore } from "../../../stores/store";

interface Props {
    bg: string;
}

export default function NavBar({ bg }: Props) {
    const { activityStore } = useStore()

    function handleOpenForm() {
        activityStore.openActivityForm()
    }
    return (
        <Menu inverted fixed="top" className={bg}>
            <Container>
                <Menu.Item header>
                    <img src="/assets/Images/logo.png" alt="logo" style={{marginRight: "1rem"}}/>
                    Reactivites
                </Menu.Item>
                <Menu.Item name="activities" />
                <Menu.Item>
                    <Button onClick={handleOpenForm} positive content="Add Activity"/>
                </Menu.Item>
            </Container>
        </Menu>
    )
}