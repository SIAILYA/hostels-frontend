import React, {useContext, useState} from "react";
import {LocationContext, Navigation} from "../../Contexts";
import {Group, Panel, PanelHeader, Search, SimpleCell} from "@vkontakte/vkui";
import bridge from "@vkontakte/vk-bridge";

const UniversityChoosePanel = ({id}) => {
    const {goBack, accessToken} = useContext(Navigation)
    const {uniList, setUniversity, selectedCountry, selectedCity} = useContext(LocationContext)
    const [searchValue, setSearch] = useState('')


    return (
        <Panel id={id}>
            <PanelHeader>Выбор ВУЗа</PanelHeader>
            <Search value={searchValue} onChange={e => {
                setSearch(e.target.value);
                bridge.send(
                    "VKWebAppCallAPIMethod",
                    {
                        "method": "database.getUniversities",
                        "request_id": "getUniversities",
                        "params": {
                            "country_id": selectedCountry.id,
                            "city_id": selectedCity.id,
                            "q": searchValue,
                            "v": "5.124",
                            "access_token": accessToken,
                        }
                    })
            }}/>
            <Group>
                {
                    uniList.filter(({title}) => title.toLowerCase().indexOf(searchValue.toLowerCase()) > -1).map((item, index) => {
                        return(
                            <SimpleCell
                                onClick={() => {
                                    goBack();
                                    setUniversity(item)
                                    bridge.send(
                                        "VKWebAppCallAPIMethod",
                                        {
                                            "method": "database.getUniversities",
                                            "request_id": "getUniversities",
                                            "params": {
                                                "country_id": selectedCountry.id,
                                                "city_id": selectedCity.id,
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


export default UniversityChoosePanel;