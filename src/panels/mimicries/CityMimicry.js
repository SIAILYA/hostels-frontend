import {Group, Panel, PanelHeader, SimpleCell} from "@vkontakte/vkui";
import React, {useContext} from "react";
import {Navigation, LocationContext} from "../../Contexts";


const CityChoosePanel = ({id}) => {
    const {goBack} = useContext(Navigation)
    const {citiesList, setCity} = useContext(LocationContext)

    return (
        <Panel id={id}>
            <PanelHeader>Выбор города</PanelHeader>
            <Group>
                {
                    citiesList.map((item, index) => {
                        return(
                            <SimpleCell
                                onClick={() => {goBack(); setCity(item)}}
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


export default CityChoosePanel;
