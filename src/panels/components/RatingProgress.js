import React from "react"
import {InfoRow, Progress, Cell} from "@vkontakte/vkui";


const RatingProgress = ({name, value}) => {
    return (
        <Cell
            asideContent={value}
        >
            <InfoRow header={name}>
                <Progress
                    value={
                        value * 20
                    }
                />
            </InfoRow>
        </Cell>
    )
}


export default RatingProgress;