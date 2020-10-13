import React, {useEffect, useState} from 'react';

import bridge from '@vkontakte/vk-bridge';
import '@vkontakte/vkui/dist/vkui.css';
import axios from "axios"

import "./style.css"

import {LocationContext, ModalContext, Navigation, QuestionsContext, RatingContext, ReviewsContext} from "./Contexts";

import {
	Button,
	ConfigProvider,
	Epic,
	Link,
	Panel,
	PanelSpinner,
	Placeholder,
	Root,
	ScreenSpinner,
	Tabbar,
	TabbarItem,
	View
} from '@vkontakte/vkui';

import Icon28StatisticsOutline from '@vkontakte/icons/dist/28/statistics_outline';
import Icon28AddCircleOutline from '@vkontakte/icons/dist/28/add_circle_outline';
import Icon28SearchOutline from '@vkontakte/icons/dist/28/search_outline';
import Icon28AllCategoriesOutline from '@vkontakte/icons/dist/28/all_categories_outline';
import Icon56DownloadSquareOutline from '@vkontakte/icons/dist/56/download_square_outline';

import Main from './panels/stories/Main'
import Add from './panels/stories/Add'
import SearchStory from "./panels/stories/SearchStory";
import Rating from './panels/stories/Rating'

import LocationPanel from "./panels/Location";
import CityChoosePanel from "./panels/mimicries/CityMimicry";
import CountryChoosePanel from "./panels/mimicries/CountryMimicry";
import UniversityChoosePanel from "./panels/mimicries/UniversityMimicry";
import DormitoryPanel from "./panels/Dormitory";
import CustomDormitoryPanel from "./panels/CustomDormitory";
import GradesPanel from "./panels/Grades";
import QuestionsPanel from "./panels/Questions";
import TextPhotoPanel from "./panels/TextPhoto";
import AddModal from "./panels/AddModal";
import OnboardingHelloPanel from "./panels/onboarding/Hello"

import {COUNTRIES, INIT_ADD_PANEL, INIT_PANEL, INIT_VIEW} from "./Constants";
import {getDormitoryReviews, getLastReviews, getRating, getUniDormitories, getUserReviews} from "./Backend";

import RolePanel from "./panels/onboarding/Role";
import ThanksPanel from "./panels/onboarding/Thanks";
import WhereStudyPanel from "./panels/onboarding/ChooseUniversity";
import PreviewPanel from "./panels/PreviewPanel";
import DormitoryReviews from "./panels/DormitoryReviews";
import ReviewModal from "./panels/ReviewModal";
import {Icon56ErrorOutline, Icon56WifiOutline} from "@vkontakte/icons";
import Base from "./panels/onboarding/Base";
import Week from "./panels/Week";


const App = () => {
	let [history, setHistory] = useState(['story_main'])
	const [scheme, setScheme] = useState("bright_light")

	const [fetchedUser, setUser] = useState(null);
	const [accessToken, setToken] = useState('');

	const [popout, setPopout] = useState(<ScreenSpinner size='large' />);
	const [onboardingPopup, setOnboardingPopup] = useState('');

	const [locationSnackbar, setLocationSnackbar] = useState(null)
	const [onboardingSnackbar, setOnboardingSnackbar] = useState('');

	const [searchBanner, setSearchBanner] = useState({
		title: 'Заголовок',
		domain: 'vk.com',
		trackingLink: 'https://vk.com',
		ctaText: 'Перейти',
		advertisingLabel: 'Реклама',
		iconLink: 'https://sun9-7.userapi.com/c846420/v846420985/1526c3/ISX7VF8NjZk.jpg',
		description: 'Описание рекламы',
		ageRestrictions: 14,
		statistics: [
			{ url: '', type: 'playbackStarted' },
			{ url: '', type: 'click' }
		]
	})

	const [activeStory, setActiveStory] = useState('main');
	const [activeView, setActiveView] = useState(INIT_VIEW);
	const [lastOnlineView, setLastOnlineView] = useState('')
	const [activePanel, setActivePanel] = useState(INIT_PANEL);
	const [activeAddPanel, setActiveAddPanel] = useState(INIT_ADD_PANEL);
	const [activeReviewPanel, setActiveReviewPanel] = useState('dormitory_reviews_panel')
	const [activeModal, setActiveModal] = useState('');
	const [activeAddModal, setActiveAddModal] = useState('');
	const [activeReviewModal, setReviewModal] = useState(null);
	const [activeOnboardingPanel, setOnboardingPanel] = useState("hello_panel");

	const [photoCard, setPhotoCard] = useState('');
	const [photoCaptionIndex, setPhotoCaptionIndex] = useState('');
	const [photoCaptions, setPhotoCaptions] = useState([]);
	const [userPhotos, setUserPhotos] = useState([]);

	const [countryList, setCountryList] = useState(COUNTRIES);
	const [citiesList, setCitiesList] = useState([]);
	const [uniList, setUniList] = useState([]);
	const [dormitoryList, setDormitoryList] = useState([]);
	const [dormitoryRating, setDormitoryRating] = useState([])
	const [ratingLoading, setRatingLoading] = useState(true)
	const [userReviews, setUserReviews] = useState([])
	const [userReviewsLoading, setUserReviewsLoading] = useState(true)

	const [dormitoryObject, setDormitoryObject] = useState({})
	const [dormitoryReviews, setDormitoryReviews] = useState([])

	const [selectedCountry, setCountry] = useState('');
	const [selectedCity, setCity] = useState('');
	const [selectedUniversity, setUniversity] = useState('');
	const [selectedDormitory, setDormitory] = useState('');
	const [customAddress, setAddress] = useState('');
	const [customTitle, setTitle] = useState('');
	const [customCoordinates, setCoordinates] = useState({lat: 0, lng: 0});

	const [ratingCondition, setConditionRating] = useState(0);
	const [ratingCost, setCostRating] = useState(0);
	const [ratingPersonal, setPersonalRating] = useState(0);
	const [ratingLocation, setLocationRating] = useState(0);
	const [ratingNoise, setNoiseRating] = useState(0);
	const [mainRating, setMainRating] = useState(0);

	const [dormitoryType, setDormitoryType] = useState('Блочный');
	const [payType, setPayType] = useState('Раз в месяц');
	const [cost, setCost] = useState('');
	const [cardPay, setCardPay] = useState(false);
	const [twoLevelBed, setTwoLevelBed] = useState(false);
	const [balcony, setBalcony] = useState(false);
	const [plasticWindows, setPlasticWindows] = useState(false);
	const [peopleInRoom, setPeopleInRoom] = useState('');
	const [workAlways, setWorkAlways] = useState(false);
	const [closedStart, setClosedStart] = useState('');
	const [closedEnd, setClosedEnd] = useState('');
	const [smoking, setSmoking] = useState(false);
	const [electricity, setElectricity] = useState(false);
	const [internet, setInternet] = useState(false);

	const [userRole, setUserRole] = useState('');
	const [anonReview, setAnon] = useState(false);
	const [textReview, setTextReview] = useState('');
	const [photoURLs, setPhotoURLs] = useState([]);
	const [review, setReview] = useState({});

	const [lastReviews, setLastReviews] = useState([]);
	const [reviewsLoading, setReviewsLoading] = useState(true);

	const [modalUserInfo, setModalUserInfo] = useState('')
	const [modalDormitoryInfo, setModalDormitoryInfo] = useState('')

	const [, updateState] = React.useState();
	const forceUpdate = React.useCallback(() => updateState({}), []);


	function setOnline() {
		!navigator.onLine ? go({currentTarget: {dataset: {goto: "view_offline"}}}) : goBack()
	}

	useEffect(() => {
			window.addEventListener('popstate', () => goBack());
			window.addEventListener('online', () => setOnline());
			window.addEventListener('offline', () => setOnline());
			axios.defaults.headers.common['Vk-Check-Launch-Params'] = window.location.search;

			bridge.send("VKWebAppInit");

			bridge.subscribe(({ detail: { type, data }}) => {
				if (type === 'VKWebAppUpdateConfig') {
					console.log(data)
					const schemeAttribute = document.createAttribute('scheme');
					schemeAttribute.value = data.scheme ? data.scheme : 'client_light';
					document.body.attributes.setNamedItem(schemeAttribute);
					setScheme(data.scheme ? data.scheme : "bright_light")
				} else

				if (type === 'VKWebAppAccessTokenReceived') {
					setToken(data.access_token)
				} else

				if (type === "VKWebAppCallAPIMethodResult"){
					if (data.request_id === "getCities"){
						setCitiesList(data.response.items)
					}

					if (data.request_id === "getUniversities"){
						setUniList(data.response.items)
					}
				} else

				if (type === "VKWebAppStorageSetResult" ||
					type === "VKWebAppStorageGetResult" ||
					type === "VKWebAppGetUserInfoResult" ||
					type === "VKWebAppInitResult"){

				} else

				{
					console.log(type)
					console.log(data)
				}
			});

			async function fetchStorageInit() {
				const onboarding_showed = await bridge.send("VKWebAppStorageGet", {"keys": ["onboarding_showed"]})
				if (onboarding_showed.keys[0].value === "true"){
					setActiveView("epic_view")
				} else {
					setActiveView("onboarding_view")
				}

				const defaults = await bridge.send("VKWebAppStorageGet", {"keys": ["default_location", "default_role", "allow_access"]})

				if (defaults.keys[0].value !== ""){
					const default_location = JSON.parse(defaults.keys[0].value)
					setCountry(default_location.country)
					setCity(default_location.city)
					setUniversity(default_location.university)
					bridge.send("VKWebAppStorageSet", {"key": "allow_access", "value": "true"})
				}

				if (defaults.keys[1].value !== ""){
					setUserRole(defaults.keys[1].value)
				}

				if (defaults.keys[2].value === "true" && onboarding_showed.keys[0].value === "true"){
					getToken()
				}

				setPopout(null)
			}

			async function fetchData() {
				const user = await bridge.send('VKWebAppGetUserInfo', );
				setUser(user);
				setPopout(null)
			}

			fetchData();
			fetchStorageInit();
			fetchReviews();
			fetchRating();

			setInterval(() => {
				fetchReviews()
			}, 120000)
		},
		[]);

	function fetchRating() {
		setRatingLoading(true)
		getRating().then(res => {
			setDormitoryRating(res.data)
			setRatingLoading(false)
		})
	}

	async function fetchMessagesAllow() {
		return await bridge.send("VKWebAppAllowMessagesFromGroup", {"group_id": 198896747})
	}

	function fetchReviews () {
		setReviewsLoading(true)
		getLastReviews().then(res => {
			setLastReviews(res);
			setReviewsLoading(false)
			forceUpdate()
		})
	}

	function fetchDormitoryReviews(dormitory_id, callback) {
		setPopout(<ScreenSpinner size='large' />)
		getDormitoryReviews(dormitory_id).then(res => {
			setDormitoryObject(res.data.dormitory)
			setDormitoryReviews(res.data.reviews)
			callback()
			setPopout(null)
		}).catch(() => {
			go({currentTarget: {dataset: {goto: "view_server_error"}}})
			setPopout(null)
		})
	}

	function clearData() {
		setDormitory('')
		setAddress('')
		setTitle('')
		setCoordinates({lat: 0, lng: 0})
		setConditionRating(0)
		setCostRating(0)
		setPersonalRating(0)
		setLocationRating(0)
		setNoiseRating(0)
		setMainRating(0)
		setDormitoryType('Блочный')
		setPayType('Раз в месяц')
		setCost('')
		setCardPay(false)
		setTwoLevelBed(false)
		setBalcony(false)
		setPlasticWindows(false)
		setPeopleInRoom('')
		setWorkAlways(false)
		setClosedStart('')
		setClosedEnd('')
		setSmoking(false)
		setElectricity(false)
		setInternet(false)
		setAnon(false)
		setTextReview('')
		setPhotoURLs([])
		setReview({})
	}

	useEffect(() => {
		if (fetchedUser){
			setUserReviewsLoading(true)
			getUserReviews(fetchedUser.id).then(res => {
				setUserReviews(res.data)
				setUserReviewsLoading(false)
			})
		}
	}, [fetchedUser])

	function fetchUserReviews(){
		setUserReviewsLoading(true)
		getUserReviews(fetchedUser.id).then(res => {
			setUserReviews(res.data)
			setUserReviewsLoading(false)
		})
	}

	useEffect(() => {
			setReview({
				author_id: fetchedUser ? fetchedUser.id : null,
				author_name: anonReview ? "Вася" : fetchedUser ? fetchedUser.first_name : null,
				author_surname: anonReview? "Пупкин" : fetchedUser ? fetchedUser.last_name : null,
				author_photo:anonReview
					? `https://api.adorable.io/avatars/face/eyes${Math.round(Math.random() * 4)}/nose${Math.round(Math.random() * 4)}/mouth${Math.round(Math.random() * 4)}/F2994A`
					: fetchedUser ? fetchedUser.photo_200 : null,
				author_role: userRole,
				anonymous: anonReview,
				country: selectedCountry,
				city: selectedCity,
				university: selectedUniversity,
				dormitory: {
					selected: selectedDormitory,
					address: selectedDormitory.address || customAddress,
					title: selectedDormitory.title || customTitle,
					coordinates: selectedDormitory.coordinates || customCoordinates
				},
				review:{
					rating: {
						main: mainRating,
						condition: ratingCondition,
						personal: ratingPersonal,
						location: ratingLocation,
						noise: ratingNoise,
						cost: ratingCost
					},
					main_info: {
						type: dormitoryType,
						pay_type: payType,
						cost: cost,
						card_pay: cardPay,
					},
					rooms: {
						two_level_bed: twoLevelBed,
						balcony: balcony,
						plastic_windows: plasticWindows,
						people_in_room: peopleInRoom,
					},
					operating: {
						work_always: workAlways,
						closed:{
							start: closedStart,
							end: closedEnd
						},
					},
					comfort: {
						smoking: smoking,
						electricity: electricity,
						internet: internet,
					},
					text: textReview
				},
				photos: photoURLs,
				captions: photoCaptions.slice(0, photoURLs.length)
			})

		},
		[
			photoCaptions, selectedCountry, selectedCity,selectedUniversity,
			selectedDormitory, customAddress, customTitle, customCoordinates,
			ratingCondition, ratingCost, ratingPersonal, ratingLocation,
			ratingNoise, mainRating, dormitoryType, payType,
			cost, cardPay, twoLevelBed, balcony, plasticWindows,
			peopleInRoom, workAlways, closedStart, closedEnd,
			smoking, electricity, internet, userPhotos, anonReview, fetchedUser,
			textReview, photoURLs, userRole
		])

	useEffect(() => {
			if (selectedUniversity){
				getUniDormitories(selectedUniversity.id).then(res => setDormitoryList(res))
			}
		},
		[selectedUniversity])

	function getToken() {
		bridge.send("VKWebAppGetAuthToken", {"app_id": 7582793, "scope": ''})
	}

	async function setEducation() {
		const result = await bridge.send(
			"VKWebAppCallAPIMethod",
			{
				"method": "users.get",
				"request_id": "getEducation",
				"params": {
					"user_ids": fetchedUser.id,
					"v": "5.124",
					"fields": "education, photo_200",
					"access_token": accessToken,
				}
			}
		)

		let tempUser = fetchedUser
		tempUser.university = {
			id: result.response[0].university,
			title: result.response[0].university_name
		}

		setUser(tempUser)
	}

	const go = e => {
		const goTo = e.currentTarget.dataset.goto

		if (goTo.slice(0, 4) === 'view') {
			const view = goTo.slice(5, goTo.length)
			window.history.pushState( {panel: 'view_' + view}, 'view_' + view );
			history.push( 'view_' + view );
			setActiveView(view)
			if (view === 'add_review_view') {
				setActiveView('add_review_view')
				setActiveAddPanel('location_panel')
			}
		} else

		if (goTo === 'onboarding') {
			window.history.pushState( {panel: "onboarding"}, "onboarding" );
			history.push( "onboarding" );
			setActiveView("onboarding_view")
			setOnboardingPanel("hello_panel")
		} else

		if (goTo.slice(0, 5) === 'panel') {
			const panel = goTo.slice(6, goTo.length)
			window.history.pushState( {panel: 'panel_' + panel}, 'panel_' + panel );
			history.push( 'panel_' + panel );
			setActivePanel(panel)
		} else

		if (goTo.slice(0, 8) === 'addPanel') {
			const panel = goTo.slice(9, goTo.length)
			window.history.pushState( {panel: 'addPanel_' + panel}, 'addPanel_' + panel );
			history.push( 'addPanel_' + panel );
			setActiveAddPanel(panel)
		} else

		if (goTo.slice(0, 11) === 'reviewPanel') {
			const panel = goTo.slice(12, goTo.length)
			window.history.pushState( {panel: 'reviewPanel_' + panel}, 'reviewPanel_' + panel );
			history.push( 'reviewPanel_' + panel );
			setActiveView("dormitory_reviews_view")
			setActiveReviewPanel(panel)
		} else

		if (goTo.slice(0, 15) === 'onboardingPanel') {
			const panel = goTo.slice(16, goTo.length)
			window.history.pushState( {panel: 'addPanel_' + panel}, 'addPanel_' + panel );
			history.push( 'onboardingPanel_' + panel );
			setOnboardingPanel(panel)
			console.log(history)
		} else

		if (goTo.slice(0, 8) === 'addModal') {
			const modal = goTo.slice(9, goTo.length)
			window.history.pushState( {panel: 'addModal_' + modal}, 'addModal_' + modal );
			history.push( 'addModal_' + modal );
			setActiveAddModal(modal)
		} else

		if (goTo.slice(0, 9) === 'epicModal') {
			const modal = goTo.slice(10, goTo.length)
			window.history.pushState( {panel: 'epicModal_' + modal}, 'epicModal_' + modal );
			history.push( 'epicModal_' + modal );
			setActiveModal(modal)
		} else

		if (goTo.slice(0, 11) === 'reviewModal') {
			const modal = goTo.slice(12, goTo.length)
			window.history.pushState( {panel: 'reviewModal_' + modal}, 'reviewModal_' + modal );
			history.push( 'reviewModal_' + modal );
			setReviewModal(modal)
		}
	};

	const goBack = () => {
		if( history.length === 1 ) {
			bridge.send("VKWebAppClose", {"status": "success"});
		} else if( history.length > 1 && navigator.onLine ) {
			const last = history.pop()
			const goBackTo = history[history.length - 1]

			console.log(last)
			console.log(history)


			if (last === "onboarding"){
				if (activeView !== "epic_view"){
					setActiveView("epic_view")
				} else {
					goBack()
				}
			} else

			if (last.slice(0, 15) === "onboardingPanel"){
				if (["uni_choose", "city_choose", "country_choose"].indexOf(last.slice(16, last.length)) !== -1){
					setOnboardingPanel("university_panel")
				}
			} else

			if (goBackTo.slice(0, 11) === 'reviewPanel') {
				setActiveView("dormitory_reviews_view")
				setActiveReviewPanel(goBackTo.slice(12, goBackTo.length))
				setReviewModal(null)
			} else

			if (last.slice(0, 8) === 'addModal') {
				setActiveAddModal(null)
			} else

			if (last.slice(0, 9) === 'epicModal') {
				setActiveModal(null)
			} else

			if (goBackTo.slice(0, 5) === 'story') {
				setActiveStory(goBackTo.slice(6, goBackTo.length))
				setActiveView('epic_view')
				setActivePanel('epic_panel')
			} else

			if (goBackTo.slice(0, 4) === 'view') {
				setActiveAddPanel('location_panel')
			} else

			if (goBackTo.slice(0, 8) === 'addPanel') {
				setActiveAddPanel(goBackTo.slice(9, goBackTo.length))
			}
		}
	}

	const onStoryChange = e => {
		const last_element = history[history.length - 1]
		const story = e.currentTarget.dataset.story
		if (last_element.slice(6, last_element.length) !== story){
			setActiveStory(story);
			window.history.pushState( {story: 'story_' + story}, 'story_' + story );
			history.push( 'story_' + story );
		}
	};


	return (
		<ConfigProvider
			isWebView={true}
			scheme={scheme}
		>
			<Navigation.Provider value={{
				go, goBack, getToken, setToken, history,
				activeView, setActiveView, activeModal, setActiveModal,
				activePanel, activeAddPanel, activeAddModal,
				setActivePanel, setActiveAddPanel, setActiveAddModal,
				activeReviewPanel, setActiveReviewPanel,
				setPopout, accessToken, fetchedUser, activeOnboardingPanel, setOnboardingPanel,
				searchBanner, onboardingPopup, setOnboardingPopup,
				setOnboardingSnackbar, onboardingSnackbar,
				activeReviewModal, setReviewModal, fetchMessagesAllow
			}}>
				<LocationContext.Provider value={{
					countryList, citiesList, uniList, dormitoryList,
					setDormitoryList,
					setCountry, setCity, setUniversity, setDormitory,
					setCoordinates, setAddress, setTitle,
					selectedCountry, selectedCity, selectedUniversity, selectedDormitory,
					customCoordinates, customAddress, customTitle,
					locationSnackbar, setLocationSnackbar,
					setEducation, setTextReview, textReview, anonReview, setAnon,
					getUniDormitories
				}}>
					<RatingContext.Provider value={{
						ratingCondition, setConditionRating,
						ratingCost, setCostRating,
						ratingPersonal, setPersonalRating,
						ratingLocation, setLocationRating,
						ratingNoise, setNoiseRating,
						mainRating, setMainRating
					}}>
						<ModalContext.Provider value={{
							photoCard, photoCaptionIndex,
							setPhotoCard, setPhotoCaptionIndex,
							photoCaptions, userPhotos, setUserPhotos
						}}>
							<QuestionsContext.Provider value={{
								dormitoryType, setDormitoryType,
								payType, setPayType,
								cardPay, setCardPay,
								cost, setCost,
								twoLevelBed, setTwoLevelBed,
								balcony, setBalcony,
								plasticWindows, setPlasticWindows,
								peopleInRoom, setPeopleInRoom,
								workAlways, setWorkAlways,
								closedStart, setClosedStart,
								closedEnd, setClosedEnd,
								smoking, setSmoking,
								electricity, setElectricity,
								internet, setInternet
							}}>
								<ReviewsContext.Provider value={{
									lastReviews, reviewsLoading, userRole, setUserRole,
									review, setPhotoURLs,
									modalUserInfo, setModalUserInfo,
									modalDormitoryInfo, setModalDormitoryInfo,
									dormitoryRating, setDormitoryRating,
									fetchRating, ratingLoading,
									userReviews, userReviewsLoading,
									dormitoryObject, dormitoryReviews,
									fetchDormitoryReviews,
									clearData,
									fetchReviews, fetchUserReviews
								}}>
									<Root activeView={activeView}>
										<View
											id="epic_view"
											activePanel="epic_panel"
											popout={popout}
											header={null}
											onSwipeBack={() => goBack()}
										>
											<Panel id="epic_panel">
												<Epic
													activeStory={activeStory}
													tabbar={
														<Tabbar>
															<TabbarItem
																onClick={onStoryChange}
																selected={activeStory === 'main'}
																data-story="main"
															>
																<Icon28AllCategoriesOutline />
															</TabbarItem>
															<TabbarItem
																onClick={onStoryChange}
																selected={activeStory === 'add'}
																data-story="add"
															>
																<Icon28AddCircleOutline />
															</TabbarItem>
															<TabbarItem
																onClick={onStoryChange}
																selected={activeStory === 'search'}
																data-story="search"
															>
																<Icon28SearchOutline />
															</TabbarItem>
															<TabbarItem
																onClick={onStoryChange}
																selected={activeStory === 'rating'}
																data-story="rating"
															>
																<Icon28StatisticsOutline />
															</TabbarItem>
														</Tabbar>
													}
												>
													<View id="main" activePanel="search_panel">
														<Main id="search_panel" onStoryChange={onStoryChange}/>
													</View>
													<View id="add" activePanel="add_panel">
														<Add id="add_panel" go={go}/>
													</View>
													<View id="search" activePanel="search_panel">
														<SearchStory id="search_panel" onStoryChange={onStoryChange}/>
													</View>
													<View id="rating" activePanel="rating_panel">
														<Rating id="rating_panel"/>
													</View>
												</Epic>
											</Panel>
										</View>

										<View
											id="add_review_view"
											activePanel={activeAddPanel}
											modal={<AddModal/>}
											popout={popout}
										>
											<LocationPanel id="location_panel" user={fetchedUser}/>

											<CountryChoosePanel id="country_choose"/>
											<CityChoosePanel id="city_choose"/>
											<UniversityChoosePanel id="uni_choose"/>

											<DormitoryPanel id="dormitory_panel"/>
											<CustomDormitoryPanel id="custom_dormitory_panel"/>

											<GradesPanel id="grades_panel"/>
											<QuestionsPanel id="questions_panel"/>
											<TextPhotoPanel id="text_photo_panel"/>
											<Week id='week_panel'/>

											<PreviewPanel id="preview_review_panel"/>
										</View>

										<View id="onboarding_view" activePanel={activeOnboardingPanel} popout={onboardingPopup}>
											<OnboardingHelloPanel id="hello_panel"/>
											<Base id="base_panel"/>
											<RolePanel id="role_panel"/>
											<ThanksPanel id="thanks_panel"/>
											<WhereStudyPanel id="university_panel"/>

											<CountryChoosePanel id="country_choose"/>
											<CityChoosePanel id="city_choose"/>
											<UniversityChoosePanel id="uni_choose"/>
										</View>

										<View id="dormitory_reviews_view" activePanel={activeReviewPanel} popout={popout} modal={<ReviewModal/>}>
											<DormitoryReviews id="dormitory_reviews_panel"/>
										</View>
										<View id="empty_view" activePanel="spinner_panel">
											<Panel id='spinner_panel'>
												<Placeholder
													stretched
													icon={<Icon56DownloadSquareOutline width="120" height="120" className="yellow-gradient-text"/>}
													header="Загрузка..."
													style={{color: 'var(--yellow)'}}
												>
													Грузим картиночки и скрипты...
													<PanelSpinner />
												</Placeholder>
											</Panel>
										</View>
										<View id="server_error" activePanel={"server"}>
											<Panel id="server">
												<Placeholder
													stretched
													icon={<Icon56ErrorOutline width="120" height="120" className="yellow-gradient-text"/>}
													header="Что-то пошло не по плану"
													style={{color: 'var(--yellow)'}}
													action={
														<Button
															onClick={goBack}
															size="l"
															className="yellow-gradient"
														>
															Вернуться
														</Button>
													}
												>
													Сервер вернул ошибку, чтобы разобраться в проблеме,&#160;
													<Link href="https://vk.me/yourdormitory" className="yellow-gradient-text">напишите нам</Link>
												</Placeholder>
											</Panel>
										</View>
										<View id="offline" activePanel="status">
											<Panel id="status">
												<Placeholder
													stretched
													icon={<Icon56WifiOutline width="120" height="120" className="yellow-gradient-text"/>}
													header="Кажется, вы оффлайн"
													style={{color: 'var(--yellow)'}}
													action={
														<Button
															className="yellow-gradient"
															onClick={() => {
																	if (navigator.onLine){
																		goBack()
																	}
																}
															}
														>
															Проверить соединение
														</Button>
													}
												>
													Все данные сохранятся, просто подключитесь к сети
												</Placeholder>
											</Panel>
										</View>
									</Root>
								</ReviewsContext.Provider>
							</QuestionsContext.Provider>
						</ModalContext.Provider>
					</RatingContext.Provider>
				</LocationContext.Provider>
			</Navigation.Provider>
		</ConfigProvider>
	);
}

export default App;