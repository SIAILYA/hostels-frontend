import React, {useContext} from "react";
import bridge from '@vkontakte/vk-bridge';

import {Group, Div, Panel, PanelHeader, Button, Placeholder, Avatar, Header, Cell} from "@vkontakte/vkui";
import {Navigation, ReviewsContext} from "../../Contexts";

import Icon56AddCircleOutline from '@vkontakte/icons/dist/56/add_circle_outline';


const Add = ({go}) => {
    const {fetchedUser, accessToken, getToken} = useContext(Navigation)
    const {userRole} = useContext(ReviewsContext)

    return (
        <Panel id="add_panel">
            <PanelHeader>Добавить</PanelHeader>
                <Div>
                    <Group header={<Header mode="secondary">Добро пожаловать!</Header>} separator="show">
                        <Cell
                            before={<Avatar size={40} src={fetchedUser.photo_200}/>}
                            size="m"
                            description={userRole}
                        >
                            {fetchedUser.first_name} {fetchedUser.last_name}
                        </Cell>
                    </Group>
                </Div>
            <Placeholder
                icon={<Icon56AddCircleOutline width="120" height="120" className="yellow-gradient-text" />}
                header='Ваши отзывы'
                action={
                    <Button
                        size="xl"
                        mode="primary"
                        className='yellow-gradient'
                        onClick={accessToken ? go : () => {
                            getToken()
                            go( {currentTarget: {dataset: {goto: "view_add_review_view"}}})
                        }
                        }
                        data-goto='view_add_review_view'
                    >
                        Написать отзыв
                    </Button>
                }
            >
                Вы еще не оставили ни одного отзыва
            </Placeholder>
            <div style={{display: "flex"}}>
                <Button
                    onClick={() => {
                        bridge.send("VKWebAppStorageSet", {"key": "default_role", "value": ""});
                        bridge.send("VKWebAppStorageSet", {"key": "default_location", "value": ""});
                        bridge.send("VKWebAppStorageSet", {"key": "onboarding_showed", "value": ""});
                    }}
                >
                    Сбросить Storage
                </Button>
            </div>
        </Panel>
    )
}

export default Add;