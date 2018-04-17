/**
 * @author: Artha Prihardana 
 * @Date: 2018-04-17 14:26:22 
 * @Last Modified by: Artha Prihardana
 * @Last Modified time: 2018-04-17 14:42:42
 */
import React, { Component } from 'react';
import { Modal, View, ActivityIndicator } from 'react-native';
import Text from './Text';
import { backgroundContent, colorPrimaryDark } from '../res/color';

export default class Loading extends Component {

    render() {
        return(
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', position: 'absolute', left: 0, top: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,.2)' }}>
                <View style={{ backgroundColor: backgroundContent, padding: 16, width: 200, minHeight: 50, flexDirection: 'row', elevation: 2, borderRadius: 2, alignItems: 'center' }}>
                    <ActivityIndicator size="large" color={colorPrimaryDark} />
                    <Text style={{ marginLeft: 16 }}>Loading ...</Text>
                </View>
            </View>
        )
    }

}
