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


const App = () => {
	const [fetchedUser, setUser] = useState(null);
	const [popout, setPopout] = useState(<ScreenSpinner size='large' />);
	const [activeStory, setActiveStory] = useState('search');
	const [activeView, setActiveView] = useState('epic_view');
	const [activeMainPanel, setActiveMainPanel] = useState('epic_panel');

	useEffect(() => {
		bridge.subscribe(({ detail: { type, data }}) => {
			if (type === 'VKWebAppUpdateConfig') {
				const schemeAttribute = document.createAttribute('scheme');
				schemeAttribute.value = data.scheme ? data.scheme : 'client_light';
				document.body.attributes.setNamedItem(schemeAttribute);
			}
		});
		async function fetchData() {
			const user = await bridge.send('VKWebAppGetUserInfo');
			setUser(user);
			setPopout(null)
		}
		fetchData();
	}, []);

	// const go = e => {
	// 	setActivePanel(e.currentTarget.dataset.to);
	// };

	const onStoryChange = e => {
		setActiveStory(e.currentTarget.dataset.story)
	};

	return (
		<ConfigProvider
			isWebView={true}
			scheme='bright_light'
		>
			<Root activeView={activeView}>
				<View id="epic_view" activePanel="epic_panel" popout={popout} header={null}>
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
								<Search id="search_panel"/>
							</View>
							<View id="add" activePanel="add_panel">
								<Add id="add_panel"/>
							</View>
							<View id="rating" activePanel="rating_panel">
								<Rating id="rating_panel"/>
							</View>
						</Epic>
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
				<View id="onboarding_view">

				</View>
			</Root>

		</ConfigProvider>
	);
}

export default App;