/**
 * @author: Artha Prihardana 
 * @Date: 2018-04-17 10:32:40 
 * @Last Modified by: Artha Prihardana
 * @Last Modified time: 2018-04-17 10:36:12
 */
import React, { Component } from 'react';
import { View, ScrollView } from 'react-native';
import Text from '../../components/Text';
import Button from 'react-native-material-ripple';

type Props = {};
type State = {};

export default class DetailNotifikasi extends Component<Props, State> {
    
    render() {
        return (
            <ScrollView style={{ flex: 1, padding: 16 }}>
                <Text h4 bold style={{ marginBottom: 16 }}>Title</Text>

                <Text>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</Text>
            </ScrollView>
        )
    }

}