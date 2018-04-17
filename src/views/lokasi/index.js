/**
 * @author: Artha Prihardana 
 * @Date: 2018-04-15 19:06:49 
 * @Last Modified by: Artha Prihardana
 * @Last Modified time: 2018-04-17 13:59:08
 */
import React, { Component } from 'react';
import { View, ScrollView, StyleSheet, Image, Animated, FlatList } from 'react-native';
import Shimmer from 'react-native-shimmer';
import Button from 'react-native-material-ripple';
import Text from '../../components/Text';
import {shimmerPlaceholder, backgroundContent, colorPrimaryDark, textColorButton, colorPrimary} from '../../res/color';
import { Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/MaterialIcons';

type Props = {};
type State = {
    loading: boolean,
    shimmerAnimating: boolean,
    data: array
};

let timeout;

export default class MainLokasi extends Component<Props, State> {

    state = {
        loading: false,
        data: [
            {title: 'Alfamart Berkah', description: 'Jln Raya Tanjung Duren 31', key: 'item1'},
            {title: 'Alfamart Berkah', description: 'Jln Raya Tanjung Duren 31', key: 'item2'},
            {title: 'Alfamart Berkah', description: 'Jln Raya Tanjung Duren 31', key: 'item3'},
            {title: 'Alfamart Berkah', description: 'Jln Raya Tanjung Duren 31', key: 'item4'}
        ]
    }

    separator = ({ highlighted }) => <View style={[{
        borderBottomColor: shimmerPlaceholder,
        borderBottomWidth: .5
    }, highlighted]} />;

    renderItem(item, index) {
        return (
            <Button onPress={() => Actions.jump("PosisiBarang", {}) } key={index.toString()} style={{ padding: 16, width: '100%', backgroundColor: backgroundContent }}>
                <Text bold>{item.title}</Text>
                <Text>{item.description}</Text>
            </Button>
        )
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
            <View style={{ flex: 1 }}>
                <FlatList
                    ItemSeparatorComponent={this.separator}
                    ListEmptyComponent={() => {}}
                    data={this.state.data}
                    renderItem={({item, index}) => this.renderItem(item, index)}
                    />
                <Button 
                    onPress={() => Actions.jump("TambahLokasi", {}) }
                    style={{
                        zIndex: 3,
                        position: 'absolute',
                        bottom: 20, right: 20,
                        width: 56, height: 56,
                        borderRadius: 28,
                        backgroundColor: colorPrimary,
                        justifyContent: 'center',
                        alignItems: 'center',
                        elevation: 1,
                        shadowColor: '#000000',
                        shadowRadius: 20,
                        shadowOffset: {width: 20, height: 20},
                    }}>
                        <Icon name="add" size={28} style={{ color: textColorButton}} />
                </Button>
            </View>
        )
    }
}