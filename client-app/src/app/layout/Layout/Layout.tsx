import React from "react";
import { Container } from "semantic-ui-react";
import NavBar from "./Navbar"
import styles from "./styles.module.css"

interface Props {
    openForm: () => void;
    children: React.ReactNode;
}

export default function Layout({ children, openForm }: Props){
    return(
        <>
            <NavBar bg={styles.bgGradient} openForm={openForm}/>
            <Container style={{marginTop: "7rem"}}>
                { children }
            </Container>
        </>
    )
}