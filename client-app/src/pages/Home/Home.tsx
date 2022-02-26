import { Link } from "react-router-dom";
import { Button, Header, Image, Segment } from "semantic-ui-react";
import styles from "./Home.module.css"

export default function Home() {
    return(
        <Segment inverted textAlign="center" vertical className={styles.masthead}>
                <Header as="h1" inverted className={styles.mainHeader}>
                    <Image 
                        size="massive" 
                        src="/assets/Images/logo.png" 
                        alt="logo"
                        style={{marginBottom: "1rem"}}
                    />
                    Reactivities
                </Header>
                <Header as="h2" className={styles.subHeader} inverted content="Welcome To Reactivites"/>
                <Button as={Link} className={styles.invertedButton} to="/activities" content="Take Me To The Activites" size="huge" inverted/>
        </Segment>
    )
}