/**
 * @author: Artha Prihardana 
 * @Date: 2018-04-15 19:06:49 
 * @Last Modified by: Artha Prihardana
 * @Last Modified time: 2018-04-15 22:27:47
 */
import React, { Component } from 'react';
import { View, ScrollView, StyleSheet, Image, Animated } from 'react-native';
import Shimmer from 'react-native-shimmer';
import Text from '../../components/Text';
import {shimmerPlaceholder} from '../../res/color';

type Props = {};
type State = {
    loading: boolean,
    shimmerAnimating: boolean
};

let timeout;

export default class MainLokasi extends Component<Props, State> {

    state = {
        loading: false
    }

    componentDidMount() {
        
    }
    

    loading() {
        return (
            <View style={{ padding: 16, flexDirection: 'column', height: 100, justifyContent: 'space-between' }}>
                <Shimmer animating={true} direction={"right"} duration={1000} animationOpacity={0.8} intensity={0}>
                    <View style={{ height: 14, width: '100%', backgroundColor: shimmerPlaceholder }} />
                </Shimmer>

                <Shimmer animating={true} direction={"right"} duration={1000} animationOpacity={0.8} intensity={0}>
                    <View style={{ height: 14, width: '60%', backgroundColor: shimmerPlaceholder }} />
                </Shimmer>

                <Shimmer animating={true} direction={"right"} duration={1000} animationOpacity={0.8} intensity={0}>
                    <View style={{ height: 14, width: '80%', backgroundColor: shimmerPlaceholder }} />
                </Shimmer>
            </View>
        )
    }

    render() {
        console.log('this.props ==>', this.props);
        return(
            <ScrollView style={{ flex: 1 }}>

                {this.loading()}
                
            </ScrollView>
        )
    }
}