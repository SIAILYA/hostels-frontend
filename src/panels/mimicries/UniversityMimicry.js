import React, {useContext, useEffect, useState} from "react";
import bridge from "@vkontakte/vk-bridge";

import {Group, Panel, PanelHeader, PanelHeaderBack, PanelSpinner, Search, SimpleCell} from "@vkontakte/vkui";

import {LocationContext, Navigation} from "../../Contexts";
import Header from "@vkontakte/vkui/dist/components/Header/Header";
import Div from "@vkontakte/vkui/dist/components/Div/Div";


const UniversityChoosePanel = ({id}) => {
    const {goBack, accessToken} = useContext(Navigation)
    const {uniList, setUniversity, selectedCountry, selectedCity} = useContext(LocationContext)
    const [searchValue, setSearch] = useState('')
    const [loading, setLoading] = useState(false)
    const [intervalId, setIntervalId] = useState(0)

    useEffect(() => {
        clearTimeout(intervalId)
        if (searchValue){
            setLoading(true)
            setIntervalId(setTimeout(() => {
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
                    }).then(() => {
                    setLoading(false);
                })
            }, 600))
        } else {
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
                }).then(() => {
                setLoading(false);
            })
        }
    }, [searchValue])


    return (
        <Panel id={id}>
            <PanelHeader
                left={<PanelHeaderBack className="yellow-gradient-text" onClick={goBack}/>}
            >Выбор ВУЗа</PanelHeader>
            <Search value={searchValue} onChange={e => {setSearch(e.target.value.substr(0, 100))}}/>
            {
                !loading && uniList.filter(({title}) => title.toLowerCase().indexOf(searchValue.toLowerCase()) > -1).length === 0 &&
                <Div>
                    <Header mode="secondary" className="header-centered">Ничего не нашлось</Header>
                </Div>
            }
            {
                !loading ?
                    <Group>
                        {
                            uniList.filter(({title}) => title.toLowerCase().indexOf(searchValue.toLowerCase()) > -1).map((item, index) => {
                                return (
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
                    :
                    <PanelSpinner/>
            }
        </Panel>
    )
}


export default UniversityChoosePanel;