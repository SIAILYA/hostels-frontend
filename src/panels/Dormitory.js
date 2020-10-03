import {Button, Div, FixedLayout, Group, Panel, PanelHeader, Placeholder, SimpleCell} from "@vkontakte/vkui";
import Icon28DoneOutline from "@vkontakte/icons/dist/28/done_outline";
import Icon56ErrorOutline from "@vkontakte/icons/dist/56/error_outline";
import React, {useContext} from "react";
import {LocationContext, Navigation} from "../Contexts";


const DormitoryPanel = ({id}) => {
    const {go} = useContext(Navigation)
    const {dormitoryList, setDormitory, selectedDormitory} = useContext(LocationContext)

    return(
        <Panel id={id}>
            <PanelHeader>Выбор общежития</PanelHeader>

            {
                dormitoryList.length > 0 ?
                    <div>
                        <Div className='text-center'>
                            <Button
                                mode='outline'
                                style={{color: 'var(--yellow)!important'}}
                                onClick={go}
                                data-goto='addPanel_custom_dormitory_panel'
                            >
                                Общежития нет в списке?
                            </Button>
                        </Div>
                        <Group>
                            {
                                dormitoryList.map((item, index) => {
                                    delete item.grades;
                                    delete item.coordinates;
                                    return (
                                        <SimpleCell
                                            onClick={() => {setDormitory(item)}}
                                            key={index}
                                            after={selectedDormitory.id === item.id ? <Icon28DoneOutline /> : null}
                                            description={item.address}
                                        >
                                            {item.title}
                                        </SimpleCell>
                                    )
                                })
                            }
                        </Group>
                    </div>
                    :
                    <Div>
                        <Placeholder
                            icon={<Icon56ErrorOutline style={{color: 'var(--yellow)'}}/>}
                            header={'Мы не нашли общежитий'}
                            action={ <Button
                                size="xl"
                                mode="primary"
                                className='yellow-gradient'
                                onClick={go}
                                data-goto='addPanel_custom_dormitory_panel'
                            >
                                Указать адрес
                            </Button>}
                        >
                            Введите адрес вручную
                        </Placeholder>
                    </Div>
            }

            <FixedLayout vertical="bottom">
                <Div>
                    <Button
                        size='xl'
                        stretched
                        className='yellow-gradient'
                        data-goto='addPanel_grades_panel'
                        onClick={go}
                        disabled={!(selectedDormitory)}
                    >
                        Дальше
                    </Button>
                </Div>
            </FixedLayout>
        </Panel>
    )
}

export default DormitoryPanel;