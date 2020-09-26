import {Button, Div, FormStatus, Panel, PanelHeader} from "@vkontakte/vkui";
import CircularProgressBar from "./components/CircleProgress";
import Stars from "./components/Stars";
import React, {useContext, useEffect} from "react";
import {Navigation, RatingContext} from "../Contexts";

const GradesPanel = ({id}) => {
    const {ratingCondition, setConditionRating,
        ratingCost, setCostRating,
        ratingPersonal, setPersonalRating,
        ratingLocation, setLocationRating,
        ratingNoise, setNoiseRating,
        mainRating, setMainRating} = useContext(RatingContext)
    const {go} = useContext(Navigation)

    useEffect(() => {
        setMainRating(Math.fround((
            ratingCondition * 1.2 +
            ratingCost * 1.25 +
            ratingPersonal * 0.75 +
            ratingLocation * 1 +
            ratingNoise * 0.8
        ) / 5))
    }, [ratingCondition, ratingPersonal, ratingLocation, ratingNoise, ratingCost, setMainRating])

    return (
        <Panel id={id}>
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
                    onChange={(e) => {
                        setConditionRating(e.value)}}
                />
                <Stars
                    id='stars-cost'
                    name='Цена'
                    description='Насколько дорого обходится общежитие относительно вашего личного бюджета.'
                    ratingValue={ratingCost}
                    onChange={(e) => {setCostRating(e.value)}}
                />
                <Stars
                    id='stars-personal'
                    name='Персонал'
                    description='Как быстро и качественно решаются проблемы, возникающие во время проживания в общежитии'
                    ratingValue={ratingPersonal}
                    onChange={(e) => {setPersonalRating(e.value)}}
                />
                <Stars
                    id='stars-location'
                    name='Расположение'
                    description='Как далеко расположено метро и прочий транспорт, насколько удобно добираться от общежития до учебных корпусов'
                    ratingValue={ratingLocation}
                    onChange={(e) => {setLocationRating(e.value)}}
                />
                <Stars
                    id='stars-noise'
                    name='Шумоизоляция '
                    description='Шум шум шум пошумим блять'
                    ratingValue={ratingNoise}
                    onChange={(e) => {setNoiseRating(e.value)}}
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
    )
}

export default GradesPanel;