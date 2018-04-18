/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
	Platform,
	StyleSheet,
	Text,
	View,
	ToastAndroid,
	BackHandler
} from 'react-native';
import CardStackStyleInterpolator from 'react-navigation/src/views/CardStack/CardStackStyleInterpolator';
import {
	Scene,
	Router,
	Actions,
	Reducer,
	ActionConst,
	Overlay,
	Tabs,
	Modal,
	Drawer,
	Stack,
	Lightbox,
} from 'react-native-router-flux';

let backButtonPressedOnceToExit = false;
let currentSceneName = null;
let exitCount = 0;

const reducerCreate = params => {
	const defaultReducer = new Reducer(params);
	return (state, action) => {
		// console.log('ACTION:', action);
		return defaultReducer(state, action);
	};
};

const getSceneStyle = () => ({
    backgroundColor: backgroundSecondContent,
    shadowOpacity: 1,
    shadowRadius: 3,
});

const onBackPress = () => {
	let route = Actions.state.routes;
	let topSection = route[route.length - 1]
	let section = topSection.routes;
	
	switch (topSection.routeName) {
		case "Main":
			let tab = topSection.routes[0].index;
			if(tab == 0) {
                exitCount++;
                ToastAndroid.showWithGravityAndOffset(
                    'Tekan lagi untuk keluar',
                    ToastAndroid.SHORT,
                    ToastAndroid.BOTTOM,
                    25,
                    100
                );
                if(exitCount == 2) {
                    exitCount = 0
                    BackHandler.exitApp()
                }
            } else {
                exitCount = 0
                Actions.pop()
            }
            return true;
			break;
		case "Login":
			BackHandler.exitApp();
			return true;
			break;
		default:
			Actions.pop();
			return true;
			break;
	}
};

import TabBar from './components/TabBar';
import SplashScreen from './views/splashscreen';
import Login from './views/login';
import Dashboard from './views/dashboard';
import MainLokasi from './views/lokasi';
import TambahLokasi from './views/lokasi/tambahLokasi';
import Map from './views/maps';
import MainNotifikasi from './views/notifikasi';
import DetailNotifikasi from './views/notifikasi/detail';
import AkunSaya from './views/akunsaya';
import PosisiBarang from './views/posisibarang';

import {colorPrimary, textColorButton, backgroundContent, shimmerPlaceholder, textColor, backgroundSecondContent} from './res/color';

type Props = {};
type State = {
	login: Boolean
}

export default class App extends Component<Props, State> {

	State = {
		login: false
	}

	render() {
		return (
			<Router 
				createReducer={reducerCreate} 
				getSceneStyle={getSceneStyle}
				backAndroidHandler={onBackPress}>
				<Stack
					key="root"
					titleStyle={{ alignSelf: 'center' }}>
					<Scene key="SplashScreen" component={SplashScreen} hideNavBar hideTabBar initial />
					<Scene key="Login" component={Login} title="Login" hideNavBar type={ActionConst.REPLACE} />
					<Scene key="Main" type={ActionConst.REPLACE} hideNavBar panHandlers={null}>
						<Tabs
                            key="tabbar"
							swipeEnabled={false}
                            tabBarComponent={ ({navigationState,jumpToIndex}) => <TabBar selectedIndex={navigationState.index} /> }
                            showLabel={false}
                            tabBarPosition={'bottom'}>
                            <Stack
                                key="tab_beranda"
                                title="Beranda"
								tabBarLabel="Beranda"
								navigationBarStyle={{ backgroundColor: backgroundContent }}
                                initial>
                                <Scene key="Beranda" component={Dashboard} title="Beranda" titleStyle={{ color: textColor }} initial />
                            </Stack>

                            <Stack
                                key="tab_notifikasi"
                                title="Notifikasi"
								tabBarLabel="Notifikasi"
								navigationBarStyle={{ backgroundColor: backgroundContent }}>
                                <Scene key="Notifikasi" component={MainNotifikasi} title="Notifikasi" titleStyle={{ color: textColor }}   initial />
                            </Stack>
                        
                            <Stack
                                key="tab_akun"
                                title="Akun Saya"
								tabBarLabel="Akun Saya"
								navigationBarStyle={{ backgroundColor: backgroundContent }}>
                                <Scene key="Akun" component={AkunSaya} title="Akun Saya" titleStyle={{ color: textColor }}  initial />
                            </Stack>
                        </Tabs>
					</Scene>
					<Scene key="MainLokasi" hideTabBar component={MainLokasi} title="Daftar Lokasi" titleStyle={{ color: textColor }} />
					<Scene key="TambahLokasi" hideTabBar component={TambahLokasi} title="Tambah Lokasi" titleStyle={{ color: textColor }} />
					<Scene key="Map" hideTabBar hideNavBar component={Map} title="Tandai Lokasi" />
					<Scene key="DetailNotifikasi" hideTabBar component={DetailNotifikasi} back={true} title={"Notifikasi"} titleStyle={{ color: textColor }} />
					<Scene key="PosisiBarang" hideTabBar component={PosisiBarang} back={true} title={"Update Lokasi Barang"} titleStyle={{ color: textColor }} />
				</Stack>
			</Router>
		);
	}
}