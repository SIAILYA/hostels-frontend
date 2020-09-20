import React from "react";
import GoogleMapReact from 'google-map-react';
import {
    Panel,
    PanelHeader,
    SimpleCell,
    View,
    FixedLayout,
    Button,
    Placeholder, Input, Div, ModalRoot, ModalPage, ModalPageHeader
} from "@vkontakte/vkui";
import FormLayout from "@vkontakte/vkui/dist/components/FormLayout/FormLayout";
import FormLayoutGroup from "@vkontakte/vkui/dist/components/FormLayoutGroup/FormLayoutGroup";
import SelectMimicry from "@vkontakte/vkui/dist/components/SelectMimicry/SelectMimicry";
import Group from "@vkontakte/vkui/dist/components/Group/Group";
import Icon56ErrorOutline from '@vkontakte/icons/dist/56/error_outline';
import Icon28DoneOutline from '@vkontakte/icons/dist/28/done_outline';
import Icon36HomeOutline from '@vkontakte/icons/dist/36/home_outline';


const AddForm = ({
    go,
    goBack,
    activePanel,
    activeModal,
    regionsList,
    citiesList,
    uniList,
    dormitoryList,
    selectedRegion,
    selectedCity,
    selectedUniversity,
    setRegion,
    setCity,
    setUniversity,
    setDormitory,
    selectedDormitory,
    customAddress,
    customCoordinates,
    customTitle,
    setAddress,
    setCoordinates,
    setTitle,
    setDormitoryList,
    forceUpdate
}) => {

    const onChange = e => {
        const { name, value } = e.currentTarget;

        if (name === 'custom_address') {
            setAddress(value)
        } else

        if (name === 'custom_title') {
            setTitle(value)
        }
    }

    const AnyReactComponent = () => (
        <div
            style={{
                background: 'white',
                padding: '10px 10px',
                display: 'inline-flex',
                textAlign: 'center',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '100%',
                transform: 'translate(-50%, -50%)'}}
        >
            <Icon36HomeOutline style={{color: 'var(--yellow)'}}/>
        </div>
    );

    const modal = (
        <ModalRoot activeModal={activeModal} onClose={goBack}>
            <ModalPage onClose={goBack} id="address_modal" header={
                <ModalPageHeader>
                    Ввод адреса
                </ModalPageHeader>
            }>
                <div>
                    <FormLayout>
                        <FormLayoutGroup top="Адрес общежития" bottom="Введите адрес в произвольной форме или выберете точку на карте:">
                            <Input type='text' onChange={onChange}/>
                        </FormLayoutGroup>
                    </FormLayout>
                </div>
                <Div style={{height: '30vh', borderRadius: '15px', overflow: 'hidden', padding: 0, margin: '12px'}}>
                    <GoogleMapReact
                        bootstrapURLKeys={{ key: 'AIzaSyCTGj2Q0pCF-W-VAh8i2GImSUhXuxZF8yI'}}
                        defaultCenter={{
                            'lat': 59.95,
                            'lng': 30.33
                        }}
                        defaultZoom={11}
                    >
                    </GoogleMapReact>
                </Div>
            </ModalPage>
        </ModalRoot>
    );

    return (
        <View id="add_review_view" activePanel={activePanel} modal={modal}>
            <Panel id="location_panel">
                <PanelHeader>Расположение</PanelHeader>

                <FormLayout>
                    <FormLayoutGroup top="Общая инофрмация" bottom="Расскажите, к какому учебному заведению относится ваше общежитие">
                        <SelectMimicry
                            top="Выберите регион"
                            placeholder="Не выбран"
                            onClick={go}
                            data-goto='addPanel_region_choose'
                        >
                            {selectedRegion.title}
                        </SelectMimicry>

                        <SelectMimicry
                            top="Выберите город"
                            placeholder="Не выбран"
                            onClick={go}
                            data-goto='addPanel_city_choose'
                        >
                            {selectedCity.title}
                        </SelectMimicry>

                        <SelectMimicry
                            top="Выберите ВУЗ"
                            placeholder="Не выбран"
                            onClick={go}
                            data-goto='addPanel_uni_choose'
                        >
                            {selectedUniversity.title}
                        </SelectMimicry>
                    </FormLayoutGroup>
                </FormLayout>

                <FixedLayout vertical="bottom">
                    <Div>
                        <Button
                                size='xl'
                                stretched
                                className='yellow-gradient'
                                data-goto='addPanel_dormitory_panel'
                                onClick={go}
                                disabled={!(selectedRegion && selectedCity && selectedUniversity)}
                            >
                                Дальше
                            </Button>
                    </Div>
                </FixedLayout>
            </Panel>
            <Panel id='region_choose'>
                <PanelHeader>Выбор региона</PanelHeader>
                <Group>
                    {
                        regionsList.map((item, index) => {
                            return(
                            <SimpleCell
                                onClick={() => {goBack(); setRegion(item)}}
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
            <Panel id='city_choose'>
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
            <Panel id='uni_choose'>
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
            <Panel id='dormitory_panel'>
                <PanelHeader>Выбор общежития</PanelHeader>

                {
                    dormitoryList.length > 0 ?
                        <div>
                            <Div className='text-center'>
                                <Button
                                    mode='outline'
                                    style={{color: 'var(--yellow)!important'}}
                                    onClick={go}
                                    data-goto='addPanel_custom_address_panel'
                                >
                                    Общежития нет в списке?
                                </Button>
                            </Div>
                            <Group>
                                {
                                    dormitoryList.map((item, index) => {
                                        return (
                                            <SimpleCell
                                                onClick={() => {setDormitory(item)}}
                                                key={index}
                                                after={selectedDormitory.id === item.id ? <Icon28DoneOutline /> : null}
                                                description={item.address}
                                            >
                                                {item.title}
                                            </SimpleCell>
                                        )
                                    })
                                }
                            </Group>
                        </div>
                        :
                        <Div>
                            <Placeholder
                                icon={<Icon56ErrorOutline style={{color: 'var(--yellow)'}}/>}
                                header={'Мы не нашли общежитий'}
                                action={ <Button
                                    size="xl"
                                    mode="primary"
                                    className='yellow-gradient'
                                    onClick={go}
                                    data-goto='addPanel_custom_address_panel'
                                >
                                    Указать адрес
                                </Button>}
                            >
                                Введите адрес вручную
                            </Placeholder>
                        </Div>
                }

                <FixedLayout vertical="bottom">
                    <Div>
                        <Button
                            size='xl'
                            stretched
                            className='yellow-gradient'
                            data-goto='addPanel_grades_panel'
                            onClick={() => console.log(selectedDormitory)}
                            disabled={!(selectedDormitory)}
                        >
                            Дальше
                        </Button>
                    </Div>
                </FixedLayout>
            </Panel>
            <Panel id='custom_address_panel'>
                <PanelHeader>
                    Ввод адреса
                </PanelHeader>

                <div>
                    <FormLayout>
                        <FormLayoutGroup top="Название/номер общежития">
                            <Input type='text' onChange={onChange} name='custom_title'/>
                        </FormLayoutGroup>
                        <FormLayoutGroup top="Адрес общежития" bottom="Введите адрес в произвольной форме или выберете точку на карте:">
                            <Input type='text' onChange={onChange} name='custom_address'/>
                        </FormLayoutGroup>
                    </FormLayout>
                </div>
                <Div style={{height: '30vh', borderRadius: '15px', overflow: 'hidden', padding: 0, margin: '12px'}}>
                    <GoogleMapReact
                        bootstrapURLKeys={{ key: 'AIzaSyCTGj2Q0pCF-W-VAh8i2GImSUhXuxZF8yI'}}
                        defaultCenter={{
                            'lat': 59.95,
                            'lng': 30.33
                        }}
                        defaultZoom={11}
                        onClick={({lat, lng}) => setCoordinates({lat: lat, lng: lng})}
                    >
                        <AnyReactComponent
                            lat={customCoordinates.lat}
                            lng={customCoordinates.lng}
                        />

                    </GoogleMapReact>
                </Div>

                <FixedLayout vertical='bottom'>
                    <Div>
                        <Button
                            size='xl'
                            stretched
                            className='yellow-gradient'
                            data-goto='addPanel_grades_panel'
                            onClick={() => {
                                const randomId = Math.random()
                                forceUpdate();
                                setDormitory(
                                {
                                    'id': randomId,
                                    'title': customTitle,
                                    'address': customAddress,
                                    'coordinates': customCoordinates
                                });
                                setDormitoryList([...dormitoryList,
                                    {
                                    'id': randomId,
                                    'title': customTitle,
                                    'address': customAddress,
                                    'coordinates': customCoordinates
                                    }
                                ])
                                goBack();
                                forceUpdate();
                                }
                            }
                            disabled={!(customTitle && (customAddress || customCoordinates.lat))}
                        >
                            Подтвердить
                        </Button>
                    </Div>
                </FixedLayout>
            </Panel>
        </View>
    )
}

export default AddForm;