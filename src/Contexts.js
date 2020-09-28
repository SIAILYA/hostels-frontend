import React, {createContext} from "react";

export const Navigation = createContext('')
export const LocationContext = createContext('')
export const RatingContext = createContext('')
export const ModalContext = createContext('')
export const QuestionsContext = createContext('')
export const ReviewsContext = createContext('')

const GlobalContext = ({children, navigationValue, locationValue, ratingValue}) => {
    return(
        <Navigation.Provider value={navigationValue}>
            <LocationContext.Provider value={locationValue}>
                <RatingContext.Provider value={ratingValue}>
                    {children}
                </RatingContext.Provider>
            </LocationContext.Provider>
        </Navigation.Provider>
    )
}

export default GlobalContext