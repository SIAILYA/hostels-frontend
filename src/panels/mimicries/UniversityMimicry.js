import React, {useContext} from "react";
import {LocationContext, Navigation} from "../../Contexts";
import {Group, Panel, PanelHeader, SimpleCell} from "@vkontakte/vkui";

const UniversityChoosePanel = ({id}) => {
    const {goBack} = useContext(Navigation)
    const {uniList, setUniversity} = useContext(LocationContext)

    return (
        <Panel id={id}>
            <PanelHeader>Выбор ВУЗа</PanelHeader>
            <Group>
                {
                    uniList.map((item, index) => {
                        return(
                            <SimpleCell
                                onClick={() => {goBack(); setUniversity(item)}}
                                key={index}
                                expandable
                            >
                                {item.title}
                            </SimpleCell>
                        )
                    })
                }
            </Group>
        </Panel>
    )
}


export default UniversityChoosePanel;