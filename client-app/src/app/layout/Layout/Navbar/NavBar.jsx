import React from "react";
import { Button, Container, Menu } from "semantic-ui-react";

export default function NavBar({ bg }) {
    return (
        <Menu inverted fixed="top" className={bg}>
            <Container>
                <Menu.Item header>
                    <img src="/assets/Images/logo.png" alt="logo" style={{marginRight: "1rem"}}/>
                    Reactivites
                </Menu.Item>
                <Menu.Item name="activities" />
                <Menu.Item>
                    <Button positive content="Add Activity"/>
                </Menu.Item>
            </Container>
        </Menu>
    )
}