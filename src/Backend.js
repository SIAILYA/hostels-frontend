import {BACKEND_URL} from "./Constants";
const axios = require('axios')

export const getUniDormitories = (selectedUniId) => {
    let res = axios.post(
            BACKEND_URL + "api/v1/get_dormitories",
            {university_id: selectedUniId}
        ).then(res => res.data)
    return res
}


export const printData = (dataToSend) => {
    let res = axios.post(
        BACKEND_URL + "api/v1/get_dormitories",
        dataToSend
    ).then(res => res.data)
    return res
}


export const getLastReviews = () => {
    let res = axios.get(
        BACKEND_URL + "api/v1/get_last_reviews",
    ).then(res => res.data)
    return res
}