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

	const [fetchedUser, setUser] = useState(null);
	const [accessToken, setToken] = useState('');

	const [popout, setPopout] = useState(<ScreenSpinner size='large' />);

	const [activeStory, setActiveStory] = useState('search');
	const [activeView, setActiveView] = useState('epic_view');
	const [activePanel, setActivePanel] = useState('epic_panel');

	const [regionsList, setRegionsList] = useState('');
	const [citiesList, setCitiesList] = useState('');
	const [uniList, setUniList] = useState('');

	const [selectedRegion, setRegion] = useState('');
	const [selectedCity, setCity] = useState('');
	const [selectedUniversity, setUniversity] = useState('');

	useEffect(() => {
		window.addEventListener('popstate', () => goBack());

		bridge.subscribe(({ detail: { type, data }}) => {
			if (type === 'VKWebAppUpdateConfig') {
				const schemeAttribute = document.createAttribute('scheme');
				schemeAttribute.value = data.scheme ? data.scheme : 'client_light';
				document.body.attributes.setNamedItem(schemeAttribute);
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

	const [, updateState] = React.useState();
	const forceUpdate = React.useCallback(() => updateState({}), []);

	async function getToken() {
		const result = await bridge.send("VKWebAppGetAuthToken", {"app_id": 7582793, "scope": ''});
	}

	const go = e => {
		const goTo = e.currentTarget.dataset.goto

		console.log(goTo)
		
		if (goTo.slice(0, 4) === 'view') {
			const view = goTo.slice(5, goTo.length)
			window.history.pushState( {panel: 'view_' + view}, 'view_' + view ); // Создаём новую запись в истории браузера
			history.push( 'view_' + view ); // Добавляем панель в историю
			setActiveView(view)
			if (view === 'add_review_view') {
				setActivePanel('location_panel')
			}
		}

		if (goTo.slice(0, 5) === 'panel') {
			const panel = goTo.slice(6, goTo.length)
			window.history.pushState( {panel: 'panel_' + panel}, 'panel_' + panel ); // Создаём новую запись в истории браузера
			history.push( 'panel_' + panel ); // Добавляем панель в историю
			setActivePanel(panel)
			forceUpdate()
		}

	};


	const goBack = () => {
		console.log(history)
		if( history.length === 1 ) {  // Если в массиве одно значение:
			bridge.send("VKWebAppClose", {"status": "success"}); // Отправляем bridge на закрытие сервиса.
		} else if( history.length > 1 ) { // Если в массиве больше одного значения:
			history.pop() // удаляем последний элемент в массиве.

			const goBack = history[history.length - 1]
			console.log(goBack)

			if (goBack.slice(0, 5) === 'story') {
				setActiveStory(goBack.slice(6, goBack.length))
				setActiveView('epic_view')
				setActivePanel('epic_panel')
			}

			if (goBack.slice(0, 4) === 'view') {
				setActivePanel('location_panel')
			}
		}
	}

	const onStoryChange = e => {
		const last_element = history[history.length - 1]
		const story = e.currentTarget.dataset.story
		if (last_element.slice(6, last_element.length) !== story){
			setActiveStory(story);
			window.history.pushState( {story: 'story_' + story}, 'story_' + story ); // Создаём новую запись в истории браузера
			history.push( 'story_' + story ); // Добавляем панель в историю
		}
	};

	return (
		<ConfigProvider
			isWebView={true}
			scheme='bright_light'
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
						 go={go}
						 activePanel={activePanel}
						 selectedRegion={selectedRegion}
						 selectedCity={selectedCity}
						 selectedUniversity={selectedUniversity}
				/>

				<View id="empty_view" activePanel="spinner_panel">
					<Panel id='spinner_panel'>
						<PanelHeader>
							Сервер задумался...
						</PanelHeader>
						<PanelSpinner />
					</Panel>
				</View>
				<View id="onboarding_view">

				</View>
			</Root>

		</ConfigProvider>
	);
}

export default App;