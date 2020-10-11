import React, {useContext} from "react";
import bridge from '@vkontakte/vk-bridge';

import {Group, Panel, PanelHeader, SimpleCell} from "@vkontakte/vkui";

import {LocationContext, Navigation} from "../../Contexts";


const CountryChoosePanel = ({id}) => {
    const {goBack, accessToken} = useContext(Navigation)
    const {countryList, setCountry, setUniversity, setCity} = useContext(LocationContext)

    return (
        <Panel id={id}>
            <PanelHeader>Выбор региона</PanelHeader>
            <Group>
                {
                    countryList.map((item, index) => {
                        return(
                            <SimpleCell
                                onClick={() => {
                                    goBack();
                                    setCity('')
                                    setUniversity('')
                                    setCountry(item);
                                    bridge.send(
                                        "VKWebAppCallAPIMethod",
                                        {
                                            "method": "database.getCities",
                                            "request_id": "getCities",
                                            "params": {
                                                "country_id": item.id,
                                                "v": "5.124",
                                                "access_token": accessToken,
                                            }
                                        })
                                }}
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