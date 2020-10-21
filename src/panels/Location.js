import React, {useContext, useEffect, useState} from "react";
import bridge from '@vkontakte/vk-bridge';

import {
    Button,
    Div,
    FixedLayout,
    FormLayout,
    FormLayoutGroup, FormStatus,
    Panel,
    PanelHeader, PanelHeaderBack, PanelSpinner, Placeholder,
    SelectMimicry,
} from "@vkontakte/vkui";

import Icon24UserOutgoing from '@vkontakte/icons/dist/24/user_outgoing';

import {Navigation, LocationContext} from "../Contexts";
import {FailedSnackbar, SuccessSnackbar} from "./components/Snackbars";
import {Icon56ErrorOutline, Icon56LockOutline} from "@vkontakte/icons";


const LocationPanel = ({id, user}) => {
    const {
        selectedCountry, selectedCity, selectedUniversity,
        setCountry, setCity, setLocationSnackbar, locationSnackbar, setEducation, setUniversity
    } = useContext(LocationContext)
    const {go, goBack, accessToken, getToken, setToken} = useContext(Navigation)
    const [denied, setDenied] = useState(false)

    useEffect(() => {
        bridge.send("VKWebAppGetAuthToken", {"app_id": 7582793, "scope": ''})
            .then((res) => {
                setToken(res.access_token)
            })
            .catch(() => {
                setDenied(true)
            })
    }, [])

    return (
        <Panel id={id}>
            <PanelHeader left={<PanelHeaderBack className="yellow-gradient-text" onClick={goBack}/>}>Расположение</PanelHeader>
            {
                accessToken &&
                <Div>
                    <FormStatus header="Местоположение общежития">
                        Для начала расскажите, где расположено ваше общежитие и к какому ВУЗу оно относится
                    </FormStatus>
                </Div>
            }
            {
                !accessToken &&
                <div>
                    <Placeholder
                        header={!denied ? "Получаем разрешение" : "Предоставьте доступ"}
                        icon={!denied ? <PanelSpinner size="large" className="yellow-spinner"/> : <Icon56LockOutline className="yellow-gradient-text"/>}
                        action={
                            denied &&
                            <Button
                                size="xl"
                                className="yellow-gradient"
                                onClick={getToken}
                            >
                                Предоставить доступ
                            </Button>
                        }
                    >
                        Нам нужен доступ к вашей основной информации, чтобы вы смогли оставить свой отзыв
                    </Placeholder>
                </div>
            }
            {
                accessToken &&
                <FormLayout>
                    <FormLayoutGroup top="Общая информация" bottom="Расскажите, к какому учебному заведению относится ваше общежитие">
                        <SelectMimicry
                            top="Выберите страну"
                            placeholder="Страна не выбрана"
                            onClick={go}
                            data-goto='addPanel_country_choose'
                            disabled={!accessToken}
                        >
                            {selectedCountry.title}
                        </SelectMimicry>

                        <SelectMimicry
                            top="Выберите город"
                            placeholder="Город не выбран"
                            onClick={go}
                            data-goto='addPanel_city_choose'
                            disabled={!selectedCountry}
                        >
                            {selectedCity.title}
                        </SelectMimicry>

                        <SelectMimicry
                            top="Выберите ВУЗ"
                            placeholder="ВУЗ не выбран"
                            onClick={go}
                            data-goto='addPanel_uni_choose'
                            disabled={!selectedCity}
                        >
                            {selectedUniversity.title}
                        </SelectMimicry>
                    </FormLayoutGroup>
                </FormLayout>
            }
            {
                accessToken &&
                <div style={{display: 'flex', paddingBottom: "15vh"}}>
                    <Button
                        mode='outline'
                        style={{color: 'var(--yellow)!important', margin: 'auto'}}
                        onClick={() => {
                            setEducation().then(() => {
                                try {
                                    if (user.country && user.city.title && user.university.title) {
                                        setCountry(user.country)
                                        setCity(user.city)
                                        setUniversity(user.university)
                                        setLocationSnackbar(<SuccessSnackbar caption="Данные успешно заполнены!"
                                                                             onClose={setLocationSnackbar}
                                                                             duration={1000}/>)
                                    } else {
                                        if (user.country.title){
                                            setUniversity('')
                                            setCity('')
                                            setCountry(user.country)
                                        }
                                        if (user.city.title){
                                            setUniversity('')
                                            setCity(user.city)
                                        }
                                        if (user.university.title){
                                            setUniversity(user.university)
                                        }
                                        setLocationSnackbar(<FailedSnackbar caption="В профиле не хватает информации, заполните недостающие поля вручную"
                                                                            onClose={setLocationSnackbar}/>)
                                    }
                                } catch (e) {
                                    setLocationSnackbar(<FailedSnackbar caption="Что-то пошло не так... Заполните данные вручную"
                                                                        onClose={setLocationSnackbar}/>)
                                }
                            }
                            )
                        }}
                        before={<Icon24UserOutgoing/>}
                    >
                        Заполнить из профиля
                    </Button>
                </div>
            }
            {
                accessToken &&
                <FixedLayout vertical="bottom">
                    <Div>
                        <Button
                            size='xl'
                            stretched
                            className='yellow-gradient'
                            data-goto='addPanel_dormitory_panel'
                            onClick={() => {
                                go({currentTarget: {dataset: {goto: 'addPanel_dormitory_panel'}}})
                            }
                            }
                            disabled={!(selectedCountry.title && selectedCity.title && selectedUniversity.title)}
                        >
                            Дальше
                        </Button>
                    </Div>
                </FixedLayout>
            }
            {locationSnackbar}
        </Panel>
    )
}

export default LocationPanel;