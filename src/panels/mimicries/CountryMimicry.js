import React, {useContext} from "react";
import bridge from '@vkontakte/vk-bridge';

import {LocationContext, Navigation} from "../../Contexts";
import {Group, Panel, PanelHeader, ScreenSpinner, SimpleCell} from "@vkontakte/vkui";


const CountryChoosePanel = ({id}) => {
    const {goBack, setPopout, accessToken} = useContext(Navigation)
    const {countryList, setCountry} = useContext(LocationContext)

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
                                    setCountry(item);
                                    setPopout(<ScreenSpinner size='large' />);
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