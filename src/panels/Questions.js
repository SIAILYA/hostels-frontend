import React, {useContext, useEffect, useState} from "react";
import {
    Button, Caption,
    Checkbox,
    Div, FormLayout,
    FormLayoutGroup,
    FormStatus,
    Group,
    Header, Input, Panel,
    PanelHeader,
    Radio, Separator, PanelHeaderBack
} from "@vkontakte/vkui";
import {Navigation, QuestionsContext} from "../Contexts";


const QuestionsPanel = ({id}) => {
    const {go, goBack} = useContext(Navigation)
    const {dormitoryType, setDormitoryType,
        payType, setPayType,
        cardPay, setCardPay,
        cost, setCost,
        twoLevelBed, setTwoLevelBed,
        balcony, setBalcony,
        plasticWindows, setPlasticWindows,
        peopleInRoom, setPeopleInRoom,
        workAlways, setWorkAlways,
        closedStart, setClosedStart,
        closedEnd, setClosedEnd,
        smoking, setSmoking,
        electricity, setElectricity,
        internet, setInternet} = useContext(QuestionsContext)

    const [costStatus, setCostStatus] = useState('default')
    const [pirStatus, setPirStatus] = useState('default')


    useEffect(() => {
        if (cost === ''){
        } else
        if (cost > 0){
            setCostStatus('valid')
        } else {
            setCostStatus('error')
        }

        if (peopleInRoom === ''){
        } else
        if (peopleInRoom > 0){
            setPirStatus('valid')
        } else {
            setPirStatus('error')
        }
    }, [peopleInRoom, cost])


    return(
        <Panel id={id}>
            <PanelHeader left={<PanelHeaderBack className="yellow-gradient-text" onClick={goBack}/>}>Отзыв</PanelHeader>

            <Div>
                <FormStatus mode='default' header='Еще несколько вопросов...'>
                    Ответьте еще на некоторые вопросы, которые помогут пользователям больше узнать о вашем общежитии.
                    Если не знаете или сомневаетесь в ответе - лучше пропустите поле
                </FormStatus>

                <FormLayout>
                    <Group header={<Header mode='secondary'>Тип общежития</Header>} separator='show'>
                        <Radio
                            name="radio_type"
                            value="Блочный"
                            description="Комнаты расположены на этаже по блокам"
                            checked={dormitoryType === "Блочный"}
                            onChange={() => setDormitoryType("Блочный")}
                        >
                            Блочный
                        </Radio>
                        <Radio
                            name="radio_type"
                            value="Коридорный"
                            description="Комнаты расположены вдоль коридора"
                            checked={dormitoryType === "Коридорный"}
                            onChange={() => setDormitoryType("Коридорный")}
                        >
                            Коридорный
                        </Radio>
                        <Radio
                            name="radio_type"
                            value="Квартирный"
                            description="В каждой комнате собственный санузел и кухня"
                            checked={dormitoryType === "Квартирный"}
                            onChange={() => setDormitoryType("Квартирный")}
                        >
                            Квартирный</Radio>
                    </Group>

                    <Group header={<Header mode='secondary'>Цена и оплата</Header>} separator='hide'>
                        <Radio
                            name="radio_billing"
                            value="monthly"
                            checked={payType === "Раз в месяц"}
                            onChange={() => setPayType("Раз в месяц")}
                        >
                            Раз в месяц
                        </Radio>
                        <Radio
                            name="radio_billing"
                            value="semestry"
                            checked={payType === "Раз в семестр"}
                            onChange={() => setPayType("Раз в семестр")}
                        >
                            Раз в семестр
                        </Radio>
                        <Radio
                            name="radio_billing"
                            value="yearly"
                            checked={payType === "Раз в год"}
                            onChange={() => setPayType("Раз в год")}
                        >
                            Раз в год
                        </Radio>
                        <Checkbox
                            name='check_billing'
                            value={cardPay}
                            onChange={() => {setCardPay(prev => !prev)}}
                        >
                            Можно оплатить картой или в интернет-банке
                        </Checkbox>
                    </Group>
                    <FormLayoutGroup
                        top={<div>Стоимость за месяц&#160;<a style={{color: "var(--red)"}}>*</a></div>}
                        bottom={<p>Одно число - сколько вы платите в <b>месяц</b></p>}
                    >
                        <Input type='number'
                               max={100000}
                               min={1}
                               value={cost}
                               placeholder={2200}
                               pattern="[0-9]{1,5}"
                               maxLength={5}
                               onChange={e => {
                                   const val = e.target.value.replaceAll(RegExp("[^0-9]", "g"), '')
                                   if (val.length > 0){
                                       console.log(val)
                                       if (parseInt(val) <= 10000 && parseInt(val) > 0) {
                                           setCost(parseInt(val))
                                       } else {
                                           setCost(prev => prev)
                                       }
                                   } else {
                                       setCost('')
                                       setCostStatus('error')
                                   }
                               }}
                               status={costStatus}
                        />
                    </FormLayoutGroup>
                    <Separator/>

                    <Group header={<Header mode='secondary'>Комнаты</Header>} separator='hide'>
                        <Checkbox
                            name='check_beds'
                            value={twoLevelBed}
                            onChange={() => setTwoLevelBed(prev => !prev)}
                        >
                            Двухъярусные кровати
                        </Checkbox>
                        <Checkbox
                            name='check_balcony'
                            value={balcony}
                            onChange={() => setBalcony(prev => !prev)}
                        >
                            В комнатах есть балконы
                        </Checkbox>
                        <Checkbox
                            name='check_windows'
                            value={plasticWindows}
                            onChange={() => setPlasticWindows(prev => !prev)}
                        >
                            Установлены пластиковые окна
                        </Checkbox>

                    </Group>
                    <FormLayoutGroup top={<div>Количество человек в комнатах&#160;<a style={{color: "var(--red)"}}>*</a></div>} bottom={<p>Одно число - количество человек в <b>вашей</b> комнате</p>}>
                        <Input
                            type='number'
                            max={20}
                            min={1}
                            pattern="[0-9]{1,2}"
                            value={peopleInRoom}
                            maxLength={2}
                            placeholder={3}
                            onChange={e => {
                                const val = e.target.value.replaceAll(RegExp("[^0-9]", "g"), '')
                                if (val.length > 0){
                                    if (parseInt(val) <= 20 && parseInt(val) > 0) {
                                        setPeopleInRoom(parseInt(val))
                                    } else {
                                        setPeopleInRoom(prev => prev)
                                    }
                                } else {
                                    setPeopleInRoom('')
                                    setPirStatus('error')
                                }
                            }}
                            status={pirStatus}
                        />
                    </FormLayoutGroup>
                    <Separator/>

                    <Group header={<Header mode='secondary'>Комендантский час&#160;<a style={{color: "var(--red)"}}>*</a></Header>} separator='hide'>
                        <Checkbox
                            name='check_work_always'
                            value={workAlways}
                            onChange={() => setWorkAlways(prev => !prev)}
                        >
                            Общежитие работает круглосуточно
                        </Checkbox>
                    </Group>
                    <FormLayoutGroup top="Общежитие закрывают на ночь" bottom='Укажите период, в который общежитие закрыто, либо отметьте круглосуточную работу'>
                            <label>
                                <Input
                                    type='time'
                                    value={closedStart}
                                    disabled={!!workAlways}
                                    onChange={e => setClosedStart(e.target.value)}
                                />
                                <Caption className="FormLayout__row-top">Со скольки</Caption>
                            </label>
                            <label>
                                <Input
                                    type='time'
                                    value={closedEnd}
                                    disabled={!!workAlways}
                                    onChange={e => setClosedEnd(e.target.value)}
                                />
                                <Caption className="FormLayout__row-top">До скольки</Caption>
                            </label>
                    </FormLayoutGroup>
                    <Separator/>

                    <Group header={<Header mode='secondary'>Остальное</Header>} separator='hide'>
                        <Checkbox
                            name='check_smoking'
                            value={smoking}
                            onChange={() => setSmoking(prev => !prev)}
                        >
                            В помещениях общежития разрешено курить
                        </Checkbox>
                        <Checkbox
                            name='check_electricity'
                            value={electricity}
                            onChange={() => setElectricity(prev => !prev)}
                        >
                            В комнатах можно использовать электроприборы (например, чайник или микроволновку)
                        </Checkbox>
                        <Checkbox
                            name='check_internet'
                            value={internet}
                            onChange={() => setInternet(prev => !prev)}
                        >
                            Есть интернет-провайдер
                        </Checkbox>
                    </Group>
                </FormLayout>
            </Div>

            <Div>
                <Button
                    size='xl'
                    stretched
                    className='yellow-gradient'
                    data-goto='addPanel_text_photo_panel'
                    onClick={go}
                    disabled={!cost || !peopleInRoom || !(workAlways || (closedStart && closedEnd))}
                >
                    Дальше
                </Button>
            </Div>
        </Panel>
    )
}

export default QuestionsPanel;