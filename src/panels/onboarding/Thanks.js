import React, {useContext} from "react";
import bridge from '@vkontakte/vk-bridge';

import {Button, FixedLayout, Panel, Div, Alert} from "@vkontakte/vkui";

import {Navigation, ReviewsContext} from "../../Contexts";


const ThanksPanel = ({id}) => {
    let {setActiveView, setOnboardingPopup, setToken, setOnboardingPanel} = useContext(Navigation)
    const {userRole, } = useContext(ReviewsContext)



    return(
        <Panel id={id}>
            <Div>
                <div className="yellow-gradient-text super" style={{textAlign: "center", marginTop: "5vh"}}>
                    Отлично!
                </div>
                <div className="description-header" style={{textAlign: "center"}}>
                    Рады знакомству
                </div>
                <div style={{textAlign: "center", marginTop: "10px"}}>
                    Чтобы все корректно работало предоставьте доступ к вашей общей информации
                </div>
            </Div>

            <FixedLayout vertical="bottom">
                <Div style={{textAlign: "center", backgroundColor: "var(--background_content)"}}>
                    <Button
                        className="yellow-gradient"
                        size="xl"
                        stretched
                        onClick={() => {
                            bridge.send("VKWebAppGetAuthToken", {"app_id": 7582793, "scope": ''})
                                .then((res) => {
                                    setToken(res.access_token)
                                    bridge.send("VKWebAppStorageSet", {"key": "onboarding_showed", "value": "true"});
                                    if (userRole === "Студент"){
                                        setOnboardingPanel("university_panel")
                                    } else {
                                        setActiveView('epic_view')
                                    }
                            })
                        }}
                    >
                        Предоставить доступ
                    </Button>
                    <Button
                        size="m"
                        mode='tertiary'
                        style={{marginTop: "10px", color: "var(--yellow)"}}
                        onClick={() => {
                            setOnboardingPopup(
                                <Alert
                                    actionsLayout="vertical"
                                    actions={[{
                                        title: 'Предоставить доступ',
                                        autoclose: true,
                                        mode: "cancel",
                                        action: () => {
                                            bridge.send("VKWebAppGetAuthToken", {"app_id": 7582793, "scope": ''})
                                                .then((res) => {
                                                    setToken(res.access_token)
                                                    bridge.send("VKWebAppStorageSet", {"key": "onboarding_showed", "value": "true"});
                                                    if (userRole === "Студент"){
                                                        setOnboardingPanel("university_panel")
                                                    } else {
                                                        setActiveView('epic_view')
                                                    }
                                            })
                                        }
                                    }, {
                                        title: 'Не предоставлять',
                                        autoclose: true,
                                        action: () => {
                                            setActiveView("epic_view")
                                            bridge.send("VKWebAppStorageSet", {"key": "onboarding_showed", "value": "true"});
                                        }
                                    }]}
                                    onClose={() => setOnboardingPopup('')}
                                >
                                    <h2>Вы уверены?</h2>
                                    <p>Без вашего разрешения не будет доступна большая часть функционала сервиса (не получится искать общежития и добавлять отзывы)</p>
                                </Alert>
                            )
                        }}
                    >
                        Не хочу предоставлять доступ
                    </Button>
                </Div>
            </FixedLayout>
        </Panel>
    )
}

export default ThanksPanel;