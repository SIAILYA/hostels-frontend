import React, {useContext} from "react";
import {
    Avatar,
    Group,
    List,
    Panel,
    PanelHeader,
    PullToRefresh,
    Separator,
    SimpleCell,
    Subhead
} from "@vkontakte/vkui";
import {ReviewsContext} from "../../Contexts";
import CircularProgressBar from "../components/CircleProgress";


export function getPostfix(length) {
    if (length in [2, 3, 4] || length % 10 in [2, 3, 4]){
        return 'а'
    }
    return 'ов'
}


const Rating = () => {
    const {dormitoryRating, fetchRating, ratingLoading} = useContext(ReviewsContext)



    return (
        <Panel id="rating_panel">
            <PanelHeader>Рейтинг</PanelHeader>
            <PullToRefresh onRefresh={ () => {fetchRating()}} isFetching={ratingLoading}>
                <Group>
                    <List>
                        {
                            dormitoryRating.map((item, index) => {
                                return(
                                    <div key={index}>
                                        <SimpleCell
                                            description={item.address}
                                            multiline
                                            before={
                                                item.photos[0] ?
                                                    <Avatar size={48} src={item.photos[0]}/> :
                                                    <Avatar size={48} src={"https://picsum.photos/200"}/>
                                            }
                                            after={
                                                <CircularProgressBar
                                                    strokeWidth="4"
                                                    sqSize="40"
                                                    percentage={Math.round(item.rating / 5 * 100)}
                                                    xs={true}
                                                />
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
            </PullToRefresh>
        </Panel>
    )
}

export default Rating;