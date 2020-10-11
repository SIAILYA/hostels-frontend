import React, {useContext} from "react";
import bridge from "@vkontakte/vk-bridge";

import {Button, Div, FixedLayout, Panel, PanelHeader} from "@vkontakte/vkui";

import {Navigation, ReviewsContext} from "../../Contexts";

import logo from "../../img/logo.svg"


const OnboardingHelloPanel = ({id}) => {
    const {setOnboardingPanel, accessToken, setActiveView} = useContext(Navigation)
    const {userRole, setUserRole} = useContext(ReviewsContext)


    return(
        <Panel id={id}>
            <PanelHeader separator={false}/>
            <Div>
                <div className="yellow-gradient-text hello" style={{textAlign: "center"}}>
                    Привет!
                </div>
                <div className="description-header" style={{textAlign: "center"}}>
                    Это "Твоё общежитие"
                </div>
                <div style={{textAlign: "center", marginTop: "20px"}} className="animate-up-down">
                    <img src={logo} alt="" width="200vh"/>
                </div>
                <div style={{textAlign: "center", marginTop: "25px"}}>
                    Сервис, который покажет десятки студенческих общежитий изнутри!
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
                            setOnboardingPanel("base_panel")
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

export default OnboardingHelloPanel;