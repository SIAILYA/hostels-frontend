import React, {useContext} from "react";

import {Group, Div, Panel, PanelHeader, Button, Placeholder, Avatar, Header, Cell} from "@vkontakte/vkui";
import {LocationContext, Navigation, ReviewsContext} from "../../Contexts";

import Icon28WriteOutline from '@vkontakte/icons/dist/28/write_outline';
import Icon56AddCircleOutline from '@vkontakte/icons/dist/56/add_circle_outline';


const Add = ({go}) => {
    const {fetchedUser, accessToken, getToken} = useContext(Navigation)
    const {userRole} = useContext(ReviewsContext)
    const {selectedUniversity} = useContext(LocationContext)

    const getDescription = () => {
        if (userRole !== "Студент") return userRole
        if (selectedUniversity.title) return userRole + " " + selectedUniversity.title
        return userRole
    }

    const description = getDescription()

    return (
        <Panel id="add_panel">
            <PanelHeader>Добавить</PanelHeader>
                <Div>
                    <Group header={<Header mode="secondary">Добро пожаловать!</Header>} separator="show">
                        <Cell
                            before={<Avatar size={40} src={fetchedUser.photo_200}/>}
                            size="m"
                            description={description}
                            asideContent={<Icon28WriteOutline className="yellow-gradient-text"/>}
                            data-goto="onboarding"
                            onClick={go}
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
        </Panel>
    )
}

export default Add;