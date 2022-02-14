import React from "react";
import { NavLink } from "react-router-dom";
import { Button, Container, Menu } from "semantic-ui-react";
import { useStore } from "../../../stores/store";

interface Props {
    bg: string;
}

export default function NavBar({ bg }: Props) {

    return (
        <Menu inverted fixed="top" className={bg}>
            <Container>
                <Menu.Item as={NavLink} to="/" exact header>
                    <img src="/assets/Images/logo.png" alt="logo" style={{marginRight: "1rem"}}/>
                    Reactivites
                </Menu.Item>
                <Menu.Item as={NavLink} to="/activities" name="activities" />
                <Menu.Item >
                    <Button as={NavLink} to="/createActivity" positive content="Add Activity"/>
                </Menu.Item>
            </Container>
        </Menu>
    )
}