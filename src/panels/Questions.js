import React, {useContext} from "react";
import {
    Button, Caption,
    Checkbox,
    Div, FormLayout,
    FormLayoutGroup,
    FormStatus,
    Group,
    Header, Input, Panel,
    PanelHeader,
    Radio, Separator
} from "@vkontakte/vkui";
import {Navigation, QuestionsContext} from "../Contexts";


const QuestionsPanel = ({id}) => {
    const {go} = useContext(Navigation)
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


    return(
        <Panel id={id}>
            <PanelHeader>Отзыв</PanelHeader>

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
                        top="Стоимость за месяц"
                        // bottom="Укажите валюту, если оплата не в российских рублях"
                    >
                        <Input type='number'
                               max={100000}
                               value={cost}
                               onChange={e => setCost(e.target.value)}/>
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
                    <FormLayoutGroup top="Количество человек в комнатах">
                        <Input
                            type='number'
                            max={20}
                            value={peopleInRoom}
                            onChange={e => setPeopleInRoom(e.target.value)}
                        />
                    </FormLayoutGroup>
                    <Separator/>

                    <Group header={<Header mode='secondary'>Комендантский час</Header>} separator='hide'>
                        <Checkbox
                            name='check_work_always'
                            value={workAlways}
                            onChange={() => setWorkAlways(prev => !prev)}
                        >
                            Общежитие работает круглосуточно
                        </Checkbox>
                    </Group>
                    <FormLayoutGroup top="Общежитие закрывают на ночь" bottom='Укажите период, в который обжщежитие закрыто'>
                            <label>
                                <Input
                                    type='time'
                                    value={closedStart}
                                    disabled={!!workAlways}
                                    onChange={e => setClosedStart(e.target.value)}
                                />
                                <Caption className="FormLayout__row-top">С</Caption>
                            </label>
                            <label>
                                <Input
                                    type='time'
                                    value={closedEnd}
                                    disabled={!!workAlways}
                                    onChange={e => setClosedEnd(e.target.value)}
                                />
                                <Caption className="FormLayout__row-top">До</Caption>
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
                            В комнатах можно использовать электроприборы (например, чайник)</Checkbox>
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