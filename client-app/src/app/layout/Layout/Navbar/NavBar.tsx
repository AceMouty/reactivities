import React from "react";
import { Button, Container, Menu } from "semantic-ui-react";

interface Props {
    bg: string;
    openForm: () => void;
}

export default function NavBar({ bg, openForm }: Props) {

    return (
        <Menu inverted fixed="top" className={bg}>
            <Container>
                <Menu.Item header>
                    <img src="/assets/Images/logo.png" alt="logo" style={{marginRight: "1rem"}}/>
                    Reactivites
                </Menu.Item>
                <Menu.Item name="activities" />
                <Menu.Item>
                    <Button onClick={openForm} positive content="Add Activity"/>
                </Menu.Item>
            </Container>
        </Menu>
    )
}