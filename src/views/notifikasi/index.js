/**
 * @author: Artha Prihardana 
 * @Date: 2018-04-16 23:44:43 
 * @Last Modified by: Artha Prihardana
 * @Last Modified time: 2018-04-17 11:46:21
 */
import React, { Component, PureComponent } from 'react';
import { View, ScrollView, FlatList, Platform } from 'react-native';
import { Actions } from 'react-native-router-flux';
import Button from 'react-native-material-ripple';
import Text from '../../components/Text';
import { shimmerPlaceholder, backgroundContent } from '../../res/color';

type Props = {};
type State = {
    data: array
};

export default class Notifikasi extends Component<Props, State> {

    state = {
        data: [
            {title: 'Title Text', description: 'Lorem ipsum dolor sit amet', key: 'item1'},
            {title: 'Title Text', description: 'Lorem ipsum dolor sit amet', key: 'item2'},
            {title: 'Title Text', description: 'Lorem ipsum dolor sit amet', key: 'item3'},
            {title: 'Title Text', description: 'Lorem ipsum dolor sit amet', key: 'item4'}
        ]
    }

    separator = ({ highlighted }) => <View style={[{
        borderBottomColor: shimmerPlaceholder,
        borderBottomWidth: .5
    }, highlighted]} />;

    renderItem(item, index) {
        return (
            <Button onPress={() => Actions.jump("DetailNotifikasi", {})} key={index.toString()} style={{ padding: 16, width: '100%', backgroundColor: backgroundContent }}>
                <Text bold>{item.title}</Text>
                <Text>{item.description}</Text>
            </Button>
        )
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <FlatList
                    ItemSeparatorComponent={this.separator}
                    ListEmptyComponent={() => {}}
                    data={this.state.data}
                    renderItem={({item, index}) => this.renderItem(item, index)}
                    />
            </View>
        )
    }

}