import React from "react"
import { Dimmer, Loader as SemanticLoader } from "semantic-ui-react"

interface Props {
    inverted?: boolean,
    content?: string
}

export default function Loader({ inverted = true, content = "Loading..."}: Props) {
    return (
        <Dimmer style={{zIndex: "-1"}} active={true} inverted={inverted} >
            <SemanticLoader content={content}/>
        </Dimmer>
    )
}