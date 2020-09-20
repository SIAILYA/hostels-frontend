import React, { useState, useEffect } from 'react';
import bridge from '@vkontakte/vk-bridge';
import '@vkontakte/vkui/dist/vkui.css';

import {ConfigProvider, Root, View, Panel, PanelHeader, Epic, Tabbar, TabbarItem, ScreenSpinner, PanelSpinner} from '@vkontakte/vkui';

import Icon28StatisticsOutline from '@vkontakte/icons/dist/28/statistics_outline';
import Icon28AddCircleOutline from '@vkontakte/icons/dist/28/add_circle_outline';
import Icon28SearchOutline from '@vkontakte/icons/dist/28/search_outline';

import Search from './panels/Search'
import Add from './panels/Add'
import Rating from './panels/Rating'
import AddForm from "./panels/AddForm";


const App = () => {
	const [history, setHistory] = useState(['story_search'])
	const [scheme, setScheme] = useState(['bright_light'])

	const [fetchedUser, setUser] = useState(null);
	const [accessToken, setToken] = useState('');

	const [popout, setPopout] = useState(<ScreenSpinner size='large' />);

	const [activeStory, setActiveStory] = useState('search');
	const [activeView, setActiveView] = useState('epic_view');
	const [activePanel, setActivePanel] = useState('epic_panel');
	const [activeAddPanel, setActiveAddPanel] = useState('location_panel');
	const [activeAddModal, setActiveAddModal] = useState('');

	const [regionsList, setRegionsList] = useState([{
		"id": 1045244,
		"title": "СПб и Ленинградская область"
	}]);
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

	const [selectedRegion, setRegion] = useState('');
	const [selectedCity, setCity] = useState('');
	const [selectedUniversity, setUniversity] = useState('');
	const [selectedDormitory, setDormitory] = useState('');
	const [customAddress, setAddress] = useState('');
	const [customTitle, setTitle] = useState('');
	const [customCoordinates, setCoordinates] = useState({lat: 0, lng: 0});

	const [, updateState] = React.useState();
	const forceUpdate = React.useCallback(() => updateState({}), []);

	useEffect(() => {
		window.addEventListener('popstate', () => goBack());

		bridge.subscribe(({ detail: { type, data }}) => {
			if (type === 'VKWebAppUpdateConfig') {
				const schemeAttribute = document.createAttribute('scheme');
				schemeAttribute.value = data.scheme ? data.scheme : 'client_light';
				document.body.attributes.setNamedItem(schemeAttribute);
				setScheme(data.scheme ? data.scheme : 'bright_light')
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
			const user = await bridge.send('VKWebAppGetUserInfo');
			setUser(user);
			setPopout(null)
		}

		fetchData();
	}, []);


	async function getToken() {
		const result = await bridge.send("VKWebAppGetAuthToken", {"app_id": 7582793, "scope": ''});
	}

	const go = e => {
		const goTo = e.currentTarget.dataset.goto

		console.log(goTo)
		forceUpdate()
		
		if (goTo.slice(0, 4) === 'view') {
			const view = goTo.slice(5, goTo.length)
			window.history.pushState( {panel: 'view_' + view}, 'view_' + view );
			history.push( 'view_' + view );
			setActiveView(view)
			if (view === 'add_review_view') {
				setActivePanel('location_panel')
			}
		} else

		if (goTo.slice(0, 5) === 'panel') {
			const panel = goTo.slice(6, goTo.length)
			window.history.pushState( {panel: 'panel_' + panel}, 'panel_' + panel );
			history.push( 'panel_' + panel );
			setActivePanel(panel)
			forceUpdate()
		} else

		if (goTo.slice(0, 8) === 'addPanel') {
			const panel = goTo.slice(9, goTo.length)
			window.history.pushState( {panel: 'addPanel_' + panel}, 'addPanel_' + panel );
			history.push( 'addPanel_' + panel );
			setActiveAddPanel(panel)
			forceUpdate()
			}

		if (goTo.slice(0, 8) === 'addModal') {
			const modal = goTo.slice(9, goTo.length)
			window.history.pushState( {panel: 'addModal_' + modal}, 'addModal_' + modal );
			history.push( 'addModal_' + modal );
			setActiveAddModal(modal)
			forceUpdate()
		}


	};


	const goBack = () => {
		console.log(history)
		if( history.length === 1 ) {  // Если в массиве одно значение:
			bridge.send("VKWebAppClose", {"status": "success"}); // Отправляем bridge на закрытие сервиса.
		} else if( history.length > 1 ) { // Если в массиве больше одного значения:
			const last = history.pop() // удаляем последний элемент в массиве.
			const goBack = history[history.length - 1]
			console.log(goBack)

			if (last.slice(0, 8) === 'addModal') {
				setActiveAddModal(null)
				console.log(last + '!!!!')
				forceUpdate()
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

	return (
		<ConfigProvider
			isWebView={true}
			scheme={scheme}
		>
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

				<AddForm id='add_review_view'
						 regionsList={regionsList}
						 citiesList={citiesList}
						 uniList={uniList}
						 dormitoryList={dormitoryList}
						 go={go}
						 goBack={goBack}
						 activePanel={activeAddPanel}
						 setActivePanel={setActiveAddPanel}
						 selectedRegion={selectedRegion}
						 selectedCity={selectedCity}
						 selectedUniversity={selectedUniversity}
						 setRegion={setRegion}
						 setCity={setCity}
						 setUniversity={setUniversity}
						 setDormitory={setDormitory}
						 selectedDormitory={selectedDormitory}
						 activeModal={activeAddModal}
						 customAddress={customAddress}
						 customCoordinates={customCoordinates}
						 customTitle={customTitle}
						 setAddress={setAddress}
						 setCoordinates={setCoordinates}
						 setTitle={setTitle}
						 setDormitoryList={setDormitoryList}
						 forceUpdate={forceUpdate}
				/>

				<View id="empty_view" activePanel="spinner_panel">
					<Panel id='spinner_panel'>
						<PanelHeader>
							Сервер задумался...
						</PanelHeader>
						<PanelSpinner />
					</Panel>
				</View>
				{/*<View id="onboarding_view">*/}

				{/*</View>*/}
			</Root>

		</ConfigProvider>
	);
}

export default App;