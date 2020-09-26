import React, {useContext} from "react";
import {
    Button,
    Div,
    FixedLayout,
    FormLayout,
    FormLayoutGroup,
    Panel,
    PanelHeader,
    SelectMimicry,
} from "@vkontakte/vkui";
import {Navigation, LocationContext} from "../Contexts";
import Icon24UserOutgoing from '@vkontakte/icons/dist/24/user_outgoing';
import {FailedSnackbar, SuccessSnackbar} from "./components/Snackbars";
import ScreenSpinner from "@vkontakte/vkui/dist/components/ScreenSpinner/ScreenSpinner";


const LocationPanel = ({id, user}) => {
    const {
        selectedCountry, selectedCity, selectedUniversity,
        setCountry, setCity, setLocationSnackbar, locationSnackbar, setEducation, setUniversity,
        getUniDormitories
    } = useContext(LocationContext)
    const {go, setPopout} = useContext(Navigation)

    return (
        <Panel id={id}>
            <PanelHeader>Расположение</PanelHeader>

            <FormLayout>
                <FormLayoutGroup top="Общая инофрмация" bottom="Расскажите, к какому учебному заведению относится ваше общежитие">
                    <SelectMimicry
                        top="Выберите страну"
                        placeholder="Страна не выбрана"
                        onClick={go}
                        data-goto='addPanel_country_choose'
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
            <div style={{display: 'flex'}}>
                <Button
                    mode='outline'
                    style={{color: 'var(--yellow)!important', margin: 'auto'}}
                    onClick={() => {
                        setEducation().then(() => {
                            try {
                                if (user.country && user.city && user.university) {
                                    setCountry(user.country)
                                    setCity(user.city)
                                    setUniversity(user.university)
                                    setLocationSnackbar(<SuccessSnackbar caption="Данные успешно заполнены!"
                                                                         onClose={setLocationSnackbar}
                                                                         duration={700}/>)
                                } else {
                                    if (user.country){
                                        setCountry(user.country)
                                    }
                                    if (user.city){
                                        setCity(user.city)
                                    }
                                    if (user.university){
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

            <FixedLayout vertical="bottom">
                <Div>
                    <Button
                        size='xl'
                        stretched
                        className='yellow-gradient'
                        data-goto='addPanel_dormitory_panel'
                        onClick={() => {
                            go({currentTarget: {dataset: {goto: 'addPanel_dormitory_panel'}}})
                            getUniDormitories()
                            setPopout(<ScreenSpinner size='large' />);
                        }
                        }
                        disabled={!(selectedCountry && selectedCity && selectedUniversity)}
                    >
                        Дальше
                    </Button>
                </Div>
            </FixedLayout>
            {locationSnackbar}
        </Panel>
    )
}

export default LocationPanel;