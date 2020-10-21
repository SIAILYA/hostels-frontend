import React, {useContext, useState} from "react";

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
    Avatar,
    RichCell,
    Caption, PanelSpinner, PromoBanner, usePlatform, IOS, Link
} from "@vkontakte/vkui";

import {Navigation, ReviewsContext} from "../../Contexts";
import bridge from "@vkontakte/vk-bridge";
import ScreenSpinner from "@vkontakte/vkui/dist/components/ScreenSpinner/ScreenSpinner";


const Main = ({onStoryChange}) => {
    const {lastReviews, reviewsLoading, fetchDormitoryReviews} = useContext(ReviewsContext)
    const {searchBanner, go, setPopout} = useContext(Navigation)
    const platform = usePlatform()
    const [bannerShow, setBannerShow] = useState(true)

    return (
        <Panel id="main_panel">
            <PanelHeader>Главная</PanelHeader>

            <Group separator='hide'>
                <CardScroll>
                    <Card size="s" className='rating' onClick={onStoryChange} data-story="rating">
                        <div style={{ width: 96, height: 96 }}/>
                    </Card>
                    <Link href="https://vk.com/@yourdormitory-kak-my-schitaem-reiting" target="_blank" style={{marginRight: 8}}>
                        <Card size="s" className='grades'>
                            <div style={{ width: 96, height: 96 }} />
                        </Card>
                    </Link>
                    {
                        platform !== IOS &&
                        <Card size="s" href="" target="_blank" className='gift' onClick={() => {
                            bridge.send("VKWebAppOpenPayForm", {"app_id": 7582793, "action": "pay-to-user", "params": {"user_id": 223632391, "amount": 1, "description": "На чай, пиццу и все остальное :)"}})
                        }}>
                            <div style={{ width: 96, height: 96 }} />
                        </Card>
                    }
                    <Link href="https://vk.com/@yourdormitory-week-review" target="_blank" style={{marginRight: 8}}>
                        <Card size="s" className='review'>
                            <div style={{ width: 96, height: 96 }} />
                        </Card>
                    </Link>
                </CardScroll>
            </Group>

            <Group separator='hide'>
                <Banner
                    mode="image"
                    size="m"
                    header="Искать общежитие"
                    subheader={<span>Узнайте о жизни в<br />общежитиях ВУЗов</span>}
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
                    actions={<Button mode="overlay_primary" size="l" onClick={onStoryChange} data-story="add">Перейти</Button>}
                />
            </Group>

            {
                bannerShow && searchBanner &&
                <Div>
                    <PromoBanner bannerData={searchBanner} onClose={() => setBannerShow(false)}/>
                </Div>
            }

            <Group header={<Header mode='secondary'>Последние отзывы</Header>} separator='hide' style={{marginBottom: "5vh"}}>
                {
                    reviewsLoading ?
                    <PanelSpinner/>
                    :
                    <CardScroll
                        style={{ height: '105%'}}
                    >
                        <div style={{display: "flex"}}>

                    {
                        lastReviews.map((review, index) => {
                            return (

                                    <Card
                                        size="l"
                                        mode="outline"
                                        key={index}
                                        style={{overflow: "hidden", width: "80vw"}}
                                        onClick={() => {
                                            setPopout(<ScreenSpinner size='large' />)
                                            fetchDormitoryReviews(review.dormitory.selected.id, () => {
                                                    go({currentTarget: {dataset: {goto: "reviewPanel_dormitory_reviews_panel"}}})
                                                }
                                            )
                                        }}
                                    >
                                        <div style={{display: "flex", flexDirection: "column"}}>

                                        <RichCell
                                            disabled
                                            before={<Avatar size={48} src={review.author_photo || 'https://vk.com/images/camera_200.png?ava=1'}/>}
                                            text={review.review.text.length > 50 ? review.review.text.slice(0, 50).trim()+ '...' : review.review.text}
                                            caption={
                                                <Caption level="3" weight="medium" style={{ marginTop: 7 }}>
                                                    {review.university.title + ', ' + review.dormitory.title + ', ' + review.dormitory.address}
                                                </Caption>
                                            }
                                            multiline
                                            style={{height: "100%"}}
                                        >
                                            {review.author_name} {review.author_surname}
                                        </RichCell>
                                        {/*<div style={{textAlign: "center"}}>*/}
                                        {/*    <Button*/}
                                        {/*        className='yellow-gradient'*/}
                                        {/*        size={'m'}*/}
                                        {/*    >*/}
                                        {/*        Читать полностью*/}
                                        {/*    </Button>*/}
                                        {/*</div>*/}
                                        </div>
                                    </Card>
                            )
                        })
                    }
                    </div>
                </CardScroll>
                }
            </Group>


            {/*<Group*/}
            {/*    header={<Header mode='secondary'>Интересное и полезное</Header>}*/}
            {/*    description='Подборка интересных статей для абитуриентов и заселяющихся'*/}
            {/*>*/}
            {/*    <CardScroll>*/}
            {/*        <Card size="m">*/}
            {/*            <div style={{ width: 224, height: 96 }} />*/}
            {/*        </Card>*/}
            {/*        <Card size="m">*/}
            {/*            <div style={{ width: 224, height: 96 }} />*/}
            {/*        </Card>*/}
            {/*        <Card size="m">*/}
            {/*            <div style={{ width: 224, height: 96 }} />*/}
            {/*        </Card>*/}
            {/*    </CardScroll>*/}
            {/*</Group>*/}

            {/*<div style={{textAlign: "center", marginBottom: "20px"}}>*/}
            {/*    <Button*/}
            {/*        className="yellow-gradient"*/}
            {/*        onClick={() => {*/}
            {/*            bridge.send("VKWebAppStorageSet", {"key": "default_role", "value": ""});*/}
            {/*            bridge.send("VKWebAppStorageSet", {"key": "default_location", "value": ""});*/}
            {/*            bridge.send("VKWebAppStorageSet", {"key": "onboarding_showed", "value": ""});*/}
            {/*            bridge.send("VKWebAppStorageSet", {"key": "allow_access", "value": ""});*/}
            {/*        }}*/}
            {/*    >*/}
            {/*        Сбросить Storage*/}
            {/*    </Button>*/}
            {/*</div>*/}

        </Panel>
    )
}

export default Main;