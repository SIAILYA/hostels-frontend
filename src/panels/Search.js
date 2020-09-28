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
    Caption
} from "@vkontakte/vkui";
import './main-panel.css'
import {ReviewsContext} from "../Contexts";


const Search = ({onStoryChange}) => {
    const {lastReviews} = useContext(ReviewsContext)

    return (
        <Panel id="search_panel">
            <PanelHeader>Поиск</PanelHeader>

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
                    actions={<Button mode="overlay_primary" size="l">Смотреть</Button>}
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

            <Group header={<Header mode='secondary'>Последние отзывы</Header>} separator='hide'>
                <Div>
                    <Gallery
                        slideWidth="90%"
                        align="center"
                        style={{ height: '105%'}}
                    >
                        {
                            lastReviews.map((review, index) => {
                                return (
                                    <Card key={index} size='l' mode='outline' style={{width: '95%'}}>
                                        <RichCell
                                            before={<Avatar size={72} src={review.photo}/>}
                                            text={review.review.text.slice(0, 50) + '...'}
                                            caption={<Caption level="3" weight="medium" style={{ marginTop: 7 }}> {review.university.title + ', ' + review.dormitory.title + ', ' + review.dormitory.address} </Caption>}
                                            multiline
                                            actions={<Button className='yellow-gradient' size={'m'}>Читать полностью</Button>}
                                        >
                                            {review.author_name} {review.author_surname}
                                        </RichCell>
                                    </Card>
                                )
                            })
                        }
                    </Gallery>
                </Div>
            </Group>

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

        </Panel>
    )
}

export default Search;