import React, {useContext} from "react";

import {Button, Card, Panel, PanelHeader, Cell, Div} from "@vkontakte/vkui";

import {Navigation, ReviewsContext} from "../Contexts";


const PreviewPanel = ({id}) => {
    const {review} = useContext(ReviewsContext)
    const {go} = useContext(Navigation)

    return (
        <Panel id={id}>
            <PanelHeader>
                Предпросмотр отзыва
            </PanelHeader>
            <Div>
                <Card>
                    <Cell>
                        123
                    </Cell>
                </Card>
            </Div>
            <Button
                data-goto="view_epic_view"
                onClick={go}
            >
                Домой
            </Button>
        </Panel>
    )
}


export default PreviewPanel;