import React, {useContext, useEffect} from "react";
import bridge from "@vkontakte/vk-bridge"

import {
    Group,
    Div,
    Panel,
    PanelHeader,
    Button,
    Placeholder,
    Avatar,
    Header,
    Cell,
    SimpleCell, Card, HorizontalScroll, Link, PullToRefresh, PanelSpinner, PanelHeaderButton
} from "@vkontakte/vkui";
import {LocationContext, Navigation, ReviewsContext} from "../../Contexts";

import Icon56AddCircleOutline from '@vkontakte/icons/dist/56/add_circle_outline';
import {
    Icon28CancelCircleOutline,
    Icon28ChatsOutline,
    Icon28DoneOutline, Icon28MoreVertical, Icon28PrivacyOutline, Icon28RefreshOutline,
    Icon28ShareOutline,
    Icon28SyncOutline
} from "@vkontakte/icons";


const Add = ({go}) => {
    const {fetchedUser, accessToken, getToken, setPopout} = useContext(Navigation)
    const {userRole, userReviews, userReviewsLoading, fetchUserReviews, fetchDormitoryReviews} = useContext(ReviewsContext)
    const {selectedUniversity} = useContext(LocationContext)

    const [, updateState] = React.useState();
    const forceUpdate = React.useCallback(() => updateState({}), []);

    const getDescription = () => {
        if (userRole !== "Студент") return userRole
        if (selectedUniversity.title) return userRole + " " + selectedUniversity.title
        return userRole
    }

    const description = getDescription()

    function moderatedStatus(moderated) {
        if (moderated === 0){
            return [<Icon28SyncOutline fill="var(--yellow)"/>, "Отзыв ждет проверки"]
        } else if (moderated === 1) {
            return [<Icon28DoneOutline fill="var(--green)"/>, "Отзыв принят"]
        } else if (moderated === 2){
            return [<Icon28PrivacyOutline fill="var(--orange)"/>, "Отзыв проверяется"]
        }
        return [<Icon28CancelCircleOutline fill="var(--red)"/>, "Отзыв отклонен"]
    }

    return (
        <Panel id="add_panel">
            <PanelHeader left={<PanelHeaderButton onClick={() => {fetchUserReviews()}}><Icon28RefreshOutline className="yellow-gradient-text"/></PanelHeaderButton>}>Добавление</PanelHeader>
            <Div>
                <Group header={<Header mode="secondary">Добро пожаловать!</Header>} separator="show">
                    <Cell
                        before={<Avatar size={40} src={fetchedUser.photo_200}/>}
                        size="m"
                        description={description}
                        asideContent={<Icon28MoreVertical className="yellow-gradient-text"/>}
                        data-goto="onboarding"
                        onClick={go}
                    >
                        {fetchedUser.first_name} {fetchedUser.last_name}
                    </Cell>
                    <Cell
                        size="m"
                        asideContent={<Icon28ShareOutline className="yellow-gradient-text"/>}
                        onClick={() => {
                            bridge.send("VKWebAppShare")
                        }}
                    >
                        Поделиться с друзьями
                    </Cell>
                    <Cell
                        size="m"
                        asideContent={<Icon28ChatsOutline className="yellow-gradient-text"/>}
                        href="https://vk.me/yourdormitory"
                        target="_blank"
                    >
                        Связь с разработчиками
                    </Cell>
                </Group>
            </Div>

            {/*{*/}
            {/*    userReviewsLoading &&*/}
            {/*    <PanelSpinner/>*/}
            {/*}*/}
            {
                !userReviewsLoading && userReviews.length === 0 &&
                <Placeholder
                    className="placeholder-no-bottom"
                    icon={<Icon56AddCircleOutline width="120" height="120" className="yellow-gradient-text" />}
                    header='Отзывы отсутствуют'
                    action={
                        <Button
                            size="xl"
                            mode="primary"
                            className='yellow-gradient'
                            onClick={accessToken ? go : () => {
                                getToken()
                                go( {currentTarget: {dataset: {goto: "view_add_review_view"}}})
                            }
                            }
                            data-goto='view_add_review_view'
                        >
                            Написать отзыв
                        </Button>
                    }
                >
                    Вы еще не оставили ни одного отзыва
                </Placeholder>
            }
            {
                userReviews.length === 0 && userReviewsLoading &&
                <PanelSpinner size="large"/>
            }
            {
                userReviews.length > 0 &&
                <Div>
                    <div>
                        <Button
                            size="xl"
                            mode="primary"
                            className='yellow-gradient'
                            onClick={accessToken ? go : () => {
                                // getToken()
                                go({currentTarget: {dataset: {goto: "view_add_review_view"}}})
                            }
                            }
                            data-goto='view_add_review_view'
                        >
                            Написать отзыв
                        </Button>

                        <Group header={<Header mode="secondary">Ваши отзывы</Header>}>
                            {
                                userReviews.map((review, index) => {
                                        return (
                                            <div key={index}>
                                                <Card style={{marginBottom: "18px", overflow: "hidden"}}>
                                                    <SimpleCell
                                                        description={review.dormitory.address}
                                                        disabled={true}
                                                        // after={review.moderated === 1 ? <Icon28ArrowRightOutline
                                                        //     className="yellow-gradient-text"/> : null}
                                                        // onClick={() => {
                                                        //     setPopout(<ScreenSpinner size='large'/>)
                                                        //     fetchDormitoryReviews(review.dormitory.selected.id, () => {
                                                        //             go({currentTarget: {dataset: {goto: "reviewPanel_dormitory_reviews_panel"}}})
                                                        //         }
                                                        //     )
                                                        // }}
                                                    >
                                                        {review.dormitory.title}
                                                    </SimpleCell>
                                                    <Group header={<Header mode="secondary">Оценки</Header>}>
                                                        <Div>
                                                            <HorizontalScroll>
                                                                <div style={{display: "flex"}}>
                                                                    <Button
                                                                        className='yellow-back gradeBtn'
                                                                        style={{fontSize: 10}}
                                                                        disabled
                                                                    >
                                                                        Состояние:&#160;{review.review.rating.condition}
                                                                    </Button>
                                                                    <Button
                                                                        className='yellow-back gradeBtn'
                                                                        style={{fontSize: 10}}
                                                                        disabled
                                                                    >
                                                                        Цена:&#160;{review.review.rating.cost}
                                                                    </Button>
                                                                    <Button
                                                                        className='yellow-back gradeBtn'
                                                                        style={{fontSize: 10}}
                                                                        disabled
                                                                    >
                                                                        Персонал:&#160;{review.review.rating.personal}
                                                                    </Button>
                                                                    <Button
                                                                        className='yellow-back gradeBtn'
                                                                        style={{fontSize: 10}}
                                                                        disabled
                                                                    >
                                                                        Расположение:&#160;{review.review.rating.location}
                                                                    </Button>
                                                                    <Button
                                                                        className='yellow-back gradeBtn'
                                                                        style={{fontSize: 10}}
                                                                        disabled
                                                                    >
                                                                        Шумоизоляция:&#160;{review.review.rating.noise}
                                                                    </Button>
                                                                </div>
                                                            </HorizontalScroll>
                                                        </Div>
                                                    </Group>

                                                    <Group header={<Header mode="secondary">Отзыв</Header>}>
                                                        <Div>
                                                            {review.review.text}
                                                        </Div>
                                                    </Group>

                                                    {
                                                        review.photos.length > 0 &&
                                                        <Group header={<Header mode="secondary">Фото</Header>}>
                                                            <HorizontalScroll>
                                                                <Div
                                                                    style={{display: "flex"}}
                                                                >
                                                                    {
                                                                        review.photos.map((photo, index, photos) => {
                                                                            return (
                                                                                <div
                                                                                    key={index}
                                                                                    style={{marginRight: 8}}
                                                                                    onClick={() => {
                                                                                        bridge.send("VKWebAppShowImages", {"images": photos, "start_index": index})
                                                                                    }}
                                                                                >
                                                                                    <Avatar
                                                                                        key={index}
                                                                                        size={60}
                                                                                        mode="app"
                                                                                        src={photo}
                                                                                        style={{objectFit: "cover"}}
                                                                                    />
                                                                                </div>

                                                                            )
                                                                        })
                                                                    }
                                                                </Div>
                                                            </HorizontalScroll>
                                                        </Group>
                                                    }
                                                    <SimpleCell
                                                        before={moderatedStatus(review.moderated)[0]}
                                                        disabled
                                                        multiline
                                                        // after={<p style={{marginRight: "5px"}}>123</p>}
                                                    >
                                                        {moderatedStatus(review.moderated)[1]} {review.moderated === 3 &&
                                                    <Link href="https://vk.me/yourdormitory" target="_blank"
                                                          style={{fontSize: "10px"}}>Почему?</Link>}
                                                    </SimpleCell>
                                                </Card>
                                            </div>
                                        );
                                    }
                                )
                            }
                        </Group>
                    </div>
                </Div>
            }
        </Panel>
    )
}

export default Add;