import React from "react";
import { Container } from "semantic-ui-react";
import NavBar from "./Navbar"
import styles from "./styles.module.css"

export default function Layout({ children }){
    return(
        <>
            <NavBar bg={styles.bgGradient}/>
            <Container style={{marginTop: "7rem"}}>
                { children }
            </Container>
        </>
    )
}