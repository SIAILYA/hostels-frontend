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
    Cell, SimpleCell, Subhead, Placeholder
} from "@vkontakte/vkui";

import Icon28PollSquareOutline from "@vkontakte/icons/dist/28/poll_square_outline";

import CircularProgressBar from "./components/CircleProgress";
import Review from "./components/Review";
import RatingProgress from "./components/RatingProgress";

// import reviews from "./reviews.json"
// import dormitory from "./dormitoryObject.json"
import {Navigation, ReviewsContext} from "../Contexts";
import {Icon56CameraOffOutline} from "@vkontakte/icons";
import {getPostfix} from "./stories/Rating";



const DormitoryReviews = ({id}) => {
    const {go, goBack} = useContext(Navigation)
    const {setModalDormitoryInfo, dormitoryObject, dormitoryReviews} = useContext(ReviewsContext)

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
        main: avg(dormitoryObject.grades.main),
        condition: avg(dormitoryObject.grades.condition),
        cost: avg(dormitoryObject.grades.cost),
        location: avg(dormitoryObject.grades.location),
        personal: avg(dormitoryObject.grades.personal),
        noise: avg(dormitoryObject.grades.noise)
    })


    return(
        <Panel id={id}>
            <PanelHeader
                left={<PanelHeaderBack className="yellow-gradient-text" onClick={goBack}/>}
            >
                <PanelHeaderContent
                    status={typeof(dormitoryObject.university_title) === 'string' ? dormitoryObject.university_title : dormitoryObject.university_title.length + " ВУЗ" + getPostfix(dormitoryObject.university_title.length) }
                >
                    Отзывы
                </PanelHeaderContent>
            </PanelHeader>

            <Div
                style={{overflow: "hidden", paddingBottom: 0}}
            >
                <SimpleCell
                    multiline
                    disabled
                >
                    <p className="header-centered header-dormitory">
                            {dormitoryObject.title}
                    </p>
                    <Subhead weight="regular" style={{textAlign: "center"}}>
                            {dormitoryObject.address}
                    </Subhead>
                </SimpleCell>
            </Div>

            <Div>
                {
                    dormitoryObject.photos.length > 0 &&
                <Group>
                    <Gallery
                        slideWidth="100%"
                        style={{ height: "40vh", borderRadius: '10px', overflow: "hidden" }}
                        bullets="light"
                        align="center"
                    >
                        {
                            dormitoryObject.photos.map((item, index) => {
                                return(
                                    <div className="Gallery__slide" key={index}>
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
                }
                {
                    dormitoryObject.photos.length === 0 &&
                    <Placeholder
                        icon={<Icon56CameraOffOutline className="yellow-gradient-text"/>}
                        header="Нет фоток общежития"
                    >
                        Никто не добавил фото общежития. Вы можете стать первым!
                    </Placeholder>
                }
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
                            setModalDormitoryInfo(dormitoryObject)
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
                        dormitoryReviews.map((review, index) => {
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