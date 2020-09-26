import React, {useEffect, useState} from "react";
import GoogleMapReact from 'google-map-react';
import axios from 'axios';

import {
    Panel,
    PanelHeader,
    SimpleCell,
    View,
    FixedLayout,
    Button,
    Placeholder,
    Input,
    Div,
    FormStatus,
    Header,
    Radio,
    Separator,
    Checkbox,
    Textarea,
    FormLayout,
    FormLayoutGroup,
    SelectMimicry,
    Group,
    File, Avatar,

} from "@vkontakte/vkui";

import Icon56ErrorOutline from '@vkontakte/icons/dist/56/error_outline';
import Icon28DoneOutline from '@vkontakte/icons/dist/28/done_outline';
import Icon36HomeOutline from '@vkontakte/icons/dist/36/home_outline';
import Icon24Camera from "@vkontakte/icons/dist/24/camera";

import Stars from "./components/Stars";
import CircularProgressBar from "./components/CircleProgress";


const OldAddForm = ({
    go,
    goBack,

    activePanel,
    setDormitoryList,

    regionsList,
    citiesList,
    uniList,
    dormitoryList,

    selectedRegion,
    selectedCity,
    selectedUniversity,
    selectedDormitory,

    setRegion,
    setCity,
    setUniversity,
    setDormitory,

    customAddress,
    customCoordinates,
    customTitle,

    setAddress,
    setCoordinates,
    setTitle,

    ratingCondition,
    ratingCost,
    ratingPersonal,
    ratingLocation,
    ratingNoise,
    mainRating,

    setConditionRating,
    setCostRating,
    setPersonalRating,
    setLocationRating,
    setNoiseRating,
    setMainRating,

    previewPhotos,
    setPreviews
}) => {
    const [photoFiles, setPhotoFiles] = useState([])

    const onChange = e => {
        const { name, value } = e.currentTarget;

        if (name === 'custom_address') {
            setAddress(value)
        } else

        if (name === 'custom_title') {
            setTitle(value)
        }
    }

    const onChangeRating = e => {
        const {name, value} = e

        if (name === 'stars-condition'){
            setConditionRating(value);
        }
        if (name === 'stars-cost'){
            setCostRating(value);
        }
        if (name === 'stars-personal'){
            setPersonalRating(value);
        }
        if (name === 'stars-location'){
            setLocationRating(value);
        }
        if (name === 'stars-noise'){
            setNoiseRating(value);
        }
    }

    useEffect(() => {
        setMainRating(Math.fround((
            ratingCondition * 1.2 +
            ratingCost * 1.25 +
            ratingPersonal * 0.75 +
            ratingLocation * 1 +
            ratingNoise * 0.8
        ) / 5))
    }, [ratingNoise, ratingCost, ratingCondition, ratingLocation, ratingPersonal])

    const GoogleMap = () => (
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

    useEffect(() => {
        let FD = new FormData()
        let tempPreviews = []
        Array.from(photoFiles).forEach((file, index) => {
            FD.append('media' + index, file)
        })

        axios.post('https://your-dormitory.herokuapp.com/api/v1/upload_photos', FD).then(res => {
            console.log(res);
            res.data.forEach((item) => {
                tempPreviews.push(item)
            });
            setPreviews(prev => ([...prev, tempPreviews]))
        })
    }, [photoFiles])

    return (
        <View id="add_review_view" activePanel={activePanel}>
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
                            onClick={go}
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
                        <GoogleMap
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
                                }
                            }
                            disabled={!(customTitle && (customAddress || customCoordinates.lat))}
                        >
                            Подтвердить
                        </Button>
                    </Div>
                </FixedLayout>
            </Panel>
            <Panel id='grades_panel'>
                <PanelHeader>Оценка общежития</PanelHeader>
                <Div>
                    <FormStatus mode='default' header='Оцените ваше общежитие'>
                        Расставьте оценки по нескольким критериям, которые будут влиять на общий рейтинг общежития.
                        Следующим шагом вам будет предложено более подробно составить отзыв об общежитии.
                        <div className="circle-progress-wrap " style={{height: '75px', width: '75px', position: 'relative'}}>
                            <CircularProgressBar
                                strokeWidth="10"
                                sqSize="75"
                                percentage={Math.round(mainRating / 5 * 100)}
                            />
                        </div>
                    </FormStatus>
                    <Stars
                        id='stars-condition'
                        name='Ремонт и состояние общежития'
                        description='Характеристика, отражающая насколько приятно находиться и проживать в общежитии'
                        ratingValue={ratingCondition}
                        onChange={onChangeRating}
                    />
                    <Stars
                        id='stars-cost'
                        name='Цена'
                        description='Насколько дорого обходится общежитие относительно вашего личного бюджета.'
                        ratingValue={ratingCost}
                        onChange={onChangeRating}
                    />
                    <Stars
                        id='stars-personal'
                        name='Персонал'
                        description='Как быстро и качественно решаются проблемы, возникающие во время проживания в общежитии'
                        ratingValue={ratingPersonal}
                        onChange={onChangeRating}
                    />
                    <Stars
                        id='stars-location'
                        name='Расположение'
                        description='Как далеко расположено метро и прочий транспорт, насколько удобно добираться от общежития до учебных корпусов'
                        ratingValue={ratingLocation}
                        onChange={onChangeRating}
                    />
                    <Stars
                        id='stars-noise'
                        name='Шумоизоляция '
                        description='Шум шум шум пошумим блять'
                        ratingValue={ratingNoise}
                        onChange={onChangeRating}
                        sep
                    />
                </Div>

                <Div>
                    <Button
                        size='xl'
                        stretched
                        className='yellow-gradient'
                        data-goto='addPanel_questions_panel'
                        onClick={go}
                        disabled={!(ratingCondition && ratingCost && ratingPersonal && ratingLocation && ratingNoise)}
                    >
                        Дальше
                    </Button>
                </Div>
            </Panel>
            <Panel id='questions_panel'>
                {/*TODO: Создать и связать с корневым элементом*/}
                <PanelHeader>Отзыв</PanelHeader>

                <Div>
                    <FormStatus mode='default' header='Еще несколько вопросов...'>
                        Ответьте еще на пару вопросов и напишите небольшое ревью, чтобы чуть лучше рассказать об общежитии
                    </FormStatus>

                    <FormLayout>
                        <Group header={<Header mode='secondary'>Тип общежития</Header>} separator='show'>
                            <Radio name="radio_type" value="Блочный" description="Комнаты расположены на этаже по блокам" defaultChecked>Блочный</Radio>
                            <Radio name="radio_type" value="Коридорный" description="Комнаты расположены вдоль коридора">Коридорный</Radio>
                            <Radio name="radio_type" value="Квартирный" description="В каждой комнате собственный санузел и кухня">Квартирный</Radio>
                        </Group>

                        <Group header={<Header mode='secondary'>Цена и оплата</Header>} separator='hide'>
                            <Radio name="radio_billing" value="Помесячно" defaultChecked>Раз в месяц</Radio>
                            <Radio name="radio_billing" value="Посеместрово">Раз в семестр</Radio>
                            <Radio name="radio_billing" value="Погодично">Раз в год</Radio>
                            <Checkbox name='check_billing'>Можно оплатить картой или в интернет-банке</Checkbox>
                        </Group>
                        <FormLayoutGroup top="Стоимость за месяц" bottom="Оставьте поле пустым, если не знаете, сколько платите">
                            <Input type='number' max={99999} />
                        </FormLayoutGroup>
                        <Separator/>

                        <Group header={<Header mode='secondary'>Комнаты</Header>} separator='hide'>
                            <Checkbox name='check_beds'>Двухъярусные кровати</Checkbox>
                        </Group>
                        <FormLayoutGroup top="Количество человек в комнатах">
                            <Input type='number' max={20} />
                        </FormLayoutGroup>
                        <Separator/>

                        <Group header={<Header mode='secondary'>Комендантский час</Header>} separator='hide'>
                            <Checkbox name='check_beds'>Общежитие работает круглосуточно</Checkbox>
                        </Group>
                        <FormLayoutGroup top="Общежитие закрывают на ночь" bottom='Укажите период, в который обжщежитие закрыто'>
                            <Input type='time' />
                            <Input type='time' />
                        </FormLayoutGroup>
                        <Separator/>


                        <Group header={<Header mode='secondary'>Остальное</Header>} separator='hide'>
                            <Checkbox name='check_smoking'>В помещениях общежития разрешено курить</Checkbox>
                            <Checkbox name='check_billing'>В комнатах можно использовать электроприборы (чайник, мультиварка и т.п.)</Checkbox>
                            <Checkbox name='check_billing'>Есть интернет-провайдер</Checkbox>
                        </Group>
                    </FormLayout>
                </Div>
                <FixedLayout vertical='bottom'>
                    <Div>
                        <Button
                            size='xl'
                            stretched
                            className='yellow-gradient'
                            data-goto='addPanel_text_review_panel'
                            onClick={go}
                        >
                            Дальше
                        </Button>
                    </Div>
                </FixedLayout>
            </Panel>
            <Panel id='text_review_panel'>
                <PanelHeader>Отзыв</PanelHeader>

                <Div>
                    <FormStatus mode='default' header='Скажите пару слов'>
                        Напишите небольшой отзыв, который увидят все пользователи сервиса.<br/><br/>
                        <i>- О чем написать?</i><br/>
                        - Расскажите о том, как долго добираетесь до места учебы, с какими трудностями столкнулись при заселении,
                        отметьте плюсы и минусы общежития.
                    </FormStatus>

                    <FormLayout>
                        <Textarea top="Краткий отзыв" />
                        <File top="Загрузите фотографии общежития"
                              className='yellow-gradient'
                              before={<Icon24Camera />}
                              controlSize="l"
                              multiple
                              accept="image/*"
                              onChange={e => {setPhotoFiles(e.currentTarget.files)}}
                        >
                            Открыть галерею
                        </File>
                    </FormLayout>

                    <Div style={{display: 'flex'}}>
                        {
                            previewPhotos.map((item, index) => console.log(item))
                        }
                    </Div>
                </Div>
            </Panel>
        </View>
    )
}

export default OldAddForm;