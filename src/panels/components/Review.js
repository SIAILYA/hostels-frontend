import React, {useContext} from "react"
import {Div, Cell, Avatar, Group, Header, CardScroll, Card, Button} from "@vkontakte/vkui";
import CircularProgressBar from "./CircleProgress";
import bridge from "@vkontakte/vk-bridge";
import Icon24MoreHorizontal from "@vkontakte/icons/dist/24/more_horizontal";

import {Navigation, ReviewsContext} from "../../Contexts";


const Review = ({review}) => {
    const {go} = useContext(Navigation)
    const {setModalUserInfo} = useContext(ReviewsContext)


    return (
        <Card style={{paddingTop: "12px", marginBottom: "20px", overflow: "hidden"}}>
            <Cell
                before={<Avatar src={review.author_photo}/>}
                asideContent={
                    <CircularProgressBar
                        strokeWidth="4"
                        sqSize="40"
                        percentage={review.review.rating.main  * 20}
                        xs={true}
                    />
                }
                description={new Date(review.date.$date).toLocaleDateString("ru-RU", { year: 'numeric', month: 'long', day: 'numeric' })}
            >
                {review.author_name} {review.author_surname}
            </Cell>
            <Div>
                <Group
                    header={<Header style={{paddingLeft: 0}} mode="secondary">Отзыв</Header>}
                >
                    {review.review.text}
                </Group>
            </Div>
            {
                review.photos.length > 0 &&
                <Group
                    header={<Header mode="secondary">Фото</Header>}
                >
                    <CardScroll>
                        {
                            review.photos.map((photo, index, photos) => {
                                return(
                                    <div
                                        key={index}
                                        style={{marginRight: "8px"}}
                                    >
                                        <Avatar
                                            mode="app"
                                            size={72}
                                            src={photo}
                                            onClick={() => {
                                                bridge.send("VKWebAppShowImages", {images: photos, start_index: index})
                                            }}
                                        />
                                    </div>
                                )
                            })
                        }
                    </CardScroll>
                </Group>
            }
            <Cell
                // asideContent={
                //     <Vote reviewRating={review.rating}/>
                // }
            >
                <Button
                    before={<Icon24MoreHorizontal/>}
                    mode="outline"
                    onClick={() => {
                        setModalUserInfo(review)
                        go({currentTarget: {dataset: {goto: "reviewModal_user_review_info"}}})
                    }}
                >
                    Подробнее
                </Button>
            </Cell>
        </Card>
    )
}


export default Review;