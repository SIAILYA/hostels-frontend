import React, {useContext} from "react";
import bridge from "@vkontakte/vk-bridge";

import {Button, Div, FixedLayout, Panel, PanelHeader} from "@vkontakte/vkui";

import {Navigation, ReviewsContext} from "../Contexts";
import meter from "../img/meter.svg"

const Week = ({id}) => {
    const {setOnboardingPanel, accessToken, setActiveView, go, fetchMessagesAllow} = useContext(Navigation)
    const {userRole, setUserRole} = useContext(ReviewsContext)


    return(
        <Panel id={id}>
            <PanelHeader>Отзыв опубликован!</PanelHeader>
            <Div style={{paddingBottom: "20vh"}}>
                <div className="yellow-gradient-text how" style={{textAlign: "center"}}>
                    Опубликовано!
                </div>
                <div className="description-header" style={{textAlign: "center"}}>
                    Поучаствуйте в "Отзыве недели"!
                </div>
                <div style={{textAlign: "center", marginTop: "20px"}} className="animate-up-down">
                    <img src={meter} alt="" width="250vh"/>
                </div>
                <div style={{textAlign: "center", marginTop: "25px"}}>
                    Нши креативометры зашкаливают, вам явно нужно поучаствовать в битве за лучший отзыв! Для этого нужно разрешить сообществу отправлять вам сообщения. Обещаем без лишних рассылок!
                </div>
            </Div>
            <FixedLayout
                vertical="bottom"
            >
                <Div style={{textAlign: "center"}}>
                    <Button
                        className="yellow-gradient"
                        size="xl"
                        stretched
                        onClick={() => {
                            fetchMessagesAllow().then(res => {
                                if (res.result === true) {
                                    go({currentTarget: {dataset: {goto: "addPanel_preview_review_panel"}}})
                                }
                            })
                        }}
                    >
                        Предоставить
                    </Button>
                    <Button
                        size="m"
                        mode='tertiary'
                        style={{marginTop: "10px", color: "var(--yellow)"}}
                        onClick={() => {
                            go({currentTarget: {dataset: {goto: "addPanel_preview_review_panel"}}})
                        }}
                    >
                        Не хочу участвовать
                    </Button>
                </Div>
            </FixedLayout>
        </Panel>
    )
}

export default Week;