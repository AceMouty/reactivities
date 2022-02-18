import * as React from "react"
import Calendar from "react-calendar"
import { Header, Menu } from "semantic-ui-react"
import styles from "./ActivitiesFilter.module.css"

export default function ActivitiesFilter() {
    return (
        <>
            <Menu vertical size="large" style={{width: "100%", marginTop: "2rem"}}>
                <Header icon="filter" attached color="teal" content="Filters"/>
                <Menu.Item content="All Activities"/>
                <Menu.Item content="I'm Hosting"/>
                <Menu.Item content="I'm Going"/>
            </Menu> 
            <Header />
            <Calendar className={styles.reactCalendar}/>
        </>
    )
}