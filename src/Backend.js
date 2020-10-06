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

export const uploadPhotos = (userPhotos) => {
    let FD = new FormData()
    Array.from(userPhotos).forEach((file, index) => {
        FD.append('media' + index, file)
    })

    return axios.post(
        BACKEND_URL + "api/v1/upload_photos",
        FD
    )
}

export const sendReview = (review) => {
    return axios.post(
        BACKEND_URL + "api/v1/add_review",
        review
    )
}

export const getRating = () => {
    return axios.get(
        BACKEND_URL + "api/v1/get_rating_grades"
    )
}

export const searchDormitories = (data) => {
    return axios.post(
        BACKEND_URL + "api/v1/dormitories_search",
        {query: data}
    )
}

export const getUserReviews = (author_id) => {
    return axios.post(
        BACKEND_URL + "api/v1/get_user_reviews",
        {author_id: author_id}
    )
}