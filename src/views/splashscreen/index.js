/**
 * @author: Artha Prihardana 
 * @Date: 2018-04-15 09:15:53 
 * @Last Modified by: Artha Prihardana
 * @Last Modified time: 2018-04-17 14:25:36
 */
import React, { Component } from 'react';
import {
    View,
    StatusBar,
    Image,
    AsyncStorage,
    Alert
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import Text from '../../components/Text';
import { colorPrimary, colorPrimaryLight, colorPrimaryDark } from '../../res/color'
const version = require('../../../version.json').version;

type Props = {};
type State = {
    login: Boolean
};

let timeout;
let time = 3000;

export default class SplashScreen extends Component<State> {

    state = {
        login: false
    }

    componentDidMount() {
        this.checkLogin();
    }

    async checkLogin() {
        try {
            const value = await AsyncStorage.getItem('@global:token');
            if (value !== null){
                timeout = setTimeout(() => Actions.jump("Main"), time);
            } else {
                timeout = setTimeout(() => Actions.jump("Login"), time);
            }
        } catch (error) {
            timeout = setTimeout(() => Actions.jump("Login"), time);
        }
    }

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: colorPrimary, justifyContent: 'center', alignItems: 'center' }}>
                <StatusBar 
                    barStyle = "light-content" 
                    hidden = {false}
                    translucent = {false}
                    backgroundColor = {colorPrimaryDark}
                    networkActivityIndicatorVisible = {true}
                    />
                <Image source={require('../../res/image/logo.png')} style={{ width: 200, height: 200 }} resizeMode={'contain'} />
                <Text h6 style={{ color: '#ffffff' }}>S A L E S  -  P O I N</Text>
                
                <View style={{ width: '100%', height: 100, justifyContent: 'center', alignItems: 'center', position: 'absolute', bottom: 30 }}>
                    <Text style={{ color: '#F5F5F5'}}>Version {version}</Text>
                </View>
            </View>
        )
    }
}
