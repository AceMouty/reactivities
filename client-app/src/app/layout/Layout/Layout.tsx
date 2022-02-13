import React from "react";
import { Container } from "semantic-ui-react";
import NavBar from "./Navbar"
import styles from "./styles.module.css"

interface Props {
    children: React.ReactNode;
}

export default function Layout({ children }: Props){
    return(
        <>
            <NavBar bg={styles.bgGradient}/>
            <Container style={{marginTop: "7rem"}}>
                { children }
            </Container>
        </>
    )
}