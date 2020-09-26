
import Avatar from "@vkontakte/vkui/dist/components/Avatar/Avatar";
import Icon16Done from "@vkontakte/icons/dist/16/done";
import Icon16Clear from '@vkontakte/icons/dist/16/clear';
import React from "react";
import {Snackbar} from "@vkontakte/vkui";

export const SuccessSnackbar = ({caption, onClose, duration}) => {
    return (
        <Snackbar
            layout="vertical"
            onClose={() => onClose(null)}
            duration={duration || 4000}
            before={
                <Avatar
                    size={24}
                    style={{background: 'linear-gradient(to left, #F2C94C, #F2994A)'}}
                >
                    <Icon16Done fill="#fff" width={14} height={14} />
                </Avatar>}
        >
            {caption}
        </Snackbar>
    )
}

export const FailedSnackbar = ({caption, onClose}) => {
    return (
        <Snackbar
            layout="vertical"
            onClose={() => onClose(null)}
            before={
                <Avatar
                    size={24}
                    style={{background: 'linear-gradient(to left, #FF416C, #FF4B2B)'}}
                >
                    <Icon16Clear fill="#fff" width={14} height={14} />
                </Avatar>}
        >
            {caption}
        </Snackbar>
    )
}
