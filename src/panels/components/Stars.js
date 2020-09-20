import React from "react";
import BeautyStars from "beauty-stars";
import {Div, Group, Header} from "@vkontakte/vkui";


const Stars = ({id, name, description, ratingValue, onChange, sep}) => {
    return(
        <Group
            header={<Header mode="secondary">{name}</Header>}
            description={description}
            separator={!sep ? 'show' : 'hide'}
        >
            <Div style={{paddingTop: '5px'}}>
                <BeautyStars
                    name={id}
                    activeColor='var(--yellow)'
                    inactiveColor='var(--field_background)'
                    gap='10px'
                    value={ratingValue}
                    onChange={value => onChange({name: id, value})}
                />
            </Div>
        </Group>
    )
}

export default Stars;