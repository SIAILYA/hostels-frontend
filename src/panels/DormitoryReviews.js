import React, {useContext, useRef} from "react"

import {
    Panel,
    PanelHeader,
    Div,
    Group,
    Gallery,
    Header,
    PanelHeaderContent,
    PanelHeaderBack,
    Card,
    Cell, FixedLayout
} from "@vkontakte/vkui";

import Icon28PollSquareOutline from "@vkontakte/icons/dist/28/poll_square_outline";

import CircularProgressBar from "./components/CircleProgress";
import Review from "./components/Review";
import RatingProgress from "./components/RatingProgress";

import reviews from "./reviews.json"
import dormitory from "./dormitory.json"
import {Navigation, ReviewsContext} from "../Contexts";



const DormitoryReviews = ({id}) => {
    const {go, goBack} = useContext(Navigation)
    const {setModalDormitoryInfo} = useContext(ReviewsContext)

    const sum = (arr) => {
        let sum = 0;
        for( let i = 0; i < arr.length; i++ ){
            sum += arr[i];
        }
        return sum
    }

    const avg = (arr) => {
        return (sum(arr)/arr.length).toFixed(1);
    }

    const averages = useRef({
        main: avg(dormitory.grades.main),
        condition: avg(dormitory.grades.condition),
        cost: avg(dormitory.grades.cost),
        location: avg(dormitory.grades.location),
        personal: avg(dormitory.grades.personal),
        noise: avg(dormitory.grades.noise)
    })


    return(
        <Panel id={id}>
            <PanelHeader
                left={<PanelHeaderBack className="yellow-gradient-text" onClick={goBack}/>}
            >
                <PanelHeaderContent
                    status="СПбГУПТД, Общежитие №3"
                >
                    Отзывы
                </PanelHeaderContent>
            </PanelHeader>

            <Div>
                <Group>
                    <Gallery
                        slideWidth="100%"
                        style={{ height: "40vh", borderRadius: '10px', overflow: "hidden" }}
                        bullets="light"
                        align="center"
                    >
                        {
                            dormitory.photos.map((item, index) => {
                                return(
                                    <div className="Gallery__slide" key={index}>
                                        {
                                            index === 0 &&
                                            <FixedLayout
                                                style={{marginTop: 0, padding: "0", width: "100%", textAlign: "center"}}
                                            >
                                                <Div
                                                    style={{background: "linear-gradient(180deg, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0))", overflow: "hidden", padding: "24px 0", color: "#f9f9f9"}}
                                                >
                                                    {dormitory.title}, {dormitory.address}
                                                </Div>
                                            </FixedLayout>
                                        }
                                        <img
                                            src={item}
                                            alt=""
                                            style={{objectFit: "cover"}}
                                        />
                                    </div>
                                )
                            })
                        }
                    </Gallery>
                </Group>
            </Div>
            <Div>
                <Card
                    style={{overflow: "hidden"}}
                >
                    <Header style={{display: "flex", justifyContent: "center"}}>Рейтинг общежития</Header>
                    <div className="circle-progress-wrap " style={{height: '55px', width: '55px', position: 'relative'}}>
                        <CircularProgressBar
                            strokeWidth="8"
                            sqSize="55"
                            percentage={averages.current.main * 20}
                            sm={true}
                        />
                    </div>

                    <Group
                        header={<Header mode="secondary">Оценки</Header>}
                    >
                        <RatingProgress name="Шумоизоляция" value={averages.current.noise}/>
                        <RatingProgress name="Общее состояние" value={averages.current.condition}/>
                        <RatingProgress name="Цена" value={averages.current.cost}/>
                        <RatingProgress name="Персонал" value={averages.current.personal}/>
                        <RatingProgress name="Расположение" value={averages.current.location}/>
                    </Group>
                    <Cell
                        description="Режим работы, удобства, стоимость"
                        asideContent={<Icon28PollSquareOutline className="yellow-gradient-text"/>}
                        onClick={() => {
                            setModalDormitoryInfo(dormitory)
                            go({currentTarget: {dataset: {goto: "reviewModal_dormitory_info"}}})
                        }}
                    >
                        Смотреть подробности
                    </Cell>
                </Card>
            </Div>
            <Div>
                <Group
                    header={<Header mode="secondary">Отзывы</Header>}
                >
                    {
                        reviews.map((review, index) => {
                            return(
                                <Review review={review} key={index}/>
                            )
                        })
                    }
                </Group>
            </Div>
        </Panel>
    )
}


export default DormitoryReviews;