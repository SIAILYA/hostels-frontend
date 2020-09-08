import React from "react";
import {Panel, PanelHeader, Button, Placeholder} from "@vkontakte/vkui";
import Icon56AddCircleOutline from '@vkontakte/icons/dist/56/add_circle_outline';

const Add = ({go}) => {
    return (
        <Panel id="add_panel">
            <PanelHeader>Добавить</PanelHeader>
            <Placeholder
                icon={<Icon56AddCircleOutline width="120" height="120" style={{color: 'var(--yellow)'}} />}
                header='Ваши отзывы'
                action={
                    <Button
                        size="xl"
                        mode="primary"
                        className='yellow-gradient'
                        onClick={go}
                        data-goto='view_add_review_view'
                    >
                        Написать отзыв
                    </Button>
                }
            >
                Нет ни одного отзыва
            </Placeholder>
        </Panel>
    )
}

export default Add;