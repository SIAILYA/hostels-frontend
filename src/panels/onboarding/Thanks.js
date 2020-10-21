import React, {useContext, useEffect, useState} from "react";
import bridge from '@vkontakte/vk-bridge';

import {
    Button,
    FixedLayout,
    Panel,
    Div,
    Alert,
    PanelHeader,
    Placeholder
} from "@vkontakte/vkui";

import {Navigation, ReviewsContext} from "../../Contexts";
import {Icon56LockOutline} from "@vkontakte/icons";


const ThanksPanel = ({id}) => {
    let {setActiveView, setOnboardingPopup, setToken, setOnboardingPanel, onOnboardingEnd, skip, history} = useContext(Navigation)
    const {userRole, } = useContext(ReviewsContext)
    const [denied, setDenied] = useState(false)


    useEffect(() => {
        bridge.send("VKWebAppGetAuthToken", {"app_id": 7582793, "scope": ''})
            .then((res) => {
                setToken(res.access_token)
                bridge.send("VKWebAppStorageSet", {"key": "onboarding_showed", "value": "true"});
                setTimeout(() => {
                    if (userRole === "Студент" && !skip){
                        setOnboardingPanel("university_panel")
                    } else {
                        setActiveView('epic_view')
                    }
                    setOnboardingPopup(null)
                }, 800)
            })
            .catch(() => {
                setDenied(true)
            })
    }, [])


    return(
        <Panel id={id}>
            <PanelHeader separator={false} transparent={true}/>
            <Div>
                <div className="yellow-gradient-text super" style={{textAlign: "center"}}>
                    Отлично!
                </div>
                <div className="description-header" style={{textAlign: "center"}}>
                    Рады знакомству
                </div>
                <Placeholder
                    header="Получаем разрешение"
                    icon={<Icon56LockOutline className="yellow-gradient-text"/>}
                    action={
                        denied &&
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
                                            onOnboardingEnd()
                                            setActiveView('epic_view')
                                        }
                                    })
                            }}
                        >
                            Предоставить доступ
                        </Button>
                    }
                >
                    Нам нужен доступ к вашим данным чтобы приложение корректно работало, а вы могли отставлять отзывы
                </Placeholder>
                {/*<div style={{textAlign: "center", marginTop: "25px"}}>*/}
                {/*    Чтобы все работало, предоставьте доступ к вашей информации*/}
                {/*</div>*/}
            </Div>

            <FixedLayout vertical="bottom">
                <Div style={{textAlign: "center", backgroundColor: "var(--background_content)"}}>
                    <Button
                        size="m"
                        mode='tertiary'
                        style={{marginTop: "10px", color: "var(--yellow)"}}
                        onClick={() => {
                            window.history.pushState( {panel: 'onboardingAlert'}, 'onboardingAlert' );
                            history.push( 'onboardingAlert' );
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
                                                        onOnboardingEnd()
                                                        setActiveView('epic_view')
                                                    }
                                            })
                                        }
                                    }, {
                                        title: 'Не предоставлять',
                                        autoclose: true,
                                        action: () => {
                                            onOnboardingEnd()
                                            setActiveView("epic_view")
                                            bridge.send("VKWebAppStorageSet", {"key": "onboarding_showed", "value": "true"});
                                        }
                                    }]}
                                    onClose={() => setOnboardingPopup('')}
                                >
                                    <h2>Вы уверены?</h2>
                                    <p>Без вашего разрешения будет недоступна большая часть функционала сервиса (не получится искать общежития и добавлять отзывы)</p>
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