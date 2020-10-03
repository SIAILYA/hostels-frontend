import React, {useContext, useEffect, useState} from "react";

import {
    ModalRoot,
    ModalPage,
    ModalPageHeader,
    usePlatform,
    ANDROID,
    IOS,
    PanelHeaderButton,
    Group, InfoRow,
    Cell,
    Header, FormStatus, Div
} from "@vkontakte/vkui";

import Icon24Cancel from "@vkontakte/icons/dist/24/cancel";
import Icon24Done from "@vkontakte/icons/dist/24/done";

import {Navigation, ReviewsContext} from "../Contexts";
import RatingProgress from "./components/RatingProgress";

import {
    Icon28ArmchairOutline, Icon28EmployeeOutline, Icon28GlobeOutline,
    Icon28HomeOutline, Icon28MenuOutline,
    Icon28MoneyCircleOutline,
    Icon28MoneyTransferOutline, Icon28SyncOutline, Icon28UserCircleOutline
} from "@vkontakte/icons";

import no_smoking from "../img/no-smoking.svg"
import electricity_img from "../img/electricity.svg"


const ReviewModal = () => {
    const platform = usePlatform();
    const {goBack, activeReviewModal} = useContext(Navigation)
    const {modalUserInfo, modalDormitoryInfo} = useContext(ReviewsContext)

    const [dormitoryType, setDormitoryType] = useState([])
    const [payType, setPayType] = useState([])
    const [cost, setCost] = useState([])
    const [cardPay, setCardPay] = useState([])

    const [balcony, setBalcony] = useState([])
    const [windows, setWindows] = useState([])
    const [twoLevelBeds, setTwoLevelBeds] = useState([])
    const [peopleInRoom, setPeopleInRoom] = useState([])

    const [workAlways, setWorkAlways] = useState([])
    const [operating, setOperating] = useState([])

    const [smoking, setSmoking] = useState([])
    const [electricity, setElectricity] = useState([])
    const [internet, setInternet] = useState([])

    /** @return Array<number> */
    const getMinAndMax = (arr) => {
        let [min, max] = [Math.min(...arr), Math.max(...arr)]

        return Array.from(new Set([min, max]))
    }

    useEffect(() => {
        if (modalDormitoryInfo.info && activeReviewModal === "dormitory_info"){
            setCost(getMinAndMax(modalDormitoryInfo.info.main_info.cost))
            setDormitoryType(modalDormitoryInfo.info.main_info.type)
            setCardPay(modalDormitoryInfo.info.main_info.card_pay)
            setPayType(modalDormitoryInfo.info.main_info.pay_type)

            setPeopleInRoom(getMinAndMax(modalDormitoryInfo.info.rooms.people_in_room))
            setBalcony(modalDormitoryInfo.info.rooms.balcony)
            setWindows(modalDormitoryInfo.info.rooms.plastic_windows)
            setTwoLevelBeds(modalDormitoryInfo.info.rooms.two_level_bed)

            setWorkAlways(modalDormitoryInfo.info.operating.work_always)

            setSmoking(modalDormitoryInfo.info.comfort.smoking)
            setElectricity(modalDormitoryInfo.info.comfort.electricity)
            setInternet(modalDormitoryInfo.info.comfort.internet)
        } else

        if (modalUserInfo && activeReviewModal === "user_review_info"){
            setCost([modalUserInfo.review.main_info.cost])
            setDormitoryType([modalUserInfo.review.main_info.type])
            setCardPay([modalUserInfo.review.main_info.card_pay])
            setPayType([modalUserInfo.review.main_info.pay_type])
            setPeopleInRoom([modalUserInfo.review.rooms.people_in_room])
            setBalcony([modalUserInfo.review.rooms.balcony])
            setWindows([modalUserInfo.review.rooms.plastic_windows])
            setTwoLevelBeds([modalUserInfo.review.rooms.two_level_bed])
            setWorkAlways([modalUserInfo.review.operating.work_always])
            setOperating([modalUserInfo.review.operating.closed.start, modalUserInfo.review.operating.closed.end])
            setSmoking([modalUserInfo.review.comfort.smoking])
            setElectricity([modalUserInfo.review.comfort.electricity])
            setInternet([modalUserInfo.review.comfort.internet])
        }
    }, [modalDormitoryInfo, modalUserInfo, activeReviewModal])


    return(
        <ModalRoot activeModal={activeReviewModal} onClose={() => {
            goBack()
        }}>
            <ModalPage
                id="dormitory_info"
                header={
                    <ModalPageHeader
                        left={(
                            <React.Fragment>
                                {platform === ANDROID && <PanelHeaderButton onClick={goBack}><Icon24Cancel className="yellow-gradient-text"/></PanelHeaderButton>}
                            </React.Fragment>
                        )}
                        right={(
                            <React.Fragment>
                                {platform === ANDROID && <PanelHeaderButton onClick={goBack}><Icon24Done className="yellow-gradient-text"/></PanelHeaderButton>}
                                {platform === IOS && <PanelHeaderButton onClick={goBack} className="yellow-color">Готово</PanelHeaderButton>}
                            </React.Fragment>
                        )}
                    >
                        Подробности
                    </ModalPageHeader>
                }
            >
                <Div>
                    <FormStatus header="Что значат цифры и проценты?">
                        Многие параметры нельзя оценить по шкале или простым ответом "да" или "нет".
                        Поэтому в качестве ответов на такие вопросы мы приводим статистику по ответам в их процентном соотношении
                    </FormStatus>
                </Div>
                <Group header={<Header mode="secondary">Тип</Header>}>
                    <Cell
                        before={<Icon28MenuOutline/>}
                        multiline
                    >
                        Блочный - {(dormitoryType.filter(x => x === "Блочный").length / dormitoryType.length * 100).toFixed(0)}%<br/>
                        Коридорный - {(dormitoryType.filter(x => x === "Коридорный").length / dormitoryType.length * 100).toFixed(0)}%<br/>
                        Квартирный - {(dormitoryType.filter(x => x === "Квартирный").length / dormitoryType.length * 100).toFixed(0)}%
                    </Cell>
                </Group>
                <Group header={<Header mode="secondary">Цена</Header>}>
                    <Cell
                        before={<Icon28MoneyCircleOutline/>}
                    >
                        <InfoRow header="Стоимомть">
                            {
                                cost.length === 1 ?
                                    cost[0] :
                                    cost[0] +  " - "  + cost[1] + "₽ в месяц"
                            }
                        </InfoRow>
                    </Cell>
                    <Cell
                        before={<Icon28MoneyTransferOutline/>}
                        multiline
                    >
                        <InfoRow header="Оплата картой">
                        </InfoRow>
                        {modalDormitoryInfo.info && modalDormitoryInfo.info.main_info.card_pay.filter(x => x === true).length / modalDormitoryInfo.info.main_info.card_pay.length * 100}% пользователей ответили, что поддерживается оплата картой
                    </Cell>
                    <Cell
                        before={<Icon28SyncOutline/>}
                        multiline
                    >
                        <InfoRow header="Регулярность">
                        </InfoRow>
                        Раз в год - {(payType.filter(x => x === "Раз в год").length / payType.length * 100).toFixed(0)}%<br/>
                        Раз в семестр - {(payType.filter(x => x === "Раз в семестр").length / payType.length * 100).toFixed(0)}%<br/>
                        Раз в месяц - {(payType.filter(x => x === "Раз в месяц").length / payType.length * 100).toFixed(0)}%
                    </Cell>
                </Group>
                <Group header={<Header mode="secondary">Условия</Header>}>
                    <Cell
                        before={<Icon28UserCircleOutline/>}
                    >
                        <InfoRow header="Человек в комнате">
                            {
                                peopleInRoom.length === 1 ?
                                    peopleInRoom[0] :
                                    peopleInRoom[0] +  " - "  + peopleInRoom[1]
                            }
                        </InfoRow>
                    </Cell>
                    <Cell
                        before={<Icon28ArmchairOutline/>}
                        multiline
                    >
                        <InfoRow header="Кровати">
                        </InfoRow>
                        {(twoLevelBeds.filter(x => x === true).length / twoLevelBeds.length * 100).toFixed(0)}
                        % пользователей ответили, что спят на двухъярусных кроватях
                    </Cell>
                    <Cell
                        before={<Icon28HomeOutline/>}
                        multiline
                    >
                        <InfoRow header="Балкон и окна">
                        </InfoRow>
                        {(balcony.filter(x => x === true).length / balcony.length * 100).toFixed(0)}
                        % пользователей ответили, что у них есть балкон<br/>
                        {(windows.filter(x => x === true).length / windows.length * 100).toFixed(0)}
                        % пользователей ответили, что окна пластиковые
                    </Cell>
                </Group>
                <Group
                    header={<Header mode="secondary">Режим работы</Header>}
                >
                    <Cell
                        before={<Icon28EmployeeOutline/>}
                        multiline
                        description="С более подробным режимом работы вы можете ознакомиться в отзывах пользователей"
                    >
                        <InfoRow header="Круглосуточная работа">
                        </InfoRow>
                        {(workAlways.filter(x => x === true).length / workAlways.length * 100).toFixed(0)}
                        % пользователей ответили, что общежитие работает круглосуточно
                    </Cell>
                </Group>
                <Group
                    header={<Header mode="secondary">Прочее</Header>}
                >
                    <Cell
                        before={<img src={no_smoking} alt="" width={28} className="Icon Icon--28 Icon--w-28 Icon--h-28"/>}
                        multiline
                    >
                        <InfoRow header="Курение">
                            {(smoking.filter(x => x === true).length / smoking.length * 100).toFixed(0)}
                            % пользователей ответили, что в общежитии можно курить
                        </InfoRow>
                    </Cell>
                    <Cell
                        before={<img src={electricity_img} alt="" width={28} className="Icon Icon--28 Icon--w-28 Icon--h-28"/>}
                        multiline
                        description="Такие электроприборы как микроволновка, мультиварка, чайник"
                    >
                        <InfoRow header="Электроприборы">
                        </InfoRow>
                        {(electricity.filter(x => x === true).length / electricity.length * 100).toFixed(0)}
                        % пользователей ответили, что в комнатах можно использовать электроприборы
                    </Cell>
                    <Cell
                        before={<Icon28GlobeOutline/>}
                        multiline
                    >
                        <InfoRow header="Интернет-провайдер">
                        </InfoRow>
                        {(internet.filter(x => x === true).length / internet.length * 100).toFixed(0)}

                        % пользователей ответили, что в общежитии есть провайдер
                    </Cell>
                </Group>
            </ModalPage>
            <ModalPage
                id="user_review_info"
                header={
                    <ModalPageHeader
                        left={(
                            <React.Fragment>
                                {platform === ANDROID && <PanelHeaderButton onClick={goBack}><Icon24Cancel className="yellow-gradient-text" /></PanelHeaderButton>}
                            </React.Fragment>
                        )}
                        right={(
                            <React.Fragment>
                                {platform === ANDROID && <PanelHeaderButton onClick={goBack}><Icon24Done className="yellow-gradient-text" /></PanelHeaderButton>}
                                {platform === IOS && <PanelHeaderButton className="yellow-color" onClick={goBack}>Готово</PanelHeaderButton>}
                            </React.Fragment>
                        )}
                    >
                        Подробности
                    </ModalPageHeader>
                }
            >
                <Group
                    header={<Header mode="secondary">Оценки</Header>}
                >
                    <RatingProgress
                        name="Общее состояние"
                        value={modalUserInfo.review && modalUserInfo.review.rating.condition}
                    />
                    <RatingProgress
                        name="Цена"
                        value={modalUserInfo.review && modalUserInfo.review.rating.cost}
                    />
                    <RatingProgress
                        name="Персонал"
                        value={modalUserInfo.review && modalUserInfo.review.rating.personal}
                    />
                    <RatingProgress
                        name="Расположение"
                        value={modalUserInfo.review && modalUserInfo.review.rating.location}
                    />
                    <RatingProgress
                        name="Шумоизоляция"
                        value={modalUserInfo.review && modalUserInfo.review.rating.noise}
                    />
                </Group>
                <Group header={<Header mode="secondary">Тип</Header>}>
                    <Cell
                        before={<Icon28MenuOutline/>}
                    >
                        <InfoRow>
                            {dormitoryType[0]}
                        </InfoRow>
                    </Cell>
                </Group>
                <Group header={<Header mode="secondary">Цена</Header>}>
                    <Cell
                        before={<Icon28MoneyCircleOutline/>}
                    >
                        <InfoRow header="Стоимомть">
                            {cost[0] ? cost[0] : " - "} руб. в месяц
                        </InfoRow>
                    </Cell>
                    <Cell
                        before={<Icon28MoneyTransferOutline/>}
                        multiline
                    >
                        <InfoRow header="Оплата картой">
                        </InfoRow>
                        {cardPay[0] ? "Есть" : "Нет"}
                    </Cell>
                    <Cell
                        before={<Icon28SyncOutline/>}
                        multiline
                    >
                        <InfoRow header="Регулярность">
                            {payType[0]}
                        </InfoRow>
                    </Cell>
                </Group>
                <Group header={<Header mode="secondary">Условия</Header>}>
                    <Cell
                        before={<Icon28UserCircleOutline/>}
                    >
                        <InfoRow header="Человек в комнате">
                            {peopleInRoom[0] ? peopleInRoom : " - "}
                        </InfoRow>
                    </Cell>
                    <Cell
                        before={<Icon28ArmchairOutline/>}
                        multiline
                    >
                        <InfoRow header="Кровати">
                        </InfoRow>
                        {twoLevelBeds[0] ? "Двухъярусные кровати" : "Одноярусные кровати"}
                    </Cell>
                    <Cell
                        before={<Icon28HomeOutline/>}
                        multiline
                    >
                        <InfoRow header="Балкон и окна">
                        </InfoRow>
                        {balcony[0] ? "Есть балкон" : "Нет балкона"}
                        <br/>
                        {windows[0] ? "Пластиковые окна" : "Обычные окна"}
                    </Cell>
                </Group>
                <Group
                    header={<Header mode="secondary">Режим работы</Header>}
                >
                    <Cell
                        before={<Icon28EmployeeOutline/>}
                        multiline
                    >
                        <InfoRow header="Круглосуточная работа">
                            {workAlways[0] ? "Работает круглосуточно" : "Закрывается на ночь"}
                        </InfoRow>
                        {operating[0] !== "" ?
                            <InfoRow header="Комендантский час">
                                {operating[0] + " - " + operating[1]}
                            </InfoRow>
                            : ""
                        }
                    </Cell>
                </Group>
                <Group
                    header={<Header mode="secondary">Прочее</Header>}
                >
                    <Cell
                        before={<img src={no_smoking} alt="" width={28} className="Icon Icon--28 Icon--w-28 Icon--h-28"/>}
                        multiline
                    >
                        <InfoRow header="Курение">
                            {smoking[0] ? "Здесь можно курить" : "Здесь не курят"}
                        </InfoRow>
                    </Cell>
                    <Cell
                        before={<img src={electricity_img} alt="" width={28} className="Icon Icon--28 Icon--w-28 Icon--h-28"/>}
                        multiline
                        description="Такие электроприборы как микроволновка, чайник, мультиварка"
                    >
                        <InfoRow header="Электроприборы">
                        </InfoRow>
                        {electricity[0] ? "Электроприборы разрешены" : "Электроприборы запрещены"}
                    </Cell>
                    <Cell
                        before={<Icon28GlobeOutline/>}
                        multiline
                    >
                        <InfoRow header="Интернет-провайдер">
                            {internet[0] ? "Интернет проведен" : "Интернет не проведен"}
                        </InfoRow>
                    </Cell>
                </Group>
            </ModalPage>
        </ModalRoot>
    )
}

export default ReviewModal;
