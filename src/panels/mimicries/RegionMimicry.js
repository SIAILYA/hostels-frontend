import React, {useContext} from "react";
import {LocationContext, Navigation} from "../../Contexts";
import {Group, Panel, PanelHeader, SimpleCell} from "@vkontakte/vkui";

const CountryChoosePanel = ({id}) => {
    const {goBack} = useContext(Navigation)
    const {countryList, setCountry} = useContext(LocationContext)

    return (
        <Panel id={id}>
            <PanelHeader>Выбор региона</PanelHeader>
            <Group>
                {
                    countryList.map((item, index) => {
                        return(
                            <SimpleCell
                                onClick={() => {goBack(); setCountry(item)}}
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


export default CountryChoosePanel;