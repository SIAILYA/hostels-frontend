import React, {useContext} from "react";
import bridge from '@vkontakte/vk-bridge';

import {Div, Avatar, Button, Cell, FixedLayout, Panel, Radio, SimpleCell, PanelHeader} from "@vkontakte/vkui";

import {Navigation, ReviewsContext} from "../../Contexts";

import abiturient from "../../img/abiturient.png"
import student from "../../img/student.png"
import just_interesting from "../../img/justinteresting.png"
import parent from "../../img/parent.png"


const RolePanel = ({id}) => {
    const {userRole, setUserRole} = useContext(ReviewsContext)
    const {fetchedUser, setActiveView, accessToken} = useContext(Navigation)
    const {setOnboardingPanel} = useContext(Navigation)


    return(
        <Panel id={id}>
            <PanelHeader separator={false}/>
            <Div>
                <div className="yellow-gradient-text who-are-you" style={{textAlign: "center"}}>
                    Кто вы?
                </div>
                <div className="description-header" style={{textAlign: "center"}}>
                    Расскажите поподробнее
                </div>
                <div style={{textAlign: "center", marginTop: "10px"}}>
                    Можете быть спокойны - эта информация не попадет в третьи руки, а нам она нужна чтобы лучше понять ваши потребности
                </div>
            </Div>

            <Div style={{marginTop: "10px", paddingBottom: "20vh"}}>
                <div style={{marginBottom: "15px"}}>
                    <SimpleCell
                        disabled
                        before={
                            <Avatar src={fetchedUser.photo_200}/>
                        }
                        description={userRole ? userRole : 'Статус не выбран'}
                    >
                        {fetchedUser.first_name} {fetchedUser.last_name}
                    </SimpleCell>
                </div>
                <div
                    className="role-choose"
                >
                    <Radio
                        name="role_radio"
                        defaultChecked={userRole === "Студент"}
                        onClick={() => {
                            setUserRole("Студент")
                        }}
                    >
                        <Cell
                            asideContent={
                                <img
                                    src={student}
                                    width={32}
                                    height={32}
                                    alt=""
                                />
                            }
                        >
                            Студент
                        </Cell>
                    </Radio>
                    <Radio
                        name="role_radio"
                        defaultChecked={userRole === "Абитуриент"}
                        onClick={() => {
                            setUserRole("Абитуриент")
                        }}
                    >
                        <Cell
                            asideContent={
                                <img
                                    src={abiturient}
                                    width={32}
                                    height={32}
                                    alt=""
                                />
                            }
                        >
                            Абитуриент
                        </Cell>
                    </Radio>
                    <Radio
                        name="role_radio"
                        defaultChecked={userRole === "Родитель"}
                        onClick={() => {
                            setUserRole("Родитель")
                        }}
                    >
                        <Cell
                            asideContent={
                                <img
                                    src={parent}
                                    width={32}
                                    height={32}
                                    alt=""
                                />
                            }
                        >
                            Родитель
                        </Cell>
                    </Radio>
                    <Radio
                        name="role_radio"
                        defaultChecked={userRole === "Интересующийся"}
                        onClick={() => {
                            setUserRole("Интересующийся")
                        }}
                    >
                        <Cell
                            asideContent={
                                <img
                                    src={just_interesting}
                                    width={32}
                                    height={32}
                                    alt=""
                                />
                            }
                            multiline
                        >
                            Мне просто интересно!
                        </Cell>
                    </Radio>
                </div>
            </Div>

            <FixedLayout vertical="bottom">
                <Div style={{textAlign: "center", backgroundColor: "var(--background_content)"}}>
                    <Button
                        className="yellow-gradient"
                        size="xl"
                        stretched
                        onClick={() => {
                            bridge.send("VKWebAppStorageSet", {"key": "default_role", "value": userRole});
                            if (!accessToken){
                                setOnboardingPanel("thanks_panel")
                            } else {
                                if (userRole !== "Студент"){
                                    setActiveView("epic_view")
                                } else {
                                    setOnboardingPanel("university_panel")
                                }
                            }
                        }}
                        disabled={!userRole}
                    >
                        Дальше
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

export default RolePanel;