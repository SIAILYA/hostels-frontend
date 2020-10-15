import {
    Avatar,
    Group,
    List,
    Panel,
    PanelHeader,
    PanelSpinner,
    Search,
    Separator,
    SimpleCell, Subhead
} from "@vkontakte/vkui";
import React, {useContext, useEffect, useState} from "react";
import {Navigation, ReviewsContext} from "../../Contexts";
import {searchDormitories} from "../../Backend";
import CircularProgressBar from "../components/CircleProgress";
import {Icon56CameraOffOutline} from "@vkontakte/icons";
import {getPostfix} from "./Rating";
import Header from "@vkontakte/vkui/dist/components/Header/Header";
import Div from "@vkontakte/vkui/dist/components/Div/Div";


const SearchStory = ({id}) => {
    const [intervalId, setIntervalId] = useState(0)
    const [dormitoriesSearch, setDormitoriesSearch] = useState('');
    const [loading, setLoading] = useState(true)
    const {dormitoryRating, setDormitoryRating, fetchDormitoryReviews, dormitorySearch, setDormitorySearch} = useContext(ReviewsContext)
    const {go} = useContext(Navigation)

    useEffect(() => {
        searchDormitories(dormitoriesSearch)
            .then(res => {
                setDormitoryRating(res.data)
                setLoading(false);
            })
    }, [])


    useEffect(() => {
        clearTimeout(intervalId)
        if (dormitoriesSearch){
            setLoading(true)
            setIntervalId(setTimeout(() => {
                searchDormitories(dormitoriesSearch.trim())
                    .then(res => {
                        setDormitorySearch(res.data)
                        setLoading(false);
                    })
            }, 1000))
        } else {
            searchDormitories(dormitoriesSearch.trim())
                .then(res => {
                    setDormitorySearch(res.data)
                    setLoading(false);
                })
        }
    }, [dormitoriesSearch])


    return(
        <Panel id="search_panel">
            <PanelHeader>Поиск</PanelHeader>

            <Search
                value={dormitoriesSearch}
                onChange={e => {setDormitoriesSearch(e.target.value.trimStart())}}
                placeholder="Название вуза"
            />
            {
                !loading && dormitorySearch.length === 0 &&
                <Div>
                    <Header mode="secondary" className="header-centered">Ничего не нашлось</Header>
                </Div>
            }

            {
                !loading && dormitorySearch ?
                    <Group>
                        <List>
                            {
                                dormitorySearch.map((item, index) => {
                                    return(
                                        <div key={index}>
                                            <SimpleCell
                                                description={item.address}
                                                multiline
                                                before={
                                                    item.photos[0] ?
                                                        <Avatar size={48} src={item.photos[0]}/> :
                                                        <Avatar size={48}>
                                                            <Icon56CameraOffOutline className="yellow-gradient-text" size={120}/>
                                                        </Avatar>
                                                }
                                                after={
                                                    <div
                                                        style={{marginLeft: "5px"}}
                                                    >
                                                        <CircularProgressBar
                                                            strokeWidth="4"
                                                            sqSize="40"
                                                            percentage={Math.round(item.rating / 5 * 100)}
                                                            xs={true}
                                                        />
                                                    </div>
                                                }
                                                onClick={() => {
                                                        fetchDormitoryReviews(item.id, () => {
                                                            go({currentTarget: {dataset: {goto: "reviewPanel_dormitory_reviews_panel"}}})
                                                        })
                                                    }
                                                }
                                            >
                                                <Subhead
                                                    weight="medium"
                                                >
                                                    {item.title}
                                                </Subhead>
                                                {typeof(item.university_title) === 'string' ? item.university_title : item.university_title.length + " ВУЗ" + getPostfix(item.university_title.length) }

                                            </SimpleCell>
                                            <Separator/>
                                        </div>
                                    )
                                })
                            }
                        </List>
                    </Group>
                    :
                    <PanelSpinner/>
            }
        </Panel>
    )
}

export default SearchStory;