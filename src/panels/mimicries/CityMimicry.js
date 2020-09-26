import React, {useContext, useState} from "react";
import bridge from "@vkontakte/vk-bridge";

import {Group, Panel, PanelHeader, ScreenSpinner, Search, SimpleCell} from "@vkontakte/vkui";
import {Navigation, LocationContext} from "../../Contexts";


const CityChoosePanel = ({id}) => {
    const {goBack, setPopout, accessToken} = useContext(Navigation)
    const {citiesList, setCity, selectedCountry} = useContext(LocationContext)
    const [searchValue, setSearch] = useState('')


    return (
        <Panel id={id}>
            <PanelHeader>Выбор города</PanelHeader>
            <Search value={searchValue} onChange={e => {
                setSearch(e.target.value);
                bridge.send(
                    "VKWebAppCallAPIMethod",
                    {
                        "method": "database.getCities",
                        "request_id": "getCities",
                        "params": {
                            "country_id": selectedCountry.id,
                            "q": searchValue,
                            "need_all": true,
                            "v": "5.124",
                            "access_token": accessToken,
                        }
                    })
            }}/>
            <Group>
                {
                    citiesList
                        .filter(({title}) => title.toLowerCase().indexOf(searchValue.toLowerCase()) > -1)
                        .map((item, index) => {
                        return(
                            <SimpleCell
                                onClick={() => {
                                    goBack();
                                    setCity(item);
                                    setPopout(<ScreenSpinner size='large' />);
                                    bridge.send(
                                        "VKWebAppCallAPIMethod",
                                        {
                                            "method": "database.getUniversities",
                                            "request_id": "getUniversities",
                                            "params": {
                                                "country_id": selectedCountry.id,
                                                "city_id": item.id,
                                                "count": 2000,
                                                "v": "5.124",
                                                "access_token": accessToken,
                                            }
                                        })
                                    bridge.send(
                                        "VKWebAppCallAPIMethod",
                                        {
                                            "method": "database.getCities",
                                            "request_id": "getCities",
                                            "params": {
                                                "country_id": selectedCountry.id,
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


export default CityChoosePanel;
