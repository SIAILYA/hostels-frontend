import React, {useContext} from "react";

import {
    Panel,
    PanelHeader,
    Group,
    Card,
    CardScroll,
    Div,
    Button,
    Banner,
    Header,
    Gallery,
    Avatar,
    RichCell,
    Caption, PanelSpinner, PromoBanner
} from "@vkontakte/vkui";

import {Navigation, ReviewsContext} from "../../Contexts";
import bridge from "@vkontakte/vk-bridge";
import ScreenSpinner from "@vkontakte/vkui/dist/components/ScreenSpinner/ScreenSpinner";


const Main = ({onStoryChange}) => {
    const {lastReviews, reviewsLoading, fetchDormitoryReviews} = useContext(ReviewsContext)
    const {searchBanner, go, setPopout} = useContext(Navigation)

    return (
        <Panel id="main_panel">
            <PanelHeader>Главная</PanelHeader>

            <Group separator='hide'>
                <CardScroll>
                    <Card size="s" className='rating'>
                        <div style={{ width: 96, height: 96 }}/>
                    </Card>
                    <Card size="s" className='grades'>
                        <div style={{ width: 96, height: 96 }} />
                    </Card>
                    <Card size="s" className='gift'>
                        <div style={{ width: 96, height: 96 }} />
                    </Card>
                    <Card size="s" className='review'>
                        <div style={{ width: 96, height: 96 }} />
                    </Card>
                </CardScroll>
            </Group>

            <Group separator='hide'>
                <Banner
                    mode="image"
                    size="m"
                    header="Искать общежитие"
                    subheader={<span>Узнайте более чем<br />о 200 общежитиях ВУЗов</span>}
                    background={
                        <div
                            className='search'
                            style={{
                                background: 'linear-gradient(to right, #F2C94C, #F2994A)',
                                backgroundPosition: 'right bottom',
                                backgroundSize: 'cover',
                                backgroundRepeat: 'no-repeat',
                            }}
                        />
                    }
                    actions={<Button mode="overlay_primary" size="l" onClick={onStoryChange} data-story="search">Смотреть</Button>}
                />

                <Banner
                    mode="image"
                    size="m"
                    header="Написать отзыв"
                    subheader={<span>Расскажите про<br />ваше общежитие</span>}
                    background={
                        <div
                            className='write'
                            style={{
                                background: 'linear-gradient(to right, #F2C94C, #F2994A)',
                                backgroundPosition: 'right bottom',
                                backgroundSize: 'cover',
                                backgroundRepeat: 'no-repeat',
                            }}
                        />
                    }
                    actions={<Button mode="overlay_primary" size="l" onClick={onStoryChange} data-story="add">Рассказать</Button>}
                />
            </Group>

            <Div>
                <Group header={<Header mode='secondary'>Последние отзывы</Header>} separator='hide'>
                    {
                        reviewsLoading ?
                        <PanelSpinner/>
                        :
                        <Gallery
                            slideWidth="90%"
                            align="center"
                            style={{ height: '105%'}}
                        >
                        {
                            lastReviews.map((review, index) => {
                                return (
                                    <div
                                        key={index}
                                        style={{paddingLeft: "10px"}}
                                    >
                                        <Card
                                            size="l"
                                            mode="outline"
                                            style={{overflow: "hidden"}}
                                        >
                                            <RichCell
                                                before={<Avatar size={48} src={review.author_photo}/>}
                                                text={review.review.text.slice(0, 50) + '...'}
                                                caption={
                                                    <Caption level="3" weight="medium" style={{ marginTop: 7 }}>
                                                        {review.university.title + ', ' + review.dormitory.title + ', ' + review.dormitory.address}
                                                    </Caption>
                                                }
                                                multiline
                                                actions={
                                                    <Button
                                                        className='yellow-gradient'
                                                        size={'m'}
                                                        onClick={() => {
                                                            setPopout(<ScreenSpinner size='large' />)
                                                            fetchDormitoryReviews(review.dormitory.selected.id, () => {
                                                                go({currentTarget: {dataset: {goto: "reviewPanel_dormitory_reviews_panel"}}})
                                                            }
                                                            )
                                                        }}
                                                    >
                                                        Читать полностью
                                                    </Button>
                                                }
                                            >
                                                {review.author_name} {review.author_surname}
                                            </RichCell>
                                        </Card>
                                    </div>
                                )
                            })
                        }
                    </Gallery>
                    }
                </Group>
            </Div>

            <Div>
                <PromoBanner bannerData={searchBanner} isCloseButtonHidden/>
            </Div>

            <Group
                header={<Header mode='secondary'>Интересное и полезное</Header>}
                description='Подборка интересных статей для абитуриентов и заселяющихся'
            >
                <CardScroll>
                    <Card size="m">
                        <div style={{ width: 224, height: 96 }} />
                    </Card>
                    <Card size="m">
                        <div style={{ width: 224, height: 96 }} />
                    </Card>
                    <Card size="m">
                        <div style={{ width: 224, height: 96 }} />
                    </Card>
                </CardScroll>
            </Group>

            <div style={{textAlign: "center", marginBottom: "20px"}}>
                <Button
                    className="yellow-gradient"
                    onClick={() => {
                        bridge.send("VKWebAppStorageSet", {"key": "default_role", "value": ""});
                        bridge.send("VKWebAppStorageSet", {"key": "default_location", "value": ""});
                        bridge.send("VKWebAppStorageSet", {"key": "onboarding_showed", "value": ""});
                        bridge.send("VKWebAppStorageSet", {"key": "allow_access", "value": ""});
                    }}
                >
                    Сбросить Storage
                </Button>
            </div>

        </Panel>
    )
}

export default Main;