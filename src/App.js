import React, {useEffect, useState} from 'react';

import bridge from '@vkontakte/vk-bridge';
import '@vkontakte/vkui/dist/vkui.css';

import {LocationContext, ModalContext, Navigation, QuestionsContext, RatingContext} from "./Contexts";

import {
	Button,
	ConfigProvider, Div,
	Epic, FormLayout, FormLayoutGroup, Input,
	Panel,
	PanelHeader,
	PanelSpinner,
	Root,
	ScreenSpinner,
	Tabbar,
	TabbarItem,
	View
} from '@vkontakte/vkui';

import Icon28StatisticsOutline from '@vkontakte/icons/dist/28/statistics_outline';
import Icon28AddCircleOutline from '@vkontakte/icons/dist/28/add_circle_outline';
import Icon28SearchOutline from '@vkontakte/icons/dist/28/search_outline';

import Search from './panels/Search'
import Add from './panels/Add'
import Rating from './panels/Rating'

import LocationPanel from "./panels/Location";
import CityChoosePanel from "./panels/mimicries/CityMimicry";
import RegionChoosePanel from "./panels/mimicries/RegionMimicry";
import UniversityChoosePanel from "./panels/mimicries/UniversityMimicry";
import DormitoryPanel from "./panels/Dormitory";
import CustomDormitoryPanel from "./panels/CustomDormitory";
import GradesPanel from "./panels/Grades";
import QuestionsPanel from "./panels/Questions";
import TextPhotoPanel from "./panels/TextPhoto";
import AddModal from "./panels/AddModal";
import Textarea from "@vkontakte/vkui/dist/components/Textarea/Textarea";

const axios = require('axios')

const App = () => {
	const [history, setHistory] = useState(['story_search'])
	const [scheme, setScheme] = useState(["bright_light"])

	const [fetchedUser, setUser] = useState(null);
	const [accessToken, setToken] = useState('');

	const [popout, setPopout] = useState(<ScreenSpinner size='large' />);
	const [locationSnackbar, setLocationSnackbar] = useState(null)

	const [activeStory, setActiveStory] = useState('search');
	const [activeView, setActiveView] = useState('epic_view');
	const [activePanel, setActivePanel] = useState('epic_panel');
	const [activeAddPanel, setActiveAddPanel] = useState('location_panel');
	const [activeAddModal, setActiveAddModal] = useState('');
	const [photoCard, setPhotoCard] = useState('')
	const [photoCaptionIndex, setPhotoCaptionIndex] = useState('')
	const [photoCaptions, setPhotoCaptions] = useState([])
	const [userPhotos, setUserPhotos] = useState([])


	const [countryList, setCountryList] = useState(
		[
			{
			id: 1,
			title: 'Россия',
		}, {
			id: 2,
			title: 'Украина',
		}, {
			id: 3,
			title: 'Беларусь',
		}, {
			id: 4,
			title: 'Казахстан',
		}, {
			id: 5,
			title: 'Азербайджан',
		}, {
			id: 6,
			title: 'Армения',
		}, {
			id: 7,
			title: 'Грузия',
		}, {
			id: 8,
			title: 'Израиль',
		}, {
			id: 9,
			title: 'США',
		}, {
			id: 65,
			title: 'Германия',
		}, {
			id: 11,
			title: 'Кыргызстан',
		}, {
			id: 12,
			title: 'Латвия',
		}, {
			id: 13,
			title: 'Литва',
		}, {
			id: 14,
			title: 'Эстония',
		}, {
			id: 15,
			title: 'Молдова',
		}, {
			id: 16,
			title: 'Таджикистан',
		}, {
			id: 17,
			title: 'Туркменистан',
		}, {
			id: 18,
			title: 'Узбекистан',
		}]
	);
	const [citiesList, setCitiesList] = useState([{
		"id": 2,
		"title": "Санкт-Петербург",
		"important": 1
	}]);
	const [uniList, setUniList] = useState([{
		"id": 66,
		"title": "СПбГУПТД (бывш. СПГУТД)"
	}]);
	const [dormitoryList, setDormitoryList] = useState(
		[{
		'id': 1,
		"title": 'Общежитие №3',
		'address': 'пр-кт Ударников, 29к1'
	}]
	);

	const [selectedCountry, setCountry] = useState('');
	const [selectedCity, setCity] = useState('');
	const [selectedUniversity, setUniversity] = useState('');
	const [selectedDormitory, setDormitory] = useState('');
	const [customAddress, setAddress] = useState('');
	const [customTitle, setTitle] = useState('');
	const [customCoordinates, setCoordinates] = useState({lat: 0, lng: 0});

	const [ratingCondition, setConditionRating] = useState(0)
	const [ratingCost, setCostRating] = useState(0)
	const [ratingPersonal, setPersonalRating] = useState(0)
	const [ratingLocation, setLocationRating] = useState(0)
	const [ratingNoise, setNoiseRating] = useState(0)
	const [mainRating, setMainRating] = useState(0)

	const [dormitoryType, setDormitoryType] = useState('Блочный')
	const [payType, setPayType] = useState('Раз в месяц')
	const [cost, setCost] = useState('')
	const [cardPay, setCardPay] = useState(false)
	const [twoLevelBed, setTwoLevelBed] = useState(false)
	const [balcony, setBalcony] = useState(false)
	const [plasticWindows, setPlasticWindows] = useState(false)
	const [peopleInRoom, setPeopleInRoom] = useState('')
	const [workAlways, setWorkAlways] = useState(false)
	const [closedStart, setClosedStart] = useState('')
	const [closedEnd, setClosedEnd] = useState('')
	const [smoking, setSmoking] = useState(false)
	const [electricity, setElectricity] = useState(false)
	const [internet, setInternet] = useState(false)

	const [anonReview, setAnon] = useState(false)
	const [textReview, setTextReview] = useState('')
	const [photoURLs, setPhotoURLs] = useState([])
	const [review, setReview] = useState({})

	const [backend, setBackend] = useState('')


	useEffect(() => {
		window.addEventListener('popstate', () => goBack());

		bridge.subscribe(({ detail: { type, data }}) => {
			if (type === 'VKWebAppUpdateConfig') {
				const schemeAttribute = document.createAttribute('scheme');
				schemeAttribute.value = data.scheme ? data.scheme : 'client_light';
				document.body.attributes.setNamedItem(schemeAttribute);
				setScheme(data.scheme ? data.scheme : "bright_light")
			}

			if (type === 'VKWebAppAccessTokenReceived') {
				setToken(data.access_token)
			}

			else {
				console.log(type)
				console.log(data)
			}
		});
		async function fetchData() {
			const user = await bridge.send('VKWebAppGetUserInfo', );
			setUser(user);
		}
		setPopout(null)

		fetchData();
		setToken(getToken());
	}, []);

	useEffect(() => {
		setReview({
			author_id: fetchedUser ? fetchedUser.id : null,
			anonymous: anonReview,
			country: selectedCountry,
			city: selectedCity,
			university: selectedUniversity,
			dormitory: {
				selected: selectedDormitory,
				customs: {
					title: customTitle,
					address: customAddress,
					coordinates: customCoordinates
				}
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
	}, [
		photoCaptions, selectedCountry, selectedCity,selectedUniversity,
		selectedDormitory, customAddress, customTitle, customCoordinates,
		ratingCondition, ratingCost, ratingPersonal, ratingLocation,
		ratingNoise, mainRating, dormitoryType, payType,
		cost, cardPay, twoLevelBed, balcony, plasticWindows,
		peopleInRoom, workAlways, closedStart, closedEnd,
		smoking, electricity, internet, userPhotos, anonReview, fetchedUser,
		textReview, photoURLs
	])

	async function getToken() {
		return await bridge.send("VKWebAppGetAuthToken", {"app_id": 7582793, "scope": ''})
	}

	async function setEducation() {
		if (fetchedUser){
			if (accessToken){
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
				return
			}
			getToken();
		}
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

		if (goTo.slice(0, 8) === 'addModal') {
			const modal = goTo.slice(9, goTo.length)
			window.history.pushState( {panel: 'addModal_' + modal}, 'addModal_' + modal );
			history.push( 'addModal_' + modal );
			setActiveAddModal(modal)
		}
	};

	const goBack = () => {
		if( history.length === 1 ) {  // Если в массиве одно значение:
			bridge.send("VKWebAppClose", {"status": "success"}); // Отправляем bridge на закрытие сервиса.
		} else if( history.length > 1 ) { // Если в массиве больше одного значения:
			const last = history.pop() // удаляем последний элемент в массиве.
			const goBack = history[history.length - 1]

			if (last.slice(0, 8) === 'addModal') {
				setActiveAddModal(null)
			} else

			if (goBack.slice(0, 5) === 'story') {
				setActiveStory(goBack.slice(6, goBack.length))
				setActiveView('epic_view')
				setActivePanel('epic_panel')
			} else

			if (goBack.slice(0, 4) === 'view') {
				setActiveAddPanel('location_panel')
			} else

			if (goBack.slice(0, 8) === 'addPanel') {
				setActiveAddPanel(goBack.slice(9, goBack.length))
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

	function nestObj(prevKey, arr, arrFormData) {
		arr.forEach((obj, key) => {
			Object.entries(obj).forEach(([key, value], index) => {
				if (value.isArray) {
					nestObj(value, arrFormData);
				} else {
					arrFormData.push({
						key: prevKey[index].key,
						value
					});
				}
			})
		});
		return arrFormData;
	}

	function jsonToFormData(obj){
		const bodyFormData = new FormData();
		const arrFormData = [];
		Object.entries(obj).forEach(
			([key, value]) => {
				if (value.isArray){
					return nestObj(key, value, arrFormData);
				} else {
					arrFormData.push({key, value});
				}
			}
		);
		return arrFormData;
	}

	return (
		<ConfigProvider
			isWebView={true}
			scheme={scheme}
		>
			<Navigation.Provider value={{
				go, goBack,
				activePanel, activeAddPanel, activeAddModal,
				setActivePanel, setActiveAddPanel, setActiveAddModal
			}}>
			<LocationContext.Provider value={{
				countryList, citiesList, uniList, dormitoryList,
				setDormitoryList,
				setCountry, setCity, setUniversity, setDormitory,
				setCoordinates, setAddress, setTitle,
				selectedCountry, selectedCity, selectedUniversity, selectedDormitory,
				customCoordinates, customAddress, customTitle,
				locationSnackbar, setLocationSnackbar,
				setEducation, setTextReview, textReview, anonReview, setAnon
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
				<Root activeView={activeView}>
				<View id="epic_view"
					  activePanel="epic_panel"
					  popout={popout}
					  header={null}
					  history={history}
					  onSwipeBack={goBack}
				>
					<Panel id="epic_panel">
						<Epic
							activeStory={activeStory}
							tabbar={
								<Tabbar>
									<TabbarItem
										onClick={onStoryChange}
										selected={activeStory === 'search'}
										data-story="search"
									><Icon28SearchOutline />
									</TabbarItem>
									<TabbarItem
										onClick={onStoryChange}
										selected={activeStory === 'add'}
										data-story="add"
									><Icon28AddCircleOutline />
									</TabbarItem>
									<TabbarItem
										onClick={onStoryChange}
										selected={activeStory === 'rating'}
										data-story="rating"
									><Icon28StatisticsOutline />
									</TabbarItem>
								</Tabbar>
							}
						>
							<View id="search" activePanel="search_panel">
								<Search id="search_panel" onStoryChange={onStoryChange}/>
							</View>
							<View id="add" activePanel="add_panel">
								<Add id="add_panel" go={go}/>
							</View>
							<View id="rating" activePanel="rating_panel">
								<Rating id="rating_panel"/>
							</View>
						</Epic>
					</Panel>
				</View>

				<View id="add_review_view" activePanel={activeAddPanel} modal={<AddModal/>}>
					<LocationPanel id="location_panel" user={fetchedUser}/>

					{/*Mimicries block*/}
					<RegionChoosePanel id="region_choose"/>
					<CityChoosePanel id="city_choose"/>
					<UniversityChoosePanel id="uni_choose"/>
					{/*Mimicries block*/}

					<DormitoryPanel id="dormitory_panel"/>
					<CustomDormitoryPanel id="custom_dormitory_panel"/>

					<GradesPanel id="grades_panel"/>
					<QuestionsPanel id="questions_panel"/>
					<TextPhotoPanel id="text_photo_panel"/>
					<Panel id="preview_review_panel">
						<PanelHeader>Предпросмотр</PanelHeader>
						<Div>
							<Textarea
								defaultValue={JSON.stringify(review, null, ' ')}
								readOnly
							/>
							<Button
								size="xl"
								stretched
								className="yellow-gradient"
								style={{marginTop: '20px'}}
								onClick={() => {bridge.send("VKWebAppCopyText",
									{"text": JSON.stringify(review, null, ' ')})
								}}
							>
								Скопировать объект отзыва
							</Button>
						</Div>
						<FormLayout style={{marginTop: '20px'}} top="Отправить объект отзыва">
							<FormLayoutGroup>
								<Input
									top="Адрес бэкенд-сервера для отправки"
									placeholder="https://"
									onChange={e => setBackend(e.target.value)}
								/>
								<Button
									size="xl"
									stretched
									className="yellow-gradient"
									style={{marginTop: '20px'}}
									onClick={() => {
										let FD = new FormData()
										Array.from(userPhotos).forEach((file, index) => {
											FD.append('media' + index, file)
										})
										axios.post(
											"https://your-dormitory.herokuapp.com/api/v1/upload_photos",
											FD
										).then(res => {
											setPhotoURLs(res.data)
											console.log('Фото загружены')
										})
									}
									}
								>
									Загрузить фото
								</Button>
								<Button
									size="xl"
									stretched
									className="yellow-gradient"
									style={{marginTop: '20px'}}
									onClick={() => {
										let FD = new FormData()
										Array.from(userPhotos).forEach((file, index) => {
											FD.append('media' + index, file)
										})
										axios.post(
											backend,
											{
												data: review
											}
										).then(res => {
											console.log(res)
										})
									}
									}
								>
									Отправить запрос
								</Button>
							</FormLayoutGroup>
						</FormLayout>
					</Panel>
				</View>

				<View id="empty_view" activePanel="spinner_panel">
					<Panel id='spinner_panel'>
						<PanelHeader>
							Сервер задумался...
						</PanelHeader>
						<PanelSpinner />
					</Panel>
				</View>
				{/*<View id="onboarding_view">*/}
				{/*TODO: Сделать онбординг*/}
				{/*</View>*/}
				</Root>
			</QuestionsContext.Provider>
			</ModalContext.Provider>
			</RatingContext.Provider>
			</LocationContext.Provider>
			</Navigation.Provider>
		</ConfigProvider>
	);
}

export default App;