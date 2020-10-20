import React, {useContext} from "react";
import bridge from "@vkontakte/vk-bridge";

import {Button, Div, FixedLayout, Panel, PanelHeader} from "@vkontakte/vkui";

import {Navigation, ReviewsContext} from "../../Contexts";

import population from "../../img/population.svg"


const Base = ({id}) => {
    const {setOnboardingPanel, accessToken, setActiveView} = useContext(Navigation)
    const {userRole, setUserRole} = useContext(ReviewsContext)


    return(
        <Panel id={id}>
            <PanelHeader separator={false} transparent={true}/>
            <Div>
                <div className="yellow-gradient-text how" style={{textAlign: "center"}}>
                    Как это работает?
                </div>
                <div className="description-header" style={{textAlign: "center"}}>
                    Делитесь и узнавайте!
                </div>
                <div style={{textAlign: "center", marginTop: "20px"}} className="animate-up-down">
                    <img src={population} alt="" className="img-base"/>
                </div>
                <div style={{textAlign: "center", marginTop: "25px"}} className="hello-box">
                    База общежитий постоянно растет благодаря пользователям — присоединяйтесь к нашему сообществу!
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
                            setOnboardingPanel("role_panel")
                        }}
                    >
                        Вперед!
                    </Button>
                    <Button
                        size="m"
                        mode='tertiary'
                        style={{marginTop: "10px", color: "var(--yellow)"}}
                        onClick={() => {
                            setUserRole(prev => prev || "Интересующийся")
                            bridge.send("VKWebAppStorageSet", {"key": "default_role", "value": userRole});
                            if (!accessToken){
                                setOnboardingPanel("thanks_panel")
                            } else {
                                setActiveView("epic_view")
                            }
                        }}
                    >
                        Пропустить
                    </Button>
                </Div>
            </FixedLayout>
        </Panel>
    )
}

export default Base;