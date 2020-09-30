import React, {useContext} from "react";

import {Button, Div, FixedLayout, Panel} from "@vkontakte/vkui";

import {Navigation} from "../../Contexts";


const OnboardingHelloPanel = ({id}) => {
    const {setOnboardingPanel} = useContext(Navigation)


    return(
        <Panel id={id}>
            <Div>
                <div className="yellow-gradient-text hello" style={{textAlign: "center", marginTop: "5vh"}}>
                    Привет!
                </div>
                <div className="description-header" style={{textAlign: "center"}}>
                    Это "Твоё общежитие"
                </div>
                <div style={{textAlign: "center", marginTop: "10px"}}>
                    Сервис, который покажет десятки студенческих общежитий изнутри и позволит рассказать о вашем общежитии другим!
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
                        onClick={() => {setOnboardingPanel("role_panel")}}
                    >
                        Вперед!
                    </Button>
                    <Button
                        size="m"
                        mode='tertiary'
                        style={{marginTop: "10px", color: "var(--yellow)"}}
                        onClick={() => setOnboardingPanel("thanks_panel")}
                    >
                        Пропустить
                    </Button>
                </Div>
            </FixedLayout>
        </Panel>
    )
}

export default OnboardingHelloPanel;